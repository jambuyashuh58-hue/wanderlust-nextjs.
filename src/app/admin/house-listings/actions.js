'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { isAdminRequest } from '@/lib/adminAuth';

function toNum(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function parse(formData) {
  return {
    title: formData.get('title'),
    neighborhood: formData.get('neighborhood') || null,
    city_name: formData.get('city_name') || null,
    monthly_rent: toNum(formData.get('monthly_rent')),
    deposit: toNum(formData.get('deposit')),
    bedrooms: toNum(formData.get('bedrooms')),
    furnished: formData.get('furnished') === 'on',
    image_url: formData.get('image_url') || null,
    listing_url: formData.get('listing_url') || null,
    notes: formData.get('notes') || null,
    published: formData.get('published') === 'on',
  };
}

function revalidate() {
  revalidatePath('/dashboard');
}

export async function createHouseListing(formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('house_listing').insert(parse(formData));
  if (error) throw new Error(error.message);
  revalidate();
  redirect('/admin/house-listings');
}

export async function updateHouseListing(id, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('house_listing').update(parse(formData)).eq('id', id);
  if (error) throw new Error(error.message);
  revalidate();
  redirect('/admin/house-listings');
}

export async function deleteHouseListing(id) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('house_listing').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidate();
  redirect('/admin/house-listings');
}
