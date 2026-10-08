'use client';
import { useEffect } from 'react';

// Remembers where a visitor came from (?utm_source=threads|fb|instagram|reddit
// or ?ref=...) in a first-party cookie so the lead CRM can tag the source when
// they later submit a form. First touch wins. (for=code)
export default function CaptureSource() {
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const src = (sp.get('utm_source') || sp.get('ref') || '').toLowerCase().slice(0, 30);
      if (src && !/(?:^|;\s*)mti_src=/.test(document.cookie)) {
        document.cookie = `mti_src=${encodeURIComponent(src)}; max-age=${60 * 60 * 24 * 30}; path=/; SameSite=Lax`;
      }
    } catch {}
  }, []);
  return null;
}
