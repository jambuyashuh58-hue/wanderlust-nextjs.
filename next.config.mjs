/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The gated-guide landing page moved from /guide to /free-guide when the
    // lead magnet was upgraded from a checklist to the full 90-60-30 Day
    // Relocation Guide -- keep the old URL alive for anyone with it bookmarked
    // or shared (social bios, old emails, etc).
    return [
      { source: '/guide', destination: '/free-guide', permanent: true },
      // Short link used in social/DM outreach. Query strings (utm_source) pass through. (for=code)
      { source: '/free-90-60-30-guide', destination: '/free-guide', permanent: true },
      // /home has no page in this app and nothing in the codebase ever
      // linked to it, but Search Console flagged it as a "Soft 404" --
      // some stray external/old link evidently points there. A real
      // redirect is a cleaner signal to Google than a 404 for a URL that
      // still gets requested. (for=code)
      { source: '/home', destination: '/', permanent: true },
      // Duplicate collections/activities removed 2026-10-06 -- keep old URLs alive. (for=code)
      { source: '/collections/romantic-things-to-do-istanbul-couples', destination: '/collections/romantic-istanbul-couples', permanent: true },
      { source: '/collections/finding-your-rhythm-solo-travel-istanbul', destination: '/collections/solo-travel-istanbul-guide', permanent: true },
      { source: '/activity/6a69ec59981ae800a1054ffa', destination: '/activity/6a69ec59900e34c8bb06b85e', permanent: true },
      { source: '/activity/6a69ed23c014a21317a991ff', destination: '/activity/6a69ed23c014a21317a991fe', permanent: true },
      { source: '/activity/6a856ecda7f6d6675b029f36', destination: '/activity/6a69e824e1cf9d994228b801', permanent: true },
      { source: '/activity/6a86745711e5f98d12b40b90', destination: '/activity/6a867759d92200a92f697101', permanent: true },
      { source: '/activity/6a880a31cc76742653de6f7b', destination: '/activity/6a87c453e63fcb08e94f7df0', permanent: true },
      { source: '/activity/6a880a31cc76742653de6f7c', destination: '/activity/6a87c453e63fcb08e94f7df1', permanent: true },
      { source: '/activity/6a880a31cc76742653de6f7d', destination: '/activity/6a87c453e63fcb08e94f7df2', permanent: true },
      { source: '/activity/6a8bfbeda236b612590019af', destination: '/activity/6a70556b59c4da0a04da2c7b', permanent: true },
      { source: '/activity/6a8c0ad80a4120226c711766', destination: '/activity/6a8bf87d2c005e5c625f220b', permanent: true },
      { source: '/activity/6a8c0bfb39ca911531d74833', destination: '/activity/6a867bfad963f5af94f5c5d6', permanent: true },
      { source: '/activity/6a8d58fc2998958cf2cb8b4b', destination: '/activity/6a8d5c00966ad5f48fb4de54', permanent: true },
      { source: '/activity/6a8d59241c6aed59c7df8531', destination: '/activity/6a8d5c13b6a458011e2d86af', permanent: true },
      { source: '/activity/6a8d5946a3ba1a6473031a0e', destination: '/activity/6a8d5c4d3f6995bdde479ec8', permanent: true },
      { source: '/activity/6a8d5966f26ec3833a126da1', destination: '/activity/6a8d5c733b8c2c9802fbdd7b', permanent: true },
      { source: '/activity/6a8d5966f26ec3833a126da2', destination: '/activity/6a8d5c733b8c2c9802fbdd7c', permanent: true },
      { source: '/activity/6a8d5966f26ec3833a126da3', destination: '/activity/6a8d5c733b8c2c9802fbdd7d', permanent: true },
      { source: '/activity/6a8d5976966ad5f48fb4d890', destination: '/activity/6a8d5c7d1bce4523f4ee0d8c', permanent: true },
      { source: '/activity/6a8d5976966ad5f48fb4d891', destination: '/activity/6a8d5c7d1bce4523f4ee0d8d', permanent: true },
      { source: '/activity/6a8d5976966ad5f48fb4d892', destination: '/activity/6a8d5c7d1bce4523f4ee0d8e', permanent: true },
      { source: '/activity/6a8d5c00966ad5f48fb4de55', destination: '/activity/6a8d58fc2998958cf2cb8b4c', permanent: true },
      { source: '/activity/6a8d5c00966ad5f48fb4de56', destination: '/activity/6a8d58fc2998958cf2cb8b4d', permanent: true },
      { source: '/activity/6a8d5c0a68da949c42768270', destination: '/activity/6a8d5905ddf78b480edfe290', permanent: true },
      { source: '/activity/6a8d5c0a68da949c42768271', destination: '/activity/6a8d5905ddf78b480edfe291', permanent: true },
      { source: '/activity/6a8d5c56015f17543160f343', destination: '/activity/6a8d5946a3ba1a6473031a0f', permanent: true },
      { source: '/activity/6a8d5c56015f17543160f344', destination: '/activity/6a8d5946a3ba1a6473031a10', permanent: true },
      { source: '/activity/6a8d5caa3dc0cdcbcf9d2d6d', destination: '/activity/6a8d599dd3dd063bb292e102', permanent: true },
      { source: '/activity/6aad01a495db24744616b987', destination: '/activity/6a86c0e9395e7d897c0ea736', permanent: true },
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
