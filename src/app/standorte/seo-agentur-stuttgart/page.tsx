import type { Metadata } from "next";
import SubpageLayout from "../../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur Stuttgart | SeoForge – Automotive & B2B SEO",
  description:
    "SEO Agentur Stuttgart: Wir helfen Stuttgarter Unternehmen aus Automotive, IT und Engineering, bei Google top zu ranken. Jetzt kostenlose Analyse anfragen.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Stuttgart",
  description:
    "Professionelle Suchmaschinenoptimierung für Unternehmen in Stuttgart und der Region. Spezialisiert auf Automotive, B2B und Engineering.",
  url: "https://seoforge.de/standorte/seo-agentur-stuttgart",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Stuttgart",
    addressCountry: "DE",
  },
  areaServed: "Stuttgart",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Warum ist SEO für Stuttgarter Automobilzulieferer besonders wichtig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stuttgart ist mit über 118.000 Beschäftigten im Automotive-Cluster und Unternehmen wie Bosch und Porsche das Herz der deutschen Automobilindustrie. Im Zuge der digitalen Transformation suchen B2B-Einkäufer Zulieferer zunehmend online – wer hier nicht sichtbar ist, verliert Aufträge an Wettbewerber.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert es, bis SEO in Stuttgart Ergebnisse zeigt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In einem wettbewerbsintensiven Markt wie Stuttgart sollten Sie mit ersten messbaren Verbesserungen nach 3–4 Monaten rechnen. Signifikante Rankings für kompetitive Keywords entstehen typischerweise nach 6–12 Monaten kontinuierlicher Arbeit.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch Unternehmen in der Stuttgarter Region (Böblingen, Esslingen, Ludwigsburg)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Die Stuttgarter Region umfasst 2,8 Millionen Einwohner und 244.000 Unternehmen. Wir betreuen Kunden aus dem gesamten Großraum Stuttgart, inklusive Böblingen, Esslingen, Ludwigsburg und Waiblingen.",
      },
    },
    {
      "@type": "Question",
      name: "Kann SeoForge auch auf Englisch kommunizieren – für internationale Konzerne in Stuttgart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Viele Stuttgarter Konzerne wie Bosch oder Porsche haben internationale Strukturen. Wir kommunizieren auf Deutsch und Englisch und können internationale SEO-Kampagnen inklusive Mehrsprachigkeit umsetzen.",
      },
    },
  ],
};

export default function StuttgartPage() {
  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-offwhite border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                    Stuttgart · Baden-Württemberg
                  </span>
                </div>
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl">
                  SEO Agentur{" "}
                  <span className="text-primary">Stuttgart</span>
                </h1>
                <p className="hero-description mt-5 text-lg leading-relaxed text-muted">
                  Stuttgart ist eine der wirtschaftsstärksten Städte
                  Deutschlands – und einer der härtesten SEO-Märkte. Mit
                  31.400 Unternehmen allein in der Stadt und 244.000 in der
                  Region kämpfen Automotive-Zulieferer, IT-Firmen und
                  Engineering-Unternehmen täglich um Sichtbarkeit.
                </p>
                <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    Kostenlose Analyse anfragen
                  </Link>
                  <Link
                    href="/seo-agentur"
                    className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-dark transition-colors hover:bg-offwhite"
                  >
                    Unsere Leistungen
                  </Link>
                </div>
              </div>

              {/* Stuttgart SVG – Automotive gear + speedometer */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 240 240"
                  width="320"
                  height="320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Stuttgart Automotive SEO Illustration"
                >
                  <g transform="translate(120,120)">
                    {/* Outer gear ring */}
                    <circle cx="0" cy="0" r="90" fill="#C2722A" opacity="0.08" />
                    <circle cx="0" cy="0" r="90" stroke="#C2722A" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.3" />

                    {/* Gear teeth (12 teeth) */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i * 30 * Math.PI) / 180;
                      const x1 = Math.cos(angle) * 78;
                      const y1 = Math.sin(angle) * 78;
                      const x2 = Math.cos(angle) * 98;
                      const y2 = Math.sin(angle) * 98;
                      const perpX = -Math.sin(angle) * 7;
                      const perpY = Math.cos(angle) * 7;
                      return (
                        <polygon
                          key={i}
                          points={`${x1 + perpX},${y1 + perpY} ${x2 + perpX * 0.6},${y2 + perpY * 0.6} ${x2 - perpX * 0.6},${y2 - perpY * 0.6} ${x1 - perpX},${y1 - perpY}`}
                          fill="#C2722A"
                          opacity="0.6"
                        />
                      );
                    })}

                    {/* Main gear body */}
                    <circle cx="0" cy="0" r="70" fill="white" stroke="#C2722A" strokeWidth="2" />
                    <circle cx="0" cy="0" r="70" fill="#C2722A" opacity="0.05" />

                    {/* Speedometer arc */}
                    <path
                      d="M -55 15 A 58 58 0 1 1 55 15"
                      stroke="#D4A853"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.9"
                    />

                    {/* Speed marks */}
                    {[-60, -30, 0, 30, 60].map((deg, i) => {
                      const rad = ((deg - 90) * Math.PI) / 180;
                      const x1 = Math.cos(rad) * 48;
                      const y1 = Math.sin(rad) * 48;
                      const x2 = Math.cos(rad) * 56;
                      const y2 = Math.sin(rad) * 56;
                      return (
                        <line
                          key={i}
                          x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke="#C2722A"
                          strokeWidth={i === 2 ? 3 : 1.5}
                          strokeLinecap="round"
                          opacity="0.7"
                        />
                      );
                    })}

                    {/* Speedometer needle */}
                    <line
                      x1="0" y1="0"
                      x2="30" y2="-38"
                      stroke="#C2722A"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="0" cy="0" r="6" fill="#C2722A" />
                    <circle cx="0" cy="0" r="3" fill="white" />

                    {/* Center hole */}
                    <circle cx="0" cy="0" r="14" fill="white" stroke="#C2722A" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="14" fill="#C2722A" opacity="0.1" />

                    {/* "SEO" text */}
                    <text x="0" y="5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#C2722A" fontFamily="sans-serif" letterSpacing="1">
                      SEO
                    </text>

                    {/* Decorative dots */}
                    <circle cx="0" cy="-95" r="3" fill="#D4A853" />
                    <circle cx="82" cy="-47" r="2" fill="#D4A853" opacity="0.6" />
                    <circle cx="-82" cy="-47" r="2" fill="#D4A853" opacity="0.6" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Stuttgart-specific intro */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
                SEO in Stuttgart: B2B-Märkte digital gewinnen
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed">
                Stuttgart ist eine B2B-Stadt. Über 118.000 Menschen arbeiten
                allein im Automotive-Cluster – Zulieferer, Ingenieursbüros,
                Softwareentwickler und Unternehmensberater sitzen auf engstem
                Raum. Der Kampf um Aufträge, Fachkräfte und Kunden findet
                zunehmend online statt.
              </p>
              <p className="mt-3 text-base text-muted leading-relaxed">
                Große Namen wie Bosch (18.000 Beschäftigte in Stuttgart),
                Porsche (~15.000) und die Landesverwaltung (38.000) prägen
                das wirtschaftliche Bild. Darunter kämpfen tausende
                Mittelständler um Sichtbarkeit – genau dort setzen wir an.
              </p>
              <p className="mt-3 text-base text-muted leading-relaxed">
                Die Transformation des Automotive-Sektors hin zu
                Elektromobilität und Software-defined Vehicles öffnet ein
                historisches Fenster: Wer jetzt SEO-Boden gutmacht, sichert
                sich die digitale Poleposition für das nächste Jahrzehnt.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: "Unternehmen in Stuttgart", value: "31.400" },
                { label: "Unternehmen in der Region", value: "244.000" },
                { label: "Jobs im Automotive-Cluster", value: "118.000" },
                { label: "Bevölkerung (Region)", value: "2,8 Mio." },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-offwhite p-4">
                  <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
                Branchen-SEO für Stuttgart
              </h2>
              <p className="mt-3 text-base text-muted max-w-2xl mx-auto">
                Jede Stuttgarter Branche hat eigene SEO-Anforderungen. Wir
                kennen die spezifischen Suchintentionen Ihrer Zielgruppe.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Automotive & Zulieferer",
                  desc: "B2B-SEO für Tier-1 und Tier-2 Zulieferer. Wir optimieren für Einkäufer-Suchbegriffe wie 'Blechumformung Stuttgart' oder 'Embedded Software Automotive'.",
                },
                {
                  title: "IT & Engineering",
                  desc: "Von SAP-Beratung bis Maschinenbau-Software: Wir positionieren Tech-Unternehmen für die hochwertigsten Anfragen im Stuttgarter Markt.",
                },
                {
                  title: "Unternehmensberatung",
                  desc: "Consulting-Firmen in Stuttgart konkurrieren mit Konzernen und Boutique-Agenturen gleichermaßen. Thought Leadership Content + SEO ist die Antwort.",
                },
                {
                  title: "Gesundheit & Pharma",
                  desc: "Der Stuttgarter Gesundheitsmarkt wächst. Kliniken, Praxen und Pharmaunternehmen finden online neue Patienten und Partner.",
                },
                {
                  title: "Immobilien & Bau",
                  desc: "Stuttgart gehört zu den teuersten Immobilienmärkten Deutschlands. Makler und Bauträger brauchen starke lokale Rankings.",
                },
                {
                  title: "Handel & E-Commerce",
                  desc: "Von der Stuttgarter Königstraße bis zum Online-Shop: Wir verbinden lokale und nationale SEO-Strategien für maximale Reichweite.",
                },
              ].map((industry) => (
                <div key={industry.title} className="rounded-xl border border-border bg-white p-6">
                  <h3 className="font-semibold text-dark mb-2">{industry.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{industry.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why SeoForge */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              Warum SeoForge für Stuttgart?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "B2B-SEO-Expertise",
                desc: "Stuttgarts Stärke liegt im B2B. Wir kennen die längeren Kaufzyklen, die komplexen Entscheidungsprozesse und die Suchbegriffe, die Einkäufer wirklich verwenden.",
              },
              {
                title: "Branchenkenntnis",
                desc: "Wir verstehen die Automotive-Lieferkette, Engineering-Nomenklatur und IT-Märkte. Ihr Content klingt nicht wie generisches Marketing.",
              },
              {
                title: "Messbare Ergebnisse",
                desc: "Monatliches Reporting mit klaren KPIs: Rankings, organischer Traffic, Leads. Keine Blackbox – volle Transparenz.",
              },
              {
                title: "Regional verankert",
                desc: "Wir kennen den Stuttgarter Markt, den Wettbewerb und die lokalen Besonderheiten. Das macht den Unterschied.",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="rounded-xl border border-border bg-offwhite p-6">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <h3 className="font-semibold text-dark mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-offwhite border-t border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-10">
              Häufige Fragen: SEO Agentur Stuttgart
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-white p-6">
                  <h3 className="font-semibold text-dark mb-2">{faq.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-3xl bg-dark px-8 py-14 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white">
              Bereit, Stuttgart zu dominieren?
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Lassen Sie uns Ihre aktuelle Sichtbarkeit analysieren – kostenlos
              und unverbindlich.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Kostenlose SEO-Analyse
              </Link>
              <Link
                href="/standorte"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Alle Standorte
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
