import type { Metadata } from "next";
import SubpageLayout from "../../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur Frankfurt am Main | SeoForge – Finance & Consulting SEO",
  description:
    "SEO Agentur Frankfurt: Organische Sichtbarkeit in Europas Finanzhauptstadt. Spezialisiert auf Finance, Consulting und Logistik. Jetzt anfragen.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Frankfurt am Main",
  description:
    "SEO-Strategie für Finanzdienstleister, Beratungsunternehmen und Logistikfirmen in Frankfurt am Main.",
  url: "https://seoforge.de/standorte/seo-agentur-frankfurt",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Frankfurt am Main",
    addressCountry: "DE",
  },
  areaServed: "Frankfurt am Main",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Warum ist SEO für Frankfurter Finanzunternehmen so anspruchsvoll?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Frankfurt ist mit über 200 Banken – davon mehr als 80% ausländische Institute – und Institutionen wie der EZB und Deutsche Bundesbank der Finanzplatz Nr. 1 in Kontinentaleuropa. Entsprechend intensiv ist der digitale Wettbewerb um Suchbegriffe im Bereich Finanzdienstleistungen.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Branchen betreut SeoForge in Frankfurt besonders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unser Schwerpunkt in Frankfurt liegt auf Finanzdienstleistungen (13,3% der Wirtschaftsstruktur), Unternehmensberatung (13,5%) und Logistik (13,1%). Außerdem betreuen wir Legal-Tech-Kanzleien, Immobilienfirmen und Tech-Startups im Rhein-Main-Gebiet.",
      },
    },
    {
      "@type": "Question",
      name: "Kann SeoForge mehrsprachiges SEO für internationale Finanzinstitute in Frankfurt umsetzen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Da über 80% der Banken in Frankfurt ausländische Institute sind, bieten wir mehrsprachiges SEO auf Deutsch und Englisch an. Wir implementieren hreflang-Tags und entwickeln Content-Strategien, die internationale und nationale Zielgruppen erreichen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie wichtig ist lokales SEO im Vergleich zu nationalem SEO für Frankfurt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Frankfurt ist die Verbindung beider Ansätze entscheidend. Für Dienstleister mit lokalem Kundenstamm (Kanzleien, Praxen, Makler) ist lokales SEO unverzichtbar. Für Finanz- und Beratungsunternehmen, die national oder international agieren, steht nationales SEO im Vordergrund.",
      },
    },
  ],
};

export default function FrankfurtPage() {
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
        <section className="bg-dark text-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
                  <span className="text-xs font-semibold tracking-wider uppercase text-secondary">
                    Frankfurt am Main · Hessen
                  </span>
                </div>
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight sm:text-5xl">
                  SEO Agentur{" "}
                  <span className="text-secondary">Frankfurt am Main</span>
                </h1>
                <p className="hero-description mt-5 text-lg leading-relaxed text-white/70">
                  Mit 775.790 Einwohnern, 628.573 sozialversicherungspflichtigen
                  Jobs und Platz 9 der globalen Finanzzentren ist Frankfurt
                  Europas härtester SEO-Markt. Hier entscheidet organische
                  Sichtbarkeit über Mandanten, Investoren und Vertragsabschlüsse.
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
                    className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Unsere Leistungen
                  </Link>
                </div>
              </div>

              {/* Frankfurt SVG – Skyline / Financial chart bars */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 240 240"
                  width="320"
                  height="320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Frankfurt Skyline SEO Illustration"
                >
                  <g transform="translate(120,120)">
                    {/* Background circle */}
                    <circle cx="0" cy="0" r="100" fill="#C2722A" opacity="0.06" />

                    {/* Skyline bars representing Frankfurt buildings */}
                    {/* Base line */}
                    <line x1="-90" y1="45" x2="90" y2="45" stroke="#D4A853" strokeWidth="2" opacity="0.5" />

                    {/* Buildings from left to right */}
                    {/* Commerzbank Tower-inspired */}
                    <rect x="-80" y="-10" width="16" height="55" fill="#C2722A" opacity="0.6" rx="1" />
                    <rect x="-78" y="-18" width="12" height="10" fill="#C2722A" opacity="0.8" rx="1" />
                    <line x1="-72" y1="-28" x2="-72" y2="-18" stroke="#D4A853" strokeWidth="2" />

                    {/* Messeturm-inspired */}
                    <rect x="-56" y="5" width="14" height="40" fill="#C2722A" opacity="0.5" rx="1" />
                    <rect x="-55" y="-5" width="12" height="12" fill="#C2722A" opacity="0.7" rx="1" />
                    <polygon points="-49,-5 -52,-18 -46,-18" fill="#D4A853" opacity="0.9" />

                    {/* Central tall building */}
                    <rect x="-32" y="-35" width="20" height="80" fill="#C2722A" opacity="0.9" rx="1" />
                    <rect x="-30" y="-45" width="16" height="12" fill="#C2722A" rx="1" />
                    <line x1="-22" y1="-58" x2="-22" y2="-45" stroke="#D4A853" strokeWidth="2.5" />
                    {/* Windows */}
                    {[[-28,-30],[-28,-18],[-28,-6],[-16,-30],[-16,-18],[-16,-6]].map(([wx, wy], i) => (
                      <rect key={i} x={wx} y={wy} width="5" height="7" fill="#D4A853" opacity="0.5" rx="0.5" />
                    ))}

                    {/* EZB-inspired twin towers */}
                    <rect x="-2" y="-20" width="10" height="65" fill="#C2722A" opacity="0.65" rx="1" />
                    <rect x="13" y="-25" width="10" height="70" fill="#C2722A" opacity="0.55" rx="1" />
                    <path d="M 0 -20 Q 8 -35 16 -25" stroke="#D4A853" strokeWidth="1.5" fill="none" opacity="0.8" />

                    {/* Right building */}
                    <rect x="32" y="0" width="18" height="45" fill="#C2722A" opacity="0.5" rx="1" />
                    <rect x="34" y="-8" width="14" height="10" fill="#C2722A" opacity="0.6" rx="1" />

                    {/* Far right small */}
                    <rect x="58" y="15" width="14" height="30" fill="#C2722A" opacity="0.4" rx="1" />

                    {/* Trend line (SEO/finance) */}
                    <polyline
                      points="-85,40 -60,25 -35,15 0,-5 30,10 60,-15 85,-30"
                      stroke="#D4A853"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <circle cx="85" cy="-30" r="4" fill="#D4A853" />

                    {/* Euro symbol */}
                    <text x="0" y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill="#D4A853" opacity="0.6" fontFamily="sans-serif">
                      FRANKFURT SEO
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Key stats bar */}
        <section className="border-b border-border bg-offwhite">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "#9", label: "Globales Finanzzentrum" },
                { value: "200+", label: "Banken in Frankfurt" },
                { value: "439", label: "Top-Unternehmen" },
                { value: "775.790", label: "Einwohner" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* City-specific intro */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              Warum Frankfurt ein eigenes SEO-Playbook braucht
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed">
              Kein anderer Standort in Deutschland vereint so viele
              hochwertige Branchen auf so engem Raum wie Frankfurt. Die
              Wirtschaftsstruktur ist bemerkenswert ausgewogen: Beratung
              (13,5%), Finanzdienstleistungen (13,3%) und Logistik (13,1%)
              bilden das Rückgrat – jede mit eigenen Suchintentionen,
              eigener Wettbewerbsdichte und eigenem Content-Bedarf.
            </p>
            <p className="mt-3 text-base text-muted leading-relaxed">
              Wer in Frankfurt für "Unternehmensberatung", "Steuerberater"
              oder "M&A Beratung" ranken will, konkurriert mit Weltkonzernen
              und spezialisierten Boutiques gleichermaßen. SEO-Erfolg in
              Frankfurt bedeutet: messerscharfe Positionierung, hochwertige
              Inhalte und technische Exzellenz.
            </p>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
                Branchen-SEO für Frankfurt
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Finanzdienstleistungen & Banken",
                  desc: "EZB, Deutsche Bundesbank, Deutsche Bank: Der Frankfurter Finanzmarkt setzt Standards. Wir entwickeln Compliance-konforme SEO-Strategien für Banken, Fonds und FinTechs.",
                  highlight: true,
                },
                {
                  title: "Unternehmensberatung & Wirtschaftsprüfung",
                  desc: "Big Four, Boutique-Beratungen und spezialisierte Kanzleien kämpfen um dieselben Keywords. Thought Leadership Content ist der Schlüssel.",
                  highlight: false,
                },
                {
                  title: "Logistik & Transport",
                  desc: "Frankfurt Airport ist Deutschlands größter Luftfrachtumschlagplatz. Logistikdienstleister, Spediteure und Supply-Chain-Anbieter finden hier ihre Zielgruppe.",
                  highlight: false,
                },
                {
                  title: "Legal Tech & Kanzleien",
                  desc: "Frankfurter Wirtschaftskanzleien konkurrieren international. SEO für juristische Dienstleistungen erfordert Expertise und Sensibilität.",
                  highlight: false,
                },
                {
                  title: "Immobilien & PropTech",
                  desc: "Frankfurt ist Deutschlands teuerster Gewerbeimmobilienmarkt. Makler, Entwickler und PropTech-Unternehmen brauchen starke digitale Präsenz.",
                  highlight: false,
                },
                {
                  title: "Tech & Startups",
                  desc: "Frankfurts Startup-Ökosystem wächst. Wir helfen jungen Unternehmen, schnell organische Sichtbarkeit aufzubauen – auch mit begrenztem Budget.",
                  highlight: false,
                },
              ].map((industry) => (
                <div
                  key={industry.title}
                  className={`rounded-xl border p-6 ${
                    industry.highlight
                      ? "border-primary/30 bg-primary/5"
                      : "border-border bg-white"
                  }`}
                >
                  <h3 className="font-semibold text-dark mb-2">{industry.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{industry.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why SeoForge */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
                Warum SeoForge für Frankfurt?
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed">
                Frankfurt vergibt keine SEO-Punkte für Mittelmäßigkeit. Nur
                wer mit exzellentem Content, technischer Präzision und
                strategischem Linkbuilding überzeugt, kämpft sich in die
                Top-3.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Finance-Expertise", desc: "Wir kennen regulatorische Anforderungen und Compliance-Grenzen für Content in der Finanzbranche." },
                { title: "Mehrsprachig", desc: "Deutsch und Englisch. Für Frankfurts internationale Unternehmen und ausländische Investoren." },
                { title: "Wettbewerbsanalyse", desc: "Wir analysieren Ihren spezifischen Wettbewerb im Frankfurter Markt – nicht generische Rankings." },
                { title: "Messbarer ROI", desc: "Klare KPIs, monatliche Reports, transparente Kosten. Kein Agentur-Bla-Bla." },
              ].map((b) => (
                <div key={b.title} className="rounded-xl border border-border bg-offwhite p-5">
                  <h3 className="font-semibold text-dark text-sm mb-1">{b.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-offwhite border-t border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-10">
              FAQ: SEO Agentur Frankfurt
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
          <div className="rounded-3xl bg-gradient-to-br from-dark to-dark-light px-8 py-14 text-center border border-primary/20">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 mb-6">
              <span className="text-xs font-semibold text-primary">Frankfurt am Main</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white">
              Frankfurt rankt mit SeoForge.
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Kostenlose SEO-Analyse für Ihr Frankfurter Unternehmen.
              Wir zeigen Ihnen, wo Ihre Wettbewerber Sie überholen –
              und wie wir das ändern.
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
