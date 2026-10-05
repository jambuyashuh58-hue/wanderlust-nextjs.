import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Moving to Türkiye from the US: Visa & Residence Notes | Move to Istanbul',
  description: 'Entry requirements for US citizens visiting Türkiye, and what US-issued documents need before a Turkish residence permit application will accept them.',
  alternates: { canonical: '/visa-residence/by-nationality/united-states/' },
};

const FAQ = [
  {
    q: 'Do I need a visa to enter Türkiye as a US citizen?',
    a: 'As of the official Turkish Ministry of Foreign Affairs guidance, ordinary US passport holders travelling for tourism are visa-exempt for stays of up to 90 days within any 180-day period. This is separate from your residence permit timeline — it just covers entry and short stays. Confirm your situation on evisa.gov.tr or mfa.gov.tr before you book, since entry rules are periodically revised.',
  },
  {
    q: 'Do my US documents need to be legalized by a Turkish embassy?',
    a: 'Generally no. The United States is a long-standing member of the Hague Apostille Convention, and so is Türkiye, so a US-issued document (a birth certificate, an FBI background check, a marriage certificate) typically just needs an apostille from the relevant US state authority or the US Department of State — not full embassy consular legalization. After that, it still needs a certified Turkish translation for most official filings.',
  },
  {
    q: 'Who actually issues the apostille on a US document?',
    a: "It depends on the document. State-issued records (birth, marriage, state background checks) are apostilled by that state's Secretary of State. Federal documents, including FBI background checks, go through the US Department of State's Office of Authentications. Get this done before you fly if you know you'll need it for a specific permit category — it's far more straightforward from inside the US than after you've relocated.",
  },
];

export default function UnitedStatesVisaPage() {
  return (
    <GuideLayout
      eyebrow="Visa & Residence · By Nationality"
      title="Moving to Türkiye from the US"
      description="Entry rules for US passport holders, and what your documents need before a residence permit application accepts them."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/visa-residence/by-nationality"
      backLabel="By Nationality"
      sections={[{ id: 'entry', label: 'Entering Türkiye' }, { id: 'residence', label: 'For your residence permit' }, { id: 'faq', label: 'FAQ' }]}
    >
      <section id="entry">
        <h2 className="text-2xl font-bold mb-4">Entering Türkiye as a US citizen</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Ordinary US passport holders travelling for tourism are visa-exempt for short stays, per the Turkish Ministry of Foreign Affairs — no e-Visa or advance visa application is required for a standard tourist trip. That visa-free window is what you'll typically be using when you first arrive and start the short-term residence permit (e-İkamet) process, since you apply for the permit from inside Türkiye during your visa-free stay.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Rules like this are revised periodically, and official-passport holders are treated differently from ordinary passport holders, so confirm your specific situation before booking.
        </p>
        <a href="https://www.evisa.gov.tr/en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Check current status on the official e-Visa portal <ExternalLink className="w-3 h-3" />
        </a>
      </section>
      <section id="residence">
        <h2 className="text-2xl font-bold mb-4">What this means for your residence permit documents</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Because both the US and Türkiye are parties to the Hague Apostille Convention, US-issued civil documents (birth certificates, marriage certificates, FBI background checks, and similar) don't need the full Turkish-embassy consular legalization chain. An apostille from the appropriate US authority is the equivalent step. From there, most Turkish filings still require a certified (sworn) Turkish translation of the apostilled document — see our general page on that process for how it works once you're in Türkiye.
        </p>
        <Link href="/visa-residence/translation-legalization" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Translation & legalization, generally <ArrowRight className="w-3 h-3" />
        </Link>
        <p className="text-foreground/80 leading-relaxed mt-4">
          This matters most for the Family Residence Permit (apostilled marriage/birth certificates) and, for some applicants, background-check requirements — it's a smaller factor for a standard short-term tourist e-İkamet application, which leans more on your lease and insurance.
        </p>
      </section>
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want your exact route mapped out?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Istanbul Route Check covers entry timing, document prep, and your residence-permit application end to end.</p>
        <Link href="/services/istanbul-route-check" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Istanbul Route Check <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
