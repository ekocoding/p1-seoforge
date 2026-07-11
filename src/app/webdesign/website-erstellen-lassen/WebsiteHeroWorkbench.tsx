"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const GOALS = [
  {
    id: "sichtbarkeit",
    label: "Gefunden werden",
    question: "Welche Nachfrage soll die Website abholen?",
    answer: "Suchintention wird zur Seitenarchitektur — statt alle Leistungen auf einer einzigen Seite zu vermischen.",
    route: "/leistung",
    trail: ["Suchbedarf", "eigene Zielseite", "interner Pfad"],
  },
  {
    id: "anfragen",
    label: "Anfragen gewinnen",
    question: "Was braucht ein Besucher für die nächste Entscheidung?",
    answer: "Botschaft, Beleg und Einwandbehandlung führen zu einer klaren Handlung — ohne CTA-Dauerfeuer.",
    route: "/kontakt",
    trail: ["Problem", "Beleg", "nächster Schritt"],
  },
  {
    id: "vertrauen",
    label: "Vertrauen aufbauen",
    question: "Woran erkennt ein Kunde, dass das Angebot passt?",
    answer: "Konkrete Leistungen, Zuständigkeiten und Arbeitsweise ersetzen austauschbare Agenturversprechen.",
    route: "/unternehmen",
    trail: ["Positionierung", "Arbeitsweise", "Kontakt"],
  },
];

export default function WebsiteHeroWorkbench() {
  const [active, setActive] = useState(0);
  const goal = GOALS[active];

  return (
    <section
      data-hero
      className="relative overflow-hidden bg-dark pb-16 pt-32 text-white lg:min-h-[850px] lg:pb-20 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -left-48 top-8 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[150px]" />
        <div className="absolute bottom-[-260px] right-[-120px] h-[560px] w-[560px] rounded-full bg-secondary/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-16 lg:px-8">
        <div className="max-w-[720px]">
          <div className="mb-7 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-secondary">
            <span className="h-px w-9 bg-secondary" aria-hidden="true" />
            Website erstellen lassen · SeoForge
          </div>
          <h1
            className="font-[family-name:var(--font-heading)] font-bold leading-[0.98] tracking-[-0.035em]"
            style={{ fontSize: "clamp(43px, 5.4vw, 76px)" }}
          >
            Website erstellen lassen —
            <span className="mt-2 block text-secondary">als Weg zur Entscheidung.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-[1.8] text-white/65 lg:text-lg">
            Du willst eine Website erstellen lassen, die gefunden wird und verständlich
            verkauft? Wir übersetzen Geschäftsmodell, Suchnachfrage und Marke in eine
            eigenständige Seitenarchitektur — individuell gestaltet, sauber entwickelt
            und vom ersten Release an SEO-fähig.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-bold text-dark transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-secondary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary motion-reduce:transform-none"
            >
              Website-Projekt besprechen
              <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span>
            </Link>
            <a
              href="#leistungen"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Bauplan ansehen <span className="text-secondary" aria-hidden="true">↓</span>
            </a>
          </div>

          <p className="mt-7 max-w-xl text-sm leading-relaxed text-white/45">
            Für einen klar abgegrenzten Webauftritt im Mittelstand gibt es unsere eigene
            Vertiefung zur{" "}
            <Link
              href="/webdesign/firmenwebsite-erstellen-lassen"
              className="font-semibold text-white underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              Firmenwebsite für KMU
            </Link>
            .
          </p>
        </div>

        <div className="relative lg:pt-5">
          <div className="relative min-h-[540px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#26231f] shadow-[0_34px_90px_-34px_rgba(0,0,0,.85)] max-lg:min-h-[500px] max-sm:min-h-[560px]">
            <Image
              src="/images/hero-website-erstellen-workbench-v1.webp"
              alt="Webdesignerin prüft den Aufbau einer individuellen Unternehmenswebsite"
              fill
              priority
              className="object-cover object-[58%_center] opacity-80"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark/5 via-dark/10 to-dark/90" aria-hidden="true" />
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-dark/65 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              Werkbank · Seitenziel
            </div>

            <div className="absolute inset-x-4 bottom-4 overflow-hidden rounded-[1.4rem] border border-white/15 bg-dark/90 backdrop-blur-xl sm:inset-x-5 sm:bottom-5">
              <div className="flex overflow-x-auto border-b border-white/10 [scrollbar-width:none]" role="tablist" aria-label="Website-Ziel wählen">
                {GOALS.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active === index}
                    aria-controls="website-goal-panel"
                    onClick={() => setActive(index)}
                    className={`relative min-w-max flex-1 px-4 py-3 text-left text-[11px] font-semibold transition-colors focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-secondary ${
                      active === index ? "text-white" : "text-white/45 hover:text-white/75"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-4 bottom-0 h-0.5 bg-secondary transition-transform motion-reduce:transition-none ${active === index ? "scale-x-100" : "scale-x-0"}`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>

              <div id="website-goal-panel" role="tabpanel" className="p-5 sm:p-6">
                <div key={goal.id} className="motion-safe:animate-[fadeIn_.25s_ease-out]">
                  <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">Planprüfung</div>
                  <p className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold leading-tight text-white sm:text-2xl">
                    {goal.question}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/58">{goal.answer}</p>
                  <div className="mt-5 flex items-center gap-2 overflow-hidden font-mono text-[9px] uppercase tracking-[0.11em] text-white/50" aria-label={`Beispielpfad: ${goal.trail.join(", ")}`}>
                    {goal.trail.map((step, index) => (
                      <span key={step} className="contents">
                        <span className={index === goal.trail.length - 1 ? "text-secondary" : ""}>{step}</span>
                        {index < goal.trail.length - 1 && <span className="text-primary" aria-hidden="true">→</span>}
                      </span>
                    ))}
                    <span className="ml-auto hidden rounded-full border border-white/15 px-2 py-1 text-white/35 sm:inline">{goal.route}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-5 top-24 hidden h-28 w-12 items-center justify-center border-y border-r border-secondary/45 font-mono text-[9px] uppercase tracking-[0.2em] text-secondary [writing-mode:vertical-rl] xl:flex" aria-hidden="true">
            Ziel vor Oberfläche
          </div>
        </div>
      </div>
    </section>
  );
}
