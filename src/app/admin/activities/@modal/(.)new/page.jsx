import Drawer from '@/components/admin/Drawer';
import ActivityForm from '../../ActivityForm';
import { createActivity } from '../../actions';
import { buildReturnTo } from '@/lib/adminNav';

export default function NewActivityModal({ searchParams }) {
  const returnTo = buildReturnTo('/admin/activities', searchParams);
  return (
    <Drawer title="New Activity">
      <ActivityForm action={createActivity} returnTo={returnTo} />
    </Drawer>
  );
}
