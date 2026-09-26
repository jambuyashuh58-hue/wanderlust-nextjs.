// New component -- the homepage currently has no hero (per gap analysis vs.
// the old site). Drop this in as the FIRST thing rendered inside
// HomePage()'s returned JSX, before the first SectionHeader row.
// Import in page.jsx: import HomeHero from '@/components/HomeHero';

import Link from 'next/link';
import { Sparkles, MapPin } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden -mt-16 md:-mt-20 pt-16 md:pt-20">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000&auto=format&fit=crop"
          alt="Istanbul skyline at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-36 md:pb-28 text-white">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-xs font-semibold uppercase tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5" /> AI-powered travel discovery
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mb-4">
          Welcome to Türkiye.
        </h1>
        <p className="text-base md:text-lg text-white/85 max-w-xl mb-8 leading-relaxed">
          From Istanbul&apos;s hidden courtyards to Cappadocia&apos;s balloons at dawn — real
          places, ranked honestly, plus a concierge team if you&apos;re staying longer than a trip.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-4 h-4" /> Plan My Trip
          </Link>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm font-semibold hover:bg-white/20 transition-colors"
          >
            <MapPin className="w-4 h-4" /> Discover Activities
          </Link>
        </div>
      </div>
    </section>
  );
}
