"use client";

import SubpageLayout from "../components/SubpageLayout";
import Link from "next/link";
import { useEffect, useState } from "react";

// ─────────────────────────────────────────────
//  Scroll animation hook (same pattern as geo-agentur)
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
//  SERP Ranking Mockup (kept for potential reuse)
// ─────────────────────────────────────────────
function SerpRankingMockup() {
  return (
    <div
      className="hero-dashboard"
      style={{
        animation: "float 4s ease-in-out infinite",
        willChange: "transform",
      }}
    >
      <svg
        viewBox="0 0 420 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[420px] drop-shadow-2xl"
        aria-hidden="true"
      >
        {/* Card background */}
        <rect width="420" height="500" rx="20" fill="#1E1E1E" />
        <rect width="420" height="500" rx="20" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* Subtle inner glow top */}
        <rect width="420" height="2" rx="0" fill="url(#topGlow)" opacity="0.6" />
        <defs>
          <linearGradient id="topGlow" x1="0" y1="0" x2="420" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="#C2722A" />
            <stop offset="60%" stopColor="#D4A853" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="chartLine" x1="30" y1="0" x2="390" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C2722A" />
            <stop offset="100%" stopColor="#D4A853" />
          </linearGradient>
          <linearGradient id="chartFill" x1="0" y1="380" x2="0" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C2722A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C2722A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Header row */}
        <rect x="20" y="20" width="380" height="52" rx="10" fill="#252525" />
        <circle cx="44" cy="46" r="10" fill="#C2722A" opacity="0.9" />
        <text x="60" y="43" fill="white" fontSize="11" fontFamily="system-ui" fontWeight="600">Position Tracker</text>
        <text x="60" y="57" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="system-ui">seoforge.de · 5 Keywords</text>
        <rect x="330" y="32" width="58" height="22" rx="11" fill="#16a34a" opacity="0.15" />
        <text x="359" y="47" fill="#4ade80" fontSize="9" fontFamily="system-ui" fontWeight="700" textAnchor="middle">LIVE</text>

        {/* Column headers */}
        <text x="30" y="96" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="system-ui" fontWeight="600" letterSpacing="0.08em">KEYWORD</text>
        <text x="240" y="96" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="system-ui" fontWeight="600" textAnchor="middle">VORHER</text>
        <text x="300" y="96" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="system-ui" fontWeight="600" textAnchor="middle">JETZT</text>
        <text x="370" y="96" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="system-ui" fontWeight="600" textAnchor="middle">TREND</text>
        <line x1="20" y1="103" x2="400" y2="103" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Row 1 */}
        <rect x="20" y="108" width="380" height="44" rx="8" fill="rgba(194,114,42,0.06)" />
        <text x="30" y="126" fill="white" fontSize="11" fontFamily="system-ui" fontWeight="600">seo agentur</text>
        <text x="30" y="141" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui">Hauptkeyword</text>
        <text x="240" y="133" fill="rgba(255,255,255,0.35)" fontSize="16" fontFamily="system-ui" fontWeight="700" textAnchor="middle" style={{ textDecoration: "line-through" }}>23</text>
        <rect x="275" y="118" width="50" height="28" rx="14" fill="#C2722A" />
        <text x="300" y="137" fill="white" fontSize="16" fontFamily="system-ui" fontWeight="800" textAnchor="middle">1</text>
        <text x="370" y="128" fill="#4ade80" fontSize="14" fontFamily="system-ui" fontWeight="700" textAnchor="middle">↑22</text>

        {/* Row 2 */}
        <rect x="20" y="158" width="380" height="44" rx="8" fill="transparent" />
        <text x="30" y="176" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="system-ui" fontWeight="500">seo agentur kosten</text>
        <text x="30" y="191" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui">Informational</text>
        <text x="240" y="183" fill="rgba(255,255,255,0.35)" fontSize="15" fontFamily="system-ui" fontWeight="600" textAnchor="middle">14</text>
        <rect x="279" y="169" width="42" height="24" rx="12" fill="#16a34a" opacity="0.2" />
        <text x="300" y="185" fill="#4ade80" fontSize="14" fontFamily="system-ui" fontWeight="700" textAnchor="middle">3</text>
        <text x="370" y="178" fill="#4ade80" fontSize="14" fontFamily="system-ui" fontWeight="700" textAnchor="middle">↑11</text>

        {/* Row 3 */}
        <rect x="20" y="208" width="380" height="44" rx="8" fill="transparent" />
        <text x="30" y="226" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="system-ui" fontWeight="500">seo beratung berlin</text>
        <text x="30" y="241" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui">Lokal</text>
        <text x="240" y="233" fill="rgba(255,255,255,0.35)" fontSize="15" fontFamily="system-ui" fontWeight="600" textAnchor="middle">31</text>
        <rect x="279" y="219" width="42" height="24" rx="12" fill="#16a34a" opacity="0.2" />
        <text x="300" y="235" fill="#4ade80" fontSize="14" fontFamily="system-ui" fontWeight="700" textAnchor="middle">4</text>
        <text x="370" y="228" fill="#4ade80" fontSize="14" fontFamily="system-ui" fontWeight="700" textAnchor="middle">↑27</text>

        {/* Row 4 */}
        <rect x="20" y="258" width="380" height="44" rx="8" fill="transparent" />
        <text x="30" y="276" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="system-ui" fontWeight="500">on page optimierung</text>
        <text x="30" y="291" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui">Service</text>
        <text x="240" y="283" fill="rgba(255,255,255,0.35)" fontSize="15" fontFamily="system-ui" fontWeight="600" textAnchor="middle">8</text>
        <rect x="279" y="269" width="42" height="24" rx="12" fill="#16a34a" opacity="0.2" />
        <text x="300" y="285" fill="#4ade80" fontSize="14" fontFamily="system-ui" fontWeight="700" textAnchor="middle">2</text>
        <text x="370" y="278" fill="#4ade80" fontSize="14" fontFamily="system-ui" fontWeight="700" textAnchor="middle">↑6</text>

        {/* Row 5 */}
        <rect x="20" y="308" width="380" height="44" rx="8" fill="transparent" />
        <text x="30" y="326" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="system-ui" fontWeight="500">seo audit</text>
        <text x="30" y="341" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui">Service</text>
        <text x="240" y="333" fill="rgba(255,255,255,0.35)" fontSize="15" fontFamily="system-ui" fontWeight="600" textAnchor="middle">19</text>
        <rect x="279" y="319" width="42" height="24" rx="12" fill="#16a34a" opacity="0.2" />
        <text x="300" y="335" fill="#4ade80" fontSize="14" fontFamily="system-ui" fontWeight="700" textAnchor="middle">5</text>
        <text x="370" y="328" fill="#4ade80" fontSize="14" fontFamily="system-ui" fontWeight="700" textAnchor="middle">↑14</text>

        <line x1="20" y1="360" x2="400" y2="360" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Mini chart label */}
        <text x="30" y="380" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="system-ui" fontWeight="600" letterSpacing="0.08em">ORGANISCHER TRAFFIC · 6 MONATE</text>

        {/* Mini chart area fill */}
        <path
          d="M30 455 L80 440 L130 435 L180 420 L230 405 L280 385 L330 368 L380 352 L380 460 L30 460 Z"
          fill="url(#chartFill)"
        />
        {/* Mini chart line */}
        <path
          d="M30 455 L80 440 L130 435 L180 420 L230 405 L280 385 L330 368 L380 352"
          stroke="url(#chartLine)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Chart dots */}
        <circle cx="380" cy="352" r="4" fill="#D4A853" />
        <circle cx="380" cy="352" r="7" fill="#D4A853" opacity="0.2" />

        {/* Bottom labels */}
        <text x="30" y="478" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="system-ui">Jan</text>
        <text x="130" y="478" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="system-ui">Feb</text>
        <text x="230" y="478" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="system-ui">Apr</text>
        <text x="330" y="478" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="system-ui">Jun</text>
      </svg>
    </div>
  );
}


// ─────────────────────────────────────────────
//  SEO Foundations Visual (interactive accordion)
// ─────────────────────────────────────────────
function SeoFoundationsVisual() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillars = [
    {
      id: 0,
      title: "Technisches SEO",
      subtitle: "Fundament & Performance",
      color: "#C2722A",
      metrics: [
        { label: "Core Web Vitals", value: "LCP < 2.5s", good: true },
        { label: "Crawlability", value: "100%", good: true },
        { label: "Mobile Score", value: "97/100", good: true },
        { label: "Indexierung", value: "Vollständig", good: true },
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
    },
    {
      id: 1,
      title: "Content & On-Page",
      subtitle: "Relevanz & Suchintention",
      color: "#D4A853",
      metrics: [
        { label: "Keywords Top 10", value: "+342", good: true },
        { label: "Content Score", value: "94/100", good: true },
        { label: "Suchintention", value: "Getroffen", good: true },
        { label: "Interne Links", value: "Optimiert", good: true },
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Autorität & Links",
      subtitle: "Trust & Off-Page Signale",
      color: "#C2722A",
      metrics: [
        { label: "Domain Rating", value: "58 DR", good: true },
        { label: "Backlinks", value: "+1.247", good: true },
        { label: "Toxische Links", value: "0%", good: true },
        { label: "Referring Domains", value: "312", good: true },
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative h-full min-h-[500px] flex flex-col gap-4">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-offwhite rounded-md px-3 py-1 text-[11px] text-muted border border-border">
            seoforge.de — SEO Performance Dashboard
          </div>
        </div>
        {/* Traffic bar mini chart */}
        <div>
          <div className="flex items-end justify-between mb-1">
            <span className="text-[10px] text-muted uppercase tracking-widest">Organischer Traffic · 8 Monate</span>
            <span className="text-xs font-bold text-green-600">+187%</span>
          </div>
          <div className="flex items-end gap-1 h-10">
            {[22, 28, 35, 42, 55, 68, 82, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background: i === 7
                    ? "linear-gradient(to top, #C2722A, #D4A853)"
                    : `rgba(194,114,42,${0.15 + i * 0.07})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3 pillar cards */}
      {pillars.map((pillar, i) => (
        <div
          key={pillar.id}
          onClick={() => setActivePillar(activePillar === i ? null : i)}
          className="relative rounded-2xl border bg-white cursor-pointer transition-all duration-300 overflow-hidden"
          style={{
            borderColor: activePillar === i ? `${pillar.color}40` : "#E5E3DF",
            boxShadow: activePillar === i ? `0 4px 20px ${pillar.color}15` : "none",
          }}
        >
          {/* Collapsed state */}
          <div className="flex items-center gap-4 p-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${pillar.color}15`, color: pillar.color }}
            >
              {pillar.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-dark">{pillar.title}</h4>
              <p className="text-[11px] text-muted">{pillar.subtitle}</p>
            </div>
            {/* Status dots */}
            <div className="flex gap-1 mr-2">
              {pillar.metrics.slice(0, 3).map((_, mi) => (
                <div key={mi} className="w-1.5 h-1.5 rounded-full bg-green-400" />
              ))}
            </div>
            <svg
              className="w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200"
              style={{ transform: activePillar === i ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          {/* Expanded state */}
          <div
            className="overflow-hidden transition-all duration-300 ease-out"
            style={{ maxHeight: activePillar === i ? "200px" : "0px" }}
          >
            <div className="px-4 pb-4 border-t border-border/50">
              <div className="grid grid-cols-2 gap-2 pt-3">
                {pillar.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between bg-offwhite rounded-lg px-3 py-2">
                    <span className="text-[11px] text-muted">{metric.label}</span>
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: metric.good ? "#16a34a" : "#dc2626" }}
                    >
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Caption pills below */}
      <div className="flex flex-wrap gap-2 mt-1">
        {["On-Page SEO", "Off-Page SEO", "Technisches SEO", "Content SEO"].map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-offwhite border border-border text-xs font-semibold text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Leistungen service cards
// ─────────────────────────────────────────────
const services = [
  {
    href: "/seo/audit",
    title: "SEO Audit",
    desc: "Wir analysieren Ihre gesamte Website systematisch auf technische Fehler, inhaltliche Schwächen und strukturelle Probleme. Am Ende steht ein detaillierter Bericht mit konkreten Handlungsempfehlungen – nach Priorität sortiert.",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
    delay: 200,
  },
  {
    href: "/seo/beratung",
    title: "SEO Beratung",
    desc: "Ob einmalige Strategiesession oder laufende Begleitung: Unsere SEO-Berater stehen Ihnen als kompetente Ansprechpartner zur Verfügung. Ideal für Unternehmen, die ein internes Team haben, aber fachliche Unterstützung brauchen.",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    delay: 280,
  },
  {
    href: "/seo/on-page",
    title: "On-Page Optimierung",
    desc: "Wir optimieren alle relevanten On-Page-Faktoren direkt auf Ihrer Website – von der URL-Struktur bis zur internen Verlinkung. Das ist oft die Grundlage für alles weitere: Ohne saubere On-Page-Basis bringen auch gute Backlinks wenig.",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    delay: 360,
  },
  {
    href: "/seo/content-strategie",
    title: "SEO Content Strategie",
    desc: "Wir entwickeln eine datenbasierte Content-Strategie, die auf Ihre Zielkunden und deren Suchanfragen ausgerichtet ist. Das schließt Themenplanung, Keyword-Mapping und redaktionelle Richtlinien ein.",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
    delay: 440,
  },
  {
    href: "/seo/shop",
    title: "Shop SEO",
    desc: "Online-Shops haben eigene SEO-Anforderungen: Produktseiten, Kategorie-Optimierung, Facettennavigation, strukturierte Daten. Wir kennen die typischen Fehler bei WooCommerce, Shopify und Shopware.",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
    delay: 520,
  },
  {
    href: "/seo/texte",
    title: "SEO Texte",
    desc: "Wir schreiben Texte, die sowohl für Suchmaschinen als auch für Ihre Leser funktionieren. Kein Keyword-Stuffing, keine leeren Floskeln – sondern Inhalte, die Fragen beantworten, Vertrauen aufbauen und zur Anfrage motivieren.",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
    delay: 600,
  },
];

// ─────────────────────────────────────────────
//  FAQ data
// ─────────────────────────────────────────────
const faqs = [
  {
    q: "Was kostet eine SEO Agentur?",
    a: "Die Kosten hängen stark von Ausgangssituation, Wettbewerb und Zielen ab. Bei SeoForge beginnen laufende SEO-Betreuungen in der Regel ab 800 € pro Monat. Für kleinere Projekte oder Einmalleistungen wie einen SEO Audit gibt es separate Pakete. Im kostenlosen Erstgespräch analysieren wir Ihren konkreten Bedarf und nennen Ihnen einen klaren Preis – ohne versteckte Posten.",
  },
  {
    q: "Wie lange dauert es, bis SEO-Ergebnisse sichtbar werden?",
    a: "SEO braucht Zeit, das lässt sich nicht schönreden. Erste Bewegungen in den Rankings sind oft nach 6–12 Wochen erkennbar. Für spürbare Traffic-Steigerungen sollten Sie realistisch mit 4–6 Monaten rechnen – je nach Ausgangslage, Wettbewerb und wie konsequent die Maßnahmen umgesetzt werden. Websites mit bestehender Autorität sehen Ergebnisse früher als komplett neue Domains.",
  },
  {
    q: "Was unterscheidet SeoForge von anderen SEO Agenturen?",
    a: "Wir haben keinen Vertrieb, der Ihnen etwas verkauft, was wir dann nicht liefern. Das klingt selbstverständlich, ist es aber leider nicht. Bei uns sprechen Sie von Anfang an mit den Leuten, die die Arbeit auch machen. Dazu kommt unser ganzheitlicher Ansatz: SEO, GEO und Webdesign aus einer Hand, ohne lange Vertragslaufzeiten, und mit Reporting, das Sie wirklich verstehen.",
  },
  {
    q: "Für welche Unternehmen lohnt sich eine SEO Agentur?",
    a: "Grundsätzlich für jedes Unternehmen, das online gefunden werden will und dessen Zielkunden bei Google suchen. Besonders lohnenswert ist SEO für Dienstleister, Shops und B2B-Unternehmen mit längeren Kaufentscheidungsprozessen – weil organischer Traffic langfristig günstiger ist als bezahlte Anzeigen. Für sehr lokale Betriebe mit engem Einzugsgebiet ist lokales SEO oft der wichtigste Hebel.",
  },
  {
    q: "Wie läuft die Zusammenarbeit mit SeoForge ab?",
    a: "Alles beginnt mit einem kostenlosen Erstgespräch, in dem wir Ihre Situation und Ziele besprechen. Danach erstellen wir ein konkretes Angebot. Nach Auftragserteilung starten wir mit dem Audit und der Strategiephase. Ab dann gibt es regelmäßige Updates, monatliche Reports und einen festen Ansprechpartner auf unserer Seite. Kein Ticketsystem, keine anonymen E-Mail-Adressen.",
  },
  {
    q: "Bietet SeoForge auch lokales SEO an?",
    a: "Ja. Lokales SEO ist ein eigener Schwerpunkt – gerade für Unternehmen mit stationärem Geschäft oder regionaler Ausrichtung. Das umfasst Google-Business-Optimierung, lokale Zitationen, standortspezifische Landingpages und die Optimierung für standortbasierte Suchanfragen wie \"SEO Agentur Berlin\" oder \"Zahnarzt Hamburg\". Die Grundprinzipien sind dieselben wie bei klassischem SEO, aber mit lokalen Besonderheiten.",
  },
  {
    q: "Was ist der Unterschied zwischen SEO und SEA?",
    a: "SEO (Search Engine Optimization) zielt auf organische Platzierungen – also die Ergebnisse, für die man nicht direkt bezahlt. SEA (Search Engine Advertising) sind bezahlte Anzeigen, etwa über Google Ads. SEO ist langfristiger und günstiger pro Klick, braucht aber Zeit. SEA liefert schnell Traffic, kostet aber dauerhaft Geld pro Klick. Für die meisten Unternehmen ist eine Kombination sinnvoll: SEA überbrückt die SEO-Anlaufzeit, SEO sorgt für nachhaltiges Wachstum.",
  },
  {
    q: "Wie messen Sie den Erfolg einer SEO-Kampagne?",
    a: "Wir messen keine eitlen Metriken wie Domain-Authority oder irgendwelche selbst definierten Scores. Für uns zählen: organischer Traffic (Google Search Console), Keyword-Rankings für definierte Zielbegriffe, Crawling- und Indexierungsstatus sowie – am wichtigsten – Conversions aus organischem Traffic. Was als Conversion gilt, legen wir gemeinsam mit Ihnen zu Beginn fest. Am Ende des Tages muss SEO zu mehr Anfragen oder Umsatz führen, sonst macht es keinen Sinn.",
  },
];

// ─────────────────────────────────────────────
//  UX/UI SEO Section
// ─────────────────────────────────────────────
function UXUISeoSection() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const phases = [
    {
      label: "Status quo",
      badge: { text: "Vor der Optimierung", color: "#dc2626", bg: "rgba(220,38,38,0.1)" },
      scores: [
        { label: "LCP", value: "4.8s", good: false },
        { label: "CLS", value: "0.42", good: false },
        { label: "INP", value: "380ms", good: false },
      ],
      visual: (
        <div className="space-y-2 px-3 pb-3">
          <div className="h-3 bg-red-100 rounded w-full" />
          <div className="h-2 bg-red-50 rounded w-3/4" />
          <div className="h-12 bg-red-50/60 rounded border border-red-100 flex items-center justify-center">
            <span className="text-[10px] text-red-300">Langsames Laden…</span>
          </div>
          <div className="h-2 bg-red-50 rounded w-1/2" />
          <div className="h-2 bg-red-50 rounded w-5/6" />
          <div className="mt-2 h-6 bg-gray-100 rounded text-center text-[9px] text-gray-300 leading-6">Button kaum sichtbar</div>
        </div>
      ),
    },
    {
      label: "Analyse",
      badge: { text: "Core Web Vitals Audit", color: "#C2722A", bg: "rgba(194,114,42,0.1)" },
      scores: [
        { label: "LCP", value: "Wird fix.", good: null },
        { label: "CLS", value: "Analyse…", good: null },
        { label: "INP", value: "Prüfen…", good: null },
      ],
      visual: (
        <div className="space-y-2 px-3 pb-3">
          {["Rendering-Bottleneck", "Lazy Loading fehlt", "CLS durch Ads", "Font-Blocking"].map((issue, i) => (
            <div key={i} className="flex items-center gap-2 bg-orange-50/60 rounded-lg px-2.5 py-1.5 border border-orange-100">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
              <span className="text-[10px] text-orange-700 font-medium">{issue}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Nach UX-Optimierung",
      badge: { text: "Nach Optimierung", color: "#16a34a", bg: "rgba(22,163,74,0.1)" },
      scores: [
        { label: "LCP", value: "1.4s", good: true },
        { label: "CLS", value: "0.02", good: true },
        { label: "INP", value: "68ms", good: true },
      ],
      visual: (
        <div className="space-y-2 px-3 pb-3">
          <div className="h-3 bg-green-50 rounded w-full border border-green-100" />
          <div className="h-2 bg-green-50/60 rounded w-3/4" />
          <div className="h-12 bg-white rounded border border-green-200 flex items-center justify-center shadow-sm">
            <span className="text-[10px] text-green-600 font-semibold">Sofort geladen ✓</span>
          </div>
          <div className="h-2 bg-green-50/60 rounded w-1/2" />
          <div className="h-2 bg-green-50/60 rounded w-5/6" />
          <div className="mt-2 h-7 rounded text-center text-[10px] text-white font-bold leading-7" style={{ background: "#C2722A" }}>
            Anfrage stellen →
          </div>
        </div>
      ),
    },
    {
      label: "Ergebnis",
      badge: { text: "SEO & Conversion Uplift", color: "#C2722A", bg: "rgba(194,114,42,0.1)" },
      scores: [
        { label: "Rankings", value: "+41%", good: true },
        { label: "Traffic", value: "+187%", good: true },
        { label: "Conversions", value: "+68%", good: true },
      ],
      visual: (
        <div className="space-y-2 px-3 pb-3">
          {[
            { label: "Organischer Traffic", val: "187%" },
            { label: "Keyword-Rankings Top 3", val: "41%" },
            { label: "Conversion Rate", val: "68%" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[10px] text-muted w-28 flex-shrink-0">{stat.label}</span>
              <div className="flex-1 h-2 bg-offwhite rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: stat.val, transition: "width 0.8s ease" }}
                />
              </div>
              <span className="text-[11px] font-bold text-green-600 w-10 text-right">+{stat.val}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const current = phases[phase];

  return (
    <section className="py-24 lg:py-32 bg-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center reveal"
        >
          {/* Left: text */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[.22em] text-primary mb-5 block">
              UX · UI · Core Web Vitals
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-dark leading-tight mb-5">
              Design, das rankt<br />
              <span className="text-primary italic">und konvertiert.</span>
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Google bewertet Nutzererfahrung als direkten Rankingfaktor. Core Web Vitals, Ladezeit
              und mobile Usability entscheiden mit, ob Ihre Seite auf Seite 1 oder Seite 2 landet —
              und ob Besucher konvertieren oder abspringen.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Bei SeoForge verbinden wir SEO mit professionellem{" "}
              <Link href="/webdesign" className="text-primary hover:underline font-medium">Webdesign</Link>
              {" "}und durchdachtem{" "}
              <Link href="/webdesign/app-design" className="text-primary hover:underline font-medium">UX/UI Design</Link>
              {" "}— weil was gut aussieht und schnell lädt, auch besser gefunden wird.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                { label: "Core Web Vitals (LCP, CLS, INP)", sub: "Google-Rankingfaktor seit 2021" },
                { label: "Mobile-First Optimierung", sub: "70 % aller Suchen kommen vom Handy" },
                { label: "UX-Audit & Conversion-Optimierung", sub: "Weniger Absprünge, mehr Anfragen" },
                { label: "Page Speed & Ladezeit", sub: "1s Verzögerung = −7 % Conversions" },
              ].map(({ label, sub }) => (
                <li key={label} className="flex gap-3">
                  <div className="mt-1 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">{label}</p>
                    <p className="text-xs text-muted">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/webdesign"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/25 text-sm font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            >
              UX/UI & Webdesign ansehen
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Right: animated phone mockup */}
          <div className="flex flex-col items-center gap-6">
            {/* Phone frame */}
            <div className="relative w-[260px]">
              {/* Phone outer */}
              <div className="relative rounded-[36px] bg-dark p-[10px] shadow-2xl shadow-dark/30"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 pt-1 pb-2">
                  <span className="text-[9px] text-white/50 font-medium">9:41</span>
                  <div className="w-16 h-5 rounded-full bg-dark/60 mx-auto" />
                  <div className="flex gap-1">
                    <div className="w-3 h-2 border border-white/30 rounded-sm relative">
                      <div className="absolute inset-[1px] right-0 bg-white/50 rounded-sm" style={{ right: "3px" }} />
                    </div>
                  </div>
                </div>

                {/* Screen */}
                <div className="rounded-[28px] bg-white overflow-hidden" style={{ minHeight: "360px" }}>
                  {/* Browser bar */}
                  <div className="bg-offwhite border-b border-border px-3 py-2 flex items-center gap-2">
                    <div className="flex-1 bg-white rounded border border-border px-2 py-0.5">
                      <span className="text-[9px] text-muted">ihr-unternehmen.de</span>
                    </div>
                    <svg className="w-3 h-3 text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>

                  {/* Animated content */}
                  <div className="transition-all duration-500 ease-in-out">
                    {current.visual}
                  </div>
                </div>
              </div>

              {/* Badge — absolute top right */}
              <div
                className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-500"
                style={{
                  color: current.badge.color,
                  background: current.badge.bg,
                  borderColor: `${current.badge.color}30`,
                }}
              >
                {current.badge.text}
              </div>
            </div>

            {/* CWV scores */}
            <div className="flex gap-3">
              {current.scores.map((score) => (
                <div
                  key={score.label}
                  className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all duration-500"
                  style={{
                    borderColor: score.good === true ? "rgba(22,163,74,0.3)" : score.good === false ? "rgba(220,38,38,0.25)" : "rgba(194,114,42,0.25)",
                    background: score.good === true ? "rgba(22,163,74,0.05)" : score.good === false ? "rgba(220,38,38,0.05)" : "rgba(194,114,42,0.05)",
                  }}
                >
                  <span className="text-[10px] text-muted font-semibold uppercase tracking-wide">{score.label}</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: score.good === true ? "#16a34a" : score.good === false ? "#dc2626" : "#C2722A" }}
                  >
                    {score.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress dots */}
            <div className="flex gap-2">
              {phases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhase(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ background: i === phase ? "#C2722A" : "rgba(26,26,26,0.15)", width: i === phase ? "20px" : "8px" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────
export default function SeoAgenturClient() {

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Marquee items
  const marqueeItems = [
    "Google-konform",
    "Kein Mindestvertrag",
    "On-Page SEO",
    "Technical SEO",
    "Content SEO",
    "Lokales SEO",
    "Shop SEO",
    "Linkbuilding",
    "SEO Texte",
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ============================================================ */}
      {/*  SECTION 1 – HERO  (Magazine 55/45 split)                   */}
      {/* ============================================================ */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-[55fr_45fr] overflow-hidden">

        {/* LEFT — text column */}
        <div className="relative flex flex-col justify-center bg-offwhite pt-28 pb-20 px-8 lg:pl-20 lg:pr-16 xl:pl-24 xl:pr-20">
          {/* Top orange accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: "linear-gradient(90deg,#C2722A 0%,transparent 60%)" }} />

          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[11px] font-bold tracking-[.1em] uppercase text-primary border border-primary rounded-[3px] px-2.5 py-1">
              SEO Agentur
            </span>
            <div className="w-6 h-px bg-dark/20" />
            <span className="text-[11px] font-medium text-muted tracking-[.04em]">Organische Sichtbarkeit · Google-konform</span>
          </div>

          {/* H1 */}
          <h1 className="font-[family-name:var(--font-heading)] text-dark leading-[1.06] tracking-[-0.03em] mb-5"
            style={{ fontSize: "clamp(38px,4.2vw,64px)" }}>
            <span className="block">SEO Agentur für</span>
            <span className="block">
              Rankings die{" "}
              <span className="text-primary relative inline-block">
                Bestand haben.
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 280 10" fill="none">
                  <path d="M2 7C50 2 140 2 278 7" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </span>
            <span className="block italic" style={{ color: "rgba(26,26,26,.38)" }}>Keine Tricks. Strategie.</span>
          </h1>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-dark/10" />
            <div className="w-1.5 h-1.5 border border-primary/50 rotate-45 flex-shrink-0" style={{ background: "rgba(194,114,42,.15)" }} />
            <div className="flex-1 h-px bg-dark/10" />
          </div>

          {/* Lead */}
          <p className="text-[17px] leading-[1.85] text-dark/60 font-light mb-3 max-w-lg">
            Wir bringen Ihre Website dauerhaft in die Top-Positionen bei Google — nicht durch Abkürzungen, sondern durch nachhaltige SEO-Arbeit mit klarer Strategie und messbaren Ergebnissen.
          </p>
          <p className="text-sm leading-[1.9] text-dark/45 font-light mb-9 max-w-lg">
            Technisches SEO, zielgruppengerechter Content und ein solides Linkprofil: Als SEO Agentur kümmern wir uns um alle drei Säulen — transparent, ohne versteckte Laufzeiten, mit persönlichem Ansprechpartner.
          </p>

          {/* Feature grid 2×2 */}
          <div className="grid grid-cols-2 gap-2.5 mb-9 max-w-lg">
            {[
              { icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5", title: "Technisches SEO", desc: "Core Web Vitals, Crawlability" },
              { icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z", title: "Content-Strategie", desc: "Keyword-Architektur, Cluster" },
              { icon: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244", title: "Linkbuilding", desc: "Autorität, Backlinks" },
              { icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z", title: "Monthly Reporting", desc: "Klare KPIs, kein Fachjargon" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-2 p-3 rounded-lg border border-dark/[.06] bg-dark/[.03]">
                <div className="w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center bg-primary/10">
                  <svg className="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-dark">{title}</div>
                  <div className="text-[11px] text-dark/45">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 max-w-sm">
            <Link
              href="/kontakt"
              className="group flex items-center justify-between px-6 py-4 rounded-[10px] bg-dark text-offwhite text-sm font-semibold transition-all duration-200 hover:bg-primary"
            >
              Kostenloses Erstgespräch vereinbaren
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
            <a
              href="#leistungen"
              className="group flex items-center justify-between px-6 py-[13px] rounded-[10px] border-[1.5px] border-dark/12 text-dark text-sm font-semibold transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Leistungen &amp; Pakete ansehen
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT — full-height photo column */}
        <div className="relative hidden lg:block overflow-hidden">
          {/* Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/seo-agentur-hero.jpg"
            alt="SeoForge Team bei der SEO-Arbeit"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
          />
          {/* Warm color grade */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(194,114,42,.1) 0%, transparent 30%, transparent 60%, rgba(15,15,13,.45) 100%)" }} />
          {/* Left edge blend into bg */}
          <div className="absolute top-0 left-0 bottom-0 w-20 pointer-events-none"
            style={{ background: "linear-gradient(90deg, #F8F7F5, transparent)" }} />

          {/* Live badge — top left */}
          <div className="absolute top-10 left-10 flex items-center gap-2 bg-dark rounded-full px-3.5 py-1.5 shadow-lg z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 shadow-[0_0_6px_rgba(74,222,128,.7)]"
              style={{ animation: "ping 1.8s ease-in-out infinite" }} />
            <span className="text-[11px] font-semibold text-white/80 tracking-[.04em]">SEO Monitoring aktiv</span>
          </div>

          {/* KPI card — top right */}
          <div className="absolute top-20 right-6 z-10 rounded-xl p-3.5 shadow-xl border border-white/90"
            style={{ background: "rgba(248,247,245,.95)", backdropFilter: "blur(12px)", minWidth: "160px" }}>
            <div className="text-[10px] font-bold tracking-[.08em] uppercase text-dark/40 mb-2.5">Keyword-Rankings</div>
            {[
              { label: "Pos. 1–3", w: "90%" },
              { label: "Pos. 4–10", w: "72%", op: ".8" },
              { label: "Pos. 11–20", w: "48%", op: ".5" },
            ].map(({ label, w, op }) => (
              <div key={label} className="flex items-center gap-2 mb-1.5 last:mb-0">
                <div className="flex-1 h-1 rounded-full bg-dark/[.08]">
                  <div className="h-1 rounded-full bg-primary" style={{ width: w, opacity: op ?? "1" }} />
                </div>
                <span className="text-[11px] font-semibold text-dark/70 whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>

          {/* Bottom caption */}
          <div className="absolute bottom-8 left-10 right-6 z-10">
            <p className="font-[family-name:var(--font-heading)] text-[22px] font-bold leading-snug text-white mb-1.5"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,.3)" }}>
              Ihr Wettbewerb rangiert bereits.<br />Wann sieht man Sie?
            </p>
            <p className="text-sm text-white/65" style={{ textShadow: "0 1px 6px rgba(0,0,0,.3)" }}>
              Kostenloser SEO-Check — unverbindlich &amp; ohne Mindestlaufzeit
            </p>
          </div>
        </div>

      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 – DUAL-DIRECTION CAPABILITY STRIP                 */}
      {/* ============================================================ */}
      <section className="py-10 overflow-hidden" style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {/* Row 1 — LTR: SEO capabilities as icon pills */}
        {(() => {
          const row1 = [
            { label: "SEO Audit", icon: <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /> },
            { label: "On-Page SEO", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /> },
            { label: "Content Strategie", icon: <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" /> },
            { label: "Linkbuilding", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /> },
            { label: "Technical SEO", icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></> },
            { label: "Shop SEO", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" /> },
            { label: "Lokales SEO", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /> },
            { label: "SEO Texte", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /> },
          ];
          return (
            <div className="relative mb-4">
              <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #111111, transparent)" }} />
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #111111, transparent)" }} />
              <div className="flex" style={{ width: "max-content", animation: "marquee-ltr 28s linear infinite", willChange: "transform" }}>
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex items-center gap-4 px-3 flex-shrink-0">
                    {row1.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.10] bg-white/[0.03] flex-shrink-0 whitespace-nowrap hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default">
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          {item.icon}
                        </svg>
                        <span className="text-[13px] font-semibold text-white/65">{item.label}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Row 2 — RTL: proof stats + industry types, counter-direction */}
        {(() => {
          const row2 = [
            { label: "E-Commerce", accent: false },
            { label: "B2B Unternehmen", accent: false },
            { label: "Dienstleister", accent: false },
            { label: "Kein Mindestvertrag", accent: true },
            { label: "Lokale Betriebe", accent: false },
            { label: "Google-konform", accent: true },
            { label: "Agenturen", accent: false },
            { label: "Transparentes Reporting", accent: false },
            { label: "Messbare Ergebnisse", accent: true },
          ];
          return (
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #111111, transparent)" }} />
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #111111, transparent)" }} />
              <div className="flex" style={{ width: "max-content", animation: "marquee-rtl 38s linear infinite", willChange: "transform" }}>
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex items-center gap-3 px-3 flex-shrink-0">
                    {row2.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border flex-shrink-0 whitespace-nowrap ${
                          item.accent
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-white/[0.12] bg-white/[0.04] text-white/65"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.accent ? "bg-primary" : "bg-white/30"}`} />
                        <span className="text-[13px] font-semibold tracking-[0.01em]">{item.label}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      {/* ============================================================ */}
      {/*  SECTION 3 – WAS IST EINE SEO AGENTUR                       */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Full-width centered header */}
          <div
            className="text-center mb-16 lg:mb-20 transition-all duration-700 ease-out reveal"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
              Grundlagen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-dark leading-tight max-w-4xl mx-auto mb-6">
              Was macht eine SEO Agentur – und warum lohnt sich das für Ihr Unternehmen?
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Suchmaschinenoptimierung ist weit mehr als ein paar Meta-Tags. Eine professionelle SEO Agentur
              analysiert, plant und setzt systematisch um – damit Ihre Website dauerhaft die richtigen
              Menschen erreicht und aus Klicks echte Kunden werden.
            </p>
          </div>

          {/* Image left + expanded text right */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-start mb-16 lg:mb-20">

            {/* Left — SEO foundations interactive visual */}
            <div
              className="transition-all duration-700 ease-out reveal"
            >
              <SeoFoundationsVisual />
            </div>

            {/* Right — expanded body text */}
            <div
              className="transition-all duration-700 ease-out reveal"
              style={{ transitionDelay: "150ms" }}
            >
              <div className="space-y-5 text-muted leading-relaxed">
                <p className="text-lg text-dark font-medium">
                  Eine SEO Agentur übernimmt die komplette strategische und operative Verantwortung
                  für Ihre Sichtbarkeit in Suchmaschinen – von der ersten Analyse bis zur laufenden Optimierung.
                </p>
                <p>
                  Jedes Projekt beginnt mit einer gründlichen Bestandsaufnahme Ihrer aktuellen{" "}
                  <Link href="/seo" className="text-primary hover:underline font-medium">SEO-Situation</Link>
                  {" "}– technische Fehler, schwache Inhalte, fehlende Backlinks, schlechte Core Web Vitals.
                  Erst wenn wir genau wissen, wo die größten Verluste entstehen, entwickeln wir einen Plan.
                  Das spart Zeit und verhindert, dass Budget in Maßnahmen fließt, die nichts bringen.
                </p>
                <p>
                  Was eine professionelle{" "}
                  <Link href="/seo/beratung" className="text-primary hover:underline font-medium">SEO-Beratung</Link>
                  {" "}von einem Freelancer oder einer generalistischen Agentur unterscheidet, ist die Tiefe der Expertise.
                  Technisches SEO, Content-Strategie, Linkaufbau und lokale Sichtbarkeit greifen ineinander –
                  und nur wer alle Bereiche beherrscht, kann sie richtig priorisieren.
                </p>
                <p>
                  Dazu kommt die Kontinuität: SEO ist kein Einmalprojekt, sondern ein laufender Prozess.
                  Suchmaschinenalgorithmen ändern sich, Wettbewerber optimieren und Nutzersignale verschieben sich.
                  Wer das nicht aktiv begleitet, verliert Rankings, die er einmal mühsam aufgebaut hat.
                </p>
                <p>
                  Für Unternehmen, die ernsthaft wachsen wollen, ist eine SEO Agentur keine Ausgabe –
                  sie ist eine Investition mit messbarem ROI. Organischer Traffic kostet pro Klick keinen
                  Euro und wächst mit der Zeit weiter. Im Gegensatz zu Google Ads, das aufhört zu funktionieren,
                  sobald das Budget ausläuft.
                </p>
              </div>

            </div>
          </div>

          {/* Bottom: 3 SEO pillar cards */}
          <div
            className="grid md:grid-cols-3 gap-5 transition-all duration-700 ease-out reveal"
            style={{ transitionDelay: "300ms" }}
          >
            {[
              {
                label: "Technisches SEO",
                desc: "Die Grundlage für alles: Ladezeiten, Crawlbarkeit, Core Web Vitals, Indexierung. Ohne saubere Technik bringen auch gute Inhalte und Backlinks wenig.",
                href: "/seo/on-page",
                points: ["Core Web Vitals", "Crawl & Indexierung", "Strukturierte Daten", "Mobile Performance"],
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                ),
              },
              {
                label: "Content SEO",
                desc: "Texte, die sowohl für Google als auch für Ihre Leser funktionieren. Datenbasierte Keyword-Strategie, Themenplanung und redaktionelle Umsetzung aus einer Hand.",
                href: "/seo/content-strategie",
                points: ["Keyword-Recherche", "Themenplanung", "SEO-Texterstellung", "Suchintention"],
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                ),
              },
              {
                label: "Off-Page SEO",
                desc: "Autorität und Vertrauen in den Augen von Google. Hochwertige Backlinks von relevanten Domains stärken Ihre Domain-Autorität nachhaltig – ohne Risiko.",
                href: "/seo",
                points: ["Linkaufbau", "Digitale PR", "Zitationen", "Markenerwähnungen"],
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                ),
              },
            ].map((pillar) => (
              <Link
                key={pillar.label}
                href={pillar.href}
                className="group block rounded-2xl p-7 bg-offwhite border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    {pillar.icon}
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-dark text-lg mb-3 group-hover:text-primary transition-colors">
                  {pillar.label}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-5">{pillar.desc}</p>
                <ul className="space-y-1.5">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-xs text-muted/80">
                      <span className="w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 4 – OHNE SEO VS. MIT SEOFORGE COMPARISON           */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div
            className="text-center mb-16 transition-all duration-700 ease-out reveal"
          >
            <span className="text-xs font-semibold uppercase tracking-[.22em] text-primary mb-5 block">
              Der Unterschied
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-white leading-tight max-w-3xl mx-auto">
              Was passiert, wenn Sie SEO ignorieren?
            </h2>
            <p className="mt-4 text-white/45 text-lg max-w-xl mx-auto">
              Während Ihre Konkurrenten organisch wachsen, zahlen Sie dauerhaft für jeden Klick.
            </p>
          </div>

          {/* 2-column comparison */}
          <div
            className="grid lg:grid-cols-2 gap-4 lg:gap-6 transition-all duration-700 ease-out reveal"
            style={{ transitionDelay: "150ms" }}
          >
            {/* Left — Ohne SEO */}
            <div className="rounded-3xl p-8 lg:p-10 border border-white/[0.06]" style={{ background: "#161616" }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-sm font-semibold uppercase tracking-widest text-white/40">Ohne SEO-Strategie</span>
              </div>

              {/* Mini chart — flat/declining */}
              <div className="mb-8 rounded-xl overflow-hidden border border-white/[0.05] p-4" style={{ background: "#111" }}>
                <div className="text-xs text-white/30 mb-3 font-mono">Organischer Traffic · 12 Monate</div>
                <svg viewBox="0 0 280 80" className="w-full" fill="none">
                  <defs>
                    <linearGradient id="badFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M10 30 C 40 32, 70 28, 100 40 C 130 52, 160 48, 190 58 C 210 64, 240 60, 270 65" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.5" />
                  <path d="M10 30 C 40 32, 70 28, 100 40 C 130 52, 160 48, 190 58 C 210 64, 240 60, 270 65 L 270 80 L 10 80 Z" fill="url(#badFill)" />
                  <text x="240" y="58" fill="#ef4444" fontSize="9" opacity="0.6">↓ −23%</text>
                </svg>
              </div>

              <ul className="space-y-4">
                {[
                  { label: "Jeder Klick kostet Geld (Google Ads)", sub: "Kein organischer Traffic, der kostenlos weiterläuft" },
                  { label: "Konkurrenz überholt Sie in Google", sub: "Seite 2 wird von 95 % der Nutzer nicht mehr gesehen" },
                  { label: "Keine Messbarkeit, kein Plan", sub: "Kein klarer ROI, nur Ausgaben ohne Strategie" },
                  { label: "Technische Probleme kosten Rankings", sub: "Ladezeiten, Crawl-Fehler – unbemerkt und ungefixed" },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                      <span className="text-red-400 text-xs font-bold">×</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/70">{item.label}</p>
                      <p className="text-xs text-white/30 mt-0.5">{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Mit SeoForge */}
            <div className="rounded-3xl p-8 lg:p-10 border border-primary/20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(194,114,42,0.1) 0%, #161616 50%)" }}>
              {/* Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: "radial-gradient(circle at 80% 10%, rgba(194,114,42,0.15) 0%, transparent 60%)" }} />

              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">Mit SeoForge</span>
                </div>

                {/* Mini chart — rising */}
                <div className="mb-8 rounded-xl overflow-hidden border border-primary/10 p-4" style={{ background: "#111" }}>
                  <div className="text-xs text-white/30 mb-3 font-mono">Organischer Traffic · 12 Monate</div>
                  <svg viewBox="0 0 280 80" className="w-full" fill="none">
                    <defs>
                      <linearGradient id="goodFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C2722A" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#C2722A" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M10 65 C 40 62, 70 55, 100 45 C 130 35, 160 25, 190 18 C 210 13, 240 10, 270 8" stroke="#C2722A" strokeWidth="2" />
                    <path d="M10 65 C 40 62, 70 55, 100 45 C 130 35, 160 25, 190 18 C 210 13, 240 10, 270 8 L 270 80 L 10 80 Z" fill="url(#goodFill)" />
                  </svg>
                </div>

                <ul className="space-y-4">
                  {[
                    { label: "Organischer Traffic wächst dauerhaft", sub: "Einmal aufgebaut, kostet jeder Klick nichts mehr" },
                    { label: "Seite 1 für Ihre wichtigsten Keywords", sub: "Ø 3× mehr Keywords in Top 10 nach 4 Monaten" },
                    { label: "Monatliches Reporting ohne Fachjargon", sub: "Sie sehen genau, was sich bewegt und warum" },
                    { label: "Kein Mindestvertrag – volle Flexibilität", sub: "Wir liefern Ergebnisse, nicht Vertragsbindung" },
                  ].map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/90">{item.label}</p>
                        <p className="text-xs text-white/40 mt-0.5">{item.sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/25"
                >
                  Kostenloses Erstgespräch
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 5 – LEISTUNGEN (light bento grid)                   */}
      {/* ============================================================ */}
      <section id="leistungen" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Section header */}
          <div
            className="mb-14 transition-all duration-700 reveal"
          >
            <span className="text-xs font-semibold uppercase tracking-[.22em] text-primary mb-5 block">
              SEO Services
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="font-[family-name:var(--font-heading)] text-dark leading-tight max-w-xl">
                Unsere SEO-Leistungen im Überblick
              </h2>
              <p className="text-muted text-base max-w-sm leading-relaxed">
                SeoForge bietet das komplette Spektrum der Suchmaschinenoptimierung – von der ersten Analyse bis zur laufenden Betreuung.
              </p>
            </div>
            <div className="mt-8 h-px bg-gradient-to-r from-primary/25 via-primary/8 to-transparent" />

            {/* UX/UI SEO callout */}
            <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-primary/[0.04] border border-primary/15">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-dark mb-1">UX/UI ist ein direkter SEO-Rankingfaktor</p>
                <p className="text-xs text-muted leading-relaxed">
                  Core Web Vitals, Ladezeit und mobile Usability bewertet Google direkt. Schlechtes Design kostet Rankings — gutes Design bringt sie.
                </p>
              </div>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Hub card — spans 2 columns */}
            <Link
              href="/seo"
              className="group relative lg:col-span-2 rounded-3xl p-8 lg:p-10 overflow-hidden border border-primary/20 transition-all duration-500 hover:border-primary/40 hover:shadow-xl reveal"
              style={{
                background: "linear-gradient(135deg, rgba(194,114,42,0.07) 0%, #ffffff 55%, #F8F7F5 100%)",
                transitionDelay: "120ms",
              }}
            >
              {/* Radial glow */}
              <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none rounded-3xl overflow-hidden">
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 20%, rgba(194,114,42,0.12) 0%, transparent 65%)" }} />
              </div>
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(rgba(26,26,26,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }} />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-primary/25 bg-primary/10">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>

                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">SEO Leistungen Hub</p>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-semibold text-dark mb-4 leading-snug">
                  Das vollständige SEO-Ökosystem{" "}
                  <br className="hidden lg:block" />
                  auf einen Blick.
                </h3>
                <p className="text-muted text-sm leading-relaxed max-w-lg mb-8">
                  Suchmaschinenoptimierung ist mehr als ein einzelnes Service – es ist ein System. Entdecken Sie,
                  wie Audit, Strategie, On-Page, Content und Monitoring ineinandergreifen, um Ihre Sichtbarkeit
                  in Google systematisch und dauerhaft aufzubauen.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["6 integrierte Services", "Ganzheitlicher Ansatz", "Messbare Ergebnisse"].map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-offwhite px-3 py-1 text-xs text-muted">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                  Alle SEO Services erkunden
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Service cards */}
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group relative rounded-3xl p-7 bg-offwhite border border-border overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-md hover:bg-white reveal"
                style={{
                  transitionDelay: `${service.delay}ms`,
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{ background: "radial-gradient(circle at 30% 30%, rgba(194,114,42,0.05) 0%, transparent 60%)" }} />

                <div className="relative">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 border border-primary/15 bg-primary/[0.08] group-hover:border-primary/30 group-hover:bg-primary/12 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-dark mb-2 group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary/60 group-hover:text-primary group-hover:gap-2.5 transition-all duration-200">
                    Mehr erfahren
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION UX/UI — Animated showcase                          */}
      {/* ============================================================ */}
      <UXUISeoSection />

      {/* ============================================================ */}
      {/*  SECTION 6 – WARUM SEOFORGE (Horizontal Milestone Timeline) */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 overflow-hidden" style={{ background: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div
            className="mb-20 transition-all duration-700 ease-out reveal"
          >
            <span className="text-xs font-semibold uppercase tracking-[.22em] text-primary mb-5 block">
              Unser Versprechen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-white leading-tight max-w-2xl mb-4">
              Warum Unternehmen mit SeoForge zusammenarbeiten
            </h2>
            <p className="text-white/40 text-lg max-w-md leading-relaxed">
              Vier Versprechen, die wir nicht nur machen — sondern täglich einhalten.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Horizontal track line — sits at node center (12px = half of 24px node) */}
            <div
              className="absolute left-0 right-0 h-px pointer-events-none hidden lg:block"
              style={{ top: "12px", background: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, #C2722A 0%, #D4A853 55%, rgba(212,168,83,0.2) 100%)" }}
              />
            </div>

            {/* Milestones */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 transition-all duration-700 ease-out reveal"
              style={{ transitionDelay: "150ms" }}
            >
              {[
                {
                  num: "01",
                  title: "Nachhaltige Ergebnisse",
                  desc: "Keine Tricks, die beim nächsten Update crashen. 100% White-Hat, Google-konform, dauerhaft stabil.",
                  stat: "",
                  statLabel: "",
                  nodeBg: "#C2722A",
                  nodeBorder: "3px solid #0d0d0d",
                  nodeOpacity: 1,
                },
                {
                  num: "02",
                  title: "Transparentes Reporting",
                  desc: "Monatliche Reports ohne Fachjargon. Sie sehen genau, was sich bewegt und warum — und können immer direkt fragen.",
                  stat: "",
                  statLabel: "",
                  nodeBg: "#C2722A",
                  nodeBorder: "3px solid #0d0d0d",
                  nodeOpacity: 1,
                },
                {
                  num: "03",
                  title: "Ganzheitlicher Ansatz",
                  desc: "SEO, GEO und Webdesign aus einer Hand. Kein Koordinationsaufwand, keine Reibungsverluste zwischen Dienstleistern.",
                  stat: "3 in 1",
                  statLabel: "SEO · GEO · Webdesign",
                  nodeBg: "#C2722A",
                  nodeBorder: "3px solid #0d0d0d",
                  nodeOpacity: 0.65,
                },
                {
                  num: "04",
                  title: "Kein langer Vertrag",
                  desc: "Monatlich kündbar. Wer bleibt, bleibt weil er Ergebnisse sieht. Wir müssen uns jeden Monat neu beweisen.",
                  stat: "0 Monate",
                  statLabel: "Mindestlaufzeit",
                  nodeBg: "rgba(194,114,42,0.35)",
                  nodeBorder: "2px dashed rgba(194,114,42,0.5)",
                  nodeOpacity: 1,
                },
              ].map((m, i) => (
                <div key={m.num} className="group relative flex flex-col lg:pr-10 last:pr-0 cursor-default">
                  {/* Chevron connector between nodes — desktop only */}
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-0.5 right-2 text-white/20 text-lg leading-none select-none z-10">
                      ›
                    </div>
                  )}

                  {/* Node */}
                  <div
                    className="w-6 h-6 rounded-full mb-8 relative z-10 flex-shrink-0 transition-all duration-300 group-hover:scale-[1.4]"
                    style={{
                      background: m.nodeBg,
                      border: m.nodeBorder,
                      opacity: m.nodeOpacity,
                      boxShadow: "0 0 0 6px rgba(194,114,42,0.12)",
                    }}
                  />

                  {/* Milestone label */}
                  <span className="text-[10px] font-bold tracking-[.2em] uppercase text-primary mb-3 block">
                    Versprechen {m.num}
                  </span>

                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-heading)] text-white text-xl leading-snug mb-4 transition-colors duration-200 group-hover:text-primary">
                    {m.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/40 leading-relaxed">
                    {m.desc}
                  </p>

                  {/* Stat card — hidden, floats up on hover */}
                  <div
                    className="mt-7 p-5 rounded-2xl border border-white/[0.05] opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:border-primary/20"
                    style={{ background: "#1a1a1a" }}
                  >
                    <div className="font-[family-name:var(--font-heading)] text-primary text-2xl font-bold mb-1 leading-none">
                      {m.stat}
                    </div>
                    <div className="text-[10px] text-white/30 uppercase tracking-[.12em] mt-1.5">
                      {m.statLabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 8 – FAQ                                              */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-offwhite">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div
            className="text-center mb-16 transition-all duration-700 reveal"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
              FAQ
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-dark leading-tight">
              Häufige Fragen zur Zusammenarbeit mit einer SEO Agentur
            </h2>
          </div>

          {/* Accordion */}
          <div
            className="space-y-0 transition-all duration-700 reveal"
            style={{ transitionDelay: "150ms" }}
          >
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border last:border-b-0">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left group"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-dark font-semibold leading-snug group-hover:text-primary transition-colors pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted group-hover:border-primary/40 group-hover:text-primary transition-all duration-300 ${openFaq === i ? "bg-primary border-primary text-white rotate-45" : ""}`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: openFaq === i ? "600px" : "0px" }}
                >
                  <p className="text-muted leading-relaxed pb-6 pr-12">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 9 – CTA (orange bg)                                  */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-primary relative overflow-hidden">
        {/* Decorative watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-[family-name:var(--font-heading)] font-bold text-white"
            style={{
              fontSize: "clamp(80px, 15vw, 200px)",
              opacity: 0.05,
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap",
            }}
          >
            SeoForge
          </span>
        </div>

        {/* Subtle radial overlays */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)" }} />

        <div
          className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center transition-all duration-700 ease-out reveal"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-white/60 mb-6">
            Jetzt starten
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-white mb-6 leading-tight">
            Bereit für nachhaltige Rankings?
          </h2>
          <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">
            Lassen Sie uns gemeinsam Ihre SEO-Strategie entwickeln. Messbare Ergebnisse, keine Versprechen ohne Grundlage.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-dark rounded-full font-semibold hover:bg-offwhite transition-all hover:shadow-xl"
            >
              Kostenloses Erstgespräch buchen
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/seo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-semibold hover:bg-white/30 transition-all"
            >
              Alle SEO-Leistungen
            </Link>
          </div>
        </div>
      </section>

    </SubpageLayout>
  );
}
