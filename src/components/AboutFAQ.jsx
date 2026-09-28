import GuideFAQ from '@/components/GuideFAQ';

const FAQ_ITEMS = [
  {
    q: 'Who is behind Move to Istanbul?',
    a: 'Move to Istanbul is run by a small, independent team based in and around Türkiye. We’re not a big travel publisher — every collection, guide, and concierge reply comes from a real person, not a content farm.',
  },
  {
    q: 'How is Move to Istanbul different from Lonely Planet or TripAdvisor?',
    a: 'We’re narrower on purpose: Türkiye only, and we mix two things most sites keep separate — real, bookable activities with live prices and honest ratings, and a genuine long-stay/relocation section for people asking "could I actually live here?" instead of just "what should I see this weekend?"',
  },
  {
    q: 'How does Move to Istanbul make money?',
    a: 'Two ways: affiliate commissions when you book an activity through one of our booking-partner links (Viator or GetYourGuide), at no extra cost to you, and our relocation concierge service for people who want hands-on help with visas, apartment hunting, or a full move. We never accept payment to rank an activity higher.',
  },
  {
    q: 'Do you have on-the-ground presence in Türkiye?',
    a: 'Yes — our relocation guidance and concierge service are informed by people who actually live in and have moved to Türkiye, not just secondhand research.',
  },
  {
    q: 'Is your information kept up to date?',
    a: 'Prices, ratings, and review counts are pulled from the booking partner’s live listing rather than typed in once and forgotten. Visa and residency guidance is checked against official Turkish government sources, and we note the date a guide was last reviewed.',
  },
];

export default function AboutFAQ() {
  return <GuideFAQ items={FAQ_ITEMS} />;
}
