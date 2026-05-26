"use client";
import { useState, useEffect, useRef } from "react";

function useCountUp(target: number, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let v = 0;
    const interval = setInterval(() => {
      v = Math.min(v + 2, target);
      setVal(v);
      if (v >= target) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [trigger, target]);
  return val;
}

export default function PageSpeedApp() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const score = useCountUp(97, triggered);

  const vitals = [
    { label: "Largest Contentful Paint", before: "4.8s", after: "1.2s" },
    { label: "Interaction to Next Paint", before: "520ms", after: "58ms" },
    { label: "Cumulative Layout Shift", before: "0.28", after: "0.04" },
    { label: "Time to First Byte", before: "2.1s", after: "0.18s" },
  ];

  return (
    <div ref={ref} className="rounded-2xl border border-border bg-white overflow-hidden h-full">
      <div className="px-7 pt-7 pb-5 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">PageSpeed Report</p>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">
          Vorher vs. Nachher
        </h3>
      </div>

      {/* Score comparison */}
      <div className="px-7 py-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-offwhite p-5 text-center">
          <p className="text-xs text-muted mb-3">Vorher (Ø KMU)</p>
          <p className="text-5xl font-bold" style={{ color: "#ef4444" }}>62</p>
          <p className="text-xs text-muted mt-2">/100 · Verbesserungsbedarf</p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-5 text-center">
          <p className="text-xs text-muted mb-3">Nachher (p1)</p>
          <p className="text-5xl font-bold text-primary">{score}</p>
          <p className="text-xs text-primary mt-2">/100 · Hervorragend</p>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="px-7 pb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Core Web Vitals</p>
        <div className="space-y-3">
          {vitals.map((v) => (
            <div key={v.label} className="flex items-center justify-between">
              <span className="text-sm text-dark">{v.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted line-through">{v.before}</span>
                <svg className="w-3 h-3 text-muted/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <span className="text-sm font-semibold text-primary">{v.after}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted mt-5 border-t border-border pt-4">
          Quelle: Google Lighthouse, Ø aus 100+ Projekten 2024–2025.
        </p>
      </div>
    </div>
  );
}
