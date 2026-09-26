import Image from 'next/image';
import Link from 'next/link';
import { Home, Wallet, BedDouble, ExternalLink, MapPin } from 'lucide-react';
import { getHouseListings } from '@/lib/supabaseServer';

export const revalidate = 3600;

export const metadata = {
  title: 'Istanbul Apartment Listings & Relocation Dashboard | Wanderlust',
  description: 'Real example apartment listings across Istanbul neighborhoods, with rent ranges and deposit info to help plan your move.',
};

export default async function DashboardPage() {
  const listings = await getHouseListings({ city: 'Istanbul' });

  const byDistrict = listings.reduce((acc, l) => {
    const district = l.neighborhood?.split(',').pop()?.trim() || 'Other';
    (acc[district] = acc[district] || []).push(l);
    return acc;
  }, {});

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"><Home className="w-4 h-4" /> Relocation Dashboard</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Istanbul Apartment Listings</h1>
          <p className="text-foreground/80 max-w-2xl leading-relaxed">
            Real example listings showing genuine current rent ranges across {Object.keys(byDistrict).length} Istanbul neighborhoods. These reflect live market patterns rather than single available units — use the listing link to see what&apos;s currently on the market in that area.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-4 mb-8 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted"><Wallet className="w-4 h-4 text-primary" /> {listings.length} example listings</div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted"><MapPin className="w-4 h-4 text-primary" /> {Object.keys(byDistrict).length} districts</div>
        </div>

        {listings.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No listings available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((l) => (
              <div key={l.id} className="rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all">
                <div className="relative aspect-[4/3] bg-muted">
                  {l.image_url && <Image src={l.image_url} alt={l.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized />}
                  {l.furnished && <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-success/90 text-white text-xs font-semibold">Furnished</span>}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{l.title}</h3>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3"><MapPin className="w-3 h-3" /> {l.neighborhood}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold">₺{Number(l.monthly_rent).toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                      <div className="text-xs text-muted-foreground">Deposit: ₺{Number(l.deposit).toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground"><BedDouble className="w-4 h-4" /> {l.bedrooms}</div>
                  </div>
                  {l.listing_url && (
                    <a href={l.listing_url} target="_blank" rel="noopener noreferrer sponsored" className="flex items-center justify-center gap-1.5 w-full py-2 rounded-full bg-muted text-xs font-semibold hover:bg-primary hover:text-white transition-colors">
                      See current listings <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1">
            <h3 className="font-bold mb-1">Want real help finding a place?</h3>
            <p className="text-sm text-muted-foreground">Our concierge service shortlists 5-8 real, foreigner-friendly listings matched to your budget.</p>
          </div>
          <Link href="/concierge" className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:scale-105 transition-transform">
            See Concierge Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
