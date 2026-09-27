import { NextResponse } from 'next/server';

// Edge runtime -- can't use Node's `crypto` module, so this HMAC verify uses
// Web Crypto instead. It must sign with the exact same algorithm and secret
// as src/lib/adminAuth.js (Node runtime, used by the login route) for tokens
// to verify correctly here.
async function sign(payload, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function isValidToken(token, secret) {
  if (!token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig) return false;
  if (Date.now() > Number(exp)) return false;
  const expected = await sign(exp, secret);
  return expected === sig;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin_session')?.value;
    if (await isValidToken(token, process.env.ADMIN_SESSION_SECRET)) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_session')?.value;
  if (!(await isValidToken(token, process.env.ADMIN_SESSION_SECRET))) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
