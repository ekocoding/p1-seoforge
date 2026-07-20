"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "@/app/components/SubpageLayout";
import Seo2026Landscape from "./Seo2026Landscape";

/* ─── Scroll-Reveal (IntersectionObserver → .scroll-visible) ──────────────── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        }),
      { threshold: 0.04, rootMargin: "0px 0px -7% 0px" }
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

/* ─── Count-Up — Zahl zählt beim Viewport-Eintritt hoch (rAF → textContent,
   quantisiert, kein Re-Render; SSR/No-JS/Reduced-Motion zeigen den Endwert) ── */
function CountUp({ to, dauer = 1400 }: { to: number; dauer?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = (0).toLocaleString("de-DE");
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        let last = -1;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dauer);
          const val = Math.round((1 - Math.pow(1 - t, 3)) * to);
          if (val !== last) {
            last = val;
            el.textContent = val.toLocaleString("de-DE");
          }
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, dauer]);
  return <span ref={ref}>{to.toLocaleString("de-DE")}</span>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ERWARTUNGS-KORRIDOR — Live-Plotter nach dem GscImpressionsChart-Muster:
   Links-nach-rechts-Reveal über clipPath-rect, glühender Scan-Punkt am
   Kurvenende während des Zeichnens, danach dezenter SMIL-Endpunkt-Puls.
   rAF setzt quantisierte Schritte direkt als DOM-Attribute — kein Re-Render.
   Die drei Monats-Zellen (1–3/3–6/6–12) aktivieren sequenziell, sobald der
   Scan ihre Zone passiert (classList auf refs, Ghost-Ziffer färbt kurz auf).
═══════════════════════════════════════════════════════════════════════════ */
const KOR_W = 640;
const KOR_H = 220;
const KOR_SEGS: [number, number][][] = [
  [[16, 184], [140, 180], [220, 168], [320, 138]],
  [[320, 138], [420, 108], [520, 78], [624, 60]],
];
const KOR_PTS: [number, number][] = (() => {
  const pts: [number, number][] = [];
  const N = 30;
  KOR_SEGS.forEach(([p0, p1, p2, p3], s) => {
    for (let i = s === 0 ? 0 : 1; i <= N; i++) {
      const t = i / N;
      const u = 1 - t;
      pts.push([
        u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
        u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
      ]);
    }
  });
  return pts;
})();
const KOR_ZONEN_X = [40, 168, 320]; // Zonen-Starts: Monat 1–3 / 3–6 / 6–12
const KOR_DRAW_MS = 3000;

function KorridorChart() {
  const ref = useRef<HTMLDivElement>(null);
  const clipRef = useRef<SVGRectElement>(null);
  const scanRef = useRef<SVGLineElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [phase, setPhase] = useState<"idle" | "drawing" | "done">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setPhase((p) => (p === "idle" ? "drawing" : p));
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Plotter: rAF → quantisierte DOM-Attribut-Updates, kein React-Re-Render */
  useEffect(() => {
    if (phase !== "drawing") return;

    const activateCell = (z: number) => {
      const c = cellRefs.current[z];
      if (c && !c.classList.contains("kz-on")) c.classList.add("kz-on", "kz-flash");
    };
    const finish = () => {
      clipRef.current?.setAttribute("width", String(KOR_W));
      [0, 1, 2].forEach(activateCell);
      setPhase("done");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / KOR_DRAW_MS);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const fIdx = eased * (KOR_PTS.length - 1);
      const i0 = Math.floor(fIdx);
      const i1 = Math.min(KOR_PTS.length - 1, i0 + 1);
      const frac = fIdx - i0;
      const x = KOR_PTS[i0][0] + (KOR_PTS[i1][0] - KOR_PTS[i0][0]) * frac;
      const y = KOR_PTS[i0][1] + (KOR_PTS[i1][1] - KOR_PTS[i0][1]) * frac;
      clipRef.current?.setAttribute("width", String(eased * KOR_W));
      scanRef.current?.setAttribute("x1", String(x));
      scanRef.current?.setAttribute("x2", String(x));
      glowRef.current?.setAttribute("cx", String(x));
      glowRef.current?.setAttribute("cy", String(y));
      dotRef.current?.setAttribute("cx", String(x));
      dotRef.current?.setAttribute("cy", String(y));
      KOR_ZONEN_X.forEach((zx, z) => {
        if (x >= zx) activateCell(z);
      });
      if (t < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  return (
    <>
      <div ref={ref} className="relative p-6 lg:p-8">
        {phase === "drawing" && (
          <span className="absolute right-6 top-4 hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Korridor wird gezeichnet …
          </span>
        )}
        <svg viewBox={`0 0 ${KOR_W} ${KOR_H}`} className="w-full h-[200px] lg:h-[220px]" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="korridorFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C2722A" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#C2722A" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="korridorGlow">
              <stop offset="0" stopColor="#D4A853" stopOpacity="0.55" />
              <stop offset="1" stopColor="#D4A853" stopOpacity="0" />
            </radialGradient>
            <clipPath id="korridorReveal">
              <rect ref={clipRef} x="0" y="0" height={KOR_H} width="0" />
            </clipPath>
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

          {/* Hauptkurve + Flächen-Gradient — vom Plotter links nach rechts aufgedeckt */}
          <g clipPath="url(#korridorReveal)">
            <path
              d="M16 184 C 140 180, 220 168, 320 138 C 420 108, 520 78, 624 60 L 624 208 L 16 208 Z"
              fill="url(#korridorFill)"
            />
            <path
              d="M16 184 C 140 180, 220 168, 320 138 C 420 108, 520 78, 624 60"
              fill="none"
              stroke="#C2722A"
              strokeWidth="3.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          {/* Live-Plotter: Scan-Linie + glühender Zeichen-Punkt (nur während drawing) */}
          {phase === "drawing" && (
            <g pointerEvents="none">
              <line ref={scanRef} x1="16" y1="16" x2="16" y2="200" stroke="#C2722A" strokeWidth="1" opacity="0.22" vectorEffect="non-scaling-stroke" />
              <circle ref={glowRef} cx="16" cy="184" r="16" fill="url(#korridorGlow)" />
              <circle ref={dotRef} cx="16" cy="184" r="4.5" fill="#fff" stroke="#C2722A" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            </g>
          )}

          {/* Endpunkt-Puls nach Abschluss (SMIL) */}
          {phase === "done" && (
            <g pointerEvents="none">
              <circle cx="624" cy="60" r="9" fill="#C2722A" opacity="0.15">
                <animate attributeName="r" values="6;11;6" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="624" cy="60" r="4.5" fill="#D4A853" stroke="#fff" strokeWidth="1.5" />
            </g>
          )}
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

        <style>{`
          @media (prefers-reduced-motion: reduce), (scripting: none) {
            #korridorReveal rect { width: ${KOR_W}px !important; }
          }
        `}</style>
      </div>

      {/* Monats-Zellen — aktivieren sequenziell synchron zum Scan-Fortschritt */}
      <div className="grid gap-px bg-border border-t border-border md:grid-cols-3">
        {KORRIDOR_ZELLEN.map((z, i) => (
          <div
            key={z.ziffer}
            ref={(el) => {
              cellRefs.current[i] = el;
            }}
            className="scroll-hidden rv-scale relative bg-white p-7 lg:p-8"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="flex items-baseline gap-2 mb-3">
              <span className="kz-ghost font-[family-name:var(--font-heading)] text-6xl font-black text-primary/10 leading-none">{z.ziffer}</span>
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
    </>
  );
}

/* ─── Leistungs-Register — Scroll-Spy über die 9 Katalog-Einträge ───────────
   IO (rootMargin −40 % oben / −50 % unten) markiert den aktiven Eintrag;
   Klick scrollt smooth (scrollIntoView block:center); Mini-Fortschritt zählt. */
function KatalogRegister() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = KATALOG_FLAT.map((l) => document.getElementById(`katalog-${l.nr}`)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = els.indexOf(e.target as HTMLElement);
          if (idx >= 0) setActive(idx);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const springe = (e: React.MouseEvent<HTMLAnchorElement>, nr: string) => {
    const el = document.getElementById(`katalog-${nr}`);
    if (!el) return; // Fallback: normaler Anker-Sprung
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <span className="block font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45 mb-4">Leistungsverzeichnis</span>
      <nav className="divide-y divide-border/60">
        {KATALOG_FLAT.map((l, i) => {
          const on = active === i;
          return (
            <a
              key={l.nr}
              href={`#katalog-${l.nr}`}
              onClick={(e) => springe(e, l.nr)}
              aria-current={on ? "true" : undefined}
              className="relative flex items-center justify-between gap-3 py-1.5 pl-3 text-sm transition-colors"
            >
              <span
                className="absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-full transition-opacity duration-300"
                style={{ background: "linear-gradient(180deg, #C2722A, #D4A853)", opacity: on ? 1 : 0 }}
                aria-hidden="true"
              />
              <span className={`transition-colors duration-300 ${on ? "font-semibold text-primary" : "text-dark/70 hover:text-primary"}`}>
                {l.titel}
              </span>
              <span
                className={`flex h-6 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold transition-all duration-300 ${
                  on ? "text-white" : "text-dark/40"
                }`}
                style={on ? { background: "linear-gradient(135deg, #C2722A, #D4A853)" } : undefined}
              >
                {l.nr}
              </span>
            </a>
          );
        })}
      </nav>
      {/* Mini-Fortschrittszeile — zählt beim Scrollen mit */}
      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4" aria-hidden="true">
        <span className="font-mono text-[11px] tracking-[0.14em] text-dark">
          {String(active + 1).padStart(2, "0")} / 09
        </span>
        <span className="relative h-[3px] flex-1 overflow-hidden rounded-full" style={{ background: "var(--color-border)" }}>
          <span
            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${((active + 1) / KATALOG_FLAT.length) * 100}%`, background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
          />
        </span>
      </div>
      <p className="mt-4 text-xs text-muted leading-relaxed">
        Jede Teilleistung hat eine eigene Detailseite mit Ablauf, Umfang und Preislogik — direkt aus dem
        Katalog verlinkt.
      </p>
    </div>
  );
}

/* ─── Daten ───────────────────────────────────────────────────────────────── */
const TOOL_BAND: { name: string; logo: string; hinweis: string }[] = [
  { name: "Semrush", logo: "/logos/semrush.svg", hinweis: "Keyword- & Wettbewerbsdaten" },
  { name: "Search Console", logo: "/logos/googlesearchconsole.svg", hinweis: "Index & Suchanfragen" },
  { name: "Google Analytics", logo: "/logos/googleanalytics.svg", hinweis: "Verhalten & Conversions" },
  { name: "Google", logo: "/logos/google.svg", hinweis: "Rankings & SERP-Features" },
  { name: "ChatGPT", logo: "/logos/openai.svg", hinweis: "KI-Antworten & Zitate" },
  { name: "Perplexity", logo: "/logos/perplexity.svg", hinweis: "KI-Suche & Quellen" },
  { name: "Gemini", logo: "/logos/gemini.svg", hinweis: "KI-Antworten" },
  { name: "Next.js", logo: "/logos/nextdotjs.svg", hinweis: "Custom-Code-Basis" },
  { name: "Vercel", logo: "/logos/vercel.svg", hinweis: "Deploy in Minuten" },
  { name: "Tailwind", logo: "/logos/tailwindcss.svg", hinweis: "Design-System" },
  { name: "WordPress", logo: "/logos/wordpress.svg", hinweis: "CMS-Projekte" },
  { name: "Shopify", logo: "/logos/shopify.svg", hinweis: "Shop-SEO" },
];

/* Intro-Dossier — die 3 Original-Absätze als nummerierte Blöcke im Katalog-Duktus */
const INTRO_BLOCKS: { kicker: string; chips: string[]; text: React.ReactNode }[] = [
  {
    kicker: "01 — Was eine SEO Agentur leistet",
    chips: ["Audit", "Strategie", "Umsetzung", "Autorität"],
    text: (
      <>
        Eine SEO Agentur übernimmt die technische, inhaltliche und strukturelle Arbeit, damit eine Website in
        Suchmaschinen gefunden wird — und in ihrer Branche als relevant gilt. Am Anfang steht die{" "}
        <strong className="text-dark font-semibold">nüchterne Bestandsaufnahme</strong>:{" "}
        <strong className="text-dark font-semibold">Crawling-Barrieren</strong>, Indexierungsprobleme,
        Ladezeiten, inhaltliche Lücken. Darauf folgt eine{" "}
        <strong className="text-dark font-semibold">Keyword- und Themenstrategie</strong>, die wir über Monate
        technisch und redaktionell umsetzen. Ebenso wichtig ist der aktive Aufbau von Relevanz durch{" "}
        <strong className="text-dark font-semibold">Backlinks, Erwähnungen und Digital PR</strong>. Denn
        Inhalte allein reichen selten, wenn der Wettbewerb um dieselben Suchbegriffe ebenfalls investiert. Wer
        diese Kette nicht mit einem eigenen Team abdecken kann, beauftragt eine SEO Agentur — idealerweise
        eine, die <strong className="text-dark font-semibold">alle Disziplinen im Zusammenspiel</strong> plant.
        Ein technisch perfekter Auftritt ohne passenden Content bringt ebenso wenig wie brillanter Content auf
        einer fehlerhaften Website.
      </>
    ),
  },
  {
    kicker: "02 — Unser Ansatz: SEO + GEO",
    chips: ["GSC", "Semrush", "Ahrefs", "Prompt-Monitoring"],
    text: (
      <>
        Bei{" "}
        <Link href="/" className="text-primary font-semibold hover:underline">SeoForge</Link>{" "}
        verbinden wir klassisches SEO mit{" "}
        <strong className="text-dark font-semibold">Generative Engine Optimization (GEO)</strong>. Google
        bleibt der Kanal mit dem größten Suchvolumen. Gleichzeitig beantworten{" "}
        <strong className="text-dark font-semibold">ChatGPT, Perplexity und Google AI Overviews</strong> immer
        mehr Anfragen direkt in der KI-Antwort — ohne Klick auf eine Website. Wir arbeiten mit denselben
        Datenquellen, die auch intern genutzt werden können:{" "}
        <strong className="text-dark font-semibold">Google Search Console, Semrush, Ahrefs</strong>. Ergänzt
        um eigene <strong className="text-dark font-semibold">Prompt-Monitoring-Setups</strong>. Damit lässt
        sich nachvollziehen, ob eine Marke in KI-Antworten vorkommt — und welche Konkurrenten stattdessen
        zitiert werden. Diese Kombination ist der Grund, warum wir uns als{" "}
        <strong className="text-dark font-semibold">SEO Agentur mit GEO-Kompetenz</strong> verstehen. Nicht
        als reine Text- oder Linkagentur, die GEO nur als Schlagwort in ihr Angebot aufnimmt.
      </>
    ),
  },
  {
    kicker: "03 — Wie wir arbeiten",
    chips: ["CI/CD", "KI-Workflows", "Antwort < 24 h"],
    text: (
      <>
        Als SEO Agentur mit DevOps im Haus setzen wir über eine{" "}
        <strong className="text-dark font-semibold">CI/CD-Infrastruktur</strong> um. Änderungen gehen{" "}
        <strong className="text-dark font-semibold">innerhalb von Minuten live</strong> — nicht erst nach
        tagelanger Abstimmung mit einer externen Entwicklungsabteilung. Repetitive Aufgaben wie
        Datenaufbereitung, Crawling-Auswertung und Reporting-Vorbereitung übernehmen bei uns{" "}
        <strong className="text-dark font-semibold">KI-gestützte Workflows</strong>. So bleibt mehr Zeit für
        strategische Entscheidungen statt für manuelle Fleißarbeit. Daraus ergeben sich{" "}
        <strong className="text-dark font-semibold">faire Preise</strong> bei einem festen Ansprechpartner,
        der <strong className="text-dark font-semibold">innerhalb von 24 Stunden</strong> antwortet. Und eine
        Arbeitsweise, die sich an nachvollziehbaren Daten orientiert — nicht an pauschalen Versprechen.
      </>
    ),
  },
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
            <Link href="/seo/audit" className="text-primary font-semibold hover:underline">SEO-Audit</Link>. Es erfasst technische
            Basis, Indexierung, Ladezeiten, Content-Qualität und Backlink-Profil systematisch — meist ergänzt um eine Analyse des
            Wettbewerbsumfelds. Aus unserer Erfahrung liegen die größten Potenziale selten dort, wo Kunden sie vermuten. Sondern in
            strukturellen Defiziten, die über Jahre gewachsen sind: fehlerhafte Kanonisierung, dünne Kategorieseiten, unklare interne
            Verlinkung. Der Audit liefert eine priorisierte Maßnahmenliste mit Aufwand-Nutzen-Einschätzung — keine reine
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
            Auf Basis von Suchvolumen, Wettbewerbsdichte und Nutzerintention entwickeln wir eine Keyword-Architektur. Sie verteilt
            Money-Keywords, Rechercheanfragen und Long-Tail-Begriffe sinnvoll auf einzelne Seiten — statt mehrere Seiten um denselben
            Begriff konkurrieren zu lassen. Diese Arbeit ist fester Bestandteil unserer{" "}
            <Link href="/seo/beratung" className="text-primary font-semibold hover:underline">SEO-Beratung</Link>. Sie entscheidet, ob
            eine Website später um zwei, drei Hauptbegriffe kämpft oder Themenautorität über ein ganzes Feld aufbaut. Ohne diese
            Vorarbeit laufen Content- und Linkbuilding-Maßnahmen häufig ins Leere. Sie zahlen dann auf die falschen Begriffe ein oder
            spielen eigene Seiten gegeneinander aus.
          </>
        ),
      },
      {
        nr: "03",
        titel: "OnPage & Technik",
        chips: ["Core Web Vitals", "CI/CD-Deployments"],
        text: (
          <>
            Die <Link href="/seo/optimierung" className="text-primary font-semibold hover:underline">SEO-Optimierung</Link> umfasst
            Meta-Daten, interne Verlinkung, strukturierte Daten und Core Web Vitals. Dazu kommt die Behebung technischer
            Crawling-Fehler, die eine Website für Suchmaschinen unnötig schwer lesbar machen. Technische Änderungen setzen wir über
            eine CI/CD-Pipeline um. Anpassungen an Templates oder Seitenstruktur sind so in Minuten live — nicht erst nach
            wochenlanger Abstimmung mit einer externen IT-Abteilung. Bei Websites mit mehreren tausend URLs entscheidet diese
            Geschwindigkeit häufig, ob Probleme in Tagen oder erst nach Monaten behoben werden.
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
            Inhalte entstehen bei uns eingebettet in eine Themenarchitektur. Sie plant Suchintention, Cluster-Struktur und interne
            Verlinkung zusammen — keine isolierten Blogartikel ohne roten Faden. Die Umsetzung übernehmen Redakteure mit
            Themenkenntnis: recherchierte, fachlich korrekte{" "}
            <Link href="/seo/texte" className="text-primary font-semibold hover:underline">SEO-Texte</Link> statt austauschbarer
            Textbausteine aus der Textbörse. Jede Seite bekommt eine klar definierte Rolle im Gesamtgefüge: als Pillar-Seite,
            unterstützender Cluster-Artikel oder transaktionale Landingpage mit konkretem Ziel. Wie diese Logik funktioniert, zeigt unser{" "}
            <Link href="/wissen/seo" className="text-primary font-semibold hover:underline">SEO-Wissensbereich</Link>.
          </>
        ),
      },
      {
        nr: "05",
        titel: "Linkbuilding & Digital PR",
        chips: ["Digital PR", "Zitierfähige Inhalte"],
        text: (
          <>
            Backlinks entstehen am nachhaltigsten aus Inhalten, die tatsächlich zitiert werden wollen: Studien, Datenauswertungen,
            fundierte Ratgeber. Deren Themen planen wir gezielt über die{" "}
            <Link href="/seo/content-strategie" className="text-primary font-semibold hover:underline">Content-Strategie</Link>, statt
            sie dem Zufall zu überlassen. Reine Linkkäufe halten wir für riskant und wenig nachhaltig. Stattdessen setzen wir auf
            Digital PR — die aktive Ansprache von Redaktionen und Fachportalen mit Inhalten, die echten Mehrwert bieten. Diese Arbeit
            braucht Geduld. Dafür liefert sie Verlinkungen, die auch nach einem Algorithmus-Update Bestand haben, weil sie auf
            redaktioneller Relevanz beruhen. Wie wir Quellen, Risikomuster und Link-Gaps prüfen, zeigt unsere Seite zur{" "}
            <Link href="/linkbuilding-agentur" className="text-primary font-semibold hover:underline">Linkbuilding Agentur</Link>.
          </>
        ),
      },
      {
        nr: "06",
        titel: "Local SEO",
        chips: ["Google Business", "Standortseiten"],
        text: (
          <>
            Für Unternehmen mit stationärem Geschäft optimieren wir Google-Business-Profile, lokale Landingpages und
            Verzeichniseinträge — abgestimmt auf Region und Zielgruppe. Lokale Rankings hängen stark von Konsistenz ab: gleiche
            Adressdaten, gleiche Kategorien, gleiche Öffnungszeiten über alle Verzeichnisse hinweg. Dieses Detail wird häufiger
            vernachlässigt als vermutet und verursacht stille Ranking-Verluste. Bei mehreren Standorten entwickeln wir eine Struktur,
            in der sich Standortseiten nicht gegenseitig kannibalisieren. Jede wird für ihre eigene Region sichtbar. Die Grundlagen
            dazu erklärt unser{" "}
            <Link href="/wissen/local-seo" className="text-primary font-semibold hover:underline">Local-SEO-Wissensbereich</Link>.
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
            Online-Shops stellen eigene Anforderungen: Kategorieseiten mit dünnem Content, Duplicate Content durch Filterkombinationen,
            austauschbare Produktseiten aus unveränderten Hersteller-Beschreibungen. Bei der{" "}
            <Link href="/branchen/seo-fuer-online-shops" className="text-primary font-semibold hover:underline">Shop-SEO</Link> arbeiten
            wir an Kategorietexten, Facettennavigation und der technischen Sauberkeit von Filter-URLs. So verpufft kein Crawling-Budget
            in irrelevanten URL-Varianten, die ohnehin nie ranken würden. Bei großen Sortimenten entscheidet diese Struktur häufiger
            über Sichtbarkeit als einzelne Produkttexte — so wichtig diese im Detail bleiben.
          </>
        ),
      },
      {
        nr: "08",
        titel: "Laufende Betreuung",
        chips: ["Monitoring", "Monatliches Reporting"],
        text: (
          <>
            SEO ist kein Projekt mit Abschlussdatum. Die meisten Mandate gehen deshalb in eine{" "}
            <Link href="/seo/betreuung" className="text-primary font-semibold hover:underline">laufende Betreuung</Link> über, sobald
            die Grundlagen stehen. Darin überwachen wir Rankings, Sichtbarkeitsindex, technische Fehler und Wettbewerbsbewegungen. Die
            Strategie passen wir an, sobald sich Suchintention, SERP-Layout oder Wettbewerberverhalten verändern. In dieser Phase zeigt
            sich der tatsächliche Wert einer SEO Agentur: Einmalige Maßnahmen ohne Nachpflege verlieren innerhalb weniger Monate an
            Wirkung.
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
            und wie eine Marke in Antworten von ChatGPT, Perplexity und Google AI Overviews auftaucht. Wir arbeiten an den Faktoren,
            die KI-Systeme als vertrauenswürdige Quelle werten: klare Struktur, eindeutige Fakten, konsistente Aussagen über
            verschiedene Quellen hinweg. Welche Signale dabei zählen, erklärt unser Ratgeber zu den{" "}
            <Link href="/wissen/ratgeber/geo-ranking-faktoren" className="text-primary font-semibold hover:underline">GEO-Ranking-Faktoren</Link>.
            Die Disziplin ist noch jung, Bewertungskriterien verschieben sich monatlich. Deshalb kommunizieren wir sie offen als
            Ergänzung zu klassischem SEO — nicht als Ersatz.
          </>
        ),
      },
    ],
  },
];

const KATALOG_FLAT = KATALOG.flatMap((k) => k.leistungen);

/* Tool-Logos für die Werkzeug-Chips (nur real vorhandene Assets) */
const TOOL_LOGOS: Record<string, string> = {
  Semrush: "/logos/semrush.svg",
  "Google Search Console": "/logos/googlesearchconsole.svg",
};

/* Prozess — 5 Phasen als Arbeitspakete (keine Roadmap-Optik) */
const PHASEN = [
  {
    nr: "01",
    titel: "Kickoff & Audit",
    kurz: "Zielsetzung, Wettbewerb und technische Ausgangslage klären.",
    text: "Jedes Mandat beginnt mit einem persönlichen Kickoff. Darin klären wir Zielsetzung, Wettbewerbsumfeld, interne Ressourcen und technische Ausgangslage. Danach folgt das vollständige SEO-Audit über alle relevanten Seitenbereiche. Erst nach dieser Bestandsaufnahme legen wir fest, welche Maßnahmen priorisiert werden — nicht vorher und nicht nach einem Schema, das für jede Website identisch abläuft.",
    deliverable: "Vollständiger SEO-Audit mit priorisierter Maßnahmenliste",
    tools: ["Google Search Console", "Screaming Frog", "Semrush"],
    zeit: "Woche 1–2",
  },
  {
    nr: "02",
    titel: "Strategie & Roadmap",
    kurz: "Meilensteine nach Aufwand und erwartetem Effekt sortiert.",
    text: "Aus den Audit-Ergebnissen entsteht eine Roadmap mit klaren Meilensteinen. Sortiert nach Aufwand und erwartetem Effekt — nicht nach Bauchgefühl oder danach, was sich am schnellsten präsentieren lässt. Diese Roadmap ist die verbindliche Arbeitsgrundlage der Zusammenarbeit. Wir passen sie an, sobald neue Daten, ein Google-Update oder verändertes Wettbewerbsverhalten die Prioritäten verschieben.",
    deliverable: "Roadmap mit klaren Meilensteinen als verbindliche Arbeitsgrundlage",
    tools: ["Semrush", "Ahrefs"],
    zeit: "Woche 2–4",
  },
  {
    nr: "03",
    titel: "Umsetzung",
    kurz: "Technik und Redaktion parallel — live über CI/CD.",
    text: "Technische und inhaltliche Maßnahmen setzen wir über unsere CI/CD-Infrastruktur um. Änderungen gehen so innerhalb von Minuten statt Wochen live — ohne Warteschlange bei der IT-Abteilung. Redaktionelle Arbeiten und technische Anpassungen laufen parallel, nicht nacheinander. Das verkürzt die Zeit bis zur ersten messbaren Wirkung spürbar.",
    deliverable: "Umgesetzte Maßnahmen — in Minuten live statt in Wochen",
    tools: ["Screaming Frog", "Google Search Console"],
    zeit: "ab Woche 4, fortlaufend",
  },
  {
    nr: "04",
    titel: "Monitoring & Reporting",
    kurz: "Sie sehen dieselben Daten, mit denen wir arbeiten.",
    text: "Rankings, organischer Traffic, Sichtbarkeitsindex und technische Kennzahlen erfassen wir fortlaufend — über Search Console, Semrush und Ahrefs. Alles fließt in ein transparentes Reporting, das Sie jederzeit einsehen können. Sie sehen dieselben Daten, mit denen wir intern arbeiten. Keine nachträglich geglättete oder ausschließlich positiv formulierte Zusammenfassung.",
    deliverable: "Transparentes Reporting — jederzeit einsehbar",
    tools: ["Google Search Console", "Semrush", "Ahrefs"],
    zeit: "monatlich, fortlaufend",
  },
  {
    nr: "05",
    titel: "Iterative Optimierung",
    kurz: "Messen, anpassen, erneut messen — über das gesamte Mandat.",
    text: "SEO-Maßnahmen wirken selten beim ersten Versuch optimal. Deshalb schärfen wir Inhalte und technische Einstellungen nach den ersten Ergebnissen nach. Hypothesen, die sich in den Daten nicht bestätigen, verwerfen wir. Diese Schleife aus Messen, Anpassen und erneutem Messen läuft über die gesamte Zusammenarbeit — nicht nur in der Anfangsphase.",
    deliverable: "Nachgeschärfte Maßnahmen auf Datenbasis — verworfene Hypothesen inklusive",
    tools: ["Google Search Console", "Semrush"],
    zeit: "fortlaufend",
  },
];

type TeamModell = "inhouse" | "hybrid" | "agentur";

const TEAM_MODELLE: { id: TeamModell; label: string; kurz: string }[] = [
  { id: "inhouse", label: "Inhouse besser", kurz: "Eigene Tiefe" },
  { id: "hybrid", label: "Hybrid", kurz: "Geteilte Stärke" },
  { id: "agentur", label: "Agentur besser", kurz: "Externe Breite" },
];

/* Inhouse vs. Agentur — qualitative Entscheidungsachsen, bewusst ohne Score */
const TAFEL: {
  dim: string;
  code: string;
  inhouse: string;
  seoforge: string;
  modelle: Record<TeamModell, string>;
}[] = [
  {
    dim: "Jahreskosten & Fixkostenrisiko",
    code: "KAPAZITÄT",
    inhouse: "Zwei bis drei spezialisierte Vollzeitstellen müssen dauerhaft finanziert werden — unabhängig von Auslastung und Projektphase.",
    seoforge: "Ein Team über alle Disziplinen, gebucht in dem Umfang, den die Aufgabe tatsächlich erfordert — monatlich kündbar.",
    modelle: {
      inhouse: "Im Vorteil, wenn mehrere SEO-Rollen bereits dauerhaft ausgelastet sind und die Stellen unabhängig von einzelnen Projekten Bestand haben sollen.",
      hybrid: "Sinnvoll, wenn Strategie und Priorisierung intern bleiben, Spezialdisziplinen oder Arbeitsspitzen aber flexibel ergänzt werden sollen.",
      agentur: "Im Vorteil, wenn noch kein spezialisiertes Team aufgebaut ist und der Bedarf zwischen Audit, Technik, Redaktion und Autoritätsaufbau schwankt.",
    },
  },
  {
    dim: "Know-how-Breite: Technik, Content, Links, GEO",
    code: "ROLLEN",
    inhouse: "Vier Fachbereiche sind selten in einer Person vereint — in mindestens einem Bereich entstehen Abstriche.",
    seoforge: "Spezialisierte Rollen für jede Disziplin, die im Zusammenspiel geplant arbeiten statt isoliert nebeneinander.",
    modelle: {
      inhouse: "Im Vorteil, wenn Technik, Redaktion, Digital PR und Analyse bereits mit klaren Zuständigkeiten im Unternehmen besetzt sind.",
      hybrid: "Sinnvoll, wenn eine interne SEO-Leitung Produkt- und Branchenwissen hält und externe Spezialisten fehlende Disziplinen abdecken.",
      agentur: "Im Vorteil, wenn mehrere Disziplinen gleichzeitig gebraucht werden, intern aber weder Rollenbreite noch fachliche Vertretung vorhanden sind.",
    },
  },
  {
    dim: "Tool-Stack & Lizenzen",
    code: "SYSTEME",
    inhouse: "Semrush, Ahrefs, Screaming Frog und Monitoring-Setups müssen einzeln lizenziert, eingerichtet und gepflegt werden.",
    seoforge: "Der komplette Daten-Stack ist Teil des Mandats — inklusive eigener Prompt-Monitoring-Setups für die KI-Suche.",
    modelle: {
      inhouse: "Im Vorteil, wenn der Stack bereits etabliert ist und das Team regelmäßig genug damit arbeitet, um Daten und Setups selbst zu pflegen.",
      hybrid: "Sinnvoll, wenn Search Console und Business-Daten intern die Wahrheit liefern, Spezialanalysen und Monitoring aber extern betrieben werden.",
      agentur: "Im Vorteil, wenn Lizenzen, Crawls und Monitoring nicht als eigene Infrastruktur aufgebaut und dauerhaft administriert werden sollen.",
    },
  },
  {
    dim: "Anlaufzeit bis Wirkung",
    code: "ANLAUF",
    inhouse: "Recruiting, Einarbeitung und Prozessaufbau kosten Monate, bevor die erste Maßnahme überhaupt live geht.",
    seoforge: "Kickoff, Audit und erste Umsetzungen starten in den ersten Wochen — Änderungen gehen über CI/CD in Minuten live.",
    modelle: {
      inhouse: "Im Vorteil, wenn Team, Prozesse und technische Zugänge schon stehen und SEO bewusst als langfristige Produktkompetenz aufgebaut wird.",
      hybrid: "Sinnvoll, wenn ein internes Team Freigaben und Implementierung beschleunigt, während die Agentur Analyse und Priorisierung sofort übernimmt.",
      agentur: "Im Vorteil, wenn Audit und operative Arbeit beginnen sollen, ohne zunächst Recruiting, Tooling und fachliche Abläufe aufzubauen.",
    },
  },
  {
    dim: "Vertretung & Kontinuität",
    code: "RESILIENZ",
    inhouse: "Kündigung oder Ausfall einer einzelnen Schlüsselperson stoppt das komplette Thema.",
    seoforge: "Ein festes Team mit dokumentierten Prozessen — Wissen hängt nicht an einer einzelnen Person.",
    modelle: {
      inhouse: "Im Vorteil, wenn Wissen dokumentiert ist, mehrere Personen vertreten können und SEO nicht an einer einzelnen Schlüsselrolle hängt.",
      hybrid: "Sinnvoll, wenn internes Produktwissen erhalten bleiben soll und ein externes Team zugleich operative Vertretung und Prozesskontinuität sichert.",
      agentur: "Im Vorteil, wenn intern keine belastbare Vertretung existiert und die Ausführung deshalb über mehrere dokumentiert arbeitende Rollen verteilt werden muss.",
    },
  },
];

const PROFILE_ICONS = [
  "M4 19.5v-11L12 4l8 4.5v11M8 19.5v-5h8v5M8 10h.01M12 10h.01M16 10h.01",
  "M4 18V8l8-4 8 4v10M8 18v-4h8v4M7 9.5h10M12 4v5.5",
  "M3 6h2l1.8 8.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6M10 20h.01M18 20h.01",
  "M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
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

/* Kosten — 4 Kostenfaktoren als kompakte Mono-Chips (Beschreibung als title-Attribut) */
const FAKTOREN = [
  {
    t: "Wettbewerbsintensität",
    d: "Je mehr Unternehmen um dieselben Keywords konkurrieren, desto mehr Aufwand ist nötig, um sich davon abzuheben.",
  },
  {
    t: "Technische Ausgangslage",
    d: "Technische Altlasten aus früheren Relaunches oder CMS-Wechseln erhöhen den Aufwand in der ersten Projektphase.",
  },
  {
    t: "Content-Umfang",
    d: "Je mehr Themen und Zielseiten abgedeckt werden müssen, desto mehr redaktionelle Kapazität wird benötigt.",
  },
  {
    t: "Standorte & Sprachversionen",
    d: "Mehrere Standorte oder Sprachversionen vervielfachen den Aufwand für lokale und internationale Optimierung.",
  },
];

/* Kosten — Preis-Logik-Tafel: 3 Zeilen, keine erfundenen Werte (800 € aus dem Bestandstext) */
const PREIS_LOGIK: { wert: React.ReactNode; titel: string; satz: string }[] = [
  {
    wert: (<>ab <CountUp to={800} /> €</>),
    titel: "Laufende SEO-Betreuung",
    satz: "Monatliches Mandat mit Monitoring, Umsetzung und Reporting.",
  },
  {
    wert: "individuell",
    titel: "Einmalprojekte & Audits",
    satz: "Nach Umfang und Ausgangslage — Festangebot nach der Analyse.",
  },
  {
    wert: "0 €",
    titel: "Kostenlose Erstanalyse",
    satz: "Der Startpunkt jeder Zusammenarbeit — unverbindlich.",
  },
];

/* Für wen — 4 Profile mit typischem Hebel */
const PROFILE: { t: string; d: React.ReactNode; hebel: string }[] = [
  {
    t: "KMU & Mittelstand",
    d: (
      <>
        Mittelständische Unternehmen profitieren meist am stärksten von einer SEO Agentur. Intern fehlt selten der Wille, aber fast
        immer die Kapazität für alle Disziplinen gleichzeitig — eine einzelne Marketingstelle kann Technik, Content und Linkbuilding
        kaum abdecken. Wir übernehmen die komplette operative Arbeit. Unsere Reportings sind auch ohne tiefes SEO-Fachwissen auf
        Geschäftsführungsebene verständlich.
      </>
    ),
    hebel: "Komplette Operative + Management-Reporting",
  },
  {
    t: "B2B-Dienstleister",
    d: (
      <>
        B2B-Unternehmen mit erklärungsbedürftigen Leistungen brauchen eher Themenautorität und Vertrauen als reine Keyword-Rankings.
        Kaufentscheidungen fallen hier selten nach dem ersten Website-Besuch — sie reifen über Wochen und mehrere Ansprechpartner
        hinweg. Wir setzen deshalb auf Content, der Fachfragen fundiert beantwortet und über den gesamten Entscheidungsprozess
        auffindbar bleibt. Für Software-Anbieter greift zusätzlich unser Ansatz für{" "}
        <Link href="/branchen/saas-seo" className="text-primary font-semibold hover:underline">SaaS-SEO</Link>.
      </>
    ),
    hebel: "Themen-Cluster + Autoritätsaufbau",
  },
  {
    t: "Online-Shops",
    d: (
      <>
        Für Online-Shops steht die technische Struktur im Vordergrund: Kategorieseiten, Filterlogik, Duplicate Content. Fehler
        schlagen sich hier direkt in entgangenem Umsatz nieder — oft ohne auf den ersten Blick erkennbare Ursache. Wir kombinieren
        technische Shop-Optimierung mit Content für Kategorie- und Ratgeberseiten. So erschließen Sie Suchvolumen jenseits der reinen
        Produktsuche.
      </>
    ),
    hebel: "Kategorie-Struktur + technisches Shop-SEO",
  },
  {
    t: "Lokale Unternehmen",
    d: (
      <>
        Unternehmen mit stationärem Geschäft profitieren von der Kombination aus lokaler Optimierung und klassischem SEO. Beide Kanäle
        bedienen unterschiedliche Suchanfragen und Phasen der Kaufentscheidung. Wir sorgen dafür, dass Standortseiten sich gegenseitig
        unterstützen, statt gegeneinander zu ranken. Wie das regional aussieht, zeigen die Seiten unserer{" "}
        <Link href="/standorte" className="text-primary font-semibold hover:underline">SEO Agentur nach Standorten</Link> — von
        Frankfurt bis Stuttgart.
      </>
    ),
    hebel: "Standortseiten + Google-Business-Profil",
  },
];

/* FAQ — 8 Entscheiderfragen */
const faqs = [
  {
    q: "Was macht eine SEO Agentur?",
    a: "Eine SEO Agentur analysiert die technische, inhaltliche und strukturelle Ausgangslage einer Website. Daraus entwickelt sie Maßnahmen, die die organische Sichtbarkeit in Suchmaschinen verbessern. Dazu gehören SEO-Audit, Keyword-Strategie, technische Optimierung, Content-Erstellung, Linkbuilding und laufendes Monitoring — meist mit regelmäßigem Reporting. Eine gute SEO Agentur bewertet zusätzlich, welche Kanäle für ein Unternehmen relevant sind: klassische Suche, KI-Suche oder beides. Sie setzt nicht pauschal dieselben Maßnahmen für jede Website um.",
  },
  {
    q: "Wie lange dauert es, bis SEO-Ergebnisse sichtbar werden?",
    a: "Erste messbare Effekte zeigen sich in der Regel nach drei bis sechs Monaten — abhängig von Wettbewerbsdichte und technischer Ausgangslage. Ein nachhaltiger Aufbau, der auch umkämpfte Haupt-Keywords einschließt, benötigt meist sechs bis zwölf Monate. Wer schnellere Versprechen hört, sollte nach den Methoden fragen. Kurzfristige Rankingsprünge über riskante Taktiken kosten mittelfristig häufig mehr, als sie bringen.",
  },
  {
    q: "Was kostet SEO?",
    a: "Die Kosten hängen von Wettbewerbsumfeld, technischer Ausgangslage, Umfang der Website und Content-Bedarf ab. Eine seriöse SEO Agentur nennt deshalb keinen Pauschalpreis. Nach einer kostenlosen Erstanalyse erstellen wir ein individuelles Angebot, das sich an der tatsächlichen Situation orientiert — nicht an einem Standardpaket. Die Abrechnung ist transparent nachvollziehbar: Sie wissen, welche Leistung wofür eingeplant ist.",
  },
  {
    q: "Gibt es eine Garantie auf Platz 1 bei Google?",
    a: "Nein — und jede Agentur, die das zusichert, sollte kritisch hinterfragt werden. Rankingfaktoren, Wettbewerbsverhalten und Algorithmus-Updates liegen außerhalb der Kontrolle einer einzelnen Agentur. Feste Platzierungen lassen sich deshalb nicht seriös garantieren, egal wie gut eine Website optimiert ist. Wir kommunizieren stattdessen, was auf Basis vorhandener Daten realistisch erreichbar ist. Verändert sich die Ausgangslage — etwa durch ein Google-Update oder neue Wettbewerber —, passen wir die Einschätzung offen an.",
  },
  {
    q: "Inhouse-Team oder SEO Agentur – was ist sinnvoller?",
    a: "Das hängt von der verfügbaren Kapazität und dem benötigten Fachwissen ab. Ein Inhouse-Team lohnt sich, wenn Budget für mehrere spezialisierte Stellen vorhanden ist und SEO eng mit Produktentwicklung oder Redaktion verzahnt werden muss. Eine SEO Agentur ist sinnvoll, wenn mehrere Disziplinen gleichzeitig abgedeckt werden müssen — ohne dafür mehrere Vollzeitstellen aufzubauen. Oder wenn eine externe, unvoreingenommene Bewertung der eigenen Website gewünscht ist.",
  },
  {
    q: "Woran erkennt man eine gute SEO Agentur?",
    a: "An nachvollziehbaren Prozessen statt vagen Versprechen. Eine gute SEO Agentur beginnt mit einem Audit und benennt konkrete Maßnahmen mit Priorisierung. Ihre Reportings zeigen dieselben Daten, mit denen intern gearbeitet wird — keine nachträglich aufbereiteten Auszüge. Vorsicht bei Agenturen, die feste Rankinggarantien geben, keine Einblicke in ihre Methoden gewähren oder nur über Linkkäufe sprechen. Auch die Reaktionszeit auf Rückfragen vor Vertragsbeginn verrät viel über die spätere Zusammenarbeit.",
  },
  {
    q: "Was ist der Unterschied zwischen SEO und GEO?",
    a: "SEO optimiert eine Website für klassische Suchmaschinen-Rankings. GEO (Generative Engine Optimization) sorgt dafür, dass eine Marke als Quelle in KI-Antworten von ChatGPT, Perplexity oder Google AI Overviews auftaucht. Beide Disziplinen überschneiden sich: Klare Struktur, belastbare Fakten und eindeutig beantwortete Fragen helfen in beiden Fällen. Sie unterscheiden sich aber in der Erfolgsmessung. SEO misst Rankings und Klicks, GEO misst Sichtbarkeit in KI-Antworten — mit eigenen Monitoring-Ansätzen und anderen Kennzahlen.",
  },
  {
    q: "Wie läuft die Zusammenarbeit mit SeoForge ab?",
    a: "Nach einem Kickoff-Gespräch folgt ein vollständiges SEO-Audit, aus dem eine priorisierte Roadmap entsteht. Die Umsetzung läuft über unsere CI/CD-Infrastruktur: Technische Änderungen gehen innerhalb von Minuten live, redaktionelle Maßnahmen laufen parallel. Fortlaufendes Monitoring bildet die Grundlage für transparentes Reporting. Auf dieser Basis passen wir die Strategie in regelmäßigen Abständen an.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function SeoAgenturClient() {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [activeDecisionDimension, setActiveDecisionDimension] = useState(0);
  const [teamModell, setTeamModell] = useState<TeamModell>("hybrid");
  const [activeProfile, setActiveProfile] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setFormStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          website: form.get("website"),
          message: form.get("message"),
          selectedServices: ["SEO Agentur – Erstanalyse"],
        }),
      });
      if (!response.ok) throw new Error("request failed");
      setFormStatus("success");
      formElement.reset();
    } catch {
      setFormStatus("error");
    }
  }

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
        @keyframes aeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .ae-in { animation: aeIn 0.4s ease both; }
        @keyframes marquee-rtl { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        @keyframes wbEq { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
        .wb-eq { transform-origin: bottom; animation: wbEq 1.6s ease-in-out infinite; }
        @keyframes wbDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .wb-dot { animation: wbDot 2.2s ease-in-out infinite; }
        .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
        .kz-ghost { transition: color 0.5s ease; }
        .kz-on .kz-ghost { color: rgba(194,114,42,0.26); }
        @keyframes kzFlash { 0% { color: rgba(194,114,42,0.10); } 40% { color: rgba(194,114,42,0.8); } 100% { color: rgba(194,114,42,0.26); } }
        .kz-flash .kz-ghost { animation: kzFlash 1s ease both; }
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .m3d { opacity: 1; transform: none; transition: none; }
          .chip-dot { animation: none; }
          .scroll-hidden.rv-left, .scroll-hidden.rv-right, .scroll-hidden.rv-scale, .scroll-hidden.rv-blur { transform: none; filter: none; transition: none; }
          .ae-in { animation: none; opacity: 1; transform: none; }
          .marquee-track { animation: none !important; }
          .wb-eq, .wb-dot { animation: none !important; }
          .kz-ghost { transition: none; }
          .kz-flash .kz-ghost { animation: none; }
        }
      `}</style>

      {/* ══ 01 HERO — Golden Circuit, minimal zentriert ══ */}
      <section className="relative overflow-hidden" style={{ background: "#161311" }}>
        <Image
          src="/images/hero-bg-circuit.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 45%, rgba(15,12,9,0.55), rgba(15,12,9,0.15) 75%)" }}
        />

        <div className="relative mx-auto w-full max-w-3xl px-6 lg:px-8 pt-24 lg:pt-32 pb-20 lg:pb-28 text-center">
          <div className="hero-badge mb-5 inline-flex items-center gap-2.5">
            <span className="h-px w-8 bg-secondary" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">SEO Agentur</span>
            <span className="h-px w-8 bg-secondary" />
          </div>

          <h1 className="hero-title font-[family-name:var(--font-heading)] text-[2.6rem] sm:text-[3.3rem] lg:text-[4rem] font-medium leading-[1.04] tracking-tight text-white">
            SEO Agentur für{" "}
            <span style={{ background: "linear-gradient(92deg, #D98A3F, #D4A853)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Google &amp; KI&#8209;Suche.
            </span>
          </h1>

          <p className="hero-description mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Suchmaschinenoptimierung und GEO aus einer Hand — datenbasiert, transparent und ohne leere
            Versprechen.
          </p>

          <div className="hero-cta mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="#kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)] transition-all hover:bg-primary-dark"
            >
              Kostenlose Erstanalyse anfordern
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-secondary"
            >
              Leistungskatalog ansehen
            </a>
          </div>

          <p className="hero-description mt-9 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
            Technischer Audit · Keyword-Roadmap · Transparentes Reporting · GEO-Monitoring
          </p>
        </div>
      </section>

      {/* ══ 02 TOOL-BAND — helles Swiss-Ticker-Band: womit wir täglich arbeiten ══ */}
      <section className="border-b-2 border-dark bg-white overflow-hidden">
        <div className="flex items-stretch">
          {/* Festes Label links — Swiss-Kante */}
          <div className="relative z-20 hidden md:flex items-center gap-2.5 shrink-0 border-r-2 border-dark bg-offwhite px-6 lg:px-8">
            <span className="wb-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-dark/60">
              Womit wir täglich arbeiten
            </span>
          </div>
          {/* Laufender Logo-Ticker */}
          <div className="marquee-wrap relative flex-1 overflow-hidden py-5">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16" style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16" style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} />
            <div className="marquee-track flex items-center" style={{ width: "max-content", animation: "marquee-rtl 42s linear infinite", willChange: "transform" }}>
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center gap-10 px-5 flex-shrink-0" aria-hidden={copy === 1}>
                  {TOOL_BAND.map((t) => (
                    <span key={t.name} className="group flex items-center gap-2.5 flex-shrink-0 whitespace-nowrap" title={t.hinweis}>
                      <Image
                        src={t.logo}
                        alt={`${t.name} Logo`}
                        width={20}
                        height={20}
                        loading="eager"
                        className="h-5 w-5 object-contain grayscale opacity-55 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                      <span className="text-[13px] font-semibold text-dark/55 transition-colors duration-300 group-hover:text-dark">{t.name}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 03 INTRO — Nummeriertes Dossier im Katalog-Duktus + Sticky-Werkbank ══ */}
      <section className="py-20 lg:py-28 overflow-x-clip" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Links — Dossier: 3 Blöcke mit Mono-Kicker, Originaltext und Chip-Zeile */}
            <div>
              <div className="scroll-hidden rv-left">
                <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Was eine SEO Agentur leistet</span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight">
                  Technik, Content, Autorität —<br />
                  <span style={grad}>ein System statt Einzelteile.</span>
                </h2>
              </div>
              <div className="mt-2 divide-y divide-border">
                {INTRO_BLOCKS.map((b, i) => (
                  <div key={b.kicker} className="scroll-hidden rv-right py-7 lg:py-8" style={{ transitionDelay: `${i * 90}ms` }}>
                    <span className="block font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45 mb-3">{b.kicker}</span>
                    <p className="text-[15px] text-muted leading-relaxed">{b.text}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {b.chips.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/50"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rechts — Werkstatt-Monitor: die drei Säulen als lebendes System, wandert beim Lesen mit */}
            <div className="scroll-hidden rv-right lg:sticky lg:top-28" style={{ transitionDelay: "120ms" }}>
              <div className="w-full max-w-[600px] overflow-hidden rounded-2xl border-2 border-dark bg-white shadow-[0_32px_70px_-30px_rgba(26,26,26,0.45)]">
                {/* Ink-Kopfleiste */}
                <div className="flex items-center justify-between bg-dark px-6 py-3.5">
                  <span className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                    <span className="wb-dot inline-block h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                    Werkstatt-Monitor
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">Drei Werkstücke · ein System</span>
                </div>
                {/* Drei Werkstück-Zeilen mit lebendem Equalizer */}
                <div className="divide-y divide-border">
                  {[
                    { t: "Technik", s: "Crawling, Ladezeit, saubere Struktur", d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.109-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z", delay: "0s" },
                    { t: "Content", s: "Seiten, die Suchanfragen beantworten", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h10.5", delay: "0.35s" },
                    { t: "Autorität", s: "Verweise, Erwähnungen, Vertrauen", d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244", delay: "0.7s" },
                  ].map((w, i) => (
                    <div key={w.t} className="group flex items-center gap-4 px-6 py-5 transition-colors duration-300 hover:bg-offwhite">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary ring-1 ring-border transition-all duration-300 group-hover:ring-primary/40" style={{ background: "#fbf4ea" }}>
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                          <path d={w.d} />
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-2.5">
                          <span className="font-mono text-[10px] tracking-[0.16em] text-dark/35">0{i + 1}</span>
                          <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">{w.t}</span>
                        </span>
                        <span className="mt-0.5 block truncate text-[13px] text-muted">{w.s}</span>
                      </span>
                      {/* lebender Equalizer — rein illustrativ, ohne Werte */}
                      <span className="flex h-7 shrink-0 items-end gap-[3px]" aria-hidden="true">
                        {[0, 1, 2, 3].map((b) => (
                          <span
                            key={b}
                            className="wb-eq w-[4px] rounded-full"
                            style={{
                              background: "linear-gradient(180deg, #D4A853, #C2722A)",
                              animationDelay: `calc(${w.delay} + ${b * 0.18}s)`,
                              height: `${8 + ((b * 5 + i * 3) % 12)}px`,
                            }}
                          />
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Fuß: echte Datenbasis mit Logos */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border bg-offwhite px-6 py-3.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-dark/40">Datenbasis im Alltag:</span>
                  {[
                    { n: "Semrush", l: "/logos/semrush.svg" },
                    { n: "Search Console", l: "/logos/googlesearchconsole.svg" },
                    { n: "Analytics", l: "/logos/googleanalytics.svg" },
                  ].map((x) => (
                    <span key={x.n} className="flex items-center gap-1.5">
                      <Image src={x.l} alt={`${x.n} Logo`} width={13} height={13} className="h-[13px] w-[13px] object-contain opacity-60" />
                      <span className="text-[11px] font-semibold text-dark/55">{x.n}</span>
                    </span>
                  ))}
                </div>
              </div>
              <figure className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl border-2 border-dark bg-dark shadow-[0_28px_65px_-30px_rgba(26,26,26,0.55)]">
                <Image
                  src="/images/seo-agentur-worktable-v2.webp"
                  alt="SEO-Agentur-Arbeit an Seitenarchitektur, Crawl-Daten und priorisierten Maßnahmen"
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" aria-hidden="true" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
                  <span>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">Arbeitsartefakt statt Kulisse</span>
                    <span className="mt-1 block font-[family-name:var(--font-heading)] text-xl font-bold">Vom Crawl zur Seitenentscheidung</span>
                  </span>
                  <span className="hidden rounded-full border border-white/30 bg-black/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/70 backdrop-blur sm:block">Analyse · Priorität · Release</span>
                </figcaption>
              </figure>
              <p className="mt-3 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40">
                <span className="h-[2px] w-5 shrink-0 self-center bg-primary/60" aria-hidden="true" />
                Drei Werkstücke, ein Schmiedetisch — nichts davon wirkt allein.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 04 SUCHLANDSCHAFT 2026 — interaktiver Dual-Channel-Atlas ══ */}
      <Seo2026Landscape />

      {/* ══ 05 LEISTUNGEN — Katalog in drei Kapiteln, voll indexierbar ══ */}
      <section id="leistungen" className="scroll-mt-20 border-t-2 border-dark py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
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
            {/* Register-Karte (sticky) — Scroll-Spy wandert beim Scrollen mit */}
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <KatalogRegister />
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
                        <span
                          className="font-[family-name:var(--font-heading)] text-5xl font-black text-primary/15 leading-none transition-colors duration-300 group-hover:text-primary/40"
                          aria-hidden="true"
                        >
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
                          <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/60">
                            {TOOL_LOGOS[t] && (
                              <Image
                                src={TOOL_LOGOS[t]}
                                alt={`${t} Logo`}
                                width={12}
                                height={12}
                                className="h-3 w-auto grayscale opacity-60"
                              />
                            )}
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
      <section id="inhouse-oder-agentur" className="scroll-mt-24 border-t-2 border-dark py-24 lg:py-32 overflow-x-clip" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Inhouse oder Agentur?"
            title={
              <>
                Eigenes Team oder SEO Agentur —<br />
                <span style={grad}>die ehrliche Rechnung.</span>
              </>
            }
            copy="Beide Modelle haben berechtigte Einsatzgebiete. Hier ist die nüchterne Gegenüberstellung — inklusive der Fälle, in denen Sie uns nicht brauchen."
          />

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.618fr)_minmax(0,1fr)] lg:gap-16">
            <div className="scroll-hidden rv-left">
              <div className="max-w-lg text-muted leading-relaxed">
                <p className="mb-4">
                  Die Entscheidung zwischen eigenem SEO-Team und externer SEO Agentur hängt weniger von der
                  Unternehmensgröße ab. Entscheidend ist, wie viel Kapazität und Fachwissen dauerhaft vorgehalten
                  werden kann und soll. SEO deckt heute mindestens vier Fachbereiche ab: Technik, Content,
                  Linkbuilding und zunehmend GEO. Diese sind selten in einer einzelnen Person vereint — in
                  mindestens einem Bereich entstehen Abstriche.
                </p>
                <p>
                  Beide Modelle haben berechtigte Einsatzgebiete. In der Praxis sehen wir häufig Mischformen: Ein
                  interner Ansprechpartner mit strategischer Verantwortung arbeitet eng mit einer Agentur zusammen.
                  Eine Agentur ist zusätzlich wertvoll, wenn eine externe, unvoreingenommene Bewertung gewünscht ist.
                  Oder wenn Erfahrung aus mehreren Branchen und ein eingespielter Tool-Stack einen Vorteil bringen.
                  Wer zunächst selbst starten will, findet in unserem Leitfaden{" "}
                  <Link href="/seo/selbst-machen" className="font-semibold text-primary-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark">
                    SEO selbst machen
                  </Link>{" "}
                  eine ehrliche Einordnung.
                </p>
              </div>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="group relative aspect-[1.618/1] w-full overflow-hidden border-2 border-dark shadow-[12px_12px_0_#D4A853] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/seo-inhouse-gespraech-v2.jpg"
                  alt="Marketing-Verantwortliche und externe Beraterin arbeiten gemeinsam am Laptop"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <p className="mt-3 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40">
                <span className="h-[2px] w-5 shrink-0 self-center bg-primary/60" aria-hidden="true" />
                Kein Entweder-oder — die beste Lösung ist oft ein Team auf Augenhöhe.
              </p>
            </div>
          </div>

          {/* Qualitatives Team-Modell statt Preisvergleichstabelle */}
          <div className="m3d mt-14 overflow-hidden border-2 border-dark bg-white shadow-[14px_14px_0_rgba(194,114,42,0.16)] lg:mt-20">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dark bg-dark px-5 py-4 text-white sm:px-7">
              <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="5" cy="12" r="2.5" /><circle cx="19" cy="6" r="2.5" /><circle cx="19" cy="18" r="2.5" />
                  <path d="m7.5 11 9-4M7.5 13l9 4" />
                </svg>
                Illustratives Entscheidungsmodell
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">Qualitativ · ohne Punktescore</span>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,0.618fr)_minmax(0,1fr)]">
              <div className="border-b-2 border-dark bg-[#F8F5F1] lg:border-b-0 lg:border-r-2">
                <div className="border-b border-dark/20 px-5 py-4 sm:px-7">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dark/45">01 — Achse wählen</span>
                </div>
                <div role="tablist" aria-label="Entscheidungsdimension auswählen">
                  {TAFEL.map((punkt, index) => {
                    const selected = activeDecisionDimension === index;
                    return (
                      <button
                        key={punkt.dim}
                        type="button"
                        role="tab"
                        id={`team-dimension-${index}`}
                        aria-selected={selected}
                        aria-controls="team-decision-panel"
                        onClick={() => setActiveDecisionDimension(index)}
                        className={`group flex w-full items-center gap-4 border-b border-dark/15 px-5 py-4 text-left transition-colors last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary-dark sm:px-7 ${selected ? "bg-white" : "hover:bg-white/65"}`}
                      >
                        <span className={`font-mono text-[10px] ${selected ? "text-primary-dark" : "text-dark/45"}`}>{String(index + 1).padStart(2, "0")}</span>
                        <span className="min-w-0 flex-1">
                          <span className={`block font-mono text-[9px] uppercase tracking-[0.16em] ${selected ? "text-primary-dark" : "text-dark/50"}`}>{punkt.code}</span>
                          <span className={`mt-0.5 block text-sm font-bold leading-snug ${selected ? "text-dark" : "text-dark/60"}`}>{punkt.dim}</span>
                        </span>
                        <svg className={`h-5 w-5 shrink-0 transition-transform ${selected ? "translate-x-0 text-primary-dark" : "-translate-x-1 text-dark/20 group-hover:translate-x-0"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M5 12h13m-5-5 5 5-5 5" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div id="team-decision-panel" role="tabpanel" aria-labelledby={`team-dimension-${activeDecisionDimension}`} className="min-w-0">
                <div className="border-b border-dark/20 px-5 py-4 sm:px-7">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dark/45">02 — Betriebsmodell prüfen</span>
                </div>
                <div className="grid grid-cols-3 border-b border-dark/20" role="tablist" aria-label="Betriebsmodell auswählen">
                  {TEAM_MODELLE.map((modell) => {
                    const selected = teamModell === modell.id;
                    return (
                      <button
                        key={modell.id}
                        type="button"
                        role="tab"
                        id={`team-model-${modell.id}`}
                        aria-selected={selected}
                        aria-controls="team-model-copy"
                        onClick={() => setTeamModell(modell.id)}
                        className={`min-w-0 border-r border-dark/15 px-2.5 py-3 text-left transition-colors last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary-dark sm:px-4 ${selected ? "bg-dark text-white" : "bg-white text-dark/65 hover:bg-[#FBF4EA]"}`}
                      >
                        <span className={`block font-mono text-[9px] uppercase tracking-[0.14em] ${selected ? "text-secondary" : "text-dark/35"}`}>{modell.kurz}</span>
                        <span className="mt-0.5 block text-xs font-bold sm:text-sm">{modell.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div id="team-model-copy" role="tabpanel" aria-labelledby={`team-model-${teamModell}`} className="px-5 py-6 sm:px-7 sm:py-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-dark/20 pb-4">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold leading-tight text-dark sm:text-3xl">
                      {TAFEL[activeDecisionDimension].dim}
                    </h3>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary-dark">{TEAM_MODELLE.find((m) => m.id === teamModell)?.label}</span>
                  </div>

                  <div className="my-5 overflow-hidden border border-dark/20 bg-[#FBF8F4]">
                    <svg viewBox="0 0 620 250" className="block h-auto w-full" aria-hidden="true">
                      <rect width="620" height="250" fill="#FBF8F4" />
                      {[75, 175].map((y) => [255, 365].map((x) => (
                        <g key={`${x}-${y}`}>
                          <line x1="108" y1="125" x2={x} y2={y} stroke="#C2722A" strokeWidth={teamModell === "inhouse" ? 2.4 : teamModell === "hybrid" ? 1.7 : 0.8} opacity={teamModell === "agentur" ? 0.18 : 0.8} />
                          <line x1="512" y1="125" x2={x} y2={y} stroke="#D4A853" strokeWidth={teamModell === "agentur" ? 2.4 : teamModell === "hybrid" ? 1.7 : 0.8} opacity={teamModell === "inhouse" ? 0.18 : 0.85} />
                        </g>
                      )))}
                      <circle cx="108" cy="125" r="42" fill={teamModell === "inhouse" || teamModell === "hybrid" ? "#C2722A" : "#F8F5F1"} stroke="#C2722A" strokeWidth="2" />
                      <circle cx="512" cy="125" r="42" fill={teamModell === "agentur" || teamModell === "hybrid" ? "#1A1A1A" : "#F8F5F1"} stroke="#1A1A1A" strokeWidth="2" />
                      <text x="108" y="121" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={teamModell === "inhouse" || teamModell === "hybrid" ? "white" : "#C2722A"}>INHOUSE</text>
                      <text x="108" y="137" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={teamModell === "inhouse" || teamModell === "hybrid" ? "rgba(255,255,255,.7)" : "#8A8178"}>KONTEXT</text>
                      <text x="512" y="121" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={teamModell === "agentur" || teamModell === "hybrid" ? "white" : "#1A1A1A"}>SEOFORGE</text>
                      <text x="512" y="137" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={teamModell === "agentur" || teamModell === "hybrid" ? "rgba(255,255,255,.62)" : "#8A8178"}>SPEZIALISTEN</text>
                      {[
                        { x: 255, y: 75, label: "TECHNIK" }, { x: 365, y: 75, label: "CONTENT" },
                        { x: 255, y: 175, label: "LINKS" }, { x: 365, y: 175, label: "GEO" },
                      ].map((node) => (
                        <g key={node.label}>
                          <rect x={node.x - 43} y={node.y - 18} width="86" height="36" fill="white" stroke="#1A1A1A" strokeWidth="1.4" />
                          <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#1A1A1A">{node.label}</text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <p className="min-h-[5.5rem] text-[15px] font-medium leading-relaxed text-dark">
                    {TAFEL[activeDecisionDimension].modelle[teamModell]}
                  </p>

                  <div className="mt-5 border-t-2 border-dark">
                    <div className="grid gap-2 border-b border-dark/15 py-4 sm:grid-cols-[120px_1fr]">
                      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-dark/40">Inhouse-Aufbau</span>
                      <p className="text-xs leading-relaxed text-dark/60">{TAFEL[activeDecisionDimension].inhouse}</p>
                    </div>
                    <div className="grid gap-2 py-4 sm:grid-cols-[120px_1fr]">
                      <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary-dark">Mit SeoForge</span>
                      <p className="text-xs font-medium leading-relaxed text-dark">{TAFEL[activeDecisionDimension].seoforge}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-dark bg-[#FBF4EA] px-5 py-5 sm:px-7">
              <p className="text-sm leading-relaxed text-dark/70">
                <span className="font-semibold text-dark">Wann Inhouse die bessere Wahl ist:</span> wenn dauerhaft Budget
                für zwei bis drei spezialisierte Vollzeitstellen vorhanden ist, SEO eng mit Produktentwicklung oder
                Redaktion verzahnt werden muss und bereits eigene Entwicklerkapazität existiert. Dazwischen arbeiten
                wir als verlängerte Werkbank interner Teams — ein interner Ansprechpartner für die Strategie, wir für die Umsetzung.
              </p>
            </div>
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
          </div>

          <p className="mt-3 text-xs italic text-muted">Illustrative Kurve — der reale Verlauf hängt von Ausgangslage und Wettbewerb ab.</p>
        </div>
      </section>

      {/* ══ 08a PRAXISBELEG — 187Vapes ══ */}
      <section id="praxisbeleg-187vapes" className="scroll-mt-24 border-y-2 border-dark bg-[#FBF4EA] py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div className="scroll-hidden rv-left">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.22em] text-primary-dark">Praxisbeleg · E-Commerce SEO</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.12] tracking-tight text-dark lg:text-[42px]">
                187Vapes: Betreuung<br />
                <span style={grad}>vom Projektstart an.</span>
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-muted">
                Bei 187Vapes arbeiten wir seit Projektbeginn an einer Shop-Struktur, die Suchintention und Sortiment
                zusammenführt: von Kategorien über Marken- und Produktcluster bis zu technischen und redaktionellen
                On-Page-Details.
              </p>
              <Link
                href="/referenzen#187vapes"
                className="mt-8 inline-flex items-center gap-3 border-2 border-dark bg-white px-5 py-3.5 font-semibold text-dark shadow-[6px_6px_0_#D4A853] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark"
              >
                Vollständigen Referenzeintrag ansehen <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="scroll-hidden rv-right overflow-hidden border-2 border-dark bg-white shadow-[12px_12px_0_rgba(194,114,42,0.22)]" style={{ transitionDelay: "110ms" }}>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dark bg-dark px-5 py-4 text-white sm:px-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">Sichtbarer E-Commerce-Case</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/50">Google DE · 20.07.2026</span>
              </div>

              <div className="grid sm:grid-cols-2">
                <div className="border-b-2 border-dark px-5 py-6 sm:border-b-0 sm:border-r-2 sm:px-7 sm:py-7">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-dark/45">Aktueller Snapshot</span>
                  <strong className="mt-3 block font-[family-name:var(--font-heading)] text-5xl font-bold leading-none text-primary-dark">#1</strong>
                  <span className="mt-2 block text-sm font-medium text-dark">für „187 vape“</span>
                </div>
                <div className="bg-[#F8F5F1] px-5 py-6 sm:px-7 sm:py-7">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-dark/45">Zusammenarbeit</span>
                  <strong className="mt-3 block font-[family-name:var(--font-heading)] text-2xl font-bold leading-tight text-dark">Seit Projektbeginn</strong>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">durch SeoForge betreut</span>
                </div>
              </div>

              <div className="border-t-2 border-dark px-5 py-6 sm:px-7">
                <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-dark">Leistungsumfang im Shop</h3>
                <ul className="mt-4 grid gap-x-6 gap-y-3 text-sm leading-relaxed text-dark/75 sm:grid-cols-2">
                  <li className="flex gap-2"><span className="text-primary-dark" aria-hidden="true">01</span><span>Shop- und Kategoriearchitektur</span></li>
                  <li className="flex gap-2"><span className="text-primary-dark" aria-hidden="true">02</span><span>Marken- und Produktcluster</span></li>
                  <li className="flex gap-2"><span className="text-primary-dark" aria-hidden="true">03</span><span>Technische On-Page-Arbeit</span></li>
                  <li className="flex gap-2"><span className="text-primary-dark" aria-hidden="true">04</span><span>Redaktionelle On-Page-Arbeit</span></li>
                </ul>
              </div>

              <p className="border-t border-white/15 bg-dark px-5 py-4 text-xs leading-relaxed text-white/65 sm:px-7">
                Die Position ist eine Momentaufnahme der Google-Suche in Deutschland, keine Rankinggarantie. Den
                Umfang der Zusammenarbeit ordnen wir im Referenzeintrag transparent ein.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 08b KLARTEXT — Ink-Statement, voll-bleed (Kontrast-Anker 1) ══ */}
      <section className="bg-dark py-24 lg:py-32 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <span className="scroll-hidden block font-mono text-[11px] tracking-[0.22em] uppercase text-secondary mb-8">
            Klartext — Garantien
          </span>
          <blockquote className="scroll-hidden rv-blur font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-[60px] font-bold leading-[1.06] tracking-tight text-white max-w-[920px]">
            Eine seriöse SEO Agentur{" "}
            <span style={{ background: "linear-gradient(92deg, #D4A853, #e0bc72)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              verspricht keine Platzierung.
            </span>{" "}
            Sie macht Ergebnisse messbar.
          </blockquote>
          <div className="scroll-hidden mt-10 grid gap-6 lg:grid-cols-2 max-w-5xl" style={{ transitionDelay: "100ms" }}>
            <p className="text-white/60 leading-relaxed">
              Rankingfaktoren, Wettbewerbsverhalten und Algorithmus-Updates liegen außerhalb der Kontrolle jeder
              SEO Agentur. Niemand kann zusichern, wie sich ein Wettbewerber in drei Monaten verhält. Oder wann
              Google seine Bewertungslogik das nächste Mal anpasst.
            </p>
            <p className="text-white/60 leading-relaxed">
              Wer feste Platzierungen oder Traffic-Zahlen garantiert, verkauft ein Produkt, das sich nicht erfüllen
              lässt. Oder er setzt auf Methoden, die kurzfristig wirken und mittelfristig mit einer Abstrafung enden.
              Wir kommunizieren, was auf Datenbasis realistisch ist — und passen die Einschätzung offen an.
            </p>
          </div>
          <div className="scroll-hidden mt-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.16em] text-white/50" style={{ transitionDelay: "160ms" }}>
            <span className="h-[2px] w-8 bg-secondary" aria-hidden="true" />
            SeoForge — SEO für Google &amp; KI-Suche
          </div>
        </div>
      </section>

      {/* ══ 09 KOSTEN — Preis-Logik-Tafel + kompakte Kostenfaktoren ══ */}
      <section id="kosten" className="scroll-mt-20 py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="scroll-hidden rv-blur">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Kosten &amp; Investition</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-6">
                Was kostet eine<br />
                <span style={grad}>SEO Agentur?</span>
              </h2>
              <p className="text-[15px] text-muted leading-relaxed mb-4">
                Die Kosten einer SEO Agentur hängen in erster Linie vom Wettbewerbsumfeld und der Ausgangslage der
                Website ab — nicht von einer Preisliste, die für jede Branche gilt. Eine Website mit sauberer Technik
                und etabliertem Content braucht einen anderen Ansatz als eine mit Altlasten aus mehreren Relaunches.
                Auch der Umfang beeinflusst den Aufwand: Zielseiten, Sprachen, Standorte, Produktkategorien. Zur
                Orientierung: Eine laufende SEO-Betreuung beginnt bei uns in der Regel{" "}
                <strong className="text-dark font-semibold">ab 800 € pro Monat</strong>. Einmalige Leistungen wie ein
                SEO-Audit kalkulieren wir als <strong className="text-dark font-semibold">separate Pakete</strong>.
              </p>
              <p className="text-[15px] text-muted leading-relaxed mb-7">
                Der Content-Bedarf hängt davon ab, wie viele Themen bereits abgedeckt sind — und wie viele Seiten neu
                entstehen müssen, um Lücken zum Wettbewerb zu schließen. Deshalb kalkulieren wir kein Pauschalangebot.
                Nach einer <strong className="text-dark font-semibold">kostenlosen Erstanalyse</strong> erstellen wir
                ein individuelles Angebot, das sich an der tatsächlichen Ausgangslage orientiert. Die Abrechnung ist{" "}
                <strong className="text-dark font-semibold">transparent</strong>: Sie wissen, wofür budgetierte
                Leistungen eingesetzt werden. Typische Preismodelle und Kostenfaktoren schlüsselt unser Ratgeber{" "}
                <Link href="/wissen/ratgeber/was-kostet-seo" className="text-primary font-semibold hover:underline">
                  Was kostet SEO?
                </Link>{" "}
                im Detail auf.
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

            {/* Rechts — Investitions-Dokument (Angebots-Optik mit Dot-Leadern + Stempel) */}
            <div className="scroll-hidden rv-scale">
              <div className="relative rotate-[-1.2deg] transition-transform duration-500 hover:rotate-0">
                <div className="overflow-hidden rounded-2xl border bg-white shadow-[0_28px_64px_-30px_rgba(26,26,26,0.28)]" style={{ borderColor: "#ecd3ba" }}>

                  <div className="flex items-center justify-between gap-4 border-b border-dashed px-7 pt-6 pb-5" style={{ borderColor: "#ecd3ba" }}>
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0" aria-hidden="true">
                        <polygon points="16,2 28,8 28,24 16,30 4,24 4,8" fill="#C2722A" />
                        <polygon points="16,7 23,11 23,21 16,25 9,21 9,11" fill="#D4A853" />
                      </svg>
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-dark/45">SeoForge · Digital Growth</span>
                        <span className="mt-0.5 block text-sm font-bold text-dark">Investitions-Übersicht</span>
                      </div>
                    </div>
                    <span className="text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-dark/35">
                      Ohne versteckte<br />Posten
                    </span>
                  </div>

                  <div className="px-7 py-1.5">
                    {PREIS_LOGIK.map((r, i) => (
                      <div key={r.titel} className="border-b border-dashed py-5 last:border-0" style={{ borderColor: "#f0e4d3" }}>
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-[10px] text-dark/35">{String(i + 1).padStart(2, "0")}</span>
                          <span className="font-bold text-dark">{r.titel}</span>
                          <span className="mx-1 flex-1 -translate-y-1 border-b border-dotted" style={{ borderColor: "#d8c9b4" }} aria-hidden="true" />
                          <span className="whitespace-nowrap font-[family-name:var(--font-heading)] text-xl font-black lg:text-[26px]" style={grad}>
                            {r.wert}
                          </span>
                        </div>
                        <p className="mt-1.5 pl-[26px] text-sm leading-relaxed text-muted">{r.satz}</p>
                      </div>
                    ))}
                  </div>

                  <div className="px-7 py-4" style={{ background: "#FBF8F4", borderTop: "1px solid #ecd3ba" }}>
                    <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-dark/40">Kalkulationsgrundlage</span>
                    <p className="text-[12px] leading-relaxed text-dark/55">
                      {FAKTOREN.map((f) => f.t).join("  ·  ")}
                    </p>
                  </div>
                </div>

                <div className="stamp-in pointer-events-none absolute -right-3 bottom-20 select-none lg:-right-5">
                  <div
                    className="rounded-lg border-[3px] border-primary px-3.5 py-1.5 font-mono text-[11px] font-black uppercase tracking-[0.18em] text-primary"
                    style={{ boxShadow: "inset 0 0 0 2px rgba(194,114,42,0.3)", background: "rgba(255,255,255,0.82)" }}
                  >
                    Monatlich kündbar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 09b TERRACOTTA-BAND — Mid-Page-CTA (Kontrast-Anker 2) ══ */}
      <section className="py-16 lg:py-20 overflow-x-clip" style={{ background: "#C2722A" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="scroll-hidden rv-left">
            <span className="block font-mono text-[11px] tracking-[0.22em] uppercase text-white/70 mb-3">Nächster Schritt</span>
            <p className="font-[family-name:var(--font-heading)] text-2xl lg:text-4xl font-bold leading-[1.1] text-white">
              Kostenlose Erstanalyse. Antwort in unter 24 Stunden. Monatlich kündbar.
            </p>
          </div>
          <a
            href="#kontakt"
            className="scroll-hidden rv-right inline-flex items-center gap-3 rounded-full bg-dark px-8 py-4 font-semibold text-white transition-colors hover:bg-[#2a2a2a] shadow-[0_18px_40px_-14px_rgba(26,26,26,0.55)]"
          >
            Erstanalyse anfordern <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ══ 10 FÜR WEN — Vier Profile mit typischem Hebel ══ */}
      <section className="overflow-x-clip border-y-2 border-dark bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden grid items-end gap-6 lg:grid-cols-[minmax(0,0.618fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.22em] text-primary-dark">Für wen wir arbeiten</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.12] text-dark lg:text-[42px]">
                Wo SEO den<br />
                <span style={grad}>größten Hebel hat.</span>
              </h2>
            </div>
            <p className="max-w-2xl leading-relaxed text-muted lg:pb-1">
              Nicht jedes Geschäftsmodell braucht dieselbe SEO-Mechanik. Der Profil-Atlas zeigt, welche Ausgangslage
              wir typischerweise vorfinden — und an welcher Stelle die Arbeit zuerst ansetzt.
            </p>
          </div>

          <div className="m3d mt-12 overflow-hidden border-2 border-dark bg-[#F8F5F1] shadow-[14px_14px_0_#D4A853] lg:mt-16">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dark bg-dark px-5 py-4 sm:px-7">
              <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M4 4h16v16H4zM4 9h16M9 4v16" />
                  <circle cx="14.5" cy="14.5" r="2.5" />
                </svg>
                Profil-Atlas · Dossier 04
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">Profil wählen · Hebel lesen</span>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,0.618fr)_minmax(0,1fr)]">
              <div className="border-b-2 border-dark bg-[#FBF4EA] lg:border-b-0 lg:border-r-2">
                <div className="border-b border-dark/20 px-5 py-4 sm:px-7">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dark/45">Index · vier Ausgangslagen</span>
                </div>
                <div role="tablist" aria-label="Unternehmensprofil auswählen" aria-orientation="vertical">
                  {PROFILE.map((profil, index) => {
                    const selected = activeProfile === index;
                    return (
                      <button
                        key={profil.t}
                        type="button"
                        role="tab"
                        id={`profile-tab-${index}`}
                        aria-selected={selected}
                        aria-controls="profile-atlas-panel"
                        onClick={() => setActiveProfile(index)}
                        className={`group flex w-full items-center gap-4 border-b border-dark/15 px-5 py-5 text-left transition-colors last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary-dark sm:px-7 ${selected ? "bg-dark text-white" : "text-dark hover:bg-white"}`}
                      >
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center border ${selected ? "border-secondary text-secondary" : "border-dark/25 text-primary-dark"}`}>
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d={PROFILE_ICONS[index]} />
                          </svg>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block font-mono text-[9px] uppercase tracking-[0.16em] ${selected ? "text-secondary" : "text-dark/35"}`}>Profil {String(index + 1).padStart(2, "0")}</span>
                          <span className="mt-0.5 block font-[family-name:var(--font-heading)] text-lg font-bold leading-tight">{profil.t}</span>
                        </span>
                        <svg className={`h-5 w-5 shrink-0 transition-transform ${selected ? "translate-x-0 text-secondary" : "-translate-x-1 text-dark/20 group-hover:translate-x-0"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M5 12h13m-5-5 5 5-5 5" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div id="profile-atlas-panel" role="tabpanel" aria-labelledby={`profile-tab-${activeProfile}`} className="min-w-0 bg-white">
                <div className="grid min-h-full sm:grid-cols-[minmax(0,0.618fr)_minmax(0,1fr)]">
                  <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden border-b-2 border-dark bg-[#F8F5F1] sm:min-h-[520px] sm:border-b-0 sm:border-r-2">
                    <svg className="absolute inset-0 h-full w-full text-dark/[0.12]" viewBox="0 0 380 540" fill="none" aria-hidden="true">
                      <path d="M24 48h332v444H24z" stroke="currentColor" />
                      <path d="M24 222h332M152 48v444" stroke="currentColor" />
                      <path d="M152 222c0-96 76-174 170-174M152 222c94 0 170 78 170 174M152 222c0 72-57 130-128 130" stroke="#C2722A" strokeWidth="1.5" />
                      <circle cx="152" cy="222" r="5" fill="#D4A853" stroke="none" />
                    </svg>
                    <span className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[0.17em] text-dark/35">Hebel-Karte / {String(activeProfile + 1).padStart(2, "0")}</span>
                    <span className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-[0.17em] text-dark/35">1 : 1.618</span>
                    <div className="relative flex h-32 w-32 items-center justify-center border-2 border-dark bg-white text-primary shadow-[8px_8px_0_#D4A853] sm:h-40 sm:w-40">
                      <svg className="h-16 w-16 sm:h-20 sm:w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={PROFILE_ICONS[activeProfile]} />
                      </svg>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col">
                    <div className="border-b border-dark/20 px-5 py-4 sm:px-7">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">Aktives Dossier · {String(activeProfile + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="flex flex-1 flex-col px-5 py-7 sm:px-7 sm:py-9">
                      <h3 className="font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-dark lg:text-[38px]">
                        {PROFILE[activeProfile].t}
                      </h3>
                      <div className="mt-5 border-t-2 border-dark pt-5 text-[15px] leading-relaxed text-muted">
                        {PROFILE[activeProfile].d}
                      </div>
                      <div className="mt-auto pt-8">
                        <div className="border-y border-dark py-4">
                          <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-dark/40">Typischer Hebel</span>
                          <span className="font-[family-name:var(--font-heading)] text-xl font-bold leading-tight text-dark">{PROFILE[activeProfile].hebel}</span>
                        </div>
                        <a href="#kontakt" className="group mt-6 inline-flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark">
                          Passung ehrlich prüfen
                          <span className="flex h-8 w-8 items-center justify-center border border-primary-dark transition-colors group-hover:bg-primary-dark group-hover:text-white" aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-hidden rv-blur mt-6 grid items-start gap-4 border-l-2 border-primary pl-5 text-sm text-muted sm:grid-cols-[auto_1fr]">
            <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-primary-dark">Kanal-Fit</span>
            <p className="leading-relaxed">
              Nicht dabei? Im Erstgespräch sagen wir Ihnen auch, wenn SEO für Ihr Modell nicht der richtige Kanal ist.{" "}
              <a href="#kontakt" className="font-semibold text-primary-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark">Kurz anfragen</a>
            </p>
          </div>

          {/* Alle Inhalte und kontextuellen Links bleiben unabhängig vom aktiven Tab zugänglich. */}
          <div className="sr-only">
            <h3>Alle Unternehmensprofile im Überblick</h3>
            {PROFILE.map((profil) => (
              <section key={profil.t}>
                <h4>{profil.t}</h4>
                <div>{profil.d}</div>
                <p>Typischer Hebel: {profil.hebel}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11 FAQ — Acht Entscheiderfragen (Sticky-Sidebar) ══ */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
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
            <div className="scroll-hidden rv-left">
              <h2 className="font-[family-name:var(--font-heading)] text-4xl text-white lg:text-5xl">
                Bereit für eine SEO Agentur, die{" "}
                <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                  mit Daten statt Versprechen
                </span>{" "}
                arbeitet?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Fordern Sie eine kostenlose Erstanalyse an. Sie erhalten eine ehrliche Einschätzung, wo Ihre Website
                heute steht und welcher Aufwand realistisch nötig ist. Die Antwort kommt innerhalb von 24 Stunden —
                von einem festen Ansprechpartner, nicht von einem Callcenter.
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
                <form className="mt-6 space-y-4" onSubmit={handleContactSubmit}>
                  <input
                    type="text"
                    name="name"
                    required
                    aria-label="Ihr Name"
                    placeholder="Ihr Name"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <input
                    type="email"
                    name="email"
                    required
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
                    disabled={formStatus === "sending" || formStatus === "success"}
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {formStatus === "sending" ? "Anfrage wird gesendet …" : formStatus === "success" ? "Anfrage ist angekommen" : "Kostenlose Erstanalyse anfordern"}
                  </button>
                  {formStatus === "success" && <p className="text-center text-sm font-semibold text-emerald-300" role="status">Danke – wir melden uns innerhalb von 24 Stunden.</p>}
                  {formStatus === "error" && <p className="text-center text-sm text-red-300" role="alert">Das Senden hat nicht funktioniert. Bitte nutzen Sie die Kontaktseite.</p>}
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
