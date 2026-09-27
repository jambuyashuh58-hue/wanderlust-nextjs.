// Lightweight client-side "wishlist" — no login system exists on this site yet,
// so saved activities live in the visitor's own browser (localStorage) rather
// than a Supabase table. This mirrors what the old Base44 site's Dashboard
// showed as "Experiences budget": whatever the visitor hearted on an activity
// card, rolled into their one-time relocation costs.
const STORAGE_KEY = 'wanderlust_saved_activities';
const EVENT_NAME = 'wanderlust:saved-activities-changed';

function readRaw() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeRaw(list) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // localStorage unavailable (private mode, quota) -- fail silently, the
    // wishlist just won't persist for this visitor.
  }
}

export function getSavedActivities() {
  return readRaw();
}

export function isActivitySaved(id) {
  if (!id) return false;
  return readRaw().some((a) => a.id === id);
}

export function toggleSavedActivity(activity) {
  if (!activity?.id) return;
  const list = readRaw();
  const exists = list.some((a) => a.id === activity.id);
  const next = exists
    ? list.filter((a) => a.id !== activity.id)
    : [
        ...list,
        {
          id: activity.id,
          title: activity.title,
          image_url: activity.image_url,
          price: activity.price ?? null,
          city_name: activity.city_name,
          category: activity.category,
        },
      ];
  writeRaw(next);
  return !exists;
}

// Subscribes to changes made either in this tab (custom event, fired by
// toggleSavedActivity) or another tab (native 'storage' event). Returns an
// unsubscribe function.
export function subscribeSavedActivities(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback(readRaw());
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}
