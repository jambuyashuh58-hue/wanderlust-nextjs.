// Lead CRM. Every form on the site funnels through captureLead(), which
// upserts one row per email into the `lead` table (name, source, status,
// nationality, target month, next action date...) and, if LEAD_WEBHOOK_URL is
// set (a Zapier / Make "catch hook" URL), forwards the row there so it can be
// mirrored into Notion or Airtable with no custom code. Never throws -- lead
// capture must not break a form submission. (for=code)
import { getSupabaseServer } from '@/lib/supabaseServer';

const SOURCES = { threads: 'Threads', fb: 'FB', facebook: 'FB', instagram: 'Instagram', ig: 'Instagram', reddit: 'Reddit' };

export function sourceFromRequest(request) {
  try {
    const m = (request.headers.get('cookie') || '').match(/(?:^|;\s*)mti_src=([^;]+)/);
    const raw = m ? decodeURIComponent(m[1]).toLowerCase().trim() : '';
    return raw ? (SOURCES[raw] || 'Other') : 'Web';
  } catch {
    return 'Web';
  }
}

const s = (v, n = 200) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, n) : null);
const addDays = (d) => new Date(Date.now() + d * 86400000).toISOString().slice(0, 10);

export async function captureLead({ email, name, source = 'Web', sourceDetail, nationality, targetMonth, tier, notes }) {
  try {
    const mail = s(email, 254)?.toLowerCase();
    if (!mail) return;
    const supabase = getSupabaseServer();
    const { data: existing } = await supabase.from('lead').select('id, source').eq('email', mail).maybeSingle();
    const patch = {
      updated_date: new Date().toISOString(),
      ...(s(name, 100) && { name: s(name, 100) }),
      ...(s(nationality, 80) && { nationality: s(nationality, 80) }),
      ...(s(targetMonth, 80) && { target_month: s(targetMonth, 80) }),
      ...(s(tier, 40) && tier !== 'not_sure' && { tier_interested: s(tier, 40) }),
      ...(s(notes, 1000) && { notes: s(notes, 1000) }),
    };
    let row;
    if (existing) {
      // Keep the original source (first touch) and status; just enrich.
      ({ data: row } = await supabase.from('lead').update(patch).eq('id', existing.id).select().single());
    } else {
      ({ data: row } = await supabase.from('lead').insert({
        email: mail, source, source_detail: s(sourceDetail, 60), next_action_date: addDays(1), ...patch,
      }).select().single());
    }
    const hook = process.env.LEAD_WEBHOOK_URL;
    if (hook && row) {
      fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: existing ? 'lead_updated' : 'lead_created', ...row }) }).catch(() => {});
    }
  } catch (err) {
    console.error('captureLead failed:', err);
  }
}
