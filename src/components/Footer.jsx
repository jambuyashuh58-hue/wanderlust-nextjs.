import Link from 'next/link';
import { Compass, Instagram, Mail } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';
import Destinations from '@/components/Destinations';

const AFFILIATE_DISCLOSURE = 'We may earn a commission when you book through links on this page, at no extra cost to you.';
const ADVICE_DISCLAIMER = 'We do not provide legal or tax advice. Verify visa, residence, and tax requirements via official Republic of Türkiye channels.';
const CONCIERGE_URL = 'https://www.instagram.com/move_istanbul';
const CONTACT_EMAIL = 'hello@movetoistanbul.online';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center"><Compass className="w-5 h-5 text-white" /></div>
              <span className="text-lg font-bold">Move to Istanbul</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">Independent relocation planning service, plus AI-powered travel recommendations for Türkiye&apos;s museums, hidden gems, and cultural adventures.</p>
            <Link href="/guides" className="block text-sm font-medium text-primary hover:underline mb-1">Turkey Long Stay Guides →</Link>
            <a href={CONCIERGE_URL} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-primary hover:underline mb-3">Follow @move_istanbul on Instagram →</a>
            <div className="flex items-center gap-2">
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email Move to Istanbul" className="w-11 h-11 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
              <a href={CONCIERGE_URL} target="_blank" rel="noopener noreferrer" aria-label="Follow Move to Istanbul on Instagram" className="w-11 h-11 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            {/* h2, not a visually-driven h4 -- this footer renders at the end
                of every page, and whatever heading level the page content
                left off at, dropping straight to h4 here skips levels
                (a Lighthouse/axe accessibility failure). h2 never skips,
                since it can only follow h1 or an equal/deeper heading. */}
            <h2 className="font-semibold text-sm mb-3">Explore</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/discover" className="text-muted-foreground hover:text-primary">Discover</Link></li>
              <li><Link href="/collections" className="text-muted-foreground hover:text-primary">Collections</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/how-we-work" className="text-muted-foreground hover:text-primary">How We Work</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-sm mb-3">Moving to Türkiye</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/moving-to-turkiye" className="text-muted-foreground hover:text-primary">Moving to Türkiye</Link></li>
              <li><Link href="/visa-residence" className="text-muted-foreground hover:text-primary">Visa &amp; Residence</Link></li>
              <li><Link href="/housing" className="text-muted-foreground hover:text-primary">Housing</Link></li>
              <li><Link href="/cost-of-living" className="text-muted-foreground hover:text-primary">Cost of Living</Link></li>
              <li><Link href="/after-you-land" className="text-muted-foreground hover:text-primary">After You Land</Link></li>
              <li><Link href="/istanbul-for-digital-nomads" className="text-muted-foreground hover:text-primary">For Digital Nomads</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-sm mb-3">Long-Stay Guides</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides/visa" className="text-muted-foreground hover:text-primary">Visa Guide</Link></li>
              <li><Link href="/guides/housing" className="text-muted-foreground hover:text-primary">Housing Guide</Link></li>
              <li><Link href="/guides/cost-of-living" className="text-muted-foreground hover:text-primary">Cost of Living</Link></li>
              <li><Link href="/guides" className="text-muted-foreground hover:text-primary">All Guides</Link></li>
              <li><Link href="/country-guides" className="text-muted-foreground hover:text-primary">Country Guides</Link></li>
              <li><Link href="/living-in-istanbul" className="text-muted-foreground hover:text-primary">Living in Istanbul</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-sm mb-3">Collections</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/collections/first-weekend-istanbul" className="text-muted-foreground hover:text-primary">First Weekend in Istanbul</Link></li>
              <li><Link href="/collections/istanbul-budget-slow-travel" className="text-muted-foreground hover:text-primary">Istanbul Under ₺2500</Link></li>
              <li><Link href="/collections/weekend-trips-from-istanbul" className="text-muted-foreground hover:text-primary">Weekend Trips from Istanbul</Link></li>
              <li><Link href="/collections/rainy-day-istanbul" className="text-muted-foreground hover:text-primary">Rainy-Day Istanbul</Link></li>
            </ul>
          </div>
        </div>
        <div className="rounded-2xl border border-amber-400/40 bg-amber-50 dark:bg-amber-950/20 px-6 py-6 sm:px-10 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-semibold mb-1">Free guide: The 90-60-30 Day Relocation Guide</h2>
            <p className="text-sm text-muted-foreground">The complete digital book on visas, housing, budgeting, and arrival setup.</p>
          </div>
          <Link href="/free-guide" className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors">
            Get the free guide
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-background px-6 py-8 sm:px-10 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="max-w-md">
              <h2 className="font-semibold mb-1.5">One email a week. Live better in Türkiye.</h2>
              <p className="text-sm text-muted-foreground">Long-stay tips + the best experiences worth booking — no spam.</p>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[380px]">
              <NewsletterSignup />
            </div>
          </div>
        </div>
        <Destinations />
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-x-4 gap-y-1">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Move to Istanbul. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link href="/refund-policy" className="text-xs text-muted-foreground hover:text-primary">Refund Policy</Link>
              <Link href="/editorial-policy" className="text-xs text-muted-foreground hover:text-primary">Editorial Policy</Link>
              <Link href="/partner-network" className="text-xs text-muted-foreground hover:text-primary">Partner Network</Link>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center sm:text-right max-w-md">{AFFILIATE_DISCLOSURE}</p>
        </div>
        <p className="pt-4 text-[11px] leading-relaxed text-muted-foreground/80 text-center sm:text-left">{ADVICE_DISCLAIMER}</p>
      </div>
    </footer>
  );
}
