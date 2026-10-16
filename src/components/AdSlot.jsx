'use client';
import { useEffect, useRef } from 'react';

// Adsterra Native Banner slot. Loaded client-side only, after mount, so it never
// blocks rendering or affects the server HTML. Skipped for visitors who clicked
// "Decline" on the consent banner. Placed below the main content, clearly
// labelled, never above the fold.
const NATIVE_ID = '407030cabc42109dde65c8981032d550';
const NATIVE_SRC = `https://bicea.org/21/${NATIVE_ID}`;

export default function AdSlot({ className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    try { if (localStorage.getItem('mti_consent') === 'denied') return; } catch {}
    const host = ref.current;
    if (!host || host.querySelector('script')) return;
    const s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.src = NATIVE_SRC;
    host.appendChild(s);
  }, []);
  return (
    <aside aria-label="Advertisement" className={`max-w-3xl mx-auto px-4 sm:px-6 my-8 ${className}`}>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Advertisement</p>
      <div ref={ref}><div id={`container-${NATIVE_ID}`} /></div>
    </aside>
  );
}
