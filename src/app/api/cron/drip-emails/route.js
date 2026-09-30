// Vercel Cron hits this once a day (see vercel.json) to send the two
// follow-up emails in the checklist drip sequence: a Day-2 "common mistake"
// story pitching Apartment Shortlisting ($449), and a Day-4 soft pitch for
// a free discovery call into the Relocation Concierge -- see
// ConciergeInteractive.jsx for the full tier list.
//
// Deliberately re-runs every day rather than scheduling exact send times:
// each subscriber's ebook_sent_at is their own zero-hour, and the two
// `_sent_at` columns make every send idempotent, so a daily sweep catches
// everyone due today regardless of what time they originally signed up.
//
// No-ops safely (200, nothing sent) until RESEND_API_KEY + a verified
// sending domain (RESEND_FROM) are configured -- see notify.js.
import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { sendSubscriberEmail } from '@/lib/notify';

// This queries live data on every invocation (never cacheable) and reads a
// per-request auth header -- Next.js otherwise tries to statically
// prerender GET routes at build time, which fails here since there's no
// Supabase connection available during the build.
export const dynamic = 'force-dynamic';

const DAY_MS = 24 * 60 * 60 * 1000;

function daysAgo(n) {
  return new Date(Date.now() - n * DAY_MS).toISOString();
}

function day2Email(name) {
  return {
    subject: 'The #1 mistake foreigners make when renting in Istanbul',
    html: `
      <p>Hey${name ? ` ${name}` : ''},</p>
      <p>Most people think finding an apartment is just about the price. It's not. The real trap is the contract.</p>
      <p>Many landlords ask for 6-12 months upfront or hide fees in Turkish-only clauses. We recently helped a client avoid a $3,000 mistake by spotting this exact clause.</p>
      <p>If you want someone to review your options or handle the hunt entirely, we offer an <strong>Apartment Shortlisting</strong> service for $449.</p>
      <p>Want to see how it works? <a href="https://movetoistanbul.online/concierge">Take a look here</a>.</p>
    `,
  };
}

function day4Email(name) {
  const bookingUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://movetoistanbul.online/concierge';
  return {
    subject: 'Can I take this off your plate?',
    html: `
      <p>Hey${name ? ` ${name}` : ''},</p>
      <p>I know planning a move is stressful. Between visas, banks, and housing, it's a part-time job.</p>
      <p>If you're staying longer than a month, our <strong>Relocation Concierge</strong> handles it all for you.</p>
      <p>We offer a 15-minute free discovery call to map out your exact situation -- no pressure. If we're not a good fit, I'll still point you to the right free resources.</p>
      <p><a href="${bookingUrl}">Book your slot here</a>.</p>
    `,
  };
}

export async function GET(request) {
  // Vercel sets this header automatically on its own cron invocations when
  // CRON_SECRET is configured for the project; reject anything else once
  // that secret exists so this route can't be triggered by a random request.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const supabase = getSupabaseServer();
  const results = { day2: { sent: 0, failed: 0 }, day4: { sent: 0, failed: 0 } };

  const { data: day2Due } = await supabase
    .from('newsletter_subscriber')
    .select('id, email, first_name')
    .eq('source_component', 'ebook_guide')
    .not('ebook_sent_at', 'is', null)
    .is('drip_day2_sent_at', null)
    .lte('ebook_sent_at', daysAgo(2));

  for (const sub of day2Due || []) {
    const { subject, html } = day2Email(sub.first_name);
    const res = await sendSubscriberEmail({ to: sub.email, subject, html, replyTo: process.env.NOTIFY_EMAIL || undefined });
    if (res.ok) {
      results.day2.sent += 1;
      await supabase.from('newsletter_subscriber').update({ drip_day2_sent_at: new Date().toISOString() }).eq('id', sub.id);
    } else if (!res.skipped) {
      results.day2.failed += 1;
    }
  }

  const { data: day4Due } = await supabase
    .from('newsletter_subscriber')
    .select('id, email, first_name')
    .eq('source_component', 'ebook_guide')
    .not('ebook_sent_at', 'is', null)
    .is('drip_day4_sent_at', null)
    .lte('ebook_sent_at', daysAgo(4));

  for (const sub of day4Due || []) {
    const { subject, html } = day4Email(sub.first_name);
    const res = await sendSubscriberEmail({ to: sub.email, subject, html, replyTo: process.env.NOTIFY_EMAIL || undefined });
    if (res.ok) {
      results.day4.sent += 1;
      await supabase.from('newsletter_subscriber').update({ drip_day4_sent_at: new Date().toISOString() }).eq('id', sub.id);
    } else if (!res.skipped) {
      results.day4.failed += 1;
    }
  }

  return NextResponse.json({ ok: true, ...results });
}
