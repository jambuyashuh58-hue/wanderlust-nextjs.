'use client';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// GA4 with Consent Mode v2. Analytics/ad storage default to DENIED everywhere
// (cookieless pings only) and are granted only after the visitor accepts the
// banner (see ConsentBanner). Measurement ID comes from NEXT_PUBLIC_GA_ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-EJS7ZK2YXQ';

function PageViews() {
  const pathname = usePathname();
  const sp = useSearchParams();
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: pathname + (sp.toString() ? '?' + sp.toString() : ''), page_location: window.location.href });
    }
  }, [pathname, sp]);
  return null;
}

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        var granted = false;
        try { granted = localStorage.getItem('mti_consent') === 'granted'; } catch(e) {}
        gtag('consent', 'default', {
          ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
          analytics_storage: granted ? 'granted' : 'denied', wait_for_update: 500
        });
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { send_page_view: false });
      `}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Suspense fallback={null}><PageViews /></Suspense>
    </>
  );
}
