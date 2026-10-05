import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Moving to Türkiye from Saudi Arabia: Visa & Residence Notes | Move to Istanbul',
  description: 'Entry requirements for Saudi citizens visiting Türkiye, and what Saudi-issued documents need before a Turkish residence permit application will accept them.',
  alternates: { canonical: '/visa-residence/by-nationality/saudi-arabia' },
};

const FAQ = [
  {
    q: 'Do I need a visa to enter Türkiye as a Saudi citizen?',
    a: "Guidance here is generally favorable but worth double-checking directly, since sources differ on the exact mechanism: Turkish Ministry of Foreign Affairs guidance describes Saudi passport holders as visa-exempt for tourism for stays of up to 90 days within any 180-day period, while some travel-industry sources describe a visa-on-arrival arrangement instead. Either way, Saudi citizens are not generally required to apply for a visa in advance for a short tourist trip — but confirm the exact current mechanism on evisa.gov.tr or with your nearest Turkish mission before you book, since this is one of the areas where sources vary and policy is reviewed periodically.",
  },
  {
    q: 'Do my Saudi documents need embassy legalization, or an apostille?',
    a: 'Saudi Arabia joined the Hague Apostille Convention in late 2022, which is relatively recent. Since then, Saudi-issued documents destined for use in fellow Hague member states, including Türkiye, generally go through the Saudi Ministry of Foreign Affairs apostille process rather than the older full consular legalization chain. Because the change is still fairly new, confirm current procedure before assuming it applies to your specific document type.',
  },
  {
    q: 'Where do I get a Saudi document apostilled?',
    a: "The Saudi Ministry of Foreign Affairs handles apostille requests, commonly through its online Bayanati platform for eligible document types. Processing details and eligible document categories have been updated since the 2022 accession, so confirm the current process for your specific document directly with the ministry rather than relying on older guidance.",
  },
];

export default function SaudiArabiaVisaPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence · By Nationality"
      title="Moving to Türkiye from Saudi Arabia"
      description="Entry rules for Saudi passport holders, and what your documents need before a residence permit application accepts them."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence/by-nationality"
      backLabel="By Nationality"
      sections={[{ id: 'entry', label: 'Entering Türkiye' }, { id: 'residence', label: 'For your residence permit' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="entry">
        <h2 className="text-2xl font-bold mb-4">Entering Türkiye as a Saudi citizen</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Saudi passport holders travelling for tourism are generally not required to arrange a visa in advance for a short stay, per Turkish Ministry of Foreign Affairs guidance, which describes Saudi citizens as visa-exempt for tourism for up to 90 days within any 180-day period. That said, sources on this point vary slightly — some travel resources describe the process as a visa-on-arrival rather than a blanket exemption — so it's worth confirming the exact current mechanism before you travel rather than assuming either description.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Whichever mechanism applies, this is the window most people use to start a short-term residence permit (e-İkamet) application from inside Türkiye.
        </p>
        <a href="https://www.evisa.gov.tr/en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Check current status on the official e-Visa portal <ExternalLink className="w-3 h-3" />
        </a>
      </section>
      <section id="residence">
        <h2 className="text-2xl font-bold mb-4">What this means for your residence permit documents</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Saudi Arabia joined the Hague Apostille Convention in December 2022 — a meaningful but fairly recent change. Since then, a Saudi-issued civil document headed for use in a fellow Hague member state like Türkiye generally just needs an apostille from the Saudi Ministry of Foreign Affairs, rather than the older multi-step consular legalization chain that used to run through the Turkish Embassy or a consulate in Saudi Arabia.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Because the accession is still relatively new, confirm current procedure and eligible document types directly with the Saudi Ministry of Foreign Affairs rather than relying on older guidance online. Once apostilled, most Turkish official filings still require a certified Turkish translation of the document.
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
