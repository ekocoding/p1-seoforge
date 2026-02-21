import type { Metadata } from "next";
import SubpageLayout from "../../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur Freiburg im Breisgau | SeoForge – Nachhaltigkeit & Tourismus SEO",
  description:
    "SEO Agentur Freiburg: Solar-Pionier, Universitätsstadt und Schwarzwald-Tor. Nachhaltige Wirtschaft, Forschung und Tourismus brauchen starkes SEO.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Freiburg im Breisgau",
  description:
    "SEO für nachhaltige Unternehmen, Tourismus und Wissenschaftsinstitutionen in Freiburg im Breisgau.",
  url: "https://seoforge.de/standorte/seo-agentur-freiburg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Freiburg im Breisgau",
    addressCountry: "DE",
  },
  areaServed: "Freiburg im Breisgau",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Warum ist Freiburg ein einzigartiger SEO-Standort?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Freiburg kombiniert drei starke SEO-Themenfelder: Nachhaltigkeit und Solarenergie (Fraunhofer ISE, Vauban-Solarsiedlung), Wissenschaft (Albert-Ludwigs-Universität, gegründet 1457, 32.500 Studierende) und Tourismus (Schwarzwald-Gateway). Diese Vielfalt schafft ein ungewöhnlich breites Spektrum an SEO-Möglichkeiten.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Freiburger Nachhaltigkeitsunternehmen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nachhaltigkeit ist Freiburgs stärkstes Brand-Signal. Unternehmen aus Solarenergie, Green Tech und nachhaltiger Produktion profitieren von Content-Strategien, die Expertise und Authentizität verbinden. Wir kennen die SEO-Eigenheiten dieses Themenfeldes und bauen echte Autorität auf.",
      },
    },
    {
      "@type": "Question",
      name: "Ist Tourismus-SEO in Freiburg besonders relevant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolut. Mit 237.244 Einwohnern und als Hauptzugang zum Schwarzwald ist Freiburg eine stark besuchte Stadt. Hotels, Restaurants, Weingüter und Tourismusanbieter finden in lokalem SEO und Tourismus-Content-Strategien enormes Potenzial.",
      },
    },
    {
      "@type": "Question",
      name: "Wie positioniert sich eine Freiburger Universität oder ein Forschungsinstitut mit SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wissenschaftliche Institutionen wie die Albert-Ludwigs-Universität oder das Fraunhofer ISE benötigen SEO, das Forschungsexzellenz kommuniziert – ohne wissenschaftliche Qualität zu verwässern. Wir entwickeln Strategien für Forschungstransfer, Studierendengewinnung und internationale Sichtbarkeit.",
      },
    },
  ],
};

export default function FreiburgPage() {
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
                    Freiburg im Breisgau · Schwarzwald · Baden-Württemberg
                  </span>
                </div>
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl">
                  SEO Agentur{" "}
                  <span className="text-primary">Freiburg</span>
                </h1>
                <p className="hero-description mt-5 text-lg leading-relaxed text-muted">
                  Solar-Pionier, Universitätsstadt, Schwarzwald-Tor und
                  Nachhaltigkeitsmetropole: Freiburg vereint in einer Stadt,
                  was andere in ganzen Regionen suchen. SEO, das dieser
                  Einzigartigkeit gerecht wird, ist unsere Spezialität.
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

              {/* Freiburg SVG – Sun rays / Solar energy */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 240 240"
                  width="320"
                  height="320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Freiburg Solarenergie und Nachhaltigkeit Illustration"
                >
                  <g transform="translate(120,120)">
                    {/* Outer glow */}
                    <circle cx="0" cy="0" r="100" fill="#D4A853" opacity="0.05" />
                    <circle cx="0" cy="0" r="85" fill="#D4A853" opacity="0.04" />

                    {/* Long sun rays */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i * 30 * Math.PI) / 180;
                      const x1 = Math.cos(angle) * 48;
                      const y1 = Math.sin(angle) * 48;
                      const x2 = Math.cos(angle) * 90;
                      const y2 = Math.sin(angle) * 90;
                      const isMain = i % 2 === 0;
                      return (
                        <line
                          key={i}
                          x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke={isMain ? "#D4A853" : "#C2722A"}
                          strokeWidth={isMain ? 3 : 1.5}
                          strokeLinecap="round"
                          opacity={isMain ? 0.9 : 0.5}
                        />
                      );
                    })}

                    {/* Solar panel hexagons */}
                    {[
                      [0, 0, 38],
                    ].map(([cx, cy, r], i) => (
                      <circle key={i} cx={cx} cy={cy} r={r} fill="#D4A853" opacity="0.15" stroke="#D4A853" strokeWidth="2" />
                    ))}

                    {/* Inner sun circle */}
                    <circle cx="0" cy="0" r="35" fill="#D4A853" opacity="0.9" />
                    <circle cx="0" cy="0" r="35" fill="white" opacity="0.15" />

                    {/* Solar panel grid on sun */}
                    <line x1="-25" y1="0" x2="25" y2="0" stroke="white" strokeWidth="1.5" opacity="0.5" />
                    <line x1="0" y1="-25" x2="0" y2="25" stroke="white" strokeWidth="1.5" opacity="0.5" />
                    <line x1="-18" y1="-18" x2="18" y2="18" stroke="white" strokeWidth="1" opacity="0.3" />
                    <line x1="18" y1="-18" x2="-18" y2="18" stroke="white" strokeWidth="1" opacity="0.3" />

                    {/* Circular orbit rings */}
                    <circle cx="0" cy="0" r="48" stroke="#C2722A" strokeWidth="1" fill="none" opacity="0.2" strokeDasharray="3 5" />
                    <circle cx="0" cy="0" r="65" stroke="#D4A853" strokeWidth="0.8" fill="none" opacity="0.15" strokeDasharray="2 8" />

                    {/* Planet dots on orbit */}
                    <circle cx="48" cy="0" r="5" fill="#C2722A" opacity="0.6" />
                    <circle cx="-33" cy="-34" r="4" fill="#D4A853" opacity="0.7" />
                    <circle cx="23" cy="-42" r="3" fill="#C2722A" opacity="0.5" />

                    {/* Leaf / sustainability accent */}
                    <path d="M -65 -65 Q -40 -80 -20 -65 Q -40 -50 -65 -65 Z" fill="#C2722A" opacity="0.25" />
                    <path d="M 65 -65 Q 40 -80 20 -65 Q 40 -50 65 -65 Z" fill="#C2722A" opacity="0.2" />

                    {/* SEO text in center */}
                    <text x="0" y="5" textAnchor="middle" fontSize="10" fontWeight="800" fill="white" fontFamily="sans-serif" letterSpacing="1">
                      SEO
                    </text>

                    <text x="0" y="92" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C2722A" opacity="0.5" fontFamily="sans-serif" letterSpacing="1">
                      FREIBURG · SOLAR CITY
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
                { value: "32.500", label: "Studierende (Uni Freiburg)" },
                { value: "83", label: "Top-Unternehmen" },
                { value: "€14,6 Mrd.", label: "BIP Freiburg" },
                { value: "seit 1457", label: "Universität Freiburg" },
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
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
                Freiburg: Nachhaltigkeit als Wirtschaftsstrategie
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed">
                Was in anderen Städten Marketingversprechen ist, ist in
                Freiburg gelebte Realität. Das Fraunhofer-Institut für
                Solare Energiesysteme (ISE) – weltweites Forschungszentrum
                für Solarenergie – hat hier seinen Sitz. Der Stadtteil
                Vauban ist weltweit als Solar-Gemeinschaft bekannt.
              </p>
              <p className="mt-3 text-base text-muted leading-relaxed">
                Diese Glaubwürdigkeit im Nachhaltigkeitsbereich schafft
                SEO-Chancen, die kaum ein anderer Standort bietet.
                Unternehmen aus Green Tech, erneuerbaren Energien und
                Öko-Konsumgütern können von Freiburgs Nachhaltigkeits-Aura
                profitieren – vorausgesetzt, ihre Online-Präsenz hält mit.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: "☀️", title: "Fraunhofer ISE", desc: "Weltgrößtes Solar-Forschungsinstitut mit Hauptsitz in Freiburg" },
                { icon: "🌿", title: "Vauban Solar-Community", desc: "International bekannter nachhaltiger Stadtteil" },
                { icon: "🎓", title: "Uni seit 1457", desc: "32.500 Studierende, internationale Ausrichtung" },
                { icon: "🌲", title: "Schwarzwald-Tor", desc: "Hauptzugangspunkt für Millionen Touristen jährlich" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-xl border border-border bg-offwhite p-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-dark text-sm">{item.title}</div>
                    <div className="text-xs text-muted mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-12">
              Branchen-SEO für Freiburg
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Solarenergie & Green Tech",
                  desc: "Als Heimat des Fraunhofer ISE ist Freiburg die erste Adresse für Solar-SEO. Wir positionieren Photovoltaik-Unternehmen, Energieberater und Solartechnologie-Anbieter.",
                  featured: true,
                },
                {
                  title: "Tourismus & Schwarzwald",
                  desc: "Hotels, Pensionen, Restaurants und Ausflugsziele am Schwarzwald gewinnen Gäste über Google. Lokales und Tourismus-SEO ist unser Handwerk.",
                  featured: false,
                },
                {
                  title: "Wissenschaft & Forschung",
                  desc: "Albert-Ludwigs-Universität, Fraunhofer, Max-Planck: Freiburg ist Wissenschaftsstandort. Wir helfen Spin-offs und Forschungspartnern, ihr Wissen digital zu vermarkten.",
                  featured: false,
                },
                {
                  title: "Nachhaltiger Konsum & Retail",
                  desc: "Freiburger Verbraucher sind nachhaltigkeitsorientiert. Bio-Läden, Slow Fashion und nachhaltige Marken finden hier ihre Stammkunden – wenn sie sichtbar sind.",
                  featured: false,
                },
                {
                  title: "Weinbau & Kulinarik",
                  desc: "Kaiserstuhl und Markgräflerland liegen vor der Haustür. Weingüter, Restaurants und Delikatessen-Anbieter profitieren von zielgruppengenauem SEO.",
                  featured: false,
                },
                {
                  title: "Gesundheit & Wellness",
                  desc: "Das Uniklinikum Freiburg und zahlreiche Praxen, Heilpraktiker und Wellness-Anbieter finden in SEO den direkten Weg zu neuen Patienten und Gästen.",
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
            Warum SeoForge für Freiburg?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Nachhaltigkeits-SEO", desc: "Wir kennen die spezifischen Suchbegriffe, Content-Formate und Linkbuilding-Strategien für die Green Economy." },
              { title: "Tourismus-Expertise", desc: "Lokales SEO, Google Maps, saisonale Kampagnen: Wir bringen Touristen auf Ihre Website." },
              { title: "Wissenschaftlicher Anspruch", desc: "Freiburgs intellektuelle Kultur fordert hochwertigen Content. Wir erfüllen diesen Anspruch." },
              { title: "Regional & Global", desc: "Schwarzwald-Tourismus ist international. Wir denken lokal und handeln global." },
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
              FAQ: SEO Agentur Freiburg
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
              Freiburger Stärken digital sichtbar machen.
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Kostenlose SEO-Analyse – wir zeigen Ihnen, wie Sie Freiburgs
              starkes Image für Ihr Unternehmen nutzen.
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
