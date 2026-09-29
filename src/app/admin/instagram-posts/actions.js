'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { isAdminRequest } from '@/lib/adminAuth';

function parse(formData) {
  const mediaUrlsRaw = (formData.get('media_urls') || '').toString();
  const media_urls = mediaUrlsRaw
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const carousel_slide_count = formData.get('carousel_slide_count');

  return {
    post_type: formData.get('post_type') || 'single',
    scheduled_date: formData.get('scheduled_date') || null,
    topic: formData.get('topic') || null,
    content_pillar: formData.get('content_pillar') || null,
    caption: formData.get('caption') || null,
    hashtags: formData.get('hashtags') || null,
    media_urls,
    carousel_slide_count: carousel_slide_count ? Number(carousel_slide_count) : null,
    status: formData.get('status') || 'draft',
    instagram_handle: formData.get('instagram_handle') || null,
    source_link: formData.get('source_link') || null,
  };
}

export async function createInstagramPost(formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const row = parse(formData);
  const { error } = await supabase.from('instagram_post').insert(row);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/instagram-posts');
  redirect(formData.get('_return_to') || '/admin/instagram-posts');
}

export async function updateInstagramPost(id, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const row = parse(formData);
  const { error } = await supabase.from('instagram_post').update(row).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/instagram-posts');
  redirect(formData.get('_return_to') || '/admin/instagram-posts');
}

export async function deleteInstagramPost(id, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('instagram_post').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/instagram-posts');
  redirect(formData?.get('_return_to') || '/admin/instagram-posts');
}
