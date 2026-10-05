import Link from 'next/link';
import { Compass, ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Field Notes | Move to Istanbul',
  description: 'Reflective notes on moving to Istanbul — practical wisdom on mindset, language, and housing from the quiet operator behind Move to Istanbul.',
  alternates: { canonical: '/field-notes/' },
};

const POSTS = [
  {
    slug: 'anchor-routines',
    tag: 'Mindset',
    title: 'Why I Stopped Chasing Perfection and Started Building Anchor Routines',
    description: "Moving isn't about getting everything right immediately. It's about creating small constants that hold you steady when bureaucracy fails.",
  },
  {
    slug: 'turkish-numbers-not-grammar',
    tag: 'Language',
    title: "I Quit Learning Turkish Grammar. Here's What I Learned Instead.",
    description: "You don't need fluency to survive Istanbul. You need clarity. Numbers, addresses, and polite refusals matter more than verb conjugations.",
  },
  {
    slug: 'landlord-silence-tactic',
    tag: 'Housing',
    title: "When Your Landlord Goes Silent, Don't Panic. Document.",
    description: "Silence is a tactic. It's designed to make you give up or pay out of pocket. Here's how to break the cycle with facts, not emotion.",
  },
];

export default function FieldNotesPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Compass className="w-4 h-4" /> Reflections &amp; Wisdom
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Field Notes</h1>
          <p className="text-foreground/80 max-w-2xl leading-relaxed">
            Not just checklists. Thoughts on settling in, avoiding burnout, and finding calm in the chaos of relocation — written by the quiet operator behind Move to Istanbul.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/field-notes/${post.slug}`}
              className="group block h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-accent bg-secondary/10 px-2.5 py-1 rounded-full mb-4">
                {post.tag}
              </span>
              <h2 className="font-bold mb-2 leading-snug group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read note <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/free-guide"
          className="group flex items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 hover:border-primary/40 transition-all"
        >
          <div>
            <h3 className="font-bold mb-1 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Want a structured plan instead?
            </h3>
            <p className="text-sm text-muted-foreground">Field notes are reflections. Download the free 90-60-30 day relocation guide for the step-by-step version.</p>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>
      </div>
    </div>
  );
}
