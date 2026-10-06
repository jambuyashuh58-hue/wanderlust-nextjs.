import Link from 'next/link';
import { CheckCircle2, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Türkiye Visa & Residence Permit Guide 2026 (Göç İdaresi e-İkamet) | Move to Istanbul',
  description: "e-Visa, tourist entry, and short-term residence permits via Göç İdaresi's e-İkamet system, with official sources.",
  alternates: { canonical: '/guides/visa' },
};

const PATHWAYS = [
  {
    category: 'Digital Nomad Visa (DNV)',
    audience: 'Remote employees, freelancers, tech founders',
    requirement: 'Proof of non-Turkish remote income of $3,000 USD/month + University Degree',
    stay: '1 Year (Renewable)',
    workRights: 'No (Foreign client work only)',
  },
  {
    category: 'Short-Term Tourist e-İkamet',
    audience: 'General expats, long-term tourists',
    requirement: 'Notarized lease in an Open Neighborhood + Health Insurance + Proof of funds',
    stay: '6 to 12 Months',
    workRights: 'No (Requires separate work permit)',
  },
  {
    category: 'Real Estate Ownership (TAPU)',
    audience: 'Property buyers & investors',
    requirement: 'Residential property deed (TAPU) valued at $200,000+ USD',
    stay: '1 to 2 Years (Renewable)',
    workRights: 'No',
  },
  {
    category: 'Work Permit Exemption (Tech/Startup)',
    audience: 'Tech founders, specialized contractors',
    requirement: 'Pre-approval via Ministry of Industry & Technology (Tech Visa)',
    stay: 'Up to 1–3 Years',
    workRights: 'Allowed for certified business',
  },
  {
    category: 'Family Residence Permit (Aile İkamet)',
    audience: 'Spouses & dependent children',
    requirement: 'Married to a Turkish citizen or valid residence permit holder',
    stay: 'Up to 3 Years',
    workRights: 'Spouses may apply for work permit',
  },
];

const DOCUMENTS = [
  'Valid Passport & High-Quality Color Copies (Bio page + Entry stamps)',
  "Signed e-İkamet Online Application Form (Printed from goc.gov.tr)",
  '4 Biometric Passport Photos (White background, taken within 6 months)',
  'Official Potential Tax ID Number (Generated via ivd.gib.gov.tr)',
  'Compliant Private Turkish Health Insurance Policy (Residency Sigorta)',
  'Notarized Turkish Rental Contract (Signed at Notary with Landlord TAPU)',
  'Verified Building Address UAVT Registration Code',
  'Proof of Sufficient Financial Means ($3,000/mo or local bank balance)',
  'Receipt of Paid Application & Card Fees (Paid via Tax Office or Ziraat)',
  'Digital Nomad Identification Certificate (If applying under DNV track)',
];

const STEPS = [
  {
    title: 'Generate Your Potential Tax Number (Vergi Kimlik Numarası)',
    body: [
      'Click "Application for Non-Citizen\'s Potential Tax Number" (Yabancılar İçin Potansiyel Vergi Kimlik Numarası).',
      "Fill in your passport details, parents' first names, and temporary Turkish address exactly as they appear in your travel documents.",
      'Submit the form to instantly download an official PDF tax certificate containing your 10-digit ID number.',
    ],
    link: { label: 'Access the official GİB Portal', href: 'https://ivd.gib.gov.tr/' },
  },
  {
    title: 'Purchase Compliant Turkish Private Health Insurance',
    body: [
      'The policy must explicitly state compliance with 5018 sayılı Kanun rules covering emergency care, inpatient treatment, and outpatient clinic visits.',
    ],
    note: 'Pro-Tip: Overseas travel insurance (such as standard credit card insurance) is NOT accepted by Göç İdaresi for e-İkamet filings unless issued by a licensed Turkish insurer or specialized expat insurance partner.',
  },
  {
    title: 'Secure a Notarized Lease in an Open Neighborhood (Açık Mahalle)',
    body: [
      'Due to regulations capping foreign residents at 25% per neighborhood, signing a lease in a closed zone (kapalı mahalle) will cause an automatic residency rejection.',
      "Demand the exact official neighborhood name (mahalle) listed on the landlord's Title Deed (TAPU).",
      'Verify that the district (e.g., Fatih and Esenyurt are completely closed) and neighborhood are 100% open.',
      "Visit a local Turkish Notary (Noter) alongside the landlord to sign a Notarized Lease Agreement. Ensure the notary attaches a copy of the landlord's original ID and TAPU.",
    ],
    link: { label: 'Check the Closed Neighborhood Registry', href: 'https://e-ikamet.goc.gov.tr/' },
  },
  {
    title: 'Submit Your Online Application File',
    body: [
      'Digital Nomad Applicants: Upload your higher education diploma, remote work contract, and bank stubs proving $3,000 USD/month income to obtain your Digital Nomad Identification Certificate.',
      'Standard e-İkamet & DNV Conversion: Select "I am Applying for a Short-Term Residence Permit for the First Time", fill in your details, choose your Istanbul appointment center (e.g., Kumkapı, Pendik, or Esenyurt), and download your signed application PDF (Başvuru Formu).',
    ],
    links: [
      { label: 'GoTürkiye Digital Nomad Portal', href: 'https://digitalnomads.goturkiye.gov.tr/' },
      { label: 'e-İkamet Portal', href: 'https://e-ikamet.goc.gov.tr/' },
    ],
  },
  {
    title: 'Attend Your Göç İdaresi Appointment & Pay Fees',
    body: [
      'Location: Report to the Provincial Directorate of Migration Management (İl Göç İdaresi Müdürlüğü) designated on your form.',
      'Biometrics & Interview: The officer will inspect your documents, capture biometric fingerprints, and provide an official payment voucher.',
      'Fee Payment: Pay the residence card fee (Kart Bedeli) and single-entry visa/residence tax (İkamet Harcı) at the on-site tax desk or via Ziraat Bank. Keep the stamped payment receipts in your file.',
      'Temporary Residency Document (Başvuru Belgesi): Upon approval, the officer stamps your application form. This document acts as temporary legal proof of stay while your physical plastic ID card is printed and mailed via PTT courier to your registered address.',
    ],
  },
  {
    title: 'Secure Your e-Devlet Password at PTT',
    body: [
      'Once your foreign ID number (YKN—starting with 99 or 98) is active or your work permit exemption document is issued, visit any local PTT (Post Office) branch to get your e-Devlet password for address verification, utility setups, and tax tracking.',
    ],
    note: 'Troubleshooting Branch Refusals: If a central PTT counter clerk refuses to issue an e-Devlet password without a physical plastic card, do not argue. Under official PTT circulars, foreigners holding a valid YKN with passport and application/exemption papers are eligible. Calmly try a smaller neighborhood PTT branch ("branch hopping") where staff process requests smoothly.',
    link: { label: 'Log into the e-Devlet Gateway', href: 'https://www.turkiye.gov.tr/' },
  },
];

const TROUBLESHOOTING = [
  {
    title: 'The "10-Day Conditional Entry" (Şartlı Giriş) Airport Trap',
    problem: 'If border control officers at Istanbul Airport (IST) hand you a Şartlı Giriş Formu (Conditional Entry Form) upon entry, you are granted entry on one condition: you must file your e-İkamet application online within 10 calendar days. Assuming your 90-day tourist visa validity protects you will result in an automatic rejection if you apply on Day 11 or later.',
    solution: 'File your online application at e-ikamet.goc.gov.tr immediately upon arrival to satisfy the 10-day legal clock.',
  },
  {
    title: 'Closed Neighborhood Quotas (The 25% Rule)',
    problem: 'Entire districts in Istanbul—such as Fatih, Esenyurt, Avcılar, Bahçelievler, Esenler, and Zeytinburnu—alongside hundreds of specific individual neighborhoods in Beyoğlu, Şişli, and Beşiktaş are completely closed to initial residence permits.',
    solution: "Require the landlord to provide the building's official UAVT Address Code and TAPU before transferring a rental deposit.",
  },
  {
    title: 'Non-English Document Translations & Apostilles',
    problem: 'Foreign birth certificates, marriage licenses, and university diplomas must be apostilled under the Hague Convention in your home country (or certified by your embassy/consulate in Ankara/Istanbul).',
    solution: 'Once in Türkiye, foreign-language documents must be translated into Turkish by a sworn translator (Yeminli Mütercim) and stamped at a Turkish Notary (Noter).',
  },
  {
    title: 'Phone Registration Taxes (IMEI Lock)',
    problem: "Bringing a foreign smartphone to Türkiye allows you to use local Turkish SIM cards for up to 120 cumulative days per calendar year. Past 120 days, the Central Equipment Identity Register (MCKS) locks your device's IMEI number from local mobile networks. Officially registering a foreign phone requires an active residence permit card and payment of an IMEI registration tax exceeding €1,000+ USD.",
    solution: 'Many nomads use an inexpensive local secondary phone or rely on global eSIMs for data roaming while keeping foreign numbers active via Wi-Fi calling.',
  },
];

const FAQ = [
  {
    q: 'Do I need a visa to enter Türkiye as a tourist?',
    a: "It depends on your passport. Citizens of many countries (US, UK, Canada, Australia, most EU states) can enter visa-free for stays of up to 90 days within any 180-day period. Others must apply for an e-Visa online in advance at evisa.gov.tr before arriving. Always confirm your specific nationality's current status on the official portal — rules change periodically.",
  },
  {
    q: 'What is the Digital Arrival Card (TRDAC) and do I need it?',
    a: 'As of 2025, all foreign visitors to Türkiye are required to complete the Turkey Digital Arrival Card (TRDAC) within 72 hours before arrival. It’s a free online form at register.gov.tr collecting basic travel and accommodation details, and applies to everyone — tourists, business travelers, and returning residence permit holders.',
  },
  {
    q: 'What is Göç İdaresi e-İkamet and do I have to use it?',
    a: 'Göç İdaresi e-İkamet (e-ikamet.goc.gov.tr) is the official online portal run by the Directorate of Migration Management (Göç İdaresi Başkanlığı) for filing short-term residence permit applications. Every pathway in this guide — tourist e-İkamet, Digital Nomad Visa conversion, family permits, and property-based permits — is ultimately submitted through this same system, so yes, it is mandatory and there is no paper or in-person alternative for the initial filing.',
  },
  {
    q: 'Can I work for a Turkish company on a Digital Nomad Visa or e-İkamet?',
    a: 'No. Neither the Digital Nomad Visa nor a standard short-term tourist residence permit grants local employment rights. Working legally for a Turkish company requires an official Work Permit (Çalışma İzni) sponsored directly by a Turkish employer through the Ministry of Labor and Social Security (ÇSGB).',
  },
  {
    q: 'How do I sponsor my family for a Residence Permit?',
    a: 'Once the primary applicant holds a valid 1-year residence permit card, you can apply for a Family Residence Permit (Aile İkamet İzni) for your spouse and dependent children under 18. You must present an apostilled marriage certificate, apostilled birth certificates for children, proof of adequate family health insurance, and local income verification.',
  },
  {
    q: 'What happens if my residence permit application is rejected?',
    a: 'If Göç İdaresi issues an official refusal notification (Tebliğ Formu), you are typically given 10 days to exit Türkiye without penalty. You cannot re-apply under the same residence category for 6 months, though you may re-apply under a different category (such as transitioning from a tourist permit request to a Digital Nomad Visa or property-based permit).',
  },
  {
    q: 'Can I travel outside Türkiye while my application is processing?',
    a: 'After attending your Göç İdaresi appointment and securing your signed Temporary Residency Document (Başvuru Belgesi), you may exit Türkiye for up to 15 consecutive days without forfeiting your application, provided you pay all residency taxes beforehand and present the stamped document at border control.',
  },
  {
    q: 'Do I become a Turkish Tax Resident after 183 days?',
    a: 'Under Turkish tax law (Gelir Vergisi Kanunu), individuals present in Türkiye for more than 183 days in a calendar year are generally deemed tax residents. However, remote workers earning foreign-sourced income from non-Turkish clients can utilize Türkiye’s statutory tax deductions—including up to a 100% deduction on foreign remote service earnings—or double taxation avoidance treaties (DTAA) between Türkiye and their home country.',
  },
  {
    q: 'How much does the Turkish residence permit cost?',
    a: 'Total cost depends on your nationality, permit duration, and processing fees, but budget roughly $150–300 total for the first year for most applicants. This covers the card fee, application fee, and mandatory health insurance for the period. Fees change annually — confirm current amounts on goc.gov.tr before applying.',
  },
  {
    q: 'How long does the residence permit process take?',
    a: "From appointment booking to receiving the physical card typically takes 4 to 12 weeks, though it varies significantly by city and season. Istanbul and other high-demand cities can run longer than smaller cities. You can legally remain in Türkiye while your application is being processed as long as you've submitted it within your tourist entry period.",
  },
];

const RELATED_RESOURCES = [
  {
    category: 'Legal Stay & Visas',
    links: [
      { label: 'How to Avoid the "10-Day Conditional Entry" Visa Trap in Istanbul', href: '/guides/10-day-conditional-entry-trap' },
      { label: 'How to Apply for the Türkiye Digital Nomad Visa Online (GoTürkiye Walkthrough)', href: '/guides/digital-nomad-visa-application' },
      { label: 'Closed Neighborhoods in Istanbul: The 25% Foreigner Quota List', href: '/guides/closed-neighborhoods-istanbul' },
      { label: 'How to Cancel Your Turkish Residence Permit When You Leave', href: '/guides/cancel-residence-permit' },
    ],
  },
  {
    category: 'Banking & Financial Logistics',
    links: [
      { label: 'How to Open a Turkish Bank Account Without an İkamet Card', href: '/guides/bank-account-without-ikamet' },
      { label: 'How to Avoid Excessive ATM Conversion Fees in Istanbul', href: '/guides/avoiding-atm-fees-istanbul' },
      { label: 'Is the Türkiye Digital Nomad Visa Tax-Free? Remote Tax Guide', href: '/guides/digital-nomad-visa-tax-guide' },
      { label: 'PayPal and Stripe Alternatives for Freelancers in Türkiye', href: '/guides/paypal-stripe-alternatives-turkey' },
      { label: 'eSIM vs. Local SIM Card in Türkiye: 2026 Comparison', href: '/guides/esim-vs-local-sim-turkey' },
    ],
  },
  {
    category: 'Family & Specialized Relocation',
    links: [
      { label: 'International Schools in Istanbul for Expat Families', href: '/guides/international-schools-istanbul' },
      { label: 'Medical Tourism in Istanbul 2026: The Complete Guide', href: '/guides/medical-tourism-istanbul' },
      { label: 'Expat Culture Shock Living in Istanbul: What to Expect', href: '/guides/culture-shock-istanbul' },
    ],
  },
  {
    category: 'Housing & Settle-In Support',
    links: [
      { label: 'Renting an Apartment in Istanbul: Notary Rules & Lease Registration', href: '/guides/mastering-turkish-rental-contracts' },
      { label: 'How to Avoid Rental Scams on sahibinden.com as a Foreigner', href: '/guides/avoiding-rental-scams-istanbul' },
      { label: 'Kadıköy vs. Beşiktaş: The Best Neighborhoods for Expats', href: '/guides/kadikoy-vs-besiktas' },
      { label: 'Monthly Cost of Living in Istanbul for Expats & Nomads', href: '/guides/cost-of-living' },
    ],
  },
];

const OFFICIAL_SOURCES = [
  { label: 'Türkiye Directorate General of Migration Management — residence permits, procedures, appointment booking', href: 'https://en.goc.gov.tr/' },
  { label: 'e-İkamet Online Application Portal — file your short-term residence permit', href: 'https://e-ikamet.goc.gov.tr/' },
  { label: 'GoTürkiye Digital Nomad Portal — DNV pre-approval and identification certificate', href: 'https://digitalnomads.goturkiye.gov.tr/' },
  { label: 'Interactive Tax Office (GİB) — generate your Potential Tax Number', href: 'https://ivd.gib.gov.tr/' },
  { label: 'e-Devlet National Gateway — digital government services for residents', href: 'https://www.turkiye.gov.tr/' },
  { label: 'Republic of Türkiye e-Visa Application System — official visa portal', href: 'https://www.evisa.gov.tr/' },
  { label: 'Türkiye Digital Arrival Card (TRDAC) — required within 72 hours of arrival', href: 'https://register.gov.tr/' },
];

export default function GuideVisaPage() {
  return (
    <GuideLayout
      eyebrow="Visa Guide"
      title="Türkiye Visa & Residence Permit Guide 2026"
      description="e-Visa, tourist entry, and short-term residence permits, with official sources."
      readTime="14 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[
        { id: 'landscape', label: '2026 Legal Landscape' },
        { id: 'pathways', label: 'Permit Pathways' },
        { id: 'documents', label: 'Document Checklist' },
        { id: 'steps', label: 'Application Steps' },
        { id: 'troubleshooting', label: 'Troubleshooting' },
        { id: 'faq', label: 'FAQ' },
        { id: 'resources', label: 'Related Resources' },
        { id: 'sources', label: 'Official Sources' },
      ]}
    >
      {/* 2026 Legal Landscape */}
      <section id="landscape">
        <h2 className="text-2xl font-bold mb-4">2026 Legal Landscape</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Relocating to Türkiye has undergone significant legal and administrative updates. Türkiye&apos;s Directorate of Migration Management (Göç İdaresi Başkanlığı) has tightened residency criteria, introduced strict neighborhood foreign population quotas (the 25% rule), and established dedicated pathways for remote workers—most notably the Türkiye Digital Nomad Visa (DNV) program.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Whether you are moving to Istanbul for a 6-month remote work stint or planning a multi-year relocation, obtaining a legal residence permit—known locally as an e-İkamet—is the foundational step for opening bank accounts, signing utility contracts, and staying in the country past standard tourist allowances. Every application, regardless of pathway, is ultimately filed and approved through Göç İdaresi e-İkamet, the Directorate of Migration Management&apos;s online residence-permit system at e-ikamet.goc.gov.tr.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">Digital Nomad Visa</p>
            <p className="text-xs text-muted-foreground">$3,000/mo Remote</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">Tourist e-İkamet</p>
            <p className="text-xs text-muted-foreground">Short-Term Lease</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm mb-1">Real Estate / TAPU</p>
            <p className="text-xs text-muted-foreground">$200,000+ Property</p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section id="pathways">
        <h2 className="text-2xl font-bold mb-4">Comparison of Primary Residence Permit Pathways</h2>

        {/* Mobile / narrow layout: stacked cards, nothing gets clipped */}
        <div className="lg:hidden space-y-3">
          {PATHWAYS.map((row) => (
            <div key={row.category} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-semibold text-sm mb-2">{row.category}</p>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Target Audience</dt>
                  <dd className="text-foreground/80">{row.audience}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Primary Requirement</dt>
                  <dd className="text-foreground/80">{row.requirement}</dd>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Stay Granted</dt>
                    <dd className="text-foreground/80">{row.stay}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Work Rights?</dt>
                    <dd className="text-foreground/80">{row.workRights}</dd>
                  </div>
                </div>
              </dl>
            </div>
          ))}
        </div>

        {/* Wide layout: full table, only shown once there's room for it */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Category</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Target Audience</th>
                <th className="px-4 py-3 font-semibold">Primary Requirement</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Stay Granted</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Work Rights?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PATHWAYS.map((row) => (
                <tr key={row.category} className="align-top">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{row.category}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.audience}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.requirement}</td>
                  <td className="px-4 py-3 text-foreground/80 whitespace-nowrap">{row.stay}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.workRights}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Document checklist */}
      <section id="documents">
        <h2 className="text-2xl font-bold mb-4">Core Prerequisites &amp; Mandatory Document Folder</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Regardless of whether you apply via the Digital Nomad Visa regime or a standard short-term e-İkamet, every applicant must compile a compliant Document Folder prior to their Migration Office (Göç İdaresi) appointment. Missing or improperly certified documents are the leading cause of application delays or 30-day notice rejections.
        </p>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Mandatory Residency Document Checklist</p>
          <ul className="space-y-3">
            {DOCUMENTS.map((doc) => (
              <li key={doc} className="flex items-start gap-3 text-sm text-foreground/80">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Step-by-step walkthrough */}
      <section id="steps">
        <h2 className="text-2xl font-bold mb-4">Step-by-Step Application Walkthrough</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Follow this chronological, 6-step workflow to complete your application cleanly and avoid bureaucratic friction on the ground.
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
        <h3 className="font-bold mb-1.5">Avoid Automatic Residence Permit Rejections</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Over 30% of initial residency applications in Istanbul are turned away due to closed neighborhood lease errors, un-notarized contracts, or mismatched name spellings on health insurance policies. Book a 45-minute visa &amp; paperwork consultation call — we&apos;ll audit your entire document folder, verify your UAVT code, and walk you step-by-step through your filing before your appointment.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Book Your 45-Minute Visa Consultation <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Troubleshooting */}
      <section id="troubleshooting">
        <h2 className="text-2xl font-bold mb-4">Real-World Troubleshooting &amp; Critical Edge Cases</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Navigating Turkish bureaucracy involves real-world friction points that standard travel blogs rarely discuss. Here is how to handle the four most common traps identified across expat communities.
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

      {/* Housing CTA */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary/5 to-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want Pre-Vetted Housing in 100% Open Neighborhoods?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Bypassing rental scams, verifying UAVT address codes, and coordinating with Turkish landlords can take weeks of stressful searches. Use our apartment shortlisting service for hand-picked open-zone flats, or let our full relocation concierge handle your move end to end.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Explore Apartment Shortlisting &amp; Concierge Plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* FAQ */}
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">Real answers to the questions we get most often about visas and residence in Türkiye.</p>
        <GuideFAQ items={FAQ} />
      </section>

      {/* Related resources */}
      <section id="resources">
        <h2 className="text-2xl font-bold mb-2">Related Internal Resources &amp; Next Steps</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">Build out your complete relocation setup using our step-by-step operational guides:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Official sources */}
      <section id="sources">
        <h2 className="text-2xl font-bold mb-4">Official Sources</h2>
        <ul className="space-y-2.5 mb-4">
          {OFFICIAL_SOURCES.map((s) => (
            <li key={s.href} className="text-sm text-foreground/80 leading-relaxed">
              {s.label} —{' '}
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                {s.href.replace(/^https?:\/\//, '').replace(/\/$/, '')} <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Page last updated {new Date().toISOString().slice(0, 10)}. Visa rules and fees change periodically — always confirm current requirements on the official sources above before applying.
        </p>
      </section>
    </GuideLayout>
  );
}
