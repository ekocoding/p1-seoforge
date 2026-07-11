"use client";

import { useState } from "react";
import Link from "next/link";

const CASES = [
  {
    key: "unsichtbar",
    label: "Kaum Sichtbarkeit",
    question: "Google kennt die Website – zeigt sie aber kaum.",
    diagnosis: "Erst Nachfrage und Wettbewerbsabstand prüfen. Danach eine kleine Zahl klarer Zielseiten stärken, statt sofort einen großen Blog aufzubauen.",
    first: "Keyword- und URL-Mapping",
    avoid: "20 neue Texte ohne Priorität",
    link: "/seo-agentur",
    linkLabel: "Agenturansatz prüfen",
  },
  {
    key: "traffic",
    label: "Traffic, keine Anfragen",
    question: "Rankings sind da – der geschäftliche Effekt bleibt aus.",
    diagnosis: "Suchintention, Seitenangebot und Conversion-Pfad gehören gemeinsam auf den Tisch. Mehr Traffic ist hier oft nicht die erste Antwort.",
    first: "Geldseiten & Suchintention abgleichen",
    avoid: "Reporting nur über Positionen",
    link: "/seo/optimierung",
    linkLabel: "Optimierung ansehen",
  },
  {
    key: "team",
    label: "Team kommt nicht nach",
    question: "Die Richtung stimmt – aber Umsetzung bleibt liegen.",
    diagnosis: "Ein monatlicher Arbeitsrhythmus mit wenigen verbindlichen Maßnahmen schlägt eine immer länger werdende Backlog-Liste.",
    first: "Monatsfokus mit Verantwortlichen",
    avoid: "Noch ein Strategie-Deck",
    link: "/seo/betreuung",
    linkLabel: "Betreuungsmodell ansehen",
  },
];

const PRINCIPLES = [
  ["01", "Keine erfundenen Erfolgszahlen", "Belege werden mit Quelle, Zeitraum und Kontext gezeigt – oder nicht als Beleg verkauft."],
  ["02", "Ein Ansprechpartner, ein Arbeitsstand", "Strategie, Umsetzung und Reporting hängen nicht in getrennten Ticketsystemen fest."],
  ["03", "Echte Artefakte statt Agenturvokabeln", "Sie sehen Crawl, Mapping, Änderungen und nächste Priorität – nicht nur ein grünes Statuslicht."],
  ["04", "Monatlich neu priorisiert", "Der Plan darf sich ändern, wenn Daten etwas Besseres zeigen. Genau dafür wird gemessen."],
];

export default function HomeDecisionLab() {
  const [active, setActive] = useState(0);
  const item = CASES[active];

  return (
    <section className="overflow-hidden bg-[#F3EEE7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Entscheidungs-Labor</p>
            <h2 className="mt-4 max-w-xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.04] text-dark sm:text-5xl">
              Wo würden wir bei Ihnen anfangen?
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-muted">
              Drei typische Situationen. Wählen Sie die, die Ihrer Website am nächsten kommt – und sehen Sie, welchen ersten Zug wir begründen würden.
            </p>

            <div className="mt-8 flex flex-col gap-2" role="tablist" aria-label="SEO-Ausgangslage auswählen">
              {CASES.map((entry, index) => (
                <button
                  key={entry.key}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  onClick={() => setActive(index)}
                  className={`group flex cursor-pointer items-center justify-between border-2 px-5 py-4 text-left transition-all ${
                    active === index
                      ? "border-dark bg-dark text-white shadow-[8px_8px_0_#C2722A]"
                      : "border-dark/15 bg-white/55 text-dark hover:border-dark/40 hover:bg-white"
                  }`}
                >
                  <span className="text-sm font-semibold">{entry.label}</span>
                  <span className={`font-mono text-xs transition-transform ${active === index ? "translate-x-0" : "-translate-x-1 opacity-35 group-hover:translate-x-0"}`} aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>

          <div key={item.key} className="relative self-start border-2 border-dark bg-white shadow-[14px_14px_0_rgba(212,168,83,.65)]">
            <div className="flex items-center justify-between border-b-2 border-dark bg-dark px-5 py-3 text-white">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Ersteinschätzung · {String(active + 1).padStart(2, "0")}</span>
              <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold leading-snug text-dark sm:text-3xl">{item.question}</p>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">{item.diagnosis}</p>

              <div className="mt-8 grid gap-px border-2 border-dark bg-dark sm:grid-cols-2">
                <div className="bg-[#fbf4ea] p-5">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary">Erster sinnvoller Zug</span>
                  <p className="mt-3 font-[family-name:var(--font-heading)] text-lg font-bold text-dark">{item.first}</p>
                </div>
                <div className="bg-white p-5">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-dark/40">Was wir nicht zuerst tun</span>
                  <p className="mt-3 font-[family-name:var(--font-heading)] text-lg font-bold text-dark">{item.avoid}</p>
                </div>
              </div>

              <div className="mt-7 flex flex-col justify-between gap-4 border-t border-dashed border-dark/25 pt-5 sm:flex-row sm:items-center">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-dark/40">Beispielhafte Einordnung · keine automatische Analyse</p>
                <Link href={item.link} className="text-sm font-bold text-primary hover:text-primary-dark">{item.linkLabel} →</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t-2 border-dark">
          <div className="grid border-b border-dark/20 py-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Woran Sie uns messen können</p>
            <h3 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-dark lg:mt-0 lg:text-4xl">Vertrauen entsteht aus prüfbarer Arbeit.</h3>
          </div>
          {PRINCIPLES.map(([number, title, copy]) => (
            <div key={number} className="group grid gap-4 border-b border-dark/20 py-6 transition-colors hover:bg-white/45 lg:grid-cols-[.16fr_.56fr_1.28fr] lg:items-baseline lg:px-3">
              <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-primary">{number}</span>
              <h4 className="font-[family-name:var(--font-heading)] text-xl font-bold normal-case tracking-normal text-dark">{title}</h4>
              <p className="max-w-2xl text-[14px] leading-relaxed text-muted">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-5 border-2 border-dark bg-primary px-6 py-6 text-white sm:flex-row sm:items-center lg:px-8">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-2xl font-bold">Bringen Sie die echte Ausgangslage mit.</p>
            <p className="mt-1 text-sm text-white/75">Wir bringen die unbequemen Fragen und eine klare erste Priorität.</p>
          </div>
          <Link href="/kontakt" className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-dark transition-colors hover:bg-dark hover:text-white">
            Kostenlose Erstanalyse
          </Link>
        </div>
      </div>
    </section>
  );
}
