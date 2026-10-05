import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Negotiating Rent in Türkiye | Move to Istanbul',
  description: 'What\'s actually negotiable on rent, deposit, and included furnishing when renting an apartment in Türkiye.',
  alternates: { canonical: '/housing/negotiation-tips/' },
};

const FAQ = [
  {
    q: 'Is rent itself negotiable?',
    a: "Often, yes — especially for a unit that's been listed for a while or in a building with multiple vacancies. A longer lease commitment (12+ months) or paying several months upfront can be useful leverage.",
  },
  {
    q: 'What about the deposit and agency fee?',
    a: "The deposit is less flexible since it's often standardized at 1-2 months' rent, but the one-time agency fee sometimes has room, particularly if you found the listing directly rather than through the agent exclusively.",
  },
  {
    q: 'Can I negotiate furnishing or appliances being added?',
    a: 'Yes, this is one of the more commonly successful asks — requesting a washing machine, extra storage, or a better water heater be added before move-in costs the landlord less than a rent reduction and is often granted.',
  },
];

export default function NegotiationTipsPage() {
  return (
    <GuideLayout
      eyebrow="Housing"
      title="Negotiation Tips"
      description="What's actually negotiable on rent, deposit, and included furnishing."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/housing"
      backLabel="Housing"
      sections={[{ id: 'faq', label: 'FAQ' }]}
    >
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want help negotiating directly?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Housing Shortlist File includes guidance on negotiating rent and deposit for the specific listings you're considering.</p>
        <Link href="/services/housing-shortlist-file" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Housing Shortlist File <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
