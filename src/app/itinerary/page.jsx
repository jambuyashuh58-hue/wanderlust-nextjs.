// Reads the AI-generated itinerary (built by /api/generate-itinerary and
// saved by OnboardingWizard.jsx) out of sessionStorage and displays it
// day by day, with the AI's overall summary and its per-slot reasoning.

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, ArrowRight, Sun, Sunset, Moon } from 'lucide-react';

const PERIOD_ICON = { morning: Sun, afternoon: Sunset, evening: Moon };
const PERIOD_LABEL = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' };

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState(undefined); // undefined = loading, null = none found

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('wanderlust_itinerary');
      setItinerary(raw ? JSON.parse(raw) : null);
    } catch {
      setItinerary(null);
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

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 pt-32 md:pt-40">
      <div className="flex items-center gap-2 mb-3 text-primary">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-semibold uppercase tracking-wider">Your AI-planned itinerary</span>
      </div>
      <h1 className="text-3xl font-bold mb-3">
        {itinerary.days} {itinerary.days === 1 ? 'day' : 'days'} in {itinerary.city}
      </h1>
      {itinerary.summary && (
        <p className="text-foreground/80 text-lg leading-relaxed mb-10">{itinerary.summary}</p>
      )}

      <div className="flex flex-col gap-8">
        {(itinerary.dayPlans || []).map((dp) => (
          <div key={dp.day}>
            <h2 className="text-lg font-bold mb-3">Day {dp.day}</h2>
            {(!dp.slots || dp.slots.length === 0) ? (
              <p className="text-sm text-muted-foreground">No matching activities found for this day yet -- browse the full list instead.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {dp.slots.map((slot, i) => {
                  const Icon = PERIOD_ICON[slot.period] || MapPin;
                  const a = slot.activity;
                  return (
                    <Link
                      key={`${dp.day}-${slot.period}-${i}`}
                      href={`/activity/${a.id}`}
                      className="flex items-start gap-4 px-5 py-4 rounded-xl border border-border bg-card hover:border-primary transition-colors"
                    >
                      <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0 w-16">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{PERIOD_LABEL[slot.period]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{a.title || a.name}</p>
                        <p className="text-xs text-muted-foreground mb-1">{a.category}</p>
                        {slot.note && <p className="text-sm text-foreground/70 leading-snug">{slot.note}</p>}
                      </div>
                      <ArrowRight className="w-4 h-4 shrink-0 mt-1" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
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
    </div>
  );
}
