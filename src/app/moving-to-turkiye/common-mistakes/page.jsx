import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

const MISTAKES = [
  {
    title: 'Signing a long lease before seeing the apartment in person',
    body: 'Photos and video calls undersell noise, light, and real commute times. Book short-term housing for your first few weeks instead.',
  },
  {
    title: 'Not checking whether a neighborhood is "open" for registration',
    body: 'Some neighborhoods hit their foreign-resident quota and stop accepting new residence-permit registrations at that address. Confirm this before signing, not after.',
  },
  {
    title: 'Choosing "home currency" at a Turkish ATM',
    body: 'That option triggers Dynamic Currency Conversion — a hidden 8-15% markup. Always decline conversion and pay in TRY.',
  },
  {
    title: 'Running a foreign SIM past 120 days without registering the phone',
    body: 'The IMEI registry locks the SIM slot after 120 cumulative days per calendar year unless you register (and pay a tax on) the device, or switch to an eSIM beforehand.',
  },
  {
    title: 'Underestimating one-time costs',
    body: 'Deposit, agency fee, insurance paid upfront, and furnishing top-ups can add $2,000-$6,000+ on top of your first month\'s ongoing budget. Plan for it, don\'t discover it.',
  },
  {
    title: 'Waiting too long to book the residence permit appointment',
    body: 'Appointment slots can book out weeks in advance. Once you have a notarized lease and UAVT code, book immediately rather than waiting for a "better time."',
  },
];

export const metadata = {
  title: 'Common Mistakes Moving to Türkiye | Move to Istanbul',
  description: 'The avoidable mistakes that cost newcomers to Türkiye the most time and money.',
  alternates: { canonical: '/moving-to-turkiye/common-mistakes/' },
};

export default function CommonMistakesPage() {
  return (
    <GuideLayout
      eyebrow="Moving to Türkiye"
      title="Common Mistakes"
      description="The avoidable ones that cost people the most time and money."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/moving-to-turkiye"
      backLabel="Moving to Türkiye"
      sections={[{ id: 'mistakes', label: 'Mistakes' }]}
    >
      <section id="mistakes">
        <div className="space-y-5">
          {MISTAKES.map((m, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 flex gap-4">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1.5">{m.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want someone else to catch these for you?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Full Move File handles visa, housing, and arrival end to end, so these are already accounted for.</p>
        <Link href="/services/full-move-file" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Full Move File <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
