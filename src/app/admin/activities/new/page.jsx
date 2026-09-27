import ActivityForm from '../ActivityForm';
import { createActivity } from '../actions';

export default function NewActivityPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">New Activity</h1>
      <ActivityForm action={createActivity} />
    </div>
  );
}
