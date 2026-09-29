import ActivityForm from '../ActivityForm';
import { createActivity } from '../actions';
import { buildReturnTo } from '@/lib/adminNav';

export default function NewActivityPage({ searchParams }) {
  const returnTo = buildReturnTo('/admin/activities', searchParams);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">New Activity</h1>
      <ActivityForm action={createActivity} returnTo={returnTo} />
    </div>
  );
}
