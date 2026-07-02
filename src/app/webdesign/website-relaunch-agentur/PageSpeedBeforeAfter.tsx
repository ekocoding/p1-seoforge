"use client";
import { useEffect, useRef, useState } from "react";

function useCountTo(target: number, trigger: boolean, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(() => {
      let v = 0;
      const step = Math.max(1, target / 60);
      const interval = setInterval(() => {
        v = Math.min(v + step, target);
        setVal(Math.round(v));
        if (v >= target) clearInterval(interval);
      }, 20);
    }, delay);
    return () => clearTimeout(timeout);
  }, [trigger, target, delay]);
  return val;
}

export default function PageSpeedBeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const speed  = useCountTo(97, triggered, 0);
  const bounce = useCountTo(38, triggered, 200);
  const cvr    = useCountTo(340, triggered, 400);

  const metrics = [
    { label: "PageSpeed Score",            before: "62",       after: `${speed}`,    unit: "/100", badge: "+35 Pkt." },
    { label: "Absprungrate",               before: "71 %",     after: `${bounce} %`, unit: "",     badge: "−33 Pkt." },
    { label: "Mehr qualifizierte Anfragen",before: "Baseline", after: `+${cvr} %`,   unit: "",     badge: "nach 6 Mo." },
  ];

  return (
    <div ref={ref} className="bg-white h-full">
      {/* Header */}
      <div className="px-7 pt-7 pb-5 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Relaunch Impact</p>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">
          Was ein Relaunch verändert
        </h3>
        <p className="text-muted text-sm mt-1">Beispielhafte Größenordnung nach einem technischen Relaunch</p>
      </div>

      {/* Metric cards */}
      <div className="px-7 py-5 space-y-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl bg-offwhite border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-dark font-medium">{m.label}</span>
              <span className="text-xs text-primary font-semibold bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                {m.badge}
              </span>
            </div>
            <div className="flex items-end gap-4">
              <div>
                <p className="text-xs text-muted mb-1">Vorher</p>
                <p className="text-xl font-bold text-muted line-through decoration-muted/50">{m.before}</p>
              </div>
              <svg className="w-4 h-4 text-muted/40 mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <div>
                <p className="text-xs text-muted mb-1">Nachher</p>
                <p className="text-2xl font-bold text-primary">
                  {m.after}<span className="text-sm text-muted">{m.unit}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Source */}
      <div className="px-7 pb-6">
        <p className="text-xs text-muted border-t border-border pt-4 leading-relaxed">
          Illustratives Beispiel, keine Garantiewerte. Google/Deloitte (2019): 1 s Ladezeitverzögerung reduziert Conversions um bis zu 7 %.
        </p>
      </div>
    </div>
  );
}
