'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Applies to any field where "missing" means null/empty -- currently used for
// image_url and price on the activities admin list, but kept generic so more
// filters (gallery, booking_url, ...) can be added the same way later.
const FILTERS = [
  { param: 'image', label: 'Image' },
  { param: 'price', label: 'Price' },
];

export default function ActivityFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilter = (param, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(param, value); else params.delete(param);
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeCount = FILTERS.filter((f) => searchParams.get(f.param)).length;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {FILTERS.map((f) => (
        <div key={f.param} className="flex items-center gap-1.5">
          <label htmlFor={`filter-${f.param}`} className="text-xs font-medium text-muted-foreground">{f.label}:</label>
          <select
            id={`filter-${f.param}`}
            value={searchParams.get(f.param) || ''}
            onChange={(e) => setFilter(f.param, e.target.value)}
            className="min-h-[36px] pl-2.5 pr-7 py-1.5 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All</option>
            <option value="missing">Missing</option>
            <option value="has">Has {f.label.toLowerCase()}</option>
          </select>
        </div>
      ))}
      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            FILTERS.forEach((f) => params.delete(f.param));
            router.push(`${pathname}?${params.toString()}`);
          }}
          className="text-xs font-medium text-primary hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
