import Link from 'next/link';
import { ArrowRight, MapPin, Users, Train, Volume2, CheckCircle2, XCircle } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Living in Kadıköy, Istanbul: Rent, Vibe & Who It\'s For (2026) | Move to Istanbul',
  description: 'Kadıköy neighborhood guide for foreigners — rent ranges, sub-areas like Moda and Caferağa, commute, nightlife, and e-İkamet registration status.',
  alternates: { canonical: '/housing/neighborhoods/kadikoy' },
};

const SUB_AREAS = [
  { name: 'Moda', note: 'The flagship pick for expats — seafront park, cafes, independent bookshops, and the calmest streets in the district. Highest rent premium within Kadıköy.' },
  { name: 'Caferağa', note: 'Right behind the main ferry terminal and Bahariye walking street. Dense, lively, and the most walkable patch of the district — bars, restaurants, and the Tuesday pazar.' },
  { name: 'Fenerbahçe', note: 'Quieter and more residential, with its own stretch of coastal park. A step down in nightlife, a step up in peace, similar rent to Moda.' },
  { name: 'Koşuyolu', note: 'Inland, leafier, and noticeably cheaper than the coastal pockets — popular with families who still want Kadıköy\'s ferry and metro access.' },
];

const PROS = [
  'Genuinely walkable — groceries, cafes, the ferry, and a park are a 10-minute walk from most addresses',
  'Direct ferry to both Beşiktaş and Karaköy (European side), avoiding bridge traffic entirely',
  'The strongest independent food, bar, and live-music scene on the Asian side',
  'Marmaray and M4 metro connections for cross-city commutes without a ferry',
];

const CONS = [
  'Rent has risen fastest here of any Asian-side district over the past three years',
  'Weekend crowds in Caferağa and around Bahariye get loud late — not the pick if you need quiet nights',
  'Parking is scarce and mostly paid; a car is a liability more than an asset here',
];

const FAQ = [
  {
    q: 'Is Kadıköy on the European or Asian side?',
    a: 'Asian side. It\'s the Asian-side equivalent of Beşiktaş or Beyoğlu in terms of profile — dense, walkable, and the default pick for expats who want Asian-side life without feeling cut off from the center. The ferry to Beşiktaş or Karaköy takes about 20–25 minutes.',
  },
  {
    q: 'Which is better for a foreigner, Moda or Caferağa?',
    a: 'Moda is calmer, greener, and slightly more expensive — better if you want quiet and don\'t mind a short walk to the action. Caferağa puts you in the middle of the bars, restaurants, and the ferry terminal, at a marginally lower rent, but with more street noise, especially on weekends.',
  },
  {
    q: 'Is Kadıköy open for residence permit registration?',
    a: 'Most of Kadıköy remains open, but status is set mahalle by mahalle, not district-wide, and it changes. Always verify the exact Mahalle on the official closed-neighborhood registry before signing anything — see our full housing guide for the check.',
  },
];

export default function KadikoyPage() {
  return (
    <GuideLayout
      eyebrow="Neighborhoods"
      title="Living in Kadıköy"
      description="Vibrant, bohemian, highly walkable — the Asian side's answer to Beyoğlu, built around a ferry terminal and a seafront park."
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
          Kadıköy is the Asian-side district most foreigners end up in, and usually for the same reasons: it's genuinely walkable, it has a real cafe and bar culture that isn't built for tourists, and the ferry puts the European side within 20 minutes without touching bridge traffic. It functions as its own small city — most days you won't need to cross the Bosphorus at all.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><MapPin className="w-3.5 h-3.5" /> Asian side</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Users className="w-3.5 h-3.5" /> Young professionals, creatives, remote workers</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Volume2 className="w-3.5 h-3.5" /> Lively, loudest near the ferry terminal</span>
        </div>
      </section>

      <section id="rent">
        <h2 className="text-2xl font-bold mb-4">Rent &amp; who it suits</h2>
        <div className="rounded-2xl border border-border bg-card p-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Avg 1+1 furnished rent</p>
          <p className="text-2xl font-bold mb-1">35,000 – 55,000 TRY</p>
          <p className="text-sm text-muted-foreground">~$1,000 – $1,600 / month</p>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Best for young professionals and remote workers who want a real neighborhood life without the price tag of Şişli or Beşiktaş, and for anyone who'd rather commute by ferry than by car. Less of a fit for families wanting a quiet, car-friendly suburb — Koşuyolu aside, most of Kadıköy is dense and designed for walking, not driving.
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
            <p className="text-sm text-foreground/80 leading-relaxed">Ferries to Beşiktaş, Karaköy, and Eminönü run frequently and take 20–25 minutes — the single biggest reason people choose Kadıköy over other Asian-side districts. The Marmaray line and M4 metro cover the inland and cross-Bosphorus commute when the ferry isn't running or the weather's bad.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-sm mb-2 flex items-center gap-2"><Volume2 className="w-4 h-4 text-primary" /> Nightlife &amp; noise</p>
            <p className="text-sm text-foreground/80 leading-relaxed">Genuinely lively — live music venues, bars, and late-night food around Caferağa and Bahariye. Moda and Fenerbahçe are noticeably quieter once you're a few streets back from the coast. Not the district to pick if you need silence after 11pm.</p>
          </div>
        </div>
      </section>

      <section id="registration">
        <h2 className="text-2xl font-bold mb-4">Residence permit registration status</h2>
        <div className="rounded-2xl border border-border bg-card p-5 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Mostly Open</p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Most of Kadıköy's mahalles are open under the 25% foreigner quota rule, but this is tracked at the mahalle level and the list changes. Before signing anything, check the exact Mahalle named on the title deed (TAPU) against the Directorate of Migration Management's current registry — see the full{' '}
              <Link href="/guides/housing" className="text-primary font-medium hover:underline">housing guide</Link> for the step-by-step.
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Found a listing in Kadıköy? Check it before you commit.</h3>
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
