// New component -- "Why Wanderlust" 3-card value-prop section.
// Import in page.jsx: import WhyWanderlust from '@/components/WhyWanderlust';
// Render it once, anywhere in the homepage row sequence (works well right
// after the Hero, before the first data-driven row).

import { Sparkles, ShieldCheck, Users } from 'lucide-react';

const ITEMS = [
  {
    icon: Sparkles,
    title: 'Ranked honestly',
    body: 'Every list is ordered by real ratings and review counts, not by who pays us the most commission.',
  },
  {
    icon: ShieldCheck,
    title: 'Real, bookable activities',
    body: 'No filler. Every activity links straight to a real booking page with a live price.',
  },
  {
    icon: Users,
    title: 'A concierge when you need one',
    body: 'Staying more than a week? Our relocation concierge handles visas, housing and the paperwork.',
  },
];

export default function WhyWanderlust() {
  return (
    <section className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="p-6 rounded-2xl border border-border bg-card">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold mb-1.5">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
