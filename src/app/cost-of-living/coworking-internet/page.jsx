import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Coworking & Internet Costs in Istanbul | Move to Istanbul',
  description: 'Fiber internet setup, coworking day-rates, and café-working costs for remote workers in Istanbul.',
  alternates: { canonical: '/cost-of-living/coworking-internet/' },
};

const FAQ = [
  {
    q: 'How much does fiber internet cost?',
    a: 'Roughly $15-$25/month at the budget tier and $25-$35/month at the comfortable tier for 100-1000 Mbps fiber from providers like TurkNet, Superonline, or Türk Telekom.',
  },
  {
    q: 'What do coworking spaces cost?',
    a: 'Day passes at spaces like Kolektif House, Impact Hub, or Workinton run roughly $12-$22/day, with monthly dedicated desks averaging $150-$280/month.',
  },
  {
    q: 'Is working from cafés a realistic alternative?',
    a: 'Yes — working from laptop-friendly specialty cafés, especially in Moda or Cihangir, typically costs $4-$8/day in coffee and food purchases, which is dramatically cheaper than a coworking membership if you don\'t need meeting rooms or a fixed desk.',
  },
];

export default function CoworkingInternetPage() {
  return (
    <GuideLayout
      eyebrow="Cost of Living"
      title="Coworking & Internet"
      description="Fiber setup, coworking day-rates, and café-working costs."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/cost-of-living"
      backLabel="Cost of Living"
      sections={[{ id: 'faq', label: 'FAQ' }]}
    >
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Looking for specific café recommendations?</h3>
        <Link href="/living-in-istanbul/remote-work-cafes" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity mt-2">
          See Best Cafés for Remote Work <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
