import { getSupabaseServer } from '@/lib/supabaseServer';
import ListTable from '@/components/admin/ListTable';

export const dynamic = 'force-dynamic';

export default async function AdminCountryGuidesPage() {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from('country_guide').select('id, country, title, published').order('sort_order', { ascending: true, nullsFirst: false });

  return (
    <div>
      {error && <p className="text-destructive text-sm mb-4">{error.message}</p>}
      <ListTable
        title="Country Guides"
        newHref="/admin/country-guides/new"
        rowHref={(row) => `/admin/country-guides/${row.id}`}
        columns={[
          { key: 'country', label: 'Nationality' },
          { key: 'title', label: 'Title' },
          { key: 'published', label: 'Published', render: (r) => r.published ? 'Yes' : 'Draft' },
        ]}
        rows={data || []}
      />
    </div>
  );
}
