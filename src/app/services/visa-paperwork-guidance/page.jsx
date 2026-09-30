import ServicePageLayout from '@/components/ServicePageLayout';

export const metadata = {
  title: 'Visa & Paperwork Guidance ($99) | Move to Istanbul',
  description: 'A focused 45-minute strategy call to map your exact Turkish visa and residence-permit route — no more guessing.',
  alternates: { canonical: '/services/visa-paperwork-guidance' },
};

const INCLUDES = [
  'Personalized visa-route checklist for your nationality',
  'A 45-minute live call',
  'Document review plus up to 3 follow-up emails',
  'Help booking your e-ikamet appointment',
  'Access to long-stay guides',
];

const FAQ = [
  { q: 'How fast can I book a call?', a: 'Most calls are scheduled within 2–3 business days of booking.' },
  { q: 'What if my situation changes after the call?', a: 'The 3 follow-up emails cover exactly this — you can send updated documents or ask new questions as your application moves forward.' },
  { q: 'Do you file the application for me?', a: 'This tier is guidance and document review, not filing on your behalf. If you want us to run the whole process, see Full Relocation Concierge.' },
];

export default function VisaPaperworkGuidancePage() {
  return (
    <ServicePageLayout
      path="/services/visa-paperwork-guidance"
      name="Visa & Paperwork Guidance"
      price="$99"
      tagline="A focused 45-minute strategy call to map your exact visa route — no more guessing."
      includes={INCLUDES}
      faq={FAQ}
    />
  );
}
