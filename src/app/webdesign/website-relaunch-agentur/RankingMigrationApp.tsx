"use client";
import { useState, useEffect, useRef } from "react";

const keywords = [
  { kw: "Steuerberater Frankfurt", before: 3, after: 2, vol: "1.200/mo", status: "improved" },
  { kw: "Steuerberater Unternehmensberatung", before: 7, after: 5, vol: "390/mo", status: "improved" },
  { kw: "Buchhaltung Frankfurt Kosten", before: 12, after: 11, vol: "260/mo", status: "stable" },
  { kw: "Jahresabschluss Frankfurt", before: 4, after: 4, vol: "480/mo", status: "stable" },
  { kw: "Steuerrecht Frankfurt", before: 9, after: 47, vol: "880/mo", status: "dropped" },
  { kw: "Lohnabrechnung Agentur", before: 6, after: 8, vol: "320/mo", status: "stable" },
];

const statusConfig = {
  improved: { label: "Verbessert", dot: "bg-emerald-500", text: "text-emerald-700", pill: "bg-emerald-50 border-emerald-200" },
  stable:   { label: "Gehalten",   dot: "bg-primary",     text: "text-primary",     pill: "bg-primary/[0.06] border-primary/20" },
  dropped:  { label: "Verloren*",  dot: "bg-red-500",     text: "text-red-600",     pill: "bg-red-50 border-red-200" },
};

export default function RankingMigrationApp() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-white h-full">
      {/* Header */}
      <div className="px-7 pt-7 pb-5 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Ranking Migration</p>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">
          Was passiert mit deinen Rankings?
        </h3>
        <p className="text-muted text-sm mt-1">Beispiel: Steuerberater-Website, Relaunch mit SEO-Migration</p>
      </div>

      {/* Table */}
      <div className="px-7 py-5 space-y-2.5">
        {keywords.map((kw, i) => {
          const cfg = statusConfig[kw.status as keyof typeof statusConfig];
          return (
            <div
              key={kw.kw}
              className="rounded-xl bg-offwhite border border-border px-4 py-3 transition-all duration-500"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dark truncate">{kw.kw}</p>
                  <p className="text-xs text-muted mt-0.5">{kw.vol}</p>
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.pill} ${cfg.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-xs text-muted w-14">Pos. {kw.before}</span>
                <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      kw.status === "dropped" ? "bg-red-400" : kw.status === "improved" ? "bg-emerald-500" : "bg-primary"
                    }`}
                    style={{ width: visible ? `${Math.min(100, 100 - (kw.after - 1) * 3)}%` : "0%", transitionDelay: `${i * 100 + 300}ms` }}
                  />
                </div>
                <span className={`text-xs font-semibold w-14 text-right ${cfg.text}`}>Pos. {kw.after}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Warning + source */}
      <div className="px-7 pb-6">
        <div className="rounded-xl bg-red-50 border border-red-200 p-4">
          <p className="text-xs text-red-700 leading-relaxed">
            <span className="font-semibold">*Steuerrecht Frankfurt</span> verlor 38 Positionen — weil die alte URL nicht weitergeleitet wurde. Mit unserer 301-Redirect-Map wäre das nicht passiert.
          </p>
        </div>
        <p className="mt-4 text-xs text-muted border-t border-border pt-4">
          Typisches Szenario bei Relaunch ohne SEO-Migration. Quelle: eigene Projekterfahrung 2023–2025.
        </p>
      </div>
    </div>
  );
}
