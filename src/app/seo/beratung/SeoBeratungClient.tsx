"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "@/app/components/SubpageLayout";

/* ═══════════════════════════════════════════════════════════════════════════
   SEO BERATUNG — Kompletter Neubau (Swiss-Editorial im SeoForge-System)
   Hero: hell, Foto-Komposition mit Notiz-Karte, ZWEI Zeilen H1, keine App.
   App 1: Hebel-Matrix (Wirkung × Aufwand) — Priorisierung zum Anfassen.
   App 2: Beratungs-Kompass — zwei Fragen, ehrliche Empfehlung.
   Kontrast-Anker: 1× Ink-Klartext, 1× Terracotta-Band. Kein Fake-Trust.
═══════════════════════════════════════════════════════════════════════════ */

function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        }),
      { threshold: 0.22, rootMargin: "0px 0px -16% 0px" }
    );
    document.querySelectorAll(".scroll-hidden").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const grad = {
  background: "linear-gradient(92deg, #C2722A, #D4A853)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
};

const TINT = "#fbf4ea";
const TINT_BORDER = "#ecd3ba";
const BEIGE = "#F8F5F1";

/* ── FAQ — sichtbarer Text und JSON-LD bleiben identisch ──────────────────── */
const FAQ: { q: string; a: string }[] = [
  {
    q: "Was genau umfasst eine SEO Beratung bei SeoForge?",
    a: "Wir analysieren Ihre Website, Ihren Markt und Ihre Wettbewerber, priorisieren die Stellhebel nach Wirkung und Aufwand und sprechen klare Empfehlungen aus — inklusive der unbequemen. Sie erhalten keine Folien mit Allgemeinplätzen, sondern konkrete Entscheidungsgrundlagen: was zuerst, was später, was gar nicht.",
  },
  {
    q: "Worin unterscheidet sich Beratung von laufender SEO-Betreuung?",
    a: "Beratung liefert Klarheit und Richtung — Sie oder Ihr Team setzen um. Betreuung heißt: Wir übernehmen die Umsetzung dauerhaft selbst. Viele Kunden starten mit einer Beratung und entscheiden danach, welchen Teil sie intern stemmen und welchen sie an uns geben. Beides ist monatlich kündbar.",
  },
  {
    q: "Für wen lohnt sich SEO Beratung — und für wen nicht?",
    a: "Sie lohnt sich, wenn intern jemand umsetzen kann und Orientierung fehlt: Marketing-Teams, Gründer mit technischem Zugriff, Redaktionen. Sie lohnt sich nicht, wenn niemand Zeit für die Umsetzung hat — dann verpufft der beste Plan. In dem Fall ist laufende Betreuung ehrlicherweise die bessere Wahl.",
  },
  {
    q: "Mit welchen Tools arbeiten Sie in der Beratung?",
    a: "Semrush und Ahrefs für Keyword-, Wettbewerbs- und Backlink-Daten, Google Search Console und Google Analytics für Ihre echten Suchanfragen und Nutzersignale, dazu eigene Crawls für den Technik-Blick. Sie sehen in der Beratung die Daten, nicht nur unsere Schlussfolgerungen.",
  },
  {
    q: "Was kostet eine SEO Beratung?",
    a: "Das hängt vom Umfang ab: Ein einmaliger Audit mit Strategiegespräch ist anders kalkuliert als eine laufende monatliche Begleitung. Nach dem kostenlosen Erstgespräch erhalten Sie ein konkretes Angebot mit klarem Leistungsumfang — Festpreis für Einmaliges, monatlich kündbar für Laufendes. Versteckte Posten gibt es nicht.",
  },
  {
    q: "Wie schnell bekommen wir erste Ergebnisse aus der Beratung?",
    a: "Die Beratung selbst liefert sofort Ergebnisse: Nach dem ersten Termin wissen Sie, wo Ihre größten Hebel liegen und was Sie diese Woche anpacken können. Wie schnell Rankings darauf reagieren, hängt von Umsetzung und Wettbewerb ab — seriös sind erste messbare Bewegungen nach einigen Wochen, nicht Tagen.",
  },
  {
    q: "Geben Sie Ranking-Garantien?",
    a: "Nein — und wir raten Ihnen, jedem zu misstrauen, der das tut. Rankings entscheidet Google, nicht die Agentur. Was wir garantieren können: saubere Analyse auf echten Daten, ehrliche Priorisierung und Empfehlungen, hinter denen wir stehen, weil wir sie in eigenen Projekten selbst so umsetzen.",
  },
  {
    q: "Können Sie unser internes Team langfristig begleiten?",
    a: "Ja. Viele Beratungen laufen als monatliches Sparring: Ihr Team setzt um, wir prüfen, priorisieren nach und beantworten Fragen innerhalb von 24 Stunden. So bauen Sie internes SEO-Wissen auf, ohne teure Umwege über Trial-and-Error.",
  },
];

/* ── App 1: Hebel-Matrix — beispielhafte Einordnung typischer Maßnahmen ───── */
type Hebel = {
  key: string;
  label: string;
  /** Position in der Matrix: x = Aufwand (0–100), y = Wirkung (0–100) */
  x: number;
  y: number;
  text: string;
};

const HEBEL: Hebel[] = [
  {
    key: "technik",
    label: "Technik-Fixes",
    x: 30,
    y: 78,
    text: "Indexierung, Ladezeit, saubere Struktur: oft mit überschaubarem Aufwand zu beheben — und die Grundlage, damit alles andere überhaupt wirken kann. In fast jeder Beratung der erste Blick.",
  },
  {
    key: "content",
    label: "Content-Ausbau",
    x: 72,
    y: 88,
    text: "Der stärkste Hebel für nachhaltige Sichtbarkeit — aber auch der aufwendigste. Die Beratung klärt, welche Themen sich für Ihr Geschäft wirklich rechnen, bevor Budget in Texte fließt.",
  },
  {
    key: "intern",
    label: "Interne Verlinkung",
    x: 22,
    y: 62,
    text: "Bestehende Stärke besser verteilen statt Neues bauen: häufig einer der am meisten unterschätzten Hebel, weil er ohne neue Inhalte auskommt und schnell umsetzbar ist.",
  },
  {
    key: "snippets",
    label: "Titles & Snippets",
    x: 14,
    y: 42,
    text: "Bessere Klickraten auf vorhandene Rankings — kleiner Eingriff, sichtbarer Effekt. Selten kriegsentscheidend, aber fast immer ein sinnvoller früher Schritt.",
  },
  {
    key: "local",
    label: "Lokale Signale",
    x: 34,
    y: 55,
    text: "Unternehmensprofil, Bewertungen, konsistente Daten: für lokal suchende Kunden ein großer Hebel — für rein überregionale Anbieter dagegen kaum relevant. Genau solche Unterschiede klärt die Beratung.",
  },
  {
    key: "links",
    label: "Autorität & Verweise",
    x: 82,
    y: 70,
    text: "Wirkt stark, braucht aber Zeit und Substanz — gekaufte Abkürzungen rächen sich. In der Beratung prüfen wir zuerst, ob Autorität wirklich Ihr Engpass ist oder ob näherliegende Hebel brachliegen.",
  },
];

/* ── App 2: Beratungs-Kompass — zwei Fragen, ehrliche Empfehlung ──────────── */
type KompassErgebnis = {
  titel: string;
  text: string;
  href: string;
  linkLabel: string;
};

const KOMPASS: Record<string, KompassErgebnis> = {
  "einmalig|ja": {
    titel: "Audit + Strategie-Workshop",
    text: "Ihr Team kann umsetzen — es fehlt die Richtung. Ein tiefer Audit mit gemeinsamem Workshop liefert die priorisierte Grundlage, mit der Ihr Team eigenständig weiterarbeitet.",
    href: "/seo/audit",
    linkLabel: "Zum SEO-Audit",
  },
  "einmalig|nein": {
    titel: "Audit + Umsetzung durch uns",
    text: "Einmalige Klarheit, aber niemand für die Umsetzung? Dann kombinieren wir den Audit mit einem klar umrissenen Umsetzungspaket — die wichtigsten Maßnahmen setzen wir direkt selbst um.",
    href: "/seo/optimierung",
    linkLabel: "Zur SEO-Optimierung",
  },
  "laufend|ja": {
    titel: "Laufende Beratung als Sparring",
    text: "Ihr Team setzt um, wir begleiten: monatliches Sparring, Priorisierung, Antworten in unter 24 Stunden. So wächst internes Know-how, ohne dass Sie Umwege bezahlen.",
    href: "/kontakt",
    linkLabel: "Sparring anfragen",
  },
  "laufend|nein": {
    titel: "Komplette SEO-Betreuung",
    text: "Laufende Begleitung ohne interne Kapazität heißt ehrlicherweise: Die Umsetzung sollte gleich mit in unsere Hände. Genau dafür ist die monatliche Betreuung gebaut — kündbar jeden Monat.",
    href: "/seo/betreuung",
    linkLabel: "Zur SEO-Betreuung",
  },
};

/* ── Werkzeuge — echte Arbeitsmittel, ehrlich beschrieben ─────────────────── */
const WERKZEUGE: { name: string; logo?: string; wofuer: string }[] = [
  { name: "Semrush", logo: "/logos/semrush.svg", wofuer: "Keyword-Daten, Wettbewerber, Sichtbarkeitsverläufe" },
  { name: "Ahrefs", wofuer: "Backlink-Profile und Content-Lücken im Vergleich" },
  { name: "Search Console", logo: "/logos/googlesearchconsole.svg", wofuer: "Ihre echten Suchanfragen, Indexierung, Klickraten" },
  { name: "Google Analytics", logo: "/logos/googleanalytics.svg", wofuer: "Was Besucher nach dem Klick wirklich tun" },
  { name: "Google", logo: "/logos/google.svg", wofuer: "SERP-Features und Wettbewerbs-Realität, täglich geprüft" },
  { name: "ChatGPT", logo: "/logos/openai.svg", wofuer: "KI-Sichtbarkeit: Wird Ihre Marke zitiert?" },
  { name: "Perplexity", logo: "/logos/perplexity.svg", wofuer: "Quellen-Checks in der KI-Suche" },
  { name: "Gemini", logo: "/logos/gemini.svg", wofuer: "Googles KI-Antworten im Monitoring" },
];

export default function SeoBeratungClient() {
  useScrollReveal();

  const [hebel, setHebel] = useState<string>("technik");
  const [frage1, setFrage1] = useState<"einmalig" | "laufend" | null>(null);
  const [frage2, setFrage2] = useState<"ja" | "nein" | null>(null);
  const [openFaq, setOpenFaq] = useState<number>(0);

  const aktiverHebel = HEBEL.find((h) => h.key === hebel)!;
  const kompassErgebnis = frage1 && frage2 ? KOMPASS[`${frage1}|${frage2}`] : null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ══ HERO — hell, editorial: Zwei-Zeilen-H1, Foto-Komposition mit Notiz-Karte ══ */}
      <section className="relative overflow-hidden bg-offwhite">
        {/* Hintergrund-Verschönerung: feines Punktraster + ein Gold-Faden */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: "radial-gradient(rgba(26,26,26,0.10) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-[140%] w-[2px] rotate-[16deg] opacity-60"
          style={{ background: "linear-gradient(180deg, transparent, #D4A853 30%, #C2722A 70%, transparent)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 pt-12 lg:pt-16 pb-16 lg:pb-24">
          {/* Folio-Kopf */}
          <div className="hero-badge flex items-center justify-between border-b-2 border-dark pb-4">
            <span className="flex items-center gap-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-dark/60">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              SEO Beratung
            </span>
            <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.18em] text-dark/35">
              Leistungen / Beratung — SeoForge
            </span>
          </div>

          <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] gap-14 lg:gap-16 items-center">
            {/* Links — Typo */}
            <div>
              <h1 className="hero-title font-[family-name:var(--font-heading)] text-[38px] sm:text-5xl lg:text-[46px] xl:text-[52px] font-bold text-dark leading-[1.06] tracking-tight">
                SEO Beratung heißt:
                <br />
                <span style={grad}>entscheiden, was wirkt.</span>
              </h1>

              <p className="hero-description mt-7 max-w-xl text-lg lg:text-xl text-muted leading-relaxed">
                Die meisten Websites scheitern nicht an zu wenig Maßnahmen — sondern an den falschen zuerst.
                Wir analysieren auf echten Daten, priorisieren ehrlich und sagen auch, was Sie sich sparen können.
              </p>

              <div className="hero-cta mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
                >
                  Kostenloses Erstgespräch
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
                <a
                  href="#kompass"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-dark px-8 py-[14px] font-semibold text-dark transition-colors hover:bg-dark hover:text-white"
                >
                  Was passt zu uns?
                </a>
              </div>

              {/* Echte Fakten + Werkzeug-Zeile statt Zahlen-Deko */}
              <div className="hero-cta mt-10 border-t border-border pt-6">
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {["Kostenloses Erstgespräch", "Antwort in unter 24 h", "Monatlich kündbar"].map((f) => (
                    <span key={f} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-dark/55">
                      <span className="h-[2px] w-4 bg-primary/70" aria-hidden="true" />
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-dark/40">Beratung auf echten Daten:</span>
                  {WERKZEUGE.slice(0, 4).map((t) => (
                    <span key={t.name} className="flex items-center gap-1.5" title={t.wofuer}>
                      {t.logo ? (
                        <Image src={t.logo} alt={`${t.name} — Datenquelle unserer SEO Beratung`} width={13} height={13} className="h-[13px] w-[13px] object-contain opacity-60" />
                      ) : (
                        <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-dark/40" />
                      )}
                      <span className="text-[11px] font-semibold text-dark/55">{t.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Rechts — Foto-Komposition: Portrait + überlappende Gesprächsnotiz */}
            <div className="hero-dashboard relative mx-auto w-full max-w-[440px] lg:max-w-none">
              <figure className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-dark shadow-[0_36px_80px_-32px_rgba(26,26,26,0.5)]">
                  <Image
                    src="/images/beratung-hero.webp"
                    alt="SEO-Beraterin erklärt einem Kunden am Tisch die Auswertung — ausgedruckte Analysen und Laptop zwischen ihnen"
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* Überlappende Notiz-Karte — Papier auf Foto */}
                <div
                  className="absolute -bottom-8 -left-3 w-[240px] rotate-[-2deg] rounded-xl border bg-white p-4 shadow-[0_24px_50px_-20px_rgba(26,26,26,0.45)] sm:-left-8 sm:w-[260px]"
                  style={{ borderColor: TINT_BORDER }}
                >
                  <span className="flex items-center justify-between border-b border-dashed pb-2" style={{ borderColor: TINT_BORDER }}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dark/45">Notiz · Erstgespräch</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  </span>
                  <span className="mt-3 block space-y-2">
                    {[
                      ["1.", "Indexierung reparieren"],
                      ["2.", "3 Geldseiten zuerst"],
                      ["3.", "Blog erst ab Monat 2"],
                    ].map(([n, t]) => (
                      <span key={t} className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] font-bold text-primary">{n}</span>
                        <span className="font-[family-name:var(--font-heading)] text-[15px] font-bold leading-snug text-dark">{t}</span>
                      </span>
                    ))}
                  </span>
                  <span
                    className="mt-3 block border-t border-dashed pt-2 font-mono text-[8.5px] uppercase tracking-[0.14em] text-dark/35"
                    style={{ borderColor: TINT_BORDER }}
                  >
                    Priorisiert nach Wirkung ÷ Aufwand
                  </span>
                </div>

                <figcaption className="mt-12 flex items-baseline gap-2 pl-1 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40">
                  <span className="h-[2px] w-5 shrink-0 self-center bg-primary/60" aria-hidden="true" />
                  Beratung heißt bei uns: gemeinsam vor den echten Zahlen sitzen.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 01 WAS BERATUNG LEISTET — Editorial mit Drop-Cap + eingebettetem Foto ══ */}
      <section className="border-t border-border bg-white py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden max-w-3xl">
            <span className="mb-4 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-[2px] w-7 bg-dark" aria-hidden="true" />
              01 — Worum es geht
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
              Nicht mehr Maßnahmen. <span style={grad}>Die richtigen.</span>
            </h2>
          </div>

          {/* Golden-Ratio-Split: Text 62 / Bild+Zitat 38 */}
          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.618fr_1fr] lg:gap-16 items-start">
            <div className="space-y-6">
              <p className="scroll-hidden rv-blur text-[15px] lg:text-base text-muted leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:font-[family-name:var(--font-heading)] first-letter:text-[54px] first-letter:font-bold first-letter:leading-[0.85] first-letter:text-primary">
                Wer SEO Beratung sucht, hat selten zu wenig Ideen — sondern zu viele. Technik prüfen, Texte schreiben,
                Backlinks aufbauen, Ladezeit drücken: Alles klingt sinnvoll, alles kostet Zeit oder Geld. Die eigentliche
                Beratungsleistung ist deshalb keine Liste mit hundert Empfehlungen. Sie ist die Entscheidung, welche fünf
                davon Ihr Geschäft messbar voranbringen — und in welcher Reihenfolge.
              </p>
              <p className="scroll-hidden rv-blur text-[15px] lg:text-base text-muted leading-relaxed" style={{ transitionDelay: "110ms" }}>
                Dafür schauen wir nicht auf Bauchgefühl, sondern auf Daten: Ihre Search Console zeigt, wofür Google Sie
                heute schon ernst nimmt. Semrush und Ahrefs zeigen, wo Wettbewerber verwundbar sind. Ein eigener Crawl
                zeigt, was Ihre Website technisch bremst. Aus diesen drei Blickwinkeln entsteht eine Priorisierung, die
                Sie verstehen und intern vertreten können — auch gegenüber Geschäftsführung oder Team.
              </p>
              <p className="scroll-hidden rv-blur text-[15px] lg:text-base text-muted leading-relaxed" style={{ transitionDelay: "180ms" }}>
                Und weil wir als{" "}
                <Link href="/seo-agentur" className="text-primary font-semibold hover:underline">
                  SEO Agentur
                </Link>{" "}
                täglich selbst umsetzen, bleibt die Beratung praxisnah: Jede Empfehlung haben wir in eigenen Projekten
                schon gebaut, getestet und gemessen. Was in der Praxis nicht funktioniert, empfehlen wir nicht — egal wie
                gut es in einer Präsentation aussähe.
              </p>
            </div>

            <div className="space-y-6">
              <figure className="scroll-hidden rv-right">
                <div className="relative aspect-[1.618/1] overflow-hidden rounded-2xl border border-border shadow-[0_28px_55px_-30px_rgba(26,26,26,0.35)]">
                  <Image
                    src="/images/beratung-detail.webp"
                    alt="Hände zeigen auf ausgedruckte Auswertungen auf einem Holztisch — daneben Notizbuch und Kaffee"
                    fill
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40">
                  <span className="h-[2px] w-5 shrink-0 self-center bg-primary/60" aria-hidden="true" />
                  Zahlen auf dem Tisch — nicht im Anhang.
                </figcaption>
              </figure>
              <blockquote
                className="scroll-hidden rv-scale rounded-2xl border p-6"
                style={{ background: TINT, borderColor: TINT_BORDER, transitionDelay: "140ms" }}
              >
                <p className="font-[family-name:var(--font-heading)] text-xl font-bold leading-snug text-dark">
                  „Die teuerste SEO-Maßnahme ist die richtige Maßnahme zur falschen Zeit.“
                </p>
                <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/45">
                  Grundsatz jeder SeoForge-Beratung
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 02 APP 1: HEBEL-MATRIX — Priorisierung zum Anfassen ══ */}
      <section className="py-20 lg:py-28 overflow-x-clip" style={{ background: BEIGE }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16 items-start">
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <span className="mb-4 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-[2px] w-7 bg-dark" aria-hidden="true" />
                02 — Das Kernwerkzeug
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
                Priorisierung ist die halbe <span style={grad}>SEO Beratung.</span>
              </h2>
              <p className="mt-5 text-muted leading-relaxed">
                Jede Maßnahme hat einen Platz im Verhältnis von Wirkung zu Aufwand — und der ist für jede Website
                anders. Klicken Sie sich durch typische Hebel: So denken wir, wenn wir Ihre Prioritäten festlegen.
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40">
                Beispielhafte Einordnung — Ihre echte Matrix entsteht im Gespräch.
              </p>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              {/* Hebel-Auswahl */}
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Typische SEO-Hebel">
                {HEBEL.map((h) => (
                  <button
                    key={h.key}
                    role="tab"
                    aria-selected={hebel === h.key}
                    onClick={() => setHebel(h.key)}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
                      hebel === h.key
                        ? "border-dark bg-dark text-white shadow-[0_10px_24px_-10px_rgba(26,26,26,0.5)]"
                        : "border-border bg-white text-dark/60 hover:border-dark/40 hover:text-dark"
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>

              {/* Matrix */}
              <div className="mt-6 overflow-hidden rounded-2xl border-2 border-dark bg-white shadow-[0_32px_70px_-30px_rgba(26,26,26,0.4)]">
                <div className="flex items-center justify-between border-b-2 border-dark bg-offwhite px-5 py-3">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-dark/60">Wirkung × Aufwand</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dark/35">Illustrativ</span>
                </div>
                <div className="grid md:grid-cols-[1.2fr_1fr]">
                  {/* Koordinatenfeld */}
                  <div className="relative aspect-square p-6 pl-10 md:aspect-[1.1/1]">
                    <div className="absolute inset-6 left-10 rounded-xl border border-border" aria-hidden="true">
                      <span className="absolute left-0 top-1/2 h-px w-full bg-border" />
                      <span className="absolute left-1/2 top-0 h-full w-px bg-border" />
                      <span className="absolute left-0 top-0 h-1/2 w-1/2 rounded-tl-xl" style={{ background: "rgba(212,168,83,0.10)" }} />
                      <span className="absolute left-2 top-2 font-mono text-[8.5px] uppercase tracking-[0.14em] text-primary/70">Zuerst</span>
                      <span className="absolute bottom-2 right-2 font-mono text-[8.5px] uppercase tracking-[0.14em] text-dark/30">Später / prüfen</span>
                    </div>
                    <span
                      className="absolute left-0 top-1/2 origin-center -rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-dark/40"
                      style={{ transform: "translate(-30%, -50%) rotate(-90deg)" }}
                    >
                      Wirkung ↑
                    </span>
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.18em] text-dark/40">
                      Aufwand →
                    </span>
                    <div className="absolute inset-6 left-10">
                      {HEBEL.map((h) => {
                        const aktiv = h.key === hebel;
                        return (
                          <button
                            key={h.key}
                            onClick={() => setHebel(h.key)}
                            aria-label={`${h.label} in der Matrix auswählen`}
                            className="absolute -translate-x-1/2 translate-y-1/2 cursor-pointer transition-all duration-500"
                            style={{ left: `${h.x}%`, bottom: `${h.y}%` }}
                          >
                            <span
                              className={`block rounded-full transition-all duration-500 ${
                                aktiv ? "h-5 w-5 ring-4 ring-primary/25" : "h-2.5 w-2.5 opacity-40 hover:opacity-80"
                              }`}
                              style={{ background: aktiv ? "linear-gradient(135deg, #C2722A, #D4A853)" : "#1A1A1A" }}
                            />
                            {aktiv && (
                              <span
                                className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full border bg-white px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-dark shadow-sm"
                                style={{ borderColor: TINT_BORDER }}
                              >
                                {h.label}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {/* Erklärung */}
                  <div className="flex flex-col justify-between border-t-2 border-dark bg-offwhite p-6 md:border-l-2 md:border-t-0">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{aktiverHebel.label}</span>
                      <p className="mt-3 text-[14.5px] leading-relaxed text-dark/75">{aktiverHebel.text}</p>
                    </div>
                    <p className="mt-6 border-t border-border pt-4 font-mono text-[9.5px] uppercase tracking-[0.14em] leading-relaxed text-dark/40">
                      Im Erstgespräch ordnen wir Ihre Website ein — kostenlos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 03 LEISTUNGS-DOSSIER — Dot-Leader-Blatt statt Karten-Grid ══ */}
      <section className="bg-white py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-10 max-w-3xl lg:mb-14">
            <span className="mb-4 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-[2px] w-7 bg-dark" aria-hidden="true" />
              03 — Die Beratungsfelder
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
              Was auf den Tisch kommt — <span style={grad}>Position für Position.</span>
            </h2>
          </div>

          <div
            className="scroll-hidden rv-scale overflow-hidden rounded-2xl border-2 border-dark shadow-[0_36px_80px_-32px_rgba(26,26,26,0.4)]"
            style={{ background: BEIGE }}
          >
            <div className="flex items-center justify-between border-b-2 border-dark bg-dark px-6 py-4 lg:px-8">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Beratungs-Dossier · SeoForge</span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-secondary">7 Positionen</span>
            </div>
            <div className="divide-y divide-[#e5ddd2] px-6 lg:px-8">
              {[
                { pos: "01", t: "Technik-Audit", d: "Crawling, Indexierung, Ladezeit, Struktur — was Google am Zugriff hindert", hinweis: "Eigener Crawl + Search Console" },
                { pos: "02", t: "Keyword- & Marktanalyse", d: "Wo echte Nachfrage liegt und welche Begriffe sich für Sie rechnen", hinweis: "Semrush · Ahrefs" },
                { pos: "03", t: "Wettbewerbs-Blick", d: "Was rankende Mitbewerber richtig machen — und wo sie verwundbar sind", hinweis: "Gap-Analyse" },
                { pos: "04", t: "Content-Strategie", d: "Welche Inhalte fehlen, welche kannibalisieren, welche Sie löschen dürfen", hinweis: "Priorisierter Themenplan" },
                { pos: "05", t: "Interne Struktur", d: "Verlinkung und Seitenarchitektur, die vorhandene Stärke richtig verteilt", hinweis: "Oft der schnellste Hebel" },
                { pos: "06", t: "KI-Sichtbarkeit", d: "Ob ChatGPT & Co. Ihre Marke kennen — und was dafür fehlt", hinweis: "GEO-Check inklusive" },
                { pos: "07", t: "Priorisierte Empfehlung", d: "Alles zusammengeführt: was zuerst, was später, was gar nicht", hinweis: "Ihr Fahrplan, Ihr Tempo" },
              ].map((row, i) => (
                <div
                  key={row.pos}
                  className="scroll-hidden rv-blur flex flex-wrap items-baseline gap-x-4 gap-y-1 py-5 lg:flex-nowrap lg:py-6"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-primary">POS {row.pos}</span>
                  <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark lg:text-xl">{row.t}</span>
                  <span className="mx-2 hidden flex-1 border-b border-dotted border-dark/25 lg:block" aria-hidden="true" />
                  <span className="w-full text-sm text-muted lg:w-auto lg:max-w-[38%] lg:text-right">{row.d}</span>
                  <span
                    className="hidden shrink-0 rounded-full border bg-white px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-dark/45 xl:inline-block"
                    style={{ borderColor: TINT_BORDER }}
                  >
                    {row.hinweis}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-dark bg-white px-6 py-4 lg:px-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dark/45">
                Umfang je nach Ausgangslage — festgelegt im Erstgespräch
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                <span className="h-[2px] w-5 bg-primary/60" aria-hidden="true" />
                Keine Position ohne Begründung
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 04 INK-KLARTEXT — Kontrast-Anker 1 ══ */}
      <section className="bg-dark py-24 lg:py-32 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <span className="scroll-hidden mb-8 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
            <span className="h-[2px] w-7 bg-secondary" aria-hidden="true" />
            04 — Klartext
          </span>
          <blockquote className="scroll-hidden rv-blur max-w-[920px] font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[60px]">
            Gute SEO Beratung verkauft Ihnen keine Maßnahmen.{" "}
            <span style={{ background: "linear-gradient(92deg, #D4A853, #e0bc72)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Sie verhindert die falschen.
            </span>
          </blockquote>
          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <p className="scroll-hidden rv-left text-[15px] leading-relaxed text-white/60">
              Der häufigste Schaden im SEO entsteht nicht durch Nichtstun, sondern durch teure Aktivität ohne
              Fundament: Texte für Begriffe ohne Nachfrage. Backlink-Pakete für eine Website mit Technikproblemen.
              Ein Relaunch, der funktionierende Rankings zerstört. Unsere Beratung beginnt deshalb mit der Frage,
              was bei Ihnen schiefgehen könnte — bevor wir besprechen, was gut werden soll.
            </p>
            <p className="scroll-hidden rv-right text-[15px] leading-relaxed text-white/60" style={{ transitionDelay: "120ms" }}>
              Deshalb bekommen Sie von uns auch Empfehlungen, die uns nichts verkaufen: Wenn Ihr Engpass ein
              interner Prozess ist, sagen wir das. Wenn eine Maßnahme warten sollte, bis die Grundlage steht, sagen
              wir das auch. Beratung, die jedes Problem mit einem eigenen Angebot beantwortet, ist Vertrieb — keine
              Beratung.
            </p>
          </div>
          <div className="scroll-hidden mt-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.16em] text-white/50" style={{ transitionDelay: "180ms" }}>
            <span className="h-[2px] w-8 bg-secondary" aria-hidden="true" />
            SeoForge — Beratung von Praktikern, nicht von Folien
          </div>
        </div>
      </section>

      {/* ══ 05 ABLAUF — Ghost-Ziffern-Editorial (bewusst keine Timeline-Optik) ══ */}
      <section className="py-20 lg:py-28 overflow-x-clip" style={{ background: BEIGE }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-10 max-w-3xl lg:mb-14">
            <span className="mb-4 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-[2px] w-7 bg-dark" aria-hidden="true" />
              05 — So läuft es ab
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
              Vier Gespräche, <span style={grad}>null Folien-Theater.</span>
            </h2>
          </div>

          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-2">
            {[
              {
                z: "1",
                t: "Erstgespräch — kostenlos",
                d: "30 Minuten, Ihre Website im Blick: Wo stehen Sie, was ist das Ziel, lohnt sich Beratung überhaupt? Wenn nicht, sagen wir es in diesem Gespräch — und Sie haben nichts bezahlt.",
                meta: "Video-Call oder Telefon · Antwort auf Ihre Anfrage in unter 24 h",
              },
              {
                z: "2",
                t: "Analyse auf echten Daten",
                d: "Wir verbinden die Search Console, ziehen Semrush- und Ahrefs-Daten und crawlen Ihre Website. Sie müssen nichts vorbereiten außer einem Zugriff — den Rest übernehmen wir.",
                meta: "Ihre Daten bleiben Ihre Daten — Zugriffe werden nach Projektende entfernt",
              },
              {
                z: "3",
                t: "Strategiegespräch",
                d: "Wir gehen die Befunde gemeinsam durch — am Bildschirm, an den echten Zahlen. Am Ende steht Ihre priorisierte Maßnahmenliste: was zuerst, was später, was gar nicht.",
                meta: "Verständlich für Geschäftsführung, konkret genug fürs Team",
              },
              {
                z: "4",
                t: "Umsetzung — Sie entscheiden wie",
                d: "Ihr Team setzt um, wir begleiten als Sparring. Oder wir übernehmen die Umsetzung selbst. Beides monatlich kündbar — Sie bleiben, weil es wirkt, nicht weil ein Vertrag läuft.",
                meta: "Sparring · Teilumsetzung · Komplett-Betreuung",
              },
            ].map((s, i) => (
              <div key={s.z} className="scroll-hidden rv-blur relative pl-16 lg:pl-20" style={{ transitionDelay: `${i * 90}ms` }}>
                <span
                  className="pointer-events-none absolute -top-3 left-0 select-none font-[family-name:var(--font-heading)] text-[80px] font-black leading-none lg:text-[96px]"
                  style={{ color: "rgba(194,114,42,0.14)" }}
                  aria-hidden="true"
                >
                  {s.z}
                </span>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark lg:text-2xl">{s.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.d}</p>
                <p className="mt-3 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/45">
                  <span className="h-[2px] w-4 shrink-0 self-center bg-primary/60" aria-hidden="true" />
                  {s.meta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 06 APP 2: BERATUNGS-KOMPASS — zwei Fragen, ehrliche Empfehlung ══ */}
      <section id="kompass" className="scroll-mt-24 bg-white py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16 items-start">
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <span className="mb-4 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-[2px] w-7 bg-dark" aria-hidden="true" />
                06 — Der Kompass
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
                Brauchen Sie überhaupt <span style={grad}>Beratung?</span>
              </h2>
              <p className="mt-5 text-muted leading-relaxed">
                Ehrliche Antwort: nicht jeder. Zwei Fragen zeigen, welches Modell zu Ihrer Situation passt —
                manchmal ist es ein einmaliger Audit, manchmal die volle Betreuung, manchmal nur ein Sparring.
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40">
                Zwei Klicks — keine E-Mail nötig, kein Formular.
              </p>
            </div>

            <div
              className="scroll-hidden rv-right overflow-hidden rounded-2xl border-2 border-dark bg-white shadow-[0_32px_70px_-30px_rgba(26,26,26,0.4)]"
              style={{ transitionDelay: "120ms" }}
            >
              <div className="flex items-center justify-between border-b-2 border-dark bg-offwhite px-5 py-3">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-dark/60">Beratungs-Kompass</span>
                {(frage1 || frage2) && (
                  <button
                    onClick={() => {
                      setFrage1(null);
                      setFrage2(null);
                    }}
                    className="cursor-pointer font-mono text-[9px] uppercase tracking-[0.16em] text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
                  >
                    Zurücksetzen
                  </button>
                )}
              </div>

              <div className="p-6 lg:p-8">
                {/* Frage 1 */}
                <div>
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-primary">F1</span>
                    <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">
                      Suchen Sie einmalige Klarheit oder laufende Begleitung?
                    </span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {(
                      [
                        ["einmalig", "Einmalige Klarheit"],
                        ["laufend", "Laufende Begleitung"],
                      ] as const
                    ).map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => setFrage1(val)}
                        aria-pressed={frage1 === val}
                        className={`cursor-pointer rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                          frage1 === val
                            ? "border-primary bg-primary text-white shadow-[0_12px_28px_-12px_rgba(194,114,42,0.6)]"
                            : "border-border bg-white text-dark/65 hover:border-dark/40 hover:text-dark"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frage 2 */}
                <div className={`mt-8 transition-opacity duration-500 ${frage1 ? "opacity-100" : "pointer-events-none opacity-30"}`}>
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-primary">F2</span>
                    <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">
                      Kann intern jemand die Umsetzung übernehmen?
                    </span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {(
                      [
                        ["ja", "Ja, Kapazität ist da"],
                        ["nein", "Nein, eher nicht"],
                      ] as const
                    ).map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => setFrage2(val)}
                        aria-pressed={frage2 === val}
                        disabled={!frage1}
                        className={`cursor-pointer rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                          frage2 === val
                            ? "border-primary bg-primary text-white shadow-[0_12px_28px_-12px_rgba(194,114,42,0.6)]"
                            : "border-border bg-white text-dark/65 hover:border-dark/40 hover:text-dark"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ergebnis */}
                <div
                  className={`mt-8 transition-all duration-500 ${kompassErgebnis ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                  aria-live="polite"
                >
                  {kompassErgebnis && (
                    <div className="rounded-2xl border p-6" style={{ background: TINT, borderColor: TINT_BORDER }}>
                      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                        Unsere ehrliche Empfehlung
                      </span>
                      <h3 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">{kompassErgebnis.titel}</h3>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{kompassErgebnis.text}</p>
                      <Link
                        href={kompassErgebnis.href}
                        className="mt-5 inline-flex items-center gap-2 border-b-2 border-primary/40 pb-0.5 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary"
                      >
                        {kompassErgebnis.linkLabel}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 07 WERKZEUGE — echte Tools, echte Verwendungszwecke ══ */}
      <section className="border-t border-border bg-white py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
            <div className="max-w-2xl">
              <span className="mb-4 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-[2px] w-7 bg-dark" aria-hidden="true" />
                07 — Werkzeuge & Datenquellen
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
                Sie sehen die Daten — <span style={grad}>nicht nur Schlussfolgerungen.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Jede Empfehlung in der Beratung hat eine Quelle. Das sind die Werkzeuge, mit denen wir täglich
              arbeiten — und wofür wir sie wirklich nutzen.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {WERKZEUGE.map((t, i) => (
              <div
                key={t.name}
                className="scroll-hidden rv-blur group bg-white p-6 transition-colors duration-300 hover:bg-offwhite"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="flex h-9 items-center">
                  {t.logo ? (
                    <Image
                      src={t.logo}
                      alt={`${t.name} Logo — Datenquelle unserer SEO Beratung`}
                      width={26}
                      height={26}
                      className="h-[26px] w-[26px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="font-[family-name:var(--font-heading)] text-xl font-black tracking-tight text-dark/70 transition-colors duration-300 group-hover:text-dark">
                      {t.name}
                    </span>
                  )}
                </div>
                <p className="mt-4 font-semibold text-dark">{t.name}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{t.wofuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 08 KOSTEN-LOGIK — drei Modelle, ohne erfundene Zahlen ══ */}
      <section className="py-20 lg:py-28 overflow-x-clip" style={{ background: BEIGE }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden mb-10 max-w-3xl lg:mb-14">
            <span className="mb-4 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-[2px] w-7 bg-dark" aria-hidden="true" />
              08 — Kosten, ehrlich erklärt
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
              Drei Modelle — <span style={grad}>und was Ihren Preis bestimmt.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-muted leading-relaxed">
              Pauschale Preislisten wären hier unseriös: Eine Fünf-Seiten-Website braucht anderes als ein Shop mit
              zehntausend URLs. Was wir Ihnen stattdessen geben: die Modelle, die Preistreiber — und nach dem
              Erstgespräch ein konkretes Angebot ohne versteckte Posten.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                t: "Einmaliger Audit + Strategie",
                fuer: "Für Teams, die selbst umsetzen",
                d: "Tiefenanalyse, Strategiegespräch, priorisierte Maßnahmenliste. Danach gehört der Fahrplan Ihnen — inklusive aller Rohdaten.",
                preislogik: "Festpreis nach Umfang der Website",
              },
              {
                t: "Laufendes Sparring",
                fuer: "Für Teams mit eigenem Tempo",
                d: "Monatliche Priorisierung, Review Ihrer Umsetzung, Antworten in unter 24 Stunden. Ihr Team wird jeden Monat selbstständiger.",
                preislogik: "Monatspauschale · monatlich kündbar",
              },
              {
                t: "Beratung + Umsetzung",
                fuer: "Wenn Kapazität fehlt",
                d: "Wir beraten nicht nur, wir bauen: Die wichtigsten Maßnahmen setzen wir direkt selbst um — Staging ab Tag 1, Änderungen in Minuten live.",
                preislogik: "Kombi-Angebot nach Erstgespräch",
              },
            ].map((m, i) => (
              <div
                key={m.t}
                className="scroll-hidden rv-blur flex flex-col rounded-2xl border-2 border-dark bg-white p-7 shadow-[0_24px_55px_-28px_rgba(26,26,26,0.35)]"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">{m.fuer}</span>
                <h3 className="mt-2.5 font-[family-name:var(--font-heading)] text-xl font-bold text-dark">{m.t}</h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-muted">{m.d}</p>
                <p className="mt-5 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-dark/50">{m.preislogik}</p>
              </div>
            ))}
          </div>

          <p className="scroll-hidden mt-8 max-w-2xl text-sm leading-relaxed text-muted">
            Was den Aufwand treibt: Größe und technischer Zustand der Website, Wettbewerbsdichte Ihres Marktes und
            wie viel Historie aufzuarbeiten ist. Was ihn senkt: unsere KI-gestützten Analysen und
            CI/CD-Infrastruktur — Routinearbeit kostet bei uns keine Beratungszeit. Einen Überblick, was SEO
            insgesamt kostet, gibt unser Ratgeber{" "}
            <Link href="/wissen/ratgeber/was-kostet-seo" className="text-primary font-semibold hover:underline">
              „Was kostet SEO?“
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ══ TERRACOTTA-BAND — Kontrast-Anker 2 ══ */}
      <section className="py-16 lg:py-20 overflow-x-clip" style={{ background: "#C2722A" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div className="scroll-hidden rv-left">
            <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">Nächster Schritt</span>
            <p className="font-[family-name:var(--font-heading)] text-2xl font-bold leading-[1.12] text-white lg:text-4xl">
              Erstgespräch kostenlos. Antwort in unter 24 Stunden. Danach entscheiden Sie.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="scroll-hidden rv-right inline-flex items-center gap-3 rounded-full bg-dark px-8 py-4 font-semibold text-white shadow-[0_18px_40px_-14px_rgba(26,26,26,0.55)] transition-colors hover:bg-[#2a2a2a]"
          >
            Erstgespräch anfragen <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ══ 09 WORAN SIE SERIÖSE BERATUNG ERKENNEN — Trust ohne Behauptungen ══ */}
      <section className="bg-white py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16 items-start">
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <span className="mb-4 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-[2px] w-7 bg-dark" aria-hidden="true" />
                09 — Woran Sie uns messen können
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
                Vertrauen entsteht durch <span style={grad}>Überprüfbares.</span>
              </h2>
              <p className="mt-5 text-muted leading-relaxed">
                Wir schmücken uns nicht mit Siegeln oder erfundenen Kundenzahlen. Stattdessen: fünf Kriterien, an
                denen Sie jede SEO Beratung prüfen können — unsere eingeschlossen. Fragen Sie im Erstgespräch
                danach; an den Antworten erkennen Sie den Unterschied.
              </p>
            </div>

            <div className="scroll-hidden rv-right divide-y divide-border border-y border-border" style={{ transitionDelay: "120ms" }}>
              {[
                {
                  t: "Zeigt Ihnen die Rohdaten",
                  d: "Seriöse Beratung legt Search-Console- und Tool-Daten offen, statt nur Interpretationen zu liefern. Sie sollten jede Empfehlung bis zur Quelle zurückverfolgen können.",
                },
                {
                  t: "Verspricht keine Platzierungen",
                  d: "Niemand kontrolliert Google. Wer Position 1 garantiert, verkauft ein Versprechen, das er nicht halten kann — oder Methoden, die Sie später teuer bezahlen.",
                },
                {
                  t: "Sagt auch, was Sie nicht tun sollten",
                  d: "Eine Beratung, die jedes Problem mit einem Zusatzangebot beantwortet, ist Vertrieb. Echte Priorisierung heißt: Manche Maßnahmen fallen raus.",
                },
                {
                  t: "Setzt selbst um, was sie empfiehlt",
                  d: "Empfehlungen von Praktikern unterscheiden sich von Folien-Wissen. Fragen Sie konkret: Haben Sie das selbst schon gebaut — und was kam dabei heraus?",
                },
                {
                  t: "Bindet Sie nicht über Verträge",
                  d: "Wer von seiner Arbeit überzeugt ist, braucht keine Mindestlaufzeit. Bei uns ist alles monatlich kündbar — die Zusammenarbeit trägt sich über Ergebnisse.",
                },
              ].map((k, i) => (
                <div key={k.t} className="scroll-hidden rv-blur group flex gap-5 py-6" style={{ transitionDelay: `${i * 70}ms` }}>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold text-primary ring-1 ring-border transition-all duration-300 group-hover:ring-primary/50"
                    style={{ background: TINT }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">{k.t}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{k.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10 FAQ — Accordion + FAQPage-Schema ══ */}
      <section className="py-20 lg:py-28 overflow-x-clip" style={{ background: BEIGE }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16 items-start">
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <span className="mb-4 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-[2px] w-7 bg-dark" aria-hidden="true" />
                10 — Häufige Fragen
              </span>
              <h2 className="mb-4 font-[family-name:var(--font-heading)] text-3xl font-bold leading-tight text-dark lg:text-4xl">
                Acht Fragen zur <span style={grad}>SEO Beratung.</span>
              </h2>
              <p className="text-muted leading-relaxed">
                Die Fragen aus echten Erstgesprächen — beantwortet, wie wir es auch am Telefon tun würden.
              </p>
              <aside
                className="scroll-hidden rv-blur mt-8 hidden rounded-2xl border bg-white p-6 shadow-[0_24px_50px_-28px_rgba(26,26,26,0.25)] lg:block"
                style={{ borderColor: TINT_BORDER, transitionDelay: "220ms" }}
              >
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-primary/70">Ihre Frage ist nicht dabei?</span>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  Stellen Sie sie direkt — ein fester Ansprechpartner antwortet innerhalb von 24 Stunden.
                </p>
                <Link
                  href="/kontakt"
                  className="mt-4 inline-flex items-center gap-2 border-b-2 border-primary/40 pb-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary"
                >
                  Frage stellen <span aria-hidden="true">→</span>
                </Link>
              </aside>
            </div>

            <div className="scroll-hidden rv-right overflow-hidden rounded-2xl border border-border bg-white" style={{ transitionDelay: "120ms" }}>
              <div className="divide-y divide-border">
                {FAQ.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={f.q}>
                      <button
                        onClick={() => setOpenFaq(open ? -1 : i)}
                        aria-expanded={open}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-offwhite"
                      >
                        <span className="font-semibold text-dark">{f.q}</span>
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            open ? "rotate-45 border-primary bg-primary text-white" : "border-border text-dark/50"
                          }`}
                          aria-hidden="true"
                        >
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </button>
                      <div className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted">{f.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FINALE — dunkler Abschluss ══ */}
      <section id="kontakt" className="scroll-mt-20 bg-dark py-20 lg:py-28 overflow-x-clip">
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="scroll-hidden rv-blur font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.12] text-white sm:text-4xl lg:text-[46px]">
            Sprechen wir darüber, was bei Ihnen{" "}
            <span style={{ background: "linear-gradient(92deg, #D4A853, #e0bc72)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              zuerst Wirkung zeigt.
            </span>
          </h2>
          <p className="scroll-hidden mx-auto mt-5 max-w-xl leading-relaxed text-white/60" style={{ transitionDelay: "100ms" }}>
            Kostenloses Erstgespräch, ehrliche Einschätzung — auch wenn sie lautet, dass Sie uns noch nicht brauchen.
          </p>
          <div className="scroll-hidden mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ transitionDelay: "180ms" }}>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] transition-all hover:bg-primary-dark"
            >
              Erstgespräch anfragen
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/seo/audit"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-semibold text-white/85 transition-colors hover:border-white/50 hover:text-white"
            >
              Oder direkt zum SEO-Audit
            </Link>
          </div>
          <p className="scroll-hidden mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40" style={{ transitionDelay: "240ms" }}>
            Antwort &lt; 24 h · Monatlich kündbar · Keine versteckten Posten
          </p>
        </div>
      </section>
    </SubpageLayout>
  );
}
