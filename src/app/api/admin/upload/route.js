import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/adminAuth';
import { getSupabaseServer } from '@/lib/supabaseServer';

export async function POST(request) {
  if (!isAdminRequest()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 8MB)' }, { status: 400 });
  }

  const ext = (file.name?.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;

  const supabase = getSupabaseServer();
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from('media').upload(path, buffer, {
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
