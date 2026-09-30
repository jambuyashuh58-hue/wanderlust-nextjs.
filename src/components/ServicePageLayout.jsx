import Link from 'next/link';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import GuideSchema from '@/components/GuideSchema';

// Shared template for the /services/* concierge pages (Sep 2026 restructure,
// Phase 1). Content comes from ConciergeInteractive.jsx's CONCIERGE_TIERS so
// pricing/inclusions stay a single source of truth.
export default function ServicePageLayout({ path, name, price, tagline, includes, faq, bookHref = '/services/book-a-discovery-call' }) {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <GuideSchema type="Service" path={path} title={name} description={tagline} faq={faq} serviceMeta={{ price: price.replace(/[^0-9.]/g, '') }} />
      <div className="bg-[hsl(221,55%,26%)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5"><ArrowLeft className="w-4 h-4" /> All services</Link>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-5">{price}</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{name}</h1>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">{tagline}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-xl font-bold mb-5">What&apos;s included</h2>
        <ul className="space-y-3 mb-10">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-amber-400/40 bg-amber-50 dark:bg-amber-950/20 p-6 sm:p-8 text-center mb-12">
          <p className="font-semibold mb-1">Ready to get started?</p>
          <p className="text-sm text-muted-foreground mb-4">Book a free discovery call and we&apos;ll confirm this is the right fit before anything is charged.</p>
          <Link href={bookHref} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold shadow-lg hover:opacity-90 transition-opacity">
            Book a Free Discovery Call
          </Link>
        </div>

        {faq?.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-5">Frequently asked questions</h2>
            <div className="space-y-5">
              {faq.map((f) => (
                <div key={f.q}>
                  <p className="font-semibold text-sm mb-1">{f.q}</p>
                  <p className="text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
