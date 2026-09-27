import { getSupabaseServer } from '@/lib/supabaseServer';
import ListTable from '@/components/admin/ListTable';
import SearchBox from '@/components/admin/SearchBox';

export const dynamic = 'force-dynamic';

export default async function AdminCollectionsPage({ searchParams }) {
  const q = searchParams?.q?.trim() || '';
  const supabase = getSupabaseServer();
  let query = supabase.from('collection').select('id, title, slug, display_style, city_name, published, sort_order').order('sort_order', { ascending: true, nullsFirst: false }).limit(200);
  if (q) query = query.ilike('title', `%${q}%`);
  const { data, error } = await query;

  return (
    <div>
      <SearchBox placeholder="Search collections & guides by title..." />
      {error && <p className="text-destructive text-sm mb-4">{error.message}</p>}
      <ListTable
        title="Collections & Guides"
        newHref="/admin/collections/new"
        rowHref={(row) => `/admin/collections/${row.id}`}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'display_style', label: 'Type' },
          { key: 'city_name', label: 'City' },
          { key: 'published', label: 'Published', render: (r) => r.published ? 'Yes' : 'Draft' },
        ]}
        rows={data || []}
      />
    </div>
  );
}
