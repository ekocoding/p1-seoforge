import type { Metadata } from "next";
import SubpageLayout from "../../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur Heidelberg | SeoForge – Biotech & Wissenschaft SEO",
  description:
    "SEO Agentur Heidelberg: Spezialisiert auf Biotech, Pharma und Wissensunternehmen. In einer Stadt, wo 60% aller Jobs in wissensintensiven Diensten liegen.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Heidelberg",
  description:
    "SEO für Biotech, Pharma und Wissensunternehmen in Heidelberg – der Stadt mit 60% wissensintensiven Arbeitsplätzen.",
  url: "https://seoforge.de/standorte/seo-agentur-heidelberg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Heidelberg",
    addressCountry: "DE",
  },
  areaServed: "Heidelberg",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Heidelberg als SEO-Standort einzigartig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Heidelberg vereint eine ungewöhnliche Mischung: 38% der Bevölkerung ist unter 30, 22% sind internationale Einwohner, 60% der Jobs liegen in wissensintensiven Diensten. Biotech-Cluster, Universitäten und globale Unternehmen wie Heidelberg Materials AG schaffen eine Zielgruppe, die online sehr aktiv ist.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Heidelberger Biotech-Unternehmen bei SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Biotech-SEO ist komplex: Fachterminologie muss korrekt sein, gleichzeitig muss Content für Investoren, Partner und Fachkräfte zugänglich sein. Wir entwickeln Content-Strategien, die wissenschaftliche Autorität aufbauen und gleichzeitig organischen Traffic generieren – auf Deutsch und Englisch.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch die Heidelberg Materials AG oder ähnliche Konzerne?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unsere Kernzielgruppe sind mittelständische Unternehmen und wachsende Startups, keine DAX-Konzerne. Allerdings betreuen wir Zulieferer, Dienstleister und Partner großer Unternehmen, die im Sog globaler Marktführer mitschwimmen wollen.",
      },
    },
    {
      "@type": "Question",
      name: "Spielt die internationale Ausrichtung Heidelbergs eine Rolle für SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolut. Mit 22% internationalen Einwohnern und einer Universität, die weltweit Studierende anzieht, ist Englisch in Heidelberg Geschäftssprache. Wir empfehlen vielen Heidelberger Unternehmen eine zweisprachige SEO-Strategie (Deutsch + Englisch) für maximale Reichweite.",
      },
    },
  ],
};

export default function HeidelbergPage() {
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
                    Heidelberg · Baden-Württemberg
                  </span>
                </div>
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl">
                  SEO Agentur{" "}
                  <span className="text-primary">Heidelberg</span>
                </h1>
                <p className="hero-description mt-5 text-lg leading-relaxed text-muted">
                  Heidelberg ist keine gewöhnliche Stadt: 60% aller
                  Arbeitsplätze liegen in wissensintensiven Diensten. 62
                  Biotech-Unternehmen. Eine Universität seit 1386. Diese
                  Dichte an Expertise braucht digitale Sichtbarkeit, um
                  global wahrgenommen zu werden.
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

              {/* Heidelberg SVG – Bridge arch / academic pillars */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 240 240"
                  width="320"
                  height="320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Heidelberg Alte Brücke und Wissenschaft Illustration"
                >
                  <g transform="translate(120,120)">
                    <circle cx="0" cy="0" r="100" fill="#C2722A" opacity="0.05" />

                    {/* Water/river at bottom */}
                    <path d="M -95 50 Q -50 42 0 50 Q 50 58 95 50 L 95 70 L -95 70 Z" fill="#C2722A" opacity="0.08" />
                    <path d="M -90 54 Q -40 46 0 54 Q 40 62 90 54" stroke="#C2722A" strokeWidth="1.5" fill="none" opacity="0.3" />

                    {/* Bridge base line */}
                    <line x1="-90" y1="45" x2="90" y2="45" stroke="#C2722A" strokeWidth="3" strokeLinecap="round" />

                    {/* Bridge main arch */}
                    <path d="M -80 45 Q -40 -20 0 -30 Q 40 -20 80 45" stroke="#C2722A" strokeWidth="3" strokeLinecap="round" fill="none" />

                    {/* Bridge pillars */}
                    <rect x="-84" y="10" width="8" height="35" fill="#C2722A" opacity="0.6" rx="1" />
                    <rect x="76" y="10" width="8" height="35" fill="#C2722A" opacity="0.6" rx="1" />

                    {/* Arch support pillars */}
                    <rect x="-42" y="20" width="6" height="25" fill="#C2722A" opacity="0.4" rx="1" />
                    <rect x="36" y="20" width="6" height="25" fill="#C2722A" opacity="0.4" rx="1" />

                    {/* Bridge parapet */}
                    <line x1="-80" y1="38" x2="80" y2="38" stroke="#D4A853" strokeWidth="2" opacity="0.7" />
                    {Array.from({ length: 16 }).map((_, i) => (
                      <rect
                        key={i}
                        x={-80 + i * 10.5}
                        y="32"
                        width="6"
                        height="8"
                        fill="#D4A853"
                        opacity="0.5"
                        rx="0.5"
                      />
                    ))}

                    {/* Molecule/DNA strand above bridge */}
                    <circle cx="-30" cy="-55" r="8" fill="#D4A853" opacity="0.2" stroke="#D4A853" strokeWidth="1.5" />
                    <circle cx="0" cy="-65" r="8" fill="#C2722A" opacity="0.2" stroke="#C2722A" strokeWidth="1.5" />
                    <circle cx="30" cy="-55" r="8" fill="#D4A853" opacity="0.2" stroke="#D4A853" strokeWidth="1.5" />
                    <line x1="-22" y1="-55" x2="-8" y2="-63" stroke="#C2722A" strokeWidth="1.5" opacity="0.5" />
                    <line x1="8" y1="-63" x2="22" y2="-55" stroke="#C2722A" strokeWidth="1.5" opacity="0.5" />

                    {/* Small connecting bond lines */}
                    <line x1="-30" y1="-47" x2="-30" y2="-35" stroke="#D4A853" strokeWidth="1" opacity="0.4" />
                    <line x1="30" y1="-47" x2="30" y2="-35" stroke="#D4A853" strokeWidth="1" opacity="0.4" />

                    {/* Stars/dots decoration */}
                    <circle cx="-70" cy="-70" r="2" fill="#D4A853" opacity="0.5" />
                    <circle cx="70" cy="-70" r="2" fill="#D4A853" opacity="0.5" />
                    <circle cx="0" cy="-90" r="3" fill="#C2722A" opacity="0.4" />

                    {/* Label */}
                    <text x="0" y="88" textAnchor="middle" fontSize="8" fontWeight="700" fill="#C2722A" opacity="0.6" fontFamily="sans-serif" letterSpacing="1">
                      HEIDELBERG SEO
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border bg-offwhite">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "60%", label: "Jobs in wissensintensiven Diensten" },
                { value: "62", label: "Biotech-Unternehmen (Region)" },
                { value: "22%", label: "Internationale Einwohner" },
                { value: "seit 1386", label: "Universität Heidelberg" },
              ].map((stat) => (
                <div key={stat.label} className="text-center py-4">
                  <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* City intro */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              Heidelberg: Wo Wissenschaft auf digitalen Wettbewerb trifft
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed">
              Heidelberg ist jung (38% unter 30), international (22% nicht
              deutsch) und extrem gebildet. Die Universität Heidelberg und
              das Universitätsklinikum beschäftigen zusammen 17.500 Menschen
              – fast 10% der Bevölkerung. Heidelberg Materials AG (ehemals
              HeidelbergCement) sitzt hier mit 51.000 Mitarbeitern weltweit.
            </p>
            <p className="mt-3 text-base text-muted leading-relaxed">
              Doch trotz globaler Strahlkraft kämpfen viele Heidelberger
              Unternehmen online um Sichtbarkeit. Gerade Biotech-Firmen,
              Forschungseinrichtungen und akademische Spin-offs versäumen es
              häufig, ihr Wissen in organischen Traffic umzuwandeln.
              Genau da setzen wir an.
            </p>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-12">
              Branchen-SEO für Heidelberg
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Biotech & Life Sciences",
                  desc: "Heidelberg/Mannheim ist eines der führenden deutschen Biotech-Hubs. Wir entwickeln SEO-Strategien, die Investoren, Partner und Fachkräfte international ansprechen.",
                  featured: true,
                },
                {
                  title: "Medizin & Gesundheitswesen",
                  desc: "Das Universitätsklinikum und zahlreiche Praxen sowie medizintechnische Firmen brauchen SEO, das Vertrauen schafft und Patienten gewinnt.",
                  featured: false,
                },
                {
                  title: "Tourismus & Hotellerie",
                  desc: "Heidelberg ist eine der meistbesuchten Städte Deutschlands. Hotels, Restaurants und Tourismusanbieter profitieren enorm von lokalem SEO.",
                  featured: false,
                },
                {
                  title: "Software & IT",
                  desc: "Die junge, technikaffine Bevölkerung Heidelbergs zieht Softwareunternehmen an. Wir positionieren sie für die richtigen Zielgruppen.",
                  featured: false,
                },
                {
                  title: "Bildung & E-Learning",
                  desc: "Hochschulen, Bildungsanbieter und E-Learning-Plattformen finden in Heidelberg ihre Zielgruppe – und wir helfen ihnen, diese zu erreichen.",
                  featured: false,
                },
                {
                  title: "Immobilien & Wohnen",
                  desc: "Heidelbergs hohe Nachfrage treibt den Immobilienmarkt. Makler und Eigentümer profitieren von gezieltem lokalem SEO.",
                  featured: false,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-xl border p-6 ${
                    item.featured
                      ? "border-primary/30 bg-primary/5"
                      : "border-border bg-white"
                  }`}
                >
                  <h3 className="font-semibold text-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why SeoForge */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-10">
            Warum SeoForge für Heidelberg?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Wissenschaftlicher Content", desc: "Wir schreiben Content, der fachlich korrekt und gleichzeitig für Laien verständlich ist – ideal für Biotech und Medizin." },
              { title: "International", desc: "Deutsch und Englisch. Für Heidelbergs internationale Zielgruppen aus Wissenschaft und Wirtschaft." },
              { title: "E-A-T Expertise", desc: "Google bewertet medizinischen und wissenschaftlichen Content besonders kritisch. Wir bauen echte Autorität auf." },
              { title: "Lokales SEO", desc: "Für Touristik, Gastronomie und lokale Dienstleister optimieren wir Google Business Profile und lokale Rankings." },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-offwhite p-6">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <h3 className="font-semibold text-dark mb-2">{b.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-offwhite border-t border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-10">
              FAQ: SEO Agentur Heidelberg
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
              Heidelberger Expertise verdient globale Sichtbarkeit.
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Lassen Sie uns gemeinsam herausfinden, wie weit Ihr Unternehmen
              mit der richtigen SEO-Strategie kommen kann.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Kostenlose Analyse anfragen
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
