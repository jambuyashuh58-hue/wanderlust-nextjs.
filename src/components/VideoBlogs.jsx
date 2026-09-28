// Homepage "Video Blogs" section.
//
// HISTORY:
// - Originally pulled a video straight from each collection's own
//   `body_images` (Base44-hosted, ~100-150MB per file) and linked the card
//   to that same collection. Autoplaying 4 of those at once caused
//   intermittent 503s under load (Base44's file API rate-limiting), which
//   first showed as blank cards, then -- after a quick autoplay-off fix --
//   as slow-loading black boxes.
// - FIX (2026-09-28): the user confirmed these preview clips don't need to
//   be sourced from any specific guide's own media -- they're a homepage
//   showcase, not a 1:1 video-per-guide feature. So this section now uses a
//   small, fixed set of short, low-file-size (2-6MB) Istanbul stock clips
//   (sourced from Pexels, vertical 360x640 SD renditions -- a fraction of
//   the size of the old Base44 files) instead of pulling from `body_images`.
//   Being this small, autoplay/loop is safe again and the clips load
//   instantly. Each card still links through to the most relevant existing
//   guide on the site.

const VIDEOS = [
  {
    id: 'sultan-ahmed-dusk',
    title: 'Sultanahmet at Dusk',
    description: 'The Blue Mosque lit up as the sun goes down over Sultanahmet.',
    videoUrl: 'https://videos.pexels.com/video-files/36443301/15453460_360_640_30fps.mp4',
    href: '/collections/things-to-do-sultanahmet',
  },
  {
    id: 'bosphorus-waterfront',
    title: "Istanbul's Waterfront Skyline",
    description: 'Domes and minarets along the Bosphorus waterfront.',
    videoUrl: 'https://videos.pexels.com/video-files/35379428/14990582_360_640_30fps.mp4',
    href: '/collections/best-bosphorus-cruises-istanbul',
  },
  {
    id: 'blue-mosque-interior',
    title: 'Inside the Blue Mosque',
    description: "A closer look at one of Istanbul's most famous landmarks.",
    videoUrl: 'https://videos.pexels.com/video-files/28077962/12294863_360_640_60fps.mp4',
    href: '/collections/things-to-do-sultanahmet',
  },
  {
    id: 'mosque-over-bosphorus',
    title: 'Süleymaniye Over the Bosphorus',
    description: 'A hilltop mosque overlooking the water and the city skyline.',
    videoUrl: 'https://videos.pexels.com/video-files/29205381/12608751_360_640_60fps.mp4',
    href: '/collections/suleymaniye-camii-mosque',
  },
];

import Link from 'next/link';

export default function VideoBlogs() {
  return (
    <section className="py-6">
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-2xl md:text-3xl font-bold">Video blogs</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {VIDEOS.map((v) => (
          <Link
            key={v.id}
            href={v.href}
            className="group rounded-2xl overflow-hidden border border-border bg-card block"
          >
            <div className="relative aspect-[9/16] bg-black">
              <video
                src={v.videoUrl}
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-1 line-clamp-2">{v.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{v.description}</p>
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
