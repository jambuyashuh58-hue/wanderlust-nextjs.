'use client';

// Quick-estimate calculator (site-structure spec, Oct 2026): a lightweight,
// no-login range estimator that sits above the detailed RelocationDashboard
// planner below it. Dropdowns in, a Low/Expected/High monthly range and a
// couple of plan flags out -- nothing persisted, nothing shared with the
// detailed planner's own localStorage state. Figures are approximate
// planning ranges in USD, not quotes. (for=code)

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Download, MessageCircle, Info } from 'lucide-react';

const HOUSEHOLDS = {
  solo: { label: 'Solo', livingBase: 600 },
  couple: { label: 'Couple', livingBase: 950 },
  family: { label: 'Family (3+)', livingBase: 1500 },
};

const HOUSING_TYPES = {
  shared: { label: 'Shared room / studio', rent: 350 },
  oneBed: { label: '1-bedroom apartment', rent: 550 },
  twoBed: { label: '2+ bedroom / house', rent: 850 },
};

const LIFESTYLES = {
  budget: { label: 'Budget-conscious', multiplier: 0.8 },
  moderate: { label: 'Moderate', multiplier: 1 },
  comfortable: { label: 'Comfortable', multiplier: 1.35 },
};

const STAY_LENGTHS = {
  short: { label: 'Short-term (under 90 days)', flag: 'Tourist e-Visa is likely enough — no residence permit needed yet.' },
  long: { label: 'Long-term (90+ days)', flag: 'You’ll likely need a short-term residence permit (İkamet) before your 90 days are up.' },
};

function fmtUsd(n) {
  return `$${Math.round(n).toLocaleString()}`;
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[44px] appearance-none px-4 py-2.5 pr-9 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
        >
          {Object.entries(options).map(([key, opt]) => <option key={key} value={key}>{opt.label}</option>)}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

export default function QuickEstimateCalculator() {
  const [household, setHousehold] = useState('solo');
  const [housingType, setHousingType] = useState('oneBed');
  const [lifestyle, setLifestyle] = useState('moderate');
  const [stayLength, setStayLength] = useState('long');

  const { low, expected, high } = useMemo(() => {
    const rent = HOUSING_TYPES[housingType].rent;
    const living = HOUSEHOLDS[household].livingBase * LIFESTYLES[lifestyle].multiplier;
    const monthlyExpected = rent + living;
    return { low: monthlyExpected * 0.82, expected: monthlyExpected, high: monthlyExpected * 1.25 };
  }, [household, housingType, lifestyle]);

  const housingFlag = housingType === 'twoBed'
    ? 'Expect 1-2 months’ rent as deposit upfront on larger units.'
    : 'Most landlords ask for 1 month’s rent as deposit.';

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-7 mb-6">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="font-bold text-lg">Quick Cost Estimate</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-5">Answer four questions for a rough monthly budget range — the full planner below lets you refine every line item.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <SelectField label="Household" value={household} options={HOUSEHOLDS} onChange={setHousehold} />
        <SelectField label="Housing type" value={housingType} options={HOUSING_TYPES} onChange={setHousingType} />
        <SelectField label="Lifestyle" value={lifestyle} options={LIFESTYLES} onChange={setLifestyle} />
        <SelectField label="Stay length" value={stayLength} options={STAY_LENGTHS} onChange={setStayLength} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-xl border border-border bg-background p-4 text-center">
          <p className="text-[11px] text-muted-foreground mb-1">Low</p>
          <p className="text-lg md:text-xl font-bold">{fmtUsd(low)}</p>
        </div>
        <div className="rounded-xl border-2 border-primary bg-primary/5 p-4 text-center">
          <p className="text-[11px] text-primary font-semibold mb-1">Expected</p>
          <p className="text-lg md:text-xl font-bold text-primary">{fmtUsd(expected)}</p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4 text-center">
          <p className="text-[11px] text-muted-foreground mb-1">High</p>
          <p className="text-lg md:text-xl font-bold">{fmtUsd(high)}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center -mt-2 mb-5">per month, USD — rent + living costs, before one-time visa/moving fees</p>

      <div className="space-y-2 mb-6">
        <p className="flex items-start gap-2 text-xs text-foreground/80"><Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />{STAY_LENGTHS[stayLength].flag}</p>
        <p className="flex items-start gap-2 text-xs text-foreground/80"><Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />{housingFlag}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/moving-to-turkiye/budget/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-semibold text-sm hover:border-primary/40 transition-colors">
          <Download className="w-4 h-4" /> Download Detailed Breakdown
        </Link>
        <Link href="/services/istanbul-route-check/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity">
          <MessageCircle className="w-4 h-4" /> Get a Personalized Review
        </Link>
      </div>
    </div>
  );
}
