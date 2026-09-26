import Link from 'next/link';
import Image from 'next/image';
import { Globe, ArrowRight } from 'lucide-react';
import { getCountryGuides } from '@/lib/supabaseServer';

export const revalidate = 3600;

export const metadata = {
  title: 'Country Relocation Guides | Wanderlust',
  description: 'Nationality-specific guides for moving to Türkiye.',
};

export default async function CountryGuidesPage() {
  const guides = await getCountryGuides();

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"><Globe className="w-4 h-4" /> Country Guides</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Moving to Türkiye from your country</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {guides.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No country guides published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guides.map((g) => (
              <Link key={g.id} href={`/country-guides/${g.slug}`} className="group block h-full rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-lg transition-all">
                <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/30 to-secondary/30 overflow-hidden">
                  {g.hero_image_url && <Image src={g.hero_image_url} alt={g.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" unoptimized />}
                  <span className="absolute bottom-3 left-4 text-white font-bold text-lg drop-shadow">{g.country}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{g.title}</h3>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read guide <ArrowRight className="w-4 h-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
