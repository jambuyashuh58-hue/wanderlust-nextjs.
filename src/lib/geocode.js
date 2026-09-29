// Server-side only (Vercel's serverless functions have open outbound
// internet -- unlike the sandbox this was written in, which sits behind a
// locked-down proxy). Uses OpenStreetMap's free Nominatim geocoder: no API
// key, no cost, but its usage policy caps requests at ~1/second and requires
// a descriptive User-Agent, so this is meant to be called a few times per
// request (inline on a single activity save), not in a tight loop -- see
// geocodeMissingBatch() in admin/activities/actions.js for the throttled
// batch version.

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'movetoistanbul.online activity geocoder (contact: jambuyashuh58@gmail.com)';

// Looks up an address (optionally scoped to a city) and returns
// { latitude, longitude } or null if nothing matched / the request failed.
// Never throws -- geocoding is a nice-to-have, not something that should
// block saving an activity.
export async function geocodeAddress(address, city) {
  const query = [address, city, 'Türkiye'].filter(Boolean).join(', ');
  if (!query.trim()) return null;

  try {
    const url = `${NOMINATIM_URL}?format=json&limit=1&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const results = await res.json();
    const hit = results?.[0];
    if (!hit?.lat || !hit?.lon) return null;
    return { latitude: Number(hit.lat), longitude: Number(hit.lon) };
  } catch {
    return null;
  }
}

export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
