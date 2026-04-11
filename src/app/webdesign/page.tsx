"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "../components/SubpageLayout";
import WebdesignMockup from "./WebdesignMockup";
import PageSpeedGauge from "./PageSpeedGauge";

function useInView(opts = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, ...opts }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const faqs = [
  {
    q: "Was kostet eine professionelle Website?",
    a: "Die Investition hängt von Umfang, Funktionen und Design-Komplexität ab. Einfache Business-Websites starten ab 2.500€, komplexere E-Commerce-Lösungen ab 5.000€. Im kostenlosen Erstgespräch erstellen wir ein transparentes Angebot für dein Projekt.",
  },
  {
    q: "Wie lange dauert die Entwicklung?",
    a: "Standard-Websites sind in 4–6 Wochen fertig: 1 Woche Analyse & Strategie, 2 Wochen Design, 2 Wochen Entwicklung, 1 Woche Testing & Launch. E-Commerce-Projekte dauern 8–12 Wochen.",
  },
  {
    q: "Was ist der Vorteil von Next.js gegenüber WordPress?",
    a: "Next.js liefert 2–3x schnellere Ladezeiten, bessere Core Web Vitals und mehr Sicherheit als WordPress. Das führt direkt zu besseren Google-Rankings. Für Content-lastige Sites bieten wir auch WordPress mit optimiertem Setup an.",
  },
  {
    q: "Wie stellt ihr sicher, dass meine Website bei Google rankt?",
    a: "Als SEO-Agentur bauen wir SEO von Anfang an ein: saubere URL-Struktur, Schema-Markup, technische Optimierung, Core Web Vitals, interne Verlinkung und ein Content-Plan. Deine Website ist vom ersten Tag an rankingfähig.",
  },
  {
    q: "Bietet ihr auch Website-Relaunches an?",
    a: "Ja. Wir analysieren zuerst deine bestehende Website (SEO, Performance, Conversion), um keine Rankings zu verlieren. Dann migrieren wir sauber zur neuen Site — mit 301-Weiterleitungen und Search-Console-Monitoring.",
  },
  {
    q: "Erhalte ich nach dem Launch Support?",
    a: "Ja, wir bieten nach dem Launch Wartungsverträge an: Sicherheitsupdates, Performance-Monitoring, Content-Pflege und technischer Support. Auf Wunsch kombiniert mit unserer SEO-Betreuung für maximale Wirkung.",
  },
  {
    q: "Kann ich meine Website später selbst bearbeiten?",
    a: "Absolut. Je nach Projekt integrieren wir ein CMS (wie Sanity, Contentful oder WordPress) das du ohne technische Kenntnisse bedienen kannst. Wir liefern eine kurze Einweisung mit jedem Projekt.",
  },
];

export default function WebdesignPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [painRef, painInView] = useInView();
  const [leistungenRef, leistungenInView] = useInView();
  const [whyRef, whyInView] = useInView();
  const [portfolioRef, portfolioInView] = useInView();
  const [prozessRef, prozessInView] = useInView();
  const [techRef, techInView] = useInView();
  const [faqRef, faqInView] = useInView();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* SECTION 1 — HERO (dark) */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ background: "#1A1A1A" }}
      >
        {/* Radial gradient orb */}
        <div
          className="absolute top-0 right-0 h-[700px] w-[700px] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(194,114,42,0.18) 0%, rgba(212,168,83,0.08) 40%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12 w-full">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div>
              {/* Status badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Webdesign & SEO aus einer Hand
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white font-[family-name:var(--font-heading)] mb-6">
                Websites, die ranken. Designs, die{" "}
                <span className="border-b-2 border-primary pb-1">konvertieren.</span>
              </h1>

              <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-8">
                Als SEO-Agentur bauen wir Websites anders: Core Web Vitals,
                technisches SEO und Conversion-Optimierung sind keine Extras —
                sie sind das Fundament.
              </p>

              {/* Bullet points */}
              <ul className="space-y-3 mb-10">
                {[
                  "SEO-optimiert ab Tag 1",
                  "96+ PageSpeed Score garantiert",
                  "Fertig in 4–6 Wochen",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-primary shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl"
                >
                  Kostenloses Webdesign-Gespräch →
                </Link>
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
                >
                  Portfolio ansehen →
                </a>
              </div>
            </div>

            {/* Right: Mockup */}
            <div className="flex justify-center lg:justify-end">
              <WebdesignMockup />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PORTFOLIO (white, moved up) */}
      <section
        id="portfolio"
        ref={portfolioRef as React.RefObject<HTMLElement>}
        className="bg-white py-24 lg:py-32"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div
            className={`mb-14 transition-all duration-700 ${portfolioInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
                Portfolio
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Projekte, die liefern.
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              Ausgewählte Webdesign-Projekte — mit messbaren Ergebnissen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                category: "E-Commerce",
                name: "Online-Shop Relaunch",
                metric: "+143%",
                label: "mehr Conversions",
                img: "/webdesign/portfolio-ecommerce.png",
                logo: "AURA",
                year: "2024",
              },
              {
                category: "B2B Website",
                name: "Unternehmens-Relaunch",
                metric: "98/100",
                label: "PageSpeed Score",
                img: "/webdesign/portfolio-b2b.png",
                logo: "Nexora",
                year: "2025",
              },
              {
                category: "Local Business",
                name: "Praxis-Website",
                metric: "#1",
                label: "Google in 8 Wochen",
                img: "/webdesign/portfolio-local.png",
                logo: "Dr. Müller",
                year: "2024",
              },
            ].map((project, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  {/* Logo strip */}
                  <div className="px-6 pt-5 pb-3 border-b border-border flex items-center justify-between">
                    <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark tracking-tight">
                      {project.logo}
                    </span>
                    <span className="text-xs font-medium text-muted uppercase tracking-widest">{project.year}</span>
                  </div>

                  {/* Portfolio image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.img}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Card content */}
                  <div className="p-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.06] px-2.5 py-0.5 text-xs font-medium text-primary mb-3">
                      {project.category}
                    </span>
                    <h3 className="font-bold text-dark text-lg mb-3">
                      {project.name}
                    </h3>
                    <div className="text-2xl font-bold text-primary mb-0.5">
                      {project.metric}
                    </div>
                    <p className="text-sm text-muted mb-4">{project.label}</p>
                    <a
                      href="#portfolio"
                      className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                      Zum Projekt →
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Internal links */}
          <div className="mt-12 rounded-2xl bg-offwhite border border-border p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">
                Verwandte Leistungen
              </p>
              <h3 className="text-xl font-bold text-dark font-[family-name:var(--font-heading)]">
                Mehr als nur Webdesign
              </h3>
              <p className="text-muted text-sm mt-1">
                Wir begleiten dich vom ersten Pixel bis zur
                Page-1-Platzierung.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/website-erstellen-lassen"
                className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-5 py-2.5 text-sm font-semibold text-dark hover:border-primary/30 hover:text-primary transition-all"
              >
                Website erstellen lassen →
              </Link>
              <Link
                href="/app-design"
                className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-5 py-2.5 text-sm font-semibold text-dark hover:border-primary/30 hover:text-primary transition-all"
              >
                App Design →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PAIN POINTS (white) */}
      <section
        ref={painRef as React.RefObject<HTMLElement>}
        className="bg-white py-24 lg:py-32 border-t border-border"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ${painInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                Das kennen wir.
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
                Warum scheitern die meisten Websites?
              </h2>
              <p className="text-muted text-lg">
                Vier Probleme, die wir jeden Tag sehen — und systematisch lösen.
              </p>
            </div>

            <div>
              {[
                {
                  num: "01",
                  title: "Langsame Ladezeit",
                  desc: "Google bestraft Sites unter 90 PageSpeed mit schlechteren Rankings. Besucher springen ab, bevor sie deine Leistungen sehen.",
                },
                {
                  num: "02",
                  title: "Kein organischer Traffic",
                  desc: "Eine schöne Website bringt nichts, wenn sie niemand findet. SEO wird beim Bau ignoriert — und später teuer nachgerüstet.",
                },
                {
                  num: "03",
                  title: "Zero Conversions",
                  desc: "Besucher kommen und gehen ohne Kontakt aufzunehmen. Fehlende CTA-Struktur und schlechte UX kosten täglich Aufträge.",
                },
                {
                  num: "04",
                  title: "Veraltetes Design",
                  desc: "Deine Website signalisiert 2015. Das Vertrauen der Besucher ist weg, bevor sie zum ersten Absatz scrollen.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="flex items-start gap-6 py-7 border-b border-border last:border-0"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {item.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* PageSpeed Gauge */}
            <PageSpeedGauge />
          </div>
        </div>
      </section>

      {/* SECTION 4 — LEISTUNGEN (offwhite, bento grid) */}
      <section
        ref={leistungenRef as React.RefObject<HTMLElement>}
        className="bg-offwhite py-24 lg:py-32"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div
            className={`mb-14 transition-all duration-700 ${leistungenInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
                Leistungen
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Alles. Aus einer Hand.
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              Von der ersten Wireframe-Skizze bis zum Launch-fertigen,
              SEO-optimierten Produkt.
            </p>
          </div>

          <div className={`transition-all duration-700 delay-200 ${leistungenInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              { num: "01", title: "SEO-optimiertes Webdesign", desc: "Technisches SEO, Core Web Vitals und strukturierte Daten sind keine nachträglichen Fixes — sie werden von Anfang an ins Fundament eingebaut.", tag: "KERN" },
              { num: "02", title: "UI/UX Design", desc: "Figma-Prototypen, Wireframes und responsive Layouts. Design das funktioniert, bevor eine Zeile Code geschrieben wird." },
              { num: "03", title: "Next.js Entwicklung", desc: "Blazing-fast Websites mit Next.js und React. Server-Side Rendering, statische Generierung, maximale Performance." },
              { num: "04", title: "Conversion-Optimierung", desc: "CTA-Struktur, Nutzerführung und heatmap-basierte UX-Anpassungen für maximal mehr Anfragen." },
              { num: "05", title: "CMS-Integration", desc: "Sanity, Contentful oder WordPress — du bearbeitest Inhalte ohne technische Kenntnisse." },
              { num: "06", title: "Performance & Core Web Vitals", desc: "PageSpeed 96+ by default. Bildoptimierung, CDN, lazy loading — jede Millisekunde zählt." },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 60}>
                <div className="group flex items-center gap-6 lg:gap-10 border-b border-border py-6 lg:py-8 cursor-default transition-all duration-300 hover:bg-primary/[0.015] hover:px-4 rounded-xl -mx-4 px-4">
                  {/* Number */}
                  <span className="text-4xl lg:text-5xl font-bold text-primary/[0.12] font-[family-name:var(--font-heading)] shrink-0 w-14 lg:w-20 text-right select-none">
                    {item.num}
                  </span>
                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark">
                        {item.title}
                      </h3>
                      {item.tag && (
                        <span className="hidden sm:inline text-[10px] font-bold tracking-widest uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm lg:text-base text-muted leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                  {/* Arrow — slides in on hover */}
                  <div className="shrink-0 w-8 overflow-hidden">
                    <svg className="w-6 h-6 text-primary -translate-x-8 group-hover:translate-x-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — WARUM SEO + WEBDESIGN (white, standard 2x2 card grid) */}
      <section
        ref={whyRef as React.RefObject<HTMLElement>}
        className="bg-white py-24 lg:py-32"
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div
            className={`mx-auto max-w-3xl text-center mb-16 transition-all duration-700 ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Realität</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-6">
              Warum SEO+Webdesign zusammengehören
            </h2>
            <p className="text-lg text-muted">Wer Design und SEO trennt, zahlt doppelt — und verliert trotzdem. Wir denken beides von Anfang an zusammen.</p>
          </div>

          <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_40px_1fr] gap-0 mb-0">
              <div className="text-center pb-5">
                <span className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-muted/60">
                  <span className="w-2 h-2 rounded-full bg-muted/30 inline-block"></span>
                  Andere Agenturen
                </span>
              </div>
              <div />
              <div className="text-center pb-5">
                <span className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                  SeoForge
                </span>
              </div>
            </div>

            {/* Comparison rows */}
            {[
              { bad: "Website zuerst, SEO später", good: "SEO-Architektur von Tag 1" },
              { bad: "Schönes Design, langsam geladen", good: "PageSpeed 96+ by default" },
              { bad: "Getrennte Ansprechpartner", good: "Ein Team, eine Strategie" },
              { bad: "SEO als Zusatz-Paket", good: "SEO ist das Fundament" },
              { bad: "Launch und Tschüss", good: "Laufende Betreuung & Rankings" },
            ].map((row, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="grid grid-cols-[1fr_40px_1fr] items-center border-t border-border py-4 lg:py-5 gap-0 group hover:bg-primary/[0.015] rounded-lg transition-colors duration-200">
                  {/* Left — bad */}
                  <div className="pr-4 text-right">
                    <span className="text-sm lg:text-base text-muted/50 line-through decoration-muted/30">
                      {row.bad}
                    </span>
                  </div>
                  {/* Center arrow */}
                  <div className="flex justify-center">
                    <svg className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                  {/* Right — good */}
                  <div className="pl-4">
                    <span className="text-sm lg:text-base font-semibold text-dark">
                      {row.good}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Bottom border */}
            <div className="border-t border-border" />

            {/* Bottom CTA row */}
            <Reveal delay={500}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                <p className="text-lg font-[family-name:var(--font-heading)] font-bold text-dark">
                  Bereit für den Unterschied?
                </p>
                <a
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors duration-200"
                >
                  Kostenloses Gespräch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 6 — PROZESS (offwhite, exact card pattern) */}
      <section
        ref={prozessRef as React.RefObject<HTMLElement>}
        className="bg-offwhite py-24 lg:py-32 border-y border-border"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div
            className={`mb-14 transition-all duration-700 ${prozessInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
                Prozess
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              So entsteht deine Website.
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              In 4 Phasen zum Launch — transparent, termingebunden, ohne
              Überraschungen.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Analyse & Strategie",
                desc: "Ziele, Wettbewerber, Keyword-Potenzial und SEO-Architektur werden von Anfang an definiert.",
                items: [
                  "Anforderungsanalyse",
                  "Keyword-Research",
                  "Seitenarchitektur",
                ],
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
              },
              {
                num: "02",
                title: "Design & Konzept",
                desc: "Wireframes in Figma, UI-Design System, Feedback-Runden. Mobile-First von Beginn an.",
                items: ["Wireframes", "UI-Design", "Design-Review"],
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                ),
              },
              {
                num: "03",
                title: "Entwicklung",
                desc: "Next.js-Entwicklung, CMS-Integration, Core Web Vitals Optimierung bis ins letzte Detail.",
                items: [
                  "Next.js Development",
                  "CMS Setup",
                  "Performance-Tests",
                ],
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                ),
              },
              {
                num: "04",
                title: "Launch & SEO",
                desc: "Go-Live, Google Search Console, Analytics-Setup und initiale Keyword-Ranking-Überwachung.",
                items: ["Launch", "GSC & Analytics", "Ranking-Tracking"],
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                ),
              },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="rounded-2xl border-t-[3px] border-t-primary border border-border bg-white p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                      {step.icon}
                    </div>
                    <span className="text-3xl font-bold text-primary/10 font-[family-name:var(--font-heading)]">{step.num}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {step.desc}
                  </p>
                  <ul className="space-y-1.5">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs text-muted"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — TECHNOLOGIEN (white) */}
      <section
        ref={techRef as React.RefObject<HTMLElement>}
        className="bg-white py-24 lg:py-32"
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div
            className={`mb-14 text-center transition-all duration-700 ${techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
                Tech Stack
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Unser Stack.
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Moderne Technologien für maximale Performance, Skalierbarkeit und
              Wartbarkeit.
            </p>
          </div>

          {/* Architecture Stack — improved */}
<div className={`relative mt-14 transition-all duration-700 delay-200 ${techInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
  <div className="mx-auto max-w-3xl">

    {/* Top label */}
    <div
      className="flex justify-center mb-0 transition-all duration-500"
      style={{ transitionDelay: techInView ? "900ms" : "0ms", opacity: techInView ? 1 : 0, transform: techInView ? "translateY(0)" : "translateY(-12px)" }}
    >
      <span className="bg-dark text-white text-xs font-bold px-6 py-2.5 rounded-t-xl tracking-wider shadow-lg">🌐 Ihre fertige Website</span>
    </div>

    {/* Layer 3 — Design & UX */}
    <div
      className="mx-auto transition-all duration-600 rounded-none"
      style={{
        width: "80%",
        background: "linear-gradient(135deg, #D4A853 0%, #b8903a 100%)",
        padding: "20px 28px 16px",
        transitionDelay: techInView ? "650ms" : "0ms",
        opacity: techInView ? 1 : 0,
        transform: techInView ? "translateY(0)" : "translateY(24px)",
        borderRadius: "0",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/60 mb-1">03 — Design & UX</p>
          <p className="text-lg font-bold text-white">Figma · Wireframes · Conversion</p>
        </div>
        <span className="text-2xl shrink-0">🎨</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { label: "Figma Prototypen", sub: "UI-Design & Wireframes" },
          { label: "Mobile-First", sub: "Responsive Layouts" },
          { label: "UX-Flows", sub: "Nutzerführung" },
          { label: "A/B-Testing", sub: "Conversion-Opt." },
        ].map(c => (
          <div key={c.label} className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <p className="text-xs font-semibold text-white">{c.label}</p>
            <p className="text-[10px] text-white/60">{c.sub}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Layer 2 — Entwicklung */}
    <div
      className="mx-auto transition-all duration-600"
      style={{
        width: "90%",
        background: "linear-gradient(135deg, #C2722A 0%, #a35f22 100%)",
        padding: "20px 28px 16px",
        transitionDelay: techInView ? "400ms" : "0ms",
        opacity: techInView ? 1 : 0,
        transform: techInView ? "translateY(0)" : "translateY(24px)",
        borderRadius: "0",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/60 mb-1">02 — Entwicklung</p>
          <p className="text-lg font-bold text-white">Next.js · React · TypeScript · Netlify</p>
        </div>
        <span className="text-2xl shrink-0">⚙️</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { label: "Next.js 15", sub: "App Router, SSR/SSG" },
          { label: "TypeScript", sub: "Type-safe Code" },
          { label: "Netlify Deploy", sub: "CI/CD Pipeline" },
          { label: "Core Web Vitals", sub: "Performance 96+" },
        ].map(c => (
          <div key={c.label} className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <p className="text-xs font-semibold text-white">{c.label}</p>
            <p className="text-[10px] text-white/60">{c.sub}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Layer 1 — SEO Fundament */}
    <div
      className="mx-auto transition-all duration-600"
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #1A1A1A 0%, #2d2d2d 100%)",
        padding: "20px 28px 20px",
        transitionDelay: techInView ? "150ms" : "0ms",
        opacity: techInView ? 1 : 0,
        transform: techInView ? "translateY(0)" : "translateY(24px)",
        borderRadius: "0 0 16px 16px",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/40 mb-1">01 — SEO-Fundament</p>
          <p className="text-lg font-bold text-white">Technisches SEO · Core Web Vitals · Schema</p>
        </div>
        <span className="text-2xl shrink-0">🔍</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { label: "URL-Struktur", sub: "SEO-optimierte Architektur" },
          { label: "Schema Markup", sub: "Strukturierte Daten" },
          { label: "Core Web Vitals", sub: "LCP · CLS · FID" },
          { label: "Interne Links", sub: "Linkarchitektur" },
          { label: "Sitemap & Robots", sub: "Crawling & Indexierung" },
          { label: "PageSpeed 96+", sub: "By default" },
        ].map(c => (
          <div key={c.label} className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <p className="text-xs font-semibold text-white/90">{c.label}</p>
            <p className="text-[10px] text-white/40">{c.sub}</p>
          </div>
        ))}
      </div>
    </div>

  </div>
</div>
        </div>
      </section>

      {/* SECTION 8 — FAQ (white) */}
      <section
        ref={faqRef as React.RefObject<HTMLElement>}
        className="bg-white py-24 lg:py-32 border-t border-border"
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div
            className={`text-center mb-14 transition-all duration-700 ${faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
              FAQ
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">
              Häufig gestellte Fragen
            </h2>
          </div>
          <div
            className={`space-y-3 transition-all duration-700 delay-100 ${faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-white overflow-hidden transition-colors hover:border-primary/20"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-dark pr-4">{faq.q}</span>
                  <svg
                    className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96 pb-6" : "max-h-0"}`}
                >
                  <p className="px-6 text-sm leading-relaxed text-muted">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — CTA (primary gradient) */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-primary to-primary-dark">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.04] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-black/[0.1] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Bereit für eine Website, die wirklich arbeitet?
          </h2>
          <p className="text-white/80 text-lg mb-4 max-w-xl mx-auto">
            Kostenloses Erstgespräch — wir analysieren deine aktuelle Situation
            und zeigen dir, was möglich ist.
          </p>
          <p className="text-white/70 text-sm mb-10">
            Neben Webdesign bieten wir auch{" "}
            <Link
              href="/website-erstellen-lassen"
              className="underline underline-offset-2 text-white/80 hover:text-white"
            >
              individuelle Website-Erstellung
            </Link>{" "}
            und{" "}
            <Link
              href="/app-design"
              className="underline underline-offset-2 text-white/80 hover:text-white"
            >
              App Design
            </Link>{" "}
            an.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-dark shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
            >
              Jetzt Gespräch buchen →
            </Link>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/20"
            >
              Portfolio ansehen
            </a>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
