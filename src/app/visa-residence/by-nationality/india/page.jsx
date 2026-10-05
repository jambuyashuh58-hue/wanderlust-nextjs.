import Link from 'next/link';
import { ArrowRight, ExternalLink, AlertTriangle } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Moving to Türkiye from India: Visa & Residence Notes | Move to Istanbul',
  description: 'Entry requirements for Indian citizens visiting Türkiye — including e-Visa eligibility rules — and what Indian-issued documents need before a Turkish residence permit application will accept them.',
  alternates: { canonical: '/visa-residence/by-nationality/india' },
};

const FAQ = [
  {
    q: 'Can I get a Turkey e-Visa as an Indian citizen?',
    a: "It depends on what else is in your passport. Historically, Indian passport holders have only been eligible for Türkiye's e-Visa if they already hold a valid visa or residence permit from the US, UK, Ireland, or a Schengen country — and that e-Visa is typically single-entry and valid for a shorter stay than the 90 days other nationalities on this list get. Indian citizens without one of those existing visas generally need to apply for a standard sticker visa through a Turkish embassy, consulate, or authorized visa application center in India. This is one of the more nationality-specific rules on this page and changes periodically, so confirm current eligibility directly on evisa.gov.tr before assuming either route applies to you.",
  },
  {
    q: 'What documents do I need to apply for the e-Visa if I am eligible?',
    a: "If you qualify via an existing US, UK, Irish, or Schengen visa, you'll typically need your passport, a digital copy of that qualifying visa, proof of travel plans, and a payment method for the e-Visa fee. Processing is usually fast, but build in buffer time and double-check the current fee and documentation list on the official portal rather than a third-party site, since these details are revised periodically.",
  },
  {
    q: 'Do my Indian documents need embassy legalization for a residence permit application?',
    a: "India has been a Hague Apostille Convention member since 2005, so Indian-issued civil documents (birth certificates, marriage certificates, police clearance certificates) are generally apostilled through India's Ministry of External Affairs authentication process — usually after a state-level attestation step — rather than going through full Turkish embassy legalization. After that, most Turkish filings still require a certified Turkish translation of the apostilled document.",
  },
];

export default function IndiaVisaPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence · By Nationality"
      title="Moving to Türkiye from India"
      description="Entry rules for Indian passport holders are more involved than for most nationalities on this list — here's what to check before you book."
      readTime="6 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence/by-nationality"
      backLabel="By Nationality"
      sections={[{ id: 'entry', label: 'Entering Türkiye' }, { id: 'residence', label: 'For your residence permit' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="entry">
        <h2 className="text-2xl font-bold mb-4">Entering Türkiye as an Indian citizen</h2>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 mb-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
          <p className="text-sm text-foreground/80 leading-relaxed">
            Unlike most other nationalities on this page, Indian passport holders are not broadly visa-exempt or broadly e-Visa eligible for Türkiye. Don't assume either applies without checking first.
          </p>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Based on Turkish government guidance, an e-Visa has generally only been available to Indian citizens who already hold a valid visa or residence permit from the United States, the United Kingdom, Ireland, or a Schengen-area country — in which case a single-entry e-Visa with a shorter stay allowance than the standard 90 days can usually be obtained online. Indian citizens without one of those existing travel documents typically need to apply for a regular sticker visa in advance through a Turkish embassy, consulate, or an authorized visa application center in India, which involves more lead time than the e-Visa process other nationalities use.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Because this eligibility rule is specific and has been known to change, confirm your exact situation on the official portal well before booking travel — don't rely on a generic e-Visa checker that doesn't ask about your other visas.
        </p>
        <a href="https://www.evisa.gov.tr/en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Check current eligibility on the official e-Visa portal <ExternalLink className="w-3 h-3" />
        </a>
      </section>
      <section id="residence">
        <h2 className="text-2xl font-bold mb-4">What this means for your residence permit documents</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          India has been a Hague Apostille Convention member since 2005, and Türkiye is also a member, so an Indian-issued civil document (birth certificate, marriage certificate, police clearance certificate) generally gets apostilled through the Ministry of External Affairs' authentication process rather than needing full Turkish embassy legalization. In practice this usually involves a state-level attestation step before the apostille, so budget more lead time for this than you would for a single-step apostille process elsewhere. Once apostilled, the document still generally needs a certified Turkish translation for most official filings.
        </p>
        <Link href="/visa-residence/translation-legalization" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Translation & legalization, generally <ArrowRight className="w-3 h-3" />
        </Link>
        <p className="text-foreground/80 leading-relaxed mt-4">
          This matters most for the Family Residence Permit route (apostilled marriage/birth certificates) rather than a standard short-term tourist e-İkamet, which mostly hinges on your lease and insurance paperwork — but given how involved the entry step already is for Indian nationals, it's worth planning the whole sequence together rather than one step at a time.
        </p>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want your exact route mapped out?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">Given how nationality-specific the entry rules are for Indian passport holders, the Istanbul Route Check is especially worth it here — we'll confirm your exact visa eligibility and document path before you book anything.</p>
        <Link href="/services/istanbul-route-check" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Istanbul Route Check <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
