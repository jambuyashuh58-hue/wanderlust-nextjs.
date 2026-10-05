import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Local Routines in Istanbul: Markets, Pharmacies & Gyms | Move to Istanbul',
  description: 'Grocery shopping vs. eating out, the weekly neighborhood pazar, finding a 24-hour pharmacy, and gym options — the everyday routine, not the sightseeing.',
  alternates: { canonical: '/living-in-istanbul/local-routines/' },
};

const SUPERMARKET_TIERS = [
  { tier: 'Budget', chains: 'BİM, Şok, A101', note: "Private-label heavy, limited variety, lowest prices in the city. Good for staples; don't expect much selection." },
  { tier: 'Mid-range', chains: 'Migros, CarrefourSA', note: 'The everyday default for most residents — widest coverage across neighborhoods, reliable stock, home delivery apps.' },
  { tier: 'Premium', chains: 'Macrocenter', note: 'Imported and specialty goods, concentrated in Nişantaşı and Etiler. Worth a trip for specific items, not weekly shopping.' },
];

const FAQ = [
  {
    q: 'Is it cheaper to cook or eat out in Istanbul?',
    a: "Cooking from a mid-range supermarket (Migros, CarrefourSA) is meaningfully cheaper than eating out regularly, especially once you're buying produce at the weekly pazar instead of the supermarket. Eating out is good value compared to Western cities, but it adds up fast as a daily habit — the budget math favors a mixed routine: pazar for produce, supermarket for packaged goods, eating out as the exception, not the default.",
  },
  {
    q: "What is a 'pazar' and do I need to go?",
    a: "A pazar is a weekly open-air neighborhood market — not a tourist bazaar, a genuinely local one that happens on a fixed day in your specific neighborhood. Produce, cheese, and household basics are noticeably cheaper and fresher than the supermarket equivalent. It's worth building into your routine once you know your neighborhood's pazar day.",
  },
  {
    q: 'How do I find an open pharmacy at night or on a Sunday?',
    a: "Turkey runs a rotating 'nöbetçi eczane' (duty pharmacy) system — at least one pharmacy per district stays open on Sundays and overnight. When a pharmacy (eczane, marked with a green cross) is closed, it posts the current duty pharmacy's address in the window. Searching \"nöbetçi eczane\" plus your district name online also works reliably.",
  },
  {
    q: 'Are gym memberships worth it, or should I just run outside?',
    a: "Depends on your neighborhood and the season — Istanbul's waterfront paths (the Bosphorus, Caddebostan in Kadıköy) are genuinely good for running most of the year. A gym membership (MACFit and similar chains have locations across most central neighborhoods) makes more sense if you want strength training or a predictable indoor routine through the wetter months.",
  },
];

export default function LocalRoutinesPage() {
  return (
    <GuideLayout
      eyebrow="Living in Istanbul"
      title="Local Routines: Markets, Pharmacies & Gyms"
      description="Grocery shopping vs. eating out, the weekly neighborhood market, and the everyday logistics tourists never need to think about."
      readTime="6 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/living-in-istanbul"
      backLabel="Living in Istanbul"
      sections={[
        { id: 'groceries', label: 'Groceries & the pazar' },
        { id: 'pharmacies', label: 'Pharmacies' },
        { id: 'gyms', label: 'Gyms & fitness' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="groceries">
        <h2 className="text-2xl font-bold mb-4">Grocery shopping vs. eating out, balancing your budget</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Istanbul supermarkets split cleanly into three tiers. Knowing which one to default to — and mixing in the weekly neighborhood market — is most of the difference between a comfortable monthly budget and a tight one.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {SUPERMARKET_TIERS.map((t) => (
            <div key={t.tier} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{t.tier}</p>
              <p className="font-semibold mb-2">{t.chains}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{t.note}</p>
            </div>
          ))}
        </div>
        <p className="text-foreground/80 leading-relaxed">
          On top of the supermarket rotation, every neighborhood has a weekly <strong className="text-foreground">pazar</strong> — an open-air market, not a tourist bazaar — on a fixed day. Produce, cheese, and household basics run noticeably cheaper and fresher there than at any supermarket. Ask a neighbor or your landlord which day your neighborhood's pazar runs; it's not something that's easy to find listed online in English.
        </p>
      </section>

      <section id="pharmacies">
        <h2 className="text-2xl font-bold mb-4">Finding a pharmacy (eczane) — including at night</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Pharmacies are marked with a green cross and the word <em>eczane</em>. Normal hours are roughly 9am–7pm, but Turkey runs a rotating duty system called <strong className="text-foreground">nöbetçi eczane</strong> — at least one pharmacy per district stays open overnight and on Sundays.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          If the nearest pharmacy is closed, it will have a sign in the window listing the address of that night's duty pharmacy. Searching "nöbetçi eczane" plus your district name (e.g. "nöbetçi eczane Kadıköy") also pulls up current listings reliably.
        </p>
      </section>

      <section id="gyms">
        <h2 className="text-2xl font-bold mb-4">Gyms &amp; staying active</h2>
        <p className="text-foreground/80 leading-relaxed">
          Chain gyms like MACFit have locations across most central neighborhoods, with month-to-month membership options — useful if you want strength equipment or a predictable indoor routine. If you're near the water, the Bosphorus and Caddebostan (Kadıköy) waterfront paths are well-used running and cycling routes for most of the year, and free.
        </p>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Getting the big budget numbers right matters more than any of this</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Groceries and gym memberships are rounding errors next to rent, visa costs, and health insurance. If you haven't nailed down a realistic monthly budget yet, start there.
        </p>
        <Link href="/guides/cost-of-living" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Full Cost-of-Living Guide <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
