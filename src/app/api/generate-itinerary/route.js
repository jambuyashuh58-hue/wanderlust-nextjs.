// AI trip-itinerary generator -- the Next.js equivalent of the old Base44
// site's onboarding wizard's InvokeLLM call. Takes the wizard's answers,
// pulls real candidate activities out of Supabase for the chosen city (or
// cities, for a multi-stop trip), asks Claude to build a day-by-day plan
// using ONLY those real activities (never inventing places), then maps the
// AI's picks back to full activity records before returning them to the
// client.
//
// This is a dynamic API route (not a cached page), so there's no ISR/Data
// Cache staleness concern here -- every request runs fresh.
import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

// Vercel kills the function at the platform's own hard limit regardless of
// what's set here, but declaring it explicitly (a) documents the budget and
// (b) raises the ceiling on plans where the default is lower than this.
export const maxDuration = 60;

const ANTHROPIC_MODEL = 'claude-sonnet-4-5-20250929';
const GEMINI_MODEL = 'gemini-flash-lite-latest';
const MAX_CANDIDATES = 60;
// Hard cap on a single LLM call. Without this, a slow/overloaded provider
// (seen in practice with Gemini's free tier) can leave the client's fetch
// hanging for minutes with the "Building your trip" spinner spinning and no
// feedback -- worse than just falling back to the rule-based itinerary.
// Each leg's LLM call is capped independently, and legs already run in
// parallel, so a 2-city trip still finishes within roughly one timeout, not
// two.
const LLM_TIMEOUT_MS = 20000;
// A larger trip (8 cities is the max we accept) fires that many concurrent
// LLM calls from one function instance. The free-tier Gemini key this site
// runs on has a fairly low per-minute request cap, so 8 requests landing in
// the same instant routinely got a handful of them rate-limited or queued
// long enough to blow past LLM_TIMEOUT_MS -- surfacing as "AI generation
// failed: The operation was aborted due to timeout" for those cities even
// though nothing was actually wrong with them. Two mitigations below:
// staggering each leg's LLM call by a few hundred ms per city index so they
// don't all hit the API in the same instant, and retrying once (with a
// short backoff) when a call fails for a transient reason -- a second
// attempt after the initial burst has cleared usually succeeds.
const LEG_STAGGER_MS = 350;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function isTransientLLMError(err) {
  if (!err) return false;
  if (err.status === 429 || err.status === 503) return true;
  if (err.name === 'TimeoutError') return true;
  return /abort|timeout/i.test(err.message || '');
}
// A single city is capped at MAX_DAYS_PER_CITY (keeps that leg's LLM call
// fast -- a bigger day count needs more output tokens, the main source of
// slow generations -- and keeps its section of the itinerary from becoming
// an unreasonable scroll). A multi-city trip can run longer in total, up to
// MAX_TOTAL_DAYS, because it's still just N legs each individually capped
// at MAX_DAYS_PER_CITY, generated in parallel. Keep both in sync with
// OnboardingWizard.jsx.
const MAX_DAYS_PER_CITY = 14;
const MAX_TOTAL_DAYS = 60;
const MAX_CITIES = 8;

function buildSystemPrompt(days) {
  return `You are a Türkiye travel-planning assistant for the Move to Istanbul site. You will be given a traveler's preferences and a list of REAL activities (with ids) that actually exist in the site's database. Build a day-by-day itinerary using ONLY activity ids from that list -- never invent an activity, place, or id that isn't in the list. Balance variety (don't repeat the same category every day), keep morning/afternoon/evening slots geographically and thematically sensible where the data allows, and respect the traveler's interests, pace, and any budget or accessibility notes. If there's no good fit for a specific slot, omit that slot rather than forcing a bad match -- but the "days" array itself MUST always contain exactly ${days} entries, one per day in order (day 1 through day ${days}), even if that means reusing a category or an activity across more than one day when the destination doesn't have ${days} days' worth of unique options. Never stop early and never omit a trailing day. Respond with ONLY valid JSON, no markdown fences, no commentary, matching exactly this shape:
{
  "summary": "2-3 sentence friendly summary of this leg of the trip",
  "days": [
    {
      "day": 1,
      "theme": "3-5 word evocative title for this day, e.g. 'Welcome to Antalya Coast'",
      "morning": { "activity_id": "...", "note": "short reason this fits here" },
      "afternoon": { "activity_id": "...", "note": "..." },
      "evening": { "activity_id": "...", "note": "..." }
    }
  ]
}
Any slot may be omitted (leave the key out) if nothing fits, but "days" must have exactly ${days} entries.`;
}

function buildUserPrompt({ city, days, interests, pace, budget, travellingAs, accessibility }, candidates) {
  const prefLines = [
    `Destination city: ${city}`,
    `Trip length in this city: ${days} day${days === 1 ? '' : 's'}`,
    `Pace: ${pace}`,
    interests?.length ? `Interests: ${interests.join(', ')}` : `Interests: no strong preference -- pick a well-rounded mix`,
    travellingAs ? `Travelling as: ${travellingAs}` : null,
    budget ? `Approximate daily budget: ${budget} (local currency, TRY)` : null,
    accessibility && accessibility !== 'No Preference' ? `Accessibility note: ${accessibility}` : null,
  ].filter(Boolean);

  const candidateLines = candidates
    .map((a) => `- id=${a.id} | ${a.title} | category=${a.category || 'General'} | rating=${a.rating ?? 'n/a'} | price=${a.price ?? 'n/a'} | duration=${a.how_long || a.duration || 'n/a'} | family_friendly=${!!a.family_friendly} | free=${!!a.free}`)
    .join('\n');

  return `Traveler preferences:\n${prefLines.join('\n')}\n\nReal candidate activities in ${city} (choose only from these ids):\n${candidateLines}`;
}

function extractJson(text) {
  // Claude is asked for raw JSON, but strip markdown fences defensively.
  const trimmed = text.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  return JSON.parse(trimmed);
}

async function callClaude(system, user, apiKey, maxTokens) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }],
    }),
    signal: AbortSignal.timeout(LLM_TIMEOUT_MS),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    const err = new Error(`Anthropic API error (${res.status}): ${errText.slice(0, 500)}`);
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  const text = data?.content?.find((b) => b.type === 'text')?.text;
  if (!text) throw new Error('Anthropic response had no text content');
  return extractJson(text);
}

async function callGemini(system, user, apiKey, maxTokens) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const attempt = async () => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: user }] }],
        generationConfig: { responseMimeType: 'application/json', maxOutputTokens: maxTokens },
      }),
      signal: AbortSignal.timeout(LLM_TIMEOUT_MS),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      const err = new Error(`Gemini API error (${res.status}): ${errText.slice(0, 500)}`);
      err.status = res.status;
      throw err;
    }
    return res.json();
  };

  // The free-tier "-latest" aliases occasionally return a transient 503
  // ("high demand") -- worth one short retry before surfacing the error.
  let data;
  try {
    data = await attempt();
  } catch (err) {
    if (err.status === 503) {
      await new Promise((r) => setTimeout(r, 1500));
      data = await attempt();
    } else {
      throw err;
    }
  }

  const text = data?.candidates?.[0]?.content?.parts?.find((p) => p.text)?.text;
  if (!text) {
    const blockReason = data?.promptFeedback?.blockReason;
    throw new Error(blockReason ? `Gemini blocked the request (${blockReason})` : 'Gemini response had no text content');
  }
  return extractJson(text);
}

// Prefers Gemini (free tier, no billing) when configured; falls back to
// Anthropic if only that key is set. Throws if neither is configured.
// maxTokens scales with trip length so a longer itinerary doesn't get its
// JSON cut off mid-day (which silently shrinks the returned trip), while a
// short one stays fast by not over-requesting tokens it won't use.
async function callLLM(system, user, days) {
  const maxTokens = Math.min(8000, Math.max(2000, 350 + days * 260));
  const geminiKey = process.env.GEMINI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const attempt = () => {
    if (geminiKey) return callGemini(system, user, geminiKey, maxTokens);
    if (anthropicKey) return callClaude(system, user, anthropicKey, maxTokens);
    throw new Error('No LLM API key configured (set GEMINI_API_KEY or ANTHROPIC_API_KEY)');
  };

  try {
    return await attempt();
  } catch (err) {
    // A rate-limit (429), an overloaded provider (503), or a timeout are all
    // transient -- worth one retry after a short backoff rather than
    // immediately surfacing "AI generation failed" for that city. Anything
    // else (a genuine 4xx like a bad request, a JSON parse failure) won't be
    // fixed by trying again, so it's thrown straight through.
    if (!isTransientLLMError(err)) throw err;
    await sleep(1200 + Math.random() * 800);
    return attempt();
  }
}

function haversineKm(a, b) {
  if (a.latitude == null || a.longitude == null || b.latitude == null || b.longitude == null) return null;
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Re-orders one city's AI-picked activities into a proximity-sensible route:
// a greedy nearest-neighbor chain over whichever picks have coordinates
// (most don't yet -- coordinates are being backfilled activity-by-activity,
// see the admin "Geocode" button -- so this only helps the picks that do,
// and leaves the rest in the AI's original order at the end). The day COUNT
// and each day's slot count are preserved exactly, so "how many days did
// this trip get" never changes -- only which stops land in which day, and
// in what order. Each stop also gets an approximate distance + suggested
// way to reach the next one.
function sequenceLegByProximity(dayPlans) {
  const daySizes = dayPlans.map((d) => d.slots.length);
  const flat = dayPlans.flatMap((d) => d.slots);
  const withCoords = flat.filter((s) => s.activity.latitude != null && s.activity.longitude != null);
  const withoutCoords = flat.filter((s) => s.activity.latitude == null || s.activity.longitude == null);

  let ordered = flat;
  if (withCoords.length > 1) {
    const remaining = [...withCoords];
    const route = [remaining.shift()];
    while (remaining.length > 0) {
      const last = route[route.length - 1].activity;
      let bestIdx = 0;
      let bestDist = Infinity;
      remaining.forEach((s, idx) => {
        const d = haversineKm(last, s.activity);
        if (d != null && d < bestDist) { bestDist = d; bestIdx = idx; }
      });
      route.push(remaining.splice(bestIdx, 1)[0]);
    }
    ordered = [...route, ...withoutCoords];
  }

  for (let i = 0; i < ordered.length - 1; i++) {
    const d = haversineKm(ordered[i].activity, ordered[i + 1].activity);
    if (d == null) continue;
    ordered[i].distanceToNextKm = Math.round(d * 10) / 10;
    ordered[i].suggestedTransport = d < 1.2 ? 'walk' : d < 6 ? 'taxi or tram' : 'taxi';
  }

  const periods = ['morning', 'afternoon', 'evening'];
  let cursor = 0;
  return dayPlans.map((d, i) => {
    const size = daySizes[i];
    const slots = ordered.slice(cursor, cursor + size).map((s, idx) => ({ ...s, period: periods[idx] || 'evening' }));
    cursor += size;
    return { ...d, slots };
  });
}

// No affiliate id configured yet for either of these -- plain search links
// for now. Once real accounts exist, add `&aid=<id>` (Booking.com) or the
// Travelpayouts marker param (flights) here, in this one place, and every
// itinerary picks it up on the next generation.
const BOOKING_AFFILIATE_ID = null;
const FLIGHTS_AFFILIATE_MARKER = null;

function bookingSearchUrl(city) {
  const params = new URLSearchParams({ ss: `${city}, Turkey` });
  if (BOOKING_AFFILIATE_ID) params.set('aid', BOOKING_AFFILIATE_ID);
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

function googleFlightsSearchUrl(fromCity, toCity) {
  const params = new URLSearchParams({ q: `Flights from ${fromCity} to ${toCity}` });
  if (FLIGHTS_AFFILIATE_MARKER) params.set('marker', FLIGHTS_AFFILIATE_MARKER);
  return `https://www.google.com/travel/flights?${params.toString()}`;
}

// A handful of "activity" rows (still tagged Guided Tours etc., same
// affiliate feed as everything else) are actually whole multi-day/multi-
// night package tours -- e.g. "13 Days Patterns of Turkey Tour from/to
// Istanbul by Plane" -- not a single morning/afternoon/evening stop. Nothing
// in the schema flags that difference, so left in the candidate pool the AI
// happily slotted a 13-day tour in as someone's Day 1 morning activity (and
// a *different* multi-day tour as that same day's afternoon). Filtering
// these out of the day-slot pool by parsing "N day(s)"/"N night(s)" out of
// the title/duration/how_long text is a blunt but reliable fix -- a real
// single-stop activity never phrases its length that way.
function parsePackageDays(a) {
  const text = `${a.duration || ''} ${a.how_long || ''} ${a.title || ''}`;
  const m = text.match(/(\d+)\s*[-\s]?\s*(days?|nights?)\b/i);
  return m ? Number(m[1]) : null;
}
function isMultiDayPackage(a) {
  const days = parsePackageDays(a);
  return days != null && days >= 2;
}

// Kept out of individual day slots (above), but that's not the same as
// useless -- a package whose length and cities actually match what was
// requested is a legitimate "skip the day-by-day planning, this is already
// a full itinerary" alternative, e.g. someone asking for 13 days across
// Istanbul/Cappadocia/Pamukkale/Ephesus getting offered "13 Days Patterns of
// Turkey Tour from/to Istanbul by Plane" instead of (or alongside) the
// AI-built plan. Matched by day-count proximity (within 3 days either way)
// and by how many of the requested cities the title actually names -- a
// package mentioning none of them isn't a real match even if the length
// happens to line up.
async function findAlternativePackages(supabase, cityNames, totalDays) {
  const { data } = await supabase
    .from('activity')
    .select('id, title, city_name, price, image_url, booking_url, rating, duration, how_long')
    .or('duration.ilike.%day%,how_long.ilike.%day%,title.ilike.%day%')
    .order('popularity_score', { ascending: false, nullsFirst: false })
    .limit(100);
  if (!data) return [];

  const mentions = (title, city) => (title || '').toLowerCase().includes((city || '').toLowerCase());

  return data
    .map((a) => ({ ...a, packageDays: parsePackageDays(a) }))
    .filter((a) => a.packageDays != null && a.packageDays >= 2)
    .map((a) => ({
      ...a,
      cityMatches: cityNames.filter((c) => mentions(a.title, c)).length,
      dayDiff: Math.abs(a.packageDays - totalDays),
    }))
    .filter((a) => a.cityMatches > 0 && a.dayDiff <= 3)
    .sort((a, b) => (b.cityMatches - a.cityMatches) || (a.dayDiff - b.dayDiff))
    .slice(0, 3);
}

// Builds one city's leg of the trip: pulls its real candidate activities,
// asks the AI for a day-by-day plan, and maps the result back to full
// activity records. Returns either a populated leg or one carrying `error`
// (never throws) so one bad city doesn't take down the whole multi-city
// request -- the other legs still come back.
async function generateLeg(supabase, { city, days, interests, pace, budget, travellingAs, accessibility }, legIndex = 0) {
  const requestedDays = Math.min(Math.max(1, Number(days) || 1), MAX_DAYS_PER_CITY);

  // Transfers and Hotels aren't a morning/afternoon/evening "activity" --
  // Transfers are the connector between two city legs (matched separately by
  // matchTransfer() below), and a Hotels row is a where-to-stay pick for
  // this city (matched by matchHotel()). Keeping both out of the candidate
  // pool stops the AI from slotting "Dalaman Airport Transfer" or a hotel in
  // as someone's afternoon plan.
  const [{ data: activities, error: activitiesError }, hotelPick] = await Promise.all([
    supabase
      .from('activity')
      .select('id, title, category, city_name, rating, price, duration, how_long, family_friendly, free, image_url, booking_url, address, latitude, longitude')
      .ilike('city_name', city)
      .not('category', 'in', '("Transfers","Hotels")')
      .order('popularity_score', { ascending: false, nullsFirst: false })
      .limit(MAX_CANDIDATES),
    matchHotel(supabase, city),
  ]);

  if (activitiesError) {
    return { city, days: requestedDays, requestedDays, error: activitiesError.message, dayPlans: [] };
  }
  const singleStopActivities = (activities || []).filter((a) => !isMultiDayPackage(a));
  if (singleStopActivities.length === 0) {
    return { city, days: requestedDays, requestedDays, error: `No activities found for ${city} yet.`, dayPlans: [] };
  }

  const system = buildSystemPrompt(requestedDays);
  const user = buildUserPrompt({ city, days: requestedDays, interests, pace, budget, travellingAs, accessibility }, singleStopActivities);

  // Spread the legs' LLM calls out instead of firing all of them in the same
  // instant -- see the LEG_STAGGER_MS comment above.
  if (legIndex > 0) await sleep(legIndex * LEG_STAGGER_MS);

  let aiResult;
  try {
    aiResult = await callLLM(system, user, requestedDays);
  } catch (err) {
    return { city, days: requestedDays, requestedDays, error: `AI generation failed: ${err.message}`, dayPlans: [] };
  }

  const activityById = new Map(activities.map((a) => [a.id, a]));
  const PERIODS = ['morning', 'afternoon', 'evening'];

  const rawDayPlans = (aiResult.days || []).slice(0, requestedDays).map((d) => {
    const slots = PERIODS.map((period) => {
      const slot = d[period];
      if (!slot?.activity_id) return null;
      const activity = activityById.get(slot.activity_id);
      if (!activity) return null; // guard against a hallucinated id
      return { period, note: slot.note || '', activity };
    }).filter(Boolean);
    return { day: d.day, theme: d.theme || '', slots };
  });

  // The AI is good at picking *which* activities fit the traveler's
  // interests, but it's never shown a coordinate, so left alone it happily
  // sends someone across town and back within the same day. This
  // re-sequences its picks by physical proximity (same day *count* and day
  // *themes* are kept, only which stops land on which day and in what order
  // changes) and attaches an approximate distance + suggested way to get
  // there for each hop.
  const dayPlans = sequenceLegByProximity(rawDayPlans);

  // Trust what the AI actually returned, not the request -- if it came back
  // short (a small city without enough unique activities, or a truncated
  // response), the page must say how many days it actually got, not the
  // number that was asked for.
  const actualDays = dayPlans.length || requestedDays;

  const leg = {
    city,
    days: actualDays,
    requestedDays,
    summary: aiResult.summary || '',
    dayPlans,
  };
  if (hotelPick) {
    leg.hotelPick = hotelPick;
  } else {
    // No real Hotels-category listing for this city yet -- fall back to a
    // plain Booking.com search link (no affiliate id configured; swap in
    // BOOKING_AFFILIATE_ID once one exists, one line, see bookingSearchUrl
    // below) rather than leaving the traveler with no lead at all.
    leg.hotelSearchUrl = bookingSearchUrl(city);
  }
  if (actualDays < requestedDays) {
    leg.note = `Generated ${actualDays} of the ${requestedDays} days asked for -- ${city} may not have enough unique activities for a longer stay yet.`;
  }
  return leg;
}

// A Hotels-category row is a where-to-stay pick for a single city (unlike
// Transfers, which connects two). Just the best-rated one per city leg --
// same affiliate booking_url pattern as everything else.
async function matchHotel(supabase, city) {
  const { data } = await supabase
    .from('activity')
    .select('id, title, category, city_name, rating, price, image_url, booking_url, address')
    .eq('category', 'Hotels')
    .ilike('city_name', city)
    .order('popularity_score', { ascending: false, nullsFirst: false })
    .limit(1);
  return data?.[0] || null;
}

// There's no standalone "book a flight" or "book a hotel room" product in the
// affiliate feed -- only regular activity rows that happen to be an
// intercity/airport transfer (category='Transfers', covering both a ground
// transfer and a flight-based connector), and Hotels-category rows for
// where-to-stay picks. So instead of a separate booking step, we look for a
// real Transfers-category row that connects two consecutive cities on the
// trip and slot it in between their day plans -- same affiliate booking_url
// pattern as everything else on the site, just placed differently.
async function matchTransfer(supabase, fromCity, toCity) {
  const { data } = await supabase
    .from('activity')
    .select('id, title, category, city_name, rating, price, image_url, booking_url, address')
    .eq('category', 'Transfers')
    .or(`city_name.ilike.${fromCity},city_name.ilike.${toCity}`)
    .order('popularity_score', { ascending: false, nullsFirst: false })
    .limit(20);

  if (!data || data.length === 0) return null;

  // Transfer rows are filed under whichever city offers the pickup, with the
  // other endpoint (an airport, another city) only named in the title -- e.g.
  // a Fethiye-filed row titled "...to Dalaman Airport". Prefer a row whose
  // title actually mentions the other city/leg so "Konya -> Cappadocia"
  // doesn't grab an unrelated Konya row; fall back to any row tied to either
  // city if nothing matches by name.
  const mentions = (title, city) => title.toLowerCase().includes(city.toLowerCase());
  const best = data.find((a) => mentions(a.title, fromCity) && mentions(a.title, toCity))
    || data.find((a) => mentions(a.title, toCity) || mentions(a.title, fromCity))
    || data[0];
  return best;
}

async function generateItinerary(params) {
  const {
    city,
    cities,
    days,
    interests = [],
    pace = 'balanced',
    budget,
    travellingAs,
    accessibility,
    firstName,
    email,
    gender,
    ageGroup,
    hasChildren,
    numChildren,
    childrenAges,
    currentLocation,
    travelDates,
    newsletterOptIn,
  } = params || {};

  // Accept either the new multi-city shape (`cities: [{city, days}, ...]`)
  // or the older single-city shape (`city`, `days`) for backward
  // compatibility with the GET smoke-test route and any old callers.
  let cityLegs = Array.isArray(cities) && cities.length > 0
    ? cities.filter((c) => c && c.city).map((c) => ({ city: c.city, days: c.days }))
    : (city ? [{ city, days }] : []);

  if (cityLegs.length === 0) {
    return { status: 400, body: { error: 'At least one city is required' } };
  }
  cityLegs = cityLegs.slice(0, MAX_CITIES);

  // Cap the combined trip length across every leg, trimming the last legs
  // first if the request came in over budget (defensive -- the wizard
  // already caps this client-side).
  let totalRequested = cityLegs.reduce((sum, l) => sum + (Number(l.days) || 1), 0);
  if (totalRequested > MAX_TOTAL_DAYS) {
    let over = totalRequested - MAX_TOTAL_DAYS;
    for (let i = cityLegs.length - 1; i >= 0 && over > 0; i--) {
      const reducible = Math.max(0, cityLegs[i].days - 1);
      const cut = Math.min(reducible, over);
      cityLegs[i].days -= cut;
      over -= cut;
    }
  }

  const supabase = getSupabaseServer();

  // Every leg's Supabase fetch + LLM call runs concurrently, so a 5-city
  // trip takes roughly as long as its slowest single leg, not 5x as long.
  // The alternative-package search is independent of all of that (it's a
  // trip-wide match, not per-leg), so it runs alongside rather than after.
  const [legs, alternativePackages] = await Promise.all([
    Promise.all(cityLegs.map((leg, i) => generateLeg(supabase, { ...leg, interests, pace, budget, travellingAs, accessibility }, i))),
    findAlternativePackages(supabase, cityLegs.map((l) => l.city), totalRequested),
  ]);

  const validLegs = legs.filter((l) => !l.error);
  if (validLegs.length === 0) {
    return { status: 502, body: { error: legs[0]?.error || 'AI generation failed for every city in this trip.' } };
  }

  // Multi-city trip: find the connecting transfer for each city-to-city hop
  // and attach it to the earlier leg. Single-city trips have nothing to
  // connect, and a leg that errored out has no onward plan to connect from.
  if (legs.length > 1) {
    const transfers = await Promise.all(
      legs.slice(0, -1).map((leg, i) => {
        const nextLeg = legs[i + 1];
        if (leg.error || nextLeg.error) return null;
        return matchTransfer(supabase, leg.city, nextLeg.city);
      })
    );
    transfers.forEach((transfer, i) => {
      if (transfer) {
        legs[i].transferToNext = transfer;
      } else if (!legs[i].error && !legs[i + 1].error) {
        // No real Transfers-category activity connects these two cities
        // (ground or flight) -- fall back to a Google Flights search link
        // rather than leaving the traveler with no way to get there.
        legs[i].flightSearchUrl = googleFlightsSearchUrl(legs[i].city, legs[i + 1].city);
      }
    });
  }

  const actualTotalDays = legs.reduce((sum, l) => sum + (l.dayPlans?.length || 0), 0);
  const cityNames = cityLegs.map((l) => l.city);

  const responsePayload = {
    cities: cityNames,
    city: cityNames.join(' → '), // single-line fallback label
    days: actualTotalDays,
    requestedDays: totalRequested,
    interests,
    pace,
    summary: validLegs.map((l) => l.summary).filter(Boolean).join(' '),
    legs,
    generatedAt: new Date().toISOString(),
  };
  // Prefix each note/error with its city so two different cities hitting the
  // *same* underlying error (e.g. both timing out) don't render as the exact
  // same sentence repeated back-to-back with no indication anything else
  // went wrong elsewhere -- and dedupe defensively in case a message really
  // is identical after that.
  const legNotes = [...new Set(
    legs.filter((l) => l.note || l.error).map((l) => `${l.city}: ${l.note || l.error}`)
  )];
  if (legNotes.length > 0) {
    responsePayload.note = legNotes.join(' ');
  }
  if (alternativePackages.length > 0) {
    responsePayload.alternativePackages = alternativePackages;
  }

  // Best-effort persistence -- mirrors the old Base44 TravelPreference /
  // ShareableItinerary entities. Fired concurrently rather than sequentially
  // (halves this step's contribution to response time); still awaited
  // because Vercel's serverless runtime can freeze the function as soon as
  // the response is sent, so a true fire-and-forget risks the insert never
  // completing.
  await Promise.allSettled([
    supabase.from('travel_preference').insert({
      first_name: firstName || null,
      email: email ? String(email).trim().toLowerCase() : null,
      gender: gender || null,
      age_group: ageGroup || null,
      has_children: typeof hasChildren === 'boolean' ? hasChildren : null,
      num_children: numChildren || null,
      children_ages: childrenAges || null,
      current_location: currentLocation || null,
      destination: cityNames.join(', '),
      trip_length: `${totalRequested} day${totalRequested === 1 ? '' : 's'}${cityNames.length > 1 ? ` across ${cityNames.length} cities` : ''}`,
      travel_dates: travelDates || null,
      interests,
      budget: budget || null,
      travelling_as: travellingAs || null,
      accessibility: accessibility || null,
      newsletter_opt_in: !!newsletterOptIn,
    }),
    // Opted in to tips -> also a newsletter subscriber (ignoreDuplicates so an
    // existing row, e.g. a guide download, keeps its original source).
    ...(email && newsletterOptIn
      ? [supabase.from('newsletter_subscriber').upsert(
          { email: String(email).trim().toLowerCase(), first_name: firstName || null, source_page: '/onboarding' },
          { onConflict: 'email', ignoreDuplicates: true }
        )]
      : []),
    supabase.from('shareable_itinerary').insert({
      summary: responsePayload.summary,
      itinerary: legs,
      preferences: { cities: cityNames, days: actualTotalDays, interests, pace, budget, travellingAs, accessibility },
    }),
  ]).catch(() => {
    // Non-critical -- the itinerary still returns to the user.
  });

  return { status: 200, body: responsePayload };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const { status, body: responseBody } = await generateItinerary(body);
  return NextResponse.json(responseBody, { status });
}

// GET variant (query params instead of a JSON body) -- lets the endpoint be
// smoke-tested with a plain URL and gives a shareable/debuggable link.
// e.g. /api/generate-itinerary?city=Istanbul&days=2&interests=Museums,Food%20Experiences
// For a multi-city smoke test, pass cities=Istanbul:5,Izmir:3 instead.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const citiesParam = searchParams.get('cities');
  const params = {
    city: searchParams.get('city'),
    days: Number(searchParams.get('days')) || undefined,
    cities: citiesParam
      ? citiesParam.split(',').map((pair) => {
          const [name, d] = pair.split(':');
          return { city: name?.trim(), days: Number(d) || 3 };
        })
      : undefined,
    interests: searchParams.get('interests')?.split(',').map((s) => s.trim()).filter(Boolean) || [],
    pace: searchParams.get('pace') || undefined,
    budget: searchParams.get('budget') ? Number(searchParams.get('budget')) : undefined,
    travellingAs: searchParams.get('travellingAs') || undefined,
    accessibility: searchParams.get('accessibility') || undefined,
  };
  const { status, body: responseBody } = await generateItinerary(params);
  return NextResponse.json(responseBody, { status });
}
