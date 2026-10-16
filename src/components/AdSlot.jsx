'use client';
import { useEffect, useRef, useState } from 'react';

// Adsterra ad slot, loaded client-side after mount so it never blocks rendering
// or touches the server HTML. Skipped for visitors who clicked "Decline" on the
// consent banner. Placed below the main content, labelled, never above the fold.
//   variant="native" -> Native Banner (any width)
//   variant="auto"   -> 728x90 Banner on wide screens, Native Banner on mobile
const NATIVE_ID = '407030cabc42109dde65c8981032d550';
const NATIVE_SRC = `https://bicea.org/21/${NATIVE_ID}`;
const BANNER_KEY = '5210b38c1812120f311c97699e6bb12c';
const BANNER_SRC = `https://bicea.org/22/${BANNER_KEY}`;
// The 728x90 banner is injected with document.write, so it must live in its own
// iframe (document.write after page load would otherwise wipe the page).
const BANNER_DOC = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent}</style></head><body><script>atOptions={'key':'${BANNER_KEY}','format':'iframe','height':90,'width':728,'params':{}};</script><script src="${BANNER_SRC}"></script></body></html>`;

export default function AdSlot({ variant = 'native', className = '' }) {
  const ref = useRef(null);
  const [mode, setMode] = useState(null); // null = not decided yet / nothing to show

  useEffect(() => {
    try { if (localStorage.getItem('mti_consent') === 'denied') return; } catch {}
    const wide = variant === 'auto' && window.matchMedia('(min-width: 800px)').matches;
    setMode(wide ? 'banner' : 'native');
  }, [variant]);

  useEffect(() => {
    if (mode !== 'native') return;
    const host = ref.current;
    if (!host || host.querySelector('script')) return;
    const s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.src = NATIVE_SRC;
    host.appendChild(s);
  }, [mode]);

  if (!mode) return null;
  return (
    <aside aria-label="Advertisement" className={`max-w-3xl mx-auto px-4 sm:px-6 my-8 ${className}`}>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Advertisement</p>
      {mode === 'banner' ? (
        <iframe
          title="Advertisement"
          srcDoc={BANNER_DOC}
          width={728}
          height={90}
          scrolling="no"
          loading="lazy"
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
          style={{ border: 0, maxWidth: '100%', display: 'block' }}
        />
      ) : (
        <div ref={ref}><div id={`container-${NATIVE_ID}`} /></div>
      )}
    </aside>
  );
}
