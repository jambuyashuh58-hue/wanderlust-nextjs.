import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';
import GuideSchema from '@/components/GuideSchema';

export const metadata = {
  title: 'Arrival & First 90 Days in Istanbul: Setup Order | Move to Istanbul',
  description: 'The exact order to set up your life in Istanbul after you land — tax number, bank account, IstanbulKart, address registration, and more.',
  alternates: { canonical: '/moving-to-istanbul/arrival-setup' },
};

const STEPS = [
  { title: 'Get your tax number (Vergi Kimlik Numarası)', desc: 'Free and quick at any tax office (Vergi Dairesi) — you\'ll need it for almost everything below.' },
  { title: 'Get compliant private health insurance', desc: 'Required for most residence-permit applications; arrange this before your appointment, not after.' },
  { title: 'Sign a notarized lease', desc: 'Verify the building\'s UAVT address code before signing — see the Housing guide for the open/closed neighborhood check.' },
  { title: 'Register your address on e-Devlet / Nüfus', desc: 'Do this within the window your permit type requires — delays here can hold up everything else.' },
  { title: 'Open a Turkish bank account', desc: 'Bring your tax number, passport, and proof of address; some banks are more foreigner-friendly than others.' },
  { title: 'Get your e-Devlet password at PTT', desc: 'Unlocks most government services online, from appointment booking to document requests.' },
  { title: 'Get an IstanbulKart', desc: 'Covers metro, bus, tram, and ferry — get one on day one, it\'s cheaper and faster than single tickets.' },
  { title: 'Attend your residence-permit (Göç İdaresi) appointment', desc: 'Bring every document from your checklist — see the Visa & Residence Permit guide for the full list.' },
  { title: 'Set up utilities and internet in your name', desc: 'Usually requires your notarized lease and tax number; budget a few days for provider scheduling.' },
];

const FAQ = [
  { q: 'Does the order actually matter?', a: 'Mostly yes — your tax number unlocks insurance and banking, and your notarized lease and address registration are usually required before your residence-permit appointment.' },
  { q: 'How long does all of this take?', a: 'Most people complete this list within 2–3 weeks of landing, assuming documents are ready and appointments are available.' },
  { q: 'What if I get stuck on one step?', a: 'Our Full Relocation Concierge service includes bilingual local support for exactly these appointments — see the Services page.' },
];

export default function ArrivalSetupPage() {
  return (
    <>
    <GuideSchema
      path="/moving-to-istanbul/arrival-setup"
      title="Arrival & First 90 Days in Istanbul: Setup Order"
      description="The exact order to set up your life in Istanbul after you land."
      faq={FAQ}
    />
    <GuideLayout
      eyebrow="Arrival & First 90 Days"
      title="Arrival & First 90 Days: The Setup Order"
      description="The exact order to set up your life in Istanbul after you land."
      readTime="9 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/moving-to-istanbul"
      backLabel="Moving to Istanbul"
      sections={[
        { id: 'steps', label: 'Setup Steps' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="steps" className="scroll-mt-24 mb-10">
        <ol className="space-y-5">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="w-7 h-7 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <div>
                <p className="font-semibold text-sm sm:text-base flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> {step.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted-foreground mt-8">
          For the full pre-arrival checklist, see the{' '}
          <Link href="/moving-to-istanbul/checklist" className="text-primary font-medium hover:underline">90-60-30 Day Checklist</Link>.
        </p>
      </section>

      <section id="faq" className="scroll-mt-24 mb-10">
        <h2 className="text-xl font-bold mb-4">Frequently asked questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
    </>
  );
}
