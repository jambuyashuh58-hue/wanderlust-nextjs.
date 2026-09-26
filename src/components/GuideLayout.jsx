import Link from 'next/link';
import { ArrowLeft, Clock, MessageCircle } from 'lucide-react';

const CONCIERGE_URL = 'https://www.instagram.com/move_istanbul';

export default function GuideLayout({ eyebrow, title, description, readTime, updated, sections = [], children }) {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/guides" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"><ArrowLeft className="w-4 h-4" /> All guides</Link>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">{eyebrow}</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
          <p className="text-foreground/80 leading-relaxed max-w-2xl mb-4">{description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {readTime && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {readTime}</span>}
            {updated && <span>Last checked {updated}</span>}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          {sections.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">On this page</p>
                <nav className="space-y-2">{sections.map((s) => <a key={s.id} href={`#${s.id}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{s.label}</a>)}</nav>
                <div className="mt-8 rounded-2xl border border-border bg-card p-4">
                  <p className="text-xs font-semibold mb-1.5">Planning your move?</p>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">Our concierge service can help with visa paperwork and apartment hunting.</p>
                  <Link href="/concierge" className="text-xs font-semibold text-primary hover:underline">See Concierge Plans →</Link>
                </div>
              </div>
            </aside>
          )}
          <article className="min-w-0 space-y-10">{children}</article>
        </div>
        <div className="mt-14 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1"><h3 className="font-bold mb-1">Want this handled for you?</h3><p className="text-sm text-muted-foreground">Our concierge service handles visa paperwork, apartment hunting, and your first-month setup end to end.</p></div>
          <a href={CONCIERGE_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:scale-105 transition-transform">
            <MessageCircle className="w-4 h-4" /> Ask about concierge
          </a>
        </div>
      </div>
    </div>
  );
}
