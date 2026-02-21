import type { Metadata } from "next";
import SubpageLayout from "../../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur Ulm | SeoForge – IT & Industrie SEO",
  description:
    "SEO Agentur Ulm: Eine der wirtschaftsstärksten Regionen Europas mit 6.500 Unternehmen. IT, Electronics und Fahrzeugtechnik brauchen starkes SEO.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Ulm",
  description:
    "SEO für IT, Elektronik und Fahrzeugtechnik in Ulm – einer der wirtschaftsstärksten Regionen Europas.",
  url: "https://seoforge.de/standorte/seo-agentur-ulm",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ulm",
    addressCountry: "DE",
  },
  areaServed: "Ulm",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Warum ist Ulm als Wirtschaftsstandort für SEO interessant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die IHK Ulm bezeichnet die Region als eine der wirtschaftlich stärksten Europas. 6.500 Unternehmen, 102.334 sozialversicherungspflichtige Jobs und Unternehmen wie Iveco und Wieland-Werke schaffen einen intensiven Wettbewerb um Fachkräfte, Kunden und digitale Sichtbarkeit.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Branchen profitieren in Ulm am stärksten von SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IT und Softwareentwicklung, Elektronik und Elektrotechnik sowie Fahrzeugtechnik sind Ulms Schwerpunkte laut IHK. Daneben sind Gesundheitswesen, Medizintechnik und Logistik starke SEO-Segmente. Für alle gilt: Die Suchintentionen der Zielgruppen sind B2B-fokussiert.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch Unternehmen auf der schwäbischen Alb (Heidenheim, Neu-Ulm, Biberach)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Die IHK-Region Ulm umfasst ein breites Einzugsgebiet. Wir betreuen Unternehmen aus Neu-Ulm, Heidenheim, Biberach, Ehingen und weiteren Städten der Region.",
      },
    },
    {
      "@type": "Question",
      name: "Wie kann ein kleines Ulmer Unternehmen mit begrenztem Budget SEO betreiben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir empfehlen einen priorisierten Ansatz: Zuerst technisches SEO und lokale Sichtbarkeit (Google Business Profile), dann gezielte Content-Produktion für die wichtigsten Keywords. So erzielen Sie den größten Return auf jede investierte Euro.",
      },
    },
  ],
};

export default function UlmPage() {
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
                    Ulm · Donaustadt · Baden-Württemberg
                  </span>
                </div>
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl">
                  SEO Agentur{" "}
                  <span className="text-primary">Ulm</span>
                </h1>
                <p className="hero-description mt-5 text-lg leading-relaxed text-muted">
                  Eine der wirtschaftlich stärksten Regionen Europas. 6.500
                  Unternehmen, 102.334 Jobs, starke Cluster in IT, Elektronik
                  und Fahrzeugtechnik. Ulm wächst – und Wachstum braucht
                  digitale Sichtbarkeit.
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

              {/* Ulm SVG – Cathedral spire (Ulmer Münster) */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 240 240"
                  width="320"
                  height="320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Ulm Münster Kathedrale SEO Illustration"
                >
                  <g transform="translate(120,120)">
                    <circle cx="0" cy="0" r="100" fill="#C2722A" opacity="0.04" />

                    {/* Cathedral base/nave */}
                    <rect x="-35" y="20" width="70" height="50" fill="#C2722A" opacity="0.15" stroke="#C2722A" strokeWidth="1.5" />

                    {/* Side buttresses */}
                    <rect x="-50" y="30" width="15" height="40" fill="#C2722A" opacity="0.1" stroke="#C2722A" strokeWidth="1" />
                    <rect x="35" y="30" width="15" height="40" fill="#C2722A" opacity="0.1" stroke="#C2722A" strokeWidth="1" />

                    {/* Windows in nave */}
                    <rect x="-25" y="30" width="12" height="20" rx="5" fill="#D4A853" opacity="0.3" stroke="#D4A853" strokeWidth="1" />
                    <rect x="-5" y="30" width="10" height="20" rx="4" fill="#D4A853" opacity="0.3" stroke="#D4A853" strokeWidth="1" />
                    <rect x="13" y="30" width="12" height="20" rx="5" fill="#D4A853" opacity="0.3" stroke="#D4A853" strokeWidth="1" />

                    {/* Transept / crossing tower base */}
                    <rect x="-18" y="0" width="36" height="25" fill="#C2722A" opacity="0.2" stroke="#C2722A" strokeWidth="1.5" />

                    {/* Octagonal tower body */}
                    <polygon points="0,-85 15,-70 20,-40 10,-10 -10,-10 -20,-40 -15,-70" fill="#C2722A" opacity="0.25" stroke="#C2722A" strokeWidth="2" />

                    {/* Spire */}
                    <polygon points="0,-100 8,-80 -8,-80" fill="#C2722A" opacity="0.8" />
                    <polygon points="0,-80 12,-60 -12,-60" fill="#C2722A" opacity="0.6" />
                    <polygon points="0,-60 16,-40 -16,-40" fill="#C2722A" opacity="0.4" />

                    {/* Spire tip cross */}
                    <circle cx="0" cy="-100" r="3" fill="#D4A853" />
                    <line x1="0" y1="-108" x2="0" y2="-93" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" />
                    <line x1="-5" y1="-102" x2="5" y2="-102" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" />

                    {/* Tower windows */}
                    <rect x="-5" y="-75" width="10" height="14" rx="4" fill="#D4A853" opacity="0.4" />
                    <rect x="-5" y="-55" width="10" height="12" rx="3" fill="#D4A853" opacity="0.3" />

                    {/* Gothic tracery suggestion */}
                    <path d="M -8 -42 Q 0 -48 8 -42" stroke="#D4A853" strokeWidth="1.5" fill="none" opacity="0.5" />
                    <path d="M -6 -28 Q 0 -33 6 -28" stroke="#D4A853" strokeWidth="1.5" fill="none" opacity="0.4" />

                    {/* Ground steps */}
                    <rect x="-38" y="68" width="76" height="5" rx="1" fill="#C2722A" opacity="0.15" />
                    <rect x="-42" y="73" width="84" height="5" rx="1" fill="#C2722A" opacity="0.1" />

                    {/* Decorative stars */}
                    <circle cx="-80" cy="-60" r="2" fill="#D4A853" opacity="0.4" />
                    <circle cx="80" cy="-60" r="2" fill="#D4A853" opacity="0.4" />
                    <circle cx="-90" cy="0" r="1.5" fill="#C2722A" opacity="0.3" />
                    <circle cx="90" cy="0" r="1.5" fill="#C2722A" opacity="0.3" />

                    <text x="0" y="90" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C2722A" opacity="0.5" fontFamily="sans-serif" letterSpacing="1">
                      ULM · DONAUSTADT
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
                { value: "6.500", label: "Unternehmen in Ulm" },
                { value: "102.334", label: "sozialversicherungspflichtige Jobs" },
                { value: "Top-3", label: "Wirtschaftsregion Europas (IHK)" },
                { value: "129.942", label: "Einwohner" },
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
              Ulm: Wirtschaftskraft zwischen Donau und Alb
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed">
              Ulm ist mehr als Einsteins Geburtsstadt und das Ulmer Münster
              (welteshöchster Kirchturm). Die IHK Ulm bezeichnet die Region
              als eine der wirtschaftlich stärksten in Europa. Iveco
              (Nutzfahrzeuge: LKW, Busse), Wieland-Werke (führender
              Kupferhersteller) und ein starkes IT-Cluster prägen das Bild.
            </p>
            <p className="mt-3 text-base text-muted leading-relaxed">
              In einer Region, in der Innovation zur Tradition gehört, ist
              digitale Sichtbarkeit kein Luxus. Fachkräfte werden über
              LinkedIn und Google gefunden. Kunden recherchieren online.
              Investoren googeln. SEO ist die Infrastruktur des modernen
              Ulmer Unternehmens.
            </p>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-12">
              SEO-Fokus für den Standort Ulm
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "IT & Software (IHK-Schwerpunkt)",
                  desc: "IT ist laut IHK Ulm der wichtigste Wachstumssektor der Region. Wir positionieren Softwareunternehmen, IT-Dienstleister und Tech-Startups für die richtigen Suchbegriffe.",
                  featured: true,
                },
                {
                  title: "Fahrzeugtechnik & Mobility",
                  desc: "Iveco und der gesamte Zulieferer-Ökosystem suchen neue Kunden online. B2B-SEO für Nutzfahrzeuge, Antriebssysteme und Mobility-Lösungen.",
                  featured: false,
                },
                {
                  title: "Elektronik & Elektrotechnik",
                  desc: "Ulms Elektronikunternehmen beliefern globale Märkte. Wir entwickeln mehrsprachige SEO-Strategien für Komponentenhersteller und Systemlieferanten.",
                  featured: false,
                },
                {
                  title: "Gesundheit & Medizintechnik",
                  desc: "Das Universitätsklinikum Ulm und zahlreiche Medizintechnikunternehmen prägen diesen Sektor. SEO für regulierte Branchen ist unsere Stärke.",
                  featured: false,
                },
                {
                  title: "Logistik & Supply Chain",
                  desc: "Ulms Lage an der Kreuzung wichtiger Verkehrswege macht es zum Logistik-Hub. Wir helfen Spediteuren und Logistikern, online sichtbar zu werden.",
                  featured: false,
                },
                {
                  title: "Tourismus & Kultur",
                  desc: "Das Ulmer Münster, die historische Altstadt und Einsteins Geburtsort ziehen Besucher an. Touristik-SEO mit Lokalbezug ist unser Handwerk.",
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
            Warum SeoForge für Ulm?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Industriekompetenz", desc: "Von Nutzfahrzeugen bis Kupferlegierungen – wir verstehen Ulms Industrie und schreiben Content, der Einkäufer überzeugt." },
              { title: "Mittelstandsfokus", desc: "Ulm ist Mittelstandsstadt. Unsere Strategien passen zu realen Budgets und erzeugen messbaren ROI." },
              { title: "IHK-Cluster-Wissen", desc: "Wir kennen die Schwerpunkte der IHK Ulm und richten SEO-Strategien an Clustern aus, nicht an Einzelbranchen." },
              { title: "Schnelle Umsetzung", desc: "Klare Prozesse, kurze Abstimmungswege. Wir starten schnell und liefern Ergebnisse." },
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
              FAQ: SEO Agentur Ulm
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
              Ulm sichtbar machen.
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Kostenlose SEO-Analyse für Ihr Ulmer Unternehmen –
              wir zeigen Ihnen, wo Ihr nächstes Wachstum liegt.
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
