import Link from 'next/link';
import { ArrowRight, MapPin, Users, Train, Volume2, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Living in Beşiktaş, Istanbul: Rent, Vibe & Who It\'s For (2026) | Move to Istanbul',
  description: 'Beşiktaş neighborhood guide for foreigners — rent ranges, sub-areas like Cihannüma and Ihlamurdere, commute, nightlife, and e-İkamet registration status.',
  alternates: { canonical: '/housing/neighborhoods/besiktas' },
};

const SUB_AREAS = [
  { name: 'Cihannüma', note: 'Hillside, residential, and a short walk down to the ferry and the Beşiktaş market — a common pick for people who want central without the noise of the main square.' },
  { name: 'Ihlamurdere', note: 'Tucked into a quiet valley near Ihlamur Palace gardens, with a greener, calmer feel than most of the district despite being minutes from the center.' },
  { name: 'Levent / Etiler border', note: 'The district\'s upper edge, adjacent to Istanbul\'s main business towers — higher rent, and popular with people working in finance or corporate roles nearby.' },
  { name: 'Ortaköy border', note: 'Bosphorus-front, close to the bridge and the Sunday market — scenic and well-connected, but among the priciest addresses in the district.' },
];

const PROS = [
  'As central as Istanbul gets — ferries, the main bus hub, and walkable access to Nişantaşı, Ortaköy, and the business towers at Levent',
  'A large, young population around Beşiktaş University keeps the area lively with affordable food and nightlife options alongside the pricier spots',
  'Strong public transport coverage — metro, metrobüs, ferries, and buses all converge here',
];

const CONS = [
  'The main square and market streets are loud and crowded most of the week, not just weekends',
  'Some of the district\'s most desirable zones carry closed or restricted registration status — verify before falling in love with a listing',
  'Football match days (Beşiktaş JK) bring large crowds and noise to the center',
];

const FAQ = [
  {
    q: 'Is Beşiktaş European or Asian side?',
    a: 'European side. It sits roughly in the geographic middle of the European side\'s coastline, between Karaköy and Ortaköy, which is most of why it\'s so convenient — most other European-side neighborhoods are a short bus, metro, or ferry ride away.',
  },
  {
    q: 'Is Beşiktaş too loud to live in long-term?',
    a: 'The main square, market streets, and anywhere near the ferry terminal are busy and noisy most of the week. Cihannüma and Ihlamurdere, both a short walk inland, are noticeably calmer while keeping the same commute advantages — worth prioritizing if noise matters to you.',
  },
  {
    q: 'Which parts of Beşiktaş are closed to foreign residence registration?',
    a: 'Select zones within the district are closed under the 25% quota rule, while others remain open — this is set mahalle by mahalle, not district-wide. Always check the exact Mahalle on the title deed against the current registry before signing a lease; see our full housing guide for the process.',
  },
];

export default function BesiktasPage() {
  return (
    <GuideLayout
      eyebrow="Neighborhoods"
      title="Living in Beşiktaş"
      description="Central, lively, and dense with young professionals and students — one of the best-connected districts on the European side."
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
          Beşiktaş trades on location — it sits between the business towers at Levent, the Bosphorus-front cafes of Ortaköy, and the shopping streets of Nişantaşı, with a transport hub that reaches almost anywhere in the city without transfers. The trade-off is that the district's core is genuinely busy, not "charmingly lively" busy — it's a real commuter and university hub first.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><MapPin className="w-3.5 h-3.5" /> European side</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Users className="w-3.5 h-3.5" /> Students, young professionals, corporate commuters</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Volume2 className="w-3.5 h-3.5" /> Busy, quieter in hillside pockets</span>
        </div>
      </section>

      <section id="rent">
        <h2 className="text-2xl font-bold mb-4">Rent &amp; who it suits</h2>
        <div className="rounded-2xl border border-border bg-card p-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Avg 1+1 furnished rent</p>
          <p className="text-2xl font-bold mb-1">38,000 – 60,000 TRY</p>
          <p className="text-sm text-muted-foreground">~$1,100 – $1,750 / month</p>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Best for people whose work or lifestyle depends on being centrally located and well-connected — corporate commuters heading to Levent or Maslak, and young professionals who want nightlife and a university-town energy within walking distance. Less suited to anyone prioritizing quiet over convenience, or families looking for a slower pace.
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
            <p className="text-sm text-foreground/80 leading-relaxed">One of the best-connected districts in the city — the M6 metro, metrobüs, city buses, and ferries to Kadıköy and Üsküdar all converge at the main square. Walkable to Ortaköy, Nişantaşı, and the Levent/Maslak business district without needing transport at all for the closer stretches.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-sm mb-2 flex items-center gap-2"><Volume2 className="w-4 h-4 text-primary" /> Nightlife &amp; noise</p>
            <p className="text-sm text-foreground/80 leading-relaxed">The main square and market streets are loud well into the evening most nights, not just weekends, and football match days add crowds. Cihannüma and Ihlamurdere, a short walk uphill, are meaningfully quieter while staying within the same commute radius.</p>
          </div>
        </div>
      </section>

      <section id="registration">
        <h2 className="text-2xl font-bold mb-4">Residence permit registration status</h2>
        <div className="rounded-2xl border border-border bg-card p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Select Zones Closed</p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Beşiktaş is not uniformly open — some mahalles within the district have hit the 25% foreigner quota and are closed to new registrations, while others remain open. This is set at the mahalle level and the list changes. Verify the exact Mahalle on the title deed (TAPU) against the Directorate of Migration Management's current registry before signing — see the full{' '}
              <Link href="/guides/housing" className="text-primary font-medium hover:underline">housing guide</Link> for the step-by-step.
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Found a listing in Beşiktaş? Check it before you commit.</h3>
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
