import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import Drawer from '@/components/admin/Drawer';
import CollectionForm from '../../CollectionForm';
import { updateCollection, deleteCollection } from '../../actions';
import { buildReturnTo } from '@/lib/adminNav';

export const dynamic = 'force-dynamic';

export default async function EditCollectionModal({ params, searchParams }) {
  const supabase = getSupabaseServer();
  const [{ data: collection }, { data: allActivities }] = await Promise.all([
    supabase.from('collection').select('*').eq('id', params.id).maybeSingle(),
    supabase.from('activity').select('id, title, city_name').order('title').limit(1000),
  ]);
  if (!collection) notFound();
  const returnTo = buildReturnTo('/admin/collections', searchParams);

  return (
    <Drawer title={`Edit: ${collection.title}`} maxWidth="max-w-3xl">
      <CollectionForm
        collection={collection}
        allActivities={allActivities || []}
        action={updateCollection.bind(null, params.id)}
        deleteAction={deleteCollection.bind(null, params.id, collection.slug)}
        returnTo={returnTo}
      />
    </Drawer>
  );
}
