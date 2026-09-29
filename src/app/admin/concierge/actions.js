'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { isAdminRequest } from '@/lib/adminAuth';

const VALID_STATUSES = ['new', 'contacted', 'converted', 'declined'];

export async function updateConciergeStatus(id, formData) {
  if (!isAdminRequest()) throw new Error('Unauthorized');
  const status = formData.get('status');
  if (!VALID_STATUSES.includes(status)) throw new Error('Invalid status');
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('concierge_inquiry').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/concierge');
  revalidatePath(`/admin/concierge/${id}`);
}
