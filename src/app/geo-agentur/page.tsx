import type { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";
import Link from "next/link";
import GeoMockup from "./GeoMockup";

export const metadata: Metadata = {
  title: "GEO Agentur | SeoForge - Generative Engine Optimization",
  description: "Ihre GEO Agentur für Sichtbarkeit in ChatGPT, Gemini & Perplexity. Generative Engine Optimization für das KI-Zeitalter.",
};

export default function GeoAgenturPage() {
  return (
    <SubpageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-offwhite border-b border-border min-h-[600px] flex items-center">
        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border mb-6 hero-badge">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm font-medium text-dark">Das neue SEO</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-dark mb-6 hero-title">
                GEO Agentur für{" "}
                <span className="text-primary">KI-Sichtbarkeit</span>
              </h1>

              <p className="text-xl text-muted mb-6 leading-relaxed hero-description">
                Generative Engine Optimization ist die Evolution klassischer SEO. Während traditionelle 
                Optimierung auf Google-Rankings abzielt, positioniert GEO Ihre Marke direkt in den 
                Antworten von KI-Systemen wie ChatGPT, Gemini und Perplexity.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                {[
                  "Sichtbar in KI-Antworten",
                  "Mehr Marken-Erwähnungen", 
                  "Zukunftssichere Strategie"
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-muted">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 hero-cta">
                <Link
                  href="/kontakt"
                  className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  GEO-Audit anfragen
                </Link>
                <Link
                  href="#was-ist-geo"
                  className="px-8 py-4 bg-white border border-border text-dark rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>

            {/* Right Side - AI Chat Mockup */}
            <div className="flex justify-center lg:justify-end">
              <GeoMockup />
            </div>
          </div>
        </div>
      </section>

      {/* What is GEO */}
      <section id="was-ist-geo" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Was ist GEO?
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </div>

          <div className="prose prose-lg max-w-none animate-fade-up">
            <p className="text-lg text-muted leading-relaxed mb-6">
              <strong className="text-dark">Generative Engine Optimization (GEO)</strong> ist die Weiterentwicklung 
              klassischer SEO für das KI-Zeitalter. Während traditionelle Suchmaschinenoptimierung auf Google-Rankings 
              abzielt, optimiert GEO für Antwortsysteme wie ChatGPT, Google Gemini und Perplexity.
            </p>

            <p className="text-lg text-muted leading-relaxed mb-6">
              Die Spielregeln ändern sich: Nutzer fragen nicht mehr nur Google, sondern direkt KI-Assistenten. 
              Wer hier nicht als vertrauenswürdige Quelle zitiert wird, verliert Sichtbarkeit. 
              Gartner prognostiziert einen Rückgang traditioneller Suche um 25% bis 2026.
            </p>

            {/* SEO vs GEO Table */}
            <div className="bg-offwhite border border-border rounded-xl p-8 my-8">
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-6">
                SEO vs GEO: Die Unterschiede
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-dark font-medium">Aspekt</th>
                      <th className="pb-3 text-dark font-medium">SEO</th>
                      <th className="pb-3 text-dark font-medium">GEO</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted">
                    <tr className="border-b border-border/50">
                      <td className="py-3">Ziel</td>
                      <td className="py-3">Google-Ranking</td>
                      <td className="py-3 text-primary">KI-Antworten</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3">Fokus</td>
                      <td className="py-3">Keywords, Backlinks</td>
                      <td className="py-3 text-primary">Semantik, Kontext</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3">Plattformen</td>
                      <td className="py-3">Google, Bing</td>
                      <td className="py-3 text-primary">ChatGPT, Gemini, Perplexity</td>
                    </tr>
                    <tr>
                      <td className="py-3">Erfolgsmetrik</td>
                      <td className="py-3">Rankings, Traffic</td>
                      <td className="py-3 text-primary">Zitationen, Erwähnungen</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-offwhite">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Unsere GEO-Services
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Von der Analyse bis zur Umsetzung: Wir machen Ihre Marke KI-sichtbar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                KI-Sichtbarkeits-Analyse
              </h3>
              <p className="text-muted leading-relaxed">
                Wir analysieren, wo Ihre Marke aktuell in ChatGPT, Gemini & Co. auftaucht 
                – und wo nicht.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                Content-Optimierung
              </h3>
              <p className="text-muted leading-relaxed">
                Strukturierte, semantisch reiche Inhalte für LLMs. FAQs, Snippets 
                und Expertise-Content.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                Entitäten-Optimierung
              </h3>
              <p className="text-muted leading-relaxed">
                Klare Entitätsdefinitionen, Schema-Markup und semantische Struktur 
                für KI-Verständnis.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                Public Seeding
              </h3>
              <p className="text-muted leading-relaxed">
                Präsenz auf Plattformen, die KI-Systeme crawlen: Medium, LinkedIn, 
                Reddit und Fachforen.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                Monitoring & Reporting
              </h3>
              <p className="text-muted leading-relaxed">
                Kontinuierliches Tracking Ihrer KI-Sichtbarkeit mit spezialisierten 
                GEO-Tools.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                E-Commerce GEO
              </h3>
              <p className="text-muted leading-relaxed">
                Optimierung für ChatGPT Shopping und KI-Produktsuchen. Sichtbarkeit 
                direkt im Kaufprozess.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Unser GEO-Prozess
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Vier Schritte zur KI-Sichtbarkeit.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-8 items-start animate-fade-up">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-[family-name:var(--font-heading)]">
                    1
                  </div>
                </div>
                <div className="flex-grow bg-offwhite rounded-xl p-8 border border-border">
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-4">
                    KI-Sichtbarkeits-Audit
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Wir analysieren, wo Ihre Marke aktuell in ChatGPT, Gemini, Perplexity 
                    und anderen KI-Systemen auftaucht. Wo wird Ihr Unternehmen zitiert? 
                    Wo fehlen Sie?
                  </p>
                  <ul className="space-y-2 text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Identifikation von Zitationsmöglichkeiten</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Wettbewerbsanalyse im KI-Bereich</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Gap-Analyse für relevante Entitäten</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-8 items-start animate-fade-up">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-2xl font-[family-name:var(--font-heading)]">
                    2
                  </div>
                </div>
                <div className="flex-grow bg-offwhite rounded-xl p-8 border border-border">
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-4">
                    Content-Strategie
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Entwicklung einer GEO-Content-Strategie mit semantisch reichen Inhalten, 
                    strukturierten Daten und klarer Entitätsdefinition.
                  </p>
                  <ul className="space-y-2 text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>Entitätsklärung und Knowledge Graph Optimierung</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>Snippet-optimierte Content-Strukturen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>FAQ- und Expertise-Content Planung</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-8 items-start animate-fade-up">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-[family-name:var(--font-heading)]">
                    3
                  </div>
                </div>
                <div className="flex-grow bg-offwhite rounded-xl p-8 border border-border">
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-4">
                    Umsetzung & Seeding
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Technische Implementierung, Content-Erstellung und strategisches 
                    Seeding auf Plattformen mit hohem KI-Trust.
                  </p>
                  <ul className="space-y-2 text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Schema-Markup und strukturierte Daten</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Public Seeding auf relevanten Plattformen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Interne Verlinkung und semantische Struktur</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-8 items-start animate-fade-up">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-2xl font-[family-name:var(--font-heading)]">
                    4
                  </div>
                </div>
                <div className="flex-grow bg-offwhite rounded-xl p-8 border border-border">
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-4">
                    Monitoring & Optimierung
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Kontinuierliches Tracking Ihrer KI-Sichtbarkeit und iterative 
                    Optimierung basierend auf KI-Antwortmustern.
                  </p>
                  <ul className="space-y-2 text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>Regelmäßiges KI-Sichtbarkeits-Reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>Analyse von Zitations- und Erwähnungsmustern</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>Strategische Anpassung an neue KI-Modelle</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] mb-6">
              Bereit für KI-Sichtbarkeit?
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Lassen Sie uns gemeinsam Ihre GEO-Strategie entwickeln. 
              Sichtbar in ChatGPT, Gemini, Perplexity & Co.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/kontakt"
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Kostenloses GEO-Audit
              </Link>
              <Link
                href="/seo-beratung"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      </section>
    </SubpageLayout>
  );
}
