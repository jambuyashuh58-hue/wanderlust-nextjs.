import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function ListTable({ title, newHref, newLabel = 'New', columns, rows, rowHref }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">{title}</h1>
        {newHref && (
          <Link href={newHref} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-primary text-white text-sm font-semibold">
            <Plus className="w-4 h-4" /> {newLabel}
          </Link>
        )}
      </div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground uppercase tracking-wide">
              {columns.map((c) => <th key={c.key} className="px-4 py-3 font-semibold whitespace-nowrap">{c.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-muted-foreground">Nothing here yet.</td></tr>
            ) : rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                {columns.map((c, i) => (
                  <td key={c.key} className="px-4 py-3 whitespace-nowrap max-w-xs truncate">
                    {i === 0 ? (
                      <Link href={rowHref(row)} className="font-medium text-primary hover:underline">{c.render ? c.render(row) : row[c.key]}</Link>
                    ) : (
                      c.render ? c.render(row) : String(row[c.key] ?? '—')
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
