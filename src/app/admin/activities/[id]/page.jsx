import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import ActivityForm from '../ActivityForm';
import { updateActivity, deleteActivity } from '../actions';

export const dynamic = 'force-dynamic';

export default async function EditActivityPage({ params }) {
  const supabase = getSupabaseServer();
  const { data: activity } = await supabase.from('activity').select('*').eq('id', params.id).maybeSingle();
  if (!activity) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Edit Activity</h1>
      <ActivityForm activity={activity} action={updateActivity.bind(null, params.id)} deleteAction={deleteActivity.bind(null, params.id)} />
    </div>
  );
}
