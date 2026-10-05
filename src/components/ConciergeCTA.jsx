// New component -- dedicated Concierge CTA block for the homepage.
// Pricing pulled from the old site's src/lib/siteConfig.js CONCIERGE_TIERS
// ($99 / $449 / $999). If the real current prices differ, edit the `price`
// values below -- nothing else needs to change.
// Import in page.jsx: import ConciergeCTA from '@/components/ConciergeCTA';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const TIERS = [
  { name: 'Visa & Paperwork Guidance', price: 99 },
  { name: 'Apartment Shortlisting', price: 449 },
  { name: 'Full Relocation Concierge', price: 999 },
];

export default function ConciergeCTA() {
  return (
    <section className="py-10">
      <div className="rounded-3xl bg-gradient-primary p-8 md:p-12 text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-4">
            Relocation Concierge
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Moving to Türkiye, not just visiting?</h2>
          <p className="text-white/90 mb-6 leading-relaxed max-w-xl mx-auto">
            We handle the visa route, the apartment hunt, and the paperwork so you don&apos;t have to
            figure it out from a foreign-language government site.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
            {TIERS.map((t) => (
              <div key={t.name} className="rounded-xl bg-white/10 border border-white/20 p-4 text-center">
                <p className="text-sm font-semibold mb-1">{t.name}</p>
                <p className="text-lg font-bold">${t.price}</p>
              </div>
            ))}
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
          >
            See concierge details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
