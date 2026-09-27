import { Field, TextInput, NumberInput, TextArea, CheckboxInput, SaveButton } from '@/components/admin/fields';
import ImageUploadField from '@/components/admin/ImageUploadField';
import DeleteButton from '@/components/admin/DeleteButton';

export default function CountryGuideForm({ guide, action, deleteAction }) {
  const g = guide || {};
  return (
    <div className="max-w-3xl">
      <form action={action} className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nationality / Country *" help="e.g. United States"><TextInput name="country" defaultValue={g.country} required /></Field>
          <Field label="Slug *" help="e.g. united-states"><TextInput name="slug" defaultValue={g.slug} required /></Field>
        </div>
        <Field label="Title *"><TextInput name="title" defaultValue={g.title} required /></Field>
        <Field label="Meta description"><TextInput name="meta_description" defaultValue={g.meta_description} /></Field>
        <ImageUploadField name="hero_image_url" label="Hero image" defaultValue={g.hero_image_url} />
        <Field label="Intro"><TextArea name="intro" defaultValue={g.intro} rows={4} /></Field>
        <Field label="Visa section"><TextArea name="visa_section" defaultValue={g.visa_section} rows={6} /></Field>
        <Field label="Housing section"><TextArea name="housing_section" defaultValue={g.housing_section} rows={6} /></Field>
        <Field label="Cost of living section"><TextArea name="cost_section" defaultValue={g.cost_section} rows={6} /></Field>
        <Field label="Concierge CTA" help="Why this nationality should use the concierge service"><TextArea name="concierge_cta" defaultValue={g.concierge_cta} rows={3} /></Field>
        <Field label="Sort order"><NumberInput name="sort_order" defaultValue={g.sort_order} /></Field>
        <CheckboxInput name="published" defaultChecked={g.published} label="Published" />
        <SaveButton />
      </form>
      {deleteAction && <div className="mt-4"><DeleteButton action={deleteAction} confirmText={`Delete "${g.title}"? This cannot be undone.`} /></div>}
    </div>
  );
}
