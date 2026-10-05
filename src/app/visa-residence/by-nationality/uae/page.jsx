import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Moving to Türkiye from the UAE: Visa & Residence Notes | Move to Istanbul',
  description: 'Entry requirements for UAE citizens visiting Türkiye, and a recent change in how UAE-issued documents get legalized for a residence permit.',
  alternates: { canonical: '/visa-residence/by-nationality/uae/' },
};

const FAQ = [
  {
    q: 'Do I need a visa to enter Türkiye as a UAE citizen?',
    a: "Per the Turkish Ministry of Foreign Affairs, UAE passport holders travelling for tourism are visa-exempt for stays of up to 90 days within any 180-day period. That's the window most people use to start a short-term residence permit application from inside Türkiye. Confirm on evisa.gov.tr before you travel, since this is reviewed periodically.",
  },
  {
    q: 'Do my UAE documents need embassy legalization, or an apostille?',
    a: "This has recently changed, which is why it's worth double-checking: the UAE only became a member of the Hague Apostille Convention around the 2024–2025 period. Before joining, a UAE-issued document needed the full chain — UAE Ministry of Foreign Affairs (MOFA) attestation followed by legalization at the Turkish Embassy or a consulate in the UAE. Since joining, documents destined for use in fellow Hague member states, including Türkiye, can generally use a single apostille from the competent UAE authority instead. Because the change is recent, confirm current procedure directly rather than assuming either version still applies.",
  },
  {
    q: 'Where do I get a UAE document apostilled now?',
    a: "The UAE Ministry of Foreign Affairs (MOFA) handles both the newer apostille process and the older attestation chain, so you'll go through the same ministry either way — what differs is which stamp you end up asking for. Given how new this process is, build in extra buffer time and confirm directly with MOFA or a licensed document-clearing agent rather than relying on older guidance.",
  },
];

export default function UaeVisaPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence · By Nationality"
      title="Moving to Türkiye from the UAE"
      description="Entry rules for UAE passport holders, and a recent change in how your documents get legalized."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence/by-nationality"
      backLabel="By Nationality"
      sections={[{ id: 'entry', label: 'Entering Türkiye' }, { id: 'residence', label: 'For your residence permit' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="entry">
        <h2 className="text-2xl font-bold mb-4">Entering Türkiye as a UAE citizen</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          UAE passport holders travelling for tourism are visa-exempt for short stays, per the Turkish Ministry of Foreign Affairs — no e-Visa or advance application needed for a standard tourist trip. This is the entry most people use before filing a short-term residence permit (e-İkamet) application from inside the country.
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
          This is worth flagging specifically for UAE nationals and residents: the UAE only recently joined the Hague Apostille Convention, around 2024–2025. For decades before that, a UAE-issued document needed full consular legalization — attestation by the UAE Ministry of Foreign Affairs (MOFA), then legalization at the Turkish Embassy or consulate in the UAE — before Turkish authorities would accept it. Since accession, an apostille from the competent UAE authority can generally replace that embassy-legalization step for use in Türkiye, matching the simpler process other Hague-member nationalities use.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Because this is such a recent change, treat any guidance you read — including this page — as a starting point rather than the final word, and confirm current procedure with UAE MOFA or the Turkish consulate before relying on it. Once legalized, most Turkish official filings still require a certified Turkish translation of the document.
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
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">Given how recently the document-legalization process changed for UAE nationals, the Istanbul Route Check is a good way to confirm the current procedure before you commit to a timeline.</p>
        <Link href="/services/istanbul-route-check" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Istanbul Route Check <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
