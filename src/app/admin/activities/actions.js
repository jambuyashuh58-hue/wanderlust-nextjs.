'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { isAdminRequest } from '@/lib/adminAuth';
import { geocodeAddress, sleep } from '@/lib/geocode';

function toArray(v) {
  if (!v) return [];
  // Accept commas AND newlines as separators -- pasting a list of URLs one
  // per line is a natural way to fill this in, and previously that saved as
  // a single garbled string instead of separate array entries.
  return String(v).split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
}
function toNum(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function parseActivity(formData) {
  return {
    title: formData.get('title'),
    description: formData.get('description') || null,
    category: formData.get('category'),
    city_name: formData.get('city_name') || null,
    country: formData.get('country') || null,
    price: toNum(formData.get('price')),
    rating: toNum(formData.get('rating')),
    review_count: toNum(formData.get('review_count')),
    image_url: formData.get('image_url') || null,
    gallery: toArray(formData.get('gallery')),
    opening_hours: formData.get('opening_hours') || null,
    address: formData.get('address') || null,
    duration: formData.get('duration') || null,
    indoor: formData.get('indoor') === 'on',
    family_friendly: formData.get('family_friendly') === 'on',
    free: formData.get('free') === 'on',
    accessibility: formData.get('accessibility') || null,
    trending: formData.get('trending') === 'on',
    popularity_score: toNum(formData.get('popularity_score')),
    facilities: toArray(formData.get('facilities')),
    best_time_to_visit: formData.get('best_time_to_visit') || null,
    how_long: formData.get('how_long') || null,
    booking_url: formData.get('booking_url') || null,
    latitude: toNum(formData.get('latitude')),
    longitude: toNum(formData.get('longitude')),
    website: formData.get('website') || null,
    phone: formData.get('phone') || null,
    email: formData.get('email') || null,
  };
}

function revalidateActivityPaths(id) {
  revalidatePath('/discover');
  revalidatePath('/');
  if (id) revalidatePath(`/activity/${id}`);
  // Also invalidate the admin list itself (all its filter/search variants),
  // so a save/delete redirect back to it doesn't show stale pre-edit data
  // from the client router cache.
  revalidatePath('/admin/activities');
}

// If an address was typed in but no coordinates were (the admin form has
// both fields, but nobody's going to look up lat/lng by hand), fill them in
// automatically via the free OSM geocoder. Coordinates the admin did type in
// are left alone -- this only fills a gap, never overrides a manual value.
// Best-effort: a failed/slow geocode never blocks the save.
async function withGeocode(activity) {
  if (activity.address && activity.latitude == null && activity.longitude == null) {
    const coords = await geocodeAddress(activity.address, activity.city_name);
    if (coords) return { ...activity, ...coords };
  }
  return activity;
}

export async function createActivity(formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const payload = await withGeocode(parseActivity(formData));
  const { data, error } = await supabase.from('activity').insert(payload).select('id').single();
  if (error) throw new Error(error.message);
  revalidateActivityPaths(data.id);
  redirect(formData.get('_return_to') || '/admin/activities');
}

export async function updateActivity(id, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const payload = await withGeocode(parseActivity(formData));
  const { error } = await supabase.from('activity').update(payload).eq('id', id);
  if (error) throw new Error(error.message);
  revalidateActivityPaths(id);
  redirect(formData.get('_return_to') || '/admin/activities');
}

// Batch backfill for existing rows that already have an address but no
// coordinates yet (247 as of this writing). Nominatim's usage policy caps
// requests at ~1/second, so this only processes a bounded slice per call --
// the admin button calls it repeatedly (each click picks up wherever the
// last one left off) rather than looping hundreds of requests inside one
// serverless invocation, which would hit the function timeout.
const GEOCODE_BATCH_SIZE = 15;

export async function geocodeMissingBatch() {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { data: rows, error } = await supabase
    .from('activity')
    .select('id, address, city_name')
    .is('latitude', null)
    .not('address', 'is', null)
    .neq('address', '')
    .order('city_name')
    .limit(GEOCODE_BATCH_SIZE);
  if (error) throw new Error(error.message);
  if (!rows || rows.length === 0) return { processed: 0, geocoded: 0, remaining: 0 };

  let geocoded = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const coords = await geocodeAddress(row.address, row.city_name);
    if (coords) {
      const { error: updateError } = await supabase.from('activity').update(coords).eq('id', row.id);
      if (!updateError) geocoded++;
    }
    // Nominatim asks for max ~1 request/second -- stay under that between
    // calls (skip the wait after the last one in this batch).
    if (i < rows.length - 1) await sleep(1100);
  }

  const { count: remaining } = await supabase
    .from('activity')
    .select('id', { count: 'exact', head: true })
    .is('latitude', null)
    .not('address', 'is', null)
    .neq('address', '');

  revalidatePath('/admin/activities');
  return { processed: rows.length, geocoded, remaining: remaining || 0 };
}

export async function deleteActivity(id, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('activity').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidateActivityPaths(id);
  redirect(formData?.get('_return_to') || '/admin/activities');
}
