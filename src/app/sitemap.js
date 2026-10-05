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

const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/discover', priority: 0.9, changeFrequency: 'daily' },
  { path: '/collections', priority: 0.9, changeFrequency: 'daily' },
  { path: '/guides', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/guides/visa', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/guides/housing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/guides/cost-of-living', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/country-guides', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/field-notes', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/field-notes/anchor-routines', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/field-notes/turkish-numbers-not-grammar', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/field-notes/landlord-silence-tactic', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/onboarding', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/relocation-quiz', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/concierge', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap() {
  // activity/[id] and city/[cityName] are deliberately left out: they're
  // thin, auto-generated pages (noindexed at the page level -- see their
  // generateMetadata) and submitting them in the sitemap would just be
  // asking Google to index exactly the pages told not to be indexed. (for=code)
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

  // Guide-type collections render at both /collections/<slug> and
  // /guides/<slug> (same row, same template -- see guides/[slug]/page.jsx),
  // and their canonical tag now points at /guides/<slug> as the preferred
  // URL. Submit that URL here too, so the sitemap isn't asking Google to
  // index the non-canonical one.
  const collectionEntries = (collections || []).map((c) => ({
    url: c.display_style === 'guide'
      ? `${SITE_URL}/guides/${c.slug}`
      : `${SITE_URL}/collections/${c.slug}`,
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
