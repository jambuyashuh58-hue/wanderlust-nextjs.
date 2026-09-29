/** @type {import('next').NextConfig} */
const nextConfig = {
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
