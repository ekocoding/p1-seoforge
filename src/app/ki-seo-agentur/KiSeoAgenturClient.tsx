"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "../components/SubpageLayout";
import { FAQ_ITEMS } from "./data";

/* ── Scroll-Reveal (wie auf den Webdesign-Seiten) ─────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".scroll-hidden, .m3d").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const PLATFORMS = [
  "ChatGPT",
  "Perplexity",
  "Google AI Overviews",
  "Gemini",
  "Microsoft Copilot",
  "Claude",
];

const LEISTUNGEN = [
  {
    n: "01",
    title: "Marken- und Entitätsaufbau",
    copy: "Damit KI-Systeme Ihre Marke kennen und korrekt einordnen, muss sie im Web eindeutig definiert sein — über konsistente Daten, Schema.org-Markup, Wikidata-Präsenz und autoritative Erwähnungen im richtigen Kontext. Wir legen dieses Fundament systematisch und prüfbar.",
    img: "/images/ki-seo-entity.webp",
    alt: "Wissensgraph: eine Marken-Entität verbunden mit verwandten Konzepten",
  },
  {
    n: "02",
    title: "Zitierfähiger Content-Aufbau",
    copy: "KI-Antworten zitieren Quellen, die präzise, faktenbasierte Antworten in klarer Struktur liefern. Wir entwickeln Inhalte — FAQs, Definitionen, strukturierte Guides —, die so aufgebaut sind, dass ChatGPT, Perplexity und Google AI Overviews sie als verlässliche Quelle übernehmen.",
    img: "/images/ki-seo-content.webp",
    alt: "Dokument mit hervorgehobenen Abschnitten und Zitations-Indikator",
  },
  {
    n: "03",
    title: "Digitale PR und Autoritätsaufbau",
    copy: "KI-Modelle bauen ihre Wissensbasis aus Quellen auf, denen sie vertrauen. Erwähnungen in relevanten Medien, Branchenportalen und Authority-Sites sind direktes Signal dafür, wie Ihre Marke eingestuft wird. Wir platzieren Ihre Marke dort gezielt — keine Massenkampagnen, sondern strategische Relevanz.",
    img: "/images/ki-seo-pr.webp",
    alt: "Vernetztes Medienökosystem rund um eine zentrale Markenposition",
  },
  {
    n: "04",
    title: "KI-Sichtbarkeits-Monitoring",
    copy: "Was nicht gemessen wird, kann nicht optimiert werden. Wir tracken systematisch, bei welchen Anfragen Ihre Marke in KI-Antworten erscheint, wie oft und in welchem Kontext — und passen die Strategie fortlaufend an. Sie bekommen ein reales Bild, kein geschöntes.",
    img: "/images/ki-seo-monitoring.webp",
    alt: "Dashboard mit Share-of-Voice-Balken und Trendlinien",
  },
];

const USPS = [
  {
    title: "Technisch umgesetzt, nicht nur beraten",
    desc: "Wir bauen Ihre KI-Sichtbarkeit selbst auf — custom-coded, kein Baukasten, direkt in Ihrer bestehenden Infrastruktur verankert.",
    icon: (
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    ),
  },
  {
    title: "KI-Kompetenz aus eigener Entwicklungsarbeit",
    desc: "Wir setzen KI täglich in eigenen Prozessen ein und verstehen aus erster Hand, wie diese Systeme Inhalte bewerten und welche Signale zählen.",
    icon: <path d="M12 2a7 7 0 0 0-4 12.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3A7 7 0 0 0 12 2zM9 22h6" />,
  },
  {
    title: "Messbare Ergebnisse, keine leeren Versprechen",
    desc: "Unsere Reports zeigen reale Entwicklungen: Mentions, Zitierhäufigkeit, Share of Voice in KI-Antworten — keine aufgeblähten Vanity-Metriken.",
    icon: <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />,
  },
  {
    title: "Direkte Kommunikation, schnelle Reaktion",
    desc: "Kein Account-Manager-Relay. Sie sprechen direkt mit den Leuten, die Ihre KI-Sichtbarkeit aufbauen — Rückmeldungen ohne Warteschleife.",
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
];

const PROZESS = [
  {
    title: "KI-Sichtbarkeits-Analyse",
    desc: "Wir prüfen, wie Ihre Marke heute in ChatGPT, Perplexity und Google AI Overviews erscheint, welche Signale fehlen und wo Mitbewerber aktuell stehen.",
  },
  {
    title: "Strategie und Priorisierung",
    desc: "Auf Basis der Analyse legen wir fest, welche Maßnahmen den größten und nachhaltigsten Effekt auf Ihre Sichtbarkeit haben — in welcher Reihenfolge und warum.",
  },
  {
    title: "Technisches Fundament",
    desc: "Strukturierte Daten, Entitätskonsistenz und technische Sauberkeit werden systematisch aufgebaut — die Basis, auf der Content und PR erst richtig wirken.",
  },
  {
    title: "Content- und PR-Umsetzung",
    desc: "Wir entwickeln zitierfähige Inhalte und platzieren Ihre Marke in relevanten Quellen — koordiniert auf das Ziel, nicht beliebig gestreut.",
  },
  {
    title: "Monitoring und Iteration",
    desc: "KI-Systeme verändern sich. Wir beobachten die Entwicklung Ihrer KI-Sichtbarkeit fortlaufend und passen die Maßnahmen an, was tatsächlich wirkt.",
  },
];

/* Illustrative Share-of-Voice-Demo (Beispieldaten, kein realer Kundenwert) */
const SOV_PROMPTS = [
  {
    q: "Welche Agentur macht meine Marke in ChatGPT sichtbar?",
    brands: [
      { name: "Ihre Marke (mit SeoForge)", sov: 38, us: true },
      { name: "Wettbewerber A", sov: 23 },
      { name: "Wettbewerber B", sov: 17 },
      { name: "Wettbewerber C", sov: 12 },
      { name: "Sonstige", sov: 10 },
    ],
  },
  {
    q: "Wie werde ich in Perplexity als Quelle zitiert?",
    brands: [
      { name: "Ihre Marke (mit SeoForge)", sov: 31, us: true },
      { name: "Fachportal A", sov: 26 },
      { name: "Wettbewerber B", sov: 19 },
      { name: "Wettbewerber C", sov: 14 },
      { name: "Sonstige", sov: 10 },
    ],
  },
  {
    q: "Beste KI-SEO- / GEO-Beratung in Deutschland?",
    brands: [
      { name: "Ihre Marke (mit SeoForge)", sov: 34, us: true },
      { name: "Wettbewerber A", sov: 22 },
      { name: "Wettbewerber B", sov: 20 },
      { name: "Wettbewerber C", sov: 15 },
      { name: "Sonstige", sov: 9 },
    ],
  },
];

/* ── Interaktive App: KI-Share-of-Voice-Dashboard ─────────────────────────── */
function SovDashboard() {
  const [active, setActive] = useState(0);
  const data = SOV_PROMPTS[active];
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_60px_-28px_rgba(26,26,26,0.18)]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border bg-offwhite px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-secondary/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-muted">
          KI Share-of-Voice — Live-Demo
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[300px_1fr]">
        {/* Prompt-Auswahl */}
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-widest text-muted">
            Beispiel-Anfrage wählen
          </p>
          <div className="flex flex-col gap-2">
            {SOV_PROMPTS.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="rounded-xl border px-4 py-3 text-left text-[13.5px] leading-snug transition-all"
                  style={{
                    background: on ? "#fff" : "transparent",
                    borderColor: on ? "#d99a57" : "var(--color-border)",
                    boxShadow: on ? "0 16px 34px -24px rgba(194,114,42,0.45)" : "none",
                    color: on ? "var(--color-dark)" : "var(--color-muted)",
                    fontWeight: on ? 600 : 500,
                  }}
                >
                  <span className="mr-1 text-primary">›</span> {p.q}
                </button>
              );
            })}
          </div>
        </div>

        {/* Balken */}
        <div className="p-6 lg:p-8">
          <p className="mb-5 text-sm text-muted">
            Marken in der KI-Antwort auf diese Anfrage:
          </p>
          <div className="flex flex-col gap-4">
            {data.brands.map((b) => (
              <div key={b.name}>
                <div className="mb-1.5 flex items-center justify-between text-[13px]">
                  <span className={b.us ? "font-bold text-dark" : "text-muted"}>{b.name}</span>
                  <span className={b.us ? "font-bold text-primary" : "text-muted"}>{b.sov}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-offwhite">
                  <div
                    className="h-full rounded-full transition-[width] duration-700 ease-out"
                    style={{
                      width: `${b.sov}%`,
                      background: b.us
                        ? "linear-gradient(90deg,#C2722A,#D4A853)"
                        : "#dcd7d0",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs italic text-muted">
            Illustrative Darstellung eines KI-Share-of-Voice-Reports — keine realen Kundenzahlen.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── FAQ-Accordion (grid-template-rows-Animation) ─────────────────────────── */
function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-offwhite"
            >
              <span className="text-[15px] font-semibold text-dark">{item.q}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-400 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-[14.5px] leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Arrow = () => (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z"
      clipRule="evenodd"
    />
  </svg>
);

export default function KiSeoAgenturClient() {
  useScrollReveal();

  return (
    <SubpageLayout>
      <main className="bg-white">
        {/* ── A) HERO (Magazine-Split) ───────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]">
          <div className="relative flex flex-col justify-center bg-offwhite px-6 pb-16 pt-28 sm:px-10 lg:pb-24 lg:pl-20 lg:pr-16 lg:pt-32">
            <div
              className="absolute left-0 right-0 top-0 h-[3px]"
              style={{ background: "linear-gradient(90deg,#C2722A 0%,transparent 60%)" }}
            />
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              KI-SEO &amp; KI-Sichtbarkeit
            </span>
            <h1 className="max-w-2xl font-[family-name:var(--font-heading)] text-4xl leading-[1.08] tracking-tight text-dark sm:text-5xl lg:text-[3.4rem]">
              Die KI-SEO-Agentur für Marken, die in{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#C2722A,#D4A853)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                KI-Antworten zitiert
              </span>{" "}
              werden
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Wenn Nutzer ChatGPT, Perplexity oder Google AI Overviews befragen, soll Ihre
              Marke die Antwort sein — nicht die Ihrer Mitbewerber. Wir strukturieren Ihre
              digitale Präsenz so, dass KI-Systeme Sie als relevante, zitierfähige Quelle
              erkennen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
              >
                Kostenlose KI-Sichtbarkeits-Analyse
                <Arrow />
              </Link>
              <a
                href="#leistungen"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/40"
              >
                Leistungen ansehen
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[13px] text-muted">
              {["Messbarer Share of Voice", "Custom-coded Umsetzung", "Direkte Kommunikation"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="relative hidden min-h-[440px] overflow-hidden lg:block">
            <Image
              src="/images/ki-seo-hero.webp"
              alt="Marke wird in einer KI-Antwort als Quelle zitiert"
              fill
              priority
              sizes="45vw"
              className="object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(194,114,42,.08) 0%, transparent 35%, transparent 65%, rgba(26,26,26,.18) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 top-0 w-24"
              style={{ background: "linear-gradient(90deg,#F8F7F5,transparent)" }}
            />
          </div>
        </section>

        {/* ── B) Plattform-Streifen ──────────────────────────────────────── */}
        <section className="border-y border-border bg-white py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Sichtbarkeit, wo entschieden wird
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {PLATFORMS.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-border bg-offwhite px-4 py-1.5 text-sm font-medium text-dark/80"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── C) Value-Prop / Shift ──────────────────────────────────────── */}
        <section className="bg-offwhite py-24 lg:py-32">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-tight text-dark lg:text-[2.6rem]">
              Wer in KI-Antworten fehlt, existiert für einen wachsenden Teil der Nutzer nicht
            </h2>
            <div className="mt-8 space-y-5 text-left text-[17px] leading-relaxed text-muted">
              <p>
                Google, ChatGPT und Perplexity liefern heute direkte Antworten — keine
                Link-Liste, in der Ihre Position sichtbar wird. KI-Systeme destillieren Wissen
                aus Quellen, die als glaubwürdig, strukturiert und thematisch relevant
                eingestuft werden. Klassische Rankings allein reichen dafür nicht mehr aus.
              </p>
              <p>
                Die zugrundeliegende Logik hat sich verschoben. Was zählt: wie eindeutig Ihre
                Marke im semantischen Feld der KI definiert ist, wie zitierfähig Ihre Inhalte
                sind und wie konsistent Ihre Erwähnungen in autoritativen Quellen auftreten.
                Das ist eine andere Arbeit als Backlinks sammeln oder Texte auf Keywords
                optimieren.
              </p>
              <p>
                KI-SEO ist deshalb eine eigene Disziplin — fachlich auch{" "}
                <Link href="/geo-agentur" className="font-medium text-primary hover:underline">
                  Generative Engine Optimization (GEO)
                </Link>{" "}
                genannt. Entitätsaufbau, strukturierte Daten, zitierfähiger Content und digitale
                PR greifen ineinander. Wer das jetzt aufbaut, sichert sich einen Vorsprung, der
                sich mit der Zeit festigt.
              </p>
            </div>
          </div>
        </section>

        {/* ── D) Leistungen — alternierende Splitscreens ─────────────────── */}
        <section id="leistungen" className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16 max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Unsere Leistungen
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-tight text-dark lg:text-[2.6rem]">
                Vier Hebel, die KI-Sichtbarkeit aufbauen
              </h2>
            </div>

            <div className="flex flex-col gap-20 lg:gap-28">
              {LEISTUNGEN.map((l, i) => (
                <div
                  key={l.n}
                  className="scroll-hidden grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Bild */}
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="overflow-hidden rounded-3xl border border-border bg-offwhite">
                      <Image
                        src={l.img}
                        alt={l.alt}
                        width={1400}
                        height={1000}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                  {/* Text */}
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <span className="font-[family-name:var(--font-heading)] text-5xl text-primary/25">
                      {l.n}
                    </span>
                    <h3 className="mt-3 font-[family-name:var(--font-heading)] text-2xl leading-snug text-dark lg:text-[1.9rem]">
                      {l.title}
                    </h3>
                    <p className="mt-4 text-[16px] leading-relaxed text-muted">{l.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── E) Prozess ─────────────────────────────────────────────────── */}
        <section className="bg-offwhite py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-14 max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                So arbeiten wir
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-tight text-dark lg:text-[2.6rem]">
                Von der Analyse zur dauerhaften KI-Sichtbarkeit
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
              {PROZESS.map((s, i) => (
                <div key={i} className="scroll-hidden flex flex-col bg-white p-6">
                  <span className="font-mono text-sm font-bold text-primary">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-[15px] font-bold leading-snug text-dark">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── F) Messen + interaktive Share-of-Voice-App ─────────────────── */}
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div className="lg:sticky lg:top-28">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                  Messbar machen
                </p>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-tight text-dark lg:text-[2.4rem]">
                  Share of Voice in KI-Antworten — die Kennzahl, die zählt
                </h2>
                <p className="mt-6 text-[16px] leading-relaxed text-muted">
                  Wie oft erscheint Ihre Marke, wenn Nutzer in ChatGPT oder Perplexity nach
                  Lösungen suchen, die Sie anbieten? Diese Frage war vor einigen Jahren noch
                  nicht seriös zu beantworten. Heute ist sie es — und sie wird zur zentralen
                  Steuerungsgröße für Marken, die KI-Sichtbarkeit ernst nehmen.
                </p>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">
                  Wir nutzen systematisches Prompt-Testing, spezialisierte Monitoring-Tools und
                  strukturierte Auswertung für ein reales Bild Ihrer KI-Präsenz. Wie das
                  technisch funktioniert, lesen Sie im Ratgeber{" "}
                  <Link
                    href="/wissen/ratgeber/marken-sichtbarkeit-in-ki"
                    className="font-medium text-primary hover:underline"
                  >
                    Marken-Sichtbarkeit in KI
                  </Link>
                  .
                </p>
              </div>
              <div className="scroll-hidden">
                <SovDashboard />
              </div>
            </div>
          </div>
        </section>

        {/* ── G) USPs ────────────────────────────────────────────────────── */}
        <section className="bg-offwhite py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-14 max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Warum SeoForge
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-tight text-dark lg:text-[2.6rem]">
                Ehrliche Umsetzung statt Buzzword-Beratung
              </h2>
            </div>
            <div className="m3d grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {USPS.map((u) => (
                <div key={u.title} className="group relative bg-white p-8">
                  <div
                    className="absolute left-0 right-0 top-0 h-[2.5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "linear-gradient(90deg,#C2722A,#D4A853)" }}
                  />
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {u.icon}
                    </svg>
                  </div>
                  <h3 className="text-[16px] font-bold text-dark">{u.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── H) FAQ ─────────────────────────────────────────────────────── */}
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-12 text-center font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-tight text-dark lg:text-[2.6rem]">
              Häufige Fragen zu KI-SEO
            </h2>
            <FaqAccordion />
          </div>
        </section>

        {/* ── I) Dark CTA ────────────────────────────────────────────────── */}
        <section className="bg-white pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-dark px-8 py-16 text-center lg:px-14 lg:py-20">
              <div
                className="pointer-events-none absolute -right-20 -top-24 h-80 w-80"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(194,114,42,0.28) 0%, transparent 65%)",
                }}
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(212,168,83,0.18) 0%, transparent 65%)",
                }}
              />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-heading)] text-3xl leading-tight text-white lg:text-[2.7rem]">
                  Erfahren Sie, wo Ihre Marke in KI-Antworten heute steht
                </h2>
                <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/60">
                  Wir analysieren Ihre aktuelle KI-Sichtbarkeit und zeigen konkret, was es
                  braucht, damit ChatGPT, Perplexity und Google AI Overviews Ihre Marke nennen.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
                  >
                    Kostenlose KI-Sichtbarkeits-Analyse anfragen
                    <Arrow />
                  </Link>
                  <Link
                    href="/geo-agentur"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white"
                  >
                    GEO-Agentur entdecken
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
