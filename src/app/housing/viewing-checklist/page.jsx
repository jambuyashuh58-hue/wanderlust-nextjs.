import Link from 'next/link';
import { ArrowRight, CheckSquare } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

const CHECKLIST = [
  'Water pressure and hot water — run both taps and the shower',
  'Heating type (doğalgaz combi boiler vs. central) and its approximate age',
  'Mobile signal strength inside the unit, not just at the building entrance',
  'Noise at the time of day you\'d actually be home — street noise varies hugely by hour',
  'Natural light direction and how much reaches the main living space',
  'Elevator (if any) and which floor you\'re actually on — "ground floor" numbering differs from some countries\' conventions',
  'Window/door seals, especially before winter — heating costs double in Dec-Mar',
  'Confirm the UAVT address code and ask to see the building\'s registration status directly',
];

export const metadata = {
  title: 'Apartment Viewing Checklist for Türkiye | Move to Istanbul',
  description: 'What to actually check in person on an apartment viewing in Türkiye, beyond what a nice photo set shows you.',
  alternates: { canonical: '/housing/viewing-checklist/' },
};

export default function ViewingChecklistPage() {
  return (
    <GuideLayout
      eyebrow="Housing"
      title="Viewing Checklist"
      description="What to actually check in person before you fall for a nice photo set."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/housing"
      backLabel="Housing"
      sections={[{ id: 'checklist', label: 'Checklist' }]}
    >
      <section id="checklist">
        <ul className="space-y-2.5">
          {CHECKLIST.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80"><CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>{item}</span></li>
          ))}
        </ul>
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Found a place? Next, read the contract carefully</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">A good viewing doesn't mean a good contract. Here's what to check before you sign.</p>
        <Link href="/housing/contract-review" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Read Contract Review <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
