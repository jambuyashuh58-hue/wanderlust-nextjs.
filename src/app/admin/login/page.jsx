'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Compass, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      router.push(params.get('next') || '/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center"><Compass className="w-5 h-5 text-white" /></div>
          <span className="text-lg font-bold">Move to Istanbul — Admin</span>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              type="password" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" disabled={status === 'loading'} className="w-full py-3 rounded-xl bg-gradient-primary text-white font-semibold disabled:opacity-60 flex items-center justify-center gap-2">
            {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />} Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
