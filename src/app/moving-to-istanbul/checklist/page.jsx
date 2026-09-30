import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';
import GuideSchema from '@/components/GuideSchema';

export const metadata = {
  title: 'The 90-60-30 Day Istanbul Relocation Checklist | Move to Istanbul',
  description: 'Every step of moving to Istanbul, in the order to do it — from 90 days out to your first week on the ground.',
  alternates: { canonical: '/moving-to-istanbul/checklist' },
};

const PHASES = [
  {
    id: '90-days',
    title: '90 Days Out: Decide & Document',
    items: [
      'Confirm your visa/residence pathway (see the Visa & Residence Permit guide)',
      'Start gathering apostilled documents that take weeks to arrive (background checks, degree certificates)',
      'Check your passport has 6+ months validity and enough blank pages',
      'Set a realistic move-in budget — see the Moving Budget page',
      'Research target neighborhoods against your commute, budget, and "open vs. closed" residency quota status',
    ],
  },
  {
    id: '60-days',
    title: '60 Days Out: Apply & Arrange',
    items: [
      'Submit your e-İkamet or visa application file',
      'Book flights (watch the "10-day conditional entry" trap if entering on a tourist e-Visa)',
      'Arrange short-term accommodation for your first 1–2 weeks (avoid signing a full lease sight-unseen)',
      'Start shortlisting apartments — remotely or via our Apartment Shortlisting service',
      'Get compliant Turkish private health insurance quoted (required for most permit types)',
    ],
  },
  {
    id: '30-days',
    title: '30 Days Out: Confirm & Pack',
    items: [
      'Confirm your residence-permit or visa appointment date',
      'Finalize your apartment shortlist and schedule viewings for arrival week',
      'Set up international banking access (a multi-currency card/transfer app) before you land',
      'Notify your current bank/employer/lease of your move-out date',
      'Pack for climate — Istanbul has real winters and hot, humid summers',
    ],
  },
  {
    id: 'arrival-week',
    title: 'Arrival Week: Land & Settle',
    items: [
      'Sign a notarized lease and get your building UAVT address code',
      'Get your tax number (Vergi Kimlik Numarası) — needed for almost everything else',
      'Open a Turkish bank account',
      'Get an IstanbulKart for public transport',
      'Register your address on e-Devlet / Nüfus',
      'Attend your residence-permit (Göç İdaresi) appointment',
      'See the full Arrival & First 90 Days page for the complete setup order',
    ],
  },
];

const FAQ = [
  { q: 'Can I compress this into less than 90 days?', a: "Yes, especially if you're entering on an existing visa type with no permit application needed — but the visa/residence step still sets the pace, since appointment availability is outside your control." },
  { q: "What's the single most common mistake?", a: 'Signing a full-year lease before confirming which neighborhoods count as "open" for your residence permit type — see the Housing guide for the open/closed neighborhood check.' },
  { q: 'Do I need to do all of this myself?', a: 'No — our concierge services can take on the visa paperwork, apartment shortlisting, or the entire first month, so you only need to handle what you want to.' },
];

export default function ChecklistPage() {
  return (
    <>
    <GuideSchema
      path="/moving-to-istanbul/checklist"
      title="The 90-60-30 Day Istanbul Relocation Checklist"
      description="Every step of moving to Istanbul, in the order to do it — from 90 days out to your first week on the ground."
      faq={FAQ}
    />
    <GuideLayout
      eyebrow="Master Checklist"
      title="The 90-60-30 Day Relocation Checklist"
      description="Every step of moving to Istanbul, in the order to do it."
      readTime="8 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/moving-to-istanbul"
      backLabel="Moving to Istanbul"
      sections={PHASES.map((p) => ({ id: p.id, label: p.title }))}
    >
      {PHASES.map((phase) => (
        <section key={phase.id} id={phase.id} className="scroll-mt-24 mb-10">
          <h2 className="text-xl font-bold mb-4">{phase.title}</h2>
          <ul className="space-y-3">
            {phase.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section id="faq" className="scroll-mt-24 mb-10">
        <h2 className="text-xl font-bold mb-4">Frequently asked questions</h2>
        <GuideFAQ items={FAQ} />
      </section>

      <p className="text-sm text-muted-foreground">
        Want the full step-by-step version with worksheets and trackers? Get the free{' '}
        <Link href="/free-istanbul-relocation-guide" className="text-primary font-medium hover:underline">90-60-30 Day Relocation Guide</Link>.
      </p>
    </GuideLayout>
    </>
  );
}
