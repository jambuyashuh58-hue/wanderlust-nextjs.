import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'How the Short-Term Residence Permit (e-İkamet) Works | Move to Istanbul',
  description: 'Step-by-step walkthrough of applying for a short-term tourist residence permit in Türkiye, from notarized lease to appointment to card delivery.',
  alternates: { canonical: '/visa-residence/short-term-residence-permit/' },
};

const STEPS = [
  { title: '1. Have a notarized lease in an "open" neighborhood', body: 'Your rental contract needs to be notarized, and the neighborhood needs to still be accepting new foreign-resident registrations (some hit a quota and close). The building also needs a valid UAVT address code.' },
  { title: '2. Apply online via e-İkamet', body: 'Submit your application at the official goc.gov.tr e-İkamet portal. You\'ll select an appointment date at your local immigration office (Göç İdaresi) as part of this step — slots can book out weeks ahead.' },
  { title: '3. Gather and submit your documents', body: 'Passport copies, photos, tax ID number, health insurance policy, proof of financial means, and the notarized lease. See the full document list for specifics.' },
  { title: '4. Pay the application and card fees', body: 'Paid at a tax office or designated bank (commonly Ziraat Bankası) before or at your appointment, depending on current procedure.' },
  { title: '5. Attend your appointment', body: 'Bring physical copies of everything — don\'t rely on phone access. Biometrics are typically taken here if not already on file.' },
  { title: '6. Wait for the card', body: 'Processing and card delivery timelines vary; it\'s common to wait several weeks to a few months. You can generally stay in the country on your application receipt while it processes, within your visa-free/visa period.' },
];

const FAQ = [
  {
    q: 'How long does the whole process take?',
    a: 'From notarized lease to card in hand, budget 1-4 months depending on appointment availability and current processing volume at your local immigration office. The application itself (steps 1-5) can often be done within a few weeks if appointment slots are available.',
  },
  {
    q: 'What if immigration asks for additional documents after I apply?',
    a: 'This is common and not automatically a problem — see our immigration follow-up page for how to respond and typical timelines.',
  },
];

export default function ShortTermResidencePermitPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence"
      title="The Short-Term Residence Permit"
      description="How e-İkamet actually works, step by step, once you have a lease."
      readTime="6 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence"
      backLabel="Visa & Residence"
      sections={[{ id: 'steps', label: 'The process' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="steps">
        <div className="space-y-5">
          {STEPS.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold mb-1.5">{s.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want this handled or double-checked?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Istanbul Route Check includes a document review and help booking your appointment.</p>
        <Link href="/services/istanbul-route-check" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Istanbul Route Check <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
