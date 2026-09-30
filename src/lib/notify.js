// Sends a plain-text/HTML email via Resend's HTTP API (no SDK dependency --
// a raw fetch works fine in any Next.js runtime and keeps the bundle small).
//
// Gracefully no-ops if RESEND_API_KEY isn't set, so local dev and any
// environment that hasn't configured this yet don't throw. Callers should
// treat this as fire-and-forget -- a failed email must never fail the form
// submission itself (the Supabase row is already saved by the time this
// runs).
//
// Note on `to`: Resend's shared test sender (onboarding@resend.dev, the
// RESEND_FROM default below) can only deliver to the Resend account's own
// verified email, not to arbitrary subscribers -- fine for the admin
// notification path (sendNotificationEmail, always sent to NOTIFY_EMAIL),
// but sending the ebook/drip sequence to real subscriber addresses (see
// sendSubscriberEmail) needs a verified sending domain in the Resend
// dashboard and RESEND_FROM pointed at it (e.g. "Move to Istanbul
// <hello@movetoistanbul.online>").
export async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || !to) {
    console.warn('sendEmail skipped: RESEND_API_KEY not set or no recipient.');
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
        from: process.env.RESEND_FROM || 'Move to Istanbul <onboarding@resend.dev>',
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('sendEmail failed:', res.status, text);
      return { ok: false };
    }

    return { ok: true };
  } catch (err) {
    console.error('sendEmail error:', err);
    return { ok: false };
  }
}

// Thin wrapper used everywhere this codebase alerts the site owner about a
// new inquiry/signup -- always sent to NOTIFY_EMAIL, so it works with the
// shared Resend test sender (no domain verification needed) unlike
// subscriber-facing email.
export async function sendNotificationEmail({ subject, html }) {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) {
    console.warn('sendNotificationEmail skipped: NOTIFY_EMAIL not set.');
    return { skipped: true };
  }
  return sendEmail({ to, subject, html });
}

// Sends to a real subscriber's own inbox -- see the deliverability note on
// sendEmail above. Kept as a named alias so call sites (the ebook delivery
// and drip-sequence emails) read clearly for what they are.
export const sendSubscriberEmail = sendEmail;
