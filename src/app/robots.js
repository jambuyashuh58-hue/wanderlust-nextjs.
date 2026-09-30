// Next.js App Router metadata route -- auto-generates /robots.txt, pointing
// crawlers at the sitemap and keeping the /admin area out of the index.
const SITE_URL = 'https://movetoistanbul.online';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
