'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Search, X } from 'lucide-react';

const ALL_CATEGORIES = ['Museums', 'Historic Sites', 'Art Galleries', 'Guided Tours', 'Food Experiences', 'Boat Tours', 'Family Activities', 'Hidden Gems', 'Night Activities', 'Festivals', 'Local Experiences', 'City Passes', 'Walking Tours'];

export default function DiscoverFilters({ initialSearch, initialCategory }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch || '');
  const [isPending, startTransition] = useTransition();

  function updateUrl(newSearch, newCategory) {
    const params = new URLSearchParams(searchParams.toString());
    if (newSearch) params.set('q', newSearch); else params.delete('q');
    if (newCategory) params.set('category', newCategory); else params.delete('category');
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateUrl(search, initialCategory);
  }

  function toggleCategory(cat) {
    updateUrl(search, initialCategory === cat ? null : cat);
  }

  return (
    <div className="sticky top-16 md:top-20 z-30 glass border-y border-border">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 min-h-[44px] px-4 py-3 rounded-full bg-card border border-border mb-3">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search experiences, cities, categories..."
            className="w-full bg-transparent outline-none text-sm"
          />
          {search && (
            <button type="button" onClick={() => { setSearch(''); updateUrl('', initialCategory); }} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-muted/60 -mr-2 shrink-0">
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`shrink-0 min-h-[40px] flex items-center px-3.5 py-2 rounded-full text-xs font-medium border transition-all ${
                initialCategory === cat ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
