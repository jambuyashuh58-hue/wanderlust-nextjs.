import GuideLayout from '@/components/GuideLayout';

export const metadata = {
  title: 'Türkiye Visa & Residence Permit Guide 2026 | Wanderlust',
  description: 'e-Visa, tourist entry, and short-term residence permits, with official sources.',
};

export default function GuideVisaPage() {
  return (
    <GuideLayout
      eyebrow="Visa Guide"
      title="Türkiye Visa & Residence Permit Guide 2026"
      description="e-Visa, tourist entry, and short-term residence permits, with official sources."
      readTime="8 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[{ id: 'overview', label: 'Overview' }, { id: 'residence', label: 'Residence Permit' }]}
    >
      <div id="overview" className="mb-8 p-5 rounded-2xl bg-primary/5 border border-primary/20">
        <p className="text-sm text-foreground/80 leading-relaxed">Most travelers can enter Türkiye visa-free for tourism up to 90 days in any 180-day period. For longer stays, apply for a Short-Term Residence Permit -- typically $150-300 for the first year, 4-12 weeks processing.</p>
      </div>
      <section id="residence">
        <h2 className="text-2xl font-bold mb-4">Short-Term Residence Permit</h2>
        <p className="text-foreground/80 leading-relaxed">Apply online at e-ikamet.goc.gov.tr with your tax ID, book an appointment, attend in person with your documents, and your card arrives by mail. Official source: <a href="https://en.goc.gov.tr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">en.goc.gov.tr</a></p>
      </section>
    </GuideLayout>
  );
}
