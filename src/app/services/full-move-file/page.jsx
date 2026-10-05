import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export const metadata = {
  title: 'Full Move File ($999) | Move to Istanbul',
  description: 'Hand us the whole first month — visa, housing, banking, and settling in — with a bilingual local specialist, airport logistics, and weekly async check-ins.',
  alternates: { canonical: '/services/full-move-file' },
};

const INCLUDES = [
  'Everything in the Housing Shortlist File',
  'Bilingual local specialist accompaniment',
  'Airport arrival logistics',
  'Neighborhood orientation write-up',
  'First-month cost breakdown',
  'Priority response time',
  'Weekly async check-ins until you\'re settled',
];

export default function FullMoveFilePage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"><ArrowLeft className="w-4 h-4" /> All services</Link>
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Full Move File</span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Hand us the whole first month</h1>
        <div className="text-3xl font-bold mb-4">$999<span className="text-sm font-normal text-muted-foreground ml-1">USD</span></div>
        <p className="text-foreground/80 leading-relaxed mb-8">
          This is the version for people who want to land, and have the hard parts already handled before they get off the plane: visa paperwork underway, a housing shortlist ready to view, and a bilingual specialist for the appointments that are miserable to do alone. Weekly check-ins keep it moving until you're actually settled, not just arrived.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 mb-8">
          <h2 className="font-bold mb-4">What's included</h2>
          <ul className="space-y-2.5">
            {INCLUDES.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm"><Check className="w-4 h-4 text-success shrink-0 mt-0.5" /><span>{item}</span></li>
            ))}
          </ul>
        </div>
        <Link href="/services?tier=full" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-white font-semibold hover:scale-[1.02] transition-transform">
          Request the Full Move File <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-sm text-muted-foreground mt-8">
          Not sure this is the right level yet? <Link href="/services/book-a-call" className="text-primary hover:underline">Book a free call</Link> and we'll help you figure out which service actually fits your move.
        </p>
      </div>
    </div>
  );
}
