'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { isAdminRequest } from '@/lib/adminAuth';

function toArray(v) {
  if (!v) return [];
  return String(v).split(',').map((s) => s.trim()).filter(Boolean);
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
}

export async function createActivity(formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from('activity').insert(parseActivity(formData)).select('id').single();
  if (error) throw new Error(error.message);
  revalidateActivityPaths(data.id);
  redirect(formData.get('_return_to') || '/admin/activities');
}

export async function updateActivity(id, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('activity').update(parseActivity(formData)).eq('id', id);
  if (error) throw new Error(error.message);
  revalidateActivityPaths(id);
  redirect(formData.get('_return_to') || '/admin/activities');
}

export async function deleteActivity(id, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('activity').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidateActivityPaths(id);
  redirect(formData?.get('_return_to') || '/admin/activities');
}
