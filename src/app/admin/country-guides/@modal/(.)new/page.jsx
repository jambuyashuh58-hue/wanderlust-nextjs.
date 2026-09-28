import Drawer from '@/components/admin/Drawer';
import CountryGuideForm from '../../CountryGuideForm';
import { createCountryGuide } from '../../actions';

export default function NewCountryGuideModal() {
  return (
    <Drawer title="New Country Guide" maxWidth="max-w-3xl">
      <CountryGuideForm action={createCountryGuide} />
    </Drawer>
  );
}
