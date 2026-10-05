import { notFound } from 'next/navigation';
import { getCollectionBySlug } from '@/lib/supabaseServer';
import CollectionView from '@/components/views/CollectionView';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) return { title: 'Collection not found' };
  // Every collection now has a more specific canonical home:
  // - guide-type collections render identically at /collections/<slug> and
  //   /guides/<slug> (see src/app/guides/[slug]/page.jsx) -- canonical to
  //   /guides/<slug>, matching where internal links point.
  // - every other collection is being migrated into the "Living in
  //   Istanbul" resident-lifestyle cluster -- canonical to
  //   /living-in-istanbul/<slug>, which renders the same content (see
  //   src/components/views/CollectionView.jsx, shared by both routes).
  // This page stays live and reachable either way; it just isn't the URL
  // we ask Google to index.
  const canonicalPath = collection.display_style === 'guide'
    ? `/guides/${params.slug}`
    : `/living-in-istanbul/${params.slug}`;
  return {
    title: `${collection.title} | Move to Istanbul`,
    description: collection.meta_description || collection.intro?.slice(0, 160),
    alternates: { canonical: canonicalPath },
  };
}

export default async function CollectionDetailPage({ params }) {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) notFound();
  return <CollectionView collection={collection} backHref="/collections" backLabel="All collections" />;
}
