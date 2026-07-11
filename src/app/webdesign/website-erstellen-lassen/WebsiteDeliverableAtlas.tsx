"use client";

import { type ReactNode, useState } from "react";

type Deliverable = {
  icon: ReactNode;
  title: string;
  meta: string;
  desc: string;
};

const CONTEXT = [
  {
    question: "Was soll jede Seite für das Geschäft leisten?",
    decision: "Wir ordnen Angebot, Zielgruppen und Suchintentionen, bevor Navigation oder Layout feststehen.",
    artifact: "Seitenplan mit Ziel, Suchintention und nächstem internen Link",
  },
  {
    question: "Wie wird aus Positionierung eine eigene Oberfläche?",
    decision: "Typografie, Rhythmus, Bildsprache und Interaktion folgen der Marke — nicht einem wiederverwendeten Template.",
    artifact: "Klickbarer Entwurf für Desktop und Mobile",
  },
  {
    question: "Welche Technik passt zum redaktionellen Alltag?",
    decision: "Next.js oder WordPress wird nach Funktionen, Pflegebedarf und Wachstum gewählt, nicht nach Agenturgewohnheit.",
    artifact: "Versionierter Code, Staging und reproduzierbarer Build",
  },
  {
    question: "Kann Google die Struktur genauso gut lesen wie ein Mensch?",
    decision: "Semantik, interne Pfade, Metadaten und strukturierte Daten werden Teil der Architektur statt späteres Plugin.",
    artifact: "Indexierbare Seitenstruktur und technischer SEO-Check",
  },
  {
    question: "Bleibt die Entscheidung auf kleinem Bildschirm klar?",
    decision: "Inhalte werden für Touch und kurze Aufmerksamkeit neu komponiert — nicht nur verkleinert.",
    artifact: "Geprüfte Breakpoints, Tastaturwege und stabile Layouts",
  },
  {
    question: "Was passiert zwischen Abnahme und laufendem Betrieb?",
    decision: "Launch, Monitoring, Zuständigkeiten und spätere Änderungen bekommen einen nachvollziehbaren Übergabepfad.",
    artifact: "Release-Check, Einweisung und vereinbarter Betreuungsweg",
  },
];

export default function WebsiteDeliverableAtlas({ items }: { items: Deliverable[] }) {
  const [active, setActive] = useState(0);
  const item = items[active];
  const context = CONTEXT[active];

  return (
    <section id="leistungen" className="scroll-mt-24 overflow-hidden bg-[#F4EFE8] py-24 lg:py-32">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-6 lg:px-8">
        <div className="scroll-hidden grid min-w-0 grid-cols-[minmax(0,1fr)] gap-7 border-b-2 border-dark pb-9 lg:grid-cols-[1fr_420px] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <span className="mb-4 block font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-dark">Der Bauplan</span>
            <h2 className="max-w-3xl break-words font-[family-name:var(--font-heading)] text-[32px] font-bold leading-[1.04] text-dark sm:text-4xl lg:text-[54px]">
              Was wir liefern, ist kein Sechserpaket.
              <span className="block text-primary-dark">Es ist ein zusammenhängendes System.</span>
            </h2>
          </div>
          <p className="max-w-xl text-muted leading-relaxed lg:pb-1">
            Eine Website funktioniert nur, wenn Strategie, Gestaltung, Code,
            Auffindbarkeit und Betrieb dieselbe Richtung haben. Öffne eine Ebene:
            Du siehst die Entscheidung dahinter und den prüfbaren Ausgang.
          </p>
        </div>

        <div className="mt-10 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-7 lg:grid-cols-[minmax(280px,.72fr)_minmax(0,1.28fr)] lg:gap-10">
          <div className="min-w-0 border-y border-dark/25" role="tablist" aria-label="Bestandteile der Website-Erstellung">
            {items.map((entry, index) => {
              const selected = active === index;
              return (
                <button
                  key={entry.title}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="deliverable-panel"
                  onClick={() => setActive(index)}
                  className={`group grid w-full grid-cols-[38px_1fr_auto] items-center gap-3 border-b border-dark/15 px-1 py-4 text-left transition-colors last:border-b-0 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark ${selected ? "text-dark" : "text-dark/45 hover:text-dark/75"}`}
                >
                  <span className={`font-mono text-[10px] font-bold ${selected ? "text-primary-dark" : "text-dark/25"}`}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-[family-name:var(--font-heading)] text-base font-bold sm:text-lg">{entry.title}</span>
                  <span className={`text-lg transition-transform motion-reduce:transform-none ${selected ? "translate-x-0 text-primary-dark" : "-translate-x-1 text-dark/20 group-hover:translate-x-0"}`} aria-hidden="true">→</span>
                </button>
              );
            })}
          </div>

          <div
            id="deliverable-panel"
            role="tabpanel"
            className="relative min-h-[560px] min-w-0 overflow-hidden rounded-[2rem] bg-dark p-6 text-white shadow-[0_38px_90px_-48px_rgba(26,26,26,.9)] sm:p-9 lg:p-12"
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <svg viewBox="0 0 700 560" className="h-full w-full opacity-35" preserveAspectRatio="xMidYMid slice">
                <path d="M-80 465 C110 390 154 128 365 127 C519 126 545 319 772 240" fill="none" stroke="#D4A853" strokeWidth="1" strokeDasharray="7 10" />
                <circle cx={105 + active * 78} cy={393 - active * 43} r="8" fill="#D4A853" />
                <circle cx={105 + active * 78} cy={393 - active * 43} r="22" fill="none" stroke="#D4A853" strokeWidth="1" opacity=".7" />
              </svg>
              <span className="absolute -bottom-14 -right-5 font-[family-name:var(--font-heading)] text-[220px] font-black leading-none text-white/[0.035]">{String(active + 1).padStart(2, "0")}</span>
            </div>

            <div key={item.title} className="relative flex min-h-[470px] flex-col motion-safe:animate-[fadeIn_.25s_ease-out]">
              <div className="flex items-start justify-between gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-secondary/45 text-secondary">{item.icon}</div>
                <span className="max-w-[180px] text-right font-mono text-[9px] uppercase tracking-[0.17em] text-white/35">{item.meta}</span>
              </div>

              <div className="mt-auto pt-16">
                <div className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">Ebene {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</div>
                <h3 className="max-w-2xl break-words font-[family-name:var(--font-heading)] text-[32px] font-bold leading-[1.06] sm:text-4xl lg:text-5xl">{item.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/58">{item.desc}</p>

                <div className="mt-8 grid gap-5 border-t border-white/15 pt-6 sm:grid-cols-2">
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">Leitfrage</span>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-white/88">{context.question}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/48">{context.decision}</p>
                  </div>
                  <div className="sm:border-l sm:border-white/15 sm:pl-5">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-secondary">Prüfbarer Ausgang</span>
                    <p className="mt-2 text-sm leading-relaxed text-white/76">{context.artifact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
