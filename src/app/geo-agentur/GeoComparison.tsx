"use client";

import { useEffect, useRef, useState } from "react";

const rows = [
  {
    label: "Vollständiger Begriff",
    geo: "Generative Engine Optimization",
    seo: "Search Engine Optimization",
    llmo: "Large Language Model Optimization",
  },
  {
    label: "Ziel",
    geo: "Von KI als vertrauenswürdige Quelle zitiert werden",
    seo: "Auf Top-Positionen in Suchergebnissen ranken",
    llmo: "Wie ein KI-Modell Ihre Marke/Inhalte versteht optimieren",
  },
  {
    label: "Optimierungsschicht",
    geo: "Output-Schicht — was die KI antwortet",
    seo: "Algorithmus-Schicht — wie Google crawlt & bewertet",
    llmo: "Modell-Schicht — was das Sprachmodell über Sie weiß",
  },
  {
    label: "Zielplattformen",
    geo: "ChatGPT Search, Perplexity, Google AI Overviews, Gemini, Copilot",
    seo: "Google, Bing, Yahoo",
    llmo: "GPT-4/4o, LLaMA, Claude, Gemini (Trainings- & Inferenzschicht)",
  },
  {
    label: "Hauptmaßnahmen",
    geo: "Topical Authority, Citation Building, E-E-A-T, Digital PR, Answer-first Content, llms.txt",
    seo: "Keyword-Optimierung, Backlinks, technisches SEO, Core Web Vitals, Crawlbarkeit",
    llmo: "Schema.org Markup, Entity-Optimierung, Knowledge Graph, semantisches Chunking, RAG-optimierter Content",
  },
  {
    label: "Schlüsselmetrik",
    geo: "Citation Rate, AI Brand Mentions, KI-Traffic-Anteil",
    seo: "Keyword-Rankings, organischer Traffic, CTR",
    llmo: "Marken-Entität im Modell, semantische Assoziationen, Retrieval-Genauigkeit",
  },
  {
    label: "Zeithorizont",
    geo: "4–8 Wochen erste Signale, 3–6 Monate nachhaltige Sichtbarkeit",
    seo: "3–6 Monate erste Rankings, 12+ Monate volle Wirkung",
    llmo: "Laufend — Modell-Updates beeinflussen Wissensstand kontinuierlich",
  },
  {
    label: "Voraussetzung",
    geo: "Solides SEO-Fundament + LLMO-Basis zwingend erforderlich",
    seo: "Technisch saubere Website als Grundlage",
    llmo: "Klare Brand-Identität, strukturierte Inhalte",
  },
  {
    label: "Messwerkzeuge",
    geo: "Perplexity-Monitoring, Brandwatch, manuelle AI-Abfragen, Custom Dashboards",
    seo: "Google Search Console, Ahrefs, Semrush, Sistrix",
    llmo: "Embedding-Analyse, Knowledge Graph API, LLM-Readability-Checks",
  },
  {
    label: "Verhältnis zueinander",
    geo: "Baut auf SEO & LLMO auf — ohne beide keine Zitation",
    seo: "Fundament für GEO & LLMO — ohne SEO kein Crawling",
    llmo: "Fundament für GEO — ohne Verständnis keine Zitation",
  },
  {
    label: "Ersetzt die anderen?",
    geo: "Nein — ergänzt SEO & LLMO",
    seo: "Nein — bleibt Grundlage, verliert aber allein an Reichweite",
    llmo: "Nein — ist Voraussetzung, kein Ersatz",
  },
];

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [threshold]);

  return { ref, isVisible };
}

const columns = [
  {
    key: "geo" as const,
    label: "GEO",
    sub: "Generative Engine Optimization",
    color: "#C2722A",
    bg: "#C2722A12",
    border: "#C2722A40",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.015-7.053.072-1.584.233-2.707 1.626-2.707 3.228v6.741z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: "seo" as const,
    label: "SEO",
    sub: "Search Engine Optimization",
    color: "#4B5563",
    bg: "#4B556312",
    border: "#4B556330",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "llmo" as const,
    label: "LLMO",
    sub: "Large Language Model Optimization",
    color: "#B8872A",
    bg: "#D4A85312",
    border: "#D4A85340",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

// Rows that get a highlighted treatment
const highlightedRows = ["Optimierungsschicht", "Verhältnis zueinander", "Ersetzt die anderen?"];

export default function GeoComparison() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.08);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-offwhite relative overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.018]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1A1A1A 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
            Begriffsklärung
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-4">
            <span className="text-primary">GEO</span> vs. SEO vs. LLMO
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Drei Disziplinen — eine Strategie. So unterscheiden sie sich im Detail.
          </p>
        </div>

        {/* Table */}
        <div
          className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="overflow-x-auto rounded-2xl border border-border shadow-xl shadow-dark/5">
            <table className="w-full border-collapse bg-white text-[15px]" style={{ minWidth: '800px' }}>

              {/* Column headers */}
              <thead>
                <tr>
                  {/* Empty label cell */}
                  <th className="w-[200px] lg:w-[240px] p-5 bg-offwhite border-b border-r border-border text-left">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted/60">Kriterium</span>
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="p-5 border-b border-r last:border-r-0 border-border text-left"
                      style={{ backgroundColor: col.bg }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: col.color, color: 'white' }}
                        >
                          {col.icon}
                        </div>
                        <div>
                          <div className="font-[family-name:var(--font-heading)] text-xl text-dark leading-tight" style={{ color: col.color }}>
                            {col.label}
                          </div>
                          <div className="text-[11px] text-muted font-normal leading-tight mt-0.5">{col.sub}</div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => {
                  const isHighlighted = highlightedRows.includes(row.label);
                  const isLast = i === rows.length - 1;
                  return (
                    <tr
                      key={row.label}
                      className={`group ${isHighlighted ? 'bg-offwhite/60' : i % 2 === 0 ? 'bg-white' : 'bg-offwhite/30'} ${!isLast ? 'border-b border-border' : ''}`}
                    >
                      {/* Row label */}
                      <td className="p-5 border-r border-border align-top">
                        <span className={`text-xs font-bold uppercase tracking-wider ${isHighlighted ? 'text-dark' : 'text-muted'}`}>
                          {row.label}
                        </span>
                      </td>

                      {/* GEO */}
                      <td className="p-5 border-r border-border align-top">
                        <span className={`leading-relaxed ${isHighlighted ? 'font-semibold text-dark' : 'text-muted'}`}>
                          {row.geo}
                        </span>
                      </td>

                      {/* SEO */}
                      <td className="p-5 border-r border-border align-top">
                        <span className={`leading-relaxed ${isHighlighted ? 'font-semibold text-dark' : 'text-muted'}`}>
                          {row.seo}
                        </span>
                      </td>

                      {/* LLMO */}
                      <td className="p-5 align-top">
                        <span className={`leading-relaxed ${isHighlighted ? 'font-semibold text-dark' : 'text-muted'}`}>
                          {row.llmo}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted mt-5">
            GEO baut auf SEO und LLMO auf — alle drei Disziplinen ergänzen sich.{" "}
            <span className="text-primary font-medium">Keines ersetzt das andere.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
