import './globals.css';
import SiteChrome from '@/components/SiteChrome';

const SITE_URL = 'https://movetoistanbul.online';
const TITLE = 'Move to Istanbul — Discover Türkiye with AI';
const DESCRIPTION = 'Move to Istanbul — AI-powered travel discovery for Türkiye. Find museums, hidden gems, and cultural experiences across Istanbul, Cappadocia, Antalya and beyond.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  // icon.png / apple-icon.png / opengraph-image.png in this same folder are
  // picked up automatically by Next.js's file-convention metadata system --
  // no need to reference them here. Individual pages can still override
  // openGraph/twitter (or ship their own opengraph-image) to replace these
  // site-wide defaults.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Move to Istanbul',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport = {
  themeColor: '#2463EB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
