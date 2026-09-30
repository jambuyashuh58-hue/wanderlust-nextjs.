// Gate for the free "Istanbul for Digital Nomads" ebook: saves the lead to
// the same newsletter_subscriber table the rest of the site already uses
// (tagged source_component='ebook_guide' so it's filterable from the other
// signup surfaces), then emails the PDF link and returns it to the client so
// the download works immediately either way -- the emailed copy is a nice-to
// -have for a subscriber who closes the tab, not the only way to get the
// file. See notify.js for why RESEND_API_KEY needs a verified sending
// domain before this can actually reach a subscriber's inbox; until then the
// email step no-ops (see sendEmail) but the on-page download still works.
import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { sendNotificationEmail, sendSubscriberEmail } from '@/lib/notify';

const PDF_PATH = '/downloads/istanbul-digital-nomad-guide.pdf';

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { email, firstName } = body || {};
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  const name = typeof firstName === 'string' ? firstName.trim().slice(0, 100) : null;

  try {
    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from('newsletter_subscriber')
      .upsert(
        {
          email,
          first_name: name || null,
          source_page: '/guide',
          source_component: 'ebook_guide',
          ebook_sent_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );

    if (error) {
      console.error('guide-download upsert failed:', error);
      return NextResponse.json({ error: 'Could not save your download.' }, { status: 500 });
    }

    const downloadUrl = `${request.nextUrl.origin}${PDF_PATH}`;

    // Fire-and-forget -- never block the download on either email.
    sendSubscriberEmail({
      to: email,
      subject: 'Your Istanbul for Digital Nomads guide',
      html: `
        <p>Hi${name ? ` ${name}` : ''},</p>
        <p>Here's your free copy of <strong>Istanbul for Digital Nomads</strong> -- 18 step-by-step guides covering visas, residence permits, banking, housing, and cost of living.</p>
        <p><a href="${downloadUrl}">Download the PDF</a></p>
        <p>-- Move to Istanbul</p>
      `,
    }).catch(() => {});

    sendNotificationEmail({
      subject: `New ebook download: ${email}`,
      html: `
        <h2>New ebook download</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Name:</strong> ${name || '—'}</p>
      `,
    }).catch(() => {});

    return NextResponse.json({ ok: true, downloadUrl: PDF_PATH });
  } catch (err) {
    console.error('guide-download route error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
