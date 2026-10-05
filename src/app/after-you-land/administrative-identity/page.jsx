import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Administrative Identity in Türkiye: Tax ID & YKN | Move to Istanbul',
  description: 'The ID numbers you\'ll actually be asked for as a foreign resident in Türkiye — tax ID and the YKN residence permit number.',
  alternates: { canonical: '/after-you-land/administrative-identity/' },
};

const FAQ = [
  {
    q: 'What is the Potential Tax ID Number and why do I need it first?',
    a: "It's generated via ivd.gib.gov.tr and is a prerequisite for opening a bank account, some utility contracts, and ultimately the residence permit application itself — get it in your first week.",
  },
  {
    q: 'What is the YKN number?',
    a: 'It\'s the foreigner identification number (starting with 99) issued once your residence permit is approved. Once you have it, you can register your IstanbulKart online for discounted passes and use it for various official purposes in place of your passport number.',
  },
  {
    q: 'Do I need a separate number for healthcare?',
    a: "Private insurance is typically tied to your policy number rather than a separate government ID, but your YKN becomes relevant once you're eligible to opt into Türkiye's public health system (SGK), which is a separate, longer-term consideration.",
  },
];

export default function AdministrativeIdentityPage() {
  return (
    <GuideLayout
      eyebrow="After You Land"
      title="Administrative Identity"
      description="Tax ID, YKN number, and the IDs you'll actually be asked for."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/after-you-land"
      backLabel="After You Land"
      sections={[{ id: 'faq', label: 'FAQ' }]}
    >
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
