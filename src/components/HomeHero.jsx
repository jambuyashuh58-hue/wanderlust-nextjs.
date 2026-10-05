// New component -- the homepage currently has no hero (per gap analysis vs.
// the old site). Drop this in as the FIRST thing rendered inside
// HomePage()'s returned JSX, before the first SectionHeader row.
// Import in page.jsx: import HomeHero from '@/components/HomeHero';

import Link from 'next/link';
import { FileCheck2, MapPin, Clock3 } from 'lucide-react';

// Hero repositioned around the relocation/concierge offer (Oct 2026 sales
// sprint) -- this is the thing being actively sold ($99/$449/$999 tiers on
// /concierge), while the site's travel/activity content stays live further
// down the homepage and fully indexed, just no longer the first thing a
// visitor sees. (for=code)
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden -mt-16 md:-mt-20 pt-16 md:pt-20">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2000&auto=format&fit=crop"
          alt="Hagia Sophia, Istanbul"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-background" />
        <div className="absolute top-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-b from-black/70 to-transparent" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-36 md:pb-28 text-white">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-xs font-semibold uppercase tracking-wider mb-5">
          <Clock3 className="w-3.5 h-3.5" /> First response within 12 hours
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mb-4">
          Moving to Istanbul? We Build Your Move File.
        </h1>
        <p className="text-base md:text-lg text-white/85 max-w-xl mb-8 leading-relaxed">
          Visa route, housing shortlist, budget, and arrival plan — organized by one desk,
          so you&apos;re not piecing it together from forum threads at midnight.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/concierge"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
          >
            <FileCheck2 className="w-4 h-4" /> Start My Move File
          </Link>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm font-semibold hover:bg-white/20 transition-colors"
          >
            <MapPin className="w-4 h-4" /> Just Visiting? Discover Activities
          </Link>
        </div>
      </div>
    </section>
  );
}
