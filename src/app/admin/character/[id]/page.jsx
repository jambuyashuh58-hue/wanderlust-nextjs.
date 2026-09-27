import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import CharacterForm from '../CharacterForm';
import { updateBrandAvatar, deleteBrandAvatar } from '../actions';

export const dynamic = 'force-dynamic';

export default async function EditCharacterPage({ params }) {
  const supabase = getSupabaseServer();
  const { data: character } = await supabase.from('brand_avatar').select('*').eq('id', params.id).maybeSingle();
  if (!character) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Edit Character</h1>
      <CharacterForm character={character} action={updateBrandAvatar.bind(null, params.id)} deleteAction={deleteBrandAvatar.bind(null, params.id)} />
    </div>
  );
}
