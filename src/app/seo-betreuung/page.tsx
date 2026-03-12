import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "../components/SubpageLayout";
import BetreuungMockup from "./BetreuungMockup";

export const metadata: Metadata = {
  title: "SEO Betreuung | SeoForge - Kontinuierliche Optimierung",
  description: "Monatliche SEO Betreuung für nachhaltiges Wachstum. Algorithmus-resistent, datengetrieben, transparent. Ab 990 €/Monat. Kostenloses Erstgespräch.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Warum reicht eine einmalige SEO-Optimierung nicht aus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Google aktualisiert seinen Algorithmus über 500 Mal pro Jahr. Ihre Konkurrenz optimiert kontinuierlich. Nutzerverhalten ändert sich. Einmalige Maßnahmen verpuffen – kontinuierliche Betreuung sichert und baut Ihre Positionen systematisch aus.",
      },
    },
    {
      "@type": "Question",
      name: "Wie ermitteln Sie die Investition für mein Projekt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jede SEO-Betreuung ist individuell. Die Investition richtet sich nach Ihrem Projektumfang (Website-Größe, Keywords), der Wettbewerbsintensität in Ihrer Branche, Ihren Zielen und Ihrer Ausgangssituation. Im kostenlosen Erstgespräch analysieren wir alles und erstellen Ihnen ein transparentes Angebot.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert es bis ich Ergebnisse sehe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste messbare Verbesserungen zeigen sich nach 3–6 Monaten. Technische Quick Wins können bereits im ersten Monat wirken. Nachhaltige, stabile Rankings entwickeln sich über 6–12 Monate. SEO ist ein Marathon, kein Sprint – aber die Wirkung ist langfristig.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen SEO-Agenturen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir kombinieren klassische SEO mit moderner GEO (Generative Engine Optimization) für Sichtbarkeit in ChatGPT & Co. Sie haben direkten Kontakt zum Chef – keine Account-Manager. Wir arbeiten datengetrieben, transparent und setzen auf langfristige Partnerschaften statt Massenabfertigung.",
      },
    },
    {
      "@type": "Question",
      name: "Wie läuft die Zusammenarbeit ab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Monatlicher Zyklus: 1) Analyse & Audit Ihrer aktuellen Performance, 2) Maßnahmenplanung nach Impact-Priorisierung, 3) Umsetzung durch unser Expertenteam, 4) Transparentes Reporting & persönliches Review-Gespräch. Bei Google-Updates oder wichtigen Entwicklungen informieren wir Sie sofort.",
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
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-offwhite border-b border-border">
        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-muted">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Monatliche SEO Betreuung
              </div>

              <h1 className="hero-title text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-dark leading-tight">
                SEO ist kein Projekt.
                <br />
                <span className="text-primary">SEO ist ein Prozess.</span>
              </h1>

              <p className="hero-description text-xl text-muted leading-relaxed">
                Einmalige Maßnahmen verpuffen in einem dynamischen Markt. Professionelle 
                SEO-Betreuung sichert nicht nur Rankings – sie entwickelt Ihre Website 
                systematisch zur zentralen Branchen-Autorität weiter.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  "Algorithmus-resilient",
                  "KI-Sichtbarkeit (GEO)",
                  "ROI-fokussiert",
                  "Transparentes Reporting"
                ].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border rounded-full text-sm text-muted">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="hero-cta flex flex-wrap gap-4 pt-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Kostenloses Erstgespräch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="#vorteile"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-border text-dark rounded-lg font-semibold hover:border-primary transition-colors"
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>

            <BetreuungMockup />
          </div>
        </div>
      </section>

      {/* Warum Betreuung Section */}
      <section id="vorteile" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Warum laufende SEO Betreuung?
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-muted leading-relaxed text-center">
              Das Internet ist dynamisch. Google aktualisiert seinen Algorithmus über 
              <strong className="text-dark"> 500 Mal pro Jahr</strong>. Ihre Konkurrenz optimiert ständig. 
              Nutzerverhalten ändert sich. Nur fortlaufende Betreuung garantiert, dass Ihre 
              Inhalte aktuell bleiben und Sie den First-Mover-Vorteil bei neuen Standards behalten.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🤖",
                title: "KI- & Algorithmus-Resilienz",
                desc: "Proaktive Anpassung an Google-Updates (Core Updates) und Integration in KI-Antwortsysteme wie ChatGPT, Gemini und AI Overviews.",
              },
              {
                icon: "📊",
                title: "Topical Authority",
                desc: "Systematischer Aufbau von Themen-Clustern, die Sie gegenüber Algorithmen als vertrauenswürdigste Quelle (E-E-A-T) legitimieren.",
              },
              {
                icon: "💰",
                title: "ROI-Fokus",
                desc: "Optimierung der Search Experience (SXO), um nicht nur Traffic zu generieren, sondern Conversion-Rate und Lead-Qualität messbar zu steigern.",
              },
              {
                icon: "⚡",
                title: "Datenbasierte Agilität",
                desc: "Laufendes Monitoring von Wettbewerbsbewegungen und Suchintentionen für schnelle Kurskorrekturen und maximale Effizienz.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-offwhite border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-[family-name:var(--font-heading)] text-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungsumfang Section */}
      <section id="leistungen" className="py-24 bg-offwhite border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Leistungsumfang unserer Betreuung
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Alles, was für nachhaltiges SEO-Wachstum notwendig ist – aus einer Hand
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                num: "01",
                title: "Strategisches Monitoring",
                desc: "Laufende Überwachung von Rankings, KI-Zitationen und Wettbewerbsstrategien. Identifikation von Marktveränderungen und Content-Gaps.",
              },
              {
                num: "02",
                title: "On-Page & Entitäten",
                desc: "Kontinuierliche Schärfung der semantischen Struktur, Schema-Markups und internen Link-Architektur zur Stärkung von Pillar Pages.",
              },
              {
                num: "03",
                title: "Technisches SEO & SXO",
                desc: "Überwachung der Core Web Vitals (INP, LCP, CLS), Crawlbarkeit und Indexierung. Maximale Nutzererfahrung für beste Conversion.",
              },
              {
                num: "04",
                title: "Content-Evolution",
                desc: "Laufende Aktualisierung bestehender Inhalte (Content Refresh) und Erstellung neuer Inhalte mit hohem Information Gain für Backlinks & KI-Zitate.",
              },
              {
                num: "05",
                title: "Linkbuilding",
                desc: "Strategischer Aufbau hochwertiger Backlinks und Brand Mentions. Fokus auf Qualität und thematische Relevanz statt Masse.",
              },
              {
                num: "06",
                title: "GEO-Optimierung",
                desc: "Sichtbarkeit in KI-Systemen: ChatGPT, Gemini, Perplexity. Optimierung für Zitationen, Featured Snippets und AI Overviews.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl font-[family-name:var(--font-heading)] text-primary/20 mb-4">
                  {item.num}
                </div>
                <h3 className="text-xl font-[family-name:var(--font-heading)] text-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monatlicher Prozess */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Ihr monatlicher Betreuungszyklus
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Strukturiert, transparent und messbar
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                step: "1",
                title: "Analyse & Audit",
                desc: "Monatliche Performance-Überprüfung: Rankings, Traffic, technischer Zustand, Wettbewerbsaktivitäten, KI-Sichtbarkeit.",
                color: "primary",
              },
              {
                step: "2",
                title: "Maßnahmenplanung",
                desc: "Priorisierung nach Impact-Dringlichkeit-Verhältnis. Quick Wins zuerst, langfristige Strategien parallel. Klare Roadmap.",
                color: "secondary",
              },
              {
                step: "3",
                title: "Iterative Umsetzung",
                desc: "Technische Optimierungen, Content-Verbesserungen, Linkbuilding-Maßnahmen – alles aus einer Hand.",
                color: "primary",
              },
              {
                step: "4",
                title: "Reporting & Review",
                desc: "Transparenter Monatsbericht mit allen KPIs, durchgeführten Maßnahmen und persönlichem Strategie-Review.",
                color: "secondary",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-6 items-start bg-offwhite border border-border rounded-xl p-6"
              >
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold
                  ${item.color === 'primary' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-[family-name:var(--font-heading)] text-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Für wen Section */}
      <section className="py-24 bg-offwhite border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Für wen ist unsere Betreuung?
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
                desc: "die ihre bestehenden Rankings langfristig absichern und systematisch ausbauen möchten.",
                color: "primary",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "E-Commerce",
                desc: "die kontinuierlich organischen Traffic steigern und von KI-Shopping-Empfehlungen profitieren wollen.",
                color: "secondary",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: "B2B & Industrie",
                desc: "die sich in Nischenmärkten als Topical Authority positionieren und qualifizierte Leads generieren wollen.",
                color: "primary",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6
                    ${item.color === "secondary" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-[family-name:var(--font-heading)] text-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investition Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Ihre Investition in nachhaltiges Wachstum
            </h2>
            <p className="text-lg text-muted">
              Jede SEO-Betreuung ist so individuell wie Ihr Unternehmen. 
              Die Investition richtet sich nach Ihren Zielen, Ihrer Branche und dem Wettbewerb.
            </p>
          </div>

          <div className="bg-offwhite border border-border rounded-2xl p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-4">
                  Was bestimmt die Investition?
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Projektumfang",
                      desc: "Website-Größe, Anzahl der Zielkeywords, Content-Bedarf"
                    },
                    {
                      title: "Wettbewerbsintensität",
                      desc: "Branchen-spezifische Konkurrenzsituation"
                    },
                    {
                      title: "Ihre Ziele",
                      desc: "Traffic, Leads, E-Commerce-Umsatz, Markenaufbau"
                    },
                    {
                      title: "Ausgangssituation",
                      desc: "Technischer Zustand, bestehende Autorität, Content-Basis"
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <span className="text-dark font-medium">{item.title}</span>
                        <p className="text-sm text-muted">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-border rounded-xl p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-dark mb-4">
                  Was Sie erwarten können:
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-muted">Ø Traffic-Wachstum</span>
                    <span className="text-primary font-bold">+40-120%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-muted">ROI-Timeline</span>
                    <span className="text-dark font-semibold">6-12 Monate</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-muted">Vertragslaufzeit</span>
                    <span className="text-dark font-semibold">Flexibel</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted">Kündbarkeit</span>
                    <span className="text-dark font-semibold">Monatlich</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <Link
                    href="/kontakt"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Individuelles Angebot anfordern
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted">
              In einem <strong className="text-dark">kostenlosen Erstgespräch</strong> analysieren wir Ihre Situation 
              und erstellen Ihnen ein maßgeschneidertes Konzept mit transparentem Investitionsplan.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-offwhite border-y border-border">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Häufige Fragen
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Warum reicht eine einmalige SEO-Optimierung nicht aus?",
                a: "Google aktualisiert seinen Algorithmus über 500 Mal pro Jahr. Ihre Konkurrenz optimiert kontinuierlich. Einmalige Maßnahmen verpuffen – kontinuierliche Betreuung sichert und baut Ihre Positionen systematisch aus.",
              },
              {
                q: "Wie lange dauert es bis ich Ergebnisse sehe?",
                a: "Erste messbare Verbesserungen zeigen sich nach 3–6 Monaten. Technische Quick Wins können bereits im ersten Monat wirken. Nachhaltige, stabile Rankings entwickeln sich über 6–12 Monate.",
              },
              {
                q: "Wie läuft die Zusammenarbeit ab?",
                a: "Monatlicher Zyklus: 1) Analyse & Audit, 2) Maßnahmenplanung nach Impact, 3) Umsetzung durch unser Expertenteam, 4) Transparentes Reporting & persönliches Review.",
              },
              {
                q: "Was unterscheidet SeoForge von anderen Agenturen?",
                a: "Wir kombinieren klassische SEO mit moderner GEO für Sichtbarkeit in ChatGPT & Co. Sie haben direkten Kontakt zum Chef – keine Account-Manager. Wir arbeiten datengetrieben und transparent.",
              },
              {
                q: "Kann ich jederzeit kündigen?",
                a: "Nach der Mindestlaufzeit von 3 Monaten ist der Vertrag monatlich kündbar. Wir setzen auf Qualität und Ergebnisse – nicht auf lange Vertragsbindungen.",
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

      {/* Fazit Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-8">
            Fazit: SEO ist kein Projekt, sondern ein Prozess
          </h2>
          <p className="text-xl text-muted leading-relaxed mb-12">
            Mit strategischer SEO Betreuung heben Sie Ihr Marketing auf ein neues Level: 
            Sie reagieren nicht mehr auf Veränderungen, Sie agieren als Marktführer. 
            Durch die Kombination aus <strong className="text-dark">technischer Exzellenz</strong>, 
            <strong className="text-dark"> inhaltlicher Autorität</strong> und 
            <strong className="text-dark"> KI-Sichtbarkeit (GEO)</strong> stellen Sie sicher, 
            dass Ihre Marke sowohl heute als auch in der KI-geprägten Zukunft die primäre 
            Antwortquelle für Ihre Zielgruppe bleibt.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Starten Sie jetzt Ihre Betreuung
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="relative overflow-hidden bg-dark py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <div className="relative container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-white mb-6">
            Bereit für kontinuierliches Wachstum?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Lassen Sie uns in einem kostenlosen Erstgespräch besprechen, 
            wie wir Ihre SEO auf das nächste Level bringen.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Kostenloses Erstgespräch vereinbaren
            </Link>
          </div>
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
