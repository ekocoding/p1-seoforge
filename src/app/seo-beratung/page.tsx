import type { Metadata } from "next";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";
import DashboardMockup from "./DashboardMockup";

export const metadata: Metadata = {
  title: "SEO Beratung | SeoForge - Ihre SEO Agentur",
  description: "Professionelle SEO Beratung von SeoForge. Individuelle Strategieentwicklung und kompetente Beratung für nachhaltige Online-Sichtbarkeit.",
};

export default function SEOBeratungPage() {
  return (
    <SubpageLayout>
      {/* Split-Screen Hero */}
      <section className="bg-offwhite border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-muted">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Strategische SEO Beratung
              </div>

              <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl lg:text-5xl xl:text-6xl font-bold text-dark leading-tight">
                SEO Beratung für{" "}
                <span className="text-primary">nachhaltigen Erfolg</span>
              </h1>

              <p className="hero-description text-lg lg:text-xl text-muted leading-relaxed">
                Von der Analyse bis zur Umsetzung: Unsere SEO Experten entwickeln mit Ihnen eine individuelle Strategie, die zu messbaren Ergebnissen führt.
              </p>

              <div className="hero-cta flex flex-wrap gap-4 pt-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200"
                >
                  Jetzt beraten lassen
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="#approach"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-border text-dark rounded-lg font-medium hover:border-primary transition-colors duration-200"
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>

            {/* Right: Consultation Dashboard Mockup */}
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* What is SEO Beratung */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Was ist SEO Beratung?
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted leading-relaxed mb-6">
              SEO Beratung ist weit mehr als nur technische Optimierung. Es ist die strategische Grundlage für Ihren Online-Erfolg. Unsere SEO-Experten analysieren Ihre Website, Ihre Branche und Ihre Wettbewerber, um eine maßgeschneiderte Strategie zu entwickeln, die nachhaltige Ergebnisse liefert.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Durch professionelle Beratung erhalten Sie nicht nur konkrete Handlungsempfehlungen, sondern auch das notwendige Know-how, um langfristig erfolgreich zu sein. Wir begleiten Sie von der ersten Analyse bis zur erfolgreichen Umsetzung und darüber hinaus.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-offwhite border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-2">Ganzheitlich</h3>
                <p className="text-sm text-muted">Alle SEO-Bereiche werden betrachtet</p>
              </div>
              <div className="bg-offwhite border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-2">Individuell</h3>
                <p className="text-sm text-muted">Auf Ihre Ziele zugeschnitten</p>
              </div>
              <div className="bg-offwhite border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-2">Nachhaltig</h3>
                <p className="text-sm text-muted">Langfristige Erfolge sichern</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section id="approach" className="py-16 lg:py-24 bg-offwhite border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Unser Beratungsansatz
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              In drei strukturierten Schritten zur erfolgreichen SEO-Strategie
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 font-[family-name:var(--font-heading)]">
                  1
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">
                  Analyse & Audit
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  Wir analysieren Ihre aktuelle SEO-Performance, identifizieren Stärken und Schwächen und bewerten Ihre Marktposition im Vergleich zum Wettbewerb.
                </p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Technisches SEO-Audit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Keyword-Analyse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Wettbewerbsanalyse</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative md:mt-8">
              <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 font-[family-name:var(--font-heading)]">
                  2
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">
                  Strategieentwicklung
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  Basierend auf den Erkenntnissen entwickeln wir eine maßgeschneiderte SEO-Strategie mit klaren Zielen, Maßnahmen und Timelines.
                </p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priorisierung von Maßnahmen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ressourcenplanung</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>KPI-Definition</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 font-[family-name:var(--font-heading)]">
                  3
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">
                  Begleitung & Optimierung
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  Wir begleiten Sie bei der Umsetzung, überwachen kontinuierlich die Ergebnisse und optimieren die Strategie basierend auf Performance-Daten.
                </p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Regelmäßiges Monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Monatliche Reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Kontinuierliche Anpassungen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Ihre Vorteile
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Warum professionelle SEO Beratung den Unterschied macht
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-3">Höhere Rankings</h3>
              <p className="text-sm text-muted leading-relaxed">
                Verbesserte Sichtbarkeit in Suchmaschinen durch datengetriebene Strategien
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-3">Mehr Effizienz</h3>
              <p className="text-sm text-muted leading-relaxed">
                Fokus auf Maßnahmen mit dem größten ROI – keine Ressourcenverschwendung
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-3">Expertenwissen</h3>
              <p className="text-sm text-muted leading-relaxed">
                Profitieren Sie von jahrelanger Erfahrung und aktuellstem SEO-Know-how
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-3">Zukunftssicher</h3>
              <p className="text-sm text-muted leading-relaxed">
                Strategien, die auch bei Google-Updates funktionieren und langfristig wirken
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-dark via-dark-light to-dark text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold mb-6">
            Bereit für eine erfolgreiche SEO-Strategie?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt ein kostenloses Erstgespräch und erfahren Sie, wie wir Ihre Online-Sichtbarkeit nachhaltig verbessern können.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Kostenloses Erstgespräch
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors duration-200"
            >
              Alle Leistungen
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-white/70">Transparenz</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">15+</div>
              <div className="text-sm text-white/70">Jahre Erfahrung</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-white/70">Erfolgreiche Projekte</div>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
