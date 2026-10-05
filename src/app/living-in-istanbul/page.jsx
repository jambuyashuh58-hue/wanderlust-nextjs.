import Link from 'next/link';
import { ArrowRight, Coffee, Compass } from 'lucide-react';

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
];

export default function LivingInIstanbulPage() {
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
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
        <Link href="/concierge" className="group flex items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 hover:border-primary/40 transition-all">
          <div><h3 className="font-bold mb-1">Want the whole move handled for you?</h3><p className="text-sm text-muted-foreground">Visa paperwork, apartment hunting, and your first-month setup — done end to end.</p></div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>
      </div>
    </div>
  );
}
