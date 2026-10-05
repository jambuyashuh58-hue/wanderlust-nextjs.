import { getCollections, getCities } from '@/lib/supabaseServer';
import CollectionsFilters from '@/components/CollectionsFilters';

export const revalidate = 3600;

export const metadata = {
  title: 'Browse Türkiye Travel Collections | Move to Istanbul',
  description: 'Curated collections of the best experiences across Istanbul, Cappadocia, Antalya and more.',
  alternates: { canonical: '/collections' },
};

export default async function CollectionsPage() {
  const [collections, cities] = await Promise.all([getCollections(), getCities()]);

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=1920,dpr=1/tour_img/770ec9e911bb322af3e5a1a36d9bae42ca5dee4b06202dca9ab12f7f4fc69502.jpeg"
            alt="Istanbul skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/40" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Guides & Collections</h1>
          <p className="text-white/85 leading-relaxed max-w-3xl">Every Türkiye guide and curated experience set in one place.</p>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {collections.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No collections published yet.</p>
        ) : (
          <CollectionsFilters collections={collections} cities={cities} />
        )}
      </div>
    </div>
  );
}
