import { getSupabaseServer } from '@/lib/supabaseServer';
import ListTable from '@/components/admin/ListTable';

export const dynamic = 'force-dynamic';

export default async function AdminHouseListingsPage() {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from('house_listing').select('id, title, city_name, monthly_rent, published').order('title');

  return (
    <div>
      {error && <p className="text-destructive text-sm mb-4">{error.message}</p>}
      <ListTable
        title="House Listings"
        newHref="/admin/house-listings/new"
        rowHref={(row) => `/admin/house-listings/${row.id}`}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'city_name', label: 'City' },
          { key: 'monthly_rent', label: 'Rent', render: (r) => `₺${Number(r.monthly_rent).toLocaleString()}/mo` },
          { key: 'published', label: 'Published', render: (r) => r.published ? 'Yes' : 'Draft' },
        ]}
        rows={data || []}
      />
    </div>
  );
}
