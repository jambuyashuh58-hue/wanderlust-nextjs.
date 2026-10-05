import Link from 'next/link';
import { ArrowRight, AlertTriangle, ClipboardCheck, FileSearch, PackageCheck, Handshake, MapPin } from 'lucide-react';

export const revalidate = 86400;

export const metadata = {
  title: 'Renting in Türkiye: Red Flags, Contracts & Negotiation | Move to Istanbul',
  description: 'The process side of renting in Türkiye as a foreigner — spotting rental red flags, what to check at a viewing, reading the contract, and negotiating.',
  alternates: { canonical: '/housing/' },
};

const PAGES = [
  { href: '/housing/neighborhoods', icon: MapPin, title: 'Neighborhood Guides', description: 'Deep dives on 7 districts — rent, who it suits, commute, nightlife, and registration status.' },
  { href: '/housing/rental-red-flags', icon: AlertTriangle, title: 'Rental Red Flags', description: 'The listing and landlord patterns that mean walk away.' },
  { href: '/housing/viewing-checklist', icon: ClipboardCheck, title: 'Viewing Checklist', description: 'What to actually check in person before you fall for a nice photo set.' },
  { href: '/housing/contract-review', icon: FileSearch, title: 'Contract Review', description: 'The clauses in a Turkish rental contract worth reading twice.' },
  { href: '/housing/handover-inspection', icon: PackageCheck, title: 'Handover Inspection', description: 'Documenting the apartment\'s condition before you get the keys.' },
  { href: '/housing/negotiation-tips', icon: Handshake, title: 'Negotiation Tips', description: 'What\'s actually negotiable on rent, deposit, and included furnishing.' },
];

export default function HousingPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Renting in Türkiye, Without Getting Burned</h1>
          <p className="text-foreground/80 max-w-2xl leading-relaxed">
            Our housing guide covers neighborhoods, rent ranges, and the apartment-search process end to end. This cluster goes deeper on the parts that determine whether you get a fair deal: spotting red flags, what to check at a viewing, reading the contract, and what's actually negotiable.
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
          <Link href="/guides/housing" className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all">
            <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4"><ClipboardCheck className="w-5 h-5 text-primary" /></div>
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Neighborhoods & Rent Ranges</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">The full district-by-district breakdown with current rent ranges and registration status.</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
