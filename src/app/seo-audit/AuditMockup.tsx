"use client";

import { useState, useEffect } from "react";

const categories = [
  { title: "Technisches SEO", score: 92, icon: "success" as const },
  { title: "On-Page", score: 74, icon: "warning" as const },
  { title: "Content", score: 68, icon: "warning" as const },
  { title: "Backlinks", score: 42, icon: "error" as const },
  { title: "Mobile", score: 95, icon: "success" as const },
  { title: "Speed", score: 88, icon: "success" as const },
];

function getColor(s: number) {
  if (s >= 90) return { text: "text-green-600", bg: "bg-green-500", light: "bg-green-50" };
  if (s >= 60) return { text: "text-amber-600", bg: "bg-amber-400", light: "bg-amber-50" };
  return { text: "text-red-500", bg: "bg-red-400", light: "bg-red-50" };
}

export default function AuditMockup() {
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const dur = 1800, start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setScore(Math.round((1 - Math.pow(1 - p, 3)) * 78));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started]);

  return (
    <div className="hero-dashboard">
      <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-border px-5 py-3 bg-gradient-to-r from-offwhite to-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-dark">SEO Audit Report</span>
          </div>
          <span className="text-[10px] text-muted">Heute, 14:32</span>
        </div>

        <div className="p-6 lg:p-8">
          {/* Score + Gauge row */}
          <div className="flex items-center gap-6 mb-6">
            <div className="relative shrink-0">
              <svg className="w-28 h-28" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E3DF" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#D4A853" strokeWidth="6" strokeLinecap="round" strokeDasharray="206 264" transform="rotate(-90 50 50)">
                  <animate attributeName="stroke-dasharray" values="0 264;206 264" dur="1.8s" fill="freeze" />
                </circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-dark font-[family-name:var(--font-heading)]">{score}</span>
                <span className="text-[9px] text-muted uppercase tracking-wide">/ 100</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-dark mb-1">Verbesserungspotenzial</p>
              <p className="text-sm text-muted leading-relaxed">6 Bereiche analysiert, 17 Optimierungen identifiziert</p>
            </div>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat, i) => {
              const c = getColor(cat.score);
              return (
                <div
                  key={cat.title}
                  className="rounded-xl bg-offwhite/60 p-4 transition-all duration-500"
                  style={{
                    opacity: started ? 1 : 0,
                    transform: started ? "translateY(0)" : "translateY(8px)",
                    transitionDelay: `${800 + i * 120}ms`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-dark truncate">{cat.title}</span>
                    <span className={`text-sm font-bold ${c.text}`}>{cat.score}</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full ${c.bg} rounded-full transition-all duration-1000`}
                      style={{
                        width: started ? `${cat.score}%` : "0%",
                        transitionDelay: `${1000 + i * 120}ms`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
