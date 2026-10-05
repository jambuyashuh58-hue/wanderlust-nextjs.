import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

const CATEGORIES = [
  { category: 'Furnished rent (1+1 flat)', budget: '$600 – $800', comfortable: '$1,000 – $1,500' },
  { category: 'Utilities (gas, electric, water)', budget: '$60 – $90', comfortable: '$100 – $150' },
  { category: 'Fiber internet', budget: '$15 – $25', comfortable: '$25 – $35' },
  { category: 'Groceries', budget: '$200 – $300', comfortable: '$350 – $500' },
  { category: 'Dining out & cafés', budget: '$180 – $300', comfortable: '$400 – $700' },
  { category: 'Public transit (IstanbulKart)', budget: '$25 – $35', comfortable: '$40 – $65' },
  { category: 'Health insurance', budget: '$35 – $50', comfortable: '$60 – $110' },
  { category: 'Mobile data', budget: '$15 – $25', comfortable: '$25 – $45' },
];

export const metadata = {
  title: 'Monthly Expenses by Category in Türkiye | Move to Istanbul',
  description: 'Category-by-category monthly cost ranges for living in Türkiye, budget vs. comfortable tier.',
  alternates: { canonical: '/cost-of-living/monthly-expenses/' },
};

export default function MonthlyExpensesPage() {
  return (
    <GuideLayout
      eyebrow="Cost of Living"
      title="Monthly Expenses by Category"
      description="Where the full cost-of-living guide's numbers come from, category by category."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/cost-of-living"
      backLabel="Cost of Living"
      sections={[{ id: 'table', label: 'Category breakdown' }]}
    >
      <section id="table">
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr><th className="text-left p-3 font-semibold">Category</th><th className="text-left p-3 font-semibold">Budget tier</th><th className="text-left p-3 font-semibold">Comfortable tier</th></tr></thead>
            <tbody>
              {CATEGORIES.map((c, i) => (
                <tr key={i} className="border-t border-border"><td className="p-3">{c.category}</td><td className="p-3">{c.budget}</td><td className="p-3 font-medium">{c.comfortable}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Figures in USD/month. See the full guide for the premium tier and currency-markup tips.</p>
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <Link href="/guides/cost-of-living" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Full Cost-of-Living Guide <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
