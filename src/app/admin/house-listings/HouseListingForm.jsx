import { Field, TextInput, NumberInput, TextArea, CheckboxInput, SaveButton } from '@/components/admin/fields';
import ImageUploadField from '@/components/admin/ImageUploadField';
import DeleteButton from '@/components/admin/DeleteButton';

export default function HouseListingForm({ listing, action, deleteAction }) {
  const l = listing || {};
  return (
    <div className="max-w-2xl">
      <form action={action} className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <Field label="Title *"><TextInput name="title" defaultValue={l.title} required /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Neighborhood"><TextInput name="neighborhood" defaultValue={l.neighborhood} /></Field>
          <Field label="City"><TextInput name="city_name" defaultValue={l.city_name} /></Field>
          <Field label="Monthly rent (TRY) *"><NumberInput name="monthly_rent" defaultValue={l.monthly_rent} /></Field>
          <Field label="Deposit (TRY)"><NumberInput name="deposit" defaultValue={l.deposit} /></Field>
          <Field label="Bedrooms"><NumberInput name="bedrooms" defaultValue={l.bedrooms} /></Field>
        </div>
        <ImageUploadField name="image_url" label="Photo" defaultValue={l.image_url} />
        <Field label="External listing URL"><TextInput name="listing_url" defaultValue={l.listing_url} type="url" /></Field>
        <Field label="Notes" help="Honest one-line take on this listing"><TextArea name="notes" defaultValue={l.notes} rows={2} /></Field>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <CheckboxInput name="furnished" defaultChecked={l.furnished} label="Furnished" />
          <CheckboxInput name="published" defaultChecked={l.published} label="Published" />
        </div>
        <SaveButton />
      </form>
      {deleteAction && <div className="mt-4"><DeleteButton action={deleteAction} confirmText={`Delete "${l.title}"? This cannot be undone.`} /></div>}
    </div>
  );
}
