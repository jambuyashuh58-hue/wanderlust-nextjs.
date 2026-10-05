import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export const metadata = {
  title: 'Housing Shortlist File ($449) | Move to Istanbul',
  description: '5-8 real rental listings matched to your budget and neighborhood, pre-screened for foreigner-friendly landlords, with curated video walkthroughs and a contract checklist.',
  alternates: { canonical: '/services/housing-shortlist-file/' },
};

const INCLUDES = [
  'Everything in the Istanbul Route Check',
  '5-8 real rental listings matched to your budget and preferred neighborhood',
  'Pre-screened for foreigner-friendly landlords',
  'Curated walk-through videos from local property agents or our on-the-ground team',
  'A localized contract checklist highlighting common rental terms to watch for',
  'DASK earthquake insurance guidance',
  'Guidance on negotiating rent and deposit',
];

const NOT_THIS = 'What this is NOT: a licensed rental agency. We don’t sign, co-sign, or negotiate the lease on your behalf — you view and decide, we do the searching and screening.';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Housing Shortlist File',
  description: '5-8 real, pre-screened rental listings matched to your budget and neighborhood in Türkiye, with video walkthroughs and a contract checklist.',
  provider: { '@type': 'Organization', name: 'Move to Istanbul', url: 'https://movetoistanbul.online' },
  areaServed: 'Türkiye',
  offers: { '@type': 'Offer', price: '449', priceCurrency: 'USD', url: 'https://movetoistanbul.online/services/housing-shortlist-file' },
};

export default function HousingShortlistFilePage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"><ArrowLeft className="w-4 h-4" /> All services</Link>
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">Housing Shortlist File</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-semibold uppercase tracking-wide">Most popular</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Skip weeks of scam listings and language-barrier landlord calls</h1>
        <div className="text-3xl font-bold mb-4">$449<span className="text-sm font-normal text-muted-foreground ml-1">USD</span></div>
        <p className="text-foreground/80 leading-relaxed mb-8">
          Istanbul's rental market runs almost entirely on local Turkish listing sites and WhatsApp groups most newcomers never find — and the listings that are in English skew toward tourist-priced, short-term units. We do the searching, screening, and video walkthroughs, and hand you a shortlist of real options worth actually viewing.
        </p>
        <div className="rounded-2xl border-2 border-primary bg-card p-6 mb-8 shadow-sm">
          <h2 className="font-bold mb-4">What's included</h2>
          <ul className="space-y-2.5">
            {INCLUDES.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm"><Check className="w-4 h-4 text-success shrink-0 mt-0.5" /><span>{item}</span></li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-8">{NOT_THIS}</p>
        <Link href="/services?tier=apartment" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-white font-semibold hover:scale-[1.02] transition-transform">
          Request the Shortlist File <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-sm text-muted-foreground mt-8">
          Want visa paperwork handled too, not just housing? The <Link href="/services/full-move-file" className="text-primary hover:underline">Full Move File</Link> covers both plus your first-month setup end to end.
        </p>
      </div>
    </div>
  );
}
