import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import CountryGuideForm from '../CountryGuideForm';
import { updateCountryGuide, deleteCountryGuide } from '../actions';
import { buildReturnTo } from '@/lib/adminNav';

export const dynamic = 'force-dynamic';

export default async function EditCountryGuidePage({ params, searchParams }) {
  const supabase = getSupabaseServer();
  const { data: guide } = await supabase.from('country_guide').select('*').eq('id', params.id).maybeSingle();
  if (!guide) notFound();
  const returnTo = buildReturnTo('/admin/country-guides', searchParams);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Edit Country Guide</h1>
      <CountryGuideForm guide={guide} action={updateCountryGuide.bind(null, params.id)} deleteAction={deleteCountryGuide.bind(null, params.id, guide.slug)} returnTo={returnTo} />
    </div>
  );
}
