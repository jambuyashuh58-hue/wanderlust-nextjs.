import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Moving to Türkiye from the UK: Visa & Residence Notes | Move to Istanbul',
  description: 'Entry requirements for UK citizens visiting Türkiye, and what UK-issued documents need before a Turkish residence permit application will accept them.',
  alternates: { canonical: '/visa-residence/by-nationality/united-kingdom' },
};

const FAQ = [
  {
    q: 'Do I need a visa to enter Türkiye as a UK citizen?',
    a: 'Per the Turkish Ministry of Foreign Affairs, British ordinary-passport holders travelling for tourism are visa-exempt for stays of up to 90 days within any 180-day period. This is the window most people use to start their short-term residence permit application, since it\'s filed from inside Türkiye. Confirm on evisa.gov.tr before you travel, as rules are revised periodically.',
  },
  {
    q: 'Do my UK documents need to go through a Turkish embassy for legalization?',
    a: "No, not the full consular route. The UK is a member of the Hague Apostille Convention, as is Türkiye, so a UK-issued document gets an apostille from the UK's Legalisation Office (part of the FCDO) rather than Turkish embassy legalization. It will still generally need a certified Turkish translation afterwards for most official filings in Türkiye.",
  },
  {
    q: 'How do I get a UK document apostilled before I travel?',
    a: 'The FCDO Legalisation Office handles UK apostilles, with an online application process and postal or in-person document submission. It\'s worth doing this before you leave the UK if you already know you\'ll need a specific document (like a marriage certificate for a Family Residence Permit) — arranging it from inside Türkiye takes longer.',
  },
];

export default function UnitedKingdomVisaPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence · By Nationality"
      title="Moving to Türkiye from the UK"
      description="Entry rules for UK passport holders, and what your documents need before a residence permit application accepts them."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence/by-nationality"
      backLabel="By Nationality"
      sections={[{ id: 'entry', label: 'Entering Türkiye' }, { id: 'residence', label: 'For your residence permit' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="entry">
        <h2 className="text-2xl font-bold mb-4">Entering Türkiye as a UK citizen</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          British ordinary-passport holders travelling for tourism are visa-exempt for short stays, per the Turkish Ministry of Foreign Affairs — no e-Visa or advance visa application needed for a standard tourist trip. That's the entry you'll typically arrive on before filing your short-term residence permit (e-İkamet) application from inside the country.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Official-passport holders and some other categories are treated differently, and this policy is reviewed periodically, so check your specific situation before booking.
        </p>
        <a href="https://www.evisa.gov.tr/en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Check current status on the official e-Visa portal <ExternalLink className="w-3 h-3" />
        </a>
      </section>
      <section id="residence">
        <h2 className="text-2xl font-bold mb-4">What this means for your residence permit documents</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Both the UK and Türkiye are Hague Apostille Convention members, so a UK-issued civil document (birth certificate, marriage certificate, a DBS background check) is legalized with a UK apostille rather than full Turkish-embassy consular legalization. From there, most Turkish official filings still require a certified (sworn) Turkish translation of the apostilled document.
        </p>
        <Link href="/visa-residence/translation-legalization" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Translation & legalization, generally <ArrowRight className="w-3 h-3" />
        </Link>
        <p className="text-foreground/80 leading-relaxed mt-4">
          This is most relevant for the Family Residence Permit route (apostilled marriage/birth certificates) rather than a standard tourist e-İkamet, which mostly hinges on your lease and insurance paperwork.
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
