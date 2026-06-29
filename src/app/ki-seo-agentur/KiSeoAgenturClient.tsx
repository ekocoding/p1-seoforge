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

const PROZESS = [
  {
    icon: "/images/prozess-icons/analyse.png",
    title: "KI-Sichtbarkeits-Analyse",
    desc: "Wir prüfen, wie Ihre Marke heute in ChatGPT, Perplexity und Google AI Overviews erscheint, welche Signale fehlen und wo Mitbewerber aktuell stehen.",
  },
  {
    icon: "/images/prozess-icons/strategie.png",
    title: "Strategie und Priorisierung",
    desc: "Auf Basis der Analyse legen wir fest, welche Maßnahmen den größten und nachhaltigsten Effekt auf Ihre Sichtbarkeit haben — in welcher Reihenfolge und warum.",
  },
  {
    icon: "/images/prozess-icons/fundament.png",
    title: "Technisches Fundament",
    desc: "Strukturierte Daten, Entitätskonsistenz und technische Sauberkeit werden systematisch aufgebaut — die Basis, auf der Content und PR erst richtig wirken.",
  },
  {
    icon: "/images/prozess-icons/umsetzung.png",
    title: "Content- und PR-Umsetzung",
    desc: "Wir entwickeln zitierfähige Inhalte und platzieren Ihre Marke in relevanten Quellen — koordiniert auf das Ziel, nicht beliebig gestreut.",
  },
  {
    icon: "/images/prozess-icons/monitoring.png",
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
/* ── Interaktive App #2: SEO vs. GEO vs. KI-SEO ───────────────────────────── */
const VS_DIMENSIONS = [
  {
    key: "Ziel",
    seo: "Position 1 in den klassischen Suchergebnissen.",
    geo: "Direkte Nennung in der Antwort eines KI-Systems.",
    kiseo: "Sichtbarkeit über alle Kanäle — klassische Suche und KI.",
  },
  {
    key: "Haupthebel",
    seo: "Backlinks, Keyword-Relevanz, technische Seitenstruktur.",
    geo: "Zitierbarkeit, Quellen-Reputation, Entitätsverknüpfungen.",
    kiseo: "Beides — plus Schema-Markup, Knowledge Graph und Crawlbarkeit für KI-Bots.",
  },
  {
    key: "Erfolgsmessung",
    seo: "Rankings, Klicks, Impressionen.",
    geo: "Nennungen und Share of Voice in KI-Antworten.",
    kiseo: "Klassische KPIs kombiniert mit messbarer KI-Sichtbarkeit.",
  },
  {
    key: "Zeithorizont",
    seo: "Wirkung meist nach 3–6 Monaten.",
    geo: "Erste Effekte oft schon nach 4–8 Wochen.",
    kiseo: "Kurzfristige Effekte und nachhaltiger Vorsprung zugleich.",
  },
];

function VsComparison() {
  const [dim, setDim] = useState(0);
  const d = VS_DIMENSIONS[dim];
  const cols = [
    { label: "Klassisches SEO", val: d.seo, hot: false },
    { label: "GEO", val: d.geo, hot: false },
    { label: "KI-SEO", val: d.kiseo, hot: true },
  ];
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {VS_DIMENSIONS.map((x, i) => {
          const on = i === dim;
          return (
            <button
              key={x.key}
              onClick={() => setDim(i)}
              className="rounded-full px-4 py-2 text-sm font-semibold transition-all"
              style={{
                background: on ? "var(--color-dark)" : "#fff",
                color: on ? "#fff" : "var(--color-muted)",
                border: on ? "1px solid var(--color-dark)" : "1px solid var(--color-border)",
              }}
            >
              {x.key}
            </button>
          );
        })}
      </div>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {cols.map((c) => (
          <div
            key={c.label}
            className="p-7"
            style={{ background: c.hot ? "#fbf4ea" : "#fff" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <h3 className={`text-lg font-bold ${c.hot ? "text-primary" : "text-dark"}`}>
                {c.label}
              </h3>
              {c.hot && (
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-white">
                  Unser Fokus
                </span>
              )}
            </div>
            <p key={dim} className="text-[14.5px] leading-relaxed text-muted" style={{ animation: "fadeUp 0.35s ease both" }}>
              {c.val}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
        {/* ── A) HERO (immersiv, zentriert) ──────────────────────────────── */}
        <section className="relative overflow-hidden bg-offwhite">
          {/* Atmosphärischer dekorativer Hintergrund */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
              className="absolute left-1/2 top-[-12%] h-[620px] w-[1100px] -translate-x-1/2 rounded-full"
              style={{ background: "radial-gradient(ellipse at center, rgba(212,168,83,0.20), transparent 62%)" }}
            />
            <div
              className="absolute right-[-8%] top-[28%] h-[440px] w-[440px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(194,114,42,0.12), transparent 66%)" }}
            />
            <div
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(26,26,26,0.05) 1px, transparent 0)",
                backgroundSize: "26px 26px",
                maskImage: "radial-gradient(ellipse 80% 60% at 50% 35%, #000 30%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 35%, #000 30%, transparent 75%)",
              }}
            />
            {/* Knowledge-Graph-Linienkunst */}
            <svg className="absolute inset-x-0 top-0 mx-auto h-[560px] w-full max-w-6xl opacity-[0.10]" viewBox="0 0 1200 560" fill="none" preserveAspectRatio="xMidYMid slice">
              <g stroke="#C2722A" strokeWidth="1.5">
                <line x1="180" y1="120" x2="430" y2="260" />
                <line x1="430" y1="260" x2="240" y2="430" />
                <line x1="430" y1="260" x2="680" y2="180" />
                <line x1="680" y1="180" x2="950" y2="300" />
                <line x1="680" y1="180" x2="820" y2="420" />
                <line x1="950" y1="300" x2="1040" y2="120" />
                <line x1="240" y1="430" x2="560" y2="470" />
                <line x1="820" y1="420" x2="560" y2="470" />
              </g>
              <g fill="#C2722A">
                <circle cx="180" cy="120" r="5" /><circle cx="240" cy="430" r="5" /><circle cx="950" cy="300" r="5" /><circle cx="1040" cy="120" r="5" /><circle cx="560" cy="470" r="5" /><circle cx="820" cy="420" r="5" />
              </g>
              <g fill="#D4A853">
                <circle cx="430" cy="260" r="9" /><circle cx="680" cy="180" r="7" />
              </g>
            </svg>
          </div>

          <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-28 text-center sm:pt-32 lg:pt-40">
            <div className="mb-6 inline-flex items-center gap-2.5">
              <span className="h-px w-7 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                KI-SEO-Agentur · KI-Sichtbarkeit
              </span>
              <span className="h-px w-7 bg-primary" />
            </div>
            <h1 className="mx-auto max-w-4xl font-[family-name:var(--font-heading)] text-[2.7rem] leading-[1.05] tracking-tight text-dark sm:text-6xl lg:text-[4.4rem]">
              Werden Sie die{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#C2722A,#D4A853)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Antwort
              </span>
              , wenn die KI gefragt wird.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Als spezialisierte KI-SEO-Agentur machen wir Ihre Marke in ChatGPT, Perplexity und
              Google AI Overviews sichtbar und zitierfähig — messbar, technisch sauber, ohne leere
              Versprechen.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

            {/* Fokus-Element: KI-Antwort, in der die Marke zitiert wird */}
            <div className="relative mx-auto mt-16 max-w-2xl">
              <div
                className="pointer-events-none absolute -inset-6 rounded-[2rem]"
                style={{ background: "radial-gradient(ellipse at center, rgba(212,168,83,0.22), transparent 70%)" }}
              />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-white text-left shadow-[0_36px_90px_-44px_rgba(26,26,26,0.32)]">
                <div className="flex items-center gap-2 border-b border-border bg-offwhite px-5 py-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">KI</span>
                  <span className="text-xs font-semibold text-dark/70">KI-Antwort</span>
                  <span className="ml-auto flex items-center gap-1.5 text-[11px] text-muted">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> live
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="mb-3 inline-block rounded-2xl rounded-bl-sm bg-offwhite px-4 py-2 text-[13.5px] text-dark/70">
                    „Welche Agentur macht meine Marke in ChatGPT sichtbar?"
                  </p>
                  <p className="text-[14.5px] leading-relaxed text-dark/80">
                    Für nachhaltige KI-Sichtbarkeit empfiehlt sich eine spezialisierte KI-SEO-Agentur.
                    Besonders häufig genannt wird{" "}
                    <mark className="rounded bg-secondary/30 px-1 font-semibold text-dark">Ihre Marke</mark>{" "}
                    — durch starke Entitätssignale und zitierfähige Inhalte.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-semibold text-dark">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Ihre Marke
                    </span>
                    <span className="rounded-full border border-border bg-offwhite px-3 py-1 text-xs text-muted">Wettbewerber A</span>
                    <span className="rounded-full border border-border bg-offwhite px-3 py-1 text-xs text-muted">Wettbewerber B</span>
                  </div>
                </div>
              </div>
            </div>
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

        {/* ── C) Was ist eine KI-SEO-Agentur? + Warum jetzt ──────────────── */}
        <section className="bg-offwhite py-24 lg:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="scroll-hidden">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                KI-SEO erklärt
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-tight text-dark lg:text-[2.6rem]">
                Was ist eine KI-SEO-Agentur?
              </h2>
              <div className="mt-6 rounded-2xl border-l-4 border-primary bg-white p-5 shadow-sm">
                <p className="text-[15px] leading-relaxed text-dark">
                  <span className="font-bold text-primary">Kurz gesagt:</span> Eine KI-SEO-Agentur
                  sorgt dafür, dass KI-Antwortmaschinen Ihre Marke kennen, korrekt einordnen und
                  als vertrauenswürdige Quelle zitieren — statt die Ihrer Mitbewerber.
                </p>
              </div>
              <div className="mt-5 space-y-5 text-[17px] leading-relaxed text-muted">
                <p>
                  Eine KI-SEO-Agentur optimiert die digitale Sichtbarkeit eines Unternehmens
                  nicht mehr nur für klassische Suchmaschinen, sondern gezielt für KI-gestützte
                  Antwortsysteme wie ChatGPT, Perplexity, Claude oder Googles AI Overviews. Das
                  klingt nach einer Erweiterung des klassischen SEO — ist aber in der Praxis eine
                  grundlegend andere Arbeit. Während bei Google Backlinks, Ladezeit und
                  Keyword-Dichte eine Rolle spielen, entscheidet bei KI-Systemen die semantische
                  Autorität: Wird eine Marke in vertrauenswürdigen Quellen konsistent als
                  kompetent und relevant erwähnt?
                </p>
                <p>
                  Eine KI-SEO-Agentur analysiert, wie KI-Sprachmodelle eine Marke aktuell
                  wahrnehmen, welche Wettbewerber in Antworten genannt werden und warum. Daraus
                  leitet sie gezielte Maßnahmen ab — strukturierte Entitätspflege in
                  Wissensbasen, thematische Content-Tiefe, digitale PR in zitierwürdigen Quellen
                  und technische Strukturierung der Website nach Schema-Markup. Das Ziel ist,
                  dass ChatGPT, Perplexity und Co. das Unternehmen als relevante Antwort liefern,
                  wenn potenzielle Kunden dort nach Lösungen suchen.
                </p>
                <p>
                  Was eine echte KI-SEO-Agentur vom SEO-Generalisten unterscheidet: Sie versteht,
                  wie Sprachmodelle Informationen gewichten, welche Signale außerhalb der eigenen
                  Website zählen und wie sich KI-Sichtbarkeit messen lässt — nicht durch
                  Bauchgefühl, sondern durch systematisches Prompt-Monitoring und
                  Share-of-Voice-Auswertungen.
                </p>
              </div>
            </div>

            <div className="scroll-hidden mt-16 border-t border-border pt-14">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-tight text-dark lg:text-[2.4rem]">
                Warum KI-Sichtbarkeit heute über Wachstum entscheidet
              </h2>
              <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-muted">
                <p>
                  Die Art, wie Menschen online nach Produkten, Dienstleistungen und Anbietern
                  suchen, hat sich in den letzten zwei Jahren schneller verändert als in den zehn
                  Jahren davor. KI-Chatbots werden für komplexe, beratungsintensive Anfragen zur
                  ersten Anlaufstelle — nicht weil Nutzer Google nicht mehr kennen, sondern weil
                  eine direkte, strukturierte Antwort effizienter ist als zehn blaue Links. Wer
                  in dieser Antwort nicht vorkommt, existiert für diesen Nutzer schlicht nicht.
                </p>
                <p>
                  Das Problem für viele Unternehmen ist die Zeitverzögerung. KI-Sichtbarkeit
                  entsteht nicht über Nacht. Sprachmodelle lernen aus Daten, die Monate oder
                  Jahre zurückliegen. Wer heute anfängt, die richtigen Signale zu setzen —
                  redaktionelle Erwähnungen, konsistente Entitätsdaten, thematische Autorität in
                  Fachpublikationen — sichert sich einen Platz in zukünftigen Modellupdates. Wer
                  wartet, bis der Wettbewerber dort sichtbar ist, hat einen Rückstand, der schwer
                  aufzuholen ist.
                </p>
                <p>
                  Hinzu kommt der Zero-Click-Effekt: Selbst wenn ein Nutzer nach dem KI-Ergebnis
                  noch auf eine Website klickt, filtert die vorangegangene KI-Antwort bereits,
                  welche Marken als Optionen in Betracht kommen. KI-Sichtbarkeit ist damit
                  Awareness-Arbeit — sie findet statt, bevor der Klick überhaupt passiert.
                </p>
              </div>
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

        {/* ── D2) KI-SEO vs. klassisches SEO vs. GEO ─────────────────────── */}
        <section className="border-t border-border bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Einordnung
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-tight text-dark lg:text-[2.6rem]">
                KI-SEO, klassisches SEO und GEO — was ist was?
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-muted">
                Die Begriffe überschneiden sich, bezeichnen aber unterschiedliche Disziplinen.
                Eine KI-SEO-Agentur denkt diese drei Ebenen zusammen — von klassischem SEO über{" "}
                <Link href="/geo-agentur" className="font-semibold text-primary hover:underline">
                  Generative Engine Optimization (GEO)
                </Link>{" "}
                bis zum technischen Unterbau für KI-Bots. Wählen Sie eine Dimension:
              </p>
            </div>
            <div className="scroll-hidden">
              <VsComparison />
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
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08]">
                    <Image src={s.icon} alt="" width={28} height={28} className="h-7 w-7" />
                  </div>
                  <h3 className="text-[15px] font-bold leading-snug text-dark">{s.title}</h3>
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

        {/* ── F2) Für wen sich eine KI-SEO-Agentur lohnt ─────────────────── */}
        <section className="border-t border-border bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mb-12 max-w-2xl scroll-hidden">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Zielgruppe
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-tight text-dark lg:text-[2.6rem]">
                Für wen sich eine KI-SEO-Agentur lohnt
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {[
                {
                  title: "Erklärungsbedürftige Angebote",
                  desc: "B2B-Software, Beratung, komplexe Produkte: Wer Vertrauen vor dem Erstkontakt aufbauen muss, profitiert direkt, wenn die KI ihn als kompetenten Anbieter nennt. Kunden fragen nach dem richtigen — nicht dem günstigsten — Anbieter.",
                  icon: <path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17a1 1 0 001 1h6a1 1 0 001-1v-2.3A7 7 0 0012 2z" />,
                },
                {
                  title: "Umkämpfte Nischen",
                  desc: "Tauchen Wettbewerber regelmäßig in KI-Antworten auf und Ihre Marke fehlt, verschiebt sich die wahrgenommene Marktführerschaft — unsichtbar in klassischen Rankings. Wir machen die Lücke messbar und schließen sie.",
                  icon: <path d="M3 3v18h18M7 14l3-3 3 3 5-6" />,
                },
                {
                  title: "Experten-Positionierung",
                  desc: "Regionale Anbieter, die überregional wachsen oder sich als Fachexperte positionieren wollen, sichern sich durch frühe KI-Sichtbarkeit einen Vorsprung, der schwer aufzuholen ist.",
                  icon: <path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z" />,
                },
              ].map((c) => (
                <div key={c.title} className="scroll-hidden bg-white p-7 lg:p-8">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {c.icon}
                    </svg>
                  </div>
                  <h3 className="text-[16px] font-bold leading-snug text-dark">{c.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── G) USPs ────────────────────────────────────────────────────── */}
        <section className="bg-offwhite py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Warum SeoForge
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl leading-tight tracking-tight text-dark lg:text-[2.6rem]">
                Ehrliche Umsetzung statt Buzzword-Beratung
              </h2>
              <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-muted">
                <p>
                  Das wichtigste Merkmal einer guten KI-SEO-Agentur ist Messbarkeit. Eine
                  seriöse Agentur kann zeigen, wie häufig eine Marke in relevanten KI-Antworten
                  auftaucht, welche Themengebiete abgedeckt werden und wie sich das im Vergleich
                  zum Wettbewerb entwickelt. Wer auf diese Frage ausweicht oder allgemeine
                  Rankings als Ersatzmetrik anbietet, hat das Handwerk entweder nicht verstanden
                  oder will es nicht transparent machen.
                </p>
                <p>
                  Ein weiteres Kriterium ist technische Eigenständigkeit: Strategie, technische
                  Umsetzung und redaktionelle Arbeit aus einem Verständnis heraus zu denken,
                  statt drei separate Gewerke zu koordinieren, die aneinander vorbei arbeiten.
                  Genau so arbeiten wir.
                </p>
              </div>
            </div>
            <div className="m3d grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
              {/* Typische Agentur */}
              <div className="bg-white p-8 lg:p-10">
                <p className="mb-6 text-sm font-bold uppercase tracking-widest text-muted">
                  Typische Agentur
                </p>
                <ul className="space-y-4">
                  {[
                    "Allgemeine Rankings als Ersatzmetrik",
                    "Baukasten + zugekaufte Standard-Tools",
                    "KI vor allem als Buzzword im Pitch",
                    "Kommunikation über Account-Manager-Ketten",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[15px] text-muted">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-muted/50" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.7 7.7a1 1 0 011.4 0L10 8.6l.9-.9a1 1 0 111.4 1.4l-.9.9.9.9a1 1 0 11-1.4 1.4l-.9-.9-.9.9a1 1 0 11-1.4-1.4l.9-.9-.9-.9a1 1 0 010-1.4z" clipRule="evenodd" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              {/* SeoForge */}
              <div className="relative bg-white p-8 lg:p-10" style={{ background: "#fbf4ea" }}>
                <div
                  className="absolute left-0 right-0 top-0 h-[3px]"
                  style={{ background: "linear-gradient(90deg,#C2722A,#D4A853)" }}
                />
                <p className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                  SeoForge
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold normal-case tracking-normal text-white">
                    so arbeiten wir
                  </span>
                </p>
                <ul className="space-y-4">
                  {[
                    "Share of Voice in KI-Antworten — real messbar",
                    "Custom-coded, direkt in Ihrer Infrastruktur",
                    "Tägliche eigene KI-Entwicklung & Praxis",
                    "Direkt mit den Umsetzern, schnelle Reaktion",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[15px] font-medium text-dark">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
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

        {/* ── I) CTA (Stil von der Homepage übernommen) ──────────────────── */}
        <section className="bg-dark py-24 lg:py-32" id="kontakt">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
              <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
            </div>

            <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
              {/* Text + Vorteile */}
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-4xl text-white lg:text-5xl">
                  Bereit für mehr{" "}
                  <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                    Sichtbarkeit in KI
                  </span>
                  ?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  Lassen Sie uns in einem kostenlosen Erstgespräch herausfinden, wie wir Ihre
                  Marke in ChatGPT, Perplexity und Google AI Overviews sichtbar machen. Keine
                  Verpflichtungen &mdash; nur ehrliche Einschätzungen.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Kostenlose KI-Sichtbarkeits-Analyse Ihrer Marke",
                    "Individueller KI-SEO- & GEO-Massnahmenplan",
                    "Transparente Preise ohne versteckte Kosten",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <svg className="h-3 w-3 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kontaktformular */}
              <div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl text-white">
                    Jetzt Kontakt aufnehmen
                  </h3>
                  <p className="mt-1 text-sm text-white/50">
                    Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                  <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        name="name"
                        aria-label="Ihr Name"
                        placeholder="Ihr Name"
                        className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                      />
                      <input
                        type="text"
                        name="company"
                        aria-label="Unternehmen"
                        placeholder="Unternehmen"
                        className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      aria-label="Ihre E-Mail-Adresse"
                      placeholder="Ihre E-Mail-Adresse"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                    />
                    <input
                      type="url"
                      name="website"
                      aria-label="Ihre Website-URL"
                      placeholder="Ihre Website-URL"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                    />
                    <textarea
                      name="message"
                      rows={4}
                      aria-label="Nachricht"
                      placeholder="Wie können wir Ihnen helfen?"
                      className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
                    >
                      Kostenlose Beratung anfordern
                    </button>
                    <p className="text-center text-xs text-white/30">
                      Ihre Daten werden vertraulich behandelt.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
