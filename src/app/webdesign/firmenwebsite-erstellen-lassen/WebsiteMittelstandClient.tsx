"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ToolLogo from "@/app/components/ToolLogos";

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
    document.querySelectorAll(".scroll-hidden, .m3d").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Globaler Scroll-Fortschritt ─────────────────────────────────────────── */
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

/* ─── Kontext-Visuals: Pipeline, Terminal, Kosten ─────────────────────────── */
function PipelineChips() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(-1);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      [0, 1, 2, 3].forEach((i) => setTimeout(() => setStep(i), 350 + i * 650));
    }, { threshold: 0.3, rootMargin: "0px 0px -15% 0px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const stages = ["git push", "Tests", "Build", "Live"];
  return (
    <div ref={ref} aria-hidden="true">
      <div className="flex items-center">
        {stages.map((st, i) => {
          const on = step >= i;
          const last = i === stages.length - 1;
          return (
            <div key={st} className={`flex items-center ${last ? "" : "flex-1"}`}>
              <div className="flex flex-col items-center gap-2">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500"
                  style={{
                    background: on && last ? "linear-gradient(135deg,#C2722A,#D4A853)" : "#fff",
                    borderColor: on ? (last ? "transparent" : "#2DA44E") : "rgba(26,26,26,0.12)",
                    transform: on ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {on ? (
                    last ? <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                      : <svg className="w-4 h-4 text-[#2DA44E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-dark/15" />
                  )}
                </span>
                <span className={`font-mono text-[11px] font-semibold transition-colors duration-300 ${on ? "text-dark" : "text-dark/30"}`}>{st}</span>
              </div>
              {!last && (
                <div className="flex-1 h-[3px] mx-2 mb-6 rounded-full bg-dark/[0.07] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: step > i ? "100%" : "0%",
                      background: "linear-gradient(90deg, #C2722A, #D4A853)",
                      transition: "width 0.55s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-5 rounded-xl bg-offwhite border border-border px-4 py-2.5 font-mono text-[11px] transition-opacity duration-500" style={{ opacity: step >= 3 ? 1 : 0.55 }}>
        <span style={{ color: step >= 3 ? "#C2722A" : "rgba(26,26,26,0.4)" }}>{step >= 3 ? "● production — live in 41s, Rollback jederzeit" : "○ wartet auf Push …"}</span>
      </div>
    </div>
  );
}

/* ─── KI-Stack-Chips + Keyword-Tabelle ────────────────────────────────────── */
/* eslint-disable @next/next/no-img-element */
function AiStackChips() {
  const tools = [
    { n: "Claude", f: "/images/logos/claude.svg" },
    { n: "Anthropic", f: "/images/logos/anthropic.svg" },
    { n: "Copilot", f: "/images/logos/copilot.svg" },
  ];
  return (
    <div className="flex flex-wrap gap-2.5" aria-hidden="true">
      {tools.map((t) => (
        <span key={t.n} className="inline-flex items-center gap-2 rounded-full bg-white border border-dark/10 shadow-sm px-3.5 py-2">
          <img src={t.f} alt={`${t.n} Logo`} className="w-4 h-4 object-contain" loading="lazy" />
          <span className="text-[12px] font-semibold text-dark/70">{t.n}</span>
        </span>
      ))}
    </div>
  );
}

/* ─── Mini-Deploy-Terminal (helles Theme) ─────────────────────────────────── */
const DEPLOY_LINES = [
  { text: "$ git push origin main", c: "rgba(26,26,26,0.55)" },
  { text: "✓ Build & Tests bestanden", c: "#2DA44E" },
  { text: "● Deploy production — live in 41s", c: "#C2722A" },
];

function MiniTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.3, rootMargin: "0px 0px -15% 0px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="rounded-xl bg-offwhite border border-border overflow-hidden" aria-hidden="true">
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span className="ml-auto text-[9px] font-mono text-dark/30">deploy.log</span>
      </div>
      <div className="px-4 py-3 font-mono text-[11px] leading-[1.9]">
        {DEPLOY_LINES.map((l, i) => (
          <div key={i} style={{
            color: l.c,
            opacity: on ? 1 : 0,
            transform: on ? "none" : "translateY(4px)",
            transition: `opacity 0.35s ease ${i * 650}ms, transform 0.35s ease ${i * 650}ms`,
          }}>
            {l.text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Kosten-Vergleichsbalken (animiert beim Einscrollen) ─────────────────── */
function CostBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.3, rootMargin: "0px 0px -15% 0px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="space-y-3" aria-hidden="true">
      <div>
        <div className="flex justify-between text-[11px] font-medium text-dark/50 mb-1">
          <span>Klassische Agentur</span>
        </div>
        <div className="h-3 rounded-full bg-dark/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full bg-dark/30"
            style={{ width: on ? "100%" : "0%", transition: "width 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s" }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[11px] font-semibold text-primary mb-1">
          <span>SeoForge mit KI-Workflows</span>
        </div>
        <div className="h-3 rounded-full bg-dark/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: on ? "42%" : "0%",
              background: "linear-gradient(90deg, #C2722A, #D4A853)",
              transition: "width 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          />
        </div>
      </div>
      <p className="text-[10px] text-dark/35 pt-1">
        Gleiche Qualität, weniger abgerechnete Stunden — KI übernimmt die Routine.
      </p>
    </div>
  );
}

/* ─── Hero: interaktives Strömungsfeld (Flow Field) ───────────────────────────
   Tausende Partikel strömen entlang eines Noise-Vektorfeldes; der Cursor
   verwirbelt die Strömung (Swirl + Push). Canvas 2D, weiß-dominant, performant,
   pausiert außerhalb des Viewports, respektiert prefers-reduced-motion.        */
function HeroFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COLORS = ["rgba(194,114,42,0.42)", "rgba(210,138,68,0.34)", "rgba(212,168,83,0.40)"];
    type P = { x: number; y: number; px: number; py: number; life: number; max: number; c: number };
    let w = 0, h = 0;
    let ps: P[] = [];
    const mouse = { x: -9999, y: -9999, has: false };

    const hash = (x: number, y: number) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    const noise = (x: number, y: number) => {
      const xi = Math.floor(x), yi = Math.floor(y);
      const xf = x - xi, yf = y - yi;
      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };

    const spawn = (p: P, seed = false) => {
      p.x = Math.random() * w; p.y = Math.random() * h;
      p.px = p.x; p.py = p.y;
      p.max = 90 + Math.random() * 170;
      p.life = seed ? Math.random() * p.max : 0;
      p.c = (Math.random() * 3) | 0;
    };
    const build = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(2000, Math.max(700, Math.round((w * h) / 820)));
      ps = [];
      for (let i = 0; i < count; i++) {
        const p: P = { x: 0, y: 0, px: 0, py: 0, life: 0, max: 0, c: 0 };
        spawn(p, true);
        ps.push(p);
      }
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

    const SCALE = 0.0016, SPEED = reduce ? 0 : 1.4, CR = 185, SWIRL = 3.4, PUSH = 0.85;
    let raf = 0, t = 0, vis = true;

    const step = () => {
      t += reduce ? 0 : 0.0016;
      // Fade statt Clear → fließende Spuren (Tinten-Look), warm-weißer Grund
      ctx.fillStyle = reduce ? "#FAF6F1" : "rgba(250,246,241,0.075)";
      ctx.fillRect(0, 0, w, h);

      for (const p of ps) {
        p.px = p.x; p.py = p.y;
        const ang = noise(p.x * SCALE + t, p.y * SCALE - t) * Math.PI * 4;
        let vx = Math.cos(ang) * SPEED;
        let vy = Math.sin(ang) * SPEED;
        if (mouse.has && !reduce) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < CR) {
            const f = 1 - dist / CR;
            vx += (-dy / dist) * f * SWIRL + (dx / dist) * f * PUSH;
            vy += (dx / dist) * f * SWIRL + (dy / dist) * f * PUSH;
          }
        }
        p.x += vx; p.y += vy; p.life += reduce ? 0 : 1;
        if (p.life > p.max || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) spawn(p);
      }

      for (let c = 0; c < 3; c++) {
        ctx.beginPath();
        ctx.strokeStyle = COLORS[c];
        ctx.lineWidth = 1.25;
        ctx.lineCap = "round";
        for (const p of ps) {
          if (p.c !== c) continue;
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      if (mouse.has && !reduce) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, CR);
        g.addColorStop(0, "rgba(212,168,83,0.10)");
        g.addColorStop(1, "rgba(212,168,83,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, CR, 0, 6.2832); ctx.fill();
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

/* ─── KI-Impact-Chart: Kosten ↓ und Ergebnis ↑ über den KI-Einsatz ──────────── */
function smoothPath(pts: [number, number][]) {
  if (pts.length < 2) return "";
  const d: string[] = [`M ${pts[0][0]} ${pts[0][1]}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d.push(`C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`);
  }
  return d.join(" ");
}

function AiImpactChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.3, rootMargin: "0px 0px -18% 0px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const L = 56, Rg = 452, T = 34, B = 244;
  const xs = [0, 25, 50, 75, 100];
  const xPos = (p: number) => L + (p / 100) * (Rg - L);
  const yPos = (v: number) => T + (1 - v) * (B - T);
  const costV = [0.92, 0.78, 0.55, 0.34, 0.18];
  const outV = [0.16, 0.34, 0.56, 0.78, 0.95];
  const costPts = xs.map((x, i) => [xPos(x), yPos(costV[i])] as [number, number]);
  const outPts = xs.map((x, i) => [xPos(x), yPos(outV[i])] as [number, number]);
  const costLine = smoothPath(costPts);
  const outLine = smoothPath(outPts);
  const outArea = `${outLine} L ${Rg} ${B} L ${L} ${B} Z`;
  const drawn = (delay: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: on ? 0 : 1,
    transition: `stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });
  const pop = (delay: number) => ({ opacity: on ? 1 : 0, transition: `opacity 0.5s ease ${delay}s` });

  return (
    <div ref={ref} className="rounded-3xl border border-border bg-white p-6 lg:p-7 shadow-[0_28px_70px_-30px_rgba(26,26,26,0.25)]" aria-hidden="true">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-dark/45">Der KI-Hebel</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-semibold">
          <span className="inline-flex items-center gap-1.5 text-dark/50"><span className="w-3.5 h-[2px] rounded bg-dark/40" />Kosten</span>
          <span className="inline-flex items-center gap-1.5 text-primary"><span className="w-3.5 h-[3px] rounded" style={{ background: "linear-gradient(90deg,#C2722A,#D4A853)" }} />Ergebnis</span>
        </div>
      </div>

      <svg viewBox="0 0 480 270" className="w-full">
        <defs>
          <linearGradient id="aicArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(194,114,42,0.20)" /><stop offset="1" stopColor="rgba(194,114,42,0)" />
          </linearGradient>
          <linearGradient id="aicLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#C2722A" /><stop offset="1" stopColor="#D4A853" />
          </linearGradient>
        </defs>

        {xs.map((x) => (
          <line key={x} x1={xPos(x)} y1={T} x2={xPos(x)} y2={B} stroke="rgba(26,26,26,0.05)" strokeWidth="1" />
        ))}
        <line x1={L} y1={B} x2={Rg} y2={B} stroke="rgba(26,26,26,0.12)" strokeWidth="1" />

        {/* Break-even */}
        <line x1={xPos(50)} y1={T} x2={xPos(50)} y2={B} stroke="rgba(26,26,26,0.14)" strokeWidth="1" strokeDasharray="3 3" style={pop(1.15)} />

        {/* Outcome area + lines */}
        <path d={outArea} fill="url(#aicArea)" style={pop(0.75)} />
        <path d={costLine} fill="none" stroke="rgba(26,26,26,0.4)" strokeWidth="2.5" strokeLinecap="round" pathLength={1} style={drawn(0.15)} />
        <path d={outLine} fill="none" stroke="url(#aicLine)" strokeWidth="3.5" strokeLinecap="round" pathLength={1} style={drawn(0.15)} />

        {/* Endpoints */}
        <circle cx={xPos(100)} cy={yPos(0.18)} r="4" fill="rgba(26,26,26,0.4)" style={pop(1.4)} />
        <circle cx={xPos(100)} cy={yPos(0.95)} r="5" fill="#D4A853" style={pop(1.4)} />
        <circle cx={xPos(50)} cy={(yPos(0.55) + yPos(0.56)) / 2} r="3.5" fill="#C2722A" style={pop(1.25)} />

        {/* X labels */}
        {xs.map((x) => (
          <text key={x} x={xPos(x)} y={262} textAnchor="middle" fontSize="11" fill="rgba(26,26,26,0.4)" fontFamily="monospace">{x}%</text>
        ))}
      </svg>

      <p className="mt-2 text-center text-[11px] text-dark/40">KI-Einsatz im Projekt → mehr Ergebnis bei sinkenden Kosten</p>
    </div>
  );
}

/* ─── SEO × GEO Orbit: Google & KI-Suche fließen in die Website ──────────────── */
function SeoGeoOrbit() {
  return (
    <div className="sgo relative w-full max-w-[480px] mx-auto aspect-square select-none" aria-hidden="true" style={{ animation: "sgoFloat 7s ease-in-out infinite" }}>
      {/* Glow */}
      <div className="absolute inset-[10%] rounded-full blur-[60px]" style={{ background: "radial-gradient(circle, rgba(212,168,83,0.22), rgba(194,114,42,0.05) 60%, transparent 72%)" }} />

      {/* Orbit-Ringe */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ animation: "sgoSpin 40s linear infinite", transformOrigin: "center" }}>
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(194,114,42,0.18)" strokeWidth="0.4" strokeDasharray="1 3" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(26,26,26,0.07)" strokeWidth="0.3" />
      </svg>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ animation: "sgoSpinRev 52s linear infinite", transformOrigin: "center" }}>
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(212,168,83,0.14)" strokeWidth="0.3" strokeDasharray="0.5 4" />
      </svg>

      {/* Beams + fließende Partikel */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="sgoBeam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(194,114,42,0)" /><stop offset="1" stopColor="rgba(194,114,42,0.6)" />
          </linearGradient>
        </defs>
        <path d="M27 30 Q 36 46 50 50" fill="none" stroke="url(#sgoBeam)" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2.5" style={{ animation: "sgoFlow 1.4s linear infinite" }} />
        <path d="M73 70 Q 64 54 50 50" fill="none" stroke="url(#sgoBeam)" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2.5" style={{ animation: "sgoFlow 1.4s linear infinite" }} />
        {[0, 0.7, 1.4].map((b, i) => (
          <circle key={`a${i}`} r="0.9" fill="#C2722A">
            <animateMotion dur="2.1s" repeatCount="indefinite" begin={`${b}s`} path="M27 30 Q 36 46 50 50" />
          </circle>
        ))}
        {[0.35, 1.05, 1.75].map((b, i) => (
          <circle key={`b${i}`} r="0.9" fill="#D4A853">
            <animateMotion dur="2.1s" repeatCount="indefinite" begin={`${b}s`} path="M73 70 Q 64 54 50 50" />
          </circle>
        ))}
      </svg>

      {/* Zentrum: Website */}
      <div className="absolute left-1/2 top-1/2 w-[34%]" style={{ animation: "sgoPulse 4s ease-in-out infinite" }}>
        <div className="rounded-xl border border-dark/10 bg-white shadow-[0_20px_50px_-18px_rgba(194,114,42,0.5)] overflow-hidden">
          <div className="flex items-center gap-1 px-2 py-1.5 bg-[#F7F5F2] border-b border-border">
            <span className="w-1 h-1 rounded-full bg-[#FF5F57]" /><span className="w-1 h-1 rounded-full bg-[#FEBC2E]" /><span className="w-1 h-1 rounded-full bg-[#28C840]" />
          </div>
          <div className="p-2.5 space-y-1.5">
            <span className="block h-1.5 w-2/3 rounded-full" style={{ background: "linear-gradient(90deg,#C2722A,#D4A853)" }} />
            <span className="block h-1 w-full rounded-full bg-dark/10" />
            <span className="block h-1 w-4/5 rounded-full bg-dark/10" />
            <span className="block h-2.5 w-1/2 rounded-md mt-1" style={{ background: "#C2722A" }} />
          </div>
        </div>
        <div className="mt-2 text-center text-[10px] font-bold tracking-wide text-dark/45">Ihre Website</div>
      </div>

      {/* GEO-Orb (KI-Suche / Anthropic-Spark) */}
      <div className="absolute" style={{ left: "8%", top: "12%", width: "27%", animation: "sgoOrbA 6s ease-in-out infinite" }}>
        <div className="relative aspect-square rounded-full flex items-center justify-center shadow-[0_14px_40px_-10px_rgba(194,114,42,0.6)]" style={{ background: "radial-gradient(circle at 35% 30%, #E8A75C, #C2722A 72%)" }}>
          <div className="absolute inset-0 rounded-full" style={{ animation: "sgoGlow 3s ease-in-out infinite" }} />
          <svg viewBox="0 0 40 40" className="w-3/5 h-3/5" style={{ animation: "sgoSpin 18s linear infinite", transformOrigin: "center" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1="20" y1="20" x2="20" y2="3.5" stroke="rgba(255,255,255,0.92)" strokeWidth="2.1" strokeLinecap="round" transform={`rotate(${i * 30} 20 20)`} />
            ))}
            <circle cx="20" cy="20" r="3.2" fill="#fff" />
          </svg>
        </div>
        <div className="mt-2 flex justify-center">
          <span className="rounded-full bg-white/90 border border-primary/20 px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-primary shadow-sm whitespace-nowrap">GEO · KI-Suche</span>
        </div>
      </div>

      {/* SEO-Orb (Google) */}
      <div className="absolute" style={{ right: "8%", bottom: "12%", width: "27%", animation: "sgoOrbB 6.5s ease-in-out infinite" }}>
        <div className="relative aspect-square rounded-full bg-white flex items-center justify-center shadow-[0_14px_40px_-10px_rgba(26,26,26,0.3)]">
          <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, #4285F4, #34A853, #FBBC05, #EA4335, #4285F4)", animation: "sgoSpin 14s linear infinite" }} />
          <div className="absolute inset-[15%] rounded-full bg-white" />
          <svg viewBox="0 0 24 24" className="relative w-2/5 h-2/5 text-[#4285F4]" fill="none" stroke="currentColor" strokeWidth="2.4">
            <circle cx="10.5" cy="10.5" r="6.5" /><path d="M21 21l-5.2-5.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="mt-2 flex justify-center">
          <span className="rounded-full bg-white/90 border border-dark/10 px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-dark/65 shadow-sm whitespace-nowrap">SEO · Google</span>
        </div>
      </div>

      <style>{`
        @keyframes sgoFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes sgoSpin { to { transform: rotate(360deg); } }
        @keyframes sgoSpinRev { to { transform: rotate(-360deg); } }
        @keyframes sgoFlow { to { stroke-dashoffset: -4.5; } }
        @keyframes sgoPulse { 0%,100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.045); } }
        @keyframes sgoOrbA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(7%,7%); } }
        @keyframes sgoOrbB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-7%,-7%); } }
        @keyframes sgoGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(194,114,42,0.4); } 50% { box-shadow: 0 0 0 12px rgba(194,114,42,0); } }
        @media (prefers-reduced-motion: reduce) { .sgo, .sgo * { animation: none !important; } }
      `}</style>
    </div>
  );
}

/* ─── Budget-Stufen (Mittelstand, Custom-Coded) ───────────────────────────────
   Dank KI-Workflows ~40 % unter klassischen Agenturpreisen.                    */
const BUDGETS = [
  { id: "1.5-2.5k", label: "1.500 – 2.500 €", note: "Kompakte Website / One-Pager" },
  { id: "2.5-4.5k", label: "2.500 – 4.500 €", note: "Unternehmenswebsite mit CMS" },
  { id: "4.5-8k", label: "4.500 – 8.000 €", note: "Umfangreiche Website / Shop" },
  { id: "8k+", label: "ab 8.000 €", note: "Individuelle Plattform" },
];

/* ─── Zusatzleistungen (laufend) — Aufpreise marktbasiert recherchiert ────────
   Hosting marktüblich 10–50 €/Mon., Agentur-Wartung 50–200 €/Mon.             */
const ADDONS = [
  { id: "hosting", label: "Hosting & Domain", desc: "Schnelles Hosting, SSL & Domain-Verwaltung", price: "ab 15 €/Mon.", market: "Agenturen meist 10–50 €" },
  { id: "mgmt", label: "Wartung & Management", desc: "Updates, Backups, Monitoring, Content-Pflege", price: "ab 49 €/Mon.", market: "Agenturen meist 50–200 €" },
];

/* ─── Kontaktformular (hell, Seiten-spezifisch) ───────────────────────────── */
function MittelstandContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [customBudget, setCustomBudget] = useState<string>("");
  const [addons, setAddons] = useState<{ hosting: boolean; mgmt: boolean }>({ hosting: false, mgmt: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (budget === "custom" && Number(customBudget) < 700) {
      setErrorMsg("Für ein individuelles Budget sind mindestens 700 € nötig.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    let budgetLabel = BUDGETS.find((b) => b.id === budget)?.label ?? "keine Angabe";
    if (budget === "custom") budgetLabel = customBudget ? `${customBudget} € (individuell, kleine Website)` : "individuell";
    const addonText =
      [addons.hosting && "Hosting & Domain", addons.mgmt && "Wartung & Management"]
        .filter(Boolean).join(", ") || "keine";
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: `Budget: ${budgetLabel}\nZusatzleistungen: ${addonText}\n\n${(form.elements.namedItem("message") as HTMLTextAreaElement).value}`,
      city: "Firmenwebsite",
    };
    try {
      const res = await fetch("/api/city-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        setBudget("");
        setCustomBudget("");
        setAddons({ hosting: false, mgmt: false });
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json.error || "Unbekannter Fehler");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Netzwerkfehler – bitte versuchen Sie es erneut.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark placeholder:text-dark/30 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all";

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border bg-white p-9 shadow-[0_24px_60px_-24px_rgba(26,26,26,0.12)] text-center py-14">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 border border-green-500/25">
          <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-dark font-[family-name:var(--font-heading)]">Anfrage gesendet</h3>
        <p className="mt-2 text-sm text-muted max-w-xs mx-auto">
          Vielen Dank! Sie hören innerhalb von 24 Stunden von uns.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-[0_24px_60px_-24px_rgba(26,26,26,0.12)]"
    >
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">

      {/* ── Spalte links: Kontaktdaten + Nachricht ── */}
      <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="mf-name" className="block text-sm font-medium text-dark mb-1.5">
            Name <span className="text-primary">*</span>
          </label>
          <input id="mf-name" name="name" type="text" required placeholder="Max Mustermann" className={inputClass} />
        </div>
        <div>
          <label htmlFor="mf-company" className="block text-sm font-medium text-dark mb-1.5">Unternehmen</label>
          <input id="mf-company" name="company" type="text" placeholder="Musterfirma GmbH" className={inputClass} />
        </div>
        <div>
          <label htmlFor="mf-email" className="block text-sm font-medium text-dark mb-1.5">
            E-Mail <span className="text-primary">*</span>
          </label>
          <input id="mf-email" name="email" type="email" required placeholder="max@musterfirma.de" className={inputClass} />
        </div>
        <div>
          <label htmlFor="mf-phone" className="block text-sm font-medium text-dark mb-1.5">Telefon</label>
          <input id="mf-phone" name="phone" type="tel" placeholder="+49 621 000 000" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="mf-message" className="block text-sm font-medium text-dark mb-1.5">
          Worum geht&apos;s? <span className="text-dark/35 font-normal">(optional)</span>
        </label>
        <textarea
          id="mf-message"
          name="message"
          rows={7}
          placeholder="Neue Website, Relaunch, Online-Shop — kurz reicht völlig…"
          className={`${inputClass} resize-none`}
        />
      </div>
      </div>

      {/* ── Spalte rechts: Budget + Zusatzleistungen ── */}
      <div className="space-y-5">
      {/* Budget — Einfachauswahl */}
      <div>
        <label className="block text-sm font-medium text-dark mb-1.5">
          Ihr Budget <span className="text-dark/35 font-normal">(eine Auswahl)</span>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {BUDGETS.map((b) => {
            const active = budget === b.id;
            return (
              <label
                key={b.id}
                className="relative flex flex-col gap-0.5 rounded-xl border px-3.5 py-3 cursor-pointer transition-all duration-200"
                style={{
                  borderColor: active ? "rgba(194,114,42,0.55)" : "var(--color-border)",
                  background: active ? "rgba(194,114,42,0.05)" : "#fff",
                  boxShadow: active ? "0 8px 24px -14px rgba(194,114,42,0.45)" : "none",
                }}
              >
                <input
                  type="radio"
                  name="budget"
                  value={b.id}
                  checked={active}
                  onChange={() => setBudget(b.id)}
                  className="sr-only"
                />
                <span className="flex items-center justify-between">
                  <span className="text-sm font-bold text-dark">{b.label}</span>
                  <span
                    className="shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200"
                    style={{ borderColor: active ? "#C2722A" : "rgba(26,26,26,0.2)", background: active ? "#C2722A" : "transparent" }}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                </span>
                <span className="text-[11px] text-muted leading-snug">{b.note}</span>
              </label>
            );
          })}
        </div>

        {/* Eigenes Budget — nur für sehr kleine Websites, ab 700 € */}
        <label
          className="relative mt-2.5 flex items-center gap-3 rounded-xl border px-3.5 py-3 cursor-pointer transition-all duration-200"
          style={{
            borderColor: budget === "custom" ? "rgba(194,114,42,0.55)" : "var(--color-border)",
            background: budget === "custom" ? "rgba(194,114,42,0.05)" : "#fff",
          }}
        >
          <input
            type="radio"
            name="budget"
            value="custom"
            checked={budget === "custom"}
            onChange={() => setBudget("custom")}
            className="sr-only"
          />
          <span
            className="shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200"
            style={{ borderColor: budget === "custom" ? "#C2722A" : "rgba(26,26,26,0.2)", background: budget === "custom" ? "#C2722A" : "transparent" }}
          >
            {budget === "custom" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
          </span>
          <span className="flex-1">
            <span className="text-sm font-bold text-dark">Eigenes Budget</span>
            <span className="block text-[11px] text-muted leading-snug">Nur für sehr kleine Websites · ab 700 €</span>
          </span>
        </label>

        {budget === "custom" && (
          <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/[0.04] px-3.5 py-2.5">
            <span className="text-sm font-semibold text-dark/60">€</span>
            <input
              type="number"
              min={700}
              step={50}
              value={customBudget}
              onChange={(e) => setCustomBudget(e.target.value)}
              placeholder="z. B. 900"
              className="w-full bg-transparent text-sm text-dark placeholder:text-dark/30 focus:outline-none"
            />
            <span className="text-[11px] text-dark/40 whitespace-nowrap">min. 700 €</span>
          </div>
        )}

        <p className="mt-2 text-[11px] text-dark/40">
          Dank KI-Workflows deutlich günstiger als klassische Agenturen — custom-coded
          Websites starten bei uns ab <strong className="text-dark/60 font-semibold">1.500 €</strong>. Den Festpreis legen wir im Erstgespräch fest.
        </p>
      </div>

      {/* Zusatzleistungen — Hosting / Wartung (Mehrfachauswahl) */}
      <div>
        <label className="block text-sm font-medium text-dark mb-1.5">
          Brauchen Sie laufende Betreuung? <span className="text-dark/35 font-normal">(optional)</span>
        </label>
        <div className="space-y-2.5">
          {ADDONS.map((ad) => {
            const on = addons[ad.id as "hosting" | "mgmt"];
            return (
              <label
                key={ad.id}
                className="flex items-center gap-3 rounded-xl border px-3.5 py-3 cursor-pointer transition-all duration-200"
                style={{
                  borderColor: on ? "rgba(194,114,42,0.55)" : "var(--color-border)",
                  background: on ? "rgba(194,114,42,0.05)" : "#fff",
                }}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => setAddons((s) => ({ ...s, [ad.id]: !s[ad.id as "hosting" | "mgmt"] }))}
                  className="sr-only"
                />
                <span
                  className="shrink-0 w-4 h-4 rounded-[5px] border flex items-center justify-center transition-all duration-200"
                  style={{ borderColor: on ? "#C2722A" : "rgba(26,26,26,0.2)", background: on ? "#C2722A" : "transparent" }}
                >
                  {on && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="text-sm font-bold text-dark">{ad.label}</span>
                  <span className="block text-[11px] text-muted leading-snug truncate">{ad.desc}</span>
                </span>
                <span className="text-right shrink-0">
                  <span className="block text-sm font-bold text-primary">{ad.price}</span>
                  <span className="block text-[10px] text-dark/35">{ad.market}</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>
      </div>{/* /Spalte rechts */}

      </div>{/* /2-Spalten-Grid */}

      {status === "error" && <p className="mt-5 text-sm text-red-600">{errorMsg}</p>}

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0 shrink-0"
        >
          {status === "submitting" ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Wird gesendet…
            </>
          ) : (
            "Projekt unverbindlich anfragen →"
          )}
        </button>
        <p className="text-[11px] text-dark/40 sm:flex-1">
          Kostenlos &amp; unverbindlich · Antwort in unter 24 h · Festpreis nach Erstgespräch
        </p>
      </div>
    </form>
  );
}

/* ─── Daten ───────────────────────────────────────────────────────────────── */
const VERSPRECHEN = [
  {
    key: "seogeo",
    label: "Sichtbarkeit",
    title: "SEO- & GEO-optimiert ab Werk",
    desc: "Ihre Website wird für Google gebaut — und für die KI-Suche gleich mit. Saubere Struktur, Schema-Markup und Inhalte, die auch ChatGPT, Perplexity und Google AI Overviews als Quelle zitieren. Zwei Sichtbarkeits-Kanäle, ein Projekt.",
  },
  {
    key: "deploy",
    label: "Geschwindigkeit",
    title: "Time-to-Deploy: verschwindend gering",
    desc: "Wir arbeiten wie ein Produktteam: CI/CD-Pipeline, automatisierte Tests, kontrollierte Releases. Ihre Website geht in Rekordzeit live — und jede Änderung danach in Minuten statt Wochen.",
  },
  {
    key: "ki",
    label: "Kosten",
    title: "KI-Workflows senken die Kosten massiv",
    desc: "KI übernimmt bei uns die Routine: Boilerplate-Code, Tests, Dokumentation, Copy-Varianten. Weniger abgerechnete Stunden bei gleicher handwerklicher Qualität — deshalb ist eine professionelle Website jetzt auch für kleine Unternehmen wirtschaftlich.",
  },
];

const PROGRAMME: { name: string; group: string; role: string; desc: string; logo: React.ReactNode }[] = [
  {
    name: "Semrush",
    group: "Daten",
    role: "Keyword & Wettbewerb",
    desc: "Suchvolumen und Konkurrenz vor dem Konzept — jede Seite zielt auf eine echte Suchanfrage.",
    logo: <ToolLogo tool="semrush" />,
  },
  {
    name: "Ahrefs",
    group: "Daten",
    role: "Backlinks & Content-Gaps",
    desc: "Was rankt in Ihrer Branche, was fehlt? Ihre Website wird gegen die echte Konkurrenz geplant.",
    logo: <ToolLogo tool="ahrefs" />,
  },
  {
    name: "Google",
    group: "Daten",
    role: "Search Console · Analytics",
    desc: "Indexierung, Rankings, Nutzerverhalten — Monitoring und Iteration nach dem Go-Live.",
    logo: <ToolLogo tool="google" />,
  },
  {
    name: "Claude",
    group: "Umsetzung",
    role: "KI-Entwicklung",
    desc: "Boilerplate, Copy-Varianten, Tests und Doku laufen KI-beschleunigt — weniger Stunden, gleicher Anspruch.",
    logo: <img src="/images/logos/claude.svg" alt="Claude Logo" className="w-9 h-9 object-contain" loading="lazy" />,
  },
  {
    name: "GitHub Copilot",
    group: "Umsetzung",
    role: "Pair-Programming",
    desc: "KI-Unterstützung direkt im Editor: schnellerer, saubererer Code bei jedem Feature.",
    logo: <img src="/images/logos/copilot.svg" alt="GitHub Copilot Logo" className="w-9 h-9 object-contain" loading="lazy" />,
  },
  {
    name: "Next.js",
    group: "Umsetzung",
    role: "Framework",
    desc: "Modernes React-Framework: maximale Performance, Core Web Vitals und SEO von Haus aus.",
    logo: (
      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-dark text-white font-black text-sm select-none" aria-hidden="true">
        N
      </span>
    ),
  },
];

const faqs = [
  {
    q: "Was kostet eine Firmenwebsite?",
    a: "Deutlich weniger, als klassische Agenturen aufrufen — genau das ist unser Hebel. KI-Workflows und DevOps-Automatisierung reduzieren die abgerechneten Stunden massiv; solide Business-Websites starten ab 1.500 €. Im kostenlosen Erstgespräch bekommen Sie ein transparentes Festpreisangebot ohne versteckte Kosten.",
  },
  {
    q: "Warum seid ihr günstiger als klassische Agenturen?",
    a: "Drei Gründe: KI übernimmt Routinearbeit (Boilerplate, Tests, Dokumentation, Copy-Varianten), CI/CD-Pipelines ersetzen manuelles Deployment, und es gibt keinen Agentur-Overhead — Sie sprechen direkt mit dem Team, das Ihr Projekt umsetzt. Weniger Stunden, weniger Reibung, gleicher Qualitätsanspruch.",
  },
  {
    q: "Was bedeutet „SEO- und GEO-optimiert\"?",
    a: "SEO macht Ihre Website in der klassischen Google-Suche sichtbar: Technik, Struktur, Inhalte. GEO (Generative Engine Optimization) sorgt dafür, dass auch KI-Systeme wie ChatGPT, Perplexity und Google AI Overviews Ihre Inhalte verstehen und als Quelle zitieren. Immer mehr Kaufentscheidungen beginnen in KI-Antworten — Ihre Website ist auf beides vorbereitet.",
  },
  {
    q: "Wie schnell ist unsere Website online?",
    a: "Durch KI-gestützte Workflows und automatisiertes Deployment deutlich schneller als bei klassischen Agenturen. Den konkreten Zeitplan bekommen Sie mit dem Festpreisangebot — und nach dem Launch sind Änderungen in Minuten live, nicht in Wochen.",
  },
  {
    q: "Können wir Inhalte selbst pflegen?",
    a: "Ja. Je nach Bedarf integrieren wir ein CMS, das Sie ohne Programmierkenntnisse bedienen können — inklusive persönlicher Einweisung. Für alles andere bleibt Ihr Ansprechpartner erreichbar, mit Antwort in unter 24 Stunden.",
  },
  {
    q: "Lohnt sich das auch für kleine Unternehmen?",
    a: "Gerade für kleine Unternehmen. Der KI-Kostenvorteil macht professionelle, custom-codierte Websites erschwinglich, die früher Agentur-Budgets jenseits der 10.000 € erfordert hätten. Eine Website, die gefunden wird und Anfragen bringt, ist für KMU der wirtschaftlichste Vertriebskanal.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function WebsiteMittelstandClient() {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

      {/* Seitenweite 3D-Reveal-Animation */}
      <style>{`
        .m3d {
          opacity: 0;
          transform: translateY(70px) rotateX(-16deg) scale(0.97);
          transform-origin: 50% 20%;
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
          backface-visibility: hidden;
        }
        .m3d.scroll-visible { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); }
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .m3d { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — interaktives Strömungsfeld (Canvas Flow Field)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FDFBF8 0%, #F6F1EA 100%)" }}
      >
        {/* Interaktives Strömungsfeld */}
        <HeroFlow />

        {/* Atmosphäre: warme Glows + Vignette für Lesbarkeit */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-48 right-[-10%] w-[640px] h-[640px] rounded-full blur-[150px]" style={{ background: "rgba(212,168,83,0.16)" }} />
          <div className="absolute bottom-[-10%] -left-40 w-[520px] h-[520px] rounded-full blur-[140px]" style={{ background: "rgba(194,114,42,0.10)" }} />
          {/* sanfte Vignette, damit der Text trägt */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 54% 48% at 50% 44%, rgba(253,251,248,0.72), rgba(253,251,248,0) 64%)" }} />
        </div>

        {/* Farbverlauf ins Weiß der nächsten Sektion */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />

        {/* Copy — zentriert über dem Feld, klar unter der Navbar */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 lg:px-8 pt-36 lg:pt-40 pb-24 text-center">
          <h1
            className="font-[family-name:var(--font-heading)] font-bold text-dark leading-[1.08] mb-6"
            style={{ fontSize: "clamp(29px, 4.1vw, 52px)", letterSpacing: "-0.025em" }}
          >
            <span className="block overflow-hidden pb-1">
              <span className="msReveal block sm:whitespace-nowrap">Firmenwebsite erstellen lassen —</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="msReveal block sm:whitespace-nowrap" style={{ animationDelay: "0.28s" }}>
                <span
                  style={{
                    background: "linear-gradient(95deg, #C2722A 12%, #D4A853 88%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  für KMU & Mittelstand.
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-description text-muted leading-[1.8] mb-9 max-w-2xl mx-auto" style={{ fontSize: "clamp(15px, 1.05vw, 17px)" }}>
            Keine 15.000-€-Agenturprojekte: custom coded, SEO- und GEO-optimiert
            ab der ersten Zeile, deployt über CI/CD-Pipelines — und dank
            KI-Workflows zu einem Preis, der sich auch für kleine Unternehmen
            rechnet. Festpreis, persönlicher Ansprechpartner, Antwort in unter 24 h.
          </p>

          <div className="hero-cta flex flex-wrap justify-center gap-4">
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
            >
              Projekt unverbindlich anfragen
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#ki"
              className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-white/70 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-dark/65 transition-all hover:border-dark/30 hover:bg-white/90 hover:text-dark"
            >
              So arbeiten wir
              <span className="text-primary text-xs float-chevron">↓</span>
            </a>
          </div>

          {/* Trust-Row */}
          <div className="hero-cta mt-9 flex flex-wrap justify-center items-center gap-x-6 gap-y-2.5">
            {["Festpreis garantiert", "Antwort < 24 h", "SEO + GEO inklusive"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 text-[12px] font-semibold text-dark/45">
                <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                {t}
              </span>
            ))}
          </div>

          {/* Interaktions-Hinweis */}
          <div className="hero-cta mt-8 flex justify-center">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium text-dark/35">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary/40 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Cursor bewegen — verwirbeln Sie die Strömung
            </span>
          </div>
        </div>

        {/* Scroll-Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] text-dark/50 font-mono tracking-[0.28em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-dark/30 to-transparent" />
        </div>

        <style>{`
          @keyframes msReveal { from { transform: translateY(108%); } to { transform: translateY(0); } }
          .msReveal { animation: msReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both; }
          @media (prefers-reduced-motion: reduce) { .msReveal { animation: none; } }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          VERSPRECHEN — editoriale Großzeilen mit Gradient-Ziffern
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="scroll-hidden grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-16 items-end mb-8 lg:mb-12">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Das Versprechen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12]">
                Drei Gründe, warum sich<br />das jetzt rechnet.
              </h2>
            </div>
            <p className="text-muted leading-relaxed lg:pb-1.5 lg:text-right">
              Sichtbarkeit, Geschwindigkeit, Kosten — jedes Versprechen hat
              einen technischen Unterbau. Kein Agentur-Sprech.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {VERSPRECHEN.map((v, i) => (
              <div
                key={v.key}
                className="m3d grid lg:grid-cols-[110px_1fr_minmax(0,380px)] gap-6 lg:gap-10 items-center py-10 lg:py-12"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div
                  className="font-[family-name:var(--font-heading)] font-black leading-none select-none"
                  style={{
                    fontSize: "clamp(56px, 6vw, 84px)",
                    background: "linear-gradient(135deg, #C2722A, #D4A853)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase text-dark/35 block mb-2">{v.label}</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark mb-3">{v.title}</h3>
                  <p className="text-muted text-sm lg:text-[15px] leading-relaxed max-w-xl">{v.desc}</p>
                </div>
                <div className="hidden lg:block">
                  {v.key === "seogeo" && (
                    <div className="flex flex-wrap gap-2" aria-hidden="true">
                      {["Google Suche", "AI Overviews", "ChatGPT", "Perplexity", "Schema.org"].map((c) => (
                        <span key={c} className="text-[11px] font-semibold text-dark/60 border border-dark/10 bg-white rounded-full px-3 py-1.5">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                  {v.key === "deploy" && <MiniTerminal />}
                  {v.key === "ki" && <CostBars />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROGRAMME — Hairline-Grid: Daten-Tools + Umsetzungs-Stack
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 overflow-hidden" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="scroll-hidden grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-16 items-end mb-12 lg:mb-14">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Die Programme</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12]">
                Womit wir arbeiten.
              </h2>
            </div>
            <p className="text-muted leading-relaxed lg:pb-1.5 lg:text-right">
              Daten-Tools für die Strategie, KI und ein moderner Stack für die
              Umsetzung — Werkzeuge im täglichen Einsatz, keine Logo-Deko.
            </p>
          </div>

          <div className="m3d grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {PROGRAMME.map((p) => (
              <div key={p.name} className="group relative bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-[#FBF8F4]">
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between mb-7">
                  {p.logo}
                  <span className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-dark/25 group-hover:text-primary/60 transition-colors duration-300">
                    {p.group}
                  </span>
                </div>
                <div className="font-bold text-dark text-lg mb-0.5">{p.name}</div>
                <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-primary mb-3">{p.role}</div>
                <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          METHODE 01 — KI-gestützte Entwicklung (Chart: Kosten ↓ / Ergebnis ↑)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="ki" className="bg-white py-24 lg:py-32 scroll-mt-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="scroll-hidden">
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Website erstellen · KI-Entwicklung</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-5">
              KI baut mit.<br />Ihr Budget atmet auf.
            </h2>
            <p className="text-muted leading-relaxed mb-7 max-w-lg">
              Boilerplate, Tests, Dokumentation, Copy-Varianten — die Routine
              übernimmt KI, die Entscheidungen treffen wir. Je höher der KI-Einsatz
              im Projekt, desto kürzer die Time-to-Deploy, desto niedriger die
              Kosten und desto höher das Ergebnis. Diesen Hebel geben wir als
              Festpreis an Sie weiter.
            </p>
            <ul className="space-y-3.5 mb-8">
              {[
                "Time-to-Deploy drastisch verkürzt",
                "Weniger abgerechnete Stunden, gleicher Qualitätsanspruch",
                "Professionelle Website auch mit kleinem Budget",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-dark">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <AiStackChips />
          </div>

          <div className="m3d" style={{ transitionDelay: "100ms" }}>
            <AiImpactChart />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          METHODE 02 — DevOps & CI/CD (Pipeline-Visual links)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="devops" className="py-24 lg:py-32 scroll-mt-20 overflow-hidden" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="m3d order-last lg:order-first" style={{ transitionDelay: "100ms" }}>
            <div className="rounded-3xl border border-border bg-white p-7 lg:p-8 shadow-[0_28px_70px_-30px_rgba(26,26,26,0.2)]">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-dark/35 mb-6">Deployment-Pipeline</div>
              <PipelineChips />
              <div className="mt-7 pt-6 border-t border-border">
                <MiniTerminal />
              </div>
            </div>
          </div>

          <div className="scroll-hidden">
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Website erstellen · DevOps &amp; Deploy</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-5">
              Live in Minuten.<br />Nicht in Wochen.
            </h2>
            <p className="text-muted leading-relaxed mb-7 max-w-lg">
              Wir arbeiten wie ein Produktteam: jede Änderung läuft durch
              automatisierte Tests und geht über die CI/CD-Pipeline live —
              kontrolliert, versioniert, jederzeit zurückrollbar. Kein „das spielen
              wir nächste Woche ein“, kein manuelles FTP-Chaos.
            </p>
            <ul className="space-y-3.5">
              {[
                "Automatisierte Tests bei jedem Commit",
                "Deployment per Pipeline statt Handarbeit",
                "Rollback jederzeit — null Risiko beim Go-Live",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-dark">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          METHODE 03 — SEO & GEO (Orbit-Animation rechts)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="seo-geo" className="bg-white py-24 lg:py-32 scroll-mt-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="scroll-hidden">
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Website erstellen · SEO &amp; GEO</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-5">
              Gefunden in Google —<br />und in der KI-Suche.
            </h2>
            <p className="text-muted leading-relaxed mb-7 max-w-lg">
              Ihre Website wird für zwei Welten gebaut: <strong className="text-dark font-semibold">SEO</strong> bringt
              Sie in der klassischen Google-Suche nach vorn, <strong className="text-dark font-semibold">GEO</strong> (Generative
              Engine Optimization) sorgt dafür, dass auch ChatGPT, Perplexity und
              Google AI Overviews Ihre Inhalte verstehen und als Quelle zitieren.
              Zwei Sichtbarkeits-Kanäle, ein Projekt.
            </p>
            <div className="grid sm:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden max-w-xl">
              <div className="bg-white p-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#4285F4]" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <circle cx="10.5" cy="10.5" r="6.5" /><path d="M21 21l-5.2-5.2" strokeLinecap="round" />
                  </svg>
                  <span className="font-bold text-dark text-sm">SEO · Google</span>
                </div>
                <p className="text-muted text-[13px] leading-relaxed">
                  Sauberes technisches Fundament: Schema-Markup, semantisches HTML,
                  schnelle Core Web Vitals und eine Seitenstruktur, die auf echte
                  Suchanfragen zielt — für Top-Platzierungen in der organischen Suche.
                </p>
              </div>
              <div className="bg-white p-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-primary text-base leading-none">✦</span>
                  <span className="font-bold text-dark text-sm">GEO · KI-Suche</span>
                </div>
                <p className="text-muted text-[13px] leading-relaxed">
                  Zitierfähige, klar strukturierte Inhalte, damit ChatGPT, Perplexity
                  und Google AI Overviews Ihre Website als Quelle nennen — der
                  Sichtbarkeits-Kanal, über den immer mehr Kaufentscheidungen starten.
                </p>
              </div>
            </div>
          </div>

          <div className="m3d flex items-center justify-center" style={{ transitionDelay: "100ms" }}>
            <SeoGeoOrbit />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BRANCHEN — für wen wir bauen (Pill-Cloud, kein Grid)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 overflow-hidden" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="scroll-hidden">
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Für wen wir bauen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-5">
              Websites für den Mittelstand —<br />Ihre Branche ist dabei.
            </h2>
            <p className="text-muted leading-relaxed max-w-2xl mx-auto mb-10">
              Vom Handwerksbetrieb bis zum Maschinenbauer: Wir kennen die Anforderungen
              mittelständischer Branchen und bauen Websites, die genau dort Anfragen bringen.
            </p>
          </div>
          <div className="scroll-hidden flex flex-wrap justify-center gap-2.5 lg:gap-3">
            {[
              { l: "Handwerk & Bau", hot: true },
              { l: "Maschinenbau & Industrie", hot: false },
              { l: "Ärzte & Praxen", hot: true },
              { l: "Kanzleien & Steuerberatung", hot: false },
              { l: "Gastronomie & Hotellerie", hot: true },
              { l: "Einzelhandel & Online-Shops", hot: false },
              { l: "Dienstleister & Agenturen", hot: false },
              { l: "Immobilien & Bauträger", hot: true },
              { l: "Pflege & Soziales", hot: false },
              { l: "Vereine & Verbände", hot: false },
              { l: "B2B & Großhandel", hot: true },
            ].map((b) => (
              <span
                key={b.l}
                className="inline-flex items-center gap-2 rounded-full border px-4 lg:px-5 py-2.5 text-sm font-medium"
                style={b.hot
                  ? { borderColor: "rgba(194,114,42,0.35)", background: "rgba(194,114,42,0.06)", color: "#1A1A1A" }
                  : { borderColor: "var(--color-border)", background: "#fff", color: "rgba(26,26,26,0.65)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: b.hot ? "#C2722A" : "rgba(26,26,26,0.2)" }} />
                {b.l}
              </span>
            ))}
          </div>
          <p className="scroll-hidden mt-8 text-sm text-dark/45">
            Ihre Branche nicht dabei? Wir bauen für jedes Geschäftsmodell — <Link href="/kontakt" className="text-primary font-semibold hover:underline">kurz anfragen</Link>.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          RECHTSSICHER — DSGVO & Barrierefreiheit (BFSG)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="scroll-hidden">
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Rechtssicher ab Werk</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-5">
              DSGVO-konform und barrierefrei —<br />Pflicht, kein Extra.
            </h2>
            <p className="text-muted leading-relaxed mb-4 max-w-lg">
              Seit dem 28. Juni 2025 verpflichtet das Barrierefreiheitsstärkungsgesetz (BFSG)
              viele Unternehmen zu barrierefreien Websites. Nachrüsten ist teuer — deshalb bauen
              wir Barrierefreiheit und Datenschutz von der ersten Zeile an ein, nicht als Nachgedanke.
            </p>
            <p className="text-muted leading-relaxed max-w-lg">
              Das senkt dein Abmahnrisiko und erreicht gleichzeitig mehr Menschen: barrierearme,
              DSGVO-konforme Seiten ranken besser und konvertieren mehr.
            </p>
          </div>
          <div className="m3d rounded-3xl border border-border bg-offwhite p-7 lg:p-8">
            <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-dark/45 mb-5">Ab Werk enthalten</div>
            <ul className="space-y-4">
              {[
                ["DSGVO-konform", "Cookie-Consent, Datenschutzerklärung, datensparsame Formulare"],
                ["Barrierefrei (BFSG)", "WCAG-orientiert: gute Kontraste, Tastaturbedienung, semantisches HTML"],
                ["SSL & sichere Technik", "HTTPS, aktueller Stack, keine veralteten Plugins"],
                ["Rechtstexte sauber eingebunden", "Impressum, Datenschutz & Cookie-Banner korrekt verlinkt"],
              ].map(([t, d]) => (
                <li key={t} className="flex items-start gap-3.5">
                  <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                  </span>
                  <div>
                    <div className="font-bold text-dark text-sm">{t}</div>
                    <div className="text-muted text-[13px] leading-relaxed">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TCO — Baukasten vs. Custom (Fließtext, keine Tabelle)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 overflow-hidden" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center scroll-hidden">
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Was sich wirklich rechnet</span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[44px] font-bold text-dark leading-[1.12] mb-7">
            Der billigste Weg ist<br />selten der günstigste.
          </h2>
          <div className="space-y-5 text-lg text-muted leading-relaxed">
            <p>
              Baukasten und KI-Generatoren wirken günstig — bis die laufenden Gebühren, das
              generische Design, Sicherheits-Updates, rechtliche Lücken und vor allem deine eigene
              Zeit dazukommen. Über die Jahre wird daraus oft der teurere Weg.
            </p>
            <p>
              Eine custom-coded Website von SeoForge ist ein planbarer Festpreis: schnell, sicher,
              rechtssicher und ohne Plugin-Wildwuchs. Du zahlst einmal für etwas, das verkauft —
              statt monatlich für etwas, das aussieht wie tausend andere.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          KONTAKT — kein Roadmap-Theater: direkt anfragen
      ══════════════════════════════════════════════════════════════════ */}
      <section id="kontakt" className="scroll-mt-20 border-y border-border" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16 lg:py-20">

          {/* Kompakter Header (horizontal) */}
          <div className="scroll-hidden flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8 lg:mb-10">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ So einfach ist das</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-dark leading-tight">
                Kein Prozess-Theater. Eine Anfrage genügt.
              </h2>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end shrink-0">
              {["Antwort < 24 h", "Festpreis, kein Scope Creep", "Persönlicher Ansprechpartner"].map((item) => (
                <li key={item} className="inline-flex items-center gap-2 text-[13px] font-medium text-dark/55">
                  <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Formular — volle Breite, 2-spaltig (platzsparend) */}
          <div className="m3d">
            <MittelstandContactForm />
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
              Website-Erstellung für den Mittelstand
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
          VERWANDTE LEISTUNGEN + CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Verwandte Leistungen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">
              Das könnte auch interessant sein
            </h2>
            <Link href="/webdesign" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
              Alle Webdesign-Leistungen im Überblick <span>→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Website erstellen lassen", href: "/webdesign/website-erstellen-lassen", desc: "Der komplette Überblick: Prozess, Kosten, Technologie." },
              { title: "Landing Pages", href: "/webdesign/landingpage-erstellen-lassen", desc: "Eine Seite, ein Ziel — für Kampagnen und Lead-Generierung." },
              { title: "Website Relaunch", href: "/webdesign/website-relaunch-agentur", desc: "Modernisieren ohne Rankings zu verlieren." },
              { title: "GEO Optimierung", href: "/geo/optimierung", desc: "Sichtbarkeit in ChatGPT, Perplexity & AI Overviews." },
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

      <section className="relative py-24 overflow-hidden" style={{ background: "#1A1A1A" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-primary/[0.07] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="scroll-hidden">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-4">
              Ihre neue Website — zum Mittelstands-Preis.
            </h2>
            <p className="text-white/55 text-lg mb-3 leading-relaxed">
              Zwei Sätze genügen. Wir melden uns mit einer ehrlichen Einschätzung
              und einem Festpreis.
            </p>
            <p className="text-white/35 text-sm mb-9">
              Persönlicher Ansprechpartner · Antwort garantiert in unter 24 Stunden
            </p>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              Projekt unverbindlich anfragen →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
