"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";

const SEARCH_INTENTS = [
  {
    key: "orientierung",
    label: "Orientierung",
    query: "Wie funktioniert SEO für B2B-Unternehmen?",
    google:
      "Suchergebnisse öffnen den Weg zu Originalquellen, Gegenpositionen und fachlicher Tiefe auf der Website.",
    ai:
      "KI-Antworten verdichten die erste Recherche und ordnen Begriffe, Anbieter und Quellen in einen direkten Antwortkontext ein.",
    requirement:
      "Eine eindeutige Kurzantwort und die belastbare Tiefe dahinter: sauber benannte Entitäten, nachvollziehbare Aussagen und sinnvoll verknüpfte Vertiefungen.",
    asset: "Ratgeber + fachliche Hubseite",
    href: "/seo/content-strategie",
    link: "Content-Strategie vertiefen",
  },
  {
    key: "vergleich",
    label: "Vergleich",
    query: "SEO Agentur oder Inhouse-Team?",
    google:
      "Leistungs-, Vergleichs- und Referenzseiten machen Unterschiede prüfbar und geben Raum für eine eigene Bewertung.",
    ai:
      "KI-Systeme fassen Kriterien und genannte Optionen zusammen. Dabei zählen klare Positionierung und konsistente Signale über mehrere Quellen hinweg.",
    requirement:
      "Ein ehrliches Entscheidungsdokument: Zuständigkeiten, Grenzen, Arbeitsweise und die Frage, wann welches Modell wirklich passt.",
    asset: "Vergleichsseite + Leistungsprofil",
    href: "/seo-agentur#inhouse-oder-agentur",
    link: "Agenturmodell vergleichen",
  },
  {
    key: "entscheidung",
    label: "Entscheidung",
    query: "SEO Agentur für nachhaltige B2B-Anfragen",
    google:
      "Transaktionale Ergebnisse führen direkt zu Leistungsumfang, Prozess, Ansprechpartnern und dem nächsten Schritt.",
    ai:
      "Chat-Assistenten können eine Shortlist vorbereiten. Die Entscheidung braucht trotzdem belegbare Details auf der Originalseite.",
    requirement:
      "Eine Money Page mit klarem Scope, konkreten Arbeitsartefakten, prüfbaren Belegen und einem passenden Kontaktweg — ohne Rankinggarantie.",
    asset: "Money Page + Proof-Artefakte",
    href: "/kontakt",
    link: "Ausgangslage besprechen",
  },
] as const;

export default function Seo2026Landscape() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const intent = SEARCH_INTENTS[active];

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const direction =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;

    if (!direction) return;
    event.preventDefault();
    const next = (index + direction + SEARCH_INTENTS.length) % SEARCH_INTENTS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="seo-2026" className="relative scroll-mt-24 overflow-hidden bg-[#151210] py-20 text-white lg:py-28">
      <style>{`
        @keyframes seo26Signal {
          to { stroke-dashoffset: -38; }
        }
        .seo26-signal {
          animation: seo26Signal 2.8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .seo26-signal { animation: none; }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-5 top-5 select-none font-mono text-[clamp(8rem,22vw,20rem)] font-black leading-none text-white/[0.035]"
        aria-hidden="true"
      >
        26
      </span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-end gap-7 border-b border-white/20 pb-9 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,.88fr)] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-secondary">
              Suchlandschaft 2026
            </p>
            <h2 className="mt-4 max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-[60px]">
              Eine Frage. Zwei Suchflächen.
              <span className="block text-secondary">Eine belastbare Quelle.</span>
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="text-[15px] leading-relaxed text-white/65">
              Klassische Suche und KI-Antworten ersetzen einander nicht. Sie übernehmen je nach Suchintention
              unterschiedliche Aufgaben — und treffen sich dort, wo Ihre Website eine Aussage nachvollziehbar belegt.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/42">
              Deshalb planen wir SEO und GEO auf derselben Seitenarchitektur, messen die beiden Kanäle aber mit
              unterschiedlichen Signalen.
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden border border-white/22 bg-black/25 shadow-[0_32px_100px_-45px_rgba(0,0,0,.9)]">
          <figure className="relative min-h-[285px] overflow-hidden border-b border-white/18 sm:min-h-[280px] lg:min-h-[300px]">
            <Image
              src="/images/seo-2026-signal-landscape-v1.webp"
              alt="Abstrakte Suchlandschaft aus verzweigten Signalen, Quellen, Prüfpunkten und einem gebündelten Informationskern"
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover object-center brightness-[0.58] saturate-[0.82]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,18,16,.96)_0%,rgba(21,18,16,.68)_42%,rgba(21,18,16,.18)_100%)]" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#151210] to-transparent" aria-hidden="true" />
            <figcaption className="absolute inset-x-0 bottom-0 max-w-2xl p-5 sm:p-7 lg:p-9">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Signal-Landschaft</span>
              <p className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold leading-snug text-white sm:text-2xl">
                Recherchewege verzweigen sich. Die belastbare Originalquelle bleibt der gemeinsame Kern.
              </p>
              <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-white/48">
                SeoForge-Illustration: Suchsignale, Prüfpunkte und Quellenkontexte als konzeptionelles Modell — keine Messdaten.
              </p>
            </figcaption>
          </figure>

          <div className="grid min-w-0 lg:grid-cols-[250px_minmax(0,1fr)]">
            <div className="min-w-0 border-b border-white/18 bg-white/[0.035] p-5 sm:p-6 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/38">
                Suchintention auswählen
              </p>
              <div className="mt-5 flex max-w-full gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Suchintention im Suchatlas">
                {SEARCH_INTENTS.map((entry, index) => (
                  <button
                    key={entry.key}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    type="button"
                    role="tab"
                    id={`seo26-tab-${entry.key}`}
                    aria-controls="seo26-panel"
                    aria-selected={active === index}
                    tabIndex={active === index ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={(event) => moveTab(event, index)}
                    className={`group flex min-w-[150px] cursor-pointer items-center justify-between gap-4 border px-4 py-3.5 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary lg:min-w-0 ${
                      active === index
                        ? "border-secondary bg-secondary text-[#17130f]"
                        : "border-white/16 bg-transparent text-white/58 hover:border-white/38 hover:text-white"
                    }`}
                  >
                    <span>{entry.label}</span>
                    <span className="font-mono text-[9px] opacity-60" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 border-t border-white/14 pt-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/32">Erfolgssignale bleiben getrennt</p>
                <p className="mt-2 text-xs leading-relaxed text-white/48">
                  SEO: Rankings, Klicks, Conversions.<br />
                  GEO: Nennungen, Quellen, Antwortkontext.
                </p>
              </div>
            </div>

            <div
              id="seo26-panel"
              role="tabpanel"
              aria-labelledby={`seo26-tab-${intent.key}`}
              className="min-w-0 p-5 sm:p-7 lg:p-9"
            >
              <div className="flex flex-col gap-3 border-b border-white/16 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.19em] text-secondary">Nutzerfrage</span>
                  <p className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold leading-snug text-white sm:text-2xl">
                    „{intent.query}“
                  </p>
                </div>
                <span className="w-fit border border-white/18 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/42">
                  Modellhafte Suchreise
                </span>
              </div>

              <div className="relative h-12" aria-hidden="true">
                <svg className="h-full w-full" viewBox="0 0 800 48" preserveAspectRatio="none">
                  <path d="M400 0v15M400 15H200v30M400 15h200v30" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
                  <path className="seo26-signal" d="M400 0v15M400 15H200v30M400 15h200v30" fill="none" stroke="#D4A853" strokeDasharray="7 12" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="grid border-y border-white/18 md:grid-cols-2 md:divide-x md:divide-white/18">
                <article className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center bg-white">
                        <Image src="/logos/google.svg" alt="" width={20} height={20} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-white/38">Suchfläche A</span>
                        <span className="mt-0.5 block text-sm font-bold text-white">Google-Suchergebnis</span>
                      </span>
                    </span>
                    <span className="h-px w-8 bg-primary" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-[13px] leading-relaxed text-white/58">{intent.google}</p>
                </article>

                <article className="border-t border-white/18 p-5 sm:p-6 md:border-t-0">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center bg-white">
                        <Image src="/logos/openai.svg" alt="" width={20} height={20} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-white/38">Suchfläche B</span>
                        <span className="mt-0.5 block text-sm font-bold text-white">Generierte Antwort</span>
                      </span>
                    </span>
                    <span className="h-px w-8 bg-secondary" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-[13px] leading-relaxed text-white/58">{intent.ai}</p>
                </article>
              </div>

              <div className="relative h-12" aria-hidden="true">
                <svg className="h-full w-full" viewBox="0 0 800 48" preserveAspectRatio="none">
                  <path d="M200 0v18h200M600 0v18H400v30" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
                  <path className="seo26-signal" d="M200 0v18h200M600 0v18H400v30" fill="none" stroke="#C2722A" strokeDasharray="7 12" strokeWidth="1.5" />
                </svg>
              </div>

              <article className="border-2 border-secondary bg-[#F5EEE4] p-5 text-[#1A1A1A] shadow-[9px_9px_0_rgba(194,114,42,.35)] sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary">Gemeinsamer Ursprung: eigene Substanz</p>
                    <h3 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold leading-tight sm:text-3xl">
                      {intent.asset}
                    </h3>
                    <p className="mt-4 text-[14px] leading-relaxed text-dark/65">{intent.requirement}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-dark font-mono text-xs font-black text-primary" aria-hidden="true">
                    SF
                  </span>
                </div>
                <Link
                  href={intent.href}
                  className="group mt-6 inline-flex items-center gap-2 border-b border-dark/25 pb-1 text-sm font-bold text-dark transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {intent.link}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </article>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-white/20 pt-7 md:grid-cols-2 md:gap-12">
          <div className="grid grid-cols-[34px_1fr] gap-4">
            <span className="font-mono text-[10px] font-bold text-secondary">01</span>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">Was gemeinsam geplant wird</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                Seitenarchitektur, Suchintention, fachliche Belege, Entitäten und interne Verlinkung bilden das Fundament für beide Suchflächen.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-[34px_1fr] gap-4">
            <span className="font-mono text-[10px] font-bold text-secondary">02</span>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">Was getrennt geprüft wird</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                Rankings und Klickpfade beantworten andere Fragen als Nennungen und Quellenkontexte. Ein gemeinsames Reporting darf diese Unterschiede nicht verwischen.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-7 max-w-3xl text-[12px] leading-relaxed text-white/35">
          Der Suchatlas zeigt eine konzeptionelle Suchreise, keine Messdaten oder garantierte Ausspielung. Wie Marken gezielt in KI-Antworten sichtbar werden, erklären wir in unserem{" "}
          <Link href="/wissen/ratgeber/marken-sichtbarkeit-in-ki" className="text-white/65 underline decoration-white/25 underline-offset-4 hover:text-secondary">
            Ratgeber zur Marken-Sichtbarkeit
          </Link>{" "}
          und auf der Seite unserer{" "}
          <Link href="/geo-agentur" className="text-white/65 underline decoration-white/25 underline-offset-4 hover:text-secondary">
            GEO Agentur
          </Link>.
        </p>
      </div>
    </section>
  );
}
