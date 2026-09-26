'use client';
import { useState } from 'react';

const BACKEND_URL = 'https://movetoistanbul-backend-yashus-projects-c3bafd05.vercel.app';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${BACKEND_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source_page: '/', source_component: 'footer' }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className="text-sm text-success font-medium">You&apos;re in — check your inbox.</p>;
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-4 py-2.5 rounded-full bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-primary"
      />
      <button type="submit" disabled={status === 'loading'} className="px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold disabled:opacity-60">
        {status === 'loading' ? '…' : 'Subscribe'}
      </button>
      {status === 'error' && <p className="text-xs text-destructive">Something went wrong.</p>}
    </form>
  );
}
