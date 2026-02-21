import type { Metadata } from "next";
import SubpageLayout from "../../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur Karlsruhe | SeoForge – IT & Tech SEO",
  description:
    "SEO Agentur Karlsruhe: Spezialisiert auf IT-Unternehmen, Tech-Startups und die TechnologieRegion. Mit 4.800 IT-Firmen braucht Karlsruhe starkes SEO.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Karlsruhe",
  description:
    "SEO für IT-Unternehmen, Softwarehäuser und Tech-Startups in Karlsruhe und der TechnologieRegion.",
  url: "https://seoforge.de/standorte/seo-agentur-karlsruhe",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karlsruhe",
    addressCountry: "DE",
  },
  areaServed: "Karlsruhe",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Warum ist Karlsruhe ein besonders wichtiger SEO-Standort für IT-Unternehmen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Karlsruhe hat mit 4.800 IT-Unternehmen und 30.000 IT-Jobs eine außergewöhnlich hohe Tech-Dichte. Das Karlsruher Institut für Technologie (KIT), 7 Universitäten in der Stadt und die TechnologieRegion mit 5.000 Technologieunternehmen schaffen ein einzigartiges Ökosystem – und einen intensiven Wettbewerb um Talente, Kunden und digitale Sichtbarkeit.",
      },
    },
    {
      "@type": "Question",
      name: "Kann SeoForge auch Cyber-Security-Unternehmen in Karlsruhe betreuen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Karlsruhe ist eines der führenden Zentren für IT-Sicherheit in Deutschland. Wir haben Erfahrung mit technischem Content für Cyber-Security, inklusive sensibler Themen wie Penetration Testing, SIEM-Lösungen oder Compliance-Frameworks.",
      },
    },
    {
      "@type": "Question",
      name: "Wie unterstützt SeoForge Karlsruher Startups mit begrenztem Budget?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für Startups in Karlsruhe bieten wir skalierbare SEO-Pakete, die auf Wachstum ausgelegt sind. Wir priorisieren die schnell gewinnbaren Keywords und bauen von dort aus systematisch aus – ohne Overengineering bei kleinen Budgets.",
      },
    },
    {
      "@type": "Question",
      name: "Unterstützt SeoForge auch Unternehmen in der TechnologieRegion Karlsruhe (Pforzheim, Rastatt, Bruchsal)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Die TechnologieRegion Karlsruhe umfasst mehrere Landkreise. Wir betreuen Unternehmen aus dem gesamten Einzugsgebiet und berücksichtigen lokale und regionale Suchintentionen in unserer SEO-Strategie.",
      },
    },
  ],
};

export default function KarlsruhePage() {
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
                    Karlsruhe · TechnologieRegion
                  </span>
                </div>
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl">
                  SEO Agentur{" "}
                  <span className="text-primary">Karlsruhe</span>
                </h1>
                <p className="hero-description mt-5 text-lg leading-relaxed text-muted">
                  4.800 IT-Unternehmen, 30.000 IT-Jobs, 7 Universitäten und
                  das KIT: Karlsruhe ist Deutschlands Tech-Hauptstadt. In
                  diesem Wissensmarkt trennt erstklassiges SEO die
                  Marktführer von der Masse.
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

              {/* Karlsruhe SVG – Circuit board pattern */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 240 240"
                  width="320"
                  height="320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Karlsruhe IT Circuit Board SEO Illustration"
                >
                  <g transform="translate(120,120)">
                    {/* Background */}
                    <circle cx="0" cy="0" r="100" fill="#C2722A" opacity="0.05" />

                    {/* Circuit board grid lines */}
                    <line x1="-80" y1="-80" x2="80" y2="-80" stroke="#C2722A" strokeWidth="0.8" opacity="0.15" />
                    <line x1="-80" y1="-40" x2="80" y2="-40" stroke="#C2722A" strokeWidth="0.8" opacity="0.15" />
                    <line x1="-80" y1="0" x2="80" y2="0" stroke="#C2722A" strokeWidth="0.8" opacity="0.15" />
                    <line x1="-80" y1="40" x2="80" y2="40" stroke="#C2722A" strokeWidth="0.8" opacity="0.15" />
                    <line x1="-80" y1="80" x2="80" y2="80" stroke="#C2722A" strokeWidth="0.8" opacity="0.15" />
                    <line x1="-80" y1="-80" x2="-80" y2="80" stroke="#C2722A" strokeWidth="0.8" opacity="0.15" />
                    <line x1="-40" y1="-80" x2="-40" y2="80" stroke="#C2722A" strokeWidth="0.8" opacity="0.15" />
                    <line x1="0" y1="-80" x2="0" y2="80" stroke="#C2722A" strokeWidth="0.8" opacity="0.15" />
                    <line x1="40" y1="-80" x2="40" y2="80" stroke="#C2722A" strokeWidth="0.8" opacity="0.15" />
                    <line x1="80" y1="-80" x2="80" y2="80" stroke="#C2722A" strokeWidth="0.8" opacity="0.15" />

                    {/* Circuit traces */}
                    <path d="M -60 -60 L -60 -20 L -20 -20 L -20 20 L 20 20 L 20 60 L 60 60" stroke="#C2722A" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
                    <path d="M 60 -60 L 60 -20 L 20 -20 L 20 0" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
                    <path d="M -60 60 L -20 60 L -20 20 L 0 20 L 0 -40 L 40 -40 L 40 -60" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
                    <path d="M -80 0 L -60 0 L -60 40 L 0 40" stroke="#C2722A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />

                    {/* CPU chip in center */}
                    <rect x="-25" y="-25" width="50" height="50" rx="4" fill="white" stroke="#C2722A" strokeWidth="2" />
                    <rect x="-25" y="-25" width="50" height="50" rx="4" fill="#C2722A" opacity="0.08" />
                    {/* Chip pins */}
                    {[-15, 0, 15].map((offset, i) => (
                      <g key={i}>
                        <rect x={offset - 2} y="-32" width="4" height="8" fill="#C2722A" rx="1" />
                        <rect x={offset - 2} y="24" width="4" height="8" fill="#C2722A" rx="1" />
                        <rect x="-32" y={offset - 2} width="8" height="4" fill="#C2722A" rx="1" />
                        <rect x="24" y={offset - 2} width="8" height="4" fill="#C2722A" rx="1" />
                      </g>
                    ))}
                    {/* Chip label */}
                    <text x="0" y="-5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C2722A" fontFamily="sans-serif" letterSpacing="0.5">
                      SEO
                    </text>
                    <text x="0" y="7" textAnchor="middle" fontSize="6" fill="#D4A853" fontFamily="sans-serif">
                      KA-01
                    </text>

                    {/* Nodes at circuit junctions */}
                    {[[-60, -60], [60, -60], [-60, 60], [60, 60], [-20, -20], [20, 20], [0, -40], [-20, 60]].map(([cx, cy], i) => (
                      <circle key={i} cx={cx} cy={cy} r="4" fill="#D4A853" opacity="0.8" />
                    ))}
                    {[[-60, 0], [0, 40], [20, -20], [40, -60]].map(([cx, cy], i) => (
                      <circle key={i} cx={cx} cy={cy} r="3" fill="#C2722A" opacity="0.6" />
                    ))}

                    {/* Outer ring decoration */}
                    <circle cx="0" cy="0" r="95" stroke="#C2722A" strokeWidth="1" strokeDasharray="4 8" fill="none" opacity="0.2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "4.800", label: "IT-Unternehmen" },
                { value: "30.000", label: "IT-Jobs" },
                { value: "7", label: "Universitäten" },
                { value: "310.000", label: "Einwohner" },
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
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
                Karlsruhe: Wo IT-Talent und SEO-Wettbewerb aufeinandertreffen
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed">
                Das KIT (Karlsruher Institut für Technologie) produziert Jahr
                für Jahr Spitzentalente in Informatik, Ingenieurswissenschaften
                und Physik. Viele bleiben in Karlsruhe – und gründen. Die
                5.000 Technologieunternehmen der TechnologieRegion sind das
                Ergebnis.
              </p>
              <p className="mt-3 text-base text-muted leading-relaxed">
                Dieser Wohlstand an Innovation schafft ein SEO-Paradox:
                Karlsruher IT-Unternehmen sind technisch brillant, aber
                digital oft unsichtbar. Der Grund: Wenn alle dein Konkurrent
                ist, wird generisches SEO zum Nullsummenspiel. Wer gewinnt,
                braucht Nischen-Autorität, präzises Keyword-Targeting und
                Content, der echte Expertise ausstrahlt.
              </p>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {[
                "KIT: eine der führenden Forschungsuniversitäten Deutschlands",
                "5.000 Technologieunternehmen in der TechnologieRegion",
                "Bruttoinlandsprodukt: ~€24,6 Mrd.",
                "14.700 Unternehmen in Karlsruhe",
                "Starke Cyber-Security-Cluster",
              ].map((fact, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-offwhite p-3">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  <span className="text-sm text-muted">{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-12">
              SEO-Spezialisierungen für Karlsruhe
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Software & SaaS",
                  desc: "Product-led SEO für B2B-Softwareunternehmen: Wir ranken Ihre Features und Use Cases – nicht nur generische Software-Keywords.",
                },
                {
                  title: "Cyber-Security",
                  desc: "Security ist sensibel. Wir entwickeln vertrauenswürdigen, technischen Content, der Sicherheitsexperten und CISO-Entscheider anspricht.",
                },
                {
                  title: "KI & Machine Learning",
                  desc: "Karlsruhe ist Deutschlands KI-Hotspot. Wir helfen KI-Unternehmen, in einem der am schnellsten wachsenden Suchbegriff-Segmente zu ranken.",
                },
                {
                  title: "IT-Beratung & Systemintegration",
                  desc: "Für Consulting-Firmen entwickeln wir Thought-Leadership-Strategien, die Vertrauen aufbauen und Anfragen generieren.",
                },
                {
                  title: "Hochschule & Forschung",
                  desc: "Transfer zwischen Wissenschaft und Wirtschaft: Wir positionieren Forschungseinrichtungen und Spin-offs für ihre Zielgruppen.",
                },
                {
                  title: "Hardware & Embedded Systems",
                  desc: "Karlsruher Unternehmen liefern Embedded-Systeme weltweit. Wir entwickeln mehrsprachige SEO-Strategien für globale Märkte.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-white p-6">
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
            Warum SeoForge für Karlsruhe?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Tech-Content-Expertise", desc: "Wir schreiben Content, den IT-Entscheider ernst nehmen – technisch präzise, keine Marketing-Floskeln." },
              { title: "Startup-freundlich", desc: "Skalierbare Modelle für Unternehmen in der Wachstumsphase. Budgets, die mit Ihnen wachsen." },
              { title: "Nischen-Strategie", desc: "In Karlsruhe gewinnt Tiefe über Breite. Wir identifizieren die profitabelsten Nischen-Keywords." },
              { title: "Technisches SEO", desc: "Core Web Vitals, JavaScript-SEO, API-Indexierung: Wir sprechen Ihre Sprache." },
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
              FAQ: SEO Agentur Karlsruhe
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
              Lassen Sie Ihr Karlsruher Unternehmen gefunden werden.
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Kostenlose SEO-Analyse – wir zeigen Ihnen, welche Keywords
              Ihre Wettbewerber in Karlsruhe dominieren und wie Sie aufholen.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Jetzt anfragen
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
