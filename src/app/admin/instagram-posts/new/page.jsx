import InstagramPostForm from '../InstagramPostForm';
import { createInstagramPost } from '../actions';

export default function NewInstagramPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">New Instagram Post</h1>
      <InstagramPostForm action={createInstagramPost} />
    </div>
  );
}
