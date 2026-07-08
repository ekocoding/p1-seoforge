"use client";

import { useState } from "react";
import Link from "next/link";
import SubpageLayout from "@/app/components/SubpageLayout";
import EditorMockup from "./EditorMockup";
import FaqAccordion from "@/app/components/FaqAccordion";

/* ------------------------------------------------------------------ */
/*  INTERSECTION OBSERVER                                              */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
const faqs = [
  { q: "Was kosten SEO Texte bei SeoForge?", a: "Die Preise richten sich nach Textlänge, Recherche-Aufwand und Thema. Blog-Artikel ab 350 Euro, Landingpages ab 500 Euro, Produkttexte ab 80 Euro pro Stück. Im Erstgespräch erstellen wir ein individuelles Angebot." },
  { q: "Wie lange dauert die Texterstellung?", a: "Standard-Lieferzeit ist 5–7 Werktage nach Briefing-Freigabe. Express-Lieferung in 2–3 Tagen ist gegen Aufpreis möglich. Bei größeren Projekten erstellen wir einen Redaktionsplan mit klaren Meilensteinen." },
  { q: "Schreibt ihr auch in Englisch?", a: "Ja, wir erstellen SEO-Texte auf Deutsch und Englisch. Für andere Sprachen arbeiten wir mit muttersprachlichen Textern zusammen. Sprechen Sie uns an." },
  { q: "Wie stellt ihr sicher, dass die Texte ranken?", a: "Jeder Text basiert auf Keyword-Recherche, Wettbewerbsanalyse und Suchintentions-Analyse. Wir optimieren Struktur, Meta-Daten und interne Verlinkung. Dazu prüfen wir jeden Text mit professionellen SEO-Tools vor der Lieferung." },
  { q: "Kann ich Änderungen anfordern?", a: "Selbstverständlich. Eine Korrekturschleife ist immer inklusive. Wir arbeiten eng mit Ihnen zusammen, bis der Text Ihren Vorstellungen entspricht." },
  { q: "Liefert ihr auch die Meta-Daten mit?", a: "Ja, jeder Text wird mit optimiertem Meta-Title, Meta-Description und Empfehlungen für die URL-Struktur geliefert. Auf Wunsch auch mit internen Verlinkungsvorschlägen und Schema-Markup-Empfehlungen." },
];

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function SeoTexteClient() {
  const [activeFormat, setActiveFormat] = useState(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const formats = [
    {
      title: "Blog-Artikel & Ratgeber",
      desc: "Informative Longreads, die Expertise demonstrieren, organischen Traffic aufbauen und Ihre Zielgruppe durch den Funnel begleiten. Recherchiert, strukturiert, optimiert.",
      specs: "1.500–3.000 Wörter | 5–7 Werktage | inkl. Meta-Daten",
      features: ["Keyword-Recherche & Mapping", "Wettbewerber-Content-Analyse", "Heading-Struktur (H1–H6)", "Interne Verlinkungsvorschläge", "Featured-Snippet-Optimierung", "Lesbarkeits-Check"],
    },
    {
      title: "Landingpages & Service-Seiten",
      desc: "Conversion-fokussierte Seiten, die für spezifische Keywords ranken und Besucher in Anfragen verwandeln. Klar strukturiert, überzeugend getextet, SEO-optimiert.",
      specs: "800–2.000 Wörter | 5–7 Werktage | inkl. CTA-Strategie",
      features: ["Suchintentions-Analyse", "Conversion-Copywriting", "Trust-Elemente & Social Proof", "Schema Markup Empfehlungen", "A/B-Test-Varianten auf Wunsch", "Mobile-optimierte Struktur"],
    },
    {
      title: "Produktbeschreibungen",
      desc: "SEO-optimierte Produkttexte, die sowohl in der Google-Suche als auch auf Kategorie-Seiten überzeugen. Einzigartig, nicht generiert, mit Verkaufspsychologie.",
      specs: "150–500 Wörter | Bulk möglich | inkl. Meta-Daten",
      features: ["Unique Content pro Produkt", "Feature-Benefit-Struktur", "Keyword-Integration natürlich", "Kategorie-Kontext berücksichtigt", "Structured Data Empfehlung", "Skalierbar ab 10 Stück"],
    },
    {
      title: "Kategorietexte & Pillar Pages",
      desc: "Umfassende Übersichtsseiten, die thematische Autorität aufbauen und als Hub für Ihre Topic-Cluster dienen. Der Anker Ihrer Content-Strategie.",
      specs: "2.000–5.000 Wörter | 7–10 Werktage | inkl. Cluster-Plan",
      features: ["Topic-Cluster-Architektur", "Interne Link-Strategie", "FAQ-Sektion mit Schema", "Visuelles Content-Konzept", "E-E-A-T-Signale eingebaut", "Update-Strategie inkludiert"],
    },
  ];

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-secondary/[0.06] via-primary/[0.04] to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-primary/[0.05] to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary hero-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Professionelle SEO Texte
              </div>
              <h1 className="hero-title text-5xl lg:text-6xl leading-[1.12] text-dark font-[family-name:var(--font-heading)]">
                <span className="block">SEO Texte, die</span>
                <span className="text-primary">ranken und verkaufen</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                SEO Texte, die nicht nach SEO klingen. Wir schreiben Inhalte, die Google versteht und Ihre Zielgruppe überzeugt — recherchiert, strukturiert und auf Conversion optimiert.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {["Keyword-recherchiert", "Unique Content", "Lieferung in 5–7 Tagen"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="#jetzt-starten" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30">
                  Texte anfragen
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#formate" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:bg-primary/[0.04] hover:text-primary">
                  Content-Formate
                </Link>
              </div>
            </div>
            <EditorMockup />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY — Editorial with "manuscript" eyecatcher                 */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">

            <div className="mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Warum es wichtig ist</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight max-w-3xl">
                Content ist nicht gleich Content
              </h2>
            </div>

            <div className="mb-12 max-w-4xl">
              <p className="text-xl lg:text-2xl leading-relaxed text-dark/80 font-[family-name:var(--font-heading)]">
                Jeder kann Texte schreiben. Aber Texte, die gleichzeitig <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">ranken, überzeugen und konvertieren</span> — das erfordert Methode, Recherche und Erfahrung.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
              <div className="lg:col-span-7 space-y-6">
                <p className="text-muted text-base lg:text-lg leading-relaxed">
                  Die meisten Unternehmen unterschätzen, was in einem guten SEO-Text steckt. Es beginnt mit der Keyword-Recherche: Welche Begriffe sucht Ihre Zielgruppe tatsächlich? In welcher Phase der Customer Journey? Mit welcher Intention? Erst wenn diese Fragen beantwortet sind, beginnt das eigentliche Schreiben.
                </p>
                <p className="text-muted text-base lg:text-lg leading-relaxed">
                  Unsere Texter verbinden journalistische Qualität mit SEO-Expertise. Jeder Text wird individuell recherchiert, strukturiert und optimiert — kein Template, kein KI-Output, kein Copy-Paste. Das Ergebnis sind Inhalte, die Google als relevant einstuft und die Ihre Leser zum Handeln bewegen.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-gradient-to-br from-primary/[0.04] to-secondary/[0.03] border border-primary/10 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">Was guten SEO-Content ausmacht</h3>
                  </div>
                  <ul className="space-y-3">
                    {["Basiert auf echter Keyword-Recherche", "Beantwortet die Suchintention vollständig", "Strukturiert für Leser UND Suchmaschinen", "Einzigartig — kein Duplicate Content", "Integriert natürliche interne Verlinkung"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-dark/80 leading-relaxed">
                        <span className="mt-0.5 text-primary font-bold font-[family-name:var(--font-heading)]">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FORMATE — Switchable format cards                            */}
      {/* ============================================================ */}
      <section id="formate" className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-14 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Content-Formate</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Welchen Content brauchen Sie?</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Jedes Format hat seinen Zweck. Wählen Sie, was zu Ihren Zielen passt.</p>
          </div>

          <div className="transition-all duration-700 delay-200 reveal">
            {/* Format selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {formats.map((f, i) => (
                <button key={i} onClick={() => setActiveFormat(i)} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeFormat === i ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white border border-border text-dark/70 hover:border-primary/30 hover:text-primary"}`}>
                  {f.title.split(" & ")[0]}
                </button>
              ))}
            </div>

            {/* Active format detail */}
            {formats.map((f, i) => (
              <div key={i} className={`${activeFormat === i ? "block" : "hidden"}`}>
                <div className="bg-white rounded-2xl border border-border p-8 lg:p-12 shadow-sm">
                  <div className="grid lg:grid-cols-2 gap-10">
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">{f.title}</h3>
                      <p className="text-muted text-base lg:text-lg leading-relaxed mb-4">{f.desc}</p>
                      <p className="text-xs font-medium text-primary bg-primary/[0.06] inline-block px-3 py-1.5 rounded-full mb-6">{f.specs}</p>
                      <Link href="#jetzt-starten" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
                        Dieses Format anfragen
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </Link>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted mb-4">Inklusive:</p>
                      <ul className="space-y-3">
                        {f.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-dark/80">
                            <svg className="w-4 h-4 mt-0.5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PAKETE — Horizontal package strips (v05)                     */}
      {/* ============================================================ */}
      <section id="pakete" className="bg-white py-24 lg:py-32 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Unsere Pakete</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight">
                Wählen Sie Ihren Umfang.
              </h2>
            </div>
            <p className="text-base text-muted max-w-sm lg:text-right">
              Keyword-Recherche, SEO-Formatierung und Meta-Tags immer inbegriffen — 100% in-house, kein Outsourcing.
            </p>
          </div>

          {/* Package strips */}
          <div className="divide-y divide-border border border-border">
            {[
              {
                num: "01", name: "Start", words: "500 Wörter", rate: "0,30 € / Wort",
                price: "149", delivery: "5–7 Werktage", featured: false,
                features: [
                  { label: "Keyword-Recherche", on: true, dim: false },
                  { label: "H1–H3 Struktur", on: true, dim: false },
                  { label: "Meta-Title & Description", on: true, dim: false },
                  { label: "1 Korrektur inklusive", on: true, dim: false },
                  { label: "Interne Verlinkung", on: false, dim: false },
                  { label: "Konkurrenz-Analyse", on: false, dim: false },
                ],
              },
              {
                num: "02", name: "Content", words: "1.000 Wörter", rate: "0,28 € / Wort",
                price: "279", delivery: "5–7 Werktage", featured: true,
                features: [
                  { label: "Keyword-Recherche", on: true, dim: false },
                  { label: "H1–H3 Struktur", on: true, dim: false },
                  { label: "Meta-Title & Description", on: true, dim: false },
                  { label: "Interne Verlinkung", on: true, dim: false },
                  { label: "FAQ-Sektion", on: true, dim: false },
                  { label: "Konkurrenz-Schnellcheck", on: true, dim: false },
                ],
              },
              {
                num: "03", name: "Pillar", words: "ab 2.000 Wörter", rate: "ab 0,25 € / Wort",
                price: "499", delivery: "7–10 Werktage", featured: false,
                features: [
                  { label: "Alles aus Content", on: true, dim: false },
                  { label: "Semantisches Cluster", on: true, dim: false },
                  { label: "Full Konkurrenzanalyse", on: true, dim: false },
                  { label: "Strukturierte Daten", on: true, dim: false },
                  { label: "2 Korrekturen inklusive", on: true, dim: false },
                  { label: "CMS-Upload (+49€)", on: true, dim: true },
                ],
              },
            ].map((pkg) => (
              <div
                key={pkg.num}
                className={`grid grid-cols-[100px_1fr_130px] sm:grid-cols-[160px_1fr_180px] lg:grid-cols-[200px_1fr_210px] transition-colors ${
                  pkg.featured
                    ? "bg-primary/[0.025] border-l-[3px] border-l-primary"
                    : "bg-white border-l-[3px] border-l-transparent hover:bg-offwhite/40"
                }`}
              >
                {/* Left: number + name */}
                <div className="p-3 sm:p-6 lg:p-8 border-r border-border flex flex-col justify-between">
                  <span className="font-[family-name:var(--font-heading)] text-4xl sm:text-6xl lg:text-7xl font-bold text-border leading-none select-none">
                    {pkg.num}
                  </span>
                  <div>
                    <div className={`text-sm sm:text-base lg:text-lg font-bold ${pkg.featured ? "text-primary" : "text-dark"}`}>
                      {pkg.name}
                    </div>
                    <div className="text-xs text-muted mt-1">{pkg.words}</div>
                    {pkg.featured && (
                      <span className="inline-block mt-2 text-[9px] font-bold tracking-[0.12em] uppercase bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Beliebt
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle: features */}
                <div className="p-3 sm:p-6 lg:p-8 border-r border-border grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-y-3 content-center">
                  {pkg.features.map((feat) => (
                    <div
                      key={feat.label}
                      className={`flex items-center gap-2 text-xs lg:text-sm leading-snug ${
                        feat.on && !feat.dim ? "text-dark" : feat.dim ? "text-muted" : "text-border"
                      }`}
                    >
                      <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                        feat.on ? "bg-primary/10 border border-primary/30" : "bg-offwhite border border-border"
                      }`}>
                        {feat.on ? (
                          <svg className={`w-2.5 h-2.5 ${feat.dim ? "text-muted" : "text-primary"}`} fill="none" stroke="currentColor" viewBox="0 0 12 12" strokeWidth="2.5">
                            <polyline points="2,6 5,9 10,3" />
                          </svg>
                        ) : (
                          <svg className="w-2.5 h-2.5 text-border" fill="none" stroke="currentColor" viewBox="0 0 12 12" strokeWidth="2">
                            <line x1="3" y1="6" x2="9" y2="6" />
                          </svg>
                        )}
                      </div>
                      {feat.label}
                    </div>
                  ))}
                </div>

                {/* Right: price + CTA */}
                <div className="p-3 sm:p-6 lg:p-8 flex flex-col justify-between items-end">
                  <div className="text-right">
                    <div className="text-[10px] text-muted font-mono mb-1">{pkg.rate}</div>
                    <div className="flex items-end gap-1 justify-end">
                      <span className="font-[family-name:var(--font-heading)] text-4xl font-bold text-primary leading-none">
                        {pkg.price}
                      </span>
                      <span className="text-base text-muted mb-1">€</span>
                    </div>
                    <div className="text-[11px] text-muted mt-1">{pkg.delivery}</div>
                  </div>
                  <Link
                    href="#jetzt-starten"
                    className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      pkg.featured
                        ? "bg-primary text-white hover:bg-primary-dark shadow-sm shadow-primary/20"
                        : "border border-border text-dark/70 hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    Anfragen →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border border border-t-0 border-border">
            {[
              { title: "CMS-Upload", price: "+49€ / Text", desc: "Direkt in WordPress, Shopify o.ä." },
              { title: "Textüberarbeitung", price: "0,15€ / Wort", desc: "Bestehende Texte neu optimieren" },
              { title: "Monatskontingent", price: "4 Texte → −10%", desc: "Regelmäßiger Bedarf mit Rabatt" },
              { title: "Express-Lieferung", price: "Auf Anfrage", desc: "Eilige Projekte, schneller geliefert" },
            ].map((addon) => (
              <div key={addon.title} className="bg-offwhite/50 p-5 hover:bg-white transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm font-semibold text-dark">{addon.title}</span>
                </div>
                <div className="text-sm font-bold text-primary mb-1">{addon.price}</div>
                <div className="text-xs text-muted">{addon.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA banner */}
          <div className="mt-8 bg-white border border-border rounded-2xl p-7 lg:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-1">
                Nicht sicher welches Paket passt?
              </h3>
              <p className="text-sm text-muted">Wir beraten kostenlos und empfehlen was wirklich Sinn macht — ohne Verkaufsdruck.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold text-primary">Antwort in 24h</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROZESS — Content creation journey                           */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Prozess</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Vom Briefing zum fertigen Text</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Fünf Stationen, ein Ziel: Content, der rankt und konvertiert.</p>
          </div>

          <div className="transition-all duration-700 delay-200 reveal">
            {/* Journey visualization — alternating left/right like a winding road */}
            <div className="relative">
              {/* Dashed center line (desktop) */}
              <div className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px border-l-[2px] border-dashed border-primary/20 pointer-events-none" />

              <div className="space-y-8 lg:space-y-0">
                {[
                  {
                    num: "01", title: "Briefing", subtitle: "Was soll der Text leisten?",
                    desc: "Wir klären gemeinsam: Wer ist die Zielgruppe? Welches Ziel verfolgt der Text? Welche Keywords sind relevant? Gibt es Vorgaben zu Tonalität und Länge? Je präziser das Briefing, desto besser das Ergebnis.",
                    detail: "Dauer: 30 Min. Call oder Briefing-Formular",
                    side: "left",
                  },
                  {
                    num: "02", title: "Recherche", subtitle: "Daten sammeln, Wettbewerb verstehen",
                    desc: "Keyword-Recherche mit Suchvolumen und Wettbewerb. Analyse der Top-10-Ergebnisse: Was decken sie ab? Was fehlt? Wo können wir mehr Tiefe liefern? Suchintention klaren — informational, transaktional oder navigational.",
                    detail: "Tools: Ahrefs, Sistrix, Google Search Console",
                    side: "right",
                  },
                  {
                    num: "03", title: "Texterstellung", subtitle: "Schreiben mit System",
                    desc: "Unsere Texter arbeiten nach dem Recherche-Briefing: Klare Heading-Struktur, natürliche Keyword-Integration, überzeugende Argumentation. Jeder Absatz hat einen Zweck. Kein Fülltext, kein generisches Gerede.",
                    detail: "Lieferzeit: 5–7 Werktage ab Briefing-Freigabe",
                    side: "left",
                  },
                  {
                    num: "04", title: "SEO-Feinschliff", subtitle: "Jeden Hebel nutzen",
                    desc: "Meta-Title und Description optimieren. Keyword-Dichte prüfen. Interne Verlinkung setzen. Lesbarkeit testen. Heading-Tags verifizieren. Duplicate-Content ausschliessen. Erst wenn alles stimmt, geht der Text in die finale Runde.",
                    detail: "Geprüft mit: Surfer SEO, Hemingway, Copyscape",
                    side: "right",
                  },
                  {
                    num: "05", title: "Qualitätskontrolle & Lieferung", subtitle: "Perfektion vor Übergabe",
                    desc: "Lektorat, Korrekturlesen, finaler SEO-Audit. Sie erhalten den fertigen Text mit Meta-Daten, Strukturempfehlungen und internen Verlinkungsvorschlägen. Eine Korrekturschleife ist immer inklusive.",
                    detail: "Format: Google Doc, Word oder direkt in Ihr CMS",
                    side: "left",
                  },
                ].map((step, i) => (
                  <div key={step.num} className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${i > 0 ? "lg:pt-8" : ""}`}>
                    {/* Center node (desktop) */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 z-10 h-14 w-14 items-center justify-center rounded-full bg-white border-[3px] border-primary shadow-lg">
                      <span className="text-primary text-lg font-bold font-[family-name:var(--font-heading)]">{step.num}</span>
                    </div>

                    {/* Content — alternates sides */}
                    <div className={`${step.side === "right" ? "lg:col-start-2" : "lg:col-start-1"} ${step.side === "right" ? "lg:pl-12" : "lg:pr-12 lg:text-right"}`}>
                      {/* Mobile number */}
                      <div className="lg:hidden flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">{step.num}</div>
                        <div>
                          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">{step.title}</h3>
                          <p className="text-xs text-primary font-medium">{step.subtitle}</p>
                        </div>
                      </div>

                      {/* Desktop content */}
                      <div className="rounded-2xl border border-border bg-offwhite/30 p-6 lg:p-8 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-primary/20">
                        <div className="hidden lg:block mb-3">
                          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">{step.title}</h3>
                          <p className="text-xs text-primary font-medium mt-0.5">{step.subtitle}</p>
                        </div>
                        <p className="text-sm text-muted leading-relaxed mb-4">{step.desc}</p>
                        <div className={`inline-flex items-center gap-2 text-[10px] font-medium text-dark/50 bg-white border border-border rounded-full px-3 py-1.5 ${step.side === "right" ? "" : "lg:ml-auto"}`}>
                          <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Finish flag */}
              <div className="relative lg:flex lg:justify-center mt-10 lg:mt-12">
                <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary/[0.08] to-secondary/[0.05] border border-primary/15 px-6 py-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm font-semibold text-dark">Fertiger Text mit <span className="text-primary">SEO Score 90+</span> ausgeliefert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEO ARTIKEL — "seo texte kaufen"                             */}
      {/* ============================================================ */}
      <section className="bg-offwhite py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <article className="prose-article">

            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-6">
              SEO Texte kaufen – was das wirklich bedeutet
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-muted mb-5">
              Viele Unternehmen suchen nach SEO Texten, weil ihre Seiten nicht ranken. Das Ergebnis: Man kauft irgendwo Texte, lädt sie hoch – und passiert trotzdem nichts. Das Problem liegt meistens nicht am Text selbst, sondern daran, was davor und dahinter passiert. Oder eben nicht passiert.
            </p>
            <p className="text-base lg:text-lg leading-relaxed text-muted mb-5">
              SEO-optimierte Texte sind kein Produkt, das man einfach bestellt wie eine Schachtel Visitenkarten. Sie sind das Ergebnis eines Prozesses: Keyword-Analyse, Suchintention verstehen, Wettbewerb einschätzen, Struktur planen – und dann schreiben. Wer diesen Prozess überspringt, verschwendet Budget.
            </p>
            <p className="text-base lg:text-lg leading-relaxed text-muted mb-12">
              Wir bei SeoForge machen das anders. Jeder Text, den wir produzieren, beginnt mit Daten – nicht mit einer leeren Word-Datei.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark leading-tight mb-5">
              Was gute SEO Texte von schlechten unterscheidet
            </h2>
            <p className="text-base leading-relaxed text-muted mb-5">
              Es gibt einen einfachen Test: Nimm einen beliebigen SEO-Text und frag dich, ob er eine konkrete Frage eines echten Menschen beantwortet. Wenn die Antwort "nicht wirklich" ist, ist der Text wahrscheinlich wertlos – egal wie oft das Keyword drinsteht.
            </p>
            <p className="text-base leading-relaxed text-muted mb-6">
              Google bewertet Inhalte heute nach E-E-A-T: Erfahrung, Expertise, Autorität, Vertrauenswürdigkeit. Das bedeutet in der Praxis: Oberflächliche Texte, die nur Keywords aneinander reihen, funktionieren kaum noch. Was rankt, sind Inhalte die tatsächlich Mehrwert liefern.
            </p>

            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-4">Die häufigsten Fehler beim Textkauf</h3>
            <ul className="space-y-3 mb-12 text-muted text-base">
              {[
                { b: "Keyword-Stuffing statt Relevanz:", t: "Ein Keyword 20 Mal in 500 Wörter zu packen ist kein SEO – das ist ein Spam-Signal." },
                { b: "Fehlende Suchintention:", t: "Wer das Keyword seo texte kaufen eingibt, will einen Anbieter finden und vergleichen – nicht einen Ratgeber über SEO-Geschichte lesen." },
                { b: "Generische Masse-Inhalte:", t: "Texte, die für jede Website passen würden, bringen keine Rankings. Google will spezifischen, einzigartigen Content." },
                { b: "Keine interne Verlinkung:", t: "Ein Text ohne Bezug zum Rest der Website ist eine Insel. Er transferiert keine Autorität, bildet kein thematisches Cluster." },
                { b: "Falsche Länge:", t: "Zu kurz für komplexe Themen, zu lang für einfache Anfragen – beides schadet." },
              ].map((item) => (
                <li key={item.b} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span><strong className="text-dark">{item.b}</strong> {item.t}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark leading-tight mb-5">
              Welche Textformate es gibt – und wann welches sinnvoll ist
            </h2>
            <p className="text-base leading-relaxed text-muted mb-6">
              Nicht jede Seite braucht den gleichen Texttyp. Eine Produktseite braucht andere Inhalte als ein Ratgeber-Artikel – andere Länge, andere Struktur, andere Keyword-Dichte.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-semibold text-dark">Textformat</th>
                    <th className="text-left py-3 pr-4 font-semibold text-dark">Typische Länge</th>
                    <th className="text-left py-3 pr-4 font-semibold text-dark hidden sm:table-cell">Stärke</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-muted">
                  <tr><td className="py-3 pr-4">Blog-Artikel / Ratgeber</td><td className="py-3 pr-4">1.500–3.000 Wörter</td><td className="py-3 pr-4 hidden sm:table-cell">Organischer Traffic, Markenaufbau</td></tr>
                  <tr><td className="py-3 pr-4">Landingpage / Service-Seite</td><td className="py-3 pr-4">800–2.000 Wörter</td><td className="py-3 pr-4 hidden sm:table-cell">Leads & Anfragen generieren</td></tr>
                  <tr><td className="py-3 pr-4">Produktbeschreibung</td><td className="py-3 pr-4">150–500 Wörter</td><td className="py-3 pr-4 hidden sm:table-cell">Kaufentscheidung unterstützen</td></tr>
                  <tr><td className="py-3 pr-4">Kategorietext / Pillar Page</td><td className="py-3 pr-4">2.000–5.000 Wörter</td><td className="py-3 pr-4 hidden sm:table-cell">Thematische Autorität aufbauen</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-base leading-relaxed text-muted mb-12">
              Welches Format das richtige ist, hängt vom Keyword, der Suchintention und dem Wettbewerb ab. Wer das nicht analysiert, schreibt am Ziel vorbei.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark leading-tight mb-5">
              Wie der Prozess bei SeoForge aussieht
            </h2>
            <p className="text-base leading-relaxed text-muted mb-6">
              Wir produzieren keine Texte von der Stange. Jedes Projekt beginnt mit einem Briefing-Gespräch, in dem wir verstehen wollen, was Ihr Unternehmen wirklich auszeichnet – und was Ihre Zielgruppe wirklich sucht. Erst dann gehen wir in die Recherche.
            </p>

            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">1. Keyword-Analyse &amp; Suchintention</h3>
            <p className="text-base leading-relaxed text-muted mb-5">
              Bevor ein einziges Wort geschrieben wird, analysieren wir das Keyword im Detail. Wie hoch ist das Suchvolumen? Wie stark ist der Wettbewerb? Was wollen die Menschen, die danach suchen – kaufen, informieren, vergleichen? Diese Analyse bestimmt Länge, Struktur und Tonalität des Textes. Wer diesen Schritt überspringt, schreibt ins Blaue.
            </p>

            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">2. Wettbewerbsanalyse &amp; Content-Lücken</h3>
            <p className="text-base leading-relaxed text-muted mb-5">
              Wir schauen uns an, was aktuell für Ihr Keyword rankt – und warum. Welche Themen decken die Top-10-Seiten ab? Was fehlt? Wo gibt es inhaltliche Schwachstellen, die wir für Ihren Text besser machen können? Das ist nicht Kopieren, das ist strategisches Schreiben.
            </p>

            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">3. Texterstellung mit SEO-Feinschliff</h3>
            <p className="text-base leading-relaxed text-muted mb-5">
              Der eigentliche Text entsteht auf Basis dieser Vorarbeit. Wir schreiben für Menschen – nicht für Crawler. Trotzdem fließen alle technischen SEO-Elemente ein: Title, Meta-Description, H1–H3-Struktur, interne Verlinkung, Alt-Texte, semantische Keywords. Das Ergebnis rankt, weil es relevant ist – nicht weil es optimiert wirkt.
            </p>

            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">4. Qualitätskontrolle &amp; Lieferung</h3>
            <p className="text-base leading-relaxed text-muted mb-5">
              Jeder Text wird vor der Lieferung intern geprüft: Lesbarkeit, Struktur, technische SEO-Punkte, Originalität. Lieferzeit ist in der Regel 5–7 Werktage. Bei Bedarf überarbeiten wir den Text nach Ihrem Feedback – eine Korrekturschleife ist immer inklusive.
            </p>
            <p className="text-base leading-relaxed text-muted mb-12">
              Den vollständigen Ablauf unserer{" "}
              <Link href="/seo/content-strategie" className="text-primary underline underline-offset-2 hover:no-underline">Content-Strategie</Link>{" "}
              beschreiben wir auf einer separaten Seite – inklusive unserem Framework für Topic Clusters und Keyword-Mapping.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark leading-tight mb-5">
              Was SeoForge kostet – und was dabei inbegriffen ist
            </h2>
            <p className="text-base leading-relaxed text-muted mb-6">
              Unsere Texte gibt es in drei Paketen, je nach Umfang und Komplexität des Projekts. Die Preise sind transparent – keine versteckten Kosten, keine Pauschal-Angebote, die hinterher anders aussehen.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-semibold text-dark">Paket</th>
                    <th className="text-left py-3 pr-4 font-semibold text-dark">Preis</th>
                    <th className="text-left py-3 pr-4 font-semibold text-dark">Inhalte</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-muted">
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-dark">Start</td>
                    <td className="py-3 pr-4 whitespace-nowrap">ab 149 €</td>
                    <td className="py-3 pr-4">1 Text (800–1.500 Wörter), Keyword-Recherche, Meta-Daten, 1 Korrekturschleife</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-dark">Content</td>
                    <td className="py-3 pr-4 whitespace-nowrap">ab 279 €</td>
                    <td className="py-3 pr-4">1 Text (1.500–3.000 Wörter), Wettbewerbsanalyse, Struktur-Briefing, interne Verlinkung, 2 Korrekturrunden</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-dark">Pillar</td>
                    <td className="py-3 pr-4 whitespace-nowrap">ab 499 €</td>
                    <td className="py-3 pr-4">1 Pillar Page (3.000–5.000 Wörter), vollständige Content-Strategie, Topic-Cluster-Planung, unbegrenzte Korrekturen</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-base leading-relaxed text-muted mb-12">
              Für regelmäßige Content-Produktion bieten wir auch monatliche Pakete an. Wenn Sie mehrere Texte pro Monat benötigen, lohnt sich ein Gespräch über eine langfristige Zusammenarbeit. Fragen zu Umfang und Ablauf beantwortet unsere{" "}
              <Link href="/seo/beratung" className="text-primary underline underline-offset-2 hover:no-underline">SEO-Beratung</Link>{" "}
              – dort können Sie auch ein kostenloses Erstgespräch anfragen.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark leading-tight mb-5">
              SEO Texte kaufen vs. selbst schreiben – was rechnet sich?
            </h2>
            <p className="text-base leading-relaxed text-muted mb-5">
              Die ehrliche Antwort: Es kommt darauf an. Wer selbst tief in der Materie steckt und Zeit hat, kann gute SEO-Texte selbst schreiben. Aber die meisten Unternehmen haben weder das eine noch das andere – und genau dann lohnt sich der Kauf.
            </p>
            <p className="text-base leading-relaxed text-muted mb-5">
              Ein schlecht geschriebener Text kostet nicht nur das Honorar des Texters. Er kostet auch die Rankings, die er nicht erreicht, die Leads, die nicht kommen, und die Zeit, die investiert wurde. Schlechte SEO-Texte sind keine neutrale Option – sie können aktiv schaden, wenn Google sie als Thin Content einstuft.
            </p>
            <p className="text-base leading-relaxed text-muted mb-12">
              Professionelle SEO-Texte amortisieren sich. Ein gut platzierter Artikel bringt über Monate und Jahre organischen Traffic – ohne laufende Werbekosten. Wer mehr über die Grundlagen erfahren will, findet auf unserer{" "}
              <Link href="/seo" className="text-primary underline underline-offset-2 hover:no-underline">SEO-Übersichtsseite</Link>{" "}
              einen guten Einstieg. Für die technische Seite erklärt unser Beitrag zu{" "}
              <Link href="/wissen/on-page" className="text-primary underline underline-offset-2 hover:no-underline">On-Page-SEO</Link>,{" "}
              wie Technik, Content und UX zusammenwirken.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark leading-tight mb-5">
              Wann SEO Texte allein nicht reichen
            </h2>
            <p className="text-base leading-relaxed text-muted mb-5">
              Gute Texte sind eine notwendige, aber keine hinreichende Bedingung für gute Rankings. Wer auf einer technisch kaputten Website publiziert, wird kaum Erfolge sehen – egal wie gut der Content ist. Gleiches gilt für Seiten ohne Backlinks, ohne klare Seitenstruktur oder mit Indexierungsproblemen.
            </p>
            <p className="text-base leading-relaxed text-muted mb-5">
              Deshalb empfehlen wir vor jedem größeren Content-Projekt einen{" "}
              <Link href="/seo/audit" className="text-primary underline underline-offset-2 hover:no-underline">SEO-Audit</Link>.
              {" "}Der zeigt, was technisch im Argen liegt und ob die geplanten Texte auf einer soliden Basis landen.
            </p>
            <p className="text-base leading-relaxed text-muted mb-12">
              Wer dauerhaft in den organischen Suchergebnissen wachsen will, kommt an einer strukturierten{" "}
              <Link href="/seo/content-strategie" className="text-primary underline underline-offset-2 hover:no-underline">Content-Strategie</Link>{" "}
              nicht vorbei. Einzelne Texte bauen keine Autorität auf – ein durchdachtes System aus Pillar Pages, Cluster-Artikeln und interner Verlinkung schon.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark leading-tight mb-6">
              Häufige Fragen zu SEO Texten
            </h2>
            <div className="space-y-6">
              {[
                { q: "Wie lange dauert es, bis SEO Texte ranken?", a: "Das ist ehrlich gesagt nicht exakt vorhersagbar. Neue Seiten werden von Google in der Regel innerhalb von Tagen bis wenigen Wochen gecrawlt. Bis ein Text stabile Rankings erreicht, dauert es je nach Wettbewerb und Domain-Autorität meist 2 bis 6 Monate. SEO ist eine Investition mit zeitverzögertem Return – keine Sofortmaßnahme." },
                { q: "Kann ich bestehende Texte optimieren lassen statt neue zu kaufen?", a: "Ja – und das ist oft sogar sinnvoller. Seiten, die bereits von Google indexiert sind und etwas Traffic haben, lassen sich durch gezielte Überarbeitung oft schneller verbessern als neue Seiten. Wir analysieren den Ist-Zustand, identifizieren Schwachstellen und überarbeiten gezielt." },
                { q: "Schreiben Sie die Texte mit KI oder manuell?", a: "Wir nutzen KI-Tools als Hilfsmittel bei Recherche und Strukturplanung – aber der finale Text wird von einem Menschen geschrieben, überprüft und angepasst. Vollautomatisch generierte Texte ohne menschliche Kontrolle liefern wir nicht." },
                { q: "In welchen Sprachen können Sie SEO Texte erstellen?", a: "Unser Schwerpunkt liegt auf Deutsch. Englische Texte produzieren wir auf Anfrage, prüfen aber vorab, ob das die richtige Investition für Ihr Vorhaben ist. Für internationale SEO-Projekte empfehlen wir zunächst ein Strategiegespräch." },
                { q: "Was brauchen Sie von mir, um zu starten?", a: "Für den Start brauchen wir: Ihre Ziel-URL oder Seitenidee, das Hauptkeyword oder Thema, eine kurze Beschreibung Ihrer Zielgruppe und – falls vorhanden – Informationen über Ihre Konkurrenz. Den Rest übernehmen wir. Ein 20-minütiges Gespräch reicht meistens." },
              ].map((item) => (
                <div key={item.q} className="border-l-2 border-primary/30 pl-5">
                  <h3 className="font-semibold text-dark mb-2">{item.q}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.a}</p>
                </div>
              ))}
            </div>

          </article>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-14 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">FAQ</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">Häufig gestellte Fragen</h2>
          </div>
          <div className="transition-all duration-700 delay-100 reveal">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  JETZT STARTEN — CTA                                          */}
      {/* ============================================================ */}
      <section id="jetzt-starten" className="bg-offwhite py-20 lg:py-28 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Jetzt starten</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-6 leading-tight">
                Texte, die<br />ranken und überzeugen
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">Erzählen Sie uns von Ihrem Projekt — wir erstellen ein unverbindliches Angebot für SEO-Texte, die gefunden werden und Ihre Zielgruppe ansprechen.</p>
              <div className="space-y-4">
                {[
                  { title: "Individuelle Briefings", desc: "Jeder Text wird auf Ihre Zielgruppe, Ihre Tonalität und Ihre Keywords zugeschnitten." },
                  { title: "E-E-A-T optimiert", desc: "Inhalte, die Expertise, Erfahrung und Vertrauen signalisieren — für Google und für Ihre Leser." },
                  { title: "Messbare Rankings", desc: "Wir liefern keine Texte ins Blaue, sondern Content mit klarem Ranking-Ziel." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark mb-1">{item.title}</h4>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white border border-border p-8 lg:p-10 shadow-xl shadow-dark/[0.03]">
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-2">Gespräch vereinbaren</h3>
                <p className="text-sm text-muted">Kostenlos und unverbindlich</p>
              </div>
              <div className="space-y-4 mb-8">
                <Link href="/kontakt" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl transition-all">
                  Texte anfragen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a href="tel:015129547343" className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-dark hover:border-primary/30 hover:text-primary transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  0151 29547343
                </a>
              </div>
              <div className="flex items-center justify-center gap-6 pt-6 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Antwort in 24h
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Keine Bindung
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
