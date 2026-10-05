import { notFound } from 'next/navigation';
import { getActivityById, getActivitiesByCity, getCollections } from '@/lib/supabaseServer';
import ActivityView from '@/components/views/ActivityView';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const activity = await getActivityById(params.id);
  if (!activity) return { title: 'Activity not found' };
  return {
    title: `${activity.title} — Prices, Duration & Booking | Move to Istanbul`,
    description: activity.description?.slice(0, 160),
    // These pages are thin (title + one short partner-sourced paragraph +
    // an affiliate link) and there are 700+ of them -- crawlable but kept
    // out of the index so they don't read as thin/doorway content to
    // Google (this was flagged in a GSC indexing audit and is also why
    // AdSense's automated review rejected the site for "low value
    // content"). Still reachable via internal links/city pages, just not
    // indexed or in the sitemap. (for=code)
    robots: { index: false, follow: true },
    // Also reachable at /living-in-istanbul/<id> (same content, see
    // ActivityView.jsx) as that cluster gets built out -- point the
    // canonical there since that's the long-term home, even while this
    // page stays noindexed either way.
    alternates: { canonical: `/living-in-istanbul/${params.id}` },
  };
}

export default async function ActivityDetailPage({ params }) {
  const activity = await getActivityById(params.id);
  if (!activity) notFound();

  const [nearbyRaw, relatedGuides] = await Promise.all([
    activity.city_name ? getActivitiesByCity(activity.city_name, 11) : Promise.resolve([]),
    activity.city_name ? getCollections({ city: activity.city_name }) : Promise.resolve([]),
  ]);
  const nearby = nearbyRaw.filter((a) => a.id !== activity.id).slice(0, 10);
  const relatedGuide = relatedGuides?.[0] || null;

  return <ActivityView activity={activity} nearby={nearby} relatedGuide={relatedGuide} backHref="/discover" backLabel="Back to experiences" />;
}
