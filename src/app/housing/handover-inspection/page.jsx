import Link from 'next/link';
import { ArrowRight, Camera } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

const STEPS = [
  'Photograph and video every room, including close-ups of existing wear, scuffs, or damage, dated and timestamped',
  'Test every appliance that comes with the unit (water heater, stove, any included white goods) in front of the landlord or agent',
  'Record all utility meter readings (electric, water, gas) on handover day',
  'Confirm which keys you\'re receiving (building entrance, mailbox, apartment, any storage) and get a written list',
  'Note the inventory of any furnished items if the unit is furnished, with condition',
  'Get all of the above acknowledged in writing — a simple signed handover note from the landlord is enough',
];

export const metadata = {
  title: 'Apartment Handover Inspection Checklist | Move to Istanbul',
  description: 'Documenting a Turkish rental\'s condition before you get the keys, so your deposit isn\'t at risk at move-out.',
  alternates: { canonical: '/housing/handover-inspection' },
};

export default function HandoverInspectionPage() {
  return (
    <GuideLayout
      eyebrow="Housing"
      title="Handover Inspection"
      description="Documenting the apartment's condition before you get the keys."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/housing"
      backLabel="Housing"
      sections={[{ id: 'steps', label: 'What to document' }]}
    >
      <section id="steps">
        <p className="text-foreground/80 leading-relaxed mb-6">
          This is the single most effective thing you can do to protect your deposit. Do it the moment you get keys, before you move anything in.
        </p>
        <div className="space-y-3">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <Camera className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/80">{s}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want someone there with you for this?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Full Move File includes bilingual local specialist accompaniment for moments exactly like this.</p>
        <Link href="/services/full-move-file" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Full Move File <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
