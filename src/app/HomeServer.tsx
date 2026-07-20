import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroWithImage from "./components/HeroWithImage";
import TrustSection from "./components/TrustSection";
import ProcessSection from "./components/ProcessSection";
import HomeDecisionLab from "./components/HomeDecisionLab";
import HomeContactForm from "./components/HomeContactForm";
/* ------------------------------------------------------------------ */
/*  SECTION WRAPPER                                                   */
/* ------------------------------------------------------------------ */
function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={className}>{children}</section>;
}

/* ------------------------------------------------------------------ */
/*  GEO KREISLAUF INTERACTIVE COMPONENT                               */
/* ------------------------------------------------------------------ */
function LeistungenInteractive() {
  const PILLARS = [
    {
      img: "/images/home-pillars/seo.webp",
      eyebrow: "Suchmaschinenoptimierung",
      title: "SEO, die wirklich funktioniert",
      text: "SEO ist kein Versprechen, sondern ein System aus Technik, Content und Autorität \u2014 messbar aufgebaut und kontinuierlich optimiert. Sie bekommen direkten Kontakt zum Experten: keine Account-Manager, keine Standard-Pakete, nur die Hebel mit dem gr\u00f6\u00dften Impact.",
      highlights: ["Technik, Content & Autorit\u00e4t", "Direkt vom Experten", "Messbar & kontinuierlich"],
      cta: "SEO entdecken",
      href: "/seo",
    },
    {
      img: "/images/home-pillars/geo.webp",
      eyebrow: "Generative Engine Optimization",
      title: "Sichtbar in KI-Antworten",
      text: "ChatGPT, Gemini, Perplexity und Claude bestimmen zunehmend, welche Marken empfohlen werden. Wir machen Ihre Marke dort sichtbar \u2014 durch systematische GEO-Optimierung, Tracking \u00fcber alle Plattformen und messbare KI-Pr\u00e4senz statt Versprechungen.",
      highlights: ["In KI-Antworten zitiert", "Systematisch & messbar", "Alle Plattformen im Blick"],
      cta: "GEO entdecken",
      href: "/geo",
    },
    {
      img: "/images/home-pillars/webdesign.webp",
      eyebrow: "Webdesign & Entwicklung",
      title: "Websites f\u00fcr Google und KI-Suche",
      text: "Websites aus einem Team ranken besser, weil Strategie, Design, Code und SEO ineinandergreifen \u2014 kein Plugin-Overhead, keine Schnittstellenverluste. Custom Code mit DevOps, fairer Festpreis und ein pers\u00f6nlicher Ansprechpartner mit Antwort in unter 24 Stunden.",
      highlights: ["Custom Code statt Baukasten", "Fairer Preis durch KI", "Google + KI-Suche ab Tag 1"],
      cta: "Webdesign entdecken",
      href: "/webdesign",
    },
    {
      img: "/images/home-pillars/wartung.webp",
      eyebrow: "Website-Betreuung",
      title: "Wartung sichert Rankings & Verf\u00fcgbarkeit",
      text: "Eine Website ohne regelm\u00e4\u00dfige Wartung ist ein Sicherheitsrisiko: veraltete Plugins \u00f6ffnen bekannte Hintert\u00fcren, Performance verf\u00e4llt, Rankings sinken. Wir patchen automatisiert, sichern t\u00e4glich und \u00fcberwachen rund um die Uhr \u2014 mit pers\u00f6nlichem Support.",
      highlights: ["Updates vor Angreifern", "T\u00e4gliche Backups & Monitoring", "Monatlich k\u00fcndbar"],
      cta: "Wartung entdecken",
      href: "/website-wartung",
    },
  ];

  return (
    <div className="border-y-2 border-dark bg-white">
      {PILLARS.map((p, i) => {
        const imageFirst = i % 2 === 1;

        return (
          <article key={p.href} className="group grid border-b-2 border-dark last:border-b-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className={`relative aspect-[4/3] overflow-hidden bg-dark ${imageFirst ? "lg:order-2 lg:border-b-0 lg:border-l-2" : "lg:border-b-0 lg:border-r-2"}`}>
              <Image
                src={p.img}
                alt={p.title}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-3 border-b-2 border-dark bg-white px-4 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-dark sm:px-5">
                <span>0{i + 1} / 04</span>
                <span className="text-primary-dark">Leistungsakte</span>
              </div>
            </div>

            <div className={`flex flex-col justify-between p-6 sm:p-8 lg:p-10 ${imageFirst ? "lg:order-1" : ""}`}>
              <div>
                <div className="flex items-start justify-between gap-5 border-b-2 border-dark pb-4">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-primary-dark">{p.eyebrow}</p>
                  <span className="shrink-0 font-mono text-[9px] font-bold text-dark/55">0{i + 1}</span>
                </div>
                <h3 className="mt-7 max-w-[19ch] font-[family-name:var(--font-heading)] text-[29px] font-bold leading-[1.06] tracking-[-0.02em] text-dark sm:text-[34px] lg:text-[39px]">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-dark/70">{p.text}</p>
              </div>

              <div className="mt-9">
                <ul className="grid gap-px border-2 border-dark bg-dark sm:grid-cols-3">
                  {p.highlights.map((h, highlightIndex) => (
                    <li key={h} className="min-h-16 bg-[#F8F7F5] px-3 py-3.5">
                      <span className="block font-mono text-[8px] font-bold tracking-[0.14em] text-primary-dark">0{highlightIndex + 1}</span>
                      <span className="mt-1.5 block text-[12px] font-semibold leading-snug text-dark/75">{h}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className="mt-6 inline-flex min-h-12 items-center gap-3 border-2 border-dark bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark"
                >
                  {p.cta}
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.6L11.2 6.3a.75.75 0 111-1.1l4.5 4.25a.75.75 0 010 1.1l-4.5 4.25a.75.75 0 11-1-1.1l3.15-2.95H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
/* ================================================================== */
/*  PAGE COMPONENT                                                     */
/* ================================================================== */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet SEO bei SEOforge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unsere monatlichen SEO-Pakete starten ab 600 €. Die genauen Kosten hängen von Ihrer Branche, dem Wettbewerb und Ihren Zielen ab. In einem kostenlosen Erstgespräch erhalten Sie ein konkretes Angebot — ohne Standardpakete.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert es, bis SEO-Ergebnisse sichtbar werden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste messbare Verbesserungen in den Rankings zeigen sich typischerweise nach 3–6 Monaten. Stabile Top-Positionen und deutlich steigender Traffic entstehen in der Regel nach 6–12 Monaten konsequenter Arbeit.",
      },
    },
    {
      "@type": "Question",
      name: "Gibt es eine Vertragsbindung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Wir arbeiten ohne Mindestlaufzeiten. Sie können monatlich kündigen. Wir setzen auf Ergebnisse als Kundenbindung — nicht auf Vertragsklauseln.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SEOforge von anderen SEO-Agenturen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kein Standardpaket, kein Outsourcing, kein Blackbox-Reporting. Sie haben einen festen Ansprechpartner, erhalten monatliche Berichte in verständlicher Sprache und wissen jederzeit, was wir tun und warum.",
      },
    },
    {
      "@type": "Question",
      name: "Für welche Unternehmensgrößen ist SEOforge geeignet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir arbeiten sowohl mit inhabergeführten Unternehmen als auch mit mittelständischen Betrieben. Unsere Projekte starten typischerweise ab 10.000 € Jahresumsatz mit SEO als relevantem Kanal.",
      },
    },
  ],
};

export default function HomeServer() {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Navbar />

      <main>
        {/* ============================================================ */}
        {/*  HERO SECTION - PHOTO SPLIT LAYOUT                            */}
        {/* ============================================================ */}
        <HeroWithImage />

        {/* ============================================================ */}
        {/*  TRUST SECTION — stats + tools + testimonial                  */}
        {/* ============================================================ */}
        <TrustSection />

        {/* ============================================================ */}
        {/*  PARTNERSHIP SECTION                                          */}
        {/* ============================================================ */}
        <Section className="bg-white py-24 lg:py-32">
          <style>{`
            @keyframes rotate-badge {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .rotate-badge {
              animation: rotate-badge 20s linear infinite;
            }
          `}</style>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Eyebrow */}
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Unser Anspruch
            </p>

            {/* Main heading */}
            <h2 className="text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)] mb-6">
              Qualität ist nicht verhandelbar
            </h2>

            {/* Intro line */}
            <p className="text-lg text-muted mb-12 max-w-3xl">
              Nachhaltiger SEO-Erfolg entsteht nicht durch Tricks, sondern durch <span className="font-semibold text-dark">KONSEQUENTE QUALITÄTSARBEIT</span>.
            </p>

            {/* Icon + Content area */}
            <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 mb-16">
              {/* Left: Rotating circular badge - 195px */}
              <div className="shrink-0 relative hidden sm:block" style={{ width: '195px', height: '195px' }}>
                <svg className="absolute inset-0 w-full h-full rotate-badge" viewBox="0 0 195 195">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 97.5, 97.5 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                  </defs>
                  <text className="text-[13px] font-semibold tracking-wider" fill="#C2722A">
                    <textPath href="#circlePath" startOffset="0">
                      SEOFORGE • ANSPRUCH • SEOFORGE • ANSPRUCH •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#F8F7F5]" style={{ margin: '22px' }}>
                  <svg className="w-16 h-16 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              {/* Right: Text taking remaining space, centered */}
              <p className="text-lg leading-relaxed text-muted max-w-2xl">
                Wir arbeiten für Sie nach Grundsätzen, die sich nicht ändern – egal ob kleines Projekt oder große Kampagne.
                Keine Massenware, keine Automatisierung auf Kosten der Qualität. Wir analysieren Ihre spezifische
                Ausgangslage, entwickeln eine durchdachte Strategie und setzen sie mit Präzision um.
                Dabei bleiben Sie jederzeit im Bild – durch direkte Kommunikation und klare Fortschrittsberichte.
                So entsteht SEO, das hält.
              </p>
            </div>

            {/* Feature cards grid */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Card 1: Ergebnisse */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl text-dark mb-3 font-[family-name:var(--font-heading)]">
                  Daten statt Versprechen
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Wir messen, was zählt: Rankings, organischer Traffic, Conversions. Jeden Monat erhalten
                  Sie einen präzisen Report, der zeigt, wo Sie stehen und wohin die Reise geht.
                </p>
              </div>

              {/* Card 2: Erfahrung */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl text-dark mb-3 font-[family-name:var(--font-heading)]">
                  Erprobte Methoden
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Über Jahre hinweg haben wir unsere Methoden verfeinert – von lokalen Betrieben bis zu
                  bundesweiten Online-Shops. Dieses Wissen bringen wir mit, damit Sie nicht bei Null anfangen müssen.
                </p>
              </div>

              {/* Card 3: Strategie */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl text-dark mb-3 font-[family-name:var(--font-heading)]">
                  Maßarbeit, kein Schema F
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Standardlösungen gibt es bei uns nicht. Wir entwickeln eine Strategie, die zu Ihrem Geschäftsmodell,
                  Ihrer Zielgruppe und Ihren Ressourcen passt – nichts mehr, nichts weniger.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  AGENTUR-BAND — 3 Disziplinen, volle Breite auf Marken-Gradient */}
        {/* ============================================================ */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(130deg, #C2722A 0%, #CE8B3E 55%, #D4A853 100%)" }}>
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-24 right-[10%] h-[340px] w-[340px] rounded-full bg-white/[0.07] blur-3xl" />
            <div className="absolute -bottom-28 left-[5%] h-[300px] w-[300px] rounded-full bg-white/[0.06] blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
                maskImage: "radial-gradient(ellipse 75% 70% at 50% 40%, black, transparent)",
                WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 40%, black, transparent)",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-16 lg:pt-20 pb-6 lg:pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">Spezialisierungen</p>
                <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-white leading-tight">
                  Drei Disziplinen — so werden Sie gefunden.
                </h2>
              </div>
              <p className="text-sm text-white/70 max-w-xs sm:text-right leading-relaxed">
                Google, KI-Antworten und Marken-Autorität — jede mit eigener Seite.
              </p>
            </div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pb-10 lg:pb-14">
            <div className="grid md:grid-cols-3 md:divide-x divide-y md:divide-y-0 divide-white/20 border-y border-white/20">
              {[
                { nr: "01", label: "Suchmaschinen", titel: "SEO Agentur", href: "/seo-agentur", desc: "Nachhaltige Rankings in Google — Strategie, Technik, Content und Autorität." },
                { nr: "02", label: "Generative Engines", titel: "GEO Agentur", href: "/geo-agentur", desc: "Ihre Marke als Antwort in ChatGPT, Perplexity und AI Overviews." },
                { nr: "03", label: "KI & Marke", titel: "KI-SEO Agentur", href: "/ki-seo-agentur", desc: "Entitäten, Content-Autorität und digitale PR für die neue Suche." },
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="group relative flex flex-col px-7 lg:px-9 py-8 lg:py-10 transition-colors duration-300 hover:bg-white/[0.09]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                    {a.nr} · {a.label}
                  </span>
                  <span className="mt-2.5 font-[family-name:var(--font-heading)] text-[26px] lg:text-3xl font-bold text-white leading-tight">
                    {a.titel}
                  </span>
                  <span className="mt-2 text-[14px] leading-relaxed text-white/75">{a.desc}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Zur Seite
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                  <span
                    className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SERVICES TEASER → /leistungen                               */}
        {/* ============================================================ */}
        <section aria-labelledby="home-services-title" className="overflow-hidden border-y-2 border-dark bg-[#FBF4EA] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end lg:gap-16">
              <div>
                <p className="flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary-dark"><span className="h-px w-8 bg-dark" aria-hidden="true" />Leistungen · 04 Bereiche</p>
                <h2 id="home-services-title" className="mt-5 font-[family-name:var(--font-heading)] text-[36px] font-bold leading-[1.04] tracking-[-0.025em] text-dark sm:text-[43px] lg:text-[54px]">
                  SEO &amp; Webdesign<br />aus einer Hand
                </h2>
              </div>
              <p className="border-l-2 border-dark pl-5 text-[15px] leading-[1.75] text-dark/70">
                Individuell kombiniert — für Ihre Ziele, Ihre Branche, Ihr Budget.
              </p>
            </div>
            <div className="mt-12 lg:mt-16">
              <LeistungenInteractive />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  PROCESS SECTION — 4-step Audit → Strategie → Umsetzung      */}
        {/* ============================================================ */}
        <ProcessSection />
        <HomeDecisionLab />

        {false && (
        <>

        {/* ============================================================ */}
        {/*  WHAT MAKES US DIFFERENT - Bento Grid Typography               */}
        {/* ============================================================ */}
        <section className="py-24 lg:py-36 bg-white">
          <style>{`
            .highlight-word {
              background: linear-gradient(135deg, #C2722A 0%, #D4A853 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            .diff-card-num {
              transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
            }
            .diff-card:hover .diff-card-num {
              background-color: #C2722A;
              color: #fff;
              border-color: #C2722A;
            }
          `}</style>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            {/* Header */}
            <div className="mb-16 lg:mb-20">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
                Unser Unterschied
              </p>
              <h2 className="text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)] leading-tight max-w-2xl">
                Das macht <span className="highlight-word">SeoForge</span> anders
              </h2>
            </div>

            {/* Grid — gap-px + bg-border erzeugt die Trennlinien */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">

              {/* 01 */}
              <div className="diff-card bg-white p-8 lg:p-10 transition-colors hover:bg-offwhite">
                <span className="diff-card-num inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-dark text-sm font-semibold mb-8">
                  01
                </span>
                <h3 className="text-xl text-dark font-[family-name:var(--font-heading)] mb-3 leading-snug">
                  Keine Pakete.<br />
                  <span className="highlight-word">Kein Bullshit.</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Wir verkaufen keine Fixpreis-Pakete. Jede Strategie wird individuell entwickelt — weil Ihr Unternehmen einzigartig ist.
                </p>
              </div>

              {/* 02 */}
              <div className="diff-card bg-white p-8 lg:p-10 transition-colors hover:bg-offwhite">
                <span className="diff-card-num inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-dark text-sm font-semibold mb-8">
                  02
                </span>
                <h3 className="text-xl text-dark font-[family-name:var(--font-heading)] mb-3 leading-snug">
                  <span className="highlight-word">Maßgeschneidert</span><br />
                  statt Massenware
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Keine Copy-Paste-Lösungen. Wir analysieren Ihre Ausgangslage und entwickeln Strategien, die zu Ihrem Modell passen.
                </p>
              </div>

              {/* 03 */}
              <div className="diff-card bg-white p-8 lg:p-10 transition-colors hover:bg-offwhite">
                <span className="diff-card-num inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-dark text-sm font-semibold mb-8">
                  03
                </span>
                <h3 className="text-xl text-dark font-[family-name:var(--font-heading)] mb-3 leading-snug">
                  Immer einen<br />
                  <span className="highlight-word">Schritt voraus</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Algorithm-Updates, GEO-Optimierung, KI-Sichtbarkeit. Wir bleiben am Puls der Zeit — damit Sie es nicht müssen.
                </p>
              </div>

              {/* 04 */}
              <div className="diff-card bg-white p-8 lg:p-10 transition-colors hover:bg-offwhite">
                <span className="diff-card-num inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-dark text-sm font-semibold mb-8">
                  04
                </span>
                <h3 className="text-xl text-dark font-[family-name:var(--font-heading)] mb-3 leading-snug">
                  <span className="highlight-word">Direkter Draht</span><br />
                  zum Experten
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Keine Account-Manager, keine Weiterleitungen. Sie sprechen direkt mit dem, der Ihre Strategie entwickelt.
                </p>
              </div>

              {/* 05 */}
              <div className="diff-card bg-white p-8 lg:p-10 transition-colors hover:bg-offwhite">
                <span className="diff-card-num inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-dark text-sm font-semibold mb-8">
                  05
                </span>
                <h3 className="text-xl text-dark font-[family-name:var(--font-heading)] mb-3 leading-snug">
                  <span className="highlight-word">Kommunikation</span><br />
                  = Qualität
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Erst echte Kommunikation macht den Unterschied. Transparent, ehrlich, proaktiv — und immer erreichbar.
                </p>
              </div>

              {/* CTA-Tile */}
              <div className="bg-dark p-8 lg:p-10 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
                <p className="text-sm text-white/60 leading-relaxed mb-8">
                  Klingt das nach einer Zusammenarbeit, die Sie suchen?
                </p>
                <a
                  href="/kontakt"
                  className="group/btn inline-flex items-center gap-2 text-white text-sm font-semibold"
                >
                  Lassen Sie uns reden
                  <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  WHY YOUR BUSINESS NEEDS SEO                                  */}
        {/* ============================================================ */}
        <Section className="bg-offwhite py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section header */}
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-primary mb-4">Warum SEO?</p>
              <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark leading-[1.08]">
                Organische Sichtbarkeit ist<br />
                <span className="text-primary">kein Zufall</span>
              </h2>
            </div>

            {/* Stats row */}
            <div className="grid md:grid-cols-3 gap-4 mb-16">
              {[
                {
                  stat: "53%",
                  label: "Des Web-Traffics kommt organisch",
                  detail: "Mehr als die Hälfte aller Website-Besucher kommen über Suchmaschinen — nicht über Ads.",
                },
                {
                  stat: "14×",
                  label: "Höhere Conversion als Outbound",
                  detail: "Wer sucht, hat Absicht. SEO-Leads konvertieren 8–14× besser als Kaltakquise-Kontakte.",
                },
                {
                  stat: "76%",
                  label: "Lokale Suchen enden im Geschäft",
                  detail: "Drei von vier Menschen, die lokal suchen, besuchen innerhalb von 24h ein lokales Unternehmen.",
                },
              ].map((fact, i) => (
                <div key={i} className="rounded-2xl border border-border bg-white p-6">
                  <p className="font-[family-name:var(--font-heading)] text-5xl font-bold text-primary leading-none mb-3">{fact.stat}</p>
                  <h3 className="font-semibold text-dark mb-2">{fact.label}</h3>
                  <p className="text-sm text-muted leading-relaxed">{fact.detail}</p>
                </div>
              ))}
            </div>

            {/* Reason cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Organischer Traffic wächst dauerhaft",
                  desc: "Bezahlte Anzeigen liefern Traffic solange Sie zahlen. Organische Sichtbarkeit wächst mit der Zeit — ohne laufende Werbekosten.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Qualifiziertere Leads, weniger Aufwand",
                  desc: "Wer sucht, hat bereits eine Kaufabsicht. SEO zieht Menschen an, die aktiv nach Ihrer Lösung suchen — keine Kaltakquise nötig.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: "Lokale Kunden finden Sie zuerst",
                  desc: "76% der lokalen Suchanfragen führen innerhalb von 24 Stunden zu einem Besuch. Local SEO bringt Kunden direkt zu Ihnen.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-border bg-white p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-dark mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/*  WHY SEOFORGE / PROCESS                                       */}
        {/* ============================================================ */}
        <WhySeoForgeSection />

        {/* ============================================================ */}
        {/*  TESTIMONIAL / SOCIAL PROOF                                  */}
        {/* ============================================================ */}
        <Section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Centered heading */}
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary animate-fade-up">
                Das sagen unsere Kunden
              </p>
              <h2 className="mt-3 text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)] animate-fade-up" style={{ animationDelay: '0.05s' }}>
                Vertrauen, das auf <span className="text-primary">Ergebnissen</span> basiert
              </h2>
            </div>

            {/* Trust metric badges - centered */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-offwhite px-4 py-2.5 text-sm font-medium text-dark">
                <svg className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.9/5.0 Google Reviews
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-offwhite px-4 py-2.5 text-sm font-medium text-dark">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                96% Kundenbindung
              </div>
            </div>

            {/* 3 Review cards side by side with floating animation */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {/* Review 1 - Michael K. */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6 shadow-sm float-review-1 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-dark mb-4">
                  &ldquo;SeoForge hat unseren organischen Traffic innerhalb von 8 Monaten verdreifacht. Die transparente Arbeitsweise und das tiefe Fachwissen haben uns überzeugt.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    M
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Michael K.</p>
                    <p className="text-xs text-muted">Geschäftsführer, TechStart GmbH</p>
                  </div>
                  <div className="ml-auto text-xs font-medium text-muted bg-white px-2.5 py-1 rounded-full border border-border">
                    Google
                  </div>
                </div>
              </div>

              {/* Review 2 - Sandra M. */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6 shadow-sm float-review-2 animate-fade-up" style={{ animationDelay: '0.35s' }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-dark mb-4">
                  &ldquo;Endlich ein SEO-Partner, der nicht nur redet, sondern liefert. Unsere Rankings haben sich in allen wichtigen Bereichen deutlich verbessert.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                    S
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Sandra M.</p>
                    <p className="text-xs text-muted">Marketing Leiterin, ModeHaus AG</p>
                  </div>
                  <div className="ml-auto text-xs font-medium text-muted bg-white px-2.5 py-1 rounded-full border border-border">
                    Verified
                  </div>
                </div>
              </div>

              {/* Review 3 - Thomas R. */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-6 shadow-sm float-review-3 animate-fade-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-dark mb-4">
                  &ldquo;Die Zusammenarbeit mit SeoForge ist unkompliziert und ergebnisorientiert. Das monatliche Reporting gibt uns volle Kontrolle über alle Maßnahmen.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    T
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">Thomas R.</p>
                    <p className="text-xs text-muted">Inhaber, Handwerk Digital</p>
                  </div>
                  <div className="ml-auto text-xs font-medium text-muted bg-white px-2.5 py-1 rounded-full border border-border">
                    Google
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        </>
        )}

        {/* ============================================================ */}
        {/*  CTA SECTION                                                  */}
        {/* ============================================================ */}
        <Section className="bg-dark py-24 lg:py-32" id="kontakt">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            {/* Background accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
              <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
            </div>

            <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
              {/* Text */}
              <div>
                <h2 className="text-4xl lg:text-5xl text-white font-[family-name:var(--font-heading)] animate-fade-up">
                  Bereit für mehr{" "}
                  <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                    Sichtbarkeit
                  </span>
                  ?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/60 animate-fade-up" style={{ animationDelay: '0.05s' }}>
                  Lassen Sie uns in einem kostenlosen Erstgespräch herausfinden,
                  wie wir Ihr Unternehmen in den Suchergebnissen nach vorne bringen können.
                  Keine Verpflichtungen &mdash; nur ehrliche Einschätzungen.
                </p>

                <div className="mt-8 space-y-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                  {[
                    "Kostenlose Erstanalyse Ihrer Website",
                    "Individueller SEO-Massnahmenplan",
                    "Transparente Preise ohne versteckte Kosten",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <svg className="h-3 w-3 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact form */}
              <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                  <h3 className="text-2xl text-white font-[family-name:var(--font-heading)]">Jetzt Kontakt aufnehmen</h3>
                  <p className="mt-1 text-sm text-white/50">
                    Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>

                  <HomeContactForm />
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  WHY SEOFORGE SECTION                                              */
/* ------------------------------------------------------------------ */
function WhySeoForgeSection() {
  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text side */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Warum SeoForge
            </p>
            <h2 className="mt-3 text-4xl lg:text-5xl text-dark font-[family-name:var(--font-heading)]" style={{ animationDelay: '0.05s' }}>
              Datengetrieben. Transparent. <span className="text-primary">Nachhaltig</span>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted" style={{ animationDelay: '0.1s' }}>
              Wir setzen nicht auf schnelle Tricks, sondern auf fundierte Strategien,
              die langfristig wirken. Jede Maßnahme basiert auf Daten, und Sie behalten
              jederzeit den vollen Ueberblick.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  step: "01",
                  title: "Analyse & Audit",
                  desc: "Wir analysieren Ihre Website, den Wettbewerb und Ihre Zielgruppe bis ins Detail.",
                },
                {
                  step: "02",
                  title: "Strategie & Planung",
                  desc: "Basierend auf den Daten entwickeln wir eine massgeschneiderte SEO-Strategie.",
                },
                {
                  step: "03",
                  title: "Umsetzung & Optimierung",
                  desc: "Wir setzen die Maßnahmen um und optimieren kontinuierlich für beste Ergebnisse.",
                },
                {
                  step: "04",
                  title: "Reporting & Wachstum",
                  desc: "Transparente Berichte zeigen Ihren Fortschritt. Wir skalieren, was funktioniert.",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="flex gap-5"
                  style={{ animationDelay: `${(i + 3) * 0.05}s` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/[0.08] text-sm font-bold text-primary">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl text-dark font-[family-name:var(--font-heading)]">{item.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side — SEO Ranking Tracker Mockup */}
          <div className="relative hidden lg:block" style={{ animationDelay: '0.1s' }}>
            <div className="rounded-3xl border border-border bg-white shadow-xl shadow-dark/[0.04] overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 bg-offwhite px-5 py-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="ml-2 flex-1 rounded-md bg-white border border-border px-3 py-1 text-[11px] text-muted">
                  search.google.com — &ldquo;SEO Agentur Mannheim&rdquo;
                </div>
              </div>
              {/* Ranking results */}
              <div className="p-5 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-4">Google Suchergebnisse — Positionsverlauf</p>
                {/* 5 keyword rows */}
                {[
                  { kw: "SEO Agentur", from: 47, to: 1, change: "+46" },
                  { kw: "SEO Beratung", from: 23, to: 3, change: "+20" },
                  { kw: "SEO Optimierung", from: 31, to: 2, change: "+29" },
                  { kw: "Local SEO", from: 18, to: 4, change: "+14" },
                  { kw: "SEO Audit", from: 55, to: 6, change: "+49" },
                ].map((row, i) => (
                  <div key={row.kw} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                    <div className="w-32 text-[13px] text-dark font-medium">{row.kw}</div>
                    <div className="flex-1 relative h-2 bg-border/60 rounded-full overflow-hidden">
                      <div
                        className="absolute right-0 h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                        style={{ width: `${(1 - (row.to / 60)) * 100}%`, transition: `width 1.2s ease ${i * 0.15}s` }}
                      />
                    </div>
                    <div className="w-8 text-center text-[12px] font-bold text-dark">#{row.to}</div>
                    <div className="w-12 text-right text-[11px] font-semibold text-green-600">↑{row.change}</div>
                  </div>
                ))}
              </div>
              {/* Stats footer */}
              <div className="grid grid-cols-3 divide-x divide-border border-t border-border bg-offwhite/50">
                {[
                  { label: "Ø Sichtbarkeit", value: "+187%" },
                  { label: "Keywords Top 10", value: "342" },
                  { label: "Zeitraum", value: "8 Mon." },
                ].map(s => (
                  <div key={s.label} className="py-4 text-center">
                    <p className="text-lg font-bold text-dark">{s.value}</p>
                    <p className="text-[10px] text-muted uppercase tracking-wide mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -right-4 -top-6 rounded-xl border border-border bg-white p-3 shadow-lg">
              <p className="text-[10px] font-medium text-muted">Org. Traffic</p>
              <p className="text-lg font-bold text-dark">+187%</p>
              <p className="text-[10px] text-green-600 font-medium">12 Monate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
