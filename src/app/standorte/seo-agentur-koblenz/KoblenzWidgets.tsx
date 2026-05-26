"use client";

import { useState, useEffect, useRef } from "react";

function useInView(opts = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { top, bottom } = el.getBoundingClientRect();
    if (bottom > 0 && top < window.innerHeight) return;
    setInView(false);
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.12, ...opts }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

const keywords = [
  { kw: "Webdesign Koblenz",        vol: 320, pct: 100 },
  { kw: "SEO Koblenz",              vol: 230, pct: 72  },
  { kw: "Online Marketing Koblenz", vol: 170, pct: 53  },
  { kw: "SEO Agentur Koblenz",      vol: 130, pct: 41  },
  { kw: "Marketing Koblenz",        vol: 100, pct: 31  },
];

const rankingData = [
  { month: "Monat 1", pos: 44, traffic: 9   },
  { month: "Monat 2", pos: 32, traffic: 25  },
  { month: "Monat 3", pos: 20, traffic: 65  },
  { month: "Monat 4", pos: 11, traffic: 144 },
  { month: "Monat 5", pos: 5,  traffic: 302 },
  { month: "Monat 6", pos: 2,  traffic: 491 },
];

export function KeywordVolumeApp() {
  const [active, setActive] = useState<number | null>(null);
  const [ref, inView] = useInView();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-white border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
              / Marktdaten Koblenz
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
              So suchen Koblenzer <span className="gradient-text">nach Ihren Leistungen</span>
            </h2>
            <p className="text-base text-muted leading-relaxed mb-6">
              Monatliche Suchanfragen bei Google zeigen, welche Begriffe in Koblenz
              wirklich gefragt sind. Wer diese Keywords nicht bespielt, verschenkt
              qualifizierten Traffic an Wettbewerber — besonders in Tourismus und Dienstleistung.
            </p>
            <p className="text-xs text-muted/60 font-mono">
              * Schätzwerte basierend auf Google Keyword Planner Richtlinien
            </p>
          </div>
          <div className="bg-offwhite rounded-2xl border border-border p-6 reveal">
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-5">
              MONATLICHE SUCHANFRAGEN / KOBLENZ *
            </p>
            <div className="space-y-4">
              {keywords.map(({ kw, vol, pct }, i) => (
                <div
                  key={kw}
                  className="cursor-pointer group"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className={`font-medium transition-colors ${active === i ? "text-primary" : "text-dark"}`}>{kw}</span>
                    <span className="font-mono font-semibold text-dark">{vol}</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: inView ? `${pct}%` : "0%",
                        transitionDelay: `${i * 100 + 200}ms`,
                        background: active === i
                          ? "linear-gradient(90deg, #C2722A, #D4A853)"
                          : "linear-gradient(90deg, #C2722A80, #D4A85380)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RankingProgressApp() {
  const [ref, inView] = useInView();
  const maxTraffic = Math.max(...rankingData.map(d => d.traffic));
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
        / Ergebnisse nach 6 Monaten
      </p>
      <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
        Von Position 44 auf <span className="gradient-text">Top&nbsp;2</span>
      </h2>
      <p className="text-base text-muted leading-relaxed mb-8">
        Ein typisches SeoForge-Projekt für ein Koblenzer Unternehmen.
        Organischer Traffic wächst mit jeder besseren Position überproportional —
        besonders in der Mittelrhein-Region.
      </p>
      <div className="bg-offwhite rounded-2xl border border-border p-5">
        <div className="flex items-end justify-between gap-2 h-36 mb-3">
          {rankingData.map(({ month, traffic }, i) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-md transition-all duration-700"
                style={{
                  height: inView ? `${(traffic / maxTraffic) * 100}%` : "4px",
                  background: i === rankingData.length - 1
                    ? "linear-gradient(180deg, #C2722A, #D4A853)"
                    : "rgba(194,114,42,0.25)",
                  transitionDelay: `${i * 100}ms`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-2">
          {rankingData.map(({ month, pos }, i) => (
            <div key={month} className="flex-1 text-center">
              <div className="font-mono text-[10px] text-muted leading-tight hidden sm:block">{month.replace("Monat ", "M")}</div>
              <div className={`font-mono text-xs font-semibold mt-0.5 ${i === rankingData.length - 1 ? "text-primary" : "text-dark/50"}`}>
                #{pos}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted">
          <span>Organischer Traffic: <span className="font-semibold text-primary">+5.355%</span></span>
          <span className="font-mono">Ø Wachstum pro Monat</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted/50 font-mono">* Beispielhaftes Kundenprojekt · anonymisiert</p>
    </div>
  );
}
