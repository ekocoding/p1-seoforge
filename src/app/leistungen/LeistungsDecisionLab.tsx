"use client";

import Link from "next/link";
import { useState } from "react";

const DECISIONS = [
  {
    id: "diagnose",
    label: "Ausgangslage unklar",
    question: "Wir sehen Symptome, aber kennen die Ursache nicht.",
    answer: "Ein Audit trennt technische Blockaden, Content-Lücken und Messfehler. Erst danach lässt sich entscheiden, ob Beratung, Umsetzung oder laufende Betreuung der richtige Modus ist.",
    first: { href: "/seo/audit", label: "Mit einem SEO Audit beginnen" },
    adjacent: { href: "/geo/audit", label: "KI-Antworten separat prüfen" },
    artifact: "Befund, Prioritäten und Zuständigkeiten",
  },
  {
    id: "organic",
    label: "Organische Nachfrage",
    question: "Google-Sichtbarkeit soll systematisch verbessert werden.",
    answer: "SEO verbindet technische Qualität, Suchintention, Inhalte und interne Links. Für eine definierte Baustelle reicht Optimierung; bei mehreren Abhängigkeiten ist laufende Betreuung sinnvoller.",
    first: { href: "/seo/optimierung", label: "SEO Optimierung einordnen" },
    adjacent: { href: "/seo/betreuung", label: "Laufende Betreuung verstehen" },
    artifact: "Priorisierte Releases statt Maßnahmenliste",
  },
  {
    id: "answers",
    label: "KI-Antworten",
    question: "Die Marke soll in generativen Antworten korrekt vorkommen.",
    answer: "GEO prüft Nennungen, Zitationen, Quellen und Antwortkontext. Das baut auf crawlbaren, fachlich belastbaren Inhalten auf und ergänzt SEO — es ersetzt die Suchmaschinenoptimierung nicht.",
    first: { href: "/geo", label: "GEO-Leistungen ansehen" },
    adjacent: { href: "/geo/monitoring", label: "Messlogik vertiefen" },
    artifact: "Prompt-Set, Quellenbild und wiederholbare Beobachtung",
  },
  {
    id: "product",
    label: "Website als Produkt",
    question: "Der Webauftritt erklärt das Angebot nicht mehr sauber.",
    answer: "Webdesign ordnet Inhalte, Kundenwege und technische Plattform. Ein Relaunch schützt bestehende URLs und Signale; eine neue Website startet mit Informationsarchitektur und Suchbedarf.",
    first: { href: "/webdesign/website-erstellen-lassen", label: "Neue Website planen" },
    adjacent: { href: "/webdesign/website-relaunch-agentur", label: "Relaunch prüfen" },
    artifact: "Seitenarchitektur, Designsystem und kontrollierter Release",
  },
];

export function LeistungsNavigator() {
  const [active, setActive] = useState(0);
  const decision = DECISIONS[active];

  return (
    <section className="overflow-hidden bg-[#F4EFE8] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-7 border-b-2 border-dark pb-9 lg:grid-cols-[1fr_420px] lg:items-end lg:gap-16">
          <div>
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.23em] text-primary-dark">Einstieg nach Problem</span>
            <h2 className="max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-dark lg:text-[52px]">
              Nicht jede Baustelle braucht dieselbe Leistung.
            </h2>
          </div>
          <p className="text-muted leading-relaxed">
            Wählen Sie die Situation, die Ihrem Projekt am nächsten kommt. Das
            Entscheidungsdossier zeigt einen sinnvollen ersten Schritt, eine angrenzende
            Vertiefung und das Ergebnis, das vor weiterer Arbeit vorliegen sollte.
          </p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[2rem] border border-dark/20 bg-white lg:grid-cols-[.72fr_1.28fr]">
          <div className="border-b border-dark/15 bg-white lg:border-b-0 lg:border-r" role="tablist" aria-label="Projektproblem auswählen">
            {DECISIONS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="service-decision-panel"
                onClick={() => setActive(index)}
                className={`grid w-full grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-dark/10 px-6 py-5 text-left transition-colors last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary-dark ${active === index ? "bg-dark text-white" : "text-dark/55 hover:bg-offwhite hover:text-dark"}`}
              >
                <span className={`font-mono text-[9px] font-bold ${active === index ? "text-secondary" : "text-primary-dark"}`}>{String(index + 1).padStart(2, "0")}</span>
                <span className="font-[family-name:var(--font-heading)] text-lg font-bold">{item.label}</span>
                <span className={active === index ? "text-secondary" : "text-dark/25"} aria-hidden="true">→</span>
              </button>
            ))}
          </div>

          <div id="service-decision-panel" role="tabpanel" className="relative min-h-[500px] overflow-hidden bg-dark p-7 text-white sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
              <svg viewBox="0 0 760 520" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                <path d="M-30 430 C160 400 220 115 438 132 C575 142 610 310 810 214" fill="none" stroke="#D4A853" strokeWidth="1" strokeDasharray="7 12" />
                <circle cx={170 + active * 92} cy={360 - active * 50} r="9" fill="#D4A853" />
              </svg>
            </div>
            <div key={decision.id} className="relative flex min-h-[400px] flex-col motion-safe:animate-[fadeIn_.25s_ease-out]">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Entscheidungsdossier · {decision.label}</span>
              <h3 className="mt-5 max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] sm:text-4xl">{decision.question}</h3>
              <p className="mt-5 max-w-2xl text-base leading-[1.8] text-white/58">{decision.answer}</p>

              <div className="mt-auto grid gap-5 border-t border-white/15 pt-7 sm:grid-cols-[1fr_1fr]">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">Sinnvoller Einstieg</span>
                  <Link href={decision.first.href} className="mt-2 block font-semibold text-secondary underline decoration-secondary/40 underline-offset-4 hover:text-secondary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
                    {decision.first.label} →
                  </Link>
                  <Link href={decision.adjacent.href} className="mt-2 block text-sm text-white/55 underline decoration-white/20 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    {decision.adjacent.label}
                  </Link>
                </div>
                <div className="sm:border-l sm:border-white/15 sm:pl-5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">Prüfbarer Ausgang</span>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-white/82">{decision.artifact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SCOPES = [
  {
    name: "SEO",
    job: "Organische Nachfrage in klassischen Suchsystemen erschließen",
    boundary: "Rankings, Snippets, technische Indexierbarkeit und Suchintention",
    href: "/seo",
  },
  {
    name: "GEO",
    job: "Darstellung und Quellenfähigkeit in generativen Antworten prüfen",
    boundary: "Nennungen, Zitationen, Antwortkontext und verweisender Traffic",
    href: "/geo",
  },
  {
    name: "Webdesign",
    job: "Informationsarchitektur, Nutzerweg und technische Plattform bauen",
    boundary: "Seitenstruktur, Interface, Conversion-Weg und Betrieb",
    href: "/webdesign",
  },
  {
    name: "KI-SEO",
    job: "SEO, GEO, Entitäten und externe Markensignale gemeinsam steuern",
    boundary: "Der übergreifende Modus — kein zweiter Name für eine einzelne GEO-Maßnahme",
    href: "/ki-seo-agentur",
  },
];

export function ScopeBoundaryLedger() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.23em] text-primary-dark">Klare Zuständigkeit</span>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-dark lg:text-[50px]">
              Vier Disziplinen. Vier unterschiedliche Jobs.
            </h2>
            <p className="mt-6 text-base leading-[1.8] text-muted">
              Die Bereiche greifen ineinander, dürfen aber nicht zu einem unscharfen
              Paket verschmelzen. Diese Abgrenzung zeigt, welche Kennzahlen, Teams und
              Entscheidungen jeweils dazugehören.
            </p>
          </div>

          <div className="border-y-2 border-dark">
            {SCOPES.map((scope, index) => (
              <Link key={scope.name} href={scope.href} className="group grid gap-3 border-b border-dark/15 p-6 last:border-b-0 sm:grid-cols-[36px_140px_minmax(0,1fr)] sm:gap-x-6 sm:p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary-dark">
                <span className="font-mono text-[9px] font-bold text-primary-dark">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark group-hover:text-primary-dark">{scope.name}</span>
                <span>
                  <strong className="block text-sm font-semibold text-dark">{scope.job}</strong>
                  <small className="mt-1 block text-[13px] leading-relaxed text-muted">{scope.boundary}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
