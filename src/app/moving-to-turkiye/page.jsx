import Link from 'next/link';
import { ArrowRight, ClipboardList, Map, FileText, Home as HomeIcon, Wallet, PackageCheck, ListOrdered, AlertTriangle } from 'lucide-react';

export const revalidate = 86400;

export const metadata = {
  title: 'Moving to Türkiye: The Full Sequence | Move to Istanbul',
  description: 'The order things actually need to happen in when you move to Türkiye — checklist, timeline, documents, housing, and budget, laid out as one sequence instead of scattered guides.',
  alternates: { canonical: '/moving-to-turkiye/' },
};

const PAGES = [
  { href: '/moving-to-turkiye/full-sequence', icon: ListOrdered, title: 'The Full Sequence', description: 'The order everything needs to happen in, start to finish — this is the page to read first.' },
  { href: '/moving-to-turkiye/checklist', icon: ClipboardList, title: 'Pre-Move Checklist', description: 'Everything to sort before you fly, in one printable list.' },
  { href: '/moving-to-turkiye/map-the-move', icon: Map, title: 'Map the Move', description: 'Deciding your entry point, timeline, and whether to scout first or commit outright.' },
  { href: '/moving-to-turkiye/visa-and-documents', icon: FileText, title: 'Visa & Documents', description: 'Which pathway fits you, and the paper trail each one needs.' },
  { href: '/moving-to-turkiye/housing-timeline', icon: HomeIcon, title: 'Housing Timeline', description: 'When to start looking, how long it actually takes, and what to book before vs. after you land.' },
  { href: '/moving-to-turkiye/budget', icon: Wallet, title: 'What It Actually Costs', description: 'The real one-time and first-month numbers, not the marketing version.' },
  { href: '/moving-to-turkiye/arrival-setup', icon: PackageCheck, title: 'Arrival Setup', description: 'The first-week logistics that only make sense once you\'re physically here.' },
  { href: '/moving-to-turkiye/common-mistakes', icon: AlertTriangle, title: 'Common Mistakes', description: 'The avoidable ones that cost people the most time and money.' },
];

export default function MovingToTurkiyePage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Packed suitcases ready for an international move"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/40" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Moving to Türkiye, in the Right Order</h1>
          <p className="text-white/85 max-w-2xl leading-relaxed">
            Most relocation advice is organized by topic — visas here, housing there, budgeting somewhere else. This cluster is organized by <strong className="text-white">sequence</strong>: what to do first, what depends on what, and where people most often get stuck.
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
        </div>
        <Link href="/services" className="mt-10 group flex items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 hover:border-primary/40 transition-all">
          <div><h3 className="font-bold mb-1">Want someone to run this sequence for you?</h3><p className="text-sm text-muted-foreground">The Full Move File handles visa, housing, and arrival end to end.</p></div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>
      </div>
    </div>
  );
}
