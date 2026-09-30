'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBubble from './ChatBubble';

// The admin portal (/admin/**) is a separate tool, not a page of the public
// site -- it gets its own layout/nav (see admin/layout.jsx) instead of the
// public Navbar + Footer. `children` here is server-rendered content passed
// down from the root layout; a Client Component can render server-rendered
// children like this even though it can't import a Server Component fresh.
//
// Locale is derived from the URL client-side (not via next/headers in a
// Server Component) on purpose: reading the request's x-locale header in
// the root layout would call a Next.js "dynamic API" at the very top of the
// tree, which opts the ENTIRE site out of static generation -- every
// collection/activity/guide page, not just the ones that need it. Deriving
// it here from pathname (which SiteChrome already reads) keeps the rest of
// the app exactly as statically-rendered as it was before.
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/tr') ? 'tr' : 'en';

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  if (pathname?.startsWith('/admin')) return children;
  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ChatBubble />
    </>
  );
}
