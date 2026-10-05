import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getActivitiesByCategory } from '@/lib/supabaseServer';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';
import ActivityCard from '@/components/ActivityCard';

export const revalidate = 3600;

export const metadata = {
  title: 'Using the Ferry as a Daily Commute Hack, Plus Weekend Getaways from Istanbul | Move to Istanbul',
  description: "How Istanbul's ferry transfer-discount actually works, and the cost and logistics of planning a weekend getaway once you live here.",
  alternates: { canonical: '/living-in-istanbul/weekend-logistics' },
};

const FERRY_FARES = [
  { route: 'Üsküdar ↔ Eminönü', fare: '₺58.52' },
  { route: 'Kadıköy ↔ Beşiktaş / Karaköy', fare: '₺65.21' },
  { route: 'Bosphorus / Golden Horn lines', fare: '₺76.90' },
  { route: "Princes' Islands", fare: '₺151.23' },
];

const TRANSFER_DISCOUNTS = [
  { leg: '1st transfer within 120 minutes', fare: '₺41.43' },
  { leg: '2nd transfer', fare: '₺34.28' },
  { leg: '3rd–5th transfer', fare: '₺29.92' },
];

const FAQ = [
  {
    q: 'Is the ferry actually cheaper than the metro?',
    a: 'Not on a standalone fare — a metro or bus ride is ₺46.20 flat, while a ferry runs ₺58.52–₺151.23 depending on the line. The ferry only gets cheap when you treat it as a transfer leg of a longer trip, not a standalone ride.',
  },
  {
    q: 'How does the transfer discount actually work?',
    a: "İstanbulkart gives a discount on any ride taken within 120 minutes of your previous tap — including a ferry. If your commute is already bus-to-ferry or metro-to-ferry, make sure you're tapping within that window every time; it's the difference between paying full fare and paying the discounted transfer rate on every single leg.",
  },
  {
    q: 'Are night ferries more expensive?',
    a: "Yes — sailings between 00:30 and 05:30 cost double the standard fare and don't qualify for the transfer discount. Worth knowing if your work schedule has you coming home late.",
  },
  {
    q: 'How far in advance should I book a weekend trip out of the city?',
    a: 'For popular multi-day trips (Cappadocia, Ephesus), booking 1–2 weeks ahead keeps you away from last-minute price spikes, especially flight-inclusive packages. Day trips closer to Istanbul (Princes’ Islands, Şile, Sapanca) are far more forgiving — a day or two ahead is usually fine.',
  },
];

export default async function WeekendLogisticsPage() {
  const boatTours = await getActivitiesByCategory('Boat Tours', 8).catch(() => []);

  return (
    <GuideLayout
      eyebrow="Living in Istanbul"
      title="Weekend Logistics: Ferries, Transfers, and Getting Out of the City"
      description="The ferry transfer discount that makes commuting by boat affordable, and what it actually costs to plan a weekend away."
      readTime="6 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/living-in-istanbul"
      backLabel="Living in Istanbul"
      sections={[
        { id: 'ferry-commute', label: 'The ferry commute hack' },
        { id: 'fares', label: 'Fares & transfers' },
        { id: 'weekend-trips', label: 'Planning a getaway' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="ferry-commute">
        <h2 className="text-2xl font-bold mb-4">Using the public ferry as a daily commute, not a tourist cruise</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Every tourist does the Bosphorus cruise once. Almost no one explains that the same Şehir Hatları ferries are a real, scheduled commute option — if you live on one side of the Bosphorus and work (or just want to be) on the other, the ferry can replace a bridge crossing by bus that's often slower in traffic.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          The catch: fares run higher than a flat metro or bus ride. The trick residents use is the İstanbulkart transfer discount — tap onto the ferry within 120 minutes of your last tap (bus, metro, tram) and you pay the discounted transfer rate instead of a second full fare.
        </p>
      </section>

      <section id="fares">
        <h2 className="text-2xl font-bold mb-4">Current fares (with İstanbulkart)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Standalone ferry fares</p>
            <ul className="space-y-2">
              {FERRY_FARES.map((f) => (
                <li key={f.route} className="flex items-center justify-between text-sm"><span className="text-foreground/80">{f.route}</span><span className="font-semibold">{f.fare}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Transfer-discount fares (within 120 min)</p>
            <ul className="space-y-2">
              {TRANSFER_DISCOUNTS.map((t) => (
                <li key={t.leg} className="flex items-center justify-between text-sm"><span className="text-foreground/80">{t.leg}</span><span className="font-semibold">{t.fare}</span></li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-3">For comparison: a standalone metro or bus ride is a flat ₺46.20.</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">Fares change periodically with inflation adjustments — treat these as a current snapshot, not a permanent price.</p>
      </section>

      {boatTours.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-2">Bosphorus routes worth booking (not just commuting)</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">For the days you want the scenic version, not the commute version:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {boatTours.map((a) => <ActivityCard key={a.id} activity={a} />)}
          </div>
        </section>
      )}

      <section id="weekend-trips">
        <h2 className="text-2xl font-bold mb-4">Planning a weekend getaway, cost &amp; logistics</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Once you're not a tourist on a fixed itinerary, weekend trips become a rotation, not a bucket list. Short day trips (Princes' Islands, Şile, Sapanca) need almost no planning. Multi-day trips further out (Cappadocia, Ephesus) are worth booking 1–2 weeks ahead if they involve a flight, since flight-inclusive packages spike closer to the date.
        </p>
        <Link href="/living-in-istanbul/weekend-trips-from-istanbul" className="group flex items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 hover:border-primary/40 transition-all">
          <div><h3 className="font-bold mb-1">See our full weekend-trips collection</h3><p className="text-sm text-muted-foreground">Day trips and multi-day getaways, curated for people who live here — not a one-week visit.</p></div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>
      </section>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
