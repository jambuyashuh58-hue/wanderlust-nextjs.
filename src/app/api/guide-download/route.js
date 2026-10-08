// Gate for the free "90-60-30 Day Relocation Guide" digital book (a full,
// multi-module book with fillable worksheets -- previously a shorter
// "Istanbul for Digital Nomads" ebook, upgraded per the lead-magnet
// repositioning): saves the lead to the same newsletter_subscriber table the
// rest of the site already uses (tagged source_component='ebook_guide' so
// it's filterable from the other signup surfaces), then emails the PDF link
// and returns it to the client so the download works immediately either way
// -- the emailed copy is a nice-to-have for a subscriber who closes the tab,
// not the only way to get the file. See notify.js for why RESEND_API_KEY
// needs a verified sending domain before this can actually reach a
// subscriber's inbox; until then the email step no-ops (see sendEmail) but
// the on-page download still works.
import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { sendNotificationEmail, sendSubscriberEmail } from '@/lib/notify';
import { captureLead, sourceFromRequest } from '@/lib/leads';

const PDF_PATH = '/downloads/istanbul-90-60-30-relocation-guide.pdf';

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
          source_page: '/free-guide',
          source_component: 'ebook_guide',
          ebook_sent_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );

    if (error) {
      console.error('guide-download upsert failed:', error);
      return NextResponse.json({ error: 'Could not save your download.' }, { status: 500 });
    }

    await captureLead({ email, name, source: sourceFromRequest(request), sourceDetail: 'ebook_guide' });

    const downloadUrl = `${request.nextUrl.origin}${PDF_PATH}`;

    // Fire-and-forget -- never block the download on either email. Reply-to
    // points at the site owner's own inbox so "I read every reply" below is
    // literally true, not just a nice line.
    sendSubscriberEmail({
      to: email,
      replyTo: process.env.NOTIFY_EMAIL || undefined,
      subject: 'Your 90-60-30 Day Istanbul Guide is inside \u{1F4DA}',
      html: `
        <p>Hey${name ? ` ${name}` : ''}, welcome!</p>
        <p>Here's your <a href="${downloadUrl}">free 90-60-30 Day Relocation Guide</a>. I put this together because I saw too many foreigners getting overcharged or stuck in visa limbo.</p>
        <p>A couple of pages worth bookmarking right away: <strong>Module 3 (Housing)</strong> and <strong>Module 4 (Budget)</strong> — that's where relocators lose the most money, and where this guide will save you thousands.</p>
        <p>Which module are you starting with?</p>
        <p>If you have a quick question about your specific situation, just reply to this email. I read every reply.</p>
        <p>Cheers,<br>Elif, MoveToIstanbul.online</p>
      `,
    }).catch(() => {});

    sendNotificationEmail({
      subject: `New guide download: ${email}`,
      html: `
        <h2>New guide download</h2>
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
