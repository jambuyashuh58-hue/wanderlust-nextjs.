'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Wallet, Home, Sparkles, Plane, FileCheck, ShoppingCart, Heart,
  MapPin, BedDouble, ExternalLink, ChevronDown, MessageCircle,
} from 'lucide-react';
import { getSavedActivities, subscribeSavedActivities } from '@/lib/savedActivities';

const STORAGE_KEY = 'wanderlust_relocation_plan';

// Approximate, editor-free conversion so the plan can be viewed in a home
// currency -- this is a planning estimate, not a live FX feed.
const CURRENCIES = { TRY: { label: 'TRY', symbol: '₺', perTry: 1 }, USD: { label: 'USD', symbol: '$', perTry: 1 / 34 }, EUR: { label: 'EUR', symbol: '€', perTry: 1 / 37 } };

const DEFAULT_PLAN = {
  currency: 'TRY',
  flight: {
    route: '', date: '', price: 0,
    checklist: { flightBooked: false, passportValid: false, visaApproved: false, bookFlight: false, insurance: false },
  },
  visa: {
    type: 'e-Visa (tourist, short stay)', status: 'Researching', fee: 0,
    checklist: { nationality: false, passport: false, feeChecked: false, applied: false, rules: false },
  },
  housing: {
    rent: 0, deposit: 0,
    checklist: { shortlist: false, contact: false, view: false, negotiate: false, sign: false, pay: false, dask: false, utilities: false },
  },
  living: { groceries: 6000, transport: 1500, utilities: 3000, mobile: 500, eatingOut: 4000, misc: 2000 },
};

const FLIGHT_CHECKLIST = [
  ['flightBooked', 'Flight booked'],
  ['passportValid', 'Passport valid 6+ months'],
  ['visaApproved', 'Visa / e-Visa approved before booking (or refundable ticket)'],
  ['bookFlight', 'Book flight'],
  ['insurance', 'Travel insurance purchased'],
];

const VISA_TYPES = ['e-Visa (tourist, short stay)', 'Residence permit (İkamet)', 'Work visa', 'Student visa', 'Other'];
const VISA_STATUSES = ['Researching', 'Applied', 'Approved', 'Denied'];
const VISA_CHECKLIST = [
  ['nationality', 'Confirm your nationality is eligible on evisa.gov.tr'],
  ['passport', 'Passport valid 6+ months beyond arrival'],
  ['feeChecked', 'Check current e-Visa fee on the official site'],
  ['applied', 'Apply and save the approval'],
  ['rules', 'Check max stay length and re-entry rules for your plan'],
];

const HOUSING_CHECKLIST = [
  ['shortlist', 'Shortlist 2-3 neighborhoods'],
  ['contact', 'Contact listings / book viewings'],
  ['view', 'View in person or via video call'],
  ['negotiate', 'Negotiate rent & deposit'],
  ['sign', 'Sign rental contract (get it notarized if applying for ikamet)'],
  ['pay', 'Pay deposit + first month'],
  ['dask', 'DASK earthquake insurance arranged'],
  ['utilities', 'Utilities & internet transferred to your name'],
];

const LIVING_FIELDS = [
  ['groceries', 'Groceries'],
  ['transport', 'Daily transport (Istanbulkart)'],
  ['utilities', 'Utilities + internet'],
  ['mobile', 'Mobile plan'],
  ['eatingOut', 'Eating out & coffee'],
  ['misc', 'Miscellaneous'],
];

function loadPlan() {
  if (typeof window === 'undefined') return DEFAULT_PLAN;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PLAN;
    const parsed = JSON.parse(raw);
    // Shallow-merge over defaults so a plan saved before a new field existed
    // doesn't crash the page.
    return {
      ...DEFAULT_PLAN,
      ...parsed,
      flight: { ...DEFAULT_PLAN.flight, ...parsed.flight, checklist: { ...DEFAULT_PLAN.flight.checklist, ...parsed.flight?.checklist } },
      visa: { ...DEFAULT_PLAN.visa, ...parsed.visa, checklist: { ...DEFAULT_PLAN.visa.checklist, ...parsed.visa?.checklist } },
      housing: { ...DEFAULT_PLAN.housing, ...parsed.housing, checklist: { ...DEFAULT_PLAN.housing.checklist, ...parsed.housing?.checklist } },
      living: { ...DEFAULT_PLAN.living, ...parsed.living },
    };
  } catch {
    return DEFAULT_PLAN;
  }
}

function fmt(amountTry, currency) {
  const c = CURRENCIES[currency] || CURRENCIES.TRY;
  const value = Math.round((amountTry || 0) * c.perTry);
  return `${c.symbol}${value.toLocaleString()}`;
}

function SummaryCard({ icon: Icon, iconBg, iconColor, label, value, sub }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}><Icon className={`w-4 h-4 ${iconColor}`} /></div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="text-2xl md:text-3xl font-bold mb-1">{value}</div>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function SectionCard({ icon: Icon, iconColor, title, doneCount, totalCount, children }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <h3 className="font-bold">{title}</h3>
        </div>
        {totalCount != null && <span className="px-3 py-1 rounded-full bg-muted text-xs font-semibold text-muted-foreground shrink-0">{doneCount}/{totalCount} done</span>}
      </div>
      {children}
    </div>
  );
}

function NumberField({ label, value, onChange, placeholder = '0' }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-1.5">{label}</label>
      <input
        type="number" inputMode="numeric" value={value === 0 ? '' : value} placeholder={placeholder}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

function TextField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-1.5">{label}</label>
      <input
        type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[44px] appearance-none px-4 py-2.5 pr-9 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
        >
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

function Checklist({ items, checked, onToggle }) {
  return (
    <ul className="space-y-2.5 mt-4">
      {items.map(([key, label]) => (
        <li key={key}>
          <label className="flex items-start gap-3 cursor-pointer min-h-[40px] py-1">
            <input
              type="checkbox" checked={!!checked[key]} onChange={() => onToggle(key)}
              className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary shrink-0"
            />
            <span className={`text-sm ${checked[key] ? 'line-through text-muted-foreground' : ''}`}>{label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function RelocationDashboard({ listings }) {
  const [plan, setPlan] = useState(DEFAULT_PLAN);
  const [savedActivities, setSavedActivities] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(loadPlan());
    setSavedActivities(getSavedActivities());
    setHydrated(true);
    return subscribeSavedActivities(setSavedActivities);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plan)); } catch { /* best-effort */ }
  }, [plan, hydrated]);

  const update = (section, patch) => setPlan((p) => ({ ...p, [section]: { ...p[section], ...patch } }));
  const toggleChecklist = (section, key) => setPlan((p) => ({ ...p, [section]: { ...p[section], checklist: { ...p[section].checklist, [key]: !p[section].checklist[key] } } }));

  const savedActivitiesTotal = useMemo(
    () => savedActivities.reduce((sum, a) => sum + (Number(a.price) || 0), 0),
    [savedActivities]
  );

  const livingMonthlyTotal = useMemo(
    () => LIVING_FIELDS.reduce((sum, [key]) => sum + (Number(plan.living[key]) || 0), 0),
    [plan.living]
  );

  const oneTimeCosts = (plan.flight.price || 0) + (plan.visa.fee || 0) + (plan.housing.deposit || 0) + savedActivitiesTotal;
  const monthlyEstimate = (plan.housing.rent || 0) + livingMonthlyTotal;
  const first3MonthsTotal = oneTimeCosts + monthlyEstimate * 3;

  const flightDone = Object.values(plan.flight.checklist).filter(Boolean).length;
  const visaDone = Object.values(plan.visa.checklist).filter(Boolean).length;
  const housingDone = Object.values(plan.housing.checklist).filter(Boolean).length;

  const selectHome = (listing) => update('housing', { rent: Number(listing.monthly_rent) || 0, deposit: Number(listing.deposit) || 0 });

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-sm text-muted-foreground mb-1">Your move to Türkiye</p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">Relocation Plan</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Show costs in</span>
              <div className="relative">
                <select
                  value={plan.currency} onChange={(e) => setPlan((p) => ({ ...p, currency: e.target.value }))}
                  className="appearance-none min-h-[40px] pl-3 pr-8 py-1.5 rounded-full border border-border bg-background font-semibold text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  {Object.keys(CURRENCIES).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard icon={Wallet} iconBg="bg-primary/10" iconColor="text-primary" label="One-time relocation costs" value={fmt(oneTimeCosts, plan.currency)} sub="Visa + flight + deposit + experiences" />
          <SummaryCard icon={Home} iconBg="bg-success/10" iconColor="text-success" label="Monthly living estimate" value={fmt(monthlyEstimate, plan.currency)} sub="Rent + daily living costs" />
          <SummaryCard icon={Sparkles} iconBg="bg-accent/10" iconColor="text-accent" label="First 3 months, total" value={fmt(first3MonthsTotal, plan.currency)} sub="One-time + 3 months of living" />
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">Estimates you control — edit any number below.</p>

        <SectionCard icon={Plane} iconColor="text-primary" title="Flight" doneCount={flightDone} totalCount={FLIGHT_CHECKLIST.length}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <TextField label="Route" value={plan.flight.route} placeholder="e.g. BOM → IST" onChange={(v) => update('flight', { route: v })} />
            <TextField label="Travel date" value={plan.flight.date} placeholder="e.g. 15 Nov 2026" onChange={(v) => update('flight', { date: v })} />
            <NumberField label={`Ticket price (${plan.currency})`} value={Math.round((plan.flight.price || 0) * CURRENCIES[plan.currency].perTry)} onChange={(v) => update('flight', { price: Math.round(v / CURRENCIES[plan.currency].perTry) })} />
          </div>
          <Checklist items={FLIGHT_CHECKLIST} checked={plan.flight.checklist} onToggle={(key) => toggleChecklist('flight', key)} />
        </SectionCard>

        <SectionCard icon={FileCheck} iconColor="text-primary" title="Visa" doneCount={visaDone} totalCount={VISA_CHECKLIST.length}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SelectField label="Visa type" value={plan.visa.type} options={VISA_TYPES} onChange={(v) => update('visa', { type: v })} />
            <SelectField label="Status" value={plan.visa.status} options={VISA_STATUSES} onChange={(v) => update('visa', { status: v })} />
            <NumberField label={`Visa fee (${plan.currency})`} value={Math.round((plan.visa.fee || 0) * CURRENCIES[plan.currency].perTry)} onChange={(v) => update('visa', { fee: Math.round(v / CURRENCIES[plan.currency].perTry) })} />
          </div>
          <Checklist items={VISA_CHECKLIST} checked={plan.visa.checklist} onToggle={(key) => toggleChecklist('visa', key)} />
        </SectionCard>

        <SectionCard icon={Home} iconColor="text-accent" title="House hunting" doneCount={housingDone} totalCount={HOUSING_CHECKLIST.length}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <NumberField label={`Monthly rent (${plan.currency})`} value={Math.round((plan.housing.rent || 0) * CURRENCIES[plan.currency].perTry)} onChange={(v) => update('housing', { rent: Math.round(v / CURRENCIES[plan.currency].perTry) })} />
            <NumberField label={`Deposit (${plan.currency})`} value={Math.round((plan.housing.deposit || 0) * CURRENCIES[plan.currency].perTry)} onChange={(v) => update('housing', { deposit: Math.round(v / CURRENCIES[plan.currency].perTry) })} />
          </div>
          <Checklist items={HOUSING_CHECKLIST} checked={plan.housing.checklist} onToggle={(key) => toggleChecklist('housing', key)} />

          {listings?.length > 0 && (
            <div className="mt-6 pt-5 border-t border-border">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> Browse homes</h4>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {listings.slice(0, 6).map((l) => (
                  <div key={l.id} className="shrink-0 w-48 rounded-xl border border-border overflow-hidden bg-background">
                    <div className="relative aspect-[4/3] bg-muted">
                      {l.image_url && <Image src={l.image_url} alt={l.title} fill sizes="192px" className="object-cover" unoptimized />}
                    </div>
                    <div className="p-2.5">
                      <h5 className="text-xs font-semibold line-clamp-1 mb-0.5">{l.title}</h5>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mb-1.5"><MapPin className="w-3 h-3 shrink-0" /><span className="truncate">{l.neighborhood} · {l.bedrooms}BR{l.furnished ? ' · Furnished' : ''}</span></p>
                      <p className="text-sm font-bold mb-2">₺{Number(l.monthly_rent).toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <button onClick={() => selectHome(l)} className="text-primary hover:underline">Select this home</button>
                        {l.listing_url && <a href={l.listing_url} target="_blank" rel="noopener noreferrer sponsored" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">View listing <ExternalLink className="w-3 h-3" /></a>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionCard>

        <SectionCard icon={ShoppingCart} iconColor="text-primary" title="Monthly living costs" totalCount={null}>
          <div className="flex items-center justify-between -mt-1 mb-3">
            <p className="text-xs text-muted-foreground max-w-sm">Starting estimates for one person in Istanbul — adjust to your lifestyle.</p>
            <span className="px-3 py-1 rounded-full bg-muted text-xs font-semibold text-muted-foreground shrink-0">{fmt(livingMonthlyTotal, plan.currency)}/mo + rent</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LIVING_FIELDS.map(([key, label]) => (
              <NumberField key={key} label={`${label} (${plan.currency})`} value={Math.round((plan.living[key] || 0) * CURRENCIES[plan.currency].perTry)} onChange={(v) => update('living', { [key]: Math.round(v / CURRENCIES[plan.currency].perTry) })} />
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={Heart} iconColor="text-destructive" title="Experiences budget" totalCount={null}>
          <p className="text-xs text-muted-foreground -mt-2 mb-1">Everything you've saved to your wishlist, counted into your one-time costs.</p>
          <div className="flex items-center justify-end -mt-6 mb-3">
            <span className="px-3 py-1 rounded-full bg-muted text-xs font-semibold text-muted-foreground">{fmt(savedActivitiesTotal, plan.currency)}</span>
          </div>
          {savedActivities.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-xl py-8 text-center">
              <Heart className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Nothing saved yet — tap the heart on any experience.</p>
              <Link href="/discover" className="text-sm font-semibold text-primary hover:underline">Discover experiences</Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {savedActivities.map((a) => (
                <li key={a.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                    {a.image_url && <Image src={a.image_url} alt={a.title} fill sizes="48px" className="object-cover" unoptimized />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{a.city_name}</p>
                  </div>
                  {a.price != null && <span className="text-sm font-semibold shrink-0">₺{a.price}</span>}
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <div className="rounded-2xl border border-border bg-muted/50 p-6 text-center">
          <h3 className="font-bold mb-1.5">Planning a full relocation?</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">We help remote workers move to Türkiye — visa paperwork, apartment hunting, and your first-month setup, handled.</p>
          <Link href="/concierge" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
            <MessageCircle className="w-4 h-4" /> See Concierge Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
