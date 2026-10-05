import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

const STEPS = [
  { title: 'Get a local SIM or activate an eSIM', body: 'Kiosks for Turkcell, Vodafone, and Türk Telekom are in both Istanbul airports (IST and SAW). Remember the 120-day rule if you plan to use a foreign phone long-term — see our arrival setup guide.' },
  { title: 'Get some cash and know the exchange rate', body: 'A small amount of TRY cash covers taxis, kiosks, and tipping before you\'ve sorted banking. Avoid airport currency exchange counters for anything beyond a small amount — rates are worse than in the city.' },
  { title: 'Get to your accommodation', body: 'A pre-booked airport transfer is the easiest first move if you\'re jet-lagged and don\'t yet have local transit figured out. Ride-hailing apps and licensed airport taxis are the usual alternatives.' },
  { title: 'Emergency number, just in case', body: '112 is the unified emergency number in Türkiye for police, ambulance, and fire — worth having memorized from hour one.' },
];

export const metadata = {
  title: 'Your First 24 Hours in Türkiye | Move to Istanbul',
  description: 'The absolute essentials for your first day after landing in Türkiye: SIM, cash, transit, and getting to where you\'re staying.',
  alternates: { canonical: '/after-you-land/first-24-hours/' },
};

export default function First24HoursPage() {
  return (
    <GuideLayout
      eyebrow="After You Land"
      title="First 24 Hours"
      description="The absolute essentials: SIM, cash, transit, and getting to where you're staying."
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
        <Link href="/after-you-land/first-7-days" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Next: Your First 7 Days <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
