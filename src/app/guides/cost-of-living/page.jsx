import GuideLayout from '@/components/GuideLayout';

export const metadata = {
  title: 'Monthly Cost of Living in Istanbul | Wanderlust',
  description: 'Real numbers on housing, food, transportation, and monthly expenses.',
};

export default function GuideCostOfLivingPage() {
  return (
    <GuideLayout
      eyebrow="Cost of Living"
      title="Monthly Cost of Living in Istanbul"
      description="Real numbers on housing, food, transportation, and monthly expenses."
      readTime="6 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[{ id: 'overview', label: 'Overview' }]}
    >
      <div id="overview" className="mb-8 p-5 rounded-2xl bg-primary/5 border border-primary/20">
        <p className="text-sm text-foreground/80 leading-relaxed">A single person can live comfortably in Türkiye on €1,200-2,000/month in Istanbul, €800-1,400 in Antalya/İzmir, or €600-1,000 in smaller cities.</p>
      </div>
    </GuideLayout>
  );
}
