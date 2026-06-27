"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeistungenHero from "./LeistungenHero";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const SEO_SERVICES = [
  { n: "01", title: "SEO Audit",           href: "/seo/audit",                  desc: "Vollständige Analyse Ihrer aktuellen SEO-Situation" },
  { n: "02", title: "SEO Beratung",        href: "/seo/beratung",               desc: "Strategische Beratung für nachhaltiges Wachstum" },
  { n: "03", title: "SEO Betreuung",       href: "/seo/betreuung",              desc: "Laufende Optimierung & kontinuierliches Monitoring" },
  { n: "04", title: "Ohne Vertrag",        href: "/seo/betreuung/ohne-vertrag", desc: "Flexible SEO-Betreuung ohne Mindestlaufzeit" },
  { n: "05", title: "ROI-Analyse",         href: "/seo/betreuung/roi",          desc: "Was SEO-Investment wirklich einbringt" },
  { n: "06", title: "Content-Strategie",   href: "/seo/content-strategie",      desc: "Inhalte, die ranken und konvertieren" },
  { n: "07", title: "On-Page SEO",         href: "/seo/on-page",                desc: "Technische & inhaltliche Seitenoptimierung" },
  { n: "08", title: "On-Page Optimierung", href: "/seo/on-page-optimierung",    desc: "Systematische Verbesserung bestehender Seiten" },
  { n: "09", title: "SEO Optimierung",     href: "/seo/optimierung",            desc: "Ganzheitliche Maßnahmen für mehr Sichtbarkeit" },
  { n: "10", title: "SEO selbst machen",   href: "/seo/selbst-machen",          desc: "Schritt-für-Schritt-Anleitung für Einsteiger" },
  { n: "11", title: "Shop SEO",            href: "/seo/shop",                   desc: "E-Commerce-Optimierung für mehr Umsatz" },
  { n: "12", title: "SEO Texte",           href: "/seo/texte",                  desc: "Professionelle Texte für Top-Rankings" },
];

const GEO_SERVICES = [
  { n: "01", title: "GEO Audit",         href: "/geo/audit",             desc: "Analyse Ihrer generativen Suchsichtbarkeit" },
  { n: "02", title: "GEO Beratung",      href: "/geo/beratung",          desc: "Strategie für KI-Suchmaschinen & Assistenten" },
  { n: "03", title: "Content-Strategie", href: "/geo/content-strategie", desc: "Inhalte für ChatGPT, Perplexity & Co." },
  { n: "04", title: "GEO Monitoring",    href: "/geo/monitoring",        desc: "Tracking Ihrer KI-Sichtbarkeit in Echtzeit" },
  { n: "05", title: "GEO Optimierung",   href: "/geo/optimierung",       desc: "Technische & inhaltliche KI-Optimierung" },
];

const WD_SERVICES = [
  { n: "01", title: "App Design",        href: "/webdesign/app-design",               desc: "Mobile & Web-Apps mit Fokus auf UX & Retention" },
  { n: "02", title: "Landing Pages",     href: "/webdesign/landingpage-erstellen-lassen",            desc: "Conversion-optimierte Zielseiten, die verkaufen" },
  { n: "03", title: "Website erstellen", href: "/webdesign/website-erstellen-lassen", desc: "Professioneller Webauftritt von Grund auf neu" },
  { n: "04", title: "Website Relaunch",  href: "/webdesign/website-relaunch-agentur",         desc: "Ihre bestehende Site — neu gedacht & umgesetzt" },
];

/* ─── Scroll reveal ─────────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        }),
      { threshold: 0, rootMargin: "400px 0px 400px 0px" }
    );
    document.querySelectorAll(".scroll-hidden").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Service Card (grid variant) ──────────────────────────────────────────── */
function ServiceCard({
  n, title, href, desc, dark = true,
}: {
  n: string; title: string; href: string; desc: string; dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
        dark
          ? "border-white/[0.08] hover:border-primary/40 hover:bg-white/[0.03]"
          : "border-border bg-white hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.07]"
      }`}
    >
      <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-secondary mb-5 block">
        {n}
      </span>
      <h3
        className={`font-[family-name:var(--font-heading)] mb-2.5 leading-snug ${
          dark ? "text-white" : "text-dark"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed flex-1 mb-5 ${
          dark ? "text-white/45" : "text-muted"
        }`}
      >
        {desc}
      </p>
      <span
        className={`text-sm font-semibold flex items-center gap-2 transition-all duration-200 group-hover:gap-3 ${
          dark ? "text-primary" : "text-primary"
        }`}
      >
        Mehr erfahren <span>→</span>
      </span>
    </Link>
  );
}

/* ─── Section strip ─────────────────────────────────────────────────────────── */
function SectionStrip({
  num, tag, href, dark = true,
}: {
  num: string; tag: string; href: string; dark?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between mb-14 pb-5 border-b ${
        dark ? "border-white/[0.08]" : "border-border"
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-secondary">
          {num}
        </span>
        <span className={`h-px w-10 ${dark ? "bg-white/15" : "bg-border"}`} />
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
            dark ? "text-white/35" : "text-muted"
          }`}
        >
          {tag}
        </span>
      </div>
      <Link
        href={href}
        className="group flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-light transition-colors"
      >
        Alle ansehen
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </Link>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function LeistungenClient() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <LeistungenHero />

      {/* ══════════════════════════════════════════════════════════════════════
          01 · SEO  —  dark, 12 services, full grid
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="seo" className="relative bg-dark py-24 lg:py-32 scroll-mt-20 overflow-hidden">

        {/* Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-6 -right-4 font-[family-name:var(--font-heading)] font-black leading-none text-white/[0.022]"
          style={{ fontSize: "clamp(140px, 22vw, 320px)" }}
        >
          SEO
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* Section strip */}
          <div className="scroll-hidden">
            <SectionStrip num="01" tag="Suchmaschinenoptimierung" href="/seo" dark />
          </div>

          {/* Heading + intro */}
          <div className="scroll-hidden mb-16 max-w-2xl" style={{ transitionDelay: "0.08s" }}>
            <h2 className="font-[family-name:var(--font-heading)] text-white mb-5 leading-tight">
              Sichtbarkeit,<br />die bleibt.
            </h2>
            <p className="text-white/45 text-lg leading-relaxed">
              Von technischer Grundlage bis zur Content-Strategie — wir bringen
              Ihre Website nachhaltig nach oben und halten sie dort.
            </p>
          </div>

          {/* 3-column service grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SEO_SERVICES.map((s, i) => (
              <div
                key={s.href}
                className="scroll-hidden"
                style={{ transitionDelay: `${0.04 * i}s` }}
              >
                <ServiceCard {...s} dark />
              </div>
            ))}
          </div>

          {/* Bottom strip */}
          <div className="scroll-hidden mt-10 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-white/25 text-xs font-mono tracking-wider">
              12 Leistungen · Audit → Texte → Shop → Betreuung
            </p>
            <Link
              href="/seo"
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all duration-200 group shrink-0"
            >
              Zur SEO-Übersicht
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          02 · GEO  —  offwhite, split layout, 5 services
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="geo" className="relative bg-offwhite py-24 lg:py-32 scroll-mt-20 overflow-hidden">

        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

        {/* Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-6 -left-4 font-[family-name:var(--font-heading)] font-black leading-none text-dark/[0.035]"
          style={{ fontSize: "clamp(140px, 22vw, 320px)" }}
        >
          GEO
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* Section strip */}
          <div className="scroll-hidden">
            <SectionStrip num="02" tag="Generative Engine Optimization" href="/geo" dark={false} />
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">

            {/* Left: heading + context badges */}
            <div className="scroll-hidden" style={{ transitionDelay: "0.08s" }}>
              <h2 className="font-[family-name:var(--font-heading)] text-dark mb-6 leading-tight">
                Sichtbar für<br />KI-Suchen.
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-10">
                ChatGPT, Perplexity und Google AI Overviews verändern, wie Menschen
                Antworten finden. Wir sorgen dafür, dass Ihre Marke in diesen
                Antworten erscheint.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {[
                  "KI-Suchen +40 % p.a.",
                  "ChatGPT · Perplexity",
                  "Gemini · AI Overviews",
                  "Messbare AI-Sichtbarkeit",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold bg-primary/[0.07] text-primary px-4 py-2 rounded-full border border-primary/[0.12]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: service list */}
            <div className="scroll-hidden flex flex-col gap-2.5" style={{ transitionDelay: "0.14s" }}>
              {GEO_SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-md hover:shadow-primary/[0.06] transition-all duration-200"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-secondary shrink-0">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-[family-name:var(--font-heading)] text-dark text-base leading-snug">
                        {s.title}
                      </p>
                      <p className="text-xs text-muted mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                  <span className="text-primary text-sm shrink-0 ml-4 transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom strip */}
          <div className="scroll-hidden mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-muted/60 text-xs font-mono tracking-wider">
              5 Leistungen · Zukunftssicher in KI-Suchen positioniert
            </p>
            <Link
              href="/geo"
              className="inline-flex items-center gap-2 bg-dark text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-dark-light transition-all duration-200 group shrink-0"
            >
              Zur GEO-Übersicht
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          03 · WEBDESIGN  —  dark, 2×2 grid, gold accent
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="webdesign" className="relative bg-dark py-24 lg:py-32 scroll-mt-20 overflow-hidden">

        {/* Top accent line — gold this time */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary/35 to-transparent" />

        {/* Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-4 -right-6 font-[family-name:var(--font-heading)] font-black leading-none text-white/[0.018]"
          style={{ fontSize: "clamp(90px, 16vw, 220px)" }}
        >
          Webdesign
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* Section strip */}
          <div className="scroll-hidden">
            <SectionStrip num="03" tag="Design & Entwicklung" href="/webdesign" dark />
          </div>

          {/* Heading + intro */}
          <div className="scroll-hidden mb-16 max-w-2xl" style={{ transitionDelay: "0.08s" }}>
            <h2 className="font-[family-name:var(--font-heading)] text-white mb-5 leading-tight">
              Design,<br />das überzeugt.
            </h2>
            <p className="text-white/45 text-lg leading-relaxed">
              Websites und Apps, die nicht nur gut aussehen — sondern Vertrauen
              aufbauen, Besucher halten und Leads generieren.
            </p>
          </div>

          {/* 2×2 grid — larger cards since only 4 services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WD_SERVICES.map((s, i) => (
              <div
                key={s.href}
                className="scroll-hidden"
                style={{ transitionDelay: `${0.07 * i}s` }}
              >
                <ServiceCard {...s} dark />
              </div>
            ))}
          </div>

          {/* Bottom strip — gold CTA for differentiation */}
          <div className="scroll-hidden mt-10 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-white/25 text-xs font-mono tracking-wider">
              4 Leistungen · Landing Page → App → Relaunch
            </p>
            <Link
              href="/webdesign"
              className="inline-flex items-center gap-2 bg-secondary text-dark px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-secondary-light transition-all duration-200 group shrink-0"
            >
              Zur Webdesign-Übersicht
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BOTTOM CTA  —  10% accent: the one orange section on the whole page
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-primary py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50 mb-6">
            Nächster Schritt
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-white mb-6 leading-tight">
            Welche Leistung passt<br />zu Ihrem Ziel?
          </h2>
          <p className="text-white/65 text-lg max-w-md mx-auto mb-10 leading-relaxed">
            In einem kostenlosen Erstgespräch analysieren wir Ihre Situation
            und empfehlen den richtigen Einstieg.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/90 transition-all"
            >
              Kostenlos beraten lassen →
            </Link>
            <Link
              href="/referenzen"
              className="inline-flex items-center gap-2 border border-white/25 text-white px-8 py-4 rounded-full text-sm font-semibold hover:border-white/50 hover:bg-white/[0.08] transition-all"
            >
              Referenzen ansehen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
