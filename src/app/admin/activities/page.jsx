import { getSupabaseServer } from '@/lib/supabaseServer';
import ListTable from '@/components/admin/ListTable';
import SearchBox from '@/components/admin/SearchBox';
import ActivityFilters from '@/components/admin/ActivityFilters';
import { buildReturnTo } from '@/lib/adminNav';

export const dynamic = 'force-dynamic';

// Gap filters: "missing" means the column is null/empty; "has" means it's filled in.
const GAP_COLUMNS = {
  image: 'image_url',
  price: 'price',
  gallery: 'gallery',
  booking_url: 'booking_url',
};

// Boolean filters: plain true/false columns, "yes"/"no" in the URL.
const BOOL_COLUMNS = ['free', 'trending', 'indoor', 'family_friendly'];

export default async function AdminActivitiesPage({ searchParams }) {
  const q = searchParams?.q?.trim() || '';
  const category = searchParams?.category || '';
  const city = searchParams?.city || '';
  const gapFilters = Object.fromEntries(
    Object.keys(GAP_COLUMNS).map((k) => [k, searchParams?.[k] || ''])
  );
  const boolFilters = Object.fromEntries(
    BOOL_COLUMNS.map((k) => [k, searchParams?.[k] || ''])
  );

  const supabase = getSupabaseServer();

  // Distinct category/city options for the filter dropdowns -- fetched from
  // the live table rather than hardcoded, so a new category/city shows up
  // automatically once an activity uses it.
  const [{ data: categoryRows }, { data: cityRows }] = await Promise.all([
    supabase.from('activity').select('category').not('category', 'is', null),
    supabase.from('activity').select('city_name').not('city_name', 'is', null),
  ]);
  const categories = [...new Set((categoryRows || []).map((r) => r.category))].sort();
  const cities = [...new Set((cityRows || []).map((r) => r.city_name))].sort();

  let query = supabase
    .from('activity')
    .select('id, title, description, category, city_name, country, price, image_url, gallery, booking_url, rating, review_count, duration, indoor, family_friendly, free, trending')
    .order('title')
    .limit(500);

  if (q) query = query.ilike('title', `%${q}%`);
  if (category) query = query.eq('category', category);
  if (city) query = query.eq('city_name', city);

  for (const [key, column] of Object.entries(GAP_COLUMNS)) {
    const value = gapFilters[key];
    if (!value) continue;
    if (column === 'gallery') {
      // array column: "missing" = null or empty array
      if (value === 'missing') query = query.or('gallery.is.null,gallery.eq.{}');
      if (value === 'has') query = query.not('gallery', 'is', null).not('gallery', 'eq', '{}');
    } else if (key === 'price') {
      // Null price on an activity marked free is correct, not a gap.
      if (value === 'missing') query = query.is('price', null).or('free.is.null,free.eq.false');
      if (value === 'has') query = query.not('price', 'is', null);
    } else {
      if (value === 'missing') query = query.or(`${column}.is.null,${column}.eq.`);
      if (value === 'has') query = query.not(column, 'is', null).neq(column, '');
    }
  }

  for (const key of BOOL_COLUMNS) {
    const value = boolFilters[key];
    if (value === 'yes') query = query.eq(key, true);
    if (value === 'no') query = query.or(`${key}.is.null,${key}.eq.false`);
  }

  const { data, error } = await query;

  const yn = (v) => (v ? '✓' : '');
  const activeFilterCount = [category, city, ...Object.values(gapFilters), ...Object.values(boolFilters)].filter(Boolean).length;

  // Carry the current search/filters through to the edit and "new" links, so
  // saving or deleting from there can redirect back to this same view
  // instead of resetting to the bare list.
  const listUrl = buildReturnTo('/admin/activities', searchParams);
  const qsSuffix = listUrl.includes('?') ? listUrl.slice(listUrl.indexOf('?')) : '';

  return (
    <div>
      <SearchBox placeholder="Search activities by title..." />
      <ActivityFilters categories={categories} cities={cities} />
      {error && <p className="text-destructive text-sm mb-4">{error.message}</p>}
      <ListTable
        title="Activities"
        newHref={`/admin/activities/new${qsSuffix}`}
        rowHref={(row) => `/admin/activities/${row.id}${qsSuffix}`}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'description', label: 'Description', render: (r) => r.description ? `${r.description.slice(0, 60)}${r.description.length > 60 ? '…' : ''}` : '—' },
          { key: 'category', label: 'Category' },
          { key: 'city_name', label: 'City' },
          { key: 'country', label: 'Country' },
          { key: 'price', label: 'Price', render: (r) => r.price != null ? `₺${r.price}` : '—' },
          { key: 'image_url', label: 'Image', render: (r) => r.image_url ? '✓' : '—' },
          { key: 'gallery', label: 'Gallery', render: (r) => r.gallery && r.gallery.length > 0 ? `✓ (${r.gallery.length})` : '—' },
          { key: 'booking_url', label: 'Booking URL', render: (r) => r.booking_url ? '✓' : '—' },
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
      <p className="text-xs text-muted-foreground mt-3">Showing {data?.length ?? 0} of up to 500 results{q ? ` matching "${q}"` : ''}{activeFilterCount ? ' (filtered)' : ''}.</p>
    </div>
  );
}
