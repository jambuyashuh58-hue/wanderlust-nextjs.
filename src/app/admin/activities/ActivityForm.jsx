import { Field, TextInput, NumberInput, TextArea, SelectInput, CheckboxInput, SaveButton } from '@/components/admin/fields';
import ImageUploadField from '@/components/admin/ImageUploadField';
import DeleteButton from '@/components/admin/DeleteButton';
import { ACTIVITY_CATEGORIES } from './constants';

export default function ActivityForm({ activity, action, deleteAction, returnTo }) {
  const a = activity || {};
  return (
    <div className="max-w-3xl">
      <form action={action} className="space-y-5 rounded-2xl border border-border bg-card p-6">
        {returnTo && <input type="hidden" name="_return_to" value={returnTo} />}
        <Field label="Title *"><TextInput name="title" defaultValue={a.title} required /></Field>
        <Field label="Description"><TextArea name="description" defaultValue={a.description} rows={4} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Category *"><SelectInput name="category" defaultValue={a.category} options={ACTIVITY_CATEGORIES} /></Field>
          <Field label="City"><TextInput name="city_name" defaultValue={a.city_name} /></Field>
          <Field label="Country"><TextInput name="country" defaultValue={a.country} /></Field>
          <Field label="Price (TRY)"><NumberInput name="price" defaultValue={a.price} /></Field>
          <Field label="Rating"><NumberInput name="rating" defaultValue={a.rating} step="0.1" /></Field>
          <Field label="Review count"><NumberInput name="review_count" defaultValue={a.review_count} /></Field>
          <Field label="Popularity score"><NumberInput name="popularity_score" defaultValue={a.popularity_score} /></Field>
          <Field label="Duration"><TextInput name="duration" defaultValue={a.duration} placeholder="e.g. 2 hours" /></Field>
          <Field label="How long"><TextInput name="how_long" defaultValue={a.how_long} /></Field>
          <Field label="Best time to visit"><TextInput name="best_time_to_visit" defaultValue={a.best_time_to_visit} /></Field>
          <Field label="Opening hours"><TextInput name="opening_hours" defaultValue={a.opening_hours} /></Field>
          <Field label="Accessibility"><TextInput name="accessibility" defaultValue={a.accessibility} /></Field>
        </div>
        <Field label="Address"><TextInput name="address" defaultValue={a.address} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Latitude"><NumberInput name="latitude" defaultValue={a.latitude} /></Field>
          <Field label="Longitude"><NumberInput name="longitude" defaultValue={a.longitude} /></Field>
        </div>

        <ImageUploadField name="image_url" label="Main image" defaultValue={a.image_url} />
        <Field label="Gallery image URLs (comma-separated)" help="Additional photos shown on the activity page.">
          <TextArea name="gallery" defaultValue={(a.gallery || []).join(', ')} rows={2} />
        </Field>
        <Field label="Facilities (comma-separated)"><TextInput name="facilities" defaultValue={(a.facilities || []).join(', ')} /></Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Booking URL"><TextInput name="booking_url" defaultValue={a.booking_url} type="url" /></Field>
          <Field label="Website"><TextInput name="website" defaultValue={a.website} type="url" /></Field>
          <Field label="Phone"><TextInput name="phone" defaultValue={a.phone} /></Field>
          <Field label="Email"><TextInput name="email" defaultValue={a.email} type="email" /></Field>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <CheckboxInput name="indoor" defaultChecked={a.indoor} label="Indoor" />
          <CheckboxInput name="family_friendly" defaultChecked={a.family_friendly} label="Family friendly" />
          <CheckboxInput name="free" defaultChecked={a.free} label="Free" />
          <CheckboxInput name="trending" defaultChecked={a.trending} label="Trending" />
        </div>

        <SaveButton />
      </form>
      {deleteAction && <div className="mt-4"><DeleteButton action={deleteAction} confirmText={`Delete "${a.title}"? This cannot be undone.`} returnTo={returnTo} /></div>}
    </div>
  );
}
