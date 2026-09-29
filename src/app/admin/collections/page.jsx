import { getSupabaseServer } from '@/lib/supabaseServer';
import ListTable from '@/components/admin/ListTable';
import SearchBox from '@/components/admin/SearchBox';
import { buildReturnTo } from '@/lib/adminNav';

export const dynamic = 'force-dynamic';

export default async function AdminCollectionsPage({ searchParams }) {
  const q = searchParams?.q?.trim() || '';
  const supabase = getSupabaseServer();
  let query = supabase
    .from('collection')
    .select('id, title, slug, meta_description, display_style, city_name, activity_ids, published, sort_order')
    .order('sort_order', { ascending: true, nullsFirst: false })
    .limit(200);
  if (q) query = query.ilike('title', `%${q}%`);
  const { data, error } = await query;

  const listUrl = buildReturnTo('/admin/collections', searchParams);
  const qsSuffix = listUrl.includes('?') ? listUrl.slice(listUrl.indexOf('?')) : '';

  return (
    <div>
      <SearchBox placeholder="Search collections & guides by title..." />
      {error && <p className="text-destructive text-sm mb-4">{error.message}</p>}
      <ListTable
        title="Collections & Guides"
        newHref={`/admin/collections/new${qsSuffix}`}
        rowHref={(row) => `/admin/collections/${row.id}${qsSuffix}`}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'slug', label: 'Slug' },
          { key: 'meta_description', label: 'Meta Description', render: (r) => r.meta_description ? `${r.meta_description.slice(0, 60)}${r.meta_description.length > 60 ? '…' : ''}` : '—' },
          { key: 'display_style', label: 'Type' },
          { key: 'city_name', label: 'City' },
          { key: 'activity_ids', label: 'Activities', render: (r) => (r.activity_ids || []).length },
          { key: 'sort_order', label: 'Sort' },
          { key: 'published', label: 'Published', render: (r) => r.published ? 'Yes' : 'Draft' },
        ]}
        rows={data || []}
      />
    </div>
  );
}
