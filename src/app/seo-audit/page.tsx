import type { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";
import Link from "next/link";
import AuditMockup from "./AuditMockup";

export const metadata: Metadata = {
  title: "SEO Audit | SeoForge - Ihre SEO Agentur",
  description: "Umfassender SEO Audit von SeoForge. Detaillierte Website-Analyse mit konkreten Handlungsempfehlungen.",
};

export default function SeoAuditPage() {
  return (
    <SubpageLayout>
      {/* Hero Section - Centered */}
      <section className="bg-offwhite border-b border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Professionelle Website-Analyse
            </div>

            {/* Headline */}
            <h1 className="hero-title mb-6 font-[family-name:var(--font-heading)] text-4xl lg:text-6xl font-bold tracking-tight text-dark">
              SEO Audit: Ihr Fahrplan zu mehr
              <span className="block bg-gradient-to-br from-primary via-secondary to-primary bg-clip-text text-transparent">
                Sichtbarkeit
              </span>
            </h1>

            {/* Description */}
            <p className="hero-description mb-10 text-lg lg:text-xl text-muted leading-relaxed">
              Erhalten Sie eine detaillierte Analyse Ihrer Website mit konkreten Handlungsempfehlungen.
              Wir prüfen technische SEO-Faktoren, Content-Qualität, Backlink-Profil und mehr.
            </p>

            {/* CTA */}
            <div className="hero-cta mb-16 flex flex-wrap justify-center gap-4">
              <Link
                href="#kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-dark hover:shadow-lg"
              >
                Jetzt Audit anfragen
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-white px-8 py-4 text-base font-semibold text-dark transition-all duration-200 hover:border-primary hover:text-primary"
              >
                Beratungsgespräch
              </Link>
            </div>
          </div>

          {/* Audit Report Mockup - Centered */}
          <AuditMockup />
        </div>
      </section>

      {/* What is an SEO Audit */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">
              Was ist ein SEO Audit?
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Ein SEO Audit ist eine umfassende Analyse Ihrer Website, die alle relevanten Ranking-Faktoren untersucht.
              Wir identifizieren technische Probleme, inhaltliche Schwachstellen und ungenutzte Potenziale.
              Das Ergebnis: Ein klarer Aktionsplan mit priorisierten Handlungsempfehlungen.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Ob Sie Ihre Sichtbarkeit steigern, mehr qualifizierten Traffic generieren oder technische Probleme
              beheben möchten – unser Audit liefert die Grundlage für nachhaltigen SEO-Erfolg.
            </p>
          </div>
        </div>
      </section>

      {/* What We Analyze - 6 Areas */}
      <section className="bg-offwhite border-y border-border py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">
              Was wir analysieren
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted">
              Unser SEO Audit deckt alle wichtigen Bereiche ab, die für Ihren Online-Erfolg entscheidend sind.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Technical SEO */}
            <div className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-primary hover:shadow-lg">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">Technisches SEO</h3>
              <p className="text-muted leading-relaxed">
                Crawlbarkeit, Indexierung, Seitenstruktur, robots.txt, XML-Sitemap,
                Canonical-Tags, strukturierte Daten und mehr.
              </p>
            </div>

            {/* On-Page SEO */}
            <div className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-primary hover:shadow-lg">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">On-Page Optimierung</h3>
              <p className="text-muted leading-relaxed">
                Title-Tags, Meta-Descriptions, Überschriftenstruktur, interne Verlinkung,
                URL-Struktur und Keyword-Optimierung.
              </p>
            </div>

            {/* Content Quality */}
            <div className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-primary hover:shadow-lg">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">Content-Qualität</h3>
              <p className="text-muted leading-relaxed">
                Relevanz, Einzigartigkeit, Lesbarkeit, Textlänge, Multimedia-Elemente,
                Duplicate Content und Content-Lücken.
              </p>
            </div>

            {/* Backlinks */}
            <div className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-primary hover:shadow-lg">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">Backlink-Profil</h3>
              <p className="text-muted leading-relaxed">
                Link-Qualität, Anchor-Texte, toxische Links, Link-Diversität,
                Domain-Authority und Konkurrenz-Analyse.
              </p>
            </div>

            {/* Mobile & UX */}
            <div className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-primary hover:shadow-lg">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">Mobile & User Experience</h3>
              <p className="text-muted leading-relaxed">
                Mobile-Friendliness, Responsive Design, Touch-Elemente,
                Navigationstruktur und Usability.
              </p>
            </div>

            {/* Performance */}
            <div className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-primary hover:shadow-lg">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">Performance & Speed</h3>
              <p className="text-muted leading-relaxed">
                Ladezeiten, Core Web Vitals, Bildoptimierung, Caching,
                Server-Response-Time und Minifizierung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get - Deliverables */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Content */}
            <div>
              <h2 className="mb-6 font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">
                Was Sie erhalten
              </h2>
              <p className="mb-10 text-lg text-muted leading-relaxed">
                Unser SEO Audit liefert Ihnen alle Informationen, die Sie für fundierte
                Entscheidungen und erfolgreiche Optimierungsmaßnahmen benötigen.
              </p>

              <div className="space-y-6">
                {/* Deliverable 1 */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-dark">Detaillierter Audit-Report</h3>
                    <p className="text-muted leading-relaxed">
                      Übersichtliche Dokumentation aller Findings mit Bewertung der Dringlichkeit
                      (kritisch, wichtig, optional) und erwarteter Auswirkung.
                    </p>
                  </div>
                </div>

                {/* Deliverable 2 */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-dark">Priorisierter Aktionsplan</h3>
                    <p className="text-muted leading-relaxed">
                      Konkrete Handlungsempfehlungen sortiert nach Priorität und Aufwand.
                      Quick Wins für schnelle Erfolge werden klar gekennzeichnet.
                    </p>
                  </div>
                </div>

                {/* Deliverable 3 */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-dark">Wettbewerbsanalyse</h3>
                    <p className="text-muted leading-relaxed">
                      Benchmark gegen Ihre Top-3-Konkurrenten mit Identifikation von
                      Schwachstellen und ungenutzten Chancen.
                    </p>
                  </div>
                </div>

                {/* Deliverable 4 */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-dark">Persönliche Beratung</h3>
                    <p className="text-muted leading-relaxed">
                      60-minütiges Gespräch zur Vorstellung der Ergebnisse und Beantwortung
                      aller Ihrer Fragen. Optional: Laufende Umsetzungsbegleitung.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="relative rounded-2xl border-2 border-border bg-white p-8 shadow-xl">
                {/* Document Icon */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-dark">SEO Audit Report</h4>
                    <p className="text-sm text-muted">Ihre-domain.de</p>
                  </div>
                </div>

                {/* Report Sections */}
                <div className="space-y-3">
                  <div className="h-3 w-full rounded-full bg-offwhite" />
                  <div className="h-3 w-3/4 rounded-full bg-offwhite" />
                  <div className="my-4 h-px bg-border" />
                  <div className="h-3 w-full rounded-full bg-offwhite" />
                  <div className="h-3 w-5/6 rounded-full bg-offwhite" />
                  <div className="h-3 w-2/3 rounded-full bg-offwhite" />
                  <div className="my-4 h-px bg-border" />
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-50">
                      <span className="text-2xl font-bold text-green-600">A</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-full rounded-full bg-offwhite" />
                      <div className="h-2 w-3/4 rounded-full bg-offwhite" />
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="mt-6 flex items-center justify-between rounded-lg border border-border bg-offwhite p-4">
                  <span className="text-sm font-semibold text-dark">Vollständiger Report (PDF)</span>
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </div>
              </div>

              {/* Decorative Badge */}
              <div className="absolute -right-4 -top-4 rounded-full border-4 border-white bg-secondary px-4 py-2 shadow-lg">
                <p className="text-sm font-bold text-white">40+ Seiten</p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="kontakt" className="bg-dark py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white">
              Bereit für Ihren SEO Audit?
            </h2>
            <p className="mb-10 text-lg text-white/80 leading-relaxed">
              Lassen Sie uns gemeinsam das volle Potenzial Ihrer Website aufdecken.
              Fordern Sie jetzt ein unverbindliches Angebot an.
            </p>

            {/* Contact Form */}
            <form className="mx-auto max-w-xl">
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Ihr Name"
                  className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 backdrop-blur-sm transition-colors focus:border-primary focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Ihre E-Mail"
                  className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 backdrop-blur-sm transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="url"
                  placeholder="Ihre Website-URL"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 backdrop-blur-sm transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <textarea
                  rows={4}
                  placeholder="Ihre Nachricht (optional)"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 backdrop-blur-sm transition-colors focus:border-primary focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary-dark hover:shadow-xl sm:w-auto"
              >
                Jetzt Audit anfragen
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>

            {/* Trust Elements */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Kostenlose Erstberatung
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Keine Vertragsbindung
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                100% Transparenz
              </div>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
