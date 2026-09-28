// Next.js App Router metadata route -- auto-generates /sitemap.xml at build
// time (and on ISR refresh, per `revalidate` below). This is separate from
// /site-directory.html (a human/crawler-facing linked HTML page): a sitemap
// doesn't grant internal-linking credit on its own, but it does tell search
// engines about every URL up front, with priority/change-frequency hints,
// so a domain cutover or a fresh crawl doesn't have to wait on link discovery.
//
// Base URL: hardcoded to the production domain (movetoistanbul.online) since
// that's what search engines should always see regardless of which Vercel
// preview/alias served the request. Update SITE_URL if the domain changes.
import { getCollections, getAllActivities, getCities, getCountryGuides } from '@/lib/supabaseServer';

export const revalidate = 3600;

const SITE_URL = 'https://movetoistanbul.online';

const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/discover', priority: 0.9, changeFrequency: 'daily' },
  { path: '/collections', priority: 0.9, changeFrequency: 'daily' },
  { path: '/guides', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/guides/visa', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/guides/housing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/guides/cost-of-living', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/country-guides', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/onboarding', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/relocation-quiz', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/concierge', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' },
];

export default async function sitemap() {
  const [collections, activities, cities, countryGuides] = await Promise.all([
    getCollections().catch(() => []),
    getAllActivities(2000).catch(() => []),
    getCities().catch(() => []),
    getCountryGuides().catch(() => []),
  ]);

  const now = new Date();

  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const collectionEntries = (collections || []).map((c) => ({
    url: `${SITE_URL}/collections/${c.slug}`,
    lastModified: c.updated_date ? new Date(c.updated_date) : now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const activityEntries = (activities || []).map((a) => ({
    url: `${SITE_URL}/activity/${a.id}`,
    lastModified: a.updated_date ? new Date(a.updated_date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const cityEntries = (cities || []).map((c) => ({
    url: `${SITE_URL}/city/${encodeURIComponent(c.name.toLowerCase())}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const countryGuideEntries = (countryGuides || []).map((g) => ({
    url: `${SITE_URL}/country-guides/${g.slug}`,
    lastModified: g.updated_date ? new Date(g.updated_date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...collectionEntries,
    ...activityEntries,
    ...cityEntries,
    ...countryGuideEntries,
  ];
}
