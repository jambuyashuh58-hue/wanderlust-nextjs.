'use client';
// New component -- 7-step relocation quiz, rule-based (no LLM call, matches
// the old site's approach: a pure function maps answers to a recommendation,
// no backend round-trip needed). Collection links are matched by keyword
// against the real `collections` passed in from the server page, so nothing
// here can point at a dead/fabricated slug.

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

const QUESTIONS = [
  {
    key: 'purpose',
    q: 'What brings you to Türkiye?',
    options: [
      { value: 'visiting', label: 'Just visiting' },
      { value: 'exploring', label: 'Thinking about moving here' },
      { value: 'relocating', label: 'Already relocating' },
    ],
  },
  {
    key: 'timeframe',
    q: 'How long are you staying?',
    options: [
      { value: 'days', label: 'A few days' },
      { value: 'weeks', label: 'A few weeks' },
      { value: 'months', label: 'A few months' },
      { value: 'indefinite', label: 'Indefinitely' },
    ],
  },
  {
    key: 'visa',
    q: 'Where are you with your visa / residence permit?',
    options: [
      { value: 'none', label: "Haven't looked into it yet" },
      { value: 'evisa', label: 'Have an e-Visa, nothing more' },
      { value: 'applying', label: 'Need to apply for ikamet (residence permit)' },
      { value: 'have_ikamet', label: 'Already have my ikamet' },
    ],
  },
  {
    key: 'priority',
    q: 'What matters most right now?',
    options: [
      { value: 'activities', label: 'Things to see and do' },
      { value: 'housing', label: 'Finding a place to live' },
      { value: 'visa', label: 'Sorting out visa paperwork' },
      { value: 'budget', label: 'Keeping costs down' },
    ],
  },
];

function findCollection(collections, keywords) {
  const lower = (s) => (s || '').toLowerCase();
  return collections.find((c) => keywords.some((k) => lower(c.title).includes(k) || lower(c.slug).includes(k)));
}

function getRecommendation(answers, collections) {
  const { purpose, timeframe, visa, priority } = answers;

  if (priority === 'visa' || visa === 'none' || visa === 'applying') {
    return {
      headline: "Let's sort your visa route first.",
      body: 'The paperwork is the part that actually blocks people — everything else can wait.',
      collection: findCollection(collections, ['visa', 'ikamet', 'residence']),
      guideHref: '/guides/visa',
      concierge: timeframe === 'indefinite' || purpose === 'relocating' ? 'full' : 'paperwork',
    };
  }

  if (priority === 'housing') {
    return {
      headline: "Let's find you a place to live.",
      body: 'Foreigner-friendly housing in Türkiye has its own quirks — here\'s where to start.',
      collection: findCollection(collections, ['housing', 'apartment', 'rent']),
      guideHref: '/guides/housing',
      concierge: 'apartment',
    };
  }

  if (priority === 'budget') {
    return {
      headline: 'Here\'s how to see Türkiye without overspending.',
      body: 'Real numbers on what things cost, plus budget-friendly activity picks.',
      collection: findCollection(collections, ['budget', 'under', 'cheap', 'cost']),
      guideHref: '/guides/cost-of-living',
      concierge: null,
    };
  }

  return {
    headline: purpose === 'visiting' ? 'Let\'s make the most of your trip.' : 'Let\'s get you exploring first.',
    body: 'Start with what\'s actually worth your time, ranked by real ratings.',
    collection: findCollection(collections, ['best things to do', 'weekend', 'first']),
    guideHref: '/discover',
    concierge: null,
  };
}

export default function RelocationQuizClient({ collections = [] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  function selectAnswer(key, value) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  if (done) {
    const rec = getRecommendation(answers, collections);
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 pt-32 md:pt-40">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">Your result</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">{rec.headline}</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">{rec.body}</p>

        <div className="flex flex-col gap-3 mb-8">
          {rec.collection && (
            <Link
              // Guide-type collections are canonicalized to /guides/<slug>;
              // everything else to /living-in-istanbul/<slug> -- see
              // collections/[slug]/page.jsx.
              href={rec.collection.display_style === 'guide' ? `/guides/${rec.collection.slug}` : `/living-in-istanbul/${rec.collection.slug}`}
              className="flex items-center justify-between px-5 py-4 rounded-xl border border-border bg-card hover:border-primary transition-colors"
            >
              <span className="font-semibold">{rec.collection.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <Link
            href={rec.guideHref}
            className="flex items-center justify-between px-5 py-4 rounded-xl border border-border bg-card hover:border-primary transition-colors"
          >
            <span className="font-semibold">Open the full guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {rec.concierge && (
          <div className="rounded-2xl bg-gradient-primary text-white p-6">
            <p className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-90">Recommended</p>
            <p className="font-bold mb-3">
              Our concierge team can handle this for you directly.
            </p>
            <Link
              href="/concierge"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary text-sm font-semibold"
            >
              See concierge tiers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <button
          onClick={() => { setStep(0); setAnswers({}); setDone(false); }}
          className="mt-8 text-sm text-muted-foreground hover:text-foreground underline"
        >
          Retake the quiz
        </button>
      </div>
    );
  }

  const current = QUESTIONS[step];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 pt-32 md:pt-40">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-semibold uppercase tracking-wider">
          Question {step + 1} of {QUESTIONS.length}
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-muted mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-primary transition-all"
          style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-8">{current.q}</h1>
      <div className="flex flex-col gap-3">
        {current.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => selectAnswer(current.key, opt.value)}
            className="text-left px-5 py-4 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors font-medium"
          >
            {opt.label}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}
    </div>
  );
}
