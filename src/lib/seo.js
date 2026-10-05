// Shared SEO helpers.
//
// Canonical URLs: Next.js resolves a relative `alternates.canonical` path
// against the root layout's `metadataBase`, so every page only needs to pass
// its own path (e.g. canonical('/guides/visa')) rather than building an
// absolute URL by hand. Centralizing this also means a future domain change
// only has to happen in one place instead of being duplicated per page.
export const SITE_URL = 'https://movetoistanbul.online';

// path should start with '/' (or be '/' for the homepage).
export function canonical(path) {
  return path;
}
