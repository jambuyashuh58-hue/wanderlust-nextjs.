import Link from 'next/link';
import { ArrowRight, MapPin, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export const revalidate = 86400;

export const metadata = {
  title: 'Istanbul Neighborhood Guides for Foreigners (2026) | Move to Istanbul',
  description: 'Deep-dive guides to 7 Istanbul neighborhoods — rent ranges, who each suits, commute and nightlife, and e-İkamet registration status.',
  alternates: { canonical: '/housing/neighborhoods/' },
};

const STATUS_ICON = {
  open: CheckCircle2,
  caution: AlertTriangle,
  closed: XCircle,
};

const STATUS_COLOR = {
  open: 'text-success',
  caution: 'text-amber-500',
  closed: 'text-destructive',
};

const NEIGHBORHOODS = [
  { href: '/housing/neighborhoods/kadikoy', name: 'Kadıköy', side: 'Asian side', rent: '35,000 – 55,000 TRY (~$1,000–$1,600)', vibe: 'Vibrant, bohemian, highly walkable, cafe culture.', status: 'open', statusLabel: 'Mostly Open' },
  { href: '/housing/neighborhoods/besiktas', name: 'Beşiktaş', side: 'European side', rent: '38,000 – 60,000 TRY (~$1,100–$1,750)', vibe: 'Central, lively student & young professional hub.', status: 'caution', statusLabel: 'Select Zones Closed' },
  { href: '/housing/neighborhoods/sisli', name: 'Şişli', side: 'European side', rent: '45,000 – 75,000 TRY (~$1,300–$2,200)', vibe: 'Modern, upscale, high-rise condos & business hub.', status: 'caution', statusLabel: 'Select Zones Closed' },
  { href: '/housing/neighborhoods/beyoglu', name: 'Beyoğlu', side: 'European side', rent: '40,000 – 65,000 TRY (~$1,150–$1,900)', vibe: 'Historic, artistic, popular with creative expats.', status: 'caution', statusLabel: 'Multiple Zones Closed' },
  { href: '/housing/neighborhoods/fatih', name: 'Fatih', side: 'European side, historic peninsula', rent: '18,000 – 30,000 TRY (~$500–$900)', vibe: 'Historic, cheap, walkable to major sights.', status: 'closed', statusLabel: '🚫 Fully Closed' },
  { href: '/housing/neighborhoods/atasehir', name: 'Ataşehir', side: 'Asian side', rent: '45,000 – 59,000 TRY (~$1,300–$1,700)', vibe: 'Modern, corporate, high-rise business district.', status: 'caution', statusLabel: 'Reported Open — Verify' },
  { href: '/housing/neighborhoods/bakirkoy', name: 'Bakırköy', side: 'European side, Marmara coast', rent: '21,000 – 31,000 TRY (~$600–$900)', vibe: 'Residential, coastal, family-oriented.', status: 'caution', statusLabel: 'Status Unverified' },
];

export default function NeighborhoodsHubPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <Link href="/housing" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowRight className="w-4 h-4 rotate-180" /> Housing
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Istanbul Neighborhoods for Foreigners</h1>
          <p className="text-foreground/80 max-w-2xl leading-relaxed">
            Seven districts, compared on the things that actually decide where you should live: rent range, who each one suits, commute and nightlife, named sub-areas, and current e-İkamet registration status. Start with our{' '}
            <Link href="/guides/housing" className="text-primary font-medium hover:underline">main housing guide</Link> for the full rental process, then use these pages to pick where to look.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {NEIGHBORHOODS.map((n) => {
            const StatusIcon = STATUS_ICON[n.status];
            return (
              <Link key={n.href} href={n.href} className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{n.name}</h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground shrink-0 mt-1"><MapPin className="w-3 h-3" /> {n.side}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{n.vibe}</p>
                <div className="mb-4">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Avg 1+1 rent</p>
                  <p className="text-sm font-semibold">{n.rent}</p>
                </div>
                <div className="flex items-center gap-1.5 mb-4">
                  <StatusIcon className={`w-3.5 h-3.5 shrink-0 ${STATUS_COLOR[n.status]}`} />
                  <span className="text-xs font-medium">{n.statusLabel}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read guide <ArrowRight className="w-4 h-4" /></span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5">
          <p className="text-sm text-foreground/80 leading-relaxed">
            <strong className="text-foreground">On registration status:</strong> e-İkamet eligibility is set mahalle by mahalle under the 25% foreigner quota rule, not district-wide, and the list changes. Treat every status label above as a starting point, not a guarantee — always verify the exact Mahalle named on the title deed (TAPU) against the{' '}
            <a href="https://en.goc.gov.tr/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Directorate of Migration Management's current registry</a> before signing a lease.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <h3 className="font-bold mb-1.5">Want a pre-vetted shortlist instead of searching district by district?</h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            Our apartment shortlisting service hand-picks verified listings in open zones, matched to the neighborhood profile that fits you.
          </p>
          <Link href="/services/housing-shortlist-file" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            See the Housing Shortlist File <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
