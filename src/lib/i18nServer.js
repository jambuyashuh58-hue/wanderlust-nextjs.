import { headers } from 'next/headers';

// Server-only: reads the locale middleware tagged this request with (see
// src/middleware.js). Import this ONLY from Server Components / Route
// Handlers -- it pulls in next/headers, which breaks the client bundle if a
// 'use client' component ends up importing it (see src/lib/i18n.js for the
// client-safe helpers: pick() and t()).
export async function getLocale() {
  const h = await headers();
  return h.get('x-locale') === 'tr' ? 'tr' : 'en';
}
