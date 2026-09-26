// Drop-in for Footer.jsx.
// Mirrors the old Vite site's hardcoded ALL_CITIES row: real <a>/<Link> tags
// present in the initial HTML on every load, independent of any API/client
// fetch timing -- this is what makes it robust for crawlers. Paste this
// component's JSX (below the export) into Footer.jsx just above the
// copyright/disclosure row, and add the import at the top:
//   import Destinations from './Destinations';
// then render <Destinations /> where indicated.

import Link from 'next/link';

const ALL_CITIES = [
  'Istanbul', 'Antalya', 'Cappadocia', 'Bodrum', 'Fethiye', 'Izmir',
  'Ephesus', 'Pamukkale', 'Marmaris', 'Trabzon', 'Konya', 'Bursa',
  'Alanya', 'Canakkale',
];

export default function Destinations() {
  return (
    <div className="border-t border-border pt-6 mb-6">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Destinations
      </p>
      <div className="flex flex-wrap gap-x-1 gap-y-2 text-sm text-muted-foreground">
        {ALL_CITIES.map((city, i) => (
          <span key={city} className="flex items-center">
            <Link href={`/city/${city.toLowerCase()}`} className="hover:text-primary hover:underline px-1">
              {city}
            </Link>
            {i < ALL_CITIES.length - 1 && <span className="text-border">·</span>}
          </span>
        ))}
      </div>
      <a
        href="/site-directory.html"
        className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
      >
        Full site directory (all pages)
      </a>
    </div>
  );
}
