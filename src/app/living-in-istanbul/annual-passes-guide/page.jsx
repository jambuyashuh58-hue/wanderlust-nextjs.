import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { getActivitiesByCategory } from '@/lib/supabaseServer';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';
import ActivityCard from '@/components/ActivityCard';

export const revalidate = 3600;

export const metadata = {
  title: 'Museums Worth Joining for Annual Passes | Move to Istanbul',
  description: 'Is the Istanbul Museum Pass worth it once you live here, not just visit? How the pass works, what it covers, and the break-even math for residents.',
  alternates: { canonical: '/living-in-istanbul/annual-passes-guide' },
};

const INCLUDED_SITES = [
  'Topkapı Palace', 'Istanbul Archaeology Museums', 'Turkish and Islamic Arts Museum',
  'Galata Tower', 'Rumeli Fortress', 'Great Palace Mosaics Museum', "Maiden's Tower", 'Galata Mevlevi House',
];

const FAQ = [
  {
    q: 'Does the Museum Pass include Hagia Sophia?',
    a: 'No — Hagia Sophia was converted back to an active mosque and is no longer part of the Museum Pass Istanbul coverage. Entry to the mosque itself is free, but any paid "experience" exhibit attached to it is a separate ticket. Always check the current inclusion list at muze.gen.tr before assuming a site is covered.',
  },
  {
    q: 'How long is the pass valid for?',
    a: "Five days (120 hours), starting from your first entry — not from the date you buy it. That matters if you're a resident: buy it the morning you plan to start using it, not weeks in advance, or you'll burn validity days doing nothing.",
  },
  {
    q: "As a resident, am I better off buying single tickets instead?",
    a: "If you're planning to see three or more of the major paid sites (Topkapı Palace and the Archaeology Museums are the two biggest-ticket items) within the same five-day window, the pass usually comes out ahead or close to breakeven. If you're spreading museum visits out over months rather than one concentrated push, single tickets make more sense — the pass's clock keeps running whether you use it or not.",
  },
  {
    q: 'Is pricing on this page current?',
    a: "Museum and pass pricing changes periodically — this page describes how the pass works and what it's worth checking, but always confirm the current price and included-sites list at muze.gen.tr before buying.",
  },
];

export default async function AnnualPassesGuidePage() {
  const museums = await getActivitiesByCategory('Museums', 12).catch(() => []);

  return (
    <GuideLayout
      eyebrow="Living in Istanbul"
      title="Museums Worth Joining for Annual Passes"
      description="The Istanbul Museum Pass, explained for residents — not tourists squeezing in a weekend."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/living-in-istanbul"
      backLabel="Living in Istanbul"
      sections={[
        { id: 'intro', label: 'The resident angle' },
        { id: 'how-it-works', label: 'How the pass works' },
        { id: 'museums', label: 'Museums on our site' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="intro">
        <h2 className="text-2xl font-bold mb-4">A tourist buys the pass once. You live here — the math is different.</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Most "is the Museum Pass worth it" articles are written for someone in Istanbul for four days who wants to hit every major site before flying home. If you've actually moved here, your calculation is different: you have time, so the question isn't "can I fit it all into five days" — it's whether concentrating your museum visits into one five-day push is worth it versus paying single entry whenever you happen to feel like it.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Short version: the pass rewards a deliberate "museum weekend," not casual, spread-out visits.
        </p>
      </section>

      <section id="how-it-works">
        <h2 className="text-2xl font-bold mb-4">How the Museum Pass Istanbul actually works</h2>
        <div className="rounded-2xl border border-border bg-card p-5 mb-5">
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">
            <strong className="text-foreground">Validity:</strong> 5 days (120 hours), starting from your first entry — not from purchase. The pass itself stays purchasable for a year after you buy it, so there's no rush to use it the week you get it.
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            <strong className="text-foreground">Price:</strong> Roughly 6,500 TL as of early 2026 — this moves with inflation and changes periodically, so treat that as a ballpark and confirm the current figure before buying.
          </p>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-3">Sites typically included:</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {INCLUDED_SITES.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium">{s}</span>
          ))}
        </div>
        <p className="text-foreground/80 leading-relaxed">
          Topkapı Palace and the Archaeology Museums are the two highest-value single tickets on that list — if your five-day window includes both, the pass is usually close to breakeven or ahead. A 20–30% partner discount at a handful of private museums, shops, and hamams is also included, which single tickets don't give you.
        </p>
        <a href="https://muze.gen.tr/MuseumPasses" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-4">
          Check current pricing on the official Müze Kart site <ExternalLink className="w-3 h-3" />
        </a>
      </section>

      {museums.length > 0 && (
        <section id="museums">
          <h2 className="text-2xl font-bold mb-2">Museums &amp; historic sites on Move to Istanbul</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">Skip-the-line tickets and guided options for sites covered above and nearby ones worth adding to your visit.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {museums.map((a) => <ActivityCard key={a.id} activity={a} />)}
          </div>
        </section>
      )}

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Building your first-month routine already?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Museum passes are a nice-to-have. Getting your residence permit, housing, and budget locked down is what actually makes the first month work. Our Full Move File handles the paperwork so you have time for the museum weekend.
        </p>
        <Link href="/services" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Concierge Plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
