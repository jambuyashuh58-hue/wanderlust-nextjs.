import Link from 'next/link';
import { CheckCircle2, GraduationCap, ArrowRight, MapPin } from 'lucide-react';
import GuideLayout from '@/components/GuideLayout';
import GuideFAQ from '@/components/GuideFAQ';

export const metadata = {
  title: 'International Schools in Istanbul for Expat Families: 2026 Guide | Move to Istanbul',
  description: 'Curricula, top schools by district, 2026 tuition benchmarks, and the e-İkamet rules for enrolling your children in Istanbul.',
};

const CURRICULA = [
  { name: 'International Baccalaureate (IB)', detail: 'Primary Years Programme (PYP), Middle Years Programme (MYP), and the IB Diploma Programme (IBDP).' },
  { name: 'British National Curriculum', detail: 'Cambridge Assessment International Education — IGCSE and A-Levels.' },
  { name: 'American Curriculum', detail: 'US High School Diploma with Advanced Placement (AP) courses.' },
  { name: 'National European Systems', detail: "France's Lycée system or Germany's national curriculum (Abitur track)." },
];

const SCHOOLS_EN = [
  { name: 'Istanbul International Community School (IICS)', curriculum: 'Full IB World School (PYP, MYP, IBDP)', location: 'West Campus (Büyükçekmece), City Campus (Sarıyer/Hisar)', note: 'One of the oldest purely international schools in Istanbul, exclusively admitting foreign passport holders.' },
  { name: 'British International School Istanbul (BISI)', curriculum: 'British National Curriculum, IGCSE, IB Diploma', location: 'Zekeriyaköy (Primary & Secondary), City Campus', note: 'High academic reputation, diverse international student body, extensive co-curricular programs.' },
  { name: 'MEF International School', curriculum: 'IB World School & Cambridge International Curriculum', location: 'Etiler (Beşiktaş)', note: 'Highly accessible central location — ideal for families in Levent, Maslak, or Beşiktaş.' },
  { name: 'Tarabya British Schools (TBS)', curriculum: 'Dual Cambridge IGCSE / A-Levels with global university prep', location: 'Tarabya & Yeniköy (Sarıyer Bosphorus corridor)', note: null },
];

const SCHOOLS_NATIONAL = [
  { name: 'Lycée Français Pierre Loti', detail: 'French national curriculum, accredited by AEFE. Campuses in Beyoğlu and Tarabya.' },
  { name: 'Özel Alman Lisesi / Deutsche Schule Istanbul', detail: 'German curriculum leading to the Abitur. Located in Beyoğlu.' },
];

const TUITION = [
  { tier: 'Tier 1 Global IB/British (IICS, BISI)', range: '$22,000 – $38,000/year', extra: 'Capital/building fee ($2,000–$5,000 entry), application fee' },
  { tier: 'Tier 2 International (MEF, TBS)', range: '$12,000 – $22,000/year', extra: 'Registration deposit, technology fee' },
  { tier: 'National European (Pierre Loti)', range: '€8,000 – €16,000/year', extra: 'Association fees, language support fees' },
];

const ANCILLARY = [
  { item: 'School bus transportation (Servis)', cost: '$1,500 – $3,500/child/year', note: 'Mandatory for most families given Istanbul traffic.' },
  { item: 'School meals (Yemek)', cost: '$800 – $1,800/child/year', note: 'Annual hot lunch plans.' },
  { item: 'Uniforms & books', cost: '$400 – $1,000/year', note: null },
];

const DOCUMENTS = [
  { title: 'Approved Birth Certificate (Doğum Belgesi)', body: "Must contain both parents' names, bear an official Apostille (or consular legalization), and include a notarized Turkish translation." },
  { title: 'Parental Consent (Muvafakatname)', body: 'In cases of divorce or single-parent relocation, an Apostilled custody document or notarized consent form from the non-accompanying parent is legally required.' },
  { title: 'Diploma Equalization (Denklik Belgesi)', body: 'To transition into local or dual-curriculum programs, academic transcripts must undergo diploma equalization through the Provincial Directorate of National Education (İl Milli Eğitim Müdürlüğü).' },
];

const NEIGHBORHOODS = [
  { area: 'Sarıyer / Zekeriyaköy / Üsküdar', schools: 'BISI, IICS Sarıyer, Tarabya British Schools', note: 'Suburban villa compounds, green space, air quality away from the city center.' },
  { area: 'Beşiktaş / Etiler / Bebek', schools: 'MEF International School', note: 'Central living, close to financial districts (Levent/Maslak).' },
  { area: 'Beyoğlu / Şişli', schools: 'Pierre Loti (Beyoğlu campus), Deutsche Schule', note: null },
];

const CHECKLIST = [
  { when: '12–6 Months Before', what: 'Request official school transcripts and secure Apostilles on all report cards and birth certificates.' },
  { when: '4–3 Months Before', what: 'Complete school virtual tours, submit admissions applications, and pay entry deposits.' },
  { when: '2 Months Before', what: 'Map housing options within a 20–30 minute school bus (servis) radius.' },
  { when: '1 Month Before', what: 'Verify your prospective rental property is in an open district for residency registration (ikamet).' },
  { when: 'Arrival Week', what: 'Obtain your UAVT electronic address from PTT and file family residence permit applications on e-ikamet.goc.gov.tr.' },
];

const FAQ = [
  {
    q: 'Do foreign children automatically get education rights with a Family Residence Permit?',
    a: "Yes. Foreign children holding a valid Family Residence Permit (Aile İkamet İzni) are entitled to primary and secondary education rights until age 18, without needing a separate Student Residence Permit.",
  },
  {
    q: 'What documents do I need for my child’s residency, specifically?',
    a: "An Apostilled birth certificate with a notarized Turkish translation, naming both parents; if only one parent is relocating (divorce or single-parent moves), an Apostilled custody document or notarized consent from the non-accompanying parent; and, if transitioning into a local or dual-curriculum program, a diploma equalization (Denklik Belgesi) from the Provincial Directorate of National Education.",
  },
  {
    q: 'Why does the neighborhood I choose matter so much for schooling?',
    a: "Istanbul traffic makes commute time one of the biggest quality-of-life factors for school-age families, and the residence permit rules add a second constraint: the neighborhood on your lease must not be on the Migration Directorate's closed-districts (Kapalı Mahalleler) list, or your family's residence permit application will be rejected regardless of how good the school commute is.",
  },
  {
    q: 'How much should I budget beyond tuition?',
    a: 'Plan for school bus transport ($1,500–$3,500/child/year — effectively mandatory given traffic), hot lunch plans ($800–$1,800/child/year), and uniforms/books ($400–$1,000/year), on top of the published tuition tier and any entry capital/building fee.',
  },
];

export default function InternationalSchoolsGuidePage() {
  return (
    <GuideLayout
      eyebrow="Family Relocation Guide"
      title="International Schools in Istanbul for Expat Families: 2026 Guide"
      description="Curricula, top schools by district, tuition benchmarks, and the residence-permit rules for enrolling your children."
      readTime="8 min read"
      updated={new Date().toISOString().slice(0, 10)}
      sections={[
        { id: 'overview', label: 'Curricula Overview' },
        { id: 'schools', label: 'Top Schools' },
        { id: 'tuition', label: 'Tuition & Costs' },
        { id: 'legal', label: 'Legal & Visa Rules' },
        { id: 'neighborhoods', label: 'School & Housing Strategy' },
        { id: 'checklist', label: 'Relocation Checklist' },
        { id: 'faq', label: 'FAQ' },
      ]}
    >
      {/* Overview */}
      <section id="overview">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" /> Navigating International Education in Istanbul</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Relocating to Istanbul with a family means balancing curriculum continuity, language of instruction, daily commute logistics, and neighborhood selection. Istanbul offers a diverse array of international schools catering to foreign nationals, with instruction primarily in English, French, and German.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CURRICULA.map((c) => (
            <div key={c.name} className="rounded-xl border border-border bg-card p-4">
              <p className="font-semibold text-sm mb-1">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Schools */}
      <section id="schools">
        <h2 className="text-2xl font-bold mb-4">Top International Schools in Istanbul</h2>
        <h3 className="font-semibold mb-3">Major English-Medium International Schools</h3>
        <div className="space-y-4 mb-8">
          {SCHOOLS_EN.map((s) => (
            <div key={s.name} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-semibold mb-1">{s.name}</p>
              <p className="text-sm text-foreground/80 mb-1"><span className="text-muted-foreground">Curriculum: </span>{s.curriculum}</p>
              <p className="text-sm text-foreground/80 mb-1"><span className="text-muted-foreground">Location: </span>{s.location}</p>
              {s.note && <p className="text-sm text-foreground/70 leading-relaxed mt-2">{s.note}</p>}
            </div>
          ))}
        </div>
        <h3 className="font-semibold mb-3">Foreign National Curricula Schools</h3>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-3">
            {SCHOOLS_NATIONAL.map((s) => (
              <li key={s.name} className="text-sm text-foreground/80 leading-relaxed"><strong>{s.name}:</strong> {s.detail}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tuition */}
      <section id="tuition">
        <h2 className="text-2xl font-bold mb-4">Tuition Benchmarks & Cost Structure (2026 Estimates)</h2>
        <div className="overflow-x-auto rounded-2xl border border-border mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-semibold">School Tier</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Annual Tuition</th>
                <th className="px-4 py-3 font-semibold">Additional Fees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {TUITION.map((row) => (
                <tr key={row.tier} className="align-top">
                  <td className="px-4 py-3 font-medium">{row.tier}</td>
                  <td className="px-4 py-3 text-foreground/80 whitespace-nowrap">{row.range}</td>
                  <td className="px-4 py-3 text-foreground/80">{row.extra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Ancillary Costs</p>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-3">
            {ANCILLARY.map((a) => (
              <li key={a.item} className="text-sm text-foreground/80 leading-relaxed"><strong>{a.item}:</strong> {a.cost}{a.note ? ` — ${a.note}` : ''}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Legal rules */}
      <section id="legal">
        <h2 className="text-2xl font-bold mb-4">Legal & Visa Rules for Expat Children (e-İkamet)</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Foreign children holding a valid Family Residence Permit (Aile İkamet İzni) are entitled to primary and secondary education rights until age 18, without needing a separate Student Residence Permit. Understanding the document requirements before you arrive avoids delays at enrollment.
        </p>
        <div className="space-y-4">
          {DOCUMENTS.map((d) => (
            <div key={d.title} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-semibold mb-2">{d.title}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhood strategy */}
      <section id="neighborhoods">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> School Proximity & Housing Strategy</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Istanbul&apos;s urban traffic makes living near your child&apos;s school one of the most critical factors in family relocation — select target school, map the commute zone, verify the district is open for residency, then sign the lease.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {NEIGHBORHOODS.map((n) => (
            <div key={n.area} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-semibold text-sm mb-1">{n.area}</p>
              <p className="text-xs text-muted-foreground mb-2">Near: {n.schools}</p>
              {n.note && <p className="text-xs text-foreground/70 leading-relaxed">{n.note}</p>}
            </div>
          ))}
        </div>
        <p className="text-xs text-foreground/70 leading-relaxed bg-muted/50 rounded-lg p-3">
          District residency verification: ensure the residential neighborhood for your lease is not on the Migration Directorate&apos;s closed-districts (Kapalı Mahalleler) list — this is what guarantees your family&apos;s residence permit (ikamet) approval, independent of how good the school commute looks.
        </p>
      </section>

      {/* Concierge CTA */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-bold mb-1.5">Relocating With Children?</h3>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          School placement timing, open-district verification, and lease signing all need to happen in the right order. Our concierge service can help coordinate the housing side of a family move end to end.
        </p>
        <Link href="/concierge" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          See Concierge Plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Checklist */}
      <section id="checklist">
        <h2 className="text-2xl font-bold mb-4">Family Relocation Step-by-Step Checklist</h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-4">
            {CHECKLIST.map((item) => (
              <li key={item.when} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-success" />
                <span className="text-foreground/80"><strong>{item.when}:</strong> {item.what}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">What expat families ask most often about schooling and residency for their children in Istanbul.</p>
        <GuideFAQ items={FAQ} />
        <p className="text-xs text-muted-foreground leading-relaxed mt-6">
          Page last updated {new Date().toISOString().slice(0, 10)}. Tuition figures and document requirements change periodically — always confirm current fees directly with each school and current document rules with the Provincial Directorate of Migration Management before relocating.
        </p>
      </section>
    </GuideLayout>
  );
}
