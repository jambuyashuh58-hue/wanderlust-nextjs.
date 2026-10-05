import Link from 'next/link';
import { ArrowRight, FileCheck, FileText, Languages, RefreshCw, AlertTriangle, Flag } from 'lucide-react';

export const revalidate = 86400;

export const metadata = {
  title: 'Türkiye Residence Permit: The Short-Term Permit Explained | Move to Istanbul',
  description: 'A deeper look at the short-term residence permit (e-İkamet) process — documents, translation and legalization, and what to do if your application needs a follow-up.',
  alternates: { canonical: '/visa-residence' },
};

const PAGES = [
  { href: '/visa-residence/short-term-residence-permit', icon: FileCheck, title: 'The Short-Term Residence Permit', description: 'How e-İkamet actually works, step by step, once you have a lease.' },
  { href: '/visa-residence/documents', icon: FileText, title: 'Documents', description: 'The complete document stack, and which ones trip people up.' },
  { href: '/visa-residence/translation-legalization', icon: Languages, title: 'Translation & Legalization', description: 'Which documents need a sworn Turkish translation or an apostille, and where to get it done.' },
  { href: '/visa-residence/immigration-follow-up', icon: RefreshCw, title: 'Immigration Follow-Up', description: 'What a request for additional documents means, and how to respond.' },
  { href: '/visa-residence/common-mistakes', icon: AlertTriangle, title: 'Common Mistakes', description: 'The application errors that cause delays or rejections most often.' },
  { href: '/visa-residence/by-nationality', icon: Flag, title: 'By Nationality', description: 'Entry rules and document legalization notes for 10 nationalities, from the US to Saudi Arabia.' },
];

export default function VisaResidencePage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">The Short-Term Residence Permit, Explained</h1>
          <p className="text-foreground/80 max-w-2xl leading-relaxed">
            Our visa guide compares all five residence pathways side by side. This cluster goes one level deeper on the one most newcomers actually use — the short-term tourist e-İkamet residence permit — covering the application itself, documents, translation requirements, and what happens if immigration asks for more.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PAGES.map((p) => (
            <Link key={p.href} href={p.href} className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4"><p.icon className="w-5 h-5 text-primary" /></div>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read <ArrowRight className="w-4 h-4" /></span>
            </Link>
          ))}
          <Link href="/guides/visa" className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all">
            <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4"><FileCheck className="w-5 h-5 text-primary" /></div>
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Compare All 5 Pathways</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">Digital Nomad Visa, work permit, real estate, family residence, and short-term — side by side.</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">Read <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Rules vary by nationality:</strong> which countries need a visa before entry, how long a visa-free stay lasts, and how foreign documents get legalized for a residence permit all depend on your passport. See the <Link href="/visa-residence/by-nationality" className="text-primary hover:underline">By Nationality</Link> pages for specifics, or let the <Link href="/services/istanbul-route-check" className="text-primary hover:underline">Istanbul Route Check</Link> map out your exact route.
          </p>
        </div>
      </div>
    </div>
  );
}
