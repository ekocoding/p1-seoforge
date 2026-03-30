"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";
import DashboardMockup from "./DashboardMockup";

/* ------------------------------------------------------------------ */
/*  INTERSECTION OBSERVER                                              */
/* ------------------------------------------------------------------ */
function useInView(opts = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1, ...opts }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

/* ------------------------------------------------------------------ */
/*  ANIMATED COUNTER                                                   */
/* ------------------------------------------------------------------ */
function AnimatedStat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
        {count}{suffix}
      </p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ DATA                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    q: "Was genau beinhaltet eine SEO Beratung bei SeoForge?",
    a: "Unsere Beratung umfasst ein vollständiges Website-Audit (200+ Prüfpunkte), eine strategische Keyword-Analyse, eine detaillierte Wettbewerbsanalyse und die Entwicklung einer individuellen SEO-Roadmap. Sie erhalten konkrete, priorisierte Handlungsempfehlungen — kein generisches PDF.",
  },
  {
    q: "Wie unterscheidet sich SEO Beratung von SEO Betreuung?",
    a: "Beratung liefert Strategie, Analyse und Wissenstransfer — Ihr Team setzt um. Betreuung bedeutet, dass wir die laufende Optimierung komplett übernehmen. Viele Kunden starten mit Beratung und wechseln später zur Betreuung, wenn sie merken, dass ihnen intern die Kapazität fehlt.",
  },
  {
    q: "Für welche Unternehmen eignet sich eine SEO Beratung?",
    a: "Für Unternehmen mit eigenem Marketing-Team, die SEO-Kompetenz aufbauen wollen. Für Startups, die von Anfang an die richtigen Grundlagen legen moechten. Und für etablierte Firmen, deren Rankings stagnieren und die eine externe, ehrliche Expertenmeinung brauchen.",
  },
  {
    q: "Was kostet eine professionelle SEO Beratung?",
    a: "Ein initiales Audit mit Strategieentwicklung liegt typischerweise bei 2.500–6.000 Euro. Laufende strategische Beratung ist ab 1.500 Euro monatlich moeglich. Im kostenlosen Erstgespräch klären wir Ihren Bedarf und erstellen ein individuelles Angebot.",
  },
  {
    q: "Wie schnell sehe ich Ergebnisse?",
    a: "Technische Quick Wins können bereits nach wenigen Wochen wirken. Nachhaltige Ranking-Verbesserungen zeigen sich erfahrungsgemäß nach 3–6 Monaten konsequenter Umsetzung unserer Empfehlungen. SEO ist ein Marathon — aber einer, der sich messbar auszahlt.",
  },
  {
    q: "Arbeitet SeoForge auch mit internen Marketing-Teams zusammen?",
    a: "Absolut — das ist sogar einer unserer Schwerpunkte. Wir verstehen uns als Sparringspartner, der Ihr Team befähigt, nicht ersetzt. Workshops, Briefing-Templates und regelmäßige Review-Sessions sind fester Bestandteil unserer Beratung.",
  },
];

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function SEOBeratungPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openDisc, setOpenDisc] = useState<number>(0);
  const [sectionRef, sectionInView] = useInView();
  const [editorialRef, editorialInView] = useInView();
  const [compareRef, compareInView] = useInView();
  const [delivRef, delivInView] = useInView();
  const [discRef, discInView] = useInView();
  const [processRef, processInView] = useInView();
  const [quoteRef, quoteInView] = useInView();
  const [faqRef, faqInView] = useInView();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ============================================================ */}
      {/*  HERO — Split Layout: Text Left, Dashboard Right              */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-secondary/[0.05] to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left — Text */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary hero-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Strategische SEO Beratung
              </div>

              <h1 className="hero-title text-5xl lg:text-6xl leading-[1.12] text-dark font-[family-name:var(--font-heading)]">
                <span className="block">Die Strategie hinter</span>
                <span className="text-primary">jedem guten Ranking</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                Rankings entstehen nicht zufällig. Sie entstehen aus der richtigen Analyse, den richtigen Prioritäten und einer Strategie, die zu Ihrem Geschäft passt. Genau das liefert unsere SEO Beratung.
              </p>

              {/* Selling points */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {["Individuelle Strategie", "200+ Prüfpunkte", "Wissenstransfer"].map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-muted">{point}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
                >
                  Kostenloses Erstgespräch
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="#ablauf"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:bg-primary/[0.04] hover:text-primary"
                >
                  So laeuft es ab
                </Link>
              </div>

            </div>

            {/* Right — Dashboard */}
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STATS BAR                                                    */}
      {/* ============================================================ */}
      <section className="bg-offwhite border-y border-border py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedStat value={200} suffix="+" label="Beratungsprojekte" />
            <AnimatedStat value={748} suffix="%" label="Durchschnittlicher ROI" />
            <AnimatedStat value={96} suffix="%" label="Kundenzufriedenheit" />
            <AnimatedStat value={2500} suffix="+" label="Top-10 Platzierungen" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  EDITORIAL — Was professionelle SEO Beratung bedeutet         */}
      {/* ============================================================ */}
      <section ref={editorialRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`transition-all duration-700 ${editorialInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

            {/* Header */}
            <div className="mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Im Detail</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight max-w-3xl">
                Was professionelle SEO Beratung wirklich bedeutet
              </h2>
            </div>

            {/* Lede — featured first paragraph */}
            <div className="mb-12 max-w-4xl">
              <p className="text-xl lg:text-2xl leading-relaxed text-dark/80 font-[family-name:var(--font-heading)]">
                <strong className="text-dark">SEO Beratung</strong> wird oft missverstanden. Viele Unternehmen erwarten eine Liste von Quick Fixes. Doch professionelle Beratung beginnt mit einer anderen Frage:{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">Was wollen Sie als Unternehmen erreichen?</span>
              </p>
            </div>

            {/* Two-column content with callout */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
              <div className="lg:col-span-7 space-y-6">
                <p className="text-muted text-base lg:text-lg leading-relaxed">
                  Erst wenn wir Ihr Geschäftsmodell, Ihre Zielgruppe und Ihre Wettbewerbssituation wirklich verstehen, können wir eine Strategie entwickeln, die funktioniert. Keine generischen Checklisten. Keine Standardlösungen, die für jeden Kunden gleich aussehen. Sondern ein massgeschneiderter Fahrplan, der zu Ihren Ressourcen, Ihrem Markt und Ihren Zielen passt.
                </p>
                <p className="text-muted text-base lg:text-lg leading-relaxed">
                  Bei SeoForge analysieren wir nicht nur Ihre Website — wir analysieren die gesamte Customer Journey. Denn SEO ist kein isolierter Kanal. Es ist der Moment, in dem ein potenzieller Kunde aktiv nach einer Lösung sucht. Wer hier nicht sichtbar ist, verliert Geschäft. Nicht irgendwann, sondern jetzt — bei jeder Suchanfrage, jeden Tag.
                </p>
              </div>

              {/* Callout card — "Die unbequemen Fragen" */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-gradient-to-br from-primary/[0.04] to-secondary/[0.03] border border-primary/10 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">Die Fragen, die den Unterschied machen</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Warum ranken Ihre Wettbewerber besser?",
                      "Welche Inhalte sucht Ihre Zielgruppe wirklich?",
                      "Wo verlieren Sie Nutzer vor der Conversion?",
                      "Welche Maßnahmen bringen den groessten Return?",
                      "Was können Sie intern umsetzen — und was nicht?",
                    ].map((q, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-dark/80 leading-relaxed">
                        <span className="mt-0.5 text-primary font-bold font-[family-name:var(--font-heading)]">→</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ---- EYECATCHER: Animated Strategy Blueprint ---- */}
            <div className="my-16 rounded-3xl border border-border bg-offwhite overflow-hidden shadow-xl shadow-dark/[0.04]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 bg-white px-5 py-3.5 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-offwhite px-3 py-1.5 text-xs text-muted border border-border flex items-center gap-2">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  strategy.seoforge.de/ihr-unternehmen
                </div>
                <div className="hidden sm:flex items-center gap-1.5 ml-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-muted font-medium">Live</span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 lg:p-10">
                {/* Top bar — Score + Quick metrics */}
                <div className="flex flex-col sm:flex-row gap-6 mb-8">
                  {/* Circular score */}
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <svg className="w-24 h-24" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E3DF" strokeWidth="6" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#C2722A" strokeWidth="6" strokeLinecap="round" strokeDasharray="220 264" transform="rotate(-90 50 50)">
                          <animate attributeName="stroke-dasharray" values="0 264;220 264" dur="1.8s" fill="freeze" />
                        </circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-dark font-[family-name:var(--font-heading)]">83</span>
                        <span className="text-[8px] text-muted font-medium uppercase tracking-wide">Score</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-dark mb-1">SEO Health Score</p>
                      <p className="text-xs text-muted">17 Optimierungspotenziale erkannt</p>
                    </div>
                  </div>

                  {/* Quick metrics */}
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    {[
                      { label: "Keyword-Chancen", value: "127", change: "+34", color: "text-primary" },
                      { label: "Techn. Fehler", value: "23", change: "kritisch", color: "text-red-500" },
                      { label: "Content-Lücken", value: "41", change: "Seiten", color: "text-secondary" },
                    ].map((m) => (
                      <div key={m.label} className="rounded-xl bg-white border border-border p-4">
                        <p className="text-[10px] text-muted uppercase tracking-wide mb-1">{m.label}</p>
                        <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                        <p className="text-[10px] text-muted">{m.change}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Two-panel layout */}
                <div className="grid lg:grid-cols-5 gap-6">
                  {/* Left: Priority matrix */}
                  <div className="lg:col-span-3 rounded-xl bg-white border border-border p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold text-dark">Maßnahmen nach Impact priorisiert</h4>
                      <span className="text-[10px] text-muted bg-offwhite px-2 py-1 rounded">Top 5</span>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { task: "Core Web Vitals: LCP von 4.2s auf <2.5s", impact: 95, tag: "Technik", tagColor: "bg-blue-100 text-blue-700" },
                        { task: "Meta-Titles für 34 Hauptseiten optimieren", impact: 88, tag: "On-Page", tagColor: "bg-purple-100 text-purple-700" },
                        { task: "Content-Cluster 'Hauptkeyword' aufbauen", impact: 82, tag: "Content", tagColor: "bg-green-100 text-green-700" },
                        { task: "Interne Verlinkung: 12 verwaiste Seiten", impact: 74, tag: "Struktur", tagColor: "bg-orange-100 text-orange-700" },
                        { task: "Schema Markup für Produkt-/FAQ-Seiten", impact: 68, tag: "Technik", tagColor: "bg-blue-100 text-blue-700" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-offwhite/60 hover:bg-offwhite transition-colors">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-dark truncate">{item.task}</p>
                          </div>
                          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${item.tagColor}`}>{item.tag}</span>
                          <div className="hidden sm:flex items-center gap-2 shrink-0 w-24">
                            <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${item.impact}%` }} />
                            </div>
                            <span className="text-[10px] font-semibold text-primary w-6 text-right">{item.impact}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Competitor snapshot */}
                  <div className="lg:col-span-2 space-y-5">
                    <div className="rounded-xl bg-white border border-border p-5">
                      <h4 className="text-sm font-semibold text-dark mb-3">Wettbewerber-Gap</h4>
                      <div className="space-y-3">
                        {[
                          { name: "Ihr Unternehmen", bar: 38, color: "bg-primary" },
                          { name: "Wettbewerber A", bar: 72, color: "bg-dark/20" },
                          { name: "Wettbewerber B", bar: 61, color: "bg-dark/15" },
                        ].map((c) => (
                          <div key={c.name}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] text-muted">{c.name}</span>
                              <span className="text-[10px] font-semibold text-dark">{c.bar} Keywords</span>
                            </div>
                            <div className="h-2 bg-offwhite rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.bar}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-[10px] text-primary font-medium">→ 47 ungenuetzte Keyword-Chancen</p>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-primary/[0.06] to-secondary/[0.04] border border-primary/10 p-5">
                      <h4 className="text-sm font-semibold text-dark mb-2">Geschätztes Potenzial</h4>
                      <p className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)]">+340%</p>
                      <p className="text-xs text-muted">organischer Traffic in 12 Monaten</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  OHNE vs. MIT — Comparison                                    */}
      {/* ============================================================ */}
      <section ref={compareRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${compareInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Der Unterschied</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">
              Warum Strategie alles verändert
            </h2>
          </div>

          <div className={`grid md:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${compareInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Ohne */}
            <div className="rounded-2xl border border-border bg-offwhite/50 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-dark/5">
                  <svg className="w-5 h-5 text-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">Ohne klare SEO-Strategie</h3>
                  <p className="text-xs text-muted">So arbeiten die meisten Unternehmen</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Budget für Keywords ohne Geschäftswert",
                  "Technische Fehler bremsen unsichtbar",
                  "Content ohne Suchintention erstellt",
                  "Kein Ueberblick über Wettbewerber",
                  "Maßnahmen ohne Priorisierung",
                  "Ergebnisse nicht messbar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-dark/5">
                      <svg className="w-2.5 h-2.5 text-dark/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mit */}
            <div className="rounded-2xl border-2 border-primary/20 bg-white p-8 lg:p-10 shadow-xl shadow-primary/[0.03] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/[0.06] to-transparent rounded-bl-full pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">Mit SeoForge Beratung</h3>
                    <p className="text-xs text-primary font-medium">So arbeiten unsere Kunden</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[
                    "Jede Maßnahme datenbasiert begründet",
                    "Technische Quick Wins sofort identifiziert",
                    "Content nach Suchintention geplant",
                    "Wettbewerber-Lücken gezielt genutzt",
                    "Klare Roadmap nach Impact priorisiert",
                    "Fortschritt monatlich messbar",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-dark leading-relaxed">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-primary/10">
                        <svg className="w-2.5 h-2.5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DELIVERABLES — What you receive                              */}
      {/* ============================================================ */}
      <section ref={delivRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`mb-16 transition-all duration-700 ${delivInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Konkrete Ergebnisse</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">
              Das erhalten Sie von uns
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              Keine vagen Empfehlungen. Sondern Dokumente und Pläne, mit denen Ihr Team sofort arbeiten kann.
            </p>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${delivInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              {
                num: "01",
                title: "SEO-Audit Report",
                desc: "200+ technische und inhaltliche Prüfpunkte, priorisiert nach Impact. Ihr Entwicklerteam kann sofort loslegen.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
                ),
              },
              {
                num: "02",
                title: "Keyword-Strategie",
                desc: "Recherchierte Keywords mit Suchvolumen, Wettbewerb und Suchintention — priorisiert nach Geschäftswert.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>
                ),
              },
              {
                num: "03",
                title: "Wettbewerbsanalyse",
                desc: "Ihre Top-Konkurrenten im Detail: deren Stärken, Schwächen und die Lücken, die Sie nutzen können.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                ),
              },
              {
                num: "04",
                title: "SEO-Roadmap",
                desc: "Massnahmenplan mit Timelines, Verantwortlichkeiten und erwarteten Ergebnissen für 6–12 Monate.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
                ),
              },
            ].map((card, i) => (
              <div
                key={card.num}
                className="group relative rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.04] hover:-translate-y-1"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  {card.icon}
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">{card.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BERATUNGSDISZIPLINEN — Deep dive accordion                   */}
      {/* ============================================================ */}
      <section ref={discRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className={`mb-14 transition-all duration-700 ${discInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Im Fokus</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">
              Unsere Beratungsdisziplinen im Detail
            </h2>
            <p className="text-lg text-muted max-w-3xl">
              Jedes Unternehmen hat andere SEO-Herausforderungen. Deshalb beraten wir nicht nach Schema — sondern in den Disziplinen, die für Sie den groessten Unterschied machen.
            </p>
          </div>

          <div className={`space-y-4 transition-all duration-700 delay-200 ${discInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              {
                title: "Strategische Keyword-Beratung",
                desc: "Keyword-Recherche ist weit mehr als Suchvolumen prüfen. Wir analysieren die Suchintention hinter jedem Begriff, bewerten die realistische Ranking-Chance und ordnen Keywords nach ihrem tatsächlichen Geschäftswert ein — nicht nach Vanity-Metriken.",
                desc2: "Das Ergebnis ist eine Keyword-Strategie, die Ihren Sales-Funnel abbildet: von informationalen Suchbegriffen, die Awareness schaffen, über Vergleichs-Keywords bis hin zu transaktionalen Begriffen, die direkt zu Conversions führen.",
                items: ["Suchintentions-Mapping", "Keyword-Clustering nach Themen", "Commercial vs. Informational Priorisierung", "Long-Tail-Strategie", "Kannibalisierungs-Analyse", "Saisonale Keyword-Planung"],
              },
              {
                title: "Technische SEO-Beratung",
                desc: "Technische Probleme sind oft die unsichtbaren Bremsen Ihrer Rankings. Seiten, die Google nicht crawlen kann, werden nicht indexiert. Seiten, die zu langsam laden, verlieren Nutzer und Rankings. Fehlerhafte Weiterleitungen verwirren Suchmaschinen und Besucher gleichermassen.",
                desc2: "Unser technisches Audit geht über Standard-Tools hinaus. Wir analysieren Crawl-Logs, prüfen JavaScript-Rendering, bewerten Ihre Website-Architektur und liefern Ihrem Entwicklungsteam einen priorisierten Aktionsplan mit exakten Anweisungen.",
                items: ["Core Web Vitals & Page Speed", "Crawl-Budget-Optimierung", "JavaScript-Rendering-Analyse", "Schema Markup Strategie", "Migration & Relaunch Planung", "Server-Log-Analyse"],
              },
              {
                title: "Content-Strategie & Redaktion",
                desc: "Content ohne Strategie ist wie eine Bibliothek ohne Ordnungssystem — viel Material, aber niemand findet, was er sucht. Wir entwickeln Content-Strategien, die auf Topic-Cluster-Architektur basieren und Ihre thematische Autorität systematisch aufbauen.",
                desc2: "Dabei geht es nicht nur um neue Inhalte. Oft liegt das groesste Potenzial in der Optimierung bestehender Seiten: Content-Pruning, Zusammenlegung kannibalisierender Seiten und die Aktualisierung veralteter Artikel können schneller wirken als jeder neue Blogpost.",
                items: ["Topic-Cluster-Architektur", "Content-Audit & Pruning-Plan", "E-E-A-T-Optimierung", "Briefing-Templates für Texter", "Redaktionskalender-Entwicklung", "Content-Gap-Analyse vs. Wettbewerb"],
              },
              {
                title: "Wettbewerbs- & Marktanalyse",
                desc: "Ihre Rankings existieren nicht im Vakuum. Wer Ihre Konkurrenten sind, was sie gut machen und wo sie Schwächen haben, bestimmt Ihre eigene Strategie. Wir analysieren nicht nur deren Keywords und Backlinks, sondern auch deren Content-Strategie und SERP-Positionierung.",
                desc2: "Daraus leiten wir konkrete Chancen ab: Keywords, für die Ihre Wettbewerber ranken und Sie nicht. Content-Formate, die in Ihrer Branche funktionieren. Backlink-Quellen, die auch für Sie erreichbar sind. Und SERP-Features, die Sie gezielt besetzen können.",
                items: ["Competitor Keyword-Gap-Analyse", "Backlink-Profil-Vergleich", "Content-Strategie der Wettbewerber", "SERP-Feature-Opportunities", "Share of Voice Tracking", "Markteintritts- & Nischenanalyse"],
              },
            ].map((disc, i) => (
              <div key={i} className="rounded-2xl border border-border bg-offwhite/30 overflow-hidden transition-all duration-300 hover:border-primary/20">
                <button
                  onClick={() => setOpenDisc(openDisc === i ? -1 : i)}
                  className="w-full flex items-center gap-5 p-6 lg:p-8 text-left"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary text-lg font-bold font-[family-name:var(--font-heading)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark">{disc.title}</span>
                  <svg className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${openDisc === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openDisc === i ? "max-h-[600px]" : "max-h-0"}`}>
                  <div className="px-6 lg:px-8 pb-8 pt-0">
                    <div className="border-t border-border/60 pt-6">
                      <p className="text-muted text-base lg:text-lg leading-relaxed mb-4">{disc.desc}</p>
                      <p className="text-muted text-base lg:text-lg leading-relaxed mb-6">{disc.desc2}</p>
                      <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted mb-3">Leistungen:</p>
                      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                        {disc.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-dark/80">
                            <svg className="w-4 h-4 mt-0.5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ABLAUF — Alternating Cards                                   */}
      {/* ============================================================ */}
      <section id="ablauf" ref={processRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Unser Vorgehen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-6">
              So laeuft eine SEO Beratung ab
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Transparent und strukturiert — von der ersten Frage bis zum fertigen Plan.
            </p>
          </div>

          <div className={`space-y-12 lg:space-y-16 transition-all duration-700 delay-200 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Step 01 */}
            <div className="bg-offwhite border border-border/60 rounded-xl p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                  <svg className="process-svg" width="240" height="240" viewBox="0 0 240 240">
                    {/* Conversation bubbles */}
                    <rect x="30" y="40" width="120" height="50" rx="12" fill="#C2722A" fillOpacity="0.1" stroke="#C2722A" strokeWidth="1.5" />
                    <rect x="45" y="55" width="60" height="5" rx="2.5" fill="#C2722A" fillOpacity="0.4" />
                    <rect x="45" y="66" width="80" height="5" rx="2.5" fill="#C2722A" fillOpacity="0.25" />
                    <polygon points="60,90 70,90 55,105" fill="#C2722A" fillOpacity="0.1" stroke="#C2722A" strokeWidth="1.5" strokeLinejoin="round" />
                    <rect x="90" y="115" width="120" height="50" rx="12" fill="#D4A853" fillOpacity="0.1" stroke="#D4A853" strokeWidth="1.5" />
                    <rect x="105" y="130" width="70" height="5" rx="2.5" fill="#D4A853" fillOpacity="0.4" />
                    <rect x="105" y="141" width="90" height="5" rx="2.5" fill="#D4A853" fillOpacity="0.25" />
                    <polygon points="190,165 180,165 195,180" fill="#D4A853" fillOpacity="0.1" stroke="#D4A853" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="42" cy="120" r="16" fill="#C2722A" fillOpacity="0.15" stroke="#C2722A" strokeWidth="1.5" />
                    <text x="42" y="125" textAnchor="middle" fill="#C2722A" fontSize="12" fontWeight="600">Sie</text>
                    <circle cx="198" cy="100" r="16" fill="#D4A853" fillOpacity="0.15" stroke="#D4A853" strokeWidth="1.5" />
                    <text x="198" y="105" textAnchor="middle" fill="#D4A853" fontSize="11" fontWeight="600">SF</text>
                  </svg>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="text-5xl lg:text-6xl font-bold text-primary/20 mb-2 font-[family-name:var(--font-heading)]">01</div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">
                    Erstgespräch & Bedarfsanalyse
                  </h3>
                  <p className="text-base lg:text-lg text-muted leading-relaxed">
                    Alles beginnt mit Zuhoeren. In einem kostenlosen Gespräch lernen wir Ihr Unternehmen, Ihre Ziele und Ihre Herausforderungen kennen. Wir stellen die richtigen Fragen, um den Beratungsbedarf präzise zu definieren — kein Verkaufsdruck, nur ehrliche Einschätzung.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center float-chevron"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="#C2722A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>

            {/* Step 02 */}
            <div className="bg-offwhite border border-border/60 rounded-xl p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-1">
                  <div className="text-5xl lg:text-6xl font-bold text-secondary/20 mb-2 font-[family-name:var(--font-heading)]">02</div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">
                    Umfassendes SEO-Audit
                  </h3>
                  <p className="text-base lg:text-lg text-muted leading-relaxed">
                    Wir analysieren Ihre Website auf über 200 technische, inhaltliche und strategische Faktoren. Gleichzeitig untersuchen wir Ihre Keyword-Landschaft und bewerten Ihren Wettbewerb. Das Ergebnis: eine datenbasierte Diagnose Ihrer SEO-Situation mit klarer Priorisierung.
                  </p>
                </div>
                <div className="flex justify-center lg:justify-end order-2">
                  <svg className="process-svg" width="240" height="240" viewBox="0 0 240 240">
                    {/* Document being scanned with results */}
                    <rect x="55" y="15" width="130" height="180" rx="10" fill="white" stroke="#E5E3DF" strokeWidth="2" />
                    {/* Document header */}
                    <rect x="55" y="15" width="130" height="35" rx="10" fill="#C2722A" fillOpacity="0.08" />
                    <rect x="72" y="27" width="55" height="5" rx="2.5" fill="#C2722A" fillOpacity="0.4" />
                    <rect x="72" y="37" width="35" height="3" rx="1.5" fill="#C2722A" fillOpacity="0.2" />
                    {/* Scan line */}
                    <line x1="60" y1="95" x2="180" y2="95" stroke="#C2722A" strokeWidth="2" strokeDasharray="4 3" opacity="0.6">
                      <animate attributeName="y1" values="55;190;55" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="y2" values="55;190;55" dur="3s" repeatCount="indefinite" />
                    </line>
                    {/* Check items */}
                    <circle cx="78" cy="70" r="6" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.5" />
                    <path d="M75 70L77 72.5L82 68" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <rect x="92" y="67" width="70" height="5" rx="2.5" fill="#E5E3DF" />
                    <circle cx="78" cy="95" r="6" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.5" />
                    <path d="M75 95L77 97.5L82 93" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <rect x="92" y="92" width="60" height="5" rx="2.5" fill="#E5E3DF" />
                    <circle cx="78" cy="120" r="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
                    <path d="M78 117V121M78 124V124.5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <rect x="92" y="117" width="75" height="5" rx="2.5" fill="#E5E3DF" />
                    <circle cx="78" cy="145" r="6" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1.5" />
                    <path d="M76 143L80 147M80 143L76 147" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <rect x="92" y="142" width="55" height="5" rx="2.5" fill="#E5E3DF" />
                    <circle cx="78" cy="170" r="6" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.5" />
                    <path d="M75 170L77 172.5L82 168" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <rect x="92" y="167" width="65" height="5" rx="2.5" fill="#E5E3DF" />
                    {/* Score badge */}
                    <rect x="145" y="22" width="32" height="22" rx="6" fill="#C2722A" />
                    <text x="161" y="37" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">87</text>
                    {/* Glow behind document */}
                    <ellipse cx="120" cy="210" rx="60" ry="8" fill="#C2722A" fillOpacity="0.06" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex justify-center float-chevron"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>

            {/* Step 03 */}
            <div className="bg-offwhite border border-border/60 rounded-xl p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                  <svg className="process-svg" width="240" height="240" viewBox="0 0 240 240">
                    {/* Strategy roadmap path */}
                    <path d="M40 200 Q80 180 90 150 Q100 120 120 120 Q140 120 150 90 Q160 60 200 40" fill="none" stroke="#C2722A" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="40" cy="200" r="10" fill="white" stroke="#C2722A" strokeWidth="2.5" /><circle cx="40" cy="200" r="4" fill="#C2722A" />
                    <circle cx="90" cy="150" r="10" fill="white" stroke="#D4A853" strokeWidth="2.5" /><circle cx="90" cy="150" r="4" fill="#D4A853" />
                    <circle cx="120" cy="120" r="12" fill="white" stroke="#C2722A" strokeWidth="2.5" /><circle cx="120" cy="120" r="5" fill="#C2722A" className="pulse-dot" />
                    <circle cx="150" cy="90" r="10" fill="white" stroke="#D4A853" strokeWidth="2.5" /><circle cx="150" cy="90" r="4" fill="#D4A853" />
                    <circle cx="200" cy="40" r="14" fill="#C2722A" fillOpacity="0.15" stroke="#C2722A" strokeWidth="2.5" /><circle cx="200" cy="40" r="6" fill="#C2722A" className="pulse-dot" style={{animationDelay:"0.5s"}} />
                    <text x="28" y="225" fill="#6B6B6B" fontSize="10" fontWeight="500">Start</text>
                    <text x="187" y="28" fill="#C2722A" fontSize="10" fontWeight="600">Ziel</text>
                  </svg>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="text-5xl lg:text-6xl font-bold text-primary/20 mb-2 font-[family-name:var(--font-heading)]">03</div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">
                    Strategieworkshop & Roadmap
                  </h3>
                  <p className="text-base lg:text-lg text-muted leading-relaxed">
                    In einem persönlichen Workshop präsentieren wir die Audit-Ergebnisse und entwickeln gemeinsam Ihre SEO-Strategie. Sie erhalten eine klare Roadmap mit Meilensteinen, Priorisierung nach Impact und konkreten Handlungsempfehlungen, die Ihr Team direkt umsetzen kann.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center float-chevron"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="#C2722A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>

            {/* Step 04 */}
            <div className="bg-offwhite border border-border/60 rounded-xl p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-1">
                  <div className="text-5xl lg:text-6xl font-bold text-secondary/20 mb-2 font-[family-name:var(--font-heading)]">04</div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">
                    Begleitung & Erfolgskontrolle
                  </h3>
                  <p className="text-base lg:text-lg text-muted leading-relaxed">
                    Auf Wunsch begleiten wir die Umsetzung: regelmäßige Review-Calls, Fortschritts-Monitoring und Strategie-Anpassungen bei Google-Updates oder Marktveränderungen. So stellen wir sicher, dass Ihre SEO-Maßnahmen nachhaltig wirken.
                  </p>
                </div>
                <div className="flex justify-center lg:justify-end order-2">
                  <svg className="process-svg" width="240" height="240" viewBox="0 0 240 240">
                    {/* Monitoring dashboard with circular gauge */}
                    <rect x="20" y="20" width="200" height="200" rx="16" fill="white" stroke="#E5E3DF" strokeWidth="1.5" />
                    {/* Gauge circle */}
                    <circle cx="120" cy="105" r="55" fill="none" stroke="#E5E3DF" strokeWidth="6" />
                    <circle cx="120" cy="105" r="55" fill="none" stroke="#C2722A" strokeWidth="6" strokeLinecap="round" strokeDasharray="280 346" transform="rotate(-90 120 105)">
                      <animate attributeName="stroke-dasharray" values="0 346;280 346" dur="2s" fill="freeze" />
                    </circle>
                    {/* Gauge center text */}
                    <text x="120" y="100" textAnchor="middle" fill="#1A1A1A" fontSize="26" fontWeight="700" fontFamily="var(--font-heading)">92</text>
                    <text x="120" y="118" textAnchor="middle" fill="#6B6B6B" fontSize="9" fontWeight="500">Health Score</text>
                    {/* Mini metrics below gauge */}
                    <rect x="35" y="175" width="50" height="35" rx="6" fill="#C2722A" fillOpacity="0.06" />
                    <text x="60" y="191" textAnchor="middle" fill="#C2722A" fontSize="13" fontWeight="700">47</text>
                    <text x="60" y="203" textAnchor="middle" fill="#6B6B6B" fontSize="7">Rankings</text>
                    <rect x="95" y="175" width="50" height="35" rx="6" fill="#D4A853" fillOpacity="0.06" />
                    <text x="120" y="191" textAnchor="middle" fill="#D4A853" fontSize="13" fontWeight="700">+23%</text>
                    <text x="120" y="203" textAnchor="middle" fill="#6B6B6B" fontSize="7">Traffic</text>
                    <rect x="155" y="175" width="50" height="35" rx="6" fill="#22c55e" fillOpacity="0.06" />
                    <text x="180" y="191" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="700">4.2%</text>
                    <text x="180" y="203" textAnchor="middle" fill="#6B6B6B" fontSize="7">CTR</text>
                    {/* Status dot top right */}
                    <circle cx="195" cy="38" r="5" fill="#22c55e" className="pulse-dot" />
                    <text x="185" y="42" textAnchor="end" fill="#6B6B6B" fontSize="8">Live</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WARUM SEOFORGE — Trust & Differentiators                     */}
      {/* ============================================================ */}
      <section ref={quoteRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`grid lg:grid-cols-12 gap-12 lg:gap-16 transition-all duration-700 ${quoteInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="lg:col-span-5">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Warum SeoForge</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-6 leading-tight">
                Beratung, die Ihr Team stärker macht
              </h2>
              <p className="text-muted text-base lg:text-lg leading-relaxed mb-8">
                Wir machen Sie nicht abhängig — wir machen Sie kompetent. Unsere Beratung zielt darauf ab, dass Ihr Team SEO versteht und eigenständig umsetzen kann. Natürlich sind wir da, wenn Sie Unterstuetzung brauchen.
              </p>

              {/* Quote */}
              <div className="border-l-[3px] border-primary pl-6">
                <p className="font-[family-name:var(--font-heading)] text-xl italic text-dark leading-relaxed mb-4">
                  „Die beste SEO-Strategie ist die, die Ihr Team versteht und selbst umsetzen kann."
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-bold">JH</div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Joel Heuchert</p>
                    <p className="text-xs text-muted">CEO & Gründer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {[
                { title: "Direkter Draht zum Experten", desc: "Kein Account-Manager dazwischen. Sie sprechen direkt mit dem SEO-Strategen, der Ihr Projekt kennt.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg> },
                { title: "Daten, keine Meinungen", desc: "Jede Empfehlung ist durch Daten begründet. Kein Bauchgefühl, keine Trends — nur messbare Fakten.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg> },
                { title: "Branchenwissen", desc: "200+ Projekte in diversen Branchen. Wir bringen Best Practices mit, ohne alles bei Null zu beginnen.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg> },
                { title: "Ehrlich & transparent", desc: "Wir sagen Ihnen, was machbar ist — und was nicht. Keine übertriebenen Versprechen, keine versteckten Kosten.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
              ].map((card, i) => (
                <div key={card.title} className="rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.03]">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                    {card.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark mb-2">{card.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section ref={faqRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">FAQ</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">
              Häufig gestellte Fragen
            </h2>
          </div>

          <div className={`space-y-3 transition-all duration-700 delay-100 ${faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border bg-offwhite/50 overflow-hidden transition-colors hover:border-primary/20">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-dark pr-4">{faq.q}</span>
                  <svg className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96 pb-6" : "max-h-0"}`}>
                  <p className="px-6 text-sm leading-relaxed text-muted">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BEREIT — Pre-CTA conversion section                          */}
      {/* ============================================================ */}
      <section className="bg-offwhite py-20 lg:py-28 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Headline + Copy */}
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Jetzt starten</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-6 leading-tight">
                Bereit für mehr<br />Sichtbarkeit?
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">
                Lassen Sie uns in einem kostenlosen Erstgespräch herausfinden, wie wir Ihr Unternehmen in den Suchergebnissen nach vorne bringen können. Keine Verpflichtungen — nur ehrliche Einschätzungen.
              </p>

              {/* Three promises */}
              <div className="space-y-4">
                {[
                  { title: "Kostenlose Erstanalyse Ihrer Website", desc: "Wir prüfen Ihre aktuelle SEO-Situation und zeigen erste Potenziale auf." },
                  { title: "Individueller SEO-Massnahmenplan", desc: "Kein Standardpaket — sondern Empfehlungen, die zu Ihrem Unternehmen passen." },
                  { title: "Transparente Preise ohne versteckte Kosten", desc: "Sie wissen vorher, was es kostet. Keine Ueberraschungen." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark mb-1">{item.title}</h4>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Contact card */}
            <div className="rounded-3xl bg-white border border-border p-8 lg:p-10 shadow-xl shadow-dark/[0.03]">
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-2">Gespräch vereinbaren</h3>
                <p className="text-sm text-muted">Kostenlos und unverbindlich</p>
              </div>

              <div className="space-y-4 mb-8">
                <Link
                  href="/kontakt"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl transition-all"
                >
                  Erstgespräch anfragen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a
                  href="tel:015203450695"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-dark hover:border-primary/30 hover:text-primary transition-all"
                >
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

      {/* ============================================================ */}
      {/*  KONTAKTFORMULAR                                              */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32" id="kontakt">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Kontakt</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Erstgespräch vereinbaren
            </h2>
            <p className="text-lg text-muted">
              Füllen Sie das Formular aus — wir melden uns innerhalb von 24 Stunden.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-offwhite/30 p-8 lg:p-10">
            <form className="space-y-5" action="/kontakt" method="POST">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="beratung-name" className="block text-sm font-medium text-dark mb-2">Name *</label>
                  <input type="text" id="beratung-name" name="name" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Ihr Name" />
                </div>
                <div>
                  <label htmlFor="beratung-email" className="block text-sm font-medium text-dark mb-2">E-Mail *</label>
                  <input type="email" id="beratung-email" name="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="ihre@email.de" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="beratung-company" className="block text-sm font-medium text-dark mb-2">Unternehmen</label>
                  <input type="text" id="beratung-company" name="company" className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Ihr Unternehmen" />
                </div>
                <div>
                  <label htmlFor="beratung-website" className="block text-sm font-medium text-dark mb-2">Website-URL</label>
                  <input type="url" id="beratung-website" name="website" className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="https://ihre-website.de" />
                </div>
              </div>

              <div>
                <label htmlFor="beratung-message" className="block text-sm font-medium text-dark mb-2">Nachricht *</label>
                <textarea id="beratung-message" name="message" rows={5} required className="w-full resize-none px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Beschreiben Sie kurz Ihre Situation: Was sind Ihre Ziele? Wo sehen Sie Herausforderungen?" />
              </div>

              <button type="submit" className="w-full rounded-full bg-primary px-6 py-4 text-base font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20">
                Nachricht senden
              </button>

              <p className="text-center text-xs text-muted">* Pflichtfelder | Ihre Daten werden vertraulich behandelt.</p>
            </form>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
