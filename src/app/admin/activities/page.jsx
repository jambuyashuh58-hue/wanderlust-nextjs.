import { getSupabaseServer } from '@/lib/supabaseServer';
import ListTable from '@/components/admin/ListTable';
import SearchBox from '@/components/admin/SearchBox';

export const dynamic = 'force-dynamic';

export default async function AdminActivitiesPage({ searchParams }) {
  const q = searchParams?.q?.trim() || '';
  const supabase = getSupabaseServer();
  let query = supabase.from('activity').select('id, title, category, city_name, price, rating, trending').order('title').limit(100);
  if (q) query = query.ilike('title', `%${q}%`);
  const { data, error } = await query;

  return (
    <div>
      <SearchBox placeholder="Search activities by title..." />
      {error && <p className="text-destructive text-sm mb-4">{error.message}</p>}
      <ListTable
        title="Activities"
        newHref="/admin/activities/new"
        rowHref={(row) => `/admin/activities/${row.id}`}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'city_name', label: 'City' },
          { key: 'price', label: 'Price', render: (r) => r.price != null ? `₺${r.price}` : '—' },
          { key: 'rating', label: 'Rating' },
          { key: 'trending', label: 'Trending', render: (r) => r.trending ? 'Yes' : '' },
        ]}
        rows={data || []}
      />
      <p className="text-xs text-muted-foreground mt-3">Showing up to 100 results{q ? ` matching "${q}"` : ''}. Narrow with search for more specific results.</p>
    </div>
  );
}
