// Vercel Cron hits this once a day (see vercel.json) to send the two
// follow-up emails in the ebook drip sequence: a Day-2 "common mistake"
// story and a Day-4 pitch for the $99 Visa & Paperwork Guidance tier (the
// low-friction entry point into the concierge funnel -- see
// ConciergeInteractive.jsx for the full tier list).
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
    subject: "The apartment mistake that costs people their deposit",
    html: `
      <p>Hi${name ? ` ${name}` : ''},</p>
      <p>Quick story: one of the most common messages we get is from someone who found a great-looking apartment on sahibinden.com, wired a "holding deposit" to secure it before flying out -- and never heard from the "landlord" again.</p>
      <p>The listing photos were real (lifted from another ad). The urgency ("someone else is ready to sign today") was the tell. There's a full scam checklist in your guide (chapter 12) -- worth a read before you message anyone about a rental.</p>
      <p>The same pattern shows up with residence permits: people gather the wrong insurance policy (foreign travel insurance isn't accepted -- it has to be a Turkish insurer) and get rejected at the appointment after weeks of waiting.</p>
      <p>Both are avoidable once you know the specific thing to check for -- which is exactly what the guide walks through step by step.</p>
      <p>-- Move to Istanbul</p>
    `,
  };
}

function day4Email(name) {
  return {
    subject: 'Want someone to just map your visa route for you?',
    html: `
      <p>Hi${name ? ` ${name}` : ''},</p>
      <p>If reading through the visa/ikamet chapters left you with more questions than answers, that's normal -- the rules changed a lot in 2025-2026, and getting it wrong costs weeks, not minutes.</p>
      <p>Our <strong>Visa & Paperwork Guidance</strong> is a 45-minute strategy call where we map your exact route for your nationality and situation: a personalized checklist, document review, and help booking your e-ikamet appointment -- for $99.</p>
      <p><a href="https://movetoistanbul.online/concierge">See the details and book →</a></p>
      <p>It's the same guidance we'd give if you hired us for the full relocation package -- just scoped to the one thing most people get stuck on first.</p>
      <p>-- Move to Istanbul</p>
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
    const res = await sendSubscriberEmail({ to: sub.email, subject, html });
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
    const res = await sendSubscriberEmail({ to: sub.email, subject, html });
    if (res.ok) {
      results.day4.sent += 1;
      await supabase.from('newsletter_subscriber').update({ drip_day4_sent_at: new Date().toISOString() }).eq('id', sub.id);
    } else if (!res.skipped) {
      results.day4.failed += 1;
    }
  }

  return NextResponse.json({ ok: true, ...results });
}
