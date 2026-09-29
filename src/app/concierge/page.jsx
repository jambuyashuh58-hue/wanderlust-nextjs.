import { Suspense } from 'react';
import ConciergeInteractive from '@/components/ConciergeInteractive';

export const metadata = {
  title: 'Relocation Concierge Service | Move to Istanbul',
  description: 'Visa paperwork, apartment hunting, and your first-month setup — done for you, async, no calls required.',
};

export default function ConciergeServicePage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-[hsl(221,55%,26%)] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-medium mb-5">Relocation Concierge</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">We Handle the Parts of Moving to Türkiye That Eat Your Evenings</h1>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed">
            Visa paperwork, apartment hunting, and your first-month setup — done for you, async, no calls required. Pick the level of help that fits.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={null}>
          <ConciergeInteractive />
        </Suspense>
      </div>
    </div>
  );
}
