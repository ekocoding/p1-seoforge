"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import WebsiteCostCalculator from "./WebsiteCostCalculator";
import { Tilt } from "./ScreenMockups";
import ToolLogo from "@/app/components/ToolLogos";

/* ═══════════════════════════════════════════════════════════════════════════
   HERO MESH — interaktives Feder-Netz: das Raster wölbt sich vom Cursor weg
   und leuchtet auf, federt elastisch zurück. Canvas 2D (kein WebGL),
   weiß-dominant, performant, pausiert offscreen, respektiert reduced-motion.
═══════════════════════════════════════════════════════════════════════════ */
function HeroMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const GAP = 46;
    let w = 0, h = 0, cols = 0, rows = 0;
    type N = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };
    let nodes: N[] = [];
    const mouse = { x: -9999, y: -9999, has: false };
    const at = (c: number, r: number) => nodes[r * cols + c];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
      nodes = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          nodes.push({ hx: c * GAP, hy: r * GAP, x: c * GAP, y: r * GAP, vx: 0, vy: 0 });
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.has = true;
    };
    const onLeave = () => { mouse.has = false; mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);

    const K = 0.05, DAMP = 0.82, R = 185, FORCE = 2.7;
    let raf = 0, t = 0, vis = true;

    const step = () => {
      t += reduce ? 0 : 0.018;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        const wx = reduce ? 0 : Math.sin(t + n.hy * 0.012) * 2.2;
        const wy = reduce ? 0 : Math.cos(t * 0.9 + n.hx * 0.013) * 2.2;
        let ax = (n.hx + wx - n.x) * K;
        let ay = (n.hy + wy - n.y) * K;
        if (mouse.has && !reduce) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < R) {
            const push = (1 - dist / R) ** 2 * FORCE;
            ax += (dx / dist) * push;
            ay += (dy / dist) * push;
          }
        }
        n.vx = (n.vx + ax) * DAMP;
        n.vy = (n.vy + ay) * DAMP;
        n.x += n.vx; n.y += n.vy;
      }

      // Grund-Netz (gebündelt)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(194,114,42,0.10)";
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const n = at(c, r);
          if (c < cols - 1) { const m = at(c + 1, r); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); }
          if (r < rows - 1) { const m = at(c, r + 1); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); }
        }
      ctx.stroke();

      // Hervorhebung rund um den Cursor
      if (mouse.has && !reduce) {
        const near = (a: N) => { const dx = a.x - mouse.x, dy = a.y - mouse.y; return dx * dx + dy * dy < R * R; };
        ctx.beginPath();
        ctx.strokeStyle = "rgba(194,114,42,0.42)";
        ctx.lineWidth = 1.3;
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++) {
            const n = at(c, r);
            if (c < cols - 1) { const m = at(c + 1, r); if (near(n) || near(m)) { ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); } }
            if (r < rows - 1) { const m = at(c, r + 1); if (near(n) || near(m)) { ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); } }
          }
        ctx.stroke();
      }

      // Knoten
      for (const n of nodes) {
        let rr = 1.1, a = 0.14;
        if (mouse.has && !reduce) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) { const f = 1 - Math.sqrt(d2) / R; rr = 1.1 + f * 2.6; a = 0.2 + f * 0.6; }
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(194,114,42,${a})`;
        ctx.arc(n.x, n.y, rr, 0, 6.2832);
        ctx.fill();
      }

      raf = vis && !reduce ? requestAnimationFrame(step) : 0;
    };

    const io = new IntersectionObserver(([en]) => {
      vis = en.isIntersecting;
      if (vis && !raf && !reduce) raf = requestAnimationFrame(step);
      else if (!vis && raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0 });
    io.observe(canvas);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

/* ─── Scroll reveal (IntersectionObserver → .scroll-visible) ──────────────── */
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

/* ─── Ghost-Wasserzeichen mit isolierter Parallax ─────────────────────────────
   Eigene Komponente: mutiert nur das eigene transform per Ref (kein Re-Render
   der gesamten Seite beim Scrollen → kein FPS-Einbruch).                       */
function HeroWatermark() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { el.style.transform = `translateY(${window.scrollY * 0.16}px)`; });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
      style={{ opacity: 0.05, willChange: "transform" }}
    >
      <span
        className="font-[family-name:var(--font-heading)] font-black text-dark leading-none tracking-tight"
        style={{ fontSize: "clamp(110px, 19vw, 300px)" }}
      >
        WEBSITE
      </span>
    </div>
  );
}

/* ─── Globaler Scroll-Fortschritt — dünne Gradient-Linie ganz oben ────────── */
function ScrollProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[80] h-[3px] pointer-events-none" aria-hidden="true">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${p})`,
          background: "linear-gradient(90deg, #C2722A, #D4A853)",
          boxShadow: "0 0 10px rgba(194,114,42,0.5)",
        }}
      />
    </div>
  );
}


/* ─── Claude Code Terminal — originalgetreu nachgebaut, helles Theme ──────────
   ⏺ Tool-Calls, ⎿-Results, grüne Diff-Zeilen, Spinner, Input-Box.
   Loop alle 14s, Start beim Scroll-Into-View.                                 */
type CCRow =
  | { kind: "user"; text: string; d: number }
  | { kind: "msg"; text: string; d: number }
  | { kind: "tool"; name: string; arg: string; d: number }
  | { kind: "res"; text: string; ok?: boolean; d: number }
  | { kind: "diff"; text: string; d: number };

const CC_ROWS: CCRow[] = [
  { kind: "user", text: "Optimiere die Seite für SEO und deploye sie", d: 100 },
  { kind: "msg",  text: "Ich optimiere die Meta-Tags und ergänze Schema.org.", d: 1700 },
  { kind: "tool", name: "Read",   arg: "src/app/layout.tsx", d: 2500 },
  { kind: "res",  text: "127 Zeilen gelesen", d: 3100 },
  { kind: "tool", name: "Update", arg: "src/app/layout.tsx", d: 3800 },
  { kind: "res",  text: "12 Zeilen ergänzt", d: 4400 },
  { kind: "diff", text: 'title: "Müller GmbH | Maßmöbel aus Mannheim"', d: 4700 },
  { kind: "diff", text: 'description: "Schreinerei mit eigener Werkstatt…"', d: 4950 },
  { kind: "diff", text: '"@type": "LocalBusiness", "name": "Müller GmbH"', d: 5200 },
  { kind: "tool", name: "Bash",   arg: "npm run build && deploy --prod", d: 6200 },
  { kind: "res",  text: "Build erfolgreich — 4.2s", ok: true, d: 7400 },
  { kind: "res",  text: "Live auf Produktion — 38s", ok: true, d: 8100 },
  { kind: "msg",  text: "Fertig — Meta-Tags, Schema.org & Sitemap optimiert. Die Seite ist live.", d: 9100 },
];

function ClaudeCodeTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!on) return;
    const id = setInterval(() => setCycle((c) => c + 1), 14000);
    return () => clearInterval(id);
  }, [on]);

  const fade = (d: number): React.CSSProperties => ({ animation: `ccIn 0.3s ease both ${d}ms` });

  return (
    <div ref={ref} className="rounded-2xl border border-border bg-white overflow-hidden shadow-[0_28px_70px_-26px_rgba(26,26,26,0.28)]" aria-hidden="true">

      {/* Titelleiste */}
      <div className="relative flex items-center px-4 py-3 border-b border-border bg-[#F7F5F2]">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="absolute inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none">
          <span className="text-[13px] leading-none" style={{ color: "#C2722A" }}>✻</span>
          <span className="text-[11.5px] font-semibold text-dark/60">Claude Code</span>
          <span className="text-[11px] text-dark/30">— kunde-website</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-4 pb-4 font-mono text-[12px] leading-[1.7]">
        <div key={cycle} className="min-h-[330px]">
          {on && CC_ROWS.map((row, i) => {
            if (row.kind === "user") return (
              <div key={i} style={fade(row.d)} className="flex gap-2 mb-3">
                <span className="text-dark/30 select-none">&gt;</span>
                <span
                  className="text-dark/75 overflow-hidden whitespace-nowrap"
                  style={{ animation: `ccType 1.1s steps(34, end) both ${row.d + 150}ms` }}
                >
                  {row.text}
                </span>
              </div>
            );
            if (row.kind === "msg") return (
              <div key={i} style={fade(row.d)} className="flex items-baseline gap-2.5 mt-2.5 mb-1">
                <span className="shrink-0 w-[9px] h-[9px] rounded-full self-center" style={{ background: "#C2722A" }} />
                <span className="text-dark/80">{row.text}</span>
              </div>
            );
            if (row.kind === "tool") return (
              <div key={i} style={fade(row.d)} className="flex items-baseline gap-2.5 mt-2">
                <span className="shrink-0 w-[9px] h-[9px] rounded-full self-center" style={{ background: "#2DA44E" }} />
                <span className="text-dark"><b>{row.name}</b><span className="text-dark/40">({row.arg})</span></span>
              </div>
            );
            if (row.kind === "res") return (
              <div key={i} style={fade(row.d)} className="flex gap-2 pl-[3px]">
                <span className="text-dark/25 select-none">⎿</span>
                <span className="text-dark/45">
                  {row.ok && <span className="mr-1.5" style={{ color: "#2DA44E" }}>✓</span>}
                  {row.text}
                </span>
              </div>
            );
            return (
              <div key={i} style={{ ...fade(row.d), background: "#E9F6EC" }} className="ml-6 my-[1px] flex gap-2 rounded-[4px] px-2 py-px overflow-hidden">
                <span className="select-none font-bold shrink-0" style={{ color: "#1A7F37" }}>+</span>
                <span className="truncate" style={{ color: "#1A7F37" }}>{row.text}</span>
              </div>
            );
          })}

          {/* Spinner — erscheint während der Arbeit, verschwindet am Ende */}
          {on && (
            <div className="flex items-center gap-2 mt-2 text-[11px] text-dark/40"
                 style={{ animation: "ccIn 0.25s ease both 700ms, ccOut 0.3s ease forwards 8900ms" }}>
              <span className="inline-block leading-none" style={{ color: "#C2722A", animation: "ccPulse 1.3s ease-in-out infinite" }}>✻</span>
              <span>Optimiere… <span className="text-dark/25">(esc to interrupt)</span></span>
            </div>
          )}
        </div>

        {/* Input-Box — Claude Code Prompt */}
        <div className="mt-3 rounded-xl border border-dark/15 px-3.5 py-2.5 flex items-center gap-2.5 bg-white">
          <span className="text-dark/35 select-none">&gt;</span>
          <span className="w-[7px] h-[15px] bg-dark/55" style={{ animation: "ccBlink 1.06s step-end infinite" }} />
        </div>
        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-[10px] text-dark/25">? for shortcuts</span>
          <span className="text-[10px] text-dark/25">claude-sonnet-4-6</span>
        </div>
      </div>

      <style>{`
        @keyframes ccIn { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }
        @keyframes ccOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes ccType { from { max-width: 0; } to { max-width: 44ch; } }
        @keyframes ccBlink { 0%, 100% { visibility: visible; } 50% { visibility: hidden; } }
        @keyframes ccPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.75) rotate(90deg); opacity: 0.55; } }
      `}</style>
    </div>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Was kostet es, eine Website erstellen zu lassen?",
    a: "Die Kosten hängen von Umfang, Design-Komplexität und Funktionen ab. Einfache Business-Websites starten ab 2.500 €, komplexere Lösungen mit E-Commerce oder individuellen Features ab 5.000 €. Im kostenlosen Erstgespräch erstellen wir ein transparentes Festpreisangebot — keine versteckten Kosten.",
  },
  {
    q: "Wie lange dauert die Erstellung einer Website?",
    a: "Das hängt vom Umfang ab: Nach dem Konzept folgen Design-Runden, Entwicklung und Testing. Durch unsere KI-gestützten Workflows und automatisierten Deployments sind wir deutlich schneller als klassische Agenturen — den konkreten Zeitplan bekommst du mit dem Festpreisangebot.",
  },
  {
    q: "Welche Technologie nutzt ihr für die Website-Erstellung?",
    a: "Wir entwickeln mit Next.js (React) für maximale Performance und SEO, oder WordPress für Content-lastige Seiten, die du selbst bearbeiten möchtest. Wir empfehlen immer die Technologie, die am besten zu deinen Zielen passt — nicht die teuerste.",
  },
  {
    q: "Kann ich meine Website nach dem Launch selbst bearbeiten?",
    a: "Ja. Je nach Technologie integrieren wir ein CMS wie Sanity, Contentful oder WordPress, das du ohne Programmierkenntnisse bedienen kannst. Wir liefern eine persönliche Einweisung mit jedem Projekt.",
  },
  {
    q: "Ist SEO bei der Website-Erstellung bereits enthalten?",
    a: "Absolut — als SEO-Agentur bauen wir SEO von Anfang an ein: saubere URL-Struktur, Schema-Markup, technische Optimierung, Core Web Vitals und interne Verlinkung. Deine Website ist vom ersten Tag an rankingfähig. Auf Wunsch kombinieren wir mit laufender SEO-Betreuung.",
  },
  {
    q: "Was unterscheidet euch von anderen Webdesign-Agenturen?",
    a: "Wir sind SEO-Agentur und Webdesign-Agentur in einem — und arbeiten wie ein DevOps-Team: CI/CD-Pipelines, KI-gestützte Workflows und datengetriebene Entscheidungen mit Semrush, Ahrefs und Google. Das macht uns schneller und fairer im Preis, ohne dass die Qualität leidet. Und: Wir antworten immer in unter 24 Stunden.",
  },
];

/* ─── Leistungen ──────────────────────────────────────────────────────────── */
const leistungen = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Konzept & Strategie",
    meta: "Semrush · Ahrefs",
    desc: "Zielgruppe, Wettbewerb und Suchverhalten analysiert — daraus entsteht eine Seitenstruktur, in der jede Seite einen Job hat.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/>
      </svg>
    ),
    title: "UI/UX Design",
    meta: "Prototyping · UI",
    desc: "Modernes Design, das deine Marke widerspiegelt und Besucher intuitiv durch die Customer Journey führt.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Custom Development",
    meta: "Next.js · WordPress",
    desc: "Next.js oder WordPress — handgeschriebener Code mit CI/CD-Pipeline, automatisierten Tests und sauberem Deployment.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "SEO-First Aufbau",
    meta: "Schema.org · Core Web Vitals",
    desc: "Schema-Markup, Core Web Vitals, saubere URL-Struktur und technisches SEO sind von Anfang an im Code — nicht als Nachgedanke.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: "Responsive & Mobile-First",
    meta: "Alle Geräte · Touch-optimiert",
    desc: "Über 60 % des Traffics kommt vom Smartphone. Jede Website, die wir bauen, ist für alle Bildschirmgrößen perfekt optimiert.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
    ),
    title: "Launch & Betreuung",
    meta: "CI/CD · Support < 24h",
    desc: "Nach dem Go-Live bleiben wir dran: Monitoring, Sicherheitsupdates, Content-Pflege — und Antwort auf jede Frage in unter 24 Stunden.",
  },
];

/* ─── Daten-Stack (Tools) ─────────────────────────────────────────────────── */
const tools = [
  {
    tool: "semrush" as const,
    name: "Semrush",
    role: "Keyword-Recherche & Wettbewerb",
    desc: "Bevor wir eine Seitenstruktur festlegen, prüfen wir Suchvolumen und Konkurrenz. Jede Unterseite deiner Website zielt auf eine echte Suchanfrage — nicht auf Vermutungen.",
    usage: "Einsatz: Konzeptphase, Content-Planung",
  },
  {
    tool: "ahrefs" as const,
    name: "Ahrefs",
    role: "Backlinks & Content-Gaps",
    desc: "Wir analysieren, was in deiner Branche bereits rankt und welche Inhalte fehlen. Deine Website wird von Anfang an gegen die echte Konkurrenz geplant.",
    usage: "Einsatz: Wettbewerbsanalyse, Linkprofil",
  },
  {
    tool: "google" as const,
    name: "Google",
    role: "Search Console · Analytics · Lighthouse",
    desc: "Nach dem Launch beobachten wir Indexierung, Rankings und Nutzerverhalten — und verbessern auf Datenbasis statt nach Bauchgefühl.",
    usage: "Einsatz: Monitoring & Iteration nach Go-Live",
  },
];



/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function WebsiteErstellenLassenClient() {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [tool, setTool] = useState(0);

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
    <>
      <Navbar />
      <ScrollProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — Shader als Hintergrund der GESAMTEN Sektion, zentriert
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">

        {/* Full-bleed interaktives Feder-Netz */}
        <HeroMesh />

        {/* Fade in nächste Sektion */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />

        {/* Ghost-Wasserzeichen mit isolierter Parallax */}
        <HeroWatermark />

        {/* Content — zentriert */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-8 pt-32 pb-28 text-center">

          {/* Badge */}
          <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/55 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Website erstellen lassen · SeoForge
          </div>

          {/* H1 — exakt zwei Zeilen */}
          <h1
            className="hero-title font-[family-name:var(--font-heading)] font-bold text-dark leading-[1.08] mb-7"
            style={{ fontSize: "clamp(38px, 5.2vw, 72px)", letterSpacing: "-0.025em" }}
          >
            Website erstellen lassen —
            <br />
            <span
              style={{
                background: "linear-gradient(95deg, #C2722A 12%, #D4A853 88%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              individuell, custom coded, SEO-first.
            </span>
          </h1>

          {/* Divider-Tags */}
          <div className="hero-description mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-primary/40" />
            <span className="text-[10px] font-bold tracking-[0.26em] uppercase text-dark/30">
              Next.js · WordPress · DevOps · Semrush · Ahrefs
            </span>
            <div className="h-px w-10 bg-primary/40" />
          </div>

          {/* Beschreibung — substanziell, ohne erfundene Kennzahlen */}
          <p className="hero-description text-muted leading-[1.85] mb-11 max-w-3xl mx-auto" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            Kein Template, kein Baukasten: Wir entwickeln deine Website von Grund auf —
            mit individuellem Design, sauberem Code und SEO als Fundament statt als
            Nachgedanke. Als SEO- und Webdesign-Agentur in einem planen wir jede
            Unterseite auf Basis echter Suchdaten aus Semrush und Ahrefs, entwickeln
            mit DevOps-Workflows und KI-Unterstützung schneller als klassische
            Agenturen — und geben diesen Vorteil als faire Festpreise an dich weiter.
            Das Ergebnis: eine Website, die nicht nur gut aussieht, sondern gefunden
            wird, überzeugt und verkauft.
          </p>

          {/* CTAs */}
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
              href="#leistungen"
              className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-white/55 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-dark/65 transition-all hover:border-dark/30 hover:bg-white/80 hover:text-dark"
            >
              Was wir liefern
              <span className="text-primary text-xs float-chevron">↓</span>
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] text-dark/50 font-mono tracking-[0.28em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-dark/30 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LEISTUNGEN — 3D-Tilt-Cards
      ══════════════════════════════════════════════════════════════════ */}
      <section id="leistungen" className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          {/* Editorial-Header: links Headline, rechts Copy */}
          <div className="scroll-hidden grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-16 items-end mb-12 lg:mb-16">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Was wir liefern</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12]">
                Alles, was eine starke<br />Website braucht.
              </h2>
            </div>
            <p className="text-muted leading-relaxed lg:pb-1.5 lg:text-right">
              Von der ersten Idee bis zum Launch — und darüber hinaus.
              Ein Team, ein Festpreis, ein Ansprechpartner.
            </p>
          </div>

          {/* Hairline-Grid: 6 Zellen, 1px-Fugen, Hover-Akzent */}
          <div className="scroll-hidden grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {leistungen.map((l, i) => (
              <div
                key={l.title}
                className="group relative bg-white p-8 lg:p-9 pb-14 transition-colors duration-300 hover:bg-[#FBF8F4]"
              >
                {/* Hover: Gradient-Akzentlinie oben */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between mb-9">
                  <div className="text-dark/70 group-hover:text-primary transition-colors duration-300">{l.icon}</div>
                  <span className="font-mono text-[11px] font-bold text-dark/20 group-hover:text-primary transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-bold text-dark text-lg mb-2">{l.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6">{l.desc}</p>
                <div className="absolute bottom-7 left-8 lg:left-9 right-8 text-[10px] font-mono tracking-wide text-dark/30 group-hover:text-primary/70 transition-colors duration-300">
                  {l.meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          KOSTEN — Marktkontext + interaktiver Rechner
      ══════════════════════════════════════════════════════════════════ */}
      <section id="kosten" className="bg-white py-24 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Text */}
            <div className="scroll-hidden">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-5">
                Kosten & Preise
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-5 leading-tight">
                Was kostet es, eine<br />Website erstellen zu lassen?
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Der Markt ist breit: Einfache One-Pager liegen bei <strong className="text-dark">1.500–2.500 €</strong>,
                klassische Unternehmens-Websites bei <strong className="text-dark">3.000–7.000 €</strong>,
                Shops und Portale schnell bei <strong className="text-dark">10.000 €+</strong>.
                Entscheidend ist nicht der niedrigste Preis — sondern was du dafür bekommst.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Unser Vorteil: KI-gestützte Workflows und DevOps-Automatisierung reduzieren
                den Aufwand pro Projekt deutlich. Diesen Effizienzgewinn geben wir als
                faire Festpreise weiter — bei voller handwerklicher Qualität, individuellem
                Design und SEO-Setup inklusive.
              </p>
              <ul className="space-y-3.5">
                {[
                  "Festpreis nach Erstgespräch — keine versteckten Kosten",
                  "SEO-Setup & saubere Technik immer inklusive",
                  "Günstiger als klassische Agenturen — dank KI & Automatisierung",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-dark text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rechner */}
            <div className="scroll-hidden" style={{ transitionDelay: "120ms" }}>
              <Tilt max={4}>
                <WebsiteCostCalculator />
              </Tilt>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WARUM SEOFORGE A — SEO & Webdesign aus einem Team
      ══════════════════════════════════════════════════════════════════ */}
      <section id="warum" className="py-24 lg:py-32 scroll-mt-20" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-5">Warum SeoForge</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
                SEO &amp; Webdesign —<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  aus einem Team.
                </span>
              </h2>
              <p className="text-muted leading-relaxed mb-8 max-w-md">
                Keine Schnittstellenverluste zwischen zwei Dienstleistern: Design, Technik
                und Sichtbarkeit kommen aus einem Team. Deine Website sieht nicht nur gut
                aus — sie rankt für deine Keywords und bringt messbar mehr Anfragen rein.
              </p>
              <ul className="space-y-5">
                {[
                  { label: "Einheitliche Strategie", desc: "Von der URL-Struktur bis zur Farbwahl — alles abgestimmt auf Ranking und Conversion." },
                  { label: "DevOps-Geschwindigkeit", desc: "CI/CD-Pipelines: Was wir morgens besprechen, ist mittags deployt. Kein Ticketsystem." },
                  { label: "Antwort in unter 24h", desc: "Kein Ticket-Roboter. Dein persönlicher Ansprechpartner — immer erreichbar." },
                ].map((item) => (
                  <li key={item.label} className="flex gap-4">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <div className="font-bold text-dark text-sm mb-0.5">{item.label}</div>
                      <div className="text-muted text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Graphic — SEO + Design fließen in eine Website */}
            <div className="scroll-hidden hidden lg:block" style={{ transitionDelay: "120ms" }}>
              <Image
                src="/images/warum-seoforge-team.png"
                alt="SEO und Webdesign fließen bei SeoForge in eine Website zusammen — Platz 1 bei Google, PageSpeed 96+"
                width={1120}
                height={980}
                className="w-full h-auto select-none pointer-events-none"
                sizes="(max-width: 1024px) 0px, 560px"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WARUM SEOFORGE B — KI im Webdesign & Coding
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Visual: Claude Code Terminal */}
            <div className="scroll-hidden order-last lg:order-first" style={{ transitionDelay: "120ms" }}>
              <ClaudeCodeTerminal />
              <p className="mt-4 text-center text-xs text-dark/35">
                So arbeiten wir wirklich — KI-gestützte Entwicklung, live deployt in Minuten.
              </p>
            </div>

            <div className="scroll-hidden flex flex-col justify-center">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-5">KI im Webdesign</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
                KI &amp; Automatisierung —<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  dein Preisvorteil.
                </span>
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                KI beschleunigt Konzept, Content und Coding. Automatisierte Deployments statt
                manuellem FTP. Das Ergebnis: bessere Preise und kürzere Projektlaufzeiten —
                ohne Abstriche beim Handwerk.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Was bei klassischen Agenturen Tage dauert, dauert bei uns Stunden. Diesen
                Effizienzgewinn rechnen wir nicht in Stunden ab — sondern geben ihn als
                fair kalkulierten Festpreis an dich weiter.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "~42%", label: "weniger Entwicklungszeit" },
                  { val: "< 24h", label: "Reaktionszeit garantiert" },
                  { val: "CI/CD", label: "Deploy-Pipeline inklusive" },
                  { val: "Festpreis", label: "keine Stunden-Abrechnung" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-offwhite p-4">
                    <div className="font-[family-name:var(--font-heading)] text-xl font-black text-dark">{stat.val}</div>
                    <div className="text-xs text-muted mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          DATEN-STACK — Semrush · Ahrefs · Google
      ══════════════════════════════════════════════════════════════════ */}
      <section id="tools" className="bg-white py-24 lg:py-32 scroll-mt-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-14 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Daten-Stack
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Deine Website rankt —<br />weil wir vor dem ersten Pixel schon Daten lesen.
            </h2>
            <p className="text-lg text-muted">
              Unsere Websites überzeugen nicht nur grafisch — sie sind von Tag 1 suchmaschinenoptimiert,
              technisch sauber und auf echte Suchanfragen ausgerichtet. Für nachhaltige Google-Ergebnisse.
            </p>
          </div>

          {/* Interaktiv: links Tool wählen, rechts Live-Demo-Panel */}
          <div className="scroll-hidden grid lg:grid-cols-[minmax(0,420px)_1fr] gap-6 lg:gap-10 items-stretch">

            {/* Tool-Liste */}
            <div className="flex flex-col gap-3">
              {tools.map((t, i) => {
                const on = tool === i;
                return (
                  <button
                    type="button"
                    key={t.name}
                    onClick={() => setTool(i)}
                    onMouseEnter={() => setTool(i)}
                    className="flex-1 text-left rounded-2xl border p-5 lg:p-6 transition-all duration-300 cursor-pointer"
                    style={{
                      background: on ? "#fff" : "transparent",
                      borderColor: on ? "rgba(194,114,42,0.3)" : "var(--color-border)",
                      boxShadow: on ? "0 18px 44px -20px rgba(194,114,42,0.25)" : "none",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <ToolLogo tool={t.tool} />
                      <div className="flex-1 min-w-0">
                        <div className="font-[family-name:var(--font-heading)] text-lg font-black text-dark leading-tight">{t.name}</div>
                        <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-primary">{t.role}</div>
                      </div>
                      <span
                        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{ background: on ? "#C2722A" : "rgba(26,26,26,0.05)", color: on ? "#fff" : "rgba(26,26,26,0.35)" }}
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-muted text-sm leading-relaxed mt-3">{t.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Live-Demo-Panel — Animationen starten bei jedem Tool-Wechsel neu */}
            <div className="relative rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)] min-h-[420px] flex flex-col">
              <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
                <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-dark/45">
                  {tool === 0 ? "Keyword-Recherche" : tool === 1 ? "Wettbewerbs-Analyse" : "Ranking-Monitoring"}
                </span>
                <span className="ml-auto text-[10px] font-mono text-dark/30">{tools[tool].usage}</span>
              </div>

              <div key={tool} className="flex-1 p-6 lg:p-8">
                {tool === 0 && (
                  <div>
                    <div className="grid grid-cols-[1fr_72px_56px] gap-2 px-1 pb-2.5 text-[10px] font-bold uppercase tracking-wider text-dark/35 border-b border-border">
                      <span>Keyword</span><span className="text-right">Volumen</span><span className="text-right">KD %</span>
                    </div>
                    {([
                      ["website erstellen lassen", "9.9K", 47],
                      ["website erstellen lassen kosten", "2.9K", 41],
                      ["webdesign agentur", "6.6K", 45],
                      ["homepage erstellen lassen", "6.6K", 45],
                      ["website erstellen lassen mittelstand", "880", 32],
                    ] as [string, string, number][]).map(([k, v, d], i) => (
                      <div
                        key={k}
                        className="grid grid-cols-[1fr_72px_56px] gap-2 items-center px-1 py-3 text-[13px] border-b border-border/60 last:border-0"
                        style={{ animation: `dsIn 0.45s cubic-bezier(0.16,1,0.3,1) both ${120 + i * 110}ms` }}
                      >
                        <span className="font-medium text-dark truncate">{k}</span>
                        <span className="text-right font-mono text-dark/60">{v}</span>
                        <span className="text-right font-mono font-semibold" style={{ color: d < 35 ? "#22c55e" : d < 45 ? "#D4A853" : "#f97316" }}>{d}</span>
                      </div>
                    ))}
                    <p className="mt-4 text-xs text-dark/40">Grüne KD-Werte = realistisch rankbar. Genau dort setzen wir an.</p>
                  </div>
                )}

                {tool === 1 && (
                  <div className="h-full flex flex-col justify-center gap-7">
                    {([
                      ["Referring Domains", 78],
                      ["Backlink-Qualität", 64],
                      ["Content-Gap geschlossen", 55],
                    ] as [string, number][]).map(([label, w], i) => (
                      <div key={label}>
                        <div className="flex justify-between text-[12px] font-semibold text-dark/60 mb-2">
                          <span>{label}</span>
                          <span className="font-mono text-primary">{w}%</span>
                        </div>
                        <div className="h-3 rounded-full bg-dark/[0.06] overflow-hidden">
                          <div
                            className="h-full rounded-full origin-left"
                            style={{
                              width: `${w}%`,
                              background: "linear-gradient(90deg, #C2722A, #D4A853)",
                              animation: `dsGrow 0.9s cubic-bezier(0.16,1,0.3,1) both ${150 + i * 160}ms`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-dark/40">Deine Website wird gegen die echte Konkurrenz geplant — nicht ins Blaue.</p>
                  </div>
                )}

                {tool === 2 && (
                  <div className="h-full flex flex-col justify-center">
                    <div className="flex gap-2.5 mb-5">
                      {["Klicks", "Impressionen"].map((c, i) => (
                        <span
                          key={c}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-offwhite px-3.5 py-1.5 text-[11px] font-semibold text-dark/65"
                          style={{ animation: `dsIn 0.4s ease both ${150 + i * 120}ms` }}
                        >
                          {c} <span className="text-[#34A853] font-bold">↗</span>
                        </span>
                      ))}
                    </div>
                    <svg viewBox="0 0 400 150" className="w-full" aria-hidden="true">
                      <defs>
                        <linearGradient id="dsArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="rgba(194,114,42,0.22)" /><stop offset="1" stopColor="rgba(194,114,42,0)" />
                        </linearGradient>
                        <linearGradient id="dsLine" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0" stopColor="#C2722A" /><stop offset="1" stopColor="#D4A853" />
                        </linearGradient>
                      </defs>
                      <path d="M0 130 C60 126, 100 118, 150 100 S260 55, 400 18 L400 150 L0 150 Z" fill="url(#dsArea)" style={{ animation: "dsIn 0.8s ease both 0.7s" }} />
                      <path
                        d="M0 130 C60 126, 100 118, 150 100 S260 55, 400 18"
                        fill="none" stroke="url(#dsLine)" strokeWidth="3" strokeLinecap="round"
                        pathLength={1}
                        style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: "dsDraw 1.3s cubic-bezier(0.4,0,0.2,1) forwards 0.15s" }}
                      />
                      <circle cx="400" cy="18" r="5" fill="#D4A853" style={{ animation: "dsIn 0.4s ease both 1.35s" }} />
                    </svg>
                    <div className="flex justify-between text-[10px] font-mono text-dark/30 mt-2 px-1">
                      <span>Launch</span><span>+3 Mo</span><span>+6 Mo</span>
                    </div>
                    <p className="mt-4 text-xs text-dark/40">Nach dem Go-Live beobachten wir Indexierung und Rankings — und iterieren auf Datenbasis.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes dsIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
            @keyframes dsGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
            @keyframes dsDraw { to { stroke-dashoffset: 0; } }
          `}</style>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SPLIT 1 — Mittelstand
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-border overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Für den Mittelstand</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
                Professionelle Website —<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  auch mit kleinerem Budget.
                </span>
              </h2>
              <p className="text-muted leading-relaxed mb-8 max-w-md">
                Nicht jedes Unternehmen braucht ein 10.000-€-Projekt. Wir entwickeln solide,
                schnelle und SEO-taugliche Websites für den Mittelstand — ohne Abstriche
                bei Qualität und Code.
              </p>
              <Link
                href="/webdesign/firmenwebsite-erstellen-lassen"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors w-fit"
              >
                Firmenwebsite-Angebot ansehen
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="scroll-hidden flex justify-center lg:justify-end" style={{ transitionDelay: "120ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/webdesign-3d-mittelstand.png"
                  alt="3D-Illustration: professionelle Unternehmens-Website zum fairen Preis für den Mittelstand"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SPLIT 2 — One Pager
      ══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border overflow-hidden py-20 lg:py-28" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="scroll-hidden order-last lg:order-first flex justify-center lg:justify-start" style={{ transitionDelay: "120ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/webdesign-3d-onepager.png"
                  alt="3D-Illustration: One-Pager-Website als durchgehende Seite mit einem klaren Call-to-Action"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
            </div>

            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Alles auf einer Seite</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
                One Pager —<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  konzentriert, schnell, überzeugend.
                </span>
              </h2>
              <p className="text-muted leading-relaxed mb-8 max-w-md">
                Ein One Pager bringt deine Kernbotschaft auf den Punkt — ohne Ablenkung.
                Ideal für Kampagnen, Gründer und Unternehmen, die schnell und günstig
                online sein wollen. Mit SEO-Fundament und vollständigem Custom Design.
              </p>
              <Link
                href="/webdesign/landingpage-erstellen-lassen"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors w-fit"
              >
                One Pager entdecken
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SPLIT 3 — Relaunch
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-border overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Bestandswebsite</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
                Website Relaunch —<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ohne Ranking-Verlust.
                </span>
              </h2>
              <p className="text-muted leading-relaxed mb-8 max-w-md">
                Bestehende Website veraltet, aber die Rankings sollen bleiben? Wir
                modernisieren mit sauberem 301-Setup, Search-Console-Monitoring und
                einer Migration, die Google nicht bemerkt — deployt über unsere
                CI/CD-Pipeline.
              </p>
              <Link
                href="/webdesign/website-relaunch-agentur"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors w-fit"
              >
                Relaunch-Prozess ansehen
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="scroll-hidden flex justify-center lg:justify-end" style={{ transitionDelay: "120ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/webdesign-3d-relaunch.png"
                  alt="3D-Illustration: Website-Relaunch — alte graue Website wird zur modernen Website mit warmen Akzenten"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="scroll-hidden mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Häufige Fragen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              Alles zur Website-Erstellung
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
                    {/* Smooth height animation via grid-rows trick */}
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
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Verwandte Leistungen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">
              Das könnte auch interessant sein
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Firmenwebsite erstellen lassen", href: "/webdesign/firmenwebsite-erstellen-lassen", desc: "SEO- & GEO-optimiert, KI-reduzierte Kosten — gemacht für KMU." },
              { title: "Website Relaunch", href: "/webdesign/website-relaunch-agentur", desc: "Bestehende Website modernisieren — ohne Rankings zu verlieren." },
              { title: "Landing Pages", href: "/webdesign/landingpage-erstellen-lassen", desc: "Conversion-optimierte Seiten für Kampagnen und Lead-Generierung." },
              { title: "SEO Optimierung", href: "/seo/optimierung", desc: "Technische SEO für maximale Sichtbarkeit in Google." },
            ].map((link, i) => (
              <div key={link.href} className="scroll-hidden h-full" style={{ transitionDelay: `${i * 70}ms` }}>
                <Link
                  href={link.href}
                  className="block h-full rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
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
        {/* Subtle glow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-primary/[0.07] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="scroll-hidden">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-4">
              Bereit für deine neue Website?
            </h2>
            <p className="text-white/55 text-lg mb-3 leading-relaxed">
              Kostenloses Erstgespräch — wir klären in 30 Minuten, was dein Projekt
              braucht und was es kostet.
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
