import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

const VALID_TIERS = ['paperwork', 'apartment', 'full', 'not_sure'];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const {
    name,
    email,
    instagram_handle,
    nationality,
    tier_interested,
    budget_range,
    timeline,
    message,
  } = body || {};

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const tier = VALID_TIERS.includes(tier_interested) ? tier_interested : 'not_sure';

  try {
    const supabase = getSupabaseServer();
    const { error } = await supabase.from('concierge_inquiry').insert({
      name,
      email,
      instagram_handle: instagram_handle || null,
      nationality: nationality || null,
      tier_interested: tier,
      budget_range: budget_range || null,
      timeline: timeline || null,
      message: message || null,
    });

    if (error) {
      console.error('concierge_inquiry insert failed:', error);
      return NextResponse.json({ error: 'Could not save inquiry.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('concierge_inquiry route error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
