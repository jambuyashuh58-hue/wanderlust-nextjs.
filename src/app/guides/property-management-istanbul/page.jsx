import Link from 'next/link';
import { CheckCircle2, ShieldAlert, ArrowRight, Building2 } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Best Property Management Companies in Istanbul for Overseas Owners: 2026 Guide | Move to Istanbul',
  description: 'Agent vs. dedicated property management compared, the 3 legal pillars that protect absentee landlords, and the end-to-end management workflow.',
  alternates: { canonical: '/guides/property-management-istanbul' },
};

const COMPARISON = [
  { feature: 'Primary Goal', agent: "Close the deal quickly to collect 1 month's commission", pm: 'Protect owner asset value & ensure long-term yield' },
  { feature: 'Tenant Vetting', agent: 'Basic background check; often accepts verbal promises', pm: 'Background checks, salary verification, employer contact, credit audit' },
  { feature: 'Eviction Undertaking (Tahliye)', agent: 'Often uses invalid blank or incorrectly dated forms', pm: 'Legally enforceable Tahliye Taahhütnamesi executed post-lease start' },
  { feature: 'Rent Collection & Remittance', agent: 'Owner handles tenant direct bank transfers', pm: 'Monitored rent collection, late payment tracking, cross-border remittance' },
  { feature: 'Maintenance & HOA (Aidat)', agent: 'None — owner must coordinate repairs from abroad', pm: 'Handyman oversight, vendor vetting, building manager liaison' },
  { feature: 'Tax & e-Devlet Compliance', agent: 'None', pm: 'Rental income tax (GMSİ) coordination & tenant address registration' },
];

const PILLARS = [
  {
    title: 'Valid Eviction Undertaking (Tahliye Taahhütnamesi)',
    body: 'Turkish law lets a tenant sign an agreement committing to vacate on a specific date — but if it\'s signed on the exact same date as the lease, courts declare it null and void (geçersiz), assuming duress. The undertaking must be executed at least 1 to 2 weeks after the lease start date and handover.',
  },
  {
    title: 'Mandatory Bank Payment Trail',
    body: 'Under Turkish tax law, residential rent payments exceeding 500 TRY must go through official bank transfers labeled "Kira Ödemesi" (Rent Payment). Cash collection creates tax-audit exposure and prevents enforcing eviction for non-payment.',
  },
  {
    title: 'Tenant Identity & Residence Permit Verification',
    body: 'Owners and building managers must report tenant details via e-Devlet (KİD / Kimlik Bildirim Sistemi). Verifying citizenship or valid residence permit (ikamet) status prevents leasing in restricted neighborhoods (Kapalı Mahalleler).',
  },
];

const WORKFLOW_STEPS = [
  { title: 'Property Audit & Readiness', body: 'Inspection of heating systems (Kombi), inventory check, and utility meter status (İSKİ, İGDAŞ, CK Boğaziçi).' },
  { title: 'Listing Optimization & Marketing', body: 'Multi-channel listing to attract vetted, qualified tenants rather than the first applicant.' },
  { title: 'Tenant Screening', body: 'Verifying proof of stable foreign or local income — salary slips, corporate employment, bank statements.' },
  { title: 'Legal Drafting & Staggered Tahliye', body: 'Bilingually drafted lease contracts (Turkish/English) with explicit maintenance, deposit, and annual inflation-indexation clauses, plus a correctly-dated eviction undertaking.' },
  { title: 'Ongoing Management', body: 'Monitoring monthly HOA (Aidat) receipts from the building management company (Apartman Yönetimi) to prevent liens against the title deed (TAPU), plus FX remittance and tax coordination.' },
  { title: 'Tax & Annual Filing', body: 'Coordinating annual Real Estate Rental Income Tax (GMSİ — Gayrimenkul Sermaye İradı) declarations with a licensed Turkish CPA (SMMM).' },
];

const CHECKLIST = [
  'Verify Title Deed (TAPU): ensure your name and property details match official land registry records on e-Devlet.',
  'Ensure mandatory DASK insurance: maintain active Compulsory Earthquake Insurance, required for utility maintenance and lease enforcement.',
  'Enforce a staggered eviction undertaking: never let a tenant move in without a properly dated Tahliye Taahhütnamesi signed post-handover.',
  'Require bank rent transfers: ensure all rent arrives via bank transfer labeled "Kira Ödemesi".',
  'Monitor building dues (Aidat): request monthly proof of payment from your tenant or management agency to protect against building liens.',
];

const FAQ = [
  {
    q: 'Why can’t I just use a normal neighborhood real estate agent (Emlakçı)?',
    a: "A traditional Emlakçı is paid a one-time commission to close the lease, so their incentive stops once a tenant signs — they rarely provide ongoing rent monitoring, maintenance coordination, HOA oversight, or tax compliance. For an owner living abroad, that gap is exactly where problems (unpaid aidat, an unenforceable eviction clause, a tenant who stops paying) go unnoticed for months.",
  },
  {
    q: 'What happens if my eviction undertaking (Tahliye Taahhütnamesi) is signed on the same day as the lease?',
    a: 'Turkish courts will typically declare it null and void (geçersiz), on the assumption that a tenant signing away their tenancy rights on the same day they sign the lease did so under duress. It must be executed at least 1-2 weeks after the lease start date and handover to be enforceable.',
  },
  {
    q: 'How long does it take to evict a non-paying tenant without proper documentation?',
    a: 'Without a legally binding eviction undertaking, removing a non-paying or holdover tenant through Turkish civil court can take 2 to 4 years. This is the single biggest risk a dedicated property manager is meant to eliminate upfront, not fix after the fact.',
  },
  {
    q: 'Can unpaid building dues (Aidat) really put my property at risk?',
    a: "Yes. Building dues are mandatory under the Property Ownership Law (Kat Mülkiyeti Kanunu), and unpaid aidat can lead to legal execution (İcra) directly against the property owner — the TAPU holder — regardless of whether the tenant or the owner is at fault for non-payment.",
  },
  {
    q: 'Does rent have to be paid in cash or can it be transferred from abroad?',
    a: 'It should never be cash. Turkish tax law requires residential rent payments over 500 TRY to go through an official bank transfer labeled "Kira Ödemesi" (Rent Payment). This also protects you: a cash-paying tenant who stops paying is much harder to evict than one with a documented payment history.',
  },
];

export default function PropertyManagementGuidePage() {
  return (
    <GuideLayout
      eyebrow="Property Owner Guide"
      title="Best Property Management Companies in Istanbul for Overseas Owners: 2026 Guide"
      description="Agent vs. dedicated management compared, the 3 legal pillars that protect absentee landlords, and the full management workflow."
      readTime="8 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[
        { id: 'overview', label: 'Absentee Ownership Challenges' },
        { id: 'comparison', label: 'Agent vs. Management' },
        { id: 'pillars', label: 'Legal Protections' },
        { id: 'workflow', label: 'Management Workflow' },
        { id: 'checklist', label: 'Landlord Checklist' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      {/* Overview */}
      <section id="overview">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" /> The Challenges of Absentee Property Ownership in Istanbul</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Purchasing real estate in Istanbul — whether for citizenship by investment ($200,000+ for a residence permit, $400,000+ for citizenship) or portfolio yield — is only the first step. For owners living abroad, managing an Istanbul apartment brings real operational and legal complexity.
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">Strict Tenancy Protections</p>
            <p className="text-xs text-muted-foreground">The Turkish Code of Obligations heavily protects tenants — evicting a non-paying or holdover tenant without a valid eviction undertaking can take 2 to 4 years in civil court.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">Complex Rental Increase Mechanics</p>
            <p className="text-xs text-muted-foreground">Lease renewal increases are pegged to TÜFE 12-month rolling averages, and 5-year lease revision lawsuits (Kira Tespit Davası) require local legal expertise.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">HOA (Aidat) & Building Maintenance Risk</p>
            <p className="text-xs text-muted-foreground">Unpaid building dues can lead to legal execution (İcra) directly against the property owner, the TAPU holder — not just the tenant.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">Cross-Border FX & Rent Remittance</p>
            <p className="text-xs text-muted-foreground">Collecting rent in TRY and converting/remitting profits in USD or EUR requires compliant banking channels and tax reporting.</p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison">
        <h2 className="text-2xl font-bold mb-4">Traditional Agents (Emlakçı) vs. Dedicated Property Management</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Many overseas owners default to a local neighborhood real estate agent. But agents operate on a commission-per-lease model and rarely provide ongoing management.
        </p>
        <div className="lg:hidden space-y-3">
          {COMPARISON.map((row) => (
            <div key={row.feature} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-semibold text-sm mb-2">{row.feature}</p>
              <dl className="space-y-2 text-sm">
                <div><dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Neighborhood Agent</dt><dd className="text-foreground/80">{row.agent}</dd></div>
                <div><dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Dedicated Management</dt><dd className="text-foreground/80">{row.pm}</dd></div>
              </dl>
            </div>
          ))}
        </div>
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Service Feature</th>
                <th className="px-4 py-3 font-semibold">Traditional Neighborhood Agent</th>
                <th className="px-4 py-3 font-semibold">Dedicated Property Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="align-top">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{row.feature}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.agent}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.pm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Legal pillars */}
      <section id="pillars">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-primary" /> Essential Legal Protections for Overseas Landlords</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">To safeguard your Turkish property asset and income, any management partner must enforce three non-negotiable legal pillars:</p>
        <div className="space-y-4">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-semibold mb-2">{p.title}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow">
        <h2 className="text-2xl font-bold mb-4">End-to-End Overseas Property Management Workflow</h2>
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
        <h3 className="font-bold mb-1.5">Need Bilingual Property Management From Abroad?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Tenant screening, a correctly staggered eviction undertaking, rent monitoring, and aidat oversight are easiest to get right from the start — not retrofitted after a problem tenant. Our concierge service can coordinate this for owners managing a property remotely.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Concierge Plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Checklist */}
      <section id="checklist">
        <h2 className="text-2xl font-bold mb-4">Overseas Landlord Protection Checklist</h2>
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
        <p className="text-foreground/80 leading-relaxed mb-6">What overseas owners ask most often about managing a rental property in Istanbul from abroad.</p>
        <GuideFAQ items={FAQ} />
        <p className="text-xs text-muted-foreground leading-relaxed mt-6">Page last updated {new Date().toISOString().slice(0, 10)}. Tenancy law, tax thresholds, and investment-residency amounts change periodically — confirm current figures with a licensed Turkish attorney or CPA (SMMM) before relying on them.</p>
      </section>
    </GuideLayout>
  );
}
