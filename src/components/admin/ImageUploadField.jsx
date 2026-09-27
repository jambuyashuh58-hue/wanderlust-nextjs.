'use client';

import { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

// Renders a text input (so a URL can also be pasted directly) plus an
// "Upload" button that posts a file to /api/admin/upload and fills the text
// input with the resulting public URL. Uncontrolled by design -- the parent
// <form> picks it up by `name` on submit like any other input, no extra
// wiring needed.
export default function ImageUploadField({ name, label, defaultValue }) {
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(defaultValue || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      if (inputRef.current) inputRef.current.value = data.url;
      setPreview(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      {label && <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>}
      <div className="flex items-center gap-2">
        <input
          ref={inputRef} type="text" name={name} defaultValue={defaultValue} placeholder="https://... or upload below"
          onChange={(e) => setPreview(e.target.value)}
          className="flex-1 min-h-[40px] px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="shrink-0 min-h-[40px] px-3 rounded-lg border border-border text-sm font-medium flex items-center gap-1.5 hover:bg-muted disabled:opacity-60"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="" className="mt-2 h-20 w-28 object-cover rounded-lg border border-border bg-muted" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      )}
    </div>
  );
}
