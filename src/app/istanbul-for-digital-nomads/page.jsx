import Link from 'next/link';
import { ArrowRight, Coffee, Wifi, FileText, Wallet } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Istanbul for Digital Nomads: Visa, Cost & Where to Work | Move to Istanbul',
  description: 'The digital-nomad-specific picture of Istanbul: the Digital Nomad Visa, realistic remote-worker costs, internet reliability, and where to actually work from.',
  alternates: { canonical: '/istanbul-for-digital-nomads/' },
};

const PILLARS = [
  { href: '/guides/visa', icon: FileText, title: 'The Digital Nomad Visa', description: 'Requires proof of $3,000/month non-Turkish remote income and a university degree; 1 year, renewable, no local work rights.' },
  { href: '/guides/cost-of-living', icon: Wallet, title: 'Realistic Nomad Budget', description: '$1,800-$2,600/month covers a comfortable solo remote-worker lifestyle in most central neighborhoods.' },
  { href: '/living-in-istanbul/remote-work-cafes', icon: Coffee, title: 'Where to Actually Work From', description: 'Wi-Fi, outlets, and noise levels across Kadıköy, Nişantaşı/Şişli, and Beşiktaş/Beyoğlu.' },
  { href: '/cost-of-living/coworking-internet', icon: Wifi, title: 'Coworking & Internet', description: 'Fiber setup, coworking day-rates, and café-working costs broken down.' },
];

const FAQ = [
  {
    q: 'Is Istanbul actually good for remote work, or just cheap?',
    a: 'Both, genuinely — fiber internet is widely available and reliable in central neighborhoods, the time zone (UTC+3) overlaps well with both Europe and much of Asia for a working day, and the café/coworking culture is well developed in Kadıköy, Beşiktaş, and Nişantaşı/Şişli specifically.',
  },
  {
    q: 'Do I need the Digital Nomad Visa specifically, or can I just use tourist entry?',
    a: "Many nomads start on standard tourist entry or the short-term residence permit route and only pursue the Digital Nomad Visa once they're sure they want to stay longer-term, since the DNV has a firm $3,000/month income and degree requirement that not everyone meets or wants to document upfront. See the full visa guide for the comparison.",
  },
  {
    q: 'What\'s the actual day-to-day cost for a single remote worker?',
    a: 'Based on our full cost breakdown, $1,800-$2,600/month covers a comfortable solo lifestyle — a modern furnished 1+1 in a desirable neighborhood, utilities, groceries, some dining out, transit, and health insurance, with room for the occasional coworking day pass.',
  },
];

export default function IstanbulForDigitalNomadsPage() {
  return (
    <GuideLayout
      eyebrow="Living in Istanbul"
      title="Istanbul for Digital Nomads"
      description="The visa, the cost, and where to actually get work done."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/living-in-istanbul"
      backLabel="Living in Istanbul"
      sections={[{ id: 'pillars', label: 'The essentials' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="pillars">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PILLARS.map((p) => (
            <Link key={p.href} href={p.href} className="group block rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3"><p.icon className="w-5 h-5 text-primary" /></div>
              <h3 className="font-semibold mb-1.5 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">Read more <ArrowRight className="w-3.5 h-3.5" /></span>
            </Link>
          ))}
        </div>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Not sure if the DNV or a shorter-term route fits you better?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">Book a free call and we'll map it out for your specific income and timeline.</p>
        <Link href="/services/book-a-call" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Book a Free Call <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
