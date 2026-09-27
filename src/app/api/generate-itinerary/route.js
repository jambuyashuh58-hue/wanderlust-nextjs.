// AI trip-itinerary generator -- the Next.js equivalent of the old Base44
// site's onboarding wizard's InvokeLLM call. Takes the wizard's answers,
// pulls real candidate activities out of Supabase for the chosen city, asks
// Claude to build a day-by-day plan using ONLY those real activities (never
// inventing places), then maps the AI's picks back to full activity records
// before returning them to the client.
//
// This is a dynamic API route (not a cached page), so there's no ISR/Data
// Cache staleness concern here -- every request runs fresh.
import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

const ANTHROPIC_MODEL = 'claude-sonnet-4-5-20250929';
const GEMINI_MODEL = 'gemini-2.5-flash';
const MAX_CANDIDATES = 60;

function buildSystemPrompt() {
  return `You are a Türkiye travel-planning assistant for the Wanderlust site. You will be given a traveler's preferences and a list of REAL activities (with ids) that actually exist in the site's database. Build a day-by-day itinerary using ONLY activity ids from that list -- never invent an activity, place, or id that isn't in the list. Balance variety (don't repeat the same category every day), keep morning/afternoon/evening slots geographically and thematically sensible where the data allows, and respect the traveler's interests, pace, and any budget or accessibility notes. If there's no good fit for a slot, omit that slot rather than forcing a bad match. Respond with ONLY valid JSON, no markdown fences, no commentary, matching exactly this shape:
{
  "summary": "2-3 sentence friendly summary of the overall trip",
  "days": [
    {
      "day": 1,
      "morning": { "activity_id": "...", "note": "short reason this fits here" },
      "afternoon": { "activity_id": "...", "note": "..." },
      "evening": { "activity_id": "...", "note": "..." }
    }
  ]
}
Any slot may be omitted (leave the key out) if nothing fits. "days" must have exactly the requested number of entries.`;
}

function buildUserPrompt({ city, days, interests, pace, budget, travellingAs, accessibility }, candidates) {
  const prefLines = [
    `Destination city: ${city}`,
    `Trip length: ${days} day${days === 1 ? '' : 's'}`,
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

async function callClaude(system, user, apiKey) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 3000,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Anthropic API error (${res.status}): ${errText.slice(0, 500)}`);
  }

  const data = await res.json();
  const text = data?.content?.find((b) => b.type === 'text')?.text;
  if (!text) throw new Error('Anthropic response had no text content');
  return extractJson(text);
}

async function callGemini(system, user, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: user }] }],
      generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 4000 },
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Gemini API error (${res.status}): ${errText.slice(0, 500)}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.find((p) => p.text)?.text;
  if (!text) {
    const blockReason = data?.promptFeedback?.blockReason;
    throw new Error(blockReason ? `Gemini blocked the request (${blockReason})` : 'Gemini response had no text content');
  }
  return extractJson(text);
}

// Prefers Gemini (free tier, no billing) when configured; falls back to
// Anthropic if only that key is set. Throws if neither is configured.
async function callLLM(system, user) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (geminiKey) return callGemini(system, user, geminiKey);
  if (anthropicKey) return callClaude(system, user, anthropicKey);
  throw new Error('No LLM API key configured (set GEMINI_API_KEY or ANTHROPIC_API_KEY)');
}

async function generateItinerary(params) {
  const {
    city,
    days,
    interests = [],
    pace = 'balanced',
    budget,
    travellingAs,
    accessibility,
    firstName,
    email,
  } = params || {};

  if (!city || !days) {
    return { status: 400, body: { error: 'city and days are required' } };
  }

  const supabase = getSupabaseServer();

  // Pull real candidate activities for this city -- best-rated/most-popular
  // first so the prompt stays small even for a city with hundreds of rows.
  const { data: activities, error: activitiesError } = await supabase
    .from('activity')
    .select('id, title, category, city_name, rating, price, duration, how_long, family_friendly, free, image_url, booking_url, address')
    .ilike('city_name', city)
    .order('popularity_score', { ascending: false, nullsFirst: false })
    .limit(MAX_CANDIDATES);

  if (activitiesError) {
    return { status: 500, body: { error: activitiesError.message } };
  }

  if (!activities || activities.length === 0) {
    return {
      status: 404,
      body: { error: `No activities found for ${city} yet -- try browsing the full list instead.` },
    };
  }

  const system = buildSystemPrompt();
  const user = buildUserPrompt({ city, days, interests, pace, budget, travellingAs, accessibility }, activities);

  let aiResult;
  try {
    aiResult = await callLLM(system, user);
  } catch (err) {
    return { status: 502, body: { error: `AI generation failed: ${err.message}` } };
  }

  const activityById = new Map(activities.map((a) => [a.id, a]));
  const PERIODS = ['morning', 'afternoon', 'evening'];

  const dayPlans = (aiResult.days || []).slice(0, days).map((d) => {
    const slots = PERIODS.map((period) => {
      const slot = d[period];
      if (!slot?.activity_id) return null;
      const activity = activityById.get(slot.activity_id);
      if (!activity) return null; // guard against a hallucinated id
      return { period, note: slot.note || '', activity };
    }).filter(Boolean);
    return { day: d.day, slots };
  });

  const responsePayload = {
    city,
    days,
    interests,
    pace,
    summary: aiResult.summary || '',
    dayPlans,
    generatedAt: new Date().toISOString(),
  };

  // Best-effort persistence -- mirrors the old Base44 TravelPreference /
  // ShareableItinerary entities. Never blocks the response on failure.
  try {
    await supabase.from('travel_preference').insert({
      first_name: firstName || null,
      email: email || null,
      destination: city,
      trip_length: `${days} day${days === 1 ? '' : 's'}`,
      interests,
      budget: budget || null,
      travelling_as: travellingAs || null,
      accessibility: accessibility || null,
    });
    await supabase.from('shareable_itinerary').insert({
      summary: responsePayload.summary,
      itinerary: dayPlans,
      preferences: { city, days, interests, pace, budget, travellingAs, accessibility },
    });
  } catch {
    // Non-critical -- the itinerary still returns to the user.
  }

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
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const params = {
    city: searchParams.get('city'),
    days: Number(searchParams.get('days')) || undefined,
    interests: searchParams.get('interests')?.split(',').map((s) => s.trim()).filter(Boolean) || [],
    pace: searchParams.get('pace') || undefined,
    budget: searchParams.get('budget') ? Number(searchParams.get('budget')) : undefined,
    travellingAs: searchParams.get('travellingAs') || undefined,
    accessibility: searchParams.get('accessibility') || undefined,
  };
  const { status, body: responseBody } = await generateItinerary(params);
  return NextResponse.json(responseBody, { status });
}
