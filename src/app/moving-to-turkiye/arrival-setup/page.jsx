import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'First-Week Arrival Setup in Türkiye | Move to Istanbul',
  description: 'The logistics that only make sense once you\'re physically in Türkiye: SIM/phone registration, IstanbulKart, banking, and your tax ID number.',
  alternates: { canonical: '/moving-to-turkiye/arrival-setup/' },
};

const STEPS = [
  {
    title: 'Mobile SIM — and the 120-day phone rule',
    body: 'A foreign smartphone running a local Turkish SIM (Turkcell, Vodafone, Türk Telekom) works for 120 cumulative days per calendar year before the IMEI registry locks the SIM slot. Past that, you either register the phone via e-Devlet and pay a registration tax (often $1,000+ USD), or use a global eSIM / a cheap secondary local phone instead.',
  },
  {
    title: 'IstanbulKart for transit',
    body: 'Buy a physical card at yellow kiosks in the airport or any metro station — it covers metro, tram, Marmaray rail, and the Bosphorus ferries. Once you have your residence permit ID (the YKN number, starting with 99), register the card online to unlock discounted monthly passes and protect your balance if it\'s lost.',
  },
  {
    title: 'Get your tax ID number',
    body: 'Your Potential Tax ID Number (generated via ivd.gib.gov.tr) is needed for almost everything administrative that follows — opening a bank account, the residence permit application, and some utility contracts. Get this early in your first week.',
  },
  {
    title: 'Open a Turkish bank account (if needed)',
    body: 'Not everyone needs one immediately — many residents run on a multi-currency account (Wise/Revolut) plus cash for longer than expected. But a local account is often required to pay rent by transfer or to register for certain utilities, and needs your tax ID number and (for some banks) proof of address first.',
  },
  {
    title: 'Avoid the ATM currency-conversion trap',
    body: 'Turkish ATMs often ask "charge in your home currency or TRY?" — always choose TRY / decline conversion. Picking your home currency triggers Dynamic Currency Conversion, a hidden markup of 8-15% versus the real exchange rate.',
  },
];

const FAQ = [
  {
    q: 'What order should I do these in during my first week?',
    a: 'Tax ID number first (it unlocks almost everything else), then SIM/eSIM decision, then IstanbulKart, then banking if you need it. The residence permit application itself usually comes slightly later, once you have a notarized lease.',
  },
];

export default function ArrivalSetupPage() {
  return (
    <GuideLayout
      eyebrow="Moving to Türkiye"
      title="Arrival Setup"
      description="The first-week logistics that only make sense once you're physically here."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/moving-to-turkiye"
      backLabel="Moving to Türkiye"
      sections={[{ id: 'steps', label: 'First-week steps' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="steps">
        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">What comes after arrival setup?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The after-you-land cluster covers your first 24 hours through your first 30 days in more detail.</p>
        <Link href="/after-you-land" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See After You Land <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
