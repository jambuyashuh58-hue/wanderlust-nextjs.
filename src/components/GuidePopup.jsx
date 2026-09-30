'use client';

// Site-wide, non-intrusive pop-up announcing the free lead magnet (the
// 90-60-30 Day Relocation Guide) -- see the Step 4 "Website Integration"
// ask: "a non-intrusive pop-up ... Moving to Istanbul? Get our free 90-60-30
// Day Relocation Digital Guide."
//
// Deliberately understated compared to ChatBubble: it slides in from the
// bottom-left (ChatBubble owns bottom-right), waits a few seconds so it
// never blocks the very first thing a visitor sees, and remembers a dismissal
// for the rest of the browser session (sessionStorage) so it never nags on
// every page nav. It never renders on /free-guide itself (redundant) or in
// /admin.
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, BookOpen } from 'lucide-react';

const DISMISS_KEY = 'guidePopupDismissed';
const SHOW_DELAY_MS = 4000;

export default function GuidePopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith('/admin') || pathname === '/free-istanbul-relocation-guide') return undefined;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      // sessionStorage unavailable (private mode, etc.) -- just show it.
    }
    if (dismissed) return undefined;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // best-effort only
    }
  };

  if (pathname?.startsWith('/admin') || pathname === '/free-istanbul-relocation-guide' || !visible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 w-[320px] max-w-[calc(100vw-2.5rem)] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="rounded-2xl border border-amber-400/40 bg-card shadow-2xl overflow-hidden">
        <div className="p-4 flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-snug">Moving to Istanbul?</p>
            <p className="text-xs text-muted-foreground leading-snug mt-0.5">
              Get our free 90-60-30 Day Relocation Digital Guide.
            </p>
            <div className="flex items-center gap-3 mt-2.5">
              <Link
                href="/free-istanbul-relocation-guide"
                onClick={dismiss}
                className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors"
              >
                Get the free guide
              </Link>
              <button type="button" onClick={dismiss} className="text-xs text-muted-foreground hover:text-foreground">
                No thanks
              </button>
            </div>
          </div>
          <button type="button" onClick={dismiss} aria-label="Dismiss" className="shrink-0 text-muted-foreground hover:text-foreground -mt-0.5 -mr-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
