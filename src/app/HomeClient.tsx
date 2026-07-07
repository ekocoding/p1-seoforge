"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroWithImage from "./components/HeroWithImage";
import TrustSection from "./components/TrustSection";
import ProcessSection from "./components/ProcessSection";
/* ------------------------------------------------------------------ */
/*  ANIMATED COUNTER HOOK                                             */
/* ------------------------------------------------------------------ */
function useAnimatedCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    setHasAnimated(true);
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (target - startValue) * easeOut);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, hasAnimated]);

  return count;
}

/* ------------------------------------------------------------------ */
/*  SECTION WRAPPER                                                   */
/* ------------------------------------------------------------------ */
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={className}>{children}</section>;
}

/* ------------------------------------------------------------------ */
/*  GEO KREISLAUF INTERACTIVE COMPONENT                               */
/* ------------------------------------------------------------------ */
function LeistungenInteractive() {
  const PILLARS = [
    {
      img: "/images/home-pillars/seo.webp",
      eyebrow: "Suchmaschinenoptimierung",
      title: "SEO, die wirklich funktioniert",
      text: "SEO ist kein Versprechen, sondern ein System aus Technik, Content und Autorität \u2014 messbar aufgebaut und kontinuierlich optimiert. Sie bekommen direkten Kontakt zum Experten: keine Account-Manager, keine Standard-Pakete, nur die Hebel mit dem gr\u00f6\u00dften Impact.",
      highlights: ["Technik, Content & Autorit\u00e4t", "Direkt vom Experten", "Messbar & kontinuierlich"],
      cta: "SEO entdecken",
      href: "/seo",
    },
    {
      img: "/images/home-pillars/geo.webp",
      eyebrow: "Generative Engine Optimization",
      title: "Sichtbar in KI-Antworten",
      text: "ChatGPT, Gemini, Perplexity und Claude bestimmen zunehmend, welche Marken empfohlen werden. Wir machen Ihre Marke dort sichtbar \u2014 durch systematische GEO-Optimierung, Tracking \u00fcber alle Plattformen und messbare KI-Pr\u00e4senz statt Versprechungen.",
      highlights: ["In KI-Antworten zitiert", "Systematisch & messbar", "Alle Plattformen im Blick"],
      cta: "GEO entdecken",
      href: "/geo",
    },
    {
      img: "/images/home-pillars/webdesign.webp",
      eyebrow: "Webdesign & Entwicklung",
      title: "Websites f\u00fcr Google und KI-Suche",
      text: "Websites aus einem Team ranken besser, weil Strategie, Design, Code und SEO ineinandergreifen \u2014 kein Plugin-Overhead, keine Schnittstellenverluste. Custom Code mit DevOps, fairer Festpreis und ein pers\u00f6nlicher Ansprechpartner mit Antwort in unter 24 Stunden.",
      highlights: ["Custom Code statt Baukasten", "Fairer Preis durch KI", "Google + KI-Suche ab Tag 1"],
      cta: "Webdesign entdecken",
      href: "/webdesign",
    },
    {
      img: "/images/home-pillars/wartung.webp",
      eyebrow: "Website-Betreuung",
      title: "Wartung sichert Rankings & Verf\u00fcgbarkeit",
      text: "Eine Website ohne regelm\u00e4\u00dfige Wartung ist ein Sicherheitsrisiko: veraltete Plugins \u00f6ffnen bekannte Hintert\u00fcren, Performance verf\u00e4llt, Rankings sinken. Wir patchen automatisiert, sichern t\u00e4glich und \u00fcberwachen rund um die Uhr \u2014 mit pers\u00f6nlichem Support.",
      highlights: ["Updates vor Angreifern", "T\u00e4gliche Backups & Monitoring", "Monatlich k\u00fcndbar"],
      cta: "Wartung entdecken",
      href: "/website-wartung",
    },
  ];

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {PILLARS.map((p, i) => (
        <div key={p.href} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Bild */}
          <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-offwhite/40">
              <Image src={p.img} alt={p.title} width={1200} height={900} className="h-auto w-full" />
            </div>
          </div>
          {/* Text */}
          <div className={i % 2 === 1 ? "lg:order-1" : ""}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-primary">{p.eyebrow}</p>
            <h3 className="mb-4 font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold leading-tight text-dark">{p.title}</h3>
            <p className="mb-5 text-base leading-relaxed text-muted">{p.text}</p>
            <ul className="mb-7 flex flex-col gap-2.5">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-dark/70">
                  <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" /></svg>
                  {h}
                </li>
              ))}
            </ul>
            <Link href={p.href} className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl">
              {p.cta}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.6L11.2 6.3a.75.75 0 111-1.1l4.5 4.25a.75.75 0 010 1.1l-4.5 4.25a.75.75 0 11-1-1.1l3.15-2.95H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD MOCKUP COMPONENT                                        */
/* ------------------------------------------------------------------ */
function DashboardMockup() {
  const trafficCount = useAnimatedCounter(24847, 2000);
  const keywordsCount = useAnimatedCounter(342, 2000);
  const conversionRate = useAnimatedCounter(48, 2000); // 4.8 * 10

  const chartData = [
    { month: "Jan", value: 8500 },
    { month: "Feb", value: 9200 },
    { month: "Mrz", value: 10800 },
    { month: "Apr", value: 11500 },
    { month: "Mai", value: 13200 },
    { month: "Jun", value: 15800 },
    { month: "Jul", value: 17200 },
    { month: "Aug", value: 19500 },
    { month: "Sep", value: 21300 },
    { month: "Okt", value: 22800 },
    { month: "Nov", value: 23900 },
    { month: "Dez", value: 24847 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value));

  const keywords = [
    { keyword: "SEO Beratung", position: 1, change: 3 },
    { keyword: "SEO Agentur", position: 2, change: 5 },
    { keyword: "SEO Optimierung", position: 3, change: 4 },
  ];

  return (
    <div className="relative hidden lg:block hero-dashboard">
      {/* Dashboard container with 3D perspective */}
      <div className="relative" style={{ perspective: "1200px" }}>
        <div
          className="relative rounded-2xl border border-border bg-white shadow-2xl overflow-hidden transition-transform duration-500 ease-out"
          style={{ transform: "rotateY(-5deg) rotateX(5deg)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "rotateY(-5deg) rotateX(5deg)";
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 bg-[#F8F7F5] px-4 py-3 border-b border-border">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-muted border border-border">
              dashboard.seoforge.de
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-4">
              {/* Organic Traffic Card */}
              <div className="rounded-xl bg-white border border-border p-4 dashboard-kpi-1">
                <p className="text-xs text-muted mb-2">Organischer Traffic</p>
                <p className="text-2xl font-bold text-dark mb-1">
                  {trafficCount.toLocaleString("de-DE")}
                </p>
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-600">
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                    </svg>
                    +187%
                  </span>
                </div>
                {/* Mini sparkline */}
                <svg className="w-full h-6 mt-2" viewBox="0 0 100 20">
                  <polyline
                    className="svg-line-draw"
                    points="0,15 20,14 40,12 60,9 80,6 100,3"
                    fill="none"
                    stroke="#C2722A"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Keywords Card */}
              <div className="rounded-xl bg-white border border-border p-4 dashboard-kpi-2">
                <p className="text-xs text-muted mb-2">Keywords Top 10</p>
                <p className="text-2xl font-bold text-dark mb-1">{keywordsCount}</p>
                <span className="text-xs font-medium text-green-600">+58 diesen Monat</span>
              </div>

              {/* Conversion Rate Card */}
              <div className="rounded-xl bg-white border border-border p-4 dashboard-kpi-3">
                <p className="text-xs text-muted mb-2">Conversion Rate</p>
                <p className="text-2xl font-bold text-dark mb-1">
                  {(conversionRate / 10).toFixed(1)}%
                </p>
                <span className="text-xs font-medium text-green-600">+1.2%</span>
              </div>
            </div>

            {/* Area Chart */}
            <div className="rounded-xl bg-white border border-border p-4 dashboard-chart">
              <p className="text-sm text-dark mb-4">Organischer Traffic (12 Monate)</p>
              <svg className="w-full h-40" viewBox="0 0 400 120" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 30}
                    x2="400"
                    y2={i * 30}
                    stroke="#E5E3DF"
                    strokeOpacity="0.5"
                    strokeWidth="1"
                  />
                ))}

                {/* Area fill */}
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C2722A" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#C2722A" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  className="svg-area-draw"
                  d={`M 0 ${120 - (chartData[0].value / maxValue) * 100} ${chartData
                    .map(
                      (d, i) =>
                        `L ${(i / (chartData.length - 1)) * 400} ${
                          120 - (d.value / maxValue) * 100
                        }`
                    )
                    .join(" ")} L 400 120 L 0 120 Z`}
                  fill="url(#areaGradient)"
                />

                {/* Line */}
                <polyline
                  className="svg-area-draw"
                  points={chartData
                    .map(
                      (d, i) =>
                        `${(i / (chartData.length - 1)) * 400},${
                          120 - (d.value / maxValue) * 100
                        }`
                    )
                    .join(" ")}
                  fill="none"
                  stroke="#C2722A"
                  strokeWidth="2"
                />

                {/* Data points - staggered animation with inline styles */}
                {chartData.map((d, i) => (
                  <circle
                    key={i}
                    className="animate-scale-in"
                    style={{ animationDelay: `${1.2 + i * 0.05}s` }}
                    cx={(i / (chartData.length - 1)) * 400}
                    cy={120 - (d.value / maxValue) * 100}
                    r="3"
                    fill="#C2722A"
                  />
                ))}
              </svg>

              {/* Month labels */}
              <div className="flex justify-between mt-2 text-xs text-muted">
                <span>Jan</span>
                <span>Mrz</span>
                <span>Jun</span>
                <span>Sep</span>
                <span>Dez</span>
              </div>
            </div>

            {/* Keywords Ranking Table */}
            <div className="rounded-xl bg-white border border-border p-4 dashboard-table">
              <p className="text-sm text-dark mb-3">Top Rankings</p>
              <div className="space-y-2">
                {keywords.map((kw, i) => (
                  <div
                    key={kw.keyword}
                    className="animate-slide-in-left flex items-center justify-between py-2 border-b border-border last:border-0"
                    style={{ animationDelay: `${1.6 + i * 0.1}s` }}
                  >
                    <span className="text-sm text-dark">{kw.keyword}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-dark">#{kw.position}</span>
                      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-600">
                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                        </svg>
                        {kw.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  SERVICES STACK SECTION COMPONENT                                   */
/* ================================================================== */
function ServicesStackSection() {
  const [currentIndex, setCurrentIndex] = useState(3);
  const totalCards = 8;

  const services = [
    {
      number: "01",
      title: "SEO Audit",
      description: "Umfassende Analyse mit 200+ Prüfpunkten und konkretem Handlungsplan.",
      href: "/seo/audit",
      tags: ["Technisch", "Content"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      ),
    },
    {
      number: "02",
      title: "On-Page SEO",
      description: "Optimierung aller Seitenfaktoren für maximale Sichtbarkeit.",
      href: "/seo/on-page-optimierung",
      tags: ["Meta", "Content"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
    },
    {
      number: "03",
      title: "E-Commerce SEO",
      description: "Spezialisierte Optimierung für Online-Shops mit Fokus auf Conversion.",
      href: "/seo/shop",
      tags: ["Produkte", "Kategorien", "CRO"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      ),
      featured: true,
    },
    {
      number: "04",
      title: "Content & Texte",
      description: "SEO-optimierte Inhalte die ranken und konvertieren.",
      href: "/seo/texte",
      tags: ["Blog", "Landing Pages"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      ),
    },
    {
      number: "05",
      title: "Link Building",
      description: "Aufbau hochwertiger Backlinks für mehr Autorität.",
      href: "/seo/beratung",
      tags: ["Outreach", "Digital PR"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      number: "06",
      title: "SEO Optimierung",
      description: "Technische und inhaltliche Optimierung für Top-Platzierungen.",
      href: "/seo/optimierung",
      tags: ["Technisch", "Performance"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
    },
    {
      number: "07",
      title: "Content Strategie",
      description: "Datengetriebene Content-Planung für nachhaltigen Traffic.",
      href: "/seo/content-strategie",
      tags: ["Planung", "Hubs"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      ),
    },
    {
      number: "08",
      title: "Local SEO",
      description: "Regionale Sichtbarkeit für lokale Kunden und Geschäfte.",
      href: "/seo/beratung",
      tags: ["Google Business", "Maps"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        </svg>
      ),
    },
  ];

  const rotateCards = (direction: number) => {
    setCurrentIndex((prev) => (prev + direction + totalCards) % totalCards);
  };

  // Touch swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      rotateCards(diff > 0 ? 1 : -1);
    }
  };

  const getCardClasses = (index: number) => {
    let relativeIndex = index - currentIndex;
    if (relativeIndex < -3) relativeIndex += totalCards;
    if (relativeIndex > 4) relativeIndex -= totalCards;

    const baseClasses = "absolute w-[320px] bg-white border border-border rounded-3xl p-8 transition-all duration-500 ease-out cursor-pointer hover:scale-105";

    switch (relativeIndex) {
      case 0:
        return `${baseClasses} z-[5] left-1/2 -ml-[160px] border-primary shadow-xl shadow-primary/15 scale-105`;
      case -1:
      case 7:
        return `${baseClasses} z-[4] left-[35%] -ml-[160px] -rotate-6 -translate-x-[60px]`;
      case 1:
      case -7:
        return `${baseClasses} z-[4] left-[65%] -ml-[160px] rotate-6 translate-x-[60px]`;
      case -2:
      case 6:
        return `${baseClasses} z-[3] left-[18%] -ml-[160px] -rotate-12 -translate-x-[120px] opacity-90`;
      case 2:
      case -6:
        return `${baseClasses} z-[3] left-[82%] -ml-[160px] rotate-12 translate-x-[120px] opacity-90`;
      case -3:
      case 5:
        return `${baseClasses} z-[2] left-[5%] -ml-[160px] -rotate-16 -translate-x-[160px] opacity-70`;
      case 3:
      case -5:
        return `${baseClasses} z-[2] left-[95%] -ml-[160px] rotate-16 translate-x-[160px] opacity-70`;
      case 4:
      case -4:
        return `${baseClasses} z-[1] left-1/2 -ml-[160px] opacity-50 scale-95`;
      default:
        return baseClasses;
    }
  };

  return (
    <section className="bg-gradient-to-b from-offwhite to-white py-24 lg:py-32" id="leistungen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Services
            </p>
            <h2 className="text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)]">
              Unsere <span className="text-primary">SEO-Services</span> im Überblick
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => rotateCards(-1)}
              className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all"
              aria-label="Previous service"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </button>
            <button 
              onClick={() => rotateCards(1)}
              className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all"
              aria-label="Next service"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Stacked Cards Container */}
        <div
          className="relative h-[500px] hidden md:block perspective-1000"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {services.map((service, index) => {
            const relativeIndex = index - currentIndex;
            const normalizedIndex = ((index - currentIndex) % totalCards + totalCards) % totalCards;
            const isCenter = normalizedIndex === 0;
            
            return (
              <a
                key={service.title}
                href={service.href}
                className={getCardClasses(index)}
                onClick={(e) => {
                  if (!isCenter) {
                    e.preventDefault();
                    setCurrentIndex(index);
                  }
                }}
              >
                {isCenter && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    Beliebt
                  </div>
                )}
                <div className="text-6xl text-primary/10 font-[family-name:var(--font-heading)] leading-none mb-[-10px]">
                  {service.number}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-2xl text-dark font-[family-name:var(--font-heading)] mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                {isCenter && (
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                    Mehr erfahren
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
                    </svg>
                  </div>
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden">
          {services.map((service) => (
            <a
              key={service.title}
              href={service.href}
              className="group rounded-2xl border border-border bg-white p-6 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04] hover:-translate-y-1"
            >
              <div className="text-4xl text-primary/10 font-[family-name:var(--font-heading)] leading-none mb-2">
                {service.number}
              </div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.08] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="text-xl text-dark font-[family-name:var(--font-heading)]">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium text-primary bg-primary/[0.08] px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Info Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white border border-border rounded-2xl">
          <p className="text-sm text-muted text-center md:text-left">
            <strong className="text-dark">Nicht sicher, was Sie brauchen?</strong> Vereinbaren Sie ein kostenloses Erstgespräch.
          </p>
          <a 
            href="/kontakt" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all whitespace-nowrap"
          >
            Termin vereinbaren
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PAGE COMPONENT                                                     */
/* ================================================================== */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet SEO bei SEOforge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unsere monatlichen SEO-Pakete starten ab 600 €. Die genauen Kosten hängen von Ihrer Branche, dem Wettbewerb und Ihren Zielen ab. In einem kostenlosen Erstgespräch erhalten Sie ein konkretes Angebot — ohne Standardpakete.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert es, bis SEO-Ergebnisse sichtbar werden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste messbare Verbesserungen in den Rankings zeigen sich typischerweise nach 3–6 Monaten. Stabile Top-Positionen und deutlich steigender Traffic entstehen in der Regel nach 6–12 Monaten konsequenter Arbeit.",
      },
    },
    {
      "@type": "Question",
      name: "Gibt es eine Vertragsbindung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Wir arbeiten ohne Mindestlaufzeiten. Sie können monatlich kündigen. Wir setzen auf Ergebnisse als Kundenbindung — nicht auf Vertragsklauseln.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SEOforge von anderen SEO-Agenturen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kein Standardpaket, kein Outsourcing, kein Blackbox-Reporting. Sie haben einen festen Ansprechpartner, erhalten monatliche Berichte in verständlicher Sprache und wissen jederzeit, was wir tun und warum.",
      },
    },
    {
      "@type": "Question",
      name: "Für welche Unternehmensgrößen ist SEOforge geeignet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir arbeiten sowohl mit inhabergeführten Unternehmen als auch mit mittelständischen Betrieben. Unsere Projekte starten typischerweise ab 10.000 € Jahresumsatz mit SEO als relevantem Kanal.",
      },
    },
  ],
};

export default function HomeClient() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Navbar />

      <main>
        {/* ============================================================ */}
        {/*  HERO SECTION - PHOTO SPLIT LAYOUT                            */}
        {/* ============================================================ */}
        <HeroWithImage />

        {/* ============================================================ */}
        {/*  TRUST SECTION — stats + tools + testimonial                  */}
        {/* ============================================================ */}
        <TrustSection />

        {/* ============================================================ */}
        {/*  PARTNERSHIP SECTION                                          */}
        {/* ============================================================ */}
        <Section className="bg-white py-24 lg:py-32">
          <style jsx>{`
            @keyframes rotate-badge {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .rotate-badge {
              animation: rotate-badge 20s linear infinite;
            }
          `}</style>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Eyebrow */}
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Unser Anspruch
            </p>

            {/* Main heading */}
            <h2 className="text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)] mb-6">
              Qualität ist nicht verhandelbar
            </h2>

            {/* Intro line */}
            <p className="text-lg text-muted mb-12 max-w-3xl">
              Nachhaltiger SEO-Erfolg entsteht nicht durch Tricks, sondern durch <span className="font-semibold text-dark">KONSEQUENTE QUALITÄTSARBEIT</span>.
            </p>

            {/* Icon + Content area */}
            <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 mb-16">
              {/* Left: Rotating circular badge - 195px */}
              <div className="shrink-0 relative hidden sm:block" style={{ width: '195px', height: '195px' }}>
                <svg className="absolute inset-0 w-full h-full rotate-badge" viewBox="0 0 195 195">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 97.5, 97.5 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <text className="text-[13px] font-semibold tracking-wider" fill="#C2722A">
                    <textPath href="#circlePath" startOffset="0">
                      SEOFORGE • ANSPRUCH • SEOFORGE • ANSPRUCH •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#F8F7F5]" style={{ margin: '22px' }}>
                  <svg className="w-16 h-16 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              {/* Right: Text taking remaining space, centered */}
              <p className="text-lg leading-relaxed text-muted max-w-2xl">
                Wir arbeiten für Sie nach Grundsätzen, die sich nicht ändern – egal ob kleines Projekt oder große Kampagne.
                Keine Massenware, keine Automatisierung auf Kosten der Qualität. Wir analysieren Ihre spezifische
                Ausgangslage, entwickeln eine durchdachte Strategie und setzen sie mit Präzision um.
                Dabei bleiben Sie jederzeit im Bild – durch direkte Kommunikation und klare Fortschrittsberichte.
                So entsteht SEO, das hält.
              </p>
            </div>

            {/* Feature cards grid */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Card 1: Ergebnisse */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl text-dark mb-3 font-[family-name:var(--font-heading)]">
                  Daten statt Versprechen
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Wir messen, was zählt: Rankings, organischer Traffic, Conversions. Jeden Monat erhalten
                  Sie einen präzisen Report, der zeigt, wo Sie stehen und wohin die Reise geht.
                </p>
              </div>

              {/* Card 2: Erfahrung */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl text-dark mb-3 font-[family-name:var(--font-heading)]">
                  Erprobte Methoden
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Über Jahre hinweg haben wir unsere Methoden verfeinert – von lokalen Betrieben bis zu
                  bundesweiten Online-Shops. Dieses Wissen bringen wir mit, damit Sie nicht bei Null anfangen müssen.
                </p>
              </div>

              {/* Card 3: Strategie */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl text-dark mb-3 font-[family-name:var(--font-heading)]">
                  Maßarbeit, kein Schema F
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Standardlösungen gibt es bei uns nicht. Wir entwickeln eine Strategie, die zu Ihrem Geschäftsmodell,
                  Ihrer Zielgruppe und Ihren Ressourcen passt – nichts mehr, nichts weniger.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  AGENTUR-SERP — SEO / GEO / KI-SEO als Suchergebnisse        */}
        {/* ============================================================ */}
        <section className="py-16 lg:py-24" style={{ background: "#F8F5F1" }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">

              <div>
                <p className="text-xs font-bold uppercase tracking-[.12em] text-primary mb-3">Spezialisierungen</p>
                <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-dark leading-tight">
                  Drei Disziplinen —{" "}
                  <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                    so werden Sie gefunden.
                  </span>
                </h2>
                <p className="mt-4 text-muted leading-relaxed max-w-md">
                  Klassische Google-Suche, KI-Antworten und Marken-Autorität — jede Disziplin hat bei uns
                  eine eigene Seite. So wie Ihre Kunden sie finden würden.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white shadow-[0_20px_50px_-28px_rgba(26,26,26,0.22)] overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-5 py-3">
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dark/50">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    Google-Suche
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dark/35">3 Ergebnisse</span>
                </div>

                <div className="flex items-center gap-2.5 border-b border-border px-5 py-3" style={{ background: "#FBF8F4" }}>
                  <svg className="h-3.5 w-3.5 shrink-0 text-dark/35" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span className="text-sm text-dark/70">agentur für sichtbarkeit</span>
                </div>

                <div className="divide-y divide-border">
                  {[
                    { pfad: "seo-agentur", titel: "SEO Agentur — nachhaltige Rankings in Google", snippet: "Strategie, Technik, Content und Autorität als ein System. Für Sichtbarkeit, die bleibt." },
                    { pfad: "geo-agentur", titel: "GEO Agentur — sichtbar in ChatGPT & AI Overviews", snippet: "Ihre Marke als Antwort in KI-Suchen — bevor es der Wettbewerb ist." },
                    { pfad: "ki-seo-agentur", titel: "KI-SEO Agentur — Ihre Marke als Referenz für KI", snippet: "Entitäten, Content-Autorität und digitale PR für die neue Suche." },
                  ].map((r) => (
                    <Link key={r.pfad} href={`/${r.pfad}`} className="group block px-5 py-4 transition-colors duration-200 hover:bg-[#FBF8F4]">
                      <span className="flex items-center gap-2">
                        <svg viewBox="0 0 32 32" className="h-4 w-4 shrink-0" aria-hidden="true">
                          <polygon points="16,2 28,8 28,24 16,30 4,24 4,8" fill="#C2722A" />
                          <polygon points="16,7 23,11 23,21 16,25 9,21 9,11" fill="#D4A853" />
                        </svg>
                        <span className="truncate text-xs text-dark/45">seoforge.de <span className="text-dark/30">›</span> {r.pfad}</span>
                      </span>
                      <span className="mt-1 block text-[17px] font-semibold leading-snug text-primary group-hover:underline underline-offset-2">
                        {r.titel}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-muted">{r.snippet}</span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SERVICES TEASER → /leistungen                               */}
        {/* ============================================================ */}
        <section className="py-24 lg:py-32 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.12em] text-primary mb-3">Leistungen</p>
                <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark leading-tight">
                  SEO &amp; Webdesign<br />aus einer Hand
                </h2>
              </div>
              <p className="text-base text-dark/45 max-w-xs lg:text-right leading-relaxed">
                Individuell kombiniert — für Ihre Ziele, Ihre Branche, Ihr Budget.
              </p>
            </div>
            <LeistungenInteractive />
          </div>
        </section>

        {/* ============================================================ */}
        {/*  PROCESS SECTION — 4-step Audit → Strategie → Umsetzung      */}
        {/* ============================================================ */}
        <ProcessSection />

        {/* ============================================================ */}
        {/*  WHAT MAKES US DIFFERENT - Bento Grid Typography               */}
        {/* ============================================================ */}
        <section className="py-24 lg:py-36 bg-white">
          <style jsx>{`
            .highlight-word {
              background: linear-gradient(135deg, #C2722A 0%, #D4A853 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            .diff-card-num {
              transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
            }
            .diff-card:hover .diff-card-num {
              background-color: #C2722A;
              color: #fff;
              border-color: #C2722A;
            }
          `}</style>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            {/* Header */}
            <div className="mb-16 lg:mb-20">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
                Unser Unterschied
              </p>
              <h2 className="text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)] leading-tight max-w-2xl">
                Das macht <span className="highlight-word">SeoForge</span> anders
              </h2>
            </div>

            {/* Grid — gap-px + bg-border erzeugt die Trennlinien */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">

              {/* 01 */}
              <div className="diff-card bg-white p-8 lg:p-10 transition-colors hover:bg-offwhite">
                <span className="diff-card-num inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-dark text-sm font-semibold mb-8">
                  01
                </span>
                <h3 className="text-xl text-dark font-[family-name:var(--font-heading)] mb-3 leading-snug">
                  Keine Pakete.<br />
                  <span className="highlight-word">Kein Bullshit.</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Wir verkaufen keine Fixpreis-Pakete. Jede Strategie wird individuell entwickelt — weil Ihr Unternehmen einzigartig ist.
                </p>
              </div>

              {/* 02 */}
              <div className="diff-card bg-white p-8 lg:p-10 transition-colors hover:bg-offwhite">
                <span className="diff-card-num inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-dark text-sm font-semibold mb-8">
                  02
                </span>
                <h3 className="text-xl text-dark font-[family-name:var(--font-heading)] mb-3 leading-snug">
                  <span className="highlight-word">Maßgeschneidert</span><br />
                  statt Massenware
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Keine Copy-Paste-Lösungen. Wir analysieren Ihre Ausgangslage und entwickeln Strategien, die zu Ihrem Modell passen.
                </p>
              </div>

              {/* 03 */}
              <div className="diff-card bg-white p-8 lg:p-10 transition-colors hover:bg-offwhite">
                <span className="diff-card-num inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-dark text-sm font-semibold mb-8">
                  03
                </span>
                <h3 className="text-xl text-dark font-[family-name:var(--font-heading)] mb-3 leading-snug">
                  Immer einen<br />
                  <span className="highlight-word">Schritt voraus</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Algorithm-Updates, GEO-Optimierung, KI-Sichtbarkeit. Wir bleiben am Puls der Zeit — damit Sie es nicht müssen.
                </p>
              </div>

              {/* 04 */}
              <div className="diff-card bg-white p-8 lg:p-10 transition-colors hover:bg-offwhite">
                <span className="diff-card-num inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-dark text-sm font-semibold mb-8">
                  04
                </span>
                <h3 className="text-xl text-dark font-[family-name:var(--font-heading)] mb-3 leading-snug">
                  <span className="highlight-word">Direkter Draht</span><br />
                  zum Experten
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Keine Account-Manager, keine Weiterleitungen. Sie sprechen direkt mit dem, der Ihre Strategie entwickelt.
                </p>
              </div>

              {/* 05 */}
              <div className="diff-card bg-white p-8 lg:p-10 transition-colors hover:bg-offwhite">
                <span className="diff-card-num inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-dark text-sm font-semibold mb-8">
                  05
                </span>
                <h3 className="text-xl text-dark font-[family-name:var(--font-heading)] mb-3 leading-snug">
                  <span className="highlight-word">Kommunikation</span><br />
                  = Qualität
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Erst echte Kommunikation macht den Unterschied. Transparent, ehrlich, proaktiv — und immer erreichbar.
                </p>
              </div>

              {/* CTA-Tile */}
              <div className="bg-dark p-8 lg:p-10 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
                <p className="text-sm text-white/60 leading-relaxed mb-8">
                  Klingt das nach einer Zusammenarbeit, die Sie suchen?
                </p>
                <a
                  href="/kontakt"
                  className="group/btn inline-flex items-center gap-2 text-white text-sm font-semibold"
                >
                  Lassen Sie uns reden
                  <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  WHY YOUR BUSINESS NEEDS SEO                                  */}
        {/* ============================================================ */}
        <Section className="bg-offwhite py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section header */}
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-primary mb-4">Warum SEO?</p>
              <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark leading-[1.08]">
                Organische Sichtbarkeit ist<br />
                <span className="text-primary">kein Zufall</span>
              </h2>
            </div>

            {/* Stats row */}
            <div className="grid md:grid-cols-3 gap-4 mb-16">
              {[
                {
                  stat: "53%",
                  label: "Des Web-Traffics kommt organisch",
                  detail: "Mehr als die Hälfte aller Website-Besucher kommen über Suchmaschinen — nicht über Ads.",
                },
                {
                  stat: "14×",
                  label: "Höhere Conversion als Outbound",
                  detail: "Wer sucht, hat Absicht. SEO-Leads konvertieren 8–14× besser als Kaltakquise-Kontakte.",
                },
                {
                  stat: "76%",
                  label: "Lokale Suchen enden im Geschäft",
                  detail: "Drei von vier Menschen, die lokal suchen, besuchen innerhalb von 24h ein lokales Unternehmen.",
                },
              ].map((fact, i) => (
                <div key={i} className="rounded-2xl border border-border bg-white p-6">
                  <p className="font-[family-name:var(--font-heading)] text-5xl font-bold text-primary leading-none mb-3">{fact.stat}</p>
                  <h3 className="font-semibold text-dark mb-2">{fact.label}</h3>
                  <p className="text-sm text-muted leading-relaxed">{fact.detail}</p>
                </div>
              ))}
            </div>

            {/* Reason cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Organischer Traffic wächst dauerhaft",
                  desc: "Bezahlte Anzeigen liefern Traffic solange Sie zahlen. Organische Sichtbarkeit wächst mit der Zeit — ohne laufende Werbekosten.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Qualifiziertere Leads, weniger Aufwand",
                  desc: "Wer sucht, hat bereits eine Kaufabsicht. SEO zieht Menschen an, die aktiv nach Ihrer Lösung suchen — keine Kaltakquise nötig.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Lokale Kunden finden Sie zuerst",
                  desc: "76% der lokalen Suchanfragen führen innerhalb von 24 Stunden zu einem Besuch. Local SEO bringt Kunden direkt zu Ihnen.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-border bg-white p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-dark mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  WHY SEOFORGE / PROCESS                                       */}
        {/* ============================================================ */}
        <WhySeoForgeSection />

        {/* ============================================================ */}
        {/*  TESTIMONIAL / SOCIAL PROOF                                  */}
        {/* ============================================================ */}
        <Section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Centered heading */}
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary animate-fade-up">
                Das sagen unsere Kunden
              </p>
              <h2 className="mt-3 text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)] animate-fade-up" style={{ animationDelay: '0.05s' }}>
                Vertrauen, das auf <span className="text-primary">Ergebnissen</span> basiert
              </h2>
            </div>

            {/* Trust metric badges - centered */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-offwhite px-4 py-2.5 text-sm font-medium text-dark">
                <svg className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.9/5.0 Google Reviews
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-offwhite px-4 py-2.5 text-sm font-medium text-dark">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                96% Kundenbindung
              </div>
            </div>

            {/* 3 Review cards side by side with floating animation */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {/* Review 1 - Michael K. */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6 shadow-sm float-review-1 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-dark mb-4">
                  &ldquo;SeoForge hat unseren organischen Traffic innerhalb von 8 Monaten verdreifacht. Die transparente Arbeitsweise und das tiefe Fachwissen haben uns überzeugt.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    M
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Michael K.</p>
                    <p className="text-xs text-muted">Geschäftsführer, TechStart GmbH</p>
                  </div>
                  <div className="ml-auto text-xs font-medium text-muted bg-white px-2.5 py-1 rounded-full border border-border">
                    Google
                  </div>
                </div>
              </div>

              {/* Review 2 - Sandra M. */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6 shadow-sm float-review-2 animate-fade-up" style={{ animationDelay: '0.35s' }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-dark mb-4">
                  &ldquo;Endlich ein SEO-Partner, der nicht nur redet, sondern liefert. Unsere Rankings haben sich in allen wichtigen Bereichen deutlich verbessert.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                    S
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Sandra M.</p>
                    <p className="text-xs text-muted">Marketing Leiterin, ModeHaus AG</p>
                  </div>
                  <div className="ml-auto text-xs font-medium text-muted bg-white px-2.5 py-1 rounded-full border border-border">
                    Verified
                  </div>
                </div>
              </div>

              {/* Review 3 - Thomas R. */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6 shadow-sm float-review-3 animate-fade-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-dark mb-4">
                  &ldquo;Die Zusammenarbeit mit SeoForge ist unkompliziert und ergebnisorientiert. Das monatliche Reporting gibt uns volle Kontrolle über alle Maßnahmen.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    T
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Thomas R.</p>
                    <p className="text-xs text-muted">Inhaber, Handwerk Digital</p>
                  </div>
                  <div className="ml-auto text-xs font-medium text-muted bg-white px-2.5 py-1 rounded-full border border-border">
                    Google
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  CTA SECTION                                                  */}
        {/* ============================================================ */}
        <Section className="bg-dark py-24 lg:py-32" id="kontakt">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Background accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
              <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
            </div>

            <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
              {/* Text */}
              <div>
                <h2 className="text-4xl lg:text-5xl text-white font-[family-name:var(--font-heading)] animate-fade-up">
                  Bereit für mehr{" "}
                  <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                    Sichtbarkeit
                  </span>
                  ?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/60 animate-fade-up" style={{ animationDelay: '0.05s' }}>
                  Lassen Sie uns in einem kostenlosen Erstgespräch herausfinden,
                  wie wir Ihr Unternehmen in den Suchergebnissen nach vorne bringen können.
                  Keine Verpflichtungen &mdash; nur ehrliche Einschätzungen.
                </p>

                <div className="mt-8 space-y-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  {[
                    "Kostenlose Erstanalyse Ihrer Website",
                    "Individueller SEO-Massnahmenplan",
                    "Transparente Preise ohne versteckte Kosten",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <svg className="h-3 w-3 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact form */}
              <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                  <h3 className="text-2xl text-white font-[family-name:var(--font-heading)]">Jetzt Kontakt aufnehmen</h3>
                  <p className="mt-1 text-sm text-white/50">
                    Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>

                  <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="sr-only">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Ihr Name"
                          className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="sr-only">
                          Unternehmen
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          placeholder="Unternehmen"
                          className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="sr-only">
                        E-Mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ihre E-Mail-Adresse"
                        className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className="sr-only">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        placeholder="Ihre Website-URL"
                        className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="sr-only">
                        Nachricht
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Wie können wir Ihnen helfen?"
                        className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
                    >
                      Kostenlose Beratung anfordern
                    </button>
                    <p className="text-center text-xs text-white/30">
                      Ihre Daten werden vertraulich behandelt.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  WHY SEOFORGE SECTION                                              */
/* ------------------------------------------------------------------ */
function WhySeoForgeSection() {
  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text side */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Warum SeoForge
            </p>
            <h2 className="mt-3 text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)]" style={{ animationDelay: '0.05s' }}>
              Datengetrieben. Transparent. <span className="text-primary">Nachhaltig</span>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted" style={{ animationDelay: '0.1s' }}>
              Wir setzen nicht auf schnelle Tricks, sondern auf fundierte Strategien,
              die langfristig wirken. Jede Maßnahme basiert auf Daten, und Sie behalten
              jederzeit den vollen Ueberblick.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  step: "01",
                  title: "Analyse & Audit",
                  desc: "Wir analysieren Ihre Website, den Wettbewerb und Ihre Zielgruppe bis ins Detail.",
                },
                {
                  step: "02",
                  title: "Strategie & Planung",
                  desc: "Basierend auf den Daten entwickeln wir eine massgeschneiderte SEO-Strategie.",
                },
                {
                  step: "03",
                  title: "Umsetzung & Optimierung",
                  desc: "Wir setzen die Maßnahmen um und optimieren kontinuierlich für beste Ergebnisse.",
                },
                {
                  step: "04",
                  title: "Reporting & Wachstum",
                  desc: "Transparente Berichte zeigen Ihren Fortschritt. Wir skalieren, was funktioniert.",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="flex gap-5"
                  style={{ animationDelay: `${(i + 3) * 0.05}s` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/[0.08] text-sm font-bold text-primary">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl text-dark font-[family-name:var(--font-heading)]">{item.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side — SEO Ranking Tracker Mockup */}
          <div className="relative hidden lg:block" style={{ animationDelay: '0.1s' }}>
            <div className="rounded-3xl border border-border bg-white shadow-xl shadow-dark/[0.04] overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 bg-offwhite px-5 py-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="ml-2 flex-1 rounded-md bg-white border border-border px-3 py-1 text-[11px] text-muted">
                  search.google.com — &ldquo;SEO Agentur Mannheim&rdquo;
                </div>
              </div>
              {/* Ranking results */}
              <div className="p-5 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-4">Google Suchergebnisse — Positionsverlauf</p>
                {/* 5 keyword rows */}
                {[
                  { kw: "SEO Agentur", from: 47, to: 1, change: "+46" },
                  { kw: "SEO Beratung", from: 23, to: 3, change: "+20" },
                  { kw: "SEO Optimierung", from: 31, to: 2, change: "+29" },
                  { kw: "Local SEO", from: 18, to: 4, change: "+14" },
                  { kw: "SEO Audit", from: 55, to: 6, change: "+49" },
                ].map((row, i) => (
                  <div key={row.kw} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                    <div className="w-32 text-[13px] text-dark font-medium">{row.kw}</div>
                    <div className="flex-1 relative h-2 bg-border/60 rounded-full overflow-hidden">
                      <div
                        className="absolute right-0 h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                        style={{ width: `${(1 - (row.to / 60)) * 100}%`, transition: `width 1.2s ease ${i * 0.15}s` }}
                      />
                    </div>
                    <div className="w-8 text-center text-[12px] font-bold text-dark">#{row.to}</div>
                    <div className="w-12 text-right text-[11px] font-semibold text-green-600">↑{row.change}</div>
                  </div>
                ))}
              </div>
              {/* Stats footer */}
              <div className="grid grid-cols-3 divide-x divide-border border-t border-border bg-offwhite/50">
                {[
                  { label: "Ø Sichtbarkeit", value: "+187%" },
                  { label: "Keywords Top 10", value: "342" },
                  { label: "Zeitraum", value: "8 Mon." },
                ].map(s => (
                  <div key={s.label} className="py-4 text-center">
                    <p className="text-lg font-bold text-dark">{s.value}</p>
                    <p className="text-[10px] text-muted uppercase tracking-wide mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -right-4 -top-6 rounded-xl border border-border bg-white p-3 shadow-lg">
              <p className="text-[10px] font-medium text-muted">Org. Traffic</p>
              <p className="text-lg font-bold text-dark">+187%</p>
              <p className="text-[10px] text-green-600 font-medium">12 Monate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
