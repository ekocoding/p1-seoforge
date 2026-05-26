"use client";

import Link from "next/link";

/**
 * Process section — "Wie wir arbeiten"
 * 4 numbered steps: Audit → Strategie → Umsetzung → Reporting
 * Geometric aesthetic: large step numbers, thin dividers, precise grid
 */

const STEPS = [
  {
    number: "01",
    title: "SEO-Audit",
    description:
      "Wir beginnen mit einer vollständigen Analyse Ihrer aktuellen Sichtbarkeit: technische Basis, On-Page-Faktoren, Backlink-Profil und Wettbewerb. Das Ergebnis ist eine priorisierte Liste konkreter Maßnahmen — keine generischen Empfehlungen.",
    tag: "Analyse",
    href: "/seo/audit",
  },
  {
    number: "02",
    title: "Strategie",
    description:
      "Auf Basis des Audits entwickeln wir eine Strategie, die zu Ihren Zielen und Ihrer Branche passt. Welche Keywords sind realistisch? Wo sind die schnellsten Gewinne? Wo bauen wir langfristige Autorität auf? Das alles liegt in einem klaren Dokument vor.",
    tag: "Planung",
    href: "/seo/beratung",
  },
  {
    number: "03",
    title: "Umsetzung",
    description:
      "Wir setzen die Maßnahmen direkt um — technische Fixes, Content, interne Verlinkung, Linkaufbau. Sie müssen nichts koordinieren. Wir arbeiten mit Ihrem Team oder vollständig selbstständig, je nach Ihrer Präferenz.",
    tag: "Ausführung",
    href: "/seo/optimierung",
  },
  {
    number: "04",
    title: "Reporting",
    description:
      "Jeden Monat erhalten Sie einen verständlichen Bericht: welche Keywords sich verändert haben, wie der Traffic sich entwickelt und was als nächstes geplant ist. Kein Fachjargon — klare Zahlen und klare Erklärungen.",
    tag: "Transparenz",
    href: "/seo/beratung",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-white border-t border-border py-24 lg:py-32" id="prozess">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Prozess
          </p>
          <h2 className="text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)] leading-[1.1]">
            Wie wir arbeiten
          </h2>
          <p className="mt-4 text-lg text-muted">
            Vier Phasen, jede mit einem klaren Ergebnis. Keine Überraschungen.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="absolute left-[2.75rem] top-12 hidden lg:block w-px bg-border"
            style={{ height: "calc(100% - 3rem)" }}
            aria-hidden="true"
          />

          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="relative grid lg:grid-cols-[5.5rem_1fr] gap-6 lg:gap-12 py-10 border-b border-border last:border-0 group"
              >
                {/* Step number column */}
                <div className="flex items-start gap-4 lg:flex-col lg:gap-0 lg:items-center">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-white text-xs font-bold text-primary font-[family-name:var(--font-mono)] shrink-0 lg:shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                    {step.number}
                  </div>
                </div>

                {/* Content column */}
                <div className="lg:pb-2">
                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <h3 className="text-2xl lg:text-3xl text-dark font-[family-name:var(--font-heading)]">
                      {step.title}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 bg-primary/[0.07] px-2.5 py-1 rounded-full">
                      {step.tag}
                    </span>
                  </div>
                  <p className="text-muted leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                  <Link
                    href={step.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    Mehr erfahren
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-offwhite p-6 lg:p-8">
          <div>
            <p className="font-semibold text-dark">Bereit für den ersten Schritt?</p>
            <p className="text-sm text-muted mt-0.5">
              Der Audit ist kostenlos und unverbindlich — und dauert maximal 30 Minuten.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-lg whitespace-nowrap"
          >
            Audit anfragen
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
