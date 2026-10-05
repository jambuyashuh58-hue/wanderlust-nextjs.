import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Moving to Türkiye from Russia: Visa & Residence Notes | Move to Istanbul',
  description: 'Entry requirements for Russian citizens visiting Türkiye, including the shorter visa-free stay allowance, and document legalization notes for a residence permit.',
  alternates: { canonical: '/visa-residence/by-nationality/russia' },
};

const FAQ = [
  {
    q: 'Do I need a visa to enter Türkiye as a Russian citizen?',
    a: 'Per Turkish Ministry of Foreign Affairs guidance, ordinary Russian passport holders travelling for tourism or business are visa-exempt — but for a shorter stay than most other nationalities on this list: up to 60 days rather than the 90-day allowance given elsewhere. Service passport holders and diplomatic passport holders are treated differently again. Confirm your specific category and the current allowance on evisa.gov.tr before you travel, since this is reviewed periodically.',
  },
  {
    q: 'Why is the visa-free stay shorter for Russian citizens than for most other nationalities here?',
    a: "This comes down to the specific bilateral arrangement between Türkiye and Russia rather than a general rule — it's simply set at 60 days rather than 90. If your plans depend on exactly how long you can stay before needing to apply for a residence permit or leave, build your timeline around the 60-day figure rather than assuming the 90-day window other nationalities get.",
  },
  {
    q: 'Do my Russian documents need embassy legalization, or an apostille?',
    a: 'Russia has been a member of the Hague Apostille Convention since the early 1990s, so this is a long-settled process. A Russian-issued civil document (birth certificate, marriage certificate, a background check) is generally apostilled through the Russian Ministry of Justice or the relevant regional justice department, depending on the document type, rather than needing full Turkish embassy legalization. It will still generally need a certified Turkish translation afterwards for most official filings.',
  },
];

export default function RussiaVisaPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence · By Nationality"
      title="Moving to Türkiye from Russia"
      description="Entry rules for Russian passport holders — including a shorter visa-free stay than most nationalities here — and document notes for a residence permit."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence/by-nationality"
      backLabel="By Nationality"
      sections={[{ id: 'entry', label: 'Entering Türkiye' }, { id: 'residence', label: 'For your residence permit' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="entry">
        <h2 className="text-2xl font-bold mb-4">Entering Türkiye as a Russian citizen</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Ordinary Russian passport holders travelling for tourism or business are visa-exempt, per Turkish Ministry of Foreign Affairs guidance — but worth noting specifically, the allowance is shorter than for most other nationalities on this page: up to 60 days rather than 90. Service passport holders get a different (shorter) allowance, and diplomatic passport holders a longer one, so confirm which category applies to you.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Build your plans around the 60-day figure if you're timing a short-term residence permit application against your visa-free entry, and confirm the current allowance before you travel since this is reviewed periodically.
        </p>
        <a href="https://www.evisa.gov.tr/en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Check current status on the official e-Visa portal <ExternalLink className="w-3 h-3" />
        </a>
      </section>
      <section id="residence">
        <h2 className="text-2xl font-bold mb-4">What this means for your residence permit documents</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Russia has been a Hague Apostille Convention member since the early 1990s, and Türkiye is also a member, so a Russian-issued civil document (birth certificate, marriage certificate, a background check) is typically apostilled through the Russian Ministry of Justice or a regional justice department — not routed through full Turkish embassy legalization. Once apostilled, most Turkish official filings still require a certified Turkish translation of the document.
        </p>
        <Link href="/visa-residence/translation-legalization" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Translation & legalization, generally <ArrowRight className="w-3 h-3" />
        </Link>
        <p className="text-foreground/80 leading-relaxed mt-4">
          Given the current geopolitical climate, practical details — bank transfers for fees, document courier timelines, consular appointment availability — can shift faster than usual for Russian applicants specifically. Confirm current procedure with your local consulate or the relevant Turkish office close to when you actually apply, rather than relying on guidance that may be a few months old.
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
