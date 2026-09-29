import { getSupabaseServer } from '@/lib/supabaseServer';
import CollectionForm from '../CollectionForm';
import { createCollection } from '../actions';
import { buildReturnTo } from '@/lib/adminNav';

export const dynamic = 'force-dynamic';

export default async function NewCollectionPage({ searchParams }) {
  const supabase = getSupabaseServer();
  const { data: allActivities } = await supabase.from('activity').select('id, title, city_name').order('title').limit(1000);
  const returnTo = buildReturnTo('/admin/collections', searchParams);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">New Collection / Guide</h1>
      <CollectionForm allActivities={allActivities || []} action={createCollection} returnTo={returnTo} />
    </div>
  );
}
