// Shared JSON-LD emitter for the relocation-pillar pages (Sep 2026
// restructure). Centralized here so each page only needs to pass its own
// facts instead of hand-writing schema blocks -- keeps per-page edits small.
//
// Emits an Article (or Service, for /services/* pages) + optional FAQPage +
// a BreadcrumbList built from `path`. None of this existed before the Sep
// 2026 restructure; the task doc requires it on every new/moved page.
const SITE_URL = 'https://movetoistanbul.online';
const SITE_NAME = 'Move to Istanbul';

export default function GuideSchema({
  type = 'Article', // 'Article' | 'Service'
  path, // e.g. '/moving-to-istanbul/visa-residence-permit'
  title,
  description,
  faq, // optional: [{ q, a }]
  breadcrumbs, // optional: [{ name, path }] -- if omitted, derived from `path`
  serviceMeta, // optional, for type: 'Service' -- { price, priceCurrency }
}) {
  const url = `${SITE_URL}${path}`;

  const crumbs = breadcrumbs || (() => {
    const segments = path.split('/').filter(Boolean);
    let acc = '';
    return segments.map((seg) => {
      acc += `/${seg}`;
      return {
        name: seg.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' '),
        path: acc,
      };
    });
  })();

  const mainEntity =
    type === 'Service'
      ? {
          '@type': 'Service',
          name: title,
          description,
          url,
          provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          ...(serviceMeta?.price && {
            offers: {
              '@type': 'Offer',
              price: serviceMeta.price,
              priceCurrency: serviceMeta.priceCurrency || 'USD',
              url,
            },
          }),
        }
      : {
          '@type': 'Article',
          headline: title,
          description,
          url,
          publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          mainEntityOfPage: url,
        };

  const breadcrumbLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
      })),
    ],
  };

  const faqLd = faq?.length
    ? {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const graph = { '@context': 'https://schema.org', '@graph': [mainEntity, breadcrumbLd, ...(faqLd ? [faqLd] : [])] };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
