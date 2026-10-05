import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Instagram, Globe, Wallet, Calendar } from 'lucide-react';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { updateConciergeStatus } from '../actions';

export const dynamic = 'force-dynamic';

const TIER_LABELS = { paperwork: 'Istanbul Route Check', apartment: 'Housing Shortlist File', full: 'Full Move File', trip_package: 'Trip Package Planning', not_sure: 'Not sure yet' };
const STATUSES = ['new', 'contacted', 'converted', 'declined'];

export default async function ConciergeInquiryPage({ params }) {
  const supabase = getSupabaseServer();
  const { data: inquiry } = await supabase.from('concierge_inquiry').select('*').eq('id', params.id).maybeSingle();
  if (!inquiry) notFound();

  const fields = [
    { icon: Mail, label: 'Email', value: inquiry.email },
    { icon: Instagram, label: 'Instagram', value: inquiry.instagram_handle },
    { icon: Globe, label: 'Nationality', value: inquiry.nationality },
    { icon: Wallet, label: 'Budget (₺/month)', value: inquiry.budget_range },
    { icon: Calendar, label: 'Target timeline', value: inquiry.timeline },
  ].filter((f) => f.value);

  return (
    <div className="max-w-2xl">
      <Link href="/admin/concierge" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5"><ArrowLeft className="w-4 h-4" /> All inquiries</Link>

      <div className="rounded-2xl border border-border bg-card p-6 mb-5">
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-2xl font-bold">{inquiry.name}</h1>
          {/* Server Components can't handle onChange (no client JS here), so
              this is a plain submit -- a select + explicit button rather
              than an auto-submitting dropdown. */}
          <form action={updateConciergeStatus.bind(null, inquiry.id)} className="flex items-center gap-2">
            <select name="status" defaultValue={inquiry.status} className="text-sm font-semibold px-3 py-1.5 rounded-full border border-border bg-background">
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button type="submit" className="text-sm font-semibold px-3 py-1.5 rounded-full bg-primary text-white">Update</button>
          </form>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {TIER_LABELS[inquiry.tier_interested] || inquiry.tier_interested} &middot; submitted {new Date(inquiry.submitted_at).toLocaleString()}
        </p>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {fields.map((f) => (
            <div key={f.label} className="flex items-start gap-2.5">
              <f.icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs text-muted-foreground uppercase tracking-wide">{f.label}</dt>
                <dd className="text-sm font-medium">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>

        {inquiry.message && (
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5">Message</p>
            <p className="text-sm whitespace-pre-wrap leading-relaxed bg-muted/40 rounded-xl p-4">{inquiry.message}</p>
          </div>
        )}
      </div>

      <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold">
        <Mail className="w-4 h-4" /> Reply by email
      </a>
    </div>
  );
}
