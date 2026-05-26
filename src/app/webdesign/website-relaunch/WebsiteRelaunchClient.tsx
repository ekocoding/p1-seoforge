"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  { icon: "🕰️", title: "Veraltetes Design", desc: "Wenn deine Website aussieht wie 2015 und Besucher abspringen, weil sie kein Vertrauen aufbauen können." },
  { icon: "📱", title: "Nicht Mobile-optimiert", desc: "Über 60% des Traffics kommt vom Smartphone. Eine nicht-responsive Website verliert jeden zweiten Besucher." },
  { icon: "🐌", title: "Schlechter PageSpeed", desc: "Google bestraft langsame Websites — und Besucher verlassen sie nach 3 Sekunden. PageSpeed ist SEO." },
  { icon: "🎨", title: "Rebranding", desc: "Neue Unternehmensidentität, neues Logo, neues Messaging — dann muss auch die Website neu sein." },
  { icon: "📉", title: "Niedrige Conversion Rate", desc: "Wenn Traffic da ist, aber Leads oder Käufe ausbleiben, ist das oft ein Design- und UX-Problem." },
  { icon: "🔧", title: "Technische Schulden", desc: "Wenn das CMS veraltet ist, Plugins crashen und jede Änderung zum Risiko wird — Zeit für Neuanfang." },
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

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#1A1A1A" }}
      >
        <Image
          src="/images/hero-website-relaunch.jpg"
          alt="Website Relaunch Agentur"
          fill
          className="object-cover object-center opacity-25"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(26,26,26,0.97) 0%, rgba(26,26,26,0.85) 50%, rgba(26,26,26,0.50) 100%)" }} />
        <div
          className="absolute top-0 right-0 h-[700px] w-[700px] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(194,114,42,0.18) 0%, rgba(212,168,83,0.08) 40%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12 w-full">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Website Relaunch · SEO-sichere Migration
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white font-[family-name:var(--font-heading)] mb-6">
              Website Relaunch —{" "}
              <span className="border-b-2 border-primary pb-1">
                ohne Rankingverluste.
              </span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8">
              Wir modernisieren deine Website vollständig — neues Design, bessere Performance, klarere User Journey. Und das wichtigste: Alle deine hart erarbeiteten Google-Rankings bleiben erhalten. SEO-Migration ist unser Kerngeschäft.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Vollständige 301-Redirect-Map — kein Ranking geht verloren",
                "Audit der bestehenden Website vor jedem Relaunch",
                "Search Console Monitoring 4–8 Wochen nach Launch",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                Kostenloses Relaunch-Gespräch →
              </Link>
              <Link
                href="/seo/audit"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                SEO-Audit anfragen →
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { val: "50+", label: "Relaunches durchgeführt" },
                { val: "0%", label: "Ø Rankingverlust" },
                { val: "6–10 Wo.", label: "Projektlaufzeit" },
              ].map((m) => (
                <div key={m.label} className="border-l-2 border-primary/40 pl-4">
                  <div className="text-2xl font-bold text-white">{m.val}</div>
                  <div className="text-xs text-white/50 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRÜNDE FÜR RELAUNCH */}
      <section
        className="bg-white py-24 lg:py-32"
      >
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gruende.map((g, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="rounded-2xl border border-border p-7 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <div className="text-3xl mb-4">{g.icon}</div>
                  <h3 className="font-bold text-dark text-lg mb-2">{g.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{g.desc}</p>
                </div>
              </Reveal>
            ))}
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
      <section
        className="py-24 lg:py-32"
        style={{ background: "#F8F5F1" }}
      >
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
            <div className="hidden lg:block absolute left-[2.25rem] top-8 bottom-8 w-px bg-primary/20" />
            <div className="space-y-6">
              {relaunchSchritte.map((step, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="font-mono text-sm font-bold text-primary">{step.nr}</span>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl border border-border p-6">
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
      <section className="bg-white py-24 lg:py-32">
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
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Bessere Zielgruppenansprache", sub: "Höhere Verweildauer & Conversion" },
                  { label: "Mehr qualifizierte Leads", sub: "Durch bessere UX & klare CTAs" },
                  { label: "Größere Google-Sichtbarkeit", sub: "Durch verbessertes UX & Technik" },
                  { label: "Einfachere Verwaltung", sub: "Modernes CMS, kein Developer nötig" },
                ].map((v) => (
                  <div key={v.label} className="rounded-xl border border-border p-4">
                    <div className="font-semibold text-dark text-sm mb-1">{v.label}</div>
                    <div className="text-xs text-muted">{v.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-2xl border border-border p-8 bg-offwhite">
                <h3 className="font-bold text-dark text-xl mb-6 font-[family-name:var(--font-heading)]">Relaunch-Checkliste</h3>
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
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  Relaunch-Gespräch buchen →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-24 lg:py-32"
        style={{ background: "#F8F5F1" }}
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="reveal mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Häufige Fragen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              Alles zum Website-Relaunch
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="rounded-2xl border border-border bg-white overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                    <svg
                      className={`w-4 h-4 text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm text-muted leading-relaxed border-t border-border pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Verwandte Leistungen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">
              Vor und nach dem Relaunch
            </h2>
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
                className="rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <h3 className="font-bold text-dark text-base mb-2 group-hover:text-primary transition-colors">{link.title} →</h3>
                <p className="text-muted text-sm leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "#1A1A1A" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-4">
              Bereit für den Relaunch?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Wir analysieren deine bestehende Website kostenlos und zeigen dir, was ein Relaunch für dein Ranking und deine Conversion Rate bedeutet.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              Kostenloses Relaunch-Gespräch →
            </Link>
          </Reveal>
        </div>
      </section>
    </SubpageLayout>
  );
}
