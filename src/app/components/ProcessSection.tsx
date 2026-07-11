"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const STAGES = [
  { number: "01", short: "Befund", signal: "Ursache belegen" },
  { number: "02", short: "Einsatz", signal: "Hebel ausw\u00e4hlen" },
  { number: "03", short: "Release", signal: "\u00c4nderung ausliefern" },
  { number: "04", short: "Lernspur", signal: "Wirkung einordnen" },
] as const;

const WORKPIECES = [
  {
    key: "geldseite",
    label: "Geldseite",
    center: "Geldseite",
    caption: "Wenn eine wichtige Leistungsseite sichtbar ist, aber ihre kaufnahe Suchintention noch nicht sauber gewinnt.",
    phases: [
      {
        title: "Deckt genau diese URL die richtige Kaufabsicht ab?",
        action:
          "Wir verbinden Suchanfragen, bestehende Rankings, SERP-Muster, Seitenangebot und Conversion-Pfad. So wird sichtbar, ob Inhalt, Intention oder Seitenrolle das eigentliche Problem ist.",
        output: "URL-/Intent-Protokoll mit Überschneidungen, Lücken und einer eindeutigen Zielseite.",
        acceptance:
          "Primäre Suchintention und Seitenrolle sind klar; mögliche Kannibalisierung und offene Belege sind dokumentiert.",
        href: "/seo/content-strategie",
        link: "Content-Strategie ansehen",
      },
      {
        title: "Welche Änderung hat hier den größten Geschäftshebel?",
        action:
          "Wir priorisieren Struktur, Argumentation, interne Links, Snippet und technische Hürden gemeinsam — nicht als voneinander getrennte To-do-Listen.",
        output: "Ein Release-Brief mit Reihenfolge, Verantwortlichen und bewusst vertagten Maßnahmen.",
        acceptance:
          "Jede geplante Änderung hat einen Grund, einen Prüfschritt und eine verantwortliche Person.",
        href: "/seo/beratung",
        link: "SEO-Beratung ansehen",
      },
      {
        title: "Die Empfehlung wird zur sichtbaren Seitenversion.",
        action:
          "Wir überarbeiten die relevanten Seitenteile, Verlinkungen und Metadaten, prüfen Darstellung und Crawlbarkeit und führen die Änderung kontrolliert ins Projekt.",
        output: "Veröffentlichte Änderung plus nachvollziehbarer Vorher-/Nachher-Diff.",
        acceptance:
          "Die Seite ist mobil lesbar, crawlbar und der zentrale nächste Schritt funktioniert; der Release ist festgehalten.",
        href: "/seo/optimierung",
        link: "SEO-Optimierung ansehen",
      },
      {
        title: "Das nächste Signal entscheidet — nicht der Kalender.",
        action:
          "Wir lesen Rankings, Klicks und relevante Conversion-Signale im Kontext der Änderung. Ein fehlender Effekt führt zu einer neuen Hypothese, nicht zur Wiederholung derselben Maßnahme.",
        output: "Entscheidungsnotiz: beibehalten, weiterentwickeln oder zurücknehmen — jeweils mit Begründung.",
        acceptance:
          "Die nächste Priorität folgt aus Daten und Geschäftsrelevanz; offene Unsicherheit bleibt sichtbar.",
        href: "/seo/betreuung",
        link: "SEO-Betreuung ansehen",
      },
    ],
  },
  {
    key: "technik",
    label: "Technischer Engpass",
    center: "Technik",
    caption: "Wenn Crawling, Indexierung, Templates oder Performance die Reichweite ganzer Seitenbereiche bremsen.",
    phases: [
      {
        title: "Ist es ein Einzelfehler oder ein systemisches Muster?",
        action:
          "Wir verbinden Crawl, Indexierungsberichte, betroffene Templates und reale Render-Ausgaben. Erst dann trennen wir Symptom, Ursache und Reichweite.",
        output: "Impact-Karte der betroffenen Seitentypen mit reproduzierbarem Befund.",
        acceptance:
          "Das Problem lässt sich reproduzieren, sein Umfang ist bekannt und die vermutete Ursache ist von Begleitsymptomen getrennt.",
        href: "/seo/audit",
        link: "SEO-Audit ansehen",
      },
      {
        title: "Wo behebt ein Eingriff möglichst viele Ursachen?",
        action:
          "Wir entscheiden, ob der Fix an Template, Komponente, Konfiguration oder Einzelseite gehört und prüfen Abhängigkeiten vor dem Eingriff.",
        output: "Technischer Release-Plan mit Risiko, Prüffällen und Rückfalloption.",
        acceptance:
          "Der kleinste sinnvolle Eingriff ist gewählt; angrenzende Seitentypen und mögliche Nebenwirkungen sind bekannt.",
        href: "/seo/beratung",
        link: "Technische Entscheidung besprechen",
      },
      {
        title: "Ein Fix zählt erst, wenn er im gerenderten System ankommt.",
        action:
          "Wir setzen die Änderung um und prüfen nicht nur den Quellcode, sondern die ausgelieferte Seite, interne Verweise und relevante Gerätebreiten.",
        output: "Release-Log mit geändertem Baustein, Prüffällen und Ergebnis.",
        acceptance:
          "Der Fehler ist im Live-Output behoben, Kernpfade funktionieren und es gibt keine unbeabsichtigte Layout- oder Indexierungsfolge.",
        href: "/seo/optimierung",
        link: "Technische Optimierung ansehen",
      },
      {
        title: "Recrawl und Felddaten schließen die Prüfung ab.",
        action:
          "Wir kontrollieren, ob Suchmaschinen die Änderung erfassen und ob sich das betroffene technische Signal wie erwartet entwickelt. Wo Zeitverzug wirkt, benennen wir ihn.",
        output: "Recrawl- und Abnahmeprotokoll mit offenem Beobachtungsfenster.",
        acceptance:
          "Technischer Befund und Suchmaschinen-Signal sind getrennt bewertet; die nächste Prüfung hat einen konkreten Anlass.",
        href: "/seo/betreuung",
        link: "Laufende Betreuung ansehen",
      },
    ],
  },
  {
    key: "autoritaet",
    label: "Autorit\u00e4tsl\u00fccke",
    center: "Autorit\u00e4t",
    caption: "Wenn Inhalte vorhanden sind, aber externe Erwähnungen, belastbare Quellen oder thematische Autorität fehlen.",
    phases: [
      {
        title: "Fehlt Reichweite — oder fehlt ein zitierbarer Grund?",
        action:
          "Wir vergleichen Themenabdeckung, relevante Verweise, Marken-Nennungen und Quellenkontexte. Eine reine Linkzahl erklärt dabei noch keine Autorität.",
        output: "Autoritäts-Lückenbild nach Thema, Quellentyp und vorhandener eigener Substanz.",
        acceptance:
          "Es ist klar, welche Themen einen Beleg verdienen und ob zuerst ein eigenes Asset oder externe Distribution fehlt.",
        href: "/linkbuilding-agentur",
        link: "Linkbuilding-Ansatz ansehen",
      },
      {
        title: "Welches Werkstück ist tatsächlich referenzwürdig?",
        action:
          "Wir wählen zwischen Fachbeitrag, Datenauswertung, Vergleich, Expertenbeitrag oder gezieltem Outreach — passend zum Thema, nicht zum bequemsten Format.",
        output: "Asset- und Distributionsbrief mit Zielquellen, Aussage und Qualitätsgrenze.",
        acceptance:
          "Das geplante Asset bietet eigenständigen Nutzen; Zielquellen passen fachlich und werden nicht nur nach Metrik ausgewählt.",
        href: "/seo/content-strategie",
        link: "Content-Fundament ansehen",
      },
      {
        title: "Publikation und Ansprache werden als ein Vorgang geführt.",
        action:
          "Wir veröffentlichen die belegbare Quelle, stärken ihre interne Einbindung und dokumentieren die gezielte Ansprache relevanter Redaktionen, Partner oder Fachseiten.",
        output: "Publikations- und Outreach-Log statt anonymer Linkliste.",
        acceptance:
          "Quelle, Aussage und Kontaktweg sind nachvollziehbar; gekaufte oder fachlich unpassende Platzierungen werden nicht als Erfolg umetikettiert.",
        href: "/linkbuilding-agentur",
        link: "Autoritätsaufbau vertiefen",
      },
      {
        title: "Qualität zeigt sich im Kontext einer echten Erwähnung.",
        action:
          "Wir prüfen neue Verweise, Marken-Nennungen und — wo relevant — Quellen in KI-Antworten. Entscheidend ist, wofür die Marke genannt wird, nicht nur dass sie genannt wird.",
        output: "Qualitätsreview mit Kontext, Zielseite und nächster inhaltlicher Lücke.",
        acceptance:
          "Neue Signale sind fachlich eingeordnet; die nächste Maßnahme stärkt ein Thema statt wahllos weitere Verweise zu sammeln.",
        href: "/geo/monitoring",
        link: "KI-Sichtbarkeit messen",
      },
    ],
  },
] as const;

const START_REQUIREMENTS = [
  ["Geschäftsziel", "Welche Anfrage, Buchung oder Handlung soll organische Sichtbarkeit unterstützen?"],
  ["Datenzugang", "Welche Such-, Analyse- und Systemdaten sind vorhanden — und welche Aussage erlauben sie nicht?"],
  ["Release-Weg", "Wer darf Inhalt oder Code freigeben, und wie kommt eine geprüfte Änderung verlässlich live?"],
] as const;

export default function ProcessSection() {
  const [activeWorkpiece, setActiveWorkpiece] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const workpiece = WORKPIECES[activeWorkpiece];
  const stage = STAGES[activeStage];
  const detail = workpiece.phases[activeStage];

  function selectWorkpiece(index: number) {
    setActiveWorkpiece(index);
    setActiveStage(0);
  }

  return (
    <section className="relative overflow-hidden bg-[#171411] py-20 text-white lg:py-28" id="prozess">
      <style>{`
        @keyframes processTrace {
          to { stroke-dashoffset: -54; }
        }
        .process-trace {
          animation: processTrace 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .process-trace { animation: none; }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, black, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-end gap-7 border-b border-white/20 pb-9 lg:grid-cols-[minmax(0,1.16fr)_minmax(320px,.84fr)] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Der SeoForge-Arbeitszyklus
            </p>
            <h2 className="mt-4 max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-[60px]">
              Jede Maßnahme muss
              <span className="block text-secondary">vier Prüfstellen passieren.</span>
            </h2>
          </div>
          <p className="max-w-lg text-[15px] leading-relaxed text-white/60 lg:justify-self-end">
            Der Zyklus ist kein Kalenderbild. Er zeigt, welche Frage vor einer Änderung beantwortet sein muss,
            welches Artefakt entsteht und woran wir den nächsten Zug festmachen. Wählen Sie ein typisches Werkstück.
          </p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Beispielhaftes SEO-Werkstück auswählen">
          {WORKPIECES.map((item, index) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={activeWorkpiece === index}
              onClick={() => selectWorkpiece(index)}
              className={`min-w-fit cursor-pointer border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                activeWorkpiece === index
                  ? "border-secondary bg-secondary text-[#171411]"
                  : "border-white/18 bg-white/[0.035] text-white/55 hover:border-white/38 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1.17fr)_minmax(350px,.83fr)] lg:gap-9">
          <div className="overflow-hidden border border-white/22 bg-black">
            <div className="flex items-center justify-between border-b border-white/16 bg-black/85 px-5 py-3.5">
              <span className="flex items-center gap-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                Werkbank · {workpiece.label}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-white/30">Interaktives Beispiel</span>
            </div>

            <figure className="overflow-hidden">
              <div className="relative min-h-[440px] sm:min-h-[560px]">
                <Image
                  src="/images/home-process-worktable-v2.webp"
                  alt="SEO-Arbeitsunterlagen mit Seitenarchitektur, Analysedaten und priorisierten Maßnahmen auf einer Werkbank"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(12,9,7,.35),rgba(8,7,6,.9)_72%)]" aria-hidden="true" />

                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                <div className="relative aspect-square w-full max-w-[530px]">
                  <svg className="absolute inset-[15%] h-[70%] w-[70%]" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="50" r="43" fill="rgba(8,7,6,.34)" stroke="rgba(255,255,255,.24)" strokeWidth="0.7" />
                    <circle
                      className="process-trace"
                      cx="50"
                      cy="50"
                      r="43"
                      fill="none"
                      stroke="#D4A853"
                      strokeDasharray="4 10"
                      strokeLinecap="round"
                      strokeWidth="1.1"
                    />
                    <path d="M50 3l2.5 4.5h-5L50 3ZM97 50l-4.5 2.5v-5L97 50ZM50 97l-2.5-4.5h5L50 97ZM3 50l4.5-2.5v5L3 50Z" fill="#D4A853" />
                  </svg>

                  <div className="absolute left-1/2 top-1/2 flex h-[116px] w-[116px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-secondary/70 bg-[#171411]/90 px-3 text-center shadow-[0_0_55px_rgba(194,114,42,.22)] backdrop-blur sm:h-[154px] sm:w-[154px]">
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/38">Aktives Werkstück</span>
                    <strong className="mt-2 font-[family-name:var(--font-heading)] text-base leading-tight text-white sm:text-xl">{workpiece.center}</strong>
                    <span className="mt-2 hidden font-mono text-[8px] uppercase tracking-[0.13em] text-secondary sm:block">{stage.signal}</span>
                  </div>

                  {STAGES.map((item, index) => {
                    const positions = [
                      "left-1/2 top-[1%] -translate-x-1/2",
                      "right-[1%] top-1/2 -translate-y-1/2",
                      "bottom-[1%] left-1/2 -translate-x-1/2",
                      "left-[1%] top-1/2 -translate-y-1/2",
                    ];
                    return (
                      <button
                        key={item.number}
                        type="button"
                        aria-current={activeStage === index ? "step" : undefined}
                        onClick={() => setActiveStage(index)}
                        className={`absolute ${positions[index]} flex w-[108px] cursor-pointer flex-col items-center border px-3 py-3 text-center backdrop-blur transition-colors focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:w-[142px] sm:px-4 sm:py-4 ${
                          activeStage === index
                            ? "border-secondary bg-secondary text-[#171411] shadow-[7px_7px_0_rgba(194,114,42,.48)]"
                            : "border-white/24 bg-[#171411]/82 text-white hover:border-white/55"
                        }`}
                      >
                        <span className="font-mono text-[8px] font-bold tracking-[0.16em] opacity-60 sm:text-[9px]">{item.number}</span>
                        <span className="mt-1 text-[11px] font-bold sm:text-sm">{item.short}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              </div>

              <figcaption className="border-t border-white/14 bg-black/78 px-5 py-4 text-[12px] leading-relaxed text-white/52 sm:px-6">
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-secondary">Ausgangslage · </span>
                {workpiece.caption}
              </figcaption>
            </figure>
          </div>

          <article key={`${workpiece.key}-${stage.number}`} className="flex flex-col border border-white/22 bg-[#F7F2EA] text-dark shadow-[12px_12px_0_rgba(194,114,42,.36)]">
            <header className="flex items-center justify-between border-b-2 border-dark bg-white px-5 py-4 sm:px-7">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.19em] text-primary">Prüfstelle {stage.number}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dark/35">{stage.short}</span>
            </header>

            <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary">Prüffrage</p>
              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold leading-[1.08] sm:text-3xl">{detail.title}</h3>
              <p className="mt-5 text-[14px] leading-relaxed text-muted">{detail.action}</p>

              <dl className="mt-7 border-y-2 border-dark">
                <div className="grid gap-2 border-b border-dark/18 py-5 sm:grid-cols-[112px_1fr] sm:gap-5">
                  <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-primary">Sichtbarer Output</dt>
                  <dd className="text-[13px] font-semibold leading-relaxed text-dark/78">{detail.output}</dd>
                </div>
                <div className="grid gap-2 py-5 sm:grid-cols-[112px_1fr] sm:gap-5">
                  <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-primary">Abnahme statt Status</dt>
                  <dd className="text-[13px] leading-relaxed text-dark/65">{detail.acceptance}</dd>
                </div>
              </dl>

              <div className="mt-auto pt-7">
                <Link
                  href={detail.href}
                  className="group inline-flex w-full items-center justify-between rounded-full bg-dark px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {detail.link}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-14 border-t border-white/22">
          <div className="grid gap-4 border-b border-white/16 py-6 lg:grid-cols-[.6fr_1.4fr] lg:items-end">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Damit der erste Zyklus arbeitsfähig ist</p>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">Drei Dinge brauchen wir vor der ersten Priorität.</h3>
          </div>
          <dl>
            {START_REQUIREMENTS.map(([term, description], index) => (
              <div key={term} className="grid gap-2 border-b border-white/14 py-5 sm:grid-cols-[56px_180px_1fr] sm:items-baseline sm:gap-5">
                <span className="font-mono text-[9px] font-bold tracking-[0.16em] text-secondary">0{index + 1}</span>
                <dt className="font-[family-name:var(--font-heading)] text-lg font-bold">{term}</dt>
                <dd className="max-w-2xl text-[13px] leading-relaxed text-white/48">{description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-[13px] leading-relaxed text-white/45">
            Ein Zyklus kann wenige Tage oder mehrere Wochen umfassen. Entscheidend ist nicht die Dauer, sondern dass Befund, Entscheidung, Release und Lernspur zusammengehören.
          </p>
          <Link href="/kontakt" className="shrink-0 text-sm font-bold text-secondary transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
            Eigenes Werkstück mitbringen →
          </Link>
        </div>
      </div>
    </section>
  );
}
