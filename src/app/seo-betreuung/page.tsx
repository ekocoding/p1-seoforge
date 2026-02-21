import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "../components/SubpageLayout";
import BetreuungMockup from "./BetreuungMockup";

export const metadata: Metadata = {
  title: "SEO Betreuung | SeoForge - Ihre SEO Agentur",
  description: "Monatliche SEO-Betreuung von SeoForge. Kontinuierliche Optimierung, transparentes Reporting und messbare Ergebnisse für langfristiges Wachstum.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was beinhaltet die monatliche SEO Betreuung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unsere monatliche SEO Betreuung umfasst technisches SEO-Monitoring, Content-Optimierung, Linkbuilding, Keyword-Tracking, Wettbewerbsanalyse und On-Page-Optimierungen. Jeder Monat endet mit einem detaillierten Bericht und einem persönlichen Review-Gespräch.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert es bis ich Ergebnisse sehe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste messbare Ergebnisse sind in der Regel nach 3–6 Monaten sichtbar. SEO ist ein nachhaltiger Kanal – je länger wir zusammenarbeiten, desto stärker und stabiler werden Ihre Rankings. Quick Wins bei technischen Problemen können sich jedoch bereits im ersten Monat zeigen.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet die SEO Betreuung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Kosten richten sich nach dem Umfang Ihres Projekts und Ihrer Website. Unsere SEO Betreuungspakete starten ab 990 € pro Monat. In einem kostenlosen Erstgespräch analysieren wir Ihre Situation und erstellen ein individuelles Angebot.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich jederzeit kündigen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, unsere Verträge haben eine Laufzeit von 3 Monaten mit monatlicher Verlängerung. Wir setzen auf Qualität und Ergebnisse – nicht auf lange Vertragslaufzeiten. Wenn Sie unzufrieden sind, können Sie problemlos kündigen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie oft gibt es Meetings und Reports?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sie erhalten jeden Monat einen detaillierten Bericht mit allen durchgeführten Maßnahmen und Ergebnissen. Zusätzlich findet ein monatliches Review-Gespräch statt. Bei wichtigen Entwicklungen – wie einem Google Update – informieren wir Sie natürlich sofort.",
      },
    },
  ],
};

export default function SEOBetreuungPage() {
  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Section 1: Split-Screen Hero */}
      <section className="bg-offwhite border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-muted">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Monatliche SEO Betreuung
              </div>

              <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl lg:text-5xl xl:text-6xl font-bold text-dark leading-tight">
                SEO Betreuung für{" "}
                <span className="text-primary">langfristigen Wachstum</span>
              </h1>

              <p className="hero-description text-lg lg:text-xl text-muted leading-relaxed">
                Wir übernehmen Ihre SEO vollständig: monatliche Optimierungen, kontinuierliches Monitoring und transparente Berichte – damit Sie sich auf Ihr Kerngeschäft konzentrieren können.
              </p>

              <div className="hero-cta flex flex-wrap gap-4 pt-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200"
                >
                  Jetzt anfragen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="#leistungen"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-border text-dark rounded-lg font-medium hover:border-primary transition-colors duration-200"
                >
                  Leistungen ansehen
                </Link>
              </div>
            </div>

            {/* Right: Betreuung Dashboard Mockup */}
            <BetreuungMockup />
          </div>
        </div>
      </section>

      {/* Section 2: Was ist SEO Betreuung? */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Was ist SEO Betreuung?
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted leading-relaxed mb-6">
              SEO Betreuung ist die monatliche, professionelle Verwaltung Ihrer gesamten Suchmaschinenoptimierung. Anstatt einmalige Maßnahmen durchzuführen, kümmern wir uns dauerhaft um Ihre Rankings, Ihren Traffic und Ihre Online-Sichtbarkeit – proaktiv, datengetrieben und vollständig transparent.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Suchmaschinenoptimierung ist kein einmaliges Projekt, sondern ein kontinuierlicher Prozess. Google aktualisiert seinen Algorithmus hunderte Mal pro Jahr, Mitbewerber optimieren ständig und Nutzerverhalten verändert sich. Mit unserer SEO Betreuung reagieren wir sofort auf diese Veränderungen und sichern Ihre Positionen langfristig.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-offwhite border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-2">Laufend</h3>
                <p className="text-sm text-muted">Kontinuierliche Optimierung Monat für Monat</p>
              </div>
              <div className="bg-offwhite border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-2">Transparent</h3>
                <p className="text-sm text-muted">Monatliche Reports mit klaren Ergebnissen</p>
              </div>
              <div className="bg-offwhite border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-2">Messbar</h3>
                <p className="text-sm text-muted">Klare KPIs und nachvollziehbare Erfolge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Unsere Leistungen im Überblick */}
      <section id="leistungen" className="py-16 lg:py-24 bg-offwhite border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Unsere Leistungen im Überblick
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Alles, was für nachhaltiges SEO-Wachstum notwendig ist – aus einer Hand
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Keyword-Monitoring",
                desc: "Rankings kontinuierlich überwacht und ausgebaut",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Technisches SEO",
                desc: "Crawling, Speed, Core Web Vitals und Indexierung",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
                title: "Content-Optimierung",
                desc: "Bestehende Inhalte verbessern und neu ausrichten",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                ),
                title: "Linkbuilding",
                desc: "Hochwertige Backlinks strategisch aufbauen",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                title: "Wettbewerbsanalyse",
                desc: "Konkurrenz kontinuierlich im Blick behalten",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                ),
                title: "On-Page Optimierung",
                desc: "Meta-Tags, Struktur und interne Verlinkung",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Monatliches Reporting",
                desc: "Transparente Ergebnisberichte mit klaren KPIs",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: "SEO-Beratung inkl.",
                desc: "Direkter Zugang zu Ihrem persönlichen SEO-Experten",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-1">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: IMAGE SECTION 1 - Full-width dark */}
      <section className="bg-dark min-h-[400px] flex items-center">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white">
                Ihr SEO-Team, das nie schläft
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                Während Sie schlafen, überwachen wir Ihre Rankings. Unser kontinuierliches Monitoring erkennt Veränderungen sofort – ob Google-Update, technische Probleme oder neue Konkurrenten. Wir reagieren proaktiv, bevor Sie Positionen verlieren.
              </p>
              <ul className="space-y-3">
                {[
                  "24/7 Ranking- und Traffic-Überwachung",
                  "Sofortige Reaktion auf Algorithmus-Updates",
                  "Monatlicher Bericht mit allen Maßnahmen",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <Image
                src="/seo-betreuung-team.png"
                alt="SEO Betreuung Team"
                width={600}
                height={450}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Monatlicher Prozess */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Ihr monatlicher Betreuungszyklus
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Strukturiert, transparent und messbar – so funktioniert unsere SEO Betreuung
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Analyse & Audit",
                desc: "Monatliche Performance-Überprüfung aller relevanten SEO-Kennzahlen und Identifikation von Optimierungspotenzialen.",
                points: ["Ranking-Entwicklung", "Traffic-Analyse", "Technisches Audit"],
              },
              {
                step: "02",
                title: "Maßnahmenplanung",
                desc: "Priorisierung der Maßnahmen basierend auf Daten und Impact – Quick Wins zuerst, langfristige Strategien parallel.",
                points: ["Impact-Priorisierung", "Ressourcenplanung", "Zeitplanung"],
              },
              {
                step: "03",
                title: "Umsetzung",
                desc: "Implementierung aller vereinbarten SEO-Maßnahmen durch unser Expertenteam – technisch, inhaltlich und strategisch.",
                points: ["Technische Fixes", "Content-Optimierung", "Linkbuilding"],
              },
              {
                step: "04",
                title: "Reporting & Review",
                desc: "Transparente Ergebniskommunikation mit verständlichen Berichten und persönlichem Review-Gespräch.",
                points: ["Monatsbericht", "KPI-Übersicht", "Nächste Schritte"],
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-[family-name:var(--font-heading)] text-xl font-bold text-primary">
                  {item.step}
                </div>
                <h3 className="mb-3 text-xl font-bold text-dark">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="space-y-2">
                  {item.points.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: IMAGE SECTION 2 - side-by-side */}
      <section className="py-16 lg:py-24 bg-offwhite border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Left: Image */}
            <div className="relative">
              <Image
                src="/seo-betreuung-analytics.png"
                alt="SEO Analytics"
                width={600}
                height={450}
                className="rounded-2xl w-full h-auto object-cover shadow-lg"
              />
            </div>

            {/* Right: Text */}
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark">
                Datengetrieben. Transparent. Nachhaltig.
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: "Datengetriebene Entscheidungen",
                    desc: "Jede Maßnahme basiert auf belastbaren Daten aus Google Analytics, Search Console und professionellen SEO-Tools.",
                  },
                  {
                    title: "Vollständige Transparenz",
                    desc: "Sie erhalten jeden Monat einen detaillierten Bericht mit allen durchgeführten Maßnahmen und erreichten Ergebnissen.",
                  },
                  {
                    title: "Nachhaltige Wirkung",
                    desc: "Wir optimieren ausschließlich mit White-Hat-Methoden, die auch bei zukünftigen Google-Updates Bestand haben.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200"
              >
                Betreuung anfragen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Für wen ist SEO Betreuung geeignet? */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Für wen ist SEO Betreuung geeignet?
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Unsere SEO Betreuung ist der richtige Schritt für alle, die SEO ernst nehmen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "Etablierte Unternehmen",
                desc: "die ihre SEO nicht dem Zufall überlassen wollen und ihre bestehenden Rankings langfristig absichern und ausbauen möchten.",
                color: "primary",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "E-Commerce Shops",
                desc: "die kontinuierlich neue Kunden gewinnen möchten und ihren organischen Traffic nachhaltig steigern wollen.",
                color: "secondary",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: "Wachsende Startups",
                desc: "die organischen Traffic als skalierbaren Wachstumskanal nutzen wollen und sich von Anfang an professionelle Unterstützung sichern.",
                color: "primary",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-offwhite border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    item.color === "secondary"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="py-16 lg:py-24 bg-offwhite border-y border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Häufige Fragen zur SEO Betreuung
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Was beinhaltet die monatliche SEO Betreuung?",
                a: "Unsere monatliche SEO Betreuung umfasst technisches SEO-Monitoring, Content-Optimierung, Linkbuilding, Keyword-Tracking, Wettbewerbsanalyse und On-Page-Optimierungen. Jeder Monat endet mit einem detaillierten Bericht und einem persönlichen Review-Gespräch.",
              },
              {
                q: "Wie lange dauert es bis ich Ergebnisse sehe?",
                a: "Erste messbare Ergebnisse sind in der Regel nach 3–6 Monaten sichtbar. SEO ist ein nachhaltiger Kanal – je länger wir zusammenarbeiten, desto stärker und stabiler werden Ihre Rankings. Quick Wins bei technischen Problemen können sich jedoch bereits im ersten Monat zeigen.",
              },
              {
                q: "Was kostet die SEO Betreuung?",
                a: "Die Kosten richten sich nach dem Umfang Ihres Projekts und Ihrer Website. Unsere SEO Betreuungspakete starten ab 990 € pro Monat. In einem kostenlosen Erstgespräch analysieren wir Ihre Situation und erstellen ein individuelles Angebot.",
              },
              {
                q: "Kann ich jederzeit kündigen?",
                a: "Ja, unsere Verträge haben eine Laufzeit von 3 Monaten mit monatlicher Verlängerung. Wir setzen auf Qualität und Ergebnisse – nicht auf lange Vertragslaufzeiten. Wenn Sie unzufrieden sind, können Sie problemlos kündigen.",
              },
              {
                q: "Wie oft gibt es Meetings und Reports?",
                a: "Sie erhalten jeden Monat einen detaillierten Bericht mit allen durchgeführten Maßnahmen und Ergebnissen. Zusätzlich findet ein monatliches Review-Gespräch statt. Bei wichtigen Entwicklungen – wie einem Google Update – informieren wir Sie natürlich sofort.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-border rounded-xl overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="font-semibold text-dark mb-3 flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                      {index + 1}
                    </span>
                    {item.q}
                  </h3>
                  <p className="text-muted leading-relaxed text-sm pl-9">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Dark CTA Section */}
      <section className="relative overflow-hidden bg-dark py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>

        <div className="relative container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-6">
            Bereit für kontinuierliches SEO-Wachstum?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam Ihre SEO auf das nächste Level bringen. Vereinbaren Sie jetzt ein kostenloses Erstgespräch.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Kostenloses Erstgespräch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors duration-200"
            >
              Alle Leistungen
            </Link>
          </div>

          {/* Trust metrics */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Ø +127%</div>
              <div className="text-sm text-white/70">Traffic-Wachstum</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">12 Monate</div>
              <div className="text-sm text-white/70">Ø Laufzeit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-white/70">Kundenzufriedenheit</div>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
