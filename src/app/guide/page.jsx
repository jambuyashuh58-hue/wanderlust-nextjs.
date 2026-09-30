import { Suspense } from 'react';
import GuideDownloadForm from '@/components/GuideDownloadForm';
import { CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Free Checklist: Moving to Istanbul | Move to Istanbul',
  description: 'A free, no-BS 2026 checklist covering visas, fair rent prices, and the exact steps to avoid common expat scams in Istanbul.',
};

const BULLETS = [
  'The exact documents you need for a short-term residence permit.',
  'Neighborhood-by-neighborhood rent breakdowns (so you don’t overpay).',
  'The "red flag" clauses to watch out for in Turkish rental contracts.',
];

export default function GuidePage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-[hsl(221,55%,26%)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-5">Free Checklist</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Moving to Istanbul? Don&apos;t Let Bureaucracy Ruin Your Dream.</h1>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            Get our free, no-BS 2026 checklist covering visas, fair rent prices, and the exact steps to avoid common expat scams.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-xl font-bold mb-4">What&apos;s inside</h2>
          <ul className="space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-5">Plus the full 18-chapter guide: banking, ikamet renewals, cost of living, internet setup, and more.</p>
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
