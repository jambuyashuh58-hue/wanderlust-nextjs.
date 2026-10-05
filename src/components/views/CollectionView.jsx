import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ActivityCard from '@/components/ActivityCard';
import GuideBody from '@/components/GuideBody';
import RichGuideBody from '@/components/RichGuideBody';
import CollectionRoadmap from '@/components/CollectionRoadmap';
import RankingList from '@/components/RankingList';

// Shared rendering for a single collection, used by both /collections/[slug]
// (the original URL) and /living-in-istanbul/[slug] (the new canonical home
// for non-guide collections -- see generateMetadata in both page.jsx files).
// Keeping this in one place means the two URLs can never drift apart in
// markup while they're both live.
export default function CollectionView({ collection, backHref = '/collections', backLabel = 'All collections' }) {
  const activities = collection.activities || [];
  const isGuide = collection.display_style === 'guide';
  const isRanking = collection.display_style === 'ranking';
  const isRichGuide = isGuide && collection.guide_data;

  const jsonLd = {
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
      </>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href={backHref} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="w-4 h-4" /> {backLabel}</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{collection.title}</h1>
          {collection.hero_image_url && (
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mt-6">
              {/* Plain <img>, not next/image -- see CollectionsFilters.jsx for why. */}
              <img src={collection.hero_image_url} alt={collection.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          )}
          {collection.intro && !isGuide && (
            <div className="prose prose-sm sm:prose-base max-w-3xl mt-6
              prose-headings:font-bold prose-headings:text-foreground prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-semibold
              prose-li:text-foreground/80 prose-ul:my-3
              prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown
                components={{
                  a: ({ href, children }) =>
                    href?.startsWith('/') ? <Link href={href}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
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
    </div>
  );
}
