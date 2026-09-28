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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 pt-32 md:pt-40">
      <div className="flex items-center justify-center gap-2 mb-3 text-primary">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-semibold uppercase tracking-wider">Your AI-planned trip map</span>
      </div>
      <h1 className="text-3xl font-bold mb-3 text-center">{tripLabel}</h1>
      {itinerary.summary && (
        <p className="text-foreground/80 text-lg leading-relaxed mb-4 text-center max-w-2xl mx-auto">{itinerary.summary}</p>
      )}
      {itinerary.note && (
        <p className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-500/10 rounded-lg px-4 py-3 mb-6 max-w-2xl mx-auto">
          <Info className="w-4 h-4 shrink-0 mt-0.5" /> {itinerary.note}
        </p>
      )}

      {/* Mind map: Trip -> City -> Day. Click a day chip to open it below. */}
      <div className="mindmap-scroll overflow-x-auto -mx-4 px-4 mt-10 pb-2">
        <ul className="tree">
          <li>
            <div className="node root-node">
              <Sparkles className="w-3.5 h-3.5" /> Trip
            </div>
            {legs.length > 0 && (
              <ul>
                {legs.map((leg, i) => (
                  <li key={`${leg.city}-${i}`}>
                    <div className="node city-node">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>
                        <span className="city-name">{leg.city}</span>
                        <span className="city-days">{leg.days} {leg.days === 1 ? 'day' : 'days'}</span>
                      </span>
                    </div>
                    {leg.dayPlans?.length > 0 && (
                      <ul>
                        {leg.dayPlans.map((dp) => (
                          <li key={dp.day}>
                            <button
                              type="button"
                              onClick={() => setSelectedDay((s) => ({ ...s, [i]: dp.day }))}
                              className={`node day-node ${selectedDay[i] === dp.day ? 'day-node--active' : ''}`}
                            >
                              Day {dp.day}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
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
        .tree, .tree ul, .tree li {
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
        }
        .tree {
          display: inline-flex;
          justify-content: center;
          min-width: 100%;
        }
        .tree ul {
          display: flex;
          padding-top: 28px;
          position: relative;
        }
        .tree li {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 14px 0;
          position: relative;
        }
        .tree li::before,
        .tree li::after {
          content: '';
          position: absolute;
          top: 0;
          right: 50%;
          border-top: 1px solid hsl(var(--border));
          width: 50%;
          height: 28px;
        }
        .tree li::after {
          right: auto;
          left: 50%;
          border-left: 1px solid hsl(var(--border));
        }
        .tree li:only-child::after,
        .tree li:only-child::before {
          display: none;
        }
        .tree li:only-child {
          padding-top: 0;
        }
        .tree li:first-child::before,
        .tree li:last-child::after {
          border: 0 none;
        }
        .tree li:last-child::before {
          border-right: 1px solid hsl(var(--border));
          border-radius: 0 6px 0 0;
        }
        .tree li:first-child::after {
          border-radius: 6px 0 0 0;
        }
        .tree ul ul::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          border-left: 1px solid hsl(var(--border));
          width: 0;
          height: 28px;
        }
        .node {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .root-node {
          padding: 10px 18px;
          border-radius: 9999px;
          background: hsl(var(--primary));
          color: white;
          font-weight: 700;
          font-size: 0.875rem;
        }
        .city-node {
          padding: 10px 16px;
          border-radius: 14px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
        }
        .city-node > span {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
          text-align: left;
        }
        .city-name {
          font-weight: 700;
          font-size: 0.9rem;
        }
        .city-days {
          font-size: 0.65rem;
          color: hsl(var(--muted-foreground));
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .day-node {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease;
        }
        .day-node:hover {
          border-color: hsl(var(--primary));
        }
        .day-node--active {
          border-color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.1);
          color: hsl(var(--primary));
        }
      `}</style>
    </div>
  );
}
