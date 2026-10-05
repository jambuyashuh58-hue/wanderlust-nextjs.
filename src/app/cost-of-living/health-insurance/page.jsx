import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Health Insurance for Türkiye Residence | Move to Istanbul',
  description: 'What a compliant private health insurance policy needs to cover for a Turkish residence permit, and realistic cost ranges.',
  alternates: { canonical: '/cost-of-living/health-insurance' },
};

const FAQ = [
  {
    q: 'What does a compliant policy need to cover?',
    a: 'For most residence permit applicants under 65, the policy must explicitly cover emergency treatment, outpatient clinic visits, and inpatient hospital stays, in compliance with Turkish residency legislation — a generic international travel-insurance policy usually doesn\'t qualify.',
  },
  {
    q: 'What does it typically cost?',
    a: 'Roughly $35-$50/month at the budget tier, $60-$110/month at the comfortable tier, and $120-$220/month at the premium tier, often paid upfront for the year.',
  },
  {
    q: 'Is the care itself good?',
    a: 'Private hospitals in Istanbul (Acıbadem, Memorial, Florence Nightingale among them) offer Western-standard facilities with English-speaking staff, generally at a fraction of US/EU out-of-pocket prices.',
  },
];

export default function HealthInsurancePage() {
  return (
    <GuideLayout
      eyebrow="Cost of Living"
      title="Health Insurance"
      description="What a compliant policy needs to cover, and realistic cost ranges."
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
        <Link href="/visa-residence/documents" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Full Residence Permit Document List <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
