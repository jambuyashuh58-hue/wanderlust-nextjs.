import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getActivitiesByCategory } from '@/lib/supabaseServer';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';
import ActivityCard from '@/components/ActivityCard';

export const revalidate = 3600;

export const metadata = {
  title: 'Skills Worth Picking Up as an Istanbul Resident (Workshops, Hamam, Cooking) | Move to Istanbul',
  description: 'Carpet weaving, Turkish cooking classes, and hamam rituals read as one-off tourist activities. Here\'s how to turn a few of them into a real local routine.',
  alternates: { canonical: '/living-in-istanbul/hands-on-workshops/' },
};

const FAQ = [
  {
    q: 'Which of these are worth doing once vs. making a habit?',
    a: 'The hamam is the clearest "make it a habit" candidate — it\'s a genuine local wellness routine, not just a tourist photo-op, and most residents who try it once end up going monthly. Workshops (carpet weaving, calligraphy, ebru marbling) are usually better as one memorable session rather than a recurring booking, unless you find a teacher offering ongoing classes rather than a single tourist-oriented session.',
  },
  {
    q: 'Are these bookings aimed at tourists, or can residents use them too?',
    a: "Most of these are listed by tour operators and aimed at short-stay visitors, which means the price often assumes a one-time visitor, not a local who wants to go monthly. If you like something — the hamam especially — it's worth asking the venue directly about a resident or multi-visit rate rather than always booking through the tourist-facing link.",
  },
  {
    q: 'What about the cooking classes — are they worth it if I already cook?',
    a: "They're less about learning to cook and more about learning the specific techniques and ingredient logic behind Turkish home cooking — things like how a proper çay is brewed, or how to work with bulgur and legumes the way local kitchens do. If you're trying to cook Turkish food affordably at home afterward (see our local-routines guide), one class is genuinely useful groundwork.",
  },
];

export default async function HandsOnWorkshopsPage() {
  const experiences = await getActivitiesByCategory('Local Experiences', 12).catch(() => []);

  return (
    <GuideLayout
      eyebrow="Living in Istanbul"
      title="Skills Worth Picking Up as a Resident"
      description="Hamam rituals, Turkish cooking classes, and craft workshops — which ones become a real routine, not just a one-off photo."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/living-in-istanbul"
      backLabel="Living in Istanbul"
      sections={[
        { id: 'intro', label: 'Habit vs. one-off' },
        { id: 'experiences', label: 'Browse experiences' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="intro">
        <h2 className="text-2xl font-bold mb-4">Every one of these is listed as a tourist activity. A few are actually local routines.</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Carpet weaving workshops, calligraphy classes, Turkish bath rituals, cooking classes — booking sites list all of it the same way: a one-time experience for someone visiting for a few days. If you live here, that framing undersells a few of these badly. The hamam in particular isn't a tourist novelty, it's a genuine, centuries-old local wellness habit that residents build into their monthly routine.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Worth treating as ongoing habits: the hamam, and Turkish cooking technique once you've taken one class and want to keep practicing at home. Worth doing once, memorably, and moving on: most craft workshops (carpet weaving, ebru marbling, mosaic lamp-making) — unless you find a teacher running an actual ongoing class rather than a single tourist session.
        </p>
      </section>

      {experiences.length > 0 && (
        <section id="experiences">
          <h2 className="text-2xl font-bold mb-2">Browse hands-on experiences</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">Booked through our partner links — same booking flow as a tourist would use, which is exactly why it's worth asking directly about a resident rate if you want to go back.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {experiences.map((a) => <ActivityCard key={a.id} activity={a} />)}
          </div>
        </section>
      )}

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want the cooking-class technique to actually show up in your kitchen?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Our local-routines guide covers which supermarkets and weekly markets to actually shop at once you're trying to cook Turkish food at home, not just in a one-off class.
        </p>
        <Link href="/living-in-istanbul/local-routines" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Read the Local Routines Guide <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
