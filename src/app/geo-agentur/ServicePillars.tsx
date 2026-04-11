"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "KI-Sichtbarkeits-Audit",
    subtitle: "Monitoring & Analyse",
    description: "Wo wird Ihre Marke in ChatGPT, Gemini, Perplexity zitiert – und wo nicht? Wir erstellen Ihre Visibility-Baseline und identifizieren Zitationsmöglichkeiten.",
    features: ["Cross-Platform Monitoring", "Wettbewerbs-Citations", "Gap-Analyse", "KPI-Dashboard"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    bgIcon: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.13]">
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="100" cy="100" r="4" fill="currentColor"/>
      </svg>
    ),
    href: "/seo-audit"
  },
  {
    number: "02",
    title: "Content-Architektur",
    subtitle: "Strukturierung & Optimierung",
    description: "Inhalte, die AI-Systeme zitieren wollen. Answer-first Struktur, Factual Density und citation-worthy Statements für maximale Sichtbarkeit.",
    features: ["Answer-first Restructuring", "Factual Density", "Semantic Chunking", "Quote-Optimization"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
      </svg>
    ),
    bgIcon: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.13]">
        <rect x="30" y="40" width="140" height="8" rx="2" fill="currentColor"/>
        <rect x="30" y="60" width="100" height="8" rx="2" fill="currentColor"/>
        <rect x="30" y="80" width="120" height="8" rx="2" fill="currentColor"/>
        <rect x="30" y="110" width="140" height="8" rx="2" fill="currentColor"/>
        <rect x="30" y="130" width="80" height="8" rx="2" fill="currentColor"/>
        <rect x="30" y="150" width="100" height="8" rx="2" fill="currentColor"/>
        <rect x="30" y="40" width="4" height="120" rx="1" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
    href: "/seo-content-strategie"
  },
  {
    number: "03",
    title: "Technische GEO",
    subtitle: "Schema & Entities",
    description: "Die Infrastruktur, die AI versteht. Schema.org Markup, Entity Optimization, Knowledge Graph und llms.txt für maschinenlesbare Struktur.",
    features: ["Schema.org Markup", "Entity Optimization", "llms.txt Setup", "AI Crawler Performance"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
      </svg>
    ),
    bgIcon: (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.13]">
        <path d="M40 100 L70 70 L100 100 L130 70 L160 100" stroke="currentColor" strokeWidth="1" fill="none"/>
        <path d="M40 120 L70 90 L100 120 L130 90 L160 120" stroke="currentColor" strokeWidth="1" fill="none"/>
        <path d="M40 140 L70 110 L100 140 L130 110 L160 140" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="35" y="65" width="10" height="10" rx="2" fill="currentColor"/>
        <rect x="95" y="95" width="10" height="10" rx="2" fill="currentColor"/>
        <rect x="155" y="65" width="10" height="10" rx="2" fill="currentColor"/>
        <rect x="65" y="35" width="10" height="10" rx="2" fill="currentColor"/>
        <rect x="125" y="35" width="10" height="10" rx="2" fill="currentColor"/>
      </svg>
    ),
    href: "/seo-optimierung"
  }
];

// Hook for scroll animations
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
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

export default function ServicePillars() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation(0.1);

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header with slide animation */}
        <div 
          ref={headerRef}
          className={`max-w-3xl mb-20 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
            Services & Approach
          </span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-heading)] text-dark mb-6 leading-tight">
            GEO-Services für das{" "}
            <span className="text-primary">KI-Zeitalter</span>
          </h2>
          <p className="text-xl text-muted leading-relaxed">
            Basierend auf der GEO-Forschung von Princeton & IIT. Wir optimieren für 
            Visibility, Attribution und Authority in AI-Systemen.
          </p>
        </div>

        {/* Service Cards with staggered slide animation */}
        <div 
          ref={cardsRef}
          className="grid lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <Link
              key={service.number}
              href={service.href}
              className={`group relative block transition-all duration-700 ease-out ${
                cardsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: cardsVisible ? `${index * 150}ms` : '0ms' }}
            >
              {/* Card Container */}
              <div className="relative bg-offwhite rounded-3xl p-8 lg:p-10 h-full border border-border overflow-hidden transition-all duration-500 ease-out hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
                
                {/* Large Background Number */}
                <span className="absolute -top-4 -right-4 text-[120px] lg:text-[140px] font-[family-name:var(--font-heading)] leading-none text-primary/[0.04] group-hover:text-primary/[0.08] transition-colors duration-500 select-none pointer-events-none z-0">
                  {service.number}
                </span>

                {/* Background Icon/Graphic */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-primary pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                  {service.bgIcon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Top Row: Number (small) + Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-semibold text-primary/60">
                      {service.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {service.icon}
                    </div>
                  </div>

                  {/* Subtitle Tag */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white border border-border text-muted group-hover:border-primary/30 group-hover:text-primary transition-colors">
                      {service.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-[family-name:var(--font-heading)] text-dark mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features - Minimal */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.features.map((feature) => (
                      <span 
                        key={feature} 
                        className="text-xs text-muted bg-white px-3 py-1.5 rounded-full border border-border group-hover:border-primary/20 transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Learn More Link - Excited Style */}
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-dark group-hover:text-primary transition-colors duration-300">
                    <span className="relative">
                      Mehr erfahren
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                    <svg 
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA with slide animation */}
        <div 
          className={`mt-20 pt-12 border-t border-border transition-all duration-700 ease-out ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: cardsVisible ? '600ms' : '0ms' }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="text-lg text-dark font-medium mb-2">
                Nicht sicher, was Sie brauchen?
              </p>
              <p className="text-muted">
                Starten Sie mit einem kostenlosen KI-Sichtbarkeits-Audit.
              </p>
            </div>
            <Link 
              href="/kontakt" 
              className="group inline-flex items-center gap-3 bg-dark text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 whitespace-nowrap"
            >
              Kostenloses Audit anfordern
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
