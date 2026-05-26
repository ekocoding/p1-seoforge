"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "@/app/components/SubpageLayout";
import ConversionFunnelApp from "./ConversionFunnelApp";
import ABTestApp from "./ABTestApp";

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
    q: "Was ist eine Landing Page und wozu brauche ich sie?",
    a: "Eine Landing Page ist eine einzelne, fokussierte Seite mit einem klaren Ziel — z. B. ein Formular ausfüllen, ein Produkt kaufen oder ein Gespräch buchen. Im Gegensatz zur Website mit vielen Ablenkungen führt eine Landing Page den Besucher direkt zur gewünschten Aktion. Das Ergebnis: deutlich höhere Conversion Rates.",
  },
  {
    q: "Was kostet eine professionelle Landing Page?",
    a: "Einstieg ab 1.500 € für eine standalone Landing Page mit Design, Entwicklung und Tracking-Setup. Für A/B-Testing und laufende Optimierung bieten wir auch monatliche Pakete an. Im kostenlosen Erstgespräch klären wir, welche Lösung für dein Ziel und Budget passt.",
  },
  {
    q: "Wie schnell ist eine Landing Page fertig?",
    a: "Standard Landing Pages liefern wir in 2–3 Wochen: 3 Tage Konzept & Copywriting, 1 Woche Design, 1 Woche Entwicklung & Tracking, 2 Tage Testing & Launch. Bei dringenden Kampagnen-Launches bieten wir Express-Produktion in 5–7 Werktagen an.",
  },
  {
    q: "Kann ich die Landing Page mit Google Ads oder Meta Ads nutzen?",
    a: "Ja — genau das ist der Hauptanwendungsfall. Wir richten Google Analytics, Google Ads Conversion Tracking und Meta Pixel ein, sodass du von Anfang an messbare Daten bekommst. Die Landing Page wird für den spezifischen Traffic-Kanal optimiert.",
  },
  {
    q: "Was ist A/B-Testing und lohnt sich das?",
    a: "A/B-Testing bedeutet: Wir testen zwei Varianten einer Landing Page gegeneinander, um zu sehen, welche besser konvertiert — z. B. andere Headline, anderes CTA-Design, andere Bilder. Selbst kleine Änderungen können die Conversion Rate um 20–50% steigern. Bei monatlichen Paketen führen wir das kontinuierlich durch.",
  },
  {
    q: "Bietet ihr auch Landing Pages mit SEO-Optimierung an?",
    a: "Ja. Als SEO-Agentur können wir Landing Pages entwickeln, die sowohl für bezahlten Traffic als auch für organische Suche optimiert sind — mit keyword-optimiertem Content, Schema-Markup und technischem SEO. So arbeitet deine Investition auf zwei Kanälen.",
  },
];

const vorteile = [
  { title: "Fokus statt Ablenkung", desc: "Eine Landing Page hat ein Ziel. Keine Navigation, keine Ablenkungen — nur die eine Handlung, die du vom Besucher willst." },
  { title: "Messbare Conversion Rate", desc: "Alles wird getrackt: Click-Through-Rate, Verweildauer, Scroll-Tiefe und natürlich Conversions. Du weißt immer, was dein Geld bringt." },
  { title: "Schnell live", desc: "In 2–3 Wochen von der Idee zum Launch. Ideal für zeitkritische Kampagnen, Produkt-Launches oder saisonale Angebote." },
  { title: "A/B-Testing-fähig", desc: "Landing Pages sind die ideale Basis für Conversion-Optimierung. Wir testen Headlines, CTAs und Layouts, bis die Conversion Rate stimmt." },
  { title: "Kampagnen-Synergie", desc: "Perfekt abgestimmt auf deine Google Ads, Meta Ads oder E-Mail-Kampagnen — mit passendem Tracking und konsistenter Botschaft." },
  { title: "SEO-kompatibel", desc: "Als SEO-Agentur wissen wir, wie man Landing Pages baut, die auch organisch ranken — zusätzlicher Traffic ohne Mehrkosten." },
];

const anwendungsfaelle = [
  { icon: "🎯", title: "Google Ads Kampagnen", desc: "Maximiere den ROI deiner Ads mit einer Landing Page, die genau auf dein Keyword ausgerichtet ist." },
  { icon: "📣", title: "Produkt-Launches", desc: "Baue Vorfreude auf und sammle Pre-Launch Leads mit einer Teaser-Landing Page." },
  { icon: "🤝", title: "Lead-Generierung B2B", desc: "Fülle deine Sales Pipeline mit qualifizierten Leads durch ein klar formuliertes Leistungsversprechen." },
  { icon: "🛍️", title: "E-Commerce Aktionen", desc: "Saisonale Angebote, Flash Sales und Bundle-Deals performen deutlich besser auf dedizierten Seiten." },
  { icon: "📧", title: "Newsletter & Events", desc: "Steigere deine E-Mail-Anmeldungen oder Event-Registrierungen mit fokussierten Opt-In-Seiten." },
  { icon: "💼", title: "Employer Branding", desc: "Attraktive Recruiting-Landing Pages, die Top-Kandidaten überzeugen, sich zu bewerben." },
];

export default function LandingPagesClient() {
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
          src="/images/hero-landing-pages.jpg"
          alt="Landing Page Erstellung"
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

        {/* Animated metric pill */}
        <div className="absolute bottom-16 right-12 hidden lg:block">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
            <div className="text-3xl font-bold text-primary mb-1">11.6%</div>
            <div className="text-xs text-white/50">Ø Conversion Rate</div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12 w-full">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Landing Pages · Conversion-Optimierung
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white font-[family-name:var(--font-heading)] mb-6">
              Landing Pages, die{" "}
              <span className="border-b-2 border-primary pb-1">konvertieren.</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8">
              Conversion-optimierte Landing Pages für Google Ads, Meta Ads, Lead-Generierung und Produkt-Launches. Mehr aus deinem bestehenden Traffic herausholen — mit Design und Copy, die zum Handeln motivieren.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Höhere Conversion Rate als generische Website-Seiten",
                "Vollständiges Tracking-Setup — Google Analytics, Ads & Meta Pixel",
                "Live in 2–3 Wochen — auch Express möglich",
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

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { val: "200+", label: "Landing Pages gebaut" },
                { val: "Ø 11.6%", label: "Conversion Rate" },
                { val: "2–3 Wo.", label: "Time to Launch" },
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

      {/* ANWENDUNGSFÄLLE */}
      <section
        className="bg-white py-24 lg:py-32"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Wann macht eine Landing Page Sinn?
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              6 klassische Einsatzbereiche.
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              Eine Landing Page schlägt eine generische Website-Seite in fast jedem dieser Szenarien — messbar und deutlich.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {anwendungsfaelle.map((a, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="rounded-2xl border border-border p-7 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <div className="text-3xl mb-4">{a.icon}</div>
                  <h3 className="font-bold text-dark text-lg mb-2">{a.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VORTEILE */}
      <section
        className="py-24 lg:py-32"
        style={{ background: "#F8F5F1" }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Warum Landing Pages?
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Was eine gute Landing Page leistet.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vorteile.map((v, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-border p-7 hover:shadow-md transition-all duration-300">
                  <h3 className="font-bold text-dark text-lg mb-2">{v.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPS SECTION */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Live Demos
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
                Was eine optimierte Landing Page tatsächlich bewirkt.
              </h2>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal delay={0}><ConversionFunnelApp /></Reveal>
            <Reveal delay={100}><ABTestApp /></Reveal>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Pakete & Preise
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
                Transparent. Ohne versteckte Kosten.
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={0}>
              <div className="rounded-2xl border border-border p-8 hover:shadow-lg transition-all duration-300">
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Standalone</p>
                <div className="text-4xl font-bold text-dark mb-1">ab 1.500 €</div>
                <p className="text-muted text-sm mb-6">Einmalige Erstellung</p>
                <ul className="space-y-3 text-sm text-muted">
                  {["Konzept & Copywriting", "Individuelles Design", "Entwicklung & Deployment", "Google Analytics & Tracking Setup", "12 Monate Hosting inkl."].map(i => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      {i}
                    </li>
                  ))}
                </ul>
                <Link href="/kontakt" className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all">
                  Angebot anfragen →
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl border-2 border-primary p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Empfohlen</span>
                </div>
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Managed</p>
                <div className="text-4xl font-bold text-dark mb-1">ab 390 € <span className="text-lg font-normal text-muted">/Monat</span></div>
                <p className="text-muted text-sm mb-6">Alles aus Standalone + laufende Optimierung</p>
                <ul className="space-y-3 text-sm text-muted">
                  {["Alles aus Standalone-Paket", "Monatliche A/B-Tests", "Nutzerverhalten-Analyse (Heatmaps)", "Design & UX Anpassungen", "Content & Copy Optimierung"].map(i => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      {i}
                    </li>
                  ))}
                </ul>
                <Link href="/kontakt" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                  Managed Paket anfragen →
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
              Alles zu Landing Pages
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
              Mehr aus deinem Online-Marketing herausholen
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Website erstellen lassen", href: "/webdesign/website-erstellen-lassen", desc: "Vollständige Website — professionell, schnell, SEO-ready." },
              { title: "SEO Content Strategie", href: "/seo/content-strategie", desc: "Content-Planung, die organischen Traffic aufbaut." },
              { title: "SEO Betreuung", href: "/seo/betreuung", desc: "Monatliche SEO-Optimierung für nachhaltige Rankings." },
              { title: "Website Relaunch", href: "/webdesign/website-relaunch", desc: "Bestehende Website modernisieren — SEO-sicher." },
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
              Mehr Leads aus deinem Traffic?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Lass uns in 30 Minuten klären, ob eine Landing Page dein nächster Wachstumshebel ist.
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
