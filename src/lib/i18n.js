// Client-safe i18n helpers -- no next/headers import here on purpose. This
// file gets bundled into Client Components (Navbar uses `t`), and importing
// next/headers anywhere in that import chain breaks the client build. Server
// Components needing the current locale use getLocale() from
// '@/lib/i18nServer' instead.

// Picks the localized column for a DB row with a graceful fallback to
// English when the Turkish column hasn't been translated yet (all *_tr
// columns are nullable so content can be backfilled progressively without
// ever showing blank text on a live page).
export function pick(row, field, locale) {
  if (!row) return row;
  if (locale === 'tr') {
    const trValue = row[`${field}_tr`];
    if (trValue) return trValue;
  }
  return row[field];
}

// Static UI copy (nav, buttons, common labels) that doesn't come from the
// database. Keep this small and add keys as pages get localized -- there's
// no point translating strings nothing reads yet.
const DICTIONARY = {
  en: {
    nav_discover: 'Discover',
    nav_collections: 'Collections',
    nav_guides: 'Guides',
    nav_country_guides: 'Country Guides',
    nav_itinerary: 'Itinerary',
    nav_dashboard: 'Dashboard',
    nav_concierge: 'Services',
    plan_my_trip: 'Plan My Trip',
  },
  tr: {
    nav_discover: 'Keşfet',
    nav_collections: 'Koleksiyonlar',
    nav_guides: 'Rehberler',
    nav_country_guides: 'Ülke Rehberleri',
    nav_itinerary: 'Gezi Planı',
    nav_dashboard: 'Panel',
    nav_concierge: 'Hizmetler',
    plan_my_trip: 'Gezimi Planla',
  },
};

export function t(key, locale = 'en') {
  return DICTIONARY[locale]?.[key] ?? DICTIONARY.en[key] ?? key;
}
