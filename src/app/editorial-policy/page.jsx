export const metadata = {
  title: 'Editorial Policy | Move to Istanbul',
  description: 'How Move to Istanbul researches, curates, and discloses affiliate relationships and AI assistance.',
  alternates: { canonical: '/editorial-policy' },
};

export default function EditorialPolicyPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Editorial Policy</h1>
        <div className="prose prose-sm sm:prose-base max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-foreground/80 prose-p:leading-relaxed prose-li:text-foreground/80">
          <h2>Independence</h2>
          <p>Move to Istanbul is an independent relocation planning service. We are not a government body, law firm, licensed immigration adviser, or real estate agency.</p>
          <h2>How we research</h2>
          <p>Visa, residence, and tax guidance is based on official Republic of Türkiye sources (for example the Directorate General of Migration Management and the e-Visa system), which we cite on the relevant guides. Rules change; always verify against the official channel before acting.</p>
          <h2>Experiences and ratings</h2>
          <p>Activity prices, star ratings, and review counts come from the booking partners&apos; own listings (Viator, GetYourGuide). We don&apos;t write or alter those ratings.</p>
          <h2>Affiliate disclosure</h2>
          <p>Some links are affiliate links. We may earn a commission if you book through them, at no extra cost to you. Commissions do not change what we list or how we describe it.</p>
          <h2>AI assistance</h2>
          <p>Trip itineraries are generated with AI and should be treated as a starting point. Check opening hours, prices, and availability before you travel.</p>
          <h2>Corrections</h2>
          <p>If you spot an error, email <a href="mailto:hello@movetoistanbul.online">hello@movetoistanbul.online</a> and we&apos;ll review it.</p>
          <p><strong>We do not provide legal or tax advice.</strong> Verify requirements via official Republic of Türkiye channels.</p>
        </div>
      </div>
    </div>
  );
}
