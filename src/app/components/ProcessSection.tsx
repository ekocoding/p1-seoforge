"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PHASES = [
  {
    number: "01",
    short: "Diagnose",
    title: "Wir finden den Engpass, nicht nur Fehler.",
    copy: "Technik, Nachfrage, Wettbewerb und Autorität werden gemeinsam betrachtet. So entsteht keine 80-Punkte-Liste, sondern eine belastbare Reihenfolge.",
    signal: "Ausgangslage",
    output: ["Crawl & Indexierungsbild", "Keyword- und Wettbewerbs-Lücken", "Prioritäten nach Wirkung und Aufwand"],
    href: "/seo/audit",
    link: "SEO-Audit ansehen",
  },
  {
    number: "02",
    short: "Entscheidung",
    title: "Aus Daten wird eine klare Wette.",
    copy: "Wir entscheiden, welche Seiten zuerst Geld verdienen können, welche Themen warten und welche Maßnahme sich überhaupt nicht rechnet.",
    signal: "Richtung",
    output: ["Eine klare Zielseite je Suchintention", "90-Tage-Fokus statt Jahres-Wunschliste", "Messbare Zwischenziele"],
    href: "/seo/beratung",
    link: "SEO-Beratung ansehen",
  },
  {
    number: "03",
    short: "Umsetzung",
    title: "Die Empfehlung geht direkt ins System.",
    copy: "Technische Fixes, Seitenstruktur, Content und interne Links setzen wir in kurzen Arbeitsblöcken um. Ohne Übergabe-Marathon zwischen Agentur und Entwicklung.",
    signal: "Veränderung",
    output: ["Änderungen direkt im Projekt", "Review vor jedem Release", "Nachvollziehbare Vorher-/Nachher-Prüfung"],
    href: "/seo/optimierung",
    link: "SEO-Optimierung ansehen",
  },
  {
    number: "04",
    short: "Lernschleife",
    title: "Jeder Monat beginnt mit dem, was der letzte gezeigt hat.",
    copy: "Rankings sind ein Signal, nicht das Ziel. Wir verbinden Sichtbarkeit, Klicks, Anfragen und erledigte Maßnahmen zu einer nächsten sinnvollen Entscheidung.",
    signal: "Nächster Zug",
    output: ["Klarer Monatsbericht", "Erledigt / gelernt / als Nächstes", "SEO und KI-Sichtbarkeit im selben Blick"],
    href: "/seo/betreuung",
    link: "SEO-Betreuung ansehen",
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const phase = PHASES[active];

  return (
    <section className="relative overflow-hidden bg-dark py-20 text-white lg:py-28" id="prozess">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-end gap-8 border-b border-white/20 pb-9 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-secondary">
              Der SeoForge-Arbeitszyklus
            </p>
            <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.03] sm:text-5xl lg:text-[58px]">
              Keine Roadmap zum Abhaken.
              <span className="block text-secondary">Eine Lernschleife mit Output.</span>
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-white/58 lg:justify-self-end">
            Klicken Sie durch die vier Arbeitszustände. Jede Phase endet mit einem sichtbaren Artefakt – nicht mit einem Statusmeeting.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(360px,.82fr)] lg:gap-10">
          <div className="overflow-hidden rounded-[22px] border border-white/20 bg-black">
            <div className="grid grid-cols-2 border-b border-white/15 sm:grid-cols-4" role="tablist" aria-label="Arbeitsphasen">
              {PHASES.map((item, index) => (
                <button
                  key={item.number}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  onClick={() => setActive(index)}
                  className={`group flex cursor-pointer items-center gap-3 border-r border-white/15 px-4 py-4 text-left transition-colors last:border-r-0 sm:px-5 ${
                    active === index ? "bg-primary text-white" : "bg-white/[0.04] text-white/55 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-[0.15em] opacity-65">{item.number}</span>
                  <span className="text-sm font-semibold">{item.short}</span>
                </button>
              ))}
            </div>

            <figure className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/home-process-worktable-v2.webp"
                alt="SEO-Strategiearbeit mit Seitenarchitektur, Datenanalyse und priorisierten Maßnahmen"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 sm:p-7">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">Aktiver Zustand</span>
                  <p className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">{phase.short}</p>
                </div>
                <span className="hidden rounded-full border border-white/35 bg-black/35 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/70 backdrop-blur sm:block">
                  {phase.signal}
                </span>
              </figcaption>
            </figure>
          </div>

          <div key={phase.number} className="flex flex-col rounded-[22px] border border-white/20 bg-white p-6 text-dark shadow-[0_30px_90px_-35px_rgba(0,0,0,.7)] sm:p-8">
            <div className="flex items-center justify-between border-b-2 border-dark pb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Phase {phase.number}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dark/35">Output-Protokoll</span>
            </div>

            <h3 className="mt-7 font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08]">{phase.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{phase.copy}</p>

            <div className="mt-7 flex-1 border-y border-border py-2">
              {phase.output.map((item, index) => (
                <div key={item} className="flex items-center gap-4 border-b border-border py-3.5 last:border-b-0">
                  <span className="font-mono text-[10px] font-bold text-primary">0{index + 1}</span>
                  <span className="text-sm font-semibold text-dark/80">{item}</span>
                </div>
              ))}
            </div>

            <Link href={phase.href} className="group mt-7 inline-flex items-center justify-between rounded-full bg-dark px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary">
              {phase.link}
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            Diagnose → Entscheidung → Umsetzung → Lernschleife
          </p>
          <Link href="/kontakt" className="text-sm font-semibold text-secondary transition-colors hover:text-white">
            Ihre Ausgangslage gemeinsam prüfen →
          </Link>
        </div>
      </div>
    </section>
  );
}
