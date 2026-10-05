import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

export const metadata = {
  title: '3-Month Starter Budget for Türkiye | Move to Istanbul',
  description: 'What to realistically set aside to cover your first 3 months in Türkiye, one-time moving costs included.',
  alternates: { canonical: '/cost-of-living/3-month-budget/' },
};

const ROWS = [
  { item: 'One-time moving costs (deposit, agency fee, insurance, furnishing)', range: '$2,000 – $6,000+' },
  { item: 'Monthly living costs × 3 (budget tier)', range: '$3,600 – $4,800' },
  { item: 'Monthly living costs × 3 (comfortable tier)', range: '$5,400 – $7,800' },
  { item: 'Buffer for exchange-rate swings & surprises (recommended)', range: '10-15% on top' },
];

export default function ThreeMonthBudgetPage() {
  return (
    <GuideLayout
      eyebrow="Cost of Living"
      title="3-Month Starter Budget"
      description="What to actually set aside to cover your first 3 months, one-time costs included."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/cost-of-living"
      backLabel="Cost of Living"
      sections={[{ id: 'budget', label: 'The numbers' }]}
    >
      <section id="budget">
        <p className="text-foreground/80 leading-relaxed mb-6">
          The number people underestimate isn't the monthly cost of living — it's the one-time costs that land in month one, on top of three months of ongoing expenses before you've settled into a routine.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr><th className="text-left p-3 font-semibold">Item</th><th className="text-left p-3 font-semibold">Range</th></tr></thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} className="border-t border-border"><td className="p-3">{r.item}</td><td className="p-3 font-medium">{r.range}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">See the full monthly breakdown by category</h3>
        <Link href="/cost-of-living/monthly-expenses" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity mt-2">
          Monthly Expenses by Category <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
