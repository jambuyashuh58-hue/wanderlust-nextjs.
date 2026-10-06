import Link from 'next/link';
import { CheckCircle2, CreditCard, ArrowRight, ExternalLink } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'PayPal and Stripe Alternatives for Freelancers in Türkiye (2026 Guide) | Move to Istanbul',
  description: "Why PayPal doesn't work in Türkiye, the real payment gateways freelancers use instead (Wise, Payoneer, SWIFT), and the Article 89/13 tax setup that makes it 0% income tax.",
  alternates: { canonical: '/guides/paypal-stripe-alternatives-turkey' },
};

const GATEWAYS = [
  {
    name: 'Wise (Business & Personal)',
    how: 'Open multi-currency accounts (USD, EUR, GBP). Receive international ACH/SEPA wires and transfer funds directly to Turkish bank accounts.',
    bestFor: 'Invoicing B2B corporate clients, Upwork/Deel withdrawals, daily spending',
    fx: 'Keeps funds in foreign currency until you choose to convert to TRY',
  },
  {
    name: 'Payoneer',
    how: 'Provides virtual receiving accounts in USD, EUR, GBP, and CAD, with direct integration with major freelance platforms.',
    bestFor: 'Upwork, Fiverr, Toptal, and marketplace withdrawals',
    fx: 'Receives USD/EUR and transfers directly to local Turkish IBANs',
  },
  {
    name: 'Direct SWIFT / Wire Transfers',
    how: 'Foreign clients wire directly to your foreign-currency bank account in Türkiye (Garanti, Ziraat, Kuveyt Türk).',
    bestFor: 'High-value client retainer payments ($2,000+)',
    fx: 'Holds USD, EUR, or GBP directly in Turkish bank accounts',
  },
  {
    name: 'US/UK Entity + Mercury / Relay',
    how: 'Operate a foreign LLC/LTD abroad to connect to PayPal or Stripe, then remit income to Türkiye as service export revenue.',
    bestFor: 'E-commerce, SaaS, agency billing requiring credit card checkout',
    fx: 'High flexibility; requires careful tax reporting in Türkiye',
  },
];

const WORKFLOW_STEPS = [
  { title: 'Register a Sole Proprietorship (Şahıs Şirketi)', body: 'Hire a licensed Turkish CPA (SMMM) to file your company registration. Setup takes 1-3 business days.' },
  { title: 'Open a Foreign Currency Bank Account', body: 'Open USD, EUR, and TRY accounts at major banks (Ziraat, Garanti BBVA, or Kuveyt Türk) using your tax number (Vergi Kimlik Numarası) and passport.' },
  { title: 'Link Wise Business or Payoneer', body: 'Connect your business accounts to receive payments in USD/EUR/GBP, then route funds to your Turkish bank accounts without mandatory currency conversion.' },
  { title: 'Issue Official e-Invoices (e-Fatura)', body: 'Issue official digital invoices to your overseas clients for every payout.' },
  { title: 'Claim the 100% Deduction', body: 'Your CPA files quarterly and annual tax declarations, applying the 100% deduction under GVK 89/13 to legally reduce your personal income tax to 0%.' },
];

const CHECKLIST = [
  'Establish tax setup: do not run recurring foreign freelance income through personal accounts without a registered sole proprietorship (Şahıs Şirketi).',
  'Verify non-resident client status: ensure your foreign client has no legal or business headquarters in Türkiye.',
  'Issue e-Fatura invoices matching every deposit from Wise, Payoneer, or SWIFT wire transfers.',
  'Maintain currency flexibility: keep earnings in USD/EUR accounts until you choose to convert to TRY for living expenses.',
  'Pay monthly Bağ-Kur: stay compliant with self-employed social security payments (~11,808 TRY/month).',
];

const FAQ = [
  {
    q: 'Why doesn’t PayPal work in Türkiye?',
    a: "PayPal suspended operations in Türkiye in 2016 after failing to obtain a local banking license under the country's data localization laws. Stripe has a similar gap — it doesn't directly support Turkish bank accounts or Turkish business entities. Neither has reversed this as of 2026.",
  },
  {
    q: 'So how do freelancers in Türkiye actually get paid by foreign clients?',
    a: "By combining a compliant fintech payment gateway — most commonly Wise or Payoneer, with direct SWIFT wires for larger retainers — with a proper Turkish tax structure (a registered sole proprietorship issuing e-Fatura invoices). Thousands of remote workers invoice US, EU, and UK clients this way every month.",
  },
  {
    q: 'What is the Article 89/13 tax deduction and who qualifies?',
    a: "Article 89/13 of the Income Tax Law (under Presidential Decision No. 11257) gives remote workers residing in Türkiye who invoice foreign clients a 100% income tax deduction on qualifying service export profits — software development, design, data analysis, architecture, engineering, and accounting are named categories. Foreign service exports consumed abroad are also exempt from the 20% Turkish VAT. You must operate a sole proprietorship (Şahıs Şirketi), issue e-Fatura/e-Arşiv invoices, bill non-resident clients, and remit the proceeds to Türkiye by the annual tax deadline.",
  },
  {
    q: 'Does the 100% deduction mean I pay zero tax and no social security?',
    a: "It means your personal income tax on qualifying service export income can legally be reduced to 0%. It does not remove social security: as a self-employed sole proprietor you still owe a fixed monthly Bağ-Kur contribution (roughly 11,808 TRY/month as of 2026), independent of the income tax deduction.",
  },
  {
    q: 'Can I just keep using a foreign LLC and PayPal/Stripe instead of setting up a Turkish entity?',
    a: 'You can operate a foreign LLC/LTD abroad connected to PayPal or Stripe and remit the income to Türkiye as service export revenue, but this adds real tax-reporting complexity and does not by itself grant the Article 89/13 deduction. For most solo freelancers, registering a Turkish sole proprietorship and invoicing directly is the simpler, cleaner path to the 0% deduction.',
  },
];

const RELATED_RESOURCES = [
  { label: 'Best Way to Send USD to a Turkish Bank Account: 2026 Guide', href: '/guides/send-usd-to-turkish-bank-account' },
  { label: 'How to Open a Turkish Bank Account Without an İkamet Card', href: '/guides/bank-account-without-ikamet' },
  { label: 'Is the Türkiye Digital Nomad Visa Tax-Free? Remote Tax Guide', href: '/guides/digital-nomad-visa-tax-guide' },
  { label: 'Türkiye Visa & Residence Permit Guide 2026', href: '/guides/visa' },
  { label: 'Monthly Cost of Living in Istanbul for Expats & Nomads', href: '/guides/cost-of-living' },
];

export default function PaypalStripeAlternativesGuidePage() {
  return (
    <GuideLayout
      eyebrow="Financial Guide"
      title="PayPal and Stripe Alternatives for Freelancers in Türkiye (2026)"
      description="Why PayPal doesn't work here, the gateways freelancers actually use instead, and the tax setup that makes it 0% income tax."
      readTime="7 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[
        { id: 'overview', label: 'The Payment Landscape' },
        { id: 'gateways', label: 'Payment Alternatives' },
        { id: 'tax', label: 'Article 89/13 Deduction' },
        { id: 'workflow', label: 'Setup Workflow' },
        { id: 'checklist', label: 'Compliance Checklist' },
        { id: 'faq', label: 'FAQ' },
        { id: 'resources', label: 'Related Resources' },
      ]}
    >
      {/* Overview */}
      <section id="overview">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /> The Payment Landscape in Türkiye</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          If you are a remote worker, freelancer, or startup founder relocating to Türkiye, one of the first roadblocks you&apos;ll hit is payment processing. In 2016, PayPal suspended operations in Türkiye after failing to obtain a local banking license under the country&apos;s data localization laws. Stripe has a similar gap — it doesn&apos;t directly support Turkish bank accounts or Turkish business entities.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Despite this, thousands of international remote workers successfully invoice and receive payments from clients in the US, EU, UK, and globally while residing in Türkiye. Doing so means combining a compliant fintech payment gateway with a proper Turkish tax structure.
        </p>
      </section>

      {/* Gateways */}
      <section id="gateways">
        <h2 className="text-2xl font-bold mb-4">Top Payment Alternatives & Comparison</h2>
        <div className="space-y-4">
          {GATEWAYS.map((g) => (
            <div key={g.name} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-semibold mb-2">{g.name}</p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">{g.how}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">Best Used For</p>
                  <p className="text-xs text-foreground/80">{g.bestFor}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">Foreign Currency Handling</p>
                  <p className="text-xs text-foreground/80">{g.fx}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tax deduction */}
      <section id="tax">
        <h2 className="text-2xl font-bold mb-4">Compliance & Tax Optimization: Article 89/13 (100% Deduction)</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Receiving money in Türkiye isn&apos;t just about payment rails — it requires legal tax registration to avoid frozen accounts or audits.
        </p>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-3">
          <p className="font-semibold mb-1">The 100% Service Export Income Tax Deduction (GVK 89/13)</p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Under Article 89/13 of the Income Tax Law (Presidential Decision No. 11257), remote workers residing in Türkiye who invoice foreign clients receive a 100% income tax deduction.
          </p>
          <ul className="space-y-2 pt-2">
            <li className="flex items-start gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span><strong>0% personal income tax:</strong> qualifying service export profits (software development, design, data analysis, architecture, engineering, accounting) are 100% tax-deductible from your personal income tax base.</span></li>
            <li className="flex items-start gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span><strong>VAT exemption:</strong> foreign service exports consumed abroad are completely exempt from 20% Turkish VAT.</span></li>
            <li className="flex items-start gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span><strong>Mandatory requirements:</strong> operate a sole proprietorship (Şahıs Şirketi), issue official electronic invoices (e-Fatura/e-Arşiv), invoice non-resident clients, and transfer the proceeds to Türkiye by the annual tax deadline.</span></li>
            <li className="flex items-start gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span><strong>Social security (Bağ-Kur):</strong> as a self-employed sole proprietor, you pay a fixed monthly contribution of roughly 11,808 TRY/month.</span></li>
          </ul>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow">
        <h2 className="text-2xl font-bold mb-4">Step-by-Step Payment & Tax Setup Workflow</h2>
        <ol className="space-y-4">
          {WORKFLOW_STEPS.map((step, i) => (
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
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Setting Up Your Payment & Tax Structure?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Getting the Şahıs Şirketi registration, bank setup, and e-Fatura invoicing right from day one avoids frozen accounts and audit risk later. Our visa &amp; paperwork consultation can point you to a vetted local CPA (SMMM) and walk through the sequence above for your specific situation.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Concierge Plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Checklist */}
      <section id="checklist">
        <h2 className="text-2xl font-bold mb-4">Freelancer Financial Compliance Checklist</h2>
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
        <p className="text-foreground/80 leading-relaxed mb-6">What freelancers and remote workers ask most often about getting paid while living in Türkiye.</p>
        <GuideFAQ items={FAQ} />
      </section>

      {/* Related resources */}
      <section id="resources">
        <h2 className="text-2xl font-bold mb-2">Related Internal Resources</h2>
        <div className="rounded-2xl border border-border bg-card p-4">
          <ul className="space-y-2.5">
            {RELATED_RESOURCES.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-sm text-foreground/80 leading-relaxed hover:text-primary hover:underline transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mt-4">
          Page last updated {new Date().toISOString().slice(0, 10)}. Tax law, deduction rules, and social security contribution amounts change periodically — confirm current figures with a licensed Turkish CPA (SMMM) before relying on them.
        </p>
      </section>
    </GuideLayout>
  );
}
