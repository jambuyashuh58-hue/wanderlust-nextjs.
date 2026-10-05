import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Building a Food & Household Routine in Türkiye | Move to Istanbul',
  description: 'How to go from eating out of necessity to an actual food and household routine in your first weeks in Türkiye — kitchen basics, laundry, cleaning, and trash.',
  alternates: { canonical: '/after-you-land/food-household-routine' },
};

const STEPS = [
  {
    title: 'Stock a minimal kitchen before you stock a full one',
    body: "You don't need a fully equipped kitchen in week one. A pan, a pot, a kettle, basic cutlery, and a chopping board covers most of what you need until you've settled into a lease long enough to justify buying more. BİM and Şok sell cheap starter kitchenware if your furnished rental is missing something.",
  },
  {
    title: 'Pick your grocery rotation early',
    body: "Decide which supermarket tier you're defaulting to (budget, mid-range, or premium) and find your neighborhood's weekly pazar day — this is the single biggest lever on your monthly food spend. Our local routines guide breaks down the supermarket tiers and how to find your pazar.",
  },
  {
    title: 'Work out your laundry setup',
    body: "Most apartments (furnished or not) come with an in-unit washing machine, but dryers are far less common — air-drying on a rack or balcony line is standard practice, not a downgrade. If your rental has neither, a neighborhood çamaşırhane (laundromat) or dry cleaner can cover you in the interim.",
  },
  {
    title: 'Learn the trash and recycling schedule',
    body: 'Municipalities (belediye) handle household waste collection, usually with set pickup times posted by your building or on the municipality\'s site; many neighborhoods also have separate bins for recycling. Ask your landlord or kapıcı (building caretaker) if your building has one — they can usually tell you the schedule faster than searching online.',
  },
  {
    title: 'Introduce yourself to the kapıcı and bakkal, if you have them',
    body: "Many apartment buildings have a kapıcı who handles building maintenance, deliveries, and can be a genuinely useful first point of contact for anything that goes wrong. A nearby bakkal (small corner shop) is worth knowing for the things you don't want to make a supermarket trip for.",
  },
];

const FAQ = [
  {
    q: 'Do I need a water filter or is tap water safe to drink?',
    a: "Tap water in Türkiye is generally treated and safe, but the taste varies a lot by neighborhood and most residents, Turkish and foreign, default to bottled or delivered large water bottles (damacana) for drinking rather than tap. A damacana delivery service is cheap and common — ask your neighbors or landlord which company serves your building.",
  },
  {
    q: 'How different is grocery shopping from what I\'m used to?',
    a: "The biggest adjustment is usually produce: buying seasonally and locally at the pazar rather than expecting everything year-round. Packaged goods, cleaning products, and most international brands are easy to find at mid-range supermarkets like Migros or CarrefourSA, so the day-to-day shop isn't a huge departure once you know where to go.",
  },
  {
    q: 'Is it normal to not have a routine yet after a few weeks?',
    a: "Yes — a working food and household routine usually takes a full month or two to settle, especially while you're also handling lease paperwork and residence permit admin. Don't judge your adjustment against having it all figured out immediately; our 30-60-90 day review is built around checking in on exactly this at a realistic pace.",
  },
];

export default function FoodHouseholdRoutinePage() {
  return (
    <GuideLayout
      eyebrow="After You Land"
      title="Food & Household Routine"
      description="Going from eating out of necessity to an actual routine: kitchen basics, laundry, trash, and the people worth knowing in your building."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/after-you-land"
      backLabel="After You Land"
      sections={[
        { id: 'steps', label: 'Building the routine' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="steps">
        <div className="space-y-5">
          {STEPS.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold mb-1.5">{s.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">For the grocery and market specifics, see Local Routines</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Supermarket tiers, how to find your neighborhood's pazar day, and pharmacy and gym logistics are covered in detail in the Living in Istanbul cluster.
        </p>
        <Link href="/living-in-istanbul/local-routines" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Local Routines <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
