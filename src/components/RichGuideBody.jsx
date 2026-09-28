import Link from 'next/link';
import { CheckCircle2, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

// Turns a related-resource label into a best-guess /collections/<slug> link
// when the item doesn't carry an explicit href yet. This lets "related"
// sections always render as real, clickable links even before the target
// guide has been written — the slug is picked to match the convention this
// site already uses, so once that guide is published under the same slug,
// the link starts resolving with no further edits needed here.
function slugifyLabel(label) {
  return label
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ı/g, 'i')
    .replace(/İ/gi, 'i')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Data-driven counterpart to the hand-coded /guides/* pages (e.g. guides/visa).
// Reads a `guide_data` jsonb blob off a `display_style: 'guide'` collection and
// renders it with the same sidebar-TOC / stat-card / table / checklist /
// numbered-steps / troubleshooting-card / accordion-FAQ look, so a guide fed in
// as plain content (link + text) still comes out looking like the hand-built
// pillar guides instead of the plain GuideBody markdown-like rendering.
//
// Shape of `guide_data`:
// {
//   eyebrow?: string,            // badge above the title, e.g. "Guide"
//   readTime?: string,           // e.g. "9 min read"
//   ctaLabel?: string,           // overrides the bottom concierge CTA button text
//   ctaHref?: string,            // overrides the bottom concierge CTA link (default /concierge)
//   sections: [
//     { id, label, type: 'intro', paragraphs: string[], stats?: { label, value }[] },
//     { id, label, type: 'cards', intro?, items: { title, body }[] },
//     { id, label, type: 'table', intro?, columns: string[], rows: Record<string,string>[] },
//     { id, label, type: 'checklist', intro?, items: string[] },
//     { id, label, type: 'steps', intro?, items: { title, body: string[], note?, link?: {label,href}, links?: {label,href}[] }[] },
//     { id, label, type: 'troubleshooting', intro?, items: { title, problem, solution }[] },
//     { id, label, type: 'faq', intro?, items: { q, a }[] },
//     { id, label, type: 'related', intro?, groups: { category, links: { label, href }[] }[] },
//     { id, label, type: 'sources', items: { label, href }[] },
//     { type: 'cta', title, body, linkLabel?, linkHref? },
//   ]
// }
export default function RichGuideBody({ collection }) {
  const data = collection.guide_data || {};
  const sections = data.sections || [];
  const tocSections = sections.filter((s) => s.id && s.label);

  return (
    <GuideLayout
      eyebrow={data.eyebrow || 'Guide'}
      title={collection.title}
      description={collection.meta_description || ''}
      readTime={data.readTime}
      updated={collection.updated_date ? String(collection.updated_date).slice(0, 10) : undefined}
      sections={tocSections}
      backHref="/collections"
      backLabel="All collections"
    >
      {sections.map((section, i) => (
        <GuideSection key={section.id || i} section={section} />
      ))}
    </GuideLayout>
  );
}

function GuideSection({ section }) {
  const wrap = (content) =>
    section.id ? (
      <section id={section.id}>
        {section.label && <h2 className="text-2xl font-bold mb-4">{section.label}</h2>}
        {content}
      </section>
    ) : (
      content
    );

  switch (section.type) {
    case 'intro':
      return wrap(
        <>
          {(section.paragraphs || []).map((p, i) => (
            <p key={i} className="text-foreground/80 leading-relaxed mb-4">{p}</p>
          ))}
          {section.stats?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {section.stats.map((s, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-semibold text-sm mb-1">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.value}</p>
                </div>
              ))}
            </div>
          )}
        </>
      );

    case 'cards':
      return wrap(
        <>
          {section.intro && <p className="text-foreground/80 leading-relaxed mb-6">{section.intro}</p>}
          <div className="space-y-4">
            {(section.items || []).map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5">
                <p className="font-semibold mb-1.5">{item.title}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </>
      );

    case 'table': {
      const columns = section.columns || [];
      const rows = section.rows || [];
      return wrap(
        <>
          {section.intro && <p className="text-foreground/80 leading-relaxed mb-6">{section.intro}</p>}
          {/* Mobile: stacked cards */}
          <div className="lg:hidden space-y-3">
            {rows.map((row, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4">
                <p className="font-semibold text-sm mb-2">{row[columns[0]]}</p>
                <dl className="space-y-2 text-sm">
                  {columns.slice(1).map((col) => (
                    <div key={col}>
                      <dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">{col}</dt>
                      <dd className="text-foreground/80">{row[col]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          {/* Wide: real table */}
          <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  {columns.map((col) => (
                    <th key={col} className="px-4 py-3 font-semibold whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((row, i) => (
                  <tr key={i} className="align-top">
                    {columns.map((col, j) => (
                      <td key={col} className={`px-4 py-3 text-foreground/80 ${j === 0 ? 'font-medium whitespace-nowrap' : ''}`}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    case 'checklist':
      return wrap(
        <>
          {section.intro && <p className="text-foreground/80 leading-relaxed mb-6">{section.intro}</p>}
          <div className="rounded-2xl border border-border bg-card p-5">
            <ul className="space-y-3">
              {(section.items || []).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      );

    case 'steps':
      return wrap(
        <>
          {section.intro && <p className="text-foreground/80 leading-relaxed mb-6">{section.intro}</p>}
          <ol className="space-y-6">
            {(section.items || []).map((step, i) => (
              <li key={i} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                  <div className="min-w-0">
                    <p className="font-semibold mb-2">{step.title}</p>
                    {step.body?.length > 0 && (
                      <ul className="space-y-1.5 mb-2">
                        {step.body.map((line, j) => (
                          <li key={j} className="text-sm text-foreground/80 leading-relaxed">{line}</li>
                        ))}
                      </ul>
                    )}
                    {step.note && <p className="text-xs text-foreground/70 leading-relaxed bg-muted/50 rounded-lg p-3 mt-2">{step.note}</p>}
                    {step.link && (
                      <a href={step.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-2">
                        {step.link.label} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {step.links && (
                      <div className="flex flex-wrap gap-4 mt-2">
                        {step.links.map((l) => (
                          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                            {l.label} <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </>
      );

    case 'troubleshooting':
      return wrap(
        <>
          {section.intro && <p className="text-foreground/80 leading-relaxed mb-6">{section.intro}</p>}
          <div className="space-y-5">
            {(section.items || []).map((item, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-destructive" />
                  <p className="font-semibold">{item.title}</p>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">{item.problem}</p>
                <div className="rounded-lg bg-success/10 border border-success/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-success mb-1">Solution</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case 'faq':
      return wrap(
        <>
          {section.intro && <p className="text-foreground/80 leading-relaxed mb-6">{section.intro}</p>}
          <GuideFAQ items={section.items || []} />
        </>
      );

    case 'related':
      return wrap(
        <>
          {section.intro && <p className="text-foreground/80 leading-relaxed mb-6">{section.intro}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(section.groups || []).map((group, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">{group.category}</p>
                <ul className="space-y-2.5">
                  {(group.links || []).map((l, j) => (
                    <li key={j}>
                      <Link
                        href={l.href || `/collections/${slugifyLabel(l.label)}`}
                        className="text-sm text-foreground/80 leading-relaxed hover:text-primary hover:underline transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      );

    case 'sources':
      return wrap(
        <ul className="space-y-2.5 mb-4">
          {(section.items || []).map((s, i) => (
            <li key={i} className="text-sm text-foreground/80 leading-relaxed">
              {s.label}
              {s.href && (
                <>
                  {' — '}
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                    {s.href.replace(/^https?:\/\//, '').replace(/\/$/, '')} <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      );

    case 'cta':
      return (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
          {section.title && <h3 className="font-bold mb-1.5">{section.title}</h3>}
          {section.body && <p className="text-sm text-foreground/80 leading-relaxed mb-4">{section.body}</p>}
          <Link href={section.linkHref || '/concierge'} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            {section.linkLabel || 'Explore Concierge Plans'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      );

    default:
      return null;
  }
}
