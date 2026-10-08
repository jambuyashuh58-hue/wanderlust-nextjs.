'use client';
import { usePathname } from 'next/navigation';

// Client component (so it can read the current path) that still renders in
// the server HTML. Emits BreadcrumbList plus one page-level node
// (Article / ContactPage / WebPage). URLs use the preferred www host and the
// site's canonical path form. (for=code)
const SITE = 'https://www.movetoistanbul.online';
const ORG = { '@id': SITE + '/#org' };

export default function PageJsonLd({ type = 'WebPage', name, description, dateModified, crumbs = [] }) {
  const pathname = (usePathname() || '/').replace(/\/$/, '') || '/';
  const url = SITE + (pathname === '/' ? '' : pathname);
  const trail = [{ name: 'Home', url: SITE + '/' }, ...crumbs.map((c) => ({ name: c.name, url: SITE + c.path })), { name, url }];
  const node = { '@type': type, '@id': url + '#page', url, name, ...(description && { description }), inLanguage: 'en', isPartOf: { '@id': SITE + '/#site' } };
  if (type === 'Article') {
    node.headline = name;
    node.author = ORG;
    node.publisher = ORG;
    node.mainEntityOfPage = url;
    if (dateModified) node.dateModified = dateModified;
  }
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      node,
      { '@type': 'BreadcrumbList', itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: t.url })) },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
