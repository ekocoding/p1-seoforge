"use client";

import { useState } from "react";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";

/* ------------------------------------------------------------------ */
/*  KI PLATFORM COVERAGE TAB SWITCHER                                  */
/* ------------------------------------------------------------------ */
type PlatformKey = "ChatGPT" | "Gemini" | "Perplexity" | "Claude";

interface PlatformData {
  color: string;
  optimized: number;
  notOptimized: number;
  description: string;
  queries: string[];
}

const platformData: Record<PlatformKey, PlatformData> = {
  ChatGPT: {
    color: "#10A37F",
    optimized: 68,
    notOptimized: 12,
    description: "ChatGPT bevorzugt strukturierte, autoritäre Quellen mit klaren Expertenaussagen.",
    queries: ["Welche SEO Agentur empfehlen Sie?", "Was ist die beste GEO Strategie?", "Wie optimiere ich für KI?"],
  },
  Gemini: {
    color: "#4285F4",
    optimized: 54,
    notOptimized: 8,
    description: "Google Gemini integriert besonders E-E-A-T-starke Inhalte mit Schema-Markup.",
    queries: ["GEO Optimierung Anbieter", "KI-Sichtbarkeit verbessern", "Best practices GEO"],
  },
  Perplexity: {
    color: "#20B2AA",
    optimized: 72,
    notOptimized: 15,
    description: "Perplexity zitiert häufig aktuelle, gut belegte Quellen mit direkten Antworten.",
    queries: ["GEO vs SEO Unterschied", "KI-Antworten optimieren", "Wer macht GEO in Deutschland?"],
  },
  Claude: {
    color: "#C2722A",
    optimized: 61,
    notOptimized: 9,
    description: "Claude bevorzugt tiefgründige, gut strukturierte Inhalte mit klarer Autorschaft.",
    queries: ["Generative Engine Optimization", "KI-Sichtbarkeit aufbauen", "GEO Beratung Deutschland"],
  },
};

function PlatformCoverageApp() {
  const [activeTab, setActiveTab] = useState<PlatformKey>("ChatGPT");
  const [animating, setAnimating] = useState(false);
  const [displayData, setDisplayData] = useState(platformData["ChatGPT"]);

  const switchTab = (tab: PlatformKey) => {
    if (tab === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setDisplayData(platformData[tab]);
      setAnimating(false);
    }, 200);
  };

  const platforms: PlatformKey[] = ["ChatGPT", "Gemini", "Perplexity", "Claude"];

  return (
    <div className="bg-white rounded-2xl border border-border p-6 lg:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-[family-name:var(--font-heading)] text-dark mb-1">
          KI Platform Coverage Simulator
        </h3>
        <p className="text-sm text-muted">
          Wie oft wird Ihre Marke in KI-Antworten zitiert — mit und ohne GEO-Optimierung?
        </p>
      </div>

      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {platforms.map((tab) => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-offwhite text-muted hover:text-dark border border-border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div
        className={`transition-all duration-200 ${animating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}`}
      >
        <p className="text-xs text-muted mb-4">{displayData.description}</p>

        {/* Bars */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between text-xs text-muted mb-1.5">
              <span className="font-medium text-dark">Mit GEO-Optimierung</span>
              <span className="font-bold text-primary">{displayData.optimized}% der Anfragen</span>
            </div>
            <div className="h-8 bg-offwhite rounded-full overflow-hidden">
              <div
                className="h-full rounded-full flex items-center justify-end pr-3"
                style={{
                  width: `${displayData.optimized}%`,
                  backgroundColor: displayData.color,
                  transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <span className="text-white text-xs font-bold">{displayData.optimized}%</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-muted mb-1.5">
              <span className="font-medium text-dark">Ohne GEO-Optimierung</span>
              <span className="font-bold text-muted">{displayData.notOptimized}% der Anfragen</span>
            </div>
            <div className="h-8 bg-offwhite rounded-full overflow-hidden">
              <div
                className="h-full bg-border rounded-full flex items-center justify-end pr-3"
                style={{
                  width: `${displayData.notOptimized}%`,
                  transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <span className="text-dark text-xs font-bold">{displayData.notOptimized}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Example queries */}
        <div>
          <p className="text-xs font-semibold text-dark mb-2 uppercase tracking-wide">Beispiel-Anfragen:</p>
          <div className="flex flex-col gap-1.5">
            {displayData.queries.map((q, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: displayData.color }}
                />
                {q}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted">
            Ø Steigerung durch GEO:{" "}
            <span className="font-bold text-primary">
              +{displayData.optimized - displayData.notOptimized}%
            </span>
          </p>
          <Link
            href="/geo/audit"
            className="text-xs font-semibold text-primary hover:underline"
          >
            GEO Audit starten →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function GeoHubClient() {

  const services = [
    {
      href: "/geo/audit",
      title: "GEO Audit",
      tag: "Analyse",
      description:
        "Umfassende Analyse Ihrer aktuellen KI-Sichtbarkeit über ChatGPT, Gemini, Perplexity und Claude. Wir zeigen, wo Sie stehen und was Sie ändern müssen.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      featured: false,
    },
    {
      href: "/geo/beratung",
      title: "GEO Beratung",
      tag: "Strategie",
      description:
        "Individuelle GEO-Strategie für Ihre Marke. Von der Roadmap bis zur persönlichen Begleitung — maßgeschneidert für Ihre Ziele.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      featured: true,
    },
    {
      href: "/geo/optimierung",
      title: "GEO Optimierung",
      tag: "Umsetzung",
      description:
        "Technische und inhaltliche Umsetzung: Schema Markup, llms.txt, Entity Optimization und E-E-A-T-Signale für maximale KI-Sichtbarkeit.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      featured: false,
    },
    {
      href: "/geo/content-strategie",
      title: "GEO Content Strategie",
      tag: "Content",
      description:
        "Inhalte, die KI-Systeme aktiv zitieren. Wir entwickeln zitierwürdigen Content, der Ihre Marke als Referenz in KI-Antworten verankert.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      featured: false,
    },
    {
      href: "/geo/monitoring",
      title: "GEO Monitoring",
      tag: "Tracking",
      description:
        "Kontinuierliches Tracking Ihrer KI-Sichtbarkeit über alle Plattformen. Wöchentliche Reports und Echtzeit-Alerts bei Veränderungen.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      featured: false,
    },
  ];

  const whyGeo = [
    {
      title: "KI ersetzt die Suchmaschine",
      description:
        "58% der Google-Suchanfragen enden heute ohne Klick. KI-Antworten verhindern den Traffic — oder leiten ihn zu Marken, die GEO betreiben.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      title: "1 Mrd.+ ChatGPT-Nutzer monatlich",
      description:
        "KI-Systeme sind längst Mainstream. Wer nicht in KI-Antworten erscheint, ist für einen wachsenden Teil der Nutzer unsichtbar.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      title: "Früh starten, Vorsprung halten",
      description:
        "GEO ist noch jung. Marken, die jetzt systematisch optimieren, sichern sich Positionen, die später kaum noch zu erreichen sind.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
  ];

  return (
    <SubpageLayout>
      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Full-bleed image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/geo-hub-hero.jpg')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />

        <div className="reveal relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-white">Generative Engine Optimization</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-heading)] text-white leading-[1.05] mb-6 max-w-3xl">
            GEO –{" "}
            <span className="text-primary">Sichtbar</span>
            {" "}in KI-Antworten
          </h1>

          <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
            ChatGPT, Gemini, Perplexity und Claude bestimmen, welche Marken sie empfehlen.
            Unsere GEO-Leistungen sorgen dafür, dass Ihre Marke dabei ist — systematisch und messbar.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              GEO Audit anfragen
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/geo-agentur"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              GEO Agentur kennenlernen
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SERVICES GRID                                               */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-offwhite">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal">
            <div className="mb-14">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">
                Unsere GEO-Leistungen
              </span>
              <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark leading-tight max-w-2xl">
                Fünf Leistungen,
                ein Ziel: KI-Sichtbarkeit
              </h2>
            </div>

            {/* Asymmetric grid: 2+3 layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Row 1: 2 bigger cards */}
              {services.slice(0, 2).map((service, i) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className={`group rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    service.featured
                      ? "border-primary/30 bg-primary/[0.03] hover:shadow-primary/10 lg:col-span-2"
                      : "border-border bg-white hover:border-primary/20 hover:shadow-primary/5"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 ${
                        service.featured
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                      }`}
                    >
                      {service.icon}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted bg-offwhite px-3 py-1 rounded-full">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">{service.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Mehr erfahren
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Link>
              ))}

              {/* Row 2: 3 equal cards */}
              {services.slice(2).map((service, i) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
                  style={{ transitionDelay: `${(i + 2) * 80}ms` }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                      {service.icon}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted bg-offwhite px-3 py-1 rounded-full">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-[family-name:var(--font-heading)] text-dark mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Mehr erfahren
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INTERACTIVE: KI PLATFORM COVERAGE                          */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">
                Interaktiv
              </span>
              <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark leading-tight mb-6">
                So viel Sichtbarkeit
                gewinnen Sie durch GEO
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Wählen Sie eine KI-Plattform und sehen Sie, wie sich GEO-Optimierung auf Ihre Citation-Rate auswirkt.
                Die Zahlen basieren auf unseren Kundenprojekten und Branchendaten.
              </p>
              <div className="space-y-3">
                {[
                  "Mehr Citations in KI-Antworten",
                  "Stärkere Markenbekanntheit",
                  "Mehr qualifizierte Anfragen",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-dark">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <PlatformCoverageApp />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY GEO SECTION                                             */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-offwhite border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal">
            <div className="text-center mb-14">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">
                Warum GEO?
              </span>
              <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark leading-tight">
                Die KI-Revolution ist in Ihrem Markt
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {whyGeo.map((item, i) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-border p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-[family-name:var(--font-heading)] text-dark mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTEXTUAL LINKS SECTION                                    */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">
                  Mehr erfahren
                </span>
                <h2 className="text-3xl font-[family-name:var(--font-heading)] text-dark mb-5">
                  GEO verstehen und umsetzen
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  Als spezialisierte{" "}
                  <Link href="/geo-agentur" className="text-primary font-semibold hover:underline">
                    GEO Agentur
                  </Link>{" "}
                  begleiten wir Sie von der ersten Analyse bis zum kontinuierlichen Monitoring.
                  Möchten Sie zunächst verstehen, was GEO bedeutet? Lesen Sie unseren Artikel{" "}
                  <Link href="/was-ist-geo" className="text-primary font-semibold hover:underline">
                    Was ist GEO?
                  </Link>{" "}
                  für eine fundierte Einführung.
                </p>
                <p className="text-muted leading-relaxed">
                  Unser Prozess beginnt mit einem{" "}
                  <Link href="/geo/audit" className="text-primary font-semibold hover:underline">
                    GEO Audit
                  </Link>
                  , das Ihnen zeigt, wo Sie heute stehen. Darauf aufbauend entwickeln wir eine{" "}
                  <Link href="/geo/beratung" className="text-primary font-semibold hover:underline">
                    GEO Beratung
                  </Link>{" "}
                  und setzen alles über{" "}
                  <Link href="/geo/optimierung" className="text-primary font-semibold hover:underline">
                    GEO Optimierung
                  </Link>
                  ,{" "}
                  <Link href="/geo/content-strategie" className="text-primary font-semibold hover:underline">
                    GEO Content Strategie
                  </Link>{" "}
                  und{" "}
                  <Link href="/geo/monitoring" className="text-primary font-semibold hover:underline">
                    GEO Monitoring
                  </Link>{" "}
                  um.
                </p>
              </div>

              {/* Quick links */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { href: "/geo-agentur", label: "GEO Agentur", desc: "Über unsere Agentur" },
                  { href: "/was-ist-geo", label: "Was ist GEO?", desc: "Grundlagen verstehen" },
                  { href: "/geo/audit", label: "GEO Audit", desc: "Analyse starten" },
                  { href: "/geo/beratung", label: "GEO Beratung", desc: "Strategie entwickeln" },
                  { href: "/geo/optimierung", label: "GEO Optimierung", desc: "Technisch umsetzen" },
                  { href: "/geo/content-strategie", label: "GEO Content Strategie", desc: "Content planen" },
                  { href: "/geo/monitoring", label: "GEO Monitoring", desc: "Ergebnisse messen" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group rounded-xl border border-border p-4 hover:border-primary/30 hover:bg-primary/[0.02] transition-all"
                  >
                    <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">
                      {link.label}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BOTTOM CTA                                                   */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] mb-6">
            Bereit für{" "}
            <span className="text-primary">KI-Sichtbarkeit?</span>
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Starten Sie mit einem kostenlosen GEO Audit und erfahren Sie, wie sichtbar Ihre Marke
            in ChatGPT, Gemini und Co. bereits ist.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              Kostenloses GEO Audit anfragen
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/geo-agentur"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              GEO Agentur kennenlernen
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
