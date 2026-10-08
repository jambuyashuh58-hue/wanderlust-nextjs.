// The itinerary is generated per visitor and kept in sessionStorage, so the
// URL has no crawlable content of its own. Keep it out of the index.
export const metadata = {
  title: 'Your Türkiye Trip Itinerary | Move to Istanbul',
  robots: { index: false, follow: true },
};

export default function ItineraryLayout({ children }) {
  return children;
}
