import GuideLayout from '@/components/GuideLayout';

const UTILITIES = [
  { name: 'Water', provider: 'İSKİ (Istanbul)', note: 'Register in your name once you have your lease and ID documents; billed monthly.' },
  { name: 'Electricity', provider: 'CK Boğaziçi (European side) / Enerjisa (Asian side)', note: 'Provider depends on which side of the Bosphorus your apartment is on.' },
  { name: 'Gas (doğalgaz)', provider: 'İGDAŞ', note: 'Heating bills roughly double during winter months (Dec-Mar) — factor this into your budget.' },
  { name: 'Internet (fiber)', provider: 'TurkNet, Superonline, or Türk Telekom', note: 'Installation typically takes a few days to two weeks depending on whether the building is already wired.' },
  { name: 'Mobile', provider: 'Turkcell, Vodafone, or Türk Telekom', note: 'Remember the 120-day foreign-SIM rule if using your own phone long-term.' },
];

export const metadata = {
  title: 'Setting Up Utilities & Internet in Türkiye | Move to Istanbul',
  description: 'Getting water, gas, electric, and internet switched on in your name as a new resident of Türkiye.',
  alternates: { canonical: '/after-you-land/utilities-connectivity' },
};

export default function UtilitiesConnectivityPage() {
  return (
    <GuideLayout
      eyebrow="After You Land"
      title="Utilities & Connectivity"
      description="Getting water, gas, electric, and internet switched on in your name."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/after-you-land"
      backLabel="After You Land"
      sections={[{ id: 'table', label: 'Providers' }]}
    >
      <section id="table">
        <div className="space-y-4">
          {UTILITIES.map((u, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-baseline justify-between gap-4 mb-1.5"><h3 className="font-bold">{u.name}</h3><span className="text-xs text-muted-foreground">{u.provider}</span></div>
              <p className="text-sm text-foreground/80 leading-relaxed">{u.note}</p>
            </div>
          ))}
        </div>
      </section>
    </GuideLayout>
  );
}
