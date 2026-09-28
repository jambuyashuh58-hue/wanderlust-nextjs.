import { getSupabaseServer } from '@/lib/supabaseServer';
import ListTable from '@/components/admin/ListTable';
import SearchBox from '@/components/admin/SearchBox';

export const dynamic = 'force-dynamic';

export default async function AdminActivitiesPage({ searchParams }) {
  const q = searchParams?.q?.trim() || '';
  const supabase = getSupabaseServer();
  let query = supabase
    .from('activity')
    .select('id, title, description, category, city_name, country, price, rating, review_count, duration, indoor, family_friendly, free, trending')
    .order('title')
    .limit(100);
  if (q) query = query.ilike('title', `%${q}%`);
  const { data, error } = await query;

  const yn = (v) => (v ? '✓' : '');

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
          { key: 'description', label: 'Description', render: (r) => r.description ? `${r.description.slice(0, 60)}${r.description.length > 60 ? '…' : ''}` : '—' },
          { key: 'category', label: 'Category' },
          { key: 'city_name', label: 'City' },
          { key: 'country', label: 'Country' },
          { key: 'price', label: 'Price', render: (r) => r.price != null ? `₺${r.price}` : '—' },
          { key: 'rating', label: 'Rating' },
          { key: 'review_count', label: 'Reviews' },
          { key: 'duration', label: 'Duration' },
          { key: 'indoor', label: 'Indoor', render: (r) => yn(r.indoor) },
          { key: 'family_friendly', label: 'Family', render: (r) => yn(r.family_friendly) },
          { key: 'free', label: 'Free', render: (r) => yn(r.free) },
          { key: 'trending', label: 'Trending', render: (r) => yn(r.trending) },
        ]}
        rows={data || []}
      />
      <p className="text-xs text-muted-foreground mt-3">Showing up to 100 results{q ? ` matching "${q}"` : ''}. Narrow with search for more specific results.</p>
    </div>
  );
}
