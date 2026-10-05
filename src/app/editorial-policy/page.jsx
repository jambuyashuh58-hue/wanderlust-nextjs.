import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Editorial Policy | Move to Istanbul',
  description: 'How we research, verify, and update the guides on Move to Istanbul, and how affiliate and service revenue relates to our editorial choices.',
  alternates: { canonical: '/editorial-policy' },
};

export default function EditorialPolicyPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">Editorial Policy</span>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">How We Write What We Write</h1>
        <div className="space-y-6 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">Who writes this</h2>
            <p>Our guides and collections are written and curated by a small, independent team based in and around Türkiye, informed by people who have actually lived in or moved to the country — not a content farm, and not purely AI-generated without human review.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">How we verify facts</h2>
            <p>Where a fact is externally checkable — a fee amount, an insurance requirement, an opening-hours pattern, a transit fare — we verify it against current public sources rather than relying on memory or guesswork. Pages carry a "last checked" date so you can judge how current the information is.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">We are not lawyers or licensed agents</h2>
            <p>We aren't licensed immigration lawyers or real estate agents. Our guides and services are coordination and guidance based on our own research and experience — not legal representation. For visa applications, residence permits, tax matters, or property transactions, always confirm current requirements with the relevant official source or a licensed professional.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">How monetization relates to editorial content</h2>
            <p>We earn affiliate commissions on activity bookings and fees from our paid relocation services — see our <Link href="/partner-network" className="text-primary hover:underline">partner network</Link> page for the specifics. Neither influences which activities, neighborhoods, or services we recommend in editorial content; we don't accept payment to rank anything higher.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">Corrections</h2>
            <p>If you spot something out of date or inaccurate, <Link href="/contact" className="text-primary hover:underline">let us know</Link> — we update pages when something has materially changed.</p>
          </section>
        </div>
        <div className="mt-10">
          <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold hover:scale-[1.02] transition-transform">
            More About Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
