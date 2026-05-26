"use client";
import { useEffect, useRef, useState } from "react";

const days = [
  { day: "Tag 1",  bad: 100, good: 100 },
  { day: "Tag 3",  bad: 23,  good: 68  },
  { day: "Tag 7",  bad: 14,  good: 52  },
  { day: "Tag 14", bad: 10,  good: 44  },
  { day: "Tag 30", bad: 7,   good: 38  },
];

export default function RetentionDataApp() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl border border-border bg-white overflow-hidden h-full">
      {/* Header */}
      <div className="px-7 pt-7 pb-5 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">User Retention</p>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">
          Warum 77 % der Nutzer abspringen
        </h3>
        <p className="text-muted text-sm mt-1">DAU-Retention: Schlechtes vs. gutes UX-Design</p>
      </div>

      {/* Bar chart */}
      <div className="px-7 py-5">
        <div className="flex items-end gap-3 h-36 mb-3">
          {days.map((d, i) => (
            <div key={d.day} className="flex-1 flex items-end gap-1 h-full">
              <div
                className="flex-1 rounded-t bg-red-200 transition-all duration-700"
                style={{ height: triggered ? `${d.bad}%` : "0%", transitionDelay: `${i * 100}ms` }}
              />
              <div
                className="flex-1 rounded-t transition-all duration-700"
                style={{ height: triggered ? `${d.good}%` : "0%", background: "var(--color-primary)", opacity: 0.65, transitionDelay: `${i * 100 + 50}ms` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mb-4">
          {days.map(d => (
            <div key={d.day} className="flex-1 text-center">
              <span className="text-xs text-muted">{d.day}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-200" />
            <span className="text-xs text-muted">Schlechtes UX</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ background: "var(--color-primary)", opacity: 0.65 }} />
            <span className="text-xs text-muted">Optimiertes UX</span>
          </div>
        </div>
      </div>

      {/* Key stats */}
      <div className="px-7 pb-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-red-50 border border-red-200 p-4">
          <div className="text-2xl font-bold text-red-600">77 %</div>
          <div className="text-xs text-muted mt-1 leading-relaxed">der Nutzer verlassen eine schlecht designte App in den ersten 3 Tagen</div>
        </div>
        <div className="rounded-xl bg-primary/[0.04] border border-primary/20 p-4">
          <div className="text-2xl font-bold text-primary">5×</div>
          <div className="text-xs text-muted mt-1 leading-relaxed">höhere Retention bei Apps mit professionellem Onboarding-Design</div>
        </div>
      </div>

      {/* Source */}
      <div className="px-7 pb-6">
        <p className="text-xs text-muted border-t border-border pt-4 leading-relaxed">
          Quelle: Mobile Growth Association (2024), AppsFlyer State of App Marketing. Statista: 1,6 Mio. Apps im Google Play Store (Q4 2025).
        </p>
      </div>
    </div>
  );
}
