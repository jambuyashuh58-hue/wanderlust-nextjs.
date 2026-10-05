import Link from 'next/link';
import { ArrowRight, MapPin, Users, Train, Volume2, XCircle, CheckCircle2 } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Living in Fatih, Istanbul: Rent, Vibe & Registration Status (2026) | Move to Istanbul',
  description: 'Fatih neighborhood guide for foreigners — rent ranges, sub-areas like Fener and Balat, commute, and why most of Fatih is closed to new e-İkamet registrations.',
  alternates: { canonical: '/housing/neighborhoods/fatih' },
};

const SUB_AREAS = [
  { name: 'Sultanahmet', note: 'The historic tourist core — Hagia Sophia, the Blue Mosque, Topkapı Palace. Almost entirely short-let and tourist accommodation rather than long-term residential stock.' },
  { name: 'Fener & Balat', note: 'Colorful, historic waterfront neighborhoods on the Golden Horn, popular on Instagram and increasingly with gentrification — some of the more residential pockets of the district, but still subject to the same closed status.' },
  { name: 'Aksaray', note: 'Dense, commercial, and known for its transient and immigrant population — one of the highest-foreign-population areas in the district, which is itself part of why registration is closed here.' },
  { name: 'Çarşamba', note: 'Conservative, traditional, residential, and largely untouched by the tourist districts nearby — cheapest rents in Fatih, but furthest from any realistic registration path.' },
];

const PROS = [
  'The cheapest rent on this list by a wide margin — genuinely historic buildings and streetscapes',
  'Unmatched walkability to Istanbul\'s major historic sites and the Grand Bazaar',
  'Tram and ferry connections along the peninsula are frequent and cheap',
];

const CONS = [
  'Closed to new foreign residence permit registrations across effectively the whole district — this is the single biggest issue, and it is not negotiable with a landlord',
  'Older building stock, often without elevators, modern insulation, or earthquake-reinforced structure',
  'Heavy tourist density in Sultanahmet specifically makes day-to-day life feel transient rather than residential',
];

const FAQ = [
  {
    q: 'Can I rent an apartment in Fatih even though it\'s closed for registration?',
    a: 'You can sign a lease and live there, but you will not be able to use that address to register or renew a short-term residence permit (e-İkamet) — the Directorate of Migration Management will reject the application because the district has exceeded the 25% foreigner population threshold. If you need a residence permit, this is disqualifying regardless of how good the apartment or price is.',
  },
  {
    q: 'Why is Fatih so cheap compared to Kadıköy or Şişli?',
    a: 'Older, often unrenovated building stock, a historic street layout not built for cars, and — not least — the fact that it\'s closed to new foreign registrations, which removes a large pool of foreign renters who would otherwise bid rents up. The closed status itself is part of why prices stay low.',
  },
  {
    q: 'Is there any part of Fatih that\'s open for registration?',
    a: 'As of the most recent Directorate of Migration Management data, the district is treated as fully closed for new foreign registrations — we have not found an open mahalle within Fatih. Always verify current status directly on the registry before assuming any specific address is an exception.',
  },
];

export default function FatihPage() {
  return (
    <GuideLayout
      eyebrow="Neighborhoods"
      title="Living in Fatih"
      description="Historic, cheap, and walkable to Istanbul's major sights — but effectively closed to new foreign residence permit registrations."
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
          Fatih is the historic peninsula — Sultanahmet, Fener, Balat, the Grand Bazaar — and by far the cheapest district on this list. It's also the one with a single disqualifying issue for most foreigners who need a residence permit: it's closed to new registrations across effectively the whole district under the 25% foreigner quota rule. Read the registration section before you fall for the rent prices.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><MapPin className="w-3.5 h-3.5" /> European side, historic peninsula</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Users className="w-3.5 h-3.5" /> Budget renters without a registration need, short-let visitors</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Volume2 className="w-3.5 h-3.5" /> Tourist-heavy in the core, quieter further out</span>
        </div>
      </section>

      <section id="rent">
        <h2 className="text-2xl font-bold mb-4">Rent &amp; who it suits</h2>
        <div className="rounded-2xl border border-border bg-card p-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Avg 1+1 furnished rent</p>
          <p className="text-2xl font-bold mb-1">18,000 – 30,000 TRY</p>
          <p className="text-sm text-muted-foreground">~$500 – $900 / month</p>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Only really makes sense for people who don't need to register an address for a residence permit — citizens, long-term permit holders already registered elsewhere, or anyone here on a short-let basis. If you're applying for or renewing an e-İkamet, this is the one district on this list where the rent price is almost irrelevant to the decision.
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
            <p className="text-sm text-foreground/80 leading-relaxed">The T1 tram runs the length of the peninsula and connects to Karaköy and the Galata Bridge area. Ferries from Eminönü reach both Asian-side and Bosphorus destinations. Good for sightseeing-adjacent living, less built for a typical office commute to the newer business districts.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-sm mb-2 flex items-center gap-2"><Volume2 className="w-4 h-4 text-primary" /> Nightlife &amp; noise</p>
            <p className="text-sm text-foreground/80 leading-relaxed">Sultanahmet is loud with tourist foot traffic by day and quiet by night (it's not a nightlife district). Fener, Balat, and Çarşamba are residential and quiet year-round. There's little in the way of a bar or late-night scene anywhere in Fatih.</p>
          </div>
        </div>
      </section>

      <section id="registration">
        <h2 className="text-2xl font-bold mb-4">Residence permit registration status</h2>
        <div className="rounded-2xl border border-border bg-card p-5 flex items-start gap-3">
          <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">🚫 Fully Closed (effectively district-wide)</p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Fatih has exceeded the 25% foreigner population threshold across effectively the whole district, including Sultanahmet, Fener, Balat, Aksaray, and Çarşamba. New e-İkamet applications tied to a Fatih address are rejected outright. If a residence permit is part of your plan, treat this district as off the table and verify any claim otherwise directly against the{' '}
              <Link href="/guides/housing" className="text-primary font-medium hover:underline">current registry</Link> before trusting it.
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Need a registration-eligible neighborhood instead?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Compare Fatih against the other six districts in our <Link href="/housing/neighborhoods" className="text-primary font-medium hover:underline">neighborhoods hub</Link>, or let us pre-screen listings in open zones only.
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
