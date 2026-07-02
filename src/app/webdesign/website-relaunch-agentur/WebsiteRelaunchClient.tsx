"use client";

import { useState } from "react";
import Link from "next/link";
import SubpageLayout from "@/app/components/SubpageLayout";
import RankingMigrationApp from "./RankingMigrationApp";
import PageSpeedBeforeAfter from "./PageSpeedBeforeAfter";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      className="reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const faqs = [
  {
    q: "Verliere ich meine Google-Rankings beim Website-Relaunch?",
    a: "Nicht wenn es richtig gemacht wird. Wir analysieren vor dem Relaunch alle Rankings und wichtigen URLs, erstellen eine vollständige Weiterleitungsmap (301-Redirects), überprüfen die neue Struktur in Google Search Console und monitoren die Rankings 4–8 Wochen nach dem Launch aktiv. Rankingverluste durch Relaunches sind fast immer auf fehlende oder falsche Weiterleitungen zurückzuführen — das vermeiden wir systematisch.",
  },
  {
    q: "Wann ist ein Website-Relaunch sinnvoll?",
    a: "Ein Relaunch ist sinnvoll wenn: deine Website technisch veraltet ist (PageSpeed < 70, nicht mobile-optimiert), das Design nicht mehr zur Marke passt, die Conversion Rate unbefriedigend ist, du ein Rebranding durchgeführt hast, oder die Inhaltspflege zu aufwendig ist. Im kostenlosen Erstgespräch analysieren wir, ob ein Relaunch oder eine schrittweise Optimierung besser zu deiner Situation passt.",
  },
  {
    q: "Was kostet ein Website-Relaunch?",
    a: "Die Kosten hängen vom Umfang der bestehenden Website und dem gewünschten Ergebnis ab. Einfache Relaunches (5–15 Seiten) starten ab 3.500 €, komplexere Projekte mit E-Commerce, individuellem Design und umfangreicher SEO-Migration ab 8.000 €. Wir erstellen im Erstgespräch ein transparentes Festpreisangebot.",
  },
  {
    q: "Wie lange dauert ein Website-Relaunch?",
    a: "Für einen typischen Unternehmens-Relaunch (10–30 Seiten) kalkulieren wir 6–10 Wochen: 2 Wochen Analyse & Konzept, 2 Wochen Design, 3 Wochen Entwicklung, 1 Woche Testing & SEO-Migration, Launch + 4 Wochen Monitoring.",
  },
  {
    q: "Kann ich meine bestehenden Inhalte behalten?",
    a: "Ja. Wir entscheiden gemeinsam, welche Inhalte migriert, überarbeitet oder durch neue ersetzt werden. Dabei legen wir besonderen Wert darauf, keine Seiten zu löschen, die organischen Traffic bringen — diese werden immer migriert oder mit korrekten Weiterleitungen versehen.",
  },
  {
    q: "Bietet ihr auch SEO nach dem Relaunch an?",
    a: "Ja — und das empfehlen wir ausdrücklich. Nach einem Relaunch gibt es in der Regel frische Optimierungspotenziale: neue Seitenstruktur, neue Content-Chancen, technische Verbesserungen. Unsere monatliche SEO-Betreuung baut direkt auf dem sauberen Fundament des Relaunches auf.",
  },
];

const gruende = [
  { icon: "M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", title: "Veraltetes Design", desc: "Wenn deine Website aussieht wie 2015 und Besucher abspringen, weil sie kein Vertrauen aufbauen können." },
  { icon: "M7 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm5 14h.01", title: "Nicht Mobile-optimiert", desc: "Über 60% des Traffics kommt vom Smartphone. Eine nicht-responsive Website verliert jeden zweiten Besucher." },
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Schlechter PageSpeed", desc: "Google bestraft langsame Websites — und Besucher verlassen sie nach 3 Sekunden. PageSpeed ist SEO." },
  { icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13L2 21.75l.8-2.935a4.5 4.5 0 011.13-1.897l12.932-12.43z", title: "Rebranding", desc: "Neue Unternehmensidentität, neues Logo, neues Messaging — dann muss auch die Website neu sein." },
  { icon: "M3 17l6-6 4 4 8-8M21 7v4M21 7h-4", title: "Niedrige Conversion Rate", desc: "Wenn Traffic da ist, aber Leads oder Käufe ausbleiben, ist das oft ein Design- und UX-Problem." },
  { icon: "M16 18l6-6-6-6M8 6l-6 6 6 6", title: "Technische Schulden", desc: "Wenn das CMS veraltet ist, Plugins crashen und jede Änderung zum Risiko wird — Zeit für Neuanfang." },
];

const relaunchSchritte = [
  { nr: "01", title: "SEO-Analyse der bestehenden Website", desc: "Wir dokumentieren alle Rankings, Traffic-starken URLs und die aktuelle Seitenstruktur — als Sicherheitsnetz." },
  { nr: "02", title: "Konzept & neue Informationsarchitektur", desc: "Neue Seitenstruktur, Sitemap, User Journeys und Wireframes — immer mit SEO-Potenzial im Blick." },
  { nr: "03", title: "Neues Design & UX", desc: "Modernes Design, das zur aktuellen Marke passt und Besucher intuitiv zu Conversions führt." },
  { nr: "04", title: "Entwicklung & Migration", desc: "Saubere Entwicklung der neuen Website, vollständige Content-Migration und Aufbau der 301-Weiterleitungsmap." },
  { nr: "05", title: "Pre-Launch SEO-Check", desc: "Wir prüfen jeden Redirect, jede Canonical URL, alle Meta-Daten und das Schema-Markup vor dem Go-Live." },
  { nr: "06", title: "Launch & Monitoring", desc: "Kontrollierter Launch mit Search Console Monitoring über 4–8 Wochen — wir reagieren sofort, wenn Rankings schwanken." },
];

export default function WebsiteRelaunchClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

      {/* HERO — hell, minimal, zentriert (bekannte UI-Regeln: Hierarchie, kurze Copy, 1 primärer CTA) */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute left-1/2 top-[-22%] h-[620px] w-[980px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse at center, rgba(212,168,83,0.16), transparent 62%)" }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(26,26,26,0.045) 1px, transparent 0)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse 70% 55% at 50% 32%, #000 35%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 32%, #000 35%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-24 text-center">

          <div className="hero-badge mb-7 inline-flex items-center gap-2.5">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Website-Relaunch Agentur
            </span>
            <span className="h-px w-8 bg-primary" />
          </div>

          <h1
            className="hero-title font-[family-name:var(--font-heading)] font-medium tracking-tight text-dark leading-[1.02] mb-7"
            style={{ fontSize: "clamp(42px, 5.8vw, 82px)" }}
          >
            Website-Relaunch,
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #C2722A, #D4A853)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              der keine Rankings kostet.
            </span>
          </h1>

          <p className="hero-description mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted">
            Als Website-Relaunch Agentur bauen wir deine Website komplett neu — Design,
            Performance, User Journey. Deine Rankings sichern wir systematisch: vollständiges
            SEO-Audit, lückenlose 301-Redirect-Map und engmaschiges Monitoring nach dem Go-Live.
          </p>

          <div className="hero-cta flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
            >
              Kostenloses Relaunch-Gespräch
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/seo/audit"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-8 py-4 text-sm font-semibold text-dark transition-all hover:border-primary/40"
            >
              SEO-Audit anfragen
            </Link>
          </div>

          <div className="hero-description mt-14 flex flex-col items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted/70">
              SEO-sichere Migration
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {["Audit", "Redirect-Map", "Launch", "Monitoring"].map((step, i) => (
                <span key={step} className="flex items-center gap-3">
                  {i > 0 && <span className="text-primary/45 text-sm">→</span>}
                  <span className="text-sm font-semibold text-dark/55">
                    <span className="font-mono text-[11px] text-primary/70 mr-1.5">0{i + 1}</span>
                    {step}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRÜNDE FÜR RELAUNCH — Bento */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Wann ist ein Relaunch fällig?
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              6 Zeichen, dass deine Website neu muss.
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              Erkennst du dich wieder? Dann ist es Zeit für ein Gespräch.
            </p>
          </div>
          <div className="grid md:grid-cols-6 gap-4">
            {gruende.map((g, i) => {
              const featured = i === 0;
              const wide = i === gruende.length - 1;
              const span = featured ? "md:col-span-4" : wide ? "md:col-span-6" : "md:col-span-2";
              return (
                <div key={g.title} className={span}>
                  <Reveal delay={(i % 3) * 80}>
                    <div
                      className={`group relative h-full rounded-3xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_24px_50px_-30px_rgba(194,114,42,0.35)] hover:-translate-y-1 ${wide ? "flex flex-col sm:flex-row sm:items-center gap-5 p-7 lg:p-8" : "p-7 lg:p-8"}`}
                      style={{ background: featured ? "linear-gradient(135deg, #FBF6EF 0%, #fff 55%)" : "#fff" }}
                    >
                      {featured && (
                        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full" style={{ background: "radial-gradient(circle, rgba(212,168,83,0.16), transparent 70%)" }} aria-hidden="true" />
                      )}
                      <div className={`${wide ? "shrink-0" : "mb-5"} inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300`}>
                        {icon(g.icon)}
                      </div>
                      <div className={wide ? "flex-1" : undefined}>
                        <h3 className={`font-bold text-dark mb-2 ${featured ? "font-[family-name:var(--font-heading)] text-2xl" : "text-lg"}`}>{g.title}</h3>
                        <p className={`text-muted leading-relaxed ${featured ? "text-base max-w-xl" : "text-sm"}`}>{g.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPS SECTION */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Relaunch in Zahlen
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
                Was du riskierst — und was du gewinnst.
              </h2>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal delay={0}><RankingMigrationApp /></Reveal>
            <Reveal delay={100}><PageSpeedBeforeAfter /></Reveal>
          </div>
        </div>
      </section>

      {/* PROZESS */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Unser Relaunch-Prozess
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Wie wir einen sicheren Relaunch durchführen.
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              In 6 Schritten zur neuen Website — strukturiert, transparent und ohne Ranking-Risiko.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-primary/40 via-primary/15 to-transparent" />
            <div className="space-y-5">
              {relaunchSchritte.map((step, i) => (
                <Reveal key={i} delay={i * 90}>
                  <div className="group flex gap-6 items-start">
                    <div className="relative flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)" }}>
                      <span className="font-mono text-sm font-bold">{step.nr}</span>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl border border-border p-6 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md">
                      <h3 className="font-bold text-dark text-lg mb-1">{step.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VORTEILE PANEL */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-6">
                Was du bekommst
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-6">
                Mehr als ein neues Design.
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Ein Relaunch ist eine strategische Investition — nicht nur in Optik, sondern in Performance, Auffindbarkeit und Conversion Rate. Als SEO-Agentur denken wir Webdesign und Sichtbarkeit zusammen.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Bessere Zielgruppenansprache", sub: "Höhere Verweildauer & Conversion", s: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
                  { label: "Mehr qualifizierte Leads", sub: "Durch bessere UX & klare CTAs", s: "M3 17l6-6 4 4 8-8M21 7v4M21 7h-4" },
                  { label: "Größere Google-Sichtbarkeit", sub: "Durch verbessertes UX & Technik", s: "M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" },
                  { label: "Einfachere Verwaltung", sub: "Modernes CMS, kein Developer nötig", s: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" },
                ].map((v) => (
                  <div key={v.label} className="group rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5">
                    <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {icon(v.s)}
                    </div>
                    <div className="font-semibold text-dark text-sm mb-1">{v.label}</div>
                    <div className="text-xs text-muted">{v.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-30px_rgba(26,26,26,0.18)]">
                <div className="px-8 py-4 border-b border-border bg-offwhite/60">
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-dark/45">Relaunch-Checkliste</span>
                </div>
                <div className="p-8">
                  <div className="space-y-3">
                    {[
                      "SEO-Audit der bestehenden Website",
                      "Vollständige URL-Mapping & 301-Redirects",
                      "Neues Design & UI/UX",
                      "Core Web Vitals Optimierung (96+ Score)",
                      "Content-Migration & Überarbeitung",
                      "Schema-Markup & Meta-Daten",
                      "Google Search Console Monitoring",
                      "4-Wochen Post-Launch Support",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-dark text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/kontakt"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
                  >
                    Relaunch-Gespräch buchen →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="reveal lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Häufige Fragen
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-4">
                Alles zum<br />Website-Relaunch.
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Deine Frage ist nicht dabei? Schreib uns — wir antworten garantiert in unter 24 Stunden.
              </p>
              <Link href="/kontakt" className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors">
                Frage stellen
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className={`rounded-2xl border bg-white overflow-hidden transition-colors duration-300 ${openFaq === i ? "border-primary/30" : "border-border"}`}>
                    <button
                      className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                      <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i ? "bg-primary text-white rotate-180" : "bg-primary/[0.08] text-primary"}`}>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 9l-7 7-7-7" /></svg>
                      </span>
                    </button>
                    <div className="grid transition-[grid-template-rows] duration-400 ease-out" style={{ gridTemplateRows: openFaq === i ? "1fr" : "0fr" }}>
                      <div className="overflow-hidden">
                        <div className="px-6 pb-5 text-sm text-muted leading-relaxed border-t border-border pt-4">{faq.a}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-20" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Verwandte Leistungen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">
              Vor und nach dem Relaunch
            </h2>
            <Link href="/webdesign" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
              Alle Webdesign-Leistungen im Überblick <span>→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "SEO Audit", href: "/seo/audit", desc: "Vollständige Analyse — ideal als Relaunch-Basis." },
              { title: "Website erstellen lassen", href: "/webdesign/website-erstellen-lassen", desc: "Neuanfang statt Relaunch? Wir beraten ehrlich." },
              { title: "On-Page SEO", href: "/seo/on-page", desc: "Schrittweise Optimierung als Alternative zum Relaunch." },
              { title: "SEO Betreuung", href: "/seo/betreuung", desc: "Monatliche SEO-Arbeit nach dem Relaunch." },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-border bg-white p-6 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <h3 className="font-bold text-dark text-base mb-2 group-hover:text-primary transition-colors">{link.title} →</h3>
                <p className="text-muted text-sm leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-24 lg:py-32" id="kontakt">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
          </div>

          <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl text-white lg:text-5xl">
                Bereit für den Relaunch —{" "}
                <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                  ohne Risiko
                </span>
                ?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Wir analysieren deine bestehende Website kostenlos und zeigen dir, was ein
                Relaunch für Rankings und Conversion bedeutet. Keine Verpflichtungen — nur
                eine ehrliche Einschätzung.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Kostenlose Analyse deiner bestehenden Website",
                  "SEO-sichere Migration — Rankings bleiben erhalten",
                  "Verbindlicher Festpreis nach dem Erstgespräch",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <svg className="h-3 w-3 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl text-white">
                  Jetzt Kontakt aufnehmen
                </h3>
                <p className="mt-1 text-sm text-white/50">
                  Wir melden uns innerhalb von 24 Stunden bei dir.
                </p>
                <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      aria-label="Dein Name"
                      placeholder="Dein Name"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                    />
                    <input
                      type="text"
                      name="company"
                      aria-label="Unternehmen"
                      placeholder="Unternehmen"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    aria-label="Deine E-Mail-Adresse"
                    placeholder="Deine E-Mail-Adresse"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <input
                    type="url"
                    name="website"
                    aria-label="URL deiner bestehenden Website"
                    placeholder="URL deiner bestehenden Website"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <textarea
                    name="message"
                    rows={4}
                    aria-label="Nachricht"
                    placeholder="Was stört dich an der aktuellen Website?"
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
                  >
                    Kostenlose Relaunch-Analyse anfordern
                  </button>
                  <p className="text-center text-xs text-white/30">
                    Deine Daten werden vertraulich behandelt.
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
