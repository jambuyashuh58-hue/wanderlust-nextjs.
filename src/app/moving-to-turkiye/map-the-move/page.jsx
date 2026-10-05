import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Map the Move: Scout First or Commit Outright? | Move to Istanbul',
  description: 'Deciding your entry point into Türkiye, your timeline, and whether to take a scouting trip before committing to a full move.',
  alternates: { canonical: '/moving-to-turkiye/map-the-move' },
};

const FAQ = [
  {
    q: 'Should I take a scouting trip first, or just commit?',
    a: 'A short scouting trip (1-2 weeks) is worth it if you have the flexibility, especially to walk a few candidate neighborhoods and test commute times in person — photos and maps undersell how different Kadıköy feels from Beşiktaş day to day. If your timeline or budget doesn\'t allow a separate trip, committing outright is common too; just plan on 2-4 weeks of short-term housing on arrival so you\'re not rushed into a lease.',
  },
  {
    q: 'Does it matter which city I land in first?',
    a: 'If Istanbul is your target, fly directly into one of its two airports (IST on the European side, SAW on the Asian side) rather than routing through Ankara — it saves a domestic leg and lets you start neighborhood scouting immediately.',
  },
];

export default function MapTheMovePage() {
  return (
    <GuideLayout
      eyebrow="Moving to Türkiye"
      title="Map the Move"
      description="Deciding your entry point, timeline, and whether to scout first or commit outright."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/moving-to-turkiye"
      backLabel="Moving to Türkiye"
      sections={[{ id: 'decide', label: 'Scout vs. commit' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="decide">
        <h2 className="text-2xl font-bold mb-4">Scout first, or commit and figure it out on arrival?</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Both work. A scouting trip de-risks the neighborhood decision — you walk a few areas, check commute times, and get a feel for the city before you're under lease-signing pressure. Committing outright is faster and cheaper overall (one trip instead of two), as long as you treat your first 2-4 weeks as short-term housing rather than rushing into a year-long lease.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Either way, the visa pathway you choose usually dictates your entry point and rough timeline more than the city does — see the visa guide before locking in flight dates.
        </p>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Next: lock in your visa pathway</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">That decision shapes almost everything else in your timeline.</p>
        <Link href="/moving-to-turkiye/visa-and-documents" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Visa & Documents <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
