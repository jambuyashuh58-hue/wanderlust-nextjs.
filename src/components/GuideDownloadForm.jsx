'use client';
import { useState } from 'react';
import { Download } from 'lucide-react';

export default function GuideDownloadForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const [downloadUrl, setDownloadUrl] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/guide-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'failed');
      setDownloadUrl(data.downloadUrl);
      setStatus('ready');
      // Kick the download off immediately -- the button below stays for
      // anyone whose browser blocks the auto-download or who navigates away
      // before it fires.
      const a = document.createElement('a');
      a.href = data.downloadUrl;
      a.download = 'istanbul-90-60-30-relocation-guide.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'ready' && downloadUrl) {
    return (
      <div className="text-center py-4">
        <h3 className="font-bold text-lg mb-2">Your guide is ready</h3>
        <p className="text-sm text-muted-foreground mb-5">We&apos;ve also emailed a copy to {email}.</p>
        <a
          href={downloadUrl}
          download="istanbul-90-60-30-relocation-guide.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" /> Download the PDF
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <h3 className="font-bold text-lg">Get the free guide</h3>
      <div>
        <label className="block text-sm font-medium mb-1.5">Name *</label>
        <input
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Jamie"
          className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Email *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-primary text-white font-semibold disabled:opacity-60"
      >
        <Download className="w-4 h-4" /> {status === 'loading' ? 'Sending…' : 'Send Me the Free Guide'}
      </button>
      {status === 'error' && <p className="text-xs text-destructive text-center">Something went wrong — try again.</p>}
      <p className="text-xs text-muted-foreground text-center">No spam. Just this guide and the occasional relocation tip.</p>
    </form>
  );
}
