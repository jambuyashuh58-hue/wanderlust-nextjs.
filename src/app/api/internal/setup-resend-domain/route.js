// TEMPORARY, one-off route: registers movetoistanbul.online as a Resend
// sending domain and returns the DNS records Resend needs for verification.
// Gated by TEMP_SETUP_TOKEN (not ADMIN_PASSWORD) so it's usable from a plain
// curl during setup. Delete this route (and the TEMP_SETUP_TOKEN env var)
// once the domain is added and verified -- it has no reason to exist after
// that.
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const token = request.headers.get('x-setup-token');
  if (!process.env.TEMP_SETUP_TOKEN || token !== process.env.TEMP_SETUP_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY not set' }, { status: 500 });
  }

  // GET first -- if the domain is already registered with Resend (e.g. from
  // a previous attempt), return its existing records instead of erroring on
  // a duplicate POST.
  const listRes = await fetch('https://api.resend.com/domains', {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const listData = await listRes.json().catch(() => ({}));
  const existing = listData?.data?.find((d) => d.name === 'movetoistanbul.online');

  if (existing) {
    const getRes = await fetch(`https://api.resend.com/domains/${existing.id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const getData = await getRes.json().catch(() => ({}));
    return NextResponse.json({ mode: 'existing', domain: getData });
  }

  const createRes = await fetch('https://api.resend.com/domains', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'movetoistanbul.online' }),
  });
  const createData = await createRes.json().catch(() => ({}));

  if (!createRes.ok) {
    return NextResponse.json({ error: 'Resend domain create failed', detail: createData }, { status: createRes.status });
  }

  return NextResponse.json({ mode: 'created', domain: createData });
}
