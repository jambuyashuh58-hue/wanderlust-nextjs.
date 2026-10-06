import Link from 'next/link';
import { CheckCircle2, AlertTriangle, Smartphone, ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

// Distinct from /guides/esim-vs-local-sim-turkey (which compares eSIM vs
// physical SIM day-to-day use) -- this page targets the "should I just pay
// the tax" decision itself: the actual 2026 cost table, the formal
// registration process for residents, and the 240-day workaround in detail.
// Heavily cross-linked both ways to avoid the two competing for the same
// query.
export const metadata = {
  title: 'Phone Registration Tax in Türkiye (2026): IMEI Lock Rules & How to Avoid Paying It | Move to Istanbul',
  description: 'The 120-day IMEI rule, 2026 registration tax costs, the 240-day dual-SIM workaround, and the official registration process for residents.',
  alternates: { canonical: '/guides/phone-registration-tax-turkey' },
};

const OPTIONS = [
  { option: 'Pay Official IMEI Registration Tax', cost: '~31,600 – 45,000 TRY (~$900 – $1,300+)', bestFor: 'Long-term residents (2+ years) with high-end flagship phones', drawback: 'High fee; device becomes linked to your passport & YKN tax ID for 3 years (cannot swap in another person’s SIM).' },
  { option: '240-Day Dual-SIM / eSIM Strategy', cost: '$15 – $40 (eSIM data plans)', bestFor: 'Digital nomads, seasonal expats, short-term residents (<8 months)', drawback: 'Requires an unlocked dual-SIM phone (physical SIM + eSIM).' },
  { option: 'Buy a Budget Local "Secondary" Phone', cost: '6,000 – 12,000 TRY (~$180 – $350)', bestFor: 'Expats needing a dedicated +90 local line for banking & apps', drawback: 'Carrying two physical devices (local phone doubles as a Wi-Fi hotspot).' },
];

const DUAL_SIM_STEPS = [
  'Days 1–120: insert a local Turkish physical SIM into Physical Slot 1 (IMEI 1). Use local mobile data and your +90 number normally.',
  'Day 121: when BTK blocks IMEI 1, convert your local line to an eSIM profile at a Turkcell or Vodafone store, or activate an international eSIM (Airalo/Holafly) on eSIM Slot 2 (IMEI 2).',
  'Days 121–240: IMEI 2 gives you another 120-day countdown on the same hardware — 8 months of continuous connectivity in total.',
];

const TAX_PAYMENT_STEPS = [
  { title: 'Check Your Passport Entry Stamp', body: 'Must be within 365 days of your entry to Türkiye — this is the registration window.' },
  { title: 'Obtain Your e-Devlet Password', body: 'Get this from any PTT (post office) branch using your passport and foreigner ID (YKN).' },
  { title: 'Pay the IMEI Registration Fee', body: 'Pay via e-Devlet or in person at the Tax Office (Vergi Dairesi).' },
  { title: 'Register Your IMEI Numbers', body: 'Must match the exact passport name and Foreigner ID Number (YKN) that entered Türkiye within the last 365 days.' },
];

const CHECKLIST = [
  'Check device unlocked status: ensure your smartphone is carrier-unlocked before leaving your home country.',
  'Find both IMEI numbers: dial *#06# on your keypad to write down both IMEI 1 and IMEI 2.',
  'Track your arrival date: mark calendar day 120 from the date you first inserted a local Turkish SIM card.',
  'Set up travel data: install an international data eSIM (Airalo/Holafly) before landing at IST or SAW.',
  'Evaluate long-term plans: under 8 months, use the 240-day dual-SIM method; multi-year, compare the IMEI tax cost against buying a local Turkish phone.',
];

const FAQ = [
  {
    q: 'What exactly happens on day 121 if I don’t pay the IMEI tax?',
    a: 'The Information and Communication Technologies Authority (BTK) automatically blocks your phone’s IMEI from connecting to Turkish cellular networks (Turkcell, Vodafone, Türk Telekom). Your phone shows "No Service" on local networks specifically — Wi-Fi and foreign roaming SIMs still work normally.',
  },
  {
    q: 'Does the 120-day allowance reset every year?',
    a: 'Yes, for devices that haven’t been blocked yet. The countdown is tied to the calendar year, so on January 1st each unblocked device’s 120-day allowance resets automatically. A device already blocked stays blocked until the tax is paid, regardless of the new year.',
  },
  {
    q: 'How much does the official IMEI registration tax cost in 2026?',
    a: 'Roughly 31,600–45,000 TRY (about $900–$1,300+), depending on the device. This has risen sharply in recent years, which is why the 240-day dual-SIM strategy or buying a cheap local secondary phone are usually the better option for anyone not committing to Türkiye for 2+ years.',
  },
  {
    q: 'Can I really get 240 days of local service without paying the tax?',
    a: "Yes, if your phone supports dual-SIM (one physical SIM slot plus one eSIM chip). Each SIM slot has its own IMEI number, so using the physical slot for the first 120 days and switching to the eSIM slot for the next 120 gives you 240 total days per calendar year — legally, with no tax paid.",
  },
  {
    q: 'If I register my phone, can my spouse or a family member use it with their own SIM?',
    a: 'No. Once registered, the IMEI tax payment ties the device to the exact passport name and Foreigner ID Number (YKN) that paid it, and the registered local phone line must be held by that same person — you cannot register a phone under your name and then insert a SIM belonging to a family member or spouse.',
  },
];

export default function PhoneRegistrationTaxGuidePage() {
  return (
    <GuideLayout
      eyebrow="Connectivity Guide"
      title="Phone Registration Tax in Türkiye (2026): IMEI Lock Rules & How to Avoid Paying It"
      description="The 120-day rule, 2026 tax costs, the 240-day dual-SIM workaround, and the official registration process for residents."
      readTime="7 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[
        { id: 'overview', label: 'The 120-Day Rule' },
        { id: 'math', label: '2026 Cost Comparison' },
        { id: 'dual-sim', label: '240-Day Strategy' },
        { id: 'payment', label: 'Paying the Tax' },
        { id: 'checklist', label: 'Checklist' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      {/* Overview */}
      <section id="overview">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Smartphone className="w-5 h-5 text-primary" /> The 120-Day IMEI Rule & BTK Network Block</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          When you insert a local Turkish SIM card or eSIM (Turkcell, Vodafone, Türk Telekom) into a foreign-purchased smartphone, the Information and Communication Technologies Authority (BTK) registers your phone&apos;s unique IMEI hardware code.
        </p>
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <p className="text-sm text-foreground/80 leading-relaxed"><strong>The 120-day clock:</strong> a foreign device operating on local Turkish towers can function for up to 120 calendar days per IMEI slot, per calendar year, without paying national registration fees.</p>
          <p className="text-sm text-foreground/80 leading-relaxed"><strong>The network block:</strong> on day 121, BTK automatically blocks the IMEI from Turkish cellular networks. Your phone shows &quot;No Service&quot; locally — Wi-Fi and foreign roaming SIMs keep working.</p>
          <p className="text-sm text-foreground/80 leading-relaxed"><strong>Annual reset:</strong> the 120-day countdown is tied to the calendar year — it resets automatically on January 1st for devices that haven&apos;t been blocked yet.</p>
        </div>
        <p className="text-xs text-foreground/70 leading-relaxed bg-muted/50 rounded-lg p-3 mt-4">
          Comparing eSIM against a physical local SIM for everyday use (cost, local number, bank OTPs)? See our <Link href="/guides/esim-vs-local-sim-turkey" className="text-primary font-medium hover:underline">eSIM vs. Local SIM comparison guide</Link> — this page focuses specifically on the registration tax decision.
        </p>
      </section>

      {/* Cost comparison */}
      <section id="math">
        <h2 className="text-2xl font-bold mb-4">The Math: 2026 IMEI Registration Fee vs. the Alternatives</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Paying the official tax (MCKS / Harç Kaydı) is legally required to use a foreign phone on local networks beyond the grace period — but the cost has risen sharply, so it&apos;s worth comparing against the alternatives before paying it.
        </p>
        <div className="space-y-4">
          {OPTIONS.map((o) => (
            <div key={o.option} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <p className="font-semibold">{o.option}</p>
                <span className="shrink-0 text-sm font-bold text-primary whitespace-nowrap">{o.cost}</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2"><span className="text-muted-foreground">Best suited for: </span>{o.bestFor}</p>
              <p className="text-sm text-foreground/70 leading-relaxed"><span className="text-muted-foreground">Key drawback: </span>{o.drawback}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 240-day strategy */}
      <section id="dual-sim">
        <h2 className="text-2xl font-bold mb-4">The 240-Day Dual-SIM / eSIM Strategy</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          If your phone supports dual-SIM (one physical slot, one eSIM chip), you can legally double your local network access to 240 days per calendar year without paying the IMEI tax:
        </p>
        <ol className="space-y-3">
          {DUAL_SIM_STEPS.map((step, i) => (
            <li key={step} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
              <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
              <span className="text-sm text-foreground/80 leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Tax payment process */}
      <section id="payment">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-destructive" /> Step-by-Step IMEI Tax Payment Process (For Permanent Residents)</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          If you hold a Residence Permit (e-İkamet) or Work Permit and decide to register your foreign phone permanently, follow this official process:
        </p>
        <ol className="space-y-4 mb-6">
          {TAX_PAYMENT_STEPS.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <div className="min-w-0">
                  <p className="font-semibold mb-1.5">{step.title}</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{step.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2">
          <p className="text-xs text-foreground/80 leading-relaxed"><strong>Condition 1:</strong> the foreign phone must be registered under the exact passport name and Foreigner ID Number (YKN) that entered Türkiye within the last 365 days.</p>
          <p className="text-xs text-foreground/80 leading-relaxed"><strong>Condition 2:</strong> the registered local phone line (+90 SIM) must also be registered under that same passport/YKN holder — you cannot register a phone under your name and insert a line belonging to a family member or spouse.</p>
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Setting Up Your Residence Permit Paperwork?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Phone registration is one line item in a longer first-weeks checklist alongside e-Devlet access and e-İkamet filing. Our concierge service can walk you through the full setup.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Concierge Plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Checklist */}
      <section id="checklist">
        <h2 className="text-2xl font-bold mb-4">Mobile Hardware & Phone Tax Checklist</h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span>{item}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">What newcomers ask most often about the Turkish phone registration tax.</p>
        <GuideFAQ items={FAQ} />
        <p className="text-xs text-muted-foreground leading-relaxed mt-6">Page last updated {new Date().toISOString().slice(0, 10)}. Tax amounts and BTK regulations change periodically — confirm current fees via e-Devlet or your mobile operator before relying on them.</p>
      </section>
    </GuideLayout>
  );
}
