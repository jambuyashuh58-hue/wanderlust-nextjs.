import ServicePageLayout from '@/components/ServicePageLayout';

export const metadata = {
  title: 'Apartment Shortlisting ($449) | Move to Istanbul',
  description: '5–8 real Istanbul rental listings matched to your budget and preferred neighborhood, with curated video walkthroughs.',
  alternates: { canonical: '/services/apartment-shortlisting' },
};

const INCLUDES = [
  'Everything in Visa & Paperwork Guidance',
  '5–8 real rental listings matched to your budget and preferred neighborhood, pre-screened for foreigner-friendly landlords',
  'Curated walk-through videos provided directly by local property agents or our on-the-ground team',
  'A localized contract checklist highlighting common rental terms to look out for',
  'DASK earthquake insurance guidance',
  'Guidance on negotiating rent and deposit',
];

const FAQ = [
  { q: 'How long does shortlisting take?', a: 'Typically 5–10 business days from your kickoff call, depending on how specific your neighborhood and budget requirements are.' },
  { q: 'Do I have to sign the lease remotely?', a: "No — most clients view walkthrough videos remotely, then either visit in person before signing or authorize a trusted local contact. We'll walk you through both options." },
  { q: 'What if none of the listings work?', a: "We'll keep sourcing within the scope of this package until you have a shortlist you're happy with." },
];

export default function ApartmentShortlistingPage() {
  return (
    <ServicePageLayout
      path="/services/apartment-shortlisting"
      name="Apartment Shortlisting"
      price="$449"
      tagline="5–8 real listings matched to your budget, with curated video walkthroughs."
      includes={INCLUDES}
      faq={FAQ}
    />
  );
}
