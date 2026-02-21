import type { Metadata } from "next";
import SubpageLayout from "../../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur Mainz | SeoForge – Medien & Healthcare SEO",
  description:
    "SEO Agentur Mainz: 1.710 Medienfirmen, ZDF, SWR und ARTE. In der Medienhauptstadt des Südwestens zählt Content-Qualität doppelt.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Mainz",
  description:
    "SEO für Medienfirmen, Healthcare-Unternehmen und Mittelständler in Mainz, der Landeshauptstadt von Rheinland-Pfalz.",
  url: "https://seoforge.de/standorte/seo-agentur-mainz",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mainz",
    addressCountry: "DE",
  },
  areaServed: "Mainz",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Warum ist Mainz für die Medienbranche ein besonderer SEO-Markt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mainz beherbergt mit ZDF (~3.000 Mitarbeiter), SWR und ARTE einige der bedeutendsten europäischen Medieninstitutionen. In der Region sind 1.710 Medienunternehmen mit 20.000 Mitarbeitern ansässig. Diese Content-Kompetenz schafft hohe SEO-Erwartungen – und viel Wettbewerb um Aufmerksamkeit.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Mainzer Agenturen und Medienunternehmen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kreativagenturen und Medienfirmen in Mainz kämpfen um B2B-Kunden. Wir entwickeln SEO-Strategien, die ihre Portfolios und Kompetenzen sichtbar machen – von der Keyword-Recherche bis zu hochwertigem Case-Study-Content.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch Healthcare-Unternehmen in Mainz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Mit über 15.000 Gesundheitsarbeitsplätzen und der Universitätsmedizin Mainz (8.000 Mitarbeiter) als führendem Arbeitgeber ist Healthcare ein Schlüsselsektor. Wir entwickeln YMYL-konforme SEO-Strategien für Kliniken, Praxen und Medizintechnikunternehmen.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Branchen sind neben Medien und Healthcare in Mainz relevant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mainz hat eine bemerkenswerte Branchen-Diversität: Schott AG (Glastechnologie, Weltmarktführer), Finanzdienstleistungen, Tourismus und die Weinwirtschaft (Rheinhessen ist Deutschlands größtes Weinanbaugebiet). All diese Branchen profitieren von gezieltem SEO.",
      },
    },
  ],
};

export default function MainzPage() {
  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-offwhite border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                    Mainz · Landeshauptstadt Rheinland-Pfalz
                  </span>
                </div>
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl">
                  SEO Agentur{" "}
                  <span className="text-primary">Mainz</span>
                </h1>
                <p className="hero-description mt-5 text-lg leading-relaxed text-muted">
                  In einer Stadt, die ZDF, SWR und ARTE beheimatet, ist
                  Content-Qualität keine Kür, sondern Standard. 1.710
                  Medienfirmen, 20.000 Medienjobs und ein GDP von €24,6 Mrd.
                  machen Mainz zu einem anspruchsvollen, aber ertragreichen
                  SEO-Markt.
                </p>
                <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    Kostenlose Analyse anfragen
                  </Link>
                  <Link
                    href="/seo-agentur"
                    className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-dark transition-colors hover:bg-offwhite"
                  >
                    Unsere Leistungen
                  </Link>
                </div>
              </div>

              {/* Mainz SVG – Broadcast antenna / transmission waves */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 240 240"
                  width="320"
                  height="320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Mainz Medienstadt Rundfunk Illustration"
                >
                  <g transform="translate(120,120)">
                    <circle cx="0" cy="0" r="100" fill="#C2722A" opacity="0.04" />

                    {/* Antenna tower */}
                    <line x1="0" y1="-85" x2="0" y2="60" stroke="#C2722A" strokeWidth="3" strokeLinecap="round" />

                    {/* Antenna top */}
                    <line x1="-4" y1="-85" x2="4" y2="-85" stroke="#C2722A" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="0" cy="-90" r="4" fill="#D4A853" />

                    {/* Tower cross-beams */}
                    {[-40, -10, 20].map((y, i) => (
                      <g key={i}>
                        <line x1={-(20 - i * 3)} y1={y} x2={(20 - i * 3)} y2={y} stroke="#C2722A" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                        <line x1={-(20 - i * 3)} y1={y} x2="0" y2={y + 30} stroke="#C2722A" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                        <line x1={(20 - i * 3)} y1={y} x2="0" y2={y + 30} stroke="#C2722A" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                      </g>
                    ))}

                    {/* Tower base */}
                    <polygon points="-25,60 25,60 15,45 -15,45" fill="#C2722A" opacity="0.2" />
                    <rect x="-10" y="58" width="20" height="8" rx="2" fill="#C2722A" opacity="0.4" />

                    {/* Broadcast waves - left side */}
                    <path d="M -20 -70 Q -45 -50 -45 -30" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
                    <path d="M -30 -75 Q -65 -50 -65 -25" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
                    <path d="M -38 -78 Q -85 -50 -85 -20" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />

                    {/* Broadcast waves - right side */}
                    <path d="M 20 -70 Q 45 -50 45 -30" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
                    <path d="M 30 -75 Q 65 -50 65 -25" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
                    <path d="M 38 -78 Q 85 -50 85 -20" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />

                    {/* Signal dots at wave ends */}
                    <circle cx="-45" cy="-30" r="3" fill="#D4A853" opacity="0.7" />
                    <circle cx="45" cy="-30" r="3" fill="#D4A853" opacity="0.7" />
                    <circle cx="-65" cy="-25" r="2.5" fill="#C2722A" opacity="0.5" />
                    <circle cx="65" cy="-25" r="2.5" fill="#C2722A" opacity="0.5" />

                    {/* Ground decoration */}
                    <ellipse cx="0" cy="70" rx="40" ry="5" fill="#C2722A" opacity="0.08" />

                    {/* ZDF-Mainz label hint */}
                    <text x="0" y="88" textAnchor="middle" fontSize="8" fontWeight="700" fill="#C2722A" opacity="0.5" fontFamily="sans-serif" letterSpacing="1">
                      MAINZ · MEDIENSTADT
                    </text>

                    {/* Outer decorative ring */}
                    <circle cx="0" cy="0" r="95" stroke="#C2722A" strokeWidth="0.8" strokeDasharray="3 7" fill="none" opacity="0.2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-b border-border bg-offwhite">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "1.710", label: "Medienfirmen in der Region" },
                { value: "20.000", label: "Medienjobs" },
                { value: "15.000+", label: "Gesundheitsarbeitsplätze" },
                { value: "€24,6 Mrd.", label: "BIP Mainz" },
              ].map((stat) => (
                <div key={stat.label} className="text-center py-4">
                  <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              Mainz: Medienstandort mit Substanz
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed">
              Wenn eine Stadt ZDF, SWR und ARTE beherbergt, ist der
              Anspruch an professionellen Content hoch. Genau das macht
              Mainz zu einem SEO-Markt, in dem Mittelmaß schnell auffällt.
              Wer hier erfolgreich ranken will, braucht echte Qualität –
              nicht generisches Content-Marketing.
            </p>
            <p className="mt-3 text-base text-muted leading-relaxed">
              Gleichzeitig bietet Mainz enorme Chancen: Schott AG
              (Glastechnologie, Weltmarktführer), der Gesundheitssektor mit
              8.000 Mitarbeitern allein in der Universitätsmedizin und
              Rheinhessens Weinwirtschaft schaffen eine Vielfalt an
              SEO-Themen, die wenige andere Städte bieten.
            </p>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-12">
              Branchen-SEO für Mainz
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Medien & Kommunikation",
                  desc: "Kreativagenturen, Produktionsfirmen und Medienhäuser positionieren wir so, dass B2B-Kunden sie vor den Großen der Branche finden.",
                  featured: true,
                },
                {
                  title: "Healthcare & Universitätsmedizin",
                  desc: "YMYL-konformer Content für Kliniken, Praxen und Medizintechnik. Wir bauen Vertrauen und Autorität auf – Google's wichtigste Metriken für Gesundheitsthemen.",
                  featured: false,
                },
                {
                  title: "Technologieglas & Industriegüter",
                  desc: "Schott AG setzt Maßstäbe in Glastechnologie. Als Zulieferer oder Konkurrent brauchen Sie B2B-SEO, das Einkäufer und Ingenieure erreicht.",
                  featured: false,
                },
                {
                  title: "Weinwirtschaft & Genuss",
                  desc: "Rheinhessen ist Deutschlands größtes Weinanbaugebiet. Winzer, Weingüter und Weinhandel finden mit lokalem SEO und E-Commerce-Optimierung neue Kunden.",
                  featured: false,
                },
                {
                  title: "Tourismus & Gastronomie",
                  desc: "Mainz am Rhein lockt Touristen aus aller Welt. Hotels, Restaurants und Eventlocations profitieren von starkem lokalem SEO und Google Maps-Optimierung.",
                  featured: false,
                },
                {
                  title: "Finanzdienstleistungen",
                  desc: "Als Landeshauptstadt von Rheinland-Pfalz beherbergt Mainz zahlreiche Versicherungen, Banken und Finanzberater. Wir positionieren sie für ihre Kernzielgruppen.",
                  featured: false,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-xl border p-6 ${
                    item.featured
                      ? "border-primary/30 bg-primary/5"
                      : "border-border bg-white"
                  }`}
                >
                  <h3 className="font-semibold text-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why SeoForge */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-10">
            Warum SeoForge für Mainz?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Content auf Medienstandard", desc: "Mainzer Unternehmen sind Content-verwöhnt. Wir produzieren SEO-Texte, die diesen hohen Erwartungen gerecht werden." },
              { title: "YMYL-Expertise", desc: "Healthcare und Finanz-Content müssen höchste Qualitätsstandards erfüllen. Wir kennen die Google-Anforderungen genau." },
              { title: "Lokale Stärke", desc: "Von der Mainzer Altstadt bis Rheinhessen: Wir optimieren für hyper-lokale Suchanfragen, die wirklich konvertieren." },
              { title: "Branchenmix", desc: "Kein Mainzer Unternehmen gleicht dem anderen. Wir entwickeln individuelle Strategien statt Einheitslösungen." },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-offwhite p-6">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <h3 className="font-semibold text-dark mb-2">{b.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-offwhite border-t border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-10">
              FAQ: SEO Agentur Mainz
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-white p-6">
                  <h3 className="font-semibold text-dark mb-2">{faq.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-3xl bg-dark px-8 py-14 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white">
              Content-Qualität aus der Medienstadt.
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Kostenlose SEO-Analyse für Ihr Mainzer Unternehmen –
              wir zeigen Ihnen das Potenzial.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Jetzt anfragen
              </Link>
              <Link
                href="/standorte"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Alle Standorte
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
