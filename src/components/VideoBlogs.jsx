// Homepage "Video Blogs" section, ported from the old site's
// src/components/VideoBlogs.jsx. That version queried Base44's Collection
// entity client-side (`Collection.filter({published:true,
// display_style:'guide'})`). This version instead RECEIVES already-fetched
// collections as a prop from the server (page.jsx), since supabaseServer.js
// only runs server-side.
//
// Integration in page.jsx:
//   import VideoBlogs from '@/components/VideoBlogs';
//   ... inside HomePage(), after fetching `collections`:
//   <VideoBlogs collections={collections} />
//
// FIX (2026-09-28): the video files here are hosted on Base44's file API
// (base44.app/api/apps/.../files/...), which redirects to a CDN
// (media.base44.com) and can intermittently 503 under load. With 4 large
// (~100-150MB) videos all set to `autoPlay` at once, every visitor's first
// page load fired 4 simultaneous big range requests against that API --
// which is almost certainly what was causing the blank/broken-looking cards
// (the 503s left the <video> stuck at readyState 0, so nothing ever
// rendered). Fix: no more autoPlay. Videos now use native controls and
// preload="metadata" (just enough to show a first-frame poster), so nothing
// is fetched from Base44 until a visitor actually presses play, and a
// broken/still-503ing file just shows a normal paused video control instead
// of a blank card. Long-term, these should move off Base44's file host to
// Supabase Storage or Vercel Blob for reliability -- flagged separately.

'use client';

import { useState } from 'react';
import Link from 'next/link';

function isVideoUrl(url = '') {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

export default function VideoBlogs({ collections }) {
  const videoCollections = (collections || [])
    .filter((c) => c && c.published !== false && c.display_style === 'guide')
    .map((c) => ({ ...c, videoUrl: (c.body_images || []).find(isVideoUrl) }))
    .filter((c) => c.videoUrl)
    .slice(0, 4);

  const [broken, setBroken] = useState({});

  const visible = videoCollections.filter((c) => !broken[c.id]);
  if (visible.length === 0) return null;

  return (
    <section className="py-6">
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-2xl md:text-3xl font-bold">Video blogs</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {visible.map((c) => (
          <div key={c.id} className="rounded-2xl overflow-hidden border border-border bg-card">
            <div className="relative aspect-[9/16] bg-muted">
              <video
                src={c.videoUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                onError={() => setBroken((prev) => ({ ...prev, [c.id]: true }))}
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-1 line-clamp-2">{c.title}</h3>
              {c.meta_description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{c.meta_description}</p>
              )}
              <Link
                href={`/collections/${c.slug}`}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Read blog →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
