'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Compass } from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/concierge', label: 'Concierge Inquiries' },
  { href: '/admin/activities', label: 'Activities' },
  { href: '/admin/collections', label: 'Collections & Guides' },
  { href: '/admin/country-guides', label: 'Country Guides' },
  { href: '/admin/house-listings', label: 'House Listings' },
  { href: '/admin/character', label: 'Character' },
  { href: '/admin/instagram-posts', label: 'Instagram Posts' },
];

export default function AdminChrome({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return children;

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-card">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center"><Compass className="w-4 h-4 text-white" /></div>
            <span className="font-bold hidden sm:inline">Move to Istanbul — Admin</span>
          </div>
          <button onClick={logout} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground shrink-0">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto no-scrollbar pb-2">
          {NAV.map((item) => {
            const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href} href={item.href}
                className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${active ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
