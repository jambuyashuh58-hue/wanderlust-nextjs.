import Link from 'next/link';
import { ArrowRight, Flag, ArrowLeft } from 'lucide-react';

export const revalidate = 86400;

export const metadata = {
  title: 'Türkiye Visa & Residence Rules by Nationality | Move to Istanbul',
  description: 'Entry requirements and residence-permit document notes for Türkiye, broken out by nationality — United States, United Kingdom, Germany, France, Netherlands, Canada, India, UAE, Saudi Arabia, and Russia.',
  alternates: { canonical: '/visa-residence/by-nationality' },
};

const COUNTRIES = [
  { href: '/visa-residence/by-nationality/united-states', title: 'United States', description: 'Visa-free tourist entry, and how US-issued documents get recognized for a residence permit.' },
  { href: '/visa-residence/by-nationality/united-kingdom', title: 'United Kingdom', description: 'Visa-free tourist entry, and how UK-issued documents get recognized for a residence permit.' },
  { href: '/visa-residence/by-nationality/germany', title: 'Germany', description: 'Visa-free tourist entry, and how German-issued documents get recognized for a residence permit.' },
  { href: '/visa-residence/by-nationality/france', title: 'France', description: 'Visa-free tourist entry, and how French-issued documents get recognized for a residence permit.' },
  { href: '/visa-residence/by-nationality/netherlands', title: 'Netherlands', description: 'Visa-free tourist entry, and how Dutch-issued documents get recognized for a residence permit.' },
  { href: '/visa-residence/by-nationality/canada', title: 'Canada', description: 'Visa-free tourist entry, and a recent change in how Canadian documents get legalized.' },
  { href: '/visa-residence/by-nationality/india', title: 'India', description: 'Entry rules are more involved than for most nationalities here — what to check before you book.' },
  { href: '/visa-residence/by-nationality/uae', title: 'UAE', description: 'Visa-free tourist entry, and a recent change in how UAE-issued documents get legalized.' },
  { href: '/visa-residence/by-nationality/saudi-arabia', title: 'Saudi Arabia', description: 'Entry rules, and how Saudi-issued documents get recognized for a residence permit.' },
  { href: '/visa-residence/by-nationality/russia', title: 'Russia', description: 'Visa-free tourist entry with a shorter stay allowance, and document legalization notes.' },
];

export default function ByNationalityPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <Link href="/visa-residence" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Visa & Residence
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Visa & Residence Rules by Nationality</h1>
          <p className="text-foreground/80 max-w-2xl leading-relaxed">
            Whether you need a visa before you arrive, and what your home country&apos;s documents need to be accepted for a Turkish residence permit, both depend heavily on your nationality. Pick your country below for the specifics. Entry rules and apostille arrangements change periodically — we link out to the official sources throughout, and it&apos;s worth a quick check there before you travel or file.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {COUNTRIES.map((c) => (
            <Link key={c.href} href={c.href} className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4"><Flag className="w-5 h-5 text-primary" /></div>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read <ArrowRight className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <h3 className="font-bold mb-1.5">Don&apos;t see your nationality, or want it confirmed for your situation?</h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Istanbul Route Check maps out your exact entry and residence-permit route, including document legalization, for your specific passport.</p>
          <Link href="/services/istanbul-route-check" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            See the Istanbul Route Check <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
