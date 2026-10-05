import Link from 'next/link';
import { ArrowRight, MapPin, Users, Train, Volume2, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Living in Beyoğlu, Istanbul: Rent, Vibe & Who It\'s For (2026) | Move to Istanbul',
  description: 'Beyoğlu neighborhood guide for foreigners — rent ranges, sub-areas like Cihangir and Galata, commute, nightlife, and e-İkamet registration status.',
  alternates: { canonical: '/housing/neighborhoods/beyoglu/' },
};

const SUB_AREAS = [
  { name: 'Cihangir', note: 'The classic creative-expat enclave — steep, narrow streets, vintage shops, and a disproportionate number of writers, artists, and remote workers. Among the priciest pockets of the district.' },
  { name: 'Galata', note: 'Centered on the Galata Tower, with boutique hotels, design studios, and the start of the climb up toward Cihangir. Dense and increasingly gentrified.' },
  { name: 'Karaköy', note: 'Waterfront, formerly industrial, now Istanbul\'s design and specialty-coffee district. More commercial ground floors than residential buildings, but the adjacent streets have apartments.' },
  { name: 'Çukurcuma', note: 'Antiques and furniture-restorer district squeezed between Cihangir and Galatasaray — quirky, walkable, and slightly cheaper than Cihangir proper.' },
];

const PROS = [
  'The strongest concentration of independent galleries, bookshops, and specialty coffee in the city',
  'Extremely walkable — Taksim, Karaköy, and the Bosphorus waterfront are all reachable on foot',
  'A genuinely international, long-settled expat community rather than a transient one',
];

const CONS = [
  'Several of the most desirable pockets, including parts of Cihangir, are closed to new foreign registrations',
  'Steep hills and old building stock mean limited elevators and demanding daily walking',
  'Taksim Square and the main pedestrian strip bring heavy tourist crowds and noise most of the week',
];

const FAQ = [
  {
    q: 'Is Cihangir still worth it if parts of Beyoğlu are closed for registration?',
    a: 'Only if you independently verify the exact mahalle. Beyoğlu has multiple zones closed under the 25% quota rule, and that status is not uniform across the district — some addresses a block apart can have different outcomes. Never take a landlord\'s word for it; check the Directorate of Migration Management registry against the title deed\'s mahalle.',
  },
  {
    q: 'How walkable is Beyoğlu really?',
    a: 'Very — it\'s one of the most pedestrian-dense districts in the city, with İstiklal Street as the spine connecting Taksim down to Karaköy and the Galata Bridge. The trade-off is steep terrain in Cihangir and Galata, which matters if mobility or moving furniture is a concern.',
  },
  {
    q: 'Is Beyoğlu good for families?',
    a: 'Less so than Şişli or the quieter parts of Kadıköy — it\'s dense, hilly, nightlife-adjacent, and apartments tend to be smaller, older walk-ups. It suits singles, couples, and remote workers far better than families with young children.',
  },
];

export default function BeyogluPage() {
  return (
    <GuideLayout
      eyebrow="Neighborhoods"
      title="Living in Beyoğlu"
      description="Historic, artistic, and walkable — Istanbul's longest-standing creative-expat district, built around Cihangir and Galata."
      readTime="7 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/housing/neighborhoods"
      backLabel="Neighborhoods"
      sections={[
        { id: 'overview', label: 'Overview' },
        { id: 'rent', label: 'Rent & who it suits' },
        { id: 'areas', label: 'Sub-areas' },
        { id: 'commute', label: 'Commute & nightlife' },
        { id: 'registration', label: 'Registration status' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="overview">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Beyoğlu is the district most people picture when they imagine living in Istanbul as a foreigner — Cihangir's steep streets, Galata's boutique studios, and a decades-old community of writers, artists, and creative remote workers who never left. It's also the district with the most registration complexity on this list, so the usual caveat matters more here than anywhere else.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><MapPin className="w-3.5 h-3.5" /> European side</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Users className="w-3.5 h-3.5" /> Creatives, writers, long-term expats</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Volume2 className="w-3.5 h-3.5" /> Tourist-busy near Taksim, calmer in Cihangir</span>
        </div>
      </section>

      <section id="rent">
        <h2 className="text-2xl font-bold mb-4">Rent &amp; who it suits</h2>
        <div className="rounded-2xl border border-border bg-card p-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Avg 1+1 furnished rent</p>
          <p className="text-2xl font-bold mb-1">40,000 – 65,000 TRY</p>
          <p className="text-sm text-muted-foreground">~$1,150 – $1,900 / month</p>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Best for singles, couples, and remote workers drawn to a genuine creative-neighborhood identity over polish or modern building standards. A harder fit for families (hills, old walk-ups, smaller units) and for anyone whose residence permit plans can't tolerate the registration uncertainty described below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-sm mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Pros</p>
            <ul className="space-y-2">
              {PROS.map((p) => <li key={p} className="text-sm text-foreground/80 leading-relaxed">{p}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-sm mb-3 flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> Cons</p>
            <ul className="space-y-2">
              {CONS.map((c) => <li key={c} className="text-sm text-foreground/80 leading-relaxed">{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="areas">
        <h2 className="text-2xl font-bold mb-4">Sub-areas worth knowing</h2>
        <div className="space-y-4">
          {SUB_AREAS.map((a) => (
            <div key={a.name} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-semibold mb-1.5">{a.name}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{a.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="commute">
        <h2 className="text-2xl font-bold mb-4">Commute &amp; nightlife</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-sm mb-2 flex items-center gap-2"><Train className="w-4 h-4 text-primary" /> Getting around</p>
            <p className="text-sm text-foreground/80 leading-relaxed">The M2 metro runs through Taksim and Şişhane, the historic Tünel funicular connects Karaköy up to İstiklal Street, and ferries from Karaköy reach the Asian side directly. Most daily errands within the district are done on foot.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-sm mb-2 flex items-center gap-2"><Volume2 className="w-4 h-4 text-primary" /> Nightlife &amp; noise</p>
            <p className="text-sm text-foreground/80 leading-relaxed">Taksim and İstiklal Street stay busy late with both tourists and locals, and bar noise carries on the narrow Cihangir streets. Karaköy's specialty-coffee scene is calmer by comparison. This is not a quiet district by any measure.</p>
          </div>
        </div>
      </section>

      <section id="registration">
        <h2 className="text-2xl font-bold mb-4">Residence permit registration status</h2>
        <div className="rounded-2xl border border-border bg-card p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Multiple Zones Closed</p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Beyoğlu has more closed mahalles than Beşiktaş or Şişli, including parts of its most popular sub-areas — this is the district where "it's probably fine" has burned the most foreign renters. Verify the exact Mahalle on the title deed (TAPU) against the Directorate of Migration Management's current registry before signing anything, regardless of what the agent claims; see the full{' '}
              <Link href="/guides/housing" className="text-primary font-medium hover:underline">housing guide</Link> for the step-by-step.
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Found a listing in Beyoğlu? Check it before you commit.</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Run it through our <Link href="/housing/rental-red-flags" className="text-primary font-medium hover:underline">rental red flags</Link> list and <Link href="/housing/viewing-checklist" className="text-primary font-medium hover:underline">viewing checklist</Link> before you pay anything, or let us pre-screen listings for you.
        </p>
        <Link href="/services/housing-shortlist-file" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Housing Shortlist File <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
