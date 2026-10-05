import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

const STEPS = [
  { title: 'Sign and notarize your lease', body: 'Confirm the neighborhood is open and the UAVT code is valid before signing — see the housing cluster for contract review and red flags.' },
  { title: 'Submit your residence permit application', body: 'Book the e-İkamet appointment the moment your lease is notarized — slots can book out weeks ahead.' },
  { title: 'Switch utilities into your name', body: 'Water, electric, and gas each have their own registration process — see our utilities & connectivity guide.' },
  { title: 'Start building a routine, not just logistics', body: 'Find a grocery rotation, a gym or running route, and your neighborhood\'s pazar day — our local routines guide covers this.' },
];

export const metadata = {
  title: 'Your First 30 Days in Türkiye | Move to Istanbul',
  description: 'Lease signed, residence permit application submitted, routines forming — your first month in Türkiye.',
  alternates: { canonical: '/after-you-land/first-30-days' },
};

export default function First30DaysPage() {
  return (
    <GuideLayout
      eyebrow="After You Land"
      title="First 30 Days"
      description="Lease signed, residence permit application submitted, routines forming."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/after-you-land"
      backLabel="After You Land"
      sections={[{ id: 'steps', label: 'What to do' }]}
    >
      <section id="steps">
        <div className="space-y-5">
          {STEPS.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold mb-1.5">{s.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <Link href="/living-in-istanbul/local-routines" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Local Routines <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
