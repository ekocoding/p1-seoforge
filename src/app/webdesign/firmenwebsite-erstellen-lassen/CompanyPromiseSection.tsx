"use client";

import { useState } from "react";

const LAYERS = [
  {
    key: "seogeo",
    label: "Auffindbarkeit",
    short: "SEO + KI-Suche",
    title: "Leistungen werden als eigene Antworten auffindbar.",
    desc: "Technik allein erzeugt keine Sichtbarkeit. Deshalb verbinden wir semantischen Code mit einer Seitenstruktur, die Leistungen, Regionen und relevante Fragen sauber trennt. Strukturierte Daten helfen Such- und Antwortsystemen beim Einordnen; klare Inhalte helfen Menschen bei der Entscheidung.",
    output: "Seitenplan, semantische Templates und nachvollziehbare interne Pfade",
    visual: ["Suchbedarf", "eindeutige URL", "zitierfähige Antwort"],
  },
  {
    key: "betrieb",
    label: "Betrieb",
    short: "Release + Pflege",
    title: "Änderungen bleiben kontrollierbar und nachvollziehbar.",
    desc: "Eine Firmenwebsite endet nicht beim Go-live. Versionierter Code, Staging und ein definierter Veröffentlichungsweg machen spätere Anpassungen prüfbar. Das reduziert Abhängigkeit von manuellen Einzelaktionen und schafft einen sauberen Übergang in den laufenden Betrieb.",
    output: "Staging, Versionierung, Release-Prüfung und klarer Übergabepfad",
    visual: ["Änderung", "Prüfung", "Freigabe"],
  },
  {
    key: "effizienz",
    label: "Effizienz",
    short: "KI + Handwerk",
    title: "Routine wird beschleunigt, Verantwortung nicht ausgelagert.",
    desc: "KI kann Varianten, Dokumentation und wiederholbare Entwicklungsarbeit unterstützen. Positionierung, Art Direction, Informationsarchitektur und Qualitätsfreigabe bleiben jedoch bewusste Teamentscheidungen. So wirkt Effizienz auf den Aufwand, nicht auf die Eigenständigkeit der Website.",
    output: "Kuratiertes Designsystem, dokumentierte Entscheidungen und geprüfte Umsetzung",
    visual: ["Routine", "menschliche Auswahl", "Qualitätsfreigabe"],
  },
];

export default function CompanyPromiseSection() {
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];

  return (
    <section className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="scroll-hidden grid gap-6 lg:grid-cols-[1fr_410px] lg:items-end lg:gap-16">
          <div>
            <span className="mb-4 block font-mono text-[10px] font-semibold uppercase tracking-[0.23em] text-primary-dark">Der Betriebsquerschnitt</span>
            <h2 className="max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-dark lg:text-[52px]">
              Eine Firmenwebsite muss nicht drei Dinge versprechen.
              <span className="block text-primary-dark">Sie muss drei Ebenen verbinden.</span>
            </h2>
          </div>
          <p className="text-muted leading-relaxed lg:pb-1">
            Wähle eine Ebene des Modells. Statt einer Schlagwortliste siehst du,
            welche Entscheidung dahinterliegt und was davon im Projekt tatsächlich
            prüfbar wird.
          </p>
        </div>

        <div className="scroll-hidden mt-12 grid overflow-hidden rounded-[2rem] border border-dark/15 bg-dark shadow-[0_40px_95px_-52px_rgba(26,26,26,.95)] lg:grid-cols-[.78fr_1.22fr]">
          <div className="relative min-h-[470px] overflow-hidden border-b border-white/12 p-7 text-white lg:min-h-[610px] lg:border-b-0 lg:border-r lg:p-10">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <svg viewBox="0 0 480 610" className="h-full w-full opacity-55" preserveAspectRatio="xMidYMid meet">
                <circle cx="235" cy="302" r="116" fill="none" stroke="#D4A853" strokeWidth="1" strokeDasharray="8 10" />
                <circle cx="235" cy="302" r="61" fill="rgba(212,168,83,.08)" stroke="#D4A853" strokeWidth="1.2" />
                <path d="M235 186 L235 92 M134 360 L58 405 M336 360 L416 405" fill="none" stroke="#D4A853" strokeWidth="1" />
                <circle cx="235" cy="92" r="5" fill="#D4A853" />
                <circle cx="58" cy="405" r="5" fill="#D4A853" />
                <circle cx="416" cy="405" r="5" fill="#D4A853" />
              </svg>
            </div>

            <div className="relative flex h-full min-h-[410px] flex-col lg:min-h-[530px]">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Funktionsmodell · keine Messwerte</span>
              <div className="my-auto flex justify-center py-12">
                <div className="flex h-36 w-36 items-center justify-center rounded-full border border-secondary/50 bg-secondary/[0.08] text-center font-[family-name:var(--font-heading)] text-xl font-bold leading-tight text-white shadow-[0_0_70px_rgba(212,168,83,.12)]">
                  Firmen-<br />website
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Arbeitsebenen der Firmenwebsite">
                {LAYERS.map((item, index) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active === index}
                    aria-controls="company-layer-panel"
                    key={item.key}
                    onClick={() => setActive(index)}
                    className={`rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${active === index ? "border-secondary bg-secondary text-dark" : "border-white/15 text-white/55 hover:border-white/35 hover:text-white"}`}
                  >
                    <span className="block font-mono text-[8px] uppercase tracking-[0.15em] opacity-65">{item.label}</span>
                    <span className="mt-1 block text-[11px] font-bold">{item.short}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div id="company-layer-panel" role="tabpanel" className="flex min-h-[540px] flex-col bg-[#F4EFE8] p-7 sm:p-10 lg:min-h-[610px] lg:p-12">
            <div key={layer.key} className="flex h-full flex-1 flex-col motion-safe:animate-[fadeIn_.25s_ease-out]">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-dark">Aktive Ebene · {layer.label}</span>
              <h3 className="mt-5 max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] text-dark lg:text-[42px]">{layer.title}</h3>
              <p className="mt-5 max-w-2xl text-base leading-[1.8] text-muted">{layer.desc}</p>

              <div className="my-9 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2" aria-label={`Ablauf: ${layer.visual.join(", ")}`}>
                {layer.visual.map((node, index) => (
                  <span key={node} className="contents">
                    <span className={`min-h-16 rounded-lg border px-2 py-3 text-center text-[10px] font-semibold leading-snug sm:text-[11px] ${index === layer.visual.length - 1 ? "border-primary-dark bg-primary-dark text-white" : "border-dark/20 bg-white text-dark/65"}`}>{node}</span>
                    {index < layer.visual.length - 1 && <span className="text-primary-dark" aria-hidden="true">→</span>}
                  </span>
                ))}
              </div>

              <div className="mt-auto border-t-2 border-dark pt-5">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-dark/40">Prüfbarer Ausgang</span>
                <p className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold leading-snug text-dark">{layer.output}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
