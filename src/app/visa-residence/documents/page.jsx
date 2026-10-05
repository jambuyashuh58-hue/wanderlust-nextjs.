import Link from 'next/link';
import { ArrowRight, CheckSquare } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

const DOCUMENTS = [
  'Valid passport & high-quality color copies (bio page + entry stamps)',
  'Signed e-İkamet online application form (printed from goc.gov.tr)',
  '4 biometric passport photos (white background, taken within 6 months)',
  'Potential Tax ID Number (generated via ivd.gib.gov.tr)',
  'Compliant private Turkish health insurance policy',
  'Notarized Turkish rental contract (signed at notary, with landlord TAPU)',
  'Verified building address UAVT registration code',
  'Proof of sufficient financial means (roughly $1,000-$1,500 USD/month of requested stay, via bank balance or certified income)',
  'Receipt of paid application & card fees',
];

export const metadata = {
  title: 'Residence Permit Document Checklist | Move to Istanbul',
  description: 'The complete document stack for a short-term residence permit application in Türkiye, and which ones trip people up most.',
  alternates: { canonical: '/visa-residence/documents/' },
};

export default function DocumentsPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence"
      title="Documents"
      description="The complete document stack, and which ones trip people up."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence"
      backLabel="Visa & Residence"
      sections={[{ id: 'docs', label: 'Document list' }, { id: 'tricky', label: 'What trips people up' }]}
    >
      <section id="docs">
        <h2 className="text-2xl font-bold mb-4">The full document list</h2>
        <ul className="space-y-2.5">
          {DOCUMENTS.map((d, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80"><CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>{d}</span></li>
          ))}
        </ul>
      </section>
      <section id="tricky">
        <h2 className="text-2xl font-bold mb-4">What actually trips people up</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The notarized lease and UAVT code are the two most common blockers — the apartment or neighborhood turns out not to qualify, or the landlord hasn't registered the building correctly. Confirm both before you sign anything. The proof-of-funds requirement is the other common surprise: a casual bank balance screenshot often isn't accepted — it typically needs to be an official bank letter or statement.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Some documents originating outside Türkiye may also need a sworn translation or apostille — see the next page for which ones.
        </p>
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Next: translation & legalization</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">Which documents need a certified Turkish translation or an apostille, and where to get it done.</p>
        <Link href="/visa-residence/translation-legalization" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Read Translation &amp; Legalization <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
