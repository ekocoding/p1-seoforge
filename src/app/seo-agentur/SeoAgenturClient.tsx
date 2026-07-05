"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "@/app/components/SubpageLayout";

/* ─── Scroll-Reveal (IntersectionObserver → .scroll-visible) ──────────────── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        }),
      { threshold: 0.22, rootMargin: "0px 0px -16% 0px" }
    );
    document.querySelectorAll(".scroll-hidden, .m3d").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Scroll-Progress (fixed, rAF-gedrosselt) ─────────────────────────────── */
function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-[80] h-[3px]" aria-hidden="true">
      <div
        ref={ref}
        className="h-full origin-left"
        style={{ transform: "scaleX(0)", background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
      />
    </div>
  );
}

/* ─── Icon-Helper ─────────────────────────────────────────────────────────── */
const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Editorial-Header ────────────────────────────────────────────────────── */
function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy: string }) {
  return (
    <div className="scroll-hidden grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-16 items-end mb-12 lg:mb-16">
      <div>
        <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">{eyebrow}</span>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12]">{title}</h2>
      </div>
      <p className="text-muted leading-relaxed lg:pb-1.5 lg:text-right">{copy}</p>
    </div>
  );
}

const grad: React.CSSProperties = {
  background: "linear-gradient(90deg, #C2722A, #D4A853)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

/* ═══════════════════════════════════════════════════════════════════════════
   SERP-LIVE-DEMO — Interaktions-Höhepunkt 1/2 (Hero)
   Umgebauter Bestand (SerpRankingMockup): helles App-Panel statt dunkler
   SVG-Karte. Keine erfundenen Zahlen — nur Positionsbewegung 5 → 3 → 1.
   SSR/No-JS/Reduced-Motion zeigen statisch den Endzustand (Platz 1 + Stempel).
═══════════════════════════════════════════════════════════════════════════ */
const SERP_OFFSETS = [0, 74, 148, 222, 296]; // 5 Slots à 64px + 10px Abstand

function SerpLiveDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(3); // 3 = statischer Endzustand (Fallback)
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // Endzustand stehen lassen
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 900);
    const t2 = setTimeout(() => setStep(2), 1900);
    const t3 = setTimeout(() => setStep(3), 2650);
    const t4 = setTimeout(() => setCycle((c) => c + 1), 5900); // 3s Pause, dann Loop-Reset
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [started, cycle]);

  const seofSlot = step === 0 ? 4 : step === 1 ? 2 : 0;
  const skelSlot = (i: number) => (step === 0 ? i : step === 1 ? (i < 2 ? i : i + 1) : i + 1);
  const pos = step === 0 ? "5" : step === 1 ? "3" : "1";
  const rowTransition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";

  return (
    <div ref={ref} className="rounded-3xl border border-border bg-white overflow-hidden shadow-[0_28px_70px_-26px_rgba(26,26,26,0.28)]">
      {/* Fake-App-Header */}
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
        <span className="chip-dot w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">Google-Suche · Live-Demo</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-dark/35">Beispiel</span>
      </div>

      <div className="p-5 lg:p-6 bg-offwhite/40">
        {/* Suchleiste */}
        <div className="flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-2.5 mb-5">
          <svg className="w-4 h-4 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <span className="font-mono text-sm text-dark">seo agentur</span>
        </div>

        {/* 5 Ergebnis-Zeilen — Reorder ausschließlich über translateY */}
        <div key={cycle} className="relative h-[360px]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`skel-${i}`}
              className="absolute left-0 right-0 top-0 flex h-16 items-center gap-3 rounded-xl border border-border bg-white px-4"
              style={{ transform: `translateY(${SERP_OFFSETS[skelSlot(i)]}px)`, transition: rowTransition }}
              aria-hidden="true"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-dark/10" />
              <span className="flex-1">
                <span className="block h-2.5 rounded" style={{ background: "#dcd7d0", width: `${[76, 62, 70, 55][i]}%` }} />
                <span className="mt-2 block h-2 rounded bg-offwhite" style={{ width: `${[44, 52, 38, 47][i]}%` }} />
              </span>
            </div>
          ))}

          {/* seoforge.de — getönte Karte mit Positions-Badge */}
          <div
            className="absolute left-0 right-0 top-0 flex h-16 items-center gap-3 rounded-xl px-4"
            style={{
              background: "#fbf4ea",
              border: "1px solid #ecd3ba",
              transform: `translateY(${SERP_OFFSETS[seofSlot]}px)`,
              transition: rowTransition,
              zIndex: 5,
            }}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)" }}
            >
              {pos}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-semibold text-dark">SEO Agentur für Google &amp; KI-Suche</span>
              <span className="block font-mono text-[11px] text-primary">seoforge.de</span>
            </span>
            {step === 3 && (
              <span
                className="serp-stamp pointer-events-none absolute -right-3 -top-4 z-10 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-black uppercase tracking-[0.18em] text-white"
                style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)", boxShadow: "0 10px 24px -8px rgba(194,114,42,0.6)" }}
              >
                Platz 1
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ERWARTUNGS-KORRIDOR — passives Draw-on-Scroll-Chart (GrowthChart-Muster)
═══════════════════════════════════════════════════════════════════════════ */
function KorridorChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="p-6 lg:p-8">
      <svg viewBox="0 0 640 220" className="w-full h-[200px] lg:h-[220px]" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="korridorFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C2722A" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#C2722A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Referenzlinie ohne SEO — immer sichtbar */}
        <path
          d="M16 178 C 180 180, 400 186, 624 189"
          fill="none"
          stroke="#cfc9c1"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Flächen-Gradient unter der Hauptkurve */}
        <path
          d="M16 184 C 140 180, 220 168, 320 138 C 420 108, 520 78, 624 60 L 624 208 L 16 208 Z"
          fill="url(#korridorFill)"
          style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.9s ease 0.7s" }}
        />

        {/* Terracotta-Hauptkurve — zeichnet sich einmalig */}
        <path
          d="M16 184 C 140 180, 220 168, 320 138 C 420 108, 520 78, 624 60"
          fill="none"
          stroke="#C2722A"
          strokeWidth="3.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="900"
          style={{ strokeDashoffset: drawn ? 0 : 900, transition: "stroke-dashoffset 1.8s ease" }}
        />

        {/* Endpunkt */}
        <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.4s ease 1.7s" }}>
          <circle cx="624" cy="60" r="9" fill="#D4A853" opacity="0.25" />
          <circle cx="624" cy="60" r="4.5" fill="#D4A853" />
        </g>
      </svg>

      <div className="mt-2 flex justify-between font-mono text-[10px] text-muted" aria-hidden="true">
        <span>Monat 1</span>
        <span>Monat 3</span>
        <span>Monat 6</span>
        <span>Monat 9</span>
        <span>Monat 12</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="flex items-center gap-2 text-xs text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: "#C2722A" }} />
          Mit systematischem SEO — illustrativ
        </span>
        <span className="flex items-center gap-2 text-xs text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: "#cfc9c1" }} />
          Ohne SEO-Investition
        </span>
      </div>
    </div>
  );
}

/* ─── Daten ───────────────────────────────────────────────────────────────── */
const DATEN_STACK = ["Google Search Console", "Semrush", "Ahrefs", "Screaming Frog"];

const BAND_ROW1 = [
  { label: "SEO-Audit", d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" },
  { label: "SEO-Beratung", d: "M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" },
  { label: "SEO-Optimierung & Technik", d: "M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" },
  { label: "OnPage-Optimierung", d: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" },
  { label: "Content-Strategie", d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" },
  { label: "SEO-Texte", d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" },
  { label: "Shop-SEO", d: "M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" },
  { label: "SEO-Betreuung", d: "M4 4v6h6M20 20v-6h-6M20 10a8 8 0 0 0-14.3-3.7L4 8M4 14a8 8 0 0 0 14.3 3.7L20 16" },
  { label: "KI-SEO & GEO", d: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" },
];

const BAND_ROW2 = [
  { label: "E-Commerce", accent: false },
  { label: "Kein Mindestvertrag", accent: true },
  { label: "B2B", accent: false },
  { label: "White-Hat, Google-konform", accent: true },
  { label: "Lokale Betriebe", accent: false },
  { label: "Monatliches Reporting", accent: true },
  { label: "SaaS", accent: false },
];

/* Leistungskatalog — 9 Teilleistungen in 3 Kapiteln, Links exakt wie im Content */
type Leistung = { nr: string; titel: string; chips: string[]; text: React.ReactNode };

const KATALOG: { kapitel: string; leistungen: Leistung[] }[] = [
  {
    kapitel: "Kapitel 01 — Fundament",
    leistungen: [
      {
        nr: "01",
        titel: "SEO-Audit",
        chips: ["Priorisierte Maßnahmenliste", "Wettbewerbsanalyse"],
        text: (
          <>
            Jede Zusammenarbeit beginnt mit einem{" "}
            <Link href="/seo/audit" className="text-primary font-semibold hover:underline">SEO-Audit</Link>, das technische Basis,
            Indexierung, Ladezeiten, Content-Qualität und Backlink-Profil systematisch erfasst, meist ergänzt um eine Analyse des
            Wettbewerbsumfelds. Aus unserer Erfahrung liegen die größten Potenziale selten dort, wo Kunden sie vermuten, sondern in
            strukturellen Defiziten wie fehlerhafter Kanonisierung, dünnen Kategorieseiten oder unklarer interner Verlinkung, die über
            Jahre gewachsen sind. Der Audit liefert eine priorisierte Maßnahmenliste mit Aufwand-Nutzen-Einschätzung, keine reine
            Fehlersammlung ohne Handlungsempfehlung.
          </>
        ),
      },
      {
        nr: "02",
        titel: "Keyword-Strategie",
        chips: ["Keyword-Architektur", "Themenautorität"],
        text: (
          <>
            Auf Basis von Suchvolumen, Wettbewerbsdichte und Nutzerintention entwickeln wir eine Keyword-Architektur, die
            Money-Keywords, Rechercheanfragen und Long-Tail-Begriffe sinnvoll auf einzelne Seiten verteilt, statt mehrere Seiten um
            denselben Begriff konkurrieren zu lassen. Diese Arbeit ist fester Bestandteil unserer{" "}
            <Link href="/seo/beratung" className="text-primary font-semibold hover:underline">SEO-Beratung</Link> und entscheidet, ob
            eine Website später um dieselben zwei, drei Hauptbegriffe konkurriert oder eine breite Themenautorität über ein ganzes
            Themenfeld aufbaut. Ohne diese Vorarbeit laufen Content- und Linkbuilding-Maßnahmen häufig ins Leere, weil sie auf die
            falschen Begriffe einzahlen oder mehrere eigene Seiten gegeneinander ausspielen.
          </>
        ),
      },
      {
        nr: "03",
        titel: "OnPage & Technik",
        chips: ["Core Web Vitals", "CI/CD-Deployments"],
        text: (
          <>
            Die <Link href="/seo/on-page" className="text-primary font-semibold hover:underline">OnPage-Optimierung</Link> umfasst
            Meta-Daten, interne Verlinkung, strukturierte Daten, Core Web Vitals und die Behebung technischer Crawling-Fehler, die eine
            Website für Suchmaschinen unnötig schwer lesbar machen. Wir setzen technische Änderungen über eine CI/CD-Pipeline um,
            wodurch Anpassungen an Templates oder Seitenstruktur innerhalb weniger Minuten live sind statt nach wochenlanger Abstimmung
            mit einer externen IT-Abteilung, die andere Prioritäten verfolgt. Bei Websites mit mehreren tausend URLs entscheidet diese
            Geschwindigkeit häufig darüber, ob technische Probleme innerhalb von Tagen oder erst nach Monaten behoben werden, während
            der Wettbewerb weiter aufholt.
          </>
        ),
      },
    ],
  },
  {
    kapitel: "Kapitel 02 — Wachstum",
    leistungen: [
      {
        nr: "04",
        titel: "Content",
        chips: ["Themenarchitektur", "Pillar & Cluster"],
        text: (
          <>
            Inhalte entstehen bei uns eingebettet in eine Themenarchitektur, die Suchintention, Cluster-Struktur und interne
            Verlinkung zusammen plant, nicht als isolierte Blogartikel ohne erkennbaren roten Faden. Die eigentliche Umsetzung —
            recherchierte, fachlich korrekte{" "}
            <Link href="/seo/texte" className="text-primary font-semibold hover:underline">SEO-Texte</Link> — übernehmen Redakteure mit
            Themenkenntnis, keine austauschbaren Textbausteine aus der Textbörse, die an jeder zweiten Stelle dieselben Floskeln
            wiederholen. Jede Seite bekommt eine klar definierte Rolle im Gesamtgefüge: als Pillar-Seite, unterstützender
            Cluster-Artikel oder transaktionale Landingpage, die auf ein konkretes Ziel einzahlt.
          </>
        ),
      },
      {
        nr: "05",
        titel: "Linkbuilding & Digital PR",
        chips: ["Digital PR", "Zitierfähige Inhalte"],
        text: (
          <>
            Backlinks entstehen aus unserer Erfahrung am nachhaltigsten aus Inhalten, die tatsächlich zitiert werden wollen — Studien,
            Datenauswertungen oder fundierte Ratgeber, deren Themen wir gezielt über die{" "}
            <Link href="/seo/content-strategie" className="text-primary font-semibold hover:underline">Content-Strategie</Link> planen,
            statt sie dem Zufall zu überlassen. Reine Linkkäufe halten wir für riskant und wenig nachhaltig; stattdessen setzen wir auf
            Digital PR, also die aktive Ansprache von Redaktionen und Fachportalen mit Inhalten, die einen echten Mehrwert bieten und
            aus fachlicher Sicht etwas beitragen. Diese Arbeit braucht Geduld, liefert dafür aber Verlinkungen, die auch nach einem
            Algorithmus-Update Bestand haben, weil sie auf redaktioneller Relevanz statt auf reiner Platzierung beruhen.
          </>
        ),
      },
      {
        nr: "06",
        titel: "Local SEO",
        chips: ["Google Business", "Standortseiten"],
        text: (
          <>
            Für Unternehmen mit stationärem Geschäft oder mehreren Standorten optimieren wir Google Business-Profile, lokale
            Landingpages und Verzeichniseinträge als Teil unserer{" "}
            <Link href="/seo/optimierung" className="text-primary font-semibold hover:underline">SEO-Optimierung</Link>, abgestimmt auf
            die jeweilige Region und Zielgruppe. Lokale Rankings hängen stark von Konsistenz ab — gleiche Adressdaten, gleiche
            Kategorien, gleiche Öffnungszeiten über alle Verzeichnisse hinweg —, ein Detail, das in der Praxis häufiger vernachlässigt
            wird als vermutet und stille Ranking-Verluste verursacht. Bei mehreren Standorten entwickeln wir zusätzlich eine Struktur,
            in der sich einzelne Standortseiten nicht gegenseitig kannibalisieren, sondern jede für ihre eigene Region sichtbar wird.
          </>
        ),
      },
    ],
  },
  {
    kapitel: "Kapitel 03 — Spezialisierung",
    leistungen: [
      {
        nr: "07",
        titel: "Shop-SEO",
        chips: ["Facettennavigation", "Crawling-Budget"],
        text: (
          <>
            Online-Shops stellen eigene Anforderungen: Kategorieseiten mit dünnem Content, Duplicate Content durch Filterkombinationen
            und Produktseiten, die inhaltlich austauschbar sind, weil Hersteller-Beschreibungen unverändert übernommen wurden. Bei der{" "}
            <Link href="/seo/shop" className="text-primary font-semibold hover:underline">Shop-SEO</Link> arbeiten wir an
            Kategorietexten, Facettennavigation und der technischen Sauberkeit von Filter-URLs, damit Crawling-Budget nicht in
            irrelevanten URL-Varianten verpufft, die ohnehin nie ranken würden. Bei großen Sortimenten entscheidet diese technische
            Struktur häufiger über Sichtbarkeit als einzelne Produkttexte, so wichtig diese im Detail auch bleiben.
          </>
        ),
      },
      {
        nr: "08",
        titel: "Laufende Betreuung",
        chips: ["Monitoring", "Monatliches Reporting"],
        text: (
          <>
            SEO ist kein Projekt mit Abschlussdatum, weshalb die meisten Mandate in eine{" "}
            <Link href="/seo/betreuung" className="text-primary font-semibold hover:underline">laufende Betreuung</Link> übergehen,
            sobald die Grundlagen stehen und erste Ergebnisse sichtbar werden. Darin überwachen wir Rankings, Sichtbarkeitsindex,
            technische Fehler und Wettbewerbsbewegungen und passen die Strategie an, sobald sich Suchintention, SERP-Layout oder das
            Verhalten einzelner Wettbewerber verändern. In dieser Phase zeigt sich auch der tatsächliche Wert einer Agentur, weil
            einmalige Maßnahmen ohne Nachpflege innerhalb weniger Monate an Wirkung verlieren und Wettbewerber aufholen.
          </>
        ),
      },
      {
        nr: "09",
        titel: "GEO/KI-Sichtbarkeit",
        chips: ["Prompt-Monitoring", "KI-Quellen"],
        text: (
          <>
            Mit unserer{" "}
            <Link href="/geo/optimierung" className="text-primary font-semibold hover:underline">GEO-Optimierung</Link> prüfen wir, ob
            und wie eine Marke in Antworten von ChatGPT, Perplexity und Google AI Overviews auftaucht, und arbeiten an den Faktoren,
            die KI-Systeme als vertrauenswürdige Quelle werten — klare Struktur, eindeutige Fakten, konsistente Aussagen über
            verschiedene Quellen hinweg, die sich nicht widersprechen. Diese Disziplin steckt technisch und methodisch noch in einer
            frühen Phase, in der sich Bewertungskriterien monatlich verschieben können, weshalb wir sie offen als Ergänzung zu
            klassischem SEO kommunizieren, nicht als Ersatz.
          </>
        ),
      },
    ],
  },
];

const KATALOG_FLAT = KATALOG.flatMap((k) => k.leistungen);

/* Prozess — 5 Phasen als Arbeitspakete (keine Roadmap-Optik) */
const PHASEN = [
  {
    nr: "01",
    titel: "Kickoff & Audit",
    kurz: "Zielsetzung, Wettbewerb und technische Ausgangslage klären.",
    text: "Jedes Mandat beginnt mit einem persönlichen Kickoff, in dem wir Zielsetzung, Wettbewerbsumfeld, interne Ressourcen und technische Ausgangslage klären, gefolgt vom vollständigen SEO-Audit über alle relevanten Seitenbereiche. Erst nach dieser Bestandsaufnahme legen wir fest, welche Maßnahmen priorisiert werden, nicht vorher und nicht nach einem Schema, das für jede Website identisch abläuft.",
    deliverable: "Vollständiger SEO-Audit mit priorisierter Maßnahmenliste",
    tools: ["Google Search Console", "Screaming Frog", "Semrush"],
    zeit: "Woche 1–2",
  },
  {
    nr: "02",
    titel: "Strategie & Roadmap",
    kurz: "Meilensteine nach Aufwand und erwartetem Effekt sortiert.",
    text: "Aus den Audit-Ergebnissen entsteht eine Roadmap mit klaren Meilensteinen, sortiert nach Aufwand und erwartetem Effekt statt nach Bauchgefühl oder danach, was sich am schnellsten präsentieren lässt. Diese Roadmap ist die verbindliche Arbeitsgrundlage der Zusammenarbeit und wird angepasst, sobald sich Prioritäten durch neue Daten, ein Google-Update oder verändertes Wettbewerbsverhalten verschieben.",
    deliverable: "Roadmap mit klaren Meilensteinen als verbindliche Arbeitsgrundlage",
    tools: ["Semrush", "Ahrefs"],
    zeit: "Woche 2–4",
  },
  {
    nr: "03",
    titel: "Umsetzung",
    kurz: "Technik und Redaktion parallel — live über CI/CD.",
    text: "Technische und inhaltliche Maßnahmen setzen wir über unsere CI/CD-Infrastruktur um, wodurch Änderungen innerhalb von Minuten statt Wochen live gehen und nicht in einer Warteschlange bei der IT-Abteilung hängen bleiben. Redaktionelle Arbeiten und technische Anpassungen laufen dabei parallel, nicht nacheinander, um die Zeit bis zur ersten messbaren Wirkung spürbar zu verkürzen.",
    deliverable: "Umgesetzte Maßnahmen — in Minuten live statt in Wochen",
    tools: ["Screaming Frog", "Google Search Console"],
    zeit: "ab Woche 4, fortlaufend",
  },
  {
    nr: "04",
    titel: "Monitoring & Reporting",
    kurz: "Sie sehen dieselben Daten, mit denen wir arbeiten.",
    text: "Rankings, organischer Traffic, Sichtbarkeitsindex und technische Kennzahlen werden fortlaufend über Search Console, Semrush und Ahrefs erfasst und in einem transparenten, für Sie jederzeit einsehbaren Reporting zusammengeführt. Sie sehen dabei dieselben Daten, mit denen wir intern arbeiten, keine nachträglich geglättete oder ausschließlich positiv formulierte Zusammenfassung.",
    deliverable: "Transparentes Reporting — jederzeit einsehbar",
    tools: ["Google Search Console", "Semrush", "Ahrefs"],
    zeit: "monatlich, fortlaufend",
  },
  {
    nr: "05",
    titel: "Iterative Optimierung",
    kurz: "Messen, anpassen, erneut messen — über das gesamte Mandat.",
    text: "SEO-Maßnahmen wirken selten beim ersten Versuch optimal, weshalb wir Inhalte und technische Einstellungen nach den ersten Ergebnissen nachschärfen und Hypothesen verwerfen, die sich in den Daten nicht bestätigen. Diese Schleife aus Messen, Anpassen und erneutem Messen wiederholt sich über die gesamte Zusammenarbeit hinweg, nicht nur in der Anfangsphase eines Mandats.",
    deliverable: "Nachgeschärfte Maßnahmen auf Datenbasis — verworfene Hypothesen inklusive",
    tools: ["Google Search Console", "Semrush"],
    zeit: "fortlaufend",
  },
];

/* Inhouse vs. Agentur — Vergleichs-Tafel (nur qualitative Aussagen) */
const TAFEL = [
  {
    dim: "Jahreskosten & Fixkostenrisiko",
    inhouse: "Zwei bis drei spezialisierte Vollzeitstellen müssen dauerhaft finanziert werden — unabhängig von Auslastung und Projektphase.",
    seoforge: "Ein Team über alle Disziplinen, gebucht in dem Umfang, den die Aufgabe tatsächlich erfordert — monatlich kündbar.",
  },
  {
    dim: "Know-how-Breite: Technik, Content, Links, GEO",
    inhouse: "Vier Fachbereiche sind selten in einer Person vereint — in mindestens einem Bereich entstehen Abstriche.",
    seoforge: "Spezialisierte Rollen für jede Disziplin, die im Zusammenspiel geplant arbeiten statt isoliert nebeneinander.",
  },
  {
    dim: "Tool-Stack & Lizenzen",
    inhouse: "Semrush, Ahrefs, Screaming Frog und Monitoring-Setups müssen einzeln lizenziert, eingerichtet und gepflegt werden.",
    seoforge: "Der komplette Daten-Stack ist Teil des Mandats — inklusive eigener Prompt-Monitoring-Setups für die KI-Suche.",
  },
  {
    dim: "Anlaufzeit bis Wirkung",
    inhouse: "Recruiting, Einarbeitung und Prozessaufbau kosten Monate, bevor die erste Maßnahme überhaupt live geht.",
    seoforge: "Kickoff, Audit und erste Umsetzungen starten in den ersten Wochen — Änderungen gehen über CI/CD in Minuten live.",
  },
  {
    dim: "Vertretung & Kontinuität",
    inhouse: "Kündigung oder Ausfall einer einzelnen Schlüsselperson stoppt das komplette Thema.",
    seoforge: "Ein festes Team mit dokumentierten Prozessen — Wissen hängt nicht an einer einzelnen Person.",
  },
];

/* Erwartungs-Korridor — 3 Zellen */
const KORRIDOR_ZELLEN = [
  {
    ziffer: "1–3",
    titel: "Fundament & erste Bewegung",
    punkte: [
      "Fokus auf Audit, technischer Grundlagenarbeit und dem Beheben struktureller Probleme, die bislang unbemerkt Sichtbarkeit gekostet haben",
      "Fehlerhafte Weiterleitungen und blockierte Ressourcen werden systematisch beseitigt",
      "Erste Rankingbewegungen bei wenig umkämpften Begriffen sind möglich — eher Ausnahme als Regel",
    ],
    messung: "GSC-Impressionen & Indexierung",
  },
  {
    ziffer: "3–6",
    titel: "Sichtbares Wachstum",
    punkte: [
      "Erste belastbare Effekte: neue Rankings für Long-Tail-Begriffe",
      "Steigender organischer Traffic auf überarbeiteten Seiten, beginnende Indexierung und erste Rankings neuer Inhalte",
      "Wettbewerbsintensive Haupt-Keywords brauchen meist noch weitere Zeit, da etablierte Wettbewerber aktiv gegensteuern",
    ],
    messung: "Klicks & Top-10-Keywords",
  },
  {
    ziffer: "6–12",
    titel: "Skalierung & Verteidigung",
    punkte: [
      "Belastbare Sichtbarkeit über ein breiteres Set an Keywords",
      "Übersteht Schwankungen einzelner Google-Updates besser als eine schmale Rankingbasis",
      "Die Arbeit verschiebt sich von Aufbau zu Verteidigung und gezielter Erweiterung in angrenzende Themenfelder",
    ],
    messung: "Anfragen aus organischem Traffic",
  },
];

/* Kosten — 4 Faktor-Kacheln (Content-Kostenfaktoren) */
const FAKTOREN = [
  {
    s: "M3 17l6-6 4 4 8-8M21 7v4M21 7h-4",
    t: "Wettbewerbsintensität",
    d: "Je mehr Unternehmen um dieselben Keywords konkurrieren, desto mehr Aufwand ist nötig, um sich davon abzuheben.",
  },
  {
    s: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z",
    t: "Technische Ausgangslage",
    d: "Technische Altlasten aus früheren Relaunches oder CMS-Wechseln erhöhen den Aufwand in der ersten Projektphase.",
  },
  {
    s: "M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
    t: "Content-Umfang",
    d: "Je mehr Themen und Zielseiten abgedeckt werden müssen, desto mehr redaktionelle Kapazität wird benötigt.",
  },
  {
    s: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
    t: "Standorte & Sprachversionen",
    d: "Mehrere Standorte oder Sprachversionen vervielfachen den Aufwand für lokale und internationale Optimierung.",
  },
];

/* Für wen — 4 Profile mit typischem Hebel */
const PROFILE = [
  {
    t: "KMU & Mittelstand",
    d: "Mittelständische Unternehmen profitieren meist am stärksten von einer Agentur, weil intern selten Kapazität für alle SEO-Disziplinen gleichzeitig vorhanden ist und eine einzelne Marketingstelle Technik, Content und Linkbuilding kaum abdecken kann. Wir übernehmen dabei die komplette operative Arbeit und liefern Reportings, die auch ohne tiefes SEO-Fachwissen auf Geschäftsführungsebene verständlich sind.",
    hebel: "Komplette Operative + Management-Reporting",
  },
  {
    t: "B2B-Dienstleister",
    d: "B2B-Unternehmen mit erklärungsbedürftigen Leistungen brauchen häufig eher Themenautorität und Vertrauen als reine Keyword-Rankings, da Kaufentscheidungen selten sofort nach dem ersten Website-Besuch fallen, sondern über Wochen und mehrere Ansprechpartner hinweg reifen. Hier setzen wir auf Content, der Fachfragen fundiert beantwortet und über einen längeren Entscheidungsprozess hinweg relevant und auffindbar bleibt.",
    hebel: "Themen-Cluster + Autoritätsaufbau",
  },
  {
    t: "Online-Shops",
    d: "Für Online-Shops steht die technische Struktur im Vordergrund — Kategorieseiten, Filterlogik, Duplicate Content —, weil sich Fehler hier direkt in entgangenem Umsatz niederschlagen, oft ohne dass die Ursache auf den ersten Blick erkennbar ist. Wir kombinieren technische Shop-Optimierung mit Content für Kategorie- und Ratgeberseiten, die zusätzliches Suchvolumen jenseits der reinen Produktsuche erschließen.",
    hebel: "Kategorie-Struktur + technisches Shop-SEO",
  },
  {
    t: "Lokale Unternehmen",
    d: "Unternehmen mit stationärem Geschäft oder mehreren Standorten profitieren von der Kombination aus lokaler Optimierung und klassischem SEO, weil beide Kanäle unterschiedliche Suchanfragen bedienen und unterschiedliche Phasen der Kaufentscheidung abdecken. Wir sorgen dafür, dass Standortseiten sich gegenseitig unterstützen, statt im eigenen Ranking gegeneinander zu konkurrieren.",
    hebel: "Standortseiten + Google-Business-Profil",
  },
];

/* FAQ — 8 Entscheiderfragen */
const faqs = [
  {
    q: "Was macht eine SEO Agentur?",
    a: "Eine SEO Agentur analysiert die technische, inhaltliche und strukturelle Ausgangslage einer Website und entwickelt daraus Maßnahmen, die organische Sichtbarkeit in Suchmaschinen verbessern. Dazu gehören SEO-Audit, Keyword-Strategie, technische Optimierung, Content-Erstellung, Linkbuilding und laufendes Monitoring, meist begleitet von regelmäßigem Reporting an den Auftraggeber. Eine gute Agentur bewertet zusätzlich, welche Kanäle – klassische Suche oder KI-Suche – für ein Unternehmen tatsächlich relevant sind, statt pauschal dieselben Maßnahmen unabhängig von Branche und Zielgruppe für jede Website umzusetzen.",
  },
  {
    q: "Wie lange dauert es, bis SEO-Ergebnisse sichtbar werden?",
    a: "Erste messbare Effekte zeigen sich in der Regel nach drei bis sechs Monaten, abhängig von Wettbewerbsdichte und technischer Ausgangslage. Ein nachhaltiger Aufbau, der auch wettbewerbsintensive Haupt-Keywords einschließt, benötigt meist sechs bis zwölf Monate. Wer schnellere Versprechen hört, sollte nachfragen, mit welchen Methoden das erreicht werden soll – kurzfristige Rankingsprünge über riskante Taktiken kosten mittelfristig häufig mehr, als sie kurzfristig bringen.",
  },
  {
    q: "Was kostet SEO?",
    a: "Die Kosten hängen von Wettbewerbsumfeld, technischer Ausgangslage, Umfang der Website und Content-Bedarf ab, weshalb sich ein pauschaler Preis seriös nicht nennen lässt. Nach einer kostenlosen Erstanalyse erstellen wir ein individuelles Angebot, das sich an der tatsächlichen Situation orientiert, nicht an einem Standardpaket. Die Abrechnung ist dabei transparent nachvollziehbar, sodass klar ist, welche Leistung wofür eingeplant ist.",
  },
  {
    q: "Gibt es eine Garantie auf Platz 1 bei Google?",
    a: "Nein, und jede Agentur, die das zusichert, sollte kritisch hinterfragt werden. Rankingfaktoren, Wettbewerbsverhalten und Algorithmus-Updates liegen außerhalb der Kontrolle einer einzelnen Agentur, weshalb feste Platzierungen nicht seriös garantiert werden können, unabhängig davon, wie gut eine Website optimiert ist. Wir kommunizieren stattdessen, was auf Basis vorhandener Daten realistisch erreichbar ist, und passen die Einschätzung offen an, sobald sich die Ausgangslage verändert, etwa durch ein Google-Update oder neue Wettbewerber im selben Marktsegment.",
  },
  {
    q: "Inhouse-Team oder SEO Agentur – was ist sinnvoller?",
    a: "Das hängt von der verfügbaren Kapazität und dem benötigten Fachwissen ab. Ein Inhouse-Team lohnt sich, wenn ausreichend Budget für mehrere spezialisierte Stellen vorhanden ist und SEO eng mit Produktentwicklung oder Redaktion verzahnt werden muss. Eine Agentur ist sinnvoll, wenn mehrere Disziplinen gleichzeitig abgedeckt werden müssen, ohne dafür mehrere Vollzeitstellen aufzubauen, oder wenn eine externe, unvoreingenommene Bewertung der eigenen Website gewünscht ist.",
  },
  {
    q: "Woran erkennt man eine gute SEO Agentur?",
    a: "An nachvollziehbaren Prozessen statt vagen Versprechen: Ein seriöses Angebot beginnt mit einem Audit, benennt konkrete Maßnahmen mit Priorisierung und zeigt Reportings mit denselben Daten, mit denen intern gearbeitet wird, statt nachträglich aufbereiteten Auszügen. Vorsicht ist geboten bei Agenturen, die feste Rankinggarantien geben, keine Einblicke in ihre Methoden gewähren oder ausschließlich über Linkkäufe statt über strukturelle Verbesserungen sprechen. Auch die Reaktionszeit auf Rückfragen vor Vertragsbeginn verrät bereits viel über die spätere Zusammenarbeit.",
  },
  {
    q: "Was ist der Unterschied zwischen SEO und GEO?",
    a: "SEO optimiert eine Website für klassische Suchmaschinen-Rankings, GEO (Generative Engine Optimization) optimiert dafür, dass eine Marke oder Website als Quelle in KI-generierten Antworten von ChatGPT, Perplexity oder Google AI Overviews auftaucht. Beide Disziplinen überschneiden sich – klare Struktur, belastbare Fakten und eindeutig beantwortete Fragen helfen in beiden Fällen –, unterscheiden sich aber in der Erfolgsmessung: SEO misst Rankings und Klicks, GEO misst Sichtbarkeit innerhalb von KI-Antworten, was eigene Monitoring-Ansätze und andere Kennzahlen erfordert als klassisches Ranking-Tracking.",
  },
  {
    q: "Wie läuft die Zusammenarbeit mit SeoForge ab?",
    a: "Nach einem Kickoff-Gespräch folgt ein vollständiges SEO-Audit, aus dem eine priorisierte Roadmap entsteht. Die Umsetzung erfolgt über unsere CI/CD-Infrastruktur, wodurch technische Änderungen innerhalb von Minuten live gehen, während redaktionelle Maßnahmen parallel laufen. Fortlaufendes Monitoring bildet die Grundlage für transparentes Reporting, auf dessen Basis wir die Strategie in regelmäßigen Abständen anpassen.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function SeoAgenturClient() {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ScrollProgressBar />
      <style>{`
        .m3d { opacity: 0; transform: translateY(60px) rotateX(-14deg) scale(0.97); transform-origin: 50% 18%; transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); will-change: transform; backface-visibility: hidden; }
        .m3d.scroll-visible { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); }
        @keyframes chipPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .chip-dot { animation: chipPulse 2.4s ease-in-out infinite; }
        .scroll-hidden.rv-left { transform: translateX(-56px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-right { transform: translateX(56px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-scale { transform: translateY(28px) scale(0.93); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-blur { filter: blur(12px); transform: translateY(26px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-left.scroll-visible, .scroll-hidden.rv-right.scroll-visible, .scroll-hidden.rv-scale.scroll-visible, .scroll-hidden.rv-blur.scroll-visible { transform: none; filter: none; }
        @keyframes stampIn { 0% { opacity: 0; transform: rotate(-10deg) scale(2); } 65% { opacity: 1; transform: rotate(-10deg) scale(0.92); } 100% { opacity: 1; transform: rotate(-10deg) scale(1); } }
        .serp-stamp { opacity: 0; animation: stampIn 0.55s cubic-bezier(0.2, 1.4, 0.4, 1) 0.15s both; }
        @keyframes aeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .ae-in { animation: aeIn 0.4s ease both; }
        @keyframes marquee-rtl { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .m3d { opacity: 1; transform: none; transition: none; }
          .chip-dot { animation: none; }
          .scroll-hidden.rv-left, .scroll-hidden.rv-right, .scroll-hidden.rv-scale, .scroll-hidden.rv-blur { transform: none; filter: none; transition: none; }
          .serp-stamp { opacity: 1; animation: none; transform: rotate(-10deg); }
          .ae-in { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* ══ 01 HERO — Beweis statt Behauptung (asymmetrischer Split + SerpLiveDemo) ══ */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute left-[10%] top-[-18%] h-[620px] w-[950px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(212,168,83,0.18), transparent 60%)" }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(26,26,26,0.045) 1px, transparent 0)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse 55% 60% at 25% 35%, #000 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 55% 60% at 25% 35%, #000 30%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 pt-28 lg:pt-36 pb-16 lg:pb-24">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            {/* Links — Text */}
            <div>
              <div className="hero-badge mb-6 inline-flex items-center gap-2.5">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">SEO Agentur</span>
              </div>

              <h1 className="hero-title font-[family-name:var(--font-heading)] text-[3rem] sm:text-[3.8rem] lg:text-[4.6rem] font-medium leading-[1.01] tracking-tight text-dark">
                SEO Agentur für Sichtbarkeit <span style={grad}>in Google und in der KI-Suche</span>
              </h1>

              <p className="hero-description mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Wir sind die SEO Agentur, die klassische Suchmaschinenoptimierung und Generative Engine
                Optimization aus einer Hand liefert. Statt Versprechen erhalten Sie eine Methodik, die auf
                überprüfbaren Daten aufbaut und in nachvollziehbaren Prozessschritten umgesetzt wird.
              </p>

              <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#kontakt"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
                >
                  Kostenlose Erstanalyse anfordern
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  href="#leistungen"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-8 py-4 text-sm font-semibold text-dark transition-all hover:border-primary/40"
                >
                  Leistungskatalog ansehen
                </a>
              </div>

              {/* Tool-Strip statt Logos */}
              <div className="hero-description mt-12 flex flex-col gap-3.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted/70">Unser Daten-Stack</span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {DATEN_STACK.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dark/70 transition-colors hover:border-primary/40"
                    >
                      <span className="chip-dot h-1.5 w-1.5 rounded-full bg-primary" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Rechts — SerpLiveDemo */}
            <div className="w-full max-w-[420px] mx-auto lg:max-w-none lg:mx-0">
              <div className="m3d">
                <SerpLiveDemo />
              </div>
              <p className="mt-3 text-xs italic text-muted">Demo-Ansicht — keine Live-Daten.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 02 LEISTUNGS-BAND — dunkles Dual-Marquee (einziges dunkles Akzent-Band) ══ */}
      <section
        className="py-10 overflow-hidden"
        style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Row 1 — LTR: die 9 Teilleistungen als Icon-Pills */}
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #111111, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #111111, transparent)" }} />
          <div className="flex" style={{ width: "max-content", animation: "marquee-ltr 28s linear infinite", willChange: "transform" }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-4 px-3 flex-shrink-0" aria-hidden={copy === 1}>
                {BAND_ROW1.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.10] bg-white/[0.03] flex-shrink-0 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.d} />
                    </svg>
                    <span className="text-[13px] font-semibold text-white/65">{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — RTL: Zusicherungen + Zielgruppen */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #111111, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #111111, transparent)" }} />
          <div className="flex" style={{ width: "max-content", animation: "marquee-rtl 38s linear infinite", willChange: "transform" }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-3 px-3 flex-shrink-0" aria-hidden={copy === 1}>
                {BAND_ROW2.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border flex-shrink-0 whitespace-nowrap ${
                      item.accent ? "border-primary/40 bg-primary/10 text-primary" : "border-white/[0.12] bg-white/[0.04] text-white/65"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.accent ? "bg-primary" : "bg-white/30"}`} />
                    <span className="text-[13px] font-semibold tracking-[0.01em]">{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 03 INTRO — Was eine SEO Agentur wirklich leistet ══ */}
      <section className="py-20 lg:py-28 overflow-hidden" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="scroll-hidden rv-left">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Was eine SEO Agentur leistet</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
                Technik, Content, Autorität —<br />
                <span style={grad}>ein System statt Einzelteile.</span>
              </h2>
              <div className="space-y-4 text-muted leading-relaxed max-w-lg">
                <p>
                  Eine SEO Agentur übernimmt die technische, inhaltliche und strukturelle Arbeit, die nötig ist, damit
                  eine Website in Suchmaschinen gefunden und in ihrer Branche als relevant eingestuft wird. Dazu gehört
                  die nüchterne Bestandsaufnahme — Crawling-Barrieren, Indexierungsprobleme, Ladezeiten, inhaltliche
                  Lücken —, die Entwicklung einer Keyword- und Themenstrategie sowie die technische und redaktionelle
                  Umsetzung dieser Strategie über Monate hinweg. Genauso gehört der aktive Aufbau von Relevanz durch
                  Backlinks, Erwähnungen und Digital PR dazu, denn Inhalte allein reichen selten aus, wenn der
                  Wettbewerb um dieselben Suchbegriffe ebenfalls investiert und ähnliche Themen bereits gut abdeckt.
                  Wer diese Kette nicht mit einem eigenen Team in ausreichender Tiefe abdecken kann, beauftragt eine
                  Agentur — idealerweise eine, die alle Disziplinen im Zusammenspiel plant statt sie isoliert
                  abzuarbeiten, denn ein technisch perfekter Auftritt ohne passenden Content bringt ebenso wenig wie
                  brillanter Content auf einer technisch fehlerhaften Website.
                </p>
                <p>
                  Bei{" "}
                  <Link href="/" className="text-primary font-semibold hover:underline">SeoForge</Link>{" "}
                  verbinden wir klassisches SEO mit Generative Engine Optimization (GEO). Google bleibt der Kanal mit
                  dem größten Suchvolumen, gleichzeitig beantworten ChatGPT, Perplexity und Google AI Overviews einen
                  wachsenden Teil der Anfragen bereits direkt in der KI-Antwort, ohne dass ein Klick auf eine Website
                  erfolgt. Wir arbeiten mit denselben Datenquellen, die auch intern genutzt werden können — Google
                  Search Console, Semrush, Ahrefs — und ergänzen sie um eigene Prompt-Monitoring-Setups, mit denen sich
                  nachvollziehen lässt, ob und wie eine Marke in KI-generierten Antworten überhaupt vorkommt und welche
                  Konkurrenten stattdessen zitiert werden. Diese Kombination ist der Grund, warum wir uns als SEO
                  Agentur mit GEO-Kompetenz verstehen, nicht als reine Text- oder Linkagentur, die GEO nur als
                  zusätzliches Schlagwort in ihr Angebot aufnimmt.
                </p>
                <p>
                  Technisch und inhaltlich setzen wir über eine CI/CD-Infrastruktur um, wodurch Änderungen innerhalb
                  von Minuten live gehen und nicht erst nach tagelanger Abstimmung mit einer externen
                  Entwicklungsabteilung oder einem separaten Freigabeprozess. Repetitive Aufgaben — Datenaufbereitung,
                  Crawling-Auswertung, Reporting-Vorbereitung — übernehmen bei uns KI-gestützte Workflows, wodurch mehr
                  Zeit für strategische Entscheidungen bleibt statt für manuelle Fleißarbeit, die sich ebenso gut
                  automatisieren lässt. Daraus ergeben sich faire Preise bei einem festen Ansprechpartner, der
                  innerhalb von 24 Stunden antwortet, und eine Arbeitsweise, die sich an nachvollziehbaren Daten
                  orientiert statt an pauschalen Versprechen, die sich im Nachhinein nicht überprüfen lassen.
                </p>
              </div>
              {/* Mono-Faktenzeile (Graft) */}
              <div className="border-t border-border pt-5 mt-6 flex flex-wrap gap-x-8 gap-y-2">
                {["Monatlich kündbar", "Antwort < 24 h", "Monatliches Reporting"].map((f) => (
                  <span key={f} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dark/60">
                    <span className="chip-dot h-1.5 w-1.5 rounded-full bg-primary" />
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/seo-3d-werkbank.png"
                  alt="3D-Illustration einer Werkbank mit drei Werkstücken: Zahnrad für Technik, gestapelte Textblöcke für Content und Kettenglied für Autorität"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <p className="mt-3 text-xs italic text-muted">Technik, Content, Autorität — drei Werkstücke, ein Schmiedetisch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 04 WARUM 2026 — Ghost-Jahreszahl + KI-Mockup ══ */}
      <section className="relative bg-white py-24 lg:py-32 scroll-mt-20 overflow-hidden">
        <span
          className="pointer-events-none select-none absolute -top-6 right-0 font-[family-name:var(--font-heading)] font-black leading-none text-dark opacity-[0.04]"
          style={{ fontSize: "clamp(140px, 20vw, 320px)" }}
          aria-hidden="true"
        >
          2026
        </span>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="SEO im Jahr 2026"
            title={
              <>
                Sichtbar in Google —<br />
                und <span style={grad}>in der KI-Antwort.</span>
              </>
            }
            copy="Sichtbarkeit wird heute an zwei Stellen entschieden: in den klassischen Suchergebnissen und in den Quellen, aus denen KI-Systeme ihre Antworten zusammensetzen."
          />

          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">
            <div className="scroll-hidden rv-left">
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  Seit Google AI Overviews in Deutschland breiter ausgerollt wurden und Tools wie ChatGPT und
                  Perplexity zur Recherche genutzt werden, verändert sich, wie Nutzer überhaupt auf eine Website
                  gelangen. Ein Teil der Anfragen — vor allem informationelle Fragen — wird direkt in der KI-Antwort
                  beantwortet, ohne dass ein Klick auf ein Suchergebnis erfolgt. Das bedeutet nicht, dass klassisches
                  SEO an Bedeutung verliert, sondern dass Sichtbarkeit heute an zwei Stellen entschieden wird: in den
                  klassischen Suchergebnissen und in den Quellen, aus denen KI-Systeme ihre Antworten zusammensetzen.
                </p>
                <p>
                  Trotzdem bleibt Google der Kanal mit dem weitaus größten Suchvolumen und der unmittelbarsten
                  Kaufabsicht bei transaktionalen Suchanfragen, gerade im B2B-Bereich und im lokalen Geschäft. Wer
                  heute ausschließlich auf GEO setzt und klassisches SEO vernachlässigt, verliert den Kanal, über den
                  die meisten Anfragen mit konkreter Kaufabsicht laufen und über den sich Umsatz am direktesten messen
                  lässt. Wer umgekehrt nur klassisches SEO betreibt, riskiert, in den Antworten von KI-Systemen
                  schlicht nicht vorzukommen — und damit für eine Zielgruppe unsichtbar zu werden, die zunehmend über
                  Chat-Interfaces statt über die klassische Suchleiste recherchiert, insbesondere bei komplexeren,
                  erklärungsbedürftigen Fragestellungen.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Google AI Overviews reduzieren Klicks bei informationellen Suchanfragen, verändern aber nicht das Suchvolumen bei transaktionalen Anfragen.",
                  "Klar strukturierte, eindeutig beantwortete Inhalte werden sowohl von klassischen Rankingfaktoren als auch von KI-Systemen als Quelle bevorzugt.",
                  "Wer nur für Google optimiert, ignoriert einen wachsenden Anteil der Recherche, die heute über ChatGPT und Perplexity läuft.",
                ].map((k) => (
                  <div key={k} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm text-dark leading-relaxed">{k}</span>
                  </div>
                ))}
              </div>

              {/* CTA-Stufe 2: kontextuelle Vertiefung als Anker in den Katalog */}
              <a
                href="#katalog-09"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors w-fit"
              >
                Zur Teilleistung KI-SEO &amp; GEO im Leistungskatalog
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            {/* Statisches KI-Antwort-Mockup */}
            <div className="m3d">
              <div className="rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)]">
                <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">KI-Assistent · Beispielansicht</span>
                </div>
                <div className="p-6">
                  <p className="font-medium text-dark mb-4">„Wie finde ich eine SEO Agentur, die auch KI-Suche abdeckt?“</p>
                  <div className="space-y-3">
                    <p className="text-sm text-muted leading-relaxed">
                      Achten Sie auf Agenturen, die klassisches SEO und Generative Engine Optimization kombinieren und
                      beide Kanäle messbar machen.
                    </p>
                    <div className="space-y-2" aria-hidden="true">
                      <div className="h-2 rounded bg-offwhite" style={{ width: "92%" }} />
                      <div className="h-2 rounded bg-offwhite" style={{ width: "78%" }} />
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      Als Quelle zitiert wird bevorzugt, wer klar strukturierte, eindeutig beantwortete Inhalte über
                      konsistente Signale hinweg bereitstellt.
                    </p>
                    <div className="space-y-2" aria-hidden="true">
                      <div className="h-2 rounded bg-offwhite" style={{ width: "84%" }} />
                      <div className="h-2 rounded bg-offwhite" style={{ width: "56%" }} />
                    </div>
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40 mb-2.5">Quellen</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] text-dark"
                        style={{ background: "#fbf4ea", border: "1px solid #ecd3ba" }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        seoforge.de
                      </span>
                      <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1.5" aria-hidden="true">
                        <span className="h-1.5 w-14 rounded bg-offwhite" style={{ background: "#ece8e2" }} />
                      </span>
                      <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1.5" aria-hidden="true">
                        <span className="h-1.5 w-10 rounded" style={{ background: "#ece8e2" }} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs italic text-muted">Illustrative Darstellung — keine echte KI-Ausgabe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 05 LEISTUNGEN — Katalog in drei Kapiteln, voll indexierbar ══ */}
      <section id="leistungen" className="scroll-mt-20 py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Leistungskatalog"
            title={
              <>
                Neun Teilleistungen.<br />
                <span style={grad}>Ein System.</span>
              </>
            }
            copy="Jede Teilleistung greift in die nächste — geplant aus einer Hand, umgesetzt ohne Reibungsverluste zwischen Gewerken. Alle neun im Detail, voll einsehbar."
          />

          <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">
            {/* Register-Karte (sticky) */}
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <div className="rounded-2xl border border-border bg-white p-6">
                <span className="block font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45 mb-4">Leistungsverzeichnis</span>
                <nav className="divide-y divide-border/60">
                  {KATALOG_FLAT.map((l) => (
                    <a
                      key={l.nr}
                      href={`#katalog-${l.nr}`}
                      className="flex items-baseline justify-between gap-3 py-1.5 text-sm text-dark/70 hover:text-primary transition-colors"
                    >
                      <span>{l.titel}</span>
                      <span className="font-mono text-xs text-dark/40">{l.nr}</span>
                    </a>
                  ))}
                </nav>
                <p className="border-t border-border mt-4 pt-4 text-xs text-muted leading-relaxed">
                  Jede Teilleistung hat eine eigene Detailseite mit Ablauf, Umfang und Preislogik — direkt aus dem
                  Katalog verlinkt.
                </p>
              </div>
            </div>

            {/* Katalog-Dokument */}
            <div className="rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)]">
              <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
                <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">SeoForge · Leistungskatalog SEO</span>
              </div>

              {KATALOG.map((kap) => (
                <div key={kap.kapitel} className="border-b border-border last:border-b-0">
                  <div className="px-6 lg:px-7 py-3 bg-offwhite/60 border-b border-border">
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">{kap.kapitel}</span>
                  </div>
                  {kap.leistungen.map((l) => (
                    <div
                      key={l.nr}
                      id={`katalog-${l.nr}`}
                      className="scroll-hidden rv-right group relative border-b border-border last:border-b-0 transition-colors hover:bg-[#FBF8F4] scroll-mt-28"
                      style={{ transitionDelay: `${(parseInt(l.nr, 10) - 1) * 40}ms` }}
                    >
                      <span
                        className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "linear-gradient(180deg, #C2722A, #D4A853)" }}
                        aria-hidden="true"
                      />
                      <div className="grid md:grid-cols-[80px_1fr_auto] gap-4 lg:gap-6 p-6 lg:p-7 items-start">
                        <span className="font-[family-name:var(--font-heading)] text-5xl font-black text-primary/15 leading-none" aria-hidden="true">
                          {l.nr}
                        </span>
                        <div>
                          <h3 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark group-hover:text-primary transition-colors mb-2">
                            {l.titel}
                          </h3>
                          <p className="text-sm text-muted leading-relaxed">{l.text}</p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {l.chips.map((c) => (
                              <span
                                key={c}
                                className="inline-flex items-center rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/60"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span
                          className="hidden md:flex w-10 h-10 shrink-0 items-center justify-center rounded-full border border-border text-dark/40 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                          aria-hidden="true"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 06 PROZESS — Fünf Phasen als Arbeitspakete (ProzessKonsole) ══ */}
      <section id="prozess" className="scroll-mt-20 bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Unser Prozess"
            title={
              <>
                Fünf Phasen — jede mit<br />
                <span style={grad}>definiertem Ergebnis.</span>
              </>
            }
            copy="Kein Schema, das für jede Website identisch abläuft: Jede Phase endet mit einem Arbeitspaket, das Sie sehen, prüfen und hinterfragen können."
          />

          <div className="grid lg:grid-cols-[minmax(0,400px)_1fr] gap-6 lg:gap-10 items-stretch">
            {/* Phasen-Buttons */}
            <div className="flex flex-col gap-3">
              {PHASEN.map((p, i) => {
                const on = activePhase === i;
                return (
                  <div key={p.nr} className="scroll-hidden rv-left" style={{ transitionDelay: `${i * 60}ms` }}>
                    <button
                      type="button"
                      onClick={() => setActivePhase(i)}
                      onMouseEnter={() => setActivePhase(i)}
                      aria-pressed={on}
                      className="flex items-start gap-4 rounded-2xl p-5 text-left w-full cursor-pointer transition-all duration-300"
                      style={
                        on
                          ? { background: "#fff", border: "1px solid #d99a57", boxShadow: "0 18px 44px -20px rgba(194,114,42,0.25)" }
                          : { background: "transparent", border: "1px solid var(--color-border)" }
                      }
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-all duration-300"
                        style={
                          on
                            ? { background: "linear-gradient(135deg, #C2722A, #D4A853)", color: "#fff" }
                            : { background: "#fff", border: "1px solid var(--color-border)", color: "rgba(26,26,26,0.45)" }
                        }
                      >
                        {p.nr}
                      </span>
                      <span>
                        <span className="block font-bold text-dark">{p.titel}</span>
                        <span className="block text-[13px] text-muted mt-0.5">{p.kurz}</span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Arbeitspaket-Panel */}
            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="h-full rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)] flex flex-col">
                <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">
                    Arbeitspaket · Phase {PHASEN[activePhase].nr}/05
                  </span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-dark/35">Schematische Darstellung</span>
                </div>

                <div key={activePhase} className="p-7 lg:p-9 flex-1">
                  <div className="ae-in flex items-baseline gap-4 mb-4" style={{ animationDelay: "60ms" }}>
                    <span
                      className="font-[family-name:var(--font-heading)] text-6xl font-black leading-none"
                      style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    >
                      {PHASEN[activePhase].nr}
                    </span>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">{PHASEN[activePhase].titel}</h3>
                  </div>
                  <p className="ae-in text-muted leading-relaxed mb-6" style={{ animationDelay: "120ms" }}>
                    {PHASEN[activePhase].text}
                  </p>

                  <div className="divide-y divide-border border-t border-border">
                    <div className="ae-in flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 py-4" style={{ animationDelay: "210ms" }}>
                      <span className="w-28 shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted pt-1">Sie erhalten</span>
                      <span className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                          <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-sm font-medium text-dark">{PHASEN[activePhase].deliverable}</span>
                      </span>
                    </div>
                    <div className="ae-in flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 py-4" style={{ animationDelay: "300ms" }}>
                      <span className="w-28 shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted pt-1">Werkzeuge</span>
                      <span className="flex flex-wrap gap-1.5">
                        {PHASEN[activePhase].tools.map((t) => (
                          <span key={t} className="inline-flex items-center rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/60">
                            {t}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="ae-in flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 py-4" style={{ animationDelay: "390ms" }}>
                      <span className="w-28 shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-muted pt-1">Zeitfenster</span>
                      <span className="font-mono text-xs text-dark pt-1">{PHASEN[activePhase].zeit}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Volltext aller Phasen für Suchmaschinen */}
              <div className="sr-only">
                {PHASEN.map((p) => (
                  <p key={p.nr}>
                    Phase {p.nr} — {p.titel}: {p.text} Sie erhalten: {p.deliverable}. Werkzeuge: {p.tools.join(", ")}. Zeitfenster: {p.zeit}.
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 07 INHOUSE — Die ehrliche Rechnung ══ */}
      <section className="py-24 lg:py-32 overflow-hidden" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Inhouse oder Agentur?"
            title={
              <>
                Eigenes Team oder Agentur —<br />
                <span style={grad}>die ehrliche Rechnung.</span>
              </>
            }
            copy="Beide Modelle haben berechtigte Einsatzgebiete. Hier ist die nüchterne Gegenüberstellung — inklusive der Fälle, in denen Sie uns nicht brauchen."
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="scroll-hidden rv-left">
              <div className="space-y-4 text-muted leading-relaxed max-w-lg">
                <p>
                  Die Entscheidung zwischen einem eigenen SEO-Team und einer externen Agentur hängt weniger von der
                  Unternehmensgröße ab als von der Frage, wie viel Kapazität und Fachwissen dauerhaft vorgehalten
                  werden kann und soll. SEO deckt heute mindestens vier Fachbereiche ab — Technik, Content,
                  Linkbuilding und zunehmend GEO —, die selten in einer einzelnen Person vereint sind, ohne dass in
                  mindestens einem Bereich Abstriche gemacht werden.
                </p>
                <p>
                  Beide Modelle haben berechtigte Einsatzgebiete, und in der Praxis sehen wir häufig auch Mischformen,
                  bei denen ein interner Ansprechpartner mit strategischer Verantwortung eng mit einer Agentur
                  zusammenarbeitet, statt operative Aufgaben vollständig intern oder vollständig extern abzuwickeln.
                  Eine Agentur ist zusätzlich dann wertvoll, wenn eine externe, unvoreingenommene Bewertung der eigenen
                  Website gewünscht ist oder Erfahrung aus mehreren Branchen und der Zugriff auf einen eingespielten
                  Tool-Stack einen Vorteil bringen.
                </p>
              </div>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/seo-3d-waage.png"
                  alt="3D-Illustration einer Balkenwaage: eine einzelne Figur unter einem übergroßen Werkzeug-Stapel gegenüber drei Figuren mit je einem Werkzeug"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <p className="mt-3 text-xs italic text-muted">Eine Person gegen vier Disziplinen — oder ein Team mit Rollenteilung.</p>
            </div>
          </div>

          {/* Vergleichs-Tafel */}
          <div className="m3d mt-12 lg:mt-16 rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)]">
            <div className="hidden md:grid md:grid-cols-2 border-b border-border">
              <div className="flex items-center gap-2.5 px-6 py-4">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-dark/[0.06]">
                  <svg className="h-3 w-3 text-dark/40" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">Inhouse-Aufbau</span>
              </div>
              <div className="flex items-center gap-2.5 px-6 py-4 md:border-l md:border-border" style={{ background: "#fbf4ea" }}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                  <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary">Mit SeoForge</span>
              </div>
            </div>
            <div className="divide-y divide-border">
              {TAFEL.map((r) => (
                <div key={r.dim} className="grid md:grid-cols-2">
                  <div className="px-6 py-5">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-dark/35 mb-1.5">{r.dim}</span>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dark/[0.06] md:hidden">
                        <svg className="h-3 w-3 text-dark/40" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </span>
                      <p className="text-sm text-dark/55 leading-relaxed">{r.inhouse}</p>
                    </div>
                  </div>
                  <div className="px-6 py-5 md:border-l md:border-border" style={{ background: "#fbf4ea" }}>
                    <div className="flex items-start gap-3 md:mt-[26px]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 md:hidden">
                        <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <p className="text-sm text-dark font-medium leading-relaxed">{r.seoforge}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fairness-Fußnote (Graft) */}
          <div className="scroll-hidden flex items-start gap-3 mt-5 text-sm text-muted">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            </span>
            <p className="leading-relaxed">
              <span className="font-semibold text-dark">Wann Inhouse die bessere Wahl ist:</span> wenn dauerhaft Budget
              für mindestens zwei bis drei spezialisierte Vollzeitstellen vorhanden ist, SEO eng mit Produktentwicklung
              oder Redaktion verzahnt werden muss, langfristig unternehmenskritisches Wissen intern aufgebaut werden
              soll — und bereits eigene Entwicklerkapazität für die technische Umsetzung existiert. Und dazwischen? Wir
              arbeiten auch als verlängerte Werkbank interner Teams, mit einem internen Ansprechpartner für die
              Strategie und uns für die Umsetzung.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 08 ERGEBNISSE — Der Erwartungs-Korridor ══ */}
      <section id="ergebnisse" className="scroll-mt-20 bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Realistische Erwartungen"
            title={
              <>
                Was wann passiert —<br />
                <span style={grad}>ohne Schönfärberei.</span>
              </>
            }
            copy="Eine seriöse SEO Agentur verspricht keine festen Platzierungen. Wir zeigen stattdessen den Korridor, in dem sich Ergebnisse realistisch bewegen."
          />

          <div className="m3d rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)]">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
              <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">Erwartungs-Korridor · Organische Sichtbarkeit</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-dark/35">Beispiel</span>
            </div>

            <KorridorChart />

            <div className="grid gap-px bg-border border-t border-border md:grid-cols-3">
              {KORRIDOR_ZELLEN.map((z, i) => (
                <div key={z.ziffer} className="scroll-hidden rv-scale relative bg-white p-7 lg:p-8" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-[family-name:var(--font-heading)] text-6xl font-black text-primary/10 leading-none">{z.ziffer}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40">Monat</span>
                  </div>
                  <div className="font-bold text-dark mb-3">{z.titel}</div>
                  <ul className="space-y-2 mb-4">
                    {z.punkte.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-border pt-3 mt-4">
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-muted mb-1">Woran Sie es messen:</span>
                    <span className="font-mono text-xs text-dark">{z.messung}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-xs italic text-muted">Illustrative Kurve — der reale Verlauf hängt von Ausgangslage und Wettbewerb ab.</p>

          <div className="scroll-hidden rv-blur mt-8 max-w-3xl">
            <p className="text-muted leading-relaxed">
              Eine seriöse SEO Agentur verspricht keine festen Platzierungen, weil Rankingfaktoren,
              Wettbewerbsverhalten und Algorithmus-Updates außerhalb der eigenen Kontrolle liegen — niemand kann
              zusichern, wie sich ein Wettbewerber in drei Monaten verhält oder wann Google seine Bewertungslogik das
              nächste Mal anpasst. Wer feste Platzierungen oder Traffic-Zahlen garantiert, verkauft entweder ein
              Produkt, das sich nicht erfüllen lässt, oder verlässt sich auf Methoden, die kurzfristig wirken und
              mittelfristig mit einer Abstrafung durch den Suchmaschinen-Betreiber enden. Wir kommunizieren
              stattdessen, was auf Basis vorhandener Daten realistisch ist, und passen diese Einschätzung offen an,
              sobald sich neue Erkenntnisse ergeben.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 09 KOSTEN — Transparente Investition + 4 Faktor-Kacheln ══ */}
      <section id="kosten" className="scroll-mt-20 py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Kosten &amp; Investition</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-6">
                Was kostet eine<br />
                <span style={grad}>SEO Agentur?</span>
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Die Kosten für SEO hängen in erster Linie vom Wettbewerbsumfeld und der Ausgangslage der Website ab,
                nicht von einer Preisliste, die für jede Branche gleichermaßen gilt. Eine Website mit sauberer
                technischer Basis und etabliertem Content-Bestand benötigt einen anderen Ansatz als eine Website, die
                technische Altlasten aus mehreren Relaunches mitschleppt oder in einem Markt mit intensivem Wettbewerb
                um dieselben Keywords steht, in dem bereits mehrere gut aufgestellte Wettbewerber aktiv sind. Auch der
                Umfang — Anzahl der Zielseiten, Sprachen, Standorte, Produktkategorien — beeinflusst, wie viel Aufwand
                realistisch eingeplant werden muss, bevor sich erste Ergebnisse zeigen. Zur Orientierung: Eine laufende
                SEO-Betreuung beginnt bei uns in der Regel <strong className="text-dark font-semibold">ab 800 € pro Monat</strong>;
                einmalige Leistungen wie ein SEO-Audit kalkulieren wir als{" "}
                <strong className="text-dark font-semibold">separate Pakete</strong>.
              </p>
              <p className="text-muted leading-relaxed mb-7">
                Wie viel Content-Bedarf entsteht, hängt zusätzlich davon ab, wie viele Themen bereits gut abgedeckt
                sind und wie viele Seiten neu aufgebaut werden müssen, um bestehende Lücken im Vergleich zum Wettbewerb
                zu schließen. Aus diesen Gründen kalkulieren wir kein pauschales Angebot, sondern erstellen nach einer
                kostenlosen Erstanalyse ein individuelles Angebot, das sich an der tatsächlichen Ausgangslage
                orientiert statt an einem Standardpaket von der Stange. Die Abrechnung ist dabei transparent
                nachvollziehbar — Sie wissen, wofür budgetierte Leistungen eingesetzt werden und welchen Umfang sie
                haben, statt eine Pauschale ohne Aufschlüsselung zu erhalten.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:-translate-y-0.5"
                >
                  Kostenlose Ersteinschätzung
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <span className="font-mono text-xs text-muted">Konkretes Angebot nach Erstgespräch — keine versteckten Posten</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {FAKTOREN.map((f, i) => (
                <div key={f.t} className="scroll-hidden rv-scale" style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="group h-full rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-1">
                    <div className="font-mono text-[11px] tracking-[0.16em] text-dark/45 mb-4">FAKTOR 0{i + 1}</div>
                    <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {icon(f.s)}
                    </div>
                    <div className="font-bold text-dark text-sm mb-1.5">{f.t}</div>
                    <p className="text-muted text-[13px] leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10 FÜR WEN — Vier Profile mit typischem Hebel ══ */}
      <section className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,420px)_1fr] gap-10 lg:gap-16 items-center">
            <div className="scroll-hidden rv-left order-last lg:order-first">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-[0_24px_60px_-28px_rgba(26,26,26,0.22)] aspect-[4/5] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/seo-3d-podeste.png"
                  alt="3D-Illustration mit vier Podesten: Aktenkoffer, Einkaufswagen, Standort-Pin und Rakete als Symbole für vier Kundenprofile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
              <p className="mt-3 text-xs italic text-muted">Vier Profile, vier Hebel — nicht jede Website braucht dasselbe.</p>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Für wen wir arbeiten</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-8">
                Wo SEO den<br />
                <span style={grad}>größten Hebel hat.</span>
              </h2>

              <div className="grid gap-px bg-border border border-border rounded-2xl overflow-hidden sm:grid-cols-2">
                {PROFILE.map((p, i) => (
                  <div key={p.t} className="scroll-hidden rv-scale bg-white" style={{ transitionDelay: `${i * 70}ms` }}>
                    <div className="group relative h-full p-6 lg:p-7 transition-colors duration-300 hover:bg-[#FBF8F4]">
                      <span
                        className="absolute top-0 left-0 right-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                        aria-hidden="true"
                      />
                      <div className="font-mono text-[11px] tracking-[0.18em] text-dark/45 mb-3">PROFIL 0{i + 1}</div>
                      <div className="font-bold text-dark text-lg mb-2">{p.t}</div>
                      <p className="text-sm text-muted leading-relaxed">{p.d}</p>
                      <div className="mt-4 pt-3 border-t border-border">
                        <span className="block text-[11px] uppercase tracking-[0.14em] text-muted mb-1">Typischer Hebel</span>
                        <span className="font-mono text-xs text-dark">{p.hebel}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="scroll-hidden flex items-start gap-3 mt-6 text-sm text-muted">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="leading-relaxed">
                  Nicht dabei? Im Erstgespräch sagen wir Ihnen auch, wenn SEO für Ihr Modell nicht der richtige Kanal
                  ist.{" "}
                  <a href="#kontakt" className="text-primary font-semibold hover:underline">
                    Kurz anfragen
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 11 FAQ — Acht Entscheiderfragen (Sticky-Sidebar) ══ */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-5">
                Häufige Fragen
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-4">
                Was Entscheider vor der<br />
                <span style={grad}>Beauftragung wissen wollen.</span>
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Kosten, Dauer, Garantien, Zusammenarbeit — die acht Fragen, die in Erstgesprächen am häufigsten
                fallen, beantwortet ohne Kleingedrucktes.
              </p>
              <a
                href="#kontakt"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors"
              >
                Ihre Frage ist nicht dabei? Sprechen Sie uns an
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="rounded-2xl border border-border bg-white divide-y divide-border overflow-hidden">
                {faqs.map((faq, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={i}>
                      <button
                        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer transition-colors hover:bg-offwhite"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                      >
                        <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                        <svg
                          className={`w-4 h-4 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        >
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                      </button>
                      <div
                        className="grid transition-[grid-template-rows] duration-400 ease-out"
                        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-5 text-sm text-muted leading-relaxed">{faq.a}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 12 CTA-FINALE — Kostenlose Erstanalyse (dunkel, Formular) ══ */}
      <section className="bg-dark py-24 lg:py-32 scroll-mt-20" id="kontakt">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
          </div>

          <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="scroll-hidden">
              <h2 className="font-[family-name:var(--font-heading)] text-4xl text-white lg:text-5xl">
                Bereit für eine SEO Agentur, die{" "}
                <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                  mit Daten statt Versprechen
                </span>{" "}
                arbeitet?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Fordern Sie eine kostenlose Erstanalyse an und erhalten Sie eine ehrliche Einschätzung, wo Ihre
                Website heute steht und welcher Aufwand realistisch nötig ist. Innerhalb von 24 Stunden erhalten Sie
                eine Antwort von einem festen Ansprechpartner, nicht von einem Callcenter.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Kostenlose Erstanalyse Ihrer aktuellen Sichtbarkeit",
                  "Antwort innerhalb von 24 Stunden",
                  "Ehrliche Einschätzung statt pauschaler Versprechen",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <svg className="h-3 w-3 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl text-white">Jetzt Kontakt aufnehmen</h3>
                <p className="mt-1 text-sm text-white/50">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    name="name"
                    aria-label="Ihr Name"
                    placeholder="Ihr Name"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
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
                    aria-label="Ihre Website"
                    placeholder="Ihre Website"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <textarea
                    name="message"
                    rows={4}
                    aria-label="Wie können wir Ihnen helfen?"
                    placeholder="Wie können wir Ihnen helfen?"
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
                  >
                    Kostenlose Erstanalyse anfordern
                  </button>
                  <p className="text-center text-xs text-white/30">Ihre Daten werden vertraulich behandelt.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
