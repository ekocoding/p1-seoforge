import type { Metadata } from "next";
import SubpageLayout from "../../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur Darmstadt | SeoForge – Pharma & Software SEO",
  description:
    "SEO Agentur Darmstadt: Die Wissenschaftsstadt mit Merck KGaA und globalen Softwareführern braucht SEO, das Komplexität beherrscht. Jetzt anfragen.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Darmstadt",
  description:
    "Professionelle Suchmaschinenoptimierung für Pharma, IT und Chemieunternehmen in der Wissenschaftsstadt Darmstadt.",
  url: "https://seoforge.de/standorte/seo-agentur-darmstadt",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Darmstadt",
    addressCountry: "DE",
  },
  areaServed: "Darmstadt",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie funktioniert SEO für Pharmaunternehmen in Darmstadt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pharma-SEO in Darmstadt erfordert tiefes Branchenwissen. Merck KGaA hat den Maßstab gesetzt: Komplexe B2B-Produkte, internationale Zielgruppen, strenge regulatorische Anforderungen. Wir entwickeln Content-Strategien, die wissenschaftliche Autorität aufbauen, ohne Compliance-Grenzen zu verletzen.",
      },
    },
    {
      "@type": "Question",
      name: "Was bedeutet 'Wissenschaftsstadt' für das digitale Marketing in Darmstadt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Darmstadt trägt den offiziellen Titel 'Wissenschaftsstadt' und hat mit 44,3 Topunternehmen pro 100.000 Einwohner eine außergewöhnlich hohe Unternehmensdichte. Das bedeutet: intensiver Wettbewerb um Fachkräfte, Kunden und digitale Sichtbarkeit – ideal für gezieltes SEO.",
      },
    },
    {
      "@type": "Question",
      name: "Kann SeoForge Software-Unternehmen in Darmstadt betreuen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Mit Software AG (heute OpenText) als Weltmarktführer in Business Software hat Darmstadt eine starke Software-DNA. Wir betreuen Software-Anbieter von der SEO-Strategie über technischen SEO-Audit bis zu Content-Produktion für B2B-Software-Zielgruppen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange braucht SEO in einem so spezialisierten Markt wie Darmstadt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B2B-SEO in spezialisierten Märkten wie Pharma oder Enterprise-Software braucht mehr Vorlauf als Consumer-SEO – dafür ist die Qualität der generierten Leads deutlich höher. Planen Sie 6–12 Monate für signifikante Ergebnisse ein. Erste Verbesserungen im technischen SEO sind oft innerhalb von Wochen sichtbar.",
      },
    },
  ],
};

export default function DarmstadtPage() {
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
                    Darmstadt · Wissenschaftsstadt · Hessen
                  </span>
                </div>
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl">
                  SEO Agentur{" "}
                  <span className="text-primary">Darmstadt</span>
                </h1>
                <p className="hero-description mt-5 text-lg leading-relaxed text-muted">
                  Darmstadt trägt nicht ohne Grund den Titel
                  &ldquo;Wissenschaftsstadt&rdquo;. Mit Merck KGaA (weltältestes
                  Pharma-Chemieunternehmen), 44,3 Top-Unternehmen pro
                  100.000 Einwohnern und einem Kombiniertem Umsatz der
                  Torunternehmen von €30,8 Mrd. ist SEO hier keine Option,
                  sondern Notwendigkeit.
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

              {/* Darmstadt SVG – Molecular / Flask structure */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 240 240"
                  width="320"
                  height="320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Darmstadt Pharma Wissenschaft Molekül Illustration"
                >
                  <g transform="translate(120,120)">
                    <circle cx="0" cy="0" r="100" fill="#C2722A" opacity="0.04" />

                    {/* Flask body */}
                    <path
                      d="M -20 -60 L -20 -10 L -55 45 Q -60 60 -45 70 L 45 70 Q 60 60 55 45 L 20 -10 L 20 -60 Z"
                      fill="#C2722A"
                      opacity="0.08"
                      stroke="#C2722A"
                      strokeWidth="2"
                    />

                    {/* Flask liquid */}
                    <path
                      d="M -48 40 Q -30 30 0 35 Q 30 30 48 40 L 45 70 Q 60 60 45 70 L -45 70 Q -60 60 -45 70 Z"
                      fill="#D4A853"
                      opacity="0.25"
                    />

                    {/* Flask neck */}
                    <rect x="-22" y="-70" width="44" height="12" rx="3" fill="#C2722A" opacity="0.15" stroke="#C2722A" strokeWidth="1.5" />

                    {/* Bubbles in flask */}
                    <circle cx="-15" cy="50" r="5" fill="#D4A853" opacity="0.5" />
                    <circle cx="10" cy="55" r="3" fill="#D4A853" opacity="0.4" />
                    <circle cx="-5" cy="45" r="4" fill="#D4A853" opacity="0.6" />

                    {/* Molecular bonds around flask */}
                    {/* Atom 1 - top left */}
                    <circle cx="-65" cy="-50" r="10" fill="white" stroke="#C2722A" strokeWidth="2" />
                    <circle cx="-65" cy="-50" r="10" fill="#C2722A" opacity="0.1" />
                    <text x="-65" y="-46" textAnchor="middle" fontSize="8" fontWeight="700" fill="#C2722A" fontFamily="sans-serif">C</text>

                    {/* Atom 2 - top right */}
                    <circle cx="65" cy="-50" r="10" fill="white" stroke="#D4A853" strokeWidth="2" />
                    <circle cx="65" cy="-50" r="10" fill="#D4A853" opacity="0.1" />
                    <text x="65" y="-46" textAnchor="middle" fontSize="8" fontWeight="700" fill="#D4A853" fontFamily="sans-serif">H</text>

                    {/* Atom 3 - bottom left */}
                    <circle cx="-75" cy="20" r="10" fill="white" stroke="#C2722A" strokeWidth="2" />
                    <circle cx="-75" cy="20" r="10" fill="#C2722A" opacity="0.1" />
                    <text x="-75" y="24" textAnchor="middle" fontSize="8" fontWeight="700" fill="#C2722A" fontFamily="sans-serif">O</text>

                    {/* Atom 4 - right */}
                    <circle cx="75" cy="20" r="10" fill="white" stroke="#D4A853" strokeWidth="2" />
                    <circle cx="75" cy="20" r="10" fill="#D4A853" opacity="0.1" />
                    <text x="75" y="24" textAnchor="middle" fontSize="8" fontWeight="700" fill="#D4A853" fontFamily="sans-serif">N</text>

                    {/* Bond lines */}
                    <line x1="-55" y1="-50" x2="-22" y2="-35" stroke="#C2722A" strokeWidth="1.5" opacity="0.5" strokeDasharray="4 2" />
                    <line x1="55" y1="-50" x2="22" y2="-35" stroke="#D4A853" strokeWidth="1.5" opacity="0.5" strokeDasharray="4 2" />
                    <line x1="-65" y1="-15" x2="-55" y2="10" stroke="#C2722A" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 2" />
                    <line x1="65" y1="-15" x2="55" y2="10" stroke="#D4A853" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 2" />

                    {/* Decorative dots */}
                    <circle cx="0" cy="-90" r="3" fill="#C2722A" opacity="0.4" />
                    <circle cx="-85" cy="-20" r="2" fill="#D4A853" opacity="0.5" />
                    <circle cx="85" cy="-20" r="2" fill="#D4A853" opacity="0.5" />
                    <circle cx="0" cy="90" r="2" fill="#C2722A" opacity="0.3" />

                    <text x="0" y="88" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C2722A" opacity="0.5" fontFamily="sans-serif" letterSpacing="1">
                      WISSENSCHAFTSSTADT
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Key figures */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "44,3", label: "Top-Unternehmen / 100k Einw." },
                { value: "8.800", label: "Merck-Mitarbeiter in Darmstadt" },
                { value: "€30,8 Mrd.", label: "Umsatz Top-Unternehmen" },
                { value: "163.000", label: "Einwohner" },
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
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
                SEO in der Wissenschaftsstadt
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed">
                Darmstadt ist geprägt von Weltmarktführern: Merck KGaA –
                das weltälteste Pharma- und Chemieunternehmen, 1668 gegründet
                – hat hier seinen Hauptsitz mit 8.800 der weltweit 63.000
                Mitarbeiter. Software AG, heute Teil von OpenText, war einst
                Weltmarktführer in Business Software.
              </p>
              <p className="mt-3 text-base text-muted leading-relaxed">
                Was das für SEO bedeutet: Darmstädter Unternehmen spielen
                oft in einem globalen Liga. Ihre Keywords werden international
                umkämpft. Wer hier sichtbar sein will, braucht tiefes
                Branchenwissen, hochwertige Inhalte und technische Präzision.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-4">Darmstadts wirtschaftliche DNA</h3>
              <div className="space-y-3">
                {[
                  { label: "Pharma & Chemie", width: "85%" },
                  { label: "IT & Software", width: "75%" },
                  { label: "Biotech", width: "65%" },
                  { label: "Raumfahrt & Forschung", width: "55%" },
                  { label: "Elektroindustrie", width: "50%" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-dark font-medium">{item.label}</span>
                      <span className="text-muted">{item.width}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-border">
                      <div
                        className="h-2 rounded-full bg-primary opacity-70"
                        style={{ width: item.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industry focus */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-12">
              SEO-Leistungen für Darmstadt
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Pharma & Chemie SEO",
                  desc: "Compliance-konformer Content für Pharmaunternehmen. Wir kennen die Grenzen regulierter Branchen und entwickeln Strategien, die innerhalb dieser Grenzen maximale Wirkung erzielen.",
                },
                {
                  title: "Enterprise Software SEO",
                  desc: "B2B-Software hat lange Sales-Zyklen. Wir positionieren Softwareunternehmen für jeden Schritt: Awareness, Evaluation und Decision.",
                },
                {
                  title: "Forschung & Technologie",
                  desc: "Forschungseinrichtungen wie die TU Darmstadt und das DKFZ (Heidelberg/Darmstadt) brauchen SEO, das Wissenschaftler und Förderinstitutionen gleichermaßen anspricht.",
                },
                {
                  title: "Raumfahrt & Luft",
                  desc: "Mit ESA ESOC (European Space Operations Centre) in Darmstadt ist Raumfahrt mehr als ein Randthema. Wir entwickeln B2B-SEO für Zulieferer und Technologieanbieter.",
                },
                {
                  title: "Hochschul-Spin-offs",
                  desc: "TU Darmstadt generiert starke Spin-offs. Wir helfen jungen Unternehmen, ihre technologische Überlegenheit in organischen Traffic und Leads umzuwandeln.",
                },
                {
                  title: "Lokale Dienstleister",
                  desc: "Auch für Darmstadts 163.000 Einwohner relevant: Kanzleien, Praxen, Handwerker und Gastronomen profitieren von lokalem SEO.",
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
            Warum SeoForge für Darmstadt?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Wissenschaftliche Autorität", desc: "Wir bauen E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) auf – entscheidend für Pharma und Tech-SEO." },
              { title: "B2B-Fokus", desc: "Internationale Entscheider bei Merck, Software AG und Co. recherchieren online. Wir machen Sie für genau diese Menschen sichtbar." },
              { title: "Technisches SEO", desc: "Komplexe Websites brauchen solides technisches Fundament. Wir auditieren und optimieren systematisch." },
              { title: "Mehrsprachigkeit", desc: "Internationaler Anspruch erfordert internationale Reichweite. Wir entwickeln DE/EN-Strategien." },
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
              FAQ: SEO Agentur Darmstadt
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
              Sichtbarkeit auf Weltmarktführer-Niveau.
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Kostenlose SEO-Analyse für Ihr Darmstädter Unternehmen.
              Wir zeigen, wo die Lücken sind und wie wir sie schließen.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Jetzt Analyse anfordern
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
