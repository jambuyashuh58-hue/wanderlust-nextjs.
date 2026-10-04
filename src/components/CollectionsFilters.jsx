'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, BookOpen, Sparkles, Trophy, MapPin } from 'lucide-react';

const TYPE_TABS = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'guide', label: 'Guides', icon: BookOpen },
  { id: 'collection', label: 'Collections', icon: Sparkles },
];

export default function CollectionsFilters({ collections, cities }) {
  const [typeFilter, setTypeFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState(null);

  // Only show city pills for cities that actually have a published
  // collection tied to them, so a pill never leads to an empty grid.
  const availableCities = useMemo(() => {
    const present = new Set(
      collections.filter((c) => c.city_name).map((c) => c.city_name.toLowerCase())
    );
    return cities.filter((city) => present.has(city.name.toLowerCase()));
  }, [collections, cities]);

  const filtered = useMemo(() => {
    return collections.filter((c) => {
      const isGuide = c.display_style === 'guide';
      // "Guides" tab = display_style guide; "Collections" tab = everything
      // else (plain collections + ranking/"Best Of" lists).
      const matchesType = typeFilter === 'all' || (typeFilter === 'guide' ? isGuide : !isGuide);
      const matchesCity = !cityFilter || (c.city_name && c.city_name.toLowerCase() === cityFilter.toLowerCase());
      return matchesType && matchesCity;
    });
  }, [collections, typeFilter, cityFilter]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {TYPE_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTypeFilter(id)}
            className={`inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              typeFilter === id ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/30'
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {availableCities.length > 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-8">
          <button
            onClick={() => setCityFilter(null)}
            className={`shrink-0 min-h-[40px] flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              !cityFilter ? 'bg-primary text-white' : 'border border-border text-muted-foreground hover:border-primary/30'
            }`}
          >
            All cities
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

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">No guides or collections match that filter.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {filtered.map((c) => {
            const isRanking = c.display_style === 'ranking';
            const isGuide = c.display_style === 'guide';
            return (
              <Link key={c.id} href={`/collections/${c.slug}`} className="block rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all group h-full">
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                  {/* Plain <img>, not next/image -- these hero_image_url values
                      come from arbitrary third-party hosts (stock photo sites,
                      TripAdvisor's CDN, etc). Routing them through Vercel's
                      Image Optimization (next/image) means Vercel fetches the
                      image server-side, and several of those hosts reject
                      that fetch (hotlink protection) even though they serve
                      the same image to a browser just fine -- that silently
                      broke images on this page while the homepage's identical
                      cards (which already use a plain <img>) kept working. */}
                  {c.hero_image_url && (
                    <img src={c.hero_image_url} alt={c.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  )}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {isRanking ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D4AF37]/90 text-white text-xs font-bold"><Trophy className="w-3 h-3" /> Best Of</span>
                    : isGuide ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/90 text-white text-xs font-bold"><BookOpen className="w-3 h-3" /> Guide</span>
                    : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/90 text-white text-xs font-bold"><Sparkles className="w-3 h-3" /> Collection</span>}
                  </div>
                  {c.city_name && <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-xs font-semibold"><MapPin className="w-3 h-3" /> {c.city_name}</span>}
                </div>
                {/* Same compact text treatment as the homepage's Curated
                    Collections cards and ActivityCard (p-2.5, text-xs,
                    line-clamp-2) so typography is consistent everywhere and
                    the photo keeps most of the card's visual weight. */}
                <div className="p-2.5">
                  <h3 className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">{c.title}</h3>
                  {c.meta_description && <p className="text-xs text-muted-foreground line-clamp-2">{c.meta_description}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
