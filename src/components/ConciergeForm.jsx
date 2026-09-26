'use client';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const CONCIERGE_URL = 'https://www.instagram.com/move_istanbul';
const BACKEND_URL = 'https://movetoistanbul-backend-yashus-projects-c3bafd05.vercel.app';

export default function ConciergeForm({ selectedTier }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${BACKEND_URL}/api/concierge/inquiry`, {
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

  if (status === 'success') {
    return <p className="text-success font-medium">Thanks! We&apos;ll be in touch within 24 hours.</p>;
  }

  return (
    <>
      <form onSubmit={submit} className="space-y-4">
        <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
        <input required type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
        <textarea placeholder="Tell us about your move..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
        <button type="submit" disabled={status === 'loading'} className="w-full py-3.5 rounded-xl bg-gradient-primary text-white font-semibold disabled:opacity-60">
          {status === 'loading' ? 'Sending…' : 'Send Inquiry'}
        </button>
        {status === 'error' && <p className="text-sm text-destructive text-center">Something went wrong. Please try again.</p>}
      </form>
      <a href={CONCIERGE_URL} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 text-sm text-primary hover:underline">
        <MessageCircle className="w-4 h-4" /> Or message us on Instagram
      </a>
    </>
  );
}
