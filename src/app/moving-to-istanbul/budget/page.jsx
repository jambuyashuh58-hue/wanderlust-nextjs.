import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';
import GuideSchema from '@/components/GuideSchema';

export const metadata = {
  title: 'How Much Money You Need to Move to Istanbul (2026 Budget) | Move to Istanbul',
  description: 'The one-time, upfront costs of moving to Istanbul — visa fees, deposit, agent fees, flights, and setup costs.',
  alternates: { canonical: '/moving-to-istanbul/budget' },
};

const UPFRONT_COSTS = [
  { item: 'Residence permit / visa fees', low: '$50', high: '$300' },
  { item: 'Apostilled document translations & notary fees', low: '$100', high: '$400' },
  { item: 'Compliant private health insurance (first year, upfront)', low: '$200', high: '$600' },
  { item: 'One-way or first flight', low: '$300', high: '$1,200' },
  { item: 'Apartment deposit (typically 1–2 months\' rent)', low: '$400', high: '$1,600' },
  { item: 'Real estate agent commission (typically 1 month\'s rent)', low: '$200', high: '$800' },
  { item: 'Short-term accommodation (first 1–2 weeks)', low: '$300', high: '$900' },
  { item: 'Furnishing an unfurnished apartment (if applicable)', low: '$0', high: '$1,500' },
];

const CHECKLIST = [
  'Get an itemized quote before assuming a rental is "furnished" — standards vary widely',
  'Ask whether the agent commission is one month or a fixed fee — it is negotiable in some cases',
  'Budget separately for DASK earthquake insurance, which is required and billed annually',
  'Keep a buffer of at least one extra month\'s rent in reserve for the unexpected',
];

const FAQ = [
  { q: 'What\'s a realistic total budget for the move itself?', a: 'Most single movers should plan for roughly $1,500–$5,000 in one-time upfront costs, before any monthly living expenses — see the ranges above for where that varies by situation.' },
  { q: 'Is this different from cost of living?', a: 'Yes — this page covers one-time costs of the move itself (visa fees, deposit, flights). For ongoing monthly expenses once you\'re settled, see the Cost of Living guide.' },
  { q: 'Can concierge services reduce these costs?', a: 'Our Apartment Shortlisting service is priced to typically save more in avoided agent markups and failed viewings than it costs — see the Services page for details.' },
];

export default function BudgetPage() {
  return (
    <>
    <GuideSchema
      path="/moving-to-istanbul/budget"
      title="How Much Money You Need to Move to Istanbul"
      description="The one-time, upfront costs of moving to Istanbul — visa fees, deposit, agent fees, flights, and setup costs."
      faq={FAQ}
    />
    <GuideLayout
      eyebrow="Moving Budget"
      title="How Much Money You Need to Move to Istanbul"
      description="The one-time, upfront costs of the move itself — separate from your ongoing monthly cost of living."
      readTime="7 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/moving-to-istanbul"
      backLabel="Moving to Istanbul"
      sections={[
        { id: 'costs', label: 'Upfront Cost Ranges' },
        { id: 'checklist', label: 'Budgeting Checklist' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="costs" className="scroll-mt-24 mb-10">
        <h2 className="text-xl font-bold mb-4">One-time upfront costs</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold">Item</th>
                <th className="text-right px-4 py-2.5 font-semibold">Low</th>
                <th className="text-right px-4 py-2.5 font-semibold">High</th>
              </tr>
            </thead>
            <tbody>
              {UPFRONT_COSTS.map((row) => (
                <tr key={row.item} className="border-t border-border">
                  <td className="px-4 py-2.5">{row.item}</td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">{row.low}</td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">{row.high}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Figures are estimates for a single mover as of 2026 and vary by nationality, city district, and season.</p>
      </section>

      <section id="checklist" className="scroll-mt-24 mb-10">
        <h2 className="text-xl font-bold mb-4">Budgeting checklist</h2>
        <ul className="space-y-3 mb-5">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          For ongoing monthly expenses once you&apos;re settled, see the{' '}
          <Link href="/moving-to-istanbul/cost-of-living" className="text-primary font-medium hover:underline">Cost of Living guide</Link>.
        </p>
      </section>

      <section id="faq" className="scroll-mt-24 mb-10">
        <h2 className="text-xl font-bold mb-4">Frequently asked questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
    </>
  );
}
