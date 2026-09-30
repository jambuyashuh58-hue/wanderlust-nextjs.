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
import { getCollections, getCountryGuides } from '@/lib/supabaseServer';

export const revalidate = 3600;

const SITE_URL = 'https://movetoistanbul.online';

// Sep 2026 restructure: the site moved from a Turkey travel directory to a
// relocation authority (see MOVE_TO_ISTANBUL restructure plan). The old
// sitemap listed every activity/city page unconditionally -- 744 largely
// auto-generated listing pages plus city hubs -- which is what produced the
// "Discovered/Crawled -- currently not indexed" collapse in Search Console
// (683 of 964 URLs). Those pages are now noindexed at the source
// (activity/[id] and city/[cityName] generateMetadata) and deliberately
// excluded here. The sitemap now carries only the ~50-80 pages the site
// actually wants ranked: the relocation pillar cluster, the service pages,
// and existing good content (collections, country guides, guides).
const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/moving-to-istanbul', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/moving-to-istanbul/checklist', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/moving-to-istanbul/visa-residence-permit', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/moving-to-istanbul/housing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/moving-to-istanbul/cost-of-living', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/moving-to-istanbul/budget', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/moving-to-istanbul/arrival-setup', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/visa-paperwork-guidance', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/apartment-shortlisting', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/full-relocation-concierge', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/book-a-discovery-call', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/free-istanbul-relocation-guide', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/discover', priority: 0.5, changeFrequency: 'daily' },
  { path: '/collections', priority: 0.6, changeFrequency: 'daily' },
  { path: '/guides', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/country-guides', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/onboarding', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/relocation-quiz', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/concierge', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap() {
  const [collections, countryGuides] = await Promise.all([
    getCollections().catch(() => []),
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

  const countryGuideEntries = (countryGuides || []).map((g) => ({
    url: `${SITE_URL}/country-guides/${g.slug}`,
    lastModified: g.updated_date ? new Date(g.updated_date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Turkish (/tr) entries -- only for pages that are actually localized.
  // The country-guides index is fully translated regardless of content, but
  // an individual guide only gets a /tr URL once its *_tr columns are
  // filled in (title_tr is the marker); listing an untranslated guide under
  // /tr would just be the English text again at a duplicate URL, which is a
  // net negative for SEO, not a positive.
  const trStaticEntries = [
    { path: '/tr', priority: 1.0, changeFrequency: 'daily' },
    { path: '/tr/country-guides', priority: 0.7, changeFrequency: 'weekly' },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const trCountryGuideEntries = (countryGuides || [])
    .filter((g) => g.title_tr)
    .map((g) => ({
      url: `${SITE_URL}/tr/country-guides/${g.slug}`,
      lastModified: g.updated_date ? new Date(g.updated_date) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [
    ...staticEntries,
    ...collectionEntries,
    ...countryGuideEntries,
    ...trStaticEntries,
    ...trCountryGuideEntries,
  ];
}
