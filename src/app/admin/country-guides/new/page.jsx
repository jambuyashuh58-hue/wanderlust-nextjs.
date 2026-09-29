import CountryGuideForm from '../CountryGuideForm';
import { createCountryGuide } from '../actions';
import { buildReturnTo } from '@/lib/adminNav';

export default function NewCountryGuidePage({ searchParams }) {
  const returnTo = buildReturnTo('/admin/country-guides', searchParams);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">New Country Guide</h1>
      <CountryGuideForm action={createCountryGuide} returnTo={returnTo} />
    </div>
  );
}
