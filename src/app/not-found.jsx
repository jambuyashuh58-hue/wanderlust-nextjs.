import Link from 'next/link';
import { Compass, Home, Search } from 'lucide-react';

export const metadata = { title: 'Page not found | Move to Istanbul' };

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <p className="text-lg font-semibold mb-2">This page wandered off somewhere</p>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist, or the link may be out of date. Let's get you back on the map.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold hover:opacity-90 transition-opacity">
            <Home className="w-4 h-4" /> Back to home
          </Link>
          <Link href="/discover" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border font-semibold hover:bg-muted/60 transition-colors">
            <Search className="w-4 h-4" /> Discover activities
          </Link>
        </div>
      </div>
    </div>
  );
}
