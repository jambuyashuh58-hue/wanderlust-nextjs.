import { Suspense } from 'react';
import GuideDownloadForm from '@/components/GuideDownloadForm';
import { CheckCircle2, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Relocating to Türkiye: The 90-60-30 Move File | MoveToIstanbul',
  description: 'Download the free 90-60-30 Day Relocation Guide — a comprehensive, step-by-step digital book covering visas, housing, budgeting, and arrival setup for moving to Istanbul.',
  alternates: { canonical: '/free-guide' },
};

const BULLETS = [
  'The Master 90-60-30 Day Checklist — every step, in the order to do it.',
  'Module 3 (Housing) and Module 4 (Budget): the two places relocators lose the most money.',
  'The full Settling-In Toolkit: banking, ikamet renewals, healthcare, and a 6-step recovery plan for when something goes wrong.',
];

export default function FreeGuidePage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-[hsl(221,55%,26%)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-5">Free Digital Guide</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Moving to Istanbul? Download the Ultimate 90-60-30 Day Relocation Guide (Free)</h1>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            Stop guessing. This comprehensive, step-by-step digital book covers visas, housing, budgeting, and arrival setup — so you can move with confidence, not chaos.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="rounded-2xl border border-border bg-card p-6 mb-6 flex items-center gap-4">
            <div className="w-16 h-20 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0 shadow-md">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="font-bold leading-snug">The 90-60-30 Day Relocation Guide</p>
              <p className="text-sm text-muted-foreground">6 core modules + the full Istanbul Settling-In &amp; Long-Stay Toolkit</p>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-4">What&apos;s inside</h2>
          <ul className="space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-5">Plus fillable worksheets and trackers for every module — budget planning, apartment shortlisting, document tracking, and your own relocation timeline.</p>
        </div>

        <div className="rounded-2xl border border-border p-6 sm:p-8 bg-card">
          <Suspense fallback={null}>
            <GuideDownloadForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
