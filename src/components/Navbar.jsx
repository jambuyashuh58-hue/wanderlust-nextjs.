'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, Sparkles, Instagram } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Discover', path: '/discover' }, { label: 'Collections', path: '/collections' },
  { label: 'Guides', path: '/guides' }, { label: 'Country Guides', path: '/country-guides' },
  { label: 'Itinerary', path: '/itinerary' }, { label: 'Dashboard', path: '/dashboard' },
  { label: 'Concierge', path: '/concierge' },
];
const CONCIERGE_URL = 'https://www.instagram.com/move_istanbul';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  const isActive = (path) => pathname === path;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass ${scrolled ? 'shadow-sm shadow-black/5' : ''}`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform"><Compass className="w-5 h-5 text-white" /></div>
              <span className="text-lg font-bold tracking-tight">Wanderlust</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => <Link key={link.path} href={link.path} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive(link.path) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'}`}>{link.label}</Link>)}
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/onboarding" className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                <Sparkles className="w-4 h-4" /> Plan My Trip
              </Link>
              <a href={CONCIERGE_URL} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"><Instagram className="w-5 h-5" /></a>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-muted/60">{mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
            </div>
          </div>
        </div>
      </header>
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden glass border-t border-border">
          <nav className="flex flex-col p-4 gap-1">
            {NAV_LINKS.map(link => <Link key={link.path} href={link.path} className="px-4 py-3 rounded-xl font-medium hover:bg-muted transition-colors">{link.label}</Link>)}
            <Link href="/onboarding" className="mt-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-gradient-primary text-white font-semibold">
              <Sparkles className="w-4 h-4" /> Plan My Trip
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
