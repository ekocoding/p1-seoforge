import type { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur in Ihrer Region | SeoForge – 11 Standorte in Deutschland",
  description:
    "SeoForge bietet lokale SEO-Expertise in Stuttgart, Frankfurt, Heidelberg, Karlsruhe, Freiburg, Mainz und weiteren deutschen Städten.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/standorte" },
};

const cities = [
  {
    slug: "seo-agentur-stuttgart",
    name: "Stuttgart",
    image: "/images/cities/stuttgart-hero.jpg",
    einwohner: "635.000",
    focus: "Automotive · IT · Engineering",
    tagline: "Automotive-Hauptstadt",
    teaser: "Bosch, Porsche, Mercedes — B2B-SEO für den härtesten Industriemarkt Deutschlands.",
    potential: 5,
    potentialLabel: "Sehr hoch",
    region: "Baden-Württemberg",
  },
  {
    slug: "seo-agentur-frankfurt",
    name: "Frankfurt",
    image: "/images/cities/frankfurt-hero.jpg",
    einwohner: "773.000",
    focus: "Finanz · FinTech · Consulting",
    tagline: "Europas Finanzmetropole",
    teaser: "EZB, 200+ Banken, internationaler B2B-Markt — die höchsten SEO-Suchvolumen Deutschlands.",
    potential: 5,
    potentialLabel: "Sehr hoch",
    region: "Hessen",
  },
  {
    slug: "seo-agentur-heidelberg",
    name: "Heidelberg",
    image: "/images/cities/heidelberg-hero.jpg",
    einwohner: "155.000",
    focus: "Biotech · Wissenschaft · Tourismus",
    tagline: "Biotech-Hub & Universitätsstadt",
    teaser: "30+ Biotech-Firmen, 66% Wissensberufe — SEO für akademisch geprägte Märkte.",
    potential: 4,
    potentialLabel: "Hoch",
    region: "Baden-Württemberg",
  },
  {
    slug: "seo-agentur-karlsruhe",
    name: "Karlsruhe",
    image: "/images/cities/karlsruhe-hero.jpg",
    einwohner: "309.050",
    focus: "IT · KI · Cyber Security",
    tagline: "Deutschlands IT-Hauptstadt",
    teaser: "KIT, Cyber Valley, 1.200+ Tech-Firmen — Nischen-SEO für den dichtesten Techmarkt.",
    potential: 4,
    potentialLabel: "Hoch",
    region: "Baden-Württemberg",
  },
  {
    slug: "seo-agentur-mainz",
    name: "Mainz",
    image: "/images/cities/mainz-hero.jpg",
    einwohner: "218.000",
    focus: "Life Sciences · Medien · Wein",
    tagline: "BioNTech-Heimat & ZDF-Standort",
    teaser: "BioNTech, ZDF und Gutenberg-Uni — SEO für Life Sciences und Medienunternehmen.",
    potential: 3,
    potentialLabel: "Mittel-Hoch",
    region: "Rheinland-Pfalz",
  },
  {
    slug: "seo-agentur-wiesbaden",
    name: "Wiesbaden",
    image: "/images/cities/wiesbaden-hero.jpg",
    einwohner: "285.000",
    focus: "Versicherung · Finanz · Tourismus",
    tagline: "Hessische Landeshauptstadt",
    teaser: "Destatis, BKA und Rheingau — SEO für anspruchsvolle Dienstleistungsmärkte.",
    potential: 3,
    potentialLabel: "Mittel-Hoch",
    region: "Hessen",
  },
  {
    slug: "seo-agentur-darmstadt",
    name: "Darmstadt",
    image: "/images/cities/darmstadt-hero.jpg",
    einwohner: "160.000",
    focus: "Life Sciences · IT · Raumfahrt",
    tagline: "Wissenschaftsstadt mit ESOC",
    teaser: "TU Darmstadt, Merck KGaA, ESOC — hohe Tech-Dichte, internationaler Fachkräftepool.",
    potential: 4,
    potentialLabel: "Hoch",
    region: "Hessen",
  },
  {
    slug: "seo-agentur-freiburg",
    name: "Freiburg",
    image: "/images/cities/freiburg-hero.jpg",
    einwohner: "235.000",
    focus: "Cleantech · Solar · Tourismus",
    tagline: "Solarhauptstadt Deutschlands",
    teaser: "Fraunhofer ISE, Schwarzwald-Tourismus — SEO für grüne Technologie und Destinationen.",
    potential: 3,
    potentialLabel: "Mittel",
    region: "Baden-Württemberg",
  },
  {
    slug: "seo-agentur-pforzheim",
    name: "Pforzheim",
    image: "/images/cities/pforzheim-hero.jpg",
    einwohner: "125.000",
    focus: "Schmuck · E-Commerce · Mittelstand",
    tagline: "Die Goldstadt",
    teaser: "700+ Schmuck- und Uhrenbetriebe — E-Commerce-SEO für Made-in-Pforzheim-Qualität.",
    potential: 3,
    potentialLabel: "Wächst",
    region: "Baden-Württemberg",
  },
  {
    slug: "seo-agentur-koblenz",
    name: "Koblenz",
    image: "/images/cities/koblenz-hero.jpg",
    einwohner: "115.000",
    focus: "Verwaltung · Tourismus · Logistik",
    tagline: "Am Deutschen Eck",
    teaser: "UNESCO Welterbe Mittelrhein, BAAINBw — SEO für Mittelrhein-Unternehmen.",
    potential: 2,
    potentialLabel: "Mittel",
    region: "Rheinland-Pfalz",
  },
  {
    slug: "seo-agentur-ulm",
    name: "Ulm",
    image: "/images/cities/ulm-hero.jpg",
    einwohner: "128.000",
    focus: "Medizintechnik · Automotive · IT",
    tagline: "Einsteins Geburtsstadt",
    teaser: "Daimler Truck und Medizintechnik-Cluster — SEO für Innovation an Donau und A8.",
    potential: 3,
    potentialLabel: "Wächst",
    region: "Baden-Württemberg",
  },
];

function PotentialBar({ count }: { count: number }) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-1.5 rounded-full transition-all"
          style={{
            width: "12px",
            background: i <= count ? "#C2722A" : "rgba(255,255,255,0.1)",
          }}
        />
      ))}
    </div>
  );
}

export default function StandortePage() {
  const featured = cities.slice(0, 3);
  const mosaicCities = cities.slice(0, 9);

  return (
    <SubpageLayout>

      {/* ══════════════════════════════════════════════════════
          1. HERO — dunkel, geteiltes Layout: Text + Mosaik
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-dark overflow-hidden" style={{ minHeight: "92vh" }}>
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 items-center">

            {/* Left: Headline */}
            <div>
              <nav className="flex items-center gap-2 text-xs text-white/30 font-mono mb-10 hero-badge">
                <Link href="/" className="hover:text-white/60 transition-colors">SeoForge</Link>
                <span>/</span>
                <span className="text-white/50">Standorte</span>
              </nav>

              <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-6 hero-badge">
                / 11 Städte · Südwest &amp; Rhein-Main
              </p>

              <h1
                className="font-[family-name:var(--font-heading)] font-bold text-white hero-title"
                style={{ fontSize: "clamp(52px, 7.5vw, 112px)", lineHeight: 1.0, letterSpacing: "-0.02em" }}
              >
                SEO wo<br />
                der Markt<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  wirklich ist.
                </span>
              </h1>

              <p className="text-white/45 text-xl leading-relaxed mt-8 mb-10 max-w-md hero-description">
                Lokaler Wettbewerb ist real. Regionale Suchintentionen auch.
                Wir kennen Ihre Stadt — nicht nur von der Karte.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 hero-cta">
                <a
                  href="#standorte"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200"
                  style={{ background: "linear-gradient(135deg, #C2722A, #a35f22)" }}
                >
                  Standort wählen
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <Link
                  href="/seo/audit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200"
                >
                  Kostenlosen Audit anfragen
                </Link>
              </div>

              {/* Stat row */}
              <div className="mt-14 pt-8 border-t border-white/8 grid grid-cols-3 gap-6">
                {[
                  { val: "11", sub: "Standorte" },
                  { val: "5,8 Mio.", sub: "Einwohner im Einzugsgebiet" },
                  { val: "4.9 ★", sub: "Kundenbewertung" },
                ].map(({ val, sub }) => (
                  <div key={sub}>
                    <div
                      className="font-[family-name:var(--font-heading)] font-bold text-white"
                      style={{ fontSize: "clamp(20px, 2.5vw, 30px)" }}
                    >
                      {val}
                    </div>
                    <div className="text-xs text-white/30 font-mono mt-1">{sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3×3 Stadtmosaik */}
            <div className="hidden lg:grid grid-cols-3 gap-1 rounded-2xl overflow-hidden" style={{ height: "480px" }}>
              {mosaicCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/standorte/${city.slug}`}
                  className="group relative overflow-hidden"
                >
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="160px"
                  />
                  <div className="absolute inset-0 bg-dark/65 group-hover:bg-dark/30 transition-colors duration-400" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(194,114,42,0.4), transparent)" }}
                  />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-mono font-semibold truncate">{city.name}</p>
                  </div>
                  {/* Top line accent on hover */}
                  <div className="absolute inset-x-0 top-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                  />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. NUMBERED CITY LIST — Bloomberg-Terminal-Stil
      ══════════════════════════════════════════════════════ */}
      <section id="standorte" className="bg-dark border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">

          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">/ Alle Standorte</p>
              <h2
                className="font-[family-name:var(--font-heading)] font-bold text-white"
                style={{ fontSize: "clamp(22px, 3vw, 40px)" }}
              >
                Wählen Sie Ihren Standort
              </h2>
            </div>
            <p className="hidden sm:block font-mono text-xs text-white/25 pb-1">
              11 Märkte · Südwest &amp; Rhein-Main
            </p>
          </div>

          <div className="divide-y divide-white/6">
            {cities.map((city, i) => (
              <Link
                key={city.slug}
                href={`/standorte/${city.slug}`}
                className="group flex items-center gap-5 py-4 px-3 -mx-3 hover:bg-white/[0.03] rounded-lg transition-colors duration-150"
              >
                {/* Index */}
                <span className="font-mono text-xs text-white/20 w-6 flex-shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Thumbnail */}
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-200">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>

                {/* Name + tagline */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-[family-name:var(--font-heading)] font-bold text-white group-hover:text-primary transition-colors duration-150 truncate"
                    style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}
                  >
                    {city.name}
                  </p>
                  <p className="text-xs text-white/35 font-mono mt-0.5 truncate">{city.focus}</p>
                </div>

                {/* Einwohner */}
                <p className="hidden md:block text-white/30 text-xs font-mono flex-shrink-0 tabular-nums">
                  {city.einwohner} Einw.
                </p>

                {/* Potential bar */}
                <div className="hidden lg:block flex-shrink-0">
                  <PotentialBar count={city.potential} />
                </div>

                {/* Arrow */}
                <div className="w-8 h-8 rounded-full border border-white/12 flex items-center justify-center flex-shrink-0 group-hover:border-primary group-hover:bg-primary transition-all duration-200">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. EDITORIAL FEATURE — Asymmetrisches Layout
      ══════════════════════════════════════════════════════ */}
      <section className="border-t border-white/5" style={{ background: "#141414" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">

          <div className="mb-14">
            <p className="font-mono text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">/ Kernmärkte</p>
            <h2
              className="font-[family-name:var(--font-heading)] font-bold text-white"
              style={{ fontSize: "clamp(24px, 3.5vw, 48px)" }}
            >
              Drei Städte. Drei Strategien.
            </h2>
          </div>

          {/* 1 gross + 2 gestapelt */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4" style={{ height: "clamp(480px, 60vh, 640px)" }}>

            {/* Grosse linke Karte */}
            <Link
              href={`/standorte/${featured[0].slug}`}
              className="group relative rounded-2xl overflow-hidden"
            >
              <Image
                src={featured[0].image}
                alt={featured[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/10" />
              <div className="absolute inset-x-0 top-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }} />

              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 bg-white/8 text-xs font-mono text-white/70 mb-4 backdrop-blur-sm">
                  {featured[0].einwohner} Einwohner · {featured[0].region}
                </span>
                <h3
                  className="font-[family-name:var(--font-heading)] font-bold text-white mb-2"
                  style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
                >
                  {featured[0].name}
                </h3>
                <p className="text-primary font-mono text-xs mb-4">{featured[0].tagline}</p>
                <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-sm">{featured[0].teaser}</p>
                <span
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 group-hover:gap-3"
                  style={{ background: "rgba(194,114,42,0.75)", backdropFilter: "blur(8px)" }}
                >
                  Zur Standortseite
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Zwei rechte Karten gestapelt */}
            <div className="grid grid-rows-2 gap-4">
              {featured.slice(1).map((city) => (
                <Link
                  key={city.slug}
                  href={`/standorte/${city.slug}`}
                  className="group relative rounded-2xl overflow-hidden"
                >
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/15" />
                  <div className="absolute inset-x-0 top-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }} />

                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <p className="text-primary font-mono text-xs mb-1">{city.tagline}</p>
                    <h3
                      className="font-[family-name:var(--font-heading)] font-bold text-white mb-2"
                      style={{ fontSize: "clamp(20px, 2.5vw, 30px)" }}
                    >
                      {city.name}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{city.teaser}</p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. DATEN-TABELLE — einzige helle Sektion
      ══════════════════════════════════════════════════════ */}
      <section className="bg-offwhite border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">

          <div className="mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">/ Standort-Index</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              Alle 11 Märkte im Überblick
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-offwhite">
                  <th className="px-6 py-4 font-mono text-xs font-semibold text-muted uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 font-mono text-xs font-semibold text-muted uppercase tracking-wider">Stadt</th>
                  <th className="px-6 py-4 font-mono text-xs font-semibold text-muted uppercase tracking-wider hidden sm:table-cell">Region</th>
                  <th className="px-6 py-4 font-mono text-xs font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Einwohner</th>
                  <th className="px-6 py-4 font-mono text-xs font-semibold text-muted uppercase tracking-wider hidden lg:table-cell">Schwerpunkt</th>
                  <th className="px-6 py-4 font-mono text-xs font-semibold text-muted uppercase tracking-wider">SEO-Potenzial</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cities.map((city, i) => (
                  <tr key={city.slug} className="group hover:bg-primary/5 transition-colors duration-100">
                    <td className="px-6 py-4 font-mono text-xs text-muted tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={city.image} alt={city.name} fill className="object-cover" sizes="32px" />
                        </div>
                        <div>
                          <p className="font-semibold text-dark text-sm">{city.name}</p>
                          <p className="text-xs text-muted font-mono">{city.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted text-xs hidden sm:table-cell">{city.region}</td>
                    <td className="px-6 py-4 text-muted text-xs font-mono tabular-nums hidden md:table-cell">{city.einwohner}</td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <p className="text-xs text-muted leading-tight">{city.focus}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((j) => (
                            <div
                              key={j}
                              className="h-1.5 w-3 rounded-full"
                              style={{ background: j <= city.potential ? "#C2722A" : "#E5E3DF" }}
                            />
                          ))}
                        </div>
                        <p className="text-xs font-mono text-muted">{city.potentialLabel}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/standorte/${city.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all"
                      >
                        Öffnen
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted font-mono">
            * SEO-Potenzial basiert auf Markttiefe, lokalem Wettbewerb und Suchvolumen-Analyse.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. STATEMENT — einziger schwarzer Moment
      ══════════════════════════════════════════════════════ */}
      <section
        className="border-t border-white/5 flex items-center justify-center text-center"
        style={{ background: "#080808", paddingTop: "clamp(80px, 10vw, 140px)", paddingBottom: "clamp(80px, 10vw, 140px)" }}
      >
        <div className="px-6 lg:px-8 max-w-5xl mx-auto">
          <p className="font-mono text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-8">
            / Unsere Überzeugung
          </p>
          <h2
            className="font-[family-name:var(--font-heading)] font-bold text-white leading-tight"
            style={{ fontSize: "clamp(36px, 6vw, 88px)", letterSpacing: "-0.02em" }}
          >
            Lokaler Markt.
            <br />
            <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Globale Methodik.
            </span>
          </h2>
          <p className="text-white/35 text-lg leading-relaxed mt-8 max-w-2xl mx-auto">
            Jede unserer Standortstrategien basiert auf denselben internationalen SEO-Standards —
            angepasst an den lokalen Markt, die lokale Sprache und die lokale Konkurrenz.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. WARUM LOKAL — Process-Nummern-Stil
      ══════════════════════════════════════════════════════ */}
      <section className="bg-dark border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">/ Warum lokal?</p>
              <h2
                className="font-[family-name:var(--font-heading)] font-bold text-white mb-6"
                style={{ fontSize: "clamp(24px, 3.5vw, 48px)" }}
              >
                Jeder Markt<br />tickt anders.
              </h2>
              <p className="text-white/45 leading-relaxed mb-6">
                Ein Stuttgarter Automobilzulieferer konkurriert anders als eine
                Frankfurter Unternehmensberatung oder ein Pforzheimer Schmuckhändler.
                Wer diese Unterschiede nicht versteht, verschwendet SEO-Budget.
              </p>
              <p className="text-white/45 leading-relaxed mb-10">
                Wir analysieren Suchintentionen, lokalen Wettbewerb und wirtschaftliche
                Besonderheiten — und bauen daraus eine Strategie, die wirklich funktioniert.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/seo/audit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200"
                  style={{ background: "linear-gradient(135deg, #C2722A, #a35f22)" }}
                >
                  Kostenloser SEO-Audit
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/seo/beratung"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white/60 border border-white/15 hover:border-white/30 hover:text-white/90 transition-all duration-200"
                >
                  SEO Beratung anfragen
                </Link>
              </div>
            </div>

            {/* Numbered reasons */}
            <div className="space-y-0 divide-y divide-white/6">
              {[
                {
                  n: "01",
                  title: "Lokale Suchintentionen",
                  text: "Stuttgarter Einkäufer suchen anders als Frankfurter Finanzentscheider. Wir kennen die Keywords jedes Markts.",
                },
                {
                  n: "02",
                  title: "Regionaler Wettbewerb",
                  text: "Wer Ihre Konkurrenten sind und wie sie ranken — das analysieren wir stadtteilgenau, nicht bundesweit.",
                },
                {
                  n: "03",
                  title: "Branchenspezifische SEO-Logik",
                  text: "Automotive in Stuttgart, FinTech in Frankfurt, Solar in Freiburg: Jede Branche hat ihre eigene Mechanik.",
                },
                {
                  n: "04",
                  title: "Kein Vertrag nötig",
                  text: "Monatliche Zusammenarbeit, transparent und messbar — für KMU und Mittelstand gleichermaßen.",
                },
              ].map((item) => (
                <div key={item.n} className="group flex gap-6 py-6">
                  <span
                    className="font-mono font-bold text-white/10 flex-shrink-0 group-hover:text-primary/40 transition-colors"
                    style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
                  >
                    {item.n}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-semibold text-white text-base mb-2">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. CTA — minimal, typografisch
      ══════════════════════════════════════════════════════ */}
      <section className="bg-dark border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">

            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="font-mono text-xs text-green-400 uppercase tracking-[0.2em]">Beratungstermin verfügbar</span>
              </div>

              <h2
                className="font-[family-name:var(--font-heading)] font-bold text-white"
                style={{ fontSize: "clamp(28px, 4vw, 64px)", letterSpacing: "-0.02em" }}
              >
                Stadt nicht dabei?<br />
                <span className="text-white/30" style={{ fontSize: "clamp(18px, 2.5vw, 40px)" }}>
                  Wir betreuen Kunden aus ganz Deutschland.
                </span>
              </h2>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
                {["Keine Vertragsbindung", "Analyse in 48h", "Direkter Ansprechpartner"].map((item) => (
                  <div key={item} className="inline-flex items-center gap-2 text-white/30 text-sm">
                    <div
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(194,114,42,0.2)" }}
                    >
                      <svg className="w-2 h-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/seo/audit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white whitespace-nowrap transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #C2722A, #a35f22)" }}
              >
                Kostenlose SEO-Analyse
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white/50 border border-white/12 hover:border-white/25 hover:text-white/80 whitespace-nowrap transition-all duration-200"
              >
                Kontakt aufnehmen
              </Link>
            </div>

          </div>
        </div>
      </section>

    </SubpageLayout>
  );
}
