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
    firstMove: "Den technischen Konflikt isolieren und als kleinen, prüfbaren Release beheben.",
    proof: "URL-Set mit Befund, Änderung und erneut geprüftem Status",
    glyph: "M4 6h16M4 12h10M4 18h7M17 14l3 3-3 3",
  },
  {
    key: "ctr",
    label: "Impressionen, kaum Klicks",
    signal: "Google zeigt die Seite – Suchende wählen aber andere Ergebnisse.",
    firstCheck: "Query-Mix, Position, SERP-Typ, Title und Nutzenversprechen getrennt bewerten.",
    firstMove: "Suchintention und Snippet schärfen, ohne aus jeder Keyword-Variante eine neue URL zu machen.",
    proof: "Query-zu-Seite-Auswertung plus dokumentierter Snippet-Diff",
    glyph: "M3 12h4l3-6 4 12 3-6h4",
  },
  {
    key: "stagnation",
    label: "Rankings stagnieren",
    signal: "Content ist vorhanden, der Abstand zum Wettbewerb schließt sich trotzdem nicht.",
    firstCheck: "Abdeckung, interne Autorität, externe Belege und technische Qualität derselben Zielseite vergleichen.",
    firstMove: "Nur den nachgewiesenen Engpass stärken – nicht reflexartig mehr Text veröffentlichen.",
    proof: "Gap-Dossier mit einer priorisierten Verstärkung",
    glyph: "M4 18V9m5 9V5m5 13v-7m5 7V3M3 18h18",
  },
  {
    key: "leads",
    label: "Traffic, kaum Anfragen",
    signal: "Besuche wachsen, aber der geschäftliche Effekt bleibt unklar oder aus.",
    firstCheck: "Landingpage, Suchintention, Conversion-Pfad und Messübergabe an Analytics beziehungsweise CRM prüfen.",
    firstMove: "Den Bruch zwischen Query, Angebot und nächstem Schritt beheben – nicht bloß Traffic erhöhen.",
    proof: "Messkette mit sichtbarer Grenze zwischen SEO-Signal und Vertriebsergebnis",
    glyph: "M4 5h16v10H9l-5 4V5Zm4 4h8m-8 3h5",
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
  return (
    <section data-hero className="relative overflow-hidden border-b-2 border-dark bg-[#F5F0E9]">
      <style>{`
        @keyframes betreuungSignalDraw { from { stroke-dashoffset: 420; } to { stroke-dashoffset: 0; } }
        @keyframes betreuungSignalPulse { 0%,100% { transform: scale(.82); opacity: .55; } 50% { transform: scale(1.12); opacity: 1; } }
        .betreuung-signal-path { stroke-dasharray: 420; animation: betreuungSignalDraw 1.8s cubic-bezier(.16,1,.3,1) .35s both; }
        .betreuung-signal-dot { transform-box: fill-box; transform-origin: center; animation: betreuungSignalPulse 2.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .betreuung-signal-path, .betreuung-signal-dot { animation: none !important; } }
      `}</style>
      <div className="pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" style={{ backgroundImage: "radial-gradient(rgba(26,26,26,.12) .8px, transparent .8px)", backgroundSize: "24px 24px" }} />
      <div className="pointer-events-none absolute -left-16 bottom-[-42px] font-[family-name:var(--font-heading)] text-[220px] font-bold leading-none text-dark/[.035] sm:text-[320px] lg:text-[430px]" aria-hidden="true">01</div>

      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-8 lg:px-8 lg:pb-20 lg:pt-10">
        <div className="flex items-center gap-4 border-y-2 border-dark py-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-dark/45 sm:text-[10px]">
          <span className="text-primary-dark">SeoForge / Laufender Betrieb</span>
          <span className="h-px flex-1 bg-dark/25" />
          <span className="hidden sm:inline">Monatsakte 01</span>
          <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.618fr)_minmax(360px,1fr)] lg:items-center lg:gap-12">
          <div className="relative z-10 pb-2 lg:pb-8">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary-dark">Monatliche SEO Betreuung</span>
            <h1 className="mt-5 max-w-5xl font-[family-name:var(--font-heading)] text-[clamp(3rem,5.6vw,5.5rem)] font-bold leading-[.92] tracking-[-0.055em] text-dark">
              SEO Betreuung.
              <span className="mt-1 block italic text-primary">Monat für Monat klarer entscheiden.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-lg">
              Laufende SEO Betreuung heißt bei uns: Signale lesen, einen Engpass priorisieren, die Veränderung ausliefern und ihre Wirkung ehrlich einordnen. Kein Maßnahmenpaket auf Autopilot.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#diagnose" className="group inline-flex items-center justify-center gap-3 bg-primary-dark px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark">
                Priorisierung ausprobieren <ArrowMark />
              </a>
              <Link href="/kontakt" className="group inline-flex items-center justify-center gap-3 border-2 border-dark bg-transparent px-7 py-[14px] text-sm font-bold text-dark transition-colors hover:bg-dark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark">
                Projekt einordnen <ArrowMark />
              </Link>
            </div>

            <div className="mt-9 max-w-3xl border-y border-dark/20 py-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:flex-nowrap">
                {["Ist-Zustand", "Priorität", "Release", "Prüfung"].map((label, index) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-dark/25 bg-white/60 font-mono text-[9px] font-bold text-primary-dark">0{index + 1}</span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-dark/50">{label}</span>
                    {index < 3 && <span className="hidden h-px w-5 bg-dark/20 sm:block" aria-hidden="true" />}
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-dark/35">Arbeitsprinzip · kein vorgetäuschter Performance-Graph</p>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden border-2 border-dark bg-dark shadow-[16px_16px_0_rgba(212,168,83,.7)]">
              <Image
                src="/images/seo-betreuung-work-session-v2.webp"
                alt="Zwei Spezialisten prüfen Suchdaten und den Maßnahmenplan einer laufenden SEO Betreuung"
                fill
                priority
                sizes="(min-width:1024px) 38vw,100vw"
                className="object-cover object-[58%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/15" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/30 bg-black/20 px-5 py-3 text-white backdrop-blur-sm">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]">Working Session</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-secondary">Mensch + System</span>
              </div>

              <svg className="absolute inset-x-[8%] bottom-[19%] h-[34%] w-[84%]" viewBox="0 0 420 150" fill="none" aria-hidden="true">
                <path className="betreuung-signal-path" d="M12 126C72 118 88 92 142 99s82 27 127-17 75-60 139-70" stroke="#D4A853" strokeWidth="2" />
                {[12, 142, 269, 408].map((x, index) => {
                  const y = [126, 99, 82, 12][index];
                  return <circle key={x} className="betreuung-signal-dot" cx={x} cy={y} r="6" fill={index === 3 ? "#D4A853" : "#C2722A"} style={{ animationDelay: `${index * .3}s` }} />;
                })}
              </svg>

              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 border-t border-white/20 bg-black/40 p-5 text-white backdrop-blur-sm">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-white/45">Sichtbarer Output</span>
                  <p className="mt-1 font-[family-name:var(--font-heading)] text-xl font-bold">Befund · Änderung · Lernschritt</p>
                </div>
                <span className="border border-secondary px-2.5 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-secondary">laufend</span>
              </figcaption>
            </div>

            <div className="absolute -bottom-7 -left-3 w-[74%] border-2 border-dark bg-white p-4 shadow-[8px_8px_0_rgba(194,114,42,.35)] sm:-left-7 sm:w-[68%]">
              <div className="flex items-center justify-between border-b border-dark/20 pb-2">
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.17em] text-primary-dark">Muster-Arbeitsakte</span>
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">01</span>
                <p className="text-xs font-semibold leading-relaxed text-dark/65">Eine Priorität.<br />Ein prüfbarer Output.</p>
              </div>
            </div>
          </figure>
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
        <div className="grid gap-8 border-b-2 border-dark pb-9 lg:grid-cols-[minmax(0,.618fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary-dark">Priorisierung statt Paket</span>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.02] text-dark sm:text-5xl">
              Welcher Engpass kostet gerade Sichtbarkeit?
            </h2>
          </div>
          <p className="max-w-2xl text-[16px] leading-relaxed text-muted lg:justify-self-end">
            Gute SEO Betreuung beginnt nicht mit einer Standardliste. Wählen Sie die Ausgangslage, die Ihrer Website am nächsten kommt. Das Modell zeigt, welche Frage zuerst beantwortet werden muss – nicht automatisch die endgültige Ursache.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,.618fr)_minmax(0,1fr)] lg:gap-12">
          <div className="relative min-h-[520px] overflow-hidden border-2 border-dark bg-dark p-5 text-white sm:p-8">
            <div className="absolute inset-0 opacity-20" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
            <svg className="pointer-events-none absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)]" viewBox="0 0 420 460" fill="none" aria-hidden="true">
              <path d="M210 46C315 46 382 128 382 230S315 414 210 414 38 332 38 230 105 46 210 46Z" stroke="rgba(255,255,255,.18)" />
              <path d="M210 86C286 86 338 147 338 230s-52 144-128 144S82 313 82 230 134 86 210 86Z" stroke="#D4A853" strokeOpacity=".52" strokeDasharray="3 8" />
              <path d="M210 46v368M38 230h344" stroke="rgba(255,255,255,.1)" />
              <circle cx="210" cy="230" r="49" fill="#F5F0E9" />
              <circle cx="210" cy="230" r="61" stroke="#C2722A" strokeOpacity=".7" />
            </svg>
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center text-dark">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary-dark">Fokus</span>
              <strong className="mt-1 font-[family-name:var(--font-heading)] text-3xl">0{active + 1}</strong>
            </div>

            <div className="relative grid min-h-[450px] grid-cols-2 content-between gap-4" role="tablist" aria-label="SEO-Ausgangslage auswählen">
              {DIAGNOSES.map((entry, index) => (
                <button
                  key={entry.key}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  onClick={() => setActive(index)}
                  className={`group flex min-h-28 flex-col justify-between border p-4 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${active === index ? "border-secondary bg-secondary text-dark" : "border-white/20 bg-dark/80 text-white hover:border-white/50"}`}
                >
                  <span className="flex items-center justify-between">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d={entry.glyph} /></svg>
                    <span className="font-mono text-[9px]">0{index + 1}</span>
                  </span>
                  <span className="mt-5 text-sm font-bold leading-tight">{entry.label}</span>
                </button>
              ))}
            </div>
            <p className="relative mt-5 font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">Interaktives Diagnosemodell · keine automatische Analyse</p>
          </div>

          <div key={item.key} className="self-start border-2 border-dark bg-white shadow-[14px_14px_0_rgba(194,114,42,.25)]" role="tabpanel" aria-live="polite">
            <div className="flex items-center justify-between border-b-2 border-dark bg-[#F5F0E9] px-5 py-4 sm:px-7">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-dark/55">Prioritätenakte / 0{active + 1}</span>
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary-dark">Beobachtetes Signal</span>
              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-dark sm:text-4xl">{item.signal}</h3>
              <div className="mt-8 divide-y divide-dark/15 border-y-2 border-dark">
                {[
                  ["Erste Prüfung", item.firstCheck],
                  ["Erster Zug", item.firstMove],
                  ["Sichtbarer Beleg", item.proof],
                ].map(([label, copy], index) => (
                  <div key={label} className="grid gap-2 py-5 sm:grid-cols-[112px_1fr]">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-primary-dark">0{index + 1} · {label}</span>
                    <p className="text-sm leading-relaxed text-dark/65">{copy}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[13px] leading-relaxed text-muted">
                Der genaue Fokus entsteht aus Ihren Daten. Genau darin unterscheidet sich laufende SEO Betreuung von einem vorab gefüllten Maßnahmenpaket.
              </p>
            </div>
          </div>
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
