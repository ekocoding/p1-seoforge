"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DIAGNOSES = [
  {
    key: "index",
    label: "Seiten fehlen im Index",
    signal: "Neue oder wichtige URLs erscheinen nicht zuverlässig in der Suche.",
    firstCheck: "Crawlpfad, gerenderter Canonical, Sitemap und Indexierungsstatus gegeneinander lesen.",
    falseMove: "Mehr URLs in die Sitemap legen oder pauschal Indexierung beantragen, bevor Canonical, Rendering und interne Wege geklärt sind.",
    firstMove: "Den technischen Konflikt isolieren und als kleinen, prüfbaren Release beheben.",
    proof: "URL-Set mit Befund, Änderung und erneut geprüftem Status",
    related: { href: "/seo/audit", label: "Technische Ursachen im SEO Audit einordnen" },
    glyph: "M4 6h16M4 12h10M4 18h7M17 14l3 3-3 3",
  },
  {
    key: "ctr",
    label: "Impressionen, kaum Klicks",
    signal: "Google zeigt die Seite – Suchende wählen aber andere Ergebnisse.",
    firstCheck: "Query-Mix, Position, SERP-Typ, Title und Nutzenversprechen getrennt bewerten.",
    falseMove: "Nur den Title emotionaler formulieren, obwohl Position, Query-Intent oder ein SERP-Feature die Klickrate erklären.",
    firstMove: "Suchintention und Snippet schärfen, ohne aus jeder Keyword-Variante eine neue URL zu machen.",
    proof: "Query-zu-Seite-Auswertung plus dokumentierter Snippet-Diff",
    related: { href: "/seo/optimierung", label: "Zielseiten und Snippets systematisch optimieren" },
    glyph: "M3 12h4l3-6 4 12 3-6h4",
  },
  {
    key: "stagnation",
    label: "Rankings stagnieren",
    signal: "Content ist vorhanden, der Abstand zum Wettbewerb schließt sich trotzdem nicht.",
    firstCheck: "Abdeckung, interne Autorität, externe Belege und technische Qualität derselben Zielseite vergleichen.",
    falseMove: "Noch einen ähnlichen Text veröffentlichen und damit Kannibalisierung oder eine bereits diffuse Seitenarchitektur verstärken.",
    firstMove: "Nur den nachgewiesenen Engpass stärken – nicht reflexartig mehr Text veröffentlichen.",
    proof: "Gap-Dossier mit einer priorisierten Verstärkung",
    related: { href: "/seo/content-strategie", label: "Keyword-Cluster und Seitenrollen sauber planen" },
    glyph: "M4 18V9m5 9V5m5 13v-7m5 7V3M3 18h18",
  },
  {
    key: "leads",
    label: "Traffic, kaum Anfragen",
    signal: "Besuche wachsen, aber der geschäftliche Effekt bleibt unklar oder aus.",
    firstCheck: "Landingpage, Suchintention, Conversion-Pfad und Messübergabe an Analytics beziehungsweise CRM prüfen.",
    falseMove: "Einfach mehr Traffic einkaufen oder erzeugen, obwohl Query, Angebot und nächster Schritt nicht zusammenpassen.",
    firstMove: "Den Bruch zwischen Query, Angebot und nächstem Schritt beheben – nicht bloß Traffic erhöhen.",
    proof: "Messkette mit sichtbarer Grenze zwischen SEO-Signal und Vertriebsergebnis",
    related: { href: "/webdesign/landingpage-erstellen-lassen", label: "Den Conversion-Pfad der Landingpage schärfen" },
    glyph: "M4 5h16v10H9l-5 4V5Zm4 4h8m-8 3h5",
  },
] as const;

const FORGE_STAGES = [
  {
    label: "Befund",
    title: "Rohmaterial lesen",
    image: "/images/wachstum/stufe1-forge-v2.webp",
    alt: "Kupferfarbener Rohstein als Symbol für die ungeordnete SEO-Ausgangslage",
    copy: "Crawl, Search Console, Rankings, Releases und Geschäftsziele werden zu einer belastbaren Ausgangslage verbunden. Noch wird nichts versprochen oder priorisiert.",
    artifact: "Befundakte mit Datenquelle und offener Frage",
  },
  {
    label: "Priorität",
    title: "Den Engpass auf den Amboss legen",
    image: "/images/wachstum/stufe2-forge-v2.webp",
    alt: "Dunkler Amboss mit Kupferauflage als Symbol für die SEO-Priorisierung",
    copy: "Nicht die längste Aufgabenliste gewinnt, sondern die Veränderung, bei der Relevanz, erwartbarer Hebel, Sicherheit und Aufwand zusammenpassen.",
    artifact: "Eine begründete Monatsentscheidung",
  },
  {
    label: "Release",
    title: "Die Veränderung ausliefern",
    image: "/images/wachstum/stufe3-forge-v2.webp",
    alt: "Hammer und Schwert auf einem Amboss als Symbol für die operative SEO-Umsetzung",
    copy: "Technik, Zielseite, Content oder interne Verlinkung werden tatsächlich verändert, geprüft und dokumentiert – nicht nur als Empfehlung weitergereicht.",
    artifact: "Release-Notiz mit QA und erwartetem Signal",
  },
  {
    label: "Prüfung",
    title: "Die Klinge prüfen, nicht feiern",
    image: "/images/wachstum/stufe4-forge-v2.webp",
    alt: "Fertiges kupferfarbenes Schwert als Symbol für die Prüfung eines SEO-Releases",
    copy: "Indexierung, Darstellung, Suchsignale und Nebenwirkungen werden eingeordnet. Erst daraus entsteht die nächste Priorität – ohne aus früher Bewegung schon einen Erfolg zu erfinden.",
    artifact: "Wirkungsnotiz und nächste Entscheidung",
  },
] as const;

const WORK_MODES = [
  {
    key: "audit",
    label: "SEO Audit",
    question: "Wo liegen die belegbaren Probleme?",
    boundary: "Ein Audit schafft Befund und Reihenfolge. Er ersetzt keine laufende Umsetzung.",
    output: "Priorisierter Prüfbericht",
    href: "/seo/audit",
  },
  {
    key: "beratung",
    label: "SEO Beratung",
    question: "Welche Entscheidung sollte Ihr Team treffen?",
    boundary: "Beratung stärkt interne Verantwortliche. Umsetzung kann bewusst im Unternehmen bleiben.",
    output: "Entscheidungs- und Sparringsgrundlage",
    href: "/seo/beratung",
  },
  {
    key: "optimierung",
    label: "SEO Optimierung",
    question: "Welche bekannte Schwachstelle soll behoben werden?",
    boundary: "Optimierung kann ein klar abgegrenztes Vorhaben sein – etwa Technik, Zielseite oder Architektur.",
    output: "Definierter Vorher-/Nachher-Release",
    href: "/seo/optimierung",
  },
  {
    key: "betreuung",
    label: "SEO Betreuung",
    question: "Wie wird aus wechselnden Signalen ein verlässlicher Betrieb?",
    boundary: "Betreuung verbindet Diagnose, Entscheidung, Umsetzung und Prüfung wiederholt – der Schwerpunkt darf sich ändern.",
    output: "Fortlaufende Arbeits- und Lernschleife",
    href: "/seo/betreuung",
  },
] as const;

const SIGNALS = [
  {
    key: "access",
    short: "Zugriff",
    title: "Indexierbare Zielseiten",
    source: "Crawl, gerenderte Seite, Sitemap, Search Console",
    lever: "Technik, Canonicals, interne Wege, Rendering",
    boundary: "Indexierung ist eine Voraussetzung – noch kein Beleg für Nachfrage.",
    accent: "#C2722A",
  },
  {
    key: "impressions",
    short: "Sichtbarkeit",
    title: "Impressionen für relevante Suchanfragen",
    source: "Google Search Console und Ranking-Segmente",
    lever: "Suchintention, Abdeckung, Autorität, Snippet-Fähigkeit",
    boundary: "Mehr Impressionen helfen nur, wenn Query und Geschäftsmodell zusammenpassen.",
    accent: "#D4A853",
  },
  {
    key: "clicks",
    short: "Besuche",
    title: "Klicks und qualifizierte Einstiege",
    source: "Search Console plus Analytics-Landingpages",
    lever: "Position, Title, Description, SERP-Format, Markenvertrauen",
    boundary: "CTR hängt auch von Wettbewerb, Anzeigen und SERP-Features ab.",
    accent: "#C2722A",
  },
  {
    key: "actions",
    short: "Handlung",
    title: "Messbare nächste Schritte",
    source: "Analytics-Events, Formulare, Anrufe oder konfigurierte Conversions",
    lever: "Nutzerweg, Belege, Angebotsschärfe, Formular- und Kontaktlogik",
    boundary: "Eine Conversion-Messung ist nur so belastbar wie ihre technische Konfiguration.",
    accent: "#D4A853",
  },
  {
    key: "leads",
    short: "Anfragen",
    title: "Qualifizierte Leads",
    source: "CRM oder abgestimmtes Lead-Feedback",
    lever: "Query-Qualität, Zielseite, Qualifizierung und Übergabe an den Vertrieb",
    boundary: "SEO beeinflusst die Nachfrage – es kontrolliert weder Abschlussquote noch Sales-Prozess.",
    accent: "#C2722A",
  },
  {
    key: "revenue",
    short: "Wert",
    title: "Geschäftlicher Beitrag",
    source: "CRM-, Auftrags- oder Umsatzdaten, wenn sauber verbunden",
    lever: "Gemeinsame Auswertung von Marketing und Vertrieb",
    boundary: "Umsatz entsteht meist über mehrere Kontakte. Eine eindeutige SEO-Alleinursache wäre oft unehrlich.",
    accent: "#D4A853",
  },
] as const;

const PHASES = [
  {
    range: "0–30",
    label: "Messbarkeit belegen",
    question: "Worauf können wir uns verlassen?",
    copy: "Zugänge, Tracking, Crawl, Ranking-Segmente und bestehende Releases werden zu einer belastbaren Ausgangslage verbunden. Der erste Monat endet nicht mit einem Strategie-PDF, sondern mit einer priorisierten Änderung oder einem klar begründeten Blocker.",
    evidence: ["Baseline mit Datenquelle", "Verantwortlichkeiten", "erster Release oder freigegebener Plan"],
  },
  {
    range: "31–60",
    label: "Veränderung ausliefern",
    question: "Welche Annahme testen wir zuerst?",
    copy: "Technik, Zielseite, interne Verlinkung oder Content werden dort verändert, wo Diagnose und Geschäftsrelevanz zusammenkommen. Die Änderung erhält einen sichtbaren Vorher-/Nachher-Zustand und eine Prüfmethode.",
    evidence: ["umgesetzter Fokus", "QA nach Release", "erwartetes Signal dokumentiert"],
  },
  {
    range: "61–90",
    label: "Wirkung einordnen",
    question: "Was lernen wir für den nächsten Zyklus?",
    copy: "Wir lesen Reaktionen und Nebenwirkungen, ohne aus früher Bewegung bereits einen langfristigen Erfolg abzuleiten. Bestätigte Annahmen werden skaliert, schwache verworfen und die nächste Monatspriorität neu begründet.",
    evidence: ["beobachtete Reaktion", "verworfen oder bestätigt", "nächste Entscheidung"],
  },
] as const;

function ArrowMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" />
    </svg>
  );
}

export function BetreuungHero() {
  const [active, setActive] = useState(1);
  const stage = FORGE_STAGES[active];

  return (
    <section data-hero className="relative overflow-hidden border-b-2 border-dark bg-[#12110F] text-white">
      <style>{`
        @keyframes forgeStageIn { from { opacity: 0; transform: translateY(18px) scale(.96) rotate(-1deg); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); } }
        @keyframes forgeEmber { 0%,100% { opacity: .35; transform: translateY(0); } 50% { opacity: .8; transform: translateY(-8px); } }
        .forge-stage-image { animation: forgeStageIn .62s cubic-bezier(.16,1,.3,1) both; }
        .forge-ember { animation: forgeEmber 3.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .forge-stage-image, .forge-ember { animation: none !important; } }
      `}</style>
      <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.09) 1px,transparent 1px)", backgroundSize: "54px 54px" }} />
      <div className="pointer-events-none absolute -right-[18%] top-[-35%] h-[760px] w-[760px] rounded-full border border-primary/25" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-[8%] top-[-22%] h-[560px] w-[560px] rounded-full border border-secondary/15" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[-260px] left-[24%] h-[520px] w-[520px] rounded-full bg-primary/15 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-8 lg:px-8 lg:pb-20 lg:pt-10">
        <div className="flex items-center gap-4 border-y border-white/25 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 sm:text-[10px]">
          <span className="text-secondary">SeoForge / Betreuungsschmiede</span>
          <span className="h-px flex-1 bg-white/15" />
          <span className="hidden sm:inline">Vier Zustände · ein Betrieb</span>
          <span className="forge-ember h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(430px,.92fr)] lg:items-center lg:gap-16">
          <div className="relative z-10">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">Monatliche SEO Betreuung</span>
            <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-heading)] text-[clamp(3rem,5.8vw,5.8rem)] font-bold leading-[.91] tracking-[-0.055em]">
              SEO Betreuung.
              <span className="mt-1 block italic text-primary">Aus Signalen wird Substanz.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-white/65 sm:text-lg">
              Laufende SEO Betreuung ist kein wiederholter Audit und kein Maßnahmenpaket auf Autopilot. Wir lesen die aktuelle Datenlage, legen genau einen Engpass auf den Amboss, liefern die Veränderung aus und prüfen, was sie tatsächlich bewirkt.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/kontakt" className="group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 text-sm font-bold text-dark transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
                Betreuung besprechen <ArrowMark />
              </Link>
              <a href="#diagnose" className="group inline-flex items-center justify-center gap-3 border border-white/45 px-7 py-[15px] text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Engpass einordnen <ArrowMark />
              </a>
            </div>

            <div className="mt-9 grid max-w-2xl gap-px border border-white/20 bg-white/20 sm:grid-cols-3">
              {["Feste Ansprechperson", "Umsetzung im Projekt", "Arbeitsakte je Fokus"].map((item, index) => (
                <div key={item} className="bg-[#191714] px-4 py-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-secondary">0{index + 1}</span>
                  <span className="mt-1 block text-xs font-semibold text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px] lg:mx-0">
            <div className="overflow-hidden border border-white/30 bg-[#0B0A09] shadow-[16px_16px_0_rgba(194,114,42,.35)]">
              <div className="flex items-center justify-between border-b border-white/20 px-5 py-3">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-secondary">Interaktiver Schmiedezyklus</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">Arbeitsmodell · keine Erfolgskurve</span>
              </div>
              <div className="relative grid min-h-[520px] grid-rows-[1fr_auto]">
                <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden">
                  <span className="pointer-events-none absolute left-5 top-3 font-[family-name:var(--font-heading)] text-[110px] font-bold leading-none text-white/[.035]" aria-hidden="true">0{active + 1}</span>
                  <div className="pointer-events-none absolute h-[280px] w-[280px] rounded-full bg-primary/20 blur-[68px]" aria-hidden="true" />
                  <div className="pointer-events-none absolute h-[330px] w-[330px] rounded-full border border-secondary/20" aria-hidden="true" />
                  <Image key={stage.image} src={stage.image} alt={stage.alt} width={1024} height={1024} priority className="forge-stage-image relative h-[300px] w-[300px] object-contain sm:h-[360px] sm:w-[360px]" sizes="(min-width:1024px) 360px,300px" />
                  <span className="absolute right-5 top-5 border border-primary/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">{stage.label}</span>
                </div>
                <div key={stage.title} className="border-t border-white/20 bg-[#171512] p-5 sm:p-6" role="tabpanel" aria-live="polite">
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white">{stage.title}</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/58">{stage.copy}</p>
                  <div className="mt-4 flex items-start gap-3 border-t border-white/15 pt-4">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                    <p className="text-xs font-semibold text-white/78"><span className="font-mono text-[8px] uppercase tracking-[0.15em] text-secondary">Sichtbarer Output</span><br />{stage.artifact}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-px bg-white/20" role="tablist" aria-label="Stufe des Schmiedezyklus auswählen">
              {FORGE_STAGES.map((entry, index) => (
                <button key={entry.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-w-0 px-2 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:px-3 ${active === index ? "bg-secondary text-dark" : "bg-[#191714] text-white hover:bg-[#26221d]"}`}>
                  <span className={`block font-mono text-[8px] uppercase tracking-[0.12em] ${active === index ? "text-dark/65" : "text-white/35"}`}>0{index + 1}</span>
                  <span className="mt-1 block truncate text-[10px] font-bold sm:text-xs">{entry.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BetreuungDiagnosis() {
  const [active, setActive] = useState(0);
  const item = DIAGNOSES[active];

  return (
    <section id="diagnose" className="scroll-mt-24 overflow-hidden border-y-2 border-dark bg-[#EEE8DF] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 border-b-2 border-dark pb-9 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary-dark">Die Entscheidungsschmiede</span>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.02] text-dark sm:text-5xl">
              Nicht jede Auffälligkeit verdient den Hammer.
            </h2>
          </div>
          <p className="max-w-2xl text-[16px] leading-relaxed text-muted lg:justify-self-end">
            Gute SEO Betreuung trennt Signal, Ursache und nächsten Eingriff. Wählen Sie eine Ausgangslage: Die Akte zeigt nicht nur, was wir prüfen, sondern auch, welchen reflexartigen Schritt wir bewusst vermeiden.
          </p>
        </div>

        <div className="mt-10 overflow-hidden border-2 border-dark bg-white shadow-[16px_16px_0_rgba(194,114,42,.18)] lg:grid lg:grid-cols-[340px_1fr]">
          <div className="border-b-2 border-dark bg-[#171512] text-white lg:border-b-0 lg:border-r-2">
            <div className="flex items-center justify-between border-b border-white/20 px-5 py-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-secondary">Signaleingang</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">Auswahl 0{active + 1}/04</span>
            </div>
            <div role="tablist" aria-label="SEO-Ausgangslage auswählen">
              {DIAGNOSES.map((entry, index) => (
                <button
                  key={entry.key}
                  type="button"
                  role="tab"
                  id={`diagnose-tab-${entry.key}`}
                  aria-selected={active === index}
                  aria-controls="diagnose-panel"
                  onClick={() => setActive(index)}
                  className={`group flex w-full items-center gap-4 border-b border-white/15 px-5 py-5 text-left transition-colors last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-secondary ${active === index ? "bg-secondary text-dark" : "text-white hover:bg-white/10"}`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center border ${active === index ? "border-dark/30" : "border-white/25"}`}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d={entry.glyph} /></svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-mono text-[8px] uppercase tracking-[0.15em] ${active === index ? "text-dark/60" : "text-white/35"}`}>Signal 0{index + 1}</span>
                    <span className="mt-1 block text-sm font-bold leading-tight">{entry.label}</span>
                  </span>
                  <span className="font-mono text-sm" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>

          <div id="diagnose-panel" key={item.key} role="tabpanel" aria-labelledby={`diagnose-tab-${item.key}`} aria-live="polite">
            <div className="flex items-center justify-between border-b-2 border-dark bg-[#F5F0E9] px-5 py-4 sm:px-7">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-dark/55">Entscheidungsakte / 0{active + 1}</span>
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            </div>
            <div className="grid lg:grid-cols-[minmax(220px,.62fr)_minmax(0,1.38fr)]">
              <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden border-b-2 border-dark bg-[#F8F1E8] p-6 lg:min-h-full lg:border-b-0 lg:border-r-2 lg:p-8">
                <span className="pointer-events-none absolute -bottom-8 -right-3 font-[family-name:var(--font-heading)] text-[180px] font-bold leading-none text-dark/[.045]" aria-hidden="true">0{active + 1}</span>
                <svg viewBox="0 0 24 24" className="relative h-20 w-20 text-primary-dark" fill="none" stroke="currentColor" strokeWidth=".8" aria-hidden="true"><path d={item.glyph} /></svg>
                <div className="relative mt-14 border-t-2 border-dark pt-5">
                  <span className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-primary-dark">Signal ist noch keine Ursache</span>
                  <p className="mt-2 text-sm leading-relaxed text-dark/65">Die Diagnose beginnt mit einer Gegenprobe. Erst wenn das Signal reproduzierbar und geschäftlich relevant ist, wird daraus eine Priorität.</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary-dark">Beobachtetes Signal</span>
                <h3 className="mt-3 max-w-3xl font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-dark sm:text-4xl">{item.signal}</h3>
                <div className="relative mt-8 border-l-2 border-dark pl-6 sm:pl-8">
                  {[
                    ["Prüfen", item.firstCheck],
                    ["Nicht reflexartig", item.falseMove],
                    ["Erster Eingriff", item.firstMove],
                    ["Abnahme", item.proof],
                  ].map(([label, copy], index) => (
                    <div key={label} className="relative border-b border-dark/15 py-4 first:pt-0 last:border-b-0 last:pb-0">
                      <span className={`absolute -left-[31px] top-[22px] h-3 w-3 rounded-full border-2 border-white sm:-left-[39px] ${index === 1 ? "bg-dark" : "bg-primary"}`} aria-hidden="true" />
                      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-primary-dark">0{index + 1} · {label}</span>
                      <p className="mt-1.5 text-sm leading-relaxed text-dark/67">{copy}</p>
                    </div>
                  ))}
                </div>
                <Link href={item.related.href} className="group mt-8 inline-flex items-center gap-3 border-b-2 border-primary pb-1 text-sm font-bold text-dark hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark">
                  {item.related.label} <ArrowMark />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 border-t-2 border-dark pt-6 sm:grid-cols-[auto_1fr] sm:items-start">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary-dark">Wie priorisiert wird</span>
          <p className="max-w-4xl text-sm leading-relaxed text-muted">Wir wägen erwartbaren geschäftlichen Hebel, betroffene Seiten beziehungsweise Suchanfragen, Sicherheit des Befunds und Umsetzungsaufwand gemeinsam ab. Daraus entsteht keine dekorative Punktzahl, sondern eine begründete Entscheidung, die im nächsten Report wieder überprüft werden kann.</p>
        </div>
      </div>
    </section>
  );
}

export function BetreuungOwnershipDepth() {
  const [active, setActive] = useState(3);
  const mode = WORK_MODES[active];

  return (
    <section className="overflow-hidden border-y-2 border-dark bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,.72fr)_minmax(420px,1fr)] lg:gap-16">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary-dark">Seitenrolle im SEO-Silo</span>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.04] text-dark sm:text-5xl">Betreuung ist Betrieb – nicht einfach ein Audit jeden Monat.</h2>
            <div className="mt-7 max-w-2xl text-[15px] leading-relaxed text-muted">
              <p>Ein <Link href="/seo/audit" className="font-semibold text-primary-dark underline decoration-primary/30 underline-offset-4">SEO Audit</Link> beantwortet vor allem, wo technische, strukturelle oder inhaltliche Probleme liegen. <Link href="/seo/beratung" className="font-semibold text-primary-dark underline decoration-primary/30 underline-offset-4">SEO Beratung</Link> hilft einem internen Team, Entscheidungen zu treffen. Eine klar abgegrenzte <Link href="/seo/optimierung" className="font-semibold text-primary-dark underline decoration-primary/30 underline-offset-4">SEO Optimierung</Link> behebt einen bekannten Zustand.</p>
              <p className="mt-4">Laufende SEO Betreuung wird dann sinnvoll, wenn sich der Engpass mit der Website verändert: Nach einem technischen Release kann die nächste Priorität eine Zielseite, interne Autorität, ein Content-Cluster oder die Messung qualifizierter Anfragen sein. Der Wert liegt nicht darin, jeden Monat dieselbe Checkliste abzuarbeiten, sondern fachlich sauber zwischen diesen Ebenen zu wechseln.</p>
            </div>
          </div>

          <div className="self-start border-2 border-dark bg-[#F5F0E9] shadow-[14px_14px_0_rgba(212,168,83,.55)]">
            <div className="flex items-center justify-between border-b-2 border-dark bg-dark px-5 py-4 text-white">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-secondary">Welches Arbeitsformat löst welche Frage?</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">Silo-Navigator</span>
            </div>
            <div className="grid grid-cols-2 border-b-2 border-dark sm:grid-cols-4" role="tablist" aria-label="SEO-Arbeitsformat auswählen">
              {WORK_MODES.map((entry, index) => (
                <button key={entry.key} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-w-0 border-r border-dark/20 px-3 py-3 text-left transition-colors last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary-dark ${active === index ? "bg-primary-dark text-white" : "bg-white text-dark hover:bg-[#FBF4EA]"}`}>
                  <span className={`block font-mono text-[8px] uppercase tracking-[0.13em] ${active === index ? "text-white/65" : "text-dark/45"}`}>0{index + 1}</span>
                  <span className="mt-1 block text-[11px] font-bold leading-tight">{entry.label}</span>
                </button>
              ))}
            </div>
            <div key={mode.key} className="p-6 sm:p-8" role="tabpanel" aria-live="polite">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary-dark">Leitfrage</span>
              <h3 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-dark">{mode.question}</h3>
              <p className="mt-5 text-sm leading-relaxed text-muted">{mode.boundary}</p>
              <div className="mt-7 border-y-2 border-dark py-4">
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-dark/45">Typischer Output</span>
                <p className="mt-1 font-semibold text-dark">{mode.output}</p>
              </div>
              {mode.key !== "betreuung" && <Link href={mode.href} className="group mt-6 inline-flex items-center gap-3 text-sm font-bold text-primary-dark hover:text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark">Vertiefung öffnen <ArrowMark /></Link>}
              {mode.key === "betreuung" && <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.15em] text-dark/45">Sie befinden sich auf der Parent-Seite dieses Arbeitsformats.</p>}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t-2 border-dark pt-7 lg:grid-cols-[170px_1fr]">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary-dark">Verbundene Disziplinen</span>
          <p className="max-w-4xl text-sm leading-relaxed text-muted">Je nach Befund greifen außerdem <Link href="/seo/content-strategie" className="font-semibold text-dark underline decoration-primary/40 underline-offset-4">Content-Strategie</Link>, <Link href="/linkbuilding-agentur" className="font-semibold text-dark underline decoration-primary/40 underline-offset-4">redaktioneller Linkaufbau</Link> oder <Link href="/geo/monitoring" className="font-semibold text-dark underline decoration-primary/40 underline-offset-4">Monitoring für KI-Sichtbarkeit</Link>. Diese Seiten vertiefen einzelne Disziplinen; die Betreuung hält Priorität, Verantwortlichkeit und Lernschleife zusammen.</p>
        </div>
      </div>
    </section>
  );
}

export function BetreuungMeasurement() {
  const [active, setActive] = useState(1);
  const item = SIGNALS[active];

  return (
    <section className="overflow-hidden bg-dark py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,.618fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">SEO Monitoring & Reporting</span>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.03] sm:text-5xl">Von der Impression zur Anfrage: Was wir wirklich messen.</h2>
          </div>
          <p className="max-w-2xl text-[16px] leading-relaxed text-white/55 lg:justify-self-end">
            Rankings sind ein Zwischensignal. Der Graph trennt technische Voraussetzung, Sichtbarkeit, Besuch und Geschäftswert – inklusive der Stellen, an denen eine eindeutige Attribution nicht mehr seriös wäre.
          </p>
        </div>

        <div className="mt-12 border border-white/15 bg-[#201e1c] p-4 sm:p-7 lg:p-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">Kausalmodell / qualitativ</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-secondary">Keine Umsatzgarantie · keine erfundenen Kurven</span>
          </div>

          <div className="relative hidden h-[390px] lg:block">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1080 390" fill="none" aria-hidden="true">
              <path d="M60 300C180 290 205 210 290 222S420 275 505 205 620 112 710 164 840 226 930 116 1016 74 1050 74" stroke="rgba(255,255,255,.14)" strokeWidth="2" />
              <path d="M60 300C180 290 205 210 290 222S420 275 505 205 620 112 710 164 840 226 930 116 1016 74 1050 74" stroke="url(#signal-line)" strokeWidth="2" strokeDasharray="7 10" />
              <defs><linearGradient id="signal-line" x1="60" y1="300" x2="1050" y2="74"><stop stopColor="#C2722A" /><stop offset="1" stopColor="#D4A853" /></linearGradient></defs>
              {[60, 290, 505, 710, 930, 1050].map((x, index) => {
                const y = [300, 222, 205, 164, 116, 74][index];
                return <circle key={x} cx={x} cy={y} r={index === active ? 28 : 15} fill={index === active ? SIGNALS[index].accent : "#201e1c"} stroke={index === active ? "#F5F0E9" : "rgba(255,255,255,.4)"} />;
              })}
            </svg>
            {SIGNALS.map((signal, index) => {
              const positions = [
                ["5%", "72%"], ["26%", "50%"], ["45%", "46%"], ["64%", "34%"], ["83%", "21%"], ["94%", "9%"],
              ];
              return (
                <button
                  key={signal.key}
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                  className={`absolute w-36 -translate-x-1/2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary ${active === index ? "text-secondary" : "text-white/45 hover:text-white"}`}
                  style={{ left: positions[index][0], top: positions[index][1] }}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em]">0{index + 1}</span>
                  <span className="mt-1 block text-xs font-bold">{signal.short}</span>
                </button>
              );
            })}
          </div>

          <div className="flex snap-x gap-2 overflow-x-auto pb-3 lg:hidden" role="tablist" aria-label="Messstufe auswählen">
            {SIGNALS.map((signal, index) => (
              <button key={signal.key} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-w-32 snap-start border px-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${active === index ? "border-secondary bg-secondary text-dark" : "border-white/20 text-white/60"}`}>
                <span className="font-mono text-[9px]">0{index + 1}</span>
                <span className="mt-1 block text-xs font-bold">{signal.short}</span>
              </button>
            ))}
          </div>

          <div key={item.key} className="border-t border-white/15 pt-7 lg:grid lg:grid-cols-[minmax(0,.618fr)_minmax(0,1fr)] lg:gap-12" aria-live="polite">
            <div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: item.accent }}>Aktive Messstufe / 0{active + 1}</span>
              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold">{item.title}</h3>
            </div>
            <div className="mt-6 divide-y divide-white/10 border-y border-white/10 lg:mt-0">
              {[
                ["Datenquelle", item.source],
                ["Beeinflussbarer Hebel", item.lever],
                ["Messgrenze", item.boundary],
              ].map(([label, copy]) => (
                <div key={label} className="grid gap-2 py-4 sm:grid-cols-[150px_1fr]">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">{label}</span>
                  <p className="text-sm leading-relaxed text-white/65">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BetreuungFirst90() {
  const [active, setActive] = useState(0);
  const item = PHASES[active];

  return (
    <section className="overflow-hidden bg-[#F5F0E9] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,.618fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary-dark">Die ersten 90 Tage</span>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.03] text-dark sm:text-5xl">Drei Beweisstufen. Keine Rankingversprechen.</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Eine laufende SEO Betreuung muss früh zeigen, ob Messung, Umsetzung und Zusammenarbeit funktionieren. Die ersten 90 Tage liefern deshalb überprüfbare Arbeitsbelege – nicht zwangsläufig bereits den langfristigen Rankingeffekt.
            </p>
            <figure className="relative mt-8 aspect-[1.618/1] overflow-hidden border-2 border-dark bg-dark shadow-[12px_12px_0_rgba(194,114,42,.24)]">
              <Image src="/images/seo-betreuung-90-tage-worktable-v1.webp" alt="Arbeitsunterlagen für die ersten 90 Tage einer laufenden SEO Betreuung" fill sizes="(min-width:1024px) 38vw,100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 text-white">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">Arbeitsakte statt Roadmap-Deko</span>
                <span className="font-[family-name:var(--font-heading)] text-xl font-bold">Baseline → Release → Lernen</span>
              </figcaption>
            </figure>
          </div>

          <div>
            <div className="flex border-b-2 border-dark" role="tablist" aria-label="Zeitraum der Aufbauphase auswählen">
              {PHASES.map((phase, index) => (
                <button key={phase.range} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`flex-1 border-x border-t border-dark px-3 py-4 text-left transition-colors first:border-l-2 last:border-r-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark ${active === index ? "bg-dark text-white" : "bg-transparent text-dark hover:bg-white"}`}>
                  <span className={`block font-mono text-[9px] uppercase tracking-[0.15em] ${active === index ? "text-secondary" : "text-primary-dark"}`}>Tage</span>
                  <strong className="mt-1 block font-[family-name:var(--font-heading)] text-xl">{phase.range}</strong>
                </button>
              ))}
            </div>

            <div key={item.range} className="relative border-x-2 border-b-2 border-dark bg-white p-6 shadow-[14px_14px_0_rgba(212,168,83,.5)] sm:p-8 lg:p-10" role="tabpanel" aria-live="polite">
              <span className="pointer-events-none absolute right-5 top-0 font-[family-name:var(--font-heading)] text-[110px] font-bold leading-none text-dark/[.04] sm:text-[150px]">{active + 1}</span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary-dark">Beweisstufe 0{active + 1}</span>
              <h3 className="relative mt-3 max-w-xl font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">{item.label}</h3>
              <p className="relative mt-2 font-[family-name:var(--font-heading)] text-xl italic text-dark/60">{item.question}</p>
              <p className="relative mt-6 text-[15px] leading-relaxed text-muted">{item.copy}</p>
              <div className="relative mt-8 divide-y divide-dark/15 border-y-2 border-dark">
                {item.evidence.map((entry, index) => (
                  <div key={entry} className="flex items-center gap-4 py-4">
                    <span className="font-mono text-[9px] font-bold text-primary-dark">POS 0{index + 1}</span>
                    <span className="text-sm font-semibold text-dark/70">{entry}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 border-2 border-dark bg-[#EEE8DF]">
              <div className="flex items-center justify-between border-b-2 border-dark px-5 py-4 sm:px-7">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-dark/55">Zuständigkeiten vor dem ersten Release</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary-dark">gemeinsam klären</span>
              </div>
              <div className="divide-y divide-dark/15 px-5 sm:px-7">
                {[
                  ["SeoForge", "Diagnose, Priorisierung, vereinbarte Umsetzung, QA und Arbeitsprotokoll"],
                  ["Ihr Team", "Zugänge, Fachfreigaben, rechtliche Vorgaben und Rückmeldung zur Lead-Qualität"],
                  ["Gemeinsam", "Ziele, Conversion-Definition, Release-Fenster und Entscheidung über den nächsten Fokus"],
                ].map(([owner, duty]) => (
                  <div key={owner} className="grid gap-2 py-4 sm:grid-cols-[100px_1fr]">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-primary-dark">{owner}</span>
                    <p className="text-sm leading-relaxed text-dark/65">{duty}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-5 border-t-2 border-dark pt-7 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">ROI- und Laufzeitfragen haben eigene Vertiefungsseiten. So bleibt diese Seite bei der Arbeitsweise, ohne mehrere Angebotsmodelle miteinander zu vermischen.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/seo/betreuung/roi" className="inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-sm font-bold text-dark hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark">ROI einordnen <ArrowMark /></Link>
            <Link href="/seo/betreuung/ohne-vertrag" className="inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-sm font-bold text-dark hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark">Flexible Betreuung <ArrowMark /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
