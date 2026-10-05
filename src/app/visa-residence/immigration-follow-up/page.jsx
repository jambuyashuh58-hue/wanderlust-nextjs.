import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Immigration Asked for More Documents — What Now? | Move to Istanbul',
  description: 'What a request for additional documents from Göç İdaresi means, and how to respond without losing your place in the queue.',
  alternates: { canonical: '/visa-residence/immigration-follow-up' },
};

const FAQ = [
  {
    q: 'Does a document request mean my application will be rejected?',
    a: "No — it's a routine part of the process for a meaningful share of applications, especially when a document is ambiguous (an income letter that doesn't clearly state a figure, a lease missing a detail) rather than wrong. Respond promptly and completely rather than assuming the worst.",
  },
  {
    q: 'How do I actually submit the extra documents?',
    a: "Instructions usually come through the e-İkamet system or a notice at your provincial immigration office (Göç İdaresi) — follow the specific channel they name rather than emailing generically, since immigration offices generally don't process requests through unofficial channels.",
  },
  {
    q: 'What if I don\'t understand the Turkish-language notice I received?',
    a: 'Get it translated quickly rather than guessing — a sworn translator can usually turn around a short official notice same-day, and misunderstanding a deadline is a bigger risk than the small cost of translation.',
  },
];

export default function ImmigrationFollowUpPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence"
      title="Immigration Follow-Up"
      description="What a request for additional documents means, and how to respond."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence"
      backLabel="Visa & Residence"
      sections={[{ id: 'what', label: 'What to do' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="what">
        <h2 className="text-2xl font-bold mb-4">If Göç İdaresi asks for more</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Respond through the exact channel specified — usually the e-İkamet portal or in person at your provincial office — and respond completely rather than piecemeal, since partial responses often trigger another round of requests and reset your place in the queue.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          If the request is unclear, a sworn translator or someone who has been through the process recently is worth the small cost to get it right the first time — a misunderstood request is the single biggest cause of avoidable delays at this stage.
        </p>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Stuck on a document request right now?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">Book a free call and we'll help you figure out exactly what's being asked for.</p>
        <Link href="/services/book-a-call" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Book a Free Call <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
