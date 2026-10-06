/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The gated-guide landing page moved from /guide to /free-guide when the
    // lead magnet was upgraded from a checklist to the full 90-60-30 Day
    // Relocation Guide -- keep the old URL alive for anyone with it bookmarked
    // or shared (social bios, old emails, etc).
    return [
      { source: '/guide', destination: '/free-guide', permanent: true },
      // /home has no page in this app and nothing in the codebase ever
      // linked to it, but Search Console flagged it as a "Soft 404" --
      // some stray external/old link evidently points there. A real
      // redirect is a cleaner signal to Google than a 404 for a URL that
      // still gets requested. (for=code)
      { source: '/home', destination: '/', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    // All of this site's external images (pexels, getyourguide, Supabase
    // storage, tripadvisor, etc.) are already pre-sized/compressed by their
    // own CDN query params. Vercel's Image Optimization bills by unique
    // SOURCE image per month, and once that quota is used up, any
    // never-before-requested source image starts failing with a 402 on
    // /_next/image -- confirmed in prod (2026-10-05): brand-new hero images
    // from a batch of new guides, plus some pre-existing activity photos
    // that had simply never been displayed before, both 402'd, while
    // already-cached images kept loading fine. `unoptimized: true` routes
    // <Image> straight to the original URL, skipping that quota entirely,
    // so new content stops silently breaking every time the monthly cap is
    // hit. Tradeoff: no more automatic resize/webp conversion on Vercel's
    // side -- acceptable since every source already serves a reasonably
    // sized image. Revert this if the Vercel plan's Image Optimization
    // quota gets raised and the automatic resizing/format conversion is
    // wanted back.
    unoptimized: true,
  },
  experimental: {
    // Next's client-side Router Cache otherwise reuses a page's last-fetched
    // data for up to 30s on a soft navigation back to the same URL -- which
    // is exactly what happens after an admin save redirects back to the
    // list. Without this, the list can show pre-edit data for up to 30s
    // even though the database already has the update. Dynamic pages here
    // are already force-dynamic and never meant to be cached client-side.
    staleTimes: { dynamic: 0 },
  },
};
export default nextConfig;
