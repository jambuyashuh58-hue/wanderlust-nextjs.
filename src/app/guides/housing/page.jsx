import Link from 'next/link';
import { CheckCircle2, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Finding Housing in Türkiye: Renting in Istanbul as a Foreigner (2026) | Move to Istanbul',
  description: 'Neighborhood breakdown, rent ranges, and the full apartment-search process.',
};

const DISTRICTS = [
  {
    district: 'Kadıköy (Moda / Caferağa)',
    vibe: 'Vibrant, bohemian, highly walkable, cafe culture',
    rent: '35,000 – 55,000 TRY (~$1,000 – $1,600)',
    status: 'Mostly Open',
  },
  {
    district: 'Beşiktaş (Cihannüma / Ihlamurdere)',
    vibe: 'Central, lively student & young professional hub',
    rent: '38,000 – 60,000 TRY (~$1,100 – $1,750)',
    status: 'Select Zones Closed',
  },
  {
    district: 'Beyoğlu (Cihangir / Galata)',
    vibe: 'Historic, artistic, popular with creative expats',
    rent: '40,000 – 65,000 TRY (~$1,150 – $1,900)',
    status: 'Multiple Zones Closed',
  },
  {
    district: 'Şişli (Bomonti / Nişantaşı)',
    vibe: 'Modern, upscale, high-rise condos & business hub',
    rent: '45,000 – 75,000 TRY (~$1,300 – $2,200)',
    status: 'Select Zones Closed',
  },
  {
    district: 'Fatih & Esenyurt',
    vibe: 'Historical peninsula / Outer western suburb',
    rent: '18,000 – 30,000 TRY (~$500 – $900)',
    status: '🚫 100% Fully Closed',
  },
];

const CHECKLIST = [
  'Official Potential Tax ID Number (Generated online via ivd.gib.gov.tr)',
  'Passport Copy & Valid Turkish Entry Stamp / Visa',
  'Official UAVT Address Code (Ulusal Adres Veri Tabanı ID for the specific flat)',
  'Verification that the Neighborhood (Mahalle) is 100% OPEN on goc.gov.tr',
  "Landlord's Title Deed Copy (TAPU) matching their legal Turkish ID (T.C. Kimlik)",
  'Written Agreement that the Landlord WILL attend the Turkish Notary (Noter)',
  'Clarification on Utility Meter Transfer (Su, Elektrik, Doğalgaz)',
];

const STEPS = [
  {
    title: 'Verify Neighborhood Eligibility (Açık Mahalle Check)',
    body: [
      'Never rely on real estate agents (Emlakçı) or landlords who claim an apartment is "fine for foreigners." You must independently check the official government database.',
      "Ask the landlord or agent for the exact Mahalle (Neighborhood) and İlçe (District) listed on the property's Title Deed (TAPU).",
      'Cross-reference the name against the Directorate\'s blacklisted list. If the neighborhood is closed, your residency application will be rejected, regardless of how much rent you pay upfront.',
    ],
    link: { label: 'Check the Closed Neighborhood Registry', href: 'https://en.goc.gov.tr/' },
  },
  {
    title: 'Search & Screen Listings on Local Property Portals',
    body: [
      'Most long-term apartments in Istanbul are listed on local Turkish real estate portals rather than Western platforms.',
      'Filter by district, furnished status (Eşyalı), and monthly price range. Look for listings marked "Yabancıya Uygun" (Suitable for Foreigners) or "İkamete Uygun" (Eligible for Residence Permit).',
    ],
    note: 'Scam Prevention: Never transfer a "holding deposit" (Kapora) via wire transfer before viewing the apartment in person and inspecting the landlord\'s ID and TAPU.',
    links: [
      { label: 'Sahibinden', href: 'https://www.sahibinden.com/' },
      { label: 'Hepsiemlak', href: 'https://www.hepsiemlak.com/' },
    ],
  },
  {
    title: 'Audit the Building Address Code (UAVT Code)',
    body: [
      'Every legally registered residential door in Türkiye is assigned a unique 10-digit number called a UAVT Code (Ulusal Adres Veri Tabanı).',
      'Why It Matters: If an apartment is an illegal basement conversion, a divided villa floor without an individual door number, or a commercial office space (Büro/Ofis), the civil registry (Nüfus Müdürlüğü) cannot register your address, blocking your e-İkamet.',
      "Action: Request the landlord's utility bill (Water or Electricity) and check the 10-digit Tesisat/UAVT number.",
    ],
  },
  {
    title: 'Execute a Notarized Lease Agreement at a Turkish Notary (Noter)',
    body: [
      'In Türkiye, a simple paper contract signed at a kitchen table is NOT legally valid for residence permit applications. It must be notarized.',
      "Required Documents at the Notary: Tenant's original Passport + Sworn Turkish Translation (Yeminli Tercüme), Tenant's Turkish Tax Number certificate from GİB, Landlord's original Turkish ID (T.C. Kimlik) and original Title Deed (TAPU), and two copies of the standard Turkish Rental Agreement (Kira Sözleşmesi).",
    ],
    link: { label: 'Find a Notary via the TNB Portal', href: 'https://www.tnb.org.tr/' },
  },
  {
    title: 'Transfer Utility Bills into Your Name',
    body: [
      'Once your lease is notarized, you are legally required to transfer utility meters into your name before setting up an address registration.',
      'Requirements: Bring your notarized lease, passport, potential tax number, DASK earthquake insurance policy copy (provided by landlord), and meter deposit fees (Güvence Bedeli).',
    ],
    links: [
      { label: 'İSKİ Water', href: 'https://www.iski.istanbul/' },
      { label: 'CK Boğaziçi Electricity', href: 'https://www.ckboğaziçi.com.tr/' },
      { label: 'İGDAŞ Gas', href: 'https://www.igdas.istanbul/' },
    ],
  },
  {
    title: 'Register Your Address on e-Devlet & Nüfus',
    body: [
      'After your residence permit (e-İkamet) application is approved and your foreign ID number (YKN—starting with 99) is active, register your address in the central database.',
      'Search for "Adres Beyanı" (Address Declaration) or visit your local District Population Directorate (İlçe Nüfus Müdürlüğü) with your notarized lease and utility bill to finalize your address record.',
    ],
    link: { label: 'Log into the e-Devlet Gateway', href: 'https://www.turkiye.gov.tr/' },
  },
];

const TROUBLESHOOTING = [
  {
    title: 'The Sahibinden "Bait & Switch" Scam',
    problem: 'Scammers frequently post photos of luxury modern flats in Cihangir or Moda at unrealistically low prices (e.g., 15,000 TRY). When you inquire, they claim the flat was just rented but offer a lower-quality, overpriced alternative in a closed neighborhood.',
    solution: "Red Flags: Landlords who demand wire transfers to \"reserve\" a viewing, refusal to meet at the property, or missing UAVT address codes. Always view in person and inspect TAPU before any payment.",
  },
  {
    title: 'Rent Paid in Foreign Currency (USD/EUR) vs. Turkish Lira Rules',
    problem: 'Under Turkish Financial Protection Law (32 Sayılı Karar), real estate contracts between Turkish citizens must be denominated in Turkish Lira (TRY). However, contracts where one party is a foreigner without a local work permit CAN legally be priced in foreign currency (USD/EUR) if both parties agree.',
    solution: 'Pro-Tip: If paying in TRY, negotiate a clear annual rent increase mechanism. Under Turkish Code of Obligations (Borçlar Kanunu), residential rent increases are capped by the 12-month rolling consumer inflation index (TEFE-TÜFE).',
  },
  {
    title: 'The Eviction Undertaking Trap (Tahliye Taahhütnamesi)',
    problem: 'Landlords in Istanbul almost universally demand that foreign tenants sign an Eviction Undertaking (Tahliye Taahhütnamesi) alongside the lease agreement. This is a legal document where the tenant agrees to vacate the property on a specific future date without requiring court eviction proceedings.',
    solution: 'Protection Rule: Never sign an undated eviction undertaking upon signing the lease. Under Turkish High Court (Yargıtay) rulings, an eviction undertaking signed on the exact same date as the rental contract can be legally challenged as executed under duress.',
  },
  {
    title: 'Handling Landlords Who Refuse Notary Visits',
    problem: 'Some local landlords avoid visiting the notary because they do not report full rental income to the tax office (GİB).',
    solution: 'The Reality: If your landlord refuses to attend the notary or provide their TAPU copy, you cannot use the lease for e-İkamet. Walk away from the property before paying a deposit.',
  },
];

const FAQ = [
  {
    q: 'How much upfront capital do I need to rent an apartment in Istanbul?',
    a: "To secure a 1+1 furnished flat renting for 35,000 TRY/month (~$1,000 USD), plan for: First Month's Rent (35,000 TRY), Security Deposit 1–2 months (35,000–70,000 TRY), Real Estate Agent Commission 12% of annual rent + VAT (~50,400 TRY), Notary Fees & Sworn Translation (~2,500–4,000 TRY), Utility Meter Deposits (~3,000–5,000 TRY). Total Upfront Cash Needed: 125,000–165,000 TRY ($3,600–$4,800 USD).",
  },
  {
    q: 'Can I apply for an e-İkamet using an Airbnb or hotel booking?',
    a: 'No. Effective 2022, long-term tourist and digital nomad residence permit applications supported by short-term Airbnb receipts, hotel reservations, or daily holiday rentals are strictly rejected. You must present an official notarized residential lease agreement (Noter Onaylı Kira Sözleşmesi).',
  },
  {
    q: 'What happens if I move to a new apartment after getting my residence permit?',
    a: 'If you change your residential address while holding an active residence permit card, you must report the change within 20 working days. You must bring your new notarized lease (in an open neighborhood) and utility bill to the local District Population Directorate (İlçe Nüfus Müdürlüğü) or Provincial Migration Office to update your registered address.',
  },
  {
    q: 'Why do landlords ask foreign tenants for 6 or 12 months of rent upfront?',
    a: 'Because evicting non-paying tenants through Turkish courts can take over 18 to 24 months, landlords often view foreign remote workers as higher risk. Offering 6 or 12 months of rent in advance is frequently used by expats as leverage to negotiate lower monthly rates or bypass strict local guarantor requirements.',
  },
  {
    q: 'Can my landlord double the rent at the end of my 1-year contract?',
    a: 'For ongoing active leases, Turkish law protects tenants by capping annual rent increases to the official 12-month average inflation rate (TEFE-TÜFE index). Landlords cannot arbitrarily double your rent during a contract renewal unless you sign a new agreement or agree to a voluntary increase.',
  },
  {
    q: 'Can foreigners buy property in Türkiye?',
    a: 'Yes, most nationalities can buy property in Türkiye without residency. There are location restrictions (some border and military-adjacent zones are restricted) and a per-nationality cap on total hectares. Foreign property purchases above roughly $400,000 USD also qualify the buyer for Turkish citizenship-by-investment.',
  },
  {
    q: 'What utilities cost extra on top of rent?',
    a: 'Electricity, gas, water, and internet are almost always billed separately from rent in Türkiye. Combined utilities for a 1-bedroom typically run €60–150/month depending on season (heating drives winter bills up significantly). Building maintenance fees ("aidat") for apartment buildings add another €20–80/month and are usually the tenant\'s responsibility. Always clarify what\'s included before signing.',
  },
];

const RELATED_RESOURCES = [
  {
    category: 'Legal Stay & Visas',
    links: [
      { label: 'Türkiye Visa & Residence Permit Guide 2026 (Master Pillar)', href: '/guides/visa' },
      { label: 'How to Avoid the "10-Day Conditional Entry" Visa Trap in Istanbul', href: '/guides/10-day-conditional-entry-trap' },
      { label: 'Closed Neighborhoods in Istanbul: The 25% Foreigner Quota List', href: '/guides/closed-neighborhoods-istanbul' },
      { label: 'How to Apply for the Türkiye Digital Nomad Visa Online', href: '/guides/digital-nomad-visa-application' },
    ],
  },
  {
    category: 'Financial & Settle-In Logistics',
    links: [
      { label: 'Monthly Cost of Living in Istanbul for Expats & Nomads', href: '/guides/cost-of-living' },
      { label: 'How to Open a Turkish Bank Account Without an İkamet Card', href: '/guides/bank-account-without-ikamet' },
      { label: 'How to Avoid Excessive ATM Conversion Fees in Istanbul', href: '/guides/avoiding-atm-fees-istanbul' },
      { label: 'Kadıköy vs. Beşiktaş: Best Neighborhoods for Expats', href: '/guides/kadikoy-vs-besiktas' },
      { label: 'PayPal and Stripe Alternatives for Freelancers in Türkiye', href: '/guides/paypal-stripe-alternatives-turkey' },
      { label: 'Best Way to Send USD to a Turkish Bank Account: 2026 Guide', href: '/guides/send-usd-to-turkish-bank-account' },
      { label: 'eSIM vs. Local SIM Card in Türkiye: 2026 Comparison', href: '/guides/esim-vs-local-sim-turkey' },
      { label: 'Phone Registration Tax in Türkiye: IMEI Lock Rules', href: '/guides/phone-registration-tax-turkey' },
    ],
  },
  {
    category: 'Property Owners',
    links: [
      { label: 'Best Property Management Companies in Istanbul for Overseas Owners', href: '/guides/property-management-istanbul' },
    ],
  },
  {
    category: 'Family & Settling In',
    links: [
      { label: 'International Schools in Istanbul for Expat Families', href: '/guides/international-schools-istanbul' },
      { label: 'Expat Culture Shock Living in Istanbul: What to Expect', href: '/guides/culture-shock-istanbul' },
    ],
  },
];

const SOURCES = [
  { label: 'Sahibinden.com — largest Turkish property listings platform', href: 'https://www.sahibinden.com/' },
  { label: 'Hepsiemlak — alternative listings platform with English support', href: 'https://www.hepsiemlak.com/' },
  { label: 'Turkish Notaries Union (TNB) — locate a local Noter for lease notarization', href: 'https://www.tnb.org.tr/' },
  { label: 'Directorate of Migration Management — closed neighborhood registry & residency rules', href: 'https://en.goc.gov.tr/' },
  { label: 'Türkiye Land Registry (Tapu ve Kadastro) — property purchases and title deed info', href: 'https://www.tkgm.gov.tr/' },
];

export default function GuideHousingPage() {
  return (
    <GuideLayout
      eyebrow="Housing Guide"
      title="Finding Housing in Türkiye: Renting in Istanbul as a Foreigner (2026)"
      description="Neighborhood breakdown, rent ranges, and the full apartment-search process."
      readTime="13 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[
        { id: 'landscape', label: '2026 Rental Landscape' },
        { id: 'districts', label: 'District Costs' },
        { id: 'checklist', label: 'Pre-Lease Checklist' },
        { id: 'steps', label: 'Rental Walkthrough' },
        { id: 'troubleshooting', label: 'Troubleshooting' },
        { id: 'faq', label: 'FAQ' },
        { id: 'resources', label: 'Related Resources' },
        { id: 'sources', label: 'Sources & Platforms' },
      ]}
    >
      {/* 2026 Rental Landscape */}
      <section id="landscape">
        <h2 className="text-2xl font-bold mb-4">2026 Rental Landscape</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Finding an apartment in Istanbul is an exciting milestone, but navigating the local rental market as a foreigner comes with strict legal and bureaucratic hurdles. Following legislative changes by the Directorate of Migration Management (Göç İdaresi Başkanlığı), renting a flat is no longer just about budget and location—it directly impacts your legal right to live in Türkiye.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">In 2026, foreign renters must navigate three primary factors:</p>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
            <span className="text-primary mt-0.5">•</span>
            <span><strong className="text-foreground">The 25% Foreigner Quota Rule (Closed Neighborhoods / Kapalı Mahalleler):</strong> Signing a lease in a neighborhood where foreigners exceed 25% of the total population will lead to an automatic rejection of your short-term residence permit (e-İkamet) application.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
            <span className="text-primary mt-0.5">•</span>
            <span><strong className="text-foreground">Notarized Lease Requirements (Noter Onaylı Kira Sözleşmesi):</strong> To use a lease for residency, the contract must be executed in person at a Turkish Notary (Noter) alongside the landlord, who must present their original Title Deed (TAPU) and legal ID.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
            <span className="text-primary mt-0.5">•</span>
            <span><strong className="text-foreground">Upfront Capital Requirements:</strong> Landlords frequently demand 1 to 2 months' rent as a security deposit, plus a mandatory 12% + VAT real estate commission (Emlak Komisyonu) if renting through an agent.</span>
          </li>
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">1. Verify Open Zone</p>
            <p className="text-xs text-muted-foreground">Check Göç İdaresi List</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">2. Audit UAVT Code</p>
            <p className="text-xs text-muted-foreground">Check Door Address ID</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">3. Notarize at Noter</p>
            <p className="text-xs text-muted-foreground">Sign with Landlord TAPU</p>
          </div>
        </div>
      </section>

      {/* District comparison table */}
      <section id="districts">
        <h2 className="text-2xl font-bold mb-4">Average Rental Costs Across Popular Expat Districts (2026)</h2>

        {/* Mobile / narrow layout: stacked cards, nothing gets clipped */}
        <div className="lg:hidden space-y-3">
          {DISTRICTS.map((row) => (
            <div key={row.district} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-semibold text-sm mb-1">{row.district}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{row.vibe}</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Avg 1+1 Rent</p>
                  <p className="text-sm font-medium">{row.rent}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">e-İkamet Status</p>
                  <p className="text-sm font-medium">{row.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wide layout: full table, only shown once there's room for it */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">District / Neighborhood</th>
                <th className="px-4 py-3 font-semibold">Expats &amp; Nomad Vibe</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Avg 1+1 Furnished Rent</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">e-İkamet Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DISTRICTS.map((row) => (
                <tr key={row.district} className="align-top">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{row.district}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.vibe}</td>
                  <td className="px-4 py-3 text-foreground/80 whitespace-nowrap">{row.rent}</td>
                  <td className="px-4 py-3 text-foreground/80 whitespace-nowrap">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pre-lease checklist */}
      <section id="checklist">
        <h2 className="text-2xl font-bold mb-4">Mandatory Pre-Lease Checklist</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Before transferring any reservation fee or signing a contract, ensure you have gathered the following essentials:
        </p>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Mandatory Pre-Lease Audit Checklist</p>
          <ul className="space-y-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Step-by-step walkthrough */}
      <section id="steps">
        <h2 className="text-2xl font-bold mb-4">Step-by-Step Rental Walkthrough</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Follow this step-by-step workflow to secure your apartment in Istanbul cleanly and avoid lease scams.
        </p>
        <ol className="space-y-6">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <div className="min-w-0">
                  <p className="font-semibold mb-2">{step.title}</p>
                  <ul className="space-y-1.5 mb-2">
                    {step.body.map((line, j) => (
                      <li key={j} className="text-sm text-foreground/80 leading-relaxed">{line}</li>
                    ))}
                  </ul>
                  {step.note && (
                    <p className="text-xs text-foreground/70 leading-relaxed bg-muted/50 rounded-lg p-3 mt-2">{step.note}</p>
                  )}
                  {step.link && (
                    <a href={step.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-2">
                      {step.link.label} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {step.links && (
                    <div className="flex flex-wrap gap-4 mt-2">
                      {step.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                          {l.label} <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Consultation CTA */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Skip Rental Scams &amp; Closed-Neighborhood Headaches</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Finding a pre-vetted, furnished flat in an open district with a cooperative landlord can take weeks of frustrating searches. Use our apartment shortlisting service to receive hand-picked, verified rental listings in open zones, or let our relocation concierge handle your lease notarization and utility setups.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Explore Apartment Shortlisting &amp; Relocation Services <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Troubleshooting */}
      <section id="troubleshooting">
        <h2 className="text-2xl font-bold mb-4">Real-World Troubleshooting &amp; Critical Edge Cases</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Real estate in Istanbul presents unique operational challenges for foreign remote workers. Here is how to navigate the four most common rental traps:
        </p>
        <div className="space-y-5">
          {TROUBLESHOOTING.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-destructive" />
                <p className="font-semibold">{item.title}</p>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">{item.problem}</p>
              <div className="rounded-lg bg-success/10 border border-success/20 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-success mb-1">Solution</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audit CTA */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary/5 to-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Need Your Lease &amp; Address Verified Before Signing?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Unsure if your prospective lease, UAVT code, or neighborhood meets Göç İdaresi residency standards? Book a 45-minute visa &amp; paperwork consultation call with our team to review your lease terms and neighborhood eligibility.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Book Your 45-Minute Address &amp; Lease Audit Call <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* FAQ */}
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">Real answers to the housing questions foreigners ask most often.</p>
        <GuideFAQ items={FAQ} />
      </section>

      {/* Related resources */}
      <section id="resources">
        <h2 className="text-2xl font-bold mb-2">Related Internal Resources &amp; Next Steps</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">Build out your complete relocation setup using our step-by-step operational guides:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RELATED_RESOURCES.map((group) => (
            <div key={group.category} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">{group.category}</p>
              <ul className="space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-foreground/80 leading-relaxed hover:text-primary hover:underline transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Sources & Platforms */}
      <section id="sources">
        <h2 className="text-2xl font-bold mb-4">Sources &amp; Platforms</h2>
        <ul className="space-y-2.5 mb-4">
          {SOURCES.map((s) => (
            <li key={s.href} className="text-sm text-foreground/80 leading-relaxed">
              {s.label} —{' '}
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                {s.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')} <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Rent increase caps and tenant rights are governed by Türkiye&apos;s Turkish Code of Obligations (Türk Borçlar Kanunu) — annual increases indexed to the 12-month consumer inflation index (TÜİK data).
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Page last updated {new Date().toISOString().slice(0, 10)}. Rent prices reflect market observations in 2026 and vary significantly by season and neighborhood.
        </p>
      </section>
    </GuideLayout>
  );
}
