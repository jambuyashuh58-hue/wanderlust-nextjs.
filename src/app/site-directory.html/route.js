// Static, non-React HTML directory of every city/collection/activity page --
// mirrors the old Vite site's build-time-generated /site-directory.html.
// Linked from the Footer with a plain <a> (see Destinations.jsx) since it's
// intentionally outside the React app shell.
//
// NOTE: this calls getCities(), getCollections(), getAllActivities() from
// '@/lib/supabaseServer' -- confirm those three exports exist with those
// exact names/signatures in the live supabaseServer.js before deploying
// (the file-fetch tool used to pull this reference was truncated, so the
// import names below are inferred from src/app/page.jsx's imports, not
// verified against the full file).

import { getCities, getCollections, getAllActivities } from '@/lib/supabaseServer';

export const revalidate = 3600;

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function GET() {
  const [cities, collections, activities] = await Promise.all([
    getCities().catch(() => []),
    getCollections().catch(() => []),
    getAllActivities(2000).catch(() => []),
  ]);

  const citySection = (cities || [])
    .map((c) => `<li><a href="/city/${encodeURIComponent(c.name.toLowerCase())}">${escapeHtml(c.name)}</a></li>`)
    .join('\n');

  // Guide-type collections canonicalize to /guides/<slug>; everything else
  // to /living-in-istanbul/<slug> (see collections/[slug]/page.jsx) -- link
  // directly so this directory isn't itself a source of non-canonical
  // internal links.
  const collectionSection = (collections || [])
    .map((c) => {
      const href = c.display_style === 'guide' ? `/guides/${encodeURIComponent(c.slug)}` : `/living-in-istanbul/${encodeURIComponent(c.slug)}`;
      return `<li><a href="${href}">${escapeHtml(c.title || c.slug)}</a></li>`;
    })
    .join('\n');

  const activitySection = (activities || [])
    .map((a) => `<li><a href="/activity/${encodeURIComponent(a.id)}">${escapeHtml(a.title || a.name)}</a></li>`)
    .join('\n');

  const staticPages = [
    ['/', 'Home'], ['/discover', 'Discover'], ['/collections', 'Collections'],
    ['/guides', 'Guides'], ['/guides/visa', 'Visa Guide'], ['/guides/housing', 'Housing Guide'],
    ['/guides/cost-of-living', 'Cost of Living'], ['/country-guides', 'Country Guides'],
    ['/living-in-istanbul', 'Living in Istanbul'], ['/living-in-istanbul/remote-work-cafes', 'Remote Work Cafés'],
    ['/living-in-istanbul/annual-passes-guide', 'Museum Annual Passes'], ['/living-in-istanbul/weekend-logistics', 'Weekend Logistics'],
    ['/living-in-istanbul/local-routines', 'Local Routines'], ['/living-in-istanbul/hands-on-workshops', 'Hands-On Workshops'],
    ['/onboarding', 'Plan My Trip'], ['/itinerary', 'Itinerary'], ['/relocation-quiz', 'Relocation Quiz'],
    ['/services', 'Services'], ['/services/istanbul-route-check', 'Istanbul Route Check'],
    ['/services/housing-shortlist-file', 'Housing Shortlist File'], ['/services/full-move-file', 'Full Move File'],
    ['/services/book-a-call', 'Book a Call'],
    ['/moving-to-turkiye', 'Moving to Türkiye'], ['/moving-to-turkiye/full-sequence', 'The Full Sequence'],
    ['/moving-to-turkiye/checklist', 'Pre-Move Checklist'], ['/moving-to-turkiye/map-the-move', 'Map the Move'],
    ['/moving-to-turkiye/visa-and-documents', 'Visa & Documents'], ['/moving-to-turkiye/housing-timeline', 'Housing Timeline'],
    ['/moving-to-turkiye/budget', 'Moving Budget'], ['/moving-to-turkiye/arrival-setup', 'Arrival Setup'],
    ['/moving-to-turkiye/common-mistakes', 'Moving Mistakes'],
    ['/visa-residence', 'Visa & Residence'], ['/visa-residence/short-term-residence-permit', 'Short-Term Residence Permit'],
    ['/visa-residence/documents', 'Residence Permit Documents'], ['/visa-residence/translation-legalization', 'Translation & Legalization'],
    ['/visa-residence/immigration-follow-up', 'Immigration Follow-Up'], ['/visa-residence/common-mistakes', 'Residence Permit Mistakes'],
    ['/visa-residence/by-nationality', 'Visa by Nationality'], ['/visa-residence/by-nationality/united-states', 'Visa: United States'],
    ['/visa-residence/by-nationality/united-kingdom', 'Visa: United Kingdom'], ['/visa-residence/by-nationality/germany', 'Visa: Germany'],
    ['/visa-residence/by-nationality/france', 'Visa: France'], ['/visa-residence/by-nationality/netherlands', 'Visa: Netherlands'],
    ['/visa-residence/by-nationality/canada', 'Visa: Canada'], ['/visa-residence/by-nationality/india', 'Visa: India'],
    ['/visa-residence/by-nationality/uae', 'Visa: UAE'], ['/visa-residence/by-nationality/saudi-arabia', 'Visa: Saudi Arabia'],
    ['/visa-residence/by-nationality/russia', 'Visa: Russia'],
    ['/housing', 'Housing: Renting Process'], ['/housing/rental-red-flags', 'Rental Red Flags'],
    ['/housing/viewing-checklist', 'Viewing Checklist'], ['/housing/contract-review', 'Contract Review'],
    ['/housing/handover-inspection', 'Handover Inspection'], ['/housing/negotiation-tips', 'Negotiation Tips'],
    ['/housing/neighborhoods', 'Neighborhood Guides'], ['/housing/neighborhoods/kadikoy', 'Kadıköy'],
    ['/housing/neighborhoods/besiktas', 'Beşiktaş'], ['/housing/neighborhoods/sisli', 'Şişli'],
    ['/housing/neighborhoods/fatih', 'Fatih'], ['/housing/neighborhoods/beyoglu', 'Beyoğlu'],
    ['/housing/neighborhoods/atasehir', 'Ataşehir'], ['/housing/neighborhoods/bakirkoy', 'Bakırköy'],
    ['/cost-of-living', 'Cost of Living: By Topic'], ['/cost-of-living/3-month-budget', '3-Month Starter Budget'],
    ['/cost-of-living/monthly-expenses', 'Monthly Expenses'], ['/cost-of-living/banking-payments', 'Banking & Payments'],
    ['/cost-of-living/health-insurance', 'Health Insurance'], ['/cost-of-living/transport', 'Transport'],
    ['/cost-of-living/coworking-internet', 'Coworking & Internet'],
    ['/after-you-land', 'After You Land'], ['/after-you-land/first-24-hours', 'First 24 Hours'],
    ['/after-you-land/first-7-days', 'First 7 Days'], ['/after-you-land/first-30-days', 'First 30 Days'],
    ['/after-you-land/administrative-identity', 'Administrative Identity'], ['/after-you-land/utilities-connectivity', 'Utilities & Connectivity'],
    ['/after-you-land/turkish-phrases', 'Turkish Phrases'], ['/after-you-land/food-household-routine', 'Food & Household Routine'],
    ['/after-you-land/work-study-setup', 'Work & Study Setup'], ['/after-you-land/local-support-network', 'Local Support Network'],
    ['/after-you-land/30-60-90-reviews', '30-60-90 Day Reviews'], ['/after-you-land/relocation-recovery-method', 'Relocation Recovery Method'],
    ['/istanbul-for-digital-nomads', 'Istanbul for Digital Nomads'],
    ['/how-we-work', 'How We Work'], ['/partner-network', 'Partner Network'],
    ['/editorial-policy', 'Editorial Policy'], ['/refund-policy', 'Refund Policy'],
    ['/dashboard', 'Dashboard'], ['/about', 'About'], ['/contact', 'Contact'],
  ]
    .map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
    .join('\n');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Site Directory — Move to Istanbul</title>
<meta name="description" content="Every page on Move to Istanbul: cities, collections and activities across Türkiye." />
<meta name="robots" content="index,follow" />
<style>
  body { font-family: system-ui, sans-serif; max-width: 960px; margin: 0 auto; padding: 2rem 1.25rem; line-height: 1.6; color: #1e293b; }
  h1 { font-size: 1.75rem; margin-bottom: .25rem; }
  h2 { font-size: 1.1rem; margin-top: 2.5rem; text-transform: uppercase; letter-spacing: .04em; color: #2563eb; }
  ul { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: .35rem 1rem; padding: 0; list-style: none; }
  li { border-bottom: 1px solid #e2e8f0; padding: .25rem 0; }
  a { color: #1e293b; text-decoration: none; }
  a:hover { color: #2563eb; text-decoration: underline; }
</style>
</head>
<body>
  <h1>Site Directory</h1>
  <p>Every page on Move to Istanbul, in one place.</p>
  <h2>Main pages</h2>
  <ul>${staticPages}</ul>
  <h2>Cities (${(cities || []).length})</h2>
  <ul>${citySection}</ul>
  <h2>Collections (${(collections || []).length})</h2>
  <ul>${collectionSection}</ul>
  <h2>Activities (${(activities || []).length})</h2>
  <ul>${activitySection}</ul>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
