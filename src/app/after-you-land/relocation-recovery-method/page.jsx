import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'The Relocation Recovery Method | Move to Istanbul',
  description: 'A practical framework for when something about your move to Türkiye isn\'t working — name the problem, test whether it\'s fixable, and know who to ask for help.',
  alternates: { canonical: '/after-you-land/relocation-recovery-method/' },
};

const STEPS = [
  {
    title: '1. Name what\'s actually wrong — specifically',
    body: "\"This isn't working\" isn't a diagnosis. Separate the vague feeling from the specific cause: is it the apartment, the neighborhood, the lack of a social circle, the money not stretching as far as planned, the admin dragging on, or genuine homesickness? Write the actual sentence down. Most relocation problems that feel overwhelming turn out to be one or two concrete things, not everything at once.",
  },
  {
    title: '2. Sort it: fixable, time-limited, or a dealbreaker',
    body: 'Fixable means there\'s a concrete action that resolves it — a noisy apartment means you can move at lease renewal, a thin social circle means you can join a specific group this week. Time-limited means it genuinely gets better with time and doesn\'t need an action, just patience — most of the "nothing feels normal yet" discomfort in the first couple of months falls here. A dealbreaker is neither: it\'s a structural mismatch (the cost of living doesn\'t work at your income, or the reason you moved has changed) that no amount of patience or local fix resolves.',
  },
  {
    title: '3. Match the category to the right response',
    body: "Fixable problems get a concrete next action with a date attached, not just acknowledgment — \"look at two other apartments by next weekend\" beats \"think about moving.\" Time-limited problems get a check-in date, not a decision — revisit it at your next 30-60-90 day review rather than deciding anything today. Dealbreakers get an honest conversation about what changes: an adjustment to the plan (different city, different visa route, different budget) or, if it genuinely doesn't work, a clear-eyed exit plan rather than a slow, expensive drift toward one.",
  },
  {
    title: '4. Know who to actually ask',
    body: "Admin and legal problems (residence permit stuck, a contract dispute, a tax question) need a professional — a lawyer or accountant, not a forum thread. Social and adjustment problems are better solved with other people going through the same thing, in person where possible. Money problems need your own numbers, honestly reviewed, before anyone's advice is useful. And if you're stuck on which category a problem even falls into, a structured outside conversation — ours or anyone's — is worth more than another week of circling it alone.",
  },
];

const FAQ = [
  {
    q: 'What if I can\'t tell whether something is time-limited or a dealbreaker?',
    a: "That's the hardest call, and it's normal to get it wrong in either direction at first. A useful test: if you fixed the one concrete thing bothering you today, would the rest of the picture still feel right? If yes, it's probably time-limited or fixable. If you can't picture feeling right even with that one thing solved, it's worth treating as a possible dealbreaker and digging into why.",
  },
  {
    q: 'Is it normal to seriously consider leaving in the first few months?',
    a: "It's common enough that it shouldn't alarm you on its own — the adjustment curve for most relocations dips before it climbs. What matters is whether you can name a specific, fixable cause for the dip (see step 1) or whether the doubt is diffuse and persistent even once the obvious admin and logistics problems are sorted.",
  },
  {
    q: 'When should I just talk to someone instead of working through this alone?',
    a: "When you've tried to name the specific problem (step 1) more than once and it keeps coming out vague, or when the same issue has shown up at two consecutive 30-60-90 reviews without resolving. At that point an outside perspective, structured rather than another venting conversation, tends to move things faster than another month of waiting it out.",
  },
];

export default function RelocationRecoveryMethodPage() {
  return (
    <GuideLayout
      eyebrow="After You Land"
      title="The Relocation Recovery Method"
      description="A practical framework for when something about your move isn't working: name it, sort it, and know who to ask."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/after-you-land"
      backLabel="After You Land"
      sections={[
        { id: 'method', label: 'The method' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="method">
        <div className="space-y-5">
          {STEPS.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold mb-1.5">{s.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Stuck on step 1, or need an outside read on your situation?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          If you've been circling the same problem without a clear next step, a short call can usually get you unstuck faster than another week of thinking it over alone.
        </p>
        <Link href="/services/book-a-call" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Book a Call <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
