// Reads the AI-generated itinerary (built by /api/generate-itinerary and
// saved by OnboardingWizard.jsx) out of sessionStorage and displays it as a
// mind map: a root "trip" node branching to one node per city (for a
// multi-stop trip like Istanbul -> Izmir), each city branching to a row of
// day chips, and clicking a day chip opens that day's Morning/Afternoon/
// Evening activity cards (photo, price, rating) below the map. A
// single-city trip is just a one-branch version of the same tree.

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MapPin, ArrowRight, Sun, Sunset, Moon, Star, Clock, Info } from 'lucide-react';

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

// A gentle inward quadratic curve from (x1,y1) to (x2,y2) -- pulling the
// control point slightly toward the diagram's center (50,50) is what gives
// mind-map connectors their organic, non-straight-line look.
function curvePath(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const cx = mx + (50 - mx) * 0.25;
  const cy = my + (50 - my) * 0.25;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

// Places every node on a 0-100 x 0-100 circular grid: the trip root sits at
// the center, city nodes fan out evenly around it (this is what makes it
// read as a mind map rather than a top-down tree), and each city's day
// chips fan out further still in a small arc around their city, angled
// away from the center so they never point back through it.
function computeRadialLayout(legs) {
  const n = Math.max(legs.length, 1);
  const cityRadius = 30;
  const dayRadius = 46;
  return legs.map((leg, i) => {
    const angleCity = (360 / n) * i - 90;
    const rad = (angleCity * Math.PI) / 180;
    const cx = 50 + cityRadius * Math.cos(rad);
    const cy = 50 + cityRadius * Math.sin(rad);

    const days = leg.dayPlans || [];
    const m = days.length;
    const spread = Math.min(80, Math.max(26, m * 12));
    const dayNodes = days.map((dp, j) => {
      const t = m === 1 ? 0 : j / (m - 1) - 0.5;
      const angleDay = angleCity + t * spread;
      const dRad = (angleDay * Math.PI) / 180;
      return {
        dp,
        x: 50 + dayRadius * Math.cos(dRad),
        y: 50 + dayRadius * Math.sin(dRad),
      };
    });
    return { leg, index: i, cx, cy, dayNodes };
  });
}

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState(undefined); // undefined = loading, null = none found
  const [selectedDay, setSelectedDay] = useState({}); // { [legIndex]: dayNumber }

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

  const layout = computeRadialLayout(legs);
  const diagramSize = Math.max(560, Math.min(1100, legs.length * 130 + 420));

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

      {/* Radial mind map: Trip at the center, one colored branch per city
          fanning out around it, and each city's days fanning out further
          still. The whole map is visible at once (no single-row scroll) --
          it scales down to fit, and pans/zooms via the browser on very
          small screens if the trip has many cities. */}
      <div className="mindmap-wrap mt-10">
        <div className="mindmap-radial" style={{ width: diagramSize, height: diagramSize }}>
          <svg className="mindmap-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            {layout.map(({ cx, cy, index, dayNodes }) => (
              <g key={`lines-${index}`}>
                <path
                  d={curvePath(50, 50, cx, cy)}
                  fill="none"
                  stroke={branchColor(index, 0.85)}
                  strokeWidth="0.6"
                  strokeLinecap="round"
                />
                {dayNodes.map(({ dp, x, y }) => (
                  <path
                    key={`line-${index}-${dp.day}`}
                    d={curvePath(cx, cy, x, y)}
                    fill="none"
                    stroke={branchColor(index, 0.4)}
                    strokeWidth="0.35"
                    strokeLinecap="round"
                  />
                ))}
              </g>
            ))}
          </svg>

          <div className="mindmap-node mindmap-root" style={{ left: '50%', top: '50%' }}>
            <Sparkles className="w-4 h-4" /> Trip
          </div>

          {layout.map(({ leg, index, cx, cy, dayNodes }) => (
            <div key={`${leg.city}-${index}`}>
              <div
                className="mindmap-node mindmap-city"
                style={{
                  left: `${cx}%`,
                  top: `${cy}%`,
                  borderColor: branchColor(index),
                  background: branchColor(index, 0.1),
                }}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: branchColor(index) }} />
                <span>
                  <span className="mindmap-city-name">{leg.city}</span>
                  <span className="mindmap-city-days">{leg.days} {leg.days === 1 ? 'day' : 'days'}</span>
                </span>
              </div>
              {dayNodes.map(({ dp, x, y }) => {
                const active = selectedDay[index] === dp.day;
                return (
                  <button
                    key={`${leg.city}-${index}-${dp.day}`}
                    type="button"
                    onClick={() => setSelectedDay((s) => ({ ...s, [index]: dp.day }))}
                    className="mindmap-node mindmap-day"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      borderColor: branchColor(index, active ? 1 : 0.55),
                      background: active ? branchColor(index, 0.16) : 'hsl(var(--card))',
                      color: active ? branchColor(index) : undefined,
                    }}
                  >
                    Day {dp.day}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Expanded panel for whichever day is selected in each city branch. */}
      <div className="flex flex-col gap-10 mt-8">
        {legs.map((leg, i) => {
          const dp = (leg.dayPlans || []).find((d) => d.day === selectedDay[i]);
          if (!dp) return null;
          const slotByPeriod = Object.fromEntries((dp.slots || []).map((s) => [s.period, s]));
          return (
            <div key={`${leg.city}-${i}-panel`}>
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

      <div className="mt-10 flex flex-wrap gap-3 justify-center">
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
        /* The diagram is square and sized in px (computed above from the
           city count) so the 0-100 percent coordinate math produces a true
           circle. The outer wrap scrolls/centers it -- on a small screen
           with many cities the user pans and pinch-zooms instead of the
           diagram being squeezed unreadably thin. */
        .mindmap-wrap {
          overflow: auto;
          border: 1px solid hsl(var(--border));
          border-radius: 20px;
          background: hsl(var(--card) / 0.4);
          padding: 24px;
          display: flex;
          justify-content: center;
        }
        .mindmap-radial {
          position: relative;
          flex-shrink: 0;
        }
        .mindmap-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .mindmap-node {
          position: absolute;
          transform: translate(-50%, -50%);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .mindmap-root {
          padding: 14px 22px;
          border-radius: 9999px;
          background: hsl(var(--primary));
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          box-shadow: 0 6px 20px hsl(var(--primary) / 0.35);
          z-index: 2;
        }
        .mindmap-city {
          padding: 10px 16px;
          border-radius: 14px;
          border: 2px solid;
          background: hsl(var(--card));
          box-shadow: 0 2px 10px rgb(0 0 0 / 0.06);
          z-index: 1;
        }
        .mindmap-city > span {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
          text-align: left;
        }
        .mindmap-city-name {
          font-weight: 700;
          font-size: 0.9rem;
        }
        .mindmap-city-days {
          font-size: 0.62rem;
          color: hsl(var(--muted-foreground));
          text-transform: uppercase;
          letter-spacing: 0.04em;
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
          transform: translate(-50%, -50%) scale(1.08);
        }
      `}</style>
    </div>
  );
}
