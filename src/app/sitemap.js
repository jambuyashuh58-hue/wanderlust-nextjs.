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
  { path: '/living-in-istanbul', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/living-in-istanbul/remote-work-cafes', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/living-in-istanbul/annual-passes-guide', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/living-in-istanbul/weekend-logistics', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/living-in-istanbul/local-routines', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/living-in-istanbul/hands-on-workshops', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/field-notes', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/field-notes/anchor-routines', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/field-notes/turkish-numbers-not-grammar', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/field-notes/landlord-silence-tactic', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/onboarding', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/relocation-quiz', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/services/istanbul-route-check', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/services/housing-shortlist-file', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/services/full-move-file', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/services/book-a-call', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/moving-to-turkiye', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/moving-to-turkiye/full-sequence', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/moving-to-turkiye/checklist', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/moving-to-turkiye/map-the-move', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/moving-to-turkiye/visa-and-documents', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/moving-to-turkiye/housing-timeline', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/moving-to-turkiye/budget', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/moving-to-turkiye/arrival-setup', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/moving-to-turkiye/common-mistakes', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/visa-residence', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/visa-residence/short-term-residence-permit', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/visa-residence/documents', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/visa-residence/translation-legalization', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/visa-residence/immigration-follow-up', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/visa-residence/common-mistakes', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/housing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/housing/rental-red-flags', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/housing/viewing-checklist', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/housing/contract-review', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/housing/handover-inspection', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/housing/negotiation-tips', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/cost-of-living', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/cost-of-living/3-month-budget', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/cost-of-living/monthly-expenses', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/cost-of-living/banking-payments', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/cost-of-living/health-insurance', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/cost-of-living/transport', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/cost-of-living/coworking-internet', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/after-you-land', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/after-you-land/first-24-hours', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/after-you-land/first-7-days', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/after-you-land/first-30-days', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/after-you-land/administrative-identity', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/after-you-land/utilities-connectivity', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/after-you-land/turkish-phrases', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/istanbul-for-digital-nomads', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/how-we-work', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/partner-network', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/editorial-policy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/refund-policy', priority: 0.3, changeFrequency: 'yearly' },
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
  // canonical to /guides/<slug>. Every other collection now also renders at
  // /living-in-istanbul/<slug> (see CollectionView.jsx) and is canonical
  // there as that cluster becomes its permanent home. Submit whichever URL
  // is canonical so the sitemap isn't asking Google to index a duplicate.
  const collectionEntries = (collections || []).map((c) => ({
    url: c.display_style === 'guide'
      ? `${SITE_URL}/guides/${c.slug}`
      : `${SITE_URL}/living-in-istanbul/${c.slug}`,
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
