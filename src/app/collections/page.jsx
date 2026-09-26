import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Trophy, BookOpen, Sparkles } from 'lucide-react';
import { getCollections } from '@/lib/supabaseServer';

export const revalidate = 3600;

export const metadata = {
  title: 'Browse Türkiye Travel Collections | Wanderlust',
  description: 'Curated collections of the best experiences across Istanbul, Cappadocia, Antalya and more.',
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Guides & Collections</h1>
          <p className="text-foreground/80 leading-relaxed max-w-3xl">Every Türkiye guide and curated experience set in one place.</p>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {collections.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No collections published yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {collections.map((c) => {
              const isRanking = c.display_style === 'ranking';
              const isGuide = c.display_style === 'guide';
              return (
                <Link key={c.id} href={`/collections/${c.slug}`} className="block rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all group h-full">
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    {c.hero_image_url && (
                      <Image src={c.hero_image_url} alt={c.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                    )}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {isRanking ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D4AF37]/90 text-white text-xs font-bold"><Trophy className="w-3 h-3" /> Best Of</span>
                      : isGuide ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/90 text-white text-xs font-bold"><BookOpen className="w-3 h-3" /> Guide</span>
                      : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/90 text-white text-xs font-bold"><Sparkles className="w-3 h-3" /> Collection</span>}
                    </div>
                    {c.city_name && <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-xs font-semibold"><MapPin className="w-3 h-3" /> {c.city_name}</span>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">{c.title}</h3>
                    {c.meta_description && <p className="text-sm text-muted-foreground line-clamp-2">{c.meta_description}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
