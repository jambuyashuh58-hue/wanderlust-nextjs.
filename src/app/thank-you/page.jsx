import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

// Noindexed -- this is a post-submission confirmation page, not content
// anyone should land on from search. Linked to from form success states as
// those get wired up; not an error if nothing links here yet.
export const metadata = {
  title: 'Thank You | Move to Istanbul',
  description: 'Your request has been received.',
  alternates: { canonical: '/thank-you/' },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen flex items-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-8 h-8 text-success" /></div>
        <h1 className="text-3xl font-bold mb-3">Thank you — we've got it.</h1>
        <p className="text-foreground/80 leading-relaxed mb-8">We'll be in touch within 24 hours. In the meantime, feel free to keep exploring.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/moving-to-turkiye" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold hover:scale-[1.02] transition-transform">
            Explore Moving to Türkiye <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border font-semibold hover:bg-muted transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
