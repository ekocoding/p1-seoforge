"use client";
import { useState, useEffect, useRef } from "react";

function useCountUp(target: number, trigger: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(interval); return; }
      setVal(Math.round(start));
    }, 16);
    return () => clearInterval(interval);
  }, [trigger, target, duration]);
  return val;
}

export default function ConversionFunnelApp() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [view, setView] = useState<"avg" | "optimized">("avg");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const visitors = 1000;
  const avgCVR = 2.35;
  const optCVR = 11.6;
  const cvr = view === "avg" ? avgCVR : optCVR;
  const leadsTarget = view === "avg" ? Math.round(visitors * avgCVR / 100) : Math.round(visitors * optCVR / 100);
  const leads = useCountUp(leadsTarget, triggered);

  const stages = [
    { label: "Besucher", count: visitors, pct: 100 },
    { label: "Scroll > 50 %", count: Math.round(visitors * 0.62), pct: 62 },
    { label: "CTA gesehen", count: Math.round(visitors * 0.38), pct: 38 },
    { label: "Conversion", count: Math.round(visitors * cvr / 100), pct: Math.max(cvr, 1) },
  ];

  return (
    <div ref={ref} className="rounded-2xl border border-border bg-white overflow-hidden h-full">
      {/* Header */}
      <div className="px-7 pt-7 pb-5 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Conversion Funnel</p>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">
          1.000 Besucher — was passiert?
        </h3>
      </div>

      {/* Toggle */}
      <div className="px-7 pt-5 grid grid-cols-2 gap-2">
        <button
          onClick={() => setView("avg")}
          className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-all border ${
            view === "avg"
              ? "border-red-300 bg-red-50 text-red-600"
              : "border-border text-muted hover:border-primary/30 hover:text-dark"
          }`}
        >
          Ø Markt: 2,35 % CVR
        </button>
        <button
          onClick={() => setView("optimized")}
          className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-all border ${
            view === "optimized"
              ? "border-primary/30 bg-primary/[0.06] text-primary"
              : "border-border text-muted hover:border-primary/30 hover:text-dark"
          }`}
        >
          Optimiert: 11,6 % CVR
        </button>
      </div>

      {/* Funnel bars */}
      <div className="px-7 py-5 space-y-3">
        {stages.map((stage, i) => (
          <div key={stage.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted">{stage.label}</span>
              <span className="text-xs font-semibold text-dark">{i === 3 ? leads : stage.count}</span>
            </div>
            <div className="h-6 bg-offwhite rounded-lg overflow-hidden border border-border">
              <div
                className="h-full rounded-lg transition-all duration-700"
                style={{
                  width: triggered ? `${Math.max(stage.pct, 4)}%` : "0%",
                  background: i === 3
                    ? (view === "avg" ? "#ef4444" : "var(--color-primary)")
                    : `rgba(194,114,42,${0.25 - i * 0.04})`,
                  transitionDelay: `${i * 150}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="px-7 pb-6">
        <div className={`rounded-xl p-4 border ${view === "avg" ? "bg-red-50 border-red-200" : "bg-primary/[0.04] border-primary/20"}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-dark">Leads pro 1.000 Besucher</span>
            <span className={`text-2xl font-bold ${view === "avg" ? "text-red-500" : "text-primary"}`}>{leads}</span>
          </div>
          <p className="text-xs text-muted mt-2">
            {view === "avg"
              ? "Ø Conversion Rate aller Branchen: 2,35 % (Wordstream, 2024)"
              : "Erreichbar mit professionell optimierter Landing Page + A/B-Testing"}
          </p>
        </div>
        <p className="text-xs text-muted mt-4 border-t border-border pt-4">
          Quelle: Wordstream »Landing Page Conversion Rate Benchmark« 2024. Top 25 % der Landing Pages konvertieren bei 5,31 %+.
        </p>
      </div>
    </div>
  );
}
