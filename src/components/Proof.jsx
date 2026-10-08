import { FOUNDER } from '@/lib/founder';
import { getSupabaseServer } from '@/lib/supabaseServer';

// Renders only REAL proof: a founder block when src/lib/founder.js is filled
// in, and testimonials that are consented, verified and published in the
// `testimonial` table. With neither, it renders nothing (no fake reviews).
export default async function Proof() {
  let items = [];
  try {
    const { data } = await getSupabaseServer().from('testimonial').select('id,display_name,location,service_tier,quote,rating,source_url')
      .eq('consent_given', true).eq('verified', true).eq('published', true).order('created_date', { ascending: false }).limit(6);
    items = data || [];
  } catch {}
  const hasFounder = FOUNDER.name && FOUNDER.bio;
  if (!hasFounder && !items.length) return null;
  return (
    <section className="mb-12">
      {hasFounder && (
        <div className="rounded-2xl border border-border bg-card p-6 mb-6 flex gap-4 items-start">
          {FOUNDER.photo && <img src={FOUNDER.photo} alt={FOUNDER.name} className="w-20 h-20 rounded-full object-cover shrink-0" />}
          <div>
            <p className="font-bold">{FOUNDER.name}{FOUNDER.role ? <span className="font-normal text-muted-foreground"> · {FOUNDER.role}</span> : null}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">{FOUNDER.bio}</p>
            {FOUNDER.links.length > 0 && <p className="text-sm mt-2 flex gap-3">{FOUNDER.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{l.label}</a>)}</p>}
          </div>
        </div>
      )}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((t) => (
            <figure key={t.id} className="rounded-2xl border border-border bg-card p-5">
              {t.rating ? <p className="text-amber-500 text-sm mb-1" aria-label={`${t.rating} out of 5`}>{'★'.repeat(t.rating)}</p> : null}
              <blockquote className="text-sm leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="text-xs text-muted-foreground mt-2">{t.display_name}{t.location ? `, ${t.location}` : ''}{t.service_tier ? ` · ${t.service_tier}` : ''}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
