"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";

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

function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800, start = performance.now();
    const tick = (now: number) => { const p = Math.min((now - start) / dur, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value)); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return (<div ref={ref as React.RefObject<HTMLDivElement>} className="text-center"><p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">{count}{suffix}</p><p className="text-sm text-muted">{label}</p></div>);
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, inView] = useInView();
  return (<div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>);
}

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
export default function OnPageOptimierungPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [editRef, editInView] = useInView();
  const [mapRef, mapInView] = useInView();
  const [processRef, processInView] = useInView();
  const [checkRef, checkInView] = useInView();
  const [faqRef, faqInView] = useInView();

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
                {["200+ Prüfpunkte", "Score 96+", "Direkte Umsetzung"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="#kontakt" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl">
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

      {/* STATS */}
      <section className="bg-offwhite border-y border-border py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter value={200} suffix="+" label="Websites optimiert" />
            <Counter value={96} suffix="/100" label="Durchschn. Score" />
            <Counter value={47} suffix="%" label="Mehr Traffic" />
            <Counter value={98} suffix="%" label="Zufriedenheit" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  EDITORIAL — Before / After comparison                        */}
      {/* ============================================================ */}
      <section ref={editRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`transition-all duration-700 ${editInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
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
      {/*  MAP — Snake-style roadmap of 6 factors                       */}
      {/* ============================================================ */}
      <section id="map" ref={mapRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className={`mb-14 transition-all duration-700 ${mapInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Roadmap</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">6 Stationen auf dem Weg zur perfekten Seite</h2>
            <p className="text-lg text-muted max-w-3xl">Jede Station bringt Ihre Rankings einen Schritt weiter. Wir arbeiten alle sechs ab — in der richtigen Reihenfolge.</p>
          </div>

          {/* Treasure map SVG illustration with station labels */}
          <div className={`relative transition-all duration-700 delay-200 ${mapInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

            {/* Horizontal treasure map SVG */}
            <div className="hidden md:block overflow-x-auto -mx-6 px-6">
              <div className="min-w-[900px]">
                <svg viewBox="0 0 1300 600" fill="none" className="w-full h-auto">
                  {/* Row 1 path: left to right */}
                  <path d="M100 120 C250 60, 400 160, 560 110 C650 80, 700 140, 740 120" stroke="#C2722A" strokeWidth="3" strokeDasharray="10 7" strokeLinecap="round" opacity="0.22" />
                  {/* Loop between 02 and 03 */}
                  <path d="M740 120 C830 90, 900 160, 860 200 C820 240, 760 215, 800 175 C840 135, 930 110, 1100 130" stroke="#C2722A" strokeWidth="3" strokeDasharray="10 7" strokeLinecap="round" opacity="0.22" />
                  {/* Row 2 path: right to left, through 05 at x=450 */}
                  <path d="M1100 130 C1160 210, 1080 320, 980 340 C800 380, 650 330, 450 360 C300 390, 160 360, 100 400" stroke="#C2722A" strokeWidth="3" strokeDasharray="10 7" strokeLinecap="round" opacity="0.22" />
                  {/* Row 3 path: to treasure */}
                  <path d="M100 400 C200 470, 380 440, 560 480 C660 500, 700 465, 720 485" stroke="#C2722A" strokeWidth="3" strokeDasharray="10 7" strokeLinecap="round" opacity="0.22" />

                  {/* START flag */}
                  <line x1="50" y1="72" x2="50" y2="120" stroke="#C2722A" strokeWidth="3" />
                  <path d="M50 72 L90 84 L50 96 Z" fill="#C2722A" />
                  <text x="28" y="62" fill="#C2722A" fontSize="14" fontWeight="800">START</text>

                  {/* 01 — text right */}
                  <circle cx="100" cy="120" r="36" fill="white" stroke="#C2722A" strokeWidth="3.5" />
                  <text x="100" y="126" textAnchor="middle" fill="#C2722A" fontSize="18" fontWeight="800">01</text>
                  <text x="150" y="115" fill="#1A1A1A" fontSize="17" fontWeight="700">Meta-Tags</text>
                  <text x="150" y="136" fill="#4A4A4A" fontSize="14" fontWeight="500">Title & Description</text>

                  {/* 02 — text left */}
                  <circle cx="560" cy="110" r="36" fill="white" stroke="#D4A853" strokeWidth="3.5" />
                  <text x="560" y="116" textAnchor="middle" fill="#D4A853" fontSize="18" fontWeight="800">02</text>
                  <text x="508" y="105" textAnchor="end" fill="#1A1A1A" fontSize="17" fontWeight="700">Headings</text>
                  <text x="508" y="126" textAnchor="end" fill="#4A4A4A" fontSize="14" fontWeight="500">H1–H3 Hierarchie</text>

                  {/* 03 — text right */}
                  <circle cx="1100" cy="130" r="36" fill="white" stroke="#C2722A" strokeWidth="3.5" />
                  <text x="1100" y="136" textAnchor="middle" fill="#C2722A" fontSize="18" fontWeight="800">03</text>
                  <text x="1150" y="125" fill="#1A1A1A" fontSize="17" fontWeight="700">Links</text>
                  <text x="1150" y="146" fill="#4A4A4A" fontSize="14" fontWeight="500">7+ intern pro Seite</text>

                  {/* 04 — text left */}
                  <circle cx="980" cy="340" r="36" fill="white" stroke="#D4A853" strokeWidth="3.5" />
                  <text x="980" y="346" textAnchor="middle" fill="#D4A853" fontSize="18" fontWeight="800">04</text>
                  <text x="928" y="335" textAnchor="end" fill="#1A1A1A" fontSize="17" fontWeight="700">Speed</text>
                  <text x="928" y="356" textAnchor="end" fill="#4A4A4A" fontSize="14" fontWeight="500">LCP unter 2.5s</text>

                  {/* 05 — moved further right on path */}
                  <circle cx="450" cy="360" r="36" fill="white" stroke="#C2722A" strokeWidth="3.5" />
                  <text x="450" y="366" textAnchor="middle" fill="#C2722A" fontSize="18" fontWeight="800">05</text>
                  <text x="502" y="355" fill="#1A1A1A" fontSize="17" fontWeight="700">URL-Struktur</text>
                  <text x="502" y="376" fill="#4A4A4A" fontSize="14" fontWeight="500">Clean & keyword-haltig</text>

                  {/* 06 — text right */}
                  <circle cx="100" cy="400" r="36" fill="white" stroke="#D4A853" strokeWidth="3.5" />
                  <text x="100" y="406" textAnchor="middle" fill="#D4A853" fontSize="18" fontWeight="800">06</text>
                  <text x="150" y="448" fill="#1A1A1A" fontSize="17" fontWeight="700">Bilder</text>
                  <text x="150" y="469" fill="#4A4A4A" fontSize="14" fontWeight="500">WebP & Alt-Texte</text>

                  {/* TREASURE — Target / Bullseye */}
                  <circle cx="720" cy="485" r="48" fill="#C2722A" fillOpacity="0.05" />
                  <circle cx="720" cy="485" r="48" fill="none" stroke="#C2722A" strokeWidth="2" opacity="0.3" />
                  <circle cx="720" cy="485" r="36" fill="none" stroke="#C2722A" strokeWidth="2" opacity="0.4" />
                  <circle cx="720" cy="485" r="24" fill="none" stroke="#C2722A" strokeWidth="2.5" opacity="0.6" />
                  <circle cx="720" cy="485" r="12" fill="#C2722A" />
                  <circle cx="720" cy="485" r="5" fill="white" />
                  <text x="790" y="478" fill="#1A1A1A" fontSize="18" fontWeight="700">Ziel erreicht</text>
                  <text x="790" y="499" fill="#C2722A" fontSize="15" fontWeight="700">Score 96+</text>

                  {/* Trail dots */}
                  <circle cx="320" cy="130" r="4" fill="#C2722A" opacity="0.12" />
                  <circle cx="800" cy="155" r="4" fill="#D4A853" opacity="0.1" />
                  <circle cx="650" cy="350" r="4" fill="#C2722A" opacity="0.12" />
                  <circle cx="450" cy="380" r="4" fill="#D4A853" opacity="0.1" />
                  <circle cx="580" cy="470" r="4" fill="#C2722A" opacity="0.12" />
                </svg>
              </div>
            </div>

            {/* Mobile: compact stacked */}
            <div className="md:hidden space-y-4">
              {[
                { num: "01", title: "Meta-Tags", text: "Title & Description", color: "bg-primary" },
                { num: "02", title: "Headings", text: "H1–H3 Hierarchie", color: "bg-secondary" },
                { num: "03", title: "Interne Links", text: "7+ pro Seite", color: "bg-primary" },
                { num: "04", title: "Speed", text: "LCP unter 2.5s", color: "bg-secondary" },
                { num: "05", title: "URL-Struktur", text: "Clean & keyword-haltig", color: "bg-primary" },
                { num: "06", title: "Bilder", text: "WebP & Alt-Texte", color: "bg-secondary" },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-3">
                  <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-full ${s.color} text-white text-xs font-bold shadow`}>{s.num}</div>
                  <div><p className="text-sm font-semibold text-dark">{s.title}</p><p className="text-xs text-muted">{s.text}</p></div>
                </div>
              ))}
              <div className="flex items-center gap-3 pt-1">
                <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-base font-bold shadow">X</div>
                <p className="text-sm font-semibold text-primary">Score 96+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROZESS — Conveyor belt (moved before checklist)             */}
      {/* ============================================================ */}
      <section ref={processRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`mb-16 transition-all duration-700 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Unser Vorgehen</span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">So wird Ihre Seite perfekt</h2>
              </div>
              <p className="text-muted max-w-md lg:text-right">Vier Phasen. Jede baut auf der vorherigen auf. Am Ende steht ein Score, der sich sehen lassen kann.</p>
            </div>
          </div>
          <div className={`relative transition-all duration-700 delay-200 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
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
      <section ref={checkRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${checkInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
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
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96 pb-6" : "max-h-0"}`}><p className="px-6 text-sm leading-relaxed text-muted">{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section className="bg-offwhite py-24 lg:py-32 border-t border-border" id="kontakt">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Kontakt</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">On Page Analyse anfragen</h2>
            <p className="text-lg text-muted">Wir prüfen Ihre Website und zeigen, wo die groessten Potenziale liegen.</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8 lg:p-10 shadow-sm">
            <form className="space-y-5" action="/kontakt" method="POST">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label htmlFor="op-name" className="block text-sm font-medium text-dark mb-2">Name *</label><input type="text" id="op-name" name="name" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Ihr Name" /></div>
                <div><label htmlFor="op-email" className="block text-sm font-medium text-dark mb-2">E-Mail *</label><input type="email" id="op-email" name="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="ihre@email.de" /></div>
              </div>
              <div><label htmlFor="op-url" className="block text-sm font-medium text-dark mb-2">Website *</label><input type="url" id="op-url" name="website" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="https://ihre-website.de" /></div>
              <div><label htmlFor="op-msg" className="block text-sm font-medium text-dark mb-2">Was sollen wir anschauen? (optional)</label><textarea id="op-msg" name="message" rows={3} className="w-full resize-none px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Meta-Tags, Ladezeiten, Struktur..." /></div>
              <button type="submit" className="w-full rounded-full bg-primary px-6 py-4 text-base font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20">Analyse anfragen</button>
              <p className="text-center text-xs text-muted">* Pflichtfelder | Antwort innerhalb von 24 Stunden</p>
            </form>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
