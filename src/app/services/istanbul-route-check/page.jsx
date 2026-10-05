import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export const metadata = {
  title: 'Istanbul Route Check ($99) | Move to Istanbul',
  description: 'A focused 45-minute strategy call plus a personalized visa-route checklist for your nationality — map your exact path before you commit to anything.',
  alternates: { canonical: '/services/istanbul-route-check' },
};

const INCLUDES = [
  'Personalized visa-route checklist for your nationality',
  'A 45-minute live call to walk through your specific situation',
  'Document review plus up to 3 follow-up emails',
  'Help booking your e-ikamet appointment',
  'Access to our long-stay guides',
];

export default function IstanbulRouteCheckPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"><ArrowLeft className="w-4 h-4" /> All services</Link>
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Istanbul Route Check</span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Know your exact visa route before you commit to anything</h1>
        <div className="text-3xl font-bold mb-4">$99<span className="text-sm font-normal text-muted-foreground ml-1">USD</span></div>
        <p className="text-foreground/80 leading-relaxed mb-8">
          Most residence-permit confusion isn't about the rules being hard — it's about which rules apply to your specific nationality, income source, and intended length of stay. This is a 45-minute strategy call plus a written route map, so you stop guessing and start on the right paperwork the first time.
        </p>
        <div className="rounded-2xl border border-border bg-card p-6 mb-8">
          <h2 className="font-bold mb-4">What's included</h2>
          <ul className="space-y-2.5">
            {INCLUDES.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm"><Check className="w-4 h-4 text-success shrink-0 mt-0.5" /><span>{item}</span></li>
            ))}
          </ul>
        </div>
        <Link href="/services?tier=paperwork" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-white font-semibold hover:scale-[1.02] transition-transform">
          Request the Route Check <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-sm text-muted-foreground mt-8">
          Need more than a strategy call? The <Link href="/services/housing-shortlist-file" className="text-primary hover:underline">Housing Shortlist File</Link> and <Link href="/services/full-move-file" className="text-primary hover:underline">Full Move File</Link> build on this with apartment sourcing and end-to-end coordination.
        </p>
      </div>
    </div>
  );
}
