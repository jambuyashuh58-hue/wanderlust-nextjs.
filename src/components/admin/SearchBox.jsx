'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBox({ placeholder = 'Search...' }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const submit = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q');
    const params = new URLSearchParams(searchParams.toString());
    if (q) params.set('q', q); else params.delete('q');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={submit} className="mb-4 relative max-w-sm">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text" name="q" defaultValue={searchParams.get('q') || ''} placeholder={placeholder}
        className="w-full min-h-[40px] pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    </form>
  );
}
