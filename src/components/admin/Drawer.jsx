'use client';

// Right-side slide-over panel used for the "edit in a drawer over the list"
// admin layout (matching the old Base44 dashboard's Edit-panel UX). Paired
// with a Next.js intercepting route: navigating to /admin/<section>/[id]
// (or /new) from the list renders this on top of the list instead of a
// full-page navigation, while a direct visit to that URL still falls back
// to the plain full-page edit route (see the sibling non-modal page.jsx).
//
// Closing (X, backdrop click, or Escape) calls router.back(), which simply
// pops back to the underlying list route the intercepted modal came from.
// A successful save doesn't need special handling here: the form's server
// action redirects to the list page itself, which replaces this route
// entirely and closes the drawer as a side effect.

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function Drawer({ title, children, maxWidth = 'max-w-2xl' }) {
  const router = useRouter();
  const closedRef = useRef(false);

  const close = () => {
    if (closedRef.current) return;
    closedRef.current = true;
    router.back();
  };

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 animate-in fade-in duration-150"
        onClick={close}
        aria-hidden="true"
      />
      <div
        className={`relative w-full ${maxWidth} h-full bg-background shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-background/95 backdrop-blur">
          <h2 className="text-lg font-bold truncate pr-4">{title}</h2>
          <button
            type="button"
            onClick={close}
            className="p-2 rounded-full hover:bg-muted shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
