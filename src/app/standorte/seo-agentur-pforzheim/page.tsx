import type { Metadata } from "next";
import SubpageLayout from "../../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur Pforzheim | SeoForge – Goldstadt & E-Commerce SEO",
  description:
    "SEO Agentur Pforzheim: Die Goldstadt – 80% aller deutschen Schmuckexporte kommen von hier. Nischen-Excellence braucht digitale Sichtbarkeit. Jetzt anfragen.",
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Pforzheim",
  description:
    "SEO für Schmuck- und Uhrenunternehmen, E-Commerce und Präzisionsindustrie in der Goldstadt Pforzheim.",
  url: "https://seoforge.de/standorte/seo-agentur-pforzheim",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pforzheim",
    addressCountry: "DE",
  },
  areaServed: "Pforzheim",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Pforzheim als 'Goldstadt' zu einem besonderen SEO-Markt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pforzheim produziert seit 1767 Schmuck und Uhren – 80% aller aus Deutschland exportierten Schmuckwaren kommen von hier. Diese jahrhundertealte Tradition schafft hochspezialisierte Unternehmen, die online gegen internationale Konkurrenz bestehen müssen. Nischen-SEO mit tiefer Produktkenntnis ist hier entscheidend.",
      },
    },
    {
      "@type": "Question",
      name: "Wie kann SeoForge Pforzheimer Schmuckunternehmen helfen, online zu wachsen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pforzheimer Schmuckunternehmen haben oft erstklassige Handwerkskunst, aber schwache Online-Sichtbarkeit. Wir entwickeln SEO-Strategien, die sowohl B2B (Großhändler, Juweliere) als auch B2C (Endkunden) ansprechen – inklusive E-Commerce-Optimierung für Online-Shops.",
      },
    },
    {
      "@type": "Question",
      name: "Ist E-Commerce-SEO in Pforzheim besonders relevant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Klingel (K-Mail Order) ist mit 2.200 Mitarbeitern einer der größten Arbeitgeber Pforzheims und ein bedeutender E-Commerce-Player. Diese E-Commerce-DNA macht Pforzheim zu einem Markt, in dem Shop-SEO und Produkt-Optimierung besonders wichtig sind.",
      },
    },
    {
      "@type": "Question",
      name: "Kann SeoForge auch Pforzheimer Uhrenhersteller und Präzisionsmechaniker betreuen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolut. Neben Schmuck ist die Präzisionsmechanik (z.B. Witzenmann mit ~1.400 Mitarbeitern) ein Pfeiler Pforzheims. Wir verstehen die B2B-Anforderungen der Präzisionsindustrie und entwickeln SEO-Strategien für Maschinenbau und Metallverarbeitung.",
      },
    },
  ],
};

export default function PforzheimPage() {
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
                <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/8 px-4 py-1.5 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
                  <span className="text-xs font-semibold tracking-wider uppercase text-secondary">
                    Pforzheim · Die Goldstadt · Baden-Württemberg
                  </span>
                </div>
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl">
                  SEO Agentur{" "}
                  <span className="text-primary">Pforzheim</span>
                </h1>
                <p className="hero-description mt-5 text-lg leading-relaxed text-muted">
                  80% aller deutschen Schmuckexporte. Eine
                  Goldschmied-Tradition seit 1767. 125.000 Einwohner, die
                  Weltklasse-Produkte fertigen. Pforzheim ist einzigartig –
                  und verdient SEO, das dieser Einzigartigkeit gerecht wird.
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

              {/* Pforzheim SVG – Diamond / Ring shape */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 240 240"
                  width="320"
                  height="320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Pforzheim Goldstadt Schmuck Diamant Illustration"
                >
                  <g transform="translate(120,120)">
                    <circle cx="0" cy="0" r="100" fill="#D4A853" opacity="0.05" />

                    {/* Ring band */}
                    <circle cx="0" cy="20" r="48" stroke="#D4A853" strokeWidth="12" fill="none" opacity="0.7" />
                    <circle cx="0" cy="20" r="48" stroke="#C2722A" strokeWidth="14" fill="none" opacity="0.15" />
                    {/* Ring highlight */}
                    <path d="M -35 -15 Q -40 5 -35 25" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4" />

                    {/* Diamond shape on top of ring */}
                    {/* Diamond top facets */}
                    <polygon points="0,-80 20,-50 -20,-50" fill="#D4A853" opacity="0.9" />
                    {/* Diamond girdle */}
                    <polygon points="-20,-50 20,-50 35,-30 -35,-30" fill="#C2722A" opacity="0.7" />
                    {/* Diamond pavilion */}
                    <polygon points="-35,-30 35,-30 20,-10 -20,-10" fill="#D4A853" opacity="0.6" />
                    <polygon points="-20,-10 20,-10 0,8" fill="#C2722A" opacity="0.8" />

                    {/* Diamond facet lines */}
                    <line x1="0" y1="-80" x2="0" y2="8" stroke="white" strokeWidth="0.8" opacity="0.4" />
                    <line x1="-20" y1="-50" x2="0" y2="-30" stroke="white" strokeWidth="0.8" opacity="0.3" />
                    <line x1="20" y1="-50" x2="0" y2="-30" stroke="white" strokeWidth="0.8" opacity="0.3" />
                    <line x1="-35" y1="-30" x2="0" y2="-10" stroke="white" strokeWidth="0.8" opacity="0.2" />
                    <line x1="35" y1="-30" x2="0" y2="-10" stroke="white" strokeWidth="0.8" opacity="0.2" />

                    {/* Diamond sparkles */}
                    {[[-65, -65], [65, -65], [-70, -20], [70, -20], [0, -95]].map(([sx, sy], i) => (
                      <g key={i}>
                        <line x1={sx} y1={sy - 6} x2={sx} y2={sy + 6} stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                        <line x1={sx - 6} y1={sy} x2={sx + 6} y2={sy} stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                        <line x1={sx - 4} y1={sy - 4} x2={sx + 4} y2={sy + 4} stroke="#D4A853" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
                        <line x1={sx + 4} y1={sy - 4} x2={sx - 4} y2={sy + 4} stroke="#D4A853" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
                      </g>
                    ))}

                    {/* Gold dust dots */}
                    {[[-80, 40], [80, 40], [-50, 75], [50, 75], [0, 85]].map(([dx, dy], i) => (
                      <circle key={i} cx={dx} cy={dy} r="2.5" fill="#D4A853" opacity="0.4" />
                    ))}

                    <text x="0" y="95" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C2722A" opacity="0.5" fontFamily="sans-serif" letterSpacing="1">
                      GOLDSTADT PFORZHEIM
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Gold-themed stats */}
        <section className="border-b border-border bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "80%", label: "der deutschen Schmuckexporte" },
                { value: "seit 1767", label: "Schmuck- & Uhrentradition" },
                { value: "2.200", label: "Klingel-Mitarbeiter" },
                { value: "125.000+", label: "Einwohner" },
              ].map((stat) => (
                <div key={stat.label} className="text-center py-4">
                  <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-secondary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
                Die Goldstadt und ihre digitale Herausforderung
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed">
                Pforzheim ist einzigartig: Kein anderer Ort Deutschlands
                ist so eng mit einer Branche verbunden wie Pforzheim mit
                der Schmuckproduktion. Seit 1767, als Markgraf Karl Friedrich
                die erste Schmuckmanufaktur gründete, hat sich Pforzheim zur
                globalen Schmuckhauptstadt entwickelt.
              </p>
              <p className="mt-3 text-base text-muted leading-relaxed">
                Doch während Handwerkskunst und Qualität stimmen, kämpfen
                viele Pforzheimer Unternehmen online. Internationale
                Konkurrenz, vor allem aus Asien, ist nur einen Klick entfernt.
                Wer als &ldquo;German Quality&rdquo; wahrgenommen werden will,
                muss digital präsent sein.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-4">Pforzheims Wirtschaftssäulen</h3>
              <div className="space-y-3">
                {[
                  { label: "Schmuck & Edelmetallverarbeitung", icon: "💍", highlight: true },
                  { label: "Uhren & Präzisionsmechanik", icon: "⌚", highlight: false },
                  { label: "E-Commerce & Versandhandel", icon: "📦", highlight: true },
                  { label: "Maschinenbau & Metallverarbeitung", icon: "⚙️", highlight: false },
                  { label: "Digitaler Handel & Online-Shops", icon: "🛒", highlight: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 rounded-lg border p-3 ${
                      item.highlight ? "border-secondary/30 bg-secondary/5" : "border-border bg-offwhite"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-medium text-dark">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-12">
              SEO-Spezialitäten für Pforzheim
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Schmuck & Juwelen SEO",
                  desc: "Produktseiten, Kategorien und Brand-Content für Schmuckhersteller und -händler. Wir optimieren für kaufbereite Suchanfragen – lokal und national.",
                  featured: true,
                },
                {
                  title: "E-Commerce Shop-Optimierung",
                  desc: "Klingels E-Commerce-DNA hat Pforzheim geprägt. Wir optimieren Online-Shops für Schmuck, Accessoires und Luxusgüter – technisch und inhaltlich.",
                  featured: false,
                },
                {
                  title: "B2B Großhandel & Export",
                  desc: "Viele Pforzheimer Unternehmen beliefern internationale Juweliere. Wir entwickeln mehrsprachige B2B-SEO-Strategien für europäische und globale Märkte.",
                  featured: false,
                },
                {
                  title: "Präzisionsindustrie",
                  desc: "Witzenmann und Co. brauchen B2B-SEO für hochspezialisierte Produkte. Wir entwickeln Content für Ingenieure und Einkäufer, nicht für Marketing-Verantwortliche.",
                  featured: false,
                },
                {
                  title: "Uhren & Chronometrie",
                  desc: "Pforzheims Uhrentradition zieht Enthusiasten weltweit an. Für Uhrmacher und -händler entwickeln wir Community-orientierte SEO-Strategien.",
                  featured: false,
                },
                {
                  title: "Luxus & Premium Branding",
                  desc: "Premium-Positionierung erfordert Premium-Content. Wir schreiben Texte, die die Hochwertigkeit Ihrer Produkte widerspiegeln.",
                  featured: false,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-xl border p-6 ${
                    item.featured
                      ? "border-secondary/30 bg-secondary/5"
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
            Warum SeoForge für Pforzheim?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Nischen-Expertise", desc: "Schmuck und Uhren sind keine Mainstream-Themen. Wir entwickeln Content, der Branchenkenntnis ausstrahlt." },
              { title: "E-Commerce-Fokus", desc: "Von der Produktseite bis zur Kategorie-Architektur: Wir optimieren Online-Shops für maximale Conversion." },
              { title: "International", desc: "80% Exportquote bedeutet: Deutsch allein reicht nicht. Wir bauen internationale Sichtbarkeit auf." },
              { title: "Schneller Start", desc: "Wir starten mit Quick Wins – technische Verbesserungen und On-Page-Optimierung, die sofort wirken." },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-offwhite p-6">
                <div className="h-8 w-8 rounded-lg bg-secondary/15 flex items-center justify-center mb-4">
                  <div className="h-3 w-3 rounded-full bg-secondary" />
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
              FAQ: SEO Agentur Pforzheim
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
              Gold verdient digitale Sichtbarkeit.
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Lassen Sie Ihre Pforzheimer Expertise im ganzen deutschsprachigen
              Raum glänzen. Kostenlose SEO-Analyse anfragen.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-dark transition-colors hover:bg-secondary-light"
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
