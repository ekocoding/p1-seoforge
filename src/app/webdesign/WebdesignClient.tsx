"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "../components/SubpageLayout";

// ─────────────────────────────────────────────────
//  WEBGL SHADER — fractional Brownian motion / domain warping
//  (Inigo Quilez technique — runs entirely on GPU)
// ─────────────────────────────────────────────────
function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const t0Ref = useRef<number>(0);
  const mouseRef = useRef<[number, number]>([0.5, 0.5]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const glMaybe = canvas.getContext("webgl");
    if (!glMaybe) return;
    const gl = glMaybe;

    // ── Vertex shader ──────────────────────────────
    const VS = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    // ── Fragment shader ────────────────────────────
    const FS = `
      precision mediump float;
      uniform float  u_time;
      uniform vec2   u_res;
      uniform vec2   u_mouse;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1,0)), f.x),
          mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
          f.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
        for (int i = 0; i < 6; i++) {
          v += a * noise(p);
          p = rot * p * 2.1 + vec2(1.7, 9.2);
          a *= 0.48;
        }
        return v;
      }

      void main() {
        vec2 uv  = gl_FragCoord.xy / u_res;
        float  t = u_time * 0.14;

        vec2 q = vec2(
          fbm(uv * 2.5 + t * 0.9),
          fbm(uv * 2.5 + vec2(5.2, 1.3) + t)
        );
        vec2 r = vec2(
          fbm(uv * 2.5 + 4.0*q + vec2(1.7, 9.2) + t * 1.1),
          fbm(uv * 2.5 + 4.0*q + vec2(8.3, 2.8) + t * 0.9)
        );
        float f = fbm(uv * 2.5 + 4.0 * r);

        // Mouse warm-glow
        float md = length(uv - u_mouse);
        f += 0.14 * smoothstep(0.55, 0.0, md);

        // Palette — stays dark, subtle brand-colour swirls
        vec3 base   = vec3(0.068, 0.062, 0.060);
        vec3 warm   = vec3(0.13,  0.085, 0.045);
        vec3 orange = vec3(0.761, 0.447, 0.165);
        vec3 gold   = vec3(0.831, 0.659, 0.325);

        vec3 col = mix(base, warm,   smoothstep(0.30, 0.55, f));
        col = mix(col,  orange, smoothstep(0.55, 0.80, f) * 0.30);
        col = mix(col,  gold,   pow(max(f - 0.7, 0.0), 2.0) * 1.8 * 0.18);

        // Vignette
        vec2 c = uv - 0.5;
        float vign = 1.0 - dot(c, c) * 1.4;
        col *= vign;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function mkShader(type: number, src: string) {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (ts: number) => {
      if (!t0Ref.current) t0Ref.current = ts;
      const t = (ts - t0Ref.current) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current[0], mouseRef.current[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = [
        (e.clientX - r.left) / canvas.width,
        1 - (e.clientY - r.top) / canvas.height,
      ];
    };

    resize();
    rafRef.current = requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouse);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

// ─────────────────────────────────────────────────
//  SCROLL REVEAL
// ─────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      className="reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────
//  TECH STACK — interactive 3D-tilt cards + detail panel
// ─────────────────────────────────────────────────
const TECH_LAYERS = [
  {
    num: "01",
    category: "SEO-Fundament",
    headline: "Technisches SEO · Core Web Vitals · Schema",
    color: "#1A1A1A",
    colorDark: "#2d2d2d",
    accent: "rgba(194,114,42,0.15)",
    desc: "Ohne ein starkes SEO-Fundament kann kein Design und keine Entwicklung etwas bewirken. Wir bauen es als erstes — nicht als letztes.",
    items: [
      { name: "URL-Struktur",   note: "SEO-optimierte Architektur" },
      { name: "Schema Markup",  note: "Strukturierte Daten" },
      { name: "LCP · CLS · FID", note: "Core Web Vitals" },
      { name: "Interne Links",  note: "Linkarchitektur & PageRank" },
      { name: "Sitemap & Robots", note: "Crawling & Indexierung" },
      { name: "PageSpeed 96+",  note: "By default" },
    ],
    impact: { val: "#1", label: "Google-Ranking erreichbar" },
    chipStyle: { bg: "rgba(255,255,255,0.12)", text: "rgba(255,255,255,0.85)" },
    darkCard: true,
  },
  {
    num: "02",
    category: "Entwicklung",
    headline: "Next.js · React · TypeScript · Vercel",
    color: "#C2722A",
    colorDark: "#a05020",
    accent: "rgba(212,168,83,0.12)",
    desc: "Blazing-fast Websites mit dem modernsten Stack. Server-Side Rendering, statische Generierung und Edge-Deployment für maximale Performance.",
    items: [
      { name: "Next.js 15",      note: "App Router, SSR/SSG" },
      { name: "TypeScript",      note: "Type-safe Code" },
      { name: "CI/CD Pipeline",  note: "Netlify / Vercel Deploy" },
      { name: "Edge Functions",  note: "Globale Performance" },
      { name: "Image Optimization", note: "Automatisch & WebP" },
      { name: "Web Vitals 96+",  note: "Performance by default" },
    ],
    impact: { val: "2–3×", label: "schneller als WordPress" },
    chipStyle: { bg: "rgba(255,255,255,0.18)", text: "rgba(255,255,255,0.9)" },
    darkCard: true,
  },
  {
    num: "03",
    category: "Design & UX",
    headline: "Figma · Wireframes · Conversion-Opt.",
    color: "#D4A853",
    colorDark: "#b8903a",
    accent: "rgba(194,114,42,0.08)",
    desc: "Design, das nicht nur schön aussieht — sondern konvertiert. Figma-Prototypen, UX-Research und datengetriebene CRO sind unser Standard.",
    items: [
      { name: "Figma Prototypen", note: "UI-Design & Wireframes" },
      { name: "Mobile-First",     note: "Responsive Layouts" },
      { name: "UX-Flows",         note: "Nutzerführung" },
      { name: "A/B-Testing",      note: "Conversion-Optimierung" },
      { name: "Design System",    note: "Konsistente UI" },
      { name: "Accessibility",    note: "WCAG 2.1 konform" },
    ],
    impact: { val: "+143%", label: "mehr Conversions" },
    chipStyle: { bg: "rgba(255,255,255,0.20)", text: "rgba(255,255,255,0.9)" },
    darkCard: true,
  },
];

function TiltCard({
  children, style = {}, onClick, isActive = false, className = "",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -ny * 8, y: nx * 8 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false); }}
      onClick={onClick}
      className={className}
      style={{
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isActive ? 1.015 : hov ? 1.005 : 1})`,
        transition: hov ? "transform 0.08s ease, box-shadow 0.2s" : "transform 0.5s ease, box-shadow 0.35s",
        willChange: "transform",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function TechStackInteractive() {
  const [active, setActive] = useState(0);
  const layer = TECH_LAYERS[active];

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-5 lg:gap-8 items-start">

      {/* ── Left: clickable layer cards ── */}
      <div className="space-y-3">
        {TECH_LAYERS.map((l, i) => {
          const on = active === i;
          return (
            <TiltCard
              key={i}
              isActive={on}
              onClick={() => setActive(i)}
              className="rounded-2xl overflow-hidden select-none"
              style={{
                background: on
                  ? `linear-gradient(135deg, ${l.color} 0%, ${l.colorDark} 100%)`
                  : "white",
                border: on ? "none" : "1px solid #E5E3DF",
                boxShadow: on
                  ? `0 24px 56px rgba(0,0,0,0.20), 0 0 0 1px rgba(255,255,255,0.06)`
                  : "0 2px 12px rgba(0,0,0,0.05)",
              }}
            >
              {/* Inner glow for active */}
              {on && (
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 90% 10%, rgba(255,255,255,0.09) 0%, transparent 55%)" }}
                  aria-hidden="true" />
              )}

              <div className="relative flex items-center gap-5 px-6 py-5 lg:py-6">
                {/* Step circle */}
                <div className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  on ? "bg-white/20 text-white" : "bg-offwhite text-primary border border-primary/15"
                }`}>
                  {i + 1}
                </div>

                {/* Title block */}
                <div className="flex-1 min-w-0">
                  <p className={`text-[10px] font-bold tracking-[0.22em] uppercase mb-0.5 transition-colors duration-300 ${on ? "text-white/50" : "text-primary/55"}`}>
                    {l.category}
                  </p>
                  <h3 className={`font-[family-name:var(--font-heading)] font-bold leading-snug transition-colors duration-300 ${on ? "text-white" : "text-dark"}`}
                    style={{ fontSize: "clamp(13px, 1.4vw, 17px)" }}>
                    {l.headline}
                  </h3>
                </div>

                {/* Indicator */}
                <svg
                  className={`shrink-0 w-5 h-5 transition-all duration-300 ${on ? "text-white rotate-180" : "text-muted/40"}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Chip row */}
              <div className={`flex flex-wrap gap-1.5 px-6 pb-5 transition-opacity duration-300 ${on ? "opacity-100" : "opacity-50"}`}>
                {l.items.slice(0, 4).map(item => (
                  <span key={item.name}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={on
                      ? { background: l.chipStyle.bg, color: l.chipStyle.text }
                      : { background: "#F8F7F5", color: "#6B6B6B", border: "1px solid #E5E3DF" }
                    }>
                    {item.name}
                  </span>
                ))}
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* ── Right: detail panel ── */}
      <div
        key={active}
        className="rounded-3xl border border-border bg-white p-7 lg:p-8 relative overflow-hidden"
        style={{ animation: "fadeUpIn 0.3s ease" }}
      >
        {/* Ghost number */}
        <span
          className="absolute -right-3 -top-4 font-[family-name:var(--font-heading)] font-bold leading-none select-none pointer-events-none"
          style={{ fontSize: "120px", color: "transparent", WebkitTextStroke: "1px rgba(26,26,26,0.045)" }}
          aria-hidden="true"
        >
          {layer.num}
        </span>

        <div className="relative">
          {/* Eyebrow */}
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-primary mb-3">{layer.category}</p>

          {/* Impact stat */}
          <div className="flex items-baseline gap-2 mb-4">
            <span
              className="font-[family-name:var(--font-heading)] font-bold text-dark leading-none"
              style={{ fontSize: "clamp(40px, 4.5vw, 56px)" }}
            >
              {layer.impact.val}
            </span>
            <span className="text-sm text-muted font-medium leading-tight max-w-[100px]">{layer.impact.label}</span>
          </div>

          {/* Accent line */}
          <div className="h-px mb-5 rounded-full"
            style={{ background: `linear-gradient(to right, ${layer.color}50, transparent)` }} />

          {/* Description */}
          <p className="text-muted text-sm leading-relaxed mb-6">{layer.desc}</p>

          {/* Tech grid */}
          <div className="grid grid-cols-2 gap-2">
            {layer.items.map(item => (
              <div key={item.name}
                className="bg-offwhite rounded-xl p-3 border border-border hover:border-primary/20 hover:bg-white transition-all duration-200 group">
                <p className="text-xs font-bold text-dark group-hover:text-primary transition-colors mb-0.5">{item.name}</p>
                <p className="text-[10px] text-muted leading-tight">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Bottom label */}
          <div className="mt-5 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-muted/60">
              Layer {layer.num} von 03
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
//  PROCESS STEPPER
// ─────────────────────────────────────────────────
const STEPS = [
  {
    num: "01", title: "Analyse & Strategie", short: "Fundament legen",
    desc: "Wir analysieren deine Ziele, deine Wettbewerber und das Keyword-Potenzial — bevor eine Linie gezeichnet wird. Die SEO-Architektur ist der erste Schritt.",
    items: ["Anforderungsanalyse", "Keyword-Research", "Seitenarchitektur", "Wettbewerberanalyse"],
  },
  {
    num: "02", title: "Design & Konzept", short: "Vision sichtbar machen",
    desc: "Wireframes in Figma, vollständiges UI-Design-System, interaktive Prototypen. Du gibst Feedback, bevor eine Zeile Code geschrieben wird. Mobile-First ist Standard.",
    items: ["Wireframes & Flows", "UI-Design in Figma", "Interaktive Prototypen", "Design-Review-Runden"],
  },
  {
    num: "03", title: "Entwicklung", short: "Code trifft Performance",
    desc: "Next.js nach höchsten Standards. Server-Side Rendering, statische Generierung, Core Web Vitals optimiert bis jede Millisekunde stimmt.",
    items: ["Next.js / TypeScript", "CMS-Integration", "Core Web Vitals 96+", "Performance-Tests"],
  },
  {
    num: "04", title: "Launch & SEO", short: "Live und sichtbar",
    desc: "Go-Live mit Search-Console-Setup, Analytics-Konfiguration und initialem Ranking-Monitoring. Wir begleiten die ersten Wochen nach dem Launch aktiv.",
    items: ["Launch & Deployment", "Google Search Console", "Analytics-Setup", "Ranking-Monitoring"],
  },
];

function ProcessStepper() {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Timeline */}
      <div className="relative flex items-start justify-between max-w-2xl mx-auto mb-12 px-2">
        <div className="absolute top-5 left-8 right-8 h-px bg-border" />
        <div
          className="absolute top-5 left-8 h-px bg-primary transition-all duration-700 ease-out"
          style={{ width: `calc(${(active / 3) * 100}% * ((100% - 64px) / 100%))`, maxWidth: "calc(100% - 64px)" }}
        />
        {STEPS.map((step, i) => (
          <button key={step.num} onClick={() => setActive(i)} className="relative flex flex-col items-center gap-2.5 group">
            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              active === i ? "bg-primary text-white scale-110 shadow-lg shadow-primary/25"
                : i < active ? "bg-primary/15 text-primary border border-primary/30"
                : "bg-white text-muted border border-border group-hover:border-primary/30 group-hover:text-primary"
            }`}>
              {i < active ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (i + 1)}
            </div>
            <span className={`text-xs font-semibold hidden sm:block transition-colors ${active === i ? "text-primary" : "text-muted/50"}`}>
              {step.short}
            </span>
          </button>
        ))}
      </div>

      {/* Detail card */}
      <div
        key={active}
        className="max-w-3xl mx-auto rounded-3xl border border-border bg-white p-8 lg:p-10 shadow-sm"
        style={{ animation: "fadeUpIn 0.35s ease" }}
      >
        <style>{`@keyframes fadeUpIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
        <div className="flex items-start gap-6">
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/[0.08] flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{STEPS[active].num}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-dark font-[family-name:var(--font-heading)] mb-3">{STEPS[active].title}</h3>
            <p className="text-muted leading-relaxed mb-6">{STEPS[active].desc}</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {STEPS[active].items.map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-sm font-medium text-dark">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
          <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}
            className="flex items-center gap-2 text-sm font-medium text-muted hover:text-dark disabled:opacity-25 transition-colors">
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            Zurück
          </button>
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-200 ${i === active ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-border hover:bg-primary/30"}`} />
            ))}
          </div>
          <button onClick={() => setActive(Math.min(3, active + 1))} disabled={active === 3}
            className="flex items-center gap-2 text-sm font-medium text-muted hover:text-dark disabled:opacity-25 transition-colors">
            Weiter
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────
const PILLAR_SERVICES = [
  { href: "/webdesign/website-erstellen-lassen", num: "01", title: "Website erstellen lassen", short: "Von der ersten Wireframe-Skizze bis zum perfekt optimierten Launch — maßgeschneidert.", tags: ["Next.js", "SEO-ready", "Mobile-First"] },
  { href: "/webdesign/landing-pages",            num: "02", title: "Landing Pages",             short: "High-converting Seiten für Kampagnen, Ads und maximale Lead-Generierung.",          tags: ["A/B Testing", "CRO", "Schnell live"] },
  { href: "/webdesign/website-relaunch",         num: "03", title: "Website Relaunch",          short: "Modernisierung deiner bestehenden Website ohne einen einzigen Ranking-Verlust.",    tags: ["301-Weiterleitungen", "Migration", "Performance"] },
  { href: "/webdesign/app-design",               num: "04", title: "App Design",                short: "Native UX/UI für Web-Apps und Mobile — Figma-Prototypen bis zur Implementierung.", tags: ["Figma", "UX Research", "Prototyping"] },
];

const faqs = [
  { q: "Was kostet eine professionelle Website?", a: "Die Investition hängt von Umfang und Komplexität ab. Business-Websites starten ab 2.500 €, E-Commerce-Lösungen ab 5.000 €. Im kostenlosen Erstgespräch erstellen wir ein transparentes Angebot." },
  { q: "Wie lange dauert die Entwicklung?", a: "Standard-Websites sind in 4–6 Wochen fertig: 1 Woche Analyse, 2 Wochen Design, 2 Wochen Entwicklung, 1 Woche Testing & Launch. E-Commerce-Projekte dauern 8–12 Wochen." },
  { q: "Was ist der Vorteil von Next.js gegenüber WordPress?", a: "Next.js liefert 2–3× schnellere Ladezeiten, bessere Core Web Vitals und mehr Sicherheit als WordPress — direkt messbar in besseren Google-Rankings." },
  { q: "Wie stellt ihr sicher, dass meine Website bei Google rankt?", a: "Als SEO-Agentur bauen wir SEO von Anfang an ein: saubere URL-Struktur, Schema-Markup, technische Optimierung, Core Web Vitals und ein Content-Plan. Deine Website ist vom ersten Tag rankingfähig." },
  { q: "Bietet ihr auch Website-Relaunches an?", a: "Ja. Wir analysieren zuerst deine bestehende Website und migrieren sauber mit 301-Weiterleitungen und Search-Console-Monitoring — kein Ranking-Verlust." },
  { q: "Kann ich meine Website nach dem Launch selbst bearbeiten?", a: "Absolut. Je nach Projekt integrieren wir Sanity, Contentful oder WordPress — du bearbeitest Inhalte ohne technische Kenntnisse." },
];

// ─────────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────────
export default function WebdesignClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ══════════════════════════════════════════
          HERO — the ONLY dark section
          WebGL shader fills the canvas
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ background: "#0e0d0d" }}>
        {/* WebGL Shader */}
        <ShaderCanvas />

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0e0d0d)" }} aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-16 w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:items-center">

            {/* ── Text column ── */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(12px)", transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Webdesign & SEO — aus einer Hand
              </div>

              {/* Ghost display text */}
              <div aria-hidden="true"
                className="leading-none font-[family-name:var(--font-heading)] font-bold uppercase select-none mb-1"
                style={{
                  fontSize: "clamp(70px, 11vw, 150px)",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "none" : "translateY(16px)",
                  transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
                }}
              >
                DESIGN
              </div>

              {/* Real headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-bold leading-[1.07] text-white font-[family-name:var(--font-heading)] mb-6 -mt-2 lg:-mt-5"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(16px)", transition: "opacity 0.7s 0.3s, transform 0.7s 0.3s" }}>
                Websites, die ranken.
                <br />
                <span style={{ background: "linear-gradient(95deg, #C2722A 10%, #D4A853 90%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Designs, die konvertieren.
                </span>
              </h1>

              <p className="text-white/50 text-lg leading-relaxed max-w-lg mb-10"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(12px)", transition: "opacity 0.7s 0.4s, transform 0.7s 0.4s" }}>
                Als SEO-Agentur bauen wir Websites anders: Core Web Vitals,
                technisches SEO und Conversion-Optimierung sind keine Extras —
                sie sind das Fundament.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(10px)", transition: "opacity 0.7s 0.5s, transform 0.7s 0.5s" }}>
                <Link href="/kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5">
                  Kostenloses Gespräch
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <a href="#leistungen"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/75 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white">
                  Leistungen ansehen
                </a>
              </div>

              {/* Metrics row */}
              <div className="flex flex-wrap gap-8"
                style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.7s 0.65s" }}>
                {[
                  { val: "96+",    label: "PageSpeed by default" },
                  { val: "4–6 W",  label: "Time to Launch" },
                  { val: "200+",   label: "Websites gebaut" },
                ].map(m => (
                  <div key={m.val} className="flex items-baseline gap-2">
                    <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white">{m.val}</span>
                    <span className="text-xs text-white/35 font-medium leading-tight max-w-[64px]">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Image column ── */}
            <div className="relative hidden lg:block"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px) scale(0.97)", transition: "opacity 0.8s 0.5s, transform 0.8s 0.5s" }}>
              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl"
                style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
                <Image
                  src="/images/webdesign-hero-workspace.jpg"
                  alt="Web Designer Workspace"
                  fill
                  sizes="420px"
                  className="object-cover"
                  style={{ objectPosition: "center 30%" }}
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(14,13,13,0.1) 0%, rgba(14,13,13,0.5) 100%)" }} />

                {/* Floating stats */}
                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{ animation: "float 4s ease-in-out infinite" }}>
                  <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 font-medium">PageSpeed</div>
                    <div className="text-base font-bold text-white">96 / 100</div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{ animation: "float 4.5s ease-in-out infinite 0.8s" }}>
                  <div className="w-8 h-8 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 font-medium">Google Ranking</div>
                    <div className="text-base font-bold text-white">#1 in 8 Wochen</div>
                  </div>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3"
                  style={{ animation: "float 5s ease-in-out infinite 1.4s" }}>
                  <div className="text-xs text-white/50 font-medium mb-0.5">Launch in</div>
                  <div className="text-base font-bold text-white">4–6 Wochen</div>
                </div>
              </div>

              {/* Subtle outer glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: "0 0 60px rgba(194,114,42,0.15)" }} aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          style={{ animation: "fadeIn 1s ease 1.5s both" }}>
          <span className="text-[10px] text-white font-medium tracking-[0.25em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — PILLAR SERVICES (offwhite — LIGHT)
      ══════════════════════════════════════════ */}
      <section id="leistungen"
        className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          {/* Header */}
          <div className="reveal mb-16 max-w-2xl">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary block mb-4">Webdesign Leistungen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-5 leading-tight">
              Alles, was deine
              <br />
              <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Website braucht.
              </span>
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              Vier spezialisierte Leistungen — ein integriertes Ergebnis.
              Klick auf eine Leistung für alle Details.
            </p>
          </div>

          {/* Service rows */}
          <div className="reveal">
            {PILLAR_SERVICES.map((svc) => (
              <Link key={svc.num} href={svc.href} className="group block">
                <div className="relative overflow-hidden border-t border-border py-7 lg:py-9 flex items-center gap-6 lg:gap-10 hover:bg-white/70 -mx-4 px-4 rounded-xl transition-all duration-400">
                  {/* Ghost number */}
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold font-[family-name:var(--font-heading)] select-none pointer-events-none leading-none"
                    style={{ fontSize: "clamp(80px, 10vw, 130px)", color: "transparent", WebkitTextStroke: "1px rgba(26,26,26,0.05)", opacity: 1 }}
                    aria-hidden="true">
                    {svc.num}
                  </span>

                  {/* Small number */}
                  <div className="shrink-0 w-12 text-right">
                    <span className="text-xs font-bold tracking-[0.2em] text-primary/40 group-hover:text-primary transition-colors duration-300">{svc.num}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-1.5 group-hover:text-primary transition-colors duration-300">
                      {svc.title}
                    </h3>
                    <p className="text-sm lg:text-base text-transparent group-hover:text-muted transition-all duration-500 leading-relaxed max-w-md">
                      {svc.short}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {svc.tags.map(tag => (
                        <span key={tag}
                          className="text-[10px] font-bold tracking-widest uppercase text-muted/50 border border-border px-2.5 py-0.5 rounded-full group-hover:border-primary/25 group-hover:text-primary/60 transition-all duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 ml-4">
                    <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                      <svg className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — STATS (white)
      ══════════════════════════════════════════ */}
      <section
        className="bg-white border-y border-border py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { val: "200+", label: "Websites gebaut",   sub: "Seit 2019" },
              { val: "96+",  label: "PageSpeed Score",   sub: "By default" },
              { val: "4–6W", label: "Time to Launch",    sub: "Standard-Projekt" },
              { val: "#1",   label: "Google-Ranking",    sub: "Für unsere Kunden" },
            ].map((s, i) => (
              <div key={i} className={`text-center flex flex-col items-center ${i < 3 ? "lg:border-r lg:border-border" : ""}`}>
                <span className="font-[family-name:var(--font-heading)] font-bold text-dark leading-none mb-1"
                  style={{ fontSize: "clamp(34px, 4vw, 54px)" }}>{s.val}</span>
                <span className="text-sm font-semibold text-dark mb-0.5">{s.label}</span>
                <span className="text-xs text-muted">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — PAIN POINTS (offwhite)
      ══════════════════════════════════════════ */}
      <section
        className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="reveal mb-16">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary block mb-4">Das kennen wir.</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight">
              Warum scheitern
              <br />die meisten Websites?
            </h2>
          </div>
          <div className="space-y-0">
            {[
              { num: "01", title: "Langsame Ladezeit", desc: "Google bestraft Sites unter 90 PageSpeed mit schlechteren Rankings. Besucher springen ab, bevor sie deine Leistungen sehen." },
              { num: "02", title: "Kein organischer Traffic", desc: "Eine schöne Website bringt nichts, wenn sie niemand findet. SEO wird beim Bau ignoriert — und später teuer nachgerüstet." },
              { num: "03", title: "Zero Conversions", desc: "Besucher kommen und gehen ohne Kontakt aufzunehmen. Fehlende CTA-Struktur und schlechte UX kosten täglich Aufträge." },
              { num: "04", title: "Veraltetes Design", desc: "Deine Website signalisiert 2014. Das Vertrauen ist weg, bevor ein Besucher zum ersten Absatz scrollt." },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 75}>
                <div className="group flex items-start gap-8 lg:gap-14 py-7 border-b border-border last:border-0 hover:border-primary/15 transition-colors duration-300 cursor-default">
                  <span className="shrink-0 font-[family-name:var(--font-heading)] font-bold leading-none mt-1 transition-colors duration-300 group-hover:text-primary/15"
                    style={{ fontSize: "clamp(38px, 4.5vw, 64px)", color: "rgba(26,26,26,0.08)", minWidth: "72px", textAlign: "right" }}>
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-2">{item.title}</h3>
                    <p className="text-muted leading-relaxed max-w-2xl">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — PROCESS (white)
      ══════════════════════════════════════════ */}
      <section
        className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="reveal text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-5">
              Prozess
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">So entsteht deine Website.</h2>
            <p className="text-muted text-lg max-w-xl mx-auto">In 4 Phasen zum Launch — transparent, termingebunden. Wähle eine Phase für Details.</p>
          </div>
          <div className="reveal">
            <ProcessStepper />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — COMPARISON (offwhite)
      ══════════════════════════════════════════ */}
      <section
        className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="reveal text-center mb-16">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary block mb-4">Die Realität</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-5">
              Warum SEO und Webdesign zusammengehören
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">Wer beides trennt, zahlt doppelt — und verliert trotzdem.</p>
          </div>

          <div className="reveal">
            <div className="grid grid-cols-[1fr_32px_1fr] gap-0 pb-5">
              <div className="text-center">
                <span className="text-xs font-bold tracking-widest uppercase text-muted/45 inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-muted/20" />Andere Agenturen
                </span>
              </div>
              <div />
              <div className="text-center">
                <span className="text-xs font-bold tracking-widest uppercase text-primary inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />SeoForge
                </span>
              </div>
            </div>

            {[
              { bad: "Website zuerst, SEO später", good: "SEO-Architektur von Tag 1" },
              { bad: "Schönes Design, langsam geladen", good: "PageSpeed 96+ by default" },
              { bad: "Getrennte Ansprechpartner", good: "Ein Team, eine Strategie" },
              { bad: "SEO als Zusatzpaket", good: "SEO ist das Fundament" },
              { bad: "Launch und Tschüss", good: "Laufende Betreuung & Rankings" },
            ].map((row, i) => (
              <Reveal key={i} delay={i * 65}>
                <div className="grid grid-cols-[1fr_32px_1fr] items-center border-t border-border py-4 lg:py-5 group hover:bg-white/60 rounded-lg -mx-3 px-3 transition-colors">
                  <div className="pr-4 text-right">
                    <span className="text-sm lg:text-base text-muted/40 line-through decoration-muted/20">{row.bad}</span>
                  </div>
                  <div className="flex justify-center">
                    <svg className="w-4 h-4 text-primary/25 group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                  <div className="pl-4">
                    <span className="text-sm lg:text-base font-semibold text-dark">{row.good}</span>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-border" />

            <Reveal delay={430}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <p className="text-lg font-[family-name:var(--font-heading)] font-bold text-dark">Bereit für den Unterschied?</p>
                <Link href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                  Kostenloses Gespräch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 7 — TECH STACK (offwhite, interactive)
      ══════════════════════════════════════════ */}
      <section
        className="bg-offwhite py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-14">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                  Tech Stack
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-3">
                  Technologie, die liefert.
                </h2>
                <p className="text-muted text-lg max-w-xl">
                  Drei Schichten — ein Ergebnis. Klick auf eine Schicht für Details.
                </p>
              </div>
              <p className="text-xs text-muted/50 font-medium tracking-wide hidden lg:block shrink-0">
                Hover für 3D-Effekt
              </p>
            </div>
          </div>

          <div className="reveal">
            <TechStackInteractive />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 8 — FAQ (offwhite)
      ══════════════════════════════════════════ */}
      <section
        className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary block mb-4">FAQ</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">Häufige Fragen</h2>
          </div>
          <div className="reveal space-y-3">
            {faqs.map((faq, i) => (
              <div key={i}
                className="rounded-2xl border border-border bg-white overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-semibold text-dark pr-4 leading-snug">{faq.q}</span>
                  <div className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    openFaq === i ? "bg-primary border-primary text-white rotate-180" : "border-border text-muted"
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-64 pb-6" : "max-h-0"}`}>
                  <p className="px-6 text-sm leading-relaxed text-muted">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 9 — CTA (orange gradient — NOT dark)
      ══════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 overflow-hidden bg-gradient-to-br from-primary to-primary-dark">
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }}
          aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} aria-hidden="true" />

        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Reveal>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/60 block mb-6">Nächster Schritt</span>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl lg:text-6xl font-bold text-white mb-6 leading-[1.05]">
              Bereit für eine Website,
              <br />die wirklich liefert?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Kostenloses Erstgespräch — wir analysieren deine Situation und zeigen dir, was realistisch möglich ist.
            </p>
            <p className="text-white/40 text-sm mb-10 leading-relaxed">
              Auch als{" "}
              <Link href="/webdesign/website-erstellen-lassen" className="text-white/65 hover:text-white underline underline-offset-2 transition-colors">Website-Erstellung</Link>
              ,{" "}
              <Link href="/webdesign/landing-pages" className="text-white/65 hover:text-white underline underline-offset-2 transition-colors">Landing Page</Link>
              ,{" "}
              <Link href="/webdesign/website-relaunch" className="text-white/65 hover:text-white underline underline-offset-2 transition-colors">Relaunch</Link>
              {" "}oder{" "}
              <Link href="/webdesign/app-design" className="text-white/65 hover:text-white underline underline-offset-2 transition-colors">App Design</Link>
              {" "}buchbar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/kontakt"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-dark shadow-xl transition-all hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-2xl">
                Jetzt Gespräch buchen
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a href="#leistungen"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/20">
                Alle Leistungen
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </SubpageLayout>
  );
}
