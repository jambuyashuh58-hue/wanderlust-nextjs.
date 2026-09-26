import Link from 'next/link';
import { Stamp, Home, Wallet, ArrowRight, BookOpen, LayoutGrid } from 'lucide-react';

export const metadata = {
  title: 'Türkiye Long-Stay Guides | Wanderlust',
  description: 'Free relocation guides for moving to Türkiye — visas, housing, and cost of living.',
};

const LONG_STAY_GUIDES = [
  { slug: 'visa', icon: Stamp, title: 'Türkiye Visas for Remote Workers', description: 'e-Visa vs sticker visa vs residence permit -- what applies to you.', color: 'text-primary' },
  { slug: 'housing', icon: Home, title: 'Finding a Home in Istanbul', description: 'Neighborhood breakdown, rent ranges, contracts, and scams to avoid.', color: 'text-secondary' },
  { slug: 'cost-of-living', icon: Wallet, title: 'Monthly Cost of Living in Istanbul', description: 'A real budget breakdown -- rent, groceries, transport.', color: 'text-accent' },
];

export default function GuidesPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"><BookOpen className="w-4 h-4" /> Long-Stay Essentials</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Guides for staying in Türkiye</h1>
          <p className="text-foreground/80 max-w-2xl leading-relaxed">The essentials every remote worker needs -- visas, housing, and a real monthly budget.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {LONG_STAY_GUIDES.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4"><g.icon className={`w-5 h-5 ${g.color}`} /></div>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{g.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{g.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read guide <ArrowRight className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
        <Link href="/collections" className="group flex items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 hover:border-primary/40 transition-all">
          <div><h3 className="font-bold mb-1 flex items-center gap-2"><LayoutGrid className="w-5 h-5 text-primary" /> Destination guides & things to do</h3><p className="text-sm text-muted-foreground">Browse every city guide and curated experience set.</p></div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>
      </div>
    </div>
  );
}
