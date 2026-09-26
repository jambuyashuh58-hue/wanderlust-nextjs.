// New page -- /itinerary. Reads the itinerary built by OnboardingWizard.jsx
// out of sessionStorage (client-only, hence 'use client' + no server data
// fetching here) and displays it day by day.

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';

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
          Answer a few quick questions and we&apos;ll build one for you.
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
        <MapPin className="w-4 h-4" />
        <span className="text-sm font-semibold uppercase tracking-wider">Your itinerary</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">
        {itinerary.days} {itinerary.days === 1 ? 'day' : 'days'} in {itinerary.city}
      </h1>
      <p className="text-muted-foreground mb-10">
        {itinerary.interests?.length ? `Focused on ${itinerary.interests.join(', ')}.` : 'A mixed itinerary of the best-rated activities.'}
      </p>

      <div className="flex flex-col gap-8">
        {(itinerary.dayPlans || []).map((dp) => (
          <div key={dp.day}>
            <h2 className="text-lg font-bold mb-3">Day {dp.day}</h2>
            {dp.activities.length === 0 ? (
              <p className="text-sm text-muted-foreground">No matching activities found for this day yet -- browse the full list instead.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {dp.activities.map((a) => (
                  <Link
                    key={a.id}
                    href={`/activity/${a.id}`}
                    className="flex items-center justify-between px-5 py-4 rounded-xl border border-border bg-card hover:border-primary transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-sm">{a.title || a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.category}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>
                ))}
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
