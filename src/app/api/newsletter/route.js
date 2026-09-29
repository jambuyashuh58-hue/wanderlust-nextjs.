import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

const VALID_SOURCES = ['footer', 'activity_page', 'discover_slidein', 'collection_page'];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { email, source_page, source_component } = body || {};

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  const component = VALID_SOURCES.includes(source_component) ? source_component : null;

  try {
    const supabase = getSupabaseServer();
    // Upsert on email so re-subscribing (or submitting the form twice) doesn't 500
    // on the unique constraint -- it just updates source_page/source_component.
    const { error } = await supabase
      .from('newsletter_subscriber')
      .upsert(
        { email, source_page: source_page || null, source_component: component },
        { onConflict: 'email' }
      );

    if (error) {
      console.error('newsletter_subscriber upsert failed:', error);
      return NextResponse.json({ error: 'Could not save subscription.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('newsletter route error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
