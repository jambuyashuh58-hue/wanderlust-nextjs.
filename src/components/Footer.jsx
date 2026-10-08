import Link from 'next/link';
import { Instagram, Mail, AtSign, Facebook } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';
import Destinations from '@/components/Destinations';

const AFFILIATE_DISCLOSURE = 'We may earn a commission when you book through links on this page, at no extra cost to you.';
const ADVICE_DISCLAIMER = 'We do not provide legal or tax advice. Verify visa, residence, and tax requirements via official Republic of Türkiye channels.';
const CONCIERGE_URL = 'https://www.instagram.com/move_istanbul';
const CONTACT_EMAIL = 'hello@movetoistanbul.online';
// Optional: set these in Vercel to show the icons (no guessed URLs).
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
const THREADS_URL = process.env.NEXT_PUBLIC_THREADS_URL || '';
const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL || '';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div aria-hidden="true" className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-sm font-extrabold">MT</div>
              <span className="text-lg font-bold">Move to Istanbul</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">Independent relocation planning service.</p>
          </div>
          <div>
            {/* h2, not a visually-driven h4 -- this footer renders at the end
                of every page; h2 never skips heading levels (axe/Lighthouse). */}
            <h2 className="font-semibold text-sm mb-3">Site Map</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides" className="text-muted-foreground hover:text-primary">Moving to Türkiye Guides</Link></li>
              <li><Link href="/concierge" className="text-muted-foreground hover:text-primary">Concierge Services</Link></li>
              <li><Link href="/onboarding" className="text-muted-foreground hover:text-primary">Plan My Trip</Link></li>
              <li><Link href="/discover" className="text-muted-foreground hover:text-primary">Discover</Link></li>
              <li><Link href="/collections" className="text-muted-foreground hover:text-primary">Collections</Link></li>
              <li><Link href="/country-guides" className="text-muted-foreground hover:text-primary">Country Guides</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-sm mb-3">Legal</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/editorial-policy" className="text-muted-foreground hover:text-primary">Editorial Policy</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/terms#delivery-refunds" className="text-muted-foreground hover:text-primary">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-sm mb-3">Contact</h2>
            <ul className="space-y-2 text-sm mb-3">
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary">{CONTACT_EMAIL}</a></li>
              {WHATSAPP_NUMBER && <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">WhatsApp us</a></li>}
            </ul>
            <div className="flex items-center gap-2">
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email Move to Istanbul" className="w-11 h-11 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
              <a href={CONCIERGE_URL} target="_blank" rel="noopener noreferrer" aria-label="Move to Istanbul on Instagram" className="w-11 h-11 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              {THREADS_URL && <a href={THREADS_URL} target="_blank" rel="noopener noreferrer" aria-label="Move to Istanbul on Threads" className="w-11 h-11 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><AtSign className="w-5 h-5" /></a>}
              {FACEBOOK_URL && <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Move to Istanbul on Facebook" className="w-11 h-11 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>}
            </div>
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
        <nav aria-label="Popular guides" className="mb-8">
          <h2 className="font-semibold text-sm mb-3">Popular guides</h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {[
              ['/guides/visa', 'Türkiye visa & residence permit'],
              ['/guides/cost-of-living', 'Cost of living in Istanbul'],
              ['/collections/how-to-get-permanent-residency-turkey', 'Permanent residency in Turkey'],
              ['/collections/best-work-cafes-kadikoy', 'Work cafes in Kadıköy'],
              ['/collections/topkapi-sarayi-topkapi-palace', 'Topkapı Palace'],
              ['/collections/yerebatan-sarnici-basilica-cistern', 'Basilica Cistern'],
              ['/collections/kiz-kulesi-maidens-tower', "Maiden's Tower"],
              ['/collections/balat-fener-istanbul-neighborhood-guide', 'Balat & Fener'],
              ['/collections/turk-kahvaltisi-turkish-breakfast-guide', 'Turkish breakfast'],
              ['/collections/hierapolis-guide-pamukkale', 'Hierapolis & Pamukkale'],
              ['/collections/cevahir-avm-sisli-shopping-mall', 'Cevahir AVM'],
            ].map(([href, label]) => (
              <li key={href}><Link href={href} className="text-muted-foreground hover:text-primary">{label}</Link></li>
            ))}
          </ul>
        </nav>
        <Destinations />
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-x-4 gap-y-1">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Move to Istanbul. All rights reserved.</p>
          </div>
          <p className="text-xs text-muted-foreground text-center sm:text-right max-w-md">{AFFILIATE_DISCLOSURE}</p>
        </div>
        <p className="pt-4 text-[11px] leading-relaxed text-muted-foreground/80 text-center sm:text-left">{ADVICE_DISCLAIMER}</p>
      </div>
    </footer>
  );
}
