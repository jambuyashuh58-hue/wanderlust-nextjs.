import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import InstagramPostForm from '../InstagramPostForm';
import { updateInstagramPost, deleteInstagramPost } from '../actions';
import { buildReturnTo } from '@/lib/adminNav';

export const dynamic = 'force-dynamic';

export default async function EditInstagramPostPage({ params, searchParams }) {
  const supabase = getSupabaseServer();
  const { data: post } = await supabase.from('instagram_post').select('*').eq('id', params.id).maybeSingle();
  if (!post) notFound();
  const returnTo = buildReturnTo('/admin/instagram-posts', searchParams);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Edit Instagram Post</h1>
      <InstagramPostForm post={post} action={updateInstagramPost.bind(null, params.id)} deleteAction={deleteInstagramPost.bind(null, params.id)} returnTo={returnTo} />
    </div>
  );
}
