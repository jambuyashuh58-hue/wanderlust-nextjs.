import ServicePageLayout from '@/components/ServicePageLayout';

export const metadata = {
  title: 'Full Relocation Concierge ($999) | Move to Istanbul',
  description: 'Hand us the whole first month in Istanbul — visa, housing, banking, and settling in, with bilingual local support.',
  alternates: { canonical: '/services/full-relocation-concierge' },
};

const INCLUDES = [
  'Everything in Apartment Shortlisting',
  'Bilingual local specialist accompaniment',
  'Airport arrival logistics',
  'Neighborhood orientation write-up',
  'First-month cost breakdown',
  'Priority response time',
  'Weekly async check-ins',
];

const FAQ = [
  { q: 'What does "bilingual local specialist accompaniment" mean in practice?', a: 'A local team member joins you in person for key appointments — the notary lease signing, bank account opening, or your residence-permit appointment — so nothing gets lost in translation.' },
  { q: 'How long does the full concierge process take?', a: 'Most clients are fully set up — visa filed, lease signed, bank account open — within your first 3–4 weeks in Istanbul, though timelines vary with document readiness.' },
  { q: 'Can I add this after starting with a smaller package?', a: "Yes — we'll credit what you've already paid toward the Full Relocation Concierge if you upgrade within 30 days." },
];

export default function FullRelocationConciergePage() {
  return (
    <ServicePageLayout
      path="/services/full-relocation-concierge"
      name="Full Relocation Concierge"
      price="$999"
      tagline="Hand us the whole first month — visa, housing, banking, and settling in."
      includes={INCLUDES}
      faq={FAQ}
    />
  );
}
