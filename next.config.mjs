/** @type {import('next').NextConfig} */
const nextConfig = {
  // Canonical URL rule (Oct 2026 site-structure doc): every indexable page
  // resolves with a trailing slash (e.g. /services/, not /services). Next
  // handles this two ways: (1) it 308-redirects any no-slash request to the
  // slash form, so old links/bookmarks still land correctly, and (2)
  // next/link automatically appends the slash to internal hrefs it renders,
  // so existing <Link href="/services"> call sites don't need to be rewritten
  // by hand. Canonical tags, the sitemap, and these redirect destinations are
  // the only places the slash had to be added explicitly (for=code)
  trailingSlash: true,
  async redirects() {
    // The gated-guide landing page moved from /guide to /free-guide when the
    // lead magnet was upgraded from a checklist to the full 90-60-30 Day
    // Relocation Guide -- keep the old URL alive for anyone with it bookmarked
    // or shared (social bios, old emails, etc).
    return [
      { source: '/guide', destination: '/free-guide/', permanent: true },
      // Concierge rebranded + moved to /services (productized as
      // istanbul-route-check/housing-shortlist-file/full-move-file) as part
      // of the site-structure rebuild -- same inquiry form and backend,
      // just a new home and new product names. Keep the old URL alive.
      { source: '/concierge', destination: '/services/', permanent: true },
      // Aliases for names used in the new site-structure doc that already
      // have a live equivalent under a different name -- redirect rather
      // than duplicate the page.
      { source: '/move-dashboard', destination: '/dashboard/', permanent: true },
      { source: '/free-90-60-30-guide', destination: '/free-guide/', permanent: true },
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
