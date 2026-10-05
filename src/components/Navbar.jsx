'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, Sparkles, Instagram, Languages, ChevronDown, Map, FileText, Home as HomeIcon, Wallet, PackageCheck, Laptop, FileCheck2 } from 'lucide-react';
import { t } from '@/lib/i18n';

const CONCIERGE_URL = 'https://www.instagram.com/move_istanbul';

export default function Navbar({ locale = 'en' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [relocateOpen, setRelocateOpen] = useState(false);
  const relocateRef = useRef(null);
  const pathname = usePathname();

  // Every link below needs the /tr prefix while browsing the Turkish site --
  // built once here rather than baked into a static NAV_LINKS array, since
  // the prefix depends on the current locale.
  const prefix = locale === 'tr' ? '/tr' : '';
  const NAV_LINKS = [
    { label: t('nav_discover', locale), path: `${prefix}/discover` },
    { label: t('nav_collections', locale), path: `${prefix}/collections` },
    { label: t('nav_guides', locale), path: `${prefix}/guides` },
    { label: t('nav_country_guides', locale), path: `${prefix}/country-guides` },
    { label: t('nav_itinerary', locale), path: `${prefix}/itinerary` },
    { label: t('nav_dashboard', locale), path: `${prefix}/dashboard` },
    { label: t('nav_concierge', locale), path: `${prefix}/services` },
  ];
  // The relocation cluster (moving-to-turkiye, visa-residence, housing,
  // cost-of-living, after-you-land, istanbul-for-digital-nomads) lives under
  // a single "Relocate" dropdown rather than six more flat NAV_LINKS entries
  // -- the bar is already tight at 7 items, and these all share one theme.
  const RELOCATE_LINKS = [
    { label: 'Moving to Türkiye', path: `${prefix}/moving-to-turkiye`, icon: Map },
    { label: 'Visa & Residence', path: `${prefix}/visa-residence`, icon: FileText },
    { label: 'Housing', path: `${prefix}/housing`, icon: HomeIcon },
    { label: 'Cost of Living', path: `${prefix}/cost-of-living`, icon: Wallet },
    { label: 'After You Land', path: `${prefix}/after-you-land`, icon: PackageCheck },
    { label: 'For Digital Nomads', path: `${prefix}/istanbul-for-digital-nomads`, icon: Laptop },
  ];
  // Strip the current locale's prefix to get the "bare" path, then rebuild
  // it under the other locale -- this is what the EN/TR toggle links to.
  const barePath = (pathname?.startsWith('/tr') ? pathname.slice(3) : pathname) || '/';
  const otherLocaleHref = locale === 'tr' ? (barePath || '/') : `/tr${barePath === '/' ? '' : barePath}`;

  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  // Lock body scroll while the mobile menu is open, and close it on route
  // change -- otherwise the page underneath keeps scrolling behind the menu.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);
  useEffect(() => { setMobileOpen(false); setRelocateOpen(false); }, [pathname]);
  // Close the Relocate dropdown on an outside click -- a hover-only dropdown
  // doesn't work on touch devices, so this is click-to-open/click-outside-to-close.
  useEffect(() => {
    if (!relocateOpen) return;
    const onClick = (e) => { if (relocateRef.current && !relocateRef.current.contains(e.target)) setRelocateOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [relocateOpen]);
  const isActive = (path) => pathname === path;
  const isRelocateActive = RELOCATE_LINKS.some((l) => pathname?.startsWith(l.path));

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass ${scrolled ? 'shadow-sm shadow-black/5' : ''}`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href={prefix || '/'} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform"><Compass className="w-5 h-5 text-white" /></div>
              <span className="text-lg font-bold tracking-tight">Move to Istanbul</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.slice(0, 4).map(link => <Link key={link.path} href={link.path} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive(link.path) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'}`}>{link.label}</Link>)}
              <div className="relative" ref={relocateRef}>
                <button
                  type="button"
                  onClick={() => setRelocateOpen((v) => !v)}
                  aria-expanded={relocateOpen}
                  className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isRelocateActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'}`}
                >
                  Relocate <ChevronDown className={`w-3.5 h-3.5 transition-transform ${relocateOpen ? 'rotate-180' : ''}`} />
                </button>
                {relocateOpen && (
                  <div className="absolute top-full left-0 mt-2 w-60 rounded-2xl border border-border bg-card shadow-lg p-2 z-50">
                    {RELOCATE_LINKS.map((link) => (
                      <Link key={link.path} href={link.path} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/90 hover:bg-muted/60 transition-colors">
                        <link.icon className="w-4 h-4 text-primary shrink-0" /> {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {NAV_LINKS.slice(4).map(link => <Link key={link.path} href={link.path} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive(link.path) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'}`}>{link.label}</Link>)}
            </nav>
            <div className="flex items-center gap-2">
              <Link href={otherLocaleHref} className="hidden md:inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors" title={locale === 'tr' ? 'Switch to English' : "Türkçe'ye geç"}>
                <Languages className="w-3.5 h-3.5" /> {locale === 'tr' ? 'EN' : 'TR'}
              </Link>
              <Link href={`${prefix}/services`} className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-colors">
                <FileCheck2 className="w-4 h-4" /> Start Your Move File
              </Link>
              <Link href={`${prefix}/onboarding`} className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                <Sparkles className="w-4 h-4" /> {t('plan_my_trip', locale)}
              </Link>
              <a href={CONCIERGE_URL} target="_blank" rel="noopener noreferrer" aria-label="Follow Move to Istanbul on Instagram" className="w-11 h-11 flex items-center justify-center rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"><Instagram className="w-5 h-5" /></a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-muted/60"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      {mobileOpen && (
        // Solid (not translucent) full-height panel -- a glass/blur
        // background here let the page content bleed through and read as
        // broken, since (unlike the slim header bar) this covers most of
        // the screen. overflow-y-auto lets a tall link list scroll on its
        // own if it ever exceeds the viewport height.
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 md:hidden bg-background border-t border-border overflow-y-auto">
          <nav className="flex flex-col p-4 gap-1">
            {NAV_LINKS.slice(0, 4).map(link => <Link key={link.path} href={link.path} className={`px-4 py-3 rounded-xl font-medium transition-colors ${isActive(link.path) ? 'text-primary bg-primary/10' : 'hover:bg-muted'}`}>{link.label}</Link>)}
            <p className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Relocate</p>
            {RELOCATE_LINKS.map((link) => (
              <Link key={link.path} href={link.path} className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium transition-colors ${isActive(link.path) ? 'text-primary bg-primary/10' : 'hover:bg-muted'}`}>
                <link.icon className="w-4 h-4 text-primary shrink-0" /> {link.label}
              </Link>
            ))}
            <div className="h-px bg-border my-1" />
            {NAV_LINKS.slice(4).map(link => <Link key={link.path} href={link.path} className={`px-4 py-3 rounded-xl font-medium transition-colors ${isActive(link.path) ? 'text-primary bg-primary/10' : 'hover:bg-muted'}`}>{link.label}</Link>)}
            <Link href={`${prefix}/services`} className="mt-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border-2 border-primary text-primary font-semibold">
              <FileCheck2 className="w-4 h-4" /> Start Your Move File
            </Link>
            <Link href={otherLocaleHref} className="mt-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-border font-semibold">
              <Languages className="w-4 h-4" /> {locale === 'tr' ? 'View in English' : "Türkçe'yi görüntüle"}
            </Link>
            <Link href={`${prefix}/onboarding`} className="mt-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-gradient-primary text-white font-semibold">
              <Sparkles className="w-4 h-4" /> {t('plan_my_trip', locale)}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
