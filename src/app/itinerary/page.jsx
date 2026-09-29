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
import Image from 'next/image';
import { Sparkles, MapPin, ArrowRight, Sun, Sunset, Moon, Star, Clock, Info, CalendarCheck } from 'lucide-react';

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
          <Image src={a.image_url} alt={a.title || a.name || ''} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
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
      </div>
    </Link>
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
  const [selectedDay, setSelectedDay] = useState({}); // { [legIndex]: dayNumber }
  const panelRefs = useRef({}); // { [legIndex]: HTMLElement } -- for city-click "jump to this city's itinerary"

  useEffect(() => {
    let parsed = null;
    try {
      const raw = sessionStorage.getItem('wanderlust_itinerary');
      parsed = raw ? JSON.parse(raw) : null;
    } catch {
      parsed = null;
    }
    setItinerary(parsed);
    if (parsed) {
      const legs = getLegs(parsed);
      const initial = {};
      legs.forEach((leg, i) => {
        if (leg.dayPlans?.length) initial[i] = leg.dayPlans[0].day;
      });
      setSelectedDay(initial);
    }
  }, []);

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

  // Clicking a city node jumps straight to that city's itinerary panel
  // below (making sure a day is actually selected first, in case a leg
  // somehow has none pre-selected).
  function handleCityClick(i, leg) {
    setSelectedDay((s) => (s[i] ? s : { ...s, [i]: leg.dayPlans?.[0]?.day }));
    requestAnimationFrame(() => {
      panelRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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

        {legs.map((leg, i) => (
          <div key={`${leg.city}-${i}`} className="mindmap-branch">
            <div className="mindmap-branch-stem" style={{ background: branchColor(i) }} />
            <button
              type="button"
              onClick={() => handleCityClick(i, leg)}
              className="mindmap-node mindmap-city-v"
              style={{ borderColor: branchColor(i), background: branchColor(i, 0.1) }}
            >
              <MapPin className="w-4 h-4 shrink-0" style={{ color: branchColor(i) }} />
              <span>
                <span className="mindmap-city-name">{leg.city}</span>
                <span className="mindmap-city-days">{leg.days} {leg.days === 1 ? 'day' : 'days'} · tap for itinerary</span>
              </span>
            </button>
            {leg.dayPlans?.length > 0 && (
              <div className="mindmap-day-row" style={{ borderColor: branchColor(i, 0.35) }}>
                {leg.dayPlans.map((dp) => {
                  const active = selectedDay[i] === dp.day;
                  return (
                    <button
                      key={dp.day}
                      type="button"
                      onClick={() => setSelectedDay((s) => ({ ...s, [i]: dp.day }))}
                      className="mindmap-node mindmap-day"
                      style={{
                        borderColor: branchColor(i, active ? 1 : 0.5),
                        background: active ? branchColor(i, 0.16) : 'hsl(var(--card))',
                        color: active ? branchColor(i) : undefined,
                      }}
                    >
                      Day {dp.day}
                    </button>
                  );
                })}
              </div>
            )}
            {i < legs.length - 1 && <div className="mindmap-trunk" />}
          </div>
        ))}
      </div>

      {/* Expanded panel for whichever day is selected in each city branch. */}
      <div className="flex flex-col gap-10 mt-8">
        {legs.map((leg, i) => {
          const dp = (leg.dayPlans || []).find((d) => d.day === selectedDay[i]);
          if (!dp) return null;
          const slotByPeriod = Object.fromEntries((dp.slots || []).map((s) => [s.period, s]));
          return (
            <div key={`${leg.city}-${i}-panel`} ref={(el) => { panelRefs.current[i] = el; }} className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white font-bold text-sm shrink-0">
                  {dp.day}
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{leg.city} · Day {dp.day}</p>
                  {dp.theme && <h2 className="text-lg font-bold leading-tight">{dp.theme}</h2>}
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
