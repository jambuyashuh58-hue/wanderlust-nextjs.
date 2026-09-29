import { getSupabaseServer } from '@/lib/supabaseServer';
import ListTable from '@/components/admin/ListTable';
import SearchBox from '@/components/admin/SearchBox';
import { buildReturnTo } from '@/lib/adminNav';

export const dynamic = 'force-dynamic';

export default async function AdminInstagramPostsPage({ searchParams }) {
  const q = searchParams?.q || '';
  const supabase = getSupabaseServer();
  let query = supabase
    .from('instagram_post')
    .select('id, topic, post_type, status, scheduled_date')
    .order('scheduled_date', { ascending: false, nullsFirst: false })
    .limit(100);
  if (q) query = query.ilike('topic', `%${q}%`);
  const { data, error } = await query;

  const listUrl = buildReturnTo('/admin/instagram-posts', searchParams);
  const qsSuffix = listUrl.includes('?') ? listUrl.slice(listUrl.indexOf('?')) : '';

  return (
    <div>
      <div className="mb-4"><SearchBox placeholder="Search by topic..." /></div>
      {error && <p className="text-destructive text-sm mb-4">{error.message}</p>}
      <ListTable
        title="Instagram Posts"
        newHref={`/admin/instagram-posts/new${qsSuffix}`}
        rowHref={(row) => `/admin/instagram-posts/${row.id}${qsSuffix}`}
        columns={[
          { key: 'topic', label: 'Topic' },
          { key: 'post_type', label: 'Type' },
          { key: 'status', label: 'Status' },
          { key: 'scheduled_date', label: 'Scheduled', render: (r) => r.scheduled_date || '—' },
        ]}
        rows={data || []}
      />
    </div>
  );
}
