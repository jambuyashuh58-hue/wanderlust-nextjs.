import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Housing Timeline for Moving to Türkiye | Move to Istanbul',
  description: 'When to start looking for an apartment, how long the search actually takes, and what to book before vs. after you land.',
  alternates: { canonical: '/moving-to-turkiye/housing-timeline' },
};

const FAQ = [
  {
    q: 'When should I start looking for my real apartment?',
    a: "Don't sign anything long-term before you land — book 2-4 weeks of short-term furnished housing instead, and start the real search once you're physically in the city and can view places in person. Most people land their lease within 1-3 weeks of active in-person searching.",
  },
  {
    q: 'Does my residence permit application depend on having a lease?',
    a: 'Yes — most short-term residence permit applications need a notarized rental contract in an "open" neighborhood (one not at its foreign-resident quota) with a UAVT building address code, so your housing search and your permit application timeline are linked. See the housing guide for which neighborhoods are typically open.',
  },
];

export default function HousingTimelinePage() {
  return (
    <GuideLayout
      eyebrow="Moving to Türkiye"
      title="Housing Timeline"
      description="When to start looking, how long it actually takes, and what to book before vs. after you land."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/moving-to-turkiye"
      backLabel="Moving to Türkiye"
      sections={[{ id: 'timeline', label: 'Timeline' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="timeline">
        <h2 className="text-2xl font-bold mb-4">Before you land vs. after you land</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          <strong className="text-foreground">Before you land:</strong> book 2-4 weeks of short-term furnished housing (Airbnb-style or a short-term rental agency) in or near the neighborhoods you're considering. Don't sign a long lease sight-unseen.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          <strong className="text-foreground">Weeks 1-3 on the ground:</strong> view apartments in person, confirm the neighborhood is "open" for foreign-resident registration, and negotiate the lease. Budget for a deposit (typically 1-2 months' rent) and often a one-time agency fee.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          <strong className="text-foreground">Once signed:</strong> notarize the lease and get your UAVT address code — this unlocks the residence permit application, which has its own separate appointment-booking lead time.
        </p>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want pre-screened listings instead of searching cold?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Housing Shortlist File gets you 5-8 real listings matched to your budget before you even land.</p>
        <Link href="/services/housing-shortlist-file" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Housing Shortlist File <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
