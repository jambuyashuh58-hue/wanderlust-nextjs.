'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ShieldAlert, MessageCircle } from 'lucide-react';

const CONCIERGE_TIERS = [
  {
    id: 'trip_package', name: 'Trip Package Planning', price: 20,
    tagline: 'Send us your cities, dates, and budget — we hand back a day-by-day plan with real activities, hotel picks, and booking links.',
    includes: ['Custom day-by-day itinerary built from your cities, dates, and budget', 'Hand-picked activities and hotel range for every day', 'Direct booking links for everything — you book, we just plan it', 'One free revision if your dates or budget change', 'Delivered within 48 hours'],
  },
  {
    id: 'paperwork', name: 'Visa & Paperwork Guidance', price: 99,
    tagline: 'A focused 45-minute strategy call to map your exact visa route — no more guessing.',
    includes: ['Personalized visa-route checklist for your nationality', 'A 45-minute live call', 'Document review plus up to 3 follow-up emails', 'Help booking your e-ikamet appointment', 'Access to long-stay guides'],
  },
  {
    id: 'apartment', name: 'Apartment Shortlisting', price: 449,
    tagline: '5-8 real listings matched to your budget, with curated video walkthroughs.',
    includes: ['Everything in Visa & Paperwork Guidance', '5-8 real rental listings matched to your budget and preferred neighborhood, pre-screened for foreigner-friendly landlords', 'Curated walk-through videos provided directly by local property agents or our on-the-ground team', 'A localized contract checklist highlighting common rental terms to look out for', 'DASK earthquake insurance guidance', 'Guidance on negotiating rent and deposit'],
  },
  {
    id: 'full', name: 'Full Relocation Concierge', price: 999,
    tagline: 'Hand us the whole first month — visa, housing, banking, and settling in.',
    includes: ['Everything in Apartment Shortlisting', 'Bilingual local specialist accompaniment', 'Airport arrival logistics', 'Neighborhood orientation write-up', 'First-month cost breakdown', 'Priority response time', 'Weekly async check-ins'],
  },
];

const CONCIERGE_URL = 'https://www.instagram.com/move_istanbul';

const EMPTY_FORM = { name: '', email: '', instagram_handle: '', nationality: '', budget_range: '', timeline: '', message: '' };

export default function ConciergeInteractive() {
  const searchParams = useSearchParams();
  const [selectedTier, setSelectedTier] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');

  // Lets another page (e.g. the itinerary map, right after someone builds a
  // trip) deep-link straight into a pre-selected tier via ?tier=trip_package
  // instead of dropping the visitor on the page to pick again themselves.
  useEffect(() => {
    const requested = searchParams.get('tier');
    if (requested && CONCIERGE_TIERS.some((t) => t.id === requested)) {
      setSelectedTier(requested);
    }
  }, [searchParams]);

  const tierName = CONCIERGE_TIERS.find((t) => t.id === selectedTier)?.name;
  const buttonLabel = status === 'loading' ? 'Sending…' : tierName ? `Request ${tierName}` : 'Send Inquiry';

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/concierge/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tier_interested: selectedTier || 'not_sure' }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {CONCIERGE_TIERS.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <div
              key={tier.id}
              className={`rounded-2xl border p-6 bg-card flex flex-col transition-colors ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
            >
              <h3 className="font-bold text-lg mb-1">{tier.name}</h3>
              <div className="text-3xl font-bold mb-1">${tier.price}<span className="text-sm font-normal text-muted-foreground ml-1">USD</span></div>
              <p className="text-sm text-muted-foreground mb-4">{tier.tagline}</p>
              <ul className="space-y-2 flex-1 mb-6">
                {tier.includes.map((item, i) => <li key={i} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-success shrink-0 mt-0.5" /><span>{item}</span></li>)}
              </ul>
              <button
                type="button"
                onClick={() => setSelectedTier(tier.id)}
                className={`w-full py-3 rounded-xl font-semibold transition-transform hover:scale-[1.02] ${isSelected ? 'bg-gradient-primary text-white' : 'border border-border text-foreground'}`}
              >
                {isSelected ? 'Selected' : 'Choose this plan'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Disclaimer -- not legal/real-estate advice */}
      <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-muted/50 p-5 mb-14 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          We are not licensed immigration lawyers or real estate agents. This service is guidance and coordination based on our own research and experience — not legal representation. For complex cases, always confirm with a licensed professional.
        </p>
      </div>

      {/* Intake form + Instagram alternative, side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Intake form */}
        <div className="rounded-2xl border border-border p-8 bg-card h-fit">
          <h2 className="text-xl font-bold mb-6">Tell us about your move</h2>
          {status === 'success' ? (
            <p className="text-success font-medium">Thanks! We&apos;ll be in touch within 24 hours.</p>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Instagram handle (optional)</label>
                  <input value={form.instagram_handle} onChange={(e) => setForm({ ...form, instagram_handle: e.target.value })} className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Nationality</label>
                  <input value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Budget range (₺/month)</label>
                  <input placeholder="e.g. ₺25,000-35,000" value={form.budget_range} onChange={(e) => setForm({ ...form, budget_range: e.target.value })} className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Target timeline</label>
                  <input placeholder="e.g. moving in October" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Anything else we should know?</label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full py-3.5 rounded-full bg-gradient-primary text-white font-semibold disabled:opacity-60 hover:scale-[1.01] transition-transform">
                {buttonLabel}
              </button>
              {status === 'error' && <p className="text-sm text-destructive text-center">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>

        {/* Right column: Instagram alternative + How it works */}
        <div>
          <h2 className="text-xl font-bold mb-4">Prefer Instagram?</h2>
          <div className="rounded-2xl border border-border bg-card p-6 text-center mb-8">
            <p className="text-sm text-muted-foreground mb-4">We keep everything async and text-based — no scheduling calls. DM us directly if that&apos;s easier than the form.</p>
            <a href={CONCIERGE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" /> Message us on Instagram
            </a>
          </div>

          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">How it works</p>
          <ol className="space-y-3">
            {[
              'We reply with a short intake — 5 questions, no call needed',
              'You confirm your tier and pay via PayPal',
              'We deliver async — you get a private status link to track progress',
              'Weekly check-ins until everything\'s settled',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
