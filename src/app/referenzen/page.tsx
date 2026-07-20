import type { Metadata } from "next";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Arbeitsproben & Referenzen",
  description: "Öffentlich prüfbare Arbeitsproben von SeoForge: Kontext, Aufgabe und umgesetzte Systeme – ohne anonyme Erfolgszahlen oder erfundene Cases.",
  alternates: { canonical: "https://seoforge.de/referenzen" },
};

type WorkItem = {
  id: string;
  number: string;
  name: string;
  url: string;
  type: string;
  brief: string;
  work: string[];
  note: string;
  service?: {
    href: string;
    label: string;
  };
  proof?: {
    title: string;
    source: string;
    values: Array<{
      value: string;
      label: string;
    }>;
    note: string;
  };
  semrush?: {
    traffic: string;
    keywords: string;
  };
};

const WORK: WorkItem[] = [
  {
    id: "beamtenberatung24",
    number: "01",
    name: "Beamten-Beratung24",
    url: "https://beamten-beratung24.de",
    type: "Kundenprojekt · Versicherungen",
    brief: "Informationsarchitektur und organischer Ausbau für ein erklärungsbedürftiges YMYL-Angebot.",
    work: ["Next.js-Umsetzung", "Leistungs- und Themencluster", "interne Silo-Verlinkung", "technische SEO-Basis"],
    note: "Öffentlich prüfbar: Seitenstruktur, Inhalte und technische Auslieferung. Ranking- oder Umsatzzahlen veröffentlichen wir ohne freigegebene Daten nicht.",
    service: { href: "/seo/betreuung", label: "Laufende SEO Betreuung verstehen" },
  },
  {
    id: "seo-mannheim",
    number: "02",
    name: "SEO Mannheim",
    url: "https://seomannheim.com",
    type: "Agenturprojekt · Local SEO",
    brief: "Lokale Leistungsarchitektur, Wissensbereich und schnelle technische Plattform für eine regionale SEO-Präsenz.",
    work: ["Next.js & Tailwind", "lokale Themenarchitektur", "Wissens- und Guide-Struktur", "Deployment & Betrieb"],
    note: "Öffentlich prüfbar: Informationsarchitektur, Seitentemplates, Inhalte und lokale Ausrichtung.",
    service: { href: "/seo-agentur", label: "SEO-Agentur-Leistung ansehen" },
  },
  {
    id: "seoforge",
    number: "03",
    name: "SeoForge",
    url: "https://seoforge.de",
    type: "Eigenes System · SEO, GEO & Webdesign",
    brief: "Das eigene Projekt dient als offenes Arbeitslabor für technische SEO, Content-Cluster, KI-Sichtbarkeit und Conversion-orientiertes Webdesign.",
    work: ["SEO-/GEO-Silos", "interaktive Money-Pages", "Content-System", "CI/CD auf eigenem VPS"],
    note: "Kein Kunden-Case. Gerade deshalb können Architektur, Experimente und Arbeitsweise vollständig gezeigt werden.",
  },
  {
    id: "187vapes",
    number: "04",
    name: "187Vapes",
    url: "https://187vapes.com",
    type: "Kundenprojekt · E-Commerce SEO",
    brief: "Organischer Ausbau eines Vape-Shops entlang von Marken, Produktsystemen und transaktionalen Kategorieintents.",
    work: ["Shop- und Kategoriearchitektur", "Marken- und Produktcluster", "redaktionelle Kategorieinhalte", "technische On-Page-Basis"],
    note: "Wir betreuen 187Vapes seit Projektbeginn. Die Position beschreibt einen aktuellen deutschsprachigen SERP-Snapshot und keine Rankinggarantie.",
    proof: {
      title: "Sichtbarer E-Commerce-Case",
      source: "Google DE · Snapshot 20.07.2026",
      values: [
        { value: "#1", label: "für „187 vape“" },
        { value: "seit Start", label: "durch SeoForge betreut" },
      ],
      note: "Leistungsumfang: Shop- und Kategoriearchitektur, Marken- und Produktcluster sowie technische und redaktionelle On-Page-Arbeit.",
    },
    service: { href: "/seo-agentur#praxisbeleg-187vapes", label: "E-Commerce SEO mit SeoForge" },
  },
  {
    id: "elfbarde",
    number: "05",
    name: "Elfbarde",
    url: "https://elfbarde.com",
    type: "Kundenprojekt · E-Commerce SEO",
    brief: "Shop- und Content-Struktur für ein fokussiertes E-Commerce-Angebot rund um Elfbar-Systeme, Pods und Liquids.",
    work: ["transaktionale Seitenarchitektur", "Produkt- und Systemcluster", "SEO-Kategorietexte", "interne Suchpfade"],
    note: "Die Entwicklung ist als Semrush-Schätzung für Deutschland ausgewiesen – keine Analytics-, Umsatz- oder isolierte Kausalitätsaussage.",
    proof: {
      title: "Entwicklung in der laufenden Betreuung",
      source: "Semrush DE · 15.03.2025 → 20.07.2026",
      values: [
        { value: "≈ 2.016 → ≈ 7.300", label: "geschätzter organischer Traffic / Monat" },
        { value: "+262 %", label: "Veränderung der Traffic-Schätzung" },
      ],
      note: "Die Vergleichswerte zeigen die modellierte organische Sichtbarkeit der Domain. Sie ersetzen keine First-Party-Analytics und werden deshalb bewusst als Schätzung eingeordnet.",
    },
    service: { href: "/seo/betreuung#praxisbeleg-elfbarde", label: "Laufende SEO Betreuung im Detail" },
  },
  {
    id: "vapeoase",
    number: "06",
    name: "VapeOase",
    url: "https://vapeoase.de",
    type: "Kundenprojekt · E-Commerce SEO",
    brief: "Breite Shop-Architektur für E-Zigaretten, Liquids und Tabakwaren mit SEO-fähigen Kategorie- und Produktpfaden.",
    work: ["Sortimentsarchitektur", "Kategorie- und Produktpfade", "On-Page-Optimierung", "technische SEO-Grundlage"],
    note: "Semrush-Schätzung für Deutschland vom 13.07.2026. Keine Analytics-Daten und keine isolierte Kausalitätsaussage.",
    semrush: { traffic: "≈ 179", keywords: "923" },
    service: { href: "/seo-agentur", label: "SEO-Agentur-Leistung ansehen" },
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
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary">{WORK.length} Einträge</span>
              </div>

              {WORK.map((item) => (
                <article id={item.id} key={item.name} className="scroll-mt-32 grid gap-7 border-b-2 border-dark p-6 last:border-b-0 lg:grid-cols-[90px_1fr_1.1fr] lg:p-8">
                  <span className="font-[family-name:var(--font-heading)] text-5xl font-black leading-none text-primary/20">{item.number}</span>
                  <div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-primary">{item.type}</span>
                    <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">{item.name}</h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.brief}</p>
                    <a href={item.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark">
                      Live-Projekt öffnen
                    </a>
                  </div>
                  <div className="bg-[#F8F5F1] p-5 ring-1 ring-border lg:p-6">
                    {item.proof && (
                      <div className="mb-5 border-b border-border pb-5">
                        <div className="flex items-start justify-between gap-4">
                          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-primary">{item.proof.title}</span>
                          <span className="max-w-36 text-right font-mono text-[8px] uppercase tracking-[0.13em] text-dark/35">{item.proof.source}</span>
                        </div>
                        <div className="mt-4 grid gap-px bg-border sm:grid-cols-2">
                          {item.proof.values.map((proof) => (
                            <div key={proof.label} className="bg-white p-4">
                              <strong className="block font-[family-name:var(--font-heading)] text-2xl leading-tight text-dark">{proof.value}</strong>
                              <span className="mt-1 block text-[11px] leading-snug text-muted">{proof.label}</span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-4 text-[12px] leading-relaxed text-muted">{item.proof.note}</p>
                      </div>
                    )}
                    {item.semrush && (
                      <div className="mb-5 border-b border-border pb-5">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-primary">Semrush · DE</span>
                          <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-dark/35">Stand 13.07.2026</span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-px bg-border">
                          <div className="bg-white p-4">
                            <strong className="block font-[family-name:var(--font-heading)] text-2xl text-dark">{item.semrush.traffic}</strong>
                            <span className="mt-1 block text-[11px] leading-snug text-muted">geschätzter organischer Traffic / Monat</span>
                          </div>
                          <div className="bg-white p-4">
                            <strong className="block font-[family-name:var(--font-heading)] text-2xl text-dark">{item.semrush.keywords}</strong>
                            <span className="mt-1 block text-[11px] leading-snug text-muted">organische Keywords</span>
                          </div>
                        </div>
                      </div>
                    )}
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
                    {item.service && (
                      <Link href={item.service.href} className="mt-5 inline-flex border-b border-primary/40 pb-1 text-sm font-bold text-primary transition-colors hover:border-primary hover:text-primary-dark">
                        {item.service.label} →
                      </Link>
                    )}
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
