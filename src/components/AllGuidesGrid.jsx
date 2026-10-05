'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, BookOpen, MapPin } from 'lucide-react';

// Browsable grid for every long-form guide stored in the `collection` table
// (display_style: 'guide'). These used to only surface on /collections
// behind the "Guides" tab; this component is what /guides renders them
// through instead, so the full guide library lives on /guides and
// /collections stays dedicated to attraction/experience collections.
export default function AllGuidesGrid({ guides, cities }) {
  const [query, setQuery] = useState('');
  const [cityFilter, setCityFilter] = useState(null);

  const availableCities = useMemo(() => {
    const present = new Set(
      guides.filter((g) => g.city_name).map((g) => g.city_name.toLowerCase())
    );
    return cities.filter((city) => present.has(city.name.toLowerCase()));
  }, [guides, cities]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guides.filter((g) => {
      const matchesCity = !cityFilter || (g.city_name && g.city_name.toLowerCase() === cityFilter.toLowerCase());
      const matchesQuery = !q || g.title.toLowerCase().includes(q) || (g.meta_description || '').toLowerCase().includes(q);
      return matchesCity && matchesQuery;
    });
  }, [guides, query, cityFilter]);

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${guides.length} guides...`}
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
        />
      </div>

      {availableCities.length > 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-6">
          <button
            onClick={() => setCityFilter(null)}
            className={`shrink-0 min-h-[40px] flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              !cityFilter ? 'bg-primary text-white' : 'border border-border text-muted-foreground hover:border-primary/30'
            }`}
          >
            All places
          </button>
          {availableCities.map((city) => (
            <button
              key={city.id ?? city.name}
              onClick={() => setCityFilter(cityFilter === city.name ? null : city.name)}
              className={`shrink-0 min-h-[40px] flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cityFilter === city.name ? 'bg-primary text-white' : 'border border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground mb-4">{filtered.length} guide{filtered.length === 1 ? '' : 's'}</p>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">No guides match that search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((g) => (
            <Link key={g.id} href={`/guides/${g.slug}`} className="block rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all group h-full">
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                {g.hero_image_url && (
                  <Image src={g.hero_image_url} alt={g.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                )}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/90 text-white text-xs font-bold"><BookOpen className="w-3 h-3" /> Guide</span>
                </div>
                {g.city_name && <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-xs font-semibold"><MapPin className="w-3 h-3" /> {g.city_name}</span>}
              </div>
              <div className="p-2.5">
                <h3 className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">{g.title}</h3>
                {g.meta_description && <p className="text-xs text-muted-foreground line-clamp-2">{g.meta_description}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
