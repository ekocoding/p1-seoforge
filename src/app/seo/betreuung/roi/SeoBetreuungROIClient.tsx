"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SubpageLayout from "@/app/components/SubpageLayout";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <div className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const CHANNELS = [
  {
    id: "seo",
    label: "SEO",
    title: "Eigene Seiten und organische Nachfrage aufbauen",
    text: "SEO verbessert technische Zugänglichkeit, Informationsarchitektur und Inhalte. Wirkung entsteht nicht auf Bestellung; veröffentlichte Assets können jedoch weiter auffindbar bleiben, solange sie erreichbar, relevant und wettbewerbsfähig sind.",
    control: "Geringere Kontrolle über Zeitpunkt und Position",
    measurement: "Impression → Klick → Session → Conversion → Deckungsbeitrag",
    fit: "Wenn wiederkehrende Suchnachfrage und eigene Inhalte strategisch wichtig sind",
  },
  {
    id: "ads",
    label: "Google Ads",
    title: "Nachfrage kurzfristig einkaufen und Botschaften testen",
    text: "Anzeigen können definierte Suchbegriffe, Zielseiten und Budgets direkt steuern. Die Sichtbarkeit hängt vom laufenden Media-Einsatz und Auktionsumfeld ab; der Kanal eignet sich deshalb gut für Tests und zeitkritische Nachfrage.",
    control: "Hohe Kontrolle über Ausspielung und Budget",
    measurement: "Impression → Klickkosten → Conversion → Deckungsbeitrag",
    fit: "Wenn Geschwindigkeit, Testbarkeit oder eine zeitlich begrenzte Kampagne zählt",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    title: "Bezahlte Tests und organischen Aufbau voneinander lernen lassen",
    text: "Ein Hybridmodell kann Suchbegriffe und Landingpage-Botschaften zunächst bezahlt testen. Organische Inhalte übernehmen nicht automatisch dieselbe Leistung, profitieren aber von besseren Hypothesen und klareren Conversion-Pfaden.",
    control: "Getrennte Budgets, gemeinsames Lernsystem",
    measurement: "Kanäle separat attribuieren, Suchintention und Conversion-Lernen verbinden",
    fit: "Wenn kurzfristige Nachfrage und langfristige Inhalte parallel benötigt werden",
  },
];

const VALUE_CHAIN = [
  {
    source: "Search Console",
    signal: "Impressionen & Klicks",
    question: "Werden relevante Suchanfragen erreicht und führen sie auf die richtige URL?",
  },
  {
    source: "Webanalyse",
    signal: "Sessions & Conversions",
    question: "Was tun organische Besucher auf der Website und welche Messung fehlt?",
  },
  {
    source: "CRM / Vertrieb",
    signal: "Qualifizierte Leads & Abschlüsse",
    question: "Welche Anfrage war tatsächlich passend und welchem Kanal wird sie zugerechnet?",
  },
  {
    source: "Controlling",
    signal: "Deckungsbeitrag & Kosten",
    question: "Welcher wirtschaftliche Beitrag bleibt nach variablen Kosten und SEO-Investition?",
  },
];

const faqs = [
  {
    q: "Wie wird der SEO-ROI berechnet?",
    a: "Für eine belastbare Modellrechnung wird der zurechenbare Deckungsbeitrag um die SEO-Gesamtkosten vermindert und die Differenz durch die SEO-Gesamtkosten geteilt. Umsatz allein reicht nicht: Variable Kosten, Lead-Qualität und Attribution müssen in die Annahmen einfließen.",
  },
  {
    q: "Wann wird SEO-ROI positiv?",
    a: "Dafür gibt es keinen seriösen allgemeinen Monat. Ausgangszustand, Wettbewerb, Freigabegeschwindigkeit, Nachfrage, Conversion-Pfad und Deckungsbeitrag unterscheiden sich stark. Sinnvoll ist eine Szenariorechnung mit mehreren Annahmen und später der Abgleich mit echten Daten.",
  },
  {
    q: "Ist dieser Rechner eine SEO-Prognose?",
    a: "Nein. Der Rechner verarbeitet ausschließlich die von Ihnen eingegebenen Annahmen. Er prognostiziert weder Rankings noch Traffic. Sein Zweck ist, sichtbar zu machen, welche zusätzlichen Sessions, Conversion-Rate, Attribution und Marge nötig wären, damit ein Szenario wirtschaftlich trägt.",
  },
  {
    q: "Warum wird mit Deckungsbeitrag statt Umsatz gerechnet?",
    a: "Umsatz enthält Kosten, die durch Verkauf oder Leistungserbringung entstehen. ROI soll den wirtschaftlichen Rückfluss der Investition zeigen. Deshalb ist ein realistischer Deckungsbeitrag pro Abschluss oder qualifiziertem Lead aussagekräftiger als der reine Bestell- oder Auftragswert.",
  },
  {
    q: "Was ist der Unterschied zwischen Traffic-Wert und SEO-ROI?",
    a: "Traffic-Wert schätzt, was vergleichbare Klicks in einem Werbekanal kosten könnten. Das ist kein Umsatz und kein Gewinn. SEO-ROI benötigt tatsächliche Conversions, Lead-Qualität, Deckungsbeitrag, Kosten und eine nachvollziehbare Attribution.",
  },
  {
    q: "Welche Daten brauche ich für eine spätere Auswertung?",
    a: "Mindestens sauber getrennte organische Sessions, definierte Conversions, CRM-Rückmeldung zur Lead-Qualität, bekannte SEO-Kosten und einen wirtschaftlichen Wert pro Ergebnis. Bei längeren Kaufzyklen braucht es zusätzlich eine persistente Zuordnung zwischen Erstkontakt und Abschluss.",
  },
];

function ChannelDecision() {
  const [active, setActive] = useState(0);
  const channel = CHANNELS[active];

  return (
    <section className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-7 border-b-2 border-dark pb-9 lg:grid-cols-[1fr_420px] lg:items-end lg:gap-16">
          <div>
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.23em] text-primary-dark">Kanalentscheidung</span>
            <h2 className="max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-dark lg:text-[52px]">
              SEO gegen Ads auszuspielen führt zur falschen Rechnung.
            </h2>
          </div>
          <p className="text-muted leading-relaxed">
            Beide Kanäle können dieselbe Nachfrage erreichen, besitzen aber andere
            Steuerungs- und Kostenlogiken. Wähle einen Modus für die saubere Abgrenzung.
          </p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[2rem] border border-dark/20 lg:grid-cols-[.62fr_1.38fr]">
          <div className="border-b border-dark/15 bg-[#F4EFE8] lg:border-b-0 lg:border-r" role="tablist" aria-label="Marketingkanal auswählen">
            {CHANNELS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="channel-panel"
                onClick={() => setActive(index)}
                className={`grid w-full grid-cols-[30px_1fr_auto] items-center gap-3 border-b border-dark/10 px-6 py-5 text-left last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary-dark ${active === index ? "bg-dark text-white" : "text-dark/55 hover:bg-white hover:text-dark"}`}
              >
                <span className={`font-mono text-[9px] font-bold ${active === index ? "text-secondary" : "text-primary-dark"}`}>{String(index + 1).padStart(2, "0")}</span>
                <span className="font-[family-name:var(--font-heading)] text-lg font-bold">{item.label}</span>
                <span className={active === index ? "text-secondary" : "text-dark/25"} aria-hidden="true">→</span>
              </button>
            ))}
          </div>

          <div id="channel-panel" role="tabpanel" className="min-h-[520px] bg-dark p-7 text-white sm:p-10 lg:p-12">
            <div key={channel.id} className="flex min-h-[420px] flex-col motion-safe:animate-[fadeIn_.25s_ease-out]">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Aktiver Modus · {channel.label}</span>
              <h3 className="mt-5 max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] sm:text-4xl">{channel.title}</h3>
              <p className="mt-5 max-w-2xl text-base leading-[1.8] text-white/58">{channel.text}</p>
              <div className="mt-auto grid gap-5 border-t border-white/15 pt-7 sm:grid-cols-3">
                {[
                  ["Steuerung", channel.control],
                  ["Messkette", channel.measurement],
                  ["Passt, wenn", channel.fit],
                ].map(([label, text]) => (
                  <div key={label} className="sm:border-l sm:border-white/10 sm:pl-4 first:border-l-0 first:pl-0">
                    <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-white/35">{label}</span>
                    <p className="mt-2 text-[13px] font-semibold leading-relaxed text-white/76">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoiCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(1500);
  const [additionalSessions, setAdditionalSessions] = useState(1000);
  const [conversionRate, setConversionRate] = useState(2);
  const [contributionPerConversion, setContributionPerConversion] = useState(250);
  const [attributionShare, setAttributionShare] = useState(70);
  const [effectiveMonths, setEffectiveMonths] = useState(6);

  const result = useMemo(() => {
    const totalInvestment = monthlyInvestment * 12;
    const conversionsPerMonth = additionalSessions * (conversionRate / 100);
    const attributedConversions = conversionsPerMonth * (attributionShare / 100) * effectiveMonths;
    const attributableContribution = attributedConversions * contributionPerConversion;
    const netReturn = attributableContribution - totalInvestment;
    const roi = totalInvestment > 0 ? (netReturn / totalInvestment) * 100 : 0;
    const breakEvenConversions = contributionPerConversion > 0 ? totalInvestment / contributionPerConversion : 0;
    return { totalInvestment, conversionsPerMonth, attributedConversions, attributableContribution, netReturn, roi, breakEvenConversions };
  }, [monthlyInvestment, additionalSessions, conversionRate, contributionPerConversion, attributionShare, effectiveMonths]);

  const formatMoney = (value: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
  const positive = result.roi >= 0;

  return (
    <section id="rechner" className="scroll-mt-24 bg-[#F4EFE8] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-7 border-b-2 border-dark pb-9 lg:grid-cols-[1fr_430px] lg:items-end lg:gap-16">
          <div>
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.23em] text-primary-dark">Interaktive Szenariorechnung</span>
            <h2 className="max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-dark lg:text-[52px]">
              SEO-ROI mit den eigenen Annahmen berechnen.
            </h2>
          </div>
          <p className="text-muted leading-relaxed">
            Die Startwerte sind nur ein veränderbares Rechenbeispiel — keine
            Branchenbenchmarks und keine Prognose. Setze deine tatsächlichen Kosten,
            Margen- und Attributionserwartungen ein.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.06fr_.94fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] border border-dark/20 bg-white">
            <div className="border-b border-dark/15 bg-dark px-7 py-5 text-white">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Ihre Eingaben · Horizont 12 Monate</span>
              <p className="mt-2 text-sm leading-relaxed text-white/55">Zusätzliche Sessions gelten nur für die von Ihnen gewählte Zahl wirksamer Monate.</p>
            </div>
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {[
                {
                  id: "investment",
                  label: "Monatliche SEO-Investition",
                  value: monthlyInvestment,
                  min: 100,
                  max: 10000,
                  step: 100,
                  suffix: "€",
                  set: setMonthlyInvestment,
                  help: "Agentur, interne Zeit, Tools und Produktion zusammenführen.",
                },
                {
                  id: "sessions",
                  label: "Zusätzliche organische Sessions / Monat",
                  value: additionalSessions,
                  min: 0,
                  max: 50000,
                  step: 100,
                  suffix: "",
                  set: setAdditionalSessions,
                  help: "Szenarioannahme — keine aus Budget abgeleitete Traffic-Prognose.",
                },
                {
                  id: "conversion",
                  label: "Conversion-Rate dieser Sessions",
                  value: conversionRate,
                  min: 0.1,
                  max: 20,
                  step: 0.1,
                  suffix: "%",
                  set: setConversionRate,
                  help: "Nur die auf dieser Seite definierte wirtschaftliche Conversion.",
                },
                {
                  id: "contribution",
                  label: "Deckungsbeitrag pro Conversion",
                  value: contributionPerConversion,
                  min: 1,
                  max: 20000,
                  step: 10,
                  suffix: "€",
                  set: setContributionPerConversion,
                  help: "Nicht Umsatz: variable Kosten vorher abziehen.",
                },
                {
                  id: "attribution",
                  label: "SEO zurechenbarer Anteil",
                  value: attributionShare,
                  min: 1,
                  max: 100,
                  step: 1,
                  suffix: "%",
                  set: setAttributionShare,
                  help: "Reduziert Ergebnisse, die auch andere Touchpoints beeinflussen.",
                },
                {
                  id: "months",
                  label: "Wirksame Monate im ersten Jahr",
                  value: effectiveMonths,
                  min: 1,
                  max: 12,
                  step: 1,
                  suffix: "",
                  set: setEffectiveMonths,
                  help: "Wie viele Monate der angenommene Zusatztraffic im Modell wirkt.",
                },
              ].map((input) => (
                <div key={input.id} className="bg-white p-6">
                  <label htmlFor={input.id} className="block text-sm font-bold text-dark">{input.label}</label>
                  <p className="mt-1 min-h-[42px] text-xs leading-relaxed text-muted">{input.help}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <input
                      id={input.id}
                      type="number"
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      value={input.value}
                      onChange={(event) => input.set(Number(event.target.value))}
                      className="min-w-0 flex-1 rounded-xl border border-border px-4 py-3 text-lg font-bold text-dark focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {input.suffix && <span className="font-mono text-xs font-bold text-primary-dark">{input.suffix}</span>}
                  </div>
                  <input
                    type="range"
                    aria-label={`${input.label} als Schieberegler`}
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    value={input.value}
                    onChange={(event) => input.set(Number(event.target.value))}
                    className="mt-4 h-2 w-full cursor-pointer accent-[#A35F22]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[2rem] bg-dark text-white shadow-[0_38px_90px_-48px_rgba(26,26,26,.95)]">
              <div className="border-b border-white/10 px-7 py-5">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Ergebnis · Szenario, keine Prognose</span>
              </div>
              <div className="p-7 sm:p-9">
                <div className={`rounded-2xl border p-6 ${positive ? "border-secondary/35 bg-secondary/10" : "border-red-300/25 bg-red-300/5"}`}>
                  <span className="text-xs text-white/45">Modellierter SEO-ROI</span>
                  <p className={`mt-2 font-[family-name:var(--font-heading)] text-5xl font-bold ${positive ? "text-secondary" : "text-red-300"}`}>{result.roi.toLocaleString("de-DE", { maximumFractionDigits: 1 })}%</p>
                  <p className="mt-3 text-xs leading-relaxed text-white/38">(zurechenbarer Deckungsbeitrag − SEO-Kosten) ÷ SEO-Kosten</p>
                </div>

                <div className="mt-7 border-y border-white/12">
                  {[
                    ["SEO-Gesamtkosten", formatMoney(result.totalInvestment)],
                    ["Conversions / wirksamem Monat", result.conversionsPerMonth.toLocaleString("de-DE", { maximumFractionDigits: 1 })],
                    ["Zurechenbare Conversions", result.attributedConversions.toLocaleString("de-DE", { maximumFractionDigits: 1 })],
                    ["Zurechenbarer Deckungsbeitrag", formatMoney(result.attributableContribution)],
                    ["Rückfluss nach Kosten", formatMoney(result.netReturn)],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-5 border-b border-white/10 py-3.5 text-sm last:border-b-0">
                      <span className="text-white/48">{label}</span>
                      <strong className="text-right text-white">{value}</strong>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-l-2 border-secondary pl-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">Break-even im Modell</span>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-white/78">
                    Erforderlich wären {result.breakEvenConversions.toLocaleString("de-DE", { maximumFractionDigits: 1 })} zurechenbare Conversions innerhalb des Betrachtungszeitraums.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SeoBetreuungROIClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO-ROI-Szenarioanalyse",
    provider: { "@type": "Organization", name: "SeoForge", url: "https://seoforge.de" },
    description: "Interaktive Szenariorechnung für Kosten, Deckungsbeitrag und Attribution einer SEO-Betreuung",
    url: "https://seoforge.de/seo/betreuung/roi",
    areaServed: { "@type": "Country", name: "Germany" },
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <section data-hero className="relative flex min-h-screen items-center overflow-hidden bg-dark">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:52px_52px]" />
          <div className="absolute -right-56 top-8 h-[620px] w-[620px] rounded-full bg-primary/20 blur-[150px]" />
          <div className="absolute -bottom-64 left-10 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[130px]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/35 bg-white/5 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
              SEO ROI · Szenario statt Versprechen
            </div>
            <h1 className="max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[64px]">
              SEO-ROI berechnen —
              <span className="mt-2 block text-secondary">ohne Wunschzahlen.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-white/65">
              Ein seriöses ROI-Modell beginnt nicht mit einem Branchenmultiplikator. Es
              verbindet SEO-Kosten, zusätzliche organische Sessions, Conversion-Rate,
              Deckungsbeitrag und Attribution. Der Rechner nutzt ausschließlich deine
              Eingaben und kennzeichnet seine Grenzen offen.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#rechner" className="inline-flex min-h-12 items-center justify-center rounded-full bg-secondary px-7 py-3.5 text-sm font-bold text-dark hover:bg-secondary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
                Eigene Annahmen einsetzen ↓
              </a>
              <Link href="/seo/betreuung" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white hover:border-white/55 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Zur SEO-Betreuung →
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.04] p-7 text-white backdrop-blur-sm sm:p-9">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Die Gleichung</span>
            <div className="mt-8 border-y border-white/15 py-7 text-center">
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold leading-relaxed text-white sm:text-3xl">
                zurechenbarer Deckungsbeitrag<br />− SEO-Gesamtkosten
              </p>
              <div className="mx-auto my-4 h-px max-w-sm bg-secondary/55" />
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white sm:text-3xl">SEO-Gesamtkosten</p>
            </div>
            <div className="mt-7 flex flex-col gap-3">
              {["Eigene Annahmen", "Attribution sichtbar", "Keine Ranking-Prognose"].map((label, index) => (
                <div key={label} className="flex items-center gap-3 text-sm text-white/58">
                  <span className="font-mono text-[9px] font-bold text-secondary">{String(index + 1).padStart(2, "0")}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4EFE8] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
            <div>
              <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.23em] text-primary-dark">Messkette vor Formel</span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-dark lg:text-[50px]">Wo SEO-Wert tatsächlich nachweisbar wird.</h2>
              <p className="mt-6 text-base leading-[1.8] text-muted">
                Rankings und Traffic sind Zwischensignale. Wirtschaftlicher ROI entsteht
                erst, wenn Datenquellen verbunden und ein Ergebnis bis zum Deckungsbeitrag
                verfolgt werden kann.
              </p>
            </div>

            <div className="border-y-2 border-dark bg-white">
              {VALUE_CHAIN.map((item, index) => (
                <div key={item.source} className="grid gap-3 border-b border-dark/15 p-6 last:border-b-0 sm:grid-cols-[34px_130px_1fr] sm:p-7">
                  <span className="font-mono text-[9px] font-bold text-primary-dark">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong className="block font-[family-name:var(--font-heading)] text-lg text-dark">{item.source}</strong>
                    <small className="mt-1 block text-[11px] font-semibold text-primary-dark">{item.signal}</small>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{item.question}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 max-w-4xl text-sm leading-[1.8] text-muted">
            Fehlt eine Stufe, sollte das Modell diese Lücke benennen statt sie mit einem
            Durchschnittswert zu füllen. Für eine allgemeine Formel verweist auch die{" "}
            <a href="https://support.google.com/google-ads/answer/14090?hl=de" target="_blank" rel="noreferrer" className="font-semibold text-dark underline decoration-primary-dark decoration-2 underline-offset-4 hover:text-primary-dark">
              Google-Hilfe zur ROI-Berechnung
            </a>{" "}
            auf Einnahmen beziehungsweise Wert, Kosten und Conversion-Erfassung.
          </p>
        </div>
      </section>

      <ChannelDecision />

      <section className="bg-dark py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 border-b border-white/20 pb-10 lg:grid-cols-[1fr_430px] lg:items-end lg:gap-16">
            <div>
              <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.23em] text-secondary">Vom Modell zur Entscheidung</span>
              <h2 className="max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] lg:text-[52px]">
                Vier Regeln für einen belastbaren SEO-Business-Case.
              </h2>
            </div>
            <p className="text-base leading-[1.8] text-white/58">
              Ein Rechner liefert keine Wahrheit, sondern macht Annahmen vergleichbar.
              Damit aus dem Ergebnis eine Entscheidungshilfe wird, müssen Modell,
              Datenquelle und Prüfzeitpunkt gemeinsam dokumentiert werden. Neben dem
              Prozentwert gehören deshalb absoluter Rückfluss, Break-even-Anforderung und
              offene Messlücken in dieselbe Akte. Nur so bleibt sichtbar, ob eine geänderte
              Zahl aus realer Wirkung, besserer Messung oder einer neuen Annahme stammt.
            </p>
          </div>

          <div className="mt-4 border-y border-white/20">
            <article className="grid gap-5 border-b border-white/15 py-8 sm:grid-cols-[48px_180px_1fr] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">01</span>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">Attribution festlegen</h3>
              <p className="text-sm leading-[1.85] text-white/58">
                First-Touch, Last-Touch und unterstützte Conversions beantworten
                unterschiedliche Fragen; keines dieser Modelle bildet einen komplexen
                Kaufprozess vollständig ab. SEO liegt häufig früh in der Recherche,
                während ein späterer Direktbesuch oder ein Vertriebskontakt den Abschluss
                auslöst. Deshalb sollte vor der Rechnung feststehen, welche Rolle SEO
                zugerechnet wird und welche Kontaktpunkte fehlen. Bei lückenhaften Daten ist
                ein vorsichtiger Anteil transparenter als nachträgliche Scheingenauigkeit.
              </p>
            </article>
            <article className="grid gap-5 border-b border-white/15 py-8 sm:grid-cols-[48px_180px_1fr] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">02</span>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">Datenqualität prüfen</h3>
              <p className="text-sm leading-[1.85] text-white/58">
                Eine Conversion muss ein wirtschaftlich relevantes Ereignis bezeichnen —
                nicht jeden Klick auf einen Button. Doppelte Ereignisse, Spam-Leads,
                interne Zugriffe und unterbrochenes Cross-Domain-Tracking verzerren das
                Ergebnis. Auf der Kostenseite gehören Agentur, interne Arbeitszeit,
                Content, Entwicklung und benötigte Tools in denselben Betrachtungsrahmen.
                Beim Ergebnis zählt der Deckungsbeitrag nach variablen Kosten, nicht der
                bloße Umsatz oder ein geschätzter Anzeigenwert des Traffics.
              </p>
            </article>
            <article className="grid gap-5 border-b border-white/15 py-8 sm:grid-cols-[48px_180px_1fr] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">03</span>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">Szenarien trennen</h3>
              <p className="text-sm leading-[1.85] text-white/58">
                Ein defensives, ein mittleres und ein günstiges Szenario sollten dieselbe
                Formel verwenden und nur unsichere Annahmen variieren. Dazu zählen
                zusätzliche Sessions, Conversion-Rate, zurechenbarer Anteil und wirksame
                Monate. Der Zeitfaktor bildet eine verzögerte Wirkung im Modell ab, ist aber
                keine Aussage darüber, wann Rankings eintreten. Hilfreich ist, je Szenario
                zu notieren, welche operative Voraussetzung erfüllt sein müsste.
              </p>
            </article>
            <article className="grid gap-5 py-8 sm:grid-cols-[48px_180px_1fr] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">04</span>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">Modell gegen Realität halten</h3>
              <p className="text-sm leading-[1.85] text-white/58">
                Nach Releases werden modellierte Werte schrittweise durch beobachtete
                Kohorten ersetzt: Welche Einstiegsseiten brachten passende Anfragen, welche
                davon wurden qualifiziert und welcher Deckungsbeitrag blieb? Abweichungen
                sind kein Rechenfehler, sondern ein Lernsignal. Sie zeigen, ob Nachfrage,
                Landingpage, Vertrieb, Marge oder Messung die ursprüngliche Annahme begrenzt.
                Jede Überprüfung braucht deshalb Datum, Datenverantwortliche und eine neue
                Modellversion statt still geänderter Eingabewerte.
              </p>
            </article>
          </div>
        </div>
      </section>

      <RoiCalculator />

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-dark/20 lg:grid-cols-[.78fr_1.22fr]">
            <div className="bg-dark p-8 text-white lg:p-12">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Nicht verwechseln</span>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] lg:text-4xl">Traffic-Wert ist eine Vergleichsgröße. Kein Gewinn.</h2>
              <p className="mt-6 text-sm leading-[1.8] text-white/58">
                Der angenommene Anzeigenpreis ähnlicher Klicks kann bei der Priorisierung
                helfen. Ohne Conversions, Marge und Attribution beantwortet er aber nicht,
                ob eine SEO-Investition wirtschaftlich war.
              </p>
            </div>
            <div className="bg-[#F4EFE8] p-8 lg:p-12">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary-dark">Nächste Datengrundlage</span>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] text-dark lg:text-4xl">Vor einer Prognose zuerst Messbarkeit herstellen.</h2>
              <p className="mt-6 text-sm leading-[1.8] text-muted">
                Ein Audit kann Tracking-Lücken, falsche Conversion-Definitionen und
                technische Blockaden sichtbar machen. Die laufende Betreuung übernimmt
                anschließend nur jene Kennzahlen, für die Quelle und Verantwortung klar sind.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/seo/audit" className="font-semibold text-primary-dark underline decoration-primary-dark/35 underline-offset-4 hover:text-dark">SEO Audit prüfen →</Link>
                <Link href="/seo/betreuung/ohne-vertrag" className="font-semibold text-dark underline decoration-dark/25 underline-offset-4 hover:text-primary-dark">Flexible Laufzeit verstehen →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4EFE8] py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-12">
              <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary-dark">Häufige Fragen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-dark">SEO-ROI — präzise erklärt</h2>
            </div>
          </Reveal>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <Reveal key={faq.q} delay={index * 50}>
                  <div className="overflow-hidden rounded-2xl border border-border bg-white">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary-dark"
                    >
                      <span className="font-semibold text-dark">{faq.q}</span>
                      <span className={`text-primary-dark transition-transform motion-reduce:transition-none ${open ? "rotate-45" : ""}`} aria-hidden="true">＋</span>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <p className="border-t border-border px-6 py-5 text-sm leading-[1.8] text-muted">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="jetzt-starten" className="border-y border-border bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary-dark">Nächster Schritt</span>
            <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.08] text-dark lg:text-5xl">Eine Modellrechnung wird erst mit echten Daten nützlich.</h2>
            <p className="mt-5 max-w-3xl text-base leading-[1.8] text-muted">
              Im Gespräch können Kostenquellen, Conversion-Definition und vorhandene
              Vertriebsdaten eingeordnet werden. Eine Ergebnis- oder Rankinggarantie folgt daraus nicht.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/kontakt" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-dark px-7 py-3.5 text-sm font-bold text-white hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark">Messmodell besprechen →</Link>
            <Link href="/seo/content-strategie" className="inline-flex min-h-12 items-center justify-center rounded-full border border-dark/20 px-7 py-3.5 text-sm font-semibold text-dark hover:border-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark">Content-Investition einordnen</Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
