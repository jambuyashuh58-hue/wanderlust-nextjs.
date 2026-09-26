// "Trust badges" strip -- sits right after WhyWanderlust on the homepage.
// Generic, honest trust signals (no fabricated review counts or press
// mentions we can't back up) that reinforce credibility at a glance.

import { ShieldCheck, BadgeCheck, MessageCircleHeart, Ban } from 'lucide-react';

const BADGES = [
  {
    icon: ShieldCheck,
    label: 'Secure, Verified Bookings',
    body: 'Every activity links to an official, verified booking partner — never a third-party reseller.',
  },
  {
    icon: Ban,
    label: 'No Fake Reviews',
    body: 'Rankings are pulled from real ratings and review counts, not paid placements.',
  },
  {
    icon: MessageCircleHeart,
    label: 'Active Community',
    body: 'Follow @move_istanbul for daily Türkiye travel and relocation tips from real followers.',
  },
  {
    icon: BadgeCheck,
    label: 'Human Concierge Support',
    body: 'Real people behind the concierge service — reach out and get a personal reply.',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-6">
      <div className="rounded-2xl border border-border bg-card px-6 py-8 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BADGES.map(({ icon: Icon, label, body }) => (
            <div key={label} className="flex flex-col items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
