// Server Component -- data fetched here, on the server, before any HTML
// reaches the browser. Redesigned as a dense, magazine-style layout
// (multiple categorized content rows, full page width) matching the
// istanbeautiful.com-style template the user asked to match.
import Link from 'next/link';
import { ArrowRight, MapPin, Compass, Home as HomeIcon, Utensils, Landmark, Waves } from 'lucide-react';
import { getCities, getAllActivities, getCollections, getActivitiesByCategory } from '@/lib/supabaseServer';
import CityCard from '@/components/CityCard';
import ActivityCard from '@/components/ActivityCard';
import HomeHero from '@/components/HomeHero';
import WhyWanderlust from '@/components/WhyWanderlust';
import TrustBadges from '@/components/TrustBadges';
import CategoryTiles from '@/components/CategoryTiles';
import VideoBlogs from '@/components/VideoBlogs';
import RankBadge from '@/components/RankBadge';
import RelocationQuizCTA from '@/components/RelocationQuizCTA';
import ConciergeCTA from '@/components/ConciergeCTA';
import { getLocale } from '@/lib/i18nServer';

export const revalidate = 3600;

// The homepage had no metadata export of its own -- it fell through to the
// root layout's title/description/openGraph with no explicit canonical, the
// same gap that produced several "Duplicate, Google chose different
// canonical than user" flags in Search Console on other pages. (for=code)
export async function generateMetadata() {
  const tr = (await getLocale()) === 'tr';
  return {
    alternates: { canonical: tr ? '/tr' : '/', languages: { en: '/', tr: '/tr' } },
  };
}

function SectionHeader({ eyebrow, title, href }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        {eyebrow && <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{eyebrow}</p>}
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      {href && <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-1.5 transition-all shrink-0">See all <ArrowRight className="w-4 h-4" /></Link>}
    </div>
  );
}

export default async function HomePage() {
  const [cities, allActivities, collections, museums, tours, foodExp] = await Promise.all([
    getCities({ popular: true }),
    getAllActivities(12),
    getCollections(),
    getActivitiesByCategory('Museums', 6),
    getActivitiesByCategory('Guided Tours', 6),
    getActivitiesByCategory('Food Experiences', 6),
  ]);

  return (
    <div className="pt-16 md:pt-20">
      <HomeHero />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">

        {/* Popular destinations -- wide grid, more cities visible at once */}
        <section>
          <SectionHeader eyebrow="Destinations" title="Choose Your City" href="/discover" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Only the first 6 show on a phone (2 cols x 3 rows) so the
                homepage doesn't turn into an endless scroll of city tiles
                before reaching the rest of the page -- "See all" (above)
                takes mobile users to the full list on /discover. */}
            {cities.slice(0, 12).map((city, i) => (
              <div key={city.id} className={i >= 6 ? 'hidden sm:block' : ''}><CityCard city={city} /></div>
            ))}
          </div>
        </section>

        <WhyWanderlust />

        <CategoryTiles />

        {/* Most popular right now */}
        <section>
          <SectionHeader eyebrow="Trending Now" title="Most Popular Experiences" href="/discover" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {allActivities.map((a, i) => (
              <div key={a.id} className={i >= 6 ? 'hidden sm:block' : ''}><ActivityCard activity={a} /></div>
            ))}
          </div>
        </section>

        {/* Museums row */}
        {museums.length > 0 && (
          <section>
            <SectionHeader eyebrow="Must Do & See" title="Museums & Historic Sites" href="/discover?category=Museums" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {museums.map((a) => <ActivityCard key={a.id} activity={a} />)}
            </div>
          </section>
        )}

        {/* Guided tours row */}
        {tours.length > 0 && (
          <section>
            <SectionHeader eyebrow="Practical Türkiye" title="Guided Tours & Day Trips" href="/discover?category=Guided+Tours" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {tours.map((a) => <ActivityCard key={a.id} activity={a} />)}
            </div>
          </section>
        )}

        {/* Food row */}
        {foodExp.length > 0 && (
          <section>
            <SectionHeader eyebrow="Food & Drink" title="Culinary Experiences" href="/discover?category=Food+Experiences" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {foodExp.map((a) => <ActivityCard key={a.id} activity={a} />)}
            </div>
          </section>
        )}

        {/* Guides & collections -- dense card grid, magazine style */}
        {collections.length > 0 && (
          <section>
            <SectionHeader eyebrow="Guides" title="Curated Collections" href="/collections" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {collections.slice(0, 12).map((c, i) => {
                const card = (
                  <Link href={`/collections/${c.slug}`} data-track="collection" data-collection-id={c.id} data-slug={c.slug} data-title={c.title} className="group block rounded-xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-md transition-all bg-card">
                    <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                      {c.hero_image_url && <img src={c.hero_image_url} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                    </div>
                    <div className="p-2.5">
                      <h3 className="text-xs font-semibold line-clamp-2 group-hover:text-primary transition-colors">{c.title}</h3>
                    </div>
                  </Link>
                );
                const wrapperClass = i >= 6 ? 'hidden sm:block' : undefined;
                return i < 6 ? <RankBadge key={c.id} rank={i + 1}>{card}</RankBadge> : <div key={c.id} className={wrapperClass}>{card}</div>;
              })}
            </div>
          </section>
        )}

        <VideoBlogs />

        <RelocationQuizCTA />

        <ConciergeCTA />

        {/* Practical Türkiye -- quick-link tiles, magazine-style utility row */}
        <section>
          <SectionHeader eyebrow="Plan Your Trip" title="Practical Türkiye" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/guides/visa', icon: Compass, label: 'Visa Guide' },
              { href: '/guides/housing', icon: HomeIcon, label: 'Housing Guide' },
              { href: '/guides/cost-of-living', icon: Landmark, label: 'Cost of Living' },
              { href: '/country-guides', icon: MapPin, label: 'Country Guides' },
            ].map((tile) => (
              <Link key={tile.href} href={tile.href} className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:shadow-sm transition-all bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><tile.icon className="w-5 h-5 text-primary" /></div>
                <span className="text-sm font-semibold">{tile.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <TrustBadges />
      </div>
    </div>
  );
}
