import Link from 'next/link';
import { Stamp, Home, Wallet, TrendingUp, HeartPulse, GraduationCap, Brain, Smartphone, CreditCard, ArrowRight, BookOpen, LayoutGrid, Building2, Landmark, ShieldCheck } from 'lucide-react';
import { getCollections, getCities } from '@/lib/supabaseServer';
import AllGuidesGrid from '@/components/AllGuidesGrid';

export const revalidate = 3600;

export const metadata = {
  title: 'Türkiye Long-Stay Guides | Move to Istanbul',
  description: 'Free relocation guides for moving to Türkiye — visas, housing, and cost of living.',
};

const LONG_STAY_GUIDES = [
  { slug: 'visa', icon: Stamp, title: 'Türkiye Visas for Remote Workers', description: 'e-Visa vs sticker visa vs residence permit — what applies to you.', color: 'text-primary' },
  { slug: 'housing', icon: Home, title: 'Finding a Home in Istanbul', description: 'Neighborhood breakdown, rent ranges, contracts, and scams to avoid.', color: 'text-secondary' },
  { slug: 'cost-of-living', icon: Wallet, title: 'Monthly Cost of Living in Istanbul', description: 'A real budget breakdown — rent, groceries, transport.', color: 'text-accent' },
  { slug: 'kira-artis-orani', icon: TrendingUp, title: 'Turkey Rent Increase Rate 2026 (TÜİK / TÜFE)', description: 'The legal cap on your rent increase, updated monthly from TÜİK data.', color: 'text-primary' },
];

const SPECIALIZED_GUIDES = [
  { slug: 'medical-tourism-istanbul', icon: HeartPulse, title: 'Medical Tourism in Istanbul 2026', description: 'Procedure costs, clinic verification, and medical residence permit rules.', color: 'text-destructive' },
  { slug: 'international-schools-istanbul', icon: GraduationCap, title: 'International Schools for Expat Families', description: 'Curricula, top schools by district, tuition benchmarks, and visa rules for kids.', color: 'text-secondary' },
  { slug: 'culture-shock-istanbul', icon: Brain, title: 'Expat Culture Shock in Istanbul', description: 'The 4 phases of adjustment and a practical plan to integrate faster.', color: 'text-accent' },
  { slug: 'esim-vs-local-sim-turkey', icon: Smartphone, title: 'eSIM vs. Local SIM in Türkiye', description: 'The 120-day IMEI rule, the airport SIM trap, and the hybrid setup that works.', color: 'text-primary' },
  { slug: 'paypal-stripe-alternatives-turkey', icon: CreditCard, title: 'PayPal & Stripe Alternatives for Freelancers', description: 'Wise, Payoneer, and SWIFT — plus the tax setup that gets you to 0% income tax.', color: 'text-primary' },
  { slug: 'property-management-istanbul', icon: Building2, title: 'Property Management for Overseas Owners', description: 'The agent-vs-dedicated-manager tradeoff, and the legal protections Turkish landlords actually need.', color: 'text-accent' },
  { slug: 'phone-registration-tax-turkey', icon: ShieldCheck, title: 'Phone Registration Tax in Türkiye', description: 'The 120-day IMEI rule, the real cost of registering, and the cheaper workarounds compared.', color: 'text-destructive' },
  { slug: 'send-usd-to-turkish-bank-account', icon: Landmark, title: 'Send USD to a Turkish Bank Account', description: 'Wise vs. SWIFT vs. Payoneer vs. Revolut — the fastest, cheapest way to move your own money.', color: 'text-secondary' },
];

export default async function GuidesPage() {
  const [dbGuides, cities] = await Promise.all([
    getCollections({ displayStyle: 'guide' }),
    getCities(),
  ]);

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.pexels.com/photos/20294576/pexels-photo-20294576.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Narrow cobblestone street in Istanbul"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/40" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-4"><BookOpen className="w-4 h-4" /> Long-Stay Essentials</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Guides for staying in Türkiye</h1>
          <p className="text-white/85 max-w-2xl leading-relaxed">The essentials every remote worker needs — visas, housing, and a real monthly budget.</p>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div>
          <h2 className="text-xl font-bold mb-5">Long-stay essentials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LONG_STAY_GUIDES.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4"><g.icon className={`w-5 h-5 ${g.color}`} /></div>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{g.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{g.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read guide <ArrowRight className="w-4 h-4" /></span>
            </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-5">Specialized guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SPECIALIZED_GUIDES.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all">
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4"><g.icon className={`w-5 h-5 ${g.color}`} /></div>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{g.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read guide <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
        {dbGuides.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-5">All Türkiye guides</h2>
            <AllGuidesGrid guides={dbGuides} cities={cities} />
          </div>
        )}
        <Link href="/collections" className="group flex items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 hover:border-primary/40 transition-all">
          <div><h3 className="font-bold mb-1 flex items-center gap-2"><LayoutGrid className="w-5 h-5 text-primary" /> Destination collections & things to do</h3><p className="text-sm text-muted-foreground">Browse curated experience sets and "Best Of" lists for every city.</p></div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>
      </div>
    </div>
  );
}
