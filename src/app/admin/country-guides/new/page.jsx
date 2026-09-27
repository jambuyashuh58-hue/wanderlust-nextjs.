import CountryGuideForm from '../CountryGuideForm';
import { createCountryGuide } from '../actions';

export default function NewCountryGuidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">New Country Guide</h1>
      <CountryGuideForm action={createCountryGuide} />
    </div>
  );
}
