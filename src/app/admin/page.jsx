import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { MapPin, Layers, Globe, Home, User, Instagram } from 'lucide-react';

export const dynamic = 'force-dynamic';

const CARDS = [
  { key: 'activity', label: 'Activities', href: '/admin/activities', icon: MapPin },
  { key: 'collection', label: 'Collections & Guides', href: '/admin/collections', icon: Layers },
  { key: 'country_guide', label: 'Country Guides', href: '/admin/country-guides', icon: Globe },
  { key: 'house_listing', label: 'House Listings', href: '/admin/house-listings', icon: Home },
  { key: 'brand_avatar', label: 'Character', href: '/admin/character', icon: User },
  { key: 'instagram_post', label: 'Instagram Posts', href: '/admin/instagram-posts', icon: Instagram },
];

export default async function AdminDashboardPage() {
  const supabase = getSupabaseServer();
  const counts = await Promise.all(
    CARDS.map(async (c) => {
      const { count } = await supabase.from(c.key).select('*', { count: 'exact', head: true });
      return count ?? 0;
    })
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-6">Manage everything on Move to Istanbul from here.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.key} href={c.href}
              className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{counts[i]}</div>
                <div className="text-sm text-muted-foreground">{c.label}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
