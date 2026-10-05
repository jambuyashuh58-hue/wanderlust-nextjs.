import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

export const metadata = {
  title: '30-60-90 Day Reviews After Moving to Türkiye | Move to Istanbul',
  description: 'A concrete checklist for the three checkpoints that actually matter after relocating: 30, 60, and 90 days in — budget, routine, admin, and whether this is working.',
  alternates: { canonical: '/after-you-land/30-60-90-reviews' },
};

const CHECKPOINTS = [
  {
    day: 'Day 30',
    frame: 'Are the basics actually in place, or just in progress?',
    checks: [
      'Lease signed and notarized, and you know your UAVT/address registration is correct.',
      'Residence permit application submitted — not just researched, actually filed with a booked or completed appointment.',
      'Utilities (water, electric, gas, internet) are in your name or at least functioning under a temporary arrangement.',
      'You know your neighborhood\'s pazar day and have a default supermarket you shop at without thinking about it.',
      'You\'ve spent real money for a full month, so your actual spend (not your pre-move estimate) is on paper somewhere.',
    ],
  },
  {
    day: 'Day 60',
    frame: 'Is your spending matching your plan, and is a routine forming?',
    checks: [
      'Compare your actual 30-day spend against your planning budget — if you\'re meaningfully over, find out which category (usually rent, eating out, or one-off setup costs) and adjust now rather than at day 90.',
      'You have a repeatable weekly rhythm: groceries, a gym or running route, laundry, somewhere you work from if remote.',
      'Residence permit status: appointment attended, documents submitted, and you know roughly when to expect the card or a response.',
      'You\'ve met at least a few people outside of pure transactions — a neighbor, a coworking regular, someone from a language exchange or expat group.',
      'Any administrative loose ends from week one (tax ID, bank account, SIM registration) are actually closed, not still "on the list."',
    ],
  },
  {
    day: 'Day 90',
    frame: 'Step back — is this working, and what needs to change for the next quarter?',
    checks: [
      'Your 90-day actual spend against plan: is the gap shrinking, stable, or growing? A growing gap after 90 days is a planning problem, not a settling-in problem.',
      'Residence permit: ideally approved or in its final stage. If it\'s stalled or rejected, this needs to become the top priority, not something you keep deferring.',
      'Do you have a genuine routine, or are you still operating in "temporary mode" three months in? If it\'s the latter, name specifically what\'s missing — a routine, a person, a piece of admin — rather than a vague sense that something\'s off.',
      'Health insurance and healthcare access: do you actually know where you\'d go for a non-emergency doctor visit, and is your coverage still valid and adequate?',
      'Honest check: is the thing that made you move here still true? If something specific isn\'t working, our relocation recovery framework walks through what to do about it rather than waiting it out.',
    ],
  },
];

export default function ThirtySixtyNinetyReviewsPage() {
  return (
    <GuideLayout
      eyebrow="After You Land"
      title="30-60-90 Day Reviews"
      description="A concrete checklist for the three checkpoints that matter: is your budget tracking to plan, do you have a routine, and is your residence permit actually progressing."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/after-you-land"
      backLabel="After You Land"
      sections={CHECKPOINTS.map((c) => ({ id: c.day.toLowerCase().replace(' ', '-'), label: c.day }))}
    >
      {CHECKPOINTS.map((c) => (
        <section key={c.day} id={c.day.toLowerCase().replace(' ', '-')}>
          <h2 className="text-2xl font-bold mb-1">{c.day}</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">{c.frame}</p>
          <div className="rounded-2xl border border-border bg-card p-6">
            <ul className="space-y-3">
              {c.checks.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                  <span className="shrink-0 w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center text-[11px] font-semibold text-primary mt-0.5">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Something not working at one of these checkpoints?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          A stalled checklist item usually has a specific cause and a specific fix. Our relocation recovery framework gives you a structured way to work through it instead of just waiting to see if it resolves itself.
        </p>
        <Link href="/after-you-land/relocation-recovery-method" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Relocation Recovery Method <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
