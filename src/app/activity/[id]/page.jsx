import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Star, Clock, Wallet, Building2, Check } from 'lucide-react';
import { getActivityById, getActivitiesByCity } from '@/lib/supabaseServer';
import ActivityCard from '@/components/ActivityCard';

export const revalidate = 3600;

const AFFILIATE_DISCLOSURE = 'We may earn a commission when you book through links on this page, at no extra cost to you.';

export async function generateMetadata({ params }) {
  const activity = await getActivityById(params.id);
  if (!activity) return { title: 'Activity not found' };
  return {
    title: `${activity.title} — Prices, Duration & Booking | Wanderlust`,
    description: activity.description?.slice(0, 160),
  };
}

export default async function ActivityDetailPage({ params }) {
  const activity = await getActivityById(params.id);
  if (!activity) notFound();

  const nearby = activity.city_name
    ? (await getActivitiesByCity(activity.city_name, 11)).filter((a) => a.id !== activity.id).slice(0, 10)
    : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: activity.title,
    description: activity.description,
    image: activity.image_url,
    ...(activity.rating != null && {
      aggregateRating: { '@type': 'AggregateRating', ratingValue: activity.rating, reviewCount: activity.review_count || 1 },
    }),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      price: activity.price != null ? String(activity.price) : '0',
      availability: 'https://schema.org/InStock',
    },
  };

  const gallery = activity.gallery?.length > 0 ? activity.gallery : (activity.image_url ? [activity.image_url] : []);

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-muted">
        {activity.image_url && <Image src={activity.image_url} alt={activity.title} fill priority sizes="100vw" className="object-cover" unoptimized />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-foreground">{activity.category}</span>
              {activity.free && <span className="px-3 py-1 rounded-full bg-success/90 backdrop-blur-sm text-xs font-semibold text-white">Free</span>}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{activity.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              {activity.city_name && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {activity.city_name}, {activity.country || 'Türkiye'}</span>}
              {activity.rating != null && <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-accent text-accent" /> {Number(activity.rating).toFixed(1)} ({activity.review_count || 0} reviews)</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/discover" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"><ArrowLeft className="w-4 h-4" /> Back to experiences</Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {activity.description && (
              <section><h2 className="text-xl font-bold mb-3">Overview</h2><p className="text-muted-foreground leading-relaxed">{activity.description}</p></section>
            )}

            {gallery.length > 1 && (
              <section>
                <h2 className="text-xl font-bold mb-3">Gallery</h2>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {gallery.map((img, i) => (
                    <div key={i} className="relative min-w-[200px] h-40 shrink-0 rounded-xl overflow-hidden">
                      <Image src={img} alt={`${activity.title} ${i + 1}`} fill sizes="200px" className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-xl font-bold mb-4">Essential Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40">
                  <Wallet className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div><div className="text-xs text-muted-foreground mb-0.5">Price</div><div className="text-sm font-medium">{activity.free ? 'Free Entry' : (activity.price != null ? `₺${activity.price}` : '—')}</div></div>
                </div>
                {activity.duration && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40">
                    <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div><div className="text-xs text-muted-foreground mb-0.5">Duration</div><div className="text-sm font-medium">{activity.duration}</div></div>
                  </div>
                )}
              </div>
            </section>

            {activity.facilities?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4">Facilities</h2>
                <div className="flex flex-wrap gap-2">
                  {activity.facilities.map((f) => <span key={f} className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success" /> {f}</span>)}
                </div>
              </section>
            )}

            {(activity.address || activity.website || activity.phone) && (
              <section>
                <h2 className="text-xl font-bold mb-4">The Area</h2>
                {activity.address && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 mb-4">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm font-medium">{activity.address}</p>
                  </div>
                )}
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border p-6 bg-card">
              <div className="text-3xl font-bold mb-1">{activity.free ? 'Free Entry' : (activity.price != null ? `₺${activity.price}` : '—')}</div>
              {!activity.free && <p className="text-sm text-muted-foreground mb-4">per person</p>}
              {activity.booking_url ? (
                <a href={activity.booking_url} target="_blank" rel="sponsored noopener noreferrer" className="block w-full py-3.5 rounded-xl bg-gradient-primary text-white text-center font-semibold hover:scale-[1.02] transition-transform mb-3">
                  Book Now
                </a>
              ) : (
                <div className="w-full py-3.5 rounded-xl bg-muted text-center text-sm text-muted-foreground mb-3">Walk-in available</div>
              )}
              {activity.booking_url && <p className="text-[11px] text-muted-foreground text-center leading-snug">{AFFILIATE_DISCLOSURE}</p>}

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                {activity.duration && (
                  <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> Duration</span><span className="font-medium">{activity.duration}</span></div>
                )}
                <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Type</span><span className="font-medium">{activity.indoor ? 'Indoor' : 'Outdoor'}</span></div>
              </div>
            </div>
          </div>
        </div>

        {nearby.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">More in {activity.city_name}</h2>
            <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
              {nearby.map((a) => (
                <div key={a.id} className="min-w-[260px] w-[260px] shrink-0"><ActivityCard activity={a} /></div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
