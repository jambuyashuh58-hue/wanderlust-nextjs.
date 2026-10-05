import Link from 'next/link';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Book a Free Call | Move to Istanbul',
  description: 'Not sure which relocation service fits your move? Book a short, free call and we\'ll help you figure out what you actually need.',
  alternates: { canonical: '/services/book-a-call/' },
};

// Reuses the same NEXT_PUBLIC_CALENDLY_URL env var already wired up for
// ChatBubble/drip-emails -- no new scheduling integration needed. Falls
// back to the Instagram DM (same fallback pattern used elsewhere) when
// that var isn't set, rather than a dead link.
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || '';
const INSTAGRAM_URL = 'https://www.instagram.com/move_istanbul';

export default function BookACallPage() {
  const bookingHref = CALENDLY_URL || INSTAGRAM_URL;

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"><ArrowLeft className="w-4 h-4" /> All services</Link>
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Book a Call</span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Not sure which service fits your move?</h1>
        <p className="text-foreground/80 leading-relaxed mb-8 max-w-lg mx-auto">
          A short, free call before you commit to anything. Tell us your nationality, timeline, and what you're trying to figure out — we'll tell you honestly whether the Route Check, the Shortlist File, or the Full Move File is the right fit, or whether you don't need us at all yet.
        </p>
        <a
          href={bookingHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-white font-semibold hover:scale-[1.02] transition-transform"
        >
          <MessageCircle className="w-4 h-4" /> {CALENDLY_URL ? 'Book your free call' : 'Message us on Instagram'}
        </a>
        <p className="text-sm text-muted-foreground mt-8">
          Prefer to just send details in writing? Use the <Link href="/services" className="text-primary hover:underline">intake form on the services page</Link> instead <ArrowRight className="inline w-3.5 h-3.5" />
        </p>
      </div>
    </div>
  );
}
