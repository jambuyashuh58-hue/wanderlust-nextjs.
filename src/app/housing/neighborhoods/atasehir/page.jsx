import Link from 'next/link';
import { ArrowRight, MapPin, Users, Train, Volume2, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Living in Ataşehir, Istanbul: Rent, Vibe & Who It\'s For (2026) | Move to Istanbul',
  description: 'Ataşehir neighborhood guide for foreigners — rent ranges, sub-areas like Barbaros and İçerenköy, commute, and e-İkamet registration status.',
  alternates: { canonical: '/housing/neighborhoods/atasehir/' },
};

const SUB_AREAS = [
  { name: 'Barbaros Mahallesi', note: 'Home to the Istanbul International Finance Center (IIFC) towers — the district\'s highest-rise, most corporate stretch, with a concentration of investment-grade new builds.' },
  { name: 'Atatürk Mahallesi', note: 'Modern business-residential complexes close to the main transport interchanges — a common pick for people who want a short commute to the finance towers.' },
  { name: 'İçerenköy', note: 'Calmer and greener, with schools and hospitals nearby — the district\'s most family-oriented sub-area.' },
  { name: 'Küçükbakkalköy', note: 'Quiet residential streets with family-friendly amenities, a step down in intensity from the high-rise core.' },
];

const PROS = [
  'Modern, purpose-built housing stock — wide streets, landscaped parks, bike lanes, and newer earthquake-standard construction than most central districts',
  'A genuinely international, professional resident base, with sizeable communities from Europe and the Gulf',
  'Metro (M4) links directly into Kadıköy and across to the European side via Marmaray — a real commuter district, not an isolated suburb',
];

const CONS = [
  'Limited walkable "neighborhood" character compared to Kadıköy or Beyoğlu — it\'s built around towers and boulevards, not cafe streets',
  'Nightlife is minimal; this is a residential-and-business district, not a going-out destination',
  'Further from the historic core and the Bosphorus than the other districts on this list',
];

const FAQ = [
  {
    q: 'Is Ataşehir on the European or Asian side?',
    a: 'Asian side. It sits inland from Kadıköy, built up over the last two decades into a planned business-and-residential district rather than a historic neighborhood — closer in feel to a modern satellite city than to central Kadıköy or Beşiktaş.',
  },
  {
    q: 'Who actually lives in Ataşehir?',
    a: 'Mostly professionals working in finance, tech, and business — a large share of residents work at or near the Istanbul International Finance Center towers in Barbaros Mahallesi. It also has a meaningful population of European and Gulf expatriates and higher-income families with children, giving it a cosmopolitan, white-collar character.',
  },
  {
    q: 'Is Ataşehir open for residence permit registration?',
    a: 'Based on currently available district-level information, Ataşehir is generally treated as open, but this is tracked at the mahalle level and the list changes — we were not able to verify every individual mahalle within the district. Always check the exact Mahalle on the title deed (TAPU) against the official registry before signing; see our full housing guide for the process.',
  },
];

export default function AtasehirPage() {
  return (
    <GuideLayout
      eyebrow="Neighborhoods"
      title="Living in Ataşehir"
      description="Modern, high-rise, and corporate — a planned Asian-side business district popular with finance and tech professionals."
      readTime="6 min read"
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
          Ataşehir is a planned, modern business district on the Asian side that's transformed over roughly two decades from a quiet residential suburb into a finance and tech hub, anchored by the Istanbul International Finance Center towers. It's the pick for people who want new-build apartments, clean infrastructure, and a short commute to a corporate job over neighborhood character or nightlife.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><MapPin className="w-3.5 h-3.5" /> Asian side</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Users className="w-3.5 h-3.5" /> Finance/tech professionals, families with children</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Volume2 className="w-3.5 h-3.5" /> Quiet, minimal nightlife</span>
        </div>
      </section>

      <section id="rent">
        <h2 className="text-2xl font-bold mb-4">Rent &amp; who it suits</h2>
        <div className="rounded-2xl border border-border bg-card p-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Avg 1+1 furnished rent</p>
          <p className="text-2xl font-bold mb-1">45,000 – 59,000 TRY</p>
          <p className="text-sm text-muted-foreground">~$1,300 – $1,700 / month</p>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-4">
          2+1 units typically run 62,000–86,000 TRY (~$1,800–$2,500/month), with luxury units in the Barbaros towers reaching $4,500–$6,000/month. These figures come from current property-market reporting rather than our own verified listings data — treat them as a directional range, not a quote.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Best for professionals (especially anyone working in finance, tech, or a corporate role on the Asian side) and families wanting modern apartments, green space, and good schools, without needing to be near the historic core or the Bosphorus. A poor fit if nightlife, cafe culture, or a classic "neighborhood" feel matters to you.
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
            <p className="text-sm text-foreground/80 leading-relaxed">The M4 metro line runs through the district and connects to Kadıköy and onward to Marmaray for cross-Bosphorus trips. Built around wide boulevards and bike lanes rather than a dense walkable grid, so expect to use the metro or a car for most trips outside your immediate block.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-sm mb-2 flex items-center gap-2"><Volume2 className="w-4 h-4 text-primary" /> Nightlife &amp; noise</p>
            <p className="text-sm text-foreground/80 leading-relaxed">Quiet almost everywhere, almost always — this is a working and residential district, not an evening destination. If you want bars and late-night food on your doorstep, Kadıköy (a short metro ride away) is the better base.</p>
          </div>
        </div>
      </section>

      <section id="registration">
        <h2 className="text-2xl font-bold mb-4">Residence permit registration status</h2>
        <div className="rounded-2xl border border-border bg-card p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Reported Open — Verify by Mahalle</p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Current third-party reporting lists Ataşehir as open for new foreign registrations, but we have lower confidence in this than in the districts covered in our main housing guide, since status is set mahalle by mahalle and changes without much notice. Treat this as a starting point, not a guarantee — check the exact Mahalle on the title deed (TAPU) against the Directorate of Migration Management's current registry before signing. See the full{' '}
              <Link href="/guides/housing" className="text-primary font-medium hover:underline">housing guide</Link> for the step-by-step.
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Considering Ataşehir? Check the listing before you commit.</h3>
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
