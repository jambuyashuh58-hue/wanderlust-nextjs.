'use client';

import { useRef, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Field, TextInput, TextArea, SelectInput, SaveButton } from '@/components/admin/fields';
import DeleteButton from '@/components/admin/DeleteButton';
import { POST_TYPES, POST_STATUSES } from './actions';

export default function InstagramPostForm({ post, action, deleteAction }) {
  const p = post || {};
  const topicRef = useRef(null);
  const pillarRef = useRef(null);
  const postTypeRef = useRef(null);
  const captionRef = useRef(null);
  const hashtagsRef = useRef(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');

  const handleGenerate = async () => {
    const topic = topicRef.current?.value?.trim();
    if (!topic) {
      setGenError('Add a topic first so the AI knows what to write about.');
      return;
    }
    setGenerating(true);
    setGenError('');
    try {
      const res = await fetch('/api/admin/generate-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          content_pillar: pillarRef.current?.value || '',
          post_type: postTypeRef.current?.value || 'single',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      if (captionRef.current) captionRef.current.value = data.caption || '';
      if (hashtagsRef.current) hashtagsRef.current.value = data.hashtags || '';
    } catch (err) {
      setGenError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <form action={action} className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Post type">
            <select ref={postTypeRef} name="post_type" defaultValue={p.post_type || POST_TYPES[0]} className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary">
              {POST_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Status"><SelectInput name="status" defaultValue={p.status || POST_STATUSES[0]} options={POST_STATUSES} /></Field>
          <Field label="Scheduled date"><TextInput name="scheduled_date" defaultValue={p.scheduled_date} type="date" /></Field>
          <Field label="Instagram handle"><TextInput name="instagram_handle" defaultValue={p.instagram_handle} placeholder="@movetoistanbul" /></Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Topic *" help="What this post is about — feeds AI generation">
            <input ref={topicRef} type="text" name="topic" defaultValue={p.topic || ''} required className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary" />
          </Field>
          <Field label="Content pillar" help="e.g. neighborhoods, visas, food, cost of living">
            <input ref={pillarRef} type="text" name="content_pillar" defaultValue={p.content_pillar || ''} className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary" />
          </Field>
        </div>

        <div className="rounded-xl border border-dashed border-border p-3">
          <button
            type="button" onClick={handleGenerate} disabled={generating}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:scale-[1.02] transition-transform disabled:opacity-60"
          >
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate caption with AI
          </button>
          <p className="text-xs text-muted-foreground mt-1.5">Uses the active Character&apos;s voice for consistency. Fills the caption and hashtags below — review before saving.</p>
          {genError && <p className="text-xs text-destructive mt-1">{genError}</p>}
        </div>

        <Field label="Caption">
          <textarea
            ref={captionRef} name="caption" defaultValue={p.caption || ''} rows={6}
            className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </Field>

        <Field label="Hashtags">
          <textarea
            ref={hashtagsRef} name="hashtags" defaultValue={p.hashtags || ''} rows={2}
            className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </Field>

        <Field label="Media URLs" help="One per line — image or video URLs">
          <TextArea name="media_urls" defaultValue={(p.media_urls || []).join('\n')} rows={3} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Carousel slide count"><TextInput name="carousel_slide_count" defaultValue={p.carousel_slide_count} type="number" /></Field>
          <Field label="Source link"><TextInput name="source_link" defaultValue={p.source_link} type="url" placeholder="link to the guide/activity this promotes" /></Field>
        </div>

        <SaveButton />
      </form>
      {deleteAction && <div className="mt-4"><DeleteButton action={deleteAction} confirmText="Delete this Instagram post? This cannot be undone." /></div>}
    </div>
  );
}
