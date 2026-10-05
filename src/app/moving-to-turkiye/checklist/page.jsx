import Link from 'next/link';
import { ArrowRight, CheckSquare } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

export const metadata = {
  title: 'Pre-Move Checklist for Türkiye | Move to Istanbul',
  description: 'Everything to sort before you fly to Türkiye, grouped by how far out it needs to start.',
  alternates: { canonical: '/moving-to-turkiye/checklist/' },
};

const GROUPS = [
  {
    title: '8+ weeks before you fly',
    items: [
      'Decide your visa pathway (see /guides/visa)',
      'Confirm passport has 6+ months validity remaining',
      'Start gathering proof-of-income / proof-of-funds documents',
      'Research compliant private health insurance options (required for most residence permits)',
      'Start researching neighborhoods, not apartments yet',
    ],
  },
  {
    title: '4-8 weeks before',
    items: [
      'Book short-term furnished housing for your first 2-4 weeks',
      'Apostille/notarize any documents your pathway requires in your home country',
      'Book flights with enough buffer before any visa deadline',
      'Set up international banking access (a card with no foreign transaction fees)',
      'Back up important documents digitally (passport, insurance policy, bank letters)',
    ],
  },
  {
    title: '1-4 weeks before',
    items: [
      'Confirm airport transfer or at least know the route from the airport',
      'Download offline maps and a translation app',
      'Notify your home bank/phone carrier of international travel',
      'Print physical copies of key documents — don\'t rely on phone access alone',
    ],
  },
];

export default function ChecklistPage() {
  return (
    <GuideLayout
      eyebrow="Moving to Türkiye"
      title="Pre-Move Checklist"
      description="Everything to sort before you fly, grouped by how far out it needs to start."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/moving-to-turkiye"
      backLabel="Moving to Türkiye"
      sections={GROUPS.map((g, i) => ({ id: `g${i}`, label: g.title }))}
    >
      {GROUPS.map((g, i) => (
        <section id={`g${i}`} key={i}>
          <h2 className="text-2xl font-bold mb-4">{g.title}</h2>
          <ul className="space-y-2.5">
            {g.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2.5 text-sm text-foreground/80"><CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>{item}</span></li>
            ))}
          </ul>
        </section>
      ))}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want the full step-by-step with timing dependencies?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Full Sequence page lays out what needs to happen before what, not just a flat list.</p>
        <Link href="/moving-to-turkiye/full-sequence" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Read the Full Sequence <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
