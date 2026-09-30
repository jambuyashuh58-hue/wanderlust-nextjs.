import { Suspense } from 'react';
import GuideDownloadForm from '@/components/GuideDownloadForm';
import { CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Free Guide: Istanbul for Digital Nomads | Move to Istanbul',
  description: '18 step-by-step guides on visas, residence permits, banking, housing, and cost of living in Istanbul — free PDF, no strings attached.',
};

const CHAPTERS = [
  'Opening a bank account as a foreigner',
  'Getting your ikamet (residence permit) in 2026',
  'Turkish tax number, step by step',
  'eVisa rules, including the Indian-passport exception',
  'What to do if your ikamet is rejected',
  'Kadikoy vs. Besiktas rent comparison',
  'Avoiding sahibinden.com rental scams',
  'A full cost-of-living budget worksheet',
  'Health insurance that actually meets the ikamet minimum',
  'Airport arrival: metro vs. Havaist vs. taxi',
];

export default function GuidePage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-[hsl(221,55%,26%)] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-5">Free Guide</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Istanbul for Digital Nomads</h1>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed">
            18 practical, step-by-step guides on the exact process for visas, residence permits, banking, housing, and cost of living — the whole first-month checklist in one free PDF.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-xl font-bold mb-4">What's inside</h2>
          <ul className="space-y-2.5">
            {CHAPTERS.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="w-4.5 h-4.5 text-success shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-4">Plus 8 more chapters — internet setup, citizenship paths, rental contracts, and more.</p>
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
