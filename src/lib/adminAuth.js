// Server-only (Node runtime) helpers for the /admin password gate.
// The middleware (Edge runtime) has its own copy of the HMAC verify logic
// using Web Crypto, since Edge middleware can't use Node's `crypto` module --
// both sign with the same ADMIN_SESSION_SECRET so tokens from one verify
// correctly in the other.
import crypto from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'admin_session';
const SESSION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function sign(payload) {
  return crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(payload).digest('hex');
}

export function createSessionToken() {
  const exp = String(Date.now() + SESSION_MS);
  return `${exp}.${sign(exp)}`;
}

export function verifySessionToken(token) {
  if (!token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig) return false;
  if (Date.now() > Number(exp)) return false;
  const expected = sign(exp);
  if (expected.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

// Throws-free guard for use at the top of a server action or route handler.
// Middleware already blocks unauthenticated requests to /admin/**, but this
// is cheap defense-in-depth for actions invoked directly.
export function isAdminRequest() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token);
}
