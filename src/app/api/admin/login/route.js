import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, createSessionToken } from '@/lib/adminAuth';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

const MAX_FAILS = 5; // failed attempts allowed per IP...
const WINDOW_MS = 15 * 60 * 1000; // ...within this window

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function clientIp(request) {
  const fwd = request.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0] : request.headers.get('x-real-ip') || 'unknown').trim().slice(0, 64);
}

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 500 });
  }

  const ip = clientIp(request);
  let supabase = null;
  try {
    supabase = getSupabaseServer();
    const since = new Date(Date.now() - WINDOW_MS).toISOString();
    const { count } = await supabase
      .from('admin_login_attempt')
      .select('id', { count: 'exact', head: true })
      .eq('ip', ip)
      .eq('success', false)
      .gte('created_at', since);
    if ((count || 0) >= MAX_FAILS) {
      return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });
    }
  } catch {
    // Rate-limit store unavailable: fall through to the password check.
  }

  const ok = typeof password === 'string' && safeEqual(password, process.env.ADMIN_PASSWORD);

  try {
    if (supabase) await supabase.from('admin_login_attempt').insert({ ip, success: ok });
  } catch {}

  if (!ok) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
