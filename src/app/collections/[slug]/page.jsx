import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCollectionBySlug, getCollections } from '@/lib/supabaseServer';
import ActivityCard from '@/components/ActivityCard';
import GuideBody from '@/components/GuideBody';
import RichGuideBody from '@/components/RichGuideBody';
import CollectionRoadmap from '@/components/CollectionRoadmap';
import RankingList from '@/components/RankingList';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) return { title: 'Collection not found' };
  return {
    title: `${collection.title} | Move to Istanbul`,
    description: collection.meta_description || collection.intro?.slice(0, 160),
    alternates: { canonical: `/collections/${params.slug}` },
  };
}

export default async function CollectionDetailPage({ params }) {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) notFound();

  const activities = collection.activities || [];
  const isGuide = collection.display_style === 'guide';
  const isRanking = collection.display_style === 'ranking';
  const isRichGuide = isGuide && collection.guide_data;

  const SITE = 'https://www.movetoistanbul.online';
  const url = `${SITE}/collections/${params.slug}`;
  const plain = (t) => String(t || '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`#]/g, '').trim();
  const faqItems = (collection.guide_data?.sections || []).filter((x) => x.type === 'faq').flatMap((x) => x.items || []).filter((i) => i.q && i.a);
  const guideLd = isRichGuide ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', headline: collection.title, description: collection.meta_description || undefined,
        mainEntityOfPage: url, image: collection.hero_image_url || undefined,
        dateModified: collection.updated_date || collection.updated_at || undefined,
        author: { '@type': 'Organization', name: 'Move to Istanbul', url: SITE },
        publisher: { '@type': 'Organization', name: 'Move to Istanbul', url: SITE },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Collections', item: `${SITE}/collections` },
          { '@type': 'ListItem', position: 3, name: collection.title, item: url },
        ],
      },
      ...(faqItems.length ? [{
        '@type': 'FAQPage',
        mainEntity: faqItems.map((i) => ({ '@type': 'Question', name: plain(i.q), acceptedAnswer: { '@type': 'Answer', text: plain(i.a) } })),
      }] : []),
    ],
  } : null;

  let related = [];
  let relatedHeading = 'More Türkiye guides';
  try {
    const all = (await getCollections()) || [];
    const others = all.filter((c) => c.slug && c.slug !== params.slug);
    if (params.slug.startsWith('turkey-visa')) {
      related = others.filter((c) => c.slug.startsWith('turkey-visa'));
      relatedHeading = 'More Türkiye visa guides';
    } else if (collection.city_name) {
      related = others.filter((c) => c.city_name === collection.city_name);
      relatedHeading = `More ${collection.city_name} guides`;
    }
    related = related.slice(0, 12);
  } catch {}

  const jsonLd = guideLd || {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: collection.title,
    description: collection.meta_description || collection.intro,
    itemListElement: activities.slice(0, 20).map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'TouristAttraction', name: a.title, image: a.image_url },
    })),
  };

  if (isRichGuide) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <RichGuideBody collection={collection} />
        {related.length > 0 && (
          <nav aria-label={relatedHeading} className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
            <h2 className="text-lg font-bold mb-3">{relatedHeading}</h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              {related.map((c) => (
                <li key={c.slug}><Link href={`/collections/${c.slug}`} className="text-primary hover:underline">{c.title}</Link></li>
              ))}
            </ul>
          </nav>
        )}
      </>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/collections" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="w-4 h-4" /> All collections</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{collection.title}</h1>
          {collection.hero_image_url && (
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mt-6">
              <Image src={collection.hero_image_url} alt={collection.title} fill priority sizes="100vw" className="object-cover" />
            </div>
          )}
          {collection.intro && !isGuide && (
            <div className="prose prose-sm sm:prose-base max-w-3xl mt-6
              prose-headings:font-bold prose-headings:text-foreground prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-semibold
              prose-li:text-foreground/80 prose-ul:my-3
              prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-table:text-sm prose-th:text-foreground prose-th:font-semibold prose-th:border-b prose-th:border-border prose-th:px-3 prose-th:py-2 prose-th:text-left
              prose-td:text-foreground/80 prose-td:border-b prose-td:border-border/60 prose-td:px-3 prose-td:py-2 prose-td:align-top">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children }) =>
                    href?.startsWith('/') ? <Link href={href}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
                  table: ({ children }) => <div className="overflow-x-auto my-4"><table className="w-full border-collapse">{children}</table></div>,
                }}
              >
                {collection.intro}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isGuide ? (
          <GuideBody intro={collection.intro} bodyImages={collection.body_images || []} guideTitle={collection.title} />
        ) : activities.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No experiences in this collection yet.</p>
        ) : isRanking ? (
          <>
            <CollectionRoadmap roadmap={collection.roadmap} cityName={collection.city_name} />
            <RankingList activities={activities} />
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {activities.map((a) => <ActivityCard key={a.id} activity={a} />)}
          </div>
        )}
      </div>
        {related.length > 0 && (
          <nav aria-label={relatedHeading} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <h2 className="text-lg font-bold mb-3">{relatedHeading}</h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              {related.map((c) => (
                <li key={c.slug}><Link href={`/collections/${c.slug}`} className="text-primary hover:underline">{c.title}</Link></li>
              ))}
            </ul>
          </nav>
        )}
    </div>
  );
}
