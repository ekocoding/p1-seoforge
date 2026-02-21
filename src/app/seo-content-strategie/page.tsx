import type { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Content Strategie | SeoForge - Ihre SEO Agentur",
  description: "Datengetriebene SEO Content Strategie von SeoForge. Content-Planung die Ihre Zielgruppe erreicht und organischen Traffic aufbaut.",
};

export default function SeoContentStrategiePage() {
  return (
    <SubpageLayout>
      {/* Split-Screen Hero */}
      <section className="relative overflow-hidden bg-offwhite border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[600px] py-16 lg:py-20">
            {/* Left Side - Content */}
            <div className="space-y-8 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border hero-badge">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm font-medium text-dark">Content Strategie</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-dark leading-tight hero-title">
                SEO Content Strategie
              </h1>

              <p className="text-lg md:text-xl text-muted leading-relaxed max-w-xl hero-description">
                Datengetriebene Content-Planung, die Ihre Zielgruppe erreicht und organischen Traffic nachhaltig aufbaut. Von Topic Clusters bis zur redaktionellen Umsetzung.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 hero-cta">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Strategie-Gespräch buchen
                </Link>
                <Link
                  href="/leistungen"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border text-dark font-medium hover:bg-white transition-all duration-300"
                >
                  Alle Leistungen
                </Link>
              </div>
            </div>

            {/* Right Side - Content Calendar Mockup */}
            <div className="relative hero-dashboard">
              <div className="bg-white rounded-2xl shadow-2xl border border-border p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-dark">Content Kalender</h3>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-offwhite transition-colors">
                      <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="text-sm font-medium text-dark">März 2026</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-offwhite transition-colors">
                      <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="space-y-4">
                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
                      <div key={day} className="text-xs font-medium text-muted py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Week 1 */}
                    <div className="aspect-square rounded-lg border border-border bg-offwhite opacity-50"></div>
                    <div className="aspect-square rounded-lg border border-border bg-offwhite opacity-50"></div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">1</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">2</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">3</div>
                      <div className="w-full h-2 rounded bg-primary opacity-80 mb-0.5"></div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">4</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">5</div>
                    </div>

                    {/* Week 2 */}
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">6</div>
                      <div className="w-full h-2 rounded bg-secondary opacity-80 mb-0.5"></div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">7</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">8</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">9</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">10</div>
                      <div className="w-full h-2 rounded bg-primary opacity-80 mb-0.5"></div>
                      <div className="w-full h-2 rounded bg-secondary opacity-80"></div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">11</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">12</div>
                    </div>

                    {/* Week 3 */}
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">13</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">14</div>
                      <div className="w-full h-2 rounded bg-primary opacity-80"></div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">15</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">16</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">17</div>
                      <div className="w-full h-2 rounded bg-secondary opacity-80 mb-0.5"></div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">18</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">19</div>
                    </div>

                    {/* Week 4 */}
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">20</div>
                      <div className="w-full h-2 rounded bg-primary opacity-80 mb-0.5"></div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">21</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">22</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">23</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">24</div>
                      <div className="w-full h-2 rounded bg-primary opacity-80 mb-0.5"></div>
                      <div className="w-full h-2 rounded bg-secondary opacity-80"></div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">25</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">26</div>
                    </div>

                    {/* Week 5 */}
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">27</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">28</div>
                      <div className="w-full h-2 rounded bg-secondary opacity-80"></div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">29</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">30</div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-white p-1">
                      <div className="text-xs text-muted mb-1">31</div>
                      <div className="w-full h-2 rounded bg-primary opacity-80"></div>
                    </div>
                    <div className="aspect-square rounded-lg border border-border bg-offwhite opacity-50"></div>
                    <div className="aspect-square rounded-lg border border-border bg-offwhite opacity-50"></div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary"></div>
                    <span className="text-xs text-muted">Blog-Artikel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-secondary"></div>
                    <span className="text-xs text-muted">Landing Page</span>
                  </div>
                </div>

                {/* Topic Clusters Sidebar Preview */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-xs font-medium text-muted mb-3">Aktive Topic Clusters</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-xs text-dark">SEO Grundlagen</span>
                      <span className="ml-auto text-xs text-muted">12 Keywords</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      <span className="text-xs text-dark">Technical SEO</span>
                      <span className="ml-auto text-xs text-muted">8 Keywords</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-muted opacity-30"></div>
                      <span className="text-xs text-muted">Link Building</span>
                      <span className="ml-auto text-xs text-muted">6 Keywords</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary opacity-10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* What is SEO Content Strategie */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Was ist SEO Content Strategie?
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted leading-relaxed mb-6">
              Eine SEO Content Strategie ist der langfristige Plan, der festlegt, welche Inhalte Sie erstellen, um Ihre Zielgruppe zu erreichen und in Suchmaschinen sichtbar zu werden. Sie verbindet Keyword-Recherche, Nutzerintention und redaktionelle Planung zu einem kohärenten System.
            </p>

            <p className="text-muted leading-relaxed mb-6">
              Statt zufälliger Blog-Artikel entwickeln wir eine datengetriebene Content-Architektur: Topic Clusters bilden thematische Hubs, die durch strategisch platzierte interne Verlinkung Ihre Domain Authority stärken. Jedes Content-Piece erfüllt eine klare Funktion in der Customer Journey.
            </p>

            <p className="text-muted leading-relaxed">
              Das Ergebnis: Organischer Traffic, der kontinuierlich wächst. Inhalte, die ranken und konvertieren. Und ein messbarer ROI für Ihre Content-Investitionen.
            </p>
          </div>
        </div>
      </section>

      {/* Framework - 4 Pillars */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Unser Content Strategy Framework
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Vier Säulen, die Ihre Content-Strategie zum Erfolg führen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">Topic Clusters</h3>
              <p className="text-muted leading-relaxed">
                Wir strukturieren Ihre Inhalte in thematische Cluster: Ein Pillar-Content als Hub, umgeben von spezifischen Cluster-Artikeln, die interne Authority aufbauen.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-secondary bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">Keyword Mapping</h3>
              <p className="text-muted leading-relaxed">
                Jedes Keyword wird einer spezifischen URL zugeordnet. Search Intent-Analyse stellt sicher, dass Ihr Content die Nutzererwartung trifft und rankt.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">Content Calendar</h3>
              <p className="text-muted leading-relaxed">
                Redaktionsplanung mit System: Priorisierung nach Business-Impact, Saisonalität und Quick Wins. Jeder Content-Piece hat ein klares Ziel und KPIs.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-secondary bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">Performance Tracking</h3>
              <p className="text-muted leading-relaxed">
                Wir messen, was zählt: Rankings, organischer Traffic, Engagement-Metriken und Conversions. Monatliche Reports zeigen ROI und Optimierungspotenziale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Types Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Content-Formate, die wir planen
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Von schnellen Wins bis zu langfristigen Authority-Buildern
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Content Type 1 */}
            <div className="group">
              <div className="bg-offwhite rounded-xl p-8 border border-border hover:border-primary transition-all duration-300 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary bg-opacity-10 px-3 py-1 rounded-full">
                    SEO-Pillar
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-3">Pillar Pages</h3>
                <p className="text-muted leading-relaxed">
                  Umfassende Hub-Seiten zu Ihren Kern-Themen. 3000+ Wörter, die alle Aspekte abdecken und als Anker für Ihr Topic Cluster dienen.
                </p>
              </div>
            </div>

            {/* Content Type 2 */}
            <div className="group">
              <div className="bg-offwhite rounded-xl p-8 border border-border hover:border-primary transition-all duration-300 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary bg-opacity-10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-secondary bg-secondary bg-opacity-10 px-3 py-1 rounded-full">
                    Authority
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-3">Blog-Artikel</h3>
                <p className="text-muted leading-relaxed">
                  SEO-optimierte Artikel, die spezifische Long-Tail-Keywords targetieren. 1500-2000 Wörter, die Nutzer informieren und zur Pillar Page verlinken.
                </p>
              </div>
            </div>

            {/* Content Type 3 */}
            <div className="group">
              <div className="bg-offwhite rounded-xl p-8 border border-border hover:border-primary transition-all duration-300 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary bg-opacity-10 px-3 py-1 rounded-full">
                    Conversion
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-3">Landing Pages</h3>
                <p className="text-muted leading-relaxed">
                  Conversion-optimierte Seiten für kommerzielle Keywords. Klare Value Props, Trust-Signale und CTAs, die aus Traffic Leads machen.
                </p>
              </div>
            </div>

            {/* Content Type 4 */}
            <div className="group">
              <div className="bg-offwhite rounded-xl p-8 border border-border hover:border-primary transition-all duration-300 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary bg-opacity-10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-secondary bg-secondary bg-opacity-10 px-3 py-1 rounded-full">
                    Quick Win
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-3">FAQ-Seiten</h3>
                <p className="text-muted leading-relaxed">
                  Strukturierte Antworten auf häufige Fragen. Featured Snippet-optimiert, um Position 0 in den SERPs zu erobern.
                </p>
              </div>
            </div>

            {/* Content Type 5 */}
            <div className="group">
              <div className="bg-offwhite rounded-xl p-8 border border-border hover:border-primary transition-all duration-300 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary bg-opacity-10 px-3 py-1 rounded-full">
                    Data-Driven
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-3">Case Studies</h3>
                <p className="text-muted leading-relaxed">
                  Datengetriebene Erfolgsgeschichten mit messbaren Ergebnissen. Bauen Trust auf und targetieren Long-Tail-Keywords mit hoher Intent.
                </p>
              </div>
            </div>

            {/* Content Type 6 */}
            <div className="group">
              <div className="bg-offwhite rounded-xl p-8 border border-border hover:border-primary transition-all duration-300 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary bg-opacity-10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-secondary bg-secondary bg-opacity-10 px-3 py-1 rounded-full">
                    Linkable Asset
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-3">Guides & Tools</h3>
                <p className="text-muted leading-relaxed">
                  Ultimative Guides und interaktive Tools, die Backlinks anziehen. Evergreen-Content, der langfristig Traffic und Authority bringt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white bg-opacity-10 border border-white border-opacity-20 mb-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-medium text-white">Strategie-Gespräch</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-white mb-6">
            Bereit für Content, der organischen Traffic bringt?
          </h2>

          <p className="text-lg text-white text-opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Lassen Sie uns Ihre Content-Strategie entwickeln. Im kostenlosen Erstgespräch analysieren wir Ihre Zielgruppe, Wettbewerber und Quick Win-Potenziale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Jetzt Strategie-Gespräch buchen
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-white border-opacity-20 text-white font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-300"
            >
              Alle Leistungen ansehen
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white border-opacity-10">
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">90%</div>
                <div className="text-sm text-white text-opacity-60">Mehr organischer Traffic im Durchschnitt</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">3-6</div>
                <div className="text-sm text-white text-opacity-60">Monate bis zu messbaren Ergebnissen</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-white text-opacity-60">Content arbeitet für Sie</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
