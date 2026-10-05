import Link from 'next/link';
import { ArrowRight, Wifi, Volume2, Plug } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Best Cafés in Istanbul for Remote Workers (Wi-Fi, Plugs, Noise Levels) | Move to Istanbul',
  description: 'A neighborhood-by-neighborhood guide to laptop-friendly cafés in Kadıköy, Nişantaşı/Şişli, and Beşiktaş/Beyoğlu — with real notes on Wi-Fi, outlets, and how loud they actually get.',
  alternates: { canonical: '/living-in-istanbul/remote-work-cafes' },
};

// Noise scale used consistently across every café card below:
// 'quiet' = good for calls, 'moderate' = fine for heads-down work,
// 'lively' = better for casual tasks than deep focus.
const NEIGHBORHOODS = [
  {
    id: 'kadikoy',
    name: 'Kadıköy & Moda',
    intro: 'Istanbul\'s digital-nomad hub on the Asian side — walkable, full of independent coffee roasters, and the easiest place to find a laptop-friendly table on short notice.',
    cafes: [
      {
        name: 'Story Coffee Roasters',
        area: 'Moda',
        notes: 'Strong Wi-Fi and plenty of outlets. Popular with regulars working for hours — if the main room is busy, the back patio is quieter. Pricier than most cafés in the area.',
        wifi: 'Strong', plugs: 'Plenty', noise: 'Moderate (quiet patio option)',
      },
      {
        name: 'Doctrine Coffee',
        area: 'Caferağa',
        notes: 'Free Wi-Fi, power outlets, and spacious seating in a restaurant-heavy stretch of Caferağa — good if you want food options nearby without leaving your table for long.',
        wifi: 'Good', plugs: 'Good', noise: 'Moderate',
      },
      {
        name: 'Espressolab Kadıköy',
        area: 'Caferağa',
        notes: 'Opens early (7am) and stays genuinely quiet on weekday mornings — the best weekday-morning option on this list. Gets louder and more social on weekends, so plan heads-down work for weekdays.',
        wifi: 'Good', plugs: 'Moderate', noise: 'Quiet on weekday mornings',
      },
      {
        name: 'Wanderlust',
        area: 'Rasimpaşa',
        notes: 'Two floors with outlets throughout — the upstairs level gives enough separation from the ground-floor foot traffic for calls.',
        wifi: 'Good', plugs: 'Plenty (both floors)', noise: 'Quieter upstairs',
      },
      {
        name: 'Tasarım Bookshop & Cafe',
        area: 'Caferağa',
        notes: 'A bookshop-café hybrid with a cozy, calming atmosphere — small tables in quiet corners plus larger shared tables if you want to spread out. Resident cats.',
        wifi: 'Moderate', plugs: 'Moderate', noise: 'Quiet, calm',
      },
    ],
  },
  {
    id: 'nisantasi-sisli',
    name: 'Nişantaşı & Şişli',
    intro: 'More corporate and upscale than Kadıköy, with longer café hours and a few genuine all-day workspaces — useful if you\'re based on the European side or have meetings near Levent/Maslak.',
    cafes: [
      {
        name: 'Haha Kafe',
        area: 'Şişli / Teşvikiye',
        notes: 'Wi-Fi, outlets, and a deliberately quiet, study-room feel rather than a social café vibe. Open 7:30am–9pm.',
        wifi: 'Good', plugs: 'Good', noise: 'Quiet',
      },
      {
        name: 'MOC (Ministry of Coffee) Nişantaşı',
        area: 'Nişantaşı',
        notes: 'Two floors, extensive power outlets, and a large bookshelf-lined room — one of the few places on this list that feels built for all-day work rather than a quick coffee.',
        wifi: 'Good', plugs: 'Extensive', noise: 'Moderate',
      },
      {
        name: 'Have Some Coffee',
        area: 'Harbiye',
        notes: 'Two large floors plus a terrace and balcony in a converted, church-like interior. Enough space that it rarely feels crowded even at peak hours.',
        wifi: 'Good', plugs: 'Good', noise: 'Moderate, quieter on upper floor',
      },
      {
        name: "Let's Winkk Nişantaşı",
        area: 'Nişantaşı',
        notes: 'Smaller and more casual, with outlets along the terrace. A two-minute walk from Haha Kafe if that one is full.',
        wifi: 'Moderate', plugs: 'Terrace seating has outlets', noise: 'Moderate',
      },
    ],
  },
  {
    id: 'besiktas-beyoglu',
    name: 'Beşiktaş & Beyoğlu',
    intro: 'Central, close to the ferry docks and Bosphorus — good if your day already has you crossing between the European landmarks and the business district.',
    cafes: [
      {
        name: 'What The Coffee',
        area: 'Beşiktaş',
        notes: 'Outlets and reliable Wi-Fi in a casual, slightly hipster space. Visit on weekdays and sit toward the back if you need to focus — the front gets busy with foot traffic.',
        wifi: 'Good', plugs: 'Good', noise: 'Lively near the entrance, quieter at the back',
      },
      {
        name: 'Espressolab Cihangir',
        area: 'Cihangir',
        notes: 'Two floors with natural light and terrace seating, open from 6:30am — one of the earliest-opening options if you work US hours.',
        wifi: 'Good', plugs: 'Good', noise: 'Moderate',
      },
      {
        name: 'SALT Galata',
        area: 'Galata',
        notes: 'A library/gallery/café hybrid, noticeably quieter than a typical café — the closest thing on this list to an actual reading room. Limited hours (roughly 11am–7pm), so it\'s a midday option, not an all-day one.',
        wifi: 'Moderate', plugs: 'Limited', noise: 'Quiet',
      },
      {
        name: 'Federal Galata',
        area: 'Galata',
        notes: 'Plenty of seating and outlets, open 8am–11pm daily. Arrive early if you want a quiet corner — it fills up through the afternoon.',
        wifi: 'Good', plugs: 'Plenty', noise: 'Quiet early, busier by afternoon',
      },
    ],
  },
];

const FAQ = [
  {
    q: 'Do Istanbul cafés mind if I work on a laptop for hours?',
    a: 'Most of the cafés above are used to it and some are explicitly set up for it (outlets at every table, all-day hours). The ones to be mindful of are small, high-turnover spots without much seating — if a café is clearly built around quick coffee-and-go traffic, order a second item every hour or two and be ready to free up your table if it gets busy.',
  },
  {
    q: "What's the best time of day to find a quiet table?",
    a: 'Weekday mornings, consistently, across every neighborhood on this list. Istanbul cafés get noticeably more social from early afternoon through the evening, and weekends are busier than weekdays everywhere — if you need heads-down focus time, build it into your morning.',
  },
  {
    q: 'Is café Wi-Fi reliable enough for video calls?',
    a: "At the cafés marked 'Good' or 'Strong' Wi-Fi above, yes, for most calls. For anything high-stakes (a client presentation, a large screen share), it's still worth carrying a mobile hotspot or eSIM as backup — Istanbul's café Wi-Fi is generally solid but not uniformly enterprise-grade.",
  },
  {
    q: "Does neighborhood matter for my apartment search, not just for cafés?",
    a: "Yes — this is actually the bigger decision. If working from cafés is a regular part of your routine, it's worth weighting that into where you sign a lease, not treating it as separate from the housing search. Kadıköy and Cihangir/Galata both cluster laptop-friendly cafés within easy walking distance of residential streets; Nişantaşı's are more spread toward the business district.",
  },
];

export default function RemoteWorkCafesPage() {
  return (
    <GuideLayout
      eyebrow="Living in Istanbul"
      title="Best Cafés in Istanbul for Remote Workers"
      description="Where to work outside your apartment — Wi-Fi, outlets, and noise levels, neighborhood by neighborhood."
      readTime="7 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/guides"
      backLabel="All guides"
      sections={[
        { id: 'intro', label: 'Why this matters' },
        { id: 'kadikoy', label: 'Kadıköy & Moda' },
        { id: 'nisantasi-sisli', label: 'Nişantaşı & Şişli' },
        { id: 'besiktas-beyoglu', label: 'Beşiktaş & Beyoğlu' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="intro">
        <h2 className="text-2xl font-bold mb-4">You've signed the lease. Now where do you actually work?</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Setting up internet at home is step one. Step two is accepting that some days you need to leave the apartment — for a change of scenery, because the Wi-Fi is being installed, or because you just need a different kind of background noise. This is a working list of cafés in three neighborhoods that are genuinely set up for a few hours of laptop work, not just a quick coffee: real notes on Wi-Fi reliability, where the outlets actually are, and how loud each place gets at different times of day.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          This isn't a "best coffee in Istanbul" list — plenty of excellent cafés are terrible for working (tiny tables, no outlets, loud by design). Everything below earned its place because it works for a laptop, a long call, or a few focused hours.
        </p>
      </section>

      {NEIGHBORHOODS.map((n) => (
        <section id={n.id} key={n.id}>
          <h2 className="text-2xl font-bold mb-2">{n.name}</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">{n.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {n.cafes.map((c) => (
              <div key={c.name} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-semibold">{c.name}</h3>
                  <span className="text-xs text-muted-foreground shrink-0">{c.area}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">{c.notes}</p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5" /> {c.wifi}</span>
                  <span className="inline-flex items-center gap-1.5"><Plug className="w-3.5 h-3.5" /> {c.plugs}</span>
                  <span className="inline-flex items-center gap-1.5"><Volume2 className="w-3.5 h-3.5" /> {c.noise}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Pick your apartment around your work routine, not after it</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Struggling to find a neighborhood that matches how you actually want to work — close to a laptop-friendly café scene, not just close to the sights? Our Housing Shortlist File filters apartment options by the things that actually affect your daily routine, not just price and bedroom count.
        </p>
        <Link href="/services" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Housing Shortlist File <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
