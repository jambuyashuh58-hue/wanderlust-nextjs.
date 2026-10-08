import { Suspense } from 'react';
import ConciergeInteractive from '@/components/ConciergeInteractive';
import Proof from '@/components/Proof';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata = {
  title: 'Relocation Concierge: Visa, Housing & Trip Planning from $20 | MoveToIstanbul',
  description: 'Planning help for people moving to Türkiye. Includes visa-route checklists, apartment shortlists, and clear next steps — async, from $20.',
  alternates: { canonical: '/concierge' },
};

// Payment links are created in the payment provider's dashboard (PayPal.Me /
// payment buttons / Stripe Payment Links all work) and supplied as env vars.
// Only https URLs are passed through; a tier with no link falls back to the
// inquiry form, so the page never shows a dead Pay button.
function getPaymentLinks() {
  const env = {
    trip_package: process.env.PAYMENT_LINK_TRIP_PACKAGE,
    paperwork: process.env.PAYMENT_LINK_PAPERWORK,
    apartment: process.env.PAYMENT_LINK_APARTMENT,
    full: process.env.PAYMENT_LINK_FULL,
  };
  return Object.fromEntries(Object.entries(env).filter(([, v]) => typeof v === 'string' && /^https:\/\//.test(v.trim())).map(([k, v]) => [k, v.trim()]));
}

export default async function ConciergeServicePage() {
  const paymentLinks = getPaymentLinks();
  const services = [
    ['Trip Package Planning', 20, 'Day-by-day Türkiye itinerary with activities, hotel range and booking links.'],
    ['Visa & Paperwork Guidance', 99, '45-minute strategy call and document review for your Türkiye visa route.'],
    ['Apartment Shortlisting', 449, '5-8 real rental listings matched to your budget, with video walkthroughs.'],
    ['Full Relocation Concierge', 999, 'First-month relocation support: visa, housing, banking and settling in.'],
  ].map(([name, price, description]) => ({
    '@type': 'Service', name, description, serviceType: 'Relocation and travel planning',
    provider: { '@type': 'Organization', name: 'Move to Istanbul', url: 'https://www.movetoistanbul.online' },
    areaServed: 'TR',
    offers: { '@type': 'Offer', price: String(price), priceCurrency: 'USD', url: 'https://www.movetoistanbul.online/concierge' },
  }));
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <PageJsonLd name="Relocation Concierge" description="Visa paperwork, apartment hunting, and your first-month setup." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': services }) }} />
      <div className="bg-[hsl(221,55%,26%)] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-5">Relocation Concierge</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">We Handle the Parts of Moving to Türkiye That Eat Your Evenings</h1>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed">
            Visa paperwork, apartment hunting, and your first-month setup — done for you, async, no calls required. Pick the level of help that fits.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Proof />
        <Suspense fallback={null}>
          <ConciergeInteractive paymentLinks={paymentLinks} />
        </Suspense>
      </div>
    </div>
  );
}
