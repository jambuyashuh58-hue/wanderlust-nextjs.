import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import Drawer from '@/components/admin/Drawer';
import ActivityForm from '../../ActivityForm';
import { updateActivity, deleteActivity } from '../../actions';
import { buildReturnTo } from '@/lib/adminNav';

export const dynamic = 'force-dynamic';

export default async function EditActivityModal({ params, searchParams }) {
  const supabase = getSupabaseServer();
  const { data: activity } = await supabase.from('activity').select('*').eq('id', params.id).maybeSingle();
  if (!activity) notFound();
  const returnTo = buildReturnTo('/admin/activities', searchParams);

  return (
    <Drawer title={`Edit: ${activity.title}`}>
      <ActivityForm activity={activity} action={updateActivity.bind(null, params.id)} deleteAction={deleteActivity.bind(null, params.id)} returnTo={returnTo} />
    </Drawer>
  );
}
