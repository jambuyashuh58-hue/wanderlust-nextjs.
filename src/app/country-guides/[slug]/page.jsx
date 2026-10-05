import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Stamp, Home, Wallet, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getCountryGuideBySlug } from '@/lib/supabaseServer';
import { pick } from '@/lib/i18n';
import { getLocale } from '@/lib/i18nServer';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const [guide, locale] = await Promise.all([getCountryGuideBySlug(params.slug), getLocale()]);
  if (!guide) return { title: 'Guide not found' };
  const title = pick(guide, 'title', locale);
  const description = pick(guide, 'meta_description', locale);
  // An untranslated guide (no title_tr) renders the same English content
  // at /tr/country-guides/<slug> as a fallback -- that's not a real
  // translation, it's the same page under a second URL, so its canonical
  // stays pointed at the English URL even when visited via /tr (matching
  // the /tr filter already applied in sitemap.js). Only a guide with real
  // _tr content gets its own canonical at the /tr URL.
  const hasTranslation = Boolean(guide.title_tr);
  const canonicalPath = locale === 'tr' && hasTranslation
    ? `/tr/country-guides/${params.slug}/`
    : `/country-guides/${params.slug}/`;
  return {
    title: `${title} — ${locale === 'tr' ? 'Ülke Rehberi' : 'Country Guide'} | Move to Istanbul`,
    description: description || undefined,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `/country-guides/${params.slug}/`,
        ...(hasTranslation ? { tr: `/tr/country-guides/${params.slug}/` } : {}),
      },
    },
  };
}

export default async function CountryGuideDetailPage({ params }) {
  const [guide, locale] = await Promise.all([getCountryGuideBySlug(params.slug), getLocale()]);
  if (!guide) notFound();

  const prefix = locale === 'tr' ? '/tr' : '';
  const title = pick(guide, 'title', locale);
  const intro = pick(guide, 'intro', locale);
  const labels = locale === 'tr'
    ? { back: 'Tüm ülke rehberleri', visa: 'Vize ve Giriş', housing: 'Ev Bulma', cost: 'Yaşam Maliyeti' }
    : { back: 'All country guides', visa: 'Visa & Entry', housing: 'Finding a Home', cost: 'Cost of Living' };

  const sections = [
    { icon: Stamp, title: labels.visa, body: pick(guide, 'visa_section', locale) },
    { icon: Home, title: labels.housing, body: pick(guide, 'housing_section', locale) },
    { icon: Wallet, title: labels.cost, body: pick(guide, 'cost_section', locale) },
  ].filter((s) => s.body);

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <Link href={`${prefix}/country-guides`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4" /> {labels.back}</Link>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"><Globe className="w-4 h-4" /> {guide.country}</span>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
        {intro && <p className="text-foreground/80 text-lg leading-relaxed max-w-2xl">{intro}</p>}
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><s.icon className="w-5 h-5 text-primary" /></div>
              <h2 className="text-xl font-bold">{s.title}</h2>
            </div>
            <div className="prose prose-sm sm:prose-base max-w-none
              prose-headings:font-bold prose-headings:text-foreground prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-2
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-semibold
              prose-li:text-foreground/80 prose-ul:my-3
              prose-a:text-primary prose-a:font-medium">
              <ReactMarkdown>{s.body}</ReactMarkdown>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
