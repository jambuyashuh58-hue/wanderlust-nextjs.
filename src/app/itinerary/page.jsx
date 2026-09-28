// Reads the AI-generated itinerary (built by /api/generate-itinerary and
// saved by OnboardingWizard.jsx) out of sessionStorage and displays it
// day by day, as a card grid (numbered day badge + theme, then a
// Morning/Afternoon/Evening row of activity cards with photo, price and
// rating) matching the old Base44 site's itinerary view.

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MapPin, ArrowRight, Sun, Sunset, Moon, Star, Clock, Info } from 'lucide-react';

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

  const periods = ['morning', 'afternoon', 'evening'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 pt-32 md:pt-40">
      <div className="flex items-center gap-2 mb-3 text-primary">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-semibold uppercase tracking-wider">Your AI-planned itinerary</span>
      </div>
      <h1 className="text-3xl font-bold mb-3">
        {itinerary.firstName ? `${itinerary.firstName}'s ` : ''}
        {itinerary.days} {itinerary.days === 1 ? 'day' : 'days'} in {itinerary.city}
      </h1>
      {itinerary.summary && (
        <p className="text-foreground/80 text-lg leading-relaxed mb-4">{itinerary.summary}</p>
      )}
      {itinerary.note && (
        <p className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-500/10 rounded-lg px-4 py-3 mb-6">
          <Info className="w-4 h-4 shrink-0 mt-0.5" /> {itinerary.note}
        </p>
      )}

      <div className="flex flex-col gap-10 mt-6">
        {(itinerary.dayPlans || []).map((dp) => {
          const slotByPeriod = Object.fromEntries((dp.slots || []).map((s) => [s.period, s]));
          return (
            <div key={dp.day}>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white font-bold text-sm shrink-0">
                  {dp.day}
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Day {dp.day}</p>
                  {dp.theme && <h2 className="text-lg font-bold leading-tight">{dp.theme}</h2>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {periods.map((period) => {
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
