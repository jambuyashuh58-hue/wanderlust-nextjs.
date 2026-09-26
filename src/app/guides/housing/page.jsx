import GuideLayout from '@/components/GuideLayout';

export const metadata = {
  title: 'Finding Housing in Türkiye | Wanderlust',
  description: 'Neighborhood breakdown, rent ranges, and the full apartment-search process.',
};

export default function GuideHousingPage() {
  return (
    <GuideLayout
      eyebrow="Housing Guide"
      title="Finding Housing in Türkiye"
      description="Neighborhood breakdown, rent ranges, and the full apartment-search process."
      readTime="9 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[{ id: 'where', label: 'Where to Live' }]}
    >
      <section id="where">
        <h2 className="text-2xl font-bold mb-4">Where to Live</h2>
        <p className="text-foreground/80 leading-relaxed">Rent in Istanbul runs €400-1,200/month for a one-bedroom depending on neighborhood. Cihangir, Kadıköy, and Beşiktaş are the most popular expat areas. Expect 3-4 months&apos; rent upfront (deposit + first month + agent commission).</p>
      </section>
    </GuideLayout>
  );
}
