import { Plane, Search, MapPin, BedDouble, CalendarDays, ListChecks } from 'lucide-react';

// "Your trip to {City}" roadmap tiles shown above a ranking-style collection's
// numbered list -- ported from the old Base44 site's ranking collection pages
// (e.g. "Things to Do in Belek"). Reads the `roadmap` jsonb the admin
// Collections form already writes (airport_code, transport_from_istanbul,
// airport_to_city, stay_neighborhoods, recommended_days).
export default function CollectionRoadmap({ roadmap, cityName }) {
  const r = roadmap || {};
  const hasAnyRoadmapData = [r.airport_code, r.transport_from_istanbul, r.airport_to_city, r.stay_neighborhoods, r.recommended_days].some(Boolean);
  if (!hasAnyRoadmapData || !cityName) return null;

  const flightsUrl = `https://www.google.com/travel/flights?q=${encodeURIComponent(`Flights to ${cityName}`)}`;
  const hotelsUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(cityName)}`;
  const stayNeighborhoods = Array.isArray(r.stay_neighborhoods) ? r.stay_neighborhoods.join(', ') : r.stay_neighborhoods;

  const tiles = [
    {
      icon: Plane,
      title: `Reach ${cityName} from Istanbul`,
      body: r.transport_from_istanbul || `Fly into ${r.airport_code || 'the nearest airport'}.`,
    },
    {
      icon: Search,
      title: 'Book flights',
      body: r.airport_code ? `Fly into ${r.airport_code}.` : null,
      linkHref: flightsUrl,
      linkLabel: `Search flights to ${cityName}`,
    },
    {
      icon: MapPin,
      title: 'Get from the airport into the city',
      body: r.airport_to_city,
    },
    {
      icon: BedDouble,
      title: 'Where to stay',
      body: stayNeighborhoods,
      linkHref: hotelsUrl,
      linkLabel: `Search hotels in ${cityName}`,
    },
    {
      icon: CalendarDays,
      title: 'How long to stay',
      body: r.recommended_days ? `Plan for ${r.recommended_days}.` : null,
    },
    {
      icon: ListChecks,
      title: 'What to do',
      body: 'See the top experiences below',
      anchorHref: '#rankings',
    },
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Plane className="w-4 h-4 text-primary" /></div>
        <div>
          <h2 className="font-bold leading-tight">Your trip to {cityName}</h2>
          <p className="text-xs text-muted-foreground">A quick roadmap before the ranked list.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {tiles.map((tile, i) => {
          const Icon = tile.icon;
          return (
            <div key={i} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                <h3 className="text-sm font-semibold">{tile.title}</h3>
              </div>
              {tile.body && !tile.anchorHref && <p className="text-xs text-muted-foreground leading-relaxed">{tile.body}</p>}
              {tile.linkHref && (
                <a href={tile.linkHref} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-1.5">
                  {tile.linkLabel} →
                </a>
              )}
              {tile.anchorHref && (
                <a href={tile.anchorHref} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  {tile.body} ↓
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
