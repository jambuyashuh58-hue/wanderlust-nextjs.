import { getCollections } from '@/lib/supabaseServer';

// RSS 2.0 feed of published collections/guides. Each item carries its hero
// image (enclosure + media:content + <img> in the description) so Pinterest's
// "auto-publish from RSS" and tools like Zapier/IFTTT/Make can create pins.
export const revalidate = 3600;

const SITE = 'https://www.movetoistanbul.online';

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const mime = (u) => (/\.png(\?|$)/i.test(u) ? 'image/png' : /\.webp(\?|$)/i.test(u) ? 'image/webp' : 'image/jpeg');

export async function GET() {
  let collections = [];
  try {
    collections = (await getCollections()) || [];
  } catch {}

  const items = collections
    .filter((c) => c.slug && c.title && c.hero_image_url)
    .sort((a, b) => new Date(b.updated_date || b.created_date || 0) - new Date(a.updated_date || a.created_date || 0))
    .slice(0, 100)
    .map((c) => {
      const link = `${SITE}/collections/${c.slug}`;
      const desc = c.meta_description || '';
      const date = new Date(c.updated_date || c.created_date || Date.now()).toUTCString();
      return `    <item>
      <title>${esc(c.title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <pubDate>${date}</pubDate>
      <description><![CDATA[<img src="${c.hero_image_url}" alt="${esc(c.title)}" /><p>${esc(desc)}</p>]]></description>
      <enclosure url="${esc(c.hero_image_url)}" type="${mime(c.hero_image_url)}" length="0" />
      <media:content url="${esc(c.hero_image_url)}" medium="image" type="${mime(c.hero_image_url)}" />
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Move to Istanbul</title>
    <link>${SITE}</link>
    <description>Guides to moving to, living in and visiting Istanbul and Türkiye: visas, cost of living, neighborhoods and things to do.</description>
    <language>en</language>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
