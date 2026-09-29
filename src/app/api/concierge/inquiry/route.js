import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { sendNotificationEmail } from '@/lib/notify';

const VALID_TIERS = ['paperwork', 'apartment', 'full', 'not_sure'];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const {
    name,
    email,
    instagram_handle,
    nationality,
    tier_interested,
    budget_range,
    timeline,
    message,
  } = body || {};

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const tier = VALID_TIERS.includes(tier_interested) ? tier_interested : 'not_sure';

  try {
    const supabase = getSupabaseServer();
    const { error } = await supabase.from('concierge_inquiry').insert({
      name,
      email,
      instagram_handle: instagram_handle || null,
      nationality: nationality || null,
      tier_interested: tier,
      budget_range: budget_range || null,
      timeline: timeline || null,
      message: message || null,
    });

    if (error) {
      console.error('concierge_inquiry insert failed:', error);
      return NextResponse.json({ error: 'Could not save inquiry.' }, { status: 500 });
    }

    // Fire-and-forget: the inquiry is already saved, so a failed notification
    // email should never turn into a failed response to the user.
    sendNotificationEmail({
      subject: `New concierge inquiry: ${name}`,
      html: `
        <h2>New concierge inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tier interested:</strong> ${tier}</p>
        <p><strong>Instagram:</strong> ${instagram_handle || '—'}</p>
        <p><strong>Nationality:</strong> ${nationality || '—'}</p>
        <p><strong>Budget range:</strong> ${budget_range || '—'}</p>
        <p><strong>Timeline:</strong> ${timeline || '—'}</p>
        <p><strong>Message:</strong><br/>${(message || '—').replace(/\n/g, '<br/>')}</p>
        <p><a href="https://movetoistanbul.online/admin/concierge">View in admin →</a></p>
      `,
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('concierge_inquiry route error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
