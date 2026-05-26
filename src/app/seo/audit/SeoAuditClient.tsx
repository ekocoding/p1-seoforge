"use client";

import { useState } from "react";
import Link from "next/link";
import SubpageLayout from "@/app/components/SubpageLayout";
import AuditMockup from "./AuditMockup";
import FaqAccordion from "@/app/components/FaqAccordion";


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
export default function SeoAuditClient() {
  const [openArea, setOpenArea] = useState<number>(0);

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
        <div className="relative w-full mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary hero-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Professionelle Website-Analyse
              </div>
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-[1.12] text-dark font-[family-name:var(--font-heading)]">
                <span className="block">SEO Audit:</span>
                <span className="text-primary">Die Diagnose vor der Therapie</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                Bevor wir optimieren, müssen wir verstehen. Unser SEO Audit durchleuchtet Ihre Website auf über 200 Faktoren — technisch, inhaltlich, strukturell. Das Ergebnis: Ein klarer Aktionsplan, der zeigt, wo die groessten Hebel liegen.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {["Systematische Analyse", "Priorisierter Aktionsplan", "Inkl. Ergebnisgespräch"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="#jetzt-starten" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30">
                  Audit anfragen
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#bereiche" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:bg-primary/[0.04] hover:text-primary">
                  Was wir prüfen
                </Link>
              </div>
            </div>
            <AuditMockup />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  AUSGANGSPUNKT — Visually bold new design                      */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">

            {/* Header */}
            <div className="max-w-4xl mb-20">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-5">Der Ausgangspunkt</span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl lg:text-6xl font-bold text-dark leading-[1.05] mb-8">
                Keine Therapie<br />ohne{" "}
                <span className="relative inline-block">
                  Diagnose
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full" />
                </span>
              </h2>
              <p className="text-xl text-muted leading-relaxed max-w-3xl">
                Die meisten Unternehmen optimieren blind: Blog-Artikel ohne Keyword-Recherche, Speed-Optimierung während Crawl-Fehler die wichtigsten Seiten unsichtbar machen. Ein Audit macht Schluss damit.
              </p>
            </div>

            {/* Main visual: horizontal scan animation mockup + 3 insight cards */}
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

              {/* Left: insight cards stacked */}
              <div className="lg:col-span-2 space-y-4">
                {[
                  {
                    title: "Blinde Flecken",
                    desc: "Seiten die Google nicht crawlen kann, Duplicate Content der Rankings kannibalisiert — Probleme, die Sie ohne Audit nie finden würden.",
                    color: "bg-red-500",
                    textColor: "text-red-600",
                    bgColor: "bg-red-50",
                  },
                  {
                    title: "Falsches Budget",
                    desc: "Geld für Maßnahmen mit kaum Impact ausgeben, während Quick Wins mit minimalem Aufwand unentdeckt bleiben.",
                    color: "bg-amber-400",
                    textColor: "text-amber-600",
                    bgColor: "bg-amber-50",
                  },
                  {
                    title: "Wettbewerber überholen",
                    desc: "Ihre Konkurrenz optimiert systematisch. Ohne Überblick verlieren Sie Rankings — schleichend, aber messbar.",
                    color: "bg-primary",
                    textColor: "text-primary",
                    bgColor: "bg-primary/5",
                  },
                ].map((card, i) => (
                  <div key={i} className="group rounded-2xl border border-border bg-white p-6 transition-all duration-500 hover:shadow-lg hover:-translate-x-2"
                    style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${card.color}`} />
                      <h3 className="font-[family-name:var(--font-heading)] font-bold text-dark">{card.title}</h3>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>

              {/* Right: audit report visual */}
              <div className="lg:col-span-3">
                <div className="rounded-3xl border border-border bg-white shadow-2xl shadow-dark/[0.06] overflow-hidden">
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 bg-offwhite/80 px-5 py-3.5 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1.5 text-xs text-muted border border-border flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      audit.seoforge.de/analyse
                    </div>
                    <div className="text-[10px] text-muted font-medium hidden sm:block">Analyse läuft...</div>
                  </div>

                  <div className="p-6 lg:p-8">
                    {/* Score + categories */}
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
                      {/* Circle score */}
                      <div className="relative shrink-0">
                        <svg className="w-20 h-20" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E3DF" strokeWidth="6" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#C2722A" strokeWidth="6"
                            strokeLinecap="round" strokeDasharray="180 251" transform="rotate(-90 50 50)">
                            <animate attributeName="stroke-dasharray" values="0 251;180 251" dur="1.5s" fill="freeze" />
                          </circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-dark font-[family-name:var(--font-heading)]">72</span>
                          <span className="text-[8px] text-muted uppercase tracking-wide">/100</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-dark mb-1">SEO Health Score</p>
                        <p className="text-xs text-muted mb-3">24 Optimierungspotenziale identifiziert</p>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: "Technik", score: 88, color: "bg-green-500" },
                            { name: "Content", score: 65, color: "bg-amber-400" },
                            { name: "Backlinks", score: 38, color: "bg-red-400" },
                          ].map((c) => (
                            <div key={c.name} className="text-center">
                              <div className="h-1.5 bg-border rounded-full overflow-hidden mb-1">
                                <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.score}%` }} />
                              </div>
                              <span className="text-[9px] text-muted">{c.name} <strong className="text-dark">{c.score}</strong></span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Finding list */}
                    <div className="space-y-2.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">Kritische Findings</p>
                      {[
                        { issue: "47 Seiten ohne Meta-Description", sev: "kritisch", color: "text-red-600 bg-red-50 border-red-200" },
                        { issue: "LCP bei 4.8s — Limit: 2.5s", sev: "kritisch", color: "text-red-600 bg-red-50 border-red-200" },
                        { issue: "23 Redirect-Chains in der Seitenstruktur", sev: "wichtig", color: "text-amber-600 bg-amber-50 border-amber-200" },
                        { issue: "Content-Kannibalisierung: 8 Keywords", sev: "wichtig", color: "text-amber-600 bg-amber-50 border-amber-200" },
                        { issue: "Fehlende Schema-Markups: 31 Seiten", sev: "optimieren", color: "text-blue-600 bg-blue-50 border-blue-200" },
                      ].map((f, i) => (
                        <div key={i} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-offwhite text-[9px] font-bold text-muted">{i + 1}</span>
                          <span className="flex-1 text-xs text-dark/70">{f.issue}</span>
                          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${f.color}`}>{f.sev}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action footer */}
                    <div className="mt-6 flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/[0.05] to-secondary/[0.02] border border-primary/10 px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold text-dark">Priorisierter Aktionsplan</p>
                        <p className="text-[10px] text-muted">Quick Wins zuerst, große Hebel danach</p>
                      </div>
                      <span className="text-xs font-bold text-primary">→ Bereit</span>
                    </div>
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
      <section id="bereiche" className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">6 Analysebereiche</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Was wir in Ihrem Audit prüfen</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Jeder Bereich wird mit spezialisierten Tools und Methoden analysiert. Nichts bleibt unentdeckt.</p>
          </div>

          {/* Accordion-style — each area expands */}
          <div className="space-y-2">
            {[
              {
                num: "01",
                title: "Technisches SEO",
                subtitle: "Grundlage für alles andere",
                desc: "Crawlbarkeit, Indexierung, Seitenarchitektur, robots.txt, XML-Sitemap, Canonical-Tags, Structured Data, hreflang. Was Google nicht crawlen kann, existiert nicht.",
                checks: ["Crawl-Budget-Analyse", "Indexierungs-Status", "Canonical-Tags", "Sitemap-Validierung", "robots.txt", "hreflang"],
                accent: "primary",
              },
              {
                num: "02",
                title: "On-Page Optimierung",
                subtitle: "Jede Seite zählt",
                desc: "Title-Tags, Meta-Descriptions, Heading-Struktur, interne Verlinkung, URL-Struktur, Keyword-Optimierung. Die Bausteine, die jede einzelne Seite ranking-fähig machen.",
                checks: ["Title-Tags", "Meta-Descriptions", "Heading-Hierarchie", "Keyword-Mapping", "URL-Struktur", "Interne Links"],
                accent: "secondary",
              },
              {
                num: "03",
                title: "Content-Qualität",
                subtitle: "Relevanz & Tiefe",
                desc: "Relevanz, Einzigartigkeit, Lesbarkeit, E-E-A-T-Signale, Duplicate Content, Content Gaps gegenüber dem Wettbewerb. Nur starker Content rankt dauerhaft.",
                checks: ["E-E-A-T Signale", "Duplicate Content", "Content Gaps", "Textlänge & Tiefe", "Lesbarkeit", "Strukturierte Daten"],
                accent: "primary",
              },
              {
                num: "04",
                title: "Backlink-Profil",
                subtitle: "Autorität & Vertrauen",
                desc: "Link-Qualität, Anchor-Text-Verteilung, toxische Links, Domain Authority, Referring Domains, Wettbewerber-Vergleich. Backlinks sind Vertrauensvoten.",
                checks: ["Domain Authority", "Toxic Links", "Anchor-Texts", "Referring Domains", "Link-Wachstum", "Konkurrenz-Vergleich"],
                accent: "secondary",
              },
              {
                num: "05",
                title: "Mobile & UX",
                subtitle: "Mobile-First Realität",
                desc: "Mobile-Friendliness, Responsive Verhalten, Touch-Targets, Navigation, Core Web Vitals auf Mobile, Accessibility. Google indexiert zuerst mobil.",
                checks: ["Mobile-Friendliness", "Touch-Targets", "Responsive Design", "Mobile CWV", "Navigation", "Accessibility"],
                accent: "primary",
              },
              {
                num: "06",
                title: "Performance & Speed",
                subtitle: "Geschwindigkeit = Rankings",
                desc: "Ladezeiten, Core Web Vitals (LCP, FID, CLS), Bildoptimierung, Caching, Server Response Time, JavaScript-Execution. Jede Sekunde Ladezeit kostet Rankings.",
                checks: ["LCP < 2.5s", "CLS < 0.1", "Server Response", "Bild-Optimierung", "JS-Execution", "Caching"],
                accent: "secondary",
              },
            ].map((area, i) => (
              <div key={area.num} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openArea === i ? "border-primary/20 shadow-lg shadow-primary/[0.04]" : "border-border bg-white hover:border-border"}`}>
                <button
                  onClick={() => setOpenArea(openArea === i ? -1 : i)}
                  className="w-full flex items-center gap-5 px-6 py-5 text-left bg-white"
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold font-[family-name:var(--font-heading)] transition-colors ${openArea === i ? "bg-primary text-white" : "bg-primary/[0.08] text-primary"}`}>
                    {area.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-heading)] font-bold text-dark">{area.title}</span>
                      <span className="hidden sm:block text-[11px] text-muted">{area.subtitle}</span>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${openArea === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openArea === i ? "max-h-96" : "max-h-0"}`}>
                  <div className="px-6 pb-6 pt-0 bg-white">
                    <div className="border-t border-border/60 pt-5 grid sm:grid-cols-[1fr_auto] gap-6 items-start">
                      <p className="text-sm text-muted leading-relaxed">{area.desc}</p>
                      <div className="shrink-0 grid grid-cols-2 gap-1.5 min-w-[240px]">
                        {area.checks.map((check) => (
                          <div key={check} className="flex items-center gap-1.5 text-[11px] text-dark/70">
                            <svg className="w-3 h-3 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            {check}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ABLAUF — Visual journey to your audit                        */}
      {/* ============================================================ */}
      <section className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">So funktioniert es</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Ihr Weg zum SEO Audit</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Drei Schritte, null Risiko. Und danach wissen Sie genau, wo Sie stehen.</p>
          </div>

          <div className="transition-all duration-700 delay-200 reveal">
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
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DELIVERABLES — What you get                                  */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 reveal">
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
      {/*  RELATED SERVICES                                             */}
      {/* ============================================================ */}
      <section className="py-12 bg-offwhite border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted mb-5">Passend dazu</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/seo/betreuung" className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-dark text-sm mb-1">Laufende SEO Betreuung</h3>
                <p className="text-xs text-muted leading-relaxed">Nach dem Audit kommt die kontinuierliche Umsetzung. Monatliche SEO Betreuung die Rankings systematisch aufbaut.</p>
              </div>
              <svg className="w-4 h-4 text-muted shrink-0 mt-0.5 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/seo/betreuung/roi" className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/[0.1] text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-dark text-sm mb-1">SEO ROI berechnen</h3>
                <p className="text-xs text-muted leading-relaxed">Wie viel bringt SEO-Betreuung wirklich? ROI-Rechner und ehrlicher Vergleich zu Google Ads.</p>
              </div>
              <svg className="w-4 h-4 text-muted shrink-0 mt-0.5 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
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
                Sehen Sie,<br />was Google sieht
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">Ein professionelles SEO-Audit deckt auf, was Ihre Rankings bremst — und zeigt Ihnen priorisiert, was Sie zuerst anpacken sollten.</p>
              <div className="space-y-4">
                {[
                  { title: "200+ Prüfpunkte", desc: "Von technischer Performance über Crawlbarkeit bis zu Content-Qualität — vollständig dokumentiert." },
                  { title: "Priorisierter Report", desc: "Keine ellenlange Liste. Klare Priorisierung nach Impact, damit Ihr Team sofort weiß, womit es anfangen soll." },
                  { title: "Sofort actionable", desc: "Konkrete Handlungsempfehlungen, die Ihr Entwicklungsteam direkt umsetzen kann." },
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
                  Audit anfragen
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
