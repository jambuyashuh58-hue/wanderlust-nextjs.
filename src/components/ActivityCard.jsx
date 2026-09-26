'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';

export default function ActivityCard({ activity }) {
  if (!activity) return null;
  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
      <Link href={`/activity/${activity.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {activity.image_url && (
            <Image src={activity.image_url} alt={activity.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4"><span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-foreground">{activity.category}</span></div>
          {activity.free ? <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-success/90 backdrop-blur-sm text-xs font-semibold text-white">Free</span>
            : activity.price != null ? <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-foreground">₺{activity.price}</span> : null}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-base leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">{activity.title}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2"><MapPin className="w-3.5 h-3.5" /><span>{activity.city_name}</span></div>
          {activity.rating != null && (
            <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-accent text-accent" /><span className="text-sm font-medium">{Number(activity.rating).toFixed(1)}</span>{activity.review_count != null && <span className="text-xs text-muted-foreground">({activity.review_count})</span>}</div>
          )}
        </div>
      </Link>
    </div>
  );
}
