"use client";

import Link from "next/link";

/**
 * Reviews & case study highlights.
 * Three client cards with a key metric + quote + attribution.
 */

const REVIEWS = [
  {
    initials: "EK",
    name: "Erik Kaufmann",
    company: "Rechtsanwaltskanzlei Kaufmann",
    metric: "+214%",
    metricLabel: "organischer Traffic in 8 Monaten",
    quote:
      "Wir haben vorher viel Geld in Google Ads verbrannt. Seit der SEO-Optimierung kommen die Anfragen von selbst — und die Qualität der Leads ist deutlich besser.",
  },
  {
    initials: "SN",
    name: "Sandra Nowak",
    company: "Nowak Haustechnik GmbH",
    metric: "#1",
    metricLabel: "für \u201eSanit\u00e4r [Stadt]\u201c auf Google",
    quote:
      "Wir werden jetzt täglich von Neukunden über Google gefunden. Das war früher undenkbar. Die Investition hat sich in wenigen Wochen amortisiert.",
  },
  {
    initials: "TM",
    name: "Thomas Maier",
    company: "Studio Maier — Innenarchitektur",
    metric: "3×",
    metricLabel: "mehr Anfragen ohne Mehrkosten",
    quote:
      "Ich war skeptisch ob SEO für eine Boutique-Agentur wie uns funktioniert. Es tut es — und die Rankings halten jetzt seit über einem Jahr stabil.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-offwhite border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
              Kundenergebnisse
            </p>
            <h2 className="text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)] leading-[1.1]">
              Was Kunden sagen
            </h2>
          </div>
          <Link
            href="/referenzen"
            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1.5 shrink-0"
          >
            Alle Referenzen
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="flex flex-col rounded-2xl border border-border bg-white p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Metric callout */}
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-dark font-[family-name:var(--font-heading)]">
                  {r.metric}
                </span>
                <span className="text-sm text-muted leading-snug">{r.metricLabel}</span>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed text-muted flex-1">
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                  {r.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark">{r.name}</p>
                  <p className="text-xs text-muted">{r.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom credibility strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span><strong className="text-dark">4.9 / 5</strong> aus 47 Google-Bewertungen</span>
          </div>
          <span className="hidden sm:block text-border">·</span>
          <span>Kein Kunde hat uns je wegen ausbleibender Ergebnisse verlassen</span>
        </div>

      </div>
    </section>
  );
}
