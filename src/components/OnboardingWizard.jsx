'use client';
// Multi-step "Plan My Trip" wizard. Restored to match the old Base44 site's
// full onboarding flow (name, gender, age group, travel type, children,
// interests, pace, budget, current location, destination, travel dates,
// accessibility, contact) now that a real LLM-backed endpoint
// (/api/generate-itinerary) exists to consume all of it. Falls back to the
// rule-based local picker if the AI call fails, so the flow never dead-ends.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Sparkles, Loader2, MapPin } from 'lucide-react';

const INTERESTS = ['Museums', 'Historic Sites', 'Food Experiences', 'Boat Tours', 'Hidden Gems', 'Night Activities'];
const PACE_OPTIONS = [
  { value: 'relaxed', label: 'Relaxed (2-3 stops/day)', perDay: 2 },
  { value: 'balanced', label: 'Balanced (3-4 stops/day)', perDay: 3 },
  { value: 'packed', label: 'Packed (5+ stops/day)', perDay: 5 },
];
const TRAVELLING_AS_OPTIONS = ['Solo', 'Couple', 'Family', 'Friends', 'Business', 'Student'];
const ACCESSIBILITY_OPTIONS = ['No Preference', 'Family Friendly', 'Reduced Mobility'];
const GENDER_OPTIONS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
const AGE_GROUPS = ['18-24', '25-34', '35-44', '45-54', '55+'];
const QUICK_DAY_OPTIONS = [1, 2, 3, 5, 7, 10, 14];
// Keep in sync with MAX_DAYS in /api/generate-itinerary/route.js -- the API
// clamps to this too, but capping it here as well means the wizard is
// honest about it up front rather than silently shortening the trip later.
const MAX_DAYS = 14;

function daysBetween(start, end) {
  if (!start || !end) return null;
  const s = new Date(start);
  const e = new Date(end);
  const diff = Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
  if (diff <= 0) return null;
  return Math.min(diff, MAX_DAYS);
}

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

const STEPS = ['name', 'gender', 'ageGroup', 'travellingAs', 'children', 'interests', 'pace', 'budget', 'currentLocation', 'destination', 'dates', 'accessibility', 'contact'];

export default function OnboardingWizard({ cities = [], activities = [] }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: '', gender: '', ageGroup: '',
    travellingAs: '', hasChildren: null, numChildren: '', childrenAges: '',
    interests: [], pace: 'balanced',
    budget: 2000,
    currentLocation: '', locating: false,
    city: '', days: 3, dateStart: '', dateEnd: '',
    accessibility: 'No Preference',
    email: '', newsletterOptIn: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const totalSteps = STEPS.length;
  const current = STEPS[step];

  function toggleInterest(cat) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(cat)
        ? f.interests.filter((c) => c !== cat)
        : [...f.interests, cat],
    }));
  }

  function pickDays(n) {
    setForm((f) => ({ ...f, days: n, dateStart: '', dateEnd: '' }));
  }

  function setDate(which, value) {
    setForm((f) => {
      const next = { ...f, [which]: value };
      const computed = daysBetween(
        which === 'dateStart' ? value : f.dateStart,
        which === 'dateEnd' ? value : f.dateEnd
      );
      if (computed) next.days = computed;
      return next;
    });
  }

  function detectLocation() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setForm((f) => ({ ...f, currentLocation: '' }));
      return;
    }
    setForm((f) => ({ ...f, locating: true }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((f) => ({ ...f, currentLocation: `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`, locating: false }));
      },
      () => setForm((f) => ({ ...f, locating: false })),
      { timeout: 8000 }
    );
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

    const travelDates = form.dateStart && form.dateEnd ? `${form.dateStart} to ${form.dateEnd}` : '';

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
          firstName: form.firstName || undefined,
          email: form.email || undefined,
          gender: form.gender || undefined,
          ageGroup: form.ageGroup || undefined,
          hasChildren: form.hasChildren === null ? undefined : form.hasChildren,
          numChildren: form.hasChildren && form.numChildren ? Number(form.numChildren) : undefined,
          childrenAges: form.hasChildren ? form.childrenAges || undefined : undefined,
          currentLocation: form.currentLocation || undefined,
          travelDates: travelDates || undefined,
          newsletterOptIn: form.newsletterOptIn,
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

    itinerary.firstName = form.firstName || undefined;

    try {
      sessionStorage.setItem('wanderlust_itinerary', JSON.stringify(itinerary));
    } catch {
      // sessionStorage unavailable (e.g. private mode) -- itinerary still
      // renders for this navigation via the router push below in most cases.
    }
    setSubmitting(false);
    router.push('/itinerary');
  }

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

      {current === 'name' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">What should we call you?</h1>
          <p className="text-sm text-muted-foreground mb-6">Optional — just for a personal touch on your itinerary.</p>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            placeholder="Your first name"
            className="w-full px-5 py-3.5 rounded-xl border border-border bg-card font-medium focus:outline-none focus:border-primary"
          />
        </>
      )}

      {current === 'gender' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">What is your gender?</h1>
          <div className="flex flex-wrap gap-3">
            {GENDER_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setForm((f) => ({ ...f, gender: opt }))}
                className={`px-5 py-3 rounded-xl border font-medium transition-colors ${
                  form.gender === opt ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}

      {current === 'ageGroup' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">What age group are you in?</h1>
          <div className="flex flex-wrap gap-3">
            {AGE_GROUPS.map((opt) => (
              <button
                key={opt}
                onClick={() => setForm((f) => ({ ...f, ageGroup: opt }))}
                className={`px-5 py-3 rounded-xl border font-medium transition-colors ${
                  form.ageGroup === opt ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}

      {current === 'travellingAs' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">How are you travelling?</h1>
          <p className="text-sm text-muted-foreground mb-6">Helps the AI pick activities that fit your group.</p>
          <div className="flex flex-wrap gap-3">
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
        </>
      )}

      {current === 'children' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Travelling with children?</h1>
          <div className="flex flex-wrap gap-3 mb-6">
            {[{ label: 'Yes', value: true }, { label: 'No', value: false }].map((opt) => (
              <button
                key={opt.label}
                onClick={() => setForm((f) => ({ ...f, hasChildren: opt.value }))}
                className={`px-6 py-3 rounded-xl border font-semibold transition-colors ${
                  form.hasChildren === opt.value ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {form.hasChildren && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">How many?</label>
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={form.numChildren}
                  onChange={(e) => setForm((f) => ({ ...f, numChildren: e.target.value }))}
                  placeholder="e.g. 2"
                  className="w-full px-5 py-3 rounded-xl border border-border bg-card font-medium focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Their ages (optional)</label>
                <input
                  type="text"
                  value={form.childrenAges}
                  onChange={(e) => setForm((f) => ({ ...f, childrenAges: e.target.value }))}
                  placeholder="e.g. 4, 9"
                  className="w-full px-5 py-3 rounded-xl border border-border bg-card font-medium focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}
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

      {current === 'budget' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">What is your budget?</h1>
          <p className="text-sm text-muted-foreground mb-6">Approximate daily budget, in Turkish Lira (₺).</p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">₺0</span>
            <span className="text-xl font-bold text-primary">₺{Number(form.budget).toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">₺10,000+</span>
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
            className="w-full accent-primary"
          />
        </>
      )}

      {current === 'currentLocation' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Where are you now?</h1>
          <p className="text-sm text-muted-foreground mb-6">Optional — helps us tailor travel-time tips.</p>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={form.currentLocation}
              onChange={(e) => setForm((f) => ({ ...f, currentLocation: e.target.value }))}
              placeholder="e.g. London, UK"
              className="w-full px-5 py-3.5 rounded-xl border border-border bg-card font-medium focus:outline-none focus:border-primary"
            />
            <button
              onClick={detectLocation}
              disabled={form.locating}
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary disabled:opacity-50"
            >
              <MapPin className="w-4 h-4" /> {form.locating ? 'Detecting…' : 'Use my current location'}
            </button>
          </div>
        </>
      )}

      {current === 'destination' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Where are you heading?</h1>
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

      {current === 'dates' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">When are you travelling?</h1>
          <p className="text-sm text-muted-foreground mb-4">Not sure yet? Just pick a trip length. Trips are capped at {MAX_DAYS} days so the AI can plan every day in detail.</p>
          <div className="flex flex-wrap gap-3 mb-6">
            {QUICK_DAY_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => pickDays(n)}
                className={`px-6 py-3 rounded-xl border font-semibold transition-colors ${
                  form.days === n && !form.dateStart ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary'
                }`}
              >
                {n} {n === 1 ? 'day' : 'days'}
              </button>
            ))}
          </div>
          <p className="text-sm font-semibold mb-3">Or set exact dates</p>
          <div className="flex flex-wrap gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Start</label>
              <input
                type="date"
                value={form.dateStart}
                onChange={(e) => setDate('dateStart', e.target.value)}
                className="px-4 py-3 rounded-xl border border-border bg-card font-medium focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">End</label>
              <input
                type="date"
                value={form.dateEnd}
                onChange={(e) => setDate('dateEnd', e.target.value)}
                className="px-4 py-3 rounded-xl border border-border bg-card font-medium focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          {form.dateStart && form.dateEnd && (
            <p className="text-sm text-muted-foreground mt-3">That's {form.days} {form.days === 1 ? 'day' : 'days'}.</p>
          )}
        </>
      )}

      {current === 'accessibility' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Any accessibility needs?</h1>
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

      {current === 'contact' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Stay in the loop</h1>
          <p className="text-sm text-muted-foreground mb-6">Optional — get your itinerary emailed to you and occasional Türkiye travel tips.</p>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className="w-full px-5 py-3.5 rounded-xl border border-border bg-card font-medium focus:outline-none focus:border-primary mb-4"
          />
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.newsletterOptIn}
              onChange={(e) => setForm((f) => ({ ...f, newsletterOptIn: e.target.checked }))}
              className="accent-primary"
            />
            Send me occasional travel tips and updates
          </label>
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
          disabled={(current === 'destination' && !form.city) || submitting}
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
