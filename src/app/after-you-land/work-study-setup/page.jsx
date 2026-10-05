import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'Work & Study Setup in Türkiye: Remote, Freelance, Employed | Move to Istanbul',
  description: 'How your setup differs depending on whether you\'re working remotely for a foreign employer, freelancing locally, taking local employment, or studying in Türkiye.',
  alternates: { canonical: '/after-you-land/work-study-setup/' },
};

const PATHS = [
  {
    title: 'Remote work for a foreign employer',
    body: "This is the simplest path administratively — you're not entering the Turkish tax or social security system through your employer, so your residence permit is typically the short-term (tourist-type) residence permit rather than a work permit. You're still liable for Turkish tax residency rules if you spend more than 183 days in the country in a calendar year, which is worth a real conversation with an accountant, not a forum thread.",
  },
  {
    title: 'Freelancing or local self-employment',
    body: "If you're invoicing Turkish clients or running a registered business locally, you'll typically need to set up as a self-employed taxpayer (şahıs şirketi) or a limited company, each with different tax and bookkeeping obligations. A local accountant (mali müşavir) is close to non-negotiable here — the paperwork and monthly filing requirements aren't designed for a DIY approach, especially in your first year.",
  },
  {
    title: 'Local employment with a Turkish company',
    body: "Local employment means your employer sponsors your work permit, which is a different, employer-driven process from the residence permit most relocators handle themselves. One upside: employees on a Turkish work permit are automatically enrolled in SGK (public health insurance) from day one, without the one-year wait that applies to voluntary enrollment.",
  },
  {
    title: 'Studying at a Turkish university',
    body: 'Student residence permits are tied to your enrollment and are generally the most straightforward permit type to obtain and renew, since the university\'s international office typically guides you through the paperwork. Part-time work rights for international students are limited and conditional, so check your specific permit terms before assuming you can take on paid work alongside study.',
  },
];

const FAQ = [
  {
    q: 'When can I opt into Türkiye\'s public health system (SGK) instead of private insurance?',
    a: "If you're on a work permit through local employment, you're enrolled in SGK automatically from your first day. Otherwise, voluntary SGK enrollment generally requires having lived in Türkiye legally and continuously on a residence permit for at least one year — until then, private health insurance is what satisfies your residence permit requirement.",
  },
  {
    q: 'Can I just keep working remotely and ignore Turkish tax rules?',
    a: "You can for a while, but it catches up with you: spend more than 183 days in a calendar year in Türkiye and you're generally considered a Turkish tax resident regardless of where your income is paid from. This is a genuinely consequential decision — get a real consultation with a Turkish accountant rather than relying on expat forum advice, which is often outdated or specific to someone else's situation.",
  },
  {
    q: 'Do I need a Turkish bank account to get paid or invoice clients?',
    a: "For local freelance or self-employment invoicing, yes — a Turkish bank account is standard. For remote work paid into a foreign account, it's not strictly required but still useful for day-to-day spending and avoiding repeated international transfer fees. See our banking & payments guide for how to actually open one as a new resident.",
  },
];

export default function WorkStudySetupPage() {
  return (
    <GuideLayout
      eyebrow="After You Land"
      title="Work & Study Setup"
      description="Remote employee, local freelancer, locally employed, or student — each path has a different admin setup, and picking the wrong one costs you later."
      readTime="5 min read"
      updated={new Date().toISOString().slice(0, 10)}
      backHref="/after-you-land"
      backLabel="After You Land"
      sections={[
        { id: 'paths', label: 'Which path are you on' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      <section id="paths">
        <div className="space-y-5">
          {PATHS.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold mb-1.5">{s.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Working remotely? See the digital nomad and banking guides</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          If you're on the remote-work path, our digital nomad guide covers visa and lifestyle specifics, and the banking & payments guide walks through opening a Turkish account as a new resident.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/istanbul-for-digital-nomads" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Digital Nomads in Istanbul <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/cost-of-living/banking-payments" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-semibold hover:border-primary/40 transition-colors">
            Banking & Payments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <GuideFAQ items={FAQ} />
      </section>
    </GuideLayout>
  );
}
