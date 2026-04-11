"use client";

import SubpageLayout from "../components/SubpageLayout";
import Link from "next/link";
import GeoMockup from "./GeoMockup";
import ServicePillars from "./ServicePillars";
import PlatformsGrid from "./PlatformsGrid";
import GeoComparison from "./GeoComparison";
import GeoMetrics from "./GeoMetrics";
import GeoFAQ from "./GeoFAQ";
import { useEffect, useRef, useState } from "react";

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

export default function GeoAgenturPage() {
  const { ref: geoRef, isVisible: geoVisible } = useScrollAnimation(0.1);
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation(0.1);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation(0.2);

  return (
    <SubpageLayout>
      {/* ============================================================ */}
      {/*  HERO SECTION - Large Typography Statement                   */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-offwhite">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/5 via-secondary/3 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/5 to-transparent blur-3xl" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Side - Large Typography */}
            <div className="animate-fade-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-dark">Das neue SEO</span>
              </div>

              {/* Main Headline - Large Statement Typography */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-[family-name:var(--font-heading)] text-dark leading-[1.05] mb-8">
                Sichtbar in{" "}
                <span className="text-primary relative">
                  KI
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 2 150 2 198 8" stroke="#D4A853" strokeWidth="3" strokeLinecap="round" className="animate-draw-line"/>
                  </svg>
                </span>
                <br />
                <span className="text-muted">Systemen.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl lg:text-2xl text-muted leading-relaxed mb-10 max-w-xl">
                Generative Engine Optimization positioniert Ihre Marke direkt in den Antworten von ChatGPT, Gemini und Perplexity.
              </p>

              {/* Key Points - Research Based */}
              <div className="flex flex-wrap gap-6 mb-10">
                {[
                  { label: "Sichtbarkeit", value: "40%" },
                  { label: "Steigerung", value: "durch GEO" },
                  { label: "Basiert auf", value: "Princeton Studie" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-2xl lg:text-3xl font-[family-name:var(--font-heading)] text-primary">{stat.value}</span>
                    <span className="text-sm text-muted">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25"
                >
                  GEO-Audit anfragen
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
                  </svg>
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-border text-dark rounded-full font-semibold hover:bg-offwhite transition-all"
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>

            {/* Right Side - Interactive Mockup */}
            <div className="flex justify-center lg:justify-end animate-scale-in">
              <GeoMockup />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
          </svg>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOOLS / SOFTWARE SECTION - Carousel                         */}
      {/* ============================================================ */}
      {(() => {
        const tools = [
          { name: "ChatGPT",    logo: "/logos/openai.png",    category: "KI-Modell" },
          { name: "Claude",     logo: "/logos/claude.png",    category: "KI-Modell" },
          { name: "Gemini",     logo: "/logos/gemini.png",    category: "KI-Modell" },
          { name: "Deepseek",   logo: "/logos/deepseek.svg",  category: "KI-Modell" },
          { name: "Grok",       logo: "/logos/grok.png",      category: "KI-Modell" },
          { name: "Perplexity", logo: "/logos/perplexity.png",category: "KI-Suche" },
          { name: "Mistral",    logo: "/logos/mistral_logo.png", category: "KI-Modell" },
          { name: "Cursor",     logo: "/logos/cursor_icon.png",        category: "Entwicklung" },
          { name: "Windsurf",   logo: "/logos/windsurf.png",          category: "Entwicklung" },
          { name: "Supabase",   logo: "/logos/supabase_logo_light.svg", category: "Infrastruktur" },
          { name: "Netlify",    logo: "/logos/netlify_logo.svg",       category: "Infrastruktur" },
          { name: "GitHub",     logo: "/logos/github_logo.svg",        category: "Infrastruktur" },
          { name: "Jina AI",    logo: "/logos/jina.svg",               category: "KI-Tools" },
        ];
        return (
          <section className="py-20 bg-offwhite border-y border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {/* Header */}
              <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                    Unser Tech-Stack
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-dark leading-tight">
                    Die Tools, mit denen<br />wir arbeiten
                  </h2>
                </div>
                <div>
                  <p className="text-muted leading-relaxed">
                    GEO ist kein Bauchgefühl — es ist datengetriebene Arbeit mit den besten KI-Systemen der Welt.
                    Wir nutzen täglich die führenden Sprachmodelle, um zu analysieren, wie Ihre Marke in KI-Antworten erscheint.
                    Mit modernen Entwicklungstools bauen wir Strategien, die messbar funktionieren.
                  </p>
                </div>
              </div>
            </div>

            {/* Borderless infinite scroll carousel — LTR seamless */}
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-offwhite to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-offwhite to-transparent z-10 pointer-events-none" />

              {/* Two identical strips side by side; first starts at -100% so it scrolls into view from the left */}
              <div className="flex" style={{ width: 'max-content', animation: 'marquee-ltr 35s linear infinite', willChange: 'transform' }}>
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex items-center gap-16 px-8">
                    {tools.map((tool, i) => (
                      <div key={i} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300">
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          width={100}
                          height={36}
                          className="object-contain"
                          style={{ maxHeight: '32px', maxWidth: '110px', width: 'auto', height: 'auto' }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ============================================================ */}
      {/*  KI PLATFORMS GRID - Constellation Design                    */}
      {/* ============================================================ */}
      <PlatformsGrid />

      {/* ============================================================ */}
      {/*  SERVICE PILLARS - 3 Column Layout                           */}
      {/* ============================================================ */}
      <ServicePillars />

      {/* ============================================================ */}
      {/*  WHAT IS GEO - Explanation Section with slide animations       */}
      {/* ============================================================ */}
      <section id="was-ist-geo" className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - Sticky Headline with slide from left */}
            <div 
              ref={geoRef}
              className={`lg:sticky lg:top-32 transition-all duration-700 ease-out ${
                geoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
                Grundlagen
              </span>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-heading)] text-dark leading-tight mb-6">
                Was ist GEO?
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p className="text-lg">
                  <Link href="/was-ist-geo" className="font-bold text-dark hover:text-primary transition-colors">Generative Engine Optimization (GEO)</Link> ist die nächste Evolutionsstufe der digitalen Sichtbarkeit. Während eine traditionelle <Link href="/seo-agentur" className="text-primary hover:underline">SEO Agentur</Link> auf Google-Rankings optimiert, positioniert GEO Ihre Marke direkt in den Antworten von KI-Systemen wie ChatGPT, Gemini und Perplexity.
                </p>
                <p>
                  Das bedeutet konkret: Wenn Nutzer Fragen an KI-Systeme stellen, soll Ihre Marke als vertrauenswürdige Quelle genannt, zitiert oder empfohlen werden. Nicht auf Platz 1 der Suchergebnisse, sondern direkt in der Antwort selbst.
                </p>
                <p>
                  Wir bei Seoforge kombinieren die klassische SEO-Expertise mit aktuellstem Wissensstand und bestmöglicher GEO-Strategie. Es ist nämlich kein SEO vs. GEO, sondern eher ein realistisches Ergänzen voneinander – im Beginn der KI-Ära zumindest.
                </p>
              </div>
            </div>

            {/* Right - GEO Diagram */}
            <div
              className={`lg:pt-28 xl:pt-32 transition-all duration-700 ease-out ${
                geoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <img
                src="/images/geo-diagram.png"
                alt="GEO – Generative Engine Optimization Übersicht"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  GEO vs SEO vs LLMO - Interactive Comparison                 */}
      {/* ============================================================ */}
      <GeoComparison />

      {/* ============================================================ */}
      {/*  GEO METRICS - KPI Dashboard                                   */}
      {/* ============================================================ */}
      <GeoMetrics />

      {/* ============================================================ */}
      {/*  PROCESS SECTION with staggered slide animations             */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-offwhite overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header with slide animation */}
          <div 
            ref={processRef}
            className={`text-center mb-16 transition-all duration-700 ease-out ${
              processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
              Unser Ansatz
            </span>
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Vom Audit zur Sichtbarkeit
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Ein strukturierter Prozess, der Ihre Marke KI-sichtbar macht.
            </p>
          </div>

          {/* Process cards with staggered slide up animation */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "KI-Sichtbarkeits-Audit",
                description: "Wir analysieren, wo Ihre Marke aktuell in ChatGPT, Gemini & Co. auftaucht.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                )
              },
              {
                step: "02",
                title: "Content-Strategie",
                description: "Entwicklung einer GEO-Content-Strategie mit semantisch reichen Inhalten.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                )
              },
              {
                step: "03",
                title: "Technische Umsetzung",
                description: "Schema Markup, Entity Optimization und llms.txt Implementation.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                )
              },
              {
                step: "04",
                title: "Monitoring & Optimierung",
                description: "Kontinuierliches Tracking Ihrer KI-Sichtbarkeit über alle Plattformen.",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                )
              }
            ].map((item, index) => (
              <div 
                key={item.step}
                className={`group bg-white rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 ${
                  processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: processVisible ? `${index * 100}ms` : '0ms' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-[family-name:var(--font-heading)] text-primary/20 group-hover:text-primary/40 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-[family-name:var(--font-heading)] text-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ SECTION                                                  */}
      {/* ============================================================ */}
      <GeoFAQ />

      {/* ============================================================ */}
      {/*  CTA SECTION with slide animation                            */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-dark text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20" />
        </div>

        <div 
          ref={ctaRef}
          className={`relative max-w-4xl mx-auto px-6 lg:px-8 text-center transition-all duration-700 ease-out ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-heading)] mb-6">
            Bereit für{" "}
            <span className="text-primary">KI-Sichtbarkeit?</span>
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Lassen Sie uns gemeinsam Ihre GEO-Strategie entwickeln. 
            Sichtbar in ChatGPT, Gemini, Perplexity & Co.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              Kostenloses GEO-Audit
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
              </svg>
            </Link>
            <Link
              href="/seo-beratung"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              Beratung vereinbaren
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
