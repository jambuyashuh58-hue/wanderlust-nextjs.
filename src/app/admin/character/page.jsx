import { getSupabaseServer } from '@/lib/supabaseServer';
import ListTable from '@/components/admin/ListTable';

export const dynamic = 'force-dynamic';

export default async function AdminCharacterPage() {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from('brand_avatar').select('id, name, active').order('name');

  return (
    <div>
      {error && <p className="text-destructive text-sm mb-4">{error.message}</p>}
      <ListTable
        title="Character"
        newHref="/admin/character/new"
        rowHref={(row) => `/admin/character/${row.id}`}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'active', label: 'Active', render: (r) => r.active ? 'Yes' : '' },
        ]}
        rows={data || []}
      />
    </div>
  );
}
