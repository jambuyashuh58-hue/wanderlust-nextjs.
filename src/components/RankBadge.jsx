// New component -- small #1-#6 ranking badge overlay, ported from the old
// site's RankingList.jsx medal styling. Wrap any card in this when rendering
// the "Top Collections" row so the first 6 get a numbered badge:
//
//   {collections.slice(0, 6).map((c, i) => (
//     <RankBadge key={c.id} rank={i + 1}>
//       <YourCollectionCard collection={c} />
//     </RankBadge>
//   ))}

const MEDAL_STYLES = {
  1: 'bg-amber-400 text-amber-950 ring-2 ring-amber-300',
  2: 'bg-slate-300 text-slate-800 ring-2 ring-slate-200',
  3: 'bg-orange-300 text-orange-950 ring-2 ring-orange-200',
};

export default function RankBadge({ rank, children }) {
  const medal = MEDAL_STYLES[rank];
  return (
    <div className="relative">
      <span
        className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
          medal || 'bg-white/90 text-foreground ring-1 ring-border'
        }`}
      >
        #{rank}
      </span>
      {children}
    </div>
  );
}
