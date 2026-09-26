// Ported from the old Vite site's src/components/guide/GuideBody.jsx (same
// logic, react-router's <Link to> swapped for next/link's <Link href>).
// This is what actually embeds a guide collection's video: it parses the
// markdown `intro` into blocks and interleaves `body_images` (photos and/or
// a video) between them at spaced intervals. The collections/[slug] page
// only renders the plain intro as flat markdown and never touched
// body_images at all, which is why a "guide" collection with a video never
// showed one -- this component is what's missing from that page.

import Link from 'next/link';

const VIDEO_RE = /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i;
const isVideoUrl = (url) => typeof url === 'string' && (VIDEO_RE.test(url) || url.includes('video'));

function renderInline(text) {
  const parts = text.split(/(\*\*.+?\*\*|\[.+?\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const linkMatch = part.match(/^\[(.+?)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      if (url.startsWith('/')) return <Link key={i} href={url} className="text-primary font-medium underline-offset-2 hover:underline">{label}</Link>;
      return <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-primary font-medium underline-offset-2 hover:underline">{label}</a>;
    }
    return part;
  });
}

function parseBlocks(intro) {
  const raw = (intro || '').replace(/\r/g, '').split(/\n{2,}/);
  return raw.map((b) => b.trim()).filter(Boolean).map((block) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return null;
    const headingMatch = lines[0].match(/^#{2,3}\s+(.+)$/);
    if (lines.length === 1 && headingMatch) return { type: 'heading', text: headingMatch[1] };
    const isBulletList = lines.every((l) => /^[-*]\s+/.test(l));
    if (isBulletList) return { type: 'list', items: lines.map((l) => l.replace(/^[-*]\s+/, '')) };
    if (lines.length === 1 && lines[0].length <= 80 && !/[.!?]$/.test(lines[0])) return { type: 'heading', text: lines[0] };
    return { type: 'paragraph', text: lines.join(' ') };
  }).filter(Boolean);
}

export default function GuideBody({ intro, bodyImages = [], guideTitle }) {
  const blocks = parseBlocks(intro);
  const media = bodyImages;
  const insertInterval = blocks.length > 0 && media.length > 0 ? Math.max(2, Math.floor(blocks.length / (media.length + 1))) : blocks.length;
  const rendered = [];
  let mediaIdx = 0;
  blocks.forEach((block, i) => {
    rendered.push({ kind: 'block', block });
    if (mediaIdx < media.length && (i + 1) % insertInterval === 0) { rendered.push({ kind: 'media', url: media[mediaIdx] }); mediaIdx++; }
  });
  while (mediaIdx < media.length) { rendered.push({ kind: 'media', url: media[mediaIdx] }); mediaIdx++; }
  const fallbackAlt = guideTitle ? `Photo from the guide: ${guideTitle}` : 'Guide photo';

  return (
    <div className="max-w-3xl mx-auto">
      {rendered.map((item, i) => {
        if (item.kind === 'media') {
          return isVideoUrl(item.url) ? (
            <div key={i} className="flex justify-center my-8"><div className="w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-border"><video src={item.url} controls preload="auto" className="w-full h-full object-contain" /></div></div>
          ) : (<figure key={i} className="my-8"><img src={item.url} alt={fallbackAlt} className="w-full rounded-2xl border border-border" loading="lazy" /></figure>);
        }
        const { block } = item;
        if (block.type === 'heading') return <h2 key={i} className={`text-xl font-bold text-foreground mb-3 ${i === 0 ? '' : 'mt-10'}`}>{block.text}</h2>;
        if (block.type === 'list') return (<ul key={i} className="list-disc pl-5 space-y-1.5 mb-6 text-base leading-relaxed text-foreground/80">{block.items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}</ul>);
        return <p key={i} className="text-base leading-relaxed text-foreground/80 mb-6">{renderInline(block.text)}</p>;
      })}
    </div>
  );
}
