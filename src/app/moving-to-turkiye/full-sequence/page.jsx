import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'The Full Sequence: Moving to Türkiye Step by Step | Move to Istanbul',
  description: 'The actual order of operations for moving to Türkiye — what has to happen before what, and which steps can run in parallel.',
  alternates: { canonical: '/moving-to-turkiye/full-sequence/' },
};

const PHASES = [
  {
    phase: '8-12 weeks out',
    title: 'Decide your pathway and entry point',
    body: "Pick your visa pathway first — it decides almost everything downstream. The Digital Nomad Visa, the short-term tourist e-İkamet route, and a work permit each need different documents and timing. Read the full breakdown on our visa guide before booking anything.",
    link: { href: '/guides/visa', label: 'Compare visa pathways' },
  },
  {
    phase: '6-8 weeks out',
    title: 'Start the paper trail',
    body: 'Health insurance, proof of funds, and any documents that need notarization or apostille in your home country take the longest to arrange — start these before you fly, not after.',
    link: { href: '/moving-to-turkiye/visa-and-documents', label: 'See the document list' },
  },
  {
    phase: '4-6 weeks out',
    title: 'Book a short-term landing pad, not your real apartment',
    body: "Do not sign a long-term lease before you've seen the neighborhood in person. Book 2-4 weeks of short-term furnished housing instead — this is also what most residence-permit applications require as your address while you search for a notarized lease in an open neighborhood.",
    link: { href: '/moving-to-turkiye/housing-timeline', label: 'See the housing timeline' },
  },
  {
    phase: '1-2 weeks out',
    title: 'Final budget check and arrival logistics',
    body: 'Confirm you have enough liquid funds for the first-month costs (deposit, agency fee, initial furnishing), and set up airport transfer and your first few days.',
    link: { href: '/moving-to-turkiye/budget', label: 'See real first-month costs' },
  },
  {
    phase: 'Week 1 in Türkiye',
    title: 'Arrival setup',
    body: 'Local SIM, a Turkish bank account if your plan needs one, and your tax ID number (needed for the residence permit application) all happen in your first week, usually in that order.',
    link: { href: '/moving-to-turkiye/arrival-setup', label: 'See the arrival setup guide' },
  },
  {
    phase: 'Weeks 2-4',
    title: 'Sign your real lease and submit the residence permit application',
    body: "Once you've found an apartment in an open neighborhood and notarized the lease, you can submit the e-İkamet application with your UAVT address code. This is usually the single longest-lead-time step — appointment slots can book out weeks in advance.",
    link: { href: '/guides/housing', label: 'See the housing guide' },
  },
];

const FAQ = [
  {
    q: 'Can I do any of these steps in parallel?',
    a: "Yes — the visa-pathway decision and the document gathering can run alongside short-term housing research. The one step that genuinely can't be rushed is the residence permit appointment itself, since booking slots depend on government system availability, not on how prepared you are.",
  },
  {
    q: 'What if I\'m moving on a tighter timeline than 8-12 weeks?',
    a: "It's done regularly in 4-6 weeks, but expect to pay rush fees for document processing and to have fewer notary/appointment slot options. The sequence stays the same — it just compresses.",
  },
];

export default function FullSequencePage() {
  return (
    <GuideLayout
      eyebrow="Moving to Türkiye"
      title="The Full Sequence"
      description="What has to happen before what — and what can run in parallel."
      readTime="7 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/moving-to-turkiye"
      backLabel="Moving to Türkiye"
      sections={[{ id: 'sequence', label: 'The sequence' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="sequence">
        <div className="space-y-6">
          {PHASES.map((p, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">{p.phase}</p>
              <h3 className="font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">{p.body}</p>
              <Link href={p.link.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">{p.link.label} <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
          ))}
        </div>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
