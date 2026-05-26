"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "@/app/components/SubpageLayout";
import WebsiteCostCalculator from "./WebsiteCostCalculator";
import PageSpeedApp from "./PageSpeedApp";

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
    q: "Was kostet es, eine Website erstellen zu lassen?",
    a: "Die Kosten hängen von Umfang, Design-Komplexität und Funktionen ab. Einfache Business-Websites starten ab 2.500 €, komplexere Lösungen mit E-Commerce oder individuellen Features ab 5.000 €. Im kostenlosen Erstgespräch erstellen wir ein transparentes Festpreisangebot — keine versteckten Kosten.",
  },
  {
    q: "Wie lange dauert die Erstellung einer Website?",
    a: "Standard-Websites sind in 4–6 Wochen fertig: 1 Woche Analyse & Konzept, 2 Wochen Design, 2 Wochen Entwicklung, 1 Woche Testing & Launch. Komplexere Projekte mit Shop oder Individualprogrammierung dauern 8–12 Wochen.",
  },
  {
    q: "Welche Technologie nutzt ihr für die Website-Erstellung?",
    a: "Wir entwickeln mit Next.js (React) für maximale Performance und SEO, oder WordPress/Elementor für Content-lastige Seiten, die du selbst bearbeiten möchtest. Wir empfehlen immer die Technologie, die am besten zu deinen Zielen passt — nicht die teuerste.",
  },
  {
    q: "Kann ich meine Website nach dem Launch selbst bearbeiten?",
    a: "Ja. Je nach Technologie integrieren wir ein CMS wie Sanity, Contentful oder WordPress, das du ohne Programmierkenntnisse bedienen kannst. Wir liefern eine persönliche Einweisung mit jedem Projekt.",
  },
  {
    q: "Ist SEO bei der Website-Erstellung bereits enthalten?",
    a: "Absolut — als SEO-Agentur bauen wir SEO von Anfang an ein: saubere URL-Struktur, Schema-Markup, technische Optimierung, Core Web Vitals und interne Verlinkung. Deine Website ist vom ersten Tag an rankingfähig. Auf Wunsch kombinieren wir mit laufender SEO-Betreuung.",
  },
  {
    q: "Was unterscheidet euch von anderen Webdesign-Agenturen?",
    a: "Wir sind SEO-Agentur und Webdesign-Agentur in einem. Das bedeutet: Wir bauen keine schönen Broschüren-Websites, sondern performante Lead-Maschinen, die bei Google ranken und konvertieren. Beides kommt direkt aus einer Hand — kein Schnittstellenproblem.",
  },
];

const leistungen = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Konzept & Strategie",
    desc: "Wir analysieren deine Zielgruppe, Wettbewerber und Ziele — und entwickeln daraus ein Konzept, das wirklich funktioniert.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/>
      </svg>
    ),
    title: "UI/UX Design",
    desc: "Modernes Design, das deine Marke widerspiegelt und Besucher intuitiv durch die Customer Journey führt.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Next.js / WordPress Entwicklung",
    desc: "Performante Entwicklung mit der Technologie, die zu deinem Projekt passt — blitzschnell, sicher und skalierbar.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "SEO-First Aufbau",
    desc: "Schema-Markup, Core Web Vitals, saubere URL-Struktur und technisches SEO sind von Anfang an im Code — nicht als Nachgedanke.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: "Responsive & Mobile-First",
    desc: "Über 60% des Traffics kommt vom Smartphone. Jede Website, die wir bauen, ist für alle Bildschirmgrößen perfekt optimiert.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
    ),
    title: "Launch & Betreuung",
    desc: "Nach dem Launch stehen wir weiter zur Seite: Wartungsverträge, Sicherheitsupdates, Performance-Monitoring und Content-Pflege.",
  },
];

const prozessSteps = [
  { nr: "01", title: "Kostenlose Erstberatung", desc: "Wir lernen dein Business kennen, klären Ziele und Budget — in einem 30-Minuten-Call ohne Verpflichtung." },
  { nr: "02", title: "Konzept & Angebot", desc: "Du erhältst ein detailliertes Konzept mit Seitenstruktur, Technologieempfehlung und Festpreisangebot." },
  { nr: "03", title: "Design & Feedback", desc: "Wir designen deine Website und holen dein Feedback in strukturierten Runden ab — bis alles sitzt." },
  { nr: "04", title: "Entwicklung & SEO", desc: "Saubere Entwicklung mit integriertem SEO-Setup, Speed-Optimierung und CMS-Integration." },
  { nr: "05", title: "Testing & Launch", desc: "Umfangreiche QA über alle Geräte, dann Go-Live — mit Search Console Monitoring in den ersten Wochen." },
];

export default function WebsiteErstellenLassenClient() {
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
        {/* Background image */}
        <Image
          src="/images/hero-website-erstellen.jpg"
          alt="Web design studio"
          fill
          className="object-cover object-center opacity-25"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
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
              Website erstellen lassen · SEO & Design aus einer Hand
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white font-[family-name:var(--font-heading)] mb-6">
              Website erstellen lassen —{" "}
              <span className="border-b-2 border-primary pb-1">
                schnell, sicher, SEO-ready.
              </span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8">
              Wir entwickeln professionelle Websites, die nicht nur gut aussehen, sondern bei Google ranken und Besucher in Kunden verwandeln. Als SEO-Agentur bauen wir SEO von Tag 1 ein — kein Nachstricken.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Festpreis ab 2.500 € — transparent, keine versteckten Kosten",
                "96+ PageSpeed Score & Core Web Vitals",
                "Fertig in 4–6 Wochen inklusive Launch",
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
                Kostenloses Erstgespräch →
              </Link>
              <Link
                href="/webdesign"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Alle Webdesign-Leistungen →
              </Link>
            </div>

            {/* Trust metrics */}
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { val: "100+", label: "Websites launched" },
                { val: "96+", label: "PageSpeed Score" },
                { val: "4–6 Wo.", label: "Ø Projektlaufzeit" },
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

      {/* LEISTUNGEN */}
      <section
        className="bg-white py-24 lg:py-32"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Was wir liefern
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Alles, was eine starke Website braucht.
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              Von der ersten Idee bis zum Launch — und darüber hinaus. Wir übernehmen den kompletten Prozess.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leistungen.map((l, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="rounded-2xl border border-border p-7 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {l.icon}
                  </div>
                  <h3 className="font-bold text-dark text-lg mb-2">{l.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{l.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        className="py-24 lg:py-32"
        style={{ background: "#F8F5F1" }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Unser Prozess
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              In 5 Schritten zur fertigen Website.
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              Transparent, strukturiert und in deinem Tempo. Du weißt immer, wo wir stehen.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-[2.25rem] top-8 bottom-8 w-px bg-primary/20" />
            <div className="space-y-6">
              {prozessSteps.map((step, i) => (
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

      {/* APPS SECTION */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Live Tools
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
                Was wir konkret messen und liefern.
              </h2>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal delay={0}><WebsiteCostCalculator /></Reveal>
            <Reveal delay={100}><PageSpeedApp /></Reveal>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-6">
                Warum p1 SEOForge?
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-6">
                SEO und Design — endlich aus einer Hand.
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Die meisten Webdesign-Agenturen bauen schöne Websites, die bei Google unsichtbar bleiben. Die meisten SEO-Agenturen optimieren Seiten, die technisch veraltert sind. Wir machen beides — und setzen SEO von Anfang an als Fundament, nicht als Zusatzleistung.
              </p>
              <ul className="space-y-4">
                {[
                  "Kein Schnittstellenproblem zwischen Design und SEO",
                  "Festpreisgarantie — kein Scope Creep",
                  "Persönlicher Ansprechpartner über das gesamte Projekt",
                  "Search Console Monitoring nach jedem Launch",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-dark text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-2xl bg-dark p-8 text-white space-y-6">
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)]">Website erstellen lassen vs. Baukastensystem</h3>
                <div className="space-y-4">
                  {[
                    { label: "PageSpeed Score", us: "96+", them: "60–75" },
                    { label: "SEO von Anfang an", us: "✓ Inkl.", them: "Kostenpflichtig extra" },
                    { label: "Individ. Design", us: "✓ 100% custom", them: "Template-basiert" },
                    { label: "Core Web Vitals", us: "✓ Optimiert", them: "Oft kritisch" },
                    { label: "Support nach Launch", us: "✓ Persönlich", them: "FAQ / Ticket-System" },
                  ].map((row) => (
                    <div key={row.label} className="grid grid-cols-3 gap-2 text-sm border-b border-white/10 pb-3">
                      <span className="text-white/60">{row.label}</span>
                      <span className="text-primary font-semibold">{row.us}</span>
                      <span className="text-white/40">{row.them}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  Jetzt Projekt besprechen →
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
              Alles zur Website-Erstellung
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
      <section
        className="bg-white py-20"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Verwandte Leistungen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">
              Das könnte auch interessant sein
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Website Relaunch", href: "/webdesign/website-relaunch", desc: "Bestehende Website modernisieren — ohne Rankings zu verlieren." },
              { title: "Landing Pages", href: "/webdesign/landing-pages", desc: "Conversion-optimierte Seiten für Kampagnen und Lead-Generierung." },
              { title: "App Design", href: "/webdesign/app-design", desc: "UI/UX Design für Mobile und Web Apps." },
              { title: "SEO Optimierung", href: "/seo/optimierung", desc: "Technische SEO für maximale Sichtbarkeit in Google." },
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
              Bereit für deine neue Website?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Kostenloses Erstgespräch — wir klären in 30 Minuten, was dein Projekt braucht und was es kostet.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              Kostenloses Erstgespräch buchen →
            </Link>
          </Reveal>
        </div>
      </section>
    </SubpageLayout>
  );
}
