// Stores relocation-quiz answers so they show up in the admin CRM. POST saves
// the answers when the quiz is finished (anonymous at first, returns the row
// id); PATCH attaches the email if the visitor chooses to leave one on the
// result screen. (for=code)
import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { captureLead, sourceFromRequest } from '@/lib/leads';

const ALLOWED = ['purpose', 'timeframe', 'visa', 'priority'];
const clean = (v) => (typeof v === 'string' ? v.slice(0, 60) : null);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request) {
  try {
    const b = await request.json();
    const answers = {};
    for (const k of ALLOWED) if (clean(b.answers?.[k])) answers[k] = clean(b.answers[k]);
    const { data, error } = await getSupabaseServer()
      .from('quiz_response')
      .insert({ answers, headline: clean(b.headline), recommended_tier: clean(b.recommended_tier) })
      .select('id')
      .single();
    if (error) throw error;
    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error('quiz save failed:', err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

export async function PATCH(request) {
  try {
    const b = await request.json();
    const email = String(b.email || '').trim().toLowerCase();
    if (!EMAIL_RE.test(email) || !/^[0-9a-f-]{36}$/.test(String(b.id))) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
    }
    const { error } = await getSupabaseServer().from('quiz_response').update({ email }).eq('id', b.id);
    if (error) throw error;
    await captureLead({ email, source: sourceFromRequest(request), sourceDetail: 'relocation_quiz' });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('quiz email save failed:', err);
    return NextResponse.json({ error: 'Could not save.' }, { status: 500 });
  }
}
