export const metadata = {
  title: 'Terms of Service | Move to Istanbul',
  description: 'The terms that apply to using Move to Istanbul and its concierge service.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/terms' },
};

const LAST_UPDATED = 'September 29, 2026';
const CONTACT_EMAIL = 'hello@movetoistanbul.online';

export default function TermsPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-sm sm:prose-base max-w-none
          prose-headings:font-bold prose-headings:text-foreground prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3
          prose-p:text-foreground/80 prose-p:leading-relaxed
          prose-li:text-foreground/80 prose-ul:my-3
          prose-strong:text-foreground prose-strong:font-semibold
          prose-a:text-primary prose-a:font-medium">

          <p>By using movetoistanbul.online (&quot;the site&quot;), you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.</p>

          <h2>What the site is</h2>
          <p>Move to Istanbul provides travel content, an AI-generated itinerary planner, affiliate links to book activities through third-party platforms (Viator, GetYourGuide, and similar), and a paid concierge service for people relocating to Türkiye.</p>

          <h2>Not legal, immigration, or real estate advice</h2>
          <p>We are not licensed immigration lawyers or licensed real estate agents. The concierge service and every guide on this site is guidance and coordination based on our own research and experience — not legal representation, and not a substitute for advice from a licensed professional. For visa applications, residence permits, tax matters, or property transactions, always confirm current requirements with the relevant official source or a licensed professional before you rely on anything here.</p>

          <h2>AI-generated content</h2>
          <p>Itineraries and some content on this site are generated with AI assistance. Prices, opening hours, visa rules, and similar details can change and may be out of date or inaccurate — always verify anything time-sensitive or safety-relevant (prices, hours, entry requirements) directly with the venue or official source before you rely on it.</p>

          <h2>Affiliate links</h2>
          <p>This site contains affiliate links. We may earn a commission when you book through them, at no extra cost to you. We don&apos;t control, and aren&apos;t responsible for, the third-party platforms you book through, their pricing, availability, or cancellation policies.</p>

          <h2>Concierge service</h2>
          <ul>
            <li>Concierge tiers, pricing, and what&apos;s included are as described on the <a href="/concierge">Concierge page</a> at the time you purchase.</li>
            <li>Payment is processed through PayPal. Once we&apos;ve begun work on your intake (research, document review, listings sourced, etc.), that work has value delivered and isn&apos;t automatically refundable — if something isn&apos;t working for you, contact us and we&apos;ll look at it case by case.</li>
            <li>We coordinate and advise; you remain responsible for your own visa applications, contracts, and final decisions. We can&apos;t guarantee any specific visa, permit, or rental outcome, since those are ultimately decided by third parties (government authorities, landlords, etc.) outside our control.</li>
          </ul>

          <h2 id="delivery-refunds">Delivery &amp; refunds</h2>
          <ul>
            <li>Delivery is async (email/private status link). The Trip Package Planning tier is delivered within 48 hours of payment and a completed intake; other tiers follow the timeline in your intake reply.</li>
            <li>If we haven&apos;t started work on your order, contact us and we&apos;ll refund it. Once work has begun, refunds are handled case by case as described above.</li>
            <li>Questions or problems with an order: use the <a href="/contact">Contact page</a>.</li>
          </ul>

          <h2>Your responsibilities</h2>
          <p>Don&apos;t use the site to scrape, republish, or resell our content, or to submit false information through our forms. Keep in mind that anything you submit through the concierge form should be accurate — we plan our advice around what you tell us.</p>

          <h2>Intellectual property</h2>
          <p>The content, design, and branding of this site belong to Move to Istanbul unless otherwise credited. You&apos;re welcome to link to us; please don&apos;t copy substantial content without permission.</p>

          <h2>No warranty, limited liability</h2>
          <p>The site and concierge service are provided &quot;as is.&quot; To the fullest extent permitted by law, we aren&apos;t liable for losses arising from travel decisions, visa or residence permit outcomes, third-party bookings, or reliance on AI-generated or user-facing content. Nothing in these terms limits liability that can&apos;t be excluded under applicable law.</p>

          <h2>Changes</h2>
          <p>We may update these terms as the site or service changes. Continuing to use the site after an update means you accept the revised terms.</p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of India, without regard to conflict-of-law principles.</p>

          <h2>Contact</h2>
          <p>Questions about these terms? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </div>
      </div>
    </div>
  );
}
