// Next.js App Router metadata route -- auto-generates /manifest.webmanifest.
// Lets phones "Add to Home Screen" with a real name/icon instead of a bare
// URL, and gives Android's install prompt something to show.
export default function manifest() {
  return {
    name: 'Move to Istanbul',
    short_name: 'MoveToIstanbul',
    description: 'AI-powered travel discovery and relocation guide for Türkiye.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2463EB',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
