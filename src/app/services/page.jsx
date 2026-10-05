import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, MapPin, Home as HomeIcon, Package, Phone } from 'lucide-react';
import ConciergeInteractive from '@/components/ConciergeInteractive';

export const metadata = {
  title: 'Relocation Services: Route Check, Housing Shortlist & Full Move File | Move to Istanbul',
  description: 'Three productized relocation services — Istanbul Route Check ($99), Housing Shortlist File ($449), and Full Move File ($999) — plus a free discovery call.',
  alternates: { canonical: '/services/' },
};

// Lightweight landing cards for the three named products -- the actual
// selection + intake happens in ConciergeInteractive below (same component,
// same /api/concierge/inquiry backend as before the /services rename), but
// a visitor arriving from a specific guide's CTA (e.g. the housing guide
// linking "Housing Shortlist File") should see that product named clearly
// up top, not just a generic pricing table.
const PRODUCTS = [
  {
    href: '/services/istanbul-route-check', icon: MapPin, name: 'Istanbul Route Check', price: '$99',
    includes: ['Visa route recommendation', 'Document checklist', 'Timeline for your situation'],
    notThis: 'Not a filed application or legal filing — a planning review.',
  },
  {
    href: '/services/housing-shortlist-file', icon: HomeIcon, name: 'Housing Shortlist File', price: '$449', featured: true,
    includes: ['Everything in Route Check', '5-8 vetted listings matched to you', 'Neighborhood fit notes'],
    notThis: 'Not a rental agent service — we don’t sign or negotiate on your behalf.',
  },
  {
    href: '/services/full-move-file', icon: Package, name: 'Full Move File', price: '$999',
    includes: ['Everything in Housing Shortlist', 'Bilingual specialist accompaniment', 'Weekly check-ins until settled'],
    notThis: 'Not visa sponsorship or a law firm — independent planning support.',
  },
  {
    href: '/services/book-a-call', icon: Phone, name: 'Book a Call', price: 'Free',
    includes: ['15-minute fit check', 'Which tier makes sense for you'],
    notThis: 'Not a sales pitch — if we’re not a fit, we’ll say so.',
  },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-14 items-start">
          {PRODUCTS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group block rounded-2xl border bg-card p-5 hover:shadow-md transition-all ${p.featured ? 'border-primary border-2 shadow-sm' : 'border-border hover:border-primary/40'}`}
            >
              {p.featured && <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-semibold uppercase tracking-wide mb-2">Most popular</span>}
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3"><p.icon className="w-5 h-5 text-primary" /></div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="text-sm font-bold mb-3">{p.price}</p>
              <ul className="space-y-1.5 mb-3">
                {p.includes.map((item, i) => <li key={i} className="text-xs text-foreground/80 leading-snug">• {item}</li>)}
              </ul>
              <p className="text-[11px] text-muted-foreground leading-snug mb-3">{p.notThis}</p>
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
