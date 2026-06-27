"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   REALISTIC SCREEN MOCKUPS — pure CSS/HTML, no images
   BrowserMockup       → Premium-Mini-Website (dunkel, elegant, serif)
   CodeOnePagerMockup  → VS Code: Ein-Seiten-Architektur als Code
   CodeMockup          → VS Code + Terminal (Relaunch / 301-Redirects)
═══════════════════════════════════════════════════════════════════════════ */

/* ─── 3D-Tilt wrapper — mouse-tracked perspective ─────────────────────────── */
export function Tilt({
  children,
  max = 7,
  className = "",
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        setT({ x: -ny * max, y: nx * max });
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setT({ x: 0, y: 0 }); setHov(false); }}
      style={{
        transform: `perspective(1100px) rotateX(${t.x}deg) rotateY(${t.y}deg)`,
        transition: hov ? "transform 0.08s ease-out" : "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Shared chrome pieces ────────────────────────────────────────────────── */
function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   1 · BROWSER MOCKUP — Premium-Website „Holzwerk Manufaktur"
   Dunkel, serif, warm — soll auf den ersten Blick verdammt gut aussehen.
═══════════════════════════════════════════════════════════════════════════ */
export function BrowserMockup() {
  return (
    <div className="relative">
      <Tilt max={6} className="w-full max-w-[560px]">
        <div className="rounded-xl overflow-hidden border border-dark/15 shadow-[0_40px_90px_-24px_rgba(26,26,26,0.5)]">

          {/* Chrome bar — dunkel */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[#26231F] border-b border-black/40">
            <TrafficLights />
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-1.5 bg-white/[0.07] rounded-md px-3 py-1 text-[10px] text-white/45 font-medium min-w-[55%] justify-center">
                <svg className="w-2.5 h-2.5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" />
                </svg>
                holzwerk-manufaktur.de
              </div>
            </div>
            <span className="w-8" />
          </div>

          {/* ── Premium-Site ── */}
          <div className="relative select-none" style={{ background: "#16130F" }} aria-hidden="true">

            {/* Grain */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "140px",
              }}
            />
            {/* Warmer Glow oben rechts */}
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(212,168,83,0.14), transparent 70%)" }} />

            {/* Nav */}
            <div className="relative flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
              <span className="font-[family-name:var(--font-heading)] text-[11px] font-bold text-white tracking-wide">
                Holzwerk<span className="text-[#D4A853]">.</span>
              </span>
              <div className="hidden sm:flex items-center gap-3.5 text-[7px] font-medium text-white/40 tracking-wide uppercase">
                <span>Möbel</span><span>Projekte</span><span>Werkstatt</span><span>Journal</span>
              </div>
              <span className="text-[7px] font-semibold text-[#16130F] bg-[#D4A853] rounded-full px-2.5 py-1">
                Beratung buchen
              </span>
            </div>

            {/* Hero */}
            <div className="relative grid grid-cols-[1.05fr_1fr] gap-4 px-5 pt-5 pb-5 items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-px w-4 bg-[#D4A853]/70" />
                  <span className="text-[6.5px] font-bold tracking-[0.25em] uppercase text-[#D4A853]">
                    Schreinerei · Mannheim
                  </span>
                </div>
                <div
                  className="font-[family-name:var(--font-heading)] font-bold text-white leading-[1.12] mb-2"
                  style={{ fontSize: "17px", letterSpacing: "-0.01em" }}
                >
                  Möbel mit<br /><em className="font-normal italic text-[#D4A853]">Haltung.</em>
                </div>
                <p className="text-[7px] leading-[1.6] text-white/40 mb-3 max-w-[92%]">
                  Maßanfertigungen aus heimischem Holz — entworfen, gefertigt und montiert von einer Werkstatt mit 40 Jahren Handschrift.
                </p>
                <div className="flex items-center gap-2.5">
                  <span className="text-[7px] font-semibold text-[#16130F] bg-[#D4A853] rounded-full px-2.5 py-1">
                    Projekt anfragen
                  </span>
                  <span className="text-[7px] font-medium text-white/55 border-b border-white/20 pb-px">
                    Arbeiten ansehen
                  </span>
                </div>
              </div>

              {/* Hero-Visual: warmes Holz */}
              <div className="relative rounded-lg overflow-hidden aspect-[4/5] border border-white/[0.08]">
                <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, #8a5a32 0%, #5e3c22 45%, #2e2014 100%)" }} />
                {/* Maserung */}
                <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(100deg, rgba(255,255,255,0.10) 0 1px, transparent 1px 7px)" }} />
                {/* Licht */}
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 15%, rgba(255,225,170,0.28), transparent 55%)" }} />
                {/* Glass-Chip */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 rounded-md bg-black/35 backdrop-blur-md border border-white/10 px-2 py-1.5 flex items-center justify-between">
                  <span className="text-[6px] font-medium text-white/75">Esstisch „Nordlicht" · Eiche</span>
                  <span className="text-[6px] font-bold text-[#D4A853]">№ 04</span>
                </div>
              </div>
            </div>

            {/* Projekt-Reihe */}
            <div className="relative px-5 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[6.5px] font-bold tracking-[0.22em] uppercase text-white/30">Ausgewählte Arbeiten</span>
                <span className="text-[6px] text-[#D4A853]/80">Alle Projekte →</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["Küche K2", "linear-gradient(140deg,#6e4a28,#3a2716)"],
                  ["Bibliothek", "linear-gradient(140deg,#4a3320,#2c1f12)"],
                  ["Empfang B9", "linear-gradient(140deg,#7d5a36,#46311c)"],
                ].map(([t, g]) => (
                  <div key={t as string} className="relative rounded-md overflow-hidden aspect-[4/3] border border-white/[0.07]">
                    <div className="absolute inset-0" style={{ background: g as string }} />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(80deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 6px)" }} />
                    <span className="absolute bottom-1 left-1.5 text-[5.5px] font-medium text-white/80">{t as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="relative flex items-center justify-between px-5 py-2.5 border-t border-white/[0.06]">
              <span className="font-[family-name:var(--font-heading)] text-[7px] font-bold text-white/70">Holzwerk<span className="text-[#D4A853]">.</span></span>
              <span className="text-[5.5px] text-white/25">Impressum · Datenschutz · © 2026</span>
            </div>
          </div>
        </div>
      </Tilt>

      {/* Floating Chips außen */}
      <div
        className="absolute -top-4 -right-3 sm:-right-6 rounded-xl bg-white border border-dark/[0.08] shadow-xl px-3.5 py-2.5 hidden sm:block"
        style={{ animation: "float 4.5s ease-in-out infinite" }}
      >
        <div className="text-[9px] text-dark/40 font-medium">Custom coded</div>
        <div className="text-[11px] font-bold text-dark">Next.js · SEO-first</div>
      </div>
      <div
        className="absolute -bottom-4 -left-3 sm:-left-6 rounded-xl bg-[#1A1A1A] border border-white/10 shadow-xl px-3.5 py-2.5 hidden sm:block"
        style={{ animation: "float 5s ease-in-out infinite 1s" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
          <span className="text-[10px] font-mono font-bold text-white/85">LCP 0.8 s</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2 · CODE ONE-PAGER MOCKUP — VS Code: die ganze Website ist EINE Route
═══════════════════════════════════════════════════════════════════════════ */
const ONEPAGER_TERMINAL = [
  { text: "$ next build", c: "#9CDCFE", delay: 0 },
  { text: "✓ 1 Route gebaut — alles auf einer Seite", c: "#4EC9B0", delay: 650 },
  { text: "✓ Bundle optimiert · LCP 0.8 s", c: "#4EC9B0", delay: 1350 },
  { text: "● Deploy production — live in 32s", c: "#D4A853", delay: 2100 },
];

export function CodeOnePagerMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.35 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <Tilt max={6} className="w-full max-w-[560px]">
      <div ref={ref} className="rounded-xl overflow-hidden border border-white/[0.06] shadow-[0_30px_70px_-20px_rgba(26,26,26,0.5)] bg-[#1E1E1E] text-left">

        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#2B2B2B] border-b border-black/30">
          <TrafficLights />
          <span className="flex-1 text-center text-[10px] text-white/40 font-medium truncate">
            page.tsx — onepager
          </span>
          <span className="w-10" />
        </div>

        <div className="grid grid-cols-[110px_1fr] max-sm:grid-cols-1">
          {/* File tree — EINE Page, das ist der Punkt */}
          <div className="max-sm:hidden bg-[#252526] border-r border-black/30 py-3 px-2.5 text-[9px] leading-[1.9] text-white/45 select-none" aria-hidden="true">
            <div className="text-white/30 uppercase tracking-wider text-[7.5px] mb-1 px-1">Explorer</div>
            <div>▾ <span className="text-white/60">app/</span></div>
            <div className="rounded bg-[#37373D] text-white/85 px-1 ml-2 -mx-1">page.tsx</div>
            <div>▾ <span className="text-white/60">components/</span></div>
            <div className="pl-3">Hero.tsx</div>
            <div className="pl-3">Leistungen.tsx</div>
            <div className="pl-3">Referenzen.tsx</div>
            <div className="pl-3">Kontakt.tsx</div>
            <div>package.json</div>
          </div>

          {/* Editor */}
          <div className="px-4 py-3.5 font-mono text-[10px] sm:text-[10.5px] leading-[1.75] overflow-x-auto" aria-hidden="true">
            <div><span className="text-[#6A9955]">{"// Ein-Seiten-Architektur — eine Route, ein Ziel"}</span></div>
            <div><span className="text-[#C586C0]">export default function</span> <span className="text-[#DCDCAA]">OnePager</span><span className="text-white/70">() {"{"}</span></div>
            <div className="pl-4"><span className="text-[#C586C0]">return</span> <span className="text-white/70">(</span></div>
            <div className="pl-7"><span className="text-[#808080]">&lt;</span><span className="text-[#4EC9B0]">main</span><span className="text-[#808080]">&gt;</span></div>
            <div className="pl-10"><span className="text-[#808080]">&lt;</span><span className="text-[#4EC9B0]">Hero</span> <span className="text-[#808080]">/&gt;</span>        <span className="text-[#6A9955]">{"// Botschaft in 5 Sekunden"}</span></div>
            <div className="pl-10"><span className="text-[#808080]">&lt;</span><span className="text-[#4EC9B0]">Leistungen</span> <span className="text-[#808080]">/&gt;</span></div>
            <div className="pl-10"><span className="text-[#808080]">&lt;</span><span className="text-[#4EC9B0]">Referenzen</span> <span className="text-[#808080]">/&gt;</span></div>
            <div className="pl-10"><span className="text-[#808080]">&lt;</span><span className="text-[#4EC9B0]">Kontakt</span> <span className="text-[#808080]">/&gt;</span>     <span className="text-[#6A9955]">{"// ein Ziel: Anfrage"}</span></div>
            <div className="pl-7"><span className="text-[#808080]">&lt;/</span><span className="text-[#4EC9B0]">main</span><span className="text-[#808080]">&gt;</span></div>
            <div className="pl-4"><span className="text-white/70">);</span></div>
            <div><span className="text-white/70">{"}"}</span></div>
            <div className="mt-1.5 flex items-center gap-1.5 text-[9px]">
              <span className="text-[#D4A853]">✦</span>
              <span className="text-white/35 italic">KI-Workflow: 3 Copy-Varianten generiert — Review läuft</span>
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="border-t border-black/40 bg-[#181818] px-4 py-3 min-h-[108px]" aria-hidden="true">
          <div className="flex items-center gap-3 text-[8px] uppercase tracking-wider text-white/30 mb-2">
            <span className="text-white/60 border-b border-[#C2722A] pb-0.5">Terminal</span>
            <span>Probleme</span>
            <span>Ausgabe</span>
          </div>
          <div className="font-mono text-[10px] leading-[1.85]">
            {ONEPAGER_TERMINAL.map((l, i) => (
              <div
                key={i}
                style={{
                  color: l.c,
                  opacity: on ? 1 : 0,
                  transform: on ? "none" : "translateY(4px)",
                  transition: `opacity 0.35s ease ${l.delay}ms, transform 0.35s ease ${l.delay}ms`,
                }}
              >
                {l.text}
              </div>
            ))}
            <span
              className="inline-block w-[7px] h-[13px] bg-white/70 align-middle"
              style={{ animation: "blinkCursorOP 1.1s steps(1) infinite", opacity: on ? 1 : 0, transition: "opacity 0.3s ease 2700ms" }}
            />
          </div>
        </div>
        <style>{`@keyframes blinkCursorOP { 0%,100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
      </div>
    </Tilt>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 · CODE MOCKUP — VS Code + Terminal (Relaunch / 301-Redirects)
═══════════════════════════════════════════════════════════════════════════ */
const TERMINAL_LINES = [
  { text: "$ next build", c: "#9CDCFE", delay: 0 },
  { text: "✓ Compiled successfully in 4.2s", c: "#4EC9B0", delay: 600 },
  { text: "✓ Generating static pages (24/24)", c: "#4EC9B0", delay: 1300 },
  { text: "✓ Redirect-Map: 48 Alt-URLs → 301 übernommen", c: "#4EC9B0", delay: 2000 },
  { text: "● Deploy production … live in 38s", c: "#D4A853", delay: 2800 },
];

export function CodeMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.35 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <Tilt max={6} className="w-full max-w-[560px]">
      <div ref={ref} className="rounded-xl overflow-hidden border border-white/[0.06] shadow-[0_30px_70px_-20px_rgba(26,26,26,0.5)] bg-[#1E1E1E] text-left">

        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#2B2B2B] border-b border-black/30">
          <TrafficLights />
          <span className="flex-1 text-center text-[10px] text-white/40 font-medium truncate">
            next.config.ts — website-relaunch
          </span>
          <span className="w-10" />
        </div>

        <div className="grid grid-cols-[110px_1fr] max-sm:grid-cols-1">
          {/* File tree */}
          <div className="max-sm:hidden bg-[#252526] border-r border-black/30 py-3 px-2.5 text-[9px] leading-[1.9] text-white/45 select-none" aria-hidden="true">
            <div className="text-white/30 uppercase tracking-wider text-[7.5px] mb-1 px-1">Explorer</div>
            <div>▾ <span className="text-white/60">app/</span></div>
            <div className="pl-3">layout.tsx</div>
            <div className="pl-3">page.tsx</div>
            <div className="pl-3">sitemap.ts</div>
            <div>▾ <span className="text-white/60">lib/</span></div>
            <div className="pl-3">redirects.ts</div>
            <div className="rounded bg-[#37373D] text-white/85 px-1 -mx-1">next.config.ts</div>
            <div>package.json</div>
          </div>

          {/* Editor */}
          <div className="px-4 py-3.5 font-mono text-[10px] sm:text-[10.5px] leading-[1.75] overflow-x-auto" aria-hidden="true">
            <div><span className="text-[#6A9955]">{"// 301-Redirects — Rankings bleiben erhalten"}</span></div>
            <div><span className="text-[#C586C0]">const</span> <span className="text-[#4FC1FF]">redirects</span> <span className="text-white/70">=</span> <span className="text-[#FFD700]">[</span></div>
            <div className="pl-4"><span className="text-[#FFD700]">{"{"}</span> <span className="text-[#9CDCFE]">source</span><span className="text-white/70">:</span> <span className="text-[#CE9178]">&quot;/alte-leistungen&quot;</span><span className="text-white/70">,</span></div>
            <div className="pl-7"><span className="text-[#9CDCFE]">destination</span><span className="text-white/70">:</span> <span className="text-[#CE9178]">&quot;/leistungen&quot;</span><span className="text-white/70">,</span></div>
            <div className="pl-7"><span className="text-[#9CDCFE]">permanent</span><span className="text-white/70">:</span> <span className="text-[#569CD6]">true</span> <span className="text-[#FFD700]">{"}"}</span><span className="text-white/70">,</span></div>
            <div className="pl-4"><span className="text-[#FFD700]">{"{"}</span> <span className="text-[#9CDCFE]">source</span><span className="text-white/70">:</span> <span className="text-[#CE9178]">&quot;/news/:slug&quot;</span><span className="text-white/70">,</span></div>
            <div className="pl-7"><span className="text-[#9CDCFE]">destination</span><span className="text-white/70">:</span> <span className="text-[#CE9178]">&quot;/blog/:slug&quot;</span><span className="text-white/70">,</span></div>
            <div className="pl-7"><span className="text-[#9CDCFE]">permanent</span><span className="text-white/70">:</span> <span className="text-[#569CD6]">true</span> <span className="text-[#FFD700]">{"}"}</span><span className="text-white/70">,</span></div>
            <div><span className="text-[#FFD700]">]</span><span className="text-white/70">;</span></div>
          </div>
        </div>

        {/* Terminal */}
        <div className="border-t border-black/40 bg-[#181818] px-4 py-3 min-h-[122px]" aria-hidden="true">
          <div className="flex items-center gap-3 text-[8px] uppercase tracking-wider text-white/30 mb-2">
            <span className="text-white/60 border-b border-[#C2722A] pb-0.5">Terminal</span>
            <span>Probleme</span>
            <span>Ausgabe</span>
          </div>
          <div className="font-mono text-[10px] leading-[1.85]">
            {TERMINAL_LINES.map((l, i) => (
              <div
                key={i}
                style={{
                  color: l.c,
                  opacity: on ? 1 : 0,
                  transform: on ? "none" : "translateY(4px)",
                  transition: `opacity 0.35s ease ${l.delay}ms, transform 0.35s ease ${l.delay}ms`,
                }}
              >
                {l.text}
              </div>
            ))}
            <span
              className="inline-block w-[7px] h-[13px] bg-white/70 align-middle"
              style={{ animation: "pulseDotMock 1.1s steps(1) infinite", opacity: on ? 1 : 0, transition: "opacity 0.3s ease 3400ms" }}
            />
          </div>
        </div>
        <style>{`@keyframes pulseDotMock { 0%,100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
      </div>
    </Tilt>
  );
}
