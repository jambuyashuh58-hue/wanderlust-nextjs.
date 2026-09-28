import { getSupabaseServer } from '@/lib/supabaseServer';
import ListTable from '@/components/admin/ListTable';
import SearchBox from '@/components/admin/SearchBox';

export const dynamic = 'force-dynamic';

export default async function AdminCountryGuidesPage({ searchParams }) {
  const q = searchParams?.q?.trim() || '';
  const supabase = getSupabaseServer();
  let query = supabase
    .from('country_guide')
    .select('id, country, title, slug, meta_description, published, sort_order')
    .order('sort_order', { ascending: true, nullsFirst: false });
  if (q) query = query.ilike('title', `%${q}%`);
  const { data, error } = await query;

  return (
    <div>
      <SearchBox placeholder="Search country guides by title..." />
      {error && <p className="text-destructive text-sm mb-4">{error.message}</p>}
      <ListTable
        title="Country Guides"
        newHref="/admin/country-guides/new"
        rowHref={(row) => `/admin/country-guides/${row.id}`}
        columns={[
          { key: 'country', label: 'Nationality' },
          { key: 'title', label: 'Title' },
          { key: 'slug', label: 'Slug' },
          { key: 'meta_description', label: 'Meta Description', render: (r) => r.meta_description ? `${r.meta_description.slice(0, 60)}${r.meta_description.length > 60 ? '…' : ''}` : '—' },
          { key: 'sort_order', label: 'Sort' },
          { key: 'published', label: 'Published', render: (r) => r.published ? 'Yes' : 'Draft' },
        ]}
        rows={data || []}
      />
    </div>
  );
}
