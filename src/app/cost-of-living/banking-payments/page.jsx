import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Banking & Payments in Türkiye | Move to Istanbul',
  description: 'Turkish bank accounts, multi-currency accounts, and avoiding the ATM dynamic-currency-conversion markup.',
  alternates: { canonical: '/cost-of-living/banking-payments' },
};

const FAQ = [
  {
    q: 'Do I need a Turkish bank account?',
    a: "Not always immediately — many residents run on a multi-currency account (Wise, Revolut) plus cash for a while. A local account is typically needed to pay rent by transfer, and for some utility and residence-permit-adjacent paperwork, and requires your tax ID number first.",
  },
  {
    q: 'What is the ATM "charge in home currency" trap?',
    a: 'Turkish ATMs often prompt you to choose between being charged in your home currency or in TRY. Choosing your home currency triggers Dynamic Currency Conversion — a hidden markup of 8-15% over the real exchange rate. Always choose TRY / decline conversion.',
  },
  {
    q: 'Should I keep savings in TRY or foreign currency?',
    a: 'A common approach among residents is keeping core savings in USD/EUR/GBP and converting only a few weeks\' worth of living expenses into TRY at a time, as a hedge against currency depreciation.',
  },
];

export default function BankingPaymentsPage() {
  return (
    <GuideLayout
      eyebrow="Cost of Living"
      title="Banking & Payments"
      description="Turkish bank accounts, multi-currency accounts, and avoiding ATM markup."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/cost-of-living"
      backLabel="Cost of Living"
      sections={[{ id: 'faq', label: 'FAQ' }]}
    >
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
