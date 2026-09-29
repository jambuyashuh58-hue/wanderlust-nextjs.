// Sends a plain-text/HTML email alert via Resend's HTTP API (no SDK dependency --
// a raw fetch works fine in any Next.js runtime and keeps the bundle small).
//
// Gracefully no-ops if RESEND_API_KEY / NOTIFY_EMAIL aren't set, so local dev
// and any environment that hasn't configured this yet don't throw. Callers
// should treat this as fire-and-forget -- a failed notification email must
// never fail the form submission itself (the Supabase row is already saved
// by the time this runs).
export async function sendNotificationEmail({ subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;

  if (!apiKey || !to) {
    console.warn('sendNotificationEmail skipped: RESEND_API_KEY or NOTIFY_EMAIL not set.');
    return { skipped: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Resend's shared test sender -- works without verifying a domain.
        // Override with a verified from address via RESEND_FROM once one exists.
        from: process.env.RESEND_FROM || 'Move to Istanbul <onboarding@resend.dev>',
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('sendNotificationEmail failed:', res.status, text);
      return { ok: false };
    }

    return { ok: true };
  } catch (err) {
    console.error('sendNotificationEmail error:', err);
    return { ok: false };
  }
}
