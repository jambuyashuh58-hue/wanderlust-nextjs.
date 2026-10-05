import Link from 'next/link';
import { ArrowRight, MapPin, Users, Train, Volume2, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Living in Şişli, Istanbul: Rent, Vibe & Who It\'s For (2026) | Move to Istanbul',
  description: 'Şişli neighborhood guide for foreigners — rent ranges, sub-areas like Bomonti and Nişantaşı, commute, nightlife, and e-İkamet registration status.',
  alternates: { canonical: '/housing/neighborhoods/sisli' },
};

const SUB_AREAS = [
  { name: 'Nişantaşı', note: 'Istanbul\'s upscale shopping and dining district — designer boutiques, specialty grocers, and the highest rent premium in Şişli. Popular with established expats and executives.' },
  { name: 'Bomonti', note: 'A former brewery district turned creative hub — converted industrial buildings, craft bars, and noticeably more affordable than neighboring Nişantaşı while still feeling central.' },
  { name: 'Teşvikiye', note: 'Quiet, leafy, and adjacent to Nişantaşı\'s shopping streets without the same foot traffic — a common pick for families wanting upscale but calm.' },
  { name: 'Mecidiyeköy', note: 'The district\'s transport and business hub — high-rise towers, metro and metrobüs interchange, dense and functional rather than charming.' },
];

const PROS = [
  'Modern housing stock — more new-build, well-insulated apartments than the historic peninsula districts',
  'Best shopping, international grocery, and healthcare access in the city (several major private hospitals sit within the district)',
  'Strong metro and metrobüs coverage makes cross-city commutes genuinely fast',
];

const CONS = [
  'The most expensive district on this list — Nişantaşı rents can run well past the upper end of the district average',
  'Mecidiyeköy and the main boulevards are heavy traffic corridors with constant noise',
  'Less of the independent cafe/neighborhood feel that draws people to Kadıköy or Beyoğlu',
];

const FAQ = [
  {
    q: 'Is Şişli a good fit for families?',
    a: 'Yes, more so than most central districts — Teşvikiye and the quieter parts of Nişantaşı offer modern apartments, good schools nearby, and easy access to private hospitals, without the nightlife density of Beyoğlu or Beşiktaş. Budget is the main constraint, not suitability.',
  },
  {
    q: 'Why is Bomonti cheaper than the rest of Şişli?',
    a: 'Bomonti developed later as a creative/industrial-conversion district rather than an established upscale residential one, so rents sit noticeably below Nişantaşı and Teşvikiye for comparable space, while still being inside the same district and transport network.',
  },
  {
    q: 'Is Şişli open for residence permit registration?',
    a: 'Status varies by mahalle — some zones within Şişli are closed under the 25% quota rule, others remain open. This changes over time, so always verify the specific Mahalle named on the title deed against the official registry before signing; see our full housing guide for the check.',
  },
];

export default function SisliPage() {
  return (
    <GuideLayout
      eyebrow="Neighborhoods"
      title="Living in Şişli"
      description="Modern, upscale, and business-oriented — high-rise condos, Istanbul's best shopping, and the city's main hospital corridor."
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
          Şişli is Istanbul's business-and-shopping district as much as a residential one — high-rise condos, the Nişantaşı retail strip, and a concentration of major private hospitals that makes it the default choice for expats prioritizing modern infrastructure over neighborhood charm. It's the most "Western-feeling" central district, for better or worse depending on what you're after.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><MapPin className="w-3.5 h-3.5" /> European side</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Users className="w-3.5 h-3.5" /> Executives, families, established expats</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Volume2 className="w-3.5 h-3.5" /> Busy on main streets, calm in Teşvikiye</span>
        </div>
      </section>

      <section id="rent">
        <h2 className="text-2xl font-bold mb-4">Rent &amp; who it suits</h2>
        <div className="rounded-2xl border border-border bg-card p-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Avg 1+1 furnished rent</p>
          <p className="text-2xl font-bold mb-1">45,000 – 75,000 TRY</p>
          <p className="text-sm text-muted-foreground">~$1,300 – $2,200 / month</p>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Best for families and professionals who want modern building standards, proximity to top private healthcare, and don't mind paying the highest rent on this list for it. Budget-conscious remote workers and anyone chasing neighborhood character over polish will likely find better value in Kadıköy or Beyoğlu.
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
            <p className="text-sm text-foreground/80 leading-relaxed">Mecidiyeköy is a major metro and metrobüs interchange, making Şişli one of the fastest districts to commute from in either direction along the city's main transit spine. Taksim and Beşiktaş are both a short ride away.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-sm mb-2 flex items-center gap-2"><Volume2 className="w-4 h-4 text-primary" /> Nightlife &amp; noise</p>
            <p className="text-sm text-foreground/80 leading-relaxed">Lighter on nightlife than Beyoğlu or Kadıköy — Bomonti has a growing bar scene, but most of the district winds down by late evening. Traffic noise on the main boulevards (especially near Mecidiyeköy) is the bigger issue than nightlife noise.</p>
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
              Şişli has some mahalles closed under the 25% foreigner quota rule and others open — this is tracked at the mahalle level, not district-wide, and changes over time. Confirm the exact Mahalle on the title deed (TAPU) against the Directorate of Migration Management's current registry before signing — see the full{' '}
              <Link href="/guides/housing" className="text-primary font-medium hover:underline">housing guide</Link> for the step-by-step.
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Found a listing in Şişli? Check it before you commit.</h3>
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
