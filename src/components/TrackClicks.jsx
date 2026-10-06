'use client';
import { useEffect } from 'react';

// One delegated click listener for the whole site: any link/button carrying
// data-track="activity" | "affiliate" | "collection" (plus data-* fields)
// sends a beacon to /api/track. sendBeacon survives the navigation / new tab
// that the click itself triggers. (for=code)
export default function TrackClicks() {
  useEffect(() => {
    function onClick(e) {
      const el = e.target instanceof Element ? e.target.closest('[data-track]') : null;
      if (!el) return;
      const d = el.dataset;
      const payload = {
        type: d.track, source_page: window.location.pathname,
        activity_id: d.activityId, collection_id: d.collectionId, slug: d.slug,
        title: d.title, city: d.city, category: d.category, price: d.price, component: d.component,
      };
      try {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        if (!navigator.sendBeacon || !navigator.sendBeacon('/api/track', blob)) {
          fetch('/api/track', { method: 'POST', body: JSON.stringify(payload), keepalive: true });
        }
      } catch {}
    }
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
