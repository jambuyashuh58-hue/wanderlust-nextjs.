import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Stamp, Home, Wallet, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getCountryGuideBySlug } from '@/lib/supabaseServer';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const guide = await getCountryGuideBySlug(params.slug);
  if (!guide) return { title: 'Guide not found' };
  return { title: `${guide.title} — Country Guide | Wanderlust` };
}

export default async function CountryGuideDetailPage({ params }) {
  const guide = await getCountryGuideBySlug(params.slug);
  if (!guide) notFound();

  const sections = [
    { icon: Stamp, title: 'Visa & Entry', body: guide.visa_section },
    { icon: Home, title: 'Finding a Home', body: guide.housing_section },
    { icon: Wallet, title: 'Cost of Living', body: guide.cost_section },
  ].filter((s) => s.body);

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <Link href="/country-guides" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4" /> All country guides</Link>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"><Globe className="w-4 h-4" /> {guide.country}</span>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{guide.title}</h1>
        {guide.intro && <p className="text-foreground/80 text-lg leading-relaxed max-w-2xl">{guide.intro}</p>}
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
