import Link from 'next/link';
import { CheckCircle2, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Monthly Cost of Living in Istanbul for Expats & Digital Nomads (2026) | Move to Istanbul',
  description: 'Real numbers on housing, food, transportation, and monthly expenses.',
  alternates: { canonical: '/guides/cost-of-living' },
};

const TIERS = [
  { label: 'Budget / Frugal Nomad', range: '$1,200 – $1,600 / mo' },
  { label: 'Comfortable Nomad / Solo', range: '$1,800 – $2,600 / mo' },
  { label: 'Premium / Couple Expat', range: '$3,000 – $4,500+ / mo' },
];

const COSTS = [
  { category: 'Furnished Rent (1+1 Flat)', budget: '$600 – $800', comfortable: '$1,000 – $1,500', premium: '$1,800 – $2,800+', tip: 'Higher in open expat zones (Moda, Beşiktaş, Nişantaşı).' },
  { category: 'Utilities (Gas, Electric, Water)', budget: '$60 – $90', comfortable: '$100 – $150', premium: '$180 – $280', tip: 'Heating bills (Doğalgaz) double during winter months (Dec–Mar).' },
  { category: 'Fiber Internet (100–1000 Mbps)', budget: '$15 – $25', comfortable: '$25 – $35', premium: '$35 – $50', tip: 'TurkNet, Superonline, or Türk Telekom fiber connections.' },
  { category: 'Groceries (Markets & Supermarkets)', budget: '$200 – $300', comfortable: '$350 – $500', premium: '$600 – $900', tip: 'Buying produce at weekly street markets (Semt Pazarı) cuts costs by 40%.' },
  { category: 'Dining Out & Cafes', budget: '$180 – $300', comfortable: '$400 – $700', premium: '$800 – $1,400+', tip: 'Local tradesmen canteens (Esnaf Lokantası) vs. European-style specialty cafes.' },
  { category: 'Public Transit (IstanbulKart)', budget: '$25 – $35', comfortable: '$40 – $65', premium: '$70 – $120', tip: 'Covers Metro, Marmaray rail, Trams, and Bosphorus Ferries.' },
  { category: 'Co-working Space / Cafe Budget', budget: '$0 (Work from flat)', comfortable: '$120 – $220', premium: '$250 – $400', tip: 'Hot desk access at Kolektif House, Impact Hub, or Han Space.' },
  { category: 'Private Turkish Health Insurance', budget: '$35 – $50', comfortable: '$60 – $110', premium: '$120 – $220', tip: 'Required for e-İkamet residency filing (under age 65).' },
  { category: 'Mobile Data (Local SIM / eSIM)', budget: '$15 – $25', comfortable: '$25 – $45', premium: '$50 – $80', tip: 'Turkcell, Vodafone, or global eSIM roaming policies.' },
  { category: 'Entertainment & Leisure', budget: '$100 – $180', comfortable: '$250 – $450', premium: '$600 – $1,000+', tip: 'Gym memberships, concerts, museum passes, and weekend getaways.' },
];

const COST_TOTAL = { budget: '$1,245 – $1,835', comfortable: '$2,370 – $3,785', premium: '$4,505 – $7,270+', tip: 'Excludes deposits & visa fees.' };

const CHECKLIST = [
  'Multi-Currency Account Active (Wise or Revolut with USD/EUR/GBP/TRY balances)',
  '2 Primary & Backup Debit/Credit Cards (Set travel notifications with banks)',
  'Official Potential Tax ID Number Generated Online (via ivd.gib.gov.tr)',
  'Emergency Cash Reserve ($500–$1,000 USD/EUR in clean, uncreased bills)',
  'International Health / Travel Insurance Active for Arrival Phase',
  'Secondary Unlocked Smartphone (For foreign SIM 2FA during 120-day IMEI lock)',
];

const STEPS = [
  {
    title: 'Generate Your Tax Number & Set Up Multi-Currency Transfers',
    body: [
      'To open a local bank account or pay official government residency fees, you must hold a Turkish Tax ID number.',
      'Click "Application for Non-Citizen\'s Potential Tax Number" (Yabancılar İçin Potansiyel Vergi Kimlik Numarası).',
      'Enter your passport details and temporary address to immediately generate your 10-digit Tax ID PDF.',
      'Link your foreign accounts to a multi-currency transfer provider like Wise to convert foreign currency into Turkish Lira at the real mid-market rate with minimal conversion markup.',
    ],
    link: { label: 'Access the official Interactive Tax Office (GİB) Portal', href: 'https://ivd.gib.gov.tr/' },
  },
  {
    title: 'Acquire and Personalize Your IstanbulKart',
    body: [
      'Public transportation in Istanbul is world-class, clean, and extensive, spanning underground metro lines, high-speed trams, cross-continental Marmaray undersea trains, and iconic Bosphorus ferries.',
      'Buy a physical card at yellow airport/metro kiosks if you prefer in-person setup.',
    ],
    note: 'Pro-Tip: Once you obtain your foreign residence permit ID (YKN—starting with 99), register your card online to unlock discounted monthly subscription passes (Abonman) and protect your balance if the card is lost.',
    link: { label: 'Visit the official IstanbulKart Online Portal', href: 'https://www.istanbulkart.istanbul/' },
  },
  {
    title: 'Manage Utilities, Fiber Internet & Mobile SIM Restrictions',
    body: [
      'Setting up utilities and internet requires understanding local registration steps.',
      'Mobile SIM & Phone Tax Warning: Foreign smartphones inserted with a local Turkish SIM card (Turkcell, Vodafone, Türk Telekom) work for 120 cumulative days per calendar year. Past 120 days, the central IMEI registry locks the SIM slot.',
      'Option A: Register your foreign phone via e-Devlet Gateway and pay the government IMEI registration tax (exceeding $1,000+ USD).',
      'Option B: Use a global eSIM or an inexpensive secondary local device for hot-spotting while keeping your main phone on Wi-Fi/eSIM data.',
    ],
    links: [
      { label: 'Water — İSKİ', href: 'https://www.iski.istanbul/' },
      { label: 'Electricity (European Side) — CK Boğaziçi', href: 'https://www.ckboğaziçi.com.tr/' },
      { label: 'Electricity (Asian Side) — Enerjisa', href: 'https://www.enerjisa.com.tr/' },
      { label: 'Gas — İGDAŞ', href: 'https://www.igdas.istanbul/' },
    ],
  },
  {
    title: 'Secure Compliant Private Health Insurance',
    body: [
      'To apply for an e-İkamet residence permit, foreigners under 65 years old must hold local private health insurance.',
      'Filing Requirement: The policy must explicitly cover emergency treatment, outpatient clinic care, and inpatient hospital stays in full compliance with Turkish residency legislation.',
      'Local Care: Private hospitals in Istanbul (e.g., Acıbadem, Memorial, Florence Nightingale) offer Western-standard medical facilities with English-speaking staff at a fraction of US/EU out-of-pocket prices.',
    ],
  },
  {
    title: 'Shop at Local Neighborhood Markets (Semt Pazarları)',
    body: [
      'Navigating local grocery costs is one of the easiest ways to optimize your monthly budget.',
      'Supermarkets vs. Local Markets: Supermarket chains like Migros, CarrefourSA, Shock, BİM, and A101 are convenient for pantry staples. However, buying fresh produce, cheeses, olives, and nuts at weekly neighborhood open-air markets (Semt Pazarı—such as the Tuesday Kadıköy Market or Wednesday Fatih Market) saves 30% to 50% compared to retail stores.',
      'Local Canteens (Esnaf Lokantası): For affordable, authentic home-style Turkish meals, eat at neighborhood Esnaf Lokantası (tradesmen restaurants) where hot stewed dishes, rice, soups, and salads cost a fraction of tourist-targeted restaurants in Sultanahmet or Taksim.',
    ],
  },
];

const TROUBLESHOOTING = [
  {
    title: 'Bypassing ATM "Dynamic Currency Conversion" (DCC) Traps',
    problem: 'When using foreign debit or credit cards at Turkish ATMs (such as Garanti BBVA, İş Bankası, Yapı Kredi, or Akbank), the machine will prompt you: "Would you like to be charged in your home currency (USD/EUR) or local currency (TRY)?" The Scam: Choosing your home currency triggers Dynamic Currency Conversion (DCC), allowing the bank to apply a hidden exchange rate markup of 8% to 15%.',
    solution: 'Golden Rule: ALWAYS select "Decline Conversion" / "Charge in TRY". Let your home bank or multi-currency provider (Wise/Revolut) perform the conversion at official market rates.',
  },
  {
    title: 'High ATM Cash Withdrawal Fees',
    problem: 'Many Turkish banks charge foreign cards a 3% to 7% surcharge fee just for dispensing cash.',
    solution: 'Fee-Free Networks: Look for ATMs operated by Ziraat Bankası, PttBank, or QNB Finansbank, which historically offer lower or waived fee structures for select international card networks.',
  },
  {
    title: 'Managing High Inflation via Dual-Currency Buffers',
    problem: 'Due to ongoing Turkish Lira fluctuations, never convert your entire monthly income or savings into TRY at once.',
    solution: 'Strategy: Keep your core savings and monthly salary in USD, EUR, or GBP accounts. Convert only 1 to 2 weeks\' worth of living expenses into Turkish Lira as needed via digital transfers or local card payments to hedge against currency depreciation.',
  },
  {
    title: 'Avoiding "Tourist Pricing" & Menu Surcharges',
    problem: 'In high-traffic tourist quarters (Sultanahmet, Galata, Grand Bazaar, and Bosphorus waterfront dining), restaurants frequently omit prices, add mandatory service fees (Kuşver), or print secondary "tourist menus."',
    solution: 'Best Practice: Always check published menus with clearly listed prices in TRY before seating. Frequent neighborhood dining establishments in local expat residential zones like Moda, Rasimpaşa, Beşiktaş, or Kurtuluş to enjoy fair local pricing.',
  },
];

const FAQ = [
  {
    q: 'Is $2,000 USD per month enough to live comfortably in Istanbul?',
    a: 'Yes. A monthly budget of $2,000 USD allows a single remote worker or digital nomad to enjoy a very comfortable lifestyle in Istanbul. It easily covers a modern furnished 1+1 apartment in desirable expat areas (like Kadıköy or Beşiktaş), utility bills, daily cafe working, dining out, public transit, and health insurance, while leaving room for entertainment and local weekend travel.',
  },
  {
    q: 'Do I need to open a local Turkish bank account as a digital nomad?',
    a: 'While not strictly mandatory for short stays (since credit cards and multi-currency Wise cards are widely accepted across Istanbul), opening a local bank account (such as with Ziraat Bank) becomes necessary when paying long-term apartment rent, setting up automatic utility debits (Otomatik Ödeme), or applying for certain types of residence permit extensions.',
  },
  {
    q: 'How much money do I need to prove for my e-İkamet residence permit?',
    a: 'For standard short-term tourist residence permits, Göç İdaresi officers typically expect proof of financial self-sufficiency equivalent to at least 1.5 to 2 times the local minimum wage per month (or roughly $1,000 to $1,500 USD per month of requested stay), demonstrated via Turkish bank balances or certified foreign income. For the Digital Nomad Visa, you must prove a verified foreign income of at least $3,000 USD/month.',
  },
  {
    q: 'Are credit cards widely accepted in Istanbul, or do I need cash?',
    a: 'Istanbul is largely a cashless society. Visa and Mastercard (contactless / tap-to-pay) are accepted at virtually all grocery stores, restaurants, cafes, taxis, and pharmacies. However, holding 200 to 500 TRY in physical cash is recommended for tipping, shopping at street markets (Semt Pazarı), small corner stores (Bakkal), or taking local minibuses (Dolmuş).',
  },
  {
    q: 'What is the cost of working from co-working spaces vs. cafes?',
    a: 'Day passes at premier co-working spaces in Istanbul (like Kolektif House, Impact Hub, or Workinton) range from $12 to $22 USD/day, with monthly dedicated desks averaging $150 to $280 USD/month. Alternatively, working from laptop-friendly specialty coffee shops in Moda or Cihangir typically costs $4 to $8 USD/day in coffee, tea, and pastry purchases.',
  },
];

const RELATED_RESOURCES = [
  {
    category: 'Housing & Neighborhoods',
    links: [
      { label: 'Finding Housing in Türkiye: Renting in Istanbul as a Foreigner (Master Guide)', href: '/guides/housing' },
      { label: 'Closed Neighborhoods in Istanbul: The 25% Foreigner Quota List', href: '/guides/closed-neighborhoods-istanbul' },
      { label: 'Kadıköy vs. Beşiktaş: The Best Neighborhoods for Expats', href: '/guides/kadikoy-vs-besiktas' },
    ],
  },
  {
    category: 'Legal Stay & Visas',
    links: [
      { label: 'Türkiye Visa & Residence Permit Guide 2026 (Master Pillar)', href: '/guides/visa' },
      { label: 'How to Avoid the "10-Day Conditional Entry" Visa Trap in Istanbul', href: '/guides/10-day-conditional-entry-trap' },
      { label: 'How to Apply for the Türkiye Digital Nomad Visa Online (GoTürkiye Walkthrough)', href: '/guides/digital-nomad-visa-application' },
      { label: 'Is the Türkiye Digital Nomad Visa Tax-Free? Remote Tax Guide', href: '/guides/digital-nomad-visa-tax-guide' },
    ],
  },
  {
    category: 'Bureaucracy & Banking',
    links: [
      { label: 'How to Open a Turkish Bank Account Without an İkamet Card', href: '/guides/bank-account-without-ikamet' },
      { label: 'How to Cancel Your Turkish Residence Permit When You Leave', href: '/guides/cancel-residence-permit' },
    ],
  },
];

const SOURCES = [
  { label: 'Turkish Statistical Institute (TÜİK) — official CPI and price index data', href: 'https://www.tuik.gov.tr/' },
  { label: 'Central Bank of the Republic of Türkiye — official exchange rates', href: 'https://www.tcmb.gov.tr/' },
  { label: 'Interactive Tax Office (GİB) — generate your Potential Tax ID online', href: 'https://ivd.gib.gov.tr/' },
  { label: 'Directorate of Migration Management — e-İkamet financial sufficiency requirements', href: 'https://en.goc.gov.tr/' },
  { label: 'Sahibinden.com and Hepsiemlak for verifying current rent price ranges by neighborhood', href: 'https://www.sahibinden.com/' },
  { label: 'Numbeo Cost of Living index for Türkiye (crowdsourced, updated continuously)', href: 'https://www.numbeo.com/' },
];

export default function GuideCostOfLivingPage() {
  return (
    <GuideLayout
      eyebrow="Cost of Living"
      title="Monthly Cost of Living in Istanbul for Expats & Digital Nomads (2026)"
      description="Real numbers on housing, food, transportation, and monthly expenses."
      readTime="12 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[
        { id: 'reality', label: '2026 Economic Reality' },
        { id: 'breakdown', label: 'Cost Breakdown' },
        { id: 'checklist', label: 'Financial Checklist' },
        { id: 'steps', label: 'Settle-In Setup' },
        { id: 'troubleshooting', label: 'Troubleshooting' },
        { id: 'faq', label: 'FAQ' },
        { id: 'resources', label: 'Related Resources' },
        { id: 'sources', label: 'Sources & References' },
      ]}
    >
      {/* 2026 Economic Reality */}
      <section id="reality">
        <h2 className="text-2xl font-bold mb-4">2026 Economic Reality</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          While Istanbul remains significantly more affordable than major Western European hubs like London, Paris, or Amsterdam, it is no longer the ultra-cheap geoarbitrage destination it was five years ago. High domestic inflation (TÜFE), rising housing demand in open neighborhoods, and recent tax adjustments mean that expats must plan their monthly budgets with precision.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-6">
          For remote workers earning in foreign currencies (USD, EUR, GBP), the favorable exchange rate provides a strong purchasing buffer. However, local prices for imported technology, dining out in tourist districts, and long-term rentals in expat-friendly neighborhoods (like Kadıköy, Moda, or Beşiktaş) have increased substantially.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {TIERS.map((tier) => (
            <div key={tier.label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Tier</p>
              <p className="font-semibold text-sm mb-1">{tier.label}</p>
              <p className="text-primary font-bold text-sm">{tier.range}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed bg-muted/50 rounded-lg p-3">
          Note: The estimates below exclude one-time upfront move-in deposits and visa filing fees. See our{' '}
          <Link href="/guides/housing" className="text-primary font-medium hover:underline">Housing Guide</Link> for full deposit and commission breakdowns.
        </p>
      </section>

      {/* Cost breakdown table */}
      <section id="breakdown">
        <h2 className="text-2xl font-bold mb-2">Detailed 2026 Cost Breakdown Table</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">Monthly averages in USD across three expat lifestyle tiers.</p>

        {/* Mobile / narrow layout: stacked cards, nothing gets clipped */}
        <div className="lg:hidden space-y-3">
          {COSTS.map((row) => (
            <div key={row.category} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-semibold text-sm mb-3">{row.category}</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Budget</p>
                  <p className="text-sm font-medium">{row.budget}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Comfortable</p>
                  <p className="text-sm font-medium">{row.comfortable}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Premium</p>
                  <p className="text-sm font-medium">{row.premium}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{row.tip}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
            <p className="font-bold text-sm mb-3">ESTIMATED MONTHLY TOTAL</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Budget</p>
                <p className="text-sm font-bold">{COST_TOTAL.budget}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Comfortable</p>
                <p className="text-sm font-bold">{COST_TOTAL.comfortable}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">Premium</p>
                <p className="text-sm font-bold">{COST_TOTAL.premium}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{COST_TOTAL.tip}</p>
          </div>
        </div>

        {/* Wide layout: full table, only shown once there's room for it */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Expense Category</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Budget / Frugal Nomad</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Comfortable Nomad / Solo</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Premium / Couple Expat</th>
                <th className="px-4 py-3 font-semibold">Local Context &amp; Tips</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COSTS.map((row) => (
                <tr key={row.category} className="align-top">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{row.category}</td>
                  <td className="px-4 py-3 text-foreground/80 whitespace-nowrap">{row.budget}</td>
                  <td className="px-4 py-3 text-foreground/80 whitespace-nowrap">{row.comfortable}</td>
                  <td className="px-4 py-3 text-foreground/80 whitespace-nowrap">{row.premium}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.tip}</td>
                </tr>
              ))}
              <tr className="align-top bg-primary/5 font-semibold">
                <td className="px-4 py-3 whitespace-nowrap">ESTIMATED MONTHLY TOTAL</td>
                <td className="px-4 py-3 whitespace-nowrap">{COST_TOTAL.budget}</td>
                <td className="px-4 py-3 whitespace-nowrap">{COST_TOTAL.comfortable}</td>
                <td className="px-4 py-3 whitespace-nowrap">{COST_TOTAL.premium}</td>
                <td className="px-4 py-3 font-normal text-foreground/80">{COST_TOTAL.tip}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Financial checklist */}
      <section id="checklist">
        <h2 className="text-2xl font-bold mb-4">Mandatory Pre-Arrival Financial Checklist</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Before boarding your flight to Istanbul, establish your cross-border financial stack to avoid getting locked out of local payments or paying exorbitant bank conversion fees:
        </p>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Mandatory Expat Financial Checklist</p>
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

      {/* Step-by-step setup */}
      <section id="steps">
        <h2 className="text-2xl font-bold mb-4">Step-by-Step Financial &amp; Settle-In Setup</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Follow this chronological, 5-step operational workflow to manage your money, utilities, and daily expenses efficiently upon landing in Istanbul.
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
        <h3 className="font-bold mb-1.5">Find Pre-Vetted Apartments Within Your Budget</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Skip overpriced rental listings, un-notarized contracts, and closed neighborhood traps. Use our apartment shortlisting service to get hand-picked, verified rentals in 100% open neighborhoods matching your exact target budget.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Explore Apartment Shortlisting &amp; Concierge Services <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Troubleshooting */}
      <section id="troubleshooting">
        <h2 className="text-2xl font-bold mb-4">Real-World Troubleshooting &amp; Critical Financial Traps</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Avoiding subtle financial markups and bureaucratic traps is essential for maintaining a predictable cost of living in Istanbul.
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

      {/* FAQ */}
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">Real answers to the budget questions expats and digital nomads ask most often.</p>
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

      {/* Sources */}
      <section id="sources">
        <h2 className="text-2xl font-bold mb-4">Sources &amp; References</h2>
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
        <p className="text-xs text-muted-foreground leading-relaxed">
          Page last updated {new Date().toISOString().slice(0, 10)}. Prices reflect 2026 market observations and vary significantly with exchange-rate movement.
        </p>
      </section>
    </GuideLayout>
  );
}
