"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "../components/SubpageLayout";

/* ------------------------------------------------------------------ */
/*  KI PLATFORM COVERAGE TAB SWITCHER                                  */
/* ------------------------------------------------------------------ */
type PlatformKey = "ChatGPT" | "Gemini" | "Perplexity" | "Claude";

interface PlatformData {
  color: string;
  focus: string;
  limitation: string;
  checks: { label: string; detail: string }[];
  queries: string[];
}

const platformData: Record<PlatformKey, PlatformData> = {
  ChatGPT: {
    color: "#10A37F",
    focus: "Prüfen, ob Marke, Leistung und belegbare Aussagen in Antworten konsistent wiedergegeben werden.",
    limitation: "Antworten können sich je nach Modell, Sitzung, Aktualität und Formulierung unterscheiden.",
    checks: [
      { label: "Quellenbild", detail: "Welche eigenen und externen Quellen prägen die Antwort?" },
      { label: "Entitäten", detail: "Werden Marke, Angebot und Zuständigkeit korrekt zugeordnet?" },
      { label: "Antworttreue", detail: "Bleiben Einschränkungen und Belege bei der Zusammenfassung erhalten?" },
    ],
    queries: ["Welche Anbieter lösen [Problem]?", "Was unterscheidet [Marke] von Alternativen?", "Welche Quelle belegt [Aussage]?"],
  },
  Gemini: {
    color: "#4285F4",
    focus: "Beobachten, wie Website-Inhalte, Suchergebnisse und strukturierte Informationen zusammenspielen.",
    limitation: "Strukturierte Daten helfen beim Einordnen, erzwingen aber weder Nennung noch Zitation.",
    checks: [
      { label: "Indexbasis", detail: "Sind relevante Seiten crawlbar, eindeutig und aktuell?" },
      { label: "Informationskern", detail: "Steht die direkte Antwort nah an der belegenden Quelle?" },
      { label: "Konsistenz", detail: "Passen Website, Profile und Drittquellen inhaltlich zusammen?" },
    ],
    queries: ["Was ist [Leistung] und wann ist sie sinnvoll?", "Anbieter für [Leistung] im Vergleich", "Wie löst [Marke] [Problem]?"],
  },
  Perplexity: {
    color: "#20B2AA",
    focus: "Nachvollziehen, welche Passage tatsächlich zitiert wird und ob sie die Nutzerfrage vollständig trägt.",
    limitation: "Eine sichtbare Quelle ist ein beobachtbares Signal, aber noch kein Beleg für Nachfrage oder Umsatz.",
    checks: [
      { label: "Zitationspassage", detail: "Ist der zitierte Satz präzise, eigenständig und belastbar?" },
      { label: "Quellennähe", detail: "Kann die Aussage direkt auf der Zielseite verifiziert werden?" },
      { label: "Abdeckung", detail: "Welche relevanten Fragen bleiben ohne passende eigene Quelle?" },
    ],
    queries: ["GEO und SEO: Wo liegt der Unterschied?", "Welche Kriterien gelten für [Thema]?", "Aktuelle Quellen zu [Fachfrage]"],
  },
  Claude: {
    color: "#C2722A",
    focus: "Testen, ob längere Fachfragen mit korrektem Kontext, Grenzen und Quellenbezug beantwortet werden.",
    limitation: "Auch gut strukturierte Inhalte können ausgelassen oder anders gewichtet werden; Garantien sind unseriös.",
    checks: [
      { label: "Kontext", detail: "Erklärt die Quelle Voraussetzungen und Grenzen einer Aussage?" },
      { label: "Autorschaft", detail: "Sind Verantwortliche, Aktualität und fachlicher Bezug erkennbar?" },
      { label: "Tiefe", detail: "Lässt sich aus der Seite mehr als eine isolierte Kurzantwort ableiten?" },
    ],
    queries: ["Welche Voraussetzungen hat [Lösung]?", "Wo liegen die Grenzen von [Methode]?", "Welche Entscheidung folgt aus [Befund]?"],
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
          Antwortsystem-Prüfmodell
        </h3>
        <p className="text-sm text-muted">
          Wählen Sie eine Plattform: Das Dossier zeigt, welche Fragen dort geprüft werden — ohne erfundene Citation-Prognose.
        </p>
      </div>

      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Antwortsystem auswählen">
        {platforms.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => switchTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark ${
              activeTab === tab
                ? "bg-primary-dark text-white shadow-lg shadow-primary/20"
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
        <p className="text-sm leading-relaxed text-muted mb-5">{displayData.focus}</p>

        <div className="mb-6 border-y border-dark/15">
          {displayData.checks.map((check, index) => (
            <div key={check.label} className="grid grid-cols-[30px_105px_1fr] gap-3 border-b border-dark/10 py-3 last:border-b-0">
              <span className="font-mono text-[9px] font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-xs font-bold text-dark">{check.label}</span>
              <span className="text-xs leading-relaxed text-muted">{check.detail}</span>
            </div>
          ))}
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

        <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs leading-relaxed text-muted">
            Grenze: {displayData.limitation}
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
        "Ein dokumentierter Ausgangspunkt: relevante Prompts, beobachtete Nennungen, zitierte Quellen, inhaltliche Lücken und technische Voraussetzungen.",
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
        "Eine priorisierte Roadmap für Redaktion, Entwicklung und Kommunikation — inklusive Zuständigkeiten, Prüfintervallen und klaren Grenzen.",
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
        "Technische und inhaltliche Umsetzung: crawlbare Informationsarchitektur, strukturierte Daten, eindeutige Entitäten und belastbare Quellenpassagen.",
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
        "Quellenfähige Inhalte mit direkten Antworten, nachvollziehbaren Belegen, klarer Autorschaft und sinnvoller Einordnung in das bestehende Themenmodell.",
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
        "Wiederholbare Tests mit festem Prompt-Set, dokumentiertem Datum und getrennten Beobachtungen für Nennung, Zitation und Antwortkontext.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      featured: false,
    },
  ];

  const answerPath = [
    {
      title: "Die Frage bestimmt den Quellenraum",
      description:
        "Eine Vergleichsfrage ruft andere Quellen auf als eine Definition oder eine lokale Empfehlung. Deshalb beginnt GEO mit einem stabilen, nach Suchintention geordneten Prompt-Set.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      title: "Das System verdichtet mehrere Signale",
      description:
        "Eigene Inhalte, externe Erwähnungen, strukturierte Informationen und Aktualität können gemeinsam das Antwortbild prägen. Eine einzelne technische Datei ersetzt dieses Zusammenspiel nicht.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      title: "Die Antwort bleibt veränderlich",
      description:
        "Modelle, Suchindizes und Formulierungen ändern sich. Deshalb misst seriöses GEO Beobachtungen über Zeit und trennt Citation, Markennennung und tatsächlichen Website-Traffic.",
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
      <section data-hero className="relative min-h-[80vh] flex items-center overflow-hidden bg-dark">
        {/* Full-bleed image */}
        <Image
          src="/images/geo-hub-hero-v2.webp"
          alt="Abstraktes Netz aus miteinander verbundenen KI-Antwortsystemen"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />

        <div className="reveal relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-white">Generative Engine Optimization</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-heading)] text-white leading-[1.05] mb-6 max-w-4xl">
            GEO-Leistungen für{" "}
            <span className="text-secondary">Sichtbarkeit</span>
            {" "}in KI-Antworten
          </h1>

          <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
            Wir prüfen, wie ChatGPT, Gemini, Perplexity und Claude Ihre Marke einordnen,
            welche Quellen Antworten prägen und welche Website-Signale fehlen. Danach folgen
            priorisierte Maßnahmen — ohne Citation- oder Platzierungsgarantie.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-dark text-white rounded-full font-semibold hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              GEO-Ausgangslage prüfen
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
                Was sich bei GEO
                tatsächlich prüfen lässt
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Wählen Sie ein Antwortsystem. Das Prüfmodell trennt beobachtbare
                Quellen- und Antwortsignale von Behauptungen, die ohne kontrollierte
                Messung nicht seriös wären.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Nennung, Zitation und verweisenden Traffic getrennt erfassen",
                  "Prompt, Modell, Datum und Antwortkontext dokumentieren",
                  "Website-Maßnahmen mit beobachtbaren Änderungen verbinden",
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
      {/*  HOW ANSWERS FORM                                            */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-offwhite border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal">
            <div className="grid gap-7 border-b-2 border-dark pb-9 lg:grid-cols-[1fr_420px] lg:items-end lg:gap-16 mb-12">
              <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">
                Von der Frage zur Antwort
              </span>
              <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark leading-tight">
                Eine KI-Antwort entsteht nicht aus einem Ranking allein.
              </h2>
              </div>
              <p className="text-muted leading-relaxed">
                GEO erweitert ein solides SEO-Fundament um Quellenfähigkeit,
                Entitätsklarheit und wiederholbare Beobachtung. Der Ablauf erklärt,
                warum einzelne „KI-Hacks“ keine belastbare Strategie ersetzen.
              </p>
            </div>

            <div className="overflow-hidden border-y-2 border-dark bg-white">
              {answerPath.map((item, i) => (
                <div
                  key={item.title}
                  className="grid gap-5 border-b border-dark/15 p-7 last:border-b-0 sm:grid-cols-[64px_1fr_1.25fr] sm:items-start lg:p-9"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-full border border-primary/30 bg-primary/10 text-primary flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-[family-name:var(--font-heading)] font-bold text-dark">
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
      {/*  PAGE ROLES & GEO BOUNDARIES                                 */}
      {/* ============================================================ */}
      <section className="bg-dark py-24 text-white lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.23em] text-secondary">
              Seitenrollen statt GEO-Hacks
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] lg:text-[50px]">
              Welche Seite soll eine KI-Antwort eigentlich tragen?
            </h2>
            <p className="mt-6 text-base leading-[1.8] text-white/58">
              Eine belastbare GEO-Architektur verteilt nicht dieselbe Aussage auf
              möglichst viele URLs. Sie gibt jeder Seite eine überprüfbare Aufgabe.
              Dadurch bleibt erkennbar, wo Angebot, Erklärung und Beleg zu finden sind —
              und welche Suchintention eine URL bedienen soll.
            </p>
          </div>

          <div className="border-y border-white/25">
            <article className="grid gap-4 border-b border-white/15 py-8 sm:grid-cols-[48px_1fr] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">01</span>
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold">Leistungsseite: Zuständigkeit und nächster Schritt</h3>
                <p className="mt-4 text-sm leading-[1.85] text-white/58">
                  Eine Leistungsseite erklärt, welches Problem bearbeitet wird, welche
                  Arbeitsergebnisse entstehen und wo die Leistung endet. Sie braucht
                  keine künstliche Vollständigkeit, sondern eine klare Verbindung zu
                  vertiefenden Fachseiten. So konkurriert der Angebots-Hub nicht mit
                  Definitionen oder Ratgebern um dieselbe Anfrage.
                </p>
              </div>
            </article>
            <article className="grid gap-4 border-b border-white/15 py-8 sm:grid-cols-[48px_1fr] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">02</span>
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold">Quellenseite: Aussage, Kontext und Grenzen</h3>
                <p className="mt-4 text-sm leading-[1.85] text-white/58">
                  Begriffsseiten, Methodenartikel und Dokumentationen tragen die
                  erklärenden Passagen. Eine Aussage wird nützlicher, wenn Voraussetzung,
                  Einschränkung, Verantwortlichkeit und Aktualität direkt danebenstehen.
                  Strukturierte Daten können diese Einordnung unterstützen; sie ersetzen
                  weder crawlbaren Inhalt noch einen nachvollziehbaren Beleg.
                </p>
              </div>
            </article>
            <article className="grid gap-4 py-8 sm:grid-cols-[48px_1fr] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">03</span>
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold">Beobachtung: Antwort nicht mit Wirkung verwechseln</h3>
                <p className="mt-4 text-sm leading-[1.85] text-white/58">
                  Eine Nennung, eine Zitation und ein Website-Besuch sind verschiedene
                  Signale. Deshalb braucht Monitoring ein festes Prompt-Set, dokumentierte
                  Modelle und Vergleichszeitpunkte. Auch dann bleibt die Ausgabe variabel.
                  Erst die Verbindung mit SEO-Daten und verweisendem Traffic zeigt, ob eine
                  Änderung auffindbarer wurde — nicht, ob eine Plattform künftig immer
                  dieselbe Antwort liefert.
                </p>
              </div>
            </article>
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
                  Diese Seite ist der Leistungs-Hub: Sie ordnet Audit, Beratung,
                  Umsetzung, Content und Monitoring in einen gemeinsamen Ablauf ein.
                  Die{" "}
                  <Link href="/geo-agentur" className="text-primary font-semibold hover:underline">
                    GEO-Agentur-Seite
                  </Link>{" "}
                  beschreibt dagegen die Zusammenarbeit mit uns als Partner. Möchten Sie
                  zunächst den Begriff und seine Grenzen verstehen, lesen Sie{" "}
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
            Starten Sie mit einer dokumentierten Ausgangslage: relevante Prompts,
            aktuelle Antworten, zitierte Quellen und die nächsten prüfbaren Schritte.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-dark text-white rounded-full font-semibold hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
    </SubpageLayout>
  );
}
