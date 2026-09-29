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

const GOOGLE_MAPS_HOST = /(^|\.)google\.[a-z.]+$/i;
const SHORT_LINK_HOST = /^(maps\.app\.goo\.gl|goo\.gl|g\.co)$/i;

// Full Google Maps URLs carry the exact coordinates right in the URL, in one
// of a few formats depending on how the link was copied ("Share" vs. the
// address bar vs. an embed code): @lat,lng in the path, a !3dlat!4dlng pair
// deep in an encoded data blob, or a plain ?q=lat,lng. Pulling these out
// directly is both free and *more* accurate than text-geocoding the address,
// since it's the exact pin Google shows -- no lookup, no rate limit.
function extractCoordsFromUrl(url) {
  const patterns = [
    /@(-?\d{1,3}\.\d+),(-?\d{1,3}\.\d+)/, // .../place/Name/@41.0086,28.9802,17z
    /!3d(-?\d{1,3}\.\d+)!4d(-?\d{1,3}\.\d+)/, // precise pin inside the data param
    /[?&]q=(-?\d{1,3}\.\d+),(-?\d{1,3}\.\d+)/, // ?q=41.0086,28.9802
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return { latitude: Number(m[1]), longitude: Number(m[2]) };
  }
  return null;
}

function isGoogleMapsUrl(value) {
  try {
    const u = new URL(value);
    return GOOGLE_MAPS_HOST.test(u.hostname) || SHORT_LINK_HOST.test(u.hostname);
  } catch {
    return false;
  }
}

// A shortened link (maps.app.goo.gl/xyz) has no coordinates in it -- they
// only appear after Google's redirect resolves it to the full maps.google.*
// URL. One HEAD request (following redirects) gets that long URL without
// downloading the page itself.
async function resolveShortLink(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(8000) });
    return res.url || null;
  } catch {
    return null;
  }
}

// Looks up an address OR a Google Maps link (any format: a full
// maps.google.com URL, a maps.app.goo.gl short link, or plain address text)
// and returns { latitude, longitude } or null if nothing matched / the
// request failed. Never throws -- geocoding is a nice-to-have, not something
// that should block saving an activity.
export async function geocodeAddress(address, city) {
  const value = (address || '').trim();
  if (!value) return null;

  if (isGoogleMapsUrl(value)) {
    const direct = extractCoordsFromUrl(value);
    if (direct) return direct;
    const resolved = await resolveShortLink(value);
    if (resolved) {
      const fromResolved = extractCoordsFromUrl(resolved);
      if (fromResolved) return fromResolved;
    }
    // A Maps link with no extractable coordinates (rare, but some share
    // formats omit them) isn't usable as free-text either -- bail rather
    // than sending a URL string into Nominatim's address search.
    return null;
  }

  const query = [value, city, 'Türkiye'].filter(Boolean).join(', ');
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
