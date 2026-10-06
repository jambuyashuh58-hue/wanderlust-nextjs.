export const metadata = {
  title: 'Privacy Policy | Move to Istanbul',
  description: 'How Move to Istanbul collects, uses, and protects your information.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacy' },
};

const LAST_UPDATED = 'September 29, 2026';
const CONTACT_EMAIL = 'hello@movetoistanbul.online';

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-sm sm:prose-base max-w-none
          prose-headings:font-bold prose-headings:text-foreground prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3
          prose-p:text-foreground/80 prose-p:leading-relaxed
          prose-li:text-foreground/80 prose-ul:my-3
          prose-strong:text-foreground prose-strong:font-semibold
          prose-a:text-primary prose-a:font-medium">

          <p>Move to Istanbul (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates movetoistanbul.online. This policy explains what information we collect, why, and how it&apos;s handled.</p>

          <h2>Information you give us directly</h2>
          <ul>
            <li><strong>Concierge inquiries:</strong> name, email, Instagram handle (optional), nationality, budget range, target timeline, and any message you write, when you submit the &quot;Tell us about your move&quot; form.</li>
            <li><strong>Newsletter signup:</strong> your email address, when you subscribe via the footer or other signup forms on the site.</li>
            <li><strong>AI itinerary tool:</strong> the trip details you enter (destination cities, trip length, preferences) to generate your itinerary. This is used to build your itinerary and is not required to include personal identifying information.</li>
          </ul>

          <h2>Information collected automatically</h2>
          <p>We use Google Analytics and Google Search Console to understand how visitors use the site — which pages are viewed, general location and device type, referring sites, and search terms that bring people here. These tools use cookies and similar technology. We use this data in aggregate to improve the site; we do not use it to individually identify you.</p>

          <h2>Affiliate links</h2>
          <p>Some links on this site (to Viator, GetYourGuide, and similar booking platforms) are affiliate links — we may earn a commission if you book through them, at no extra cost to you. Clicking these links takes you to a third-party site with its own privacy policy and its own cookies/tracking, which we don&apos;t control.</p>

          <h2>Payments</h2>
          <p>Concierge service payments are processed through PayPal. We do not receive or store your card or bank details — PayPal handles that directly under its own privacy policy.</p>

          <h2>Where your data is stored</h2>
          <p>Information you submit through our forms is stored in our database (hosted on Supabase) and used to respond to your inquiry, deliver the concierge service you requested, or send the newsletter you signed up for. We take reasonable technical measures to keep this data secure, but no online system can be guaranteed 100% secure.</p>

          <h2>Who we share data with</h2>
          <p>We don&apos;t sell your personal information. We share it only with the service providers that make the site work — our database host (Supabase), payment processor (PayPal), and analytics provider (Google) — strictly to the extent needed to provide the service, and with authorities if legally required.</p>

          <h2>Your rights</h2>
          <p>You can ask us to access, correct, or delete the personal information we hold about you, or to unsubscribe from the newsletter (also available via the unsubscribe link in any email), by writing to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

          <h2>Children</h2>
          <p>This site is not directed at children, and we don&apos;t knowingly collect personal information from anyone under 16.</p>

          <h2>Changes to this policy</h2>
          <p>We may update this policy from time to time. Material changes will be reflected by updating the &quot;Last updated&quot; date above.</p>

          <h2>Contact</h2>
          <p>Questions about this policy? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </div>
      </div>
    </div>
  );
}
