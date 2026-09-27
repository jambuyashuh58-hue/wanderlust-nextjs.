// On-demand ISR revalidation endpoint.
//
// This project's dynamic content pages (country guides, collection-backed
// guides, etc.) use `export const revalidate = 3600` for ISR. That means a
// Supabase content edit doesn't show up live until either the 1-hour window
// naturally elapses or someone forces a fresh render. Redeploying the app
// does NOT reliably bust this cache (Vercel's ISR cache for on-demand pages
// is keyed by path, not by deployment), so after any direct DB content edit,
// hit this route for the affected path(s) to make the change visible right
// away instead of waiting up to an hour.
//
// Usage: GET /api/revalidate?path=/country-guides/india
// Multiple paths: GET /api/revalidate?path=/a&path=/b
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const paths = searchParams.getAll('path');

  if (paths.length === 0) {
    return NextResponse.json({ error: 'Provide at least one ?path= query param.' }, { status: 400 });
  }

  const revalidated = [];
  for (const path of paths) {
    // Only allow revalidating actual site paths, not arbitrary strings.
    if (typeof path === 'string' && path.startsWith('/')) {
      revalidatePath(path);
      revalidated.push(path);
    }
  }

  return NextResponse.json({ revalidated, now: Date.now() });
}
