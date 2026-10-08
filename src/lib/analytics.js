// Thin GA4 event helper. Safe to call anywhere on the client: it no-ops when
// gtag isn't loaded (no measurement ID, blocked, or consent denied -- Consent
// Mode v2 then sends cookieless pings only). (for=code)
export function track(event, params = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    }
  } catch {}
}
