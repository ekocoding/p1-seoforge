import type { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";
import DashboardMockup from "./DashboardMockup";

export const metadata: Metadata = {
  title: "SEO Optimierung | SeoForge - Ihre SEO Agentur",
  description: "Professionelle SEO Optimierung von SeoForge. Technische und inhaltliche Optimierung Ihrer Website für Top-Platzierungen.",
};

export default function SeoOptimierungPage() {
  return (
    <SubpageLayout>
      {/* Hero Section - Centered */}
      <section className="relative overflow-hidden bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="animate-fade-up">
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-muted">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              Unsere Kernkompetenz
            </span>
          </div>

          <h1 className="hero-title mt-6 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl lg:text-6xl">
            SEO Optimierung
          </h1>

          <p className="hero-description mx-auto mt-6 max-w-2xl text-lg text-muted">
            Technische Perfektion trifft auf strategische Inhalte. Wir optimieren Ihre Website ganzheitlich für nachhaltigen Erfolg in Suchmaschinen.
          </p>

          {/* SEO Dashboard Mockup */}
          <DashboardMockup />
        </div>
      </section>

      {/* What is SEO Optimierung */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark lg:text-4xl">
                Was ist SEO Optimierung?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                SEO Optimierung ist der Prozess, Ihre Website systematisch zu verbessern, damit sie von Suchmaschinen besser verstanden und höher eingestuft wird. Es geht darum, technische Exzellenz mit strategisch wertvollen Inhalten zu vereinen.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Während viele Agenturen nur an der Oberfläche kratzen, gehen wir in die Tiefe: Von der Servergeschwindigkeit über die Informationsarchitektur bis hin zur semantischen Content-Struktur.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-offwhite p-6">
                <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-dark">Messbare Ergebnisse</h3>
                <p className="mt-2 text-muted">
                  Jede Optimierung wird getrackt und in konkreten KPIs messbar gemacht: Rankings, Traffic, Conversions.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-offwhite p-6">
                <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-dark">Nachhaltig & zukunftssicher</h3>
                <p className="mt-2 text-muted">
                  Wir optimieren nicht für kurzfristige Tricks, sondern für langfristigen, algorithmussicheren Erfolg.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-offwhite p-6">
                <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-dark">Ganzheitlicher Ansatz</h3>
                <p className="mt-2 text-muted">
                  Von der technischen Infrastruktur bis zur Content-Strategie – wir optimieren alle relevanten Faktoren.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical vs Content Optimization */}
      <section className="bg-offwhite py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark lg:text-4xl">
              Technische vs. Inhaltliche Optimierung
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Beide Säulen sind entscheidend. Wir optimieren parallel auf technischer und inhaltlicher Ebene für maximale Wirkung.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Technical SEO */}
            <div className="rounded-2xl border border-border bg-white p-8">
              <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-primary/10 p-4">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-dark">Technisches SEO</h3>
              <p className="mb-6 text-muted">
                Die Basis für alles: Ohne solide technische Fundamente verpuffen selbst die besten Inhalte.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-dark">Core Web Vitals Optimierung</span>
                    <p className="text-sm text-muted">LCP, FID, CLS auf Google-Niveau bringen</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-dark">Crawlability & Indexierung</span>
                    <p className="text-sm text-muted">Robots.txt, Sitemap, interne Verlinkung</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-dark">Mobile-First & Responsiveness</span>
                    <p className="text-sm text-muted">Perfekte Darstellung auf allen Geräten</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-dark">Structured Data Markup</span>
                    <p className="text-sm text-muted">Rich Snippets für bessere CTR</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-dark">HTTPS & Sicherheit</span>
                    <p className="text-sm text-muted">SSL, Security Headers, Vertrauenssignale</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Content SEO */}
            <div className="rounded-2xl border border-border bg-white p-8">
              <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-secondary/20 p-4">
                <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-dark">Inhaltliche Optimierung</h3>
              <p className="mb-6 text-muted">
                Content ist King – aber nur, wenn er strategisch geplant und präzise auf Suchintention abgestimmt ist.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-dark">Keyword-Recherche & Mapping</span>
                    <p className="text-sm text-muted">Datenbasierte Identifikation relevanter Suchbegriffe</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-dark">Suchintentions-Analyse</span>
                    <p className="text-sm text-muted">Inhalte präzise auf Nutzerintention ausrichten</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-dark">On-Page Optimierung</span>
                    <p className="text-sm text-muted">Title Tags, Meta Descriptions, Headings</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-dark">Content-Qualität & E-E-A-T</span>
                    <p className="text-sm text-muted">Expertise, Autorität, Vertrauenswürdigkeit aufbauen</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-dark">Interne Verlinkung</span>
                    <p className="text-sm text-muted">Topic Clusters und semantische Verbindungen</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark lg:text-4xl">
              Unser Optimierungsprozess
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Strukturiert, transparent, messbar – so optimieren wir Ihre Website Schritt für Schritt.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-[family-name:var(--font-heading)] text-xl font-bold text-primary">
                01
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">Analyse & Audit</h3>
              <p className="text-muted">
                Umfassende technische und inhaltliche Bestandsaufnahme: Was funktioniert? Wo sind Quick Wins? Wo liegen Potenziale?
              </p>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Technical SEO Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Content Gap Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Competitor Benchmarking</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-[family-name:var(--font-heading)] text-xl font-bold text-primary">
                02
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">Strategie & Roadmap</h3>
              <p className="text-muted">
                Basierend auf den Findings entwickeln wir eine priorisierte Roadmap mit Quick Wins und langfristigen Maßnahmen.
              </p>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Priorisierung nach Impact</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Keyword-Strategie</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Content-Kalender</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-[family-name:var(--font-heading)] text-xl font-bold text-primary">
                03
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">Umsetzung</h3>
              <p className="text-muted">
                Wir implementieren die vereinbarten Maßnahmen: Von technischen Fixes über Content-Updates bis hin zu Neukreationen.
              </p>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Technical Optimizations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Content Creation & Update</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>On-Page Optimierungen</span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-[family-name:var(--font-heading)] text-xl font-bold text-primary">
                04
              </div>
              <h3 className="mb-3 text-xl font-bold text-dark">Monitoring & Iteration</h3>
              <p className="text-muted">
                SEO ist ein kontinuierlicher Prozess. Wir tracken die Ergebnisse, lernen daraus und optimieren laufend weiter.
              </p>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Performance Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Monatliches Reporting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Continuous Optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-dark py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white lg:text-4xl">
            Bereit für messbare SEO-Erfolge?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Lassen Sie uns gemeinsam Ihre Website optimieren und nachhaltiges Wachstum in Suchmaschinen erzielen.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
            >
              Kostenlose SEO-Analyse anfragen
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/leistungen"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Weitere Leistungen entdecken
            </a>
          </div>

          <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-white">+127%</div>
              <div className="text-sm text-white/80">Durchschnittliches Traffic-Wachstum nach 6 Monaten</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-white">Top 3</div>
              <div className="text-sm text-white/80">Durchschnittliche Ranking-Position unserer Kunden</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-white">92/100</div>
              <div className="text-sm text-white/80">Durchschnittlicher PageSpeed Score nach Optimierung</div>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
