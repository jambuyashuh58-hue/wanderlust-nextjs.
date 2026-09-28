import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import Drawer from '@/components/admin/Drawer';
import CountryGuideForm from '../../CountryGuideForm';
import { updateCountryGuide, deleteCountryGuide } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function EditCountryGuideModal({ params }) {
  const supabase = getSupabaseServer();
  const { data: guide } = await supabase.from('country_guide').select('*').eq('id', params.id).maybeSingle();
  if (!guide) notFound();

  return (
    <Drawer title={`Edit: ${guide.title}`} maxWidth="max-w-3xl">
      <CountryGuideForm guide={guide} action={updateCountryGuide.bind(null, params.id)} deleteAction={deleteCountryGuide.bind(null, params.id, guide.slug)} />
    </Drawer>
  );
}
