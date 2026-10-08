import Link from 'next/link';
import Image from 'next/image';
import { Globe, ArrowRight } from 'lucide-react';
import { getCountryGuides } from '@/lib/supabaseServer';
import { pick } from '@/lib/i18n';
import { getLocale } from '@/lib/i18nServer';

// Calling getLocale() (next/headers) opts THIS page out of static generation
// -- content now varies by request, not just by URL -- but it does not
// affect any other route, since no shared layout above it calls a dynamic
// API. See SiteChrome.jsx for why that distinction matters here.
export const revalidate = 3600;

export async function generateMetadata() {
  const locale = await getLocale();
  return locale === 'tr'
    ? {
        title: 'Türkiye\'ye Taşınma Rehberleri | Move to Istanbul',
        description: 'Türkiye\'ye taşınmak için ülkeye özel rehberler.',
        alternates: { canonical: '/tr/country-guides', languages: { en: '/country-guides', tr: '/tr/country-guides' } },
      }
    : {
        title: 'Moving to Türkiye by Nationality: Visa & Relocation Guides (2026) | Move to Istanbul',
        description: 'Nationality-specific guides for moving to Türkiye: visa and entry rules, residence permit routes, banking and settling in, for US, UK, Indian and other passport holders.',
        alternates: { canonical: '/country-guides', languages: { en: '/country-guides', tr: '/tr/country-guides' } },
      };
}

export default async function CountryGuidesPage() {
  const [guides, locale] = await Promise.all([getCountryGuides(), getLocale()]);
  const prefix = locale === 'tr' ? '/tr' : '';
  const copy = locale === 'tr'
    ? { badge: 'Ülke Rehberleri', heading: 'Ülkenizden Türkiye\'ye taşınmak', empty: 'Henüz yayınlanmış ülke rehberi yok.', read: 'Rehberi oku' }
    : { badge: 'Country Guides', heading: 'Moving to Türkiye from your country', empty: 'No country guides published yet.', read: 'Read guide' };

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.pexels.com/photos/32642485/pexels-photo-32642485.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Passport, credit cards, and boarding pass laid out for travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/40" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-4"><Globe className="w-4 h-4" /> {copy.badge}</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{copy.heading}</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {guides.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">{copy.empty}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guides.map((g) => {
              const title = pick(g, 'title', locale);
              return (
                <Link key={g.id} href={`${prefix}/country-guides/${g.slug}`} className="group block h-full rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/30 to-secondary/30 overflow-hidden">
                    {g.hero_image_url && <Image src={g.hero_image_url} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />}
                    <span className="absolute bottom-3 left-4 text-white font-bold text-lg drop-shadow">{g.country}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{title}</h3>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">{copy.read} <ArrowRight className="w-4 h-4" /></span>
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
