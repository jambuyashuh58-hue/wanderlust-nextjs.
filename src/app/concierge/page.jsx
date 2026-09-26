import { Check } from 'lucide-react';
import ConciergeForm from '@/components/ConciergeForm';

export const metadata = {
  title: 'Relocation Concierge Service | Wanderlust',
  description: 'Visa paperwork, apartment hunting, and settling in -- handled end to end.',
};

const CONCIERGE_TIERS = [
  { id: 'paperwork', name: 'Visa & Paperwork Guidance', price: 99,
    tagline: 'A focused 45-minute strategy call to map your exact visa route -- no more guessing.',
    includes: ['Personalized visa-route checklist for your nationality', 'A 45-minute live call', 'Document review plus up to 3 follow-up emails', 'Help booking your e-ikamet appointment', 'Access to long-stay guides'] },
  { id: 'apartment', name: 'Apartment Shortlisting', price: 449,
    tagline: '5-8 real listings matched to your budget, with curated video walkthroughs.',
    includes: ['Everything in Visa & Paperwork Guidance', '5-8 real rental listings pre-screened for foreigner-friendly landlords', 'Curated walkthrough videos', 'Localized contract checklist', 'DASK insurance setup guidance', 'Negotiation guidance', 'Comparison summary'] },
  { id: 'full', name: 'Full Relocation Concierge', price: 999,
    tagline: 'Hand us the whole first month — visa, housing, banking, and settling in.',
    includes: ['Everything in Apartment Shortlisting', 'Bilingual local specialist accompaniment', 'Airport arrival logistics', 'Neighborhood orientation write-up', 'First-month cost breakdown', 'Priority response time', 'Weekly async check-ins'] },
];

export default function ConciergeServicePage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Move to Türkiye, handled.</h1>
          <p className="text-foreground/80 max-w-2xl mx-auto leading-relaxed">We help remote workers relocate -- visa paperwork, apartment hunting, and your first-month setup, done right.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CONCIERGE_TIERS.map((tier) => (
            <div key={tier.id} className="rounded-2xl border border-border p-6 bg-card flex flex-col">
              <h3 className="font-bold text-lg mb-1">{tier.name}</h3>
              <div className="text-3xl font-bold mb-2">${tier.price}</div>
              <p className="text-sm text-muted-foreground mb-4">{tier.tagline}</p>
              <ul className="space-y-2 flex-1">
                {tier.includes.map((item, i) => <li key={i} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-success shrink-0 mt-0.5" /><span>{item}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-lg mx-auto rounded-2xl border border-border p-8 bg-card">
          <h2 className="text-xl font-bold mb-4">Get in touch</h2>
          <ConciergeForm />
        </div>
      </div>
    </div>
  );
}
