import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy | Move to Istanbul',
  description: 'Our refund policy for the Istanbul Route Check, Housing Shortlist File, and Full Move File services.',
  alternates: { canonical: '/refund-policy/' },
};

export default function RefundPolicyPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">Refund Policy</span>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Refund Policy</h1>
        <div className="space-y-6 text-foreground/80 leading-relaxed">
          <p>This policy applies to the services described on our <Link href="/services" className="text-primary hover:underline">services page</Link> — the Istanbul Route Check, Housing Shortlist File, and Full Move File.</p>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">Before work begins</h2>
            <p>If you change your mind before we've started your intake — before research, document review, or listings sourcing has begun — contact us and we'll issue a refund.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">Once work has begun</h2>
            <p>Payment is processed through PayPal. Once we've begun work on your intake (research, document review, listings sourced, and so on), that work has value delivered and isn't automatically refundable. If something isn't working for you partway through, contact us and we'll look at it case by case — a partial refund reflecting work not yet delivered is often possible.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">What we can't refund for</h2>
            <p>Outcomes outside our control — a visa application being delayed or declined by Turkish authorities, a landlord changing their mind, or a property no longer being available — aren't grounds for a refund on their own, since our services are coordination and guidance, not a guarantee of a specific government or third-party outcome. See our <Link href="/terms" className="text-primary hover:underline">terms</Link> for the full picture.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">How to request one</h2>
            <p><Link href="/contact" className="text-primary hover:underline">Contact us</Link> with your order details and what happened — we read every request personally rather than running it through an automated process.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
