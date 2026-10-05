import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Moving to Türkiye from Canada: Visa & Residence Notes | Move to Istanbul',
  description: 'Entry requirements for Canadian citizens visiting Türkiye, and a recent change in how Canadian-issued documents get legalized for a residence permit.',
  alternates: { canonical: '/visa-residence/by-nationality/canada' },
};

const FAQ = [
  {
    q: 'Do I need a visa to enter Türkiye as a Canadian citizen?',
    a: "Per the Turkish Ministry of Foreign Affairs, ordinary Canadian passport holders travelling for tourism are visa-exempt for stays of up to 90 days within any 180-day period. That's the window most people use to start a short-term residence permit application from inside Türkiye. Confirm on evisa.gov.tr before you travel, since this is reviewed periodically.",
  },
  {
    q: 'Why do some guides say Canadians need embassy legalization, and others mention an apostille?',
    a: 'Both have been true at different times. Canada only joined the Hague Apostille Convention in January 2024 — before that, Canadian documents for use in Türkiye went through a multi-step authentication-then-embassy-legalization process. Older blog posts and forum threads reflect that pre-2024 process. If you\'re reading guidance written before 2024, assume it\'s describing the old route.',
  },
  {
    q: 'Who issues the apostille on a Canadian document now?',
    a: "Global Affairs Canada issues apostilles for most federally-recognized documents, while documents issued in Québec generally go through Québec's own apostille authority rather than the federal one. Because this process is still relatively new, double-check current turnaround times and the right office for your specific document and province before you travel.",
  },
];

export default function CanadaVisaPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence · By Nationality"
      title="Moving to Türkiye from Canada"
      description="Entry rules for Canadian passport holders, and a recent change in how your documents get legalized."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence/by-nationality"
      backLabel="By Nationality"
      sections={[{ id: 'entry', label: 'Entering Türkiye' }, { id: 'residence', label: 'For your residence permit' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="entry">
        <h2 className="text-2xl font-bold mb-4">Entering Türkiye as a Canadian citizen</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Ordinary Canadian passport holders travelling for tourism are visa-exempt for short stays, per the Turkish Ministry of Foreign Affairs — no e-Visa or advance application needed for a standard tourist trip. This is the entry most people use before filing a short-term residence permit (e-İkamet) application from inside the country.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Official-passport holders are treated differently, and this policy is reviewed periodically, so confirm your specific situation before booking.
        </p>
        <a href="https://www.evisa.gov.tr/en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Check current status on the official e-Visa portal <ExternalLink className="w-3 h-3" />
        </a>
      </section>
      <section id="residence">
        <h2 className="text-2xl font-bold mb-4">What this means for your residence permit documents</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          This is the one genuinely country-specific thing worth flagging for Canada: Canada only became a member of the Hague Apostille Convention in January 2024. Before that, a Canadian document bound for use in Türkiye needed a multi-step process — authentication by Global Affairs Canada, then legalization by the Turkish Embassy or a consulate in Canada. Since the accession, Canadian documents generally just need an apostille instead, matching the simpler process other Hague-member nationalities use.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Because the change is recent, a lot of guidance online (and some officials you might talk to) may still describe the older embassy-legalization route — it's worth confirming current procedure directly before assuming either version applies. From there, most Turkish official filings still require a certified Turkish translation of the apostilled document.
        </p>
        <Link href="/visa-residence/translation-legalization" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Translation & legalization, generally <ArrowRight className="w-3 h-3" />
        </Link>
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
