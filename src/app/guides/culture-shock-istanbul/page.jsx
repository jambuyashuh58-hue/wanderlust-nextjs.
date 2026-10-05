import Link from 'next/link';
import { CheckCircle2, Brain, ArrowRight, Users } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Expat Culture Shock Living in Istanbul: What to Expect & How to Adapt (2026) | Move to Istanbul',
  description: 'The 4 phases of culture shock, the real friction points newcomers hit, and a practical adaptation plan for living in Istanbul.',
};

const PHASES = [
  { name: 'Honeymoon Phase', when: 'Weeks 1–4', detail: 'Swept away by Bosphorus views, Turkish tea culture, historical landmarks, and warm local hospitality.' },
  { name: 'Friction Phase', when: 'Months 2–4', detail: 'Confronting daily administrative hurdles, language barriers, bureaucratic delays at government offices (Göç İdaresi, PTT), and urban sensory overload.' },
  { name: 'Acclimatization Phase', when: 'Months 5–8', detail: 'Establishing reliable routines, learning basic conversational Turkish, navigating public transit with ease, and forming a social network.' },
  { name: 'Local Integration', when: 'Month 9+', detail: "Embracing the city's rhythms, managing local expectations effortlessly, and feeling genuinely rooted in your neighborhood." },
];

const FRICTION_POINTS = [
  {
    title: 'Bureaucratic Patience & Flexible Timelines',
    reality: 'Administrative processes in Türkiye operate on a relational and in-person basis rather than rigid linear schedules. Paperwork rules (e.g., getting e-Devlet passwords at PTT or registering utility bills) can vary between neighborhood branches.',
    adapt: 'Approach government visits with flexibility, print out all official circulars in advance, and hire a licensed local accountant (SMMM) or legal advisor for complex procedures.',
  },
  {
    title: 'Sensory Overload: Sound, Density & Energy',
    reality: 'Istanbul is a mega-city of 16+ million people. Early-morning calls to prayer (Ezan), vibrant street vendors, dense traffic, and bustling ferry docks can feel overwhelming to arrivals from quieter environments.',
    adapt: 'Choose your residential neighborhood strategically. Quiet suburban pockets (Zekeriyaköy, Dragos) suit those seeking calm; central districts (Moda, Cihangir, Beşiktaş) suit those who thrive on urban energy.',
  },
  {
    title: 'Warm Hospitality vs. Privacy & Boundaries',
    reality: 'Turkish culture is deeply collectivist and hospitable. Neighbors, shopkeepers, and building caretakers (kapıcı) will frequently offer help, ask friendly personal questions, or share tea (çay).',
    adapt: 'Reframe personal curiosity as genuine warmth rather than an invasion of privacy. Accepting a glass of tea builds strong social capital in your local neighborhood.',
  },
  {
    title: 'The Language Barrier & Foreigner Bubble',
    reality: 'While English is widely spoken in corporate offices, international schools, and tourist hubs, daily neighborhood life (butchers, plumbers, local tax offices) operates almost exclusively in Turkish.',
    adapt: 'Learn 20 essential daily Turkish phrases immediately. Locals deeply appreciate the effort, and trying to speak Turkish opens doors and prevents tourist-tier misunderstandings.',
  },
];

const SOCIAL_STRATEGY = [
  { title: 'Join Active Expat Communities', body: 'Connect with groups like Yabangee, international coworking spaces (Kolektif House, Workinton, Impact Hub), or local expat meetups in Kadıköy and Beyoğlu.' },
  { title: 'Establish "Third Places"', body: "Become a regular at a local neighborhood cafe, bakery, or gym. Istanbul neighborhood life relies on personal recognition, and regular visits create an immediate sense of belonging." },
  { title: 'Balance Expat & Local Networks', body: 'Expat friends offer shared empathy during initial culture shock; local Turkish friends provide deep cultural context and neighborhood insights. You need both.' },
];

const SANITY_RULES = [
  'Build a multi-layered tech & connectivity setup: home fiber Wi-Fi, a coworking membership, and a mobile eSIM/SIM data backup, so a single outage never stalls remote work.',
  "Beware of comparison traps: avoid measuring Istanbul's pace directly against Western European or North American cities. Errands may take longer, but daily life is richer and more spontaneous.",
  'Pace your administrative tasks: tackle one major bureaucratic task per week (Week 1: SIM card & tax number, Week 2: bank account setup, Week 3: e-İkamet file prep) rather than overwhelming yourself in the first 48 hours.',
];

const CHECKLIST = [
  'Download essential local apps (BiTaksi, İstanbulkart, e-Devlet, Google Translate).',
  'Memorize 20 core Turkish greetings and courtesy phrases (Merhaba, Kolay gelsin, Teşekkür ederim).',
  'Establish your daily local routine at neighborhood shops within 15 minutes of your apartment.',
  'Attend at least two social or networking meetups in your first month.',
  'Schedule a consultation with a local advisor to review your residence permit file and tax setup before deadlines.',
];

const FAQ = [
  {
    q: 'How long does culture shock typically last when moving to Istanbul?',
    a: 'Most newcomers move through four phases over roughly nine months: a honeymoon phase in the first month, a friction phase around months 2-4 as bureaucracy and sensory overload set in, acclimatization by months 5-8 as routines form, and genuine local integration from month 9 onward. This varies by person and how actively you build local routines and relationships.',
  },
  {
    q: 'Why does everything at government offices feel so unpredictable?',
    a: "Administrative processes in Türkiye run on a relational, in-person basis rather than a fixed linear process, and rules can vary slightly between neighborhood branches of the same office (PTT, Göç İdaresi). Bringing printed official circulars and, for anything complex, hiring a licensed local accountant (SMMM) or legal advisor removes most of the unpredictability.",
  },
  {
    q: 'Is it normal to feel overwhelmed by noise and crowds at first?',
    a: "Yes — Istanbul is a mega-city of over 16 million people, and the call to prayer, street vendors, traffic, and ferry docks are a real sensory step up from quieter home environments for most newcomers. Choosing a calmer neighborhood (Zekeriyaköy, Dragos) versus a high-energy central one (Moda, Cihangir, Beşiktaş) is the single biggest lever you control here.",
  },
  {
    q: 'Do I need to speak Turkish to live comfortably in Istanbul?',
    a: "English covers corporate offices, international schools, and tourist areas well, but daily neighborhood life — butchers, plumbers, the local tax office — runs almost entirely in Turkish. You don't need fluency, but learning roughly 20 daily phrases removes most friction and is visibly appreciated by locals.",
  },
  {
    q: 'What is the fastest way to build a social network after moving?',
    a: 'Combine three tracks at once: join an established expat community (Yabangee, or a coworking space like Kolektif House or Impact Hub) for immediate shared-context friends, pick one or two neighborhood "third places" (a cafe, bakery, gym) you visit regularly enough to be recognized, and make an effort to build local Turkish friendships alongside your expat network — each gives you something the other can’t.',
  },
];

export default function CultureShockGuidePage() {
  return (
    <GuideLayout
      eyebrow="Settling In Guide"
      title="Expat Culture Shock Living in Istanbul: What to Expect & How to Adapt"
      description="The four phases of adjustment, the real friction points, and a practical plan to integrate faster."
      readTime="7 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[
        { id: 'phases', label: 'The 4 Phases' },
        { id: 'friction', label: 'Friction Points' },
        { id: 'social', label: 'Social Integration' },
        { id: 'rules', label: 'Practical Rules' },
        { id: 'checklist', label: 'Adaptation Checklist' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      {/* Phases */}
      <section id="phases">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Brain className="w-5 h-5 text-primary" /> The 4 Phases of Culture Shock in Istanbul</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Moving to Istanbul is exhilarating — the city bridges two continents, offers world-class cuisine, and hums with ancient history. But transitioning from short-term tourist to long-term foreign resident comes with distinct emotional and cultural adjustment phases.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PHASES.map((p, i) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-4">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">{i + 1}</span>
              <p className="font-semibold text-sm mb-0.5">{p.name}</p>
              <p className="text-xs text-muted-foreground mb-2">{p.when}</p>
              <p className="text-xs text-foreground/70 leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Friction points */}
      <section id="friction">
        <h2 className="text-2xl font-bold mb-4">Top Cultural Friction Points for New Expat Residents</h2>
        <div className="space-y-5">
          {FRICTION_POINTS.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-semibold mb-3">{item.title}</p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3"><span className="font-medium text-foreground">The reality: </span>{item.reality}</p>
              <div className="rounded-lg bg-success/10 border border-success/20 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-success mb-1">How to Adapt</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.adapt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social integration */}
      <section id="social">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Social Integration & Building Your Circle</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">Overcoming social isolation is the single most important factor in a successful relocation.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SOCIAL_STRATEGY.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-semibold text-sm mb-2">{s.title}</p>
              <p className="text-xs text-foreground/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Practical rules */}
      <section id="rules">
        <h2 className="text-2xl font-bold mb-4">Practical Sanity Rules for New Arrivals</h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-3">
            {SANITY_RULES.map((rule) => (
              <li key={rule} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span>{rule}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want a Head Start on the Friction Phase?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Most of the friction above traces back to paperwork and housing logistics, not the city itself. Our concierge service handles the visa and apartment-hunting side so you can spend your first months adapting, not firefighting.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Concierge Plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Checklist */}
      <section id="checklist">
        <h2 className="text-2xl font-bold mb-4">Actionable 5-Step Expat Adaptation Checklist</h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-3">
            {CHECKLIST.map((item, i) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">What newcomers ask most often about adjusting to life in Istanbul.</p>
        <GuideFAQ items={FAQ} />
        <p className="text-xs text-muted-foreground leading-relaxed mt-6">Page last updated {new Date().toISOString().slice(0, 10)}.</p>
      </section>
    </GuideLayout>
  );
}
