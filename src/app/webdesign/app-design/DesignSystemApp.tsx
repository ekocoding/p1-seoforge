"use client";
import { useEffect, useRef, useState } from "react";

const process = [
  { step: "01", title: "Discovery & Briefing", desc: "Zielgruppe, Konkurrenz, Brand-Werte — bevor ein Pixel gesetzt wird." },
  { step: "02", title: "Wireframes & Flow", desc: "Seitenstruktur und User-Journey ohne visuellen Ablenkungen." },
  { step: "03", title: "Design System", desc: "Farben, Typografie, Komponenten — als Komponenten-Bibliothek." },
  { step: "04", title: "UI Design & Prototyp", desc: "Klickbarer Prototyp vor der Entwicklung — kein Blindflug." },
  { step: "05", title: "Übergabe an Entwicklung", desc: "Dev-ready Design-Dateien mit Tokens, Specs und Komponenten-Doku." },
];

const deliverables = ["Design-Quelldatei", "Design Tokens (JSON)", "Komponentenbibliothek", "Style Guide PDF", "Icon Set (SVG)", "Responsive Breakpoints"];

export default function DesignSystemApp() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl border border-border bg-white overflow-hidden h-full">
      {/* Header */}
      <div className="px-7 pt-7 pb-5 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Design System</p>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">
          Unser Prozess — Schritt für Schritt
        </h3>
        <p className="text-muted text-sm mt-1">Von der Idee zum dev-ready Design System</p>
      </div>

      {/* Steps */}
      <div className="px-7 py-5 space-y-3">
        {process.map((p, i) => (
          <div
            key={p.step}
            className="flex gap-4 transition-all duration-500"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", transitionDelay: `${i * 80}ms` }}
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">{p.step}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-dark">{p.title}</p>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Deliverables */}
      <div className="px-7 pb-6">
        <div className="rounded-xl bg-offwhite border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Im Lieferumfang</p>
          <div className="flex flex-wrap gap-2">
            {deliverables.map((d) => (
              <span key={d} className="text-xs bg-white border border-border text-dark px-2.5 py-1 rounded-lg">
                {d}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted mt-4 border-t border-border pt-4">
          Jedes App-Design-Projekt beinhaltet ein vollständiges Design System — als Dokumentation für dein Entwicklerteam.
        </p>
      </div>
    </div>
  );
}
