import GuideLayout from '@/components/GuideLayout';

const PHRASES = [
  { tr: 'Merhaba', en: 'Hello' },
  { tr: 'Teşekkür ederim', en: 'Thank you' },
  { tr: 'Nerede?', en: 'Where is...?' },
  { tr: 'Ne kadar?', en: 'How much?' },
  { tr: 'Anlamıyorum', en: "I don't understand" },
  { tr: 'İngilizce biliyor musunuz?', en: 'Do you speak English?' },
  { tr: 'Nöbetçi eczane nerede?', en: 'Where is the duty (open) pharmacy?' },
  { tr: 'Randevu almak istiyorum', en: 'I would like to make an appointment' },
  { tr: 'Kira kontratı', en: 'Rental contract' },
  { tr: 'İkamet izni', en: 'Residence permit' },
];

export const metadata = {
  title: 'Turkish Phrases for Daily Admin | Move to Istanbul',
  description: 'The handful of Turkish phrases that actually help with daily admin as a new resident — not a tourist phrasebook.',
  alternates: { canonical: '/after-you-land/turkish-phrases/' },
};

export default function TurkishPhrasesPage() {
  return (
    <GuideLayout
      eyebrow="After You Land"
      title="Turkish Phrases That Actually Help"
      description="The handful of phrases that get you through daily admin, not a tourist phrasebook."
      readTime="3 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/after-you-land"
      backLabel="After You Land"
      sections={[{ id: 'phrases', label: 'Phrases' }]}
    >
      <section id="phrases">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PHRASES.map((p, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4">
              <p className="font-semibold mb-1">{p.tr}</p>
              <p className="text-sm text-muted-foreground">{p.en}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          Most daily admin in major Turkish cities can be handled with a translation app and patience, especially in tourist-adjacent neighborhoods, but these phrases cover the most common friction points — notaries, pharmacies, and official appointments.
        </p>
      </section>
    </GuideLayout>
  );
}
