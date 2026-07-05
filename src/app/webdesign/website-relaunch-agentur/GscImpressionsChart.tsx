"use client";

import { useEffect, useRef, useState } from "react";

/* ─── GSC-Impressionen-Chart — Search-Console-Look in SeoForge-Farben ────────
   Illustrative Impressionen um einen Relaunch: 180 Tageswerte mit Wochenend-
   Dips, Rauschen und Ausreißern (seeded PRNG → deterministisch, SSR-safe),
   gezackte Liniensegmente wie im Original statt geglätteter Kurven.
   Links-nach-rechts-Reveal per IntersectionObserver, Hover-Tooltip mit
   Tageswert. Keine realen Daten — Caption liefert die Section.             */

function mulberry32(a: number) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAYS = 180;
const REL = 60; // Relaunch-Tag

const VALS: number[] = (() => {
  const rnd = mulberry32(7);
  const out: number[] = [];
  for (let i = 0; i < DAYS; i++) {
    let base: number;
    if (i < REL) {
      base = 13.5 + 1.5 * Math.sin(i / 9);
    } else if (i < REL + 14) {
      base = 12.6 + (i - REL) * 0.06; // Monitoring-Phase: leicht gedrückt
    } else {
      const t = (i - REL - 14) / (DAYS - REL - 14);
      base = 13 + 72 * Math.pow(t, 1.35); // treppiger Anstieg
    }
    const dow = i % 7;
    const weekend = dow === 5 ? 0.78 : dow === 6 ? 0.7 : 1;
    const amp = i > REL ? 0.34 : 0.26;
    let noise = 1 + (rnd() - 0.5) * amp;
    if (rnd() < 0.045) noise *= 1.28 + rnd() * 0.3; // Ausreißer nach oben
    if (rnd() < 0.03) noise *= 0.68; // Einbrüche
    out.push(Math.min(97, Math.max(3.5, base * weekend * noise)));
  }
  return out;
})();

const W = 640, H = 260, TOP = 14, BOTTOM = 228, LEFT = 58, RIGHT = 626;
const px = (i: number) => LEFT + (i * (RIGHT - LEFT)) / (DAYS - 1);
const py = (v: number) => BOTTOM - (v / 100) * (BOTTOM - TOP);

const LINE = VALS.map((v, i) => `${i === 0 ? "M" : "L"} ${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(" ");

const MONTHS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"];
const dayLabel = (i: number) => `${(i % 30) + 1}. ${MONTHS[Math.min(5, Math.floor(i / 30))]}`;
const dayValue = (i: number) => Math.round(VALS[i] * 38);
const fmt = (n: number) => n.toLocaleString("de-DE");

function useCountTo(target: number, on: boolean, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!on) return;
    const t = setTimeout(() => {
      const start = performance.now();
      const dur = 1600;
      let raf = 0;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, delay);
    return () => clearTimeout(t);
  }, [on, target, delay]);
  return val;
}

export default function GscImpressionsChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.3 }
    );
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  const impressions = useCountTo(128400, on, 300);
  const clicks = useCountTo(4870, on, 500);
  const relX = px(REL);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rx = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((rx - LEFT) / (RIGHT - LEFT)) * (DAYS - 1));
    setHover(Math.min(DAYS - 1, Math.max(0, i)));
  };

  return (
    <div ref={wrapRef} className="bg-white">
      {/* Filter-Chips wie in der Search Console */}
      <div className="flex flex-wrap items-center gap-2 px-5 pt-5 lg:px-6">
        {["Suchtyp: Web", "Zeitraum: 6 Monate"].map((f) => (
          <span key={f} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-offwhite/70 px-3 py-1.5 text-[11px] font-medium text-dark/60">
            <svg className="h-3 w-3 text-dark/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {f}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold" style={{ background: "#fbf4ea", color: "#C2722A", border: "1px solid #ecd3ba" }}>
          <span className="chip-dot h-1.5 w-1.5 rounded-full bg-primary" />
          Beispiel-Property
        </span>
      </div>

      {/* Metrik-Kacheln im GSC-Stil */}
      <div className="grid grid-cols-2 gap-3 px-5 pt-4 lg:px-6">
        <div className="rounded-xl p-4 text-white" style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)" }}>
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-white/25">
              <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
            </span>
            <span className="text-[11px] font-medium text-white/85">Impressionen insgesamt</span>
          </div>
          <div className="mt-1.5 font-[family-name:var(--font-heading)] text-2xl font-bold leading-none">{fmt(impressions)}</div>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-[4px] border border-border bg-offwhite" />
            <span className="text-[11px] font-medium text-muted">Klicks insgesamt</span>
          </div>
          <div className="mt-1.5 font-[family-name:var(--font-heading)] text-2xl font-bold leading-none text-dark/70">{fmt(clicks)}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative px-2 pb-4 pt-2 lg:px-3">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full cursor-crosshair"
          role="img"
          aria-label="Illustrativer Verlauf der täglichen Google-Impressionen: volatil und flach vor dem Relaunch, danach stark ansteigend"
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <clipPath id="gscReveal">
              <rect x="0" y="0" height={H} width={on ? W : 0} style={{ transition: "width 2.4s cubic-bezier(0.33, 1, 0.68, 1) 0.2s" }} />
            </clipPath>
          </defs>

          {/* Gridlines + Y-Labels (Tageswerte) */}
          {[0, 1, 2, 3].map((g) => {
            const val = g * 1000;
            const y = py((val / 38 / 100) * 100);
            return (
              <g key={g}>
                <line x1={LEFT} y1={y} x2={RIGHT} y2={y} stroke="#E5E3DF" strokeWidth="1" strokeDasharray={g === 0 ? "0" : "3 4"} />
                <text x={LEFT - 8} y={y + 3.5} textAnchor="end" fontSize="10" fill="#9b9b9b">{g === 0 ? "0" : `${g} Tsd.`}</text>
              </g>
            );
          })}

          {/* Monats-Labels */}
          {MONTHS.map((m, i) => (
            <text key={m} x={LEFT + (i * (RIGHT - LEFT)) / 5} y={H - 8} textAnchor="middle" fontSize="10" fill="#9b9b9b">{m}</text>
          ))}

          {/* Relaunch-Marker */}
          <line x1={relX} y1={TOP} x2={relX} y2={BOTTOM} stroke="#C2722A" strokeWidth="1.2" strokeDasharray="4 4" opacity={on ? 0.5 : 0} style={{ transition: "opacity 0.6s ease 1s" }} />
          <g opacity={on ? 1 : 0} style={{ transition: "opacity 0.6s ease 1.2s" }}>
            <rect x={relX - 34} y={TOP + 2} width="68" height="18" rx="9" fill="#1A1A1A" />
            <circle cx={relX - 22} cy={TOP + 11} r="2.4" fill="#D4A853">
              <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <text x={relX + 5} y={TOP + 14.5} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#fff" letterSpacing="0.06em">RELAUNCH</text>
          </g>

          {/* Gezackte Tages-Linie, Reveal von links */}
          <g clipPath="url(#gscReveal)">
            <path d={LINE} fill="none" stroke="#C2722A" strokeWidth="1.8" strokeLinejoin="round" />
          </g>

          {/* Hover: vertikale Linie + Punkt */}
          {hover !== null && (
            <g pointerEvents="none">
              <line x1={px(hover)} y1={TOP} x2={px(hover)} y2={BOTTOM} stroke="#1A1A1A" strokeWidth="1" opacity="0.18" />
              <circle cx={px(hover)} cy={py(VALS[hover])} r="4" fill="#fff" stroke="#C2722A" strokeWidth="2" />
            </g>
          )}
        </svg>

        {/* Tooltip (GSC-Stil) */}
        {hover !== null && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg px-3 py-2 shadow-lg"
            style={{
              left: `${(px(hover) / W) * 100}%`,
              top: `${(py(VALS[hover]) / H) * 100}%`,
              transform: "translate(-50%, -130%)",
              background: "#1A1A1A",
            }}
          >
            <div className="whitespace-nowrap text-[10px] font-medium text-white/60">{dayLabel(hover)}{hover >= REL ? " · nach Relaunch" : ""}</div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="h-2 w-2 rounded-[2px]" style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)" }} />
              <span className="text-[11px] font-semibold text-white">{fmt(dayValue(hover))} Impressionen</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          svg rect, svg line, svg g { transition: none !important; opacity: 1 !important; }
          #gscReveal rect { width: ${W}px !important; }
        }
      `}</style>
    </div>
  );
}
