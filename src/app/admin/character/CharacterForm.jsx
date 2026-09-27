import { Field, TextInput, TextArea, CheckboxInput, SaveButton } from '@/components/admin/fields';
import ImageUploadField from '@/components/admin/ImageUploadField';
import DeleteButton from '@/components/admin/DeleteButton';

export default function CharacterForm({ character, action, deleteAction }) {
  const c = character || {};
  return (
    <div className="max-w-2xl">
      <form action={action} className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <Field label="Name *"><TextInput name="name" defaultValue={c.name} required /></Field>
        <ImageUploadField name="reference_image_url" label="Reference image *" defaultValue={c.reference_image_url} />
        <Field label="Personality" help="Tone, quirks, voice traits used to keep captions consistent">
          <TextArea name="personality" defaultValue={c.personality} rows={3} />
        </Field>
        <Field label="Backstory" help="Who they are, their relationship to Istanbul / the brand">
          <TextArea name="backstory" defaultValue={c.backstory} rows={3} />
        </Field>
        <Field label="Narrative style" help="How they write — sentence rhythm, vocabulary, POV, emoji use">
          <TextArea name="narrative_style" defaultValue={c.narrative_style} rows={3} />
        </Field>
        <CheckboxInput name="active" defaultChecked={c.active} label="Active (used for Instagram caption generation)" />
        <SaveButton />
      </form>
      {deleteAction && <div className="mt-4"><DeleteButton action={deleteAction} confirmText={`Delete "${c.name}"? This cannot be undone.`} /></div>}
    </div>
  );
}
