import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import GuideSchema from '@/components/GuideSchema';

export const metadata = {
  title: 'Istanbul Relocation Concierge Services | Move to Istanbul',
  description: 'Done-for-you help moving to Istanbul: visa & paperwork guidance, apartment shortlisting, and full relocation concierge.',
  alternates: { canonical: '/services' },
};

const TIERS = [
  {
    slug: 'visa-paperwork-guidance',
    name: 'Visa & Paperwork Guidance',
    price: '$99',
    tagline: 'A focused 45-minute strategy call to map your exact visa route — no more guessing.',
  },
  {
    slug: 'apartment-shortlisting',
    name: 'Apartment Shortlisting',
    price: '$449',
    tagline: '5–8 real listings matched to your budget, with curated video walkthroughs.',
  },
  {
    slug: 'full-relocation-concierge',
    name: 'Full Relocation Concierge',
    price: '$999',
    tagline: 'Hand us the whole first month — visa, housing, banking, and settling in.',
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <GuideSchema
        path="/services"
        title="Istanbul Relocation Concierge Services"
        description="Done-for-you help moving to Istanbul: visa & paperwork guidance, apartment shortlisting, and full relocation concierge."
      />
      <div className="bg-[hsl(221,55%,26%)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-5">Concierge Services</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Skip the Guesswork. We&apos;ve Done This Hundreds of Times.</h1>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            From a single strategy call to a fully managed first month in Istanbul — pick the level of hands-on help that matches your move.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIERS.map((t) => (
          <Link
            key={t.slug}
            href={`/services/${t.slug}`}
            className="group rounded-2xl border border-border bg-card p-6 flex flex-col hover:border-primary/40 hover:shadow-lg transition-all"
          >
            <p className="text-sm font-semibold text-primary mb-1">{t.price}</p>
            <h2 className="text-lg font-bold mb-2">{t.name}</h2>
            <p className="text-sm text-muted-foreground mb-5 flex-1">{t.tagline}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
              See what&apos;s included <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <p className="text-sm text-muted-foreground mb-4">Not sure which one fits? Start with a free discovery call.</p>
        <Link
          href="/services/book-a-discovery-call"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
        >
          <CheckCircle2 className="w-4 h-4" /> Book a Free Discovery Call
        </Link>
      </div>
    </div>
  );
}
