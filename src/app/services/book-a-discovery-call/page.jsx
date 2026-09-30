import Link from 'next/link';
import { Video, ArrowLeft, CheckCircle2 } from 'lucide-react';
import GuideSchema from '@/components/GuideSchema';

export const metadata = {
  title: 'Book a Free Discovery Call | Move to Istanbul',
  description: 'A free 15-minute call to figure out which relocation service fits your move to Istanbul — no pressure, no obligation.',
  alternates: { canonical: '/services/book-a-discovery-call' },
};

// See ChatBubble.jsx for the same env-driven pattern.
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

export default function BookDiscoveryCallPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <GuideSchema
        path="/services/book-a-discovery-call"
        title="Book a Free Discovery Call"
        description="A free 15-minute call to figure out which relocation service fits your move to Istanbul."
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Link href="/services" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary text-sm mb-6"><ArrowLeft className="w-4 h-4" /> All services</Link>
        <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-5">
          <Video className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Free 15-Minute Discovery Call</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Tell us where you are in the process and where you&apos;re moving from. We&apos;ll tell you honestly which service (or none at all) makes sense — no pressure, no obligation.
        </p>
        <ul className="text-left inline-flex flex-col gap-2.5 mb-10">
          {[
            'Confirm your visa pathway before you commit to anything',
            "Get a straight answer on whether you need help, or can DIY it",
            'Leave with a clear next step either way',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div>
          {CALENDLY_URL ? (
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-primary text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
            >
              Book My Free Call
            </a>
          ) : (
            <p className="text-sm text-destructive">Booking link not configured yet — contact us via WhatsApp instead.</p>
          )}
        </div>
      </div>
    </div>
  );
}
