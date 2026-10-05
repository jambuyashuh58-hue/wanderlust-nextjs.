import Link from 'next/link';
import { ArrowRight, MapPin, Users, Train, Volume2, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Living in Bakırköy, Istanbul: Rent, Vibe & Who It\'s For (2026) | Move to Istanbul',
  description: 'Bakırköy neighborhood guide for foreigners — rent ranges, sub-areas like Yeşilköy and Ataköy, commute, and e-İkamet registration status.',
  alternates: { canonical: '/housing/neighborhoods/bakirkoy' },
};

const SUB_AREAS = [
  { name: 'Yeşilköy', note: 'Upscale and historic, with seaside mansions and a longstanding diplomatic community (several embassies and consular residences are nearby). The priciest and most established pocket of the district.' },
  { name: 'Ataköy', note: 'A modern, planned development with residential complexes, shopping malls, and schools — popular with families and a well-known base for foreign residents.' },
  { name: 'Zuhuratbaba', note: 'Central and comparatively affordable, with ongoing urban renewal — a reasonable entry point if the seafront pockets are out of budget.' },
  { name: 'Osmaniye & Kartaltepe', note: 'The district\'s more budget-friendly stretches, further from the coast but still within Bakırköy\'s transport network.' },
];

const PROS = [
  'Genuine seaside living on the Marmara coast without Yeşilköy or Ataköy\'s prices necessarily following you inland',
  'Family-friendly and calm — shopping malls, schools, and seaside promenades rather than a nightlife scene',
  'Strong transport links, including proximity to Istanbul Airport (Sabiha Gökçen is further; this is closer to the old Atatürk Airport site) and the coastal road into the center',
];

const CONS = [
  'Further from the historic core and the Bosphorus-facing districts than Beşiktaş or Beyoğlu',
  'Little in the way of nightlife or a cafe-culture scene compared with Kadıköy or Beyoğlu',
  'Rent and demand are noticeably uneven across the district — Yeşilköy and Ataköy cost meaningfully more than Zuhuratbaba or Osmaniye for comparable space',
];

const FAQ = [
  {
    q: 'Is Bakırköy European or Asian side?',
    a: 'European side, on the Marmara Sea coast rather than the Bosphorus — it sits west of the historic peninsula, not far from the old Atatürk Airport site. It\'s a different kind of coastal living than Beşiktaş or Kadıköy: calmer, more suburban, and less built around a ferry-commute lifestyle.',
  },
  {
    q: 'Is Bakırköy good for families?',
    a: 'Yes — it\'s one of the more consistently family-oriented districts on this list, particularly Ataköy and Yeşilköy, with established schools, shopping malls, and a generally quieter, more residential character than the central districts. It\'s described as attracting middle-to-upper-class families, retirees, and long-term professionals rather than a nightlife-seeking crowd.',
  },
  {
    q: 'Is Bakırköy open for residence permit registration?',
    a: "We weren't able to confirm Bakırköy's district-wide status with the same confidence as the districts in our main housing guide — it isn't consistently listed either way in the sources we checked. Given that, treat this as unverified rather than assume it's open: check the exact Mahalle on the title deed (TAPU) against the Directorate of Migration Management's current registry before signing anything.",
  },
];

export default function BakirkoyPage() {
  return (
    <GuideLayout
      eyebrow="Neighborhoods"
      title="Living in Bakırköy"
      description="Residential, coastal, and family-oriented — a calmer seaside alternative on the European side's Marmara coast."
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
          Bakırköy sits on the Marmara Sea coast on the European side — a residential, family-oriented district with a long history (it dates back to Byzantine-era Hebdomon) and a present-day character built around shopping malls, seaside promenades, and well-established apartment buildings rather than nightlife or tourist density. It's the calmer, more suburban coastal alternative to Beşiktaş or Kadıköy.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><MapPin className="w-3.5 h-3.5" /> European side, Marmara coast</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Users className="w-3.5 h-3.5" /> Families, retirees, established professionals</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium"><Volume2 className="w-3.5 h-3.5" /> Calm, residential</span>
        </div>
      </section>

      <section id="rent">
        <h2 className="text-2xl font-bold mb-4">Rent &amp; who it suits</h2>
        <div className="rounded-2xl border border-border bg-card p-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Avg 1+1 furnished rent</p>
          <p className="text-2xl font-bold mb-1">21,000 – 31,000 TRY</p>
          <p className="text-sm text-muted-foreground">~$600 – $900 / month</p>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-4">
          2+1 units typically run 28,000–45,000 TRY (~$800–$1,300/month), with Yeşilköy's seaside villas and luxury duplexes reaching considerably higher. These figures come from current property-market reporting rather than our own verified listings data — treat them as a directional range, not a quote.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Best for families and anyone prioritizing a calm, residential, sea-adjacent lifestyle at a noticeably lower price point than the central districts on this list. A weaker fit if you want nightlife, walkable cafe culture, or to be within easy reach of the historic core without a longer commute.
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
            <p className="text-sm text-foreground/80 leading-relaxed">The Marmaray and metro connections run along the coast toward the city center, and the coastal road (Sahil Yolu) gives reasonably direct car access, traffic depending. It's a longer trip into Beyoğlu or Beşiktaş than from Kadıköy or Şişli — plan for a real commute, not a short hop.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-sm mb-2 flex items-center gap-2"><Volume2 className="w-4 h-4 text-primary" /> Nightlife &amp; noise</p>
            <p className="text-sm text-foreground/80 leading-relaxed">Minimal nightlife by design — this is a family and retiree-friendly district built around shopping malls and seaside walks, not bars or late-night venues. Quiet is the point here, not a trade-off.</p>
          </div>
        </div>
      </section>

      <section id="registration">
        <h2 className="text-2xl font-bold mb-4">Residence permit registration status</h2>
        <div className="rounded-2xl border border-border bg-card p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Status Unverified — Check by Mahalle Before Signing</p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Unlike the districts covered in our main housing guide, we could not confirm Bakırköy's open/closed status against a reliable current source — it's a district with a sizeable existing foreign population (notably in Ataköy and Yeşilköy), which is exactly the condition that can trigger the 25% quota closure in specific mahalles. Don't assume either way: check the exact Mahalle on the title deed (TAPU) against the Directorate of Migration Management's current registry before signing. See the full{' '}
              <Link href="/guides/housing" className="text-primary font-medium hover:underline">housing guide</Link> for the step-by-step.
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Considering Bakırköy? Check the listing before you commit.</h3>
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
