import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

const ONE_TIME_COSTS = [
  { item: 'Rental deposit (1-2 months\' rent)', range: '$600 – $2,800+' },
  { item: 'Real-estate agency fee (one-time, often ~1 month\'s rent)', range: '$600 – $1,400' },
  { item: 'Residence permit application + card fees', range: '$80 – $150' },
  { item: 'Health insurance policy (first year, paid upfront)', range: '$400 – $1,300' },
  { item: 'Basic furnishing top-ups (unfurnished units)', range: '$300 – $1,500+' },
];

export const metadata = {
  title: 'Real Moving Costs for Türkiye | Move to Istanbul',
  description: 'The actual one-time and first-month costs of moving to Türkiye — deposits, fees, and insurance, not just the ongoing monthly budget.',
  alternates: { canonical: '/moving-to-turkiye/budget' },
};

export default function MovingBudgetPage() {
  return (
    <GuideLayout
      eyebrow="Moving to Türkiye"
      title="What It Actually Costs"
      description="The real one-time and first-month numbers, on top of your ongoing monthly budget."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/moving-to-turkiye"
      backLabel="Moving to Türkiye"
      sections={[{ id: 'onetime', label: 'One-time costs' }, { id: 'monthly', label: 'Monthly budget' }]}
    >
      <section id="onetime">
        <h2 className="text-2xl font-bold mb-2">One-time moving costs</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">These land on top of whatever your ongoing monthly budget is, concentrated in your first few weeks.</p>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr><th className="text-left p-3 font-semibold">Item</th><th className="text-left p-3 font-semibold">Typical Range</th></tr></thead>
            <tbody>
              {ONE_TIME_COSTS.map((c, i) => (
                <tr key={i} className="border-t border-border"><td className="p-3">{c.item}</td><td className="p-3 font-medium">{c.range}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section id="monthly">
        <h2 className="text-2xl font-bold mb-2">Ongoing monthly budget</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Our full cost-of-living guide breaks the monthly numbers down by category across three lifestyle tiers — budget ($1,200-$1,600/mo), comfortable ($1,800-$2,600/mo), and premium ($3,000-$4,500+/mo) — plus currency and ATM tips that can otherwise cost you 8-15% per transaction in hidden markup.
        </p>
        <Link href="/guides/cost-of-living" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Full Cost-of-Living Breakdown <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </GuideLayout>
  );
}
