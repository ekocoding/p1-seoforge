"use client";

import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";

export default function WebsiteErstellenLassenPage() {
  return (
    <SubpageLayout>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ background: "#1A1A1A" }}
      >
        {/* Radial gradient orb */}
        <div
          className="absolute top-0 right-0 h-[600px] w-[600px] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(194,114,42,0.15) 0%, rgba(212,168,83,0.06) 40%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 py-24 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Demnächst verfügbar
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white font-[family-name:var(--font-heading)] mb-6">
            Website erstellen lassen
          </h1>

          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Wir erstellen individuelle Websites, die nicht nur gut aussehen,
            sondern auch performen. Von der Planung bis zum Launch — alles aus
            einer Hand. Diese Seite wird in Kürze vollständig verfügbar sein.
          </p>

          {/* Feature teasers */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            {[
              { icon: "⚡", label: "Blitzschnell" },
              { icon: "🎯", label: "SEO-First" },
              { icon: "📱", label: "Mobile-Ready" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4 border text-center"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-white/70 text-sm font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl"
            >
              Jetzt anfragen →
            </Link>
            <Link
              href="/webdesign"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              Webdesign-Leistungen ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Brief info section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
            Was dich erwartet
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark mb-6">
            Professionelle Website-Erstellung
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-12">
            Ob Business-Website, Corporate Website oder Landing Page — wir
            entwickeln maßgeschneiderte Web-Auftritte, die Besucher in Kunden
            verwandeln.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              {
                title: "Maßgeschneidertes Design",
                desc: "Kein Template, kein Einheitsbrei. Jede Website wird individuell nach deinen Zielen und deiner Marke gestaltet.",
              },
              {
                title: "Technisch perfekt",
                desc: "Next.js oder WordPress — immer mit maximalem PageSpeed, sauberem Code und WCAG-Zugänglichkeit.",
              },
              {
                title: "SEO von Anfang an",
                desc: "Keyword-Architektur, strukturierte Daten und Core Web Vitals werden nicht nachgerüstet, sondern eingebaut.",
              },
              {
                title: "Transparenter Prozess",
                desc: "Feste Meilensteine, regelmäßige Updates, keine versteckten Kosten. Du weißt immer, wo wir stehen.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-offwhite p-6"
              >
                <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/webdesign"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Alle Webdesign-Leistungen ansehen →
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
