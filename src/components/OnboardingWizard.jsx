'use client';
// New component -- multi-step "Plan My Trip" wizard. Builds a rule-based
// itinerary client-side from the cities/activities already loaded by the
// server page (no extra fetches, no LLM dependency), saves it to
// sessionStorage, then routes to /itinerary to display it.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

const INTERESTS = ['Museums', 'Historic Sites', 'Food Experiences', 'Boat Tours', 'Hidden Gems', 'Night Activities'];
const PACE_OPTIONS = [
  { value: 'relaxed', label: 'Relaxed (2-3 stops/day)', perDay: 2 },
  { value: 'balanced', label: 'Balanced (3-4 stops/day)', perDay: 3 },
  { value: 'packed', label: 'Packed (5+ stops/day)', perDay: 5 },
];

function buildItinerary({ city, days, interests, pace, activities }) {
  const perDay = PACE_OPTIONS.find((p) => p.value === pace)?.perDay || 3;
  const cityLower = (city || '').toLowerCase();

  const pool = (activities || []).filter((a) => {
    const cityMatch = !a.city_name || a.city_name.toLowerCase() === cityLower;
    const interestMatch = interests.length === 0 || interests.includes(a.category);
    return cityMatch && interestMatch;
  });

  // Sort best-first by rating so earlier days get the strongest picks.
  const sorted = [...pool].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const dayPlans = [];
  let cursor = 0;
  for (let d = 1; d <= days; d++) {
    const dayActivities = sorted.slice(cursor, cursor + perDay);
    cursor += perDay;
    dayPlans.push({ day: d, activities: dayActivities });
  }
  return { city, days, interests, pace, dayPlans, generatedAt: new Date().toISOString() };
}

export default function OnboardingWizard({ cities = [], activities = [] }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ city: '', days: 3, interests: [], pace: 'balanced' });
  const [submitting, setSubmitting] = useState(false);

  const steps = ['city', 'days', 'interests', 'pace'];
  const totalSteps = steps.length;

  function toggleInterest(cat) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(cat)
        ? f.interests.filter((c) => c !== cat)
        : [...f.interests, cat],
    }));
  }

  function next() {
    if (step < totalSteps - 1) setStep(step + 1);
    else finish();
  }
  function back() {
    if (step > 0) setStep(step - 1);
  }

  function finish() {
    setSubmitting(true);
    const itinerary = buildItinerary({ ...form, activities });
    try {
      sessionStorage.setItem('wanderlust_itinerary', JSON.stringify(itinerary));
    } catch {
      // sessionStorage unavailable (e.g. private mode) -- fall back to a
      // query param so /itinerary can still render something.
    }
    router.push('/itinerary');
  }

  const current = steps[step];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 pt-32 md:pt-40">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-semibold uppercase tracking-wider">
          Step {step + 1} of {totalSteps}
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-muted mb-8 overflow-hidden">
        <div className="h-full bg-gradient-primary transition-all" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
      </div>

      {current === 'city' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Where are you headed?</h1>
          <div className="grid grid-cols-2 gap-3">
            {cities.map((c) => (
              <button
                key={c.id || c.name}
                onClick={() => setForm((f) => ({ ...f, city: c.name }))}
                className={`px-4 py-3 rounded-xl border text-left font-medium transition-colors ${
                  form.city === c.name ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </>
      )}

      {current === 'days' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">How many days?</h1>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 5, 7, 10].map((n) => (
              <button
                key={n}
                onClick={() => setForm((f) => ({ ...f, days: n }))}
                className={`px-6 py-3 rounded-xl border font-semibold transition-colors ${
                  form.days === n ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary'
                }`}
              >
                {n} {n === 1 ? 'day' : 'days'}
              </button>
            ))}
          </div>
        </>
      )}

      {current === 'interests' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">What are you into?</h1>
          <p className="text-sm text-muted-foreground mb-6">Pick as many as you like -- or none, for a mixed itinerary.</p>
          <div className="flex flex-wrap gap-3">
            {INTERESTS.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleInterest(cat)}
                className={`px-4 py-2.5 rounded-full border font-medium transition-colors ${
                  form.interests.includes(cat) ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </>
      )}

      {current === 'pace' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">What pace works for you?</h1>
          <div className="flex flex-col gap-3">
            {PACE_OPTIONS.map((p) => (
              <button
                key={p.value}
                onClick={() => setForm((f) => ({ ...f, pace: p.value }))}
                className={`text-left px-5 py-4 rounded-xl border font-medium transition-colors ${
                  form.pace === p.value ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="flex items-center justify-between mt-10">
        {step > 0 ? (
          <button onClick={back} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <span />}
        <button
          onClick={next}
          disabled={(current === 'city' && !form.city) || submitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold disabled:opacity-50"
        >
          {step === totalSteps - 1 ? 'Build my itinerary' : 'Next'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
