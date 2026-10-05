import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

const MISTAKES = [
  { title: 'Signing a lease before confirming the neighborhood is "open"', body: 'If the building or district has hit its foreign-resident quota, that lease can\'t be used for your application at all.' },
  { title: 'Submitting an ambiguous proof-of-funds document', body: 'A casual screenshot or an income letter without a clear figure is a common reason for a follow-up request. Get an official bank letter or statement instead.' },
  { title: 'Missing the health insurance compliance requirements', body: 'The policy must explicitly cover emergency, outpatient, and inpatient care under Turkish residency rules — a generic travel-insurance policy usually won\'t qualify.' },
  { title: 'Treating a document request as a rejection', body: 'Most requests for more documents are routine. Responding promptly and completely matters far more than panicking.' },
  { title: 'Booking the appointment too late', body: 'Slots fill up weeks in advance in busy provinces. Book the moment your lease and UAVT code are ready.' },
];

export const metadata = {
  title: 'Common Residence Permit Mistakes | Move to Istanbul',
  description: 'The most common application errors that cause delays or document-request rounds for Türkiye residence permit applicants.',
  alternates: { canonical: '/visa-residence/common-mistakes/' },
};

export default function VisaCommonMistakesPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence"
      title="Common Mistakes"
      description="The application errors that cause delays or rejections most often."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence"
      backLabel="Visa & Residence"
      sections={[{ id: 'mistakes', label: 'Mistakes' }]}
    >
      <section id="mistakes">
        <div className="space-y-5">
          {MISTAKES.map((m, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 flex gap-4">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1.5">{m.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want a second pair of eyes on your application?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Istanbul Route Check includes a document review before you submit.</p>
        <Link href="/services/istanbul-route-check" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Istanbul Route Check <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
