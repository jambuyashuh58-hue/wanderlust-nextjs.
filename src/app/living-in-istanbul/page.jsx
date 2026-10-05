import Link from 'next/link';
import { ArrowRight, Coffee, Compass, Ticket, Ship, ShoppingBasket, Palette } from 'lucide-react';
import { getCollections } from '@/lib/supabaseServer';

export const revalidate = 3600;

export const metadata = {
  title: 'Living in Istanbul | Move to Istanbul',
  description: 'Guides for actually living in Istanbul day to day — not sightseeing. Routines, neighborhood life, and the logistics of settling in.',
  alternates: { canonical: '/living-in-istanbul' },
};

// Only list guides that exist. A "coming soon" card for an unwritten page
// is exactly the kind of low-value content this cluster exists to avoid --
// add an entry here only when its page.jsx ships alongside it.
const GUIDES = [
  {
    href: '/living-in-istanbul/remote-work-cafes',
    icon: Coffee,
    title: 'Best Cafés in Istanbul for Remote Workers',
    description: 'Wi-Fi, outlets, and noise levels in Kadıköy, Nişantaşı/Şişli, and Beşiktaş/Beyoğlu.',
  },
  {
    href: '/living-in-istanbul/annual-passes-guide',
    icon: Ticket,
    title: 'Museums Worth Joining for Annual Passes',
    description: 'How the Museum Pass Istanbul works, and the break-even math for residents, not tourists.',
  },
  {
    href: '/living-in-istanbul/weekend-logistics',
    icon: Ship,
    title: 'Ferries, Transfers, and Getting Out of the City',
    description: "The İstanbulkart transfer discount that makes the ferry a real commute, plus weekend-trip logistics.",
  },
  {
    href: '/living-in-istanbul/local-routines',
    icon: ShoppingBasket,
    title: 'Local Routines: Markets, Pharmacies & Gyms',
    description: 'Grocery tiers, the weekly pazar, finding a 24-hour pharmacy, and staying active.',
  },
  {
    href: '/living-in-istanbul/hands-on-workshops',
    icon: Palette,
    title: 'Skills Worth Picking Up as a Resident',
    description: 'Hamam rituals, cooking classes, and craft workshops — which become a habit, not just a photo.',
  },
];

export default async function LivingInIstanbulPage() {
  // Every non-guide collection is now canonical at /living-in-istanbul/<slug>
  // (see collections/[slug]/page.jsx) -- surface them here too, not just at
  // the URL level, so this hub is a real index of the cluster.
  const allCollections = await getCollections().catch(() => []);
  const collections = allCollections.filter((c) => c.display_style !== 'guide');

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.pexels.com/photos/13642995/pexels-photo-13642995.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Everyday street life in a Istanbul neighborhood"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/40" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-4"><Compass className="w-4 h-4" /> Living in Istanbul</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Okay, you live here now. How do you actually live?</h1>
          <p className="text-white/85 max-w-2xl leading-relaxed">
            Not another "things to do" list. These guides are for the routine — where you work, how you get around, and how to settle in without it feeling like a permanent vacation.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div>
          <h2 className="text-xl font-bold mb-5">Resident Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GUIDES.map((g) => (
              <Link key={g.href} href={g.href} className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all">
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4"><g.icon className="w-5 h-5 text-primary" /></div>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{g.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read guide <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>

        {collections.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-1">Collections</h2>
            <p className="text-sm text-muted-foreground mb-5">Curated sets of experiences, organized by theme rather than city.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {collections.map((c) => (
                <Link key={c.id} href={`/living-in-istanbul/${c.slug}`} className="group block rounded-xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-md transition-all bg-card">
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    {c.hero_image_url && <img src={c.hero_image_url} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                  </div>
                  <div className="p-2.5">
                    <h3 className="text-xs font-semibold line-clamp-2 group-hover:text-primary transition-colors">{c.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link href="/concierge" className="group flex items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 hover:border-primary/40 transition-all">
          <div><h3 className="font-bold mb-1">Want the whole move handled for you?</h3><p className="text-sm text-muted-foreground">Visa paperwork, apartment hunting, and your first-month setup — done end to end.</p></div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>
      </div>
    </div>
  );
}
