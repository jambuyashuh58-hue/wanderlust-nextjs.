import Drawer from '@/components/admin/Drawer';
import ActivityForm from '../../ActivityForm';
import { createActivity } from '../../actions';

export default function NewActivityModal() {
  return (
    <Drawer title="New Activity">
      <ActivityForm action={createActivity} />
    </Drawer>
  );
}
