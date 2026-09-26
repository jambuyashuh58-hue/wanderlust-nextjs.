export const metadata = {
  title: 'About Wanderlust',
  description: 'AI-powered travel discovery for Türkiye.',
};

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About Wanderlust</h1>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Wanderlust combines AI intelligence with authentic local curation to help travelers and relocators discover the best of Türkiye -- from Istanbul&apos;s mosques to Cappadocia&apos;s hot air balloons.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          We also run a concierge service to help remote workers relocate to Türkiye with real, hands-on support.
        </p>
      </div>
    </div>
  );
}
