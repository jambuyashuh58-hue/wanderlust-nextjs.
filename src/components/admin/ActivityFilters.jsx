'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Three filter shapes:
// - 'gap': "missing" vs "has" for a field that's null/empty when incomplete
//   (image, gallery, price, booking URL).
// - 'bool': "yes" vs "no" for a true/false column (free, trending, indoor, family).
// - 'select': exact match against a fixed list of values (category, city) --
//   options are passed in as props since they come from the live data.
const GAP_FILTERS = [
  { param: 'image', label: 'Image' },
  { param: 'gallery', label: 'Gallery' },
  { param: 'price', label: 'Price' },
  { param: 'booking_url', label: 'Booking URL' },
];

const BOOL_FILTERS = [
  { param: 'free', label: 'Free' },
  { param: 'trending', label: 'Trending' },
  { param: 'indoor', label: 'Indoor' },
  { param: 'family_friendly', label: 'Family friendly' },
];

export default function ActivityFilters({ categories = [], cities = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const ALL_PARAMS = [
    'category',
    'city',
    ...GAP_FILTERS.map((f) => f.param),
    ...BOOL_FILTERS.map((f) => f.param),
  ];

  const setFilter = (param, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(param, value); else params.delete(param);
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeCount = ALL_PARAMS.filter((p) => searchParams.get(p)).length;

  return (
    <div className="mb-4 flex flex-wrap items-end gap-3">
      <Select label="Category" value={searchParams.get('category') || ''} onChange={(v) => setFilter('category', v)}>
        <option value="">All</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </Select>

      <Select label="City" value={searchParams.get('city') || ''} onChange={(v) => setFilter('city', v)}>
        <option value="">All</option>
        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
      </Select>

      {GAP_FILTERS.map((f) => (
        <Select key={f.param} label={f.label} value={searchParams.get(f.param) || ''} onChange={(v) => setFilter(f.param, v)}>
          <option value="">All</option>
          <option value="missing">Missing</option>
          <option value="has">Has {f.label.toLowerCase()}</option>
        </Select>
      ))}

      {BOOL_FILTERS.map((f) => (
        <Select key={f.param} label={f.label} value={searchParams.get(f.param) || ''} onChange={(v) => setFilter(f.param, v)}>
          <option value="">All</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      ))}

      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            ALL_PARAMS.forEach((p) => params.delete(p));
            router.push(`${pathname}?${params.toString()}`);
          }}
          className="text-xs font-medium text-primary hover:underline mb-2"
        >
          Clear filters ({activeCount})
        </button>
      )}
    </div>
  );
}

function Select({ label, value, onChange, children }) {
  const id = `filter-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[36px] pl-2.5 pr-7 py-1.5 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
      >
        {children}
      </select>
    </div>
  );
}
