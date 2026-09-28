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
// FIX (2026-09-28, first pass): the video files here are hosted on Base44's
// file API (base44.app/api/apps/.../files/...), which redirects to a CDN
// (media.base44.com) and can intermittently 503 under load. With 4 large
// (~100-150MB) videos all set to `autoPlay` at once, every visitor's first
// page load fired 4 simultaneous big range requests against that API --
// which is almost certainly what was causing the blank/broken-looking cards.
// First fix removed autoPlay and switched to preload="metadata" + controls,
// which stopped the broken-card look but still left a plain black box (no
// poster frame) that only starts loading -- slowly, from the same
// unreliable host -- once clicked.
//
// FIX (2026-09-28, second pass): removed the <video> element entirely from
// this homepage section. These are meant to be lightweight preview cards,
// not inline players, so each card now shows the collection's existing
// hero_image_url (already small and already used elsewhere on the site) as
// a static thumbnail with a play-button overlay. No video bytes are
// fetched from Base44 on the homepage at all -- the actual video only loads
// if/when a visitor opens the full post at /collections/[slug] (via
// GuideBody.jsx). This removes the load-time cost completely instead of
// shrinking it.

import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

function isVideoUrl(url = '') {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

export default function VideoBlogs({ collections }) {
  const videoCollections = (collections || [])
    .filter((c) => c && c.published !== false && c.display_style === 'guide')
    .map((c) => ({ ...c, videoUrl: (c.body_images || []).find(isVideoUrl) }))
    .filter((c) => c.videoUrl)
    .slice(0, 4);

  if (videoCollections.length === 0) return null;

  return (
    <section className="py-6">
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-2xl md:text-3xl font-bold">Video blogs</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {videoCollections.map((c) => (
          <Link
            key={c.id}
            href={`/collections/${c.slug}`}
            className="group rounded-2xl overflow-hidden border border-border bg-card block"
          >
            <div className="relative aspect-[9/16] bg-muted">
              {c.hero_image_url ? (
                <img
                  src={c.hero_image_url}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <PlayCircle className="w-14 h-14 text-white drop-shadow-lg" strokeWidth={1.5} />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-1 line-clamp-2">{c.title}</h3>
              {c.meta_description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{c.meta_description}</p>
              )}
              <span className="text-sm font-semibold text-primary group-hover:underline">
                Read blog →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
