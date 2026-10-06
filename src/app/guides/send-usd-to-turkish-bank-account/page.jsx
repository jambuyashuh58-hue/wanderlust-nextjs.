import Link from 'next/link';
import { CheckCircle2, AlertTriangle, Landmark, ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Best Way to Send USD to a Turkish Bank Account: 2026 Expat Guide | Move to Istanbul',
  description: 'Wise vs. SWIFT vs. Payoneer vs. Revolut compared, the forced-conversion trap to avoid, and the optimal transfer pipeline for paying rent and bills in Türkiye.',
  alternates: { canonical: '/guides/send-usd-to-turkish-bank-account' },
};

const METHODS = [
  { method: 'Wise (TransferWise)', speed: 'Fast (instant–24 hrs)', fees: 'Low, transparent (~0.4%–0.7%)', markup: 'Mid-market rate (0% hidden markup)', usd: 'Yes — direct to Turkish USD or TRY IBANs', rating: 'Best Overall' },
  { method: 'Direct SWIFT Wire', speed: 'Slow (2–5 business days)', fees: 'High ($30–$75+ via SWIFT + intermediaries)', markup: 'High retail spread (2%–4%)', usd: 'Yes — to local USD Döviz IBAN', rating: 'Expensive' },
  { method: 'Payoneer', speed: 'Moderate (1–2 days)', fees: '2% withdrawal fee + network charges', markup: '~1.5%–2%', usd: 'Yes — USD bank withdrawal', rating: 'Good for Marketplaces' },
  { method: 'Revolut / Multi-Currency Cards', speed: 'Fast', fees: 'Free-tier limits apply; weekend FX surcharges', markup: 'Mid-market on weekdays; 1% weekend fee', usd: 'Partial — ATM/card spend only', rating: 'Good Secondary' },
];

const PITFALLS = [
  {
    title: 'Never Send USD Directly to a Turkish Lira (TRY) IBAN',
    problem: 'If you wire USD directly to your standard TRY IBAN, your Turkish bank converts it automatically at their unfavorable retail buy rate on receipt.',
    solution: 'Open a dedicated USD Foreign Currency Account (Döviz Tevdiat Hesabı) at your Turkish bank. Send USD directly to your USD IBAN and hold it until you choose to convert at a better rate.',
  },
  {
    title: 'Use Local Wire Rails via Wise Business/Personal',
    problem: 'International SWIFT routing passes through correspondent banks, each taking a cut before funds reach Türkiye.',
    solution: 'Wise maintains local Turkish bank accounts through partner banks (e.g. Fibabanka). You pay into Wise’s local account in your home country, and the payout arrives as a fast local transfer in Türkiye — bypassing SWIFT routing fees entirely.',
  },
  {
    title: 'Standardize Transfer Reference Descriptions',
    problem: 'An unlabeled or incorrectly labeled transfer can trigger unnecessary commercial tax inquiries on a personal account.',
    solution: 'For rent, use "Kira Ödemesi" (Rent Payment) alongside the landlord’s Tax ID/TCKN. For moving your own earnings between your own accounts, use "Kendi Hesabıma Transfer" (Transfer to Own Account).',
  },
];

const PIPELINE_STEPS = [
  'Open a multi-currency Wise account to receive local ACH (US) or SEPA (EU) deposits from clients without international wire fees.',
  'Open both a TRY IBAN and a USD IBAN at your Turkish bank (Garanti BBVA, Ziraat Bankası, or Kuveyt Türk).',
  'Use Wise to send funds to your Turkish USD IBAN to hold savings in hard currency, or convert to TRY within Wise and send to your TRY IBAN for daily living expenses.',
];

const CHECKLIST = [
  'Verify IBAN type: confirm whether your destination IBAN is assigned to a TRY or USD sub-account.',
  'Check mid-market rates: compare Wise’s exchange rate against your local Turkish bank’s buy rate before converting large sums.',
  'Avoid weekend transfers: forex markets are closed and retail spreads widen on weekends.',
  'Keep transfer receipts: save PDF wire receipts for your residence permit (e-İkamet) financial proof or annual tax filings.',
  'Set up your Wise account before relocating, so transfers work from day one.',
];

const FAQ = [
  {
    q: 'What is the single biggest mistake people make sending USD to Türkiye?',
    a: "Wiring USD directly to a standard Turkish Lira (TRY) IBAN. The bank converts it automatically on arrival at their retail buy rate, which typically carries a 2-4% hidden markup versus the mid-market rate. Opening a separate USD Foreign Currency Account (Döviz Tevdiat Hesabı) and sending to that IBAN instead avoids the forced conversion entirely.",
  },
  {
    q: 'Why is a direct SWIFT wire so much more expensive than Wise?',
    a: "A SWIFT wire passes through one or more correspondent intermediary banks (large banks like JPMorgan or Deutsche Bank acting as routing hubs in Europe), each deducting $25-$50 before funds even reach your Turkish bank — on top of a 2-4% retail FX spread. Wise routes locally through partner banks instead, avoiding that correspondent-bank chain, which is why its total cost is typically under 1%.",
  },
  {
    q: 'Will a large transfer trigger a compliance hold at my Turkish bank?',
    a: 'It can. Foreign wire transfers above roughly $10,000 may trigger compliance checks at Turkish banks (Ziraat, Garanti BBVA, İş Bankası, Kuveyt Türk), and you may need to provide proof of income or a contract before the funds are released. Keeping clean transfer labels and documentation in advance speeds this up considerably.',
  },
  {
    q: 'What should I actually write in the transfer description?',
    a: 'For rent payments: "Kira Ödemesi" (Rent Payment) plus your landlord’s Tax ID/TCKN. For moving your own remote earnings between your own accounts: "Kendi Hesabıma Transfer" (Transfer to Own Account). An unclear or missing description on a recurring large transfer is what tends to trigger unnecessary tax inquiries.',
  },
  {
    q: 'Should I keep my earnings in USD or convert to TRY immediately?',
    a: "That depends on your spending pattern and how comfortable you are holding TRY given its inflation history. A common approach is holding savings in a USD IBAN and converting only what you need for TRY-denominated expenses (rent, groceries, bills) each month via Wise at the mid-market rate, rather than converting everything on arrival.",
  },
];

export default function SendUsdToTurkishBankGuidePage() {
  return (
    <GuideLayout
      eyebrow="Financial Guide"
      title="Best Way to Send USD to a Turkish Bank Account: 2026 Expat Guide"
      description="Wise vs. SWIFT vs. Payoneer vs. Revolut compared, the forced-conversion trap, and the transfer pipeline that actually works."
      readTime="6 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[
        { id: 'overview', label: 'The FX Challenge' },
        { id: 'comparison', label: 'Transfer Methods' },
        { id: 'pitfalls', label: 'Pitfalls & Fixes' },
        { id: 'pipeline', label: 'Optimal Setup' },
        { id: 'checklist', label: 'Checklist' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      {/* Overview */}
      <section id="overview">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Landmark className="w-5 h-5 text-primary" /> The FX & Wire Transfer Challenge in Türkiye</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Transferring foreign earnings into Türkiye can quickly become costly if you rely on standard international wire transfers. Expats frequently face unexpected fees, delayed transfers, and forced currency conversions.
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">High SWIFT & Intermediary Bank Fees</p>
            <p className="text-xs text-muted-foreground">Traditional bank-to-bank SWIFT wires pass through correspondent intermediary banks, deducting $25-$50 per transfer before funds reach your Turkish bank.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">Double FX Conversion Traps</p>
            <p className="text-xs text-muted-foreground">Sending USD to a TRY IBAN often triggers double conversion (USD → EUR → TRY) at poor retail rates with 3%-5% hidden markups.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">Compliance & Proof-of-Income Holds</p>
            <p className="text-xs text-muted-foreground">Transfers above $10,000 may trigger compliance checks, requiring proof of income or contract documentation before release.</p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison">
        <h2 className="text-2xl font-bold mb-4">Comparison of Transfer Methods</h2>
        <div className="lg:hidden space-y-3">
          {METHODS.map((m) => (
            <div key={m.method} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm">{m.method}</p>
                <span className="text-xs font-semibold text-primary whitespace-nowrap">{m.rating}</span>
              </div>
              <dl className="space-y-2 text-sm">
                <div><dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Speed</dt><dd className="text-foreground/80">{m.speed}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Fees</dt><dd className="text-foreground/80">{m.fees}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">FX Markup</dt><dd className="text-foreground/80">{m.markup}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">USD Holding</dt><dd className="text-foreground/80">{m.usd}</dd></div>
              </dl>
            </div>
          ))}
        </div>
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Method</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Speed</th>
                <th className="px-4 py-3 font-semibold">Fees</th>
                <th className="px-4 py-3 font-semibold">FX Markup</th>
                <th className="px-4 py-3 font-semibold">USD Holding</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {METHODS.map((m) => (
                <tr key={m.method} className="align-top">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{m.method}</td>
                  <td className="px-4 py-3 text-foreground/80 whitespace-nowrap">{m.speed}</td>
                  <td className="px-4 py-3 text-foreground/80">{m.fees}</td>
                  <td className="px-4 py-3 text-foreground/80">{m.markup}</td>
                  <td className="px-4 py-3 text-foreground/80">{m.usd}</td>
                  <td className="px-4 py-3 text-foreground/80 font-medium whitespace-nowrap">{m.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pitfalls */}
      <section id="pitfalls">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-destructive" /> Key Pitfalls & How to Avoid Them</h2>
        <div className="space-y-5">
          {PITFALLS.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-semibold mb-3">{item.title}</p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3"><span className="font-medium text-foreground">The pitfall: </span>{item.problem}</p>
              <div className="rounded-lg bg-success/10 border border-success/20 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-success mb-1">The Solution</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pipeline */}
      <section id="pipeline">
        <h2 className="text-2xl font-bold mb-4">Optimal Transfer Pipeline Setup</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">Foreign client/employer pays USD → Wise multi-currency account → your Turkish USD or TRY IBAN. In practice:</p>
        <ol className="space-y-3">
          {PIPELINE_STEPS.map((step, i) => (
            <li key={step} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
              <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
              <span className="text-sm text-foreground/80 leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-foreground/70 leading-relaxed bg-muted/50 rounded-lg p-3 mt-4">
          Invoicing foreign clients as a freelancer rather than moving your own savings? See our <Link href="/guides/paypal-stripe-alternatives-turkey" className="text-primary font-medium hover:underline">PayPal & Stripe Alternatives guide</Link> for the invoicing-specific setup and the Article 89/13 tax deduction.
        </p>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Setting Up Your Turkish Banking From Scratch?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Opening the right IBANs, picking a transfer pipeline, and keeping your invoicing tax-compliant work best set up together, not fixed one at a time. Our concierge service can walk through this as part of your relocation setup.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Concierge Plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Checklist */}
      <section id="checklist">
        <h2 className="text-2xl font-bold mb-4">Foreign Currency Wire Transfer Checklist</h2>
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
        <p className="text-foreground/80 leading-relaxed mb-6">What expats and freelancers ask most often about moving money into Türkiye.</p>
        <GuideFAQ items={FAQ} />
        <p className="text-xs text-muted-foreground leading-relaxed mt-6">Page last updated {new Date().toISOString().slice(0, 10)}. Fees, exchange rate markups, and compliance thresholds change periodically — confirm current rates and limits with your bank or transfer provider before relying on them.</p>
      </section>
    </GuideLayout>
  );
}
