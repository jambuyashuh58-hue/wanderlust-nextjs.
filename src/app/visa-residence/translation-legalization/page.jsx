import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Document Translation & Legalization for Türkiye Residence | Move to Istanbul',
  description: 'Which documents need a sworn Turkish translation or an apostille for a residence permit application, and how that process works.',
  alternates: { canonical: '/visa-residence/translation-legalization' },
};

const FAQ = [
  {
    q: 'What is a sworn/certified translation, specifically?',
    a: "In Türkiye, it's a translation performed by a notary-registered sworn translator (yeminli tercüman), then stamped and often notarized. A regular bilingual friend's translation isn't accepted for official filings.",
  },
  {
    q: 'What is an apostille and when do I need one?',
    a: 'An apostille is an international certification that authenticates a document issued in one country for legal use in another, under the Hague Convention. Documents issued abroad — like a marriage certificate for a family residence permit, or some proof-of-income letters — often need an apostille from the issuing country before they can be used in Türkiye, sometimes alongside a certified translation.',
  },
  {
    q: 'Where do I get documents translated once I\'m in Türkiye?',
    a: 'Sworn translators (yeminli tercüman) operate in most Turkish notary offices or nearby translation bureaus in any major city — walk-in or same-day service is common for straightforward documents like a passport bio page.',
  },
];

export default function TranslationLegalizationPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence"
      title="Translation & Legalization"
      description="Which documents need a sworn Turkish translation or an apostille, and where to get it done."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence"
      backLabel="Visa & Residence"
      sections={[{ id: 'what', label: 'What needs it' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="what">
        <h2 className="text-2xl font-bold mb-4">Which documents usually need this</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Documents issued by your home country and written in a language other than Turkish generally need a certified (sworn) Turkish translation before Turkish authorities will accept them — this commonly applies to marriage certificates, birth certificates, criminal background checks, and some foreign income/employment letters.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Separately, some foreign-issued official documents need an apostille from the relevant authority in your home country before they even leave — get this done before you travel if you know you'll need it, since it's far harder to arrange from inside Türkiye.
        </p>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Not sure which of your documents need this?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Istanbul Route Check includes a document review for your specific situation.</p>
        <Link href="/services/istanbul-route-check" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Istanbul Route Check <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
