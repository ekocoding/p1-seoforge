import Link from "next/link";
import FaqAccordion from "@/app/components/FaqAccordion";
import SubpageLayout from "@/app/components/SubpageLayout";
import DashboardMockup from "./DashboardMockup";

/* ------------------------------------------------------------------ */
/*  INTERSECTION OBSERVER                                              */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/*  ROADMAP CARD — reveals on scroll                                   */
/* ------------------------------------------------------------------ */
function RoadmapCard({ num, title, text, items, color }: { num: string; title: string; text: string; items: string[]; color: string }) {
  return (
    <div className="relative flex gap-6 lg:gap-10 reveal">
      {/* Node */}
      <div className="relative z-10 shrink-0">
        <div className={`flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-2xl ${color} text-white text-xl lg:text-2xl font-bold font-[family-name:var(--font-heading)] shadow-lg ring-4 ring-white`}>
          {num}
        </div>
      </div>
      {/* Card */}
      <div className="flex-1 rounded-2xl border p-6 lg:p-8 bg-white shadow-lg border-primary/20">
        <h3 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark mb-3">{title}</h3>
        <p className="text-muted text-base leading-relaxed mb-5">{text}</p>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-dark/80">
              <svg className="w-4 h-4 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ROADMAP FINISH — reveals on scroll                                 */
/* ------------------------------------------------------------------ */
function RoadmapFinish() {
  return (
    <div className="relative flex gap-6 lg:gap-10 reveal">
      <div className="relative z-10 shrink-0">
        <div className="flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg ring-4 ring-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
        </div>
      </div>
      <div className="flex-1 flex items-center">
        <div className="rounded-2xl bg-gradient-to-r from-primary/[0.06] to-secondary/[0.03] border border-primary/10 p-6 lg:p-8 w-full">
          <p className="font-[family-name:var(--font-heading)] text-lg lg:text-xl font-bold text-dark">
            Ziel erreicht: Eine Website, die <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">technisch, inhaltlich und strukturell</span> auf Top-Rankings optimiert ist.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
const faqs = [
  { q: "Was kostet SEO Optimierung bei SeoForge?", a: "Einmalige Optimierungsprojekte starten ab 3.000 Euro. Laufende Optimierung ab 1.500 Euro monatlich. Im kostenlosen Erstgespräch erstellen wir ein individuelles Angebot basierend auf Ihrem Projektumfang." },
  { q: "Wie lange dauert es, bis SEO Optimierung wirkt?", a: "Technische Fixes wirken oft innerhalb von Wochen. Nachhaltige Ranking-Verbesserungen zeigen sich nach 3–6 Monaten. SEO ist ein Marathon — aber die Ergebnisse sind langfristig und wachsen mit der Zeit." },
  { q: "Was ist der Unterschied zwischen On-Page und Off-Page?", a: "On-Page betrifft alles auf Ihrer Website: Technik, Content, Struktur. Off-Page umfasst externe Faktoren wie Backlinks. Wir optimieren beides — mit Schwerpunkt auf On-Page, weil Sie dort die volle Kontrolle haben." },
  { q: "Brauche ich SEO wenn meine Website schon gut ranked?", a: "Ja. Google ändert seinen Algorithmus über 500 Mal pro Jahr. Ohne laufende Optimierung verlieren Sie Positionen an Wettbewerber, die aktiv arbeiten." },
  { q: "Welche Tools setzt SeoForge ein?", a: "Ahrefs, Sistrix, Screaming Frog, Google Search Console, Analytics, PageSpeed Insights und weitere spezialisierte Tools — ein Tool-Stack im Wert von mehreren tausend Euro monatlich." },
  { q: "Kann ich SEO Optimierung selbst machen?", a: "Grundlegende Maßnahmen ja. Aber professionelle SEO erfordert tiefes Fachwissen, teure Tools und viel Zeit. Die meisten Unternehmen unterschätzen den Aufwand und machen kostspielige Fehler." },
];

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function SeoOptimierungClient() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-secondary/[0.05] to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary hero-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Unsere Kernkompetenz
              </div>
              <h1 className="hero-title text-5xl lg:text-6xl leading-[1.12] text-dark font-[family-name:var(--font-heading)]">
                <span className="block">SEO Optimierung</span>
                <span className="text-primary">die man messen kann</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                Technik, Content, Struktur — wir optimieren nicht einzelne Stellschrauben, sondern Ihre gesamte Website. Systematisch, datengetrieben und mit einem klaren Ziel: messbares Wachstum.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {["Technisch & inhaltlich", "92+ PageSpeed Score", "Monatliches Reporting"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="#jetzt-starten" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30">
                  Kostenlose SEO-Analyse
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#wie-wir-optimieren" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:bg-primary/[0.04] hover:text-primary">
                  Was wir optimieren
                </Link>
              </div>
            </div>
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  MANIFESTO — Centered editorial + 3-column principles         */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">

            {/* Centered intro */}
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Unser Verständnis</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-8 leading-tight">
                SEO Optimierung ist kein Projekt.<br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Es ist ein System.</span>
              </h2>
              <p className="text-lg lg:text-xl text-muted leading-relaxed">
                Google ändert seinen Algorithmus über 500 Mal im Jahr. Ihre Wettbewerber optimieren taeglich. Nutzerverhalten verschiebt sich ständig. Wer SEO als einmalige Maßnahme behandelt, wird abgehängt. Wer es als kontinuierliches System begreift, baut einen nachhaltigen Wettbewerbsvorteil auf.
              </p>
            </div>

            {/* 3-column principles — visually distinct from any other page */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {[
                {
                  num: "I",
                  title: "Analyse vor Aktion",
                  text: "Wir optimieren nie blind. Jede Maßnahme basiert auf Daten: Crawl-Analysen, Keyword-Recherche, Wettbewerbsvergleich. Erst verstehen, dann handeln.",
                  accent: "border-t-primary",
                  bg: "from-primary/[0.03]",
                },
                {
                  num: "II",
                  title: "Impact vor Vollständigkeit",
                  text: "Nicht alles gleichzeitig. Wir priorisieren nach ROI: Quick Wins zuerst, dann die großen Hebel. So sehen Sie schnell Ergebnisse, während wir langfristig bauen.",
                  accent: "border-t-secondary",
                  bg: "from-secondary/[0.03]",
                },
                {
                  num: "III",
                  title: "Iteration vor Perfektion",
                  text: "SEO ist ein Zyklus: optimieren, messen, lernen, verbessern. Jede Runde macht Ihre Website stärker. Wer auf Perfektion wartet, fängt nie an.",
                  accent: "border-t-primary",
                  bg: "from-primary/[0.03]",
                },
              ].map((p) => (
                <div key={p.num} className={`rounded-2xl border border-border ${p.accent} border-t-[3px] bg-gradient-to-b ${p.bg} to-white p-8 lg:p-10`}>
                  <span className="inline-block font-[family-name:var(--font-heading)] text-4xl font-bold text-primary/15 mb-4">{p.num}</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>

            {/* ---- EYECATCHER: Light Optimization Dashboard ---- */}
            <div className="rounded-3xl border border-border bg-offwhite overflow-hidden shadow-xl shadow-dark/[0.04]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 bg-white px-5 py-3.5 border-b border-border">
                <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-red-400" /><div className="h-3 w-3 rounded-full bg-yellow-400" /><div className="h-3 w-3 rounded-full bg-green-400" /></div>
                <div className="ml-3 flex-1 rounded-md bg-offwhite px-3 py-1.5 text-xs text-muted border border-border flex items-center gap-2">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  optimize.seoforge.de/ihr-projekt
                </div>
                <div className="hidden sm:flex items-center gap-1.5 ml-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-[10px] text-muted font-medium">Live</span></div>
              </div>

              <div className="p-6 lg:p-10">
                {/* Metric cards row */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "PageSpeed", before: "34", after: "96", status: "Optimiert", statusColor: "text-green-600 bg-green-50" },
                    { label: "Crawl Errors", before: "47", after: "0", status: "Behoben", statusColor: "text-green-600 bg-green-50" },
                    { label: "Missing Metas", before: "89", after: "3", status: "In Arbeit", statusColor: "text-amber-600 bg-amber-50" },
                    { label: "Broken Links", before: "23", after: "0", status: "Behoben", statusColor: "text-green-600 bg-green-50" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl bg-white border border-border p-5">
                      <p className="text-[10px] text-muted uppercase tracking-wide mb-2">{m.label}</p>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-dark/30 line-through text-lg">{m.before}</span>
                        <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        <span className="text-2xl font-bold text-dark">{m.after}</span>
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${m.statusColor}`}>{m.status}</span>
                    </div>
                  ))}
                </div>

                {/* Pipeline */}
                <div className="rounded-xl bg-white border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-dark">Optimization Pipeline</h4>
                    <span className="text-xs text-primary font-medium">3 von 5 abgeschlossen</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { task: "Core Web Vitals: LCP 4.2s → 1.1s", progress: 100 },
                      { task: "Structured Data: 0 → 34 Schema-Markups", progress: 100 },
                      { task: "Internal Links: 12 orphaned pages reconnected", progress: 100 },
                      { task: "Meta Optimization: 89 pages remaining", progress: 72 },
                      { task: "Image Compression: Converting to WebP", progress: 45 },
                    ].map((t, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          {t.progress === 100 ? (
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          ) : (
                            <svg className="w-4 h-4 text-amber-500 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                          )}
                        </div>
                        <span className="flex-1 text-xs text-dark/70 truncate">{t.task}</span>
                        <div className="w-28 h-2 bg-border rounded-full overflow-hidden shrink-0">
                          <div className={`h-full rounded-full ${t.progress === 100 ? "bg-green-500" : "bg-amber-400"}`} style={{ width: `${t.progress}%` }} />
                        </div>
                        <span className={`text-[11px] font-semibold w-10 text-right ${t.progress === 100 ? "text-green-600" : "text-amber-500"}`}>{t.progress}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-primary/[0.05] to-secondary/[0.03] border border-primary/10 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-dark">Traffic-Prognose</p>
                      <p className="text-xs text-muted">Basierend auf aktuellen Optimierungen</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)]">+187%</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TWO PILLARS — Interactive flip cards                         */}
      {/* ============================================================ */}
      <style jsx>{`
        .pillar-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pillar-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(194, 114, 42, 0.12);
        }
        .pillar-card:hover .pillar-icon {
          transform: rotateY(180deg);
        }
        .pillar-icon {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pillar-card:hover .pillar-bar {
          width: 100% !important;
        }
        .pillar-bar {
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pillar-card:hover .pillar-tag {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }
        .pillar-tag {
          transition: all 0.3s ease;
        }
        .pillar-card-secondary:hover {
          box-shadow: 0 25px 50px -12px rgba(212, 168, 83, 0.12);
        }
        .pillar-card-secondary:hover .pillar-tag {
          background: var(--color-secondary);
          border-color: var(--color-secondary);
        }
      `}</style>
      <section className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Zwei Säulen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Technik trifft Content</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Beide Seiten müssen stimmen. Wir optimieren parallel — für maximale Wirkung.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 transition-all duration-700 delay-200 reveal">
            {/* Technik */}
            <div className="pillar-card rounded-3xl bg-white border border-border p-8 lg:p-10 cursor-default relative overflow-hidden">
              {/* Hover glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/0 transition-all duration-500 group-hover:bg-primary/5 pointer-events-none" />

              {/* Animated top bar */}
              <div className="h-1 bg-border rounded-full mb-8 overflow-hidden">
                <div className="pillar-bar h-full bg-gradient-to-r from-primary to-primary-light rounded-full" style={{ width: "0%" }} />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="pillar-icon flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white" style={{ perspective: "600px" }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">Technisches SEO</h3>
                  <p className="text-xs text-primary font-medium">Die unsichtbare Basis</p>
                </div>
              </div>

              <p className="text-muted mb-8 leading-relaxed">
                Ohne solide Technik verpuffen selbst die besten Inhalte. Wir sorgen dafür, dass Google Ihre Website versteht, schnell crawlt und korrekt indexiert.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {["Core Web Vitals", "Crawl-Optimierung", "Mobile-First", "Schema Markup", "Page Speed 90+", "Redirect-Cleanup"].map((item) => (
                  <div key={item} className="pillar-tag flex items-center gap-2 rounded-lg border border-border bg-offwhite/50 px-3 py-2 text-xs font-medium text-dark/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="pillar-card pillar-card-secondary rounded-3xl bg-white border border-border p-8 lg:p-10 cursor-default relative overflow-hidden">
              {/* Animated top bar */}
              <div className="h-1 bg-border rounded-full mb-8 overflow-hidden">
                <div className="pillar-bar h-full bg-gradient-to-r from-secondary to-primary rounded-full" style={{ width: "0%" }} />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="pillar-icon flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-white" style={{ perspective: "600px" }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">Content-Optimierung</h3>
                  <p className="text-xs text-secondary font-medium">Der sichtbare Hebel</p>
                </div>
              </div>

              <p className="text-muted mb-8 leading-relaxed">
                Content ist nur dann King, wenn er strategisch auf Suchintention ausgerichtet ist. Wir optimieren bestehende Inhalte und schaffen neue, die ranken und konvertieren.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {["Meta-Optimierung", "Heading-Struktur", "Content Gaps", "E-E-A-T Signale", "Interne Links", "Featured Snippets"].map((item) => (
                  <div key={item} className="pillar-tag flex items-center gap-2 rounded-lg border border-border bg-offwhite/50 px-3 py-2 text-xs font-medium text-dark/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DEEP DIVE — Roadmap with dashed path                         */}
      {/* ============================================================ */}
      <section id="wie-wir-optimieren" className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-14 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Roadmap</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Was wir konkret optimieren</h2>
            <p className="text-lg text-muted max-w-3xl">Jede Website hat andere Schwachstellen. Hier ist der Weg zu einer vollständig optimierten Website.</p>
          </div>

          <div className="relative">
            {/* Dashed path line */}
            <div className="absolute left-8 lg:left-10 top-0 bottom-0 w-px border-l-[2px] border-dashed border-primary/20 pointer-events-none" />

            <div className="space-y-12">
              <RoadmapCard num="01" title="Ladezeiten & Performance" color="bg-primary"
                text="Google misst, wie schnell Ihre Seite lädt — und bestraft langsame Websites mit schlechteren Rankings. Wir optimieren Server-Response, Bildgrößen, JavaScript-Bundles und CSS-Delivery, bis Ihre Core Web Vitals im grünen Bereich sind."
                items={["LCP unter 2.5 Sekunden", "CLS unter 0.1", "TTFB optimieren", "Lazy Loading & Code Splitting"]}
              />
              <RoadmapCard num="02" title="Crawlability & Indexierung" color="bg-secondary"
                text="Seiten, die Google nicht crawlen kann, existieren nicht. Wir bereinigen Crawl-Fehler, optimieren Robots.txt und Sitemaps, loesen Redirect-Chains auf und stellen sicher, dass jede wichtige Seite indexiert wird — und keine unwichtige."
                items={["Crawl-Budget-Management", "Index-Bloat vermeiden", "Canonical-Tags prüfen", "Log-File-Analyse"]}
              />
              <RoadmapCard num="03" title="On-Page & Content-Signale" color="bg-primary"
                text="Title-Tags, Meta-Descriptions, Heading-Hierarchie, Keyword-Platzierung — die Grundlagen klingen einfach, werden aber bei den meisten Websites stiefmütterlich behandelt. Wir optimieren jede Seite so, dass Google die Relevanz sofort erkennt."
                items={["Keyword-Mapping pro Seite", "Meta-Daten optimieren", "Interne Verlinkung aufbauen", "Duplicate Content loesen"]}
              />
              <RoadmapCard num="04" title="Struktur & Architektur" color="bg-secondary"
                text="Die Art, wie Ihre Website aufgebaut ist, bestimmt, wie effizient Google sie versteht und wie einfach Nutzer finden, was sie suchen. Wir bauen klare Silo-Strukturen, optimieren URL-Hierarchien und schaffen Topic-Cluster, die thematische Autorität aufbauen."
                items={["URL-Taxonomie optimieren", "Topic-Cluster aufbauen", "Verwaiste Seiten verlinken", "Breadcrumb-Navigation"]}
              />
              <RoadmapFinish />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROCESS — Flywheel with center + orbiting cards              */}
      {/* ============================================================ */}
      <section className="bg-offwhite py-24 lg:py-32 border-y border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Unser Vorgehen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-6">
              Der Optimierungszyklus
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Kein Anfang, kein Ende — ein Kreislauf, der Ihre Website mit jeder Runde stärker macht.
            </p>
          </div>

          <div className="transition-all duration-700 delay-200 reveal">
            {/* Desktop: 2x2 grid with center flywheel icon */}
            <div className="relative">
              {/* Center flywheel element — desktop only */}
              <div className="hidden lg:flex absolute inset-0 items-center justify-center z-10 pointer-events-none">
                <div className="w-28 h-28 rounded-full bg-white border-2 border-primary/20 shadow-xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
              </div>

              {/* Connecting lines — desktop only */}
              <div className="hidden lg:block absolute top-1/2 left-[25%] right-[25%] h-[2px] bg-border -translate-y-1/2" />
              <div className="hidden lg:block absolute left-1/2 top-[20%] bottom-[20%] w-[2px] bg-border -translate-x-1/2" />

              <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
                {[
                  {
                    step: "01", title: "Analysieren", subtitle: "Daten sammeln & verstehen",
                    desc: "200+ Ranking-Faktoren durchleuchten. Technische Schwächen, Content-Lücken und Wettbewerber-Vorteile aufdecken. Die Datenbasis für alles, was folgt.",
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
                    accent: "border-t-primary bg-gradient-to-b from-primary/[0.02] to-transparent",
                    arrow: "→",
                  },
                  {
                    step: "02", title: "Priorisieren", subtitle: "Impact-Matrix aufstellen",
                    desc: "Nicht alles gleichzeitig. Quick Wins identifizieren, die innerhalb von Wochen wirken. Große Hebel planen, die langfristiges Wachstum treiben. Jede Maßnahme nach ROI sortiert.",
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>,
                    accent: "border-t-secondary bg-gradient-to-b from-secondary/[0.02] to-transparent",
                    arrow: "↓",
                  },
                  {
                    step: "04", title: "Messen & Lernen", subtitle: "Ergebnisse auswerten",
                    desc: "Rankings, Traffic, Conversions tracken. Was funktioniert hat, skalieren. Was nicht funktioniert hat, analysieren und anpassen. Dann: zurück zu Schritt 1.",
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
                    accent: "border-t-primary bg-gradient-to-b from-primary/[0.02] to-transparent",
                    arrow: "←",
                  },
                  {
                    step: "03", title: "Umsetzen", subtitle: "Hands-on implementieren",
                    desc: "Technische Fixes deployen, Content optimieren, Struktur verbessern, Meta-Daten anpassen. Wir reden nicht nur — wir machen. Bei Bedarf direkt mit Ihrem Dev-Team.",
                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.76-3.35a.9.9 0 010-1.56l5.76-3.35a.9.9 0 01.9 0l5.76 3.35a.9.9 0 010 1.56l-5.76 3.35a.9.9 0 01-.9 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.66 11.82v4.68a.9.9 0 00.45.78l5.76 3.35a.9.9 0 00.9 0l5.76-3.35a.9.9 0 00.45-.78v-4.68" /></svg>,
                    accent: "border-t-secondary bg-gradient-to-b from-secondary/[0.02] to-transparent",
                    arrow: "↑",
                  },
                ].map((phase) => (
                  <div key={phase.step} className={`rounded-2xl border border-border ${phase.accent} border-t-[3px] bg-white p-8 lg:p-10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/[0.03] hover:-translate-y-1`}>
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                          {phase.icon}
                        </div>
                        <div>
                          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">{phase.title}</h3>
                          <p className="text-xs text-primary font-medium">{phase.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-3xl font-bold text-primary/10 font-[family-name:var(--font-heading)]">{phase.step}</span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-10 text-center">
              <p className="inline-flex items-center gap-2 text-sm text-muted bg-white border border-border rounded-full px-5 py-2.5 shadow-sm">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                Jeder Zyklus baut auf dem vorherigen auf — so entsteht exponentielles Wachstum
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WAS SIE ERWARTEN KÖNNEN                                      */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">

            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Unser Versprechen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-6">
                Ehrlichkeit statt<br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Marketing-Versprechen</span>
              </h2>
              <p className="text-lg text-muted leading-relaxed">
                SEO braucht Zeit. Wer Ihnen Top-Rankings in 30 Tagen verspricht, lügt. Was wir versprechen: systematische Arbeit, klare Kommunikation und nachvollziehbare Fortschritte.
              </p>
            </div>

            {/* 3 honest commitments */}
            <div className="grid md:grid-cols-3 gap-5 mb-12">
              {[
                {
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                  title: "Realistische Erwartungen",
                  desc: "Wir sagen Ihnen, was in Ihrer Branche und mit Ihrem Budget realistisch erreichbar ist — nicht was Sie hören wollen.",
                  accent: "border-t-primary",
                },
                {
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
                  title: "Messbare Fortschritte",
                  desc: "Jeden Monat sehen Sie genau, was wir gemacht haben und was es bewirkt hat. Rankings, Traffic, technische Verbesserungen — alles dokumentiert.",
                  accent: "border-t-secondary",
                },
                {
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>,
                  title: "Direkte Kommunikation",
                  desc: "Kein Account-Manager-Ping-Pong. Sie sprechen direkt mit dem Experten, der Ihre Website optimiert. Immer.",
                  accent: "border-t-primary",
                },
              ].map((c, i) => (
                <div key={i} className={`rounded-2xl border border-border ${c.accent} border-t-[3px] bg-offwhite/40 p-8 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-border`}>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                    {c.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">{c.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.04] to-secondary/[0.02] p-10 lg:p-14">
              <svg className="mb-6 h-8 w-8 text-primary/30" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              <p className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl text-dark leading-relaxed mb-8 max-w-3xl">
                SEO Optimierung ist kein Geheimnis. Es ist harte, systematische Arbeit — und genau die machen wir richtig. Ohne Tricks, ohne Versprechen, die wir nicht halten können.
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-primary/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold">JH</div>
                <div>
                  <p className="font-semibold text-dark">Joel Heuchert</p>
                  <p className="text-sm text-muted">Gründer & SEO Stratege</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  RELATED SERVICES                                             */}
      {/* ============================================================ */}
      <section className="py-12 bg-white border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted mb-5">Passend dazu</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/seo/betreuung" className="group flex items-start gap-4 rounded-2xl border border-border bg-offwhite p-5 transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-dark text-sm mb-1">Laufende SEO Betreuung</h3>
                <p className="text-xs text-muted leading-relaxed">Optimierung ist kein Einmalprojekt. Monatliche SEO Betreuung baut Rankings nachhaltig aus.</p>
              </div>
              <svg className="w-4 h-4 text-muted shrink-0 mt-0.5 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/seo/betreuung/roi" className="group flex items-start gap-4 rounded-2xl border border-border bg-offwhite p-5 transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/[0.1] text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-dark text-sm mb-1">SEO ROI berechnen</h3>
                <p className="text-xs text-muted leading-relaxed">Was bringt SEO Betreuung wirklich? Interaktiver Rechner mit Branchendaten und Kostenvergleich.</p>
              </div>
              <svg className="w-4 h-4 text-muted shrink-0 mt-0.5 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section className="bg-offwhite py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-14 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">FAQ</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">Häufig gestellte Fragen</h2>
          </div>
          <div className="transition-all duration-700 delay-100 reveal">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  JETZT STARTEN — CTA                                          */}
      {/* ============================================================ */}
      <section id="jetzt-starten" className="bg-offwhite py-20 lg:py-28 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Jetzt starten</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-6 leading-tight">
                Mehr Rankings.<br />Mehr Umsatz.
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">Lassen Sie uns analysieren, wo Ihr größtes Optimierungspotenzial liegt — datenbasiert, konkret und ohne leere Versprechen.</p>
              <div className="space-y-4">
                {[
                  { title: "Kostenlose Erstanalyse", desc: "Wir prüfen Ihre aktuelle SEO-Situation und zeigen erste Potenziale auf." },
                  { title: "Individueller Maßnahmenplan", desc: "Priorisierte Empfehlungen, die zu Ihrem Unternehmen und Ihren Ressourcen passen." },
                  { title: "Transparente Preise", desc: "Sie wissen vorher, was es kostet. Keine Überraschungen, keine versteckten Kosten." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white border border-border p-8 lg:p-10 shadow-xl shadow-dark/[0.03]">
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-2">Gespräch vereinbaren</h3>
                <p className="text-sm text-muted">Kostenlos und unverbindlich</p>
              </div>
              <div className="space-y-4 mb-8">
                <Link href="/kontakt" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl transition-all">
                  Erstgespräch anfragen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a href="tel:015203450695" className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-dark hover:border-primary/30 hover:text-primary transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  0152 03450695
                </a>
              </div>
              <div className="flex items-center justify-center gap-6 pt-6 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Antwort in 24h
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Keine Bindung
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
