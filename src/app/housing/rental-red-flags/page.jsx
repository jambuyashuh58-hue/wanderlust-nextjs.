import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

const RED_FLAGS = [
  { title: 'Asked to pay a deposit before viewing in person', body: 'A legitimate landlord or agent in Istanbul\'s market doesn\'t need payment before you\'ve seen the unit — this is one of the most common scam patterns targeting foreigners searching remotely.' },
  { title: 'Listing price in USD/EUR, well above comparable local listings', body: 'Legitimate long-term rentals are priced in TRY. A unit priced and quoted only in foreign currency, significantly above the neighborhood\'s TRY-equivalent range, is usually targeting tourists or scam-susceptible foreigners rather than long-term residents.' },
  { title: 'Landlord unwilling to notarize the lease', body: 'A notarized lease is standard practice and required for your residence permit application. Reluctance here is a serious red flag, not a minor inconvenience.' },
  { title: 'No verifiable UAVT address code', body: 'Every registered residential address has one. If the landlord can\'t or won\'t provide it, the building may not be properly registered — which will block your residence permit application regardless of how good the apartment is.' },
  { title: 'Pressure to decide and wire money same-day', body: 'Istanbul\'s rental market moves fast in popular areas, but genuine urgency looks like "other viewings are booked this week," not "wire the deposit in the next hour or lose it."' },
];

export const metadata = {
  title: 'Rental Scam & Red Flag Checklist for Türkiye | Move to Istanbul',
  description: 'The listing and landlord patterns that mean walk away when renting an apartment in Türkiye as a foreigner.',
  alternates: { canonical: '/housing/rental-red-flags' },
};

export default function RentalRedFlagsPage() {
  return (
    <GuideLayout
      eyebrow="Housing"
      title="Rental Red Flags"
      description="The listing and landlord patterns that mean walk away."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/housing"
      backLabel="Housing"
      sections={[{ id: 'flags', label: 'Red flags' }]}
    >
      <section id="flags">
        <div className="space-y-5">
          {RED_FLAGS.map((f, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 flex gap-4">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1.5">{f.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want pre-screened listings instead?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Housing Shortlist File is pre-screened for foreigner-friendly landlords, so these checks are already done for you.</p>
        <Link href="/services/housing-shortlist-file" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Housing Shortlist File <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
