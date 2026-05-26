"use client";

import { useState } from "react";
import Link from "next/link";
import SubpageLayout from "@/app/components/SubpageLayout";
import FaqAccordion from "@/app/components/FaqAccordion";

/* ------------------------------------------------------------------ */
/*  INTERSECTION OBSERVER                                              */
/* ------------------------------------------------------------------ */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (<div className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>);
}

/* ------------------------------------------------------------------ */
/*  STATION DATA                                                        */
/* ------------------------------------------------------------------ */
const stationData = [
  {
    num: "01", title: "Meta-Tags", sub: "Title & Description",
    desc: "Der Title-Tag ist das Erste, was Google und Nutzer sehen. 55–60 Zeichen, Primär-Keyword vorne, einzigartig für jede Seite. Die Meta-Description entscheidet über Klickrate — mit einem klaren CTA, dem Keyword und exakt 150–160 Zeichen.",
    impact: "Klickrate +200–500%",
    checks: ["Title: 55–60 Zeichen, Keyword in den ersten 60 Zeichen", "Einzigartiger Title pro Seite — keine Duplikate", "Meta-Description: 150–160 Zeichen mit CTA", "Keyword natürlich in Meta-Description eingebaut", "Open Graph Title und Description gesetzt"]
  },
  {
    num: "02", title: "Headings", sub: "H1–H3 Hierarchie",
    desc: "Genau ein H1 pro Seite, das das Primär-Keyword enthält. H2-Tags strukturieren den Content und enthalten sekundäre Keywords. H3-Tags gliedern Absätze. Eine logische Hierarchie hilft Google, die Inhaltsstruktur zu verstehen — und Nutzern, schnell zu scannen.",
    impact: "Crawl-Qualität +80%",
    checks: ["Exakt 1x H1 pro Seite mit Primär-Keyword", "H2-Tags für Hauptabschnitte mit sekundären Keywords", "H3-Tags für Unterabschnitte", "Keine Heading-Sprünge (H1→H3 überspringen)", "Headings beschreiben den folgenden Content präzise"]
  },
  {
    num: "03", title: "Interne Links", sub: "Min. 7 pro Seite",
    desc: "Interne Verlinkung ist der unterschätzte SEO-Hebel. Sie verteilt Link Equity, hilft Google beim Crawlen und signalisiert welche Seiten wichtig sind. Jede Seite sollte mindestens 7 kontextuelle interne Links haben — mit sprechenden Ankertexten, die das Ziel-Keyword enthalten.",
    impact: "Domain-Autorität aufbauen",
    checks: ["Min. 7 kontextuelle interne Links pro Seite", "Ankertexte beschreibend, nicht 'hier klicken'", "Wichtigste Seiten bekommen meiste internen Links", "Breadcrumbs strukturieren die Hierarchie", "Keine verwaisten Seiten ohne interne Links"]
  },
  {
    num: "04", title: "Speed", sub: "LCP unter 2.5s",
    desc: "Core Web Vitals sind seit 2021 offizieller Google Ranking-Faktor. LCP (Largest Contentful Paint) unter 2.5 Sekunden, FID unter 100ms, CLS unter 0.1. Jede Sekunde Ladezeit kostet Conversions — und Rankings. Wir optimieren auf echte Performance, nicht nur Tools-Scores.",
    impact: "Rankings + Conversions",
    checks: ["LCP (Largest Contentful Paint) < 2.5s", "FID (First Input Delay) < 100ms", "CLS (Cumulative Layout Shift) < 0.1", "First Byte Time (TTFB) < 800ms", "Bilder und Scripts lazy-loaded, kritisches CSS inline"]
  },
  {
    num: "05", title: "URL-Struktur", sub: "Clean & keyword-haltig",
    desc: "Sprechende URLs sind kurz, enthalten das Ziel-Keyword und sind ohne Parameter. Tiefe Verzeichnisse (mehr als 3 Ebenen) erschweren das Crawlen. Konsistente URL-Strukturen signalisieren Google die Seitenarchitektur — und machen Links leichter zu verstehen.",
    impact: "Crawl-Effizienz hoch",
    checks: ["URL enthält Primär-Keyword", "Keine ID-Parameter (?id=384)", "Maximal 3 Verzeichnisebenen tief", "Kleinbuchstaben, Bindestriche statt Unterstriche", "Canonical-Tags für Duplicate-Content gesetzt"]
  },
  {
    num: "06", title: "Bilder", sub: "WebP & Alt-Texte",
    desc: "Bilder ohne Alt-Text sind für Google unsichtbar. Alt-Texte beschreiben das Bild und enthalten wo sinnvoll das Keyword. WebP-Format reduziert Dateigrößen um 30–50% gegenüber JPEG — ohne Qualitätsverlust. Lazy Loading lädt Bilder erst wenn sie im Viewport sind.",
    impact: "Ladezeit -40%, Accessibility ↑",
    checks: ["Alt-Text für jedes Bild: beschreibend + Keyword wo passend", "WebP-Format statt JPEG/PNG", "Bilder komprimiert: unter 100KB für Content-Bilder", "Lazy Loading für alle Bilder below the fold", "Responsive Bilder mit srcset für verschiedene Bildschirmgrößen"]
  },
];

/* ------------------------------------------------------------------ */
/*  HERO MOCKUP — Code editor style                                    */
/* ------------------------------------------------------------------ */
function OnPageMockup() {
  return (
    <div className="hero-dashboard">
      <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
        {/* Dark editor header */}
        <div className="flex items-center gap-2 bg-dark px-4 py-2.5">
          <div className="flex gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-red-400" /><div className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><div className="h-2.5 w-2.5 rounded-full bg-green-400" /></div>
          <span className="ml-2 text-[10px] text-white/50 font-mono">index.html — On-Page Analyse</span>
          <div className="ml-auto flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-[9px] text-white/40">Score: 96</span></div>
        </div>

        {/* Visual page scan result */}
        <div className="p-5">
          {/* Simulated webpage being scanned */}
          <div className="rounded-xl border border-primary/15 bg-offwhite/30 p-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2"><div className="h-5 w-3/4 rounded bg-dark/70" /><span className="text-[8px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">H1 ✓</span></div>
              <div className="h-2 rounded bg-dark/8 w-full" /><div className="h-2 rounded bg-dark/8 w-11/12" />
              <div className="flex items-center gap-2"><div className="h-4 w-2/5 rounded bg-dark/40" /><span className="text-[8px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">H2</span></div>
              <div className="h-2 rounded bg-dark/8 w-full" />
              <div className="flex items-center gap-1.5"><div className="h-2 rounded bg-primary/25 w-20" /><span className="text-[7px] text-primary">Link ↗</span></div>
              <div className="h-2 rounded bg-dark/8 w-9/12" />
            </div>
          </div>

          {/* Score result */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-500 text-white shadow-md">
              <span className="text-2xl font-bold font-[family-name:var(--font-heading)]">96</span>
            </div>
            <div className="flex-1 space-y-1.5">
              {[
                { label: "Technik", w: "w-[96%]" },
                { label: "Content", w: "w-[92%]" },
                { label: "Struktur", w: "w-[98%]" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="text-[9px] text-muted w-12 shrink-0">{b.label}</span>
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden"><div className={`h-full bg-green-500 rounded-full ${b.w}`} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
const faqs = [
  { q: "Was kostet On Page Optimierung?", a: "Einmalige Projekte ab 1.500 Euro, laufende Optimierung ab 990 Euro monatlich. Der Preis richtet sich nach Seitenanzahl und Komplexität." },
  { q: "Wie schnell sehe ich Ergebnisse?", a: "Technische Fixes wirken oft innerhalb von Wochen. Content- und Struktur-Optimierungen zeigen sich nach 2–4 Monaten in besseren Rankings." },
  { q: "Unterschied zu einem SEO Audit?", a: "Ein Audit ist die Diagnose, On-Page Optimierung die Therapie. Wir setzen konkret um: Meta-Tags, Headings, Verlinkung, Speed." },
  { q: "Optimiert ihr auch bestehende Inhalte?", a: "Ja. Oft liegt das groesste Potenzial in vorhandenen Seiten: bessere Keywords, überarbeitete Headings, aktualisierte Meta-Daten." },
  { q: "Arbeitet ihr direkt in meinem CMS?", a: "Bei WordPress, Shopify oder Typo3 setzen wir direkt um. Bei Custom-Systemen liefern wir detaillierte Anweisungen für Ihr Team." },
  { q: "Brauche ich laufende Optimierung?", a: "Für einmalige Projekte reicht ein Durchgang. Bei regelmäßig neuem Content empfehlen wir laufende Optimierung." },
];

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function OnPageOptClient() {
  const [activeStation, setActiveStation] = useState<number>(0);

  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

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
                Technische Perfektion
              </div>
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-[1.18] text-dark font-[family-name:var(--font-heading)]">
                Jedes Element zählt.{" "}
                <span className="text-primary">On Page Optimierung.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                Title-Tags, Headings, interne Links, Ladezeiten, Alt-Texte — wir optimieren jedes Signal, das Google von Ihrer Seite liest. Systematisch, gründlich und messbar.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {["Systematisch & Messbar", "Score 96+", "Direkte Umsetzung"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="#jetzt-starten" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl">
                  Kostenlose Analyse
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#map" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:text-primary">
                  Was wir optimieren
                </Link>
              </div>
            </div>
            <OnPageMockup />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  EDITORIAL — Before / After comparison                        */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">
            <div className="mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Unterschied</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight max-w-3xl">
                Was eine perfekt optimierte Seite von einer durchschnittlichen unterscheidet
              </h2>
              <p className="mt-4 text-lg text-muted max-w-2xl">Der gleiche Inhalt, die gleiche Seite — aber ein komplett anderes Ergebnis bei Google. Der Unterschied liegt in den Details, die wir optimieren.</p>
            </div>
            {/* Eyecatcher: Before → After bubbles */}
            <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0">
              {/* Before */}
              <div className="flex-1 rounded-3xl bg-dark/[0.03] border border-dark/10 p-7 lg:p-9">
                <div className="flex items-center gap-2 mb-5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><span className="text-sm font-semibold text-red-500">Vorher — Typische Website</span></div>
                <div className="space-y-2 mb-5">
                  <p className="text-xs text-muted">ihre-website.de/page?id=384</p>
                  <p className="text-blue-700 text-base font-medium">Startseite - Willkommen</p>
                  <p className="text-sm text-muted/70 italic">Keine Beschreibung verfügbar...</p>
                </div>
                <ul className="space-y-2 mb-5">
                  {["Title generisch oder fehlend", "Keine Meta-Description", "H1 fehlt oder 3x vorhanden", "Keine interne Verlinkung", "Bilder 2MB, kein Alt-Text"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                      <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-red-500 font-semibold">CTR: ~1.2%</p>
              </div>

              {/* Arrow */}
              <div className="shrink-0 flex items-center justify-center lg:mx-[-20px] z-10 py-2 lg:py-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </div>
              </div>

              {/* After */}
              <div className="flex-1 rounded-3xl bg-white border-2 border-primary/20 p-7 lg:p-9 shadow-lg shadow-primary/[0.04]">
                <div className="flex items-center gap-2 mb-5"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /><span className="text-sm font-semibold text-green-600">Nachher — Score 96+</span></div>
                <div className="space-y-2 mb-5">
                  <p className="text-xs text-dark font-medium">ihre-website.de/on-page-optimierung</p>
                  <p className="text-blue-700 text-base font-medium">On Page Optimierung | SeoForge</p>
                  <p className="text-sm text-dark/70">Professionelle Optimierung: Meta-Tags, Headings, Verlinkung. ✓ Score 96+</p>
                </div>
                <ul className="space-y-2 mb-5">
                  {["Title 58 Zeichen, Keyword vorne", "Meta 155 Zeichen mit CTA", "1x H1, logische H2–H3 Hierarchie", "7+ interne Links gesetzt", "WebP 40KB, Alt-Texte vorhanden"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-dark/80">
                      <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-semibold"><span className="text-green-600">CTR: ~8.4%</span> <span className="text-muted font-normal ml-1">(+600%)</span></p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STATIONEN — Interactive station selector                     */}
      {/* ============================================================ */}
      <section id="map" className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die 6 Stationen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Jede Station bringt Sie näher ans Ziel</h2>
            <p className="text-lg text-muted max-w-3xl">Wählen Sie eine Station — wir zeigen, was wir dort optimieren und warum es für Ihre Rankings entscheidend ist.</p>
          </div>

          {/* Station circles — 3x2 grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
            {stationData.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setActiveStation(activeStation === i ? -1 : i)}
                className={`group flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-300 ${
                  activeStation === i
                    ? "border-primary bg-primary/[0.06] shadow-lg shadow-primary/10"
                    : "border-border bg-white hover:border-primary/30 hover:shadow-md"
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  activeStation === i ? "bg-primary text-white shadow-md" : "bg-offwhite text-dark/60 group-hover:bg-primary/10 group-hover:text-primary"
                }`}>
                  {s.num}
                </div>
                <span className={`text-[11px] font-semibold text-center leading-tight transition-colors ${activeStation === i ? "text-primary" : "text-dark/60"}`}>
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className={`overflow-hidden transition-all duration-500 ${activeStation >= 0 ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
            {activeStation >= 0 && stationData[activeStation] && (
              <div className="rounded-3xl border-2 border-primary/20 bg-white p-8 lg:p-10 shadow-xl shadow-primary/[0.04]">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-sm shadow-md">
                        {stationData[activeStation].num}
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">{stationData[activeStation].title}</h3>
                        <p className="text-sm text-primary font-medium">{stationData[activeStation].sub}</p>
                      </div>
                    </div>
                    <p className="text-muted leading-relaxed mb-6">{stationData[activeStation].desc}</p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/[0.08] border border-primary/15 px-4 py-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      <span className="text-xs font-semibold text-primary">{stationData[activeStation].impact}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted mb-4">Was wir optimieren</p>
                    <div className="space-y-2.5">
                      {stationData[activeStation].checks.map((check) => (
                        <div key={check} className="flex items-center gap-3 text-sm text-dark/80">
                          <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          {check}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hint when nothing selected */}
          {activeStation < 0 && (
            <div className="text-center py-8 text-sm text-muted">
              ↑ Station auswählen um Details zu sehen
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROZESS — Conveyor belt (moved before checklist)             */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 transition-all duration-700 reveal">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Unser Vorgehen</span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">So wird Ihre Seite perfekt</h2>
              </div>
              <p className="text-muted max-w-md lg:text-right">Vier Phasen. Jede baut auf der vorherigen auf. Am Ende steht ein Score, der sich sehen lassen kann.</p>
            </div>
          </div>
          <div className="relative transition-all duration-700 delay-200 reveal">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2"><div className="h-[2px] bg-gradient-to-r from-primary/30 via-secondary/20 to-green-500/30" /></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { num: "01", title: "Scannen", desc: "Jede URL durch unsere Tools. Meta-Daten, Headings, Links, Speed — alles erfassen.", result: "→ Vollständige Diagnose", color: "border-t-primary" },
                { num: "02", title: "Sortieren", desc: "Impact-Matrix: Quick Wins oben, große Hebel danach. Kein Giesskannenprinzip.", result: "→ Priorisierter Plan", color: "border-t-secondary" },
                { num: "03", title: "Umsetzen", desc: "Direkt im CMS oder als Anleitung. Tags, Headings, Links, Bilder — hands-on.", result: "→ Optimierte Seiten", color: "border-t-primary" },
                { num: "04", title: "Prüfen", desc: "Jede Änderung verifizieren. Rankings tracken. Was fehlt, nachbessern.", result: "→ Score 96+", color: "border-t-green-500" },
              ].map((step) => (
                <div key={step.num} className={`relative rounded-2xl ${step.color} border-t-[3px] border border-border bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
                  <span className="text-4xl font-bold text-primary/8 font-[family-name:var(--font-heading)] absolute top-3 right-4">{step.num}</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3 mt-1">{step.title}</h3>
                  <p className="text-xs text-muted leading-relaxed mb-4">{step.desc}</p>
                  <p className="text-[11px] font-semibold text-primary">{step.result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CHECKLIST                                                    */}
      {/* ============================================================ */}
      <section className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-14 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Checkliste</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">So sieht eine optimierte Seite aus</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Jedes Element hat seine Regeln. Wir prüfen alle — und optimieren, bis nichts mehr fehlt.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { el: "Title Tag", rule: "55–60 Zeichen, Keyword vorne, einzigartig", s: "pflicht" },
              { el: "Meta Description", rule: "150–160 Zeichen, Call-to-Action, Keyword", s: "pflicht" },
              { el: "H1 Heading", rule: "Exakt 1x pro Seite, enthält Primaer-Keyword", s: "pflicht" },
              { el: "H2–H6 Headings", rule: "Logische Hierarchie, Keywords in H2s", s: "pflicht" },
              { el: "Interne Links", rule: "Min. 3 kontextuelle Links zu relevanten Seiten", s: "pflicht" },
              { el: "URL-Struktur", rule: "Kurz, sprechend, mit Keyword, keine Parameter", s: "pflicht" },
              { el: "Bilder Alt-Tags", rule: "Beschreibend, Keyword wo passend", s: "pflicht" },
              { el: "Schema Markup", rule: "FAQ, Product, Article — passend zum Seitentyp", s: "empfohlen" },
              { el: "Open Graph", rule: "Titel, Beschreibung, Bild für Social Sharing", s: "empfohlen" },
              { el: "Core Web Vitals", rule: "LCP <2.5s, FID <100ms, CLS <0.1", s: "pflicht" },
            ].map((item, i) => (
              <Reveal key={item.el} delay={i * 50}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-offwhite/30 p-5 transition-all duration-300 hover:bg-white hover:shadow-md hover:border-primary/20">
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${item.s === "pflicht" ? "bg-green-100" : "bg-amber-100"}`}>
                    {item.s === "pflicht" ? <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1"><span className="text-sm font-semibold text-dark">{item.el}</span><span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${item.s === "pflicht" ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50"}`}>{item.s}</span></div>
                    <p className="text-xs text-muted">{item.rule}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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
                Bessere Seiten.<br />Bessere Rankings.
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">Eine gründliche On-Page-Optimierung legt das Fundament für nachhaltige Rankings. Lassen Sie uns Ihre wichtigsten Seiten analysieren.</p>
              <div className="space-y-4">
                {[
                  { title: "Technische & inhaltliche Analyse", desc: "Wir prüfen beide Dimensionen: was der Browser sieht und was Google bewertet." },
                  { title: "Klarer Maßnahmenplan", desc: "Priorisierte Liste der Optimierungen mit erwartetem Impact — für jeden Schritt nachvollziehbar." },
                  { title: "Quick Wins inklusive", desc: "Wir identifizieren Maßnahmen, die schnell wirken und Ihnen sofort erste Verbesserungen bringen." },
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
                  Optimierung anfragen
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
