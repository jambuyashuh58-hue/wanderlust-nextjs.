import Link from 'next/link';
import { Heart, Sparkles, Users } from 'lucide-react';
import AboutFAQ from '@/components/AboutFAQ';
import Proof from '@/components/Proof';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata = {
  title: 'About Us | Move to Istanbul',
  description: 'We help travelers discover the depth of Türkiye — beyond the postcards, into the real neighborhoods, hidden museums, and everyday moments that make a place feel like home.',
  alternates: { canonical: '/about' },
};

const FEATURES = [
  { icon: Heart, title: 'Human-curated', body: 'Every collection is hand-picked, not algorithm-generated.' },
  { icon: Sparkles, title: 'AI-assisted', body: 'Personalized recommendations based on your travel style.' },
  { icon: Users, title: 'Community', body: 'A growing space for travelers who want the deeper story.' },
];

export default async function AboutPage() {
  const lastUpdated = new Date().toISOString().slice(0, 10);

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <PageJsonLd type="AboutPage" name="About Move to Istanbul" />
      <div className="bg-[hsl(221,55%,26%)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-5">About Us</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Move to Istanbul</h1>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed">
            We help travelers discover the depth of Türkiye — beyond the postcards, into the real neighborhoods, hidden museums, and everyday moments that make a place feel like home.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-sm sm:prose-base max-w-none mb-12">
          <h2 className="text-xl font-bold mb-2">The idea</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Move to Istanbul started with a simple observation: most travel content about Türkiye is either surface-level tourist checklists or fragmented across forums and expat groups. We wanted a place where discovering an experience felt like being introduced by a friend — one who happens to know the city. The site covers <strong>14 Turkish cities</strong> across <strong>108+ curated collections</strong>, with every activity price shown in Turkish Lira and pulled directly from the booking partner&apos;s live listing.
          </p>

          <h2 className="text-xl font-bold mb-2">How we curate</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Every experience on Move to Istanbul is real, bookable, and researched — not algorithmically pulled. We prioritize activities that reveal the local character of a place: family-run food tours, small museums, quiet neighborhoods worth a slow morning. Star ratings and review counts come straight from the source listings on Viator and GetYourGuide, so what you see is what real travelers rated — not a marketing pitch.
          </p>

          <h2 className="text-xl font-bold mb-2">Long-stay &amp; relocation</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            More and more visitors ask us the same question: <em>could I actually live here?</em> That&apos;s why we built a dedicated relocation section — real answers on visas, housing, cost of living, and settling into daily life in Türkiye. Practical guidance from someone actually based in the country, citing official Turkish sources like the{' '}
            <a href="https://en.goc.gov.tr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Directorate General of Migration Management</a> for anything visa- or residency-related.
          </p>

          <h2 className="text-xl font-bold mb-2">What&apos;s next</h2>
          <p className="text-foreground/80 leading-relaxed">
            More cities, more hidden-gem collections, and deeper concierge tooling to help long-stay travelers plan multi-week trips or a soft landing before they move. If you have suggestions, we&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-5">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3"><Icon className="w-5 h-5 text-primary" /></div>
              <h3 className="font-bold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <Proof />

        <div className="mb-14">
          <h2 className="text-2xl font-bold mb-1">Frequently Asked Questions</h2>
          <p className="text-sm text-muted-foreground mb-6">Questions we get most often about Move to Istanbul and how the site works.</p>
          <AboutFAQ />
        </div>

        <div className="mb-14">
          <h2 className="font-bold mb-3">Sources &amp; References</h2>
          <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
            <li>Türkiye Republic Directorate General of Migration Management: <a href="https://en.goc.gov.tr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">en.goc.gov.tr</a></li>
            <li>Republic of Türkiye e-Visa Application System: <a href="https://evisa.gov.tr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">evisa.gov.tr</a></li>
            <li>Booking-partner listings sourced from <a href="https://viator.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">viator.com</a> and <a href="https://getyourguide.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">getyourguide.com</a>.</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">Page last updated {lastUpdated}.</p>
        </div>

        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center">
          <h3 className="text-xl font-bold mb-1.5">Ready to explore?</h3>
          <p className="text-sm text-muted-foreground mb-5">Start with a personalized recommendation.</p>
          <Link href="/onboarding" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" /> Plan My Trip
          </Link>
        </div>
      </div>
    </div>
  );
}
