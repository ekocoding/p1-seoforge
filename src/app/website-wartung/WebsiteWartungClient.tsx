"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
   WARTUNGS-COCKPIT — Interaktions-Höhepunkt 1/2 (Hero, volle Breite)
   Story beim Laden (500 ms Delay + IO-Fallback, einmalig, kein Loop):
   (a) Verfügbarkeits-Kurve zeichnet sich links → rechts (clipPath-rect,
       rAF quantisiert auf ~36 Schritte, DOM-Attribute per Ref), glimmender
       Scan-Punkt am Kurvenende, (b) 4 Protokoll-Zeilen ticken gestaffelt
       ein, Check-Chips poppen nach, (c) Status wechselt auf „Alle Checks
       bestanden" + dezenter SMIL-Endpunkt-Puls. SSR/No-JS/Reduced-Motion
   rendern den kompletten Endzustand — alle Texte bleiben im DOM.
═══════════════════════════════════════════════════════════════════════════ */
const WC_W = 560;
const WC_H = 160;
const WC_PTS: [number, number][] = [
  [12, 52], [60, 50], [108, 54], [156, 48], [204, 52], [252, 46],
  [300, 50], [348, 44], [396, 48], [444, 40], [492, 44], [548, 38],
];
const WC_LINE = WC_PTS.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
const WC_AREA = `${WC_LINE} L548 140 L12 140 Z`;

function wcPosAt(p: number): [number, number] {
  const x = 12 + p * 536;
  for (let i = 0; i < WC_PTS.length - 1; i++) {
    const [x0, y0] = WC_PTS[i];
    const [x1, y1] = WC_PTS[i + 1];
    if (x <= x1) {
      const f = (x - x0) / (x1 - x0);
      return [x, y0 + f * (y1 - y0)];
    }
  }
  return WC_PTS[WC_PTS.length - 1];
}

const WC_FEED = [
  { zeit: "02:47", text: "Backup erstellt und verschlüsselt abgelegt" },
  { zeit: "03:10", text: "3 Plugin-Updates auf Staging getestet, dann eingespielt" },
  { zeit: "03:22", text: "Malware-Scan abgeschlossen: keine Funde" },
  { zeit: "06:00", text: "Core Web Vitals geprüft: im Zielbereich" },
];

const WC_FACTS = [
  {
    k: "Backups",
    v: "täglich",
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  },
  {
    k: "Updates",
    v: "via Staging getestet",
    d: "M4 4v6h6M20 20v-6h-6M20 10a8 8 0 0 0-14.3-3.7L4 8M4 14a8 8 0 0 0 14.3 3.7L20 16",
  },
  {
    k: "Antwort",
    v: "unter 24 h",
    d: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M12 8v4l3 2",
  },
];

type CockpitPhase = "static" | "armed" | "sparkline" | "feed" | "done";

function WartungsCockpit() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<SVGRectElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [phase, setPhase] = useState<CockpitPhase>("static");

  /* Armieren: 500 ms nach Mount (above the fold) + IO threshold 0.3 als Fallback */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("armed");
    const start = () => setPhase((p) => (p === "armed" ? "sparkline" : p));
    const t = setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) start();
    }, 500);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);

  /* (a) Kurve zeichnen — rAF, quantisiert, Attribute direkt am DOM */
  useEffect(() => {
    if (phase !== "sparkline") return;
    const startT = performance.now();
    let raf = 0;
    let last = -1;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startT) / 1600);
      const step = Math.round((1 - Math.pow(1 - t, 2)) * 36);
      if (step !== last) {
        last = step;
        const p = step / 36;
        const [x, y] = wcPosAt(p);
        clipRef.current?.setAttribute("width", String(p * WC_W));
        glowRef.current?.setAttribute("cx", String(x));
        glowRef.current?.setAttribute("cy", String(y));
        dotRef.current?.setAttribute("cx", String(x));
        dotRef.current?.setAttribute("cy", String(y));
      }
      if (t < 1) raf = requestAnimationFrame(tick);
      else setPhase("feed");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  /* (b) → (c): nach der letzten Feed-Zeile (+400 ms) in den Ruhezustand */
  useEffect(() => {
    if (phase !== "feed") return;
    const t = setTimeout(() => setPhase("done"), 2150);
    return () => clearTimeout(t);
  }, [phase]);

  const hidden = phase === "armed" || phase === "sparkline";
  const ticking = phase === "feed";
  const running = phase === "armed" || phase === "sparkline" || phase === "feed";

  return (
    <div
      ref={wrapRef}
      className="rounded-3xl border border-border bg-white overflow-hidden shadow-[0_28px_70px_-26px_rgba(26,26,26,0.28)]"
    >
      {/* Fake-App-Header */}
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#C2722A" }} />
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">SeoForge · Wartungs-Cockpit</span>
        <span className="ml-auto flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em]" aria-hidden="true">
            {running ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary">Wartungslauf aktiv …</span>
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#2DA44E" }} />
                <span className="text-dark/45">Alle Checks bestanden</span>
              </>
            )}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dark/35">Beispielansicht</span>
        </span>
      </div>

      {/* Body: Verfügbarkeits-Kurve + Protokoll-Feed */}
      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-px bg-border">
        <div className="bg-white p-5 lg:p-6">
          <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40 mb-3">
            Verfügbarkeit · Beispielmonat
          </span>
          <svg viewBox={`0 0 ${WC_W} ${WC_H}`} className="w-full h-[150px] lg:h-[175px]" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="wwCockFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C2722A" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#C2722A" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="wwCockGlow">
                <stop offset="0" stopColor="#D4A853" stopOpacity="0.55" />
                <stop offset="1" stopColor="#D4A853" stopOpacity="0" />
              </radialGradient>
              <clipPath id="wwCockpitClip">
                <rect ref={clipRef} x="0" y="0" height={WC_H} width={hidden ? 0 : WC_W} />
              </clipPath>
            </defs>

            {/* Referenz-Grundlinie */}
            <line x1="12" y1="140" x2="548" y2="140" stroke="#cfc9c1" strokeWidth="2" strokeLinecap="round" />

            {/* Kurve + Flächen-Gradient — vom Plotter aufgedeckt */}
            <g clipPath="url(#wwCockpitClip)">
              <path d={WC_AREA} fill="url(#wwCockFill)" />
              <path d={WC_LINE} fill="none" stroke="#C2722A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Scan-Punkt während des Zeichnens */}
            {phase === "sparkline" && (
              <g pointerEvents="none">
                <circle ref={glowRef} cx="12" cy="52" r="14" fill="url(#wwCockGlow)" />
                <circle ref={dotRef} cx="12" cy="52" r="4" fill="#fff" stroke="#C2722A" strokeWidth="2.5" />
              </g>
            )}

            {/* Ruhiger Endpunkt-Puls nach Abschluss (kein Loop der Story) */}
            {(phase === "done" || phase === "static") && (
              <g pointerEvents="none">
                <circle cx="548" cy="38" r="9" fill="#C2722A" opacity="0.15">
                  {phase === "done" && <animate attributeName="r" values="6;11;6" dur="2.4s" repeatCount="indefinite" />}
                </circle>
                <circle cx="548" cy="38" r="4.5" fill="#D4A853" stroke="#fff" strokeWidth="1.5" />
              </g>
            )}
          </svg>
        </div>

        <div className="bg-white p-5 lg:p-6">
          <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40 mb-1.5">
            Letzte Wartungsläufe
          </span>
          <div className="divide-y divide-border">
            {WC_FEED.map((z, i) => (
              <div
                key={z.zeit}
                className={`flex items-start gap-3 py-3 ${ticking ? "wc-line" : ""}`}
                style={ticking ? { animationDelay: `${i * 450}ms` } : hidden ? { opacity: 0 } : undefined}
              >
                <span className="w-12 shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-dark/40">{z.zeit}</span>
                <span className="flex-1 text-sm text-dark leading-snug">{z.text}</span>
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${ticking ? "wc-chip" : ""}`}
                  style={{
                    background: "#E9F6EC",
                    ...(ticking ? { animationDelay: `${i * 450 + 80}ms` } : hidden ? { opacity: 0 } : undefined),
                  }}
                >
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="#1A7F37" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fußleiste — nur Bestandsfakten */}
      <div className="grid sm:grid-cols-3 gap-px bg-border border-t border-border">
        {WC_FACTS.map((f) => (
          <div key={f.k} className="bg-white p-4 lg:p-5 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5" aria-hidden="true">
                <path d={f.d} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-dark/45">{f.k}</span>
              <span className="block text-sm font-bold text-dark">{f.v}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Wartungs-Katalog: Register mit Scroll-Spy (IO −40 %/−50 %) ──────────── */
const REGISTER = [
  { nr: "01", titel: "Updates & Patches" },
  { nr: "02", titel: "Security-Monitoring" },
  { nr: "03", titel: "Backups" },
  { nr: "04", titel: "Uptime-Monitoring" },
  { nr: "05", titel: "Performance & CWV" },
  { nr: "06", titel: "Inhalts-Pflege" },
  { nr: "07", titel: "WordPress-Wartung" },
];

function KatalogRegister() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = REGISTER.map((l) => document.getElementById(`katalog-${l.nr}`)).filter(
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
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <span className="block font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45 mb-4">Leistungsverzeichnis</span>
      <nav className="divide-y divide-border/60">
        {REGISTER.map((l, i) => {
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
      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4" aria-hidden="true">
        <span className="font-mono text-[11px] tracking-[0.14em] text-dark">
          {String(active + 1).padStart(2, "0")} / 07
        </span>
        <span className="relative h-[3px] flex-1 overflow-hidden rounded-full" style={{ background: "var(--color-border)" }}>
          <span
            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${((active + 1) / REGISTER.length) * 100}%`, background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
          />
        </span>
      </div>
      <p className="mt-4 text-xs text-muted leading-relaxed">
        Welche Teilleistung in welchem Paket steckt, sehen Sie unten in den{" "}
        <a href="#pakete" className="text-primary font-semibold hover:underline">Wartungspaketen</a>.
      </p>
    </div>
  );
}

/* ─── Daten: dunkles Akzentband ───────────────────────────────────────────── */
const BAND_ROW1 = [
  { label: "Updates & Sicherheits-Patches", d: "M4 4v6h6M20 20v-6h-6M20 10a8 8 0 0 0-14.3-3.7L4 8M4 14a8 8 0 0 0 14.3 3.7L20 16" },
  { label: "Tägliche Backups", d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" },
  { label: "Security-Monitoring", d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { label: "Performance & Core Web Vitals", d: "M13 10V3L4 14h7v7l9-11h-7z" },
  { label: "Uptime-Monitoring 24/7", d: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M12 8v4l3 2" },
  { label: "Inhalts-Pflege", d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" },
  { label: "WordPress-Wartung", d: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" },
];

const BAND_ROW2 = [
  { label: "Festpreis pro Monat", accent: false },
  { label: "Monatlich kündbar", accent: true },
  { label: "Monats-Report", accent: false },
  { label: "Antwort < 24 h", accent: true },
  { label: "Backups 7–90 Tage", accent: false },
  { label: "Staging-Tests vor jedem Update", accent: true },
  { label: "Kein Mindestvertrag", accent: false },
];

/* ─── Intro-Dossier — 3 nummerierte Blöcke ────────────────────────────────── */
const INTRO_BLOCKS: { kicker: string; chips: string[]; text: React.ReactNode }[] = [
  {
    kicker: "01 — Jede Komponente hat einen Lebenszyklus",
    chips: ["Core-Updates", "PHP-Lebenszyklus", "SSL"],
    text: (
      <>
        Jede Woche ohne Wartung vergrößert die{" "}
        <strong className="text-dark font-semibold">Angriffsfläche</strong> Ihrer Website. CMS-Kerne, Plugins und
        Themes bekommen laufend Sicherheitsupdates. Meist reagieren die Hersteller damit auf eine konkrete,
        öffentlich dokumentierte Schwachstelle. Wer ein solches Update monatelang liegen lässt, betreibt eine
        Website mit einer <strong className="text-dark font-semibold">bekannten, nachlesbaren Lücke</strong>.
        Automatisierte Scanner finden sie binnen weniger Tage. Eine Ebene tiefer gilt dasselbe: Viele Websites
        laufen auf <strong className="text-dark font-semibold">PHP-Versionen</strong> ohne Sicherheitsupdates.
        Auch <strong className="text-dark font-semibold">SSL-Zertifikate</strong> und Verschlüsselungsstandards
        altern mit jeder Browser-Generation. Ist der Unterbau grundlegend veraltet, hilft keine Wartung mehr.
        Dann ist ein Relaunch die ehrliche Antwort — auch das sagen wir offen.
      </>
    ),
  },
  {
    kicker: "02 — Unser Betriebsmodell",
    chips: ["Staging", "Offsite-Backup", "Monats-Report"],
    text: (
      <>
        Website-Wartung ist bei uns ein <strong className="text-dark font-semibold">Betriebsmodell</strong>,
        kein Notdienst. Updates gehen erst live, nachdem sie auf einer{" "}
        <strong className="text-dark font-semibold">Staging-Umgebung</strong> getestet wurden. Backups laufen{" "}
        <strong className="text-dark font-semibold">täglich, verschlüsselt und offsite</strong>. Ein fester
        Rhythmus aus Security- und Performance-Checks wird lückenlos dokumentiert. Parallel dazu verliert jede
        Website mit der Zeit an Tempo, auch wenn sich äußerlich nichts verändert: Die Bild-Bibliothek wächst,
        Plugins stapeln sich, der Datenbank-Overhead nimmt zu. Oft bleiben Plugins aktiv, die niemand mehr
        braucht — sie kosten trotzdem Ladezeit. Ein{" "}
        <strong className="text-dark font-semibold">monatlicher Performance-Check</strong> stoppt diesen
        schleichenden Verfall. Er findet einzelne Ursachen, bevor sie sich häufen.
      </>
    ),
  },
  {
    kicker: "03 — Ein Ansprechpartner, ein Protokoll",
    chips: ["< 24 h", "Monatlich kündbar"],
    text: (
      <>
        Google bewertet Sicherheit, Ladezeit und technische Stabilität direkt oder indirekt in den{" "}
        <strong className="text-dark font-semibold">Rankings</strong>. Dieser Rückgang verläuft über Monate
        statt über Nacht. Intern wird er deshalb oft dem Wettbewerb oder der Saison zugeschrieben. Als{" "}
        <Link href="/seo-agentur" className="text-primary font-semibold hover:underline">SEO-Agentur</Link>, die
        Suchmaschinenoptimierung, GEO und technische Wartung unter einem Dach anbietet, sieht{" "}
        <Link href="/" className="text-primary font-semibold hover:underline">SeoForge</Link> diesen
        Zusammenhang täglich in eigenen Projekten: Technische Vernachlässigung und sinkende Rankings treten
        praktisch immer gemeinsam auf. Deshalb bekommen Sie bei uns beides in einer Hand. Ein{" "}
        <strong className="text-dark font-semibold">fester Ansprechpartner</strong> antwortet in unter{" "}
        <strong className="text-dark font-semibold">24 Stunden</strong>. Sie erhalten ein monatliches Protokoll
        statt einer Blackbox — und einen Vertrag, der{" "}
        <strong className="text-dark font-semibold">monatlich kündbar</strong> bleibt.
      </>
    ),
  },
];

/* ─── Risiko-Bilanz — 4 Zellen, nur qualitative Folgen ────────────────────── */
const RISIKEN = [
  {
    nr: "01",
    titel: "Malware & Hack",
    text: "Jedes ungepatchte Plugin und jede veraltete CMS-Version ist eine dokumentierte Schwachstelle. Automatisierte Scanner durchsuchen das Web systematisch nach genau solchen Versionsständen. Verwundbare Websites finden sie oft wenige Tage nach Bekanntwerden der Lücke.",
    massnahme: "Patch-Zyklus + Security-Monitoring",
  },
  {
    nr: "02",
    titel: "Datenverlust",
    text: "Ohne aktuelle, geprüfte Sicherung dauert die Behebung eines Hacks Tage statt Minuten. Der Betrieb steht so lange still. Viele Backups existieren nur auf dem Papier: Sie wurden nie zurückgespielt — und versagen genau dann, wenn sie gebraucht werden.",
    massnahme: "Tägliche Offsite-Backups",
  },
  {
    nr: "03",
    titel: "Google-Blacklisting",
    text: "Markiert Google eine kompromittierte Website als unsicher, erscheint die Warnung direkt in der Suche und im Browser. Besucher sehen sie, bevor sie eine einzige Seite geöffnet haben. Rankings und Vertrauen brechen gleichzeitig ein — und erholen sich nur langsam.",
    massnahme: "Malware-Scan + Sofort-Alert",
  },
  {
    nr: "04",
    titel: "Performance-Verfall",
    text: "Ladezeiten steigen selten über Nacht. Sie kriechen über Monate nach oben, während Core Web Vitals wie LCP und INP ins Rote rutschen. Google-Rankings und Conversion reagieren spürbar — oft lange bevor jemand im Unternehmen den Zusammenhang bemerkt.",
    massnahme: "Monatlicher CWV-Check",
  },
];

/* ─── Wartungs-Katalog — 7 Teilleistungen in 3 Kapiteln ───────────────────── */
type KatalogEintrag = {
  nr: string;
  titel: string;
  chips: string[];
  text: React.ReactNode;
  href?: string;
  logo?: { src: string; alt: string };
};

const KATALOG: { kapitel: string; eintraege: KatalogEintrag[] }[] = [
  {
    kapitel: "Kapitel 01 — Schutz",
    eintraege: [
      {
        nr: "01",
        titel: "Updates & Sicherheits-Patches",
        chips: ["Core · Plugins · Themes"],
        text: (
          <>
            Core-, Plugin- und Theme-Updates spielen wir ein, sobald sie in unserer Testumgebung stabil laufen.
            Nichts geht ungeprüft auf die Live-Website. So schließt die Website-Wartung bekannte Sicherheitslücken
            zeitnah — ohne dass ein fehlerhaftes Update Ihre Website unerwartet lahmlegt. Jedes Update läuft
            vorher durch unsere eigene Test- und Deployment-Pipeline. Dank etablierter CI/CD-Prozesse ist es in
            Minuten ausgerollt, bei Bedarf mit sofortigem Rollback auf die zuvor funktionierende Version.
          </>
        ),
      },
      {
        nr: "02",
        titel: "Security-Monitoring & Malware-Schutz",
        chips: ["Malware · Firewall · Alerts"],
        text: (
          <>
            Wir überwachen kontinuierlich auf Schadcode, verdächtige Dateiänderungen und bekannte Angriffsmuster —
            auch außerhalb der Geschäftszeiten. Fällt etwas auf, reagieren wir umgehend. So markiert Google Ihre
            Seite nicht als unsicher, und Ihre Kunden sehen keine Warnmeldung im Browser. Ab dem Plus-Paket läuft
            diese Überwachung dauerhaft im Hintergrund mit. Sie müssen selbst nichts anstoßen.
          </>
        ),
      },
      {
        nr: "03",
        titel: "Backups & Wiederherstellung",
        chips: ["Täglich · Verschlüsselt · Offsite"],
        text: (
          <>
            Datenbank und Dateien sichern wir täglich — automatisiert, verschlüsselt und außerhalb des
            Produktivservers. Eine Kopie bleibt so auch bei einem kompletten Server-Ausfall erhalten. Im
            Ernstfall spielen wir eine funktionierende Version Ihrer Website in Minuten zurück, nicht erst nach
            tagelanger Fehlersuche. Je nach Paket bewahren wir Ihre Sicherungen 7, 30 oder 90 Tage auf.
          </>
        ),
      },
    ],
  },
  {
    kapitel: "Kapitel 02 — Stabilität",
    eintraege: [
      {
        nr: "04",
        titel: "Uptime-Monitoring 24/7",
        chips: ["24/7 · Sofort-Alert"],
        text: (
          <>
            Automatisierte Systeme prüfen rund um die Uhr, ob Ihre Website erreichbar ist und normal reagiert.
            Bei einer Störung werden wir sofort alarmiert und kümmern uns — oft bevor der erste Besucher den
            Ausfall bemerkt. Das Uptime-Monitoring ist in jedem Wartungspaket enthalten, von Basis bis Premium.
          </>
        ),
      },
      {
        nr: "05",
        titel: "Performance & Core Web Vitals",
        chips: ["LCP · CLS · INP"],
        logo: { src: "/logos/google.svg", alt: "Google Logo" },
        text: (
          <>
            Ladezeit, LCP, CLS und INP prüfen wir regelmäßig gegen die aktuellen Google-Benchmarks und die
            Vorwerte Ihrer eigenen Website. Wo Werte abrutschen, optimieren wir gezielt an der Ursache: Bildgrößen,
            Caching oder ineffiziente Datenbankabfragen. Wir schrauben nicht pauschal an der Website herum. Denn
            jede Website verliert mit der Zeit an Tempo, auch ohne sichtbare Änderung — die Bild-Bibliothek
            wächst, Plugins stapeln sich, der Datenbank-Overhead nimmt zu.
          </>
        ),
      },
    ],
  },
  {
    kapitel: "Kapitel 03 — Pflege",
    eintraege: [
      {
        nr: "06",
        titel: "Inhalts-Pflege & kleine Änderungen",
        chips: ["Texte · Bilder · Seiten"],
        text: (
          <>
            Kleinere Änderungen erledigen wir im vereinbarten Support-Kontingent — neue Texte, getauschte Bilder
            oder eine zusätzliche Unterseite. Sie müssen dafür nicht jedes Mal ein separates Angebot einholen.
            Zusätzlich behalten wir Zertifikatslaufzeiten, Cookie-Banner und die Datenschutzerklärung im Blick.
            Wird eine Anpassung notwendig, weisen wir frühzeitig darauf hin — etwa seit das
            Barrierefreiheitsstärkungsgesetz zugängliche Websites für weite Teile des B2C-Geschäfts verlangt. Das
            ersetzt keine Rechtsberatung. Es verhindert aber zuverlässig, dass technische und rechtliche
            Altlasten unbemerkt liegen bleiben.
          </>
        ),
      },
      {
        nr: "07",
        titel: "WordPress-Wartung",
        chips: ["WordPress · WooCommerce"],
        href: "/website-wartung/wordpress",
        logo: { src: "/logos/wordpress.svg", alt: "WordPress Logo" },
        text: (
          <>
            Für Websites auf WordPress bieten wir ein spezialisiertes Wartungspaket. Es umfasst tieferes
            Plugin-Management, WooCommerce-Betreuung, Sicherheitshärtung und gezielte Datenbank-Optimierung.
            Unsere Wartungsverträge sind grundsätzlich CMS-übergreifend angelegt. Das Grundprinzip aus Updates,
            Backups, Monitoring und persönlichem Support bleibt immer gleich — die WordPress-Wartung geht im
            WordPress-spezifischen Bereich aber spürbar weiter ins Detail.
          </>
        ),
      },
    ],
  },
];

/* ─── Ablauf — 5 Arbeitspakete als Protokoll-Konsole (App 2) ──────────────── */
type Arbeitspaket = {
  nr: string;
  titel: string;
  kurz: string;
  text: string;
  zeilen: { turnus: string; text: string }[];
  deliverable: string;
  ab: string[];
};

const ARBEITSPAKETE: Arbeitspaket[] = [
  {
    nr: "01",
    titel: "Monitoring",
    kurz: "Uptime, Security und Performance laufen permanent mit.",
    text: "Updates, Backups sowie Security- und Performance-Checks laufen im vereinbarten Rhythmus Ihres Pakets. Wir dokumentieren sie lückenlos, statt sie sporadisch nach Bedarf anzustoßen. Bei Auffälligkeiten meldet sich Ihr fester Ansprechpartner aktiv von sich aus. Sie müssen weder nachfragen noch selbst etwas anstoßen.",
    zeilen: [
      { turnus: "rund um die Uhr", text: "Uptime-Monitoring prüft Erreichbarkeit und Antwortzeit in kurzen Intervallen" },
      { turnus: "laufend", text: "Security-Monitoring scannt auf Schadcode und verdächtige Dateiänderungen" },
      { turnus: "bei Alert sofort", text: "Benachrichtigung an Ihren festen Ansprechpartner — Reaktion oft vor der ersten Kundenmeldung" },
      { turnus: "monatlich", text: "Performance-Werte gegen die Vorwerte Ihrer Website verglichen" },
    ],
    deliverable: "Lückenlose Dokumentation aller Prüfungen und Auffälligkeiten",
    ab: ["Uptime: ab Basis", "Security-Scan: ab Plus"],
  },
  {
    nr: "02",
    titel: "Updates & Patches",
    kurz: "Core, Plugins, Themes — erst auf Staging getestet, dann live.",
    text: "Core-, Plugin- und Theme-Updates spielen wir ein, sobald sie in unserer Testumgebung stabil laufen. Nichts geht ungeprüft auf die Live-Website. Dank etablierter CI/CD-Prozesse ist ein geprüftes Update in Minuten ausgerollt — bei Bedarf mit sofortigem Rollback auf die zuvor funktionierende Version.",
    zeilen: [
      { turnus: "wöchentlich", text: "Verfügbare Core-, Plugin- und Theme-Updates gesichtet und priorisiert" },
      { turnus: "vor jedem Update", text: "Test über die Staging- und Deployment-Pipeline statt direkt am Live-System" },
      { turnus: "nach Freigabe", text: "Ausrollen in Minuten — mit Rollback-Punkt auf die letzte funktionierende Version" },
      { turnus: "bei Sicherheitspatch", text: "Kritische Lücken werden priorisiert geschlossen, nicht nach Kalender" },
    ],
    deliverable: "Monatliches Update-Protokoll aller eingespielten Versionen",
    ab: ["Updates: ab Basis", "Eigene Staging-Umgebung: ab Premium"],
  },
  {
    nr: "03",
    titel: "Backup & Verifizierung",
    kurz: "Täglich sichern, regelmäßig auf Wiederherstellbarkeit prüfen.",
    text: "Datenbank und Dateien sichern wir täglich — automatisiert, verschlüsselt und außerhalb des Produktivservers. Eine Kopie bleibt so auch bei einem kompletten Server-Ausfall erhalten. Im Ernstfall spielen wir eine funktionierende Version Ihrer Website in Minuten zurück, nicht erst nach tagelanger Fehlersuche.",
    zeilen: [
      { turnus: "täglich 03:00", text: "Datenbank und Dateien gesichert, verschlüsselt und offsite abgelegt" },
      { turnus: "regelmäßig", text: "Stichprobe: Sicherung wird tatsächlich auf Wiederherstellbarkeit geprüft" },
      { turnus: "im Ernstfall", text: "Rückspielen einer funktionierenden Version in Minuten statt Tagen" },
      { turnus: "je nach Paket", text: "Aufbewahrung der Sicherungen für 7, 30 oder 90 Tage" },
    ],
    deliverable: "Geprüfte, wiederherstellbare Sicherung — jeden Tag",
    ab: ["Täglich: ab Basis", "30 Tage: ab Plus", "90 Tage: ab Premium"],
  },
  {
    nr: "04",
    titel: "Test & QA",
    kurz: "Nach jedem Update: Ladezeit, Core Web Vitals, kritische Funktionen.",
    text: "Nach jedem Eingriff prüfen wir Ladezeit, Core Web Vitals und kritische Seitenfunktionen. Als Maßstab dienen die aktuellen Google-Benchmarks und die Vorwerte Ihrer eigenen Website. Wo Werte abrutschen, optimieren wir gezielt an der Ursache: Bildgrößen, Caching oder ineffiziente Datenbankabfragen. Pauschales Herumschrauben gibt es nicht.",
    zeilen: [
      { turnus: "nach jedem Update", text: "Kritische Funktionen, Formulare und Checkout-Strecken geprüft" },
      { turnus: "nach jedem Update", text: "Ladezeit gegen die Vorwerte Ihrer Website verglichen" },
      { turnus: "monatlich", text: "Core Web Vitals — LCP, CLS, INP — gegen Google-Benchmarks geprüft" },
      { turnus: "bei Abweichung", text: "Optimierung an der Ursache: Bilder, Caching, Datenbank" },
    ],
    deliverable: "Nachvollziehbare Prüfung nach jedem Eingriff",
    ab: ["QA nach Updates: ab Basis", "CWV-Check: ab Plus"],
  },
  {
    nr: "05",
    titel: "Monatsreport",
    kurz: "Was wurde gemacht, was wurde gefunden, was kommt als Nächstes.",
    text: "Sie erhalten regelmäßig einen verständlichen Bericht: was gemacht wurde, was auffiel, was als Nächstes ansteht. Das ist mehr als eine technische Log-Datei ohne Einordnung. Bei Premium-Kunden kommt ein Quartalsgespräch dazu. Dort besprechen wir auch strategische Themen jenseits der Wartung — etwa geplante Relaunches oder neue Funktionen.",
    zeilen: [
      { turnus: "monatlich", text: "Update-Protokoll: welche Versionen wurden wann eingespielt" },
      { turnus: "monatlich", text: "Monats-Report mit Befunden und konkreten Empfehlungen" },
      { turnus: "quartalsweise", text: "Strategiegespräch zur Weiterentwicklung Ihrer Website" },
      { turnus: "jederzeit", text: "Rückfragen an Ihren festen Ansprechpartner — Antwort in unter 24 Stunden" },
    ],
    deliverable: "Monats-Report mit Empfehlungen (Basis: Update-Protokoll)",
    ab: ["Protokoll: ab Basis", "Report: ab Plus", "Quartalsgespräch: ab Premium"],
  },
];

/* ─── Wartungspakete — Preise & Leistungen FIX aus Bestand ────────────────── */
const PAKETE = [
  {
    name: "Basis",
    price: "ab 49 €",
    period: "/Monat",
    highlight: false,
    items: [
      "Core-, Plugin- & Theme-Updates",
      "Tägliche Backups (7 Tage Aufbewahrung)",
      "Uptime-Monitoring 24/7",
      "Benachrichtigung bei Ausfall",
      "Monatliches Update-Protokoll",
    ],
    note: "Ideal für einfache Informationswebsites.",
  },
  {
    name: "Plus",
    price: "ab 99 €",
    period: "/Monat",
    highlight: true,
    items: [
      "Alles aus Basis",
      "Security-Monitoring & Malware-Scan",
      "Monatlicher Performance-Check (Core Web Vitals)",
      "Monats-Report mit Empfehlungen",
      "Support-Kontingent (1 h/Monat)",
      "Backups 30 Tage Aufbewahrung",
    ],
    note: "Empfohlen für Unternehmenswebsites & Shops.",
  },
  {
    name: "Premium",
    price: "ab 199 €",
    period: "/Monat",
    highlight: false,
    items: [
      "Alles aus Plus",
      "Priorisierter Support (Antwort in 4 h)",
      "Inhaltsänderungen im Kontingent (3 h/Monat)",
      "Staging-Umgebung für sichere Updates",
      "Quartalsgespräch zur Website-Strategie",
      "Backups 90 Tage Aufbewahrung",
    ],
    note: "Für geschäftskritische Websites & WooCommerce.",
  },
];

/* ─── Vergleich — Ad-hoc vs. Wartungsvertrag ──────────────────────────────── */
const ADHOC = [
  "Reagiert erst, wenn der Ausfall da ist",
  "Kosten je Notfall nicht kalkulierbar",
  "Backup-Stand im Ernstfall ungewiss",
  "Updates werden aufgeschoben, Lücken bleiben offen",
  "Niemand fühlt sich dauerhaft zuständig",
];

const VERTRAG = [
  "Monitoring meldet Probleme, bevor Kunden sie sehen",
  "Fester Monatspreis ab 49 € — planbar statt Überraschung",
  "Tägliche, verschlüsselte Offsite-Backups",
  "Jedes Update getestet, bevor es live geht",
  "Ein Ansprechpartner, Antwort in unter 24 Stunden",
];

/* ─── Cluster-Karten ──────────────────────────────────────────────────────── */
const CLUSTER: {
  label: string;
  titel: string;
  text: string;
  href: string;
  cta: string;
  logo?: { src: string; alt: string };
}[] = [
  {
    label: "Spezialisiert",
    titel: "WordPress-Wartung",
    text: "Tieferes Plugin-Management, WooCommerce-Betreuung, Sicherheitshärtung und gezielte Datenbank-Optimierung — das spezialisierte Angebot für Websites auf WordPress.",
    href: "/website-wartung/wordpress",
    cta: "WordPress-Wartung ansehen",
    logo: { src: "/logos/wordpress.svg", alt: "WordPress Logo" },
  },
  {
    label: "Ergänzend",
    titel: "Laufende SEO-Betreuung",
    text: "Die Wartung hält Ihre Website technisch fit — die laufende SEO-Betreuung sorgt dafür, dass parallel Ihre Rankings wachsen.",
    href: "/seo/betreuung",
    cta: "SEO-Betreuung ansehen",
  },
  {
    label: "Alternative",
    titel: "Website-Relaunch",
    text: "Wenn Wartung nicht mehr reicht, sagen wir das offen: Ein sauberer Neustart ohne Ranking-Verlust ist dann der ehrlichere Weg.",
    href: "/webdesign/website-relaunch-agentur",
    cta: "Relaunch ansehen",
  },
];

/* ─── FAQ — 7 Fragen (Antworten auch als Klartext fürs JSON-LD) ───────────── */
const FAQS: { q: string; text: string; node?: React.ReactNode }[] = [
  {
    q: "Was kostet Website-Wartung bei SeoForge?",
    text: "Unsere Website-Wartung startet bei 49 €/Monat für die Basis-Betreuung mit Updates, täglichen Backups und Uptime-Monitoring. Das Plus-Paket liegt bei 99 €/Monat und ergänzt Security-Monitoring, Performance-Checks und ein Support-Kontingent. Das Premium-Paket kostet 199 €/Monat — mit priorisiertem Support und eigener Staging-Umgebung. Alle drei Pakete sind Festpreise netto zzgl. MwSt., monatlich kündbar und ohne Mindestlaufzeit. Ihre Kosten lassen sich so von Beginn an klar kalkulieren.",
  },
  {
    q: "Ist der Wartungsvertrag monatlich kündbar?",
    text: "Ja, alle drei Pakete sind monatlich kündbar — egal, wie lange der Vertrag bereits läuft. Eine Mindestlaufzeit oder eine Kündigungsfrist über den laufenden Monat hinaus gibt es nicht. Kunden sollen bleiben, weil die Arbeit überzeugt, nicht weil ein Vertrag sie zwingt. Ein Wechsel zwischen den Paketen ist ebenfalls jederzeit zum Monatswechsel möglich.",
  },
  {
    q: "Was passiert, wenn meine Website gehackt wird oder ausfällt?",
    text: "Unser Monitoring meldet Ausfälle und verdächtige Veränderungen in der Regel, bevor Kunden sie bemerken. Im Ernstfall spielen wir zuerst ein sauberes Backup zurück. Danach identifizieren wir die Ursache — etwa ein veraltetes Plugin oder kompromittierte Zugangsdaten — und schließen die Lücke. Derselbe Angriff funktioniert damit nicht sofort wieder. Anschließend erhalten Sie eine verständliche Rückmeldung: was passiert ist und welche Schritte wir unternommen haben.",
  },
  {
    q: "Wie schnell reagiert SeoForge bei Anfragen oder Störungen?",
    text: "Im Regelfall antworten wir innerhalb von 24 Stunden, meistens deutlich schneller. Premium-Kunden erhalten priorisierten Support mit einer Reaktionszeit von 4 Stunden. Denn bei geschäftskritischen Websites und Online-Shops kostet jede Stunde Ausfallzeit unmittelbar Umsatz. Die konkrete Reaktionszeit richtet sich nach dem gebuchten Wartungspaket und der Dringlichkeit des Problems.",
  },
  {
    q: "Worin unterscheidet sich Website-Wartung von der Wartung durch meinen Hosting-Anbieter?",
    text: "Die meisten Hosting-Anbieter kümmern sich nur um die Server-Ebene: Betriebssystem, Netzwerk und gelegentlich die PHP-Version. Was auf der Website selbst passiert, bleibt fast immer außen vor — CMS-Updates, Plugins, Themes, Inhalte und Sicherheitslücken in der Anwendung. Unsere Website-Wartung setzt genau dort an, wo die Zuständigkeit des Hosting-Anbieters endet. Sie deckt damit die Ebene ab, die im Alltag am häufigsten übersehen wird.",
  },
  {
    q: "Funktioniert die Wartung auch bei Websites, die nicht auf WordPress laufen?",
    text: "Ja, unsere Website-Betreuung ist grundsätzlich CMS-übergreifend angelegt. Sie funktioniert für WordPress ebenso wie für Shopify, TYPO3 oder individuell entwickelte Websites. Den konkreten Leistungsumfang — welche Updates und Checks im Detail anfallen — richten wir nach dem technischen Unterbau Ihrer Website aus. Das Grundprinzip aus Updates, Backups, Monitoring und persönlichem Support bleibt unabhängig vom System immer gleich.",
  },
  {
    q: "Worin unterscheidet sich diese Seite von Ihrer WordPress-Wartung?",
    text: "Diese Seite beschreibt unsere allgemeine, CMS-übergreifende Website-Wartung für Unternehmen mit unterschiedlichem technischen Unterbau. Für Websites, die konkret auf WordPress laufen, bieten wir mit der WordPress-Wartung ein spezialisiertes Angebot. Es umfasst tieferes Plugin-Management, WooCommerce-Betreuung und gezielte Datenbank-Optimierung. Inhaltlich überschneiden sich beide Angebote deutlich. Die WordPress-Wartung geht im WordPress-spezifischen Bereich aber spürbar weiter ins Detail.",
    node: (
      <>
        Diese Seite beschreibt unsere allgemeine, CMS-übergreifende Website-Wartung für Unternehmen mit
        unterschiedlichem technischen Unterbau. Für Websites, die konkret auf WordPress laufen, bieten wir mit
        der{" "}
        <Link href="/website-wartung/wordpress" className="text-primary font-semibold hover:underline">
          WordPress-Wartung
        </Link>{" "}
        ein spezialisiertes Angebot. Es umfasst tieferes Plugin-Management, WooCommerce-Betreuung und gezielte
        Datenbank-Optimierung. Inhaltlich überschneiden sich beide Angebote deutlich. Die WordPress-Wartung geht
        im WordPress-spezifischen Bereich aber spürbar weiter ins Detail.
      </>
    ),
  },
];

const CheckIcon = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function WebsiteWartungClient() {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePaket, setActivePaket] = useState(0);
  const [wunschPaket, setWunschPaket] = useState("Noch unsicher");

  const paket = ARBEITSPAKETE[activePaket];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.text },
    })),
  };

  return (
    <>
      <Navbar />
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
        @keyframes marquee-rtl { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
        @keyframes wcIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .wc-line { opacity: 0; animation: wcIn 0.4s ease both; }
        @keyframes wwChipPop { 0% { opacity: 0; transform: scale(0.4); } 65% { opacity: 1; transform: scale(1.12); } 100% { opacity: 1; transform: scale(1); } }
        .wc-chip { opacity: 0; animation: wwChipPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        @keyframes ppIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .pp-in { animation: ppIn 0.4s ease both; }
        .pp-chip { animation: wwChipPop 0.45s cubic-bezier(0.34,1.56,0.64,1) both; }
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .m3d { opacity: 1; transform: none; transition: none; }
          .chip-dot { animation: none; }
          .scroll-hidden.rv-left, .scroll-hidden.rv-right, .scroll-hidden.rv-scale, .scroll-hidden.rv-blur { transform: none; filter: none; transition: none; }
          .marquee-track { animation: none !important; }
          .wc-line, .wc-chip, .pp-in, .pp-chip { animation: none; opacity: 1; transform: none; }
          #wwCockpitClip rect { width: ${WC_W}px !important; }
        }
      `}</style>

      {/* ══ 01 HERO — linksbündiger Textblock + Wartungs-Cockpit volle Breite ══ */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute left-[8%] top-[-16%] h-[560px] w-[900px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(212,168,83,0.16), transparent 60%)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(26,26,26,0.045) 1px, transparent 0)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse 60% 55% at 35% 30%, #000 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 35% 30%, #000 30%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 pt-28 lg:pt-36 pb-16 lg:pb-20">
          <div className="max-w-3xl">
            {/* Statuszeile statt Badge */}
            <div className="hero-badge mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/50">
              <span className="chip-dot h-1.5 w-1.5 rounded-full" style={{ background: "#2DA44E" }} />
              Alle Systeme laufen · Website-Wartung &amp; Betreuung
            </div>

            <h1 className="hero-title font-[family-name:var(--font-heading)] text-[2.9rem] sm:text-[3.6rem] lg:text-[4.6rem] font-medium leading-[0.99] tracking-tight text-dark">
              Website-Wartung, die arbeitet,
              <br />
              <span style={grad}>bevor etwas ausfällt.</span>
            </h1>

            <p className="hero-description mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Wir übernehmen die komplette Website-Wartung: Updates, tägliche Backups, Security-Monitoring und
              Performance-Checks bleiben nicht bei Ihnen hängen. Ob WordPress, Shopify oder Individualentwicklung —
              Sie bekommen einen festen Ansprechpartner und einen transparenten Festpreis. Wir antworten in unter
              24 Stunden.
            </p>

            <div className="hero-cta mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href="#kontakt"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
              >
                Wartungsvertrag anfragen
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#pakete"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-8 py-4 text-sm font-semibold text-dark transition-all hover:border-primary/40"
              >
                Pakete ab 49 €/Monat
              </a>
            </div>

            <div className="hero-description mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dark/50">
                Updates &amp; Patches · Tägliche Backups · Security-Monitoring · Antwort &lt; 24 h
              </p>
              <span className="hidden sm:block h-4 w-px bg-border" aria-hidden="true" />
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-1.5" title="Wartung für WordPress">
                  <Image
                    src="/logos/wordpress.svg"
                    alt="WordPress Logo"
                    width={16}
                    height={16}
                    className="h-4 w-4 grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100"
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dark/50">WordPress</span>
                </span>
                <span className="flex items-center gap-1.5" title="Wartung für Shopify">
                  <Image
                    src="/logos/shopify.svg"
                    alt="Shopify Logo"
                    width={16}
                    height={16}
                    className="h-4 w-4 grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100"
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dark/50">Shopify</span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dark/40">u. v. m.</span>
              </span>
            </div>
          </div>

          {/* Wartungs-Cockpit — Interaktions-Höhepunkt 1/2 */}
          <div className="m3d mt-12 lg:mt-16">
            <WartungsCockpit />
          </div>
          <p className="mt-3 text-xs italic text-muted">Beispielansicht — keine Live-Kundendaten.</p>
        </div>
      </section>

      {/* ══ 02 AKZENTBAND — Dual-Marquee der Wartungs-Bausteine (einziges Band) ══ */}
      <section
        className="py-10 overflow-hidden"
        style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Row 1 — LTR: die 7 Teilleistungen als Icon-Pills (hover pausiert) */}
        <div className="marquee-wrap relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #111111, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #111111, transparent)" }} />
          <div className="marquee-track flex" style={{ width: "max-content", animation: "marquee-ltr 28s linear infinite", willChange: "transform" }}>
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

        {/* Row 2 — RTL (gegenläufig): Zusicherungen */}
        <div className="marquee-wrap relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #111111, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #111111, transparent)" }} />
          <div className="marquee-track flex" style={{ width: "max-content", animation: "marquee-rtl 38s linear infinite", willChange: "transform" }}>
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

      {/* ══ 03 INTRO — Nummeriertes Dossier + Sticky-Clay-Bild ══ */}
      <section className="py-20 lg:py-28 overflow-x-clip" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <div className="scroll-hidden rv-left">
                <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">
                  Website-Wartung &amp; Betreuung
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight">
                  Software altert.
                  <br />
                  <span style={grad}>Ihre Website muss es nicht.</span>
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

            <div className="scroll-hidden rv-right lg:sticky lg:top-28" style={{ transitionDelay: "120ms" }}>
              <div className="group relative rounded-2xl overflow-hidden border border-border shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/wartung-3d-buehne.png"
                  alt="3D-Illustration: Browserfenster auf einer Werkstatt-Hebebühne mit Schraubenschlüssel und Zahnrädern — Website in der laufenden Wartung"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <p className="mt-3 text-xs italic text-muted">
                Website auf der Wartungsbühne — Updates, Backups und Checks im festen Rhythmus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 04 RISIKEN — Ink-Sektion: Die stille Rechnung ohne Wartung ══ */}
      <section className="bg-dark py-24 lg:py-32 overflow-x-clip">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,420px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden rv-left order-last lg:order-first">
              <div className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.55)] aspect-[4/5] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/wartung-3d-verfall.png"
                  alt="3D-Illustration: bröckelndes Browserfenster mit Rissen, kippendem Warnhütchen und herausgefallenen Bausteinen — Verfall ohne Pflege"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
              <p className="mt-3 text-xs italic text-white/50">Ohne Pflege bröckelt es leise — erst die Technik, dann die Rankings.</p>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <span className="flex items-center gap-3 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase text-secondary mb-5">
                <span className="h-[2px] w-7 bg-secondary" aria-hidden="true" />
                Ohne Wartung
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[46px] font-bold text-white leading-[1.1] mb-5">
                Was eine ungewartete Website
                <br />
                <span
                  style={{
                    background: "linear-gradient(92deg, #D4A853, #e0bc72)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  wirklich kostet.
                </span>
              </h2>
              <p className="text-white/60 leading-relaxed max-w-2xl mb-8">
                Gehackte Websites sind selten das Ergebnis ausgefeilter, gezielter Angriffe. Die häufigste
                Ursache sind seit Wochen öffentlich bekannte Lücken in veralteten Plugins. Datenbanken wie die
                WPScan-Vulnerability-Database dokumentieren sie — inklusive Hinweisen, wie sie sich ausnutzen
                lassen. Die Folgen reichen von unauffälligem SEO-Spam in den Google-Suchergebnissen bis zur
                vollständigen Übernahme der Website durch Schadcode. Ohne Website-Wartung bleibt dieses Risiko
                dauerhaft offen.
              </p>

              <div
                className="grid gap-px bg-dark/20 rounded-2xl overflow-hidden sm:grid-cols-2"
                style={{ boxShadow: "0 40px 90px -30px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,168,83,0.25)" }}
              >
                {RISIKEN.map((r, i) => (
                  <div key={r.nr} className="scroll-hidden rv-scale bg-[#F8F5F1]" style={{ transitionDelay: `${i * 70}ms` }}>
                    <div className="group relative h-full bg-[#F8F5F1] p-6 lg:p-7 transition-colors duration-300 hover:bg-[#fbf4ea]">
                      <span
                        className="absolute top-0 left-0 right-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                        aria-hidden="true"
                      />
                      <span className="block font-mono text-[11px] tracking-[0.18em] text-dark/45 mb-3">RISIKO {r.nr}</span>
                      <span className="block font-bold text-dark text-lg mb-2">{r.titel}</span>
                      <p className="text-sm text-muted leading-relaxed">{r.text}</p>
                      <div className="border-t border-border pt-3 mt-4">
                        <span className="block text-[11px] uppercase tracking-[0.14em] text-muted mb-1">Gegenmaßnahme</span>
                        <span className="font-mono text-xs text-dark">{r.massnahme}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="scroll-hidden rv-blur flex items-start gap-3 mt-6 text-sm text-white/60">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                  <CheckIcon className="h-3 w-3 text-secondary" />
                </span>
                <p className="leading-relaxed">
                  <span className="font-semibold text-white">Ehrliche Grenze:</span> Wenn Wartung nicht mehr
                  reicht, weil Technik und Aufbau grundlegend veraltet sind, sagen wir das offen — dann ist ein
                  Website-Relaunch der sauberere Weg als Dauerflickerei.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 05 LEISTUNGEN — Wartungs-Katalog mit Scroll-Spy-Register ══ */}
      <section id="leistungen" className="scroll-mt-20 py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Wartungs-Katalog"
            title={
              <>
                Sieben Teilleistungen.
                <br />
                <span style={grad}>Ein Betrieb.</span>
              </>
            }
            copy="Voll ausgeschrieben statt Icon-Grid: jede Teilleistung mit Umfang und Turnus — einsehbar, bevor Sie anfragen."
          />

          <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <KatalogRegister />
            </div>

            <div className="rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)]">
              <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
                <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">SeoForge · Wartungs-Katalog</span>
              </div>

              {KATALOG.map((kap) => (
                <div key={kap.kapitel} className="border-b border-border last:border-b-0">
                  <div className="px-6 lg:px-7 py-3 bg-offwhite/60 border-b border-border">
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">{kap.kapitel}</span>
                  </div>
                  {kap.eintraege.map((l) => {
                    const inner = (
                      <>
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
                            <div className="flex items-center gap-2.5 mb-2">
                              {l.logo && (
                                <Image
                                  src={l.logo.src}
                                  alt={l.logo.alt}
                                  width={20}
                                  height={20}
                                  className="h-5 w-5 shrink-0 grayscale opacity-70 transition-all group-hover:grayscale-0 group-hover:opacity-100"
                                />
                              )}
                              <h3 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark group-hover:text-primary transition-colors">
                                {l.titel}
                              </h3>
                            </div>
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
                          {l.href && (
                            <span
                              className="hidden md:flex w-10 h-10 shrink-0 items-center justify-center rounded-full border border-border text-dark/40 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                              aria-hidden="true"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </>
                    );
                    const rowClass =
                      "scroll-hidden rv-right group relative block border-b border-border last:border-b-0 transition-colors hover:bg-[#FBF8F4] scroll-mt-28";
                    const delay = { transitionDelay: `${(parseInt(l.nr, 10) - 1) * 40}ms` };
                    return l.href ? (
                      <Link key={l.nr} id={`katalog-${l.nr}`} href={l.href} className={rowClass} style={delay}>
                        {inner}
                      </Link>
                    ) : (
                      <div key={l.nr} id={`katalog-${l.nr}`} className={rowClass} style={delay}>
                        {inner}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 06 ABLAUF — Der Wartungsmonat als Protokoll-Konsole ══ */}
      <section id="ablauf" className="scroll-mt-20 border-t-2 border-dark bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead
            eyebrow="So läuft Ihr Wartungsmonat"
            title={
              <>
                Fünf Arbeitspakete —
                <br />
                <span style={grad}>ein Protokoll.</span>
              </>
            }
            copy="Kein Zyklus-Diagramm: Sie sehen jeden Monat, was getan wurde — als nachvollziehbares Protokoll."
          />

          <div className="grid lg:grid-cols-[minmax(0,400px)_1fr] gap-6 lg:gap-10 items-stretch">
            {/* Paket-Buttons */}
            <div className="flex flex-col gap-3">
              {ARBEITSPAKETE.map((p, i) => {
                const on = activePaket === i;
                return (
                  <div key={p.nr} className="scroll-hidden rv-left" style={{ transitionDelay: `${i * 60}ms` }}>
                    <button
                      type="button"
                      onClick={() => setActivePaket(i)}
                      onMouseEnter={() => setActivePaket(i)}
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

            {/* Protokoll-Panel — Interaktions-Höhepunkt 2/2 */}
            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="h-full rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)] flex flex-col">
                <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">
                    Wartungsprotokoll · Paket {paket.nr}/05
                  </span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-dark/35">Schematische Darstellung</span>
                </div>

                <div key={activePaket} className="p-7 lg:p-9 flex-1 flex flex-col">
                  <div className="pp-in flex items-baseline gap-4 mb-4" style={{ animationDelay: "60ms" }}>
                    <span
                      className="font-[family-name:var(--font-heading)] text-6xl font-black leading-none"
                      style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    >
                      {paket.nr}
                    </span>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">{paket.titel}</h3>
                  </div>
                  <p className="pp-in text-muted leading-relaxed mb-6" style={{ animationDelay: "140ms" }}>
                    {paket.text}
                  </p>

                  {/* Protokoll-Zeilen — ticken gestaffelt ein */}
                  <div className="divide-y divide-border border-t border-border">
                    {paket.zeilen.map((z, i) => (
                      <div key={z.text} className="pp-in flex items-start gap-3 sm:gap-4 py-3.5" style={{ animationDelay: `${220 + i * 90}ms` }}>
                        <span className="w-28 shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{z.turnus}</span>
                        <span className="flex-1 text-sm text-dark leading-snug">{z.text}</span>
                        <span
                          className="pp-chip mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ background: "#E9F6EC", animationDelay: `${220 + i * 90 + 80}ms` }}
                        >
                          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="#1A7F37" aria-hidden="true">
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Fußzeile */}
                  <div
                    className="pp-in mt-auto grid sm:grid-cols-2 gap-4 border-t border-border pt-5"
                    style={{ animationDelay: `${220 + paket.zeilen.length * 90 + 90}ms` }}
                  >
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted mb-2">Sie erhalten</span>
                      <span className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                          <CheckIcon className="h-3 w-3 text-primary" />
                        </span>
                        <span className="text-sm font-medium text-dark">{paket.deliverable}</span>
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted mb-2">Enthalten ab</span>
                      <span className="flex flex-wrap gap-1.5">
                        {paket.ab.map((a) => (
                          <span
                            key={a}
                            className="inline-flex items-center rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-dark/60"
                          >
                            {a}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Volltext aller Arbeitspakete für Suchmaschinen */}
              <div className="sr-only">
                {ARBEITSPAKETE.map((p) => (
                  <p key={p.nr}>
                    Arbeitspaket {p.nr} — {p.titel}: {p.text}{" "}
                    {p.zeilen.map((z) => `${z.turnus}: ${z.text}.`).join(" ")} Sie erhalten: {p.deliverable}.{" "}
                    {p.ab.join(", ")}.
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Onboarding-Fußnote: Bestandsaufnahme & Erstversorgung */}
          <div className="scroll-hidden rv-blur flex items-start gap-3 mt-8 text-sm text-muted max-w-4xl">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <CheckIcon className="h-3 w-3 text-primary" />
            </span>
            <p className="leading-relaxed">
              <span className="font-semibold text-dark">Vor dem ersten Wartungsmonat:</span> Bestandsaufnahme und
              Erstversorgung. Wir prüfen den technischen Status quo Ihrer Website — Updates, Sicherheitslage,
              Performance und die bestehende Backup-Situation. Wer die Seite ursprünglich gebaut oder betreut
              hat, spielt dabei keine Rolle. Altlasten wie veraltete Plugins, fehlende Backups oder abgelaufene
              Zertifikate sprechen wir offen an und beheben sie. Erst wenn diese Basis steht, dokumentiert und
              getestet ist, beginnt die Routine-Wartung nach Ihrem gebuchten Paket.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 07 PAKETE — Drei Festpreise (FIX aus Bestand) ══ */}
      <section id="pakete" className="scroll-mt-20 py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Wartungspakete"
            title={
              <>
                Website-Wartung
                <br />
                <span style={grad}>zum festen Monatspreis.</span>
              </>
            }
            copy="Drei Pakete für die laufende Website-Betreuung: monatlich kündbar, kein Mindestvertrag — Sie bleiben, weil die Arbeit stimmt."
          />

          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {PAKETE.map((p, i) => (
              <div
                key={p.name}
                className={`m3d relative rounded-3xl overflow-hidden flex flex-col bg-white ${
                  p.highlight
                    ? "border shadow-[0_28px_60px_-30px_rgba(194,114,42,0.35)]"
                    : "border border-border shadow-[0_8px_24px_-12px_rgba(26,26,26,0.12)]"
                }`}
                style={{ transitionDelay: `${i * 120}ms`, ...(p.highlight ? { borderColor: "#ecd3ba" } : undefined) }}
              >
                {p.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }} aria-hidden="true" />
                )}
                <div className="px-6 pt-7 pb-5 border-b border-border" style={p.highlight ? { background: "#fbf4ea" } : undefined}>
                  {p.highlight && (
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase text-white mb-3"
                      style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                    >
                      Empfohlen
                    </span>
                  )}
                  <div className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-1">{p.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-[family-name:var(--font-heading)] text-4xl font-black text-dark">{p.price}</span>
                    <span className="text-sm text-muted">{p.period}</span>
                  </div>
                  <p className="mt-2 text-[13px] text-muted">{p.note}</p>
                </div>
                <ul className="flex-1 px-6 py-5 space-y-3">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-dark/75">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <CheckIcon className="h-3 w-3 text-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="px-6 pb-7">
                  <a
                    href="#kontakt"
                    className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
                      p.highlight
                        ? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl"
                        : "border border-primary/30 text-primary hover:bg-primary/[0.06]"
                    }`}
                  >
                    Paket anfragen
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="m3d mt-10 rounded-3xl overflow-hidden" style={{ background: "#C2722A" }}>
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center px-7 lg:px-10 py-8 lg:py-10">
              <div className="scroll-hidden rv-left">
                <span className="block font-mono text-[11px] tracking-[0.22em] uppercase text-white/70 mb-3">
                  Festpreis-Prinzip
                </span>
                <p className="font-[family-name:var(--font-heading)] text-2xl lg:text-[32px] font-bold leading-[1.15] text-white">
                  Website-Wartung zum Festpreis — ohne versteckte Kosten, ohne Mindestlaufzeit.
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
                  Sie zahlen exakt das, was auf der Rechnung steht. Die Pakete unterscheiden sich im Umfang von
                  Monitoring, Support und Reaktionszeit — nicht in überraschenden Zusatzkosten. Alle Preise netto
                  zzgl. MwSt., monatlich kündbar.
                </p>
              </div>
              <a
                href="#kontakt"
                className="scroll-hidden rv-right inline-flex items-center justify-center gap-3 rounded-full bg-dark px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#2a2a2a] shadow-[0_18px_40px_-14px_rgba(26,26,26,0.55)]"
              >
                Individuelles Angebot anfragen <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 08 VERGLEICH — Wartungsvertrag vs. Ad-hoc-Reparatur ══ */}
      <section className="border-t-2 border-dark bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Vertrag oder Notfall?"
            title={
              <>
                Reparieren, wenn es brennt —
                <br />
                <span style={grad}>oder pflegen, bevor es brennt.</span>
              </>
            }
            copy="Beide Wege haben ihre Berechtigung — nur für unterschiedliche Situationen, Unternehmensgrößen und Risikobereitschaft."
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="scroll-hidden rv-left">
              <div className="space-y-4 text-muted leading-relaxed max-w-lg">
                <p>
                  Für eine einfache Website mit wenigen Unterseiten kann Eigenwartung funktionieren — wenn ein
                  technisch versierter Ansprechpartner im Haus regelmäßig Zeit dafür einplant. In der Praxis
                  scheitert sie selten an fehlendem Wissen, sondern{" "}
                  <strong className="text-dark font-semibold">schlicht an fehlender Zeit im Tagesgeschäft</strong>
                  . Updates werden eingespielt, wenn gerade Luft ist — nicht, wenn ein kritischer
                  Sicherheitspatch erscheint. Ohne eigene Staging-Umgebung geht ein Update zudem oft direkt live.
                  Ein Plugin-Konflikt bleibt dann zunächst unbemerkt.
                </p>
                <p>
                  Sobald eine Website geschäftskritisch wird, zeigt sich der Unterschied schnell — beim Shop,
                  bei wachsendem Content-Volumen, bei mehreren Systemen im Zusammenspiel. Ad-hoc-Reparatur wirkt
                  auf dem Papier günstiger. Im Ernstfall bündelt sie aber{" "}
                  <strong className="text-dark font-semibold">
                    Ausfallzeit, Datenverlust-Risiko und Termindruck in einem einzigen schlechten Tag
                  </strong>
                  . Eine laufende Website-Betreuung verteilt dieselbe Arbeit planbar übers Jahr und fängt
                  Probleme, solange sie klein sind. Das Monitoring läuft auch nachts und am Wochenende. Updates
                  folgen einem festen Rhythmus über die Staging-Pipeline. Und{" "}
                  <strong className="text-dark font-semibold">
                    ein fester Ansprechpartner kennt Ihre Website über die Zeit hinweg
                  </strong>{" "}
                  — er antwortet in aller Regel innerhalb von 24 Stunden.
                </p>
              </div>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="group relative rounded-2xl overflow-hidden border border-border shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/wartung-3d-vorsorge.png"
                  alt="3D-Illustration einer zweigeteilten Bühne: umgekippter Monitor mit Feuerlöscher als Notfall, aufgeräumter Monitor unter goldenem Schutzschild als Vorsorge"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <p className="mt-3 text-xs italic text-muted">Feuerlöscher oder Schutzschild — dieselbe Website, zwei Betriebsmodelle.</p>
            </div>
          </div>

          {/* Vergleichs-Doppelkarte */}
          <div className="mt-12 lg:mt-16 grid md:grid-cols-2 gap-4 lg:gap-6 items-stretch">
            <div className="m3d rounded-3xl border border-border bg-white/60 p-7 lg:p-9">
              <span className="inline-flex items-center rounded-full border border-border bg-white px-4 py-1.5 text-sm font-semibold text-dark/45">
                Ad-hoc-Reparatur
              </span>
              <ul className="mt-6 space-y-4">
                {ADHOC.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dark/[0.06]">
                      <svg className="h-3 w-3 text-dark/35" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </span>
                    <span className="text-sm text-dark/55 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="m3d rounded-3xl border p-7 lg:p-9 shadow-[0_28px_60px_-30px_rgba(194,114,42,0.35)]"
              style={{ background: "#fbf4ea", borderColor: "#ecd3ba", transitionDelay: "120ms" }}
            >
              <span
                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-white"
                style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
              >
                Mit Wartungsvertrag
              </span>
              <ul className="mt-6 space-y-4">
                {VERTRAG.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <CheckIcon className="h-3 w-3 text-primary" />
                    </span>
                    <span className="text-sm font-medium text-dark leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 09 CLUSTER — Passende Leistungen (kompakt) ══ */}
      <section className="py-16 lg:py-20" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-2">Rund um die Wartung</span>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark">Passende Leistungen</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {CLUSTER.map((c, i) => (
              <div key={c.titel} className="scroll-hidden rv-scale h-full" style={{ transitionDelay: `${i * 70}ms` }}>
                <Link
                  href={c.href}
                  className="group block h-full rounded-2xl border border-border bg-white p-6 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="block font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45 mb-3">{c.label}</span>
                  <div className="flex items-center gap-2 mb-2">
                    {c.logo && (
                      <Image
                        src={c.logo.src}
                        alt={c.logo.alt}
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px] shrink-0 grayscale opacity-70 transition-all group-hover:grayscale-0 group-hover:opacity-100"
                      />
                    )}
                    <h3 className="font-[family-name:var(--font-heading)] font-bold text-dark text-lg group-hover:text-primary transition-colors">
                      {c.titel}
                    </h3>
                  </div>
                  <p className="text-muted text-sm leading-relaxed mb-4">{c.text}</p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                    {c.cta}
                    <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10 FAQ — Sticky-Sidebar mit 7 Fragen ══ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-5">
                Häufige Fragen
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-4">
                Alles zur
                <br />
                <span style={grad}>Website-Wartung.</span>
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Kosten, Kündbarkeit, Ernstfall, Zuständigkeit — die Fragen, die vor einem Wartungsvertrag am
                häufigsten fallen, beantwortet ohne Kleingedrucktes.
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
                {FAQS.map((faq, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={faq.q}>
                      <button
                        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer transition-colors hover:bg-offwhite"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                      >
                        <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                        <svg
                          className={`w-4 h-4 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                      </button>
                      <div
                        className="grid transition-[grid-template-rows] duration-400 ease-out"
                        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-5 text-sm text-muted leading-relaxed">{faq.node ?? faq.text}</div>
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

      {/* ══ 11 CTA-FINALE — Wartungsvertrag anfragen (dunkel, Formular) ══ */}
      <section id="kontakt" className="scroll-mt-20 bg-dark py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
          </div>

          <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="scroll-hidden rv-left">
              <h2 className="font-[family-name:var(--font-heading)] text-4xl text-white lg:text-5xl">
                Geben Sie die Website-Wartung ab —{" "}
                <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                  wir halten Ihre Website am Laufen.
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Im ersten Schritt analysieren wir Ihre Website und empfehlen das passende Paket für Ihre
                Website-Wartung. Danach erhalten Sie ein transparentes Festpreisangebot — kostenlos und
                unverbindlich. Passt eine einfachere Lösung besser zu Ihrer Situation, sagen wir Ihnen das offen.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Statuscheck Ihrer Website vor dem Angebot",
                  "Antwort in unter 24 Stunden vom festen Ansprechpartner",
                  "Monatlich kündbar — kein Risiko",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <CheckIcon className="h-3 w-3 text-primary-light" />
                    </div>
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl text-white">Wartungsvertrag anfragen</h3>
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
                    aria-label="Ihre Website-URL"
                    placeholder="Ihre Website-URL"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <div>
                    <span className="block text-xs font-medium uppercase tracking-[0.14em] text-white/40 mb-2.5">Wunsch-Paket</span>
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Wunsch-Paket wählen">
                      {["Basis", "Plus", "Premium", "Noch unsicher"].map((p) => {
                        const on = wunschPaket === p;
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setWunschPaket(p)}
                            aria-pressed={on}
                            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                              on
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "border border-white/15 text-white/60 hover:border-white/30 hover:text-white/80"
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}
                    </div>
                    <input type="hidden" name="paket" value={wunschPaket} />
                  </div>
                  <textarea
                    name="message"
                    rows={4}
                    aria-label="Kurz zur Website (CMS, Shop, Besonderheiten)"
                    placeholder="Kurz zur Website (CMS, Shop, Besonderheiten)"
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                  >
                    Kostenloses Angebot anfordern
                  </button>
                  <p className="text-center text-xs text-white/30">Ihre Daten werden vertraulich behandelt.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
