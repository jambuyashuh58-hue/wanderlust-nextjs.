// Reads the AI-generated itinerary (built by /api/generate-itinerary and
// saved by OnboardingWizard.jsx) out of sessionStorage and displays it as a
// mind map: a root "trip" node branching to one node per city (for a
// multi-stop trip like Istanbul -> Izmir), each city branching to a row of
// day chips, and clicking a day chip opens that day's Morning/Afternoon/
// Evening activity cards (photo, price, rating) below the map. A
// single-city trip is just a one-branch version of the same tree.

'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, ArrowRight, Sun, Sunset, Moon, Star, Clock, Info, CalendarCheck, Car, Bed, Plane, ExternalLink } from 'lucide-react';

const PERIODS = ['morning', 'afternoon', 'evening'];
const PERIOD_ICON = { morning: Sun, afternoon: Sunset, evening: Moon };
const PERIOD_LABEL = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' };
const EMPTY_SLOT_NOTE = {
  morning: 'A free morning — sleep in or explore on your own.',
  afternoon: 'A free afternoon — wander wherever catches your eye.',
  evening: 'Relax at a local cafe and enjoy the atmosphere.',
};

function ActivityCard({ slot }) {
  const Icon = PERIOD_ICON[slot.period] || MapPin;
  const a = slot.activity;
  const price = a.price ?? (a.free ? 'Free' : null);
  return (
    <Link
      href={`/activity/${a.id}`}
      className="flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary transition-colors"
    >
      <div className="relative w-full aspect-[4/3] bg-muted">
        {a.image_url ? (
          // Plain <img>, not next/image -- see CollectionsFilters.jsx for why.
          <img src={a.image_url} alt={a.title || a.name || ''} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <MapPin className="w-8 h-8" />
          </div>
        )}
        {price != null && (
          <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-background/90 text-xs font-semibold">
            {typeof price === 'number' ? `₺${price.toLocaleString()}` : price}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5 px-4 pt-3 text-[11px] font-semibold text-primary uppercase tracking-wide">
        <Icon className="w-3.5 h-3.5" /> {PERIOD_LABEL[slot.period]}
      </div>
      <div className="px-4 pb-4 pt-1 flex-1 flex flex-col">
        <p className="font-semibold text-sm leading-snug mb-1">{a.title || a.name}</p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground mb-2">
          {a.address && (
            <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {a.address}</span>
          )}
          {a.rating != null && (
            <span className="inline-flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> {a.rating}</span>
          )}
          {(a.how_long || a.duration) && (
            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {a.how_long || a.duration}</span>
          )}
        </div>
        {slot.note && <p className="text-sm text-foreground/70 leading-snug">{slot.note}</p>}
        {/* Approximate distance + suggested way to reach the next stop in
            the route -- only present once activities have real coordinates
            (see the admin "Geocode" button), so this quietly appears as
            coverage grows rather than needing a separate flag. */}
        {slot.distanceToNextKm != null && (
          <p className="mt-2 pt-2 border-t border-border/60 text-xs text-muted-foreground flex items-center gap-1">
            <Car className="w-3 h-3 shrink-0" /> ~{slot.distanceToNextKm} km to next stop — {slot.suggestedTransport}
          </p>
        )}
      </div>
    </Link>
  );
}

// There's no standalone "book a flight/hotel" step -- moving between two
// cities on the trip is fulfilled by a real transfer activity from the same
// affiliate feed as everything else (matched server-side in
// /api/generate-itinerary), shown here as the connector between two city
// panels rather than inside either day's Morning/Afternoon/Evening slots.
function TransferCard({ transfer, fromCity, toCity }) {
  const price = transfer.price ?? (transfer.free ? 'Free' : null);
  return (
    <Link
      href={`/activity/${transfer.id}`}
      className="flex items-center gap-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 hover:border-primary transition-colors px-4 py-3.5 max-w-2xl mx-auto"
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/15 text-primary shrink-0">
        <Car className="w-4 h-4" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-primary uppercase tracking-wide mb-0.5">{fromCity} → {toCity}</p>
        <p className="text-sm font-semibold leading-snug truncate">{transfer.title}</p>
      </div>
      {price != null && (
        <span className="shrink-0 px-2.5 py-1 rounded-full bg-background text-xs font-semibold">
          {typeof price === 'number' ? `₺${price.toLocaleString()}` : price}
        </span>
      )}
    </Link>
  );
}

// Same idea as TransferCard, but a per-city where-to-stay pick (a Hotels-
// category activity) rather than a between-cities connector.
function HotelCard({ hotel, city }) {
  const price = hotel.price ?? (hotel.free ? 'Free' : null);
  return (
    <Link
      href={`/activity/${hotel.id}`}
      className="flex items-center gap-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 hover:border-primary transition-colors px-4 py-3.5 max-w-2xl mx-auto"
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/15 text-primary shrink-0">
        <Bed className="w-4 h-4" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-primary uppercase tracking-wide mb-0.5">Where to stay in {city}</p>
        <p className="text-sm font-semibold leading-snug truncate">{hotel.title}</p>
      </div>
      {price != null && (
        <span className="shrink-0 px-2.5 py-1 rounded-full bg-background text-xs font-semibold">
          {typeof price === 'number' ? `₺${price.toLocaleString()}` : price}
        </span>
      )}
    </Link>
  );
}

// Fallback for when there's no real activity to link to yet -- no matching
// Transfers-category row between two cities, or no Hotels-category pick for
// a city. Plain search links (no affiliate id configured on either yet, see
// the comments in generate-itinerary/route.js) rather than leaving the
// traveler with nothing.
function SearchLinkCard({ href, icon: Icon, label, title }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-xl border border-dashed border-border bg-card/50 hover:border-primary transition-colors px-4 py-3.5 max-w-2xl mx-auto"
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-muted text-muted-foreground shrink-0">
        <Icon className="w-4 h-4" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm font-semibold leading-snug truncate">{title}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
    </a>
  );
}

function EmptySlot({ period }) {
  const Icon = PERIOD_ICON[period] || MapPin;
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 rounded-xl border border-dashed border-border bg-card/50 px-4 py-10 aspect-[4/3] sm:aspect-auto">
      <Icon className="w-5 h-5 text-primary/60" />
      <p className="text-xs text-muted-foreground max-w-[16rem]">{EMPTY_SLOT_NOTE[period]}</p>
    </div>
  );
}

// Normalizes either response shape into a flat list of legs:
// - new multi-city shape: itinerary.legs = [{ city, days, summary, dayPlans }, ...]
// - older single-city shape (or an itinerary saved before this change):
//   itinerary.city / itinerary.dayPlans directly.
function getLegs(itinerary) {
  if (Array.isArray(itinerary.legs) && itinerary.legs.length > 0) return itinerary.legs;
  if (Array.isArray(itinerary.dayPlans)) {
    return [{ city: itinerary.city, days: itinerary.days, summary: itinerary.summary, dayPlans: itinerary.dayPlans }];
  }
  return [];
}

// A rotating palette so each city gets its own branch color, the way the
// reference mind maps color-code each main branch. Kept as {h,s,l} so both
// a solid stroke/text color and a soft translucent fill can be derived from
// the same value.
const BRANCH_COLORS = [
  { h: 217, s: 91, l: 60 }, // blue
  { h: 339, s: 82, l: 52 }, // rose
  { h: 142, s: 66, l: 42 }, // green
  { h: 24, s: 95, l: 53 },  // orange
  { h: 262, s: 83, l: 58 }, // violet
  { h: 199, s: 89, l: 48 }, // cyan
  { h: 45, s: 93, l: 45 },  // amber
  { h: 291, s: 64, l: 45 }, // purple
];
function branchColor(i, alpha = 1) {
  const c = BRANCH_COLORS[i % BRANCH_COLORS.length];
  return `hsl(${c.h} ${c.s}% ${c.l}% / ${alpha})`;
}

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState(undefined); // undefined = loading, null = none found
  const [selectedCity, setSelectedCity] = useState(0); // one city's full itinerary shown at a time
  const panelRef = useRef(null); // the currently-shown city panel, for "jump to this city"
  const dayRefs = useRef({}); // { [dayNumber]: HTMLElement } within the currently-shown city panel
  const pendingDay = useRef(null); // a day to scroll to once a city switch finishes rendering

  useEffect(() => {
    let parsed = null;
    try {
      const raw = sessionStorage.getItem('wanderlust_itinerary');
      parsed = raw ? JSON.parse(raw) : null;
    } catch {
      parsed = null;
    }
    setItinerary(parsed);
  }, []);

  // Runs after selectedCity changes (and the new panel has rendered), so a
  // day-chip click that also had to switch cities can still land on that
  // specific day rather than just the top of the city.
  useEffect(() => {
    if (pendingDay.current == null) return;
    const day = pendingDay.current;
    pendingDay.current = null;
    requestAnimationFrame(() => {
      dayRefs.current[day]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [selectedCity]);

  if (itinerary === undefined) return null;

  if (!itinerary) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-24 pt-32 md:pt-40 text-center">
        <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-3">No itinerary yet</h1>
        <p className="text-muted-foreground mb-6">
          Answer a few quick questions and our AI will build one for you.
        </p>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold"
        >
          Plan my trip <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const legs = getLegs(itinerary);
  const multiCity = legs.length > 1;
  const tripLabel = `${itinerary.firstName ? `${itinerary.firstName}'s ` : ''}${itinerary.days} ${itinerary.days === 1 ? 'day' : 'days'}${multiCity ? ` across ${legs.length} cities` : ` in ${legs[0]?.city || ''}`}`;

  // A short one-line overview instead of every leg's full AI-written
  // paragraph stitched together (which, for a many-city trip, turns into a
  // wall of text nobody reads). The full per-city write-ups are still
  // available -- tucked behind "Read the full trip notes" -- rather than
  // thrown away.
  const shortOverview = multiCity
    ? `A ${itinerary.days}-day journey through ${legs.map((l) => l.city).join(', ')}.`
    : (legs[0]?.summary ? legs[0].summary.split(/(?<=[.!?])\s+/)[0] : '');

  // Clicking a city node switches the single expanded panel below to show
  // that city's full itinerary (every day, not just one) and scrolls to it.
  function goToCity(i) {
    pendingDay.current = null;
    if (selectedCity === i) {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setSelectedCity(i);
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }

  // Clicking a day chip does the same, but also jumps straight to that day
  // within the (now full) city panel -- via the pendingDay effect above if
  // switching cities was needed first, or immediately if already showing.
  function goToDay(i, day) {
    if (selectedCity === i) {
      dayRefs.current[day]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      pendingDay.current = day;
      setSelectedCity(i);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 pt-32 md:pt-40">
      <div className="flex items-center justify-center gap-2 mb-3 text-primary">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-semibold uppercase tracking-wider">Your AI-planned trip map</span>
      </div>
      <h1 className="text-3xl font-bold mb-3 text-center">{tripLabel}</h1>
      {shortOverview && (
        <p className="text-foreground/80 text-lg leading-relaxed mb-2 text-center max-w-2xl mx-auto">{shortOverview}</p>
      )}
      {itinerary.summary && itinerary.summary !== shortOverview && (
        <details className="max-w-2xl mx-auto mb-4 text-center">
          <summary className="cursor-pointer text-sm font-semibold text-primary select-none">
            Read the full trip notes
          </summary>
          <p className="text-foreground/70 text-sm leading-relaxed mt-3 text-left">{itinerary.summary}</p>
        </details>
      )}
      {itinerary.note && (
        <p className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-500/10 rounded-lg px-4 py-3 mb-6 max-w-2xl mx-auto">
          <Info className="w-4 h-4 shrink-0 mt-0.5" /> {itinerary.note}
        </p>
      )}

      {/* A ready-made package that actually matches this trip's length and
          cities -- an alternative to the day-by-day plan below, not a
          replacement for it. Kept out of individual day slots (a 13-day
          tour can't be a morning activity) but still worth surfacing when
          someone would rather book the whole thing pre-planned than piece
          together day trips themselves. */}
      {itinerary.alternativePackages?.length > 0 && (
        <div className="max-w-2xl mx-auto mb-8 rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Prefer it already planned? These match your trip length and cities
          </p>
          <div className="flex flex-col gap-2">
            {itinerary.alternativePackages.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/activity/${pkg.id}`}
                className="flex items-center gap-3 rounded-xl border border-border hover:border-primary transition-colors px-3 py-2.5"
              >
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold leading-snug truncate">{pkg.title}</span>
                  <span className="text-xs text-muted-foreground">{pkg.packageDays} days</span>
                </span>
                {pkg.price != null && (
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-muted text-xs font-semibold">₺{Number(pkg.price).toLocaleString()}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Vertical mind map: Trip at the top, a colored trunk running down
          through one branch per city, and each city's days fanning out in a
          wrapped row right under it. Stacking top-to-bottom (rather than a
          circular layout) means the whole map is visible with an ordinary
          vertical scroll -- no panning or zooming needed on a phone.
          Clicking a city jumps straight to its itinerary panel below. */}
      <div className="mindmap-vertical mt-10">
        <div className="mindmap-node mindmap-root-v">
          <Sparkles className="w-4 h-4" /> Trip
        </div>
        {legs.length > 0 && <div className="mindmap-trunk" />}

        {legs.map((leg, i) => {
          const isSelectedCity = selectedCity === i;
          return (
            <div key={`${leg.city}-${i}`} className="mindmap-branch">
              <div className="mindmap-branch-stem" style={{ background: branchColor(i) }} />
              <button
                type="button"
                onClick={() => goToCity(i)}
                className="mindmap-node mindmap-city-v"
                style={{
                  borderColor: branchColor(i),
                  background: branchColor(i, isSelectedCity ? 0.18 : 0.1),
                  boxShadow: isSelectedCity ? `0 0 0 2px ${branchColor(i, 0.4)}` : undefined,
                }}
              >
                <MapPin className="w-4 h-4 shrink-0" style={{ color: branchColor(i) }} />
                <span>
                  <span className="mindmap-city-name">{leg.city}</span>
                  <span className="mindmap-city-days">{leg.days} {leg.days === 1 ? 'day' : 'days'} · tap for itinerary</span>
                </span>
              </button>
              {leg.dayPlans?.length > 0 && (
                <div className="mindmap-day-row" style={{ borderColor: branchColor(i, 0.35) }}>
                  {leg.dayPlans.map((dp) => (
                    <button
                      key={dp.day}
                      type="button"
                      onClick={() => goToDay(i, dp.day)}
                      className="mindmap-node mindmap-day"
                      style={{
                        borderColor: branchColor(i, isSelectedCity ? 1 : 0.5),
                        background: isSelectedCity ? branchColor(i, 0.16) : 'hsl(var(--card))',
                        color: isSelectedCity ? branchColor(i) : undefined,
                      }}
                    >
                      Day {dp.day}
                    </button>
                  ))}
                </div>
              )}
              {i < legs.length - 1 && <div className="mindmap-trunk" />}
            </div>
          );
        })}
      </div>

      {/* Expanded panel for the one selected city -- every one of its days,
          not just one, so picking a city actually shows its whole
          itinerary rather than a single day stacked under every city. */}
      {legs[selectedCity] && (() => {
        const leg = legs[selectedCity];
        const i = selectedCity;
        return (
          <div ref={panelRef} className="mt-8 scroll-mt-28">
            <div className="mb-6">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{leg.city}</p>
              <h2 className="text-2xl font-bold leading-tight">{leg.days} {leg.days === 1 ? 'day' : 'days'} in {leg.city}</h2>
              {leg.summary && <p className="text-foreground/70 text-sm leading-relaxed mt-1.5 max-w-2xl">{leg.summary}</p>}
            </div>
            {leg.hotelPick ? (
              <div className="mb-6">
                <HotelCard hotel={leg.hotelPick} city={leg.city} />
              </div>
            ) : leg.hotelSearchUrl && (
              <div className="mb-6">
                <SearchLinkCard href={leg.hotelSearchUrl} icon={Bed} label={`Where to stay in ${leg.city}`} title="Search hotels on Booking.com" />
              </div>
            )}
            <div className="flex flex-col gap-10">
              {(leg.dayPlans || []).map((dp) => {
                const slotByPeriod = Object.fromEntries((dp.slots || []).map((s) => [s.period, s]));
                return (
                  <div key={dp.day} ref={(el) => { dayRefs.current[dp.day] = el; }} className="scroll-mt-28">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white font-bold text-sm shrink-0">
                        {dp.day}
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{leg.city} · Day {dp.day}</p>
                        {dp.theme && <h3 className="text-lg font-bold leading-tight">{dp.theme}</h3>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {PERIODS.map((period) => {
                        const slot = slotByPeriod[period];
                        return slot ? (
                          <ActivityCard key={period} slot={slot} />
                        ) : (
                          <EmptySlot key={period} period={period} />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {legs[i + 1] && (leg.transferToNext ? (
              <div className="mt-8">
                <TransferCard transfer={leg.transferToNext} fromCity={leg.city} toCity={legs[i + 1].city} />
              </div>
            ) : leg.flightSearchUrl && (
              <div className="mt-8">
                <SearchLinkCard href={leg.flightSearchUrl} icon={Plane} label={`${leg.city} → ${legs[i + 1].city}`} title="Search flights on Google Flights" />
              </div>
            ))}
            {legs.length > 1 && (
              <div className="flex justify-between gap-3 mt-10 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => goToCity(i - 1)}
                  disabled={i === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm font-semibold hover:border-primary transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                  ← {legs[i - 1]?.city}
                </button>
                <button
                  type="button"
                  onClick={() => goToCity(i + 1)}
                  disabled={i === legs.length - 1}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm font-semibold hover:border-primary transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                  {legs[i + 1]?.city} →
                </button>
              </div>
            )}
          </div>
        );
      })()}

      {/* The natural next step after seeing a full plan mapped out: hand it
          to us to firm up and turn into real bookings, rather than doing
          that legwork solo. Links straight into the concierge page with the
          $20 tier pre-selected (?tier=trip_package) so there's no picking
          through the other relocation-focused tiers to find it. */}
      <div className="mt-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 sm:p-8 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
          <CalendarCheck className="w-3.5 h-3.5" /> Next step
        </span>
        <h2 className="text-xl font-bold mb-2">Want us to firm this up and book it for you?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-lg mx-auto">
          Send us this trip and we&apos;ll turn it into a day-by-day plan with real hotel picks and direct booking links for every activity — ready to book in a couple of clicks.
        </p>
        <Link
          href="/concierge?tier=trip_package"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold hover:scale-[1.02] transition-transform"
        >
          Get my trip package plan — $20 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-semibold hover:border-primary transition-colors"
        >
          Rebuild itinerary
        </Link>
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-semibold hover:border-primary transition-colors"
        >
          Browse all activities
        </Link>
      </div>

      <style jsx>{`
        /* Everything stacks top-to-bottom and centered, so the whole map is
           always visible with an ordinary vertical scroll -- no 2D panning
           or pinch-zooming needed, which is what makes a circular diagram
           unusable on a phone. */
        .mindmap-vertical {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid hsl(var(--border));
          border-radius: 20px;
          background: hsl(var(--card) / 0.4);
          padding: 28px 16px;
        }
        .mindmap-trunk {
          width: 2px;
          height: 22px;
          background: hsl(var(--border));
        }
        .mindmap-branch {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .mindmap-branch-stem {
          width: 2px;
          height: 20px;
        }
        .mindmap-node {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .mindmap-root-v {
          padding: 12px 22px;
          border-radius: 9999px;
          background: hsl(var(--primary));
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          box-shadow: 0 6px 20px hsl(var(--primary) / 0.35);
        }
        .mindmap-city-v {
          padding: 10px 18px;
          border-radius: 14px;
          border: 2px solid;
          background: hsl(var(--card));
          box-shadow: 0 2px 10px rgb(0 0 0 / 0.06);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .mindmap-city-v:hover {
          transform: scale(1.03);
        }
        .mindmap-city-v > span {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
          text-align: left;
        }
        .mindmap-city-name {
          font-weight: 700;
          font-size: 0.95rem;
        }
        .mindmap-city-days {
          font-size: 0.62rem;
          color: hsl(var(--muted-foreground));
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .mindmap-day-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          max-width: 32rem;
          margin-top: 16px;
          padding: 14px;
          border-radius: 16px;
          border: 1.5px dashed;
        }
        .mindmap-day {
          padding: 6px 13px;
          border-radius: 9999px;
          border: 2px solid;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
        }
        .mindmap-day:hover {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}
