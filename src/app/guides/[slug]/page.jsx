// Dynamic guide route for long-form guide content stored in the
// `collection` table (display_style: 'guide') -- lets these guides live at
// /guides/<slug>, matching the URL scheme already referenced by internal
// links on the static guide pages (visa, housing, cost-of-living), rather
// than only being reachable at /collections/<slug>.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, MessageCircle } from 'lucide-react';
import { getCollectionBySlug } from '@/lib/supabaseServer';
import GuideBody from '@/components/GuideBody';

const CONCIERGE_URL = 'https://www.instagram.com/move_istanbul';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const guide = await getCollectionBySlug(params.slug);
  if (!guide || guide.display_style !== 'guide') return { title: 'Guide not found' };
  return {
    title: `${guide.title} | Wanderlust`,
    description: guide.meta_description || undefined,
  };
}

export default async function DynamicGuidePage({ params }) {
  const guide = await getCollectionBySlug(params.slug);
  if (!guide || guide.display_style !== 'guide') notFound();

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
          <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4" /> All guides</Link>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"><BookOpen className="w-4 h-4" /> {guide.city_name || 'Long-Stay Guide'}</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{guide.title}</h1>
          {guide.meta_description && <p className="text-foreground/80 text-lg leading-relaxed max-w-2xl">{guide.meta_description}</p>}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <GuideBody intro={guide.intro} bodyImages={guide.body_images || []} guideTitle={guide.title} />

        {guide.show_concierge_card !== false && (
          <div className="max-w-3xl mx-auto mt-4 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex-1"><h3 className="font-bold mb-1">Want this handled for you?</h3><p className="text-sm text-muted-foreground">Our concierge service handles visa paperwork, apartment hunting, and your first-month setup end to end.</p></div>
            <a href={CONCIERGE_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:scale-105 transition-transform">
              <MessageCircle className="w-4 h-4" /> Ask about concierge
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
