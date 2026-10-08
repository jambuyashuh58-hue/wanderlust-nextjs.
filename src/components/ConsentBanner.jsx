'use client';
import { useEffect, useState } from 'react';

// Minimal analytics-consent banner. "Decline" keeps GA cookieless; "Accept"
// flips analytics_storage to granted. Choice is remembered in localStorage.
export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem('mti_consent')) setShow(true); } catch {}
  }, []);
  if (!show) return null;
  const choose = (v) => {
    try { localStorage.setItem('mti_consent', v); } catch {}
    if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: v });
    setShow(false);
  };
  return (
    <div role="dialog" aria-label="Analytics consent" className="fixed bottom-3 left-3 right-3 sm:left-auto sm:max-w-sm z-50 rounded-2xl border border-border bg-card shadow-lg p-4 text-sm">
      <p className="mb-3 text-muted-foreground">We use privacy-friendly analytics to see which pages help travelers. OK to use analytics cookies?</p>
      <div className="flex gap-2">
        <button type="button" onClick={() => choose('granted')} className="flex-1 py-2 rounded-full bg-gradient-primary text-white font-semibold">Accept</button>
        <button type="button" onClick={() => choose('denied')} className="flex-1 py-2 rounded-full border border-border font-semibold">Decline</button>
      </div>
    </div>
  );
}
