import { getHouseListings } from '@/lib/supabaseServer';
import RelocationDashboard from '@/components/RelocationDashboard';

export const revalidate = 3600;

export const metadata = {
  title: 'Relocation Plan Dashboard | Move to Istanbul',
  description: 'Plan your move to Türkiye: flight, visa, house hunting, and monthly living costs, with real Istanbul apartment listings to pick from.',
};

export default async function DashboardPage() {
  const listings = await getHouseListings({ city: 'Istanbul' });
  return <RelocationDashboard listings={listings} />;
}
