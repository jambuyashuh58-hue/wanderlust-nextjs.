import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, createSessionToken } from '@/lib/adminAuth';

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 500 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
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
