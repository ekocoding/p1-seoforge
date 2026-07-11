import type { Metadata } from "next";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Arbeitsproben & Referenzen",
  description: "Öffentlich prüfbare Arbeitsproben von SeoForge: Kontext, Aufgabe und umgesetzte Systeme – ohne anonyme Erfolgszahlen oder erfundene Cases.",
  alternates: { canonical: "https://seoforge.de/referenzen" },
};

const WORK = [
  {
    number: "01",
    name: "Beamten-Beratung24",
    url: "https://beamten-beratung24.de",
    type: "Kundenprojekt · Versicherungen",
    brief: "Informationsarchitektur und organischer Ausbau für ein erklärungsbedürftiges YMYL-Angebot.",
    work: ["Next.js-Umsetzung", "Leistungs- und Themencluster", "interne Silo-Verlinkung", "technische SEO-Basis"],
    note: "Öffentlich prüfbar: Seitenstruktur, Inhalte und technische Auslieferung. Ranking- oder Umsatzzahlen veröffentlichen wir ohne freigegebene Daten nicht.",
  },
  {
    number: "02",
    name: "SEO Mannheim",
    url: "https://seomannheim.com",
    type: "Agenturprojekt · Local SEO",
    brief: "Lokale Leistungsarchitektur, Wissensbereich und schnelle technische Plattform für eine regionale SEO-Präsenz.",
    work: ["Next.js & Tailwind", "lokale Themenarchitektur", "Wissens- und Guide-Struktur", "Deployment & Betrieb"],
    note: "Öffentlich prüfbar: Informationsarchitektur, Seitentemplates, Inhalte und lokale Ausrichtung.",
  },
  {
    number: "03",
    name: "SeoForge",
    url: "https://seoforge.de",
    type: "Eigenes System · SEO, GEO & Webdesign",
    brief: "Das eigene Projekt dient als offenes Arbeitslabor für technische SEO, Content-Cluster, KI-Sichtbarkeit und Conversion-orientiertes Webdesign.",
    work: ["SEO-/GEO-Silos", "interaktive Money-Pages", "Content-System", "CI/CD auf eigenem VPS"],
    note: "Kein Kunden-Case. Gerade deshalb können Architektur, Experimente und Arbeitsweise vollständig gezeigt werden.",
  },
];

export default function ReferenzenPage() {
  return (
    <SubpageLayout>
      <main className="bg-[#F5F0E9]">
        <section className="border-b-2 border-dark py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between border-b-2 border-dark pb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Arbeitsproben · offen einsehbar</span>
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-dark/35 sm:block">Kontext statt Fantasie-KPI</span>
            </div>
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
              <h1 className="font-[family-name:var(--font-heading)] text-5xl font-bold leading-[1.02] text-dark sm:text-6xl lg:text-[74px]">
                Arbeit, die Sie
                <span className="block text-primary">selbst prüfen können.</span>
              </h1>
              <div>
                <p className="text-lg leading-relaxed text-muted">
                  Keine anonymen TechVision-GmbHs. Keine Prozentzahl ohne Datenquelle. Hier stehen nur Projekte, die öffentlich erreichbar sind – mit der Aufgabe, die wir tatsächlich zeigen dürfen.
                </p>
                <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.15em] leading-relaxed text-dark/40">
                  Vertrauliche Kunden- und Umsatzdaten bleiben vertraulich. Eine gute Referenz muss nicht mehr behaupten, als sie belegen kann.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="border-2 border-dark bg-white">
              <div className="flex items-center justify-between border-b-2 border-dark bg-dark px-6 py-4 text-white lg:px-8">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Öffentliches Projektregister</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary">3 Einträge</span>
              </div>

              {WORK.map((item) => (
                <article key={item.name} className="grid gap-7 border-b-2 border-dark p-6 last:border-b-0 lg:grid-cols-[90px_1fr_1.1fr] lg:p-8">
                  <span className="font-[family-name:var(--font-heading)] text-5xl font-black leading-none text-primary/20">{item.number}</span>
                  <div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-primary">{item.type}</span>
                    <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">{item.name}</h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.brief}</p>
                    <a href={item.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark">
                      Live-Projekt öffnen <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  <div className="bg-[#F8F5F1] p-5 ring-1 ring-border lg:p-6">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-dark/40">Sichtbarer Arbeitsumfang</span>
                    <div className="mt-4 divide-y divide-border border-y border-border">
                      {item.work.map((entry, index) => (
                        <div key={entry} className="flex items-center gap-4 py-3">
                          <span className="font-mono text-[9px] font-bold text-primary">0{index + 1}</span>
                          <span className="text-sm font-semibold text-dark/75">{entry}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-[12px] leading-relaxed text-muted">{item.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-dark py-16 text-white lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-6 sm:flex-row sm:items-center lg:px-8">
            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Ihr Projekt muss kein Versprechen bleiben</span>
              <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">Zeigen Sie uns die echte Ausgangslage.</h2>
              <p className="mt-2 text-sm text-white/60">Wir nennen eine begründete erste Priorität – ohne Ergebniszahlen zu erfinden.</p>
            </div>
            <Link href="/kontakt" className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-dark">Kostenlose Erstanalyse</Link>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
