import { getSupabaseServer } from '@/lib/supabaseServer';
import Drawer from '@/components/admin/Drawer';
import CollectionForm from '../../CollectionForm';
import { createCollection } from '../../actions';
import { buildReturnTo } from '@/lib/adminNav';

export const dynamic = 'force-dynamic';

export default async function NewCollectionModal({ searchParams }) {
  const supabase = getSupabaseServer();
  const { data: allActivities } = await supabase.from('activity').select('id, title, city_name').order('title').limit(1000);
  const returnTo = buildReturnTo('/admin/collections', searchParams);

  return (
    <Drawer title="New Collection / Guide" maxWidth="max-w-3xl">
      <CollectionForm allActivities={allActivities || []} action={createCollection} returnTo={returnTo} />
    </Drawer>
  );
}
