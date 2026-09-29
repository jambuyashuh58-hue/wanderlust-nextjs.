import InstagramPostForm from '../InstagramPostForm';
import { createInstagramPost } from '../actions';
import { buildReturnTo } from '@/lib/adminNav';

export default function NewInstagramPostPage({ searchParams }) {
  const returnTo = buildReturnTo('/admin/instagram-posts', searchParams);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">New Instagram Post</h1>
      <InstagramPostForm action={createInstagramPost} returnTo={returnTo} />
    </div>
  );
}
