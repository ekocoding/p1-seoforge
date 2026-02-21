import type { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";
import Link from "next/link";
import EditorMockup from "./EditorMockup";

export const metadata: Metadata = {
  title: "SEO Texte | SeoForge - Ihre SEO Agentur",
  description: "Professionelle SEO Texte von SeoForge. Suchmaschinenoptimierte Inhalte, die Google und Ihre Zielgruppe überzeugen.",
};

export default function SeoTextePage() {
  return (
    <SubpageLayout>
      {/* Split-Screen Hero Section */}
      <section className="relative overflow-hidden bg-offwhite border-b border-border">
        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border mb-6 hero-badge">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium text-dark">Content-Strategie</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-dark mb-6 hero-title">
                SEO Texte, die{" "}
                <span className="text-primary">überzeugen</span>
              </h1>

              <p className="text-xl text-muted mb-8 leading-relaxed hero-description">
                Professionelle SEO Texte, die sowohl Google als auch Ihre Zielgruppe begeistern.
                Wir erstellen suchmaschinenoptimierte Inhalte mit echtem Mehrwert.
              </p>

              <div className="flex flex-wrap gap-4 hero-cta">
                <Link
                  href="/kontakt"
                  className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Beratung anfragen
                </Link>
                <Link
                  href="#process"
                  className="px-8 py-4 bg-white border border-border text-dark rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Unser Prozess
                </Link>
              </div>
            </div>

            {/* Right Side - Content Editor Mockup */}
            <EditorMockup />
          </div>
        </div>
      </section>

      {/* What are SEO Texte */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Was sind SEO Texte?
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </div>

          <div className="prose prose-lg max-w-none animate-fade-up">
            <p className="text-lg text-muted leading-relaxed mb-6">
              SEO Texte sind speziell optimierte Inhalte, die zwei Ziele gleichzeitig verfolgen:
              Sie bieten echten Mehrwert für Ihre Leser und sind gleichzeitig für Suchmaschinen wie Google optimal aufbereitet.
            </p>

            <p className="text-lg text-muted leading-relaxed mb-6">
              Anders als gewöhnliche Texte berücksichtigen SEO Texte relevante Keywords, semantische Zusammenhänge,
              Nutzerintentionen und technische Faktoren wie Überschriftenstruktur, Meta-Daten und interne Verlinkung.
            </p>

            <div className="bg-offwhite border border-border rounded-xl p-8 my-8">
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-4">
                Warum sind SEO Texte wichtig?
              </h3>
              <ul className="space-y-3 text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong className="text-dark">Bessere Rankings:</strong> Optimierte Inhalte ranken höher in den Suchergebnissen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong className="text-dark">Mehr Traffic:</strong> Höhere Platzierungen führen zu mehr organischen Besuchern</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong className="text-dark">Höhere Conversions:</strong> Zielgerichtete Inhalte sprechen die richtige Zielgruppe an</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong className="text-dark">Langfristige Wirkung:</strong> Gute Inhalte wirken nachhaltig und bringen dauerhaft Traffic</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Content */}
      <section className="py-24 bg-offwhite">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Unsere Content-Formate
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Von Blog-Artikeln bis zu Produktbeschreibungen – wir erstellen jeden Content-Typ mit SEO-Expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Blog Posts */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                Blog-Artikel
              </h3>
              <p className="text-muted leading-relaxed">
                Informative, gut recherchierte Artikel, die Expertise zeigen und organischen Traffic generieren.
              </p>
            </div>

            {/* Landing Pages */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                Landing Pages
              </h3>
              <p className="text-muted leading-relaxed">
                Conversion-optimierte Seiten, die auf spezifische Keywords und Nutzerintentionen ausgerichtet sind.
              </p>
            </div>

            {/* Product Descriptions */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                Produkttexte
              </h3>
              <p className="text-muted leading-relaxed">
                Überzeugende Produktbeschreibungen, die verkaufen und gleichzeitig für Suchmaschinen optimiert sind.
              </p>
            </div>

            {/* Category Pages */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                Kategorietexte
              </h3>
              <p className="text-muted leading-relaxed">
                SEO-optimierte Texte für Kategorieseiten, die Struktur schaffen und Rankings verbessern.
              </p>
            </div>

            {/* Service Pages */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                Leistungsseiten
              </h3>
              <p className="text-muted leading-relaxed">
                Detaillierte Service-Beschreibungen, die Kompetenz vermitteln und Vertrauen aufbauen.
              </p>
            </div>

            {/* Guides & How-Tos */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-shadow animate-fade-up">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-3">
                Ratgeber & Anleitungen
              </h3>
              <p className="text-muted leading-relaxed">
                Ausführliche Guides, die komplexe Themen verständlich erklären und als Linkmagnet fungieren.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Writing Process */}
      <section id="process" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Unser Schreibprozess
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              In vier strukturierten Schritten erstellen wir SEO Texte, die Rankings und Conversions steigern.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-8 items-start animate-fade-up">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold font-[family-name:var(--font-heading)]">
                    1
                  </div>
                </div>
                <div className="flex-grow bg-offwhite rounded-xl p-8 border border-border">
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-4">
                    Keyword-Recherche & Analyse
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Wir analysieren Ihre Zielgruppe, identifizieren relevante Keywords mit hohem Potenzial und
                    untersuchen die Suchintention hinter den Begriffen.
                  </p>
                  <ul className="space-y-2 text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Wettbewerbsanalyse der Top-Ranking-Inhalte</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Identifikation von Long-Tail-Keywords</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Semantische Keyword-Cluster-Bildung</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-8 items-start animate-fade-up">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold font-[family-name:var(--font-heading)]">
                    2
                  </div>
                </div>
                <div className="flex-grow bg-offwhite rounded-xl p-8 border border-border">
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-4">
                    Content-Strategie & Briefing
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Basierend auf den Recherche-Ergebnissen entwickeln wir eine Content-Strategie und erstellen
                    ein detailliertes Briefing für unsere Texter.
                  </p>
                  <ul className="space-y-2 text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>Strukturierung der Haupt- und Unterthemen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>Festlegung der Textlänge und Tiefe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>Definition von Tonalität und Ansprache</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-8 items-start animate-fade-up">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold font-[family-name:var(--font-heading)]">
                    3
                  </div>
                </div>
                <div className="flex-grow bg-offwhite rounded-xl p-8 border border-border">
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-4">
                    Texterstellung & SEO-Optimierung
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Unsere erfahrenen Texter erstellen hochwertige Inhalte, die wir parallel auf SEO-Faktoren
                    wie Keyword-Dichte, Lesbarkeit und Struktur optimieren.
                  </p>
                  <ul className="space-y-2 text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Natürliche Integration von Keywords und Synonymen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Optimierung der Überschriftenstruktur (H1-H6)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Erstellung aussagekräftiger Meta-Daten</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-8 items-start animate-fade-up">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold font-[family-name:var(--font-heading)]">
                    4
                  </div>
                </div>
                <div className="flex-grow bg-offwhite rounded-xl p-8 border border-border">
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] text-dark mb-4">
                    Qualitätskontrolle & Übergabe
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">
                    Vor der Übergabe durchläuft jeder Text eine umfassende Qualitätskontrolle und wird
                    final auf alle SEO-Kriterien geprüft.
                  </p>
                  <ul className="space-y-2 text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>Lektorat und Korrekturlesen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>Plagiatsprüfung und Unique-Content-Verifizierung</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">→</span>
                      <span>Finales SEO-Audit mit detaillierten Optimierungsempfehlungen</span>
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
              Bereit für Inhalte, die Rankings steigern?
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Lassen Sie uns gemeinsam SEO Texte erstellen, die nicht nur Google begeistern,
              sondern auch Ihre Zielgruppe überzeugen und zu Conversions führen.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/kontakt"
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Jetzt Content anfragen
              </Link>
              <Link
                href="/leistungen"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Alle Leistungen
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
