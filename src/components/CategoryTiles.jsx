// New component -- 8 category browse tiles, linking into /discover with a
// category filter (DiscoverFilters.jsx already reads ?category= from the
// URL, confirmed from the live file, so these links work with zero backend
// changes). Import: import CategoryTiles from '@/components/CategoryTiles';

import Link from 'next/link';
import {
  Landmark, UtensilsCrossed, Palette, Users, Gem, Moon, Ship, Footprints,
} from 'lucide-react';

const CATEGORIES = [
  { label: 'Museums', icon: Landmark },
  { label: 'Historic Sites', icon: Landmark },
  { label: 'Food Experiences', icon: UtensilsCrossed },
  { label: 'Art Galleries', icon: Palette },
  { label: 'Family Activities', icon: Users },
  { label: 'Hidden Gems', icon: Gem },
  { label: 'Night Activities', icon: Moon },
  { label: 'Boat Tours', icon: Ship },
];

export default function CategoryTiles() {
  return (
    <section className="py-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-5">Browse by category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CATEGORIES.map(({ label, icon: Icon }) => (
          <Link
            key={label}
            href={`/discover?category=${encodeURIComponent(label)}`}
            className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition-all text-center"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
