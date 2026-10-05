import Link from 'next/link';
import { ArrowRight, MessageSquare, FileCheck, Users, Clock } from 'lucide-react';

export const metadata = {
  title: 'How We Work | Move to Istanbul',
  description: 'How our relocation services actually run — async by default, real people behind every reply, and what you can expect at each step.',
  alternates: { canonical: '/how-we-work' },
};

const PRINCIPLES = [
  { icon: MessageSquare, title: 'Async by default', body: 'No scheduling calls required unless you want one. We work over text/email and a short intake form, so you\'re not locked into a timezone.' },
  { icon: Users, title: 'Real people, not a content farm', body: 'Every reply, guide, and service comes from a small, independent team based in and around Türkiye — not an outsourced call center or a generic AI chatbot.' },
  { icon: FileCheck, title: 'We say when something isn\'t our lane', body: "We're not licensed immigration lawyers or real estate agents. We coordinate and guide based on our own research and experience, and we say so clearly rather than overstating what a service covers." },
  { icon: Clock, title: 'Clear timelines, no disappearing acts', body: 'Weekly async check-ins on the Full Move File, and a stated response window on every tier, so you\'re never wondering if your inquiry went through.' },
];

export default function HowWeWorkPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-[hsl(221,55%,26%)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-5">How We Work</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">No Calls Required, No Disappearing Acts</h1>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed">How our relocation services actually run, from inquiry to delivery.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3"><p.icon className="w-5 h-5 text-primary" /></div>
              <h3 className="font-bold mb-1.5">{p.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-muted/40 p-6 mb-10">
          <h2 className="font-bold mb-3">The actual flow</h2>
          <ol className="space-y-2.5 text-sm text-foreground/80">
            <li>1. You pick a service tier (or aren't sure yet — book a free call instead) and submit the intake form.</li>
            <li>2. We reply with a short set of follow-up questions — no call needed.</li>
            <li>3. You confirm scope and pay.</li>
            <li>4. We deliver async, with a private status link to track progress on larger engagements.</li>
            <li>5. Weekly check-ins until everything's settled, for the Full Move File.</li>
          </ol>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold hover:scale-[1.02] transition-transform">
            See Our Services <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/editorial-policy" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border font-semibold hover:bg-muted transition-colors">
            Our Editorial Policy <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
