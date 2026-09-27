'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

// The admin portal (/admin/**) is a separate tool, not a page of the public
// site -- it gets its own layout/nav (see admin/layout.jsx) instead of the
// public Navbar + Footer. `children` here is server-rendered content passed
// down from the root layout; a Client Component can render server-rendered
// children like this even though it can't import a Server Component fresh.
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return children;
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
