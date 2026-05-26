"use client";
import { useState } from "react";

export default function ABTestApp() {
  const [revealed, setRevealed] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const runTest = () => {
    setRunning(true);
    setRevealed(false);
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setRunning(false);
        setRevealed(true);
      }
    }, 30);
  };

  const variants = [
    {
      id: "A",
      headline: "Jetzt Angebot anfragen",
      cta: "Anfragen",
      cvr: 3.2,
      winner: false,
    },
    {
      id: "B",
      headline: "Kostenloses Erstgespräch buchen →",
      cta: "Gespräch buchen",
      cvr: 7.8,
      winner: true,
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-white overflow-hidden h-full">
      {/* Header */}
      <div className="px-7 pt-7 pb-5 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">A/B Test Demo</p>
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">
          Kleine Änderung, großer Effekt
        </h3>
        <p className="text-muted text-sm mt-1">CTA-Text A vs. B — welcher gewinnt?</p>
      </div>

      {/* Variants */}
      <div className="px-7 pt-5 grid grid-cols-2 gap-3">
        {variants.map(v => (
          <div
            key={v.id}
            className={`rounded-xl border p-4 transition-all duration-500 ${
              revealed && v.winner
                ? "border-primary/30 bg-primary/[0.04]"
                : revealed && !v.winner
                ? "border-border bg-offwhite opacity-50"
                : "border-border bg-offwhite"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Variante {v.id}</span>
              {revealed && v.winner && (
                <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-semibold">
                  Gewinner
                </span>
              )}
            </div>

            {/* Mini mockup */}
            <div className="rounded-lg bg-white border border-border p-3 mb-3">
              <div className="h-2 bg-border rounded mb-1.5 w-3/4" />
              <div className="h-1.5 bg-offwhite rounded mb-1 w-full" />
              <div className="h-1.5 bg-offwhite rounded mb-3 w-2/3" />
              <div
                className="rounded-md px-3 py-1.5 text-white text-center font-semibold"
                style={{ background: "var(--color-primary)", fontSize: "9px" }}
              >
                {v.cta}
              </div>
            </div>

            <p className="text-xs text-muted leading-relaxed mb-2">&quot;{v.headline}&quot;</p>

            {revealed && (
              <div className="text-center pt-2 border-t border-border">
                <div className={`text-2xl font-bold ${v.winner ? "text-primary" : "text-muted"}`}>
                  {v.cvr}%
                </div>
                <div className="text-xs text-muted">CVR</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress */}
      {running && (
        <div className="px-7 pt-4">
          <div className="h-1.5 bg-offwhite rounded-full overflow-hidden border border-border">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted mt-2 text-center">Test läuft… {progress}%</p>
        </div>
      )}

      {/* Button + source */}
      <div className="px-7 py-5">
        <button
          onClick={runTest}
          disabled={running}
          className="w-full py-2.5 rounded-xl text-sm font-semibold border border-primary/30 text-primary hover:bg-primary/[0.06] transition-all disabled:opacity-40"
        >
          {running ? "Test läuft…" : revealed ? "Test wiederholen" : "A/B Test starten →"}
        </button>
        {revealed && (
          <p className="text-xs text-muted mt-4 border-t border-border pt-4">
            +143 % mehr Conversions durch CTA-Optimierung. Quelle: eigene Projekt-Benchmarks 2024.
          </p>
        )}
      </div>
    </div>
  );
}
