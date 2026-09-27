'use server';

import { redirect } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { isAdminRequest } from '@/lib/adminAuth';

function parse(formData) {
  return {
    name: formData.get('name'),
    reference_image_url: formData.get('reference_image_url'),
    personality: formData.get('personality') || null,
    backstory: formData.get('backstory') || null,
    narrative_style: formData.get('narrative_style') || null,
    active: formData.get('active') === 'on',
  };
}

// Only one character should be "active" at a time -- it's the one fed into
// Instagram caption generation for a consistent voice.
async function deactivateOthers(supabase, exceptId) {
  let query = supabase.from('brand_avatar').update({ active: false });
  if (exceptId) query = query.neq('id', exceptId);
  await query;
}

export async function createBrandAvatar(formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const row = parse(formData);
  const { data, error } = await supabase.from('brand_avatar').insert(row).select('id').single();
  if (error) throw new Error(error.message);
  if (row.active) await deactivateOthers(supabase, data.id);
  redirect('/admin/character');
}

export async function updateBrandAvatar(id, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const row = parse(formData);
  const { error } = await supabase.from('brand_avatar').update(row).eq('id', id);
  if (error) throw new Error(error.message);
  if (row.active) await deactivateOthers(supabase, id);
  redirect('/admin/character');
}

export async function deleteBrandAvatar(id) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('brand_avatar').delete().eq('id', id);
  if (error) throw new Error(error.message);
  redirect('/admin/character');
}
