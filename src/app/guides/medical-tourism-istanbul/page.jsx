import Link from 'next/link';
import { CheckCircle2, ShieldCheck, ArrowRight, ExternalLink, HeartPulse } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Medical Tourism in Istanbul 2026: The Complete Patient & Logistics Guide | Move to Istanbul',
  description: 'Procedure costs, USHAŞ/TÜRSAB verification, medical residence permit rules, and first-48-hours recovery logistics for international patients in Istanbul.',
};

const PROCEDURES = [
  { category: 'Hair Restoration', treatments: 'FUE, DHI, Sapphire Hair Transplants', istanbul: '€1,800 – €3,500', westOrUs: '$8,000 – $15,000' },
  { category: 'Facial & Body Aesthetics', treatments: 'Rhinoplasty, Facelift, Liposuction, BBL, Tummy Tuck', istanbul: '€2,500 – €6,000', westOrUs: '$7,000 – $18,000' },
  { category: 'Dental Care', treatments: 'Dental Implants, Porcelain Veneers, Hollywood Smile', istanbul: '€200 – €500/tooth, €3,000 full set', westOrUs: '$1,200 – $2,500/tooth' },
  { category: 'Bariatric & Vision', treatments: 'Gastric Sleeve, LASIK/PRK', istanbul: '€2,200 – €4,500', westOrUs: '$6,000 – $12,000' },
];

const VERIFICATION = [
  {
    title: 'USHAŞ / Health Türkiye Accreditation',
    body: "Confirm the hospital or clinic holds an official International Health Tourism Authorization Certificate (Uluslararası Sağlık Turizmi Yetki Belgesi) issued by the Ministry of Health, via the state-run USHAŞ / Health Türkiye portal.",
    link: { label: 'Verify on Health Türkiye', href: 'https://www.healthturkiye.com/' },
  },
  {
    title: 'Surgeon Certification',
    body: 'Ensure your operating surgeon is registered with the Turkish Medical Association (Türk Tabipleri Birliği) and holds European or international board certification in their specialty (e.g., EBOPRAS for plastic surgery).',
  },
  {
    title: 'Agency Licensing (TÜRSAB)',
    body: "If booking through a medical travel agency rather than directly with a hospital, verify its license with the Association of Turkish Travel Agencies (TÜRSAB). Authorized agencies are legally required to carry passenger liability insurance and licensed transfer vehicles.",
    link: { label: 'Check TÜRSAB licensing', href: 'https://www.tursab.org.tr/' },
  },
];

const LOGISTICS_STEPS = [
  'Arrival at IST / SAW Airport',
  'VIP health transfer to hotel',
  'Pre-op bloodwork & in-person consultation',
  'Procedure day & post-op monitoring',
  'Hotel recovery + daily check-in & medication',
  'Final clearance inspection & return flight',
];

const RECOVERY_CHECKLIST = [
  'VIP airport transfers: private, climate-controlled vehicles — not standard taxis — to protect surgical sites post-op',
  'Accommodation in central, accessible districts (Nişantaşı, Şişli, Beşiktaş, Kadıköy) near major hospital clusters, with 24/7 room service and elevator access',
  'A formal "Fit to Fly" certificate from your surgeon before heading to IST or SAW for your return flight',
];

const PROTECTION_CHECKLIST = [
  'Clinic holds an official Ministry of Health International Health Tourism Authorization',
  "Operating surgeon's name and license details provided in writing before any down payment",
  'Written treatment plan detailing all-inclusive costs, hotel nights, transfers, and post-op medication',
  'Payment via direct bank transfer to a corporate account — never a personal money transfer to an unverified account',
  'Comprehensive travel insurance covering medical complications, acquired before flying',
];

const FAQ = [
  {
    q: 'Why is Istanbul so much cheaper for cosmetic and dental procedures?',
    a: "Lower clinical labor and facility costs relative to Western Europe and North America translate into 50-70% savings on comparable procedures, while government-mandated accreditation through USHAŞ keeps clinical standards high at certified facilities. The savings come from cost structure, not from reduced qualifications — provided you verify accreditation first.",
  },
  {
    q: 'Do I need a special visa for medical treatment in Türkiye?',
    a: "For short procedures, no — citizens of over 90 countries (US, Canada, UK, Australia, EU, UAE, and more) enter visa-free or via e-Visa for stays up to 30 or 90 days. Your passport must be valid for at least 60 days beyond your stay. For complex procedures or extended rehabilitation past 90 days, you can apply for a Medical Treatment Short-Term Residence Permit under Article 31/1-g of Law No. 6458.",
  },
  {
    q: 'Does medical residence require private health insurance like other residence permits?',
    a: "No — this is a specific exemption. Patients admitted to a public or private hospital for certified treatment are exempt from the standard private health insurance requirement during their residency evaluation, unlike tourist e-İkamet applicants.",
  },
  {
    q: 'Can my spouse or a caretaker stay with me during treatment?',
    a: 'Yes. Up to two accompanying family members or caretakers can also obtain residence permits under the additional health services regulations tied to your treatment.',
  },
  {
    q: 'How do I avoid unaccredited clinics or "black market" providers?',
    a: "Verify three things before paying anything: the clinic's USHAŞ / Health Türkiye International Health Tourism Authorization Certificate, your surgeon's registration with the Turkish Medical Association plus international board certification, and — if using an agency — its TÜRSAB license. Authorized agencies are legally required to carry liability insurance for transfers.",
  },
];

const RELATED_RESOURCES = [
  { label: 'Türkiye Visa & Residence Permit Guide 2026', href: '/guides/visa' },
  { label: 'Monthly Cost of Living in Istanbul for Expats & Nomads', href: '/guides/cost-of-living' },
  { label: 'Finding Housing in Türkiye: Renting in Istanbul as a Foreigner', href: '/guides/housing' },
];

export default function MedicalTourismGuidePage() {
  return (
    <GuideLayout
      eyebrow="Medical Tourism Guide"
      title="Medical Tourism in Istanbul 2026: The Complete Patient & Logistics Guide"
      description="Procedure costs, accreditation checks, medical residence permit rules, and recovery logistics for international patients."
      readTime="9 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[
        { id: 'overview', label: 'Why Istanbul' },
        { id: 'procedures', label: 'Procedures & Costs' },
        { id: 'verification', label: 'Safety & Verification' },
        { id: 'visa', label: 'Visa & Medical İkamet' },
        { id: 'logistics', label: 'First 48 Hours' },
        { id: 'faq', label: 'FAQ' },
        { id: 'resources', label: 'Related Resources' },
      ]}
    >
      {/* Overview */}
      <section id="overview">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><HeartPulse className="w-5 h-5 text-primary" /> Why Istanbul Leads Global Medical Tourism in 2026</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Istanbul has solidified its standing as one of the world&apos;s premier health and medical tourism hubs. Combining JCI-accredited hospitals, internationally trained surgeons, and cost savings of 50% to 70% compared to Western Europe and North America, the city attracts over a million medical travelers annually.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">Government Oversight</p>
            <p className="text-xs text-muted-foreground">Mandatory USHAŞ / Health Türkiye licensing</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">All-Inclusive Packages</p>
            <p className="text-xs text-muted-foreground">Transfers, interpreters, pre-op tests, hotel recovery bundled</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">No Waiting Lists</p>
            <p className="text-xs text-muted-foreground">Consultations and surgery scheduled within days</p>
          </div>
        </div>
      </section>

      {/* Procedures & costs */}
      <section id="procedures">
        <h2 className="text-2xl font-bold mb-4">Top Procedures & 2026 Cost Benchmarks</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">Istanbul offers specialized expertise across major aesthetic and medical disciplines:</p>
        <div className="lg:hidden space-y-3">
          {PROCEDURES.map((row) => (
            <div key={row.category} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-semibold text-sm mb-2">{row.category}</p>
              <dl className="space-y-2 text-sm">
                <div><dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Common Treatments</dt><dd className="text-foreground/80">{row.treatments}</dd></div>
                <div className="grid grid-cols-2 gap-2">
                  <div><dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Istanbul Cost</dt><dd className="text-foreground/80">{row.istanbul}</dd></div>
                  <div><dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">US / EU Cost</dt><dd className="text-foreground/80">{row.westOrUs}</dd></div>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Procedure Category</th>
                <th className="px-4 py-3 font-semibold">Common Treatments</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Istanbul Cost (2026)</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Typical US / EU Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PROCEDURES.map((row) => (
                <tr key={row.category} className="align-top">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{row.category}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.treatments}</td>
                  <td className="px-4 py-3 text-foreground/80 whitespace-nowrap">{row.istanbul}</td>
                  <td className="px-4 py-3 text-foreground/80 whitespace-nowrap">{row.westOrUs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Verification */}
      <section id="verification">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Regulatory Verification & Safety Standards</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          To avoid unaccredited intermediary agencies or &quot;black market&quot; underground clinics, verify every clinic using this state-mandated protocol:
        </p>
        <div className="space-y-4">
          {VERIFICATION.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-semibold mb-2">{item.title}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{item.body}</p>
              {item.link && (
                <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-2">
                  {item.link.label} <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Visa rules */}
      <section id="visa">
        <h2 className="text-2xl font-bold mb-4">Visa & Medical Residence Rules (Medical İkamet)</h2>
        <h3 className="font-semibold mb-2">Short-Term Tourist / Medical Entry</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span>Citizens of over 90 countries (US, Canada, UK, Australia, EU, UAE, and more) enter visa-free or via online e-Visa (evisa.gov.tr) for stays up to 30 or 90 days.</span></li>
          <li className="flex items-start gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span>Your passport must be valid for at least 60 days beyond the duration of stay granted by your visa or exemption.</span></li>
        </ul>
        <h3 className="font-semibold mb-2">Specialized Short-Term Medical Residence Permit (Article 31/1-g)</h3>
        <p className="text-foreground/80 leading-relaxed mb-3">
          For complex procedures or extended rehabilitation exceeding 90 days, patients can apply for a Medical Treatment Short-Term Residence Permit under Law No. 6458:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span><strong>Key exemption:</strong> patients admitted to a public or private hospital for certified treatment are exempt from the standard private health insurance requirement during residency evaluation.</span></li>
          <li className="flex items-start gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span><strong>Accompanying caretakers:</strong> up to two family members or caretakers can also obtain residence permits under additional health services regulations.</span></li>
        </ul>
      </section>

      {/* Logistics */}
      <section id="logistics">
        <h2 className="text-2xl font-bold mb-4">First 48 Hours: Logistics & Recovery Setup</h2>
        <ol className="space-y-3 mb-6">
          {LOGISTICS_STEPS.map((step, i) => (
            <li key={step} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
              <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
              <span className="text-sm text-foreground/80 leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Essential Recovery Checklist</p>
          <ul className="space-y-3">
            {RECOVERY_CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span>{item}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Consultation CTA */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Planning a Procedure in Istanbul?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Beyond the clinic itself, your trip involves accommodation, local transport, and — for longer stays — residence paperwork. If your plans extend into a broader Istanbul stay, our concierge service can help with the logistics around your treatment.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Concierge Plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Patient protection checklist */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Patient Protection & Verification Checklist</h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-3">
            {PROTECTION_CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" /><span>{item}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">Real answers to the questions international patients ask most about medical treatment in Istanbul.</p>
        <GuideFAQ items={FAQ} />
      </section>

      {/* Related resources */}
      <section id="resources">
        <h2 className="text-2xl font-bold mb-2">Related Internal Resources</h2>
        <div className="rounded-2xl border border-border bg-card p-4">
          <ul className="space-y-2.5">
            {RELATED_RESOURCES.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-sm text-foreground/80 leading-relaxed hover:text-primary hover:underline transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mt-4">
          Page last updated {new Date().toISOString().slice(0, 10)}. Procedure pricing, accreditation requirements, and visa rules change periodically — always confirm current details directly with USHAŞ / Health Türkiye and your chosen clinic before booking.
        </p>
      </section>
    </GuideLayout>
  );
}
