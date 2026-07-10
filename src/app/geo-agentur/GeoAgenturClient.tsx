"use client";

import SubpageLayout from "../components/SubpageLayout";
import Link from "next/link";
import Image from "next/image";
import ServicePillars from "./ServicePillars";
import PlatformsGrid from "./PlatformsGrid";
import GeoComparison from "./GeoComparison";
import GeoMetrics from "./GeoMetrics";
import GeoFAQ from "./GeoFAQ";

export default function GeoAgenturClient() {

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Was ist GEO genau und wie funktioniert es?", acceptedAnswer: { "@type": "Answer", text: "GEO (Generative Engine Optimization) optimiert Ihre digitale Präsenz für KI-Systeme wie ChatGPT, Gemini und Perplexity. Im Gegensatz zu SEO, das auf Rankings in Suchmaschinen abzielt, positioniert GEO Ihre Marke direkt in den von KI generierten Antworten. Das bedeutet: Wenn Nutzer Fragen stellen, wird Ihre Marke als Quelle genannt, empfohlen oder zitiert." } },
      { "@type": "Question", name: "Was ist der Unterschied zwischen GEO und traditionellem SEO?", acceptedAnswer: { "@type": "Answer", text: "Während SEO auf Platzierungen in den Suchergebnissen (Position 1-10) abzielt, optimiert GEO für Erwähnungen in KI-Antworten. SEO fokussiert auf Keywords, Backlinks und technische Faktoren. GEO konzentriert sich auf Brand Mentions, Citation Building, Entity Optimization und Authority Signals. Beide ergänzen sich ideal - GEO ist die natürliche Evolution für die KI-Ära." } },
      { "@type": "Question", name: "Warum wird GEO für Unternehmen immer wichtiger?", acceptedAnswer: { "@type": "Answer", text: "Laut Gartner werden bis 2026 traditionelle Suchanfragen um 25% zurückgehen, während KI-gestützte Suche exponentiell wächst. McKinsey prognostiziert, dass bis 2028 die Hälfte aller Suchanfragen über KI-Systeme laufen wird. Wer jetzt nicht optimiert, verliert Sichtbarkeit dort, wo die Nutzer künftig Antworten suchen - nicht in Google, sondern in ChatGPT, Gemini und Perplexity." } },
      { "@type": "Question", name: "Auf welchen KI-Plattformen kann GEO helfen?", acceptedAnswer: { "@type": "Answer", text: "GEO optimiert für alle relevanten KI-Systeme: ChatGPT (mit 200M+ Nutzern), Google Gemini (integriert in Search und Workspace), Perplexity (KI-Suchmaschine mit Quellenangaben), Microsoft Copilot (in Bing und Office), Claude (Anthropic) und Googles AI Overviews (generative Antworten direkt in der Suche). Je nach Zielgruppe priorisieren wir die Plattformen strategisch." } },
      { "@type": "Question", name: "Welche Strategien werden in GEO eingesetzt?", acceptedAnswer: { "@type": "Answer", text: "GEO kombiniert mehrere Disziplinen: Entity Optimization (Ihre Marke als erkennbare Entität etablieren), Citation Building (Vertrauenswürdige Quellen-Positionierung), strukturierte Daten (Schema.org für KI-Verständnis), Content-Architektur (answer-first Struktur), PR & Authority (Markenbekanntheit aufbauen) und technische Optimierung (llms.txt, Crawlbarkeit für KI)." } },
      { "@type": "Question", name: "Wie lange dauert es, bis man GEO-Ergebnisse sieht?", acceptedAnswer: { "@type": "Answer", text: "Erste messbare Verbesserungen sind typischerweise nach 4-8 Wochen sichtbar - das sind Erwähnungen in KI-Antworten, verbesserte Zitationsraten oder höhere Brand Mention Frequency. Vollständige KI-Sichtbarkeit entwickelt sich über 3-6 Monate. GEO ist wie SEO ein kontinuierlicher Prozess, kein einmaliges Projekt." } },
      { "@type": "Question", name: "Wie misst man den Erfolg von GEO?", acceptedAnswer: { "@type": "Answer", text: "GEO-Erfolg wird anders gemessen als SEO: Anzahl der Erwähnungen in KI-Antworten, Citation Rate (wie oft als Quelle genannt), Brand Mention Frequency, Sentiment der Erwähnungen (positiv/neutral/negativ), Positionierung gegenüber Wettbewerbern, und Traffic aus KI-Quellen." } },
      { "@type": "Question", name: "Ist GEO nur für große Unternehmen sinnvoll?", acceptedAnswer: { "@type": "Answer", text: "Nein - GEO lohnt sich für Unternehmen aller Größen. KI-Systeme bewerten Inhalte unabhängig von Unternehmensgröße nach Relevanz, Qualität und Authority. Gerade KMUs können von einer frühen GEO-Strategie besonders profitieren und sich Wettbewerbsvorteile sichern, bevor Großkonzerne nachziehen." } },
      { "@type": "Question", name: "Wie läuft die Zusammenarbeit mit einer GEO Agentur ab?", acceptedAnswer: { "@type": "Answer", text: "Typischer Ablauf: 1) KI-Sichtbarkeits-Audit - Analyse Ihrer aktuellen Präsenz in KI-Systemen, 2) Strategie-Entwicklung - maßgeschneiderte GEO-Strategie mit klaren Zielen, 3) Umsetzung - Content-Optimierung, technische Implementierung, Entity Building, 4) Monitoring & Reporting - kontinuierliches Tracking Ihrer KI-Sichtbarkeit." } },
      { "@type": "Question", name: "Welche Kosten entstehen bei GEO?", acceptedAnswer: { "@type": "Answer", text: "GEO-Investitionen variieren je nach Ausgangssituation und Zielen. Ein initiales GEO-Audit ist der ideale Startpunkt, um Potenziale zu identifizieren. Laufende GEO-Betreuung umfasst Content-Optimierung, technische Umsetzung und Monitoring. Wir bieten flexible Modelle - von projektbasierten Audits bis zu kontinuierlicher Betreuung." } },
    ],
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* ============================================================ */}
      {/*  HERO — Swiss-Editorial: Papier, harte Rules, KI-Antwort-Blatt */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-offwhite">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 pt-14 lg:pt-20 pb-16 lg:pb-24">
          {/* Folio-Zeile — Swiss-Kopf */}
          <div className="animate-fade-up flex items-center justify-between border-b-2 border-dark pb-4">
            <span className="flex items-center gap-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-dark/60">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              GEO Agentur
            </span>
            <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.18em] text-dark/35">
              Generative Engine Optimization — SeoForge
            </span>
          </div>

          <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">
            {/* Links — Editorial-Typo */}
            <div className="animate-fade-up">
              <h1 className="font-[family-name:var(--font-heading)] text-[40px] sm:text-6xl lg:text-[68px] font-bold text-dark leading-[1.04] tracking-tight">
                Wenn die KI antwortet,{" "}
                <span
                  style={{
                    background: "linear-gradient(92deg, #C2722A, #D4A853)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ist Ihre Marke die Antwort.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg lg:text-xl text-muted leading-relaxed">
                Als GEO Agentur bringen wir Ihre Marke in die Antworten von ChatGPT, Perplexity und
                Gemini — mit derselben Sorgfalt, mit der klassisches SEO Rankings aufbaut.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
                >
                  GEO-Audit anfragen
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
                  </svg>
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-dark px-8 py-[14px] font-semibold text-dark transition-colors hover:bg-dark hover:text-white"
                >
                  Leistungen ansehen
                </Link>
              </div>

              {/* Fakten-Zeile — echte Zusagen statt Zahlen-Deko */}
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
                {["Kostenlose Erstanalyse", "Antwort in unter 24 h", "Monatlich kündbar"].map((f) => (
                  <span key={f} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-dark/55">
                    <span className="h-[2px] w-4 bg-primary/70" aria-hidden="true" />
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Rechts — KI-Antwort-Blatt: harte Ink-Kante, echte Plattform-Logos */}
            <div className="animate-scale-in">
              <div className="overflow-hidden rounded-2xl border-2 border-dark bg-white shadow-[0_32px_70px_-30px_rgba(26,26,26,0.45)]">
                {/* Kopfleiste */}
                <div className="flex items-center justify-between border-b-2 border-dark bg-offwhite px-5 py-3">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-dark/60">
                    KI-Antwort · beispielhaft
                  </span>
                  <span className="flex items-center gap-2.5">
                    {[
                      { n: "ChatGPT", l: "/logos/openai.svg" },
                      { n: "Perplexity", l: "/logos/perplexity.svg" },
                      { n: "Gemini", l: "/logos/gemini.svg" },
                      { n: "Claude", l: "/logos/claude.svg" },
                    ].map((p) => (
                      <Image
                        key={p.n}
                        src={p.l}
                        alt={`${p.n} Logo`}
                        width={15}
                        height={15}
                        className="h-[15px] w-[15px] object-contain opacity-70"
                      />
                    ))}
                  </span>
                </div>
                {/* Frage */}
                <div className="px-5 pt-5">
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-dark px-4 py-3">
                    <p className="text-[14px] leading-relaxed text-white/90">
                      Welche Anbieter sind für kaufmännische Software im Mittelstand empfehlenswert?
                    </p>
                  </div>
                </div>
                {/* Antwort mit Marken-Nennung */}
                <div className="px-5 py-5">
                  <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-border bg-offwhite px-4 py-4">
                    <span className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-dark/40">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                      Antwort wird zusammengesetzt
                    </span>
                    <span className="block h-2 w-full rounded-full bg-dark/[0.07]" aria-hidden="true" />
                    <span className="mt-2 block h-2 w-4/5 rounded-full bg-dark/[0.07]" aria-hidden="true" />
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ background: "#fbf4ea", borderColor: "#ecd3ba" }}>
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                      <span className="font-mono text-[11px] font-semibold text-primary">ihre-marke.de</span>
                      <span className="text-[10px] text-dark/45">wird als Quelle genannt</span>
                    </span>
                    <span className="mt-3 block h-2 w-3/5 rounded-full bg-dark/[0.07]" aria-hidden="true" />
                  </div>
                </div>
                {/* Fuß */}
                <div className="flex items-center justify-between border-t border-border bg-offwhite px-5 py-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dark/40">Quellen: 3 — darunter Ihre</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dark/30">Schematische Darstellung</span>
                </div>
              </div>
            </div>
          </div>
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
                    GEO ist kein Bauchgefühl, sondern datengetriebene Arbeit.
                    Wir prüfen täglich mit den führenden Sprachmodellen, wie Ihre Marke in KI-Antworten erscheint.
                    Mit modernen Entwicklungstools setzen wir um, was messbar wirkt.
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
            <div className="reveal lg:sticky lg:top-32">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
                Grundlagen
              </span>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-heading)] text-dark leading-tight mb-6">
                Was ist GEO?
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p className="text-lg">
                  <Link href="/was-ist-geo" className="font-bold text-dark hover:text-primary transition-colors">Generative Engine Optimization (GEO)</Link> ist die nächste Stufe der digitalen Sichtbarkeit. Eine klassische <Link href="/seo" className="text-primary hover:underline">SEO Agentur</Link> optimiert auf Google-Rankings. Eine GEO Agentur positioniert Ihre Marke direkt in den Antworten von ChatGPT, Gemini und Perplexity.
                </p>
                <p>
                  Konkret heißt das: Stellen Nutzer einer KI eine Frage, soll Ihre Marke als Quelle genannt, zitiert oder empfohlen werden. Nicht auf Platz 1 der Suchergebnisse — sondern in der Antwort selbst.
                </p>
                <p>
                  Wir bei Seoforge verbinden klassische SEO-Expertise mit aktueller GEO-Strategie. Denn es heißt nicht SEO gegen GEO: Beide Disziplinen ergänzen sich, gerade am Beginn der KI-Ära. Alle unsere{" "}
                  <Link href="/geo" className="text-primary hover:underline font-semibold">GEO Leistungen</Link>{" "}
                  sind systematisch aufgebaut — vom ersten Audit bis zum laufenden Monitoring.
                </p>
              </div>
            </div>

            {/* Right - GEO Diagram */}
            <div className="reveal lg:pt-28 xl:pt-32" style={{ transitionDelay: '150ms' }}>
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
      {/*  WIE ARBEITET EINE GEO AGENTUR — Folio + Prosa + Fakten      */}
      {/* ============================================================ */}
      <section className="relative border-t-2 border-dark bg-offwhite py-24 lg:py-32 overflow-hidden">
        {/* Ghost-Wasserzeichen */}
        <span
          className="pointer-events-none select-none absolute -right-[3%] top-[4%] z-0 whitespace-nowrap font-[family-name:var(--font-heading)] font-bold uppercase leading-none tracking-tight text-transparent text-[clamp(90px,13vw,200px)]"
          style={{ WebkitTextStroke: "1.5px rgba(194,114,42,0.14)" }}
          aria-hidden="true"
        >
          Antworten
        </span>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[minmax(0,340px)_1fr] gap-12 lg:gap-16 items-start">
          {/* Sticky Folio-Marginalie */}
          <div className="reveal lg:sticky lg:top-28">
            <span className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-[2px] w-7 bg-dark" aria-hidden="true" />
              § 01 — Arbeitsweise
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
              Wie arbeitet eine<br />GEO Agentur?
            </h2>
            <p className="mt-4 hidden font-mono text-[10.5px] uppercase tracking-[0.14em] leading-[2.2] text-dark/35 lg:block">
              Dossier · Seoforge<br />Stand: laufend gepflegt
            </p>
          </div>

          {/* Prosa + Fakten-Tafel */}
          <div>
            <div className="space-y-6 max-w-[700px]">
              <p className="reveal text-[15px] lg:text-base text-muted leading-[1.8]">
                Am Anfang steht das Audit. Wir stellen KI-Systemen die Fragen, die Ihre Kunden stellen — und dokumentieren, welche Marken in den Antworten auftauchen. So sehen Sie schwarz auf weiß, wo Sie heute stehen. Und wo Ihre Wettbewerber bereits zitiert werden.
              </p>
              <p className="reveal text-[15px] lg:text-base text-muted leading-[1.8]" style={{ transitionDelay: "80ms" }}>
                Danach folgt die Strategie. Eine gute GEO Agentur priorisiert Plattformen nach Ihrer Zielgruppe: ChatGPT, Gemini, Perplexity oder Claude. Für jede Plattform legen wir fest, welche Inhalte und Quellen-Signale nötig sind.
              </p>
              <p className="reveal text-[15px] lg:text-base text-muted leading-[1.8]" style={{ transitionDelay: "160ms" }}>
                In der Umsetzung arbeiten wir an drei Hebeln: strukturierte Daten für maschinelles Verständnis, Content mit Answer-First-Struktur und Autoritäts-Signale wie Zitate und Erwähnungen. Das Fundament bleibt technisch sauberes SEO — hier greift die Arbeit{" "}
                <Link href="/seo-agentur" className="border-b-2 border-primary font-semibold text-dark transition-colors hover:bg-[#fbf4ea] hover:text-primary">
                  unserer SEO Agentur
                </Link>{" "}
                direkt ineinander.
              </p>
              <p className="reveal text-[15px] lg:text-base text-muted leading-[1.8]" style={{ transitionDelay: "240ms" }}>
                Zum Schluss wird gemessen. Wir tracken Monat für Monat, wie oft KI-Systeme Ihre Marke nennen, zitieren und empfehlen. So bleibt GEO kein Versprechen, sondern ein dokumentierter Prozess.
              </p>
            </div>

            {/* Fakten-Tafel mit Ink-Kopf und Ghost-Ziffern */}
            <div className="reveal mt-12 overflow-hidden rounded-2xl border-2 border-dark bg-white shadow-[0_24px_60px_-28px_rgba(26,26,26,0.35)]">
              <div className="flex items-center justify-between bg-dark px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                <span>Rahmendaten</span>
                <span className="text-secondary">GEO / 2026</span>
              </div>
              <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
                {[
                  { z: "01", k: "Erste Signale", v: "4–8 Wochen" },
                  { z: "02", k: "Volle KI-Sichtbarkeit", v: "3–6 Monate" },
                  { z: "03", k: "Reporting", v: "monatlich" },
                ].map((c, i) => (
                  <div key={c.z} className="reveal relative overflow-hidden p-7" style={{ transitionDelay: `${i * 100}ms` }}>
                    <span className="pointer-events-none absolute -bottom-5 -right-2 font-[family-name:var(--font-heading)] text-[96px] font-bold leading-none text-primary/[0.09]" aria-hidden="true">{c.z}</span>
                    <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-dark/45">{c.k}</span>
                    <span className="mt-2 block font-[family-name:var(--font-heading)] text-2xl lg:text-[28px] font-bold text-dark">{c.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plattform-Beleg: KI-Systeme im Monitoring */}
            <div className="mt-12 border-t-2 border-dark pt-8">
              <span className="mb-5 block font-mono text-[11px] uppercase tracking-[0.2em] text-dark/40">
                Plattformen, die wir prüfen
              </span>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {[
                  { src: "/logos/openai.svg", name: "ChatGPT" },
                  { src: "/logos/gemini.svg", name: "Gemini" },
                  { src: "/logos/perplexity.svg", name: "Perplexity" },
                  { src: "/logos/claude.svg", name: "Claude" },
                ].map((t) => (
                  <span key={t.name} className="group inline-flex items-center gap-2.5">
                    <Image
                      src={t.src}
                      alt={`${t.name} Logo`}
                      width={22}
                      height={22}
                      className="h-[22px] w-auto grayscale opacity-70 transition-all duration-200 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-dark/50 transition-colors group-hover:text-dark">{t.name}</span>
                  </span>
                ))}
              </div>
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
      {/*  TERRACOTTA-BAND — Mid-Page CTA                              */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-20 overflow-x-clip" style={{ background: "#C2722A" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="reveal">
            <span className="block font-mono text-[11px] tracking-[0.22em] uppercase text-white/70 mb-3">
              Nächster Schritt
            </span>
            <p className="font-[family-name:var(--font-heading)] text-2xl lg:text-4xl font-bold leading-[1.1] text-white">
              Ihre GEO Agentur startet mit Daten: Das Audit zeigt, wo Ihre Marke in KI-Antworten steht.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="reveal inline-flex items-center gap-3 rounded-full bg-dark px-8 py-4 font-semibold text-white transition-colors hover:bg-[#2a2a2a] shadow-[0_18px_40px_-14px_rgba(26,26,26,0.55)]"
            style={{ transitionDelay: "120ms" }}
          >
            GEO-Audit anfragen <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROCESS SECTION with staggered slide animations             */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-offwhite overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header with slide animation */}
          <div className="reveal text-center mb-16">
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
                href: "/geo/audit",
                linkLabel: "Zum GEO Audit →",
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
                href: "/geo/content-strategie",
                linkLabel: "GEO Content Strategie →",
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
                href: "/geo/optimierung",
                linkLabel: "GEO Optimierung →",
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
                href: "/geo/monitoring",
                linkLabel: "GEO Monitoring →",
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                )
              }
            ].map((item, index) => (
              <div
                key={item.step}
                className="reveal group bg-white rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
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
                <p className="text-muted text-sm leading-relaxed mb-3">
                  {item.description}
                </p>
                <Link href={item.href} className="text-xs font-semibold text-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.linkLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SERIÖSE GEO-ARBEIT ERKENNEN — Vergleichspanels              */}
      {/* ============================================================ */}
      <section className="border-t-2 border-dark bg-white py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal max-w-3xl mb-14">
            <span className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-[2px] w-7 bg-dark" aria-hidden="true" />
              § 02 — Auswahl
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
              Woran erkennen Sie eine seriöse GEO Agentur?
            </h2>
            <p className="mt-5 text-muted leading-[1.8]">
              Der Markt für GEO-Agenturen ist jung, die Qualität schwankt stark. Zwei Fragen trennen seriöse Arbeit von leeren Versprechen: Wird gemessen statt behauptet? Und wird GEO als Ergänzung zu SEO verstanden — oder als Ersatz verkauft? Warum beides zusammengehört, lesen Sie im Ratgeber{" "}
              <Link href="/wissen/ratgeber/geo-vs-seo" className="border-b-2 border-primary font-semibold text-dark transition-colors hover:bg-[#fbf4ea] hover:text-primary">
                GEO vs. SEO
              </Link>
              .
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Panel: Seriöse Arbeit */}
            <div className="reveal rounded-2xl border-2 border-dark bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.35)]">
              <div className="flex items-center justify-between bg-dark px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                <span>Seriöse GEO-Arbeit</span>
                <span className="text-secondary">Daran erkennbar</span>
              </div>
              <div className="p-7 space-y-6">
                {[
                  { t: "Audit vor Versprechen", d: "Die Zusammenarbeit beginnt mit einer messbaren Bestandsaufnahme Ihrer KI-Sichtbarkeit — nicht mit Garantien." },
                  { t: "Nachvollziehbare Messung", d: "Zitationsrate, Erwähnungen und Sentiment werden dokumentiert und monatlich berichtet." },
                  { t: "SEO-Fundament inklusive", d: "GEO baut auf technisch sauberen, crawlbaren Seiten auf. Beides wird zusammen gedacht, nicht getrennt verkauft." },
                  { t: "Laufender Prozess", d: "KI-Modelle ändern sich ständig. Optimierung und Monitoring laufen deshalb kontinuierlich weiter." },
                ].map((r) => (
                  <div key={r.t}>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark leading-snug">{r.t}</h3>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">{r.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel: Warnsignale */}
            <div className="reveal rounded-2xl border overflow-hidden" style={{ background: "#fbf4ea", borderColor: "#ecd3ba", transitionDelay: "120ms" }}>
              <div className="flex items-center justify-between px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-dark/60" style={{ borderBottom: "1px solid #ecd3ba" }}>
                <span>Warnsignale</span>
                <span className="text-primary">Besser prüfen</span>
              </div>
              <div className="p-7 space-y-6">
                {[
                  { t: "„Platz 1 in ChatGPT — garantiert“", d: "Niemand kontrolliert, welche Quellen ein KI-Modell zitiert. Wer Garantien verspricht, arbeitet unseriös." },
                  { t: "GEO als SEO-Ersatz", d: "Wer Ihnen rät, SEO aufzugeben, ignoriert, woher KI-Systeme ihre Antworten beziehen: aus gut rankenden Quellen." },
                  { t: "Keine Messmethode", d: "Ohne definierte Metriken bleibt „KI-Sichtbarkeit“ eine Behauptung, die Sie nie überprüfen können." },
                  { t: "Einmal-Optimierung", d: "Ein einmaliges Setup veraltet mit dem nächsten Modell-Update. GEO ist ein Prozess, kein Projekt." },
                ].map((r) => (
                  <div key={r.t}>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark leading-snug">{r.t}</h3>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">{r.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  UNSERE GEO LEISTUNGEN — Bento Grid                          */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Section header */}
          <div className="reveal mb-14">
            <span className="text-xs font-semibold uppercase tracking-[.22em] text-primary mb-5 block">
              GEO Services
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-white leading-tight max-w-xl">
                Unsere GEO Leistungen
              </h2>
              <p className="text-white/40 text-base max-w-sm leading-relaxed">
                Von der ersten Analyse bis zum kontinuierlichen Monitoring — alles aus einer Hand.
              </p>
            </div>
            <div className="mt-8 h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Featured Hub card — spans 2 columns */}
            <Link
              href="/geo"
              className="reveal group relative lg:col-span-2 rounded-3xl p-8 lg:p-10 overflow-hidden border border-primary/20 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(194,114,42,0.14) 0%, rgba(26,26,26,0.9) 55%, #1A1A1A 100%)",
                transitionDelay: "120ms",
              }}
            >
              {/* Radial glow */}
              <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none rounded-3xl overflow-hidden">
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 20%, rgba(194,114,42,0.22) 0%, transparent 65%)" }} />
              </div>

              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-primary/30 bg-primary/15">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>

                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">GEO Leistungen Hub</p>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-semibold text-white mb-4 leading-snug">
                  Das vollständige GEO-Ökosystem —<br className="hidden lg:block" /> auf einen Blick.
                </h3>
                <p className="text-white/45 text-sm leading-relaxed max-w-lg mb-8">
                  Generative Engine Optimization ist mehr als ein einzelner Service — es ist ein System. Audit, Strategie, Optimierung, Content und Monitoring greifen ineinander. So entsteht dauerhafte Sichtbarkeit in KI-Systemen.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["6 integrierte Services", "Ganzheitlicher Ansatz", "Messbare Ergebnisse"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                  Alle GEO Services erkunden
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Standard service cards */}
            {[
              {
                href: "/geo/audit",
                title: "GEO Audit",
                desc: "Systematische Analyse Ihrer KI-Sichtbarkeit — über ChatGPT, Gemini, Perplexity und alle relevanten Plattformen.",
                icon: (
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                ),
                delay: 200,
              },
              {
                href: "/geo/beratung",
                title: "GEO Beratung",
                desc: "Individuelle Strategie und persönliche Begleitung auf dem Weg zur KI-Sichtbarkeit.",
                icon: (
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                ),
                delay: 280,
              },
              {
                href: "/geo/optimierung",
                title: "GEO Optimierung",
                desc: "Technische und inhaltliche Optimierung — damit KI-Systeme Ihre Inhalte verstehen, zitieren und empfehlen.",
                icon: (
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ),
                delay: 360,
              },
              {
                href: "/geo/content-strategie",
                title: "GEO Content Strategie",
                desc: "Content, das KI-Systeme aktiv zitieren — strukturiert, autoritativ, für maschinelles Lesen optimiert.",
                icon: (
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                ),
                delay: 440,
              },
              {
                href: "/geo/monitoring",
                title: "GEO Monitoring",
                desc: "Kontinuierliches Tracking Ihrer KI-Sichtbarkeit — mit klaren Metriken und monatlichem Reporting.",
                icon: (
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                ),
                delay: 520,
              },
            ].map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="reveal group relative rounded-3xl p-7 border border-white/[0.07] overflow-hidden transition-all duration-500 hover:border-primary/25 hover:shadow-xl"
                style={{
                  background: "#161616",
                  transitionDelay: `${service.delay}ms`,
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{ background: "radial-gradient(circle at 30% 30%, rgba(194,114,42,0.08) 0%, transparent 60%)" }} />

                <div className="relative">
                  {/* Icon container */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 border border-white/10 bg-white/[0.04] group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
                    {service.icon}
                  </div>

                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/35 leading-relaxed mb-6">
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

        <div className="reveal relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-heading)] mb-6">
            Bereit für{" "}
            <span className="text-primary">KI-Sichtbarkeit?</span>
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Als GEO Agentur entwickeln wir mit Ihnen eine Strategie, die messbar wirkt.
            Sichtbar in ChatGPT, Gemini, Perplexity &amp; Co.
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
              href="/geo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              Alle GEO Leistungen
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
