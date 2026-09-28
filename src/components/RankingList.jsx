import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';

// Numbered ranked list for `display_style: 'ranking'` collections -- ported
// from the old Base44 site's ranking pages (numbered badge, gold border on
// #1, "Travelers' Choice" tag, price + rating, Book Now button). Reuses
// `activity.trending` as the Travelers' Choice signal rather than adding a
// new column, since that's already the closest existing flag.
export default function RankingList({ activities }) {
  if (!activities?.length) return null;

  return (
    <div id="rankings" className="flex flex-col gap-4 scroll-mt-24">
      {activities.map((a, i) => {
        const rank = i + 1;
        const isTop = rank === 1;
        return (
          <div
            key={a.id}
            className={`flex gap-4 rounded-2xl border bg-card p-3 sm:p-4 ${isTop ? 'border-accent shadow-sm shadow-accent/10' : 'border-border'}`}
          >
            <span className={`hidden sm:flex w-7 h-7 rounded-full text-sm font-bold items-center justify-center shrink-0 self-start mt-1 ${isTop ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'}`}>
              {rank}
            </span>
            <Link href={`/activity/${a.id}`} className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-muted shrink-0">
              {a.image_url && <Image src={a.image_url} alt={a.title} fill sizes="112px" className="object-cover" unoptimized />}
              {a.trending && (
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-semibold uppercase tracking-wide">
                  Travelers&apos; Choice
                </span>
              )}
            </Link>
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
              <Link href={`/activity/${a.id}`} className="font-semibold text-sm sm:text-base leading-snug line-clamp-2 hover:text-primary transition-colors">
                <span className="sm:hidden text-muted-foreground font-bold mr-1">{rank}.</span>{a.title}
              </Link>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                {a.city_name && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 shrink-0" />{a.city_name}</span>}
                {a.rating != null && (
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-accent text-accent shrink-0" />{Number(a.rating).toFixed(1)}{a.review_count != null && ` (${a.review_count})`}</span>
                )}
                {a.free ? <span className="font-medium text-success">Free</span> : a.price != null && <span className="font-medium text-foreground">₺{Number(a.price).toLocaleString()}</span>}
              </div>
              {a.booking_url && (
                <a
                  href={a.booking_url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center w-fit mt-1.5 px-4 py-1.5 rounded-full bg-gradient-primary text-white text-xs font-semibold hover:scale-[1.02] transition-transform"
                >
                  Book Now
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
