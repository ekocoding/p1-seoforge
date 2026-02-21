"use client";

import { useState, useEffect } from "react";

export default function DashboardMockup() {
  const [isVisible, setIsVisible] = useState(false);
  const [keywordCount, setKeywordCount] = useState(0);
  const [keyword1Match, setKeyword1Match] = useState(0);
  const [keyword2Match, setKeyword2Match] = useState(0);
  const [domainAuthority, setDomainAuthority] = useState(0);
  const [backlinks, setBacklinks] = useState(0);
  const [rankings, setRankings] = useState(0);
  const [barHeights, setBarHeights] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    // Start animations after 0.8s delay
    const startDelay = setTimeout(() => {
      setIsVisible(true);

      // Animate keyword count (0 to 42 over 1.5s)
      animateCounter(0, 42, 1500, setKeywordCount);

      // Animate keyword 1 match percentage (0 to 92 over 1.5s)
      setTimeout(() => {
        animateCounter(0, 92, 1500, setKeyword1Match);
      }, 0);

      // Animate keyword 2 match percentage (0 to 87 over 1.5s, delayed by 400ms)
      setTimeout(() => {
        animateCounter(0, 87, 1500, setKeyword2Match);
      }, 400);

      // Animate competitor metrics
      animateCounter(0, 68, 1500, setDomainAuthority);
      animateCounter(0, 12.4, 1500, (val) => setBacklinks(val));
      animateCounter(0, 340, 1500, setRankings);

      // Animate bar chart heights
      const targetHeights = [45, 58, 72, 85, 93, 100];
      targetHeights.forEach((target, index) => {
        setTimeout(() => {
          animateCounter(0, target, 1500, (val) => {
            setBarHeights((prev) => {
              const newHeights = [...prev];
              newHeights[index] = val;
              return newHeights;
            });
          });
        }, index * 100);
      });
    }, 800);

    return () => clearTimeout(startDelay);
  }, []);

  // Counter animation helper with easeOut
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

      // EaseOut cubic
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

  return (
    <div className="hero-dashboard">
      <div className="bg-white border border-border rounded-2xl shadow-lg overflow-hidden">
        {/* Dashboard Header */}
        <div className="border-b border-border px-6 py-4 bg-gradient-to-r from-offwhite to-white">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-dark">SEO Strategie Dashboard</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs text-muted">Live</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Keyword Research Panel */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted">Keyword-Recherche</h4>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                {Math.round(keywordCount)} Keywords
              </span>
            </div>
            <div className="space-y-2">
              {/* Keyword 1 - Slide in from left */}
              <div
                className="flex items-center gap-3 p-3 bg-offwhite rounded-lg transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                }}
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                  1
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-dark">SEO Beratung München</div>
                  <div className="text-xs text-muted">Vol: 1,200 | KD: 34</div>
                </div>
                <div className="text-sm font-semibold text-primary">
                  {Math.round(keyword1Match)}%
                </div>
              </div>

              {/* Keyword 2 - Slide in from left with delay */}
              <div
                className="flex items-center gap-3 p-3 bg-offwhite rounded-lg opacity-75 transition-all duration-700"
                style={{
                  opacity: isVisible ? 0.75 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                  transitionDelay: '400ms',
                }}
              >
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs font-bold">
                  2
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-dark">SEO Agentur Deutschland</div>
                  <div className="text-xs text-muted">Vol: 2,400 | KD: 48</div>
                </div>
                <div className="text-sm font-semibold text-secondary">
                  {Math.round(keyword2Match)}%
                </div>
              </div>
            </div>
          </div>

          {/* Competitor Analysis Card */}
          <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-medium text-dark">Wettbewerber-Analyse</h4>
                <p className="text-xs text-muted mt-1">5 Hauptkonkurrenten identifiziert</p>
              </div>
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-xs text-muted mb-1">Domain Authority</div>
                <div className="text-lg font-bold text-primary">
                  {Math.round(domainAuthority)}
                </div>
              </div>
              <div className="text-center border-l border-r border-primary/20">
                <div className="text-xs text-muted mb-1">Backlinks</div>
                <div className="text-lg font-bold text-secondary">
                  {backlinks.toFixed(1)}k
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted mb-1">Rankings</div>
                <div className="text-lg font-bold text-dark">
                  {Math.round(rankings)}
                </div>
              </div>
            </div>
          </div>

          {/* Growth Forecast Mini-Chart */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted">Wachstumsprognose (6 Monate)</h4>
            <div className="relative h-24 flex items-end gap-2 px-2">
              {barHeights.map((height, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-t transition-all duration-1000 ${
                    index < 3
                      ? 'bg-gradient-to-t from-primary/30 to-primary/60'
                      : index < 5
                      ? 'bg-gradient-to-t from-primary/40 to-primary/70'
                      : 'bg-gradient-to-t from-primary to-primary-light shadow-lg'
                  }`}
                  style={{ height: `${height}%` }}
                >
                  {index === 5 && (
                    <div className="absolute -top-6 right-0 text-xs font-semibold text-primary">
                      +143%
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted">
              <span>Monat 1</span>
              <span>Monat 6</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
