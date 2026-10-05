import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

export const metadata = {
  title: 'Visa & Documents for Moving to Türkiye | Move to Istanbul',
  description: 'Which visa pathway fits you, and the document trail each one needs — pointing to the full pathway comparison and our visa-residence cluster.',
  alternates: { canonical: '/moving-to-turkiye/visa-and-documents/' },
};

export default function VisaAndDocumentsPage() {
  return (
    <GuideLayout
      eyebrow="Moving to Türkiye"
      title="Visa & Documents"
      description="Which pathway fits you, and the paper trail each one needs."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/moving-to-turkiye"
      backLabel="Moving to Türkiye"
      sections={[{ id: 'overview', label: 'Overview' }]}
    >
      <section id="overview">
        <h2 className="text-2xl font-bold mb-4">Start with the pathway, not the paperwork</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Every document requirement flows from which visa/residence pathway you're on — the Digital Nomad Visa, short-term tourist e-İkamet, a work permit, real-estate-based residence, or family residence each need a different stack of documents and have different lead times.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Our full visa guide breaks down all five pathways side by side with requirements, stay length, and work rights, plus the complete document checklist for the e-İkamet application. The visa-residence cluster goes deeper on the short-term residence permit process specifically, including document translation/legalization and what to do if your application needs a follow-up.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/guides/visa" className="group block rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3"><FileText className="w-5 h-5 text-primary" /></div>
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Compare All Visa Pathways</h3>
            <p className="text-sm text-muted-foreground">Full comparison table + the complete e-İkamet document checklist.</p>
          </Link>
          <Link href="/visa-residence" className="group block rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3"><FileText className="w-5 h-5 text-primary" /></div>
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Short-Term Residence Permit Deep Dive</h3>
            <p className="text-sm text-muted-foreground">Documents, translation/legalization, and what to do after you apply.</p>
          </Link>
        </div>
      </section>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Want your exact route mapped out for you?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">The Istanbul Route Check is a 45-minute call plus a written checklist for your specific nationality and situation.</p>
        <Link href="/services/istanbul-route-check" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See the Istanbul Route Check <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
