import type { Metadata } from "next";
import SubpageLayout from "../../components/SubpageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO Agentur Wiesbaden | SeoForge – Versicherung & IT SEO",
  description:
    "SEO Agentur Wiesbaden: Hessens Landeshauptstadt mit 85% Dienstleistungssektor. R+V Versicherung, Bundesbehörden, IT-Unternehmen. Jetzt anfragen.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Wiesbaden",
  description:
    "SEO für Versicherungen, IT-Unternehmen und Dienstleistungsunternehmen in Wiesbaden, der Landeshauptstadt von Hessen.",
  url: "https://seoforge.de/standorte/seo-agentur-wiesbaden",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Wiesbaden",
    addressCountry: "DE",
  },
  areaServed: "Wiesbaden",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Branchen dominieren den Wiesbadener SEO-Markt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wiesbaden ist stark dienstleistungsorientiert: 85% der Beschäftigten arbeiten im Servicesektor. Die größten Arbeitgeber kommen aus Versicherung (R+V Versicherung: 4.800 in Wiesbaden), Bundesbehörden (BKA, Statistisches Bundesamt) und IT (AOE, Seibert, Sophos).",
      },
    },
    {
      "@type": "Question",
      name: "Ist Wiesbaden als Landeshauptstadt für lokales SEO besonders interessant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Als Landeshauptstadt von Hessen zieht Wiesbaden viele Bundesbehörden, Landesbehörden und deren Zulieferer an. Public-Sector-nahe Unternehmen, Beratungsfirmen und IT-Dienstleister profitieren stark von lokalem SEO mit Behörden-spezifischen Keywords.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Wiesbadener IT-Startups wie AOE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wiesbaden hat ein wachsendes IT-Ökosystem mit bekannten Unternehmen wie AOE (digitale Transformation) und Seibert (Atlassian/Confluence-Partner). Wir entwickeln für IT-Dienstleister Account-Based-SEO-Strategien, die genau die richtigen Entscheidungsträger ansprechen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie weit reicht der Einzugsgebiet einer Wiesbadener SEO-Kampagne?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wiesbaden liegt im Rhein-Main-Gebiet, direkt gegenüber von Mainz und 40km von Frankfurt entfernt. Viele Wiesbadener Unternehmen bedienen Kunden aus dem gesamten Rhein-Main-Gebiet. Wir entwickeln Strategien, die sowohl lokal als auch regional wirken.",
      },
    },
  ],
};

export default function WiesbadenPage() {
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
                    Wiesbaden · Landeshauptstadt Hessen
                  </span>
                </div>
                <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl">
                  SEO Agentur{" "}
                  <span className="text-primary">Wiesbaden</span>
                </h1>
                <p className="hero-description mt-5 text-lg leading-relaxed text-muted">
                  299.932 Einwohner, 85% im Dienstleistungssektor, 151.366
                  sozialversicherungspflichtige Jobs. Wiesbaden ist Hessens
                  Verwaltungs-, Versicherungs- und IT-Hauptstadt – und ein
                  Markt, in dem professionelles SEO den Unterschied macht.
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

              {/* Wiesbaden SVG – Shield / Institution symbol */}
              <div className="flex justify-center">
                <svg
                  viewBox="0 0 240 240"
                  width="320"
                  height="320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Wiesbaden Institutionen und Verwaltung Illustration"
                >
                  <g transform="translate(120,120)">
                    <circle cx="0" cy="0" r="100" fill="#C2722A" opacity="0.04" />

                    {/* Main shield shape */}
                    <path
                      d="M 0 -80 L 55 -55 L 55 0 Q 55 55 0 80 Q -55 55 -55 0 L -55 -55 Z"
                      fill="#C2722A"
                      opacity="0.08"
                      stroke="#C2722A"
                      strokeWidth="2.5"
                    />

                    {/* Shield inner border */}
                    <path
                      d="M 0 -65 L 42 -45 L 42 2 Q 42 45 0 65 Q -42 45 -42 2 L -42 -45 Z"
                      fill="white"
                      stroke="#C2722A"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />

                    {/* Columns (classical architecture) */}
                    {[-20, 0, 20].map((x, i) => (
                      <g key={i}>
                        {/* Column shaft */}
                        <rect x={x - 4} y="-40" width="8" height="55" rx="3" fill="#C2722A" opacity="0.3" />
                        {/* Column capital */}
                        <rect x={x - 7} y="-45" width="14" height="6" rx="1" fill="#C2722A" opacity="0.5" />
                        {/* Column base */}
                        <rect x={x - 7} y="15" width="14" height="4" rx="1" fill="#C2722A" opacity="0.4" />
                      </g>
                    ))}

                    {/* Pediment (triangle top) */}
                    <polygon
                      points="0,-55 35,-35 -35,-35"
                      fill="#D4A853"
                      opacity="0.2"
                      stroke="#D4A853"
                      strokeWidth="1.5"
                    />

                    {/* Steps */}
                    <rect x="-38" y="20" width="76" height="5" rx="1" fill="#C2722A" opacity="0.2" />
                    <rect x="-33" y="25" width="66" height="5" rx="1" fill="#C2722A" opacity="0.15" />
                    <rect x="-28" y="30" width="56" height="5" rx="1" fill="#C2722A" opacity="0.1" />

                    {/* Star in pediment */}
                    <circle cx="0" cy="-43" r="5" fill="#D4A853" opacity="0.7" />

                    {/* Decorative laurels */}
                    <path d="M -50 -15 Q -65 -5 -60 10 Q -55 20 -45 15" stroke="#D4A853" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
                    <path d="M 50 -15 Q 65 -5 60 10 Q 55 20 45 15" stroke="#D4A853" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />

                    {/* Corner shield ornaments */}
                    <circle cx="-55" cy="-55" r="4" fill="#D4A853" opacity="0.4" />
                    <circle cx="55" cy="-55" r="4" fill="#D4A853" opacity="0.4" />
                    <circle cx="0" cy="-80" r="4" fill="#C2722A" opacity="0.5" />
                    <circle cx="0" cy="80" r="3" fill="#C2722A" opacity="0.3" />

                    <text x="0" y="96" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C2722A" opacity="0.5" fontFamily="sans-serif" letterSpacing="1">
                      WIESBADEN SEO
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border bg-offwhite">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "85%", label: "Jobs im Dienstleistungssektor" },
                { value: "4.800", label: "R+V-Mitarbeiter in Wiesbaden" },
                { value: "34,8%", label: "Public Sector & Bildung" },
                { value: "299.932", label: "Einwohner" },
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
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
                Wiesbaden: Die Dienstleistungsstadt an der Rheinschiene
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed">
                Wiesbaden ist durch und durch eine Dienstleistungsstadt.
                Mit 85% aller Beschäftigten im Servicesektor und einem
                Spektrum von der R+V Versicherung (4.800 Mitarbeiter, 14.000
                bundesweit) über das Bundeskriminalamt bis zu innovativen
                IT-Unternehmen wie AOE und Seibert ist Wiesbaden ein
                Markt mit klaren B2B-Segmenten.
              </p>
              <p className="mt-3 text-base text-muted leading-relaxed">
                25,5% der Beschäftigten arbeiten in Wirtschaft und
                Finanzdienstleistungen. Für diese Zielgruppen ist
                digitale Sichtbarkeit nicht optional – es ist der primäre
                Kanal, über den neue Geschäftsbeziehungen entstehen.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-dark">Wirtschaftsstruktur Wiesbadens</h3>
              {[
                { label: "Public Sector / Bildung / Gesundheit", pct: "34,8%" },
                { label: "Wirtschaft / Finanzdienstleistungen", pct: "25,5%" },
                { label: "Handel / Gastronomie / Logistik", pct: "22,3%" },
                { label: "IT & Technologie", pct: "10,4%" },
                { label: "Sonstige Dienstleistungen", pct: "7,0%" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-border bg-offwhite px-4 py-3">
                  <span className="text-sm text-muted">{item.label}</span>
                  <span className="text-sm font-semibold text-primary">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Focus */}
        <section className="bg-offwhite border-y border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark text-center mb-12">
              Branchen-SEO für Wiesbaden
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Versicherungen & Finanzdienstleistungen",
                  desc: "R+V Versicherung hat Wiesbaden als Versicherungsstadt etabliert. Für Versicherungsmakler, Finanzberater und FinTechs entwickeln wir Compliance-konforme SEO-Strategien.",
                },
                {
                  title: "IT-Beratung & Softwareentwicklung",
                  desc: "AOE, Seibert und Sophos Germany zeigen, dass Wiesbaden IT-Talent anzieht. Wir positionieren IT-Dienstleister für die Themen, die ihre Zielkunden suchen.",
                },
                {
                  title: "Public Sector & Behörden-nahe Unternehmen",
                  desc: "BKA und Statistisches Bundesamt bringen viele Zulieferer und Dienstleister nach Wiesbaden. Wir helfen diesen, die richtigen Entscheider zu erreichen.",
                },
                {
                  title: "Gesundheit & Soziales",
                  desc: "Mit 34,8% Public-Sector-Anteil ist das Gesundheitswesen ein Schwergewicht. Praxen, Kliniken und Pflegedienste gewinnen Patienten über lokales SEO.",
                },
                {
                  title: "Kongresse & Events",
                  desc: "Wiesbaden ist Kongress- und Kurstadt. Event-Veranstalter, Hotels und gastronomische Betriebe profitieren von gezieltem Tourismus-SEO.",
                },
                {
                  title: "Immobilien & Stadtentwicklung",
                  desc: "Als wohlhabende Landeshauptstadt im Rhein-Main-Gebiet ist Wiesbaden ein nachgefragter Wohnort. Makler und Projektentwickler finden hier Potenzial.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-white p-6">
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
            Warum SeoForge für Wiesbaden?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Rhein-Main-Reichweite", desc: "Wir entwickeln Strategien, die lokal (Wiesbaden) und regional (Rhein-Main-Gebiet) Wirkung zeigen." },
              { title: "B2B-Expertise", desc: "Wiesbadens Wirtschaft ist B2B-dominiert. Wir verstehen lange Kaufzyklen und Entscheidungsstrukturen." },
              { title: "Compliance-konform", desc: "Für regulierte Branchen wie Versicherungen und Finanzdienstleistungen entwickeln wir rechtssichere Inhalte." },
              { title: "Transparenz", desc: "Monatliche Reports, klare KPIs, kein Agentur-Wachstum auf Kosten Ihres Budgets." },
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
              FAQ: SEO Agentur Wiesbaden
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
              Wiesbaden gefunden werden.
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
              Lassen Sie uns gemeinsam Ihre Sichtbarkeit im Rhein-Main-Gebiet
              analysieren und eine Strategie entwickeln, die wirkt.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Kostenlose SEO-Analyse
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
