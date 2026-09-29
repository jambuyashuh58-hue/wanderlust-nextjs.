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
    country: formData.get('country'),
    slug: formData.get('slug'),
    title: formData.get('title'),
    meta_description: formData.get('meta_description') || null,
    hero_image_url: formData.get('hero_image_url') || null,
    intro: formData.get('intro') || null,
    visa_section: formData.get('visa_section') || null,
    housing_section: formData.get('housing_section') || null,
    cost_section: formData.get('cost_section') || null,
    concierge_cta: formData.get('concierge_cta') || null,
    published: formData.get('published') === 'on',
    sort_order: toNum(formData.get('sort_order')),
  };
}

function revalidate(slug) {
  revalidatePath('/country-guides');
  if (slug) revalidatePath(`/country-guides/${slug}`);
}

export async function createCountryGuide(formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const row = parse(formData);
  const { error } = await supabase.from('country_guide').insert(row);
  if (error) throw new Error(error.message);
  revalidate(row.slug);
  redirect(formData.get('_return_to') || '/admin/country-guides');
}

export async function updateCountryGuide(id, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const row = parse(formData);
  const { error } = await supabase.from('country_guide').update(row).eq('id', id);
  if (error) throw new Error(error.message);
  revalidate(row.slug);
  redirect(formData.get('_return_to') || '/admin/country-guides');
}

export async function deleteCountryGuide(id, slug, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('country_guide').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidate(slug);
  redirect(formData?.get('_return_to') || '/admin/country-guides');
}
