"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HeroShaderWhite from "@/app/components/HeroShaderWhite";
import LandingAnatomy from "./LandingAnatomy";

/* ─── Scroll reveal ───────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".scroll-hidden").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return y;
}

/* ─── Daten ───────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Was ist eine Landing Page und wozu brauche ich sie?",
    a: "Eine Landing Page ist eine einzelne, fokussierte Seite mit einem klaren Ziel — z. B. ein Formular ausfüllen, ein Produkt kaufen oder ein Gespräch buchen. Im Gegensatz zur Website mit vielen Ablenkungen führt eine Landing Page den Besucher direkt zur gewünschten Aktion. Das Ergebnis: deutlich höhere Conversion Rates.",
  },
  {
    q: "Was kostet eine professionelle Landing Page?",
    a: "Deutlich weniger als eine komplette Website — genau das ist der Punkt. Du kannst die Landing Page einmalig kaufen (sie gehört dann komplett dir) oder Management dazubuchen: laufende A/B-Tests, Heatmap-Analysen und Optimierung. Den Festpreis für dein Projekt klären wir im kostenlosen Erstgespräch.",
  },
  {
    q: "Wie schnell ist eine Landing Page fertig?",
    a: "Dank KI-gestützter Workflows und automatisiertem Deployment deutlich schneller als bei klassischen Agenturen — meist innerhalb weniger Wochen, bei dringenden Kampagnen-Launches auch als Express-Produktion. Den konkreten Zeitplan bekommst du mit dem Angebot.",
  },
  {
    q: "Kann ich die Landing Page mit Google Ads oder Meta Ads nutzen?",
    a: "Ja — genau das ist der Hauptanwendungsfall. Wir richten Google Analytics, Google Ads Conversion Tracking und Meta Pixel ein, sodass du von Anfang an messbare Daten bekommst. Die Landing Page wird für den spezifischen Traffic-Kanal optimiert.",
  },
  {
    q: "Was ist A/B-Testing und lohnt sich das?",
    a: "A/B-Testing bedeutet: Wir testen zwei Varianten einer Landing Page gegeneinander, um zu sehen, welche besser konvertiert — z. B. andere Headline, anderes CTA-Design, andere Bilder. Selbst kleine Änderungen können die Conversion Rate deutlich steigern. Im Management-Modell führen wir das kontinuierlich durch.",
  },
  {
    q: "Bietet ihr auch Landing Pages mit SEO-Optimierung an?",
    a: "Ja. Als SEO-Agentur entwickeln wir Landing Pages, die sowohl für bezahlten Traffic als auch für organische Suche optimiert sind — mit keyword-optimiertem Content, Schema-Markup und technischem SEO. So arbeitet deine Investition auf zwei Kanälen.",
  },
];

const USE_CASES = [
  {
    label: "Google Ads",
    title: "Kampagnen, die sich rechnen",
    desc: "Deine Anzeige verspricht etwas — die Landing Page löst es ein. Message Match zwischen Keyword, Anzeigentext und Seite senkt den Klickpreis (Quality Score) und hebt die Conversion Rate. Jede Kampagne bekommt ihre eigene, exakt passende Seite.",
    ziel: "Leads & Verkäufe aus Suchanzeigen",
    messung: "Conversion-Tracking pro Keyword",
  },
  {
    label: "Produkt-Launch",
    title: "Vorfreude in Pipeline verwandeln",
    desc: "Vor dem Launch Leads sammeln, am Launch-Tag verkaufen: Eine Teaser-Landing-Page baut eine Warteliste auf, die du am Tag X aktivierst. Countdown, Early-Bird-Angebot und E-Mail-Capture inklusive.",
    ziel: "Warteliste vor dem Launch",
    messung: "Anmeldungen & Öffnungsraten",
  },
  {
    label: "B2B Lead-Gen",
    title: "Qualifizierte Anfragen statt Streuverlust",
    desc: "Ein klares Leistungsversprechen, ein kurzes Formular, Social Proof an der richtigen Stelle. B2B-Entscheider haben keine Zeit — eine fokussierte Seite respektiert das und konvertiert deshalb.",
    ziel: "Anfragen für das Sales-Team",
    messung: "Lead-Qualität & Cost-per-Lead",
  },
  {
    label: "E-Commerce",
    title: "Aktionen, die abverkaufen",
    desc: "Saisonale Angebote, Flash Sales und Bundles performen auf dedizierten Seiten deutlich besser als im Shop-Raster: eine Botschaft, ein Angebot, ein Kauf-Button — ohne Kategorienavigation als Ausgang.",
    ziel: "Abverkauf einer Aktion",
    messung: "Umsatz pro Kampagne (ROAS)",
  },
  {
    label: "Newsletter & Events",
    title: "Anmeldungen maximieren",
    desc: "Webinar, Event oder Newsletter: Opt-in-Seiten mit einem einzigen Formular und klarem Nutzenversprechen schlagen eingebettete Formulare auf Unterseiten — messbar.",
    ziel: "Registrierungen & Opt-ins",
    messung: "Anmeldequote pro Kanal",
  },
  {
    label: "Recruiting",
    title: "Bewerber überzeugen, bevor sie abspringen",
    desc: "Top-Kandidaten vergleichen Arbeitgeber wie Produkte. Eine Recruiting-Landing-Page verkauft die Stelle: Team, Benefits, Prozess — und eine Bewerbung in zwei Minuten statt zwanzig.",
    ziel: "Bewerbungen auf eine Stelle",
    messung: "Bewerbungen & Absprungrate",
  },
];

const DIFFERENZIERUNG = [
  {
    nr: "01",
    title: "SEO + Ads im selben Code",
    desc: "Die meisten Landing Pages sind nach der Kampagne wertlos. Unsere sind technisch sauber, mit Schema-Markup und Keyword-Fokus gebaut — sie ranken organisch weiter, während die Ads laufen. Eine Investition, zwei Kanäle.",
  },
  {
    nr: "02",
    title: "Live über CI/CD — nicht über Ticketsysteme",
    desc: "Wir arbeiten wie ein DevOps-Team: automatisierte Pipelines deployen Änderungen in Minuten. Headline-Test am Morgen besprochen, mittags live. Dein Kampagnenstart verschiebt sich nicht wegen deiner Agentur.",
  },
  {
    nr: "03",
    title: "KI-Workflows machen sie günstiger",
    desc: "Der Sinn eines One-Pagers ist es, Kosten zu sparen. KI beschleunigt bei uns Konzept, Copy-Varianten und Entwicklung — diesen Effizienzgewinn geben wir im Preis weiter, ohne an Qualität zu sparen.",
  },
  {
    nr: "04",
    title: "Datengetrieben von der ersten Minute",
    desc: "Semrush und Ahrefs liefern Suchvolumen und Wettbewerb vor dem Konzept, GA4 und Heatmaps zeigen Nutzerverhalten nach dem Launch. Entscheidungen fallen nach Zahlen — nicht nach Geschmack.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function LandingPagesClient() {
  useScrollReveal();
  const scrollY = useScrollY();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [useCase, setUseCase] = useState(0);
  const [offerHover, setOfferHover] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const uc = USE_CASES[useCase];

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — weißer Shader, voll-flächig, KEIN dunkler Dimmer
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">
        <HeroShaderWhite />

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />

        {/* Ghost-Wasserzeichen mit Parallax */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.05, transform: `translateY(${scrollY * 0.16}px)` }}
        >
          <span
            className="font-[family-name:var(--font-heading)] font-black text-dark leading-none tracking-tight"
            style={{ fontSize: "clamp(110px, 20vw, 320px)" }}
          >
            CONVERT
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-8 pt-32 pb-28 text-center">

          <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/55 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Landing Pages · Conversion-Optimierung
          </div>

          {/* H1 — zwei Zeilen */}
          <h1
            className="hero-title font-[family-name:var(--font-heading)] font-bold text-dark leading-[1.08] mb-7"
            style={{ fontSize: "clamp(38px, 5.2vw, 72px)", letterSpacing: "-0.025em" }}
          >
            Landingpages, die konvertieren.
            <br />
            <span
              style={{
                background: "linear-gradient(95deg, #C2722A 12%, #D4A853 88%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Eine Seite. Ein Ziel. Kein Streuverlust.
            </span>
          </h1>

          <div className="hero-description mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-primary/40" />
            <span className="text-[10px] font-bold tracking-[0.26em] uppercase text-dark/30">
              Google Ads · Meta Ads · GA4 · A/B-Testing
            </span>
            <div className="h-px w-10 bg-primary/40" />
          </div>

          <p className="hero-description text-muted leading-[1.85] mb-11 max-w-3xl mx-auto" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            Eine Landingpage ist der günstigste Weg, online messbar zu verkaufen:
            eine einzige Seite, kompromisslos auf eine Handlung optimiert — statt
            einer teuren Website mit zwanzig Ausgängen. Ob klassische Landingpage
            oder kompletter <Link href="/wissen/ratgeber/one-pager-website" className="underline decoration-primary/40 underline-offset-2 hover:text-primary transition-colors">Onepager</Link>: Wir bauen sie custom coded — blitzschnell
            geladen, exakt auf deine Anzeigen abgestimmt, mit Tracking ab Tag eins.
            KI-Workflows und automatisiertes Deployment machen uns dabei schneller
            und fairer im Preis als klassische Agenturen — und weil wir SEO-Agentur
            sind, arbeitet deine Seite auch organisch weiter.
          </p>

          <div className="hero-cta flex flex-wrap justify-center gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
            >
              Kostenloses Erstgespräch
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href="#anatomie"
              className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-white/55 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-dark/65 transition-all hover:border-dark/30 hover:bg-white/80 hover:text-dark"
            >
              Was eine gute Landing Page ausmacht
              <span className="text-primary text-xs float-chevron">↓</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] text-dark/50 font-mono tracking-[0.28em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-dark/30 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ANATOMIE — interaktives annotiertes Mockup
      ══════════════════════════════════════════════════════════════════ */}
      <section id="anatomie" className="bg-white py-24 lg:py-32 scroll-mt-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-12 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Anatomie
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Was eine Landing Page zum Konvertieren bringt.
            </h2>
            <p className="text-lg text-muted">
              Sechs Prinzipien entscheiden über deine Conversion Rate — so sieht eine
              Seite aus, die jedes davon konsequent umsetzt.
            </p>
          </div>

          <div className="scroll-hidden">
            <LandingAnatomy />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          EINSATZBEREICHE — interaktiver Switcher statt Karten-Grid
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-14 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Einsatzbereiche
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Wann eine Landing Page der richtige Hebel ist.
            </h2>
          </div>

          <div className="scroll-hidden grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">
            {/* Selector */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {USE_CASES.map((c, i) => {
                const on = useCase === i;
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setUseCase(i)}
                    onMouseEnter={() => setUseCase(i)}
                    className="shrink-0 lg:shrink text-left rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer border"
                    style={{
                      background: on ? "#1A1A1A" : "#fff",
                      color: on ? "#fff" : "rgba(26,26,26,0.6)",
                      borderColor: on ? "#1A1A1A" : "var(--color-border)",
                      transform: on ? "translateX(4px)" : "none",
                    }}
                  >
                    <span className={`font-mono text-[10px] mr-2 ${on ? "text-secondary" : "text-primary/50"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* Detail-Panel */}
            <div className="rounded-3xl border border-border bg-white p-8 lg:p-10 min-h-[260px]" key={useCase}>
              <div className="reveal">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-4">
                  {uc.title}
                </h3>
                <p className="text-muted leading-relaxed mb-7 max-w-2xl">{uc.desc}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] border border-primary/20 px-4 py-2 text-xs font-semibold text-primary">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /></svg>
                    Ziel: {uc.ziel}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-dark/[0.04] border border-dark/10 px-4 py-2 text-xs font-semibold text-dark/60">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18M8 17V9m4 8V5m4 12v-6" strokeLinecap="round" /></svg>
                    Messung: {uc.messung}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WAS WIR ANDERS MACHEN — editorial, nummerierte Zeilen
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="scroll-hidden mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Was wir anders machen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4 max-w-xl leading-tight">
              Warum unsere Landing Pages mehr herausholen.
            </h2>
          </div>

          <div>
            {DIFFERENZIERUNG.map((d, i) => (
              <div key={d.nr} className="scroll-hidden" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="group relative border-t border-border py-8 lg:py-10 grid lg:grid-cols-[110px_1fr] gap-4 lg:gap-8 hover:bg-offwhite -mx-4 px-4 rounded-xl transition-colors duration-300">
                  <span
                    className="font-[family-name:var(--font-heading)] font-black leading-none text-transparent transition-all duration-300 group-hover:text-primary/15"
                    style={{ fontSize: "clamp(44px, 5vw, 64px)", WebkitTextStroke: "1.5px rgba(194,114,42,0.35)" }}
                    aria-hidden="true"
                  >
                    {d.nr}
                  </span>
                  <div>
                    <h3 className="font-bold text-dark text-xl mb-2.5 group-hover:text-primary transition-colors duration-300">
                      {d.title}
                    </h3>
                    <p className="text-muted leading-relaxed max-w-2xl">{d.desc}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ZWEI WEGE — Kaufen oder Kaufen + Management
      ══════════════════════════════════════════════════════════════════ */}
      <section id="angebot" className="py-24 lg:py-32 scroll-mt-20" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-14 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Landingpage oder Onepager erstellen lassen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Kaufen — oder kaufen und betreuen lassen.
            </h2>
            <p className="text-lg text-muted">
              Zwei klare Modelle, kein Kleingedrucktes. Was zu deinem Ziel passt,
              klären wir im Erstgespräch.
            </p>
          </div>

          <div className="scroll-hidden grid md:grid-cols-2 gap-5">

            {/* A — Kaufen */}
            <div
              onMouseEnter={() => setOfferHover(0)}
              onMouseLeave={() => setOfferHover(null)}
              className="relative rounded-3xl border bg-white p-9 lg:p-11 transition-all duration-400 flex flex-col"
              style={{
                borderColor: offerHover === 0 ? "rgba(194,114,42,0.4)" : "var(--color-border)",
                transform: offerHover === 0 ? "translateY(-6px)" : "none",
                boxShadow: offerHover === 0 ? "0 30px 60px -20px rgba(194,114,42,0.2)" : "0 2px 12px rgba(0,0,0,0.04)",
                opacity: offerHover === 1 ? 0.75 : 1,
              }}
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-dark/[0.05] border border-dark/10 px-3.5 py-1 text-[11px] font-bold tracking-wide uppercase text-dark/55 mb-6">
                Einmalig
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-3">
                Kaufen — und sie gehört dir.
              </h3>
              <p className="text-muted leading-relaxed mb-7">
                Wir konzipieren, texten, designen und entwickeln deine Landing Page —
                du bekommst sie komplett übergeben. Einmal bezahlt, keine Abhängigkeit,
                kein Abo. Perfekt, wenn du intern weiterarbeiten willst.
              </p>
              <ul className="space-y-3 mb-9 flex-1">
                {[
                  "Konzept & Conversion-Copywriting",
                  "Custom Design & Entwicklung — kein Baukasten",
                  "Tracking-Setup: GA4, Google Ads, Meta Pixel",
                  "Vollständige Übergabe inkl. Einweisung",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-dark">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/kontakt"
                className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-primary px-7 py-3.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                Landing Page anfragen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* B — Kaufen + Management */}
            <div
              onMouseEnter={() => setOfferHover(1)}
              onMouseLeave={() => setOfferHover(null)}
              className="relative rounded-3xl p-9 lg:p-11 transition-all duration-400 flex flex-col text-white overflow-hidden"
              style={{
                background: "#1A1A1A",
                transform: offerHover === 1 ? "translateY(-6px)" : "none",
                boxShadow: offerHover === 1 ? "0 30px 60px -18px rgba(26,26,26,0.5)" : "0 8px 30px rgba(26,26,26,0.18)",
                opacity: offerHover === 0 ? 0.92 : 1,
              }}
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/15 blur-[80px]" aria-hidden="true" />

              <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-primary/15 border border-primary/30 px-3.5 py-1 text-[11px] font-bold tracking-wide uppercase text-secondary mb-6">
                Kaufen + Management
              </span>
              <h3 className="relative font-[family-name:var(--font-heading)] text-2xl font-bold mb-3">
                Wir bleiben dran — sie wird immer besser.
              </h3>
              <p className="relative text-white/55 leading-relaxed mb-7">
                Eine Landing Page ist nie „fertig". Mit Management testen wir laufend
                Headlines, CTAs und Layouts gegeneinander, analysieren Nutzerverhalten
                und drehen an der Conversion Rate — Monat für Monat.
              </p>
              <ul className="relative space-y-3 mb-9 flex-1">
                {[
                  "Alles aus dem Kauf-Modell inklusive",
                  "Laufende A/B-Tests & Heatmap-Analysen",
                  "Copy- und Design-Iterationen nach Daten",
                  "Monatlicher Conversion-Report — verständlich erklärt",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/85">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center">
                      <svg className="w-3 h-3 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/kontakt"
                className="relative inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300"
              >
                Mit Management anfragen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          <p className="scroll-hidden text-center text-sm text-muted mt-8">
            Festpreis bzw. monatlicher Umfang — transparent im kostenlosen Erstgespräch. Antwort in unter 24 Stunden.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="scroll-hidden mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Häufige Fragen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              Alles zu Landing Pages
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="scroll-hidden" style={{ transitionDelay: `${i * 50}ms` }}>
                  <div className={`rounded-2xl border bg-white overflow-hidden transition-colors duration-300 ${open ? "border-primary/30" : "border-border"}`}>
                    <button
                      className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                    >
                      <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                      <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-primary text-white rotate-180" : "bg-primary/[0.08] text-primary"}`}>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-400 ease-out"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-5 text-sm text-muted leading-relaxed border-t border-border pt-4">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          VERWANDTE LEISTUNGEN
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Verwandte Leistungen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">
              Mehr aus deinem Online-Marketing herausholen
            </h2>
            <Link href="/webdesign" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
              Alle Webdesign-Leistungen im Überblick <span>→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Website erstellen lassen", href: "/webdesign/website-erstellen-lassen", desc: "Vollständige Website — professionell, schnell, SEO-ready." },
              { title: "SEO Content Strategie", href: "/seo/content-strategie", desc: "Content-Planung, die organischen Traffic aufbaut." },
              { title: "SEO Betreuung", href: "/seo/betreuung", desc: "Monatliche SEO-Optimierung für nachhaltige Rankings." },
              { title: "Website Relaunch", href: "/webdesign/website-relaunch-agentur", desc: "Bestehende Website modernisieren — SEO-sicher." },
            ].map((link, i) => (
              <div key={link.href} className="scroll-hidden h-full" style={{ transitionDelay: `${i * 70}ms` }}>
                <Link
                  href={link.href}
                  className="block h-full rounded-2xl border border-border bg-white p-6 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <h3 className="font-bold text-dark text-base mb-2 group-hover:text-primary transition-colors">{link.title} →</h3>
                  <p className="text-muted text-sm leading-relaxed">{link.desc}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ background: "#1A1A1A" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-primary/[0.07] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="scroll-hidden">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-4">
              Mehr Leads aus deinem Traffic?
            </h2>
            <p className="text-white/55 text-lg mb-3 leading-relaxed">
              Lass uns in 30 Minuten klären, ob eine Landing Page dein nächster
              Wachstumshebel ist — und was sie kosten würde.
            </p>
            <p className="text-white/35 text-sm mb-9">
              Persönlicher Ansprechpartner · Antwort garantiert in unter 24 Stunden
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              Kostenloses Erstgespräch buchen →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
