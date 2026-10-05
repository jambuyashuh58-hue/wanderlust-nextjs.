import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, MapPin, Home as HomeIcon, Package, Phone } from 'lucide-react';
import ConciergeInteractive from '@/components/ConciergeInteractive';

export const metadata = {
  title: 'Relocation Services: Route Check, Housing Shortlist & Full Move File | Move to Istanbul',
  description: 'Three productized relocation services — Istanbul Route Check ($99), Housing Shortlist File ($449), and Full Move File ($999) — plus a free discovery call.',
  alternates: { canonical: '/services' },
};

// Lightweight landing cards for the three named products -- the actual
// selection + intake happens in ConciergeInteractive below (same component,
// same /api/concierge/inquiry backend as before the /services rename), but
// a visitor arriving from a specific guide's CTA (e.g. the housing guide
// linking "Housing Shortlist File") should see that product named clearly
// up top, not just a generic pricing table.
const PRODUCTS = [
  { href: '/services/istanbul-route-check', icon: MapPin, name: 'Istanbul Route Check', price: '$99' },
  { href: '/services/housing-shortlist-file', icon: HomeIcon, name: 'Housing Shortlist File', price: '$449' },
  { href: '/services/full-move-file', icon: Package, name: 'Full Move File', price: '$999' },
  { href: '/services/book-a-call', icon: Phone, name: 'Book a Call', price: 'Free' },
];

export default function ServicesPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-[hsl(221,55%,26%)] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-5">Relocation Services</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">We Handle the Parts of Moving to Türkiye That Eat Your Evenings</h1>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed">
            Visa paperwork, apartment hunting, and your first-month setup — done for you, async, no calls required. Pick the level of help that fits.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {PRODUCTS.map((p) => (
            <Link key={p.href} href={p.href} className="group block rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3"><p.icon className="w-5 h-5 text-primary" /></div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{p.price}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">Learn more <ArrowRight className="w-3 h-3" /></span>
            </Link>
          ))}
        </div>
        <Suspense fallback={null}>
          <ConciergeInteractive />
        </Suspense>
      </div>
    </div>
  );
}
