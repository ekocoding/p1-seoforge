"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroShaderWhite from "../components/HeroShaderWhite";

/* ─── Scroll reveal ───────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".scroll-hidden").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Daten ───────────────────────────────────────────────────────────────── */
export const cities = [
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
          className="h-1.5 rounded-full"
          style={{ width: "12px", background: i <= count ? "#C2722A" : "#E5E3DF" }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE — weiß-dominant; Messaging: Wir bieten SEO FÜR diese Standorte an
═══════════════════════════════════════════════════════════════════════════ */
export default function StandorteClient() {
  useScrollReveal();
  const featured = cities.slice(0, 3);

  return (
    <>
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — weißer Shader, zentriert
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">
        <HeroShaderWhite />

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />

        {/* Ghost-Wasserzeichen */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.05 }}
        >
          <span
            className="font-[family-name:var(--font-heading)] font-black text-dark leading-none tracking-tight"
            style={{ fontSize: "clamp(120px, 22vw, 360px)" }}
          >
            LOKAL
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-8 pt-32 pb-28 text-center">

          <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/55 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Lokales SEO · Südwest &amp; Rhein-Main
          </div>

          {/* H1 — zwei Zeilen */}
          <h1
            className="hero-title font-[family-name:var(--font-heading)] font-bold text-dark leading-[1.08] mb-7"
            style={{ fontSize: "clamp(38px, 5.2vw, 72px)", letterSpacing: "-0.025em" }}
          >
            SEO für Ihren Standort —
            <br />
            <span
              style={{
                background: "linear-gradient(95deg, #C2722A 12%, #D4A853 88%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              von Stuttgart bis Frankfurt.
            </span>
          </h1>

          <div className="hero-description mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-primary/40" />
            <span className="text-[10px] font-bold tracking-[0.26em] uppercase text-dark/30">
              11 Regionen · Vor Ort &amp; Remote · Semrush · Ahrefs
            </span>
            <div className="h-px w-10 bg-primary/40" />
          </div>

          <p className="hero-description text-muted leading-[1.85] mb-11 max-w-3xl mx-auto" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            Lokaler Wettbewerb ist real — und regionale Suchintentionen auch.
            Ein Stuttgarter Automobilzulieferer konkurriert anders als eine
            Frankfurter Unternehmensberatung oder ein Pforzheimer Schmuckhändler.
            Deshalb bieten wir SEO-Betreuung mit eigener Strategie für jeden
            dieser Märkte an: Wir analysieren Suchverhalten, Wettbewerber und
            wirtschaftliche Besonderheiten Ihrer Stadt — und bauen daraus eine
            Strategie, die in Ihrem Markt funktioniert. Vor Ort im Südwesten
            und Rhein-Main-Gebiet, remote in ganz Deutschland.
          </p>

          <div className="hero-cta flex flex-wrap justify-center gap-4">
            <a
              href="#staedte"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
            >
              Ihre Region wählen
              <span className="text-white/80 text-xs float-chevron">↓</span>
            </a>
            <Link
              href="/seo/audit"
              className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-white/55 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-dark/65 transition-all hover:border-dark/30 hover:bg-white/80 hover:text-dark"
            >
              Kostenlosen SEO-Audit anfragen
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] text-dark/50 font-mono tracking-[0.28em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-dark/30 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STÄDTE-LISTE — hell, editorial
      ══════════════════════════════════════════════════════════════════ */}
      <section id="staedte" className="bg-white scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">

          <div className="scroll-hidden flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">/ Alle Regionen</p>
              <h2
                className="font-[family-name:var(--font-heading)] font-bold text-dark"
                style={{ fontSize: "clamp(22px, 3vw, 40px)" }}
              >
                Wählen Sie Ihre Region
              </h2>
              <p className="text-muted mt-3 max-w-xl">
                Wir betreuen Unternehmen in diesen Städten — mit einer Strategie,
                die zum jeweiligen Markt passt.
              </p>
            </div>
            <p className="hidden sm:block font-mono text-xs text-dark/30 pb-1">
              11 Märkte · Südwest &amp; Rhein-Main
            </p>
          </div>

          <div className="divide-y divide-border">
            {cities.map((city, i) => (
              <div key={city.slug} className="scroll-hidden" style={{ transitionDelay: `${Math.min(i * 40, 240)}ms` }}>
                <Link
                  href={`/standorte/${city.slug}`}
                  className="group flex items-center gap-5 py-4 px-3 -mx-3 hover:bg-offwhite rounded-lg transition-colors duration-150"
                >
                  <span className="font-mono text-xs text-dark/25 w-6 flex-shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={city.image} alt={city.name} fill className="object-cover" sizes="48px" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-[family-name:var(--font-heading)] font-bold text-dark group-hover:text-primary transition-colors duration-150 truncate"
                      style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}
                    >
                      {city.name}
                    </p>
                    <p className="text-xs text-muted font-mono mt-0.5 truncate">{city.focus}</p>
                  </div>

                  <p className="hidden md:block text-dark/35 text-xs font-mono flex-shrink-0 tabular-nums">
                    {city.einwohner} Einw.
                  </p>

                  <div className="hidden lg:block flex-shrink-0">
                    <PotentialBar count={city.potential} />
                  </div>

                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary group-hover:bg-primary transition-all duration-200">
                    <svg className="w-3.5 h-3.5 text-dark/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          KERNMÄRKTE — Bildkarten (Foto-Overlay nur IN den Karten)
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">

          <div className="scroll-hidden mb-14">
            <p className="font-mono text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">/ Kernmärkte</p>
            <h2
              className="font-[family-name:var(--font-heading)] font-bold text-dark"
              style={{ fontSize: "clamp(24px, 3.5vw, 48px)" }}
            >
              Drei Städte. Drei Strategien.
            </h2>
          </div>

          <div className="scroll-hidden grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4" style={{ minHeight: "clamp(480px, 60vh, 640px)" }}>

            {/* Große linke Karte */}
            <Link
              href={`/standorte/${featured[0].slug}`}
              className="group relative rounded-2xl overflow-hidden min-h-[360px]"
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
                <p className="text-secondary font-mono text-xs mb-4">{featured[0].tagline}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">{featured[0].teaser}</p>
                <span
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 group-hover:gap-3"
                  style={{ background: "rgba(194,114,42,0.85)", backdropFilter: "blur(8px)" }}
                >
                  SEO in {featured[0].name}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Zwei rechte Karten */}
            <div className="grid grid-rows-2 gap-4">
              {featured.slice(1).map((city) => (
                <Link
                  key={city.slug}
                  href={`/standorte/${city.slug}`}
                  className="group relative rounded-2xl overflow-hidden min-h-[200px]"
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
                    <p className="text-secondary font-mono text-xs mb-1">{city.tagline}</p>
                    <h3
                      className="font-[family-name:var(--font-heading)] font-bold text-white mb-2"
                      style={{ fontSize: "clamp(20px, 2.5vw, 30px)" }}
                    >
                      {city.name}
                    </h3>
                    <p className="text-white/55 text-xs leading-relaxed line-clamp-2">{city.teaser}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DATEN-TABELLE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">

          <div className="scroll-hidden mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-3">/ Markt-Index</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              Alle 11 Märkte im Überblick
            </h2>
          </div>

          <div className="scroll-hidden overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
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

          <p className="scroll-hidden mt-4 text-xs text-muted font-mono">
            * SEO-Potenzial basiert auf Markttiefe, lokalem Wettbewerb und Suchvolumen-Analyse.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WARUM LOKAL — hell, editorial
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <div className="scroll-hidden">
              <p className="font-mono text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">/ Warum lokal?</p>
              <h2
                className="font-[family-name:var(--font-heading)] font-bold text-dark mb-6"
                style={{ fontSize: "clamp(24px, 3.5vw, 48px)" }}
              >
                Lokaler Markt.<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Globale Methodik.
                </span>
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Jede unserer Standort-Strategien basiert auf denselben internationalen
                SEO-Standards — angepasst an den lokalen Markt, die lokale Sprache
                und die lokale Konkurrenz.
              </p>
              <p className="text-muted leading-relaxed mb-10">
                Wir analysieren Suchintentionen, lokalen Wettbewerb und wirtschaftliche
                Besonderheiten Ihrer Stadt — und bauen daraus eine Strategie, die
                wirklich funktioniert. Datenbasis: Semrush, Ahrefs und Google.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/seo/audit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:-translate-y-0.5"
                >
                  Kostenloser SEO-Audit
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/seo/beratung"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-dark/15 px-7 py-3.5 text-sm font-semibold text-dark/65 hover:border-dark/30 hover:text-dark transition-all"
                >
                  SEO Beratung anfragen
                </Link>
              </div>
            </div>

            {/* Nummerierte Gründe */}
            <div className="scroll-hidden divide-y divide-dark/[0.07]" style={{ transitionDelay: "120ms" }}>
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
                  title: "Keine Vertragsbindung",
                  text: "Monatliche Zusammenarbeit, transparent und messbar — für KMU und Mittelstand gleichermaßen.",
                },
              ].map((item) => (
                <div key={item.n} className="group flex gap-6 py-6">
                  <span
                    className="font-mono font-bold flex-shrink-0 transition-colors text-dark/10 group-hover:text-primary/50"
                    style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
                  >
                    {item.n}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-semibold text-dark text-base mb-2">{item.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA — einziger dunkler Moment der Seite
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#1A1A1A" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-primary/[0.07] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
          <div className="scroll-hidden grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">

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
                <span className="text-white/35" style={{ fontSize: "clamp(18px, 2.5vw, 40px)" }}>
                  Wir betreuen Kunden aus ganz Deutschland.
                </span>
              </h2>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
                {["Keine Vertragsbindung", "Antwort in unter 24 h", "Direkter Ansprechpartner"].map((item) => (
                  <div key={item} className="inline-flex items-center gap-2 text-white/40 text-sm">
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-base text-white whitespace-nowrap shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 transition-all"
              >
                Kostenlose SEO-Analyse
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 font-semibold text-base text-white/55 hover:border-white/30 hover:text-white/85 whitespace-nowrap transition-all"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
