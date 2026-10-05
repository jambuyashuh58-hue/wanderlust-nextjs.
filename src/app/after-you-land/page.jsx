import Link from 'next/link';
import { ArrowRight, Clock, CalendarDays, CalendarRange, IdCard, Plug, Languages } from 'lucide-react';

export const revalidate = 86400;

export const metadata = {
  title: 'After You Land in Türkiye: First 24 Hours to First 30 Days | Move to Istanbul',
  description: 'What to actually do in your first 24 hours, first week, and first month after landing in Türkiye, plus the administrative and utility setup that follows.',
  alternates: { canonical: '/after-you-land' },
};

const PAGES = [
  { href: '/after-you-land/first-24-hours', icon: Clock, title: 'First 24 Hours', description: 'The absolute essentials: SIM, cash, transit, and getting to where you\'re staying.' },
  { href: '/after-you-land/first-7-days', icon: CalendarDays, title: 'First 7 Days', description: 'Tax ID, banking decisions, and starting the apartment search.' },
  { href: '/after-you-land/first-30-days', icon: CalendarRange, title: 'First 30 Days', description: 'Lease signed, residence permit application submitted, routines forming.' },
  { href: '/after-you-land/administrative-identity', icon: IdCard, title: 'Administrative Identity', description: 'Tax ID, YKN number, and the IDs you\'ll actually be asked for.' },
  { href: '/after-you-land/utilities-connectivity', icon: Plug, title: 'Utilities & Connectivity', description: 'Getting water, gas, electric, and internet switched on in your name.' },
  { href: '/after-you-land/turkish-phrases', icon: Languages, title: 'Turkish Phrases That Actually Help', description: 'The handful of phrases that get you through daily admin, not a tourist phrasebook.' },
];

export default function AfterYouLandPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">After You Land</h1>
          <p className="text-foreground/80 max-w-2xl leading-relaxed">
            The moving-to-Türkiye cluster gets you here. This one covers what happens once you're physically on the ground — broken into the first 24 hours, the first week, and the first month, plus the administrative and utility setup that threads through all three.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PAGES.map((p) => (
            <Link key={p.href} href={p.href} className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4"><p.icon className="w-5 h-5 text-primary" /></div>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read <ArrowRight className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Note on scope:</strong> a few topics from the original structure — building a food/household routine, work/study setup, finding a local support network, a 30-60-90 day review, and a broader "relocation recovery" framework — are intentionally left for a follow-up pass, so each gets real, specific content rather than being padded out alongside these six.
          </p>
        </div>
      </div>
    </div>
  );
}
