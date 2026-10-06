import Link from 'next/link';
import { TrendingUp, ExternalLink, ArrowRight, Calculator } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';
import { getLocale } from '@/lib/i18nServer';

// Bilingual page (EN at /guides/kira-artis-orani, TR at
// /tr/guides/kira-artis-orani via the locale middleware -- see
// src/middleware.js / src/lib/i18nServer.js) targeting two different
// audiences with the same underlying TÜİK data:
//   - TR: the high-volume recurring monthly search cluster "kira artış
//     oranı / enflasyon / tüik / tüfe" (Turkish tenants & landlords)
//   - EN: foreign renters on this site's own /guides/housing audience who
//     want to know the legal cap on their own lease renewal
// Figures sourced 2026-10-05 from TÜİK's September 2026 data via
// cnnturk.com, fotomac.com.tr, eneskaplan.av.tr. Update DATA below each
// month when TÜİK publishes a new figure (historically ~5th of the month).
const DATA = {
  asOf: '2026-10-05',
  rentCapRate: '31.49',
  annualCPI: '29.73',
  monthlyCPI: '1.84',
};

const HISTORY = [
  { en: 'January 2026', tr: 'Ocak 2026', rate: '34.88%' },
  { en: 'May 2026', tr: 'Mayıs 2026', rate: '~33%' },
  { en: 'August 2026', tr: 'Ağustos 2026', rate: '~32.1%' },
  { en: 'September 2026', tr: 'Eylül 2026', rate: '31.79%' },
  { en: 'October 2026', tr: 'Ekim 2026', rate: `${DATA.rentCapRate}%` },
];

const CONTENT = {
  en: {
    metaTitle: 'Turkey Rent Increase Rate 2026 (TÜİK / TÜFE) — How Much Can Your Landlord Raise Rent?',
    metaDescription: "Türkiye's legal rent-increase cap for October 2026, explained: TÜİK's inflation data, the 12-month TÜFE average formula, and what it means for your lease renewal.",
    eyebrow: 'Türkiye Economy Guide',
    title: 'Turkey Rent Increase Rate 2026: How Much Can Your Landlord Raise Rent?',
    description: "The current legal cap on rent increases, straight from TÜİK's own inflation data — updated monthly.",
    readTime: '6 min read',
    backLabel: 'All guides',
    sections: [
      { id: 'guncel', label: 'Current Rate' },
      { id: 'tarihce', label: '2026 History' },
      { id: 'hesaplama', label: 'How It’s Calculated' },
      { id: 'faq', label: 'FAQ' },
      { id: 'kaynaklar', label: 'Official Sources' },
    ],
    currentHeading: 'October 2026 Rent Increase Cap',
    currentIntro: "Based on TÜİK's September 2026 inflation release, the legal ceiling for lease renewals dated October 2026 is now confirmed.",
    rentCapLabel: 'Rent Increase Cap',
    rentCapSub: '12-month average TÜFE',
    annualLabel: 'Annual Inflation',
    annualSub: 'September 2026 (annual TÜFE)',
    monthlyLabel: 'Monthly Inflation',
    monthlySub: 'September 2026 (monthly TÜFE)',
    note: <>Note: the rent-increase cap is <strong>not</strong> the same as the headline annual or monthly inflation rate. Turkish law caps rent increases at the <strong>average</strong> of the last 12 months&apos; TÜFE changes — a different, usually lower, number.</>,
    historyHeading: '2026 Rent Increase Rate History',
    historyIntro: 'The 12-month average TÜFE used for rent caps has trended gradually downward through the year:',
    historyMonthCol: 'Period',
    historyRateCol: '12-Month Average TÜFE (Rent Cap)',
    historyFootnote: 'May and August figures are approximate; check TÜİK’s official releases for exact monthly rates.',
    calcHeading: 'How Is the Rent Increase Calculated?',
    calcIntro: "Article 344 of Turkey's Code of Obligations (TBK, Law No. 6098) sets a legal ceiling on rent increases for residential and roofed-commercial leases: the average of the last 12 months' Consumer Price Index (TÜFE) changes, as published by TÜİK.",
    exampleHeading: 'Worked example',
    exampleIntro: 'A lease at 30,000 TRY/month renewing in October 2026:',
    exampleNote: 'A landlord can ask for less than this amount; a demand above it is not legally enforceable.',
    calcFootnote: "This cap applies only to residential and roofed-commercial leases under 5 years old. For leases over 5 years, a judge may apply a different fair-market assessment instead.",
    ctaHeading: 'Renting as a foreigner in Istanbul?',
    ctaBody: 'Our full housing guide covers neighborhood quotas, notary rules, and how to spot an unfair rent-increase demand before you sign.',
    ctaLink: 'Read the Istanbul Housing Guide',
    faqHeading: 'Frequently Asked Questions',
    faqIntro: 'The questions we get most often about Turkey’s rent increase cap and TÜİK inflation data.',
    faq: [
      {
        q: 'What is the October 2026 rent increase rate in Turkey?',
        a: `Based on TÜİK's September 2026 inflation release (published October 5, 2026), the 12-month average TÜFE used as the legal rent cap is ${DATA.rentCapRate}%. This is the maximum a landlord can legally apply to a residential or roofed-commercial lease renewing in October 2026.`,
      },
      {
        q: 'What is TÜİK and what is TÜFE?',
        a: 'TÜİK (Türkiye İstatistik Kurumu) is the Turkish Statistical Institute, the government body that publishes inflation data every month. TÜFE (Tüketici Fiyat Endeksi) is the Consumer Price Index itself — the actual inflation measure TÜİK calculates and releases.',
      },
      {
        q: 'Is the rent cap the same as the inflation rate?',
        a: `No. TÜİK reports several figures each month: the monthly change (${DATA.monthlyCPI}% in September 2026), the annual change (${DATA.annualCPI}%), and the 12-month average (${DATA.rentCapRate}% for October 2026 leases) — it's specifically this last figure, the 12-month average, that Turkish law uses as the rent-increase ceiling.`,
      },
      {
        q: 'Can my landlord raise rent above this rate?',
        a: 'No. Under TBK Article 344, any rent increase above the published 12-month average TÜFE rate is legally unenforceable for residential and roofed-commercial leases. You and your landlord can agree to a lower increase, or none at all, but not a higher one.',
      },
      {
        q: 'Does this rate change every month?',
        a: 'Yes. TÜİK publishes new inflation data roughly on the 3rd-5th of each month, and the 12-month average shifts accordingly. The rate that applies to your lease depends on the month your contract renews — so "October 2026" and "September 2026" rent caps are genuinely different figures.',
      },
    ],
    sourcesHeading: 'Official Sources',
    sourcesIntro: null,
    sources: [
      { label: 'TÜİK — official Consumer Price Index (TÜFE) data releases', href: 'https://www.tuik.gov.tr/' },
      { label: 'Mevzuat.gov.tr — Turkish Code of Obligations (TBK), Article 344', href: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6098&MevzuatTur=1&MevzuatTertip=5' },
    ],
    footnote: `This page was last updated ${DATA.asOf}. Rent caps and inflation figures change every month — always confirm the current rate against TÜİK's official release before relying on it.`,
  },
  tr: {
    metaTitle: 'Kira Artış Oranı 2026 (TÜİK Enflasyon / TÜFE) — Ekim Ayı Hesaplama',
    metaDescription: "TÜİK'in açıkladığı güncel kira artış oranı, eylül ayı enflasyon ve TÜFE verileri, ve 12 aylık ortalamaya göre kira zammı nasıl hesaplanır.",
    eyebrow: 'Türkiye Ekonomi Rehberi',
    title: 'Kira Artış Oranı 2026: TÜİK Enflasyon ve TÜFE Verileri',
    description: 'Güncel kira artış oranı, aylık TÜİK enflasyon verileri ve 12 aylık ortalamaya göre kira zammı hesaplama rehberi.',
    readTime: '6 dk okuma',
    backLabel: 'Tüm rehberler',
    sections: [
      { id: 'guncel', label: 'Güncel Oran' },
      { id: 'tarihce', label: '2026 Tarihçesi' },
      { id: 'hesaplama', label: 'Nasıl Hesaplanır' },
      { id: 'faq', label: 'Sık Sorulanlar' },
      { id: 'kaynaklar', label: 'Resmî Kaynaklar' },
    ],
    currentHeading: 'Ekim 2026 Kira Artış Oranı',
    currentIntro: "TÜİK'in 05.10.2026 tarihinde açıkladığı eylül ayı enflasyon verilerine göre, ekim 2026'da yenilenen konut ve çatılı işyeri kira sözleşmeleri için geçerli yasal tavan oran netleşti.",
    rentCapLabel: 'Kira Artış Oranı',
    rentCapSub: '12 aylık ortalama TÜFE',
    annualLabel: 'Yıllık Enflasyon',
    annualSub: 'Eylül 2026 (yıllık TÜFE)',
    monthlyLabel: 'Aylık Enflasyon',
    monthlySub: 'Eylül 2026 (aylık TÜFE)',
    note: <>Not: Kira artış oranı ile yıllık/aylık TÜFE oranı birbirinden farklıdır. Kira zammında esas alınan oran, TBK 344 kapsamında son 12 ayın TÜFE değişimlerinin <strong>ortalamasıdır</strong> — tek bir ayın enflasyon verisi değildir.</>,
    historyHeading: '2026 Yılı Kira Artış Oranı Tarihçesi',
    historyIntro: 'Kira artışında esas alınan 12 aylık ortalama TÜFE, yıl boyunca kademeli olarak düşüş eğilimi gösterdi:',
    historyMonthCol: 'Dönem',
    historyRateCol: '12 Aylık Ortalama TÜFE (Kira Artış Oranı)',
    historyFootnote: "Mayıs ve ağustos rakamları yaklaşık değerlerdir; kesin aylık oranlar için TÜİK'in resmi veri yayınlarına bakın.",
    calcHeading: 'Kira Artışı Nasıl Hesaplanır?',
    calcIntro: "6098 sayılı Türk Borçlar Kanunu'nun (TBK) 344. maddesi, konut ve çatılı işyeri kiralarında uygulanacak artış oranına yasal bir tavan koyar: TÜİK tarafından açıklanan son 12 ayın Tüketici Fiyat Endeksi (TÜFE) değişim oranlarının ortalaması.",
    exampleHeading: 'Örnek hesaplama',
    exampleIntro: "Aylık kira: 30.000 TL olan bir sözleşme ekim 2026'da yenileniyorsa:",
    exampleNote: 'Ev sahibi bu tutarın altında bir artış talep edebilir; üzerinde bir artış talebi geçersizdir.',
    calcFootnote: 'Bu oran yalnızca konut ve çatılı işyeri kiraları için geçerlidir ve beş yılı aşmamış sözleşmelerde uygulanır; beş yılı aşan kira sözleşmelerinde hâkim rayiç bedele göre farklı bir değerlendirme yapabilir.',
    ctaHeading: "Yabancı bir kiracıyla mı uğraşıyorsunuz, yoksa siz mi İstanbul'a taşınıyorsunuz?",
    ctaBody: "Move to Istanbul, yabancıların İstanbul'da ev kiralama sürecini, mahalle kotalarını ve noter işlemlerini adım adım anlattığı İngilizce bir rehber de sunuyor.",
    ctaLink: "İstanbul'da Ev Kiralama Rehberini Görüntüle",
    faqHeading: 'Sık Sorulan Sorular',
    faqIntro: 'Kira artış oranı, TÜİK ve TÜFE hakkında en çok sorulan sorular.',
    faq: [
      {
        q: 'Ekim ayı kira artış oranı 2026 yüzde kaç oldu?',
        a: `TÜİK'in 5 Ekim 2026'da açıkladığı eylül ayı enflasyon verilerine göre, kira artışında esas alınan 12 aylık ortalama TÜFE yüzde ${DATA.rentCapRate} olarak gerçekleşti. Bu oran, ekim ayında yenilenen konut ve çatılı işyeri kira sözleşmeleri için yasal tavan artış oranıdır.`,
      },
      {
        q: 'Eylül ayı enflasyon oranı (TÜFE) ne kadar oldu?',
        a: `TÜİK verilerine göre eylül 2026'da aylık TÜFE artışı yüzde ${DATA.monthlyCPI}, yıllık (12 aylık) enflasyon oranı ise yüzde ${DATA.annualCPI} olarak açıklandı. Kira artışında kullanılan oran ise bunlardan farklı olarak son 12 ayın TÜFE ortalamasıdır (yüzde ${DATA.rentCapRate}).`,
      },
      {
        q: 'Kira artış oranı nasıl hesaplanır?',
        a: "6098 sayılı Türk Borçlar Kanunu'nun (TBK) 344. maddesine göre, konut ve çatılı işyeri kiralarında uygulanacak artış oranı, TÜİK tarafından açıklanan son 12 ayın Tüketici Fiyat Endeksi (TÜFE) değişim oranlarının ortalamasını aşamaz. Bu, aylık veya yıllık TÜFE oranından farklı bir 'oniki aylık ortalamalara göre değişim' hesabıdır ve her ay güncellenir.",
      },
      {
        q: 'TÜİK ile TÜFE arasındaki fark nedir?',
        a: "TÜİK (Türkiye İstatistik Kurumu), enflasyon verilerini her ay açıklayan resmi devlet kurumudur. TÜFE (Tüketici Fiyat Endeksi) ise TÜİK'in hesapladığı, hanehalkının satın aldığı mal ve hizmetlerin fiyat değişimini ölçen endeksin adıdır. Kısaca TÜİK kurumun adı, TÜFE ise o kurumun yayınladığı enflasyon endeksidir.",
      },
      {
        q: 'Ev sahibi kira artış oranının üzerinde zam isteyebilir mi?',
        a: "Hayır. TBK 344. madde kapsamında, taraflar kira artışında bu oranın altında bir artış üzerinde serbestçe anlaşabilir, ancak TÜİK'in açıkladığı 12 aylık ortalama TÜFE oranının üzerindeki bir artış talebi geçersizdir ve hukuken uygulanamaz. Kiracı bu oranı kanıtlayarak itiraz edebilir.",
      },
      {
        q: 'Kira artış oranı her kira sözleşmesi için aynı mı?',
        a: "Hayır. Oran, sözleşmenin yenilendiği aya göre değişir -- yani eylülde yenilenen bir sözleşmede eylül ayına ait 12 aylık ortalama TÜFE, ekimde yenilenen bir sözleşmede ise ekim ayına ait oran esas alınır. Bu yüzden 'ekim ayı kira artış oranı' ve 'eylül ayı kira artış oranı' her ay farklı başlıklar altında haber olur.",
      },
    ],
    sourcesHeading: 'Resmî Kaynaklar',
    sourcesIntro: null,
    sources: [
      { label: 'TÜİK — Tüketici Fiyat Endeksi (TÜFE) resmi veri yayınları', href: 'https://www.tuik.gov.tr/' },
      { label: '6098 sayılı Türk Borçlar Kanunu, Madde 344', href: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6098&MevzuatTur=1&MevzuatTertip=5' },
    ],
    footnote: `Bu sayfa ${DATA.asOf.split('-').reverse().join('.')} tarihinde güncellendi. Kira artış oranı ve enflasyon verileri her ay değişir — güncel ve kesin oranlar için her zaman TÜİK'in resmi açıklamalarını kontrol edin.`,
  },
};

export async function generateMetadata() {
  const locale = await getLocale();
  const c = CONTENT[locale];
  return {
    title: `${c.metaTitle} | Move to Istanbul`,
    description: c.metaDescription,
    alternates: {
      canonical: locale === 'tr' ? '/tr/guides/kira-artis-orani' : '/guides/kira-artis-orani',
      languages: {
        en: '/guides/kira-artis-orani',
        tr: '/tr/guides/kira-artis-orani',
      },
    },
  };
}

export default async function KiraArtisOraniPage() {
  const locale = await getLocale();
  const c = CONTENT[locale];
  const prefix = locale === 'tr' ? '/tr' : '';

  return (
    <GuideLayout
      eyebrow={c.eyebrow}
      title={c.title}
      description={c.description}
      readTime={c.readTime}
      updated={DATA.asOf}
      backHref={`${prefix}/guides`}
      backLabel={c.backLabel}
      sections={c.sections}
    >
      {/* Current rate callout */}
      <section id="guncel">
        <h2 className="text-2xl font-bold mb-4">{c.currentHeading}</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">{c.currentIntro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary mb-1"><TrendingUp className="w-3.5 h-3.5" /> {c.rentCapLabel}</p>
            <p className="text-2xl font-bold">%{DATA.rentCapRate}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.rentCapSub}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{c.annualLabel}</p>
            <p className="text-2xl font-bold">%{DATA.annualCPI}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.annualSub}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{c.monthlyLabel}</p>
            <p className="text-2xl font-bold">%{DATA.monthlyCPI}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.monthlySub}</p>
          </div>
        </div>
        <p className="text-xs text-foreground/70 leading-relaxed bg-muted/50 rounded-lg p-3">{c.note}</p>
      </section>

      {/* History table */}
      <section id="tarihce">
        <h2 className="text-2xl font-bold mb-4">{c.historyHeading}</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">{c.historyIntro}</p>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold">{c.historyMonthCol}</th>
                <th className="px-4 py-3 font-semibold">{c.historyRateCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {HISTORY.map((row) => (
                <tr key={row.en}>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{locale === 'tr' ? row.tr : row.en}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{c.historyFootnote}</p>
      </section>

      {/* Calculation methodology */}
      <section id="hesaplama">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="w-5 h-5 text-primary" /> {c.calcHeading}</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">{c.calcIntro}</p>
        <div className="rounded-2xl border border-border bg-card p-5 mb-4">
          <p className="text-sm font-semibold mb-2">{c.exampleHeading}</p>
          <p className="text-sm text-foreground/80 leading-relaxed">{c.exampleIntro}</p>
          <p className="text-sm text-foreground/80 leading-relaxed mt-2 font-mono bg-muted/50 rounded-lg p-3">
            30.000 TL × (1 + %{DATA.rentCapRate}) ≈ 39.447 TL
          </p>
          <p className="text-xs text-muted-foreground mt-2">{c.exampleNote}</p>
        </div>
        <p className="text-foreground/80 leading-relaxed">{c.calcFootnote}</p>
      </section>

      {/* Housing-guide CTA, ties this page back to the site's core offer in whichever language fits the page (TR readers get the EN housing guide pitched as a cross-link; EN readers get a direct CTA) */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">{c.ctaHeading}</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">{c.ctaBody}</p>
        <Link href="/guides/housing" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          {c.ctaLink} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* FAQ */}
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">{c.faqHeading}</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">{c.faqIntro}</p>
        <GuideFAQ items={c.faq} />
      </section>

      {/* Official sources */}
      <section id="kaynaklar">
        <h2 className="text-2xl font-bold mb-4">{c.sourcesHeading}</h2>
        <ul className="space-y-2.5 mb-4">
          {c.sources.map((s) => (
            <li key={s.href} className="text-sm text-foreground/80 leading-relaxed">
              {s.label} —{' '}
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                {s.href.replace(/^https?:\/\//, '').replace(/\/$/, '')} <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground leading-relaxed">{c.footnote}</p>
      </section>
    </GuideLayout>
  );
}
