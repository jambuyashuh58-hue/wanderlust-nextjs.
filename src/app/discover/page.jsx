import { Suspense } from 'react';
import { searchActivities } from '@/lib/supabaseServer';
import ActivityCard from '@/components/ActivityCard';
import DiscoverFilters from '@/components/DiscoverFilters';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Discover Experiences in Türkiye | Move to Istanbul',
  description: 'Search and filter 700+ activities, museums, tours, and hidden gems across 17 Turkish cities.',
  // Canonicalize every filtered/paginated query-string variant (?city=...,
  // ?category=...) back to the bare path -- this page is filtered entirely
  // via searchParams, so without this every combination a visitor filters to
  // would otherwise count as a distinct, Google-indexable URL.
  alternates: { canonical: '/discover' },
};

export default async function DiscoverPage({ searchParams }) {
  const q = searchParams?.q || '';
  const category = searchParams?.category || '';
  const activities = await searchActivities({ q, category, limit: 2000 });

  return (
    <div className="pt-16 md:pt-20">
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Discover Experiences Across Türkiye</h1>
          <p className="text-foreground/80 max-w-3xl leading-relaxed">Browse real, bookable experiences across 17 Turkish cities.</p>
        </div>
      </section>

      <Suspense fallback={<div className="h-24" />}>
        <DiscoverFilters initialSearch={q} initialCategory={category} />
      </Suspense>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-muted-foreground mb-5">{activities.length} experience{activities.length !== 1 ? 's' : ''} found</p>
        {activities.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-lg font-semibold mb-1">No experiences found</h3>
            <p className="text-sm text-muted-foreground">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {activities.map((a) => <ActivityCard key={a.id} activity={a} />)}
          </div>
        )}
      </div>
    </div>
  );
}
