import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Getting Around Istanbul on a Budget | Move to Istanbul',
  description: 'IstanbulKart, which transit lines matter most, and realistic monthly transport costs for residents.',
  alternates: { canonical: '/cost-of-living/transport' },
};

const FAQ = [
  {
    q: 'What is IstanbulKart and how do I get one?',
    a: "It's the contactless transit card covering metro, tram, the Marmaray undersea rail line, and Bosphorus ferries. Buy a physical card at yellow kiosks in any metro station or the airport. Once you have your residence permit ID, register the card online for discounted monthly passes.",
  },
  {
    q: 'What does transit typically cost per month?',
    a: 'Roughly $25-$35/month at the budget tier and $40-$65/month at the comfortable tier, depending on how much you commute versus walk or work from home.',
  },
  {
    q: 'Are ferries actually useful, or just scenic?',
    a: 'Genuinely useful — the cross-Bosphorus ferries plus the İstanbulkart transfer discount make them a real commuting option between the European and Asian sides, not just a tourist activity.',
  },
];

export default function TransportPage() {
  return (
    <GuideLayout
      eyebrow="Cost of Living"
      title="Transport"
      description="IstanbulKart, which lines matter, and realistic monthly transit costs."
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
        <h3 className="font-bold mb-1.5">Taking the ferry out of the city on weekends?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">Our weekend logistics guide covers ferry fares and transfer discounts in more detail.</p>
        <Link href="/living-in-istanbul/weekend-logistics" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Weekend Logistics <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
