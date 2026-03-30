"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";
import AuditMockup from "./AuditMockup";

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
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
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
function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800, start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">{count}{suffix}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  REVEAL ON SCROLL — for audit areas                                 */
/* ------------------------------------------------------------------ */
function RevealArea({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
const faqs = [
  { q: "Was kostet ein SEO Audit bei SeoForge?", a: "Ein umfassender SEO Audit startet ab 1.500 Euro für kleine Websites (bis 50 Seiten). Für groessere Projekte erstellen wir ein individuelles Angebot basierend auf Seitenanzahl, Komplexität und Wettbewerbsumfeld." },
  { q: "Wie lange dauert ein SEO Audit?", a: "Die Analyse dauert 1–2 Werktage, je nach Website-Größe. Sie erhalten einen ausführlichen Report plus ein 60-minuetiges Ergebnisgespräch. Express-Audits (3 Werktage) sind gegen Aufpreis moeglich." },
  { q: "Was ist der Unterschied zwischen Audit und Beratung?", a: "Ein Audit ist eine Bestandsaufnahme: Wo stehen Sie? Was funktioniert? Was nicht? Beratung geht weiter und entwickelt eine Strategie für die Zukunft. Oft starten Kunden mit dem Audit und wechseln dann zur laufenden Beratung." },
  { q: "Kann mein Team die Empfehlungen selbst umsetzen?", a: "Ja — der Aktionsplan ist so geschrieben, dass Ihr Entwickler- und Marketing-Team die Maßnahmen eigenständig umsetzen kann. Jede Empfehlung enthält Priorität, Aufwand und erwarteten Impact. Bei Bedarf begleiten wir die Umsetzung." },
  { q: "Wie oft sollte man einen SEO Audit machen?", a: "Mindestens einmal jährlich oder bei groesseren Website-Änderungen (Relaunch, Migration, neues CMS). Bei stark umkämpften Märkten empfehlen wir halbjährliche Audits, um der Konkurrenz voraus zu bleiben." },
  { q: "Prüfen Sie auch die Konkurrenz?", a: "Ja, eine Wettbewerbsanalyse ist fester Bestandteil jedes Audits. Wir vergleichen Ihre Website mit den Top-3 Konkurrenten in Ihrer Branche und identifizieren ungenutztes Potenzial." },
];

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function SeoAuditPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [editRef, editInView] = useInView();
  const [areasRef, areasInView] = useInView();
  const [delivRef, delivInView] = useInView();
  const [processRef, processInView] = useInView();
  const [faqRef, faqInView] = useInView();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ============================================================ */}
      {/*  HERO — Split with AuditMockup                                */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/[0.05] via-secondary/[0.03] to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-[450px] w-[450px] rounded-full bg-gradient-to-tl from-secondary/[0.06] to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary hero-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Professionelle Website-Analyse
              </div>
              <h1 className="hero-title text-5xl lg:text-6xl leading-[1.12] text-dark font-[family-name:var(--font-heading)]">
                <span className="block">SEO Audit:</span>
                <span className="text-primary">Die Diagnose vor der Therapie</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                Bevor wir optimieren, müssen wir verstehen. Unser SEO Audit durchleuchtet Ihre Website auf über 200 Faktoren — technisch, inhaltlich, strukturell. Das Ergebnis: Ein klarer Aktionsplan, der zeigt, wo die groessten Hebel liegen.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {["200+ Prüfpunkte", "Priorisierter Aktionsplan", "Inkl. Ergebnisgespräch"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="#kontakt" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30">
                  Audit anfragen
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#bereiche" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:bg-primary/[0.04] hover:text-primary">
                  Was wir prüfen
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.6s" }}>
                <div className="flex -space-x-2">
                  {["PK", "SM", "TR", "JH", "AW"].map((init, i) => (
                    <div key={init} className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 text-[10px] font-semibold text-white ring-2 ring-white" style={{ zIndex: 5 - i }}>{init}</div>
                  ))}
                </div>
                <p className="text-xs text-muted">Über <span className="font-semibold text-dark">500 Audits</span> durchgeführt</p>
              </div>
            </div>
            <AuditMockup />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STATS                                                        */}
      {/* ============================================================ */}
      <section className="bg-offwhite border-y border-border py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter value={200} suffix="+" label="Prüfpunkte pro Audit" />
            <Counter value={500} suffix="+" label="Audits durchgeführt" />
            <Counter value={40} suffix="+" label="Seiten Report" />
            <Counter value={2} suffix=" Tage" label="Durchschn. Lieferzeit" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  EDITORIAL — Warum ein Audit der erste Schritt ist            */}
      {/* ============================================================ */}
      <section ref={editRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`transition-all duration-700 ${editInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

            {/* Centered manifesto */}
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Ausgangspunkt</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-8">
                Keine Therapie ohne <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Diagnose</span>
              </h2>
              <p className="text-lg lg:text-xl text-muted leading-relaxed">
                Die meisten Unternehmen optimieren blind: Blog-Artikel ohne Keyword-Recherche, Speed-Optimierung während Crawl-Fehler die wichtigsten Seiten unsichtbar machen, Backlink-Aufbau während technische Probleme den Link-Juice vernichten. Ein Audit deckt auf, was wirklich los ist.
              </p>
            </div>

            {/* 3 insight cards — what goes wrong without audit */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>,
                  title: "Blinde Flecken",
                  desc: "Seiten die Google nicht crawlen kann, Duplicate Content der Rankings kannibalisiert, fehlende Meta-Daten auf Dutzenden Seiten — Probleme, die Sie ohne Audit nie finden würden.",
                  accent: "border-t-red-400",
                },
                {
                  title: "Falsches Budget",
                  desc: "Geld für Maßnahmen ausgeben, die kaum Impact haben, während Quick Wins mit minimalem Aufwand unentdeckt bleiben. Ohne Priorisierung verbrennen Sie Ressourcen.",
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                  accent: "border-t-amber-400",
                },
                {
                  title: "Wettbewerber ziehen vorbei",
                  desc: "Ihre Konkurrenz optimiert systematisch. Ohne Ueberblick über Ihre eigene Position und deren Stärken verlieren Sie Rankings — schleichend, aber messbar.",
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>,
                  accent: "border-t-primary",
                },
              ].map((card) => (
                <div key={card.title} className={`rounded-2xl border border-border ${card.accent} border-t-[3px] bg-offwhite/30 p-8`}>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-dark/[0.04] text-dark/60">
                    {card.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">{card.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* EYECATCHER: Compact audit report card */}
            <div className="mx-auto max-w-2xl">
              <div className="rounded-2xl border border-border bg-white shadow-lg shadow-dark/[0.03] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-offwhite/50 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold text-dark">Audit Report</span>
                  </div>
                  <span className="text-[10px] text-muted">ihr-unternehmen.de</span>
                </div>

                <div className="p-6">
                  {/* Score + categories in one compact view */}
                  <div className="flex items-center gap-6 mb-5">
                    <div className="text-center shrink-0">
                      <p className="text-4xl font-bold text-primary font-[family-name:var(--font-heading)]">75</p>
                      <p className="text-[9px] text-muted uppercase tracking-wide">/ 100</p>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      {[
                        { name: "Technik", score: 92, color: "bg-green-500" },
                        { name: "On-Page", score: 74, color: "bg-amber-400" },
                        { name: "Content", score: 68, color: "bg-amber-400" },
                        { name: "Backlinks", score: 42, color: "bg-red-400" },
                        { name: "Mobile", score: 95, color: "bg-green-500" },
                        { name: "Speed", score: 88, color: "bg-green-500" },
                      ].map((c) => (
                        <div key={c.name} className="text-center">
                          <div className="h-1.5 bg-border rounded-full overflow-hidden mb-1">
                            <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.score}%` }} />
                          </div>
                          <span className="text-[9px] text-muted">{c.name} <span className="font-semibold text-dark">{c.score}</span></span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top findings — compact */}
                  <div className="space-y-1.5">
                    {[
                      { issue: "47 Seiten ohne Meta-Description", sev: "kritisch", color: "text-red-500 bg-red-50" },
                      { issue: "LCP bei 4.8s (Limit: 2.5s)", sev: "kritisch", color: "text-red-500 bg-red-50" },
                      { issue: "23 Redirect-Chains", sev: "wichtig", color: "text-amber-600 bg-amber-50" },
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-3 py-1.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-offwhite text-[9px] font-bold text-muted">{i + 1}</span>
                        <span className="flex-1 text-[11px] text-dark/70 truncate">{f.issue}</span>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${f.color}`}>{f.sev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  AUDIT BEREICHE — 6 areas as reveal cards                     */}
      {/* ============================================================ */}
      <section id="bereiche" ref={areasRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${areasInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">6 Analysebereiche</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Was wir in Ihrem Audit prüfen</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Jeder Bereich wird mit spezialisierten Tools und Methoden analysiert. Nichts bleibt unentdeckt.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Technisches SEO", desc: "Crawlbarkeit, Indexierung, Seitenarchitektur, robots.txt, XML-Sitemap, Canonical-Tags, Structured Data, hreflang.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.76-3.35a.9.9 0 010-1.56l5.76-3.35a.9.9 0 01.9 0l5.76 3.35a.9.9 0 010 1.56l-5.76 3.35a.9.9 0 01-.9 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.66 11.82v4.68a.9.9 0 00.45.78l5.76 3.35a.9.9 0 00.9 0l5.76-3.35a.9.9 0 00.45-.78v-4.68" /></svg>, accent: "primary" },
              { title: "On-Page Optimierung", desc: "Title-Tags, Meta-Descriptions, Heading-Struktur, interne Verlinkung, URL-Struktur, Keyword-Optimierung pro Seite.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>, accent: "secondary" },
              { title: "Content-Qualität", desc: "Relevanz, Einzigartigkeit, Lesbarkeit, Textlänge, E-E-A-T-Signale, Duplicate Content, Content Gaps vs. Wettbewerb.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>, accent: "primary" },
              { title: "Backlink-Profil", desc: "Link-Qualität, Anchor-Text-Verteilung, toxische Links, Domain Authority, Referring Domains, Wettbewerber-Vergleich.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>, accent: "secondary" },
              { title: "Mobile & UX", desc: "Mobile-Friendliness, Responsive Verhalten, Touch-Targets, Navigation, Core Web Vitals auf Mobile, Accessibility.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>, accent: "primary" },
              { title: "Performance & Speed", desc: "Ladezeiten, Core Web Vitals (LCP, FID, CLS), Bildoptimierung, Caching, Server Response Time, JavaScript-Execution.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>, accent: "secondary" },
            ].map((area, i) => (
              <RevealArea key={area.title} delay={i * 100}>
                <div className={`group h-full rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-${area.accent}/30 hover:shadow-xl hover:shadow-${area.accent}/[0.04] hover:-translate-y-1`}>
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${area.accent === "primary" ? "bg-primary/[0.08] text-primary" : "bg-secondary/[0.12] text-secondary"} transition-colors group-hover:${area.accent === "primary" ? "bg-primary" : "bg-secondary"} group-hover:text-white`}>
                    {area.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">{area.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{area.desc}</p>
                </div>
              </RevealArea>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ABLAUF — Visual journey to your audit                        */}
      {/* ============================================================ */}
      <section ref={processRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">So funktioniert es</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Ihr Weg zum SEO Audit</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Drei Schritte, null Risiko. Und danach wissen Sie genau, wo Sie stehen.</p>
          </div>

          <div className={`transition-all duration-700 delay-200 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="relative">
              <div className="hidden lg:block absolute top-[60px] left-[16%] right-[16%] h-[2px] border-t-[2px] border-dashed border-primary/25" />
              <div className="grid lg:grid-cols-3 gap-10">
                {[
                  { num: "01", title: "Anfragen", subtitle: "2 Minuten", desc: "Website-URL senden, kurzes Gespräch oder Formular. Wir schätzen Umfang und Komplexität ein und erstellen ein Angebot. Kostenlos.", icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>, color: "bg-primary" },
                  { num: "02", title: "Analysieren", subtitle: "1–2 Werktage", desc: "200+ Prüfpunkte, 6 Bereiche, professionelle Tools plus manuelle Expertise. Wir durchleuchten alles — von der Serverantwort bis zum letzten Backlink.", icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>, color: "bg-secondary" },
                  { num: "03", title: "Ergebnisse", subtitle: "60 Min. Gespräch", desc: "40+ Seiten Report, priorisierter Aktionsplan und ein persönliches Gespräch. Danach wissen Sie exakt, was zu tun ist — und in welcher Reihenfolge.", icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>, color: "bg-primary" },
                ].map((step) => (
                  <div key={step.num} className="relative">
                    <div className="flex justify-center mb-6">
                      <div className={`relative z-10 flex h-[120px] w-[120px] items-center justify-center rounded-full ${step.color} text-white shadow-xl border-[5px] border-white`}>{step.icon}</div>
                    </div>
                    <div className="rounded-2xl bg-white border border-border p-6 text-center transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary/40 font-[family-name:var(--font-heading)]">{step.num}</span>
                        <span className="w-px h-3 bg-border" />
                        <span className="text-xs font-medium text-primary">{step.subtitle}</span>
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">{step.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 text-center">
              <Link href="#kontakt" className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl transition-all">
                Jetzt Audit anfragen — kostenlos & unverbindlich
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DELIVERABLES — What you get                                  */}
      {/* ============================================================ */}
      <section ref={delivRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${delivInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Ihre Ergebnisse</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-6">Was Sie von uns erhalten</h2>
              <p className="text-lg text-muted leading-relaxed mb-10">Kein generisches PDF. Sondern ein massgeschneiderter Report mit konkreten Handlungsempfehlungen, die Ihr Team sofort umsetzen kann.</p>
              <div className="space-y-5">
                {[
                  { title: "40+ Seiten Audit-Report", desc: "Alle Findings dokumentiert, bewertet und priorisiert nach Dringlichkeit und erwartetem Impact.", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg> },
                  { title: "Priorisierter Aktionsplan", desc: "Quick Wins und langfristige Hebel klar getrennt. Jede Maßnahme mit Aufwand und erwarteter Wirkung.", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg> },
                  { title: "Wettbewerbsvergleich", desc: "Ihre Top-3 Konkurrenten analysiert: Was machen sie besser? Wo haben Sie Chancen?", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg> },
                  { title: "60 Min. Ergebnisgespräch", desc: "Persönliche Praesentation aller Findings. Fragen beantworten, Prioritäten besprechen, nächste Schritte planen.", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg> },
                ].map((d) => (
                  <div key={d.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">{d.icon}</div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">{d.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual: Stacked document mockup */}
            <div className="relative hidden lg:block">
              <div className="absolute top-4 left-4 w-full h-full rounded-2xl bg-secondary/10 border border-secondary/20" />
              <div className="absolute top-2 left-2 w-full h-full rounded-2xl bg-primary/5 border border-primary/10" />
              <div className="relative rounded-2xl border-2 border-border bg-white p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"><svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg></div>
                  <div><h4 className="text-lg font-bold text-dark">SEO Audit Report</h4><p className="text-xs text-muted">ihr-unternehmen.de — März 2026</p></div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="h-3 w-full rounded bg-offwhite" /><div className="h-3 w-3/4 rounded bg-offwhite" />
                  <div className="h-px bg-border my-3" />
                  <div className="h-3 w-full rounded bg-offwhite" /><div className="h-3 w-5/6 rounded bg-offwhite" /><div className="h-3 w-2/3 rounded bg-offwhite" />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-offwhite p-4">
                  <span className="text-sm font-semibold text-dark">42 Seiten | PDF</span>
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 rounded-full border-4 border-white bg-primary px-4 py-2 shadow-lg"><p className="text-sm font-bold text-white">42 Seiten</p></div>
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
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">Häufig gestellte Fragen</h2>
          </div>
          <div className={`space-y-3 transition-all duration-700 delay-100 ${faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border bg-offwhite/50 overflow-hidden transition-colors hover:border-primary/20">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-semibold text-dark pr-4">{faq.q}</span>
                  <svg className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
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
      {/*  KONTAKTFORMULAR                                              */}
      {/* ============================================================ */}
      <section className="bg-offwhite py-24 lg:py-32 border-t border-border" id="kontakt">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Jetzt starten</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">SEO Audit anfragen</h2>
            <p className="text-lg text-muted">Senden Sie uns Ihre Website-URL — wir melden uns innerhalb von 24 Stunden mit einem Angebot.</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8 lg:p-10 shadow-sm">
            <form className="space-y-5" action="/kontakt" method="POST">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label htmlFor="audit-name" className="block text-sm font-medium text-dark mb-2">Name *</label><input type="text" id="audit-name" name="name" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Ihr Name" /></div>
                <div><label htmlFor="audit-email" className="block text-sm font-medium text-dark mb-2">E-Mail *</label><input type="email" id="audit-email" name="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="ihre@email.de" /></div>
              </div>
              <div><label htmlFor="audit-url" className="block text-sm font-medium text-dark mb-2">Website-URL *</label><input type="url" id="audit-url" name="website" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="https://ihre-website.de" /></div>
              <div><label htmlFor="audit-msg" className="block text-sm font-medium text-dark mb-2">Was moechten Sie wissen? (optional)</label><textarea id="audit-msg" name="message" rows={3} className="w-full resize-none px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Gibt es bestimmte Bereiche, die Sie besonders interessieren?" /></div>
              <button type="submit" className="w-full rounded-full bg-primary px-6 py-4 text-base font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20">Audit anfragen</button>
              <p className="text-center text-xs text-muted">* Pflichtfelder | Antwort innerhalb von 24 Stunden</p>
            </form>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
