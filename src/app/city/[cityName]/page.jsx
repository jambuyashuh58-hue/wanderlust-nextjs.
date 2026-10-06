import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, ArrowLeft } from 'lucide-react';
import { getCityByName, getActivitiesByCity, getCollections } from '@/lib/supabaseServer';
import ActivityCard from '@/components/ActivityCard';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const city = await getCityByName(params.cityName);
  if (!city) return { title: 'City not found' };
  return {
    title: `${city.name} — Things to Do | Move to Istanbul`,
    description: city.description,
    alternates: { canonical: `/city/${params.cityName}` },
  };
}

export default async function CityDetailPage({ params }) {
  const city = await getCityByName(params.cityName);
  if (!city) notFound();

  // 60, not the old 12 -- every city except Istanbul (302 activities) has
  // 45 or fewer, so this gives every one of those cities' activity pages a
  // real, topically-relevant internal link from their city page instead of
  // relying solely on the single /discover mega-grid for link equity. That
  // gap (most activities having only one inbound internal link, crowded
  // onto one page) is a likely contributor to the ~680 activity/collection
  // pages Search Console reports as "Discovered/Crawled - currently not
  // indexed" -- thin internal-link signal, not thin content. (for=code)
  const [activities, collections] = await Promise.all([
    getActivitiesByCity(city.name, 60),
    getCollections({ city: city.name }),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: city.name,
    description: city.description,
    image: city.image_url,
    ...(activities.length > 0 && {
      hasPart: activities.slice(0, 10).map((a) => ({
        '@type': 'TouristAttraction',
        name: a.title,
        image: a.image_url,
      })),
    }),
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-muted">
          {city.image_url && <Image src={city.image_url} alt={`${city.name}, Türkiye`} fill priority sizes="100vw" className="object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <Link href="/discover" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"><ArrowLeft className="w-4 h-4" /> All Destinations</Link>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{city.name}</h1>
              <p className="flex items-center gap-2 text-white/90 text-sm mb-4"><MapPin className="w-4 h-4" /> {city.country || 'Türkiye'}</p>
              <p className="text-white/90 text-lg max-w-2xl">{city.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-1">Top experiences in {city.name}</h2>
        <p className="text-muted-foreground mb-8">Curated activities and hidden gems, sorted by traveler rating and popularity.</p>
        {activities.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">More experiences coming soon for {city.name}.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5">
            {activities.map((a) => <ActivityCard key={a.id} activity={a} />)}
          </div>
        )}
      </section>

      {collections.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold mb-6">Guides for {city.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {collections.map((c) => (
              <Link key={c.id} href={`/collections/${c.slug}`} className="block p-4 rounded-xl border border-border hover:border-primary/40 hover:shadow-sm transition-all">
                <div className="font-semibold text-sm mb-1">{c.title}</div>
                {c.meta_description && <div className="text-xs text-muted-foreground line-clamp-2">{c.meta_description}</div>}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
