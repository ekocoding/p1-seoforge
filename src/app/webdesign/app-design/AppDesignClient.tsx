"use client";

import { useState } from "react";
import Link from "next/link";
import HeroShaderWhite from "@/app/components/HeroShaderWhite";
import SubpageLayout from "@/app/components/SubpageLayout";
import RetentionDataApp from "./RetentionDataApp";
import DesignSystemApp from "./DesignSystemApp";

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
    q: "Was ist App Design und was ist App Development?",
    a: "App Design umfasst die Gestaltung der Nutzeroberfläche (UI) und das Nutzererlebnis (UX) — also wie die App aussieht und wie sie sich anfühlt. App Development ist die technische Umsetzung im Code. Wir übernehmen den Design-Part vollständig und arbeiten direkt mit deinen Entwicklern zusammen — oder empfehlen dir passende Entwicklungspartner.",
  },
  {
    q: "Für welche Plattformen designt ihr?",
    a: "Wir designen für iOS (iPhone/iPad), Android und Web Apps (progressive Web Apps / Browser-basiert). Die Designs werden plattformgerecht nach Apple Human Interface Guidelines und Material Design 3 erstellt — plus ein übergreifendes Design System für konsistente Nutzererfahrung.",
  },
  {
    q: "Was kostet App Design?",
    a: "Ein professionelles App-Design (MVP mit 10–15 Screens) startet ab 4.500 €. Größere Apps mit komplexen User Journeys, mehreren Rollen oder umfangreichem Design System liegen im Bereich 10.000–25.000 €. Im kostenlosen Erstgespräch schätzen wir deinen konkreten Umfang.",
  },
  {
    q: "Warum scheitern so viele Apps?",
    a: "99,5% der Consumer Apps erreichen ihre Ziele nicht — und 77% aller Daily Active Users verlassen eine App in den ersten 72 Stunden. Der häufigste Grund: schlechtes UX, kein klarer Onboarding-Pfad, fehlende Nutzerforschung. Wir beginnen jeden App-Design-Auftrag mit Nutzeranalyse und Persona-Entwicklung — bevor wir einen Pixel setzen.",
  },
  {
    q: "Was bekomme ich am Ende als Deliverable?",
    a: "Du erhältst: vollständige Design-Dateien mit allen Screens und Varianten, ein klickbares Prototyp, ein dokumentiertes Design System (Farben, Typografie, Komponenten), und Export-Assets im benötigten Format für deine Entwickler. Alles übergeben in einem Handoff-Meeting.",
  },
  {
    q: "Macht ihr auch User Research und Usability Testing?",
    a: "Ja. Wir führen strukturierte Nutzerinterviews, Competitor Analysis und Usability Tests mit echten Nutzern durch — sowohl vor dem Design (Discovery Phase) als auch nach dem ersten Prototyp. Dieser iterative Ansatz spart Entwicklungskosten, weil Fehler im Design erkannt werden, bevor sie gebaut werden.",
  },
];

const leistungen = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
      </svg>
    ),
    title: "UX Research & Discovery",
    desc: "Nutzerinterviews, Persona-Entwicklung, Competitor Analysis und Definition der User Journeys — als Fundament für ein Design, das wirklich funktioniert.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: "Wireframing & Konzept",
    desc: "Strukturierte Wireframes definieren Informationsarchitektur und User Flow — bevor aufwendiges Visual Design beginnt. Das spart Zeit und Kosten.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/>
      </svg>
    ),
    title: "UI Design (iOS & Android)",
    desc: "Pixel-perfekte Screens nach Apple HIG und Material Design 3 — mit konsistentem Design System für Farben, Typografie und Komponenten.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M5 3l14 9-14 9V3z"/>
      </svg>
    ),
    title: "Klickbarer Prototyp",
    desc: "Interaktiver klickbarer Prototyp — zum Testen mit echten Nutzern, für Investor-Demos oder als Referenz für dein Entwicklungsteam.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Usability Testing",
    desc: "Tests mit echten Nutzern zeigen, wo Reibung entsteht — bevor dein Entwicklungsteam auch nur eine Zeile Code schreibt.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: "Developer Handoff",
    desc: "Vollständige Design-Übergabe mit Design System, exportierten Assets und einem persönlichen Handoff-Meeting für dein Entwicklungsteam.",
  },
];

const prozessSteps = [
  { nr: "01", title: "Discovery & Research", desc: "Nutzerinterviews, Marktanalyse, Personas und User Journey Mapping — wir verstehen deine Zielgruppe, bevor wir ein Pixel setzen." },
  { nr: "02", title: "Wireframing & Konzept", desc: "Grobe Struktur, User Flow und Informationsarchitektur — schnell iterierbar, bevor das Visual Design beginnt." },
  { nr: "03", title: "Visual Design & Design System", desc: "Pixel-perfektes UI nach deiner Brand Identity — inklusive vollständigem Komponenten-System für konsistente Entwicklung." },
  { nr: "04", title: "Prototyp & Usability Test", desc: "Klickbarer klickbarer Prototyp, Test mit echten Nutzern, iterative Verbesserung auf Basis von Feedback." },
  { nr: "05", title: "Developer Handoff", desc: "Vollständige Design-Übergabe, Export-Assets, Annotationen und persönliches Handoff-Meeting mit deinem Entwicklungsteam." },
];

const branchen = [
  { icon: "💳", name: "Fintech & Banking" },
  { icon: "🏥", name: "Health & Medtech" },
  { icon: "🛒", name: "E-Commerce" },
  { icon: "📚", name: "EdTech & Learning" },
  { icon: "🏢", name: "B2B SaaS" },
  { icon: "🚗", name: "Mobility & Transport" },
];

export default function AppDesignClient() {
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

      {/* HERO — weißer Shader, voll-flächig, KEIN dunkler Dimmer */}
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
            style={{ fontSize: "clamp(130px, 26vw, 420px)" }}
          >
            APP
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-8 pt-24 pb-24 text-center">

          <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/55 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            App Design · iOS, Android & Web Apps
          </div>

          {/* H1 — zwei Zeilen */}
          <h1
            className="hero-title font-[family-name:var(--font-heading)] font-bold text-dark leading-[1.08] mb-7"
            style={{ fontSize: "clamp(38px, 5.2vw, 72px)", letterSpacing: "-0.025em" }}
          >
            App Design, das begeistert —
            <br />
            <span
              style={{
                background: "linear-gradient(95deg, #C2722A 12%, #D4A853 88%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              von der Skizze zum Prototyp.
            </span>
          </h1>

          <div className="hero-description mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-primary/40" />
            <span className="text-[10px] font-bold tracking-[0.26em] uppercase text-dark/30">
              UX Research · Prototyping · Design Systems
            </span>
            <div className="h-px w-10 bg-primary/40" />
          </div>

          <p className="hero-description text-muted leading-[1.85] mb-11 max-w-3xl mx-auto" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            Die meisten Apps scheitern nicht an der Technik — sondern an schlechter
            UX und fehlender Nutzerforschung. Wir designen nutzerorientiert und
            iterativ: UX-Research vor dem ersten Pixel, klickbare Prototypen
            für Tests, Demos und Investoren-Pitches, dazu ein vollständiges Design
            System für die konsistente Entwicklung. Mit echten Usability-Tests statt
            Annahmen — damit deine App nicht nur gut aussieht, sondern im Alltag
            besteht und Nutzer langfristig hält.
          </p>

          <div className="hero-cta flex flex-wrap justify-center gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
            >
              Kostenloses Design-Gespräch
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/webdesign"
              className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-white/55 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-dark/65 transition-all hover:border-dark/30 hover:bg-white/80 hover:text-dark"
            >
              Alle Webdesign-Leistungen
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] text-dark/50 font-mono tracking-[0.28em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-dark/30 to-transparent" />
        </div>
      </section>

      {/* PROBLEM / STATS */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-6">
                Warum die meisten Apps scheitern
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-6">
                Design ist nicht Dekoration — es ist Retention.
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                77% aller App-Nutzer verlassen eine App in den ersten 72 Stunden — oft für immer. Der Hauptgrund: kein klarer Onboarding-Pfad, verwirrende Navigation, zu viel Reibung beim ersten Nutzen. Gutes UX-Design löst genau dieses Problem — und zwar bevor das Entwicklungsteam auch nur eine Zeile Code schreibt.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "99,5%", label: "aller Apps erreichen ihre Ziele nicht" },
                  { val: "77%", label: "der DAU verlassen die App in 72h" },
                  { val: "1,6 Mio.", label: "Apps im Google Play Store" },
                  { val: "1,9 Mio.", label: "Apps im Apple App Store" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border p-5">
                    <div className="text-2xl font-bold text-primary mb-1">{s.val}</div>
                    <div className="text-xs text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl bg-dark p-8 text-white">
                <h3 className="text-lg font-bold mb-6 font-[family-name:var(--font-heading)]">Was trennt erfolgreiche Apps vom Durchschnitt?</h3>
                <div className="space-y-4">
                  {[
                    { label: "Nutzerforschung vor Design", good: "✓ Research first", bad: "Design first" },
                    { label: "Onboarding Flow", good: "✓ Schrittweise, klar", bad: "Überladener Start" },
                    { label: "Design System", good: "✓ Konsistent", bad: "Inkonsistent" },
                    { label: "Usability Tests", good: "✓ Vor dem Build", bad: "Nach dem Launch" },
                    { label: "Prototyp-Feedback", good: "✓ Mehrere Runden", bad: "Einmalig" },
                  ].map((row) => (
                    <div key={row.label} className="grid grid-cols-3 gap-2 text-sm border-b border-white/10 pb-3">
                      <span className="text-white/60">{row.label}</span>
                      <span className="text-primary font-semibold">{row.good}</span>
                      <span className="text-white/40">{row.bad}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* APPS SECTION */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Daten & Design
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
                Was gutes App Design messbar verändert.
              </h2>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal delay={0}><RetentionDataApp /></Reveal>
            <Reveal delay={100}><DesignSystemApp /></Reveal>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section
        className="py-24 lg:py-32"
        style={{ background: "#F8F5F1" }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Unser Leistungsumfang
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              Von Research bis Handoff.
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              Wir übernehmen den gesamten Design-Prozess — dein Entwicklungsteam bekommt von uns ein vollständig fertiggestelltes Design, das direkt umgesetzt werden kann.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leistungen.map((l, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-border p-7 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
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

      {/* BRANCHEN */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Branchen
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark">
                Für welche Branchen wir App-Designs erstellen.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {branchen.map((b, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="rounded-2xl border border-border p-5 text-center hover:border-primary/30 hover:shadow-sm transition-all">
                  <div className="text-3xl mb-2">{b.icon}</div>
                  <div className="text-sm font-medium text-dark">{b.name}</div>
                </div>
              </Reveal>
            ))}
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
              Unser Design-Prozess
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
              In 5 Phasen zum fertigen App Design.
            </h2>
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

      {/* FAQ */}
      <section
        className="bg-white py-24 lg:py-32"
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="reveal mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Häufige Fragen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              Alles zum App Design
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="rounded-2xl border border-border overflow-hidden">
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
        className="py-20"
        style={{ background: "#F8F5F1" }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Verwandte Leistungen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">
              Design ist nur der Anfang
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Website erstellen lassen", href: "/webdesign/website-erstellen-lassen", desc: "Professionelle Unternehmenswebsite — SEO-first und conversion-optimiert." },
              { title: "Landing Pages", href: "/webdesign/landingpage-erstellen-lassen", desc: "Fokussierte Seiten für Kampagnen und Lead-Generierung." },
              { title: "Website Relaunch", href: "/webdesign/website-relaunch-agentur", desc: "Bestehende Website modernisieren — ohne Rankings zu verlieren." },
              { title: "SEO Optimierung", href: "/seo/optimierung", desc: "Technisches SEO für maximale Sichtbarkeit in Google." },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
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
              Deine App verdient besseres Design.
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Kostenloses Erstgespräch — wir schauen uns dein Projekt an und geben dir eine ehrliche Einschätzung, wie viel besseres UX-Design bewegen kann.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              Kostenloses Design-Gespräch buchen →
            </Link>
          </Reveal>
        </div>
      </section>
    </SubpageLayout>
  );
}
