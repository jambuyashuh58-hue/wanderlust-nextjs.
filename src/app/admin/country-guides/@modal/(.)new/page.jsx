import Drawer from '@/components/admin/Drawer';
import CountryGuideForm from '../../CountryGuideForm';
import { createCountryGuide } from '../../actions';
import { buildReturnTo } from '@/lib/adminNav';

export default function NewCountryGuideModal({ searchParams }) {
  const returnTo = buildReturnTo('/admin/country-guides', searchParams);
  return (
    <Drawer title="New Country Guide" maxWidth="max-w-3xl">
      <CountryGuideForm action={createCountryGuide} returnTo={returnTo} />
    </Drawer>
  );
}
