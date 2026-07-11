"use client";

import { useState } from "react";
import Link from "next/link";
import SubpageLayout from "@/app/components/SubpageLayout";
import FaqAccordion from "@/app/components/FaqAccordion";

const WORKBENCH = [
  {
    key: "index",
    label: "Indexierung",
    before: "Mehrere URLs konkurrieren um dieselbe Suchintention. Canonicals und interne Links senden unterschiedliche Signale.",
    action: "URL-Zuordnung bereinigen, Canonicals korrigieren, interne Signale auf eine Zielseite bündeln.",
    verify: "Crawl, gerenderter Canonical, Sitemap und Search-Console-Status werden nach dem Release erneut geprüft.",
    artifact: "URL-Mapping + technisches Release-Protokoll",
  },
  {
    key: "speed",
    label: "Performance",
    before: "Ein großes Bild, blockierendes JavaScript oder unnötige Drittanbieter bremsen die zentrale Zielseite.",
    action: "Ursache isolieren, Asset- und Ladepfad optimieren und nur die Änderung deployen, die den Engpass wirklich adressiert.",
    verify: "Labordaten, reale Nutzerdaten und visuelle Regression werden getrennt kontrolliert – nicht zu einem Score vermischt.",
    artifact: "Vorher-/Nachher-Messung mit Ursache",
  },
  {
    key: "content",
    label: "Content",
    before: "Die Seite ist lang, beantwortet aber die entscheidende Kauf- oder Informationsfrage nicht eindeutig.",
    action: "Suchintention schärfen, Struktur verdichten, fehlende Belege ergänzen und redundante Abschnitte entfernen.",
    verify: "Snippet, interne Links, Indexierung und Reaktion der relevanten Suchanfragen werden beobachtet.",
    artifact: "Redaktioneller Diff + Keyword-zu-Abschnitt-Mapping",
  },
  {
    key: "structure",
    label: "Architektur",
    before: "Wichtige Geldseiten liegen tief, Hubs verlinken nicht auf Spokes oder ähnliche Seiten kannibalisieren sich.",
    action: "Informationsarchitektur neu ordnen, Hub-Spoke-Wege schließen und Linktexte nach Aufgabe statt Keyword-Stuffing wählen.",
    verify: "Klicktiefe, Inbounds, Orphan Pages und die eindeutige Ziel-URL je Cluster werden nachgeprüft.",
    artifact: "Crawl-Map + umgesetzter Linking-Plan",
  },
];

const AREAS = [
  ["01", "Technische SEO Optimierung", "Crawling, Rendering, Indexierung, Ladezeit, strukturierte Daten und Redirects werden dort korrigiert, wo sie Suchmaschinen oder Nutzer tatsächlich blockieren."],
  ["02", "On-Page & Suchintention", "Titles, Seitenstruktur, interne Signale und Content werden auf eine eindeutige Aufgabe ausgerichtet. Eine URL soll nicht gleichzeitig fünf verschiedene Intentionen bedienen."],
  ["03", "Content-Konsolidierung", "Bestehende Inhalte werden gestärkt, zusammengeführt oder bewusst entfernt. Neue Seiten entstehen erst, wenn eine eigene Suchintention und ein wirtschaftlicher Zweck belegt sind."],
  ["04", "Interne Architektur", "Hubs, Leistungsseiten und Ratgeber verteilen Autorität entlang echter Nutzerwege. Wichtige Seiten dürfen nicht nur über Footer oder Sitemap erreichbar sein."],
  ["05", "Autorität & externe Signale", "Backlinks, Erwähnungen und Entitätssignale werden mit dem Wettbewerbsabstand abgeglichen. Kein Linkpaket ersetzt eine schwache technische oder inhaltliche Grundlage."],
  ["06", "Validierung & Monitoring", "Jede Änderung bekommt eine Prüfmethode. Wir dokumentieren, was live ging, welches Signal wir erwarten und wann neu entschieden wird."],
];

const FAQ = [
  {
    q: "Was ist SEO Optimierung?",
    a: "SEO Optimierung ist die gezielte Verbesserung einer Website für Suchmaschinen und Nutzer. Dazu gehören technische Zugänglichkeit, eindeutige Suchintentionen, hilfreicher Content, interne Architektur, Autorität und die Messung nach dem Release. Bei SeoForge endet Optimierung nicht bei einer Empfehlung: Änderungen werden umgesetzt und anschließend validiert.",
  },
  {
    q: "Was ist der Unterschied zwischen SEO Audit und SEO Optimierung?",
    a: "Ein SEO Audit diagnostiziert Probleme und priorisiert Maßnahmen. SEO Optimierung setzt diese Maßnahmen tatsächlich um: im Code, in der Seitenstruktur, im Content und in der internen Verlinkung. Beides kann kombiniert werden, aber der Output ist unterschiedlich – Befund auf der einen, veränderte Website auf der anderen Seite.",
  },
  {
    q: "Wie lange dauert SEO Optimierung?",
    a: "Ein klar umrissenes technisches oder inhaltliches Paket kann innerhalb weniger Wochen umgesetzt werden. Wie schnell Suchmaschinen reagieren, hängt von Crawling, Ausgangslage und Wettbewerb ab. Größere Cluster und Autoritätsarbeit brauchen mehrere Monate. Wir trennen deshalb Umsetzungsdauer und Wirkungsdauer sauber.",
  },
  {
    q: "Welche Bereiche werden optimiert?",
    a: "Je nach Engpass arbeiten wir an Technik, Core Web Vitals, Indexierung, On-Page-Struktur, Content, interner Verlinkung, Informationsarchitektur, Backlinks und KI-Sichtbarkeit. Es wird nicht automatisch überall gearbeitet. Die Priorität folgt Daten, Risiko und geschäftlicher Wirkung.",
  },
  {
    q: "Kann SEO Optimierung einmalig beauftragt werden?",
    a: "Ja. Einmalige Optimierung eignet sich für klar definierte Probleme, Relaunch-Vorbereitung oder ein priorisiertes Maßnahmenpaket. Wenn regelmäßige Content-, Autoritäts- und Monitoringarbeit nötig ist, ist laufende SEO Betreuung das passendere Modell.",
  },
  {
    q: "Gibt SeoForge Ranking-Garantien?",
    a: "Nein. Keine Agentur kontrolliert Google oder Wettbewerber. Wir garantieren einen transparenten Arbeitsumfang, saubere Umsetzung, nachvollziehbare Validierung und eine ehrliche Einordnung der Daten – keine feste Position zu einem festen Datum.",
  },
];

const grad = {
  background: "linear-gradient(92deg, #C2722A, #D4A853)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
};

export default function SeoOptimierungClient() {
  const [active, setActive] = useState(0);
  const item = WORKBENCH[active];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: { "@type": "Answer", text: entry.a },
    })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO — Werkbank statt Dashboard-Fantasiezahlen */}
      <section className="relative overflow-hidden bg-[#F5F0E9] py-14 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{ backgroundImage: "linear-gradient(rgba(26,26,26,.09) 1px, transparent 1px),linear-gradient(90deg,rgba(26,26,26,.09) 1px,transparent 1px)", backgroundSize: "32px 32px" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[.88fr_1.12fr] lg:gap-16 lg:px-8">
          <div>
            <div className="flex items-center gap-3 border-b-2 border-dark pb-4">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-dark/55">SEO Optimierung · Umsetzung</span>
            </div>
            <h1 className="mt-10 font-[family-name:var(--font-heading)] text-[42px] font-bold leading-[1.02] tracking-tight text-dark sm:text-5xl lg:text-[62px]">
              Aus dem Befund
              <span className="block" style={grad}>wird ein Release.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              SEO Optimierung heißt bei uns: Ursache isolieren, Änderung umsetzen und danach prüfen, ob Technik, Suchintention und Nutzerweg wirklich besser geworden sind.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt" className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark">Optimierung besprechen</Link>
              <a href="#werkbank" className="rounded-full border-2 border-dark px-7 py-3 text-sm font-bold text-dark transition-colors hover:bg-dark hover:text-white">Werkbank testen</a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-dark/15 pt-5">
              {["Ursache vor Maßnahme", "Umsetzung im Projekt", "Validierung nach Release"].map((point) => (
                <span key={point} className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-dark/50"><span className="h-[2px] w-4 bg-primary" />{point}</span>
              ))}
            </div>
          </div>

          <div className="border-2 border-dark bg-dark text-white shadow-[16px_16px_0_rgba(194,114,42,.42)]">
            <div className="flex items-center justify-between border-b border-white/20 px-5 py-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Release-Protokoll</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary">Beispielstruktur</span>
            </div>
            <div className="p-6 sm:p-8">
              {["Befund eindeutig formuliert", "Änderung isoliert umgesetzt", "Risiko und Rollback geprüft", "Messpunkt nach Release gesetzt"].map((line, index) => (
                <div key={line} className="grid grid-cols-[42px_1fr_auto] items-center border-b border-white/12 py-4 last:border-b-0">
                  <span className="font-mono text-[10px] text-secondary">0{index + 1}</span>
                  <span className="text-sm font-semibold text-white/75">{line}</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" aria-label="erforderlich" />
                </div>
              ))}
              <div className="mt-7 bg-white p-5 text-dark">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-primary">Definition of done</span>
                <p className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold">Nicht „Ticket geschlossen“, sondern Änderung nachvollziehbar geprüft.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERAKTIVE WERKBANK */}
      <section id="werkbank" className="scroll-mt-24 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 border-b-2 border-dark pb-9 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Interaktive Optimierungs-Werkbank</span>
              <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-dark sm:text-5xl">Vom Problem zur überprüften Änderung.</h2>
            </div>
            <p className="text-[15px] leading-relaxed text-muted">Wählen Sie einen Engpass. Die Werkbank zeigt den Unterschied zwischen einer allgemeinen Empfehlung und einem umsetzbaren SEO-Arbeitspaket.</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr]">
            <div className="flex flex-col gap-2" role="tablist" aria-label="SEO-Engpass auswählen">
              {WORKBENCH.map((entry, index) => (
                <button
                  key={entry.key}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  onClick={() => setActive(index)}
                  className={`flex cursor-pointer items-center justify-between border-2 px-5 py-4 text-left text-sm font-bold transition-all ${active === index ? "border-dark bg-dark text-white shadow-[7px_7px_0_#C2722A]" : "border-dark/15 bg-[#F8F5F1] text-dark hover:border-dark/45"}`}
                >
                  {entry.label}<span aria-hidden="true">→</span>
                </button>
              ))}
            </div>

            <div key={item.key} className="border-2 border-dark bg-[#F8F5F1] shadow-[14px_14px_0_rgba(212,168,83,.55)]">
              <div className="flex items-center justify-between border-b-2 border-dark bg-dark px-5 py-3 text-white">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Arbeitspaket · {item.label}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary">illustratives Beispiel</span>
              </div>
              <div className="grid gap-px bg-dark lg:grid-cols-3">
                {[
                  ["01 · Befund", item.before],
                  ["02 · Änderung", item.action],
                  ["03 · Validierung", item.verify],
                ].map(([title, copy], index) => (
                  <div key={title} className={`p-6 sm:p-8 ${index === 1 ? "bg-[#fbf4ea]" : "bg-white"}`}>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary">{title}</span>
                    <p className="mt-4 text-[14px] leading-relaxed text-dark/68">{copy}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-between gap-4 border-t-2 border-dark bg-white px-6 py-5 sm:flex-row sm:items-center">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dark/40">Sichtbarer Output</span>
                <strong className="font-[family-name:var(--font-heading)] text-lg text-dark">{item.artifact}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEISTUNGS-DOSSIER */}
      <section className="bg-[#F5F0E9] py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Was wir optimieren</span>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-dark">Sechs Ebenen. Eine priorisierte Reihenfolge.</h2>
            </div>
            <p className="text-[15px] leading-relaxed text-muted">Ganzheitlich bedeutet nicht gleichzeitig. Je nach Engpass kann eine kleine technische Korrektur wertvoller sein als eine neue Content-Serie – oder genau umgekehrt.</p>
          </div>

          <div className="border-2 border-dark bg-white">
            <div className="flex items-center justify-between border-b-2 border-dark bg-dark px-6 py-4 text-white">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Optimierungs-Dossier</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary">6 Prüfebenen</span>
            </div>
            {AREAS.map(([number, title, copy]) => (
              <div key={number} className="grid gap-3 border-b border-dark/15 px-6 py-6 last:border-b-0 lg:grid-cols-[70px_260px_1fr] lg:items-baseline lg:px-8">
                <span className="font-mono text-[10px] font-bold text-primary">POS {number}</span>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">{title}</h3>
                <p className="text-[14px] leading-relaxed text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARBEITSMODUS */}
      <section className="bg-dark py-20 text-white lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">Optimierung ist Veränderungsarbeit</span>
          <blockquote className="mt-7 max-w-5xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[58px]">
            Ein Audit sagt, was falsch ist.
            <span className="block text-secondary">Optimierung verändert, was Nutzer und Suchmaschinen erleben.</span>
          </blockquote>
          <div className="mt-12 grid gap-px bg-white/20 md:grid-cols-3">
            {[
              ["Einmaliges Paket", "Für einen klar umrissenen Engpass, Relaunch oder priorisierten Maßnahmenblock.", "/seo/audit", "Audit als Ausgangspunkt"],
              ["Laufende Optimierung", "Für Websites, bei denen Content, Technik und Wettbewerb kontinuierlich weiterlaufen.", "/seo/betreuung", "Zur SEO Betreuung"],
              ["Beratung + internes Team", "Für Unternehmen, die selbst umsetzen und eine klare Priorisierung sowie Review brauchen.", "/seo/beratung", "Zur SEO Beratung"],
            ].map(([title, copy, href, label]) => (
              <div key={title} className="flex flex-col bg-[#22201f] p-7 sm:p-9">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold">{title}</h3>
                <p className="mt-4 flex-1 text-[14px] leading-relaxed text-white/55">{copy}</p>
                <Link href={href} className="mt-7 text-sm font-bold text-secondary hover:text-white">{label} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="jetzt-starten" className="bg-primary py-16 text-white lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-6 sm:flex-row sm:items-center lg:px-8">
          <div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">Kostenlose Ersteinschätzung</span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">Welcher Engpass gehört zuerst auf die Werkbank?</h2>
            <p className="mt-2 text-sm text-white/75">Wir prüfen die Ausgangslage und nennen eine begründete erste Maßnahme.</p>
          </div>
          <Link href="/kontakt" className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-dark transition-colors hover:bg-dark hover:text-white">Optimierung besprechen</Link>
        </div>
      </section>

      <section className="bg-[#F5F0E9] py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">FAQ</span>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold text-dark">Fragen zur SEO Optimierung</h2>
          </div>
          <FaqAccordion items={FAQ} />
        </div>
      </section>
    </SubpageLayout>
  );
}
