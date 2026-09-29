import { getSupabaseServer } from '@/lib/supabaseServer';
import ListTable from '@/components/admin/ListTable';

export const dynamic = 'force-dynamic';

const TIER_LABELS = { paperwork: 'Visa & Paperwork', apartment: 'Apartment Shortlisting', full: 'Full Relocation', not_sure: 'Not sure' };

export default async function AdminConciergePage() {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('concierge_inquiry')
    .select('id, name, email, tier_interested, status, submitted_at')
    .order('submitted_at', { ascending: false });

  return (
    <div>
      {error && <p className="text-destructive text-sm mb-4">{error.message}</p>}
      <ListTable
        title="Concierge Inquiries"
        rowHref={(row) => `/admin/concierge/${row.id}`}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'tier_interested', label: 'Tier', render: (r) => TIER_LABELS[r.tier_interested] || r.tier_interested || '—' },
          {
            key: 'status',
            label: 'Status',
            render: (r) => (
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                r.status === 'new' ? 'bg-primary/10 text-primary'
                : r.status === 'contacted' ? 'bg-amber-500/10 text-amber-600'
                : r.status === 'converted' ? 'bg-success/10 text-success'
                : 'bg-muted text-muted-foreground'
              }`}>{r.status}</span>
            ),
          },
          { key: 'submitted_at', label: 'Submitted', render: (r) => new Date(r.submitted_at).toLocaleString() },
        ]}
        rows={data || []}
      />
    </div>
  );
}
