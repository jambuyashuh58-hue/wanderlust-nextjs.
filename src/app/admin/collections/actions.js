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

function parseCollection(formData) {
  const activityIds = formData.getAll('activity_ids');

  const localTips = {};
  for (const id of activityIds) {
    const tip = formData.get(`tip__${id}`);
    if (tip) localTips[id] = tip;
  }

  const roadmapFields = {
    airport_code: formData.get('roadmap_airport_code') || '',
    transport_from_istanbul: formData.get('roadmap_transport_from_istanbul') || '',
    airport_to_city: formData.get('roadmap_airport_to_city') || '',
    stay_neighborhoods: formData.get('roadmap_stay_neighborhoods') || '',
    recommended_days: formData.get('roadmap_recommended_days') || '',
  };
  const hasRoadmap = Object.values(roadmapFields).some(Boolean);

  return {
    title: formData.get('title'),
    slug: formData.get('slug'),
    intro: formData.get('intro') || null,
    meta_description: formData.get('meta_description') || null,
    hero_image_url: formData.get('hero_image_url') || null,
    body_images: toArray(formData.get('body_images')),
    activity_ids: activityIds,
    local_tips: localTips,
    roadmap: hasRoadmap ? roadmapFields : {},
    city_name: formData.get('city_name') || null,
    show_concierge_card: formData.get('show_concierge_card') === 'on',
    sort_order: toNum(formData.get('sort_order')),
    published: formData.get('published') === 'on',
    display_style: formData.get('display_style'),
  };
}

function revalidateCollectionPaths(slug) {
  revalidatePath('/collections');
  revalidatePath('/guides');
  revalidatePath('/');
  if (slug) revalidatePath(`/collections/${slug}`);
}

export async function createCollection(formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const row = parseCollection(formData);
  const { error } = await supabase.from('collection').insert(row);
  if (error) throw new Error(error.message);
  revalidateCollectionPaths(row.slug);
  redirect('/admin/collections');
}

export async function updateCollection(id, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const row = parseCollection(formData);
  const { error } = await supabase.from('collection').update(row).eq('id', id);
  if (error) throw new Error(error.message);
  revalidateCollectionPaths(row.slug);
  redirect('/admin/collections');
}

export async function deleteCollection(id, slug) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('collection').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidateCollectionPaths(slug);
  redirect('/admin/collections');
}
