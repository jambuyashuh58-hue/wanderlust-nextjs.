// Next.js App Router metadata route -- auto-generates /robots.txt, pointing
// crawlers at the sitemap and keeping the /admin area out of the index.
// www, matching sitemap.js and layout.jsx's metadataBase -- see sitemap.js
// for why (the apex just 308-redirects here, so declaring it was splitting
// signals across both hosts in Search Console).
const SITE_URL = 'https://www.movetoistanbul.online';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
