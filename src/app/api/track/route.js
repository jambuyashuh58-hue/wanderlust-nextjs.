// Click tracking -- receives a tiny beacon from TrackClicks.jsx when a visitor
// clicks an activity card, a Book Now (affiliate) button, or a collection
// card, and stores it in activity_click / affiliate_click / collection_click
// so the admin can see what actually drives interest and bookings. Always
// answers 204: tracking must never break or slow down the page. (for=code)
import { getSupabaseServer } from '@/lib/supabaseServer';

const s = (v, n = 300) => (typeof v === 'string' && v ? v.slice(0, n) : null);
const AFFILIATE_COMPONENTS = ['action_bar', 'booking_sidebar', 'collection_page'];

export async function POST(request) {
  try {
    const b = await request.json();
    const supabase = getSupabaseServer();
    const source_page = s(b.source_page, 200);
    if (b.type === 'activity' && s(b.activity_id)) {
      await supabase.from('activity_click').insert({
        activity_id: s(b.activity_id), activity_title: s(b.title), activity_city: s(b.city),
        activity_category: s(b.category), source_page,
      });
    } else if (b.type === 'affiliate' && s(b.activity_id)) {
      const price = Number(b.price);
      await supabase.from('affiliate_click').insert({
        activity_id: s(b.activity_id), activity_title: s(b.title),
        price: Number.isFinite(price) && b.price !== '' ? price : null,
        source_page, source_component: AFFILIATE_COMPONENTS.includes(b.component) ? b.component : null,
      });
    } else if (b.type === 'collection' && s(b.collection_id)) {
      await supabase.from('collection_click').insert({
        collection_id: s(b.collection_id), collection_slug: s(b.slug), collection_title: s(b.title), source_page,
      });
    }
  } catch {
    // swallow -- tracking is best-effort
  }
  return new Response(null, { status: 204 });
}
