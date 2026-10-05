import { notFound } from 'next/navigation';
import { getCollectionBySlug, getActivityById, getActivitiesByCity, getCollections } from '@/lib/supabaseServer';
import CollectionView from '@/components/views/CollectionView';
import ActivityView from '@/components/views/ActivityView';

export const revalidate = 3600;

// This single dynamic route is step one of folding both collections and
// activities into the "Living in Istanbul" cluster: it renders whichever
// one the slug resolves to, reusing the exact same view components as the
// original /collections/[slug] and /activity/[id] routes (which stay live
// too, for now, pointing their canonical tag here). Categorization/
// subcategory URLs come in a later pass -- this just gets both content
// types rendering under one slug first.
async function resolveEntity(slug) {
  const collection = await getCollectionBySlug(slug);
  if (collection) return { type: 'collection', data: collection };
  const activity = await getActivityById(slug);
  if (activity) return { type: 'activity', data: activity };
  return null;
}

export async function generateMetadata({ params }) {
  const entity = await resolveEntity(params.slug);
  if (!entity) return { title: 'Not found' };

  if (entity.type === 'collection') {
    const collection = entity.data;
    // Guide-type collections keep their separate canonical home at
    // /guides/<slug> -- see collections/[slug]/page.jsx for why. Everything
    // else is canonical here.
    const canonicalPath = collection.display_style === 'guide'
      ? `/guides/${params.slug}/`
      : `/living-in-istanbul/${params.slug}/`;
    return {
      title: `${collection.title} | Move to Istanbul`,
      description: collection.meta_description || collection.intro?.slice(0, 160),
      alternates: { canonical: canonicalPath },
    };
  }

  const activity = entity.data;
  return {
    title: `${activity.title} — Prices, Duration & Booking | Move to Istanbul`,
    description: activity.description?.slice(0, 160),
    // Same thin-content reasoning as /activity/[id] -- unchanged by which
    // URL serves it. Revisit once this content gets subcategorized with
    // real editorial framing, not before.
    robots: { index: false, follow: true },
    alternates: { canonical: `/living-in-istanbul/${params.slug}/` },
  };
}

export default async function LivingInIstanbulEntityPage({ params }) {
  const entity = await resolveEntity(params.slug);
  if (!entity) notFound();

  if (entity.type === 'collection') {
    return <CollectionView collection={entity.data} backHref="/living-in-istanbul" backLabel="Living in Istanbul" />;
  }

  const activity = entity.data;
  const [nearbyRaw, relatedGuides] = await Promise.all([
    activity.city_name ? getActivitiesByCity(activity.city_name, 11) : Promise.resolve([]),
    activity.city_name ? getCollections({ city: activity.city_name }) : Promise.resolve([]),
  ]);
  const nearby = nearbyRaw.filter((a) => a.id !== activity.id).slice(0, 10);
  const relatedGuide = relatedGuides?.[0] || null;

  return <ActivityView activity={activity} nearby={nearby} relatedGuide={relatedGuide} backHref="/living-in-istanbul" backLabel="Living in Istanbul" />;
}
