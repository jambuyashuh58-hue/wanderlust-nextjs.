import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Our Partner Network | Move to Istanbul',
  description: 'How we work with booking platforms and local specialists, and how that affects — or doesn\'t affect — our recommendations.',
  alternates: { canonical: '/partner-network' },
};

export default function PartnerNetworkPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">Partner Network</span>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Who We Work With</h1>
        <div className="space-y-6 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">Booking partners</h2>
            <p>Activities and experiences on this site are bookable through affiliate links with Viator and GetYourGuide. We earn a commission when you book through one of these links, at no extra cost to you. We never accept payment to rank an activity higher — selection and ordering are editorial, not sponsored.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">Relocation services network</h2>
            <p>Our relocation services (Istanbul Route Check, Housing Shortlist File, Full Move File) are delivered by our own small team, sometimes alongside local property agents or bilingual specialists on the ground for specific tasks like apartment viewings or walk-through videos. We vet who we work with directly rather than through an open marketplace, and we stand behind the coordination we provide even when a specific task is handled by someone local to that step.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">What this doesn't affect</h2>
            <p>Our guides, cost breakdowns, and neighborhood comparisons are not influenced by any partner relationship — if a partner's offering isn't a good fit for a specific situation, we say so.</p>
          </section>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/editorial-policy" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold hover:scale-[1.02] transition-transform">
            Read Our Editorial Policy <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
