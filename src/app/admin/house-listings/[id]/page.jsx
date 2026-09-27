import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import HouseListingForm from '../HouseListingForm';
import { updateHouseListing, deleteHouseListing } from '../actions';

export const dynamic = 'force-dynamic';

export default async function EditHouseListingPage({ params }) {
  const supabase = getSupabaseServer();
  const { data: listing } = await supabase.from('house_listing').select('*').eq('id', params.id).maybeSingle();
  if (!listing) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Edit House Listing</h1>
      <HouseListingForm listing={listing} action={updateHouseListing.bind(null, params.id)} deleteAction={deleteHouseListing.bind(null, params.id)} />
    </div>
  );
}
