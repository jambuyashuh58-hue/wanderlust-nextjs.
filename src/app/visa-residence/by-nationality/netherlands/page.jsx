import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Moving to Türkiye from the Netherlands: Visa & Residence Notes | Move to Istanbul',
  description: 'Entry requirements for Dutch citizens visiting Türkiye, and what Dutch-issued documents need before a Turkish residence permit application will accept them.',
  alternates: { canonical: '/visa-residence/by-nationality/netherlands/' },
};

const FAQ = [
  {
    q: 'Do I need a visa to enter Türkiye as a Dutch citizen?',
    a: "Per the Turkish Ministry of Foreign Affairs, Dutch passport holders travelling for tourism are visa-exempt for stays of up to 90 days within any 180-day period. That's the window most people use to start a short-term residence permit application from inside Türkiye. Confirm on evisa.gov.tr before you travel, since this is reviewed periodically.",
  },
  {
    q: 'Do my Dutch documents need Turkish embassy legalization?',
    a: 'No, not the full consular route. The Netherlands and Türkiye are both Hague Apostille Convention members — fittingly, since the 1961 Apostille Convention itself was signed at The Hague. A Dutch-issued civil document gets an apostille rather than embassy legalization, and still generally needs a certified Turkish translation afterwards.',
  },
  {
    q: 'Who issues the apostille on a Dutch document?',
    a: 'Apostilles for Dutch civil-status documents (birth certificates, marriage certificates, certificates of good conduct) are typically issued through the district court (rechtbank) for the relevant municipality, or in some cases the Ministry of Foreign Affairs for other document types. Confirm the right channel for your specific document before you travel.',
  },
];

export default function NetherlandsVisaPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence · By Nationality"
      title="Moving to Türkiye from the Netherlands"
      description="Entry rules for Dutch passport holders, and what your documents need before a residence permit application accepts them."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence/by-nationality"
      backLabel="By Nationality"
      sections={[{ id: 'entry', label: 'Entering Türkiye' }, { id: 'residence', label: 'For your residence permit' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="entry">
        <h2 className="text-2xl font-bold mb-4">Entering Türkiye as a Dutch citizen</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Dutch passport holders travelling for tourism are visa-exempt for short stays, per the Turkish Ministry of Foreign Affairs — no e-Visa or advance application needed for a standard tourist trip. This is the entry most people use before filing a short-term residence permit (e-İkamet) application from inside the country.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          This policy is reviewed periodically, so confirm your specific situation before booking.
        </p>
        <a href="https://www.evisa.gov.tr/en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Check current status on the official e-Visa portal <ExternalLink className="w-3 h-3" />
        </a>
      </section>
      <section id="residence">
        <h2 className="text-2xl font-bold mb-4">What this means for your residence permit documents</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The Netherlands and Türkiye are both Hague Apostille Convention members, so a Dutch-issued civil document (birth certificate, marriage certificate, certificate of good conduct) is legalized with an apostille rather than full Turkish-embassy consular legalization. Most Turkish official filings still require a certified (sworn) Turkish translation of the apostilled document afterwards.
        </p>
        <Link href="/visa-residence/translation-legalization" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Translation & legalization, generally <ArrowRight className="w-3 h-3" />
        </Link>
        <p className="text-foreground/80 leading-relaxed mt-4">
          This matters most for the Family Residence Permit route (apostilled marriage/birth certificates) and less so for a standard tourist e-İkamet, which mostly hinges on your lease and insurance paperwork.
        </p>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want your exact route mapped out?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Istanbul Route Check covers entry timing, document prep, and your residence-permit application end to end.</p>
        <Link href="/services/istanbul-route-check" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Istanbul Route Check <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
