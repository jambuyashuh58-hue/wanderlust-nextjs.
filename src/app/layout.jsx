import './globals.css';
import SiteChrome from '@/components/SiteChrome';

export const metadata = {
  title: 'Move to Istanbul — Discover Türkiye with AI',
  description: 'Move to Istanbul — AI-powered travel discovery for Türkiye. Find museums, hidden gems, and cultural experiences across Istanbul, Cappadocia, Antalya and beyond.',
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
