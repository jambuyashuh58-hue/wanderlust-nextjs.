'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';

// Lets the admin search across all activities and build an ordered
// activity_ids list for a collection, with an optional "local tip" per
// selected activity (the jsonb local_tips map). Selected ids/tips are
// submitted as plain hidden inputs so the surrounding <form>'s server action
// picks them up via formData.getAll('activity_ids') / formData.get(`tip__${id}`)
// -- no client-side submit handling needed.
export default function ActivityPicker({ allActivities, initialSelectedIds = [], initialTips = {} }) {
  const [selectedIds, setSelectedIds] = useState(initialSelectedIds);
  const [search, setSearch] = useState('');

  const byId = useMemo(() => Object.fromEntries(allActivities.map((a) => [a.id, a])), [allActivities]);

  const results = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return allActivities
      .filter((a) => !selectedIds.includes(a.id) && (a.title.toLowerCase().includes(q) || a.city_name?.toLowerCase().includes(q)))
      .slice(0, 20);
  }, [search, allActivities, selectedIds]);

  const add = (id) => { setSelectedIds((ids) => [...ids, id]); setSearch(''); };
  const remove = (id) => setSelectedIds((ids) => ids.filter((x) => x !== id));
  const move = (index, dir) => setSelectedIds((ids) => {
    const next = [...ids];
    const j = index + dir;
    if (j < 0 || j >= next.length) return next;
    [next[index], next[j]] = [next[j], next[index]];
    return next;
  });

  return (
    <div>
      <div className="relative mb-3">
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search activities to add..."
          className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
        />
        {results.length > 0 && (
          <div className="absolute z-10 mt-1 w-full max-h-64 overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
            {results.map((a) => (
              <button
                type="button" key={a.id} onClick={() => add(a.id)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted flex items-center justify-between gap-2"
              >
                <span className="truncate">{a.title}</span>
                <span className="text-xs text-muted-foreground shrink-0">{a.city_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedIds.length === 0 ? (
        <p className="text-sm text-muted-foreground">No activities selected yet.</p>
      ) : (
        <ul className="space-y-2">
          {selectedIds.map((id, i) => {
            const a = byId[id];
            return (
              <li key={id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{i + 1}. {a?.title || id}</p>
                    {a?.city_name && <p className="text-xs text-muted-foreground">{a.city_name}</p>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button type="button" onClick={() => move(i, -1)} className="px-2 py-1 text-xs rounded border border-border hover:bg-muted" aria-label="Move up">↑</button>
                    <button type="button" onClick={() => move(i, 1)} className="px-2 py-1 text-xs rounded border border-border hover:bg-muted" aria-label="Move down">↓</button>
                    <button type="button" onClick={() => remove(id)} className="p-1.5 rounded border border-border hover:bg-destructive/10 hover:text-destructive" aria-label="Remove"><X className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <input
                  type="text" name={`tip__${id}`} defaultValue={initialTips[id] || ''} placeholder="Local tip for this activity (optional)"
                  className="w-full min-h-[36px] px-2.5 py-1.5 rounded-md border border-border bg-background text-xs outline-none focus:ring-2 focus:ring-primary"
                />
                <input type="hidden" name="activity_ids" value={id} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
