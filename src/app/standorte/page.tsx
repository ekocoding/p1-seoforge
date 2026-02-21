import type { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur in Ihrer Region | SeoForge – Standorte",
  description:
    "SeoForge bietet lokale SEO-Expertise in Stuttgart, Frankfurt, Heidelberg, Karlsruhe und weiteren deutschen Städten. Jetzt regionale Beratung anfragen.",
};

const cities = [
  {
    slug: "seo-agentur-stuttgart",
    name: "Stuttgart",
    teaser:
      "Automotive-Hochburg mit 31.400 Unternehmen. Wir positionieren Zulieferer, Technologiefirmen und B2B-Anbieter in einem der härtesten SEO-Wettbewerbe Deutschlands.",
    industry: "Automotive · IT · Engineering",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
      </svg>
    ),
  },
  {
    slug: "seo-agentur-frankfurt",
    name: "Frankfurt am Main",
    teaser:
      "Europas Finanzhauptstadt mit über 200 Banken. In diesem hart umkämpften Markt ist organische Sichtbarkeit der entscheidende Wettbewerbsvorteil.",
    industry: "Finance · Consulting · Logistics",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    slug: "seo-agentur-karlsruhe",
    name: "Karlsruhe",
    teaser:
      "Mit 4.800 IT-Unternehmen und 30.000 IT-Jobs ist Karlsruhe Deutschlands Tech-Hub Nr. 1 – und ein Markt, in dem SEO über Wachstum entscheidet.",
    industry: "IT · Cyber-Security · Research",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    slug: "seo-agentur-heidelberg",
    name: "Heidelberg",
    teaser:
      "Wissenschaftsstadt mit 62 Biotech-Unternehmen und einer Universität, die seit 1386 Maßstäbe setzt. Wir helfen Wissensunternehmen, online sichtbar zu werden.",
    industry: "Biotech · Pharma · Wissenschaft",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    slug: "seo-agentur-darmstadt",
    name: "Darmstadt",
    teaser:
      "Wissenschaftsstadt mit weltführenden Unternehmen wie Merck KGaA. Wir navigieren komplexe B2B-Märkte mit gezielter SEO-Strategie.",
    industry: "Pharma · Software · Chemistry",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    slug: "seo-agentur-mainz",
    name: "Mainz",
    teaser:
      "Medienhauptstadt mit 1.710 Medienfirmen und Heimat des ZDF. Content-starke Branchen brauchen SEO, das mithalten kann.",
    industry: "Medien · Healthcare · Glas",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.824l-.005-.006.005-.005.005.005-.005.006zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm0-2.824l-.005-.005.006-.005.005.005-.006.005zM9.255 13.5l.005.006h-.01l.005-.006zm3.249 2.24l-.005.005-.006-.005.006-.005.005.005zm-2.124-2.24l.005.006h-.01l.005-.006zm2.119-.005l.005.005-.006.005-.005-.005.006-.005zM12 18l-.005-.006.005-.005.005.005-.005.006z" />
      </svg>
    ),
  },
  {
    slug: "seo-agentur-wiesbaden",
    name: "Wiesbaden",
    teaser:
      "Hessens Landeshauptstadt mit starkem Dienstleistungssektor. 85% der Beschäftigten arbeiten im Service – ein ideales Umfeld für lokales SEO.",
    industry: "Versicherung · IT · Public Sector",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    slug: "seo-agentur-pforzheim",
    name: "Pforzheim",
    teaser:
      "Die Goldstadt: 80% allen aus Deutschland exportierten Schmucks kommen von hier. Nischen-Excellence braucht digitale Sichtbarkeit.",
    industry: "Schmuck · E-Commerce · Precision",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    slug: "seo-agentur-ulm",
    name: "Ulm",
    teaser:
      "Wirtschaftlich stärkste Region Europas mit 6.500 Unternehmen. Von Fahrzeugtechnik bis IT – Ulmer Firmen brauchen SEO, das wächst.",
    industry: "IT · Electronics · Manufacturing",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    slug: "seo-agentur-freiburg",
    name: "Freiburg im Breisgau",
    teaser:
      "Solar-Pionier und Universitätsstadt am Fuß des Schwarzwalds. Nachhaltige Wirtschaft braucht nachhaltige SEO-Strategien.",
    industry: "Nachhaltigkeit · Tourismus · Wissenschaft",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    slug: "seo-agentur-koblenz",
    name: "Koblenz",
    teaser:
      "Weltmarktführer im Healthcare-IT und UNESCO-Welterbe am Rhein. Wir verbinden lokale Stärke mit digitaler Reichweite.",
    industry: "Healthcare IT · Logistik · Tourismus",
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

export default function StandortePage() {
  return (
    <SubpageLayout>
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-offwhite border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                  Regionale SEO-Expertise
                </span>
              </div>
              <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl lg:text-6xl">
                SEO Agentur in{" "}
                <span className="text-primary">Ihrer Region</span>
              </h1>
              <p className="hero-description mt-6 text-lg leading-relaxed text-muted max-w-2xl mx-auto">
                Lokales SEO gewinnen, wer den Markt kennt. Unsere Experten
                verstehen die wirtschaftlichen Besonderheiten jeder Stadt –
                von der Automotive-Hochburg Stuttgart bis zur Medienstadt
                Mainz. Wählen Sie Ihren Standort:
              </p>
            </div>
          </div>
        </section>

        {/* City Grid */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/standorte/${city.slug}`}
                className="group relative flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8">
                    {city.icon}
                  </div>
                  <svg
                    className="h-5 w-5 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>

                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark group-hover:text-primary transition-colors duration-200">
                  {city.name}
                </h2>

                <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
                  {city.teaser}
                </p>

                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-xs font-medium text-primary/70 tracking-wide">
                    {city.industry}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Local SEO */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                    Warum lokales SEO?
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
                  Jeder Markt tickt anders.{" "}
                  <span className="text-primary">Ihre SEO auch.</span>
                </h2>
                <p className="mt-4 text-base text-muted leading-relaxed">
                  Ein Stuttgarter Automobilzulieferer konkurriert anders als
                  eine Frankfurter Unternehmensberatung oder ein Pforzheimer
                  Schmuckhändler. Wer diese Unterschiede nicht versteht,
                  verschwendet SEO-Budget.
                </p>
                <p className="mt-3 text-base text-muted leading-relaxed">
                  Wir analysieren den lokalen Wettbewerb, die Suchintentionen
                  Ihrer Zielgruppe und die wirtschaftlichen Besonderheiten
                  Ihres Standorts – und entwickeln daraus eine SEO-Strategie,
                  die wirklich funktioniert.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Lokale Märkte analysiert", value: "11+" },
                  { label: "Städte & Regionen", value: "DE-weit" },
                  { label: "Ø Traffic-Steigerung", value: "+240%" },
                  { label: "Beratungsgespräche kostenlos", value: "100%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-white p-5"
                  >
                    <div className="font-[family-name:var(--font-heading)] text-3xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="rounded-3xl bg-dark px-8 py-14 text-center lg:px-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white sm:text-4xl">
              Noch keinen passenden Standort gefunden?
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Wir betreuen Kunden aus ganz Deutschland – auch aus Städten, die
              oben nicht gelistet sind. Sprechen Sie uns an.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Kostenlos beraten lassen
              </Link>
              <Link
                href="/seo-agentur"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Über SeoForge
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
