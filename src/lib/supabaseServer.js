// Server-only Supabase client. Uses the service role key -- SAFE here
// specifically because this file only ever runs on the server (inside
// Server Components / Route Handlers), never bundled into client JS.
// This is the core piece that makes real server-side rendering possible:
// pages fetch data directly from Supabase during render, before any HTML
// reaches the browser -- no client-side fetch(), no empty shell for
// Googlebot to choke on.
import { createClient } from '@supabase/supabase-js';

export function getSupabaseServer() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY environment variables.');
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

// supabase-js calls the PostgREST API via fetch() under the hood, and Next.js
// patches global fetch() so that, on a page with `export const revalidate`,
// the response gets cached for that same window -- meaning a direct DB
// content edit can render stale even after the page's own ISR cache is
// force-revalidated (revalidatePath busts the rendered-HTML cache, not this
// underlying data-fetch cache). Use this client -- instead of the default
// getSupabaseServer() -- ONLY for by-slug detail lookups on pages that get
// hand-edited directly in Supabase (country guides, collection-backed
// guides): those routes have no generateStaticParams, so they're never
// attempted during `next build`'s static generation pass, and forcing
// cache: 'no-store' there is safe. Do NOT use this for list/index pages --
// those ARE prerendered at build time, and a no-store fetch during static
// generation throws "Dynamic server usage" and fails the build.
function getSupabaseServerFresh() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY environment variables.');
  }
  return createClient(url, key, {
    auth: { persistSession: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  });
}

// -------------------- Data-fetching helpers used by Server Components --------------------

export async function getCities({ popular } = {}) {
  const supabase = getSupabaseServer();
  let query = supabase.from('city').select('*');
  if (popular) query = query.eq('popular', true);
  const { data, error } = await query.order('name');
  if (error) throw error;
  return data;
}

export async function getCityByName(name) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from('city').select('*').ilike('name', name).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getActivitiesByCity(cityName, limit = 12) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('activity')
    .select('*')
    .ilike('city_name', cityName)
    .order('popularity_score', { ascending: false, nullsFirst: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getActivityById(id) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from('activity').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getAllActivities(limit = 1000) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('activity')
    .select('*')
    .order('popularity_score', { ascending: false, nullsFirst: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function searchActivities({ q, category, limit = 100 } = {}) {
  const supabase = getSupabaseServer();
  let query = supabase.from('activity').select('*');
  if (q) {
    // Search across title and city_name -- matches the Vite version's
    // client-side search behavior, now done server-side in the query itself.
    query = query.or(`title.ilike.%${q}%,city_name.ilike.%${q}%`);
  }
  if (category) query = query.eq('category', category);
  const { data, error } = await query
    .order('popularity_score', { ascending: false, nullsFirst: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getCollectionBySlug(slug) {
  const supabase = getSupabaseServerFresh();
  const { data: collection, error } = await supabase
    .from('collection')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) throw error;
  if (!collection) return null;

  let activities = [];
  if (collection.activity_ids?.length > 0) {
    const { data: activityData } = await supabase.from('activity').select('*').in('id', collection.activity_ids);
    if (activityData) {
      const orderMap = new Map(collection.activity_ids.map((id, i) => [id, i]));
      activities = activityData.sort((a, b) => orderMap.get(a.id) - orderMap.get(b.id));
    }
  }
  return { ...collection, activities };
}

export async function getCollections({ city, displayStyle } = {}) {
  const supabase = getSupabaseServer();
  let query = supabase.from('collection').select('*').eq('published', true);
  if (city) query = query.ilike('city_name', city);
  if (displayStyle) query = query.eq('display_style', displayStyle);
  const { data, error } = await query.order('sort_order', { ascending: true, nullsFirst: false });
  if (error) throw error;
  return data;
}

export async function getCountryGuides() {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('country_guide')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true, nullsFirst: false });
  if (error) throw error;
  return data;
}

export async function getCountryGuideBySlug(slug) {
  const supabase = getSupabaseServerFresh();
  const { data, error } = await supabase
    .from('country_guide')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getHouseListings({ city, bedrooms } = {}) {
  const supabase = getSupabaseServer();
  let query = supabase.from('house_listing').select('*').eq('published', true);
  if (city) query = query.ilike('city_name', city);
  if (bedrooms) query = query.eq('bedrooms', bedrooms);
  const { data, error } = await query.order('monthly_rent', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getActivitiesByCategory(category, limit = 6) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('activity')
    .select('*')
    .eq('category', category)
    .order('popularity_score', { ascending: false, nullsFirst: false })
    .limit(limit);
  if (error) throw error;
  return data;
}
