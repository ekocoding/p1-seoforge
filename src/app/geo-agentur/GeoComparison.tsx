"use client";

import { useEffect, useRef, useState } from "react";

const comparisonData = {
  geo: {
    title: "GEO",
    subtitle: "Generative Engine Optimization",
    whatIsIt: "GEO positioniert Ihre Marke in den Antworten von KI-Systemen wie ChatGPT und Gemini. Ziel ist es, von KI als vertrauenswürdige Quelle zitiert zu werden.",
    whyItMatters: "Bis 2026 laufen 25% der Suchanfragen über KI. Wer nicht in den Antworten vorkommt, ist unsichtbar.",
    keyAspects: [
      { title: "Citation Building", desc: "Als Quelle in Antworten erscheinen" },
      { title: "Entity Optimization", desc: "Marke als Entität etablieren" },
      { title: "Brand Mentions", desc: "Vertrauen durch Erwähnungen" },
      { title: "Authority", desc: "Expertise signalisieren" }
    ],
    platforms: ["ChatGPT", "Gemini", "Perplexity", "Claude"],
    color: "#C2722A",
    bgGradient: "from-primary/20 to-primary/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.015-7.053.072-1.584.233-2.707 1.626-2.707 3.228v6.741z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  seo: {
    title: "SEO",
    subtitle: "Search Engine Optimization",
    whatIsIt: "SEO optimiert Ihre Website für Suchmaschinen wie Google. Ziel ist es, für relevante Keywords auf den Top-Positionen zu ranken.",
    whyItMatters: "93% aller Online-Erfahrungen beginnen mit einer Suchmaschine. SEO bleibt die Grundlage jeder Sichtbarkeit.",
    keyAspects: [
      { title: "Keywords", desc: "Relevanz herstellen" },
      { title: "Backlinks", desc: "Authority aufbauen" },
      { title: "Technik", desc: "Crawlbarkeit & Speed" },
      { title: "Content", desc: "Wertvolle Inhalte" }
    ],
    platforms: ["Google", "Bing", "Yahoo"],
    color: "#6B7280",
    bgGradient: "from-gray-400/20 to-gray-400/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    )
  },
  llmo: {
    title: "LLMO",
    subtitle: "Large Language Model Optimization",
    whatIsIt: "LLMO optimiert, wie KI-Modelle Ihre Inhalte verstehen. Content wird so strukturiert, dass KI-Systeme ihn korrekt interpretieren.",
    whyItMatters: "LLMO ist das Fundament für GEO. Wenn KI Ihre Inhalte nicht versteht, kann sie sie nicht zitieren.",
    keyAspects: [
      { title: "Strukturierte Daten", desc: "Schema.org Markup" },
      { title: "Semantik", desc: "Bedeutung durch HTML" },
      { title: "Architektur", desc: "Klare Textstruktur" },
      { title: "Format", desc: "KI-lesbare Inhalte" }
    ],
    platforms: ["GPT", "LLaMA", "Claude", "Gemini"],
    color: "#D4A853",
    bgGradient: "from-secondary/20 to-secondary/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>
      </svg>
    )
  }
};

type TabKey = keyof typeof comparisonData;

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

export default function GeoComparison() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);
  const [selectedTab, setSelectedTab] = useState<TabKey | null>(null);

  const handleSelect = (key: TabKey | null) => {
    if (!key) {
      setSelectedTab(null);
      return;
    }
    
    if (selectedTab === key) {
      setSelectedTab(null);
    } else {
      setSelectedTab(key);
    }
  };

  const activeData = selectedTab ? comparisonData[selectedTab] : null;

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-offwhite relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1A1A1A 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
            Begriffsklärung
          </span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-heading)] text-dark mb-4">
            <span className="text-primary">GEO</span>{" "}
            im Fokus
          </h2>
          <p className={`text-lg text-muted max-w-xl mx-auto transition-all duration-500 ${selectedTab ? 'opacity-0' : 'opacity-100'}`}>
            Der Unterschied zu klassischem SEO & LLMO
          </p>
        </div>

        {/* Main Layout */}
        <div className="relative">
          {!selectedTab ? (
            // Grid Layout (unselected)
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {(Object.keys(comparisonData) as TabKey[]).map((key, index) => {
                  const data = comparisonData[key];
                  
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelect(key)}
                      className="relative text-left p-8 rounded-2xl border-2 border-border bg-white hover:border-primary/30 hover:shadow-lg transition-all duration-500 group overflow-hidden"
                      style={{ transitionDelay: `${index * 80}ms` }}
                    >
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Content */}
                      <div className="relative text-center">
                        {/* Icon */}
                        <div 
                          className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${data.color}15`, color: data.color }}
                        >
                          <div className="w-8 h-8">{data.icon}</div>
                        </div>
                        
                        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-dark mb-1">
                          {data.title}
                        </h3>
                        <p className="text-sm text-muted mb-4">{data.subtitle}</p>
                        
                        <p className="text-sm text-muted mb-4 line-clamp-3">
                          {data.whatIsIt}
                        </p>
                        
                        <span 
                          className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
                          style={{ color: data.color }}
                        >
                          Mehr erfahren
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                          </svg>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            // Split Layout (selected) - Equal height columns
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              {/* Cards Column - Stretches to match info box height */}
              <div className="lg:w-[40%] flex flex-col">
                <div className="flex flex-col gap-3 h-full">
                  {(Object.keys(comparisonData) as TabKey[]).map((key, index) => {
                    const data = comparisonData[key];
                    const isSelected = selectedTab === key;
                    const isOther = selectedTab !== key;
                    
                    return (
                      <button
                        key={key}
                        onClick={() => handleSelect(key)}
                        className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-500 group overflow-hidden flex-1 flex flex-col justify-center ${
                          isSelected 
                            ? 'bg-white border-primary shadow-xl shadow-primary/15' 
                            : 'bg-white/40 border-transparent opacity-50 hover:opacity-70'
                        }`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${data.bgGradient} transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                        
                        {/* Content */}
                        <div className="relative flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                            style={{ 
                              backgroundColor: isSelected ? data.color : `${data.color}15`,
                              color: isSelected ? 'white' : data.color
                            }}
                          >
                            <div className="w-6 h-6">{data.icon}</div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-[family-name:var(--font-heading)] text-lg text-dark">
                              {data.title}
                            </h3>
                            <p className="text-xs text-muted">{data.subtitle}</p>
                          </div>
                          
                          {/* Active Indicator */}
                          {isSelected && (
                            <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-1 h-10 bg-primary rounded-l-full" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detail Panel - Same height as cards */}
              <div className="lg:w-[60%] flex">
                {activeData && (
                  <div 
                    className="bg-white rounded-2xl border border-border shadow-xl overflow-hidden w-full flex flex-col"
                    style={{ animation: 'slideInRight 0.5s cubic-bezier(0.4,0,0.2,1)' }}
                  >
                    {/* Header */}
                    <div 
                      className="px-5 py-4 flex items-center gap-3"
                      style={{ backgroundColor: `${activeData.color}08` }}
                    >
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: activeData.color, color: 'white' }}
                      >
                        <div className="w-4 h-4">{activeData.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-lg font-[family-name:var(--font-heading)] text-dark">
                          {activeData.title}
                        </h3>
                        <p className="text-xs text-muted">{activeData.subtitle}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* What & Why */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeData.color }} />
                            Was ist das?
                          </h4>
                          <p className="text-xs text-muted leading-relaxed">
                            {activeData.whatIsIt}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeData.color }} />
                            Warum wichtig?
                          </h4>
                          <p className="text-xs text-muted leading-relaxed">
                            {activeData.whyItMatters}
                          </p>
                        </div>
                      </div>

                      {/* Key Aspects */}
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeData.color }} />
                          Kernaspekte
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {activeData.keyAspects.map((aspect) => (
                            <div 
                              key={aspect.title}
                              className="p-2.5 rounded-lg bg-offwhite border border-border/50"
                            >
                              <h5 
                                className="text-xs font-semibold mb-0.5"
                                style={{ color: activeData.color }}
                              >
                                {aspect.title}
                              </h5>
                              <p className="text-[11px] text-muted leading-tight">{aspect.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Platforms */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeData.color }} />
                          Plattformen
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {activeData.platforms.map((platform) => (
                            <span 
                              key={platform}
                              className="px-2 py-1 rounded-md text-[11px] font-medium bg-offwhite text-muted border border-border"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Close Button */}
                    <div className="px-5 py-4 border-t border-border">
                      <button
                        onClick={() => handleSelect(null)}
                        className="w-full py-2.5 rounded-lg border border-border text-muted text-xs font-medium hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 group"
                      >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
                        </svg>
                        Zurück zur Übersicht
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
      `}</style>
    </section>
  );
}
