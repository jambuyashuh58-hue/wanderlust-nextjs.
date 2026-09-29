'use client';

import { useState, useTransition } from 'react';
import { MapPinned, Loader2 } from 'lucide-react';
import { geocodeMissingBatch } from '@/app/admin/activities/actions';

// Works through activities that have an address but no coordinates yet, 15
// at a time (Nominatim's free geocoder is rate-limited, so a single click
// can't safely do them all at once -- see geocodeMissingBatch's comment).
// Click repeatedly ("Geocode next 15") until it reports nothing left.
export default function GeocodeButton({ initialRemaining }) {
  const [remaining, setRemaining] = useState(initialRemaining);
  const [lastResult, setLastResult] = useState(null);
  const [isPending, startTransition] = useTransition();

  function runBatch() {
    startTransition(async () => {
      const result = await geocodeMissingBatch();
      setRemaining(result.remaining);
      setLastResult(result);
    });
  }

  if (remaining === 0 && !lastResult) return null;

  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        type="button"
        onClick={runBatch}
        disabled={isPending || remaining === 0}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-semibold hover:border-primary transition-colors disabled:opacity-60"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPinned className="w-4 h-4" />}
        {remaining === 0 ? 'All addressed activities geocoded' : `Geocode next ${Math.min(15, remaining)} (${remaining} left)`}
      </button>
      {lastResult && (
        <span className="text-xs text-muted-foreground">
          Last batch: {lastResult.geocoded}/{lastResult.processed} geocoded.
        </span>
      )}
    </div>
  );
}
