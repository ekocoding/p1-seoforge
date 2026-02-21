"use client";

import { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";

const metadata = {
  title: "On Page SEO | SeoForge - Ihre SEO Agentur",
  description: "Ganzheitliche On Page SEO Strategie von SeoForge. Bessere Rankings, mehr Traffic und höhere Conversions.",
};

export default function OnPageSeoPage() {
  return (
    <SubpageLayout>
      {/* Centered Hero Section */}
      <section className="py-20 px-6 bg-offwhite">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 mb-6 hero-badge">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-medium text-dark">On Page SEO Strategie</span>
          </div>

          {/* Headline */}
          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark mb-6 hero-title">
            Ganzheitliche{" "}
            <span className="text-primary">On Page SEO</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted max-w-3xl mx-auto mb-12 hero-description">
            Mehr als nur Keywords: Unsere holistische On Page SEO Strategie verbindet Technik, Content und User Experience für nachhaltigen Erfolg.
          </p>

          {/* Holistic SEO Dashboard Mockup - Bird's Eye View Control Center */}
          <div className="max-w-5xl mx-auto hero-dashboard">
            <div className="bg-white rounded-2xl border border-border shadow-2xl p-8">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <div>
                  <h3 className="text-lg font-bold text-dark">SEO Control Center</h3>
                  <p className="text-sm text-muted">Ganzheitliche Übersicht Ihrer On Page Performance</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>
              </div>

              {/* Dashboard Grid - Multiple Small Panels */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Rankings Tracker Panel */}
                <div className="bg-gradient-to-br from-offwhite to-white rounded-xl p-4 border border-border">
                  <div className="text-xs text-muted mb-2">Rankings</div>
                  <div className="text-2xl font-bold text-dark mb-1">247</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>+23 diese Woche</span>
                  </div>
                </div>

                {/* Traffic Panel */}
                <div className="bg-gradient-to-br from-offwhite to-white rounded-xl p-4 border border-border">
                  <div className="text-xs text-muted mb-2">Organischer Traffic</div>
                  <div className="text-2xl font-bold text-dark mb-1">18.4K</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>+34%</span>
                  </div>
                </div>

                {/* CTR Panel */}
                <div className="bg-gradient-to-br from-offwhite to-white rounded-xl p-4 border border-border">
                  <div className="text-xs text-muted mb-2">Durchschn. CTR</div>
                  <div className="text-2xl font-bold text-dark mb-1">4.8%</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>+1.2%</span>
                  </div>
                </div>

                {/* Page Speed Panel */}
                <div className="bg-gradient-to-br from-offwhite to-white rounded-xl p-4 border border-border">
                  <div className="text-xs text-muted mb-2">Page Speed</div>
                  <div className="text-2xl font-bold text-dark mb-1">94</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>

              {/* Main Charts Row */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Traffic Graph */}
                <div className="bg-gradient-to-br from-offwhite to-white rounded-xl p-4 border border-border">
                  <div className="text-sm font-semibold text-dark mb-4">Traffic Entwicklung</div>
                  <div className="h-32 flex items-end justify-between gap-1">
                    {[45, 52, 48, 65, 71, 68, 82, 78, 88, 92, 87, 95].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted">
                    <span>Jan</span>
                    <span>Dez</span>
                  </div>
                </div>

                {/* Keyword Positions */}
                <div className="bg-gradient-to-br from-offwhite to-white rounded-xl p-4 border border-border">
                  <div className="text-sm font-semibold text-dark mb-4">Top Keyword Positionen</div>
                  <div className="space-y-3">
                    {[
                      { keyword: "SEO Agentur München", pos: 2, change: "+3" },
                      { keyword: "On Page Optimierung", pos: 1, change: "+2" },
                      { keyword: "Technisches SEO", pos: 4, change: "+1" },
                      { keyword: "Content Marketing", pos: 3, change: "0" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-dark truncate flex-1">{item.keyword}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-primary">#{item.pos}</span>
                          <span className="text-xs text-green-600">{item.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Status Panels */}
              <div className="grid grid-cols-3 gap-4">
                {/* Technical Health */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-semibold text-dark">Technisch</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">98%</div>
                  <div className="text-xs text-muted">Health Score</div>
                </div>

                {/* Content Quality */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-xs font-semibold text-dark">Content</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">A+</div>
                  <div className="text-xs text-muted">Qualität</div>
                </div>

                {/* UX Score */}
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-semibold text-dark">User Experience</span>
                  </div>
                  <div className="text-lg font-bold text-purple-600">9.2</div>
                  <div className="text-xs text-muted">UX Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is On Page SEO Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-dark mb-6 text-center">
            Was ist On Page SEO?
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted text-lg leading-relaxed mb-6">
              On Page SEO ist die <strong className="text-dark">ganzheitliche strategische Ausrichtung</strong> Ihrer Website für Suchmaschinen und Nutzer. Es geht über die reine On Page Optimierung (einzelne technische Anpassungen) hinaus und umfasst alle Faktoren, die Sie direkt auf Ihrer Website kontrollieren können.
            </p>
            <p className="text-muted text-lg leading-relaxed mb-6">
              Während <em>On Page Optimierung</em> sich auf spezifische Maßnahmen wie Meta-Tags, Überschriften oder interne Verlinkung konzentriert, bezeichnet <em>On Page SEO</em> die übergeordnete Strategie, die technische Exzellenz, hochwertige Inhalte und optimale User Experience vereint.
            </p>
            <div className="bg-offwhite border-l-4 border-primary p-6 rounded-r-lg">
              <p className="text-dark font-semibold mb-2">Der Unterschied im Überblick:</p>
              <ul className="space-y-2 text-muted">
                <li><strong className="text-dark">On Page Optimierung:</strong> Einzelne technische Anpassungen (z.B. Title-Tags, H1-Überschriften)</li>
                <li><strong className="text-dark">On Page SEO:</strong> Ganzheitliche Strategie (Technik + Content + UX)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Holistic Approach Section */}
      <section className="py-20 px-6 bg-offwhite">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-dark mb-6">
              Unser ganzheitlicher Ansatz
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Erfolgreiche On Page SEO basiert auf drei gleichwertigen Säulen. Nur wenn alle drei optimal harmonieren, entsteht nachhaltiger Erfolg.
            </p>
          </div>

          {/* Triangle Visualization */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative">
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm text-center px-4">On Page SEO</span>
                </div>
              </div>

              {/* Triangle Points */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-40 md:pt-0">
                {/* Technical SEO */}
                <div className="bg-white rounded-2xl p-8 border border-border shadow-lg text-center md:mt-0 animate-fade-up">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-3">Technisches SEO</h3>
                  <p className="text-muted">Schnelle Ladezeiten, saubere Code-Struktur, Mobile-Optimierung und technische Perfektion als Fundament.</p>
                </div>

                {/* Content Excellence */}
                <div className="bg-white rounded-2xl p-8 border border-border shadow-lg text-center md:mt-20 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-3">Content Excellence</h3>
                  <p className="text-muted">Hochwertige, relevante Inhalte mit klarer Keyword-Strategie und Mehrwert für Ihre Zielgruppe.</p>
                </div>

                {/* User Experience */}
                <div className="bg-white rounded-2xl p-8 border border-border shadow-lg text-center md:mt-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-3">User Experience</h3>
                  <p className="text-muted">Intuitive Navigation, klare Struktur und optimale Nutzererfahrung für höhere Conversion-Raten.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why All Three Matter */}
          <div className="bg-white rounded-2xl p-8 border border-border max-w-3xl mx-auto">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-4 text-center">
              Warum alle drei Säulen wichtig sind
            </h3>
            <p className="text-muted text-center mb-6">
              Google bewertet Websites ganzheitlich. Eine technisch perfekte Seite mit schlechtem Content rankt nicht. Großartiger Content auf einer langsamen Website verliert Nutzer. Die beste UX hilft nichts, wenn Suchmaschinen die Seite nicht crawlen können.
            </p>
            <div className="text-center">
              <span className="inline-block bg-gradient-to-r from-primary to-secondary text-white font-bold px-6 py-3 rounded-full">
                Technik + Content + UX = Nachhaltiger SEO-Erfolg
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-dark mb-6">
              Vorteile ganzheitlicher On Page SEO
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Unsere holistische Strategie bringt messbare Ergebnisse in allen relevanten Bereichen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="bg-offwhite rounded-2xl p-8 border border-border animate-fade-up">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-3">
                    Bessere Rankings
                  </h3>
                  <p className="text-muted leading-relaxed">
                    Durch die Optimierung aller Ranking-Faktoren erreichen Sie Top-Positionen bei Google und steigern Ihre Sichtbarkeit nachhaltig.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-offwhite rounded-2xl p-8 border border-border animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-3">
                    Mehr qualifizierter Traffic
                  </h3>
                  <p className="text-muted leading-relaxed">
                    Gezielte Keyword-Strategie und optimierte Inhalte ziehen genau die Besucher an, die nach Ihren Produkten und Dienstleistungen suchen.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-offwhite rounded-2xl p-8 border border-border animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-3">
                    Höhere Conversion-Rate
                  </h3>
                  <p className="text-muted leading-relaxed">
                    Optimale User Experience und relevante Inhalte führen zu mehr Anfragen, Käufen und Conversions auf Ihrer Website.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-offwhite rounded-2xl p-8 border border-border animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-3">
                    Nachhaltiger ROI
                  </h3>
                  <p className="text-muted leading-relaxed">
                    On Page SEO ist eine langfristige Investition. Einmal richtig umgesetzt, profitieren Sie dauerhaft von besserer Performance und niedrigeren Kundengewinnungskosten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-dark via-dark to-[#2A2A2A] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-6">
            Bereit für ganzheitliche On Page SEO?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam eine umfassende On Page SEO Strategie entwickeln, die alle drei Säulen optimal vereint.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/kontakt"
              className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Kostenlose SEO-Analyse anfordern
            </a>
            <a
              href="/leistungen"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              Alle Leistungen ansehen
            </a>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
