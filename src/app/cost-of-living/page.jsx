import Link from 'next/link';
import { ArrowRight, Wallet, Receipt, Landmark, HeartPulse, Bus, Laptop } from 'lucide-react';

export const revalidate = 86400;

export const metadata = {
  title: 'Cost of Living Breakdown: Budget, Banking & Transport | Move to Istanbul',
  description: 'The practical cost-of-living topics for Türkiye beyond the headline monthly number — your first 3-month budget, banking, health insurance, transport, and coworking.',
  alternates: { canonical: '/cost-of-living' },
};

const PAGES = [
  { href: '/cost-of-living/3-month-budget', icon: Wallet, title: '3-Month Starter Budget', description: 'What to actually set aside to cover your first 3 months, one-time costs included.' },
  { href: '/cost-of-living/monthly-expenses', icon: Receipt, title: 'Monthly Expenses by Category', description: 'Where the full cost-of-living guide\'s numbers come from, category by category.' },
  { href: '/cost-of-living/banking-payments', icon: Landmark, title: 'Banking & Payments', description: 'Turkish bank accounts, multi-currency accounts, and avoiding ATM markup.' },
  { href: '/cost-of-living/health-insurance', icon: HeartPulse, title: 'Health Insurance', description: 'What a compliant policy needs to cover, and realistic cost ranges.' },
  { href: '/cost-of-living/transport', icon: Bus, title: 'Transport', description: 'IstanbulKart, which lines matter, and realistic monthly transit costs.' },
  { href: '/cost-of-living/coworking-internet', icon: Laptop, title: 'Coworking & Internet', description: 'Fiber setup, coworking day-rates, and café-working costs.' },
];

export default function CostOfLivingPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Cost of Living, Beyond the Headline Number</h1>
          <p className="text-foreground/80 max-w-2xl leading-relaxed">
            Our full cost-of-living guide breaks down monthly budgets across three lifestyle tiers. This cluster goes topic by topic — the first-3-months number, banking setup, insurance, transport, and getting online — so you can plan each piece specifically instead of just a monthly total.
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
          <Link href="/guides/cost-of-living" className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all">
            <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4"><Wallet className="w-5 h-5 text-primary" /></div>
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Full Monthly Budget Tiers</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">Budget, comfortable, and premium lifestyle tiers with the complete category breakdown.</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
