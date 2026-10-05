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
    ['/concierge', 'Concierge'], ['/dashboard', 'Dashboard'], ['/about', 'About'], ['/contact', 'Contact'],
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
