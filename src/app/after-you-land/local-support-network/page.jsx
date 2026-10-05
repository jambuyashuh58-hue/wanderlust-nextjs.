import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Building a Local Support Network in Türkiye | Move to Istanbul',
  description: 'Where to find other expats, locals, and the professional contacts (accountant, lawyer, doctor) worth having before you need them.',
  alternates: { canonical: '/after-you-land/local-support-network/' },
};

const SOURCES = [
  {
    title: 'Expat and relocation groups online',
    body: 'Facebook groups built around specific neighborhoods or nationalities (search "[your nationality] in Istanbul" or your district name) tend to be more useful than generic "expats in Turkey" groups — the signal-to-noise ratio is much better when the group is narrow. Reddit\'s r/Turkey and r/Istanbul are good for specific questions, less good for ongoing friendships.',
  },
  {
    title: 'In-person meetups and language exchanges',
    body: "Language exchange events (search \"dil değişimi\" or \"language exchange Istanbul\") are a reliable way to meet both locals who want to practice English and other foreigners in the same boat as you. Coworking spaces, even if you don't buy a membership, often run open community events worth showing up to in your first month.",
  },
  {
    title: 'Neighbors, your kapıcı, and your landlord',
    body: "Don't underestimate this one — the people physically closest to you are often the fastest route to practical answers (which pharmacy, which plumber, which day is pazar day) that no forum post will answer as quickly. A basic greeting in Turkish and a willingness to ask goes a long way here.",
  },
  {
    title: 'Build your professional bench before you need it',
    body: "A lawyer, an accountant (mali müşavir), and a doctor you can actually reach are each worth sourcing proactively rather than scrambling for one mid-crisis. Ask in neighborhood-specific expat groups for English-speaking recommendations with recent, specific experiences — not just a name someone heard once.",
  },
];

const FAQ = [
  {
    q: 'Is Istanbul a hard city to make friends in as a foreigner?',
    a: "It has a reputation for being easier than many European capitals, partly because there's a large and constantly-renewing international community and Turkish hospitality norms genuinely do extend to welcoming newcomers. That said, like most big cities, the first few months are the slowest — it picks up once you have a routine (gym, coworking space, regular café) that puts you in front of the same people repeatedly.",
  },
  {
    q: 'Should I prioritize other expats or local friendships?',
    a: "Most people end up with both, and each serves a different purpose — other foreigners who've recently been through the same admin maze are invaluable for practical questions, while local friendships are what actually teach you the culture and language faster. Neither should fully substitute for the other.",
  },
  {
    q: 'How do I find an English-speaking doctor or specialist?',
    a: "Major private hospitals in Istanbul (Acıbadem, Memorial, American Hospital, and others) have English-speaking staff and international patient departments specifically set up for exactly this. It's usually easier than finding one through a public SGK referral, especially before you're SGK-eligible.",
  },
];

export default function LocalSupportNetworkPage() {
  return (
    <GuideLayout
      eyebrow="After You Land"
      title="Local Support Network"
      description="Where to actually find other expats, locals, and the professional contacts worth having before you need them."
      readTime="4 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/after-you-land"
      backLabel="After You Land"
      sections={[
        { id: 'sources', label: 'Where to find people' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="sources">
        <div className="space-y-5">
          {SOURCES.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold mb-1.5">{s.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Coworking spaces double as a social starting point</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          If you're working remotely, a coworking membership solves two problems at once — a reliable place to work, and a built-in way to meet people on a similar schedule to yours.
        </p>
        <Link href="/cost-of-living/coworking-internet" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Coworking & Internet Guide <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
