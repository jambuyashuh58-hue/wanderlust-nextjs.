'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, BookOpen, MapPin, Stamp, Home, Wallet, GraduationCap, HeartPulse, Landmark, Compass, LayoutGrid, Luggage, Laptop } from 'lucide-react';

// Intent-based categories so a visitor can narrow 140+ guides down to the
// handful relevant to them (visa vs. housing vs. attraction tickets, etc.)
// instead of scanning or relying on search alone. There's no `category`
// column on the `collection` table, so this is derived client-side from
// each guide's slug/title -- no DB migration or backfill needed, and new
// guides get bucketed automatically as long as their slug/title carries a
// recognizable keyword. Order matters: first match wins -- checked against
// every live guide slug (see Supabase `collection` table) when choosing
// these keyword sets, not guessed from titles alone.
const CATEGORIES = [
  { id: 'visa-legal', label: 'Visa & Legal', icon: Stamp, keywords: ['visa', 'ikamet', 'bureaucracy', 'residen', 'permit', 'devlet', 'legal', 'citizen', 'vfs', 'sgk', 'tourist-entry'] },
  { id: 'housing', label: 'Housing & Neighborhoods', icon: Home, keywords: ['housing', 'kira-artis', 'rent', 'property-management', 'neighborhood', 'cihangir', 'karakoy', 'balat', 'apartment', 'kadikoy-vs-besiktas'] },
  { id: 'money-tax', label: 'Money & Tax', icon: Wallet, keywords: ['paypal', 'stripe', 'usd', 'bank-account', 'tax', 'phone-registration', 'phone-plan', 'cost-of-living', 'budget', 'insurance', 'sirketi', 'atm-fee'] },
  { id: 'education', label: 'Education', icon: GraduationCap, keywords: ['universit', 'school', 'ogrenci', 'student'] },
  { id: 'health', label: 'Health', icon: HeartPulse, keywords: ['medical', 'health', 'hospital', 'doctor', 'dentist'] },
  { id: 'attractions', label: 'Attractions & Tickets', icon: Landmark, keywords: ['muzesi', 'museum', 'sarayi', 'palace', 'sophia', 'akvaryum', 'aquarium', 'tower', 'mosque', 'camii', 'market', 'sarnici', 'cistern', 'ruins', 'ephesus', 'pamukkale', 'cappadocia', 'gallipoli', 'monastery', 'balloon', 'lagoon', 'bazaar', 'ormani', 'forest'] },
  { id: 'moving', label: 'Moving & Logistics', icon: Luggage, keywords: ['relocat', 'moving-to-turkey', 'move-to-turkey', 'move-istanbul', 'settle-in-turkey', 'muhtar', 'drivers-license', 'pet-relocation', 'ship-belongings', 'checklist', 'consultant-cost'] },
  { id: 'nomad-work', label: 'Digital Nomad & Remote Work', icon: Laptop, keywords: ['nomad', 'coworking', 'wifi', 'remote-work'] },
  { id: 'lifestyle', label: 'Culture & Lifestyle', icon: Compass, keywords: ['culture-shock', 'esim', 'sim-', 'vintage', 'shopping', 'street-food', 'culinary', 'kahvaltisi', 'walking-routes', 'discovering', 'exploring-ist', 'finding-your', 'finding-the', 'getting-lost', 'ferry-commute', 'morning-commute', 'quiet-magic', 'tours-cuisine', 'ottoman-empire', 'metrekare', 'public-transport', 'living-in-istanbul', 'living-in-turkey', 'rooftop', 'woman', 'solo-travel', 'tuvalet', 'learn-turkish'] },
];
const OTHER_CATEGORY = { id: 'other', label: 'More guides', icon: LayoutGrid };

function categorize(guide) {
  const haystack = `${guide.slug || ''} ${guide.title || ''}`.toLowerCase();
  const match = CATEGORIES.find((c) => c.keywords.some((k) => haystack.includes(k)));
  return match || OTHER_CATEGORY;
}

// Browsable grid for every long-form guide stored in the `collection` table
// (display_style: 'guide'). These used to only surface on /collections
// behind the "Guides" tab; this component is what /guides renders them
// through instead, so the full guide library lives on /guides and
// /collections stays dedicated to attraction/experience collections.
export default function AllGuidesGrid({ guides, cities }) {
  const [query, setQuery] = useState('');
  const [cityFilter, setCityFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const guidesWithCategory = useMemo(
    () => guides.map((g) => ({ ...g, _category: categorize(g) })),
    [guides]
  );

  const availableCategories = useMemo(() => {
    const present = new Map();
    guidesWithCategory.forEach((g) => {
      if (!present.has(g._category.id)) present.set(g._category.id, g._category);
    });
    // Keep the defined order (visa, housing, money...), drop categories with
    // no guides, and push "More guides" to the end regardless of match order.
    const ordered = [...CATEGORIES, OTHER_CATEGORY].filter((c) => present.has(c.id));
    return ordered;
  }, [guidesWithCategory]);

  const availableCities = useMemo(() => {
    const present = new Set(
      guides.filter((g) => g.city_name).map((g) => g.city_name.toLowerCase())
    );
    return cities.filter((city) => present.has(city.name.toLowerCase()));
  }, [guides, cities]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guidesWithCategory.filter((g) => {
      const matchesCategory = !categoryFilter || g._category.id === categoryFilter;
      const matchesCity = !cityFilter || (g.city_name && g.city_name.toLowerCase() === cityFilter.toLowerCase());
      const matchesQuery = !q || g.title.toLowerCase().includes(q) || (g.meta_description || '').toLowerCase().includes(q);
      return matchesCategory && matchesCity && matchesQuery;
    });
  }, [guidesWithCategory, query, cityFilter, categoryFilter]);

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

      {availableCategories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setCategoryFilter(null)}
            className={`inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              !categoryFilter ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/30'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> All topics
          </button>
          {availableCategories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCategoryFilter(categoryFilter === id ? null : id)}
              className={`inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                categoryFilter === id ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      )}

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
