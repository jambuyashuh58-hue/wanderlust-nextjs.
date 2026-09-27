import HouseListingForm from '../HouseListingForm';
import { createHouseListing } from '../actions';

export default function NewHouseListingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">New House Listing</h1>
      <HouseListingForm action={createHouseListing} />
    </div>
  );
}
