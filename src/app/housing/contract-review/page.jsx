import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Reading a Turkish Rental Contract | Move to Istanbul',
  description: 'The clauses in a Turkish rental contract worth reading twice before you sign, and why notarization matters.',
  alternates: { canonical: '/housing/contract-review/' },
};

const CLAUSES = [
  { title: 'Deposit terms and return conditions', body: 'Confirm the deposit amount, and in writing, the conditions under which it is withheld or returned at move-out — not just a verbal assurance.' },
  { title: 'Who pays which utilities and building fees', body: 'Building maintenance fees (aidat) and which utilities are the tenant\'s responsibility vs. included should be explicit, not assumed.' },
  { title: 'Lease length and renewal terms', body: 'Turkish rental law has specific tenant protections around renewal and rent increases on renewal — know what your specific contract says versus what the law defaults to.' },
  { title: 'DASK earthquake insurance', body: 'This is mandatory for residential leases in Türkiye. Confirm it\'s in place and who is paying for it — it\'s inexpensive but easy to overlook.' },
  { title: 'Early termination terms', body: 'If your plans could change, check what penalty (if any) applies to breaking the lease early, and the required notice period.' },
];

const FAQ = [
  {
    q: 'Does the contract need to be in Turkish?',
    a: 'The legally binding version is in Turkish. If you don\'t read Turkish, get a sworn/certified translation or have someone fluent review it line by line before you sign — don\'t rely on a landlord\'s informal English summary.',
  },
  {
    q: 'Why does the lease need to be notarized?',
    a: 'Notarization is standard for enforceability and is required for your residence permit application (e-İkamet) — an unnotarized lease generally can\'t be used to support that application.',
  },
];

export default function ContractReviewPage() {
  return (
    <GuideLayout
      eyebrow="Housing"
      title="Contract Review"
      description="The clauses in a Turkish rental contract worth reading twice."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/housing"
      backLabel="Housing"
      sections={[{ id: 'clauses', label: 'Key clauses' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="clauses">
        <div className="space-y-5">
          {CLAUSES.map((c, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold mb-1.5">{c.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want a contract checklist for your specific lease?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Housing Shortlist File includes a localized contract checklist as part of the service.</p>
        <Link href="/services/housing-shortlist-file" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Housing Shortlist File <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
