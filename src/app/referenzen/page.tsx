import type { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Referenzen | SeoForge - Erfolgreiche SEO-Projekte",
  description:
    "Entdecken Sie unsere erfolgreichen SEO-Projekte und Kundenerfolge. Realistische Fallstudien mit messbaren Ergebnissen.",
};

const caseStudies = [
  {
    company: "TechVision GmbH",
    industry: "Software & IT",
    metric: "+340%",
    metricLabel: "Organischer Traffic",
    description:
      "Durch gezielte technische Optimierung und eine umfassende Content-Strategie konnten wir den organischen Traffic innerhalb von 10 Monaten verdreifachen.",
    duration: "10 Monate",
  },
  {
    company: "Möbelhaus Schneider",
    industry: "E-Commerce",
    metric: "+215%",
    metricLabel: "Online-Umsatz",
    description:
      "Mit Shop-SEO-Optimierung, Produktseiten-Enhancement und strategischem Linkbuilding steigerten wir den Online-Umsatz deutlich.",
    duration: "12 Monate",
  },
  {
    company: "Kanzlei Weber & Partner",
    industry: "Rechtsberatung",
    metric: "Top 3",
    metricLabel: "Rankings",
    description:
      "Lokale SEO-Strategie brachte die Kanzlei für 47 relevante Keywords in die Top 3 der lokalen Suchergebnisse.",
    duration: "6 Monate",
  },
  {
    company: "FitnessPro Studios",
    industry: "Fitness & Gesundheit",
    metric: "+180%",
    metricLabel: "Qualifizierte Leads",
    description:
      "Durch zielgerichtete Content-Optimierung und lokale Suchmaschinenoptimierung konnten wir die Lead-Generierung nahezu verdoppeln.",
    duration: "8 Monate",
  },
  {
    company: "Handwerk Meister GmbH",
    industry: "Handwerk & Dienstleistung",
    metric: "+425%",
    metricLabel: "Anfragen",
    description:
      "Lokale SEO-Kampagne mit Google Business Optimierung und gezieltem Content führte zu massiver Steigerung der Kundenanfragen.",
    duration: "9 Monate",
  },
  {
    company: "BioMarkt Grün",
    industry: "Einzelhandel & E-Commerce",
    metric: "+290%",
    metricLabel: "Organische Conversions",
    description:
      "Kombination aus technischem SEO, UX-Verbesserungen und strategischem Content-Marketing trieb die Conversions in die Höhe.",
    duration: "11 Monate",
  },
];

export default function ReferenzenPage() {
  return (
    <SubpageLayout>
      <main className="bg-white">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-offwhite to-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Unsere Erfolgsgeschichten
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-dark sm:text-5xl lg:text-6xl font-[family-name:var(--font-heading)]">
                Unsere <span className="text-primary">Referenzen</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Entdecken Sie, wie wir Unternehmen aus verschiedenen Branchen zu
                mehr Sichtbarkeit, Traffic und Umsatz verholfen haben. Echte
                Projekte, messbare Ergebnisse.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study, index) => (
                <article
                  key={study.company}
                  className="group relative rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.04] hover:-translate-y-1"
                >
                  {/* Metric Badge */}
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/[0.08] px-4 py-2">
                    <span className="text-2xl font-bold text-primary">
                      {study.metric}
                    </span>
                    <span className="text-xs font-medium text-primary">
                      {study.metricLabel}
                    </span>
                  </div>

                  {/* Company Info */}
                  <h2 className="text-xl font-bold text-dark mb-2">
                    {study.company}
                  </h2>
                  <p className="text-sm font-medium text-muted mb-4">
                    {study.industry}
                  </p>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted mb-6">
                    {study.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Projektdauer: {study.duration}</span>
                  </div>

                  {/* Decorative accent */}
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-[100px] bg-gradient-to-br from-primary/[0.03] to-transparent" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-dark py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-[family-name:var(--font-heading)]">
                Bereit für Ihre <span className="text-primary">Erfolgsgeschichte</span>?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Lassen Sie uns gemeinsam Ihr nächstes SEO-Projekt zum Erfolg führen.
                Vereinbaren Sie jetzt ein kostenloses Erstgespräch.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
                >
                  Kostenloses Erstgespräch
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-primary/30 hover:bg-white/[0.04]"
                >
                  Zurück zur Startseite
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
