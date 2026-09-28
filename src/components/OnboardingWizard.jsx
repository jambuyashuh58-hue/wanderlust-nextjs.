'use client';
// Multi-step "Plan My Trip" wizard. Now generates the itinerary via a real
// LLM call (/api/generate-itinerary, backed by Claude) instead of a
// rule-based local picker -- matching the old Base44 site's InvokeLLM-driven
// onboarding wizard. Falls back to the rule-based picker if the AI call
// fails for any reason, so the flow never dead-ends.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';

const INTERESTS = ['Museums', 'Historic Sites', 'Food Experiences', 'Boat Tours', 'Hidden Gems', 'Night Activities'];
const PACE_OPTIONS = [
  { value: 'relaxed', label: 'Relaxed (2-3 stops/day)', perDay: 2 },
  { value: 'balanced', label: 'Balanced (3-4 stops/day)', perDay: 3 },
  { value: 'packed', label: 'Packed (5+ stops/day)', perDay: 5 },
];
const TRAVELLING_AS_OPTIONS = ['Solo', 'Couple', 'Friends', 'Family'];
const ACCESSIBILITY_OPTIONS = ['No Preference', 'Family Friendly', 'Reduced Mobility'];

// Rule-based fallback, used only if the AI call errors out.
function buildFallbackItinerary({ city, days, interests, pace, activities }) {
  const perDay = PACE_OPTIONS.find((p) => p.value === pace)?.perDay || 3;
  const cityLower = (city || '').toLowerCase();
  const periods = ['morning', 'afternoon', 'evening'];

  const pool = (activities || []).filter((a) => {
    const cityMatch = !a.city_name || a.city_name.toLowerCase() === cityLower;
    const interestMatch = interests.length === 0 || interests.includes(a.category);
    return cityMatch && interestMatch;
  });
  const sorted = [...pool].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const dayPlans = [];
  let cursor = 0;
  for (let d = 1; d <= days; d++) {
    const picks = sorted.slice(cursor, cursor + perDay);
    cursor += perDay;
    const slots = picks.map((activity, i) => ({ period: periods[i] || 'evening', note: '', activity }));
    dayPlans.push({ day: d, slots });
  }
  return {
    city, days, interests, pace, dayPlans,
    summary: `A ${pace} ${days}-day itinerary in ${city}, built from the best-rated activities available.`,
    generatedAt: new Date().toISOString(),
  };
}

export default function OnboardingWizard({ cities = [], activities = [] }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    city: '', days: 3, interests: [], pace: 'balanced',
    travellingAs: '', budget: '', accessibility: 'No Preference',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const steps = ['city', 'days', 'interests', 'pace', 'travellingAs', 'budget'];
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

  async function finish() {
    setSubmitting(true);
    setError('');

    let itinerary;
    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: form.city,
          days: form.days,
          interests: form.interests,
          pace: form.pace,
          travellingAs: form.travellingAs || undefined,
          budget: form.budget ? Number(form.budget) : undefined,
          accessibility: form.accessibility,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      itinerary = await res.json();
    } catch (err) {
      // AI call failed -- fall back to the rule-based picker rather than
      // stranding the user, but surface the failure so it's visible.
      setError(`AI planning is temporarily unavailable (${err.message}) — showing a quick pick instead.`);
      itinerary = buildFallbackItinerary({ ...form, activities });
    }

    try {
      sessionStorage.setItem('wanderlust_itinerary', JSON.stringify(itinerary));
    } catch {
      // sessionStorage unavailable (e.g. private mode) -- itinerary still
      // renders for this navigation via the router push below in most cases.
    }
    setSubmitting(false);
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
          <p className="text-sm text-muted-foreground mb-6">Pick as many as you like — or none, for a mixed itinerary.</p>
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

      {current === 'travellingAs' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Who's travelling?</h1>
          <p className="text-sm text-muted-foreground mb-6">Helps the AI pick activities that fit your group.</p>
          <div className="flex flex-wrap gap-3 mb-6">
            {TRAVELLING_AS_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setForm((f) => ({ ...f, travellingAs: opt }))}
                className={`px-5 py-3 rounded-xl border font-medium transition-colors ${
                  form.travellingAs === opt ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="text-sm font-semibold mb-3">Any accessibility needs?</p>
          <div className="flex flex-wrap gap-3">
            {ACCESSIBILITY_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setForm((f) => ({ ...f, accessibility: opt }))}
                className={`px-4 py-2.5 rounded-full border font-medium transition-colors ${
                  form.accessibility === opt ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card hover:border-primary'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}

      {current === 'budget' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Daily budget? (optional)</h1>
          <p className="text-sm text-muted-foreground mb-6">In Turkish Lira (TRY). Leave blank if you're not sure yet.</p>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
            placeholder="e.g. 2000"
            className="w-full px-5 py-3.5 rounded-xl border border-border bg-card font-medium focus:outline-none focus:border-primary"
          />
        </>
      )}

      {error && (
        <p className="mt-6 text-sm text-amber-600 dark:text-amber-400">{error}</p>
      )}

      <div className="flex items-center justify-between mt-10">
        {step > 0 ? (
          <button onClick={back} disabled={submitting} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <span />}
        <button
          onClick={next}
          disabled={(current === 'city' && !form.city) || submitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold disabled:opacity-50"
        >
          {submitting ? (
            <>Building your trip <Loader2 className="w-4 h-4 animate-spin" /></>
          ) : (
            <>{step === totalSteps - 1 ? 'Build my itinerary' : 'Next'} <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}
