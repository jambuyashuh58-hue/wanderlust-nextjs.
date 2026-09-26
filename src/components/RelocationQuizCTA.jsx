// New component -- ported from the old Vite site's RelocationQuizCTA.jsx,
// converted from react-router-dom's <Link to> to next/link's <Link href>
// and framer-motion's whileInView kept (framer-motion is already a
// dependency per package.json). Import in page.jsx:
//   import RelocationQuizCTA from '@/components/RelocationQuizCTA';

'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HelpCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function RelocationQuizCTA() {
  return (
    <section className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 md:p-12"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Not sure where to start?</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Just visiting, or actually thinking about moving here?</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Answer a few quick questions and we&apos;ll point you to exactly what&apos;s useful for your situation.
          </p>
          <Link
            href="/relocation-quiz"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-white font-semibold shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4" /> Take the 2-minute quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
