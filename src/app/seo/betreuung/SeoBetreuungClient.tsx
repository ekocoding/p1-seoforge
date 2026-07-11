"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SubpageLayout from "@/app/components/SubpageLayout";
import FaqAccordion from "@/app/components/FaqAccordion";

const MONTH = [
  {
    label: "Woche 1",
    short: "Lesen",
    title: "Daten lesen, Engpass wählen.",
    copy: "Search Console, Rankings, technische Signale und die letzten Änderungen kommen auf einen Tisch. Daraus wählen wir genau den Engpass, der im aktuellen Monat den größten Hebel hat.",
    output: ["Monatsdiagnose", "eine begründete Priorität", "klarer Arbeitsumfang"],
  },
  {
    label: "Woche 2",
    short: "Bauen",
    title: "Die wichtigste Veränderung geht live.",
    copy: "Wir überarbeiten Zielseiten, beheben technische Hindernisse, verbessern die interne Verlinkung oder bauen fehlende Inhalte. Der Schwerpunkt folgt der Diagnose – nicht einem starren Paket.",
    output: ["Änderungen im Projekt", "Review vor Release", "Dokumentation der Eingriffe"],
  },
  {
    label: "Woche 3",
    short: "Prüfen",
    title: "Wir prüfen Wirkung und Nebenwirkungen.",
    copy: "Nach dem Release kontrollieren wir Indexierung, Darstellung, interne Signale und erste Bewegungen. Fehler werden nicht bis zum nächsten Monatsreport liegen gelassen.",
    output: ["QA nach Release", "Indexierungscheck", "erste Reaktion der Suchdaten"],
  },
  {
    label: "Woche 4",
    short: "Lernen",
    title: "Aus dem Ergebnis wird der nächste Zug.",
    copy: "Der Monatsreport zeigt nicht nur Kurven. Er hält fest, was erledigt wurde, was wir daraus gelernt haben und welche Priorität sich für den nächsten Zyklus ergibt.",
    output: ["Arbeitsprotokoll", "Einordnung statt Datenfriedhof", "nächste Monatspriorität"],
  },
];

const AREAS = [
  {
    key: "technik",
    label: "Technik",
    title: "Suchmaschinen müssen sauber zugreifen können.",
    copy: "Crawling, Indexierung, Ladezeit, Weiterleitungen und strukturierte Daten bilden die Betriebsgrundlage. Wir beheben technische Probleme dort, wo sie Sichtbarkeit oder Conversion wirklich blockieren.",
    tasks: ["Crawl- und Indexierungsfehler", "Core Web Vitals und Rendering", "Canonicals, Redirects und Sitemaps", "Schema und interne Architektur"],
    artifact: "Technik-Backlog mit Priorität und Status",
  },
  {
    key: "content",
    label: "Content",
    title: "Jede Suchintention bekommt eine eindeutige Zielseite.",
    copy: "Wir bauen keine Textmenge um der Menge willen. Bestehende Inhalte werden geschärft, Kannibalisierung aufgelöst und neue Seiten nur dort geplant, wo Nachfrage und geschäftlicher Wert zusammenkommen.",
    tasks: ["Keyword-zu-URL-Mapping", "Money-Page-Überarbeitung", "Content-Lücken und Konsolidierung", "Snippets und interne Verlinkung"],
    artifact: "Seitenplan mit Suchintention und nächster Änderung",
  },
  {
    key: "autoritaet",
    label: "Autorität",
    title: "Gute Seiten brauchen belegbares Vertrauen.",
    copy: "Wir prüfen, ob fehlende Erwähnungen, schwache Entitätssignale oder ein dünnes Backlinkprofil den Fortschritt begrenzen. Maßnahmen entstehen aus dem tatsächlichen Abstand zum Wettbewerb.",
    tasks: ["Wettbewerbs- und Backlink-Gap", "interne Themenautorität", "Citations und Markensignale", "digitale PR und relevante Verweise"],
    artifact: "Autoritätsplan ohne Linkpaket-Blackbox",
  },
  {
    key: "monitoring",
    label: "Monitoring",
    title: "Google und KI-Suche werden im selben Rhythmus gelesen.",
    copy: "Rankings, Klicks, Zielseiten und ausgewählte KI-Antworten werden gemeinsam beobachtet. So sehen wir, ob Sichtbarkeit wächst – und ob daraus tatsächlich qualifizierte Besuche entstehen.",
    tasks: ["Rankings und Search Console", "wichtige Landingpages", "Wettbewerbsbewegungen", "KI-Erwähnungen und Quellen"],
    artifact: "Ein Report, den Fachteam und Geschäftsführung lesen können",
  },
];

const FAQ = [
  {
    q: "Was umfasst eine laufende SEO Betreuung?",
    a: "Die laufende SEO Betreuung verbindet Analyse, technische Optimierung, Content-Arbeit, interne Verlinkung, Autoritätsaufbau und Monitoring. Welche Bereiche in einem Monat den Schwerpunkt bilden, entscheidet die aktuelle Datenlage. Sie kaufen deshalb kein starres Stundenpaket, sondern einen transparent priorisierten Arbeitszyklus.",
  },
  {
    q: "Wie schnell sind erste Ergebnisse sichtbar?",
    a: "Technische Korrekturen und bessere Snippets können früh messbare Signale liefern. Neue Rankings und belastbare Geschäftsergebnisse brauchen je nach Ausgangslage, Wettbewerb und Autorität mehrere Monate. Wir versprechen keine feste Position, sondern machen Zwischenfortschritte über Indexierung, Sichtbarkeit, Klicks und Anfragen nachvollziehbar.",
  },
  {
    q: "Was passiert in einem typischen Betreuungsmonat?",
    a: "Der Monat beginnt mit Diagnose und Priorisierung. Danach folgt die Umsetzung im Projekt, anschließend die technische und inhaltliche Qualitätsprüfung. Zum Monatsende erhalten Sie ein Arbeitsprotokoll mit Ergebnis, Einordnung und nächster Priorität. Dringende Probleme warten selbstverständlich nicht bis zum Report.",
  },
  {
    q: "Wie lange läuft die Zusammenarbeit?",
    a: "Das Standardmodell startet mit einer dreimonatigen Aufbauphase und ist danach monatlich kündbar. In dieser Zeit können Analyse, Umsetzung und erste Reaktionen sinnvoll zusammen betrachtet werden. Wenn Sie bewusst ohne Startlaufzeit arbeiten möchten, bieten wir dafür eine eigene flexible Variante an.",
  },
  {
    q: "Was kostet monatliche SEO Betreuung?",
    a: "Der Preis richtet sich nach Websitegröße, Wettbewerb, technischer Ausgangslage und dem Anteil, den wir selbst umsetzen. Nach dem kostenlosen Erstgespräch erhalten Sie ein konkretes Angebot mit eindeutigem Umfang. Wir veröffentlichen keine Scheinpakete, die bei sehr unterschiedlichen Websites dieselbe Leistung versprechen.",
  },
  {
    q: "Arbeitet SeoForge auch mit unserem internen Team?",
    a: "Ja. Wir können die Umsetzung vollständig übernehmen oder mit Marketing, Redaktion und Entwicklung zusammenarbeiten. Entscheidend ist, dass Verantwortlichkeiten und Freigaben zu Beginn klar sind. Sie haben eine feste Ansprechperson und sehen denselben Arbeitsstand wie wir.",
  },
  {
    q: "Ist GEO beziehungsweise KI-Sichtbarkeit enthalten?",
    a: "Ja, wenn sie für Ihr Geschäftsmodell relevant ist. Wir betrachten klassische Suchmaschinenoptimierung und Sichtbarkeit in Antworten von ChatGPT, Perplexity oder Google AI gemeinsam. GEO ist dabei kein separates Etikett, sondern erweitert Content-, Entitäts- und Monitoringarbeit um zusätzliche Suchoberflächen.",
  },
];

const grad = {
  background: "linear-gradient(92deg, #C2722A, #D4A853)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
};

export default function SeoBetreuungClient() {
  const [month, setMonth] = useState(0);
  const [area, setArea] = useState(0);
  const activeMonth = MONTH[month];
  const activeArea = AREAS[area];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO — eigenständige Bild-/Text-Komposition, mobil ohne Clipping */}
      <section className="relative overflow-hidden bg-[#F5F0E9]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ backgroundImage: "radial-gradient(rgba(26,26,26,.12) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-14 pt-12 lg:min-h-[760px] lg:grid-cols-[.94fr_1.06fr] lg:gap-16 lg:px-8 lg:py-16">
          <div className="relative z-10">
            <div className="flex items-center gap-3 border-b-2 border-dark pb-4">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-dark/55">Laufende SEO Betreuung</span>
            </div>
            <h1 className="mt-10 font-[family-name:var(--font-heading)] text-[42px] font-bold leading-[1.02] tracking-tight text-dark sm:text-5xl lg:text-[64px]">
              SEO Betreuung im
              <span className="block" style={grad}>Monats-Takt.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Nicht jeden Monat alles. Jeden Monat das Richtige: analysieren, umsetzen, prüfen und aus den Ergebnissen den nächsten sinnvollen Zug ableiten.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-y border-dark/15 py-5">
              {["feste Ansprechperson", "Umsetzung inklusive", "Reporting als Arbeitsprotokoll"].map((item) => (
                <span key={item} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/55">
                  <span className="h-[2px] w-4 bg-primary" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt" className="inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
                Betreuung besprechen
              </Link>
              <a href="#monat" className="inline-flex items-center rounded-full border-2 border-dark px-7 py-3 text-sm font-bold text-dark transition-colors hover:bg-dark hover:text-white">
                Einen Monat ansehen
              </a>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[680px] lg:max-w-none">
            <div className="relative aspect-[3/2] overflow-hidden border-2 border-dark bg-dark shadow-[18px_18px_0_rgba(194,114,42,.35)] lg:aspect-[4/5]">
              <Image
                src="/images/seo-betreuung-work-session-v2.webp"
                alt="Laufende SEO Betreuung: zwei Spezialisten prüfen Suchdaten und den Maßnahmenplan"
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover lg:object-[55%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 text-white sm:p-7">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">Arbeitsmodus</span>
                  <p className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-bold">Mensch + System</p>
                </div>
                <span className="hidden border border-white/30 bg-black/30 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] backdrop-blur sm:block">kein Stock-Prozess</span>
              </figcaption>
            </div>
            <div className="absolute -bottom-5 -left-3 border-2 border-dark bg-white px-4 py-3 shadow-lg sm:-left-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dark/45">Monatsprinzip</span>
              <p className="mt-1 text-sm font-bold text-dark">eine Priorität · sichtbarer Output</p>
            </div>
          </figure>
        </div>
      </section>

      {/* MONATS-TAKT — klickbarer Kalender statt Roadmap */}
      <section id="monat" className="scroll-mt-24 bg-dark py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 border-b border-white/20 pb-9 lg:grid-cols-[1fr_430px] lg:items-end">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">Der Betreuungsmonat</span>
              <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.04] sm:text-5xl">
                Vier Arbeitszustände.
                <span className="block text-secondary">Ein gemeinsamer Lernzyklus.</span>
              </h2>
            </div>
            <p className="text-[15px] leading-relaxed text-white/55">
              Wählen Sie eine Woche. Das Beispiel zeigt, wie aus Monitoring echte Arbeit wird und welches Artefakt am Ende sichtbar bleibt.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
            <div className="grid grid-cols-2 gap-px bg-white/20 sm:grid-cols-4 lg:grid-cols-2" role="tablist" aria-label="Wochen im Betreuungsmonat">
              {MONTH.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  aria-selected={month === index}
                  onClick={() => setMonth(index)}
                  className={`min-h-32 cursor-pointer p-5 text-left transition-colors ${month === index ? "bg-primary" : "bg-[#22201f] hover:bg-[#2d2926]"}`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">{item.label}</span>
                  <span className="mt-5 block font-[family-name:var(--font-heading)] text-xl font-bold">{item.short}</span>
                  <span className="mt-2 block h-[2px] w-8 bg-secondary" aria-hidden="true" />
                </button>
              ))}
            </div>

            <div key={activeMonth.label} className="border-2 border-white bg-white p-6 text-dark sm:p-8 lg:p-10">
              <div className="flex items-center justify-between border-b-2 border-dark pb-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{activeMonth.label} · {activeMonth.short}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-dark/35">Beispiel-Zyklus</span>
              </div>
              <h3 className="mt-7 font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight">{activeMonth.title}</h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">{activeMonth.copy}</p>
              <div className="mt-7 divide-y divide-border border-y border-border">
                {activeMonth.output.map((output, index) => (
                  <div key={output} className="flex items-center gap-4 py-3.5">
                    <span className="font-mono text-[10px] font-bold text-primary">0{index + 1}</span>
                    <span className="text-sm font-semibold">{output}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.15em] text-dark/40">Der genaue Ablauf folgt Ihrer Website – nicht einem Kalenderautomatismus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEISTUNGSREGISTER — ein wechselndes Dossier statt 6er-Grid */}
      <section id="leistungen" className="bg-[#F5F0E9] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:gap-16">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Leistungsregister</span>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.06] text-dark">Was laufende SEO Betreuung tatsächlich umfasst.</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                Die vier Felder greifen ineinander. Trotzdem arbeiten wir nicht jeden Monat überall gleichzeitig. Klicken Sie durch das Register und sehen Sie, was je Bereich als konkreter Output entsteht.
              </p>
              <div className="mt-8 flex flex-col gap-2" role="tablist" aria-label="Arbeitsbereiche der SEO Betreuung">
                {AREAS.map((item, index) => (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={area === index}
                    onClick={() => setArea(index)}
                    className={`flex cursor-pointer items-center justify-between border-2 px-5 py-4 text-left text-sm font-bold transition-all ${
                      area === index ? "border-dark bg-dark text-white shadow-[7px_7px_0_#C2722A]" : "border-dark/15 bg-white/45 text-dark hover:border-dark/45"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </div>

            <div key={activeArea.key} className="self-start border-2 border-dark bg-white shadow-[14px_14px_0_rgba(212,168,83,.6)]">
              <div className="flex items-center justify-between border-b-2 border-dark bg-dark px-6 py-4 text-white">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Dossier · {String(area + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary">{activeArea.label}</span>
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <h3 className="font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-dark">{activeArea.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{activeArea.copy}</p>
                <div className="mt-8 divide-y divide-border border-y border-border">
                  {activeArea.tasks.map((task, index) => (
                    <div key={task} className="grid grid-cols-[42px_1fr] py-4">
                      <span className="font-mono text-[10px] font-bold text-primary">POS {index + 1}</span>
                      <span className="text-sm font-semibold text-dark/75">{task}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 bg-[#fbf4ea] p-5 ring-1 ring-[#ecd3ba]">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary">Was Sie davon sehen</span>
                  <p className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold text-dark">{activeArea.artifact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REPORT — sichtbares Arbeitsartefakt */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Reporting ohne Theater</span>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.06] text-dark">Nicht „alles grün“. Sondern: erledigt, gelernt, als Nächstes.</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Sie sehen dieselben Daten, mit denen wir arbeiten. Der Monatsreport verbindet Ranking- und Traffic-Signale mit den tatsächlich umgesetzten Änderungen. So lässt sich jede Entwicklung einordnen – auch wenn eine Kurve einmal nicht nach oben zeigt.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Für die wirtschaftliche Betrachtung ergänzen wir auf Wunsch eine <Link href="/seo/betreuung/roi" className="font-semibold text-primary underline decoration-primary/30 underline-offset-4">SEO-ROI-Auswertung</Link>. Rankings bleiben wichtig, werden aber nicht mit Umsatz verwechselt.
            </p>
          </div>

          <div className="overflow-hidden border-2 border-dark bg-[#F8F5F1] shadow-[12px_12px_0_rgba(26,26,26,.12)]">
            <div className="flex items-center justify-between border-b-2 border-dark bg-dark px-5 py-4 text-white">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Monatsreport · Beispielaufbau</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary">keine Kundendaten</span>
            </div>
            {[
              ["01", "Erledigt", "Welche Seiten, technischen Punkte und Verlinkungen geändert wurden"],
              ["02", "Beobachtet", "Wie Rankings, Klicks und wichtige Zielseiten reagiert haben"],
              ["03", "Gelernt", "Welche Annahme bestätigt oder verworfen wurde"],
              ["04", "Als Nächstes", "Eine priorisierte Maßnahme mit kurzer Begründung"],
            ].map(([number, title, copy]) => (
              <div key={number} className="grid gap-2 border-b border-dark/15 px-5 py-5 last:border-b-0 sm:grid-cols-[48px_150px_1fr] sm:items-baseline">
                <span className="font-mono text-[10px] font-bold text-primary">{number}</span>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">{title}</h3>
                <p className="text-[13px] leading-relaxed text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERTRAG & FIT */}
      <section className="bg-dark py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-px bg-white/20 lg:grid-cols-2">
            <div className="bg-[#1f1d1b] p-7 sm:p-10 lg:p-12">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Standardmodell</span>
              <h2 className="mt-5 font-[family-name:var(--font-heading)] text-3xl font-bold">Drei Monate Aufbau. Danach monatlich kündbar.</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/58">
                Die Aufbauphase gibt Analyse, Umsetzung und erster Reaktion genug Raum, um nicht nach vier Wochen Äpfel mit Birnen zu vergleichen. Danach entscheiden Sie jeden Monat neu.
              </p>
            </div>
            <div className="bg-[#292522] p-7 sm:p-10 lg:p-12">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Flexible Variante</span>
              <h2 className="mt-5 font-[family-name:var(--font-heading)] text-3xl font-bold">Sie brauchen bewusst keine Startlaufzeit?</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/58">
                Dafür existiert ein eigenes Modell mit klarer Leistungs- und Preislogik. So konkurrieren zwei verschiedene Bedürfnisse nicht im Kleingedruckten derselben Seite.
              </p>
              <Link href="/seo/betreuung/ohne-vertrag" className="mt-7 inline-flex rounded-full border border-white/35 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-dark">
                SEO ohne Vertrag ansehen
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-10 border-t border-white/20 pt-10 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300">Passt gut, wenn …</span>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">SEO ein relevanter Vertriebskanal werden soll, intern Umsetzung fehlt oder ein Team einen festen Sparrings- und Produktionsrhythmus braucht.</p>
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-red-300">Passt nicht, wenn …</span>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">Sie eine garantierte Position zu einem festen Datum erwarten, nur einen einzelnen technischen Fix benötigen oder keinerlei Zugriff auf Website und Daten ermöglichen können.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA nach Beweisführung */}
      <section className="bg-primary py-16 text-white lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-6 sm:flex-row sm:items-center lg:px-8">
          <div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">Kostenloses Erstgespräch</span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">Welcher Monatsfokus wäre bei Ihnen der erste?</h2>
            <p className="mt-2 text-sm text-white/75">Wir schauen auf die Website und nennen eine begründete erste Priorität.</p>
          </div>
          <Link href="/kontakt" className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-dark transition-colors hover:bg-dark hover:text-white">
            Betreuung besprechen
          </Link>
        </div>
      </section>

      <section className="bg-[#F5F0E9] py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">FAQ</span>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold text-dark">Fragen zur SEO Betreuung</h2>
          </div>
          <FaqAccordion items={FAQ} />
        </div>
      </section>
    </SubpageLayout>
  );
}
