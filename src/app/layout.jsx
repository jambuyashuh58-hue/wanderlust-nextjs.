import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
