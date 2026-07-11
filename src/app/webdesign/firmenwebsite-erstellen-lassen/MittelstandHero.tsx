"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ROUTES = [
  {
    id: "sucht",
    label: "Kunde sucht",
    title: "Von der konkreten Frage zur passenden Leistung",
    copy: "Eine eigene Leistungsseite beantwortet Bedarf, Vorgehen und Einwände. Der Kontakt ist der logische nächste Schritt, nicht der einzige Inhalt.",
    nodes: ["Suchanfrage", "Leistungsseite", "Anfrage"],
  },
  {
    id: "prueft",
    label: "Kunde prüft",
    title: "Vom ersten Eindruck zur belastbaren Einschätzung",
    copy: "Positionierung, Arbeitsweise, Team und echte Belege geben Beschaffern genug Substanz, um den Betrieb intern weiterzuempfehlen.",
    nodes: ["Startseite", "Kompetenz", "Vertrauen"],
  },
  {
    id: "bewirbt",
    label: "Talent prüft",
    title: "Von der Arbeitgeberfrage zum passenden Einstieg",
    copy: "Eine Firmenwebsite kann auch Rollen, Kultur und Kontaktwege erklären. So landet Recruiting nicht zwischen Leistungs- und Kontakttexten.",
    nodes: ["Arbeitgeber", "Einblick", "Bewerbung"],
  },
];

export default function MittelstandHero() {
  const [active, setActive] = useState(0);
  const route = ROUTES[active];

  return (
    <section data-hero className="relative overflow-hidden bg-[#F1EBE3] pb-16 pt-28 lg:min-h-[860px] lg:pb-20 lg:pt-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-y-0 right-0 hidden w-[41%] bg-dark lg:block" />
        <div className="absolute left-[-180px] top-[18%] h-[430px] w-[430px] rounded-full border border-primary/15" />
        <div className="absolute left-[-105px] top-[27%] h-[280px] w-[280px] rounded-full border border-primary/15" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-14 lg:px-8">
        <div className="max-w-[720px] lg:pr-5">
          <div className="mb-7 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.23em] text-primary-dark">
            <span className="h-px w-9 bg-primary-dark" aria-hidden="true" />
            Firmenwebsite · KMU &amp; Mittelstand
          </div>
          <h1
            className="font-[family-name:var(--font-heading)] font-bold leading-[0.98] tracking-[-0.035em] text-dark"
            style={{ fontSize: "clamp(42px, 4.8vw, 68px)" }}
          >
            Firmenwebsite erstellen lassen —
            <span className="mt-2 block text-primary-dark">damit Ihr Betrieb erklärbar wird.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-[1.8] text-muted lg:text-lg">
            Eine gute Unternehmenswebsite verbindet drei Aufgaben: Sie macht Leistungen
            auffindbar, schafft Vertrauen für längere B2B-Entscheidungen und führt Menschen
            zur richtigen Kontaktperson. SeoForge plant diese Wege, gestaltet sie eigenständig
            und setzt sie als wartbare Website um — für KMU, die keinen Baukastenauftritt wollen.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#kontakt"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary-dark px-7 py-3.5 text-sm font-bold text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark motion-reduce:transform-none"
            >
              Firmenwebsite besprechen
              <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true">→</span>
            </a>
            <a
              href="#firmenwebsite-architektur"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-dark/25 px-7 py-3.5 text-sm font-semibold text-dark transition-colors hover:border-dark hover:bg-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark"
            >
              Seitenarchitektur prüfen <span className="text-primary-dark" aria-hidden="true">↓</span>
            </a>
          </div>

          <p className="mt-7 max-w-xl text-sm leading-relaxed text-dark/55">
            Für größere, funktionsreiche oder mehrsprachige Vorhaben führt der{" "}
            <Link
              href="/webdesign/website-erstellen-lassen"
              className="font-semibold text-dark underline decoration-primary-dark decoration-2 underline-offset-4 transition-colors hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark"
            >
              vollständige Leitfaden zur Website-Erstellung
            </Link>{" "}
            tiefer in Umfang, Technik und Kostenlogik.
          </p>
        </div>

        <div className="relative lg:pl-2">
          <div className="relative min-h-[590px] overflow-hidden rounded-[2rem] border border-white/15 bg-dark shadow-[0_38px_95px_-38px_rgba(0,0,0,.75)] max-sm:min-h-[610px]">
            <Image
              src="/images/firmenwebsite-arbeitsgespraech-v1.webp"
              alt="Zwei Personen besprechen die Struktur einer Unternehmenswebsite am Bildschirm"
              fill
              priority
              className="object-cover object-center opacity-80"
              sizes="(max-width: 1024px) 100vw, 590px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark/0 via-dark/10 to-dark/95" aria-hidden="true" />
            <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-dark/65 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-md">
              Kundenweg wählen
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/15 bg-dark/92 p-5 text-white backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-6">
              <div className="flex gap-1 border-b border-white/10 pb-4" role="tablist" aria-label="Besucherweg auf der Firmenwebsite">
                {ROUTES.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active === index}
                    aria-controls="mittelstand-route-panel"
                    onClick={() => setActive(index)}
                    className={`flex-1 rounded-full px-2 py-2 text-[10px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:text-[11px] ${active === index ? "bg-secondary text-dark" : "text-white/45 hover:bg-white/5 hover:text-white"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div id="mittelstand-route-panel" role="tabpanel" key={route.id} className="pt-5 motion-safe:animate-[fadeIn_.25s_ease-out]">
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold leading-tight text-white sm:text-2xl">{route.title}</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-white/56">{route.copy}</p>
                <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2" aria-label={`Weg: ${route.nodes.join(", ")}`}>
                  {route.nodes.map((node, index) => (
                    <span key={node} className="contents">
                      <span className={`rounded-md border px-2 py-2 text-center font-mono text-[8px] uppercase tracking-[0.08em] sm:text-[9px] ${index === route.nodes.length - 1 ? "border-secondary/50 text-secondary" : "border-white/15 text-white/55"}`}>{node}</span>
                      {index < route.nodes.length - 1 && <span className="text-primary" aria-hidden="true">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <span className="absolute -left-3 top-10 hidden border-y border-l border-secondary/50 px-2 py-7 font-mono text-[9px] uppercase tracking-[0.18em] text-secondary [writing-mode:vertical-rl] xl:block" aria-hidden="true">
            Digitale Firmenzentrale
          </span>
        </div>
      </div>
    </section>
  );
}
