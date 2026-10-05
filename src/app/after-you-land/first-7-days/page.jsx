import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

const STEPS = [
  { title: 'Get your tax ID number', body: 'Generated via ivd.gib.gov.tr — needed for banking, the residence permit application, and some utility contracts. Do this early in week one.' },
  { title: 'Decide on banking', body: 'Open a Turkish account if you\'ll need to pay rent by transfer, or confirm your multi-currency account (Wise/Revolut) covers what you need for now.' },
  { title: 'Start the real apartment search', body: 'Move from short-term housing into active in-person viewings now that you have a feel for the city — see our housing timeline and viewing checklist.' },
  { title: 'Register for IstanbulKart', body: 'Buy the physical transit card and start using metro/tram/ferry instead of relying on taxis for everything.' },
];

export const metadata = {
  title: 'Your First 7 Days in Türkiye | Move to Istanbul',
  description: 'Tax ID, banking decisions, and starting the apartment search in your first week in Türkiye.',
  alternates: { canonical: '/after-you-land/first-7-days' },
};

export default function First7DaysPage() {
  return (
    <GuideLayout
      eyebrow="After You Land"
      title="First 7 Days"
      description="Tax ID, banking decisions, and starting the apartment search."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/after-you-land"
      backLabel="After You Land"
      sections={[{ id: 'steps', label: 'What to do' }]}
    >
      <section id="steps">
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
        <Link href="/after-you-land/first-30-days" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Next: Your First 30 Days <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
