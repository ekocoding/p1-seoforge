"use client";

import { useState, useEffect } from "react";

export default function BetreuungMockup() {
  const [isVisible, setIsVisible] = useState(false);
  const [rankingCount, setRankingCount] = useState(0);
  const [trafficPercent, setTrafficPercent] = useState(0);
  const [backlinkCount, setBacklinkCount] = useState(0);
  const [chartHeights, setChartHeights] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsVisible(true);

      animateCounter(0, 47, 1500, setRankingCount);

      setTimeout(() => {
        animateCounter(0, 23, 1500, setTrafficPercent);
      }, 200);

      setTimeout(() => {
        animateCounter(0, 12, 1500, setBacklinkCount);
      }, 400);

      // Animate sparkline heights
      const targetHeights = [35, 48, 42, 60, 55, 72, 85];
      targetHeights.forEach((target, index) => {
        setTimeout(() => {
          animateCounter(0, target, 1200, (val) => {
            setChartHeights((prev) => {
              const newHeights = [...prev];
              newHeights[index] = val;
              return newHeights;
            });
          });
        }, index * 80);
      });
    }, 800);

    return () => clearTimeout(startDelay);
  }, []);

  const animateCounter = (
    start: number,
    end: number,
    duration: number,
    setter: (val: number) => void
  ) => {
    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeOut;
      setter(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setter(end);
      }
    };
    requestAnimationFrame(animate);
  };

  const tasks = [
    "Title-Tags & Meta-Descriptions optimiert",
    "Core Web Vitals auf 94/100 verbessert",
    "8 neue Backlinks von DA 40+ Seiten",
    "3 Blog-Artikel aktualisiert & re-optimiert",
    "Interne Verlinkung Struktur verbessert",
  ];

  return (
    <div className="hero-dashboard">
      <div className="bg-white border border-border rounded-2xl shadow-xl overflow-hidden">
        {/* Dashboard Header */}
        <div className="border-b border-border px-6 py-4 bg-gradient-to-r from-offwhite to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-dark text-sm">Monatlicher SEO-Report</h3>
                <p className="text-xs text-muted">Februar 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-muted">Aktuell</span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="p-5 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {/* KPI 1 */}
            <div
              className="dashboard-kpi-1 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-3 text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <div className="text-xl font-bold text-primary">
                +{Math.round(rankingCount)}
              </div>
              <div className="text-xs text-muted mt-1 leading-tight">Ranking-Verbesserungen</div>
            </div>

            {/* KPI 2 */}
            <div
              className="dashboard-kpi-2 bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20 rounded-xl p-3 text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
              }}
            >
              <div className="text-xl font-bold text-secondary">
                +{Math.round(trafficPercent)}%
              </div>
              <div className="text-xs text-muted mt-1 leading-tight">Organischer Traffic</div>
            </div>

            {/* KPI 3 */}
            <div
              className="dashboard-kpi-3 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-3 text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s",
              }}
            >
              <div className="text-xl font-bold text-primary">
                {Math.round(backlinkCount)}
              </div>
              <div className="text-xs text-muted mt-1 leading-tight">Backlinks gewonnen</div>
            </div>
          </div>

          {/* Sparkline Chart */}
          <div
            className="dashboard-chart bg-offwhite rounded-xl p-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.4s",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted">Traffic-Verlauf (7 Wochen)</span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                +23% gesamt
              </span>
            </div>
            <div className="relative h-16 flex items-end gap-1.5">
              {chartHeights.map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-sm transition-all duration-700"
                  style={{
                    height: `${height}%`,
                    background:
                      index === chartHeights.length - 1
                        ? "linear-gradient(to top, #C2722A, #D4A853)"
                        : index >= chartHeights.length - 3
                        ? "rgba(194,114,42,0.5)"
                        : "rgba(194,114,42,0.25)",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted mt-1.5">
              <span>KW 7</span>
              <span>KW 13</span>
            </div>
          </div>

          {/* Completed Tasks */}
          <div>
            <h4 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
              Maßnahmen diesen Monat
            </h4>
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-16px)",
                    transition: `opacity 0.4s ease ${0.5 + index * 0.1}s, transform 0.4s ease ${0.5 + index * 0.1}s`,
                  }}
                >
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-muted leading-tight">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
