import { getCollections, getCities } from '@/lib/supabaseServer';
import CollectionsFilters from '@/components/CollectionsFilters';

export const revalidate = 3600;

export const metadata = {
  title: 'Browse Türkiye Travel Collections | Wanderlust',
  description: 'Curated collections of the best experiences across Istanbul, Cappadocia, Antalya and more.',
};

export default async function CollectionsPage() {
  const [collections, cities] = await Promise.all([getCollections(), getCities()]);

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Guides & Collections</h1>
          <p className="text-foreground/80 leading-relaxed max-w-3xl">Every Türkiye guide and curated experience set in one place.</p>
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
