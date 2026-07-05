"use client";

import { useEffect, useRef, useState } from "react";

/* ─── GSC-Impressionen-Chart — Search-Console-Look in SeoForge-Farben ────────
   Illustrative Entwicklung der Google-Impressionen um einen Relaunch herum:
   flach davor, Relaunch-Marker, danach steiler Anstieg. Linie zeichnet sich
   per IntersectionObserver, Kachel-Zahlen zählen hoch. Keine realen Daten —
   als illustrativ gekennzeichnet (Caption liefert die Section).            */

/* Wochenwerte in % der Chart-Höhe: 10 Wochen flach, kurzes Plateau nach
   dem Relaunch (Monitoring-Phase), dann kräftiger Compounding-Anstieg.    */
const VALS = [16, 17, 16.5, 18, 17, 18.5, 17.5, 19, 18, 18.5, 17.5, 18, 20, 23, 27.5, 33, 39.5, 47, 54.5, 62, 69.5, 77, 83.5, 89, 93.5, 96.5];
const RELAUNCH_I = 10;

const W = 640, H = 260, TOP = 14, BOTTOM = 228, LEFT = 58, RIGHT = 626;
const px = (i: number) => LEFT + (i * (RIGHT - LEFT)) / (VALS.length - 1);
const py = (v: number) => BOTTOM - (v / 100) * (BOTTOM - TOP);

/* Sanft geglätteter Pfad (kubische Segmente mit horizontalen Kontrollpunkten) */
function smoothPath() {
  let d = `M ${px(0)} ${py(VALS[0])}`;
  for (let i = 1; i < VALS.length; i++) {
    const x0 = px(i - 1), y0 = py(VALS[i - 1]);
    const x1 = px(i), y1 = py(VALS[i]);
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}
const LINE = smoothPath();
const AREA = `${LINE} L ${RIGHT} ${BOTTOM} L ${LEFT} ${BOTTOM} Z`;

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

const fmt = (n: number) => n.toLocaleString("de-DE");

export default function GscImpressionsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const impressions = useCountTo(128400, on, 300);
  const clicks = useCountTo(4870, on, 500);
  const relX = px(RELAUNCH_I);

  return (
    <div ref={ref} className="bg-white">
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
      <div className="px-2 pb-4 pt-2 lg:px-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Illustrativer Verlauf der Google-Impressionen: flach vor dem Relaunch, danach stark ansteigend">
          <defs>
            <linearGradient id="gscLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#C2722A" />
              <stop offset="1" stopColor="#D4A853" />
            </linearGradient>
            <linearGradient id="gscArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#C2722A" stopOpacity="0.18" />
              <stop offset="1" stopColor="#C2722A" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Gridlines + Y-Labels */}
          {[0, 1, 2, 3].map((g) => {
            const y = BOTTOM - (g * (BOTTOM - TOP)) / 3;
            return (
              <g key={g}>
                <line x1={LEFT} y1={y} x2={RIGHT} y2={y} stroke="#E5E3DF" strokeWidth="1" strokeDasharray={g === 0 ? "0" : "3 4"} />
                <text x={LEFT - 8} y={y + 3.5} textAnchor="end" fontSize="10" fill="#9b9b9b">{g === 0 ? "0" : `${g * 40} Tsd.`}</text>
              </g>
            );
          })}

          {/* Monats-Labels */}
          {["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"].map((m, i) => (
            <text key={m} x={LEFT + (i * (RIGHT - LEFT)) / 5} y={H - 8} textAnchor="middle" fontSize="10" fill="#9b9b9b">{m}</text>
          ))}

          {/* Relaunch-Marker */}
          <line x1={relX} y1={TOP} x2={relX} y2={BOTTOM} stroke="#C2722A" strokeWidth="1.2" strokeDasharray="4 4" opacity={on ? 0.55 : 0} style={{ transition: "opacity 0.6s ease 0.9s" }} />
          <g opacity={on ? 1 : 0} style={{ transition: "opacity 0.6s ease 1.1s" }}>
            <rect x={relX - 34} y={TOP + 2} width="68" height="18" rx="9" fill="#1A1A1A" />
            <circle cx={relX - 22} cy={TOP + 11} r="2.4" fill="#D4A853">
              <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <text x={relX + 5} y={TOP + 14.5} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#fff" letterSpacing="0.06em">RELAUNCH</text>
          </g>

          {/* Fläche + Linie */}
          <path d={AREA} fill="url(#gscArea)" opacity={on ? 1 : 0} style={{ transition: "opacity 1s ease 0.8s" }} />
          <path
            d={LINE}
            fill="none"
            stroke="url(#gscLine)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={1400}
            strokeDashoffset={on ? 0 : 1400}
            style={{ transition: "stroke-dashoffset 2.4s cubic-bezier(0.33, 1, 0.68, 1) 0.2s" }}
          />

          {/* Endpunkt */}
          <g opacity={on ? 1 : 0} style={{ transition: "opacity 0.5s ease 2.3s" }}>
            <circle cx={px(VALS.length - 1)} cy={py(VALS[VALS.length - 1])} r="9" fill="#C2722A" opacity="0.15">
              <animate attributeName="r" values="7;11;7" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx={px(VALS.length - 1)} cy={py(VALS[VALS.length - 1])} r="4" fill="#C2722A" stroke="#fff" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          svg path, svg line, svg g { transition: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>
    </div>
  );
}
