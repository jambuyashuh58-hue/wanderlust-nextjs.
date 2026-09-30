/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The gated-guide landing page moved from /guide to /free-guide when the
    // lead magnet was upgraded from a checklist to the full 90-60-30 Day
    // Relocation Guide -- keep the old URL alive for anyone with it bookmarked
    // or shared (social bios, old emails, etc).
    return [
      // Sep 2026 restructure: old /guides/* pillar content moved under the
      // new /moving-to-istanbul/* relocation-authority URL tree. Old links
      // (social bios, backlinks, bookmarks) still point at the old paths.
      { source: '/guides/visa', destination: '/moving-to-istanbul/visa-residence-permit', permanent: true },
      { source: '/guides/housing', destination: '/moving-to-istanbul/housing', permanent: true },
      { source: '/guides/cost-of-living', destination: '/moving-to-istanbul/cost-of-living', permanent: true },
      // Lead-magnet URL history: /guide -> /free-guide -> the final,
      // keyword-matched slug used in the new nav and sitemap.
      { source: '/guide', destination: '/free-istanbul-relocation-guide', permanent: true },
      { source: '/free-guide', destination: '/free-istanbul-relocation-guide', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
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
