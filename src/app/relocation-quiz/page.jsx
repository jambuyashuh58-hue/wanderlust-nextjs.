// New page -- ports the old site's /relocation-quiz. Server Component
// fetches real collections so the client quiz can link to real slugs
// instead of a hardcoded (and possibly stale) slug map.

import { getCollections } from '@/lib/supabaseServer';
import RelocationQuizClient from '@/components/RelocationQuizClient';

export const metadata = {
  title: 'Relocation Quiz — Move to Istanbul',
  description: 'Answer a few quick questions and get pointed to exactly what\'s useful for your Türkiye trip or move.',
  alternates: { canonical: '/relocation-quiz' },
};

export const revalidate = 3600;

export default async function RelocationQuizPage() {
  const collections = await getCollections().catch(() => []);
  return <RelocationQuizClient collections={collections} />;
}
