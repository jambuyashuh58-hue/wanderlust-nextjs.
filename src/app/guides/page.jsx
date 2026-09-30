import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { getCollections, getCities } from '@/lib/supabaseServer';
import CollectionsFilters from '@/components/CollectionsFilters';

// Sep 2026 restructure: this page used to duplicate the visa/housing/
// cost-of-living pillar pages (now at /moving-to-istanbul/*, which is the
// canonical hub for those, complete with its own hero and cards -- having a
// second, near-identical header/card section here was pure duplication).
// This page's actual job per the new nav ("Istanbul Guides") is the
// curated destination/activity content, so it now renders the same
// collections listing as /collections instead of linking out to it.
export const revalidate = 3600;

export const metadata = {
  title: 'Istanbul Guides & Curated Experiences | Move to Istanbul',
  description: 'Curated destination guides and things-to-do collections across Istanbul and Türkiye.',
  // Same underlying data/listing as /collections -- pointing the canonical
  // there instead of self-referencing avoids recreating exactly the kind of
  // duplicate-content signal this restructure is meant to clean up.
  alternates: { canonical: '/collections' },
};

export default async function GuidesPage() {
  const [collections, cities] = await Promise.all([getCollections(), getCities()]);

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.pexels.com/photos/20294576/pexels-photo-20294576.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Narrow cobblestone street in Istanbul"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/40" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-white">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-4"><MapPin className="w-4 h-4" /> Istanbul Guides</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Istanbul Guides & Curated Experiences</h1>
          <p className="text-white/85 max-w-2xl leading-relaxed">Destination guides and curated things-to-do collections across Istanbul and Türkiye.</p>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {collections.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No collections published yet.</p>
        ) : (
          <CollectionsFilters collections={collections} cities={cities} />
        )}
        <Link href="/moving-to-istanbul" className="group mt-10 flex items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 hover:border-primary/40 transition-all">
          <div><h3 className="font-bold mb-1">Actually moving here?</h3><p className="text-sm text-muted-foreground">Visas, housing, cost of living, and your first 90 days — see the full relocation guide.</p></div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>
      </div>
    </div>
  );
}
