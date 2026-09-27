import { Field, TextInput, NumberInput, TextArea, SelectInput, CheckboxInput, SaveButton } from '@/components/admin/fields';
import ImageUploadField from '@/components/admin/ImageUploadField';
import ActivityPicker from '@/components/admin/ActivityPicker';
import DeleteButton from '@/components/admin/DeleteButton';
import { DISPLAY_STYLES } from './actions';

export default function CollectionForm({ collection, allActivities, action, deleteAction }) {
  const c = collection || {};
  const roadmap = c.roadmap || {};
  return (
    <div className="max-w-3xl">
      <form action={action} className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Title *"><TextInput name="title" defaultValue={c.title} required /></Field>
          <Field label="Slug *" help="URL-safe, e.g. first-weekend-istanbul"><TextInput name="slug" defaultValue={c.slug} required /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Display style" help="editorial = card grid, ranking = numbered Best-Of list, guide = long-form article with no linked activities">
            <SelectInput name="display_style" defaultValue={c.display_style || 'editorial'} options={DISPLAY_STYLES} />
          </Field>
          <Field label="City" help="Leave empty for multi-city collections"><TextInput name="city_name" defaultValue={c.city_name} /></Field>
        </div>
        <Field label="Intro / guide body" help="150-200 words for a card-grid intro, or the full long-form text for a guide.">
          <TextArea name="intro" defaultValue={c.intro} rows={8} />
        </Field>
        <Field label="Meta description (max 160 chars)"><TextInput name="meta_description" defaultValue={c.meta_description} /></Field>
        <ImageUploadField name="hero_image_url" label="Hero image" defaultValue={c.hero_image_url} />
        <Field label="Body image URLs (comma-separated)" help="Supporting inline images for long-form guides.">
          <TextArea name="body_images" defaultValue={(c.body_images || []).join(', ')} rows={2} />
        </Field>

        <fieldset className="rounded-lg border border-border p-4">
          <legend className="text-sm font-semibold px-1">Roadmap (ranking-style city collections only)</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <Field label="Airport code"><TextInput name="roadmap_airport_code" defaultValue={roadmap.airport_code} placeholder="e.g. ADB" /></Field>
            <Field label="Transport from Istanbul"><TextInput name="roadmap_transport_from_istanbul" defaultValue={roadmap.transport_from_istanbul} /></Field>
            <Field label="Airport to city"><TextInput name="roadmap_airport_to_city" defaultValue={roadmap.airport_to_city} /></Field>
            <Field label="Recommended days"><TextInput name="roadmap_recommended_days" defaultValue={roadmap.recommended_days} placeholder="e.g. 2-3 days" /></Field>
          </div>
          <div className="mt-4"><Field label="Stay neighborhoods"><TextInput name="roadmap_stay_neighborhoods" defaultValue={Array.isArray(roadmap.stay_neighborhoods) ? roadmap.stay_neighborhoods.join(', ') : roadmap.stay_neighborhoods} /></Field></div>
        </fieldset>

        <fieldset className="rounded-lg border border-border p-4">
          <legend className="text-sm font-semibold px-1">Activities</legend>
          <ActivityPicker allActivities={allActivities} initialSelectedIds={c.activity_ids || []} initialTips={c.local_tips || {}} />
        </fieldset>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Sort order" help="Lower = shown first"><NumberInput name="sort_order" defaultValue={c.sort_order} /></Field>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <CheckboxInput name="published" defaultChecked={c.published} label="Published" />
          <CheckboxInput name="show_concierge_card" defaultChecked={c.show_concierge_card} label="Show concierge upsell card" />
        </div>

        <SaveButton />
      </form>
      {deleteAction && <div className="mt-4"><DeleteButton action={deleteAction} confirmText={`Delete "${c.title}"? This cannot be undone.`} /></div>}
    </div>
  );
}
