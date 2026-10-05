import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';

export const metadata = {
  title: "Turkish Numbers Not Grammar: A Survival Guide for Expats | Move to Istanbul",
  description: 'Stop trying to speak fluent Turkish. Learn numbers, addresses, and polite phrases instead. Clarity beats accuracy in daily survival.',
  alternates: { canonical: '/field-notes/turkish-numbers-not-grammar' },
};

export default function TurkishNumbersPage() {
  return (
    <GuideLayout
      eyebrow="Field Notes · Language"
      title="I Quit Learning Turkish Grammar. Here's What I Learned Instead."
      description="By the Quiet Operator · 5 min read"
      backHref="/field-notes"
      backLabel="All field notes"
    >
      <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-a:text-primary">
        <p>Month two in Istanbul. I had downloaded three language apps. I could conjugate verbs. I knew the difference between <em>-yor</em> and <em>-acak</em>. And yet, when the pharmacist asked me to confirm my dosage, I froze.</p>

        <p>Why? Because grammar doesn&rsquo;t save you in crisis. Clarity does.</p>

        <p>I stopped studying syntax. I started studying survival nouns. Here&rsquo;s what actually works.</p>

        <h2>The Hierarchy of Language Needs</h2>
        <p>Not all words are equal. Prioritize them like this:</p>
        <ol>
          <li><strong>Numbers:</strong> Prices, times, dates, quantities.</li>
          <li><strong>Locations:</strong> Addresses, landmarks, directions.</li>
          <li><strong>Politeness Markers:</strong> Please, thank you, excuse me.</li>
          <li><strong>Problem Statements:</strong> &ldquo;Broken,&rdquo; &ldquo;Missing,&rdquo; &ldquo;Wrong.&rdquo;</li>
          <li><strong>Grammar:</strong> Only if you have time left over.</li>
        </ol>

        <h2>Step 1: Master the Numbers</h2>
        <p>If you can say <em>yirmi beş</em> (25) and <em>yüz elli</em> (150), you can shop. If you can say <em>saat üç</em> (3 o&rsquo;clock), you can meet appointments. Numbers are universal transactional tools.</p>
        <p><strong>Action:</strong> Write 1&ndash;100 on a card. Tape it to your fridge. Say them aloud while brushing teeth. Within a week, they become reflex.</p>

        <h2>Step 2: Script Your Address</h2>
        <p>You will repeat your address hundreds of times. Taxi drivers. Delivery apps. Police forms. Doctors.</p>
        <p>Don&rsquo;t improvise. Memorize it phonetically:</p>
        <blockquote>&ldquo;Mahallesi [Neighborhood], Sokak [Street], Numara [Number], Daire [Apartment].&rdquo;</blockquote>
        <p>Practice saying it slowly. Then faster. Until it flows without thinking.</p>

        <h2>Step 3: Learn the Magic Words</h2>
        <p>Turks appreciate effort more than accuracy. Three phrases unlock goodwill:</p>
        <ul>
          <li><strong>Lütfen</strong> (Please)</li>
          <li><strong>Teşekkür ederim</strong> (Thank you)</li>
          <li><strong>Afedersiniz</strong> (Excuse me/Sorry)</li>
        </ul>
        <p>Use them constantly. Even if you mess up the rest, politeness buys patience.</p>

        <h2>Step 4: Prepare Problem Phrases</h2>
        <p>Things go wrong. Have scripts ready:</p>
        <ul>
          <li><strong>&ldquo;Bu çalışmıyor.&rdquo;</strong> (This is not working.)</li>
          <li><strong>&ldquo;Eksik var.&rdquo;</strong> (Something is missing.)</li>
          <li><strong>&ldquo;Yanlış geldi.&rdquo;</strong> (It arrived incorrectly.)</li>
          <li><strong>&ldquo;Lütfen yazın.&rdquo;</strong> (Please write it down.)</li>
        </ul>
        <p>Pointing + these phrases solves 90% of daily friction.</p>

        <h2>What About Grammar?</h2>
        <p>Honestly? Ignore it for the first 90 days. Unless you&rsquo;re dealing with legal contracts or medical consent, complex sentence structures rarely matter. Simple subject-verb-object combos suffice.</p>
        <p><em>&ldquo;Ben su istiyorum.&rdquo;</em> (I want water.) Works.<br />
        <em>&ldquo;Su ister miydiniz?&rdquo;</em> (Would you like some water?) Also works, but harder to learn.</p>
        <p>Start with blunt clarity. Refine later.</p>

        <h2>The Mindset Shift</h2>
        <p>You are not failing because you can&rsquo;t speak Turkish. You are succeeding because you can navigate it. Fluency is a luxury. Functionality is a necessity.</p>
        <p>Learn numbers. Script addresses. Use magic words. Solve problems simply.</p>
        <p>The rest comes with time. And confidence.</p>
      </div>

      <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary/5 to-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Need a phrase cheat sheet?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Our free 90-60-30 guide includes a printable Turkish survival card with essential numbers, addresses, and problem-solving phrases.
        </p>
        <Link href="/free-guide" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Download Guide <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </GuideLayout>
  );
}
