import type { Metadata } from "next";
import SubpageLayout from "../../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur Koblenz | SeoForge – Healthcare IT & Tourismus SEO",
  description:
    "SEO Agentur Koblenz: Weltmarktführer CompuGroup Medical, UNESCO Welterbe und 356.850 Touristen jährlich. Koblenz braucht starkes digitales SEO.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Koblenz",
  description:
    "SEO für Healthcare IT, Bundesbehörden und Tourismusunternehmen in Koblenz an Rhein und Mosel.",
  url: "https://seoforge.de/standorte/seo-agentur-koblenz",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Koblenz",
    addressCountry: "DE",
  },
  areaServed: "Koblenz",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Koblenz als SEO-Standort besonders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Koblenz vereint Healthcare IT (CompuGroup Medical, 6.100 Mitarbeiter, weltweiter Marktführer), Bundesbehörden (BAAINBw mit ~4.500 Mitarbeitern), UNESCO-Welterbe am Rhein-Mosel-Eck und starken Tourismus (356.850 Gäste, 689.331 Übernachtungen). Diese Kombination schafft ungewöhnlich vielfältige SEO-Möglichkeiten.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Healthcare-IT-Unternehmen in Koblenz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CompuGroup Medical hat den Maßstab gesetzt: Healthcare IT ist komplex, reguliert und international. Wir entwickeln SEO-Strategien für Praxissoftware, Krankenhausinformationssysteme und Digitalisierungspartner – immer im Einklang mit den spezifischen Anforderungen der Gesundheitsbranche.",
      },
    },
    {
      "@type": "Question",
      name: "Lohnt sich Tourismus-SEO in Koblenz wirklich?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolut. Mit 356.850 Gästen und 689.331 Übernachtungen jährlich und dem Rhein-Mosel-Eck als UNESCO-Welterbe ist der Tourismus ein erheblicher Wirtschaftsfaktor. Hotels, Weingüter, Ausflugsanbieter und Restaurants in Koblenz finden in gezieltem Tourismus-SEO einen direkten Weg zu mehr Buchungen.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch Unternehmen, die mit Bundesbehörden in Koblenz zusammenarbeiten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Das BAAINBw (Bundesamt für Ausrüstung, Informationstechnik und Nutzung der Bundeswehr) ist einer der größten Arbeitgeber in Koblenz. Viele IT-Dienstleister, Berater und Technologieunternehmen suchen hier Aufträge. Wir helfen diesen, ihre Sichtbarkeit und Reputation digital aufzubauen.",
      },
    },
  ],
};

export default function KoblenzPage() {
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
                    Koblenz · Rhein-Mosel · Rheinland-Pfalz
                  </span>
                </div>
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl">
                  SEO Agentur{" "}
                  <span className="text-primary">Koblenz</span>
                </h1>
                <p className="hero-description mt-5 text-lg leading-relaxed text-muted">
                  Am Zusammenfluss von Rhein und Mosel liegt eine Stadt, die
                  Weltmarktführer im Healthcare IT beherbergt, UNESCO
                  Welterbe ist und jährlich über 350.000 Touristen anzieht.
                  Koblenz braucht SEO, das all das widerspiegelt.
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

              {/* Koblenz SVG – Two rivers confluence (Y-shape) */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 240 240"
                  width="320"
                  height="320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Koblenz Deutsches Eck Rhein Mosel Zusammenfluss Illustration"
                >
                  <g transform="translate(120,120)">
                    <circle cx="0" cy="0" r="100" fill="#C2722A" opacity="0.04" />

                    {/* Rhein river - coming from left-top */}
                    <path
                      d="M -85 -70 Q -50 -40 -20 -10 Q -5 3 0 15"
                      stroke="#C2722A"
                      strokeWidth="12"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.15"
                    />
                    <path
                      d="M -85 -70 Q -50 -40 -20 -10 Q -5 3 0 15"
                      stroke="#C2722A"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.5"
                    />

                    {/* Mosel river - coming from right-top */}
                    <path
                      d="M 85 -55 Q 50 -30 20 -10 Q 5 3 0 15"
                      stroke="#D4A853"
                      strokeWidth="12"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.15"
                    />
                    <path
                      d="M 85 -55 Q 50 -30 20 -10 Q 5 3 0 15"
                      stroke="#D4A853"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.5"
                    />

                    {/* Combined river going down */}
                    <path
                      d="M 0 15 Q -5 40 0 75"
                      stroke="#C2722A"
                      strokeWidth="16"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.12"
                    />
                    <path
                      d="M 0 15 Q -5 40 0 75"
                      stroke="#C2722A"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.4"
                    />

                    {/* Confluence point */}
                    <circle cx="0" cy="15" r="12" fill="white" stroke="#C2722A" strokeWidth="2.5" />
                    <circle cx="0" cy="15" r="12" fill="#C2722A" opacity="0.12" />
                    <circle cx="0" cy="15" r="5" fill="#C2722A" opacity="0.7" />

                    {/* River labels */}
                    <text x="-55" y="-62" fontSize="8" fontWeight="600" fill="#C2722A" opacity="0.6" fontFamily="sans-serif" textAnchor="middle">Rhein</text>
                    <text x="62" y="-47" fontSize="8" fontWeight="600" fill="#D4A853" opacity="0.8" fontFamily="sans-serif" textAnchor="middle">Mosel</text>

                    {/* Fortress / Ehrenbreitstein on right bank */}
                    <rect x="55" y="-40" width="30" height="20" rx="2" fill="#C2722A" opacity="0.15" stroke="#C2722A" strokeWidth="1.5" />
                    <polygon points="55,-40 70,-55 85,-40" fill="#C2722A" opacity="0.2" />
                    {/* Battlements */}
                    {[58, 64, 70, 76, 80].map((x, i) => (
                      <rect key={i} x={x} y="-46" width="4" height="7" rx="0.5" fill="#C2722A" opacity="0.4" />
                    ))}

                    {/* Monument - Deutsches Eck spit */}
                    <polygon points="0,-5 -15,5 15,5" fill="#C2722A" opacity="0.5" />
                    {/* Monument column */}
                    <rect x="-3" y="-25" width="6" height="20" fill="#C2722A" opacity="0.6" rx="1" />
                    {/* Eagle on top */}
                    <circle cx="0" cy="-28" r="5" fill="#D4A853" opacity="0.8" />
                    <path d="M -8 -28 Q -5 -35 0 -33 Q 5 -35 8 -28" fill="#D4A853" opacity="0.7" />

                    {/* Waves in river */}
                    {[[-60, -45], [-30, -20], [55, -30]].map(([wx, wy], i) => (
                      <path key={i} d={`M ${wx - 6} ${wy} Q ${wx} ${wy - 4} ${wx + 6} ${wy}`} stroke="#C2722A" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
                    ))}

                    {/* Digital/SEO signal dots */}
                    {[[-80, -75], [80, -60], [-75, 60], [80, 60]].map(([dx, dy], i) => (
                      <circle key={i} cx={dx} cy={dy} r="3" fill="#D4A853" opacity="0.4" />
                    ))}

                    <text x="0" y="92" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C2722A" opacity="0.5" fontFamily="sans-serif" letterSpacing="1">
                      KOBLENZ · DEUTSCHES ECK
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
                { value: "6.100", label: "CompuGroup Medical Mitarbeiter" },
                { value: "356.850", label: "Touristen pro Jahr" },
                { value: "4.500", label: "BAAINBw Mitarbeiter" },
                { value: "UNESCO", label: "Welterbe Rhein-Mosel" },
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

        {/* Intro */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              Koblenz: Wo Weltmarktführer und Welterbe aufeinandertreffen
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed">
              Koblenz ist eine Stadt voller Kontraste, die sich gegenseitig
              stärken: CompuGroup Medical (CGM), weltweiter Marktführer in
              Healthcare IT, hat hier seinen Hauptsitz – das ist globale
              Strahlkraft aus einer Stadt mit 115.298 Einwohnern. Das
              UNESCO-Welterbe &ldquo;Oberes Mittelrheintal&rdquo; zieht
              Touristen aus aller Welt ans Deutsche Eck.
            </p>
            <p className="mt-3 text-base text-muted leading-relaxed">
              Für Koblenzer Unternehmen bedeutet das: Sie operieren in einem
              internationalen Umfeld, aber oft ohne internationale digitale
              Präsenz. SEO ist die Brücke zwischen lokaler Stärke und
              globaler Sichtbarkeit.
            </p>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-12">
              Branchen-SEO für Koblenz
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Healthcare IT & Medizinsoftware",
                  desc: "CGM hat Koblenz zur Healthcare-IT-Hauptstadt gemacht. Zulieferer, Partner und Konkurrenten brauchen starkes SEO, um in diesem spezialisierten Markt sichtbar zu sein.",
                  featured: true,
                },
                {
                  title: "Tourismus & Gastronomie",
                  desc: "356.850 Gäste und das Deutsche Eck als weltberühmtes Symbol: Hotels, Restaurants, Weinbars und Ausflugsanbieter haben enormes SEO-Potenzial.",
                  featured: false,
                },
                {
                  title: "Logistik & Binnenschifffahrt",
                  desc: "Koblenz liegt an einer der meistbefahrenen Wasserstraßen Europas. Logistikdienstleister und Binnenschifffahrtsunternehmen finden hier ihre Zielgruppe.",
                  featured: false,
                },
                {
                  title: "Bundesbehörden-nahe Unternehmen",
                  desc: "Das BAAINBw vergibt Milliardenaufträge. IT-Dienstleister, Systemintegratoren und Beratungsunternehmen positionieren sich mit gezieltem B2G-SEO.",
                  featured: false,
                },
                {
                  title: "Weinwirtschaft & Genusskultur",
                  desc: "Mosel-Wein und Rhein-Wein sind weltberühmt. Winzer, Kellereien und Weinhandlungen aus der Region profitieren von internationalem Tourismus-SEO.",
                  featured: false,
                },
                {
                  title: "Immobilien & Stadtentwicklung",
                  desc: "Koblenz wächst. Makler, Bauträger und Stadtentwickler finden in lokalem SEO den direkten Weg zu kaufbereiten Interessenten.",
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
            Warum SeoForge für Koblenz?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Healthcare IT-Wissen", desc: "Wir kennen die regulatorischen Anforderungen und Content-Ansprüche im Healthcare-Bereich." },
              { title: "Tourismus & Destination", desc: "Lokales SEO und internationales Tourismus-Marketing gehen bei uns Hand in Hand." },
              { title: "B2G-Kompetenz", desc: "Behörden-nahe Unternehmen brauchen Vertrauen und Expertise. Wir bauen beides auf." },
              { title: "Rhein-Mosel-Gebiet", desc: "Wir betreuen Kunden aus Koblenz und der gesamten Mittelrhein-Region." },
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
              FAQ: SEO Agentur Koblenz
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
              Am Zusammenfluss von Rhein, Mosel und SEO.
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Kostenlose SEO-Analyse für Ihr Koblenzer Unternehmen.
              Wir finden die Chancen, die Ihre Wettbewerber übersehen haben.
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
