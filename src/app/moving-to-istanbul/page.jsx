import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileCheck2, Home as HomeIcon, Wallet, ClipboardList, PlaneLanding, PiggyBank } from 'lucide-react';
import GuideSchema from '@/components/GuideSchema';

export const metadata = {
  title: 'Moving to Istanbul: The Complete 2026 Relocation Guide | Move to Istanbul',
  description: 'Everything you need to move to Istanbul — visas, housing, cost of living, budget, and your first 90 days, in one place.',
  alternates: { canonical: '/moving-to-istanbul' },
};

const CLUSTER = [
  { href: '/moving-to-istanbul/checklist', icon: ClipboardList, name: 'The 90-60-30 Day Checklist', desc: 'Every step, in the order you actually need to do it.' },
  { href: '/moving-to-istanbul/visa-residence-permit', icon: FileCheck2, name: 'Visa & Residence Permit', desc: 'Every legal pathway into Türkiye, and the traps that trip people up.' },
  { href: '/moving-to-istanbul/housing', icon: HomeIcon, name: 'Housing', desc: 'District-by-district rent ranges and how to actually sign a lease.' },
  { href: '/moving-to-istanbul/cost-of-living', icon: Wallet, name: 'Cost of Living', desc: 'Real monthly numbers for housing, food, transport, and more.' },
  { href: '/moving-to-istanbul/budget', icon: PiggyBank, name: 'Moving Budget', desc: 'The one-time, upfront costs of the move itself.' },
  { href: '/moving-to-istanbul/arrival-setup', icon: PlaneLanding, name: 'Arrival & First 90 Days', desc: 'Bank account, SIM card, transit card, address registration — in order.' },
];

const FAQ = [
  { q: 'How much money do I need to move to Istanbul?', a: 'Budget at least $3,000–$5,000 in upfront costs (visa fees, deposit, agent fees, flights) plus your first month of living expenses — see the Moving Budget and Cost of Living pages for exact numbers.' },
  { q: "What's the very first step?", a: 'Confirm your visa/residence pathway before booking anything irreversible. Start with the Visa & Residence Permit guide, then work through the 90-60-30 Day Checklist in order.' },
  { q: 'Do I need to speak Turkish to move here?', a: "No — Istanbul is large enough that you can get by in English for most day-to-day tasks, though a notary lease signing and government appointments go more smoothly with help. That's exactly what our concierge services are for." },
];

export default function MovingToIstanbulHubPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <GuideSchema
        path="/moving-to-istanbul"
        title="Moving to Istanbul: The Complete 2026 Relocation Guide"
        description="Everything you need to move to Istanbul — visas, housing, cost of living, budget, and your first 90 days, in one place."
        faq={FAQ}
      />
      <div className="bg-[hsl(221,55%,26%)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-5">2026 Relocation Guide</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Moving to Istanbul: The Complete Guide</h1>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            Visas, housing, cost of living, and your first 90 days — everything you need to move with a plan instead of guesswork.
          </p>
          <Link
            href="/free-istanbul-relocation-guide"
            className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Get the free 90-60-30 Day Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold mb-7">Start here</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {CLUSTER.map(({ href, icon: Icon, name, desc }) => (
            <Link key={href} href={href} className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold mb-1">{name}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>

        <div className="rounded-2xl border border-amber-400/40 bg-amber-50 dark:bg-amber-950/20 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-14">
          <div>
            <p className="font-semibold mb-1">Want this handled for you?</p>
            <p className="text-sm text-muted-foreground">Our concierge team can take on visa paperwork, apartment shortlisting, or the entire first month.</p>
          </div>
          <Link href="/services" className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white font-semibold hover:opacity-90 transition-opacity">
            See concierge services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <h2 className="text-xl font-bold mb-5">Frequently asked questions</h2>
        <div className="space-y-5">
          {FAQ.map((f) => (
            <div key={f.q}>
              <p className="font-semibold text-sm mb-1">{f.q}</p>
              <p className="text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
