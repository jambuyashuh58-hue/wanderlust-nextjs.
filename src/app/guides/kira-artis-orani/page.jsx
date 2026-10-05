import Link from 'next/link';
import { TrendingUp, ExternalLink, ArrowRight, Calculator } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

// Turkish-language reference page targeting the monthly "kira artış oranı /
// enflasyon / TÜİK / TÜFE" search cluster -- a different audience (Turkish
// tenants & landlords) than the rest of /guides (foreign relocators), but a
// high-volume recurring search every month when TÜİK publishes CPI data.
// Figures below are sourced and dated; update MONTHLY_DATA + the landscape
// paragraph each time TÜİK publishes a new figure (historically ~5th of the
// month). Sources: cnnturk.com, fotomac.com.tr, eneskaplan.av.tr (2026-10-05).
export const metadata = {
  title: 'Kira Artış Oranı 2026 (TÜİK Enflasyon / TÜFE) — Ekim Ayı Hesaplama | Move to Istanbul',
  description: "TÜİK'in açıkladığı güncel kira artış oranı, eylül ayı enflasyon ve TÜFE verileri, ve 12 aylık ortalamaya göre kira zammı nasıl hesaplanır.",
};

const MONTHLY_DATA = {
  asOf: '2026-10-05',
  currentMonth: 'Ekim 2026',
  dataMonth: 'Eylül 2026',
  rentCapRate: '31,49%',
  annualCPI: '29,73%',
  monthlyCPI: '1,84%',
};

const HISTORY = [
  { month: 'Ocak 2026', rate: '34,88%' },
  { month: 'Mayıs 2026', rate: '~33%' },
  { month: 'Ağustos 2026', rate: '~32,1%' },
  { month: 'Eylül 2026', rate: '31,79%' },
  { month: 'Ekim 2026', rate: '31,49%' },
];

const FAQ = [
  {
    q: 'Ekim ayı kira artış oranı 2026 yüzde kaç oldu?',
    a: `TÜİK'in 5 Ekim 2026'da açıkladığı eylül ayı enflasyon verilerine göre, kira artışında esas alınan 12 aylık ortalama TÜFE yüzde ${MONTHLY_DATA.rentCapRate} olarak gerçekleşti. Bu oran, ekim ayında yenilenen konut ve çatılı işyeri kira sözleşmeleri için yasal tavan artış oranıdır.`,
  },
  {
    q: 'Eylül ayı enflasyon oranı (TÜFE) ne kadar oldu?',
    a: `TÜİK verilerine göre eylül 2026'da aylık TÜFE artışı yüzde ${MONTHLY_DATA.monthlyCPI}, yıllık (12 aylık) enflasyon oranı ise yüzde ${MONTHLY_DATA.annualCPI} olarak açıklandı. Kira artışında kullanılan oran ise bunlardan farklı olarak son 12 ayın TÜFE ortalamasıdır (yüzde ${MONTHLY_DATA.rentCapRate}).`,
  },
  {
    q: 'Kira artış oranı nasıl hesaplanır?',
    a: "6098 sayılı Türk Borçlar Kanunu'nun (TBK) 344. maddesine göre, konut ve çatılı işyeri kiralarında uygulanacak artış oranı, TÜİK tarafından açıklanan son 12 ayın Tüketici Fiyat Endeksi (TÜFE) değişim oranlarının ortalamasını aşamaz. Bu, aylık veya yıllık TÜFE oranından farklı bir 'oniki aylık ortalamalara göre değişim' hesabıdır ve her ay güncellenir.",
  },
  {
    q: "TÜİK ile TÜFE arasındaki fark nedir?",
    a: "TÜİK (Türkiye İstatistik Kurumu), enflasyon verilerini her ay açıklayan resmi devlet kurumudur. TÜFE (Tüketici Fiyat Endeksi) ise TÜİK'in hesapladığı, hanehalkının satın aldığı mal ve hizmetlerin fiyat değişimini ölçen endeksin adıdır. Kısaca TÜİK kurumun adı, TÜFE ise o kurumun yayınladığı enflasyon endeksidir.",
  },
  {
    q: 'Ev sahibi kira artış oranının üzerinde zam isteyebilir mi?',
    a: "Hayır. TBK 344. madde kapsamında, taraflar kira artışında bu oranın altında bir artış üzerinde serbestçe anlaşabilir, ancak TÜİK'in açıkladığı 12 aylık ortalama TÜFE oranının üzerindeki bir artış talebi geçersizdir ve hukuken uygulanamaz. Kiracı bu oranı kanıtlayarak itiraz edebilir.",
  },
  {
    q: 'Kira artış oranı her kira sözleşmesi için aynı mı?',
    a: "Hayır. Oran, sözleşmenin yenilendiği aya göre değişir -- yani eylülde yenilenen bir sözleşmede eylül ayına ait 12 aylık ortalama TÜFE, ekimde yenilenen bir sözleşmede ise ekim ayına ait oran esas alınır. Bu yüzde 'ekim ayı kira artış oranı' ve 'eylül ayı kira artış oranı' her ay farklı başlıklar altında haber olur.",
  },
];

export default function KiraArtisOraniPage() {
  return (
    <GuideLayout
      eyebrow="Türkiye Ekonomi Rehberi"
      title="Kira Artış Oranı 2026: TÜİK Enflasyon ve TÜFE Verileri"
      description="Güncel kira artış oranı, aylık TÜİK enflasyon verileri ve 12 aylık ortalamaya göre kira zammı hesaplama rehberi."
      readTime="6 dk okuma"
      updated={MONTHLY_DATA.asOf}
      sections={[
        { id: 'guncel', label: 'Güncel Oran' },
        { id: 'tarihce', label: '2026 Tarihçesi' },
        { id: 'hesaplama', label: 'Nasıl Hesaplanır' },
        { id: 'faq', label: 'Sık Sorulanlar' },
        { id: 'kaynaklar', label: 'Resmî Kaynaklar' },
      ]}
    >
      {/* Current rate callout */}
      <section id="guncel">
        <h2 className="text-2xl font-bold mb-4">{MONTHLY_DATA.currentMonth} Kira Artış Oranı</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          TÜİK&apos;in {MONTHLY_DATA.asOf.split('-').reverse().join('.')} tarihinde açıkladığı {MONTHLY_DATA.dataMonth.toLowerCase()} enflasyon verilerine göre, {MONTHLY_DATA.currentMonth.toLowerCase()}da yenilenen konut ve çatılı işyeri kira sözleşmeleri için geçerli yasal tavan oran netleşti.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary mb-1"><TrendingUp className="w-3.5 h-3.5" /> Kira Artış Oranı</p>
            <p className="text-2xl font-bold">%{MONTHLY_DATA.rentCapRate.replace('%', '')}</p>
            <p className="text-xs text-muted-foreground mt-1">12 aylık ortalama TÜFE</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Yıllık Enflasyon</p>
            <p className="text-2xl font-bold">%{MONTHLY_DATA.annualCPI.replace('%', '')}</p>
            <p className="text-xs text-muted-foreground mt-1">{MONTHLY_DATA.dataMonth} (yıllık TÜFE)</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Aylık Enflasyon</p>
            <p className="text-2xl font-bold">%{MONTHLY_DATA.monthlyCPI.replace('%', '')}</p>
            <p className="text-xs text-muted-foreground mt-1">{MONTHLY_DATA.dataMonth} (aylık TÜFE)</p>
          </div>
        </div>
        <p className="text-xs text-foreground/70 leading-relaxed bg-muted/50 rounded-lg p-3">
          Not: Kira artış oranı ile yıllık/aylık TÜFE oranı birbirinden farklıdır. Kira zammında esas alınan oran, TBK 344 kapsamında son 12 ayın TÜFE değişimlerinin <strong>ortalamasıdır</strong> — tek bir ayın enflasyon verisi değildir.
        </p>
      </section>

      {/* History table */}
      <section id="tarihce">
        <h2 className="text-2xl font-bold mb-4">2026 Yılı Kira Artış Oranı Tarihçesi</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Kira artışında esas alınan 12 aylık ortalama TÜFE, yıl boyunca kademeli olarak düşüş eğilimi gösterdi:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold">Dönem</th>
                <th className="px-4 py-3 font-semibold">12 Aylık Ortalama TÜFE (Kira Artış Oranı)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {HISTORY.map((row) => (
                <tr key={row.month}>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{row.month}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
          Mayıs ve ağustos rakamları yaklaşık değerlerdir; kesin aylık oranlar için TÜİK&apos;in resmi veri yayınlarına bakın.
        </p>
      </section>

      {/* Calculation methodology */}
      <section id="hesaplama">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="w-5 h-5 text-primary" /> Kira Artışı Nasıl Hesaplanır?</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          6098 sayılı Türk Borçlar Kanunu&apos;nun (TBK) 344. maddesi, konut ve çatılı işyeri kiralarında uygulanacak artış oranına yasal bir tavan koyar: TÜİK tarafından açıklanan son 12 ayın Tüketici Fiyat Endeksi (TÜFE) değişim oranlarının ortalaması.
        </p>
        <div className="rounded-2xl border border-border bg-card p-5 mb-4">
          <p className="text-sm font-semibold mb-2">Örnek hesaplama</p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Aylık kira: 30.000 TL olan bir sözleşme {MONTHLY_DATA.currentMonth.toLowerCase()}da yenileniyorsa:
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed mt-2 font-mono bg-muted/50 rounded-lg p-3">
            30.000 TL × (1 + %{MONTHLY_DATA.rentCapRate.replace('%', '')}) ≈ 39.447 TL (yasal azami yeni kira)
          </p>
          <p className="text-xs text-muted-foreground mt-2">Ev sahibi bu tutarın altında bir artış talep edebilir; üzerinde bir artış talebi geçersizdir.</p>
        </div>
        <p className="text-foreground/80 leading-relaxed">
          Bu oran yalnızca konut ve çatılı işyeri kiraları için geçerlidir ve beş yılı aşmamış sözleşmelerde uygulanır; beş yılı aşan kira sözleşmelerinde hâkim rayiç bedele göre farklı bir değerlendirme yapabilir.
        </p>
      </section>

      {/* Housing-guide CTA, ties this Turkish-local content back to the site's core expat offer */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Yabancı bir kiracıyla mı uğraşıyorsunuz, yoksa siz mi İstanbul&apos;a taşınıyorsunuz?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Move to Istanbul, yabancıların İstanbul&apos;da ev kiralama sürecini, mahalle kotalarını ve noter işlemlerini adım adım anlattığı İngilizce bir rehber de sunuyor.
        </p>
        <Link href="/guides/housing" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          İstanbul&apos;da Ev Kiralama Rehberini Görüntüle <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* FAQ */}
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Sık Sorulan Sorular</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">Kira artış oranı, TÜİK ve TÜFE hakkında en çok sorulan sorular.</p>
        <GuideFAQ items={FAQ} />
      </section>

      {/* Official sources */}
      <section id="kaynaklar">
        <h2 className="text-2xl font-bold mb-4">Resmî Kaynaklar</h2>
        <ul className="space-y-2.5 mb-4">
          <li className="text-sm text-foreground/80 leading-relaxed">
            TÜİK — Tüketici Fiyat Endeksi (TÜFE) resmi veri yayınları —{' '}
            <a href="https://www.tuik.gov.tr/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              tuik.gov.tr <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li className="text-sm text-foreground/80 leading-relaxed">
            Mevzuat.gov.tr — 6098 sayılı Türk Borçlar Kanunu, Madde 344 —{' '}
            <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6098&MevzuatTur=1&MevzuatTertip=5" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              mevzuat.gov.tr <ExternalLink className="w-3 h-3" />
            </a>
          </li>
        </ul>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Bu sayfa {MONTHLY_DATA.asOf.split('-').reverse().join('.')} tarihinde güncellendi. Kira artış oranı ve enflasyon verileri her ay değişir — güncel ve kesin oranlar için her zaman TÜİK&apos;in resmi açıklamalarını kontrol edin.
        </p>
      </section>
    </GuideLayout>
  );
}
