import Link from 'next/link';
import { CheckCircle2, AlertTriangle, Smartphone, ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'eSIM vs. Local SIM Card in Türkiye: 2026 Comparison & Setup Guide | Move to Istanbul',
  description: 'The 120-day IMEI registration rule, a head-to-head eSIM vs. local SIM comparison, the airport SIM trap, and the hybrid strategy long-term expats actually use.',
};

const COMPARISON = [
  { feature: 'Best For', esim: 'First 1–14 days, airport arrival, short stays', local: 'Long-term stays (30+ days), banking, residence permits' },
  { feature: 'Setup Location', esim: 'Buy & activate online before landing', local: 'Physical store in Türkiye (passport required)' },
  { feature: 'Local (+90) Phone Number', esim: 'Data only — no local voice/SMS', local: 'Yes — includes a local Turkish +90 number' },
  { feature: 'Bank OTP & Bureaucracy Support', esim: 'Cannot receive SMS OTPs', local: 'Yes — mandatory for Turkish banks, e-Devlet, e-İkamet' },
  { feature: 'Average Cost', esim: '$4.50 – $26.00 (1GB to unlimited)', local: '400 – 800 TRY (~$12–$25) in city center' },
  { feature: 'Airport Price Risk', esim: 'None — fixed global pricing', local: 'High airport markup at IST/SAW ($60–$80)' },
  { feature: 'Tourist SIM Expiry', esim: 'Valid for purchased package duration', local: 'Deactivates after 90 days unless converted with an İkamet card' },
];

const HYBRID_STEPS = [
  'Install a 1–3GB eSIM before your flight',
  'Land at IST/SAW with instant connectivity',
  'Buy a local Turkcell/Vodafone SIM in the city center',
  'Convert the tourist SIM to a residential plan once you receive your İkamet',
];

const CONNECTIVITY_CHECKLIST = [
  'Before flying: verify your phone is carrier-unlocked and eSIM-compatible.',
  'Before flying: download an eSIM profile with 1–3GB data for immediate airport arrival use.',
  'Arrival day: decline $60–$80 airport SIM offers; use your eSIM for taxi/transit data.',
  'Days 2–5: purchase a local SIM card (+90 number) at a city-center store using your passport.',
  'Long stays (120+ days): track your 120-day IMEI clock per SIM slot to avoid network shutoff.',
];

const FAQ = [
  {
    q: 'What is the 120-day IMEI rule in Türkiye?',
    a: 'Any foreign mobile device using a local Turkish SIM network (physical or eSIM) can operate for up to 120 days per calendar year without paying the national IMEI registration tax (MCKS / BTK registration). After 120 days, the phone’s hardware identifier (IMEI) is blocked from Turkish mobile towers until the tax is paid or you leave the country.',
  },
  {
    q: 'Can I use eSIM and a physical SIM to get more than 120 days?',
    a: 'Yes, with a dual-SIM or eSIM-capable phone. Each SIM slot has its own distinct IMEI number, so using the physical SIM slot gives you 120 days, and switching to the eSIM slot afterward gives you another 120 days — up to 240 days per calendar year across both.',
  },
  {
    q: 'Why do I need a local +90 number if I already have an eSIM?',
    a: "Because eSIMs from providers like Airalo or Holafly are data-only — they can't receive SMS. A local +90 number is required for Turkish bank account 2FA/OTP codes, Göç İdaresi and PTT residency notifications and UAVT codes, and local apps like Getir, Yemeksepeti, BiTaksi, and Sahibinden.",
  },
  {
    q: 'How do I avoid the airport SIM card markup?',
    a: 'Install a low-cost 1–3GB eSIM before you fly and use it for airport navigation, messaging, and booking a taxi or ride to your accommodation. Airport kiosks at IST and SAW commonly charge $60–$80 for basic tourist SIM packages that cost $12–$25 at a city-center Turkcell or Vodafone store.',
  },
  {
    q: 'When should I convert my tourist SIM to a residential plan?',
    a: 'Once your residence permit card (e-İkamet) is delivered, visit your mobile operator’s store within 90 days to convert your temporary tourist line into a standard monthly postpaid or prepaid residential contract — tourist SIMs deactivate after 90 days otherwise.',
  },
];

export default function EsimVsLocalSimGuidePage() {
  return (
    <GuideLayout
      eyebrow="Connectivity Guide"
      title="eSIM vs. Local SIM Card in Türkiye: 2026 Comparison & Setup Guide"
      description="The 120-day IMEI rule, a head-to-head comparison, the airport SIM trap, and the hybrid strategy that actually works."
      readTime="6 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[
        { id: 'overview', label: 'IMEI Registration Rule' },
        { id: 'comparison', label: 'eSIM vs. Local SIM' },
        { id: 'trap', label: 'The Airport SIM Trap' },
        { id: 'why-local', label: 'Why You Need a +90 Number' },
        { id: 'strategy', label: 'Hybrid Strategy' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      {/* Overview */}
      <section id="overview">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Smartphone className="w-5 h-5 text-primary" /> Mobile Data & The Turkish IMEI Registration Rule</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Setting up mobile internet in Türkiye involves more than picking a data plan. Foreigners bringing an unregistered foreign phone into Türkiye encounter telecommunications regulations overseen by the Information and Communication Technologies Authority (BTK).
        </p>
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <p className="text-sm text-foreground/80 leading-relaxed"><strong>The rule:</strong> any foreign mobile device using a local Turkish SIM network (physical or eSIM) can operate for up to 120 days per calendar year without paying the national IMEI Registration Tax (MCKS / BTK Registration).</p>
          <p className="text-sm text-foreground/80 leading-relaxed"><strong>Network blocking:</strong> after 120 days, the phone&apos;s IMEI is blocked from registering on Turkish mobile towers (Turkcell, Vodafone, Türk Telekom) until the tax is paid or you leave the country.</p>
          <p className="text-sm text-foreground/80 leading-relaxed"><strong>Dual-SIM workaround:</strong> dual-SIM or eSIM-capable phones have two distinct IMEI numbers. Using the physical SIM slot gives you 120 days; switching to the eSIM slot afterward gives you another 120 days — up to 240 days per calendar year.</p>
        </div>
        <p className="text-xs text-foreground/70 leading-relaxed bg-muted/50 rounded-lg p-3 mt-4">
          Deciding whether to just pay the registration tax instead? See our <Link href="/guides/phone-registration-tax-turkey" className="text-primary font-medium hover:underline">Phone Registration Tax guide</Link> for the actual 2026 cost breakdown and the official payment process for residents.
        </p>
      </section>

      {/* Comparison table */}
      <section id="comparison">
        <h2 className="text-2xl font-bold mb-4">Head-to-Head Comparison: eSIM vs. Local Physical SIM</h2>
        <div className="lg:hidden space-y-3">
          {COMPARISON.map((row) => (
            <div key={row.feature} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-semibold text-sm mb-2">{row.feature}</p>
              <dl className="space-y-2 text-sm">
                <div><dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">International eSIM</dt><dd className="text-foreground/80">{row.esim}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Local Physical SIM</dt><dd className="text-foreground/80">{row.local}</dd></div>
              </dl>
            </div>
          ))}
        </div>
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Feature</th>
                <th className="px-4 py-3 font-semibold">International eSIM (Airalo / Holafly)</th>
                <th className="px-4 py-3 font-semibold">Local SIM (Turkcell / Vodafone / Türk Telekom)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="align-top">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{row.feature}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.esim}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.local}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Airport trap */}
      <section id="trap">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-destructive" /> The &quot;Airport Tourist SIM Trap&quot; vs. City Center Purchase</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          One of the most common budget pitfalls for new arrivals happens at New Istanbul Airport (IST) and Sabiha Gökçen Airport (SAW): mobile operator kiosks in the arrival halls charge heavily inflated &quot;tourist package&quot; prices — frequently $60 to $80 USD for basic 20GB tourist SIM cards.
        </p>
        <div className="rounded-lg bg-success/10 border border-success/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-success mb-1">The Smart Alternative</p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Install a 1GB–3GB regional eSIM before departing for Istanbul and use it for airport navigation, messaging, and booking a BiTaksi or Uber to your accommodation. Once settled, visit an official Turkcell or Vodafone branch in Kadıköy, Beşiktaş, Taksim, or Şişli for a local tourist SIM at official retail rates (400–800 TRY).
          </p>
        </div>
      </section>

      {/* Why local number */}
      <section id="why-local">
        <h2 className="text-2xl font-bold mb-4">Why Long-Term Expats Need a Local +90 Number</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          While data-only eSIMs work well for short trips, living in Istanbul requires a local Turkish phone number for daily digital infrastructure:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">Banking & OTP</p>
            <p className="text-xs text-muted-foreground">Garanti, Ziraat, and Kuveyt Türk all require 2FA SMS codes to a Turkish number to open an account.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">e-İkamet & Address Codes</p>
            <p className="text-xs text-muted-foreground">The Migration Directorate and PTT issue status notifications and address codes exclusively via SMS to local numbers.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">Daily Apps</p>
            <p className="text-xs text-muted-foreground">Getir, Yemeksepeti, BiTaksi, and Sahibinden all require a +90 number for courier confirmation and account activation.</p>
          </div>
        </div>
      </section>

      {/* Hybrid strategy */}
      <section id="strategy">
        <h2 className="text-2xl font-bold mb-4">Recommended Hybrid Strategy for Nomads & Expats</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">To balance cost, convenience, and long-term functionality, follow this 4-step mobile strategy:</p>
        <ol className="space-y-3">
          {HYBRID_STEPS.map((step, i) => (
            <li key={step} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
              <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
              <span className="text-sm text-foreground/80 leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Setting Up Your Whole First Week?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Connectivity is one line item in a longer first-week checklist — tax number, bank account, housing, and e-İkamet filing all need to happen in sequence. Our concierge service can walk you through the full setup.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Concierge Plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Checklist */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Connectivity Checklist for New Arrivals</h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-3">
            {CONNECTIVITY_CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span>{item}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">What travelers and new arrivals ask most often about getting connected in Türkiye.</p>
        <GuideFAQ items={FAQ} />
        <p className="text-xs text-muted-foreground leading-relaxed mt-6">Page last updated {new Date().toISOString().slice(0, 10)}. Pricing and IMEI regulations change periodically — confirm current rates with your operator and current rules via BTK before relying on them.</p>
      </section>
    </GuideLayout>
  );
}
