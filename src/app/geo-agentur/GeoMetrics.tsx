"use client";

import { useEffect, useRef, useState } from "react";

const metrics = [
  {
    id: "mentions",
    title: "KI-Erwähnungen",
    description: "Wie oft wird Ihre Marke in KI-Antworten genannt?",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.015-7.053.072-1.584.233-2.707 1.626-2.707 3.228v6.741z"/>
      </svg>
    ),
    kpis: [
      { label: "Brand Mentions", value: "↑ 40%", context: "vs. Vorquartal" },
      { label: "Quellen-Position", value: "#1-3", context: "bei 65% Queries" }
    ],
    tools: ["ChatGPT", "Perplexity", "Gemini"],
    frequency: "Wöchentlich"
  },
  {
    id: "citations",
    title: "Citation Rate",
    description: "Wie häufig werden Sie als vertrauenswürdige Quelle zitiert?",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.503l3.848-1.628a1.125 1.125 0 00.54-1.517l-1.628-3.848a2.25 2.25 0 00-.503-2.607L11.09 3.659A2.25 2.25 0 009.568 3z"/>
        <path d="M6 6h.008v.008H6V6z"/>
      </svg>
    ),
    kpis: [
      { label: "Zitations-Rate", value: "28%", context: "der Antworten" },
      { label: "Link-Outs", value: "↑ 156%", context: "zu Ihrer Website" }
    ],
    tools: ["Perplexity", "Claude", "Copilot"],
    frequency: "Täglich"
  },
  {
    id: "sentiment",
    title: "Sentiment-Analyse",
    description: "Wie positiv spricht KI über Ihre Marke?",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
      </svg>
    ),
    kpis: [
      { label: "Positiv", value: "87%", context: "der Erwähnungen", color: "#22c55e" },
      { label: "Neutral", value: "11%", context: "", color: "#94a3b8" },
      { label: "Negativ", value: "2%", context: "", color: "#f87171" }
    ],
    tools: ["Alle Plattformen"],
    frequency: "Monatlich"
  },
  {
    id: "competitive",
    title: "Wettbewerbs-Vergleich",
    description: "Wie positionieren Sie sich gegenüber Konkurrenten?",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
      </svg>
    ),
    kpis: [
      { label: "Marktanteil", value: "34%", context: "in KI-Antworten" },
      { label: "vs. Top 3", value: "+12%", context: "Differenz" }
    ],
    tools: ["Branchen-Benchmark"],
    frequency: "Quartalsweise"
  }
];

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [threshold]);

  return { ref, isVisible };
}

export default function GeoMetrics() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);
  const [activeMetric, setActiveMetric] = useState(metrics[0]);
  const [hoveredKpi, setHoveredKpi] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-dark text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            <span className="text-sm font-medium text-white/80">Messbare Erfolge</span>
          </span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-heading)] mb-6">
            Wie man GEO{" "}
            <span className="text-primary">misst</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            GEO-Erfolg ist messbar - nicht in Rankings, sondern in Erwähnungen, 
            Zitaten und Brand Authority.
          </p>
        </div>

        {/* Dashboard Layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Metric Navigation */}
          <div className={`lg:col-span-4 space-y-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {metrics.map((metric, index) => (
              <button
                key={metric.id}
                onClick={() => setActiveMetric(metric)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 group ${
                  activeMetric.id === metric.id
                    ? 'bg-white/10 border-primary/50 shadow-lg shadow-primary/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    activeMetric.id === metric.id 
                      ? 'bg-primary text-white' 
                      : 'bg-white/10 text-white/60 group-hover:bg-white/20'
                  }`}>
                    {metric.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-[family-name:var(--font-heading)] text-lg mb-1 transition-colors ${
                      activeMetric.id === metric.id ? 'text-primary' : 'text-white'
                    }`}>
                      {metric.title}
                    </h3>
                    <p className="text-sm text-white/50 line-clamp-2">
                      {metric.description}
                    </p>
                  </div>
                  
                  {/* Active Indicator */}
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeMetric.id === metric.id ? 'bg-primary scale-100' : 'bg-white/20 scale-75'
                  }`} />
                </div>
              </button>
            ))}
          </div>

          {/* Right Content - Metric Detail */}
          <div className={`lg:col-span-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm text-white/50 uppercase tracking-wider">Aktive Metrik</span>
                  </div>
                  <h3 className="text-3xl font-[family-name:var(--font-heading)] text-white mb-2">
                    {activeMetric.title}
                  </h3>
                  <p className="text-white/60">{activeMetric.description}</p>
                </div>
                
                {/* Frequency Badge */}
                <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
                  <span className="text-sm font-medium text-primary">{activeMetric.frequency}</span>
                </div>
              </div>

              {/* KPI Cards */}
              <div className={`grid gap-4 mb-10 ${activeMetric.kpis.length === 3 ? 'grid-cols-3' : 'sm:grid-cols-2'}`}>
                {activeMetric.kpis.map((kpi, i) => {
                  const color = (kpi as typeof kpi & { color?: string }).color;
                  const isSentiment = activeMetric.id === "sentiment";
                  return (
                    <div
                      key={i}
                      className={`relative rounded-2xl border transition-all duration-500 cursor-default ${
                        isSentiment ? 'p-4' : 'p-6'
                      } ${
                        hoveredKpi === i
                          ? 'bg-primary/10 border-primary/30 scale-[1.02]'
                          : 'bg-white/5 border-white/10'
                      }`}
                      onMouseEnter={() => setHoveredKpi(i)}
                      onMouseLeave={() => setHoveredKpi(null)}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      {/* Background Glow on Hover */}
                      <div className={`absolute inset-0 rounded-2xl bg-primary/5 transition-opacity duration-300 ${hoveredKpi === i ? 'opacity-100' : 'opacity-0'}`} />

                      <div className="relative">
                        {isSentiment && color ? (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                              <p className="text-xs text-white/50 uppercase tracking-wider font-medium">{kpi.label}</p>
                            </div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-3xl font-[family-name:var(--font-heading)]" style={{ color }}>
                                {kpi.value}
                              </span>
                            </div>
                            {kpi.context && (
                              <p className="text-xs text-white/30 mt-1">{kpi.context}</p>
                            )}
                          </>
                        ) : (
                          <>
                            <p className="text-sm text-white/50 mb-2">{kpi.label}</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-[family-name:var(--font-heading)] text-white">
                                {kpi.value}
                              </span>
                              {kpi.context && (
                                <span className="text-sm text-white/40">{kpi.context}</span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Monitored Platforms */}
              <div>
                <h4 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  Überwachte Plattformen
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeMetric.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-lg bg-white/10 text-sm text-white/80 border border-white/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className={`mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-medium mb-1">Wichtig zu verstehen</p>
            <p className="text-white/60 text-sm leading-relaxed">
              GEO-Metriken unterscheiden sich fundamental von klassischem SEO. Statt Position 1-10 zählen 
              Erwähnungen und Zitate. Wir tracken kontinuierlich über 50+ Prompts und Branchen-Begriffe 
              um Ihre KI-Sichtbarkeit zu messen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
