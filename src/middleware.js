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

  // -------------------- Admin auth (unchanged) --------------------
  if (pathname.startsWith('/admin')) {
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

  // -------------------- Locale (EN default, TR under /tr) --------------------
  // English keeps today's exact URLs untouched (nothing rewritten, no prefix)
  // so every already-indexed/backlinked English URL keeps working exactly as
  // before -- this is additive, not a migration of the existing site.
  // A request to /tr/... is rewritten internally to the same route tree
  // without the /tr prefix (the browser URL bar still shows /tr/...,
  // NextResponse.rewrite is transparent to the client) and tagged with an
  // `x-locale: tr` request header so Server Components (via next/headers)
  // know to pull the *_tr columns instead of the English ones.
  const isTurkish = pathname === '/tr' || pathname.startsWith('/tr/');
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', isTurkish ? 'tr' : 'en');

  if (isTurkish) {
    const rewritten = request.nextUrl.clone();
    rewritten.pathname = pathname.replace(/^\/tr/, '') || '/';
    return NextResponse.rewrite(rewritten, { request: { headers: requestHeaders } });
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Runs on every page route except static assets and API routes -- API
  // routes don't need a locale, and admin's own matcher logic lives inside
  // the function above, so it still needs to be included here.
  matcher: ['/((?!api/|_next/|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)'],
};
