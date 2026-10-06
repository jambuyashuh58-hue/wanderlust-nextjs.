import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

// One row per email address, built by the crm_contact SQL view from
// newsletter_subscriber (subscribed / downloaded the guide), travel_preference
// (used the itinerary builder) and concierge_inquiry. Visitors who use the
// itinerary builder without leaving an email can't be tied to a person, so
// they're shown as an anonymous count instead. (for=code)
const STAGE_LABELS = {
  client: 'Client',
  concierge_inquiry: 'Concierge inquiry',
  guide_lead: 'Guide download',
  itinerary_user: 'Itinerary user',
  quiz_taker: 'Quiz taker',
  subscriber: 'Subscriber',
};

const Yes = ({ v }) => (v ? <span className="text-success font-semibold">Yes</span> : <span className="text-muted-foreground">—</span>);

export default async function AdminCrmPage() {
  const supabase = getSupabaseServer();
  const [{ data: contacts, error }, { count: totalItineraries }, { count: anonItineraries }, { data: affClicks }, { data: actClicks }, { data: colClicks }, { count: quizTotal }] = await Promise.all([
    supabase.from('crm_contact').select('*').order('last_seen', { ascending: false, nullsFirst: false }),
    supabase.from('shareable_itinerary').select('*', { count: 'exact', head: true }),
    supabase.from('travel_preference').select('*', { count: 'exact', head: true }).or('email.is.null,email.eq.'),
    supabase.from('affiliate_click').select('activity_title').limit(5000),
    supabase.from('activity_click').select('activity_title').limit(5000),
    supabase.from('collection_click').select('collection_title').limit(5000),
    supabase.from('quiz_response').select('*', { count: 'exact', head: true }),
  ]);
  const top = (arr, key) => Object.entries((arr || []).reduce((m, r) => { const k = r[key] || '—'; m[k] = (m[k] || 0) + 1; return m; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const rows = contacts || [];
  const stats = [
    { label: 'Contacts', value: rows.length },
    { label: 'Downloaded guide', value: rows.filter((r) => r.downloaded_guide).length },
    { label: 'Subscribed', value: rows.filter((r) => r.subscribed).length },
    { label: 'Used itinerary (with email)', value: rows.filter((r) => r.itineraries_built > 0).length },
    { label: 'Took quiz (with email)', value: rows.filter((r) => r.took_quiz).length },
    { label: 'Quiz completions (all)', value: quizTotal ?? 0 },
    { label: 'Concierge inquiries', value: rows.filter((r) => r.concierge_inquiries > 0).length },
    { label: 'Itineraries built (all)', value: totalItineraries ?? 0 },
    { label: 'Itinerary users with no email', value: anonItineraries ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">CRM</h1>
      <p className="text-sm text-muted-foreground mb-6">Everyone who has left an email on the site, one row per person, with what they did.</p>
      {error && <p className="text-destructive text-sm mb-4">{error.message}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {[['Booking clicks (affiliate)', affClicks, 'activity_title'], ['Activity page clicks', actClicks, 'activity_title'], ['Collection clicks', colClicks, 'collection_title']].map(([label, arr, key]) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</div>
            <div className="text-xl font-bold mb-2">{(arr || []).length}</div>
            {top(arr, key).map(([t, n]) => <div key={t} className="flex justify-between gap-3 text-xs py-0.5"><span className="truncate">{t}</span><span className="font-semibold">{n}</span></div>)}
            {(arr || []).length === 0 && <div className="text-xs text-muted-foreground">No clicks recorded yet.</div>}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground uppercase tracking-wide">
              {['Contact', 'Stage', 'Guide', 'Subscribed', 'Itineraries', 'Quiz', 'Concierge', 'Interested in', 'Last seen'].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={9} className="px-4 py-10 text-center text-muted-foreground">Nothing here yet.</td></tr>
            ) : rows.map((r) => (
              <tr key={r.email} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="font-medium">{r.name || '—'}</div>
                  <div className="text-xs text-muted-foreground">{r.email}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{STAGE_LABELS[r.stage] || r.stage}</td>
                <td className="px-4 py-3"><Yes v={r.downloaded_guide} /></td>
                <td className="px-4 py-3"><Yes v={r.subscribed} /></td>
                <td className="px-4 py-3">{r.itineraries_built || '—'}</td>
                <td className="px-4 py-3 whitespace-nowrap">{r.took_quiz ? [r.quiz_priority, r.quiz_visa && `visa: ${r.quiz_visa}`].filter(Boolean).join(', ') : '—'}</td>
                <td className="px-4 py-3 whitespace-nowrap">{r.concierge_inquiries ? `${r.tier_interested || 'yes'} (${r.inquiry_status})` : '—'}</td>
                <td className="px-4 py-3 whitespace-nowrap max-w-xs truncate">{r.destination || '—'}</td>
                <td className="px-4 py-3 whitespace-nowrap">{r.last_seen ? new Date(r.last_seen).toLocaleDateString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
