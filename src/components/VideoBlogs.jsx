// New component -- homepage "Video Blogs" section, ported from the old
// site's src/components/VideoBlogs.jsx. That version queried Base44's
// Collection entity client-side (`Collection.filter({published:true,
// display_style:'guide'})`). This version instead RECEIVES already-fetched
// collections as a prop from the server (page.jsx), since supabaseServer.js
// only runs server-side.
//
// Integration in page.jsx:
//   import VideoBlogs from '@/components/VideoBlogs';
//   ... inside HomePage(), after fetching `collections`:
//   <VideoBlogs collections={collections} />
//
// ASSUMPTION TO VERIFY: this expects each collection row to have a
// `display_style` column (values 'guide' | 'ranking', per the old Base44
// schema) and a `body_images` array where a video URL may live alongside
// image URLs. If the Supabase `collection` table doesn't have these exact
// columns yet, this section will just render nothing (it fails safe -- see
// the empty-state return below) rather than throwing.

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
          <div key={c.id} className="rounded-2xl overflow-hidden border border-border bg-card">
            <div className="relative aspect-[9/16] bg-muted">
              <video
                src={c.videoUrl}
                muted
                loop
                playsInline
                autoPlay
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <PlayCircle className="absolute top-3 right-3 w-6 h-6 text-white/90" />
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
