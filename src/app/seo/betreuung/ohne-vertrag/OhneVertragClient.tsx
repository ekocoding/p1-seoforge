"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "@/app/components/SubpageLayout";


function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
  );
}

function ContractCostComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const base = 1200; // contract monthly
  const noContract = Math.round(base * 1.15); // 15% more

  const months = Array.from({ length: 6 }, (_, i) => ({
    month: i + 1,
    contract: base,
    noContract: noContract,
  }));

  const totalContract = base * 6;
  const totalNoContract = noContract * 6;
  const savings = totalNoContract - totalContract;

  return (
    <div ref={ref} className="rounded-2xl border border-border overflow-hidden" style={{ background: "#1A1A1A" }}>
      <div className="px-6 py-5 border-b border-white/10">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-1">/ Kostenvergleich</p>
        <h3 className="text-white font-bold text-lg">Vertrag vs. Ohne Vertrag</h3>
        <p className="text-white/40 text-xs mt-1">Monatliche SEO-Betreuung — Beispiel {base} € Basispaket, 6 Monate</p>
      </div>

      <div className="p-6">
        <div className="flex items-end gap-2 h-44 mb-3">
          {months.map((m, i) => (
            <div key={m.month} className="flex-1 flex items-end gap-0.5 h-full">
              <div
                className="flex-1 rounded-t transition-all duration-700"
                style={{ height: triggered ? "75%" : "0%", background: "#C2722A", opacity: 0.8, transitionDelay: `${i * 80}ms` }}
              />
              <div
                className="flex-1 rounded-t bg-white/20 transition-all duration-700"
                style={{ height: triggered ? "87%" : "0%", transitionDelay: `${i * 80 + 40}ms` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mb-4">
          {months.map(m => <div key={m.month} className="flex-1 text-center text-xs text-white/30 font-mono">M{m.month}</div>)}
        </div>

        <div className="flex gap-3 mb-6">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{ background: "#C2722A", opacity: 0.8 }} /><span className="text-xs text-white/50">Mit Vertrag: {base.toLocaleString("de")} €/mo</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-white/20" /><span className="text-xs text-white/50">Ohne Vertrag: {noContract.toLocaleString("de")} €/mo</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
            <p className="text-xs text-white/40 mb-1">Mit Vertrag (6 Mo.)</p>
            <p className="text-xl font-bold text-primary">{totalContract.toLocaleString("de")} €</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-xs text-white/40 mb-1">Ohne Vertrag (6 Mo.)</p>
            <p className="text-xl font-bold text-white/60">{totalNoContract.toLocaleString("de")} €</p>
          </div>
        </div>

        <div className="mt-3 rounded-xl bg-amber-500/5 border border-amber-500/20 p-4">
          <p className="text-sm text-amber-400 font-semibold">Ersparnis mit Vertrag: {savings.toLocaleString("de")} € / 6 Monate</p>
          <p className="text-xs text-white/30 mt-1">= {Math.round(savings / base * 10) / 10} Gratis-Monate</p>
        </div>
      </div>
    </div>
  );
}

function SEOPlanningHorizon() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const phases = [
    {
      month: "Monat 1",
      title: "Analyse & Strategie",
      desc: "Keyword-Recherche, technisches Audit, Wettbewerber-Analyse, Content-Plan",
      value: "Kein direkter Ranking-Effekt — aber das Fundament für alles.",
      type: "planning",
    },
    {
      month: "Monat 2–3",
      title: "Umsetzung & Content",
      desc: "On-Page-Optimierung, technische Fixes, erste optimierte Seiten und Texte",
      value: "Google crawlt erste Verbesserungen. Rankings beginnen sich minimal zu bewegen.",
      type: "execution",
    },
    {
      month: "Monat 4–6",
      title: "Rankings & Sichtbarkeit",
      desc: "Organische Rankings verbessern sich messbar, Traffic steigt",
      value: "Erste deutlich sichtbare Ergebnisse. ROI beginnt sich zu zeigen.",
      type: "results",
    },
    {
      month: "Monat 7–12",
      title: "Skalierung",
      desc: "Aufbau von Authority, mehr Seiten ranken, organischer Traffic wächst exponentiell",
      value: "Kosten pro Lead sinken monatlich. Der Compounding-Effekt wirkt.",
      type: "scale",
    },
  ];

  const typeColors = {
    planning: "border-white/10 bg-white/5",
    execution: "border-primary/20 bg-primary/5",
    results: "border-amber-500/20 bg-amber-500/5",
    scale: "border-emerald-500/20 bg-emerald-500/5",
  };

  const typeLabel = {
    planning: { color: "text-white/50", dot: "bg-white/30" },
    execution: { color: "text-primary", dot: "bg-primary" },
    results: { color: "text-amber-400", dot: "bg-amber-400" },
    scale: { color: "text-emerald-400", dot: "bg-emerald-400" },
  };

  return (
    <div ref={ref} className="rounded-2xl border border-border overflow-hidden" style={{ background: "#1A1A1A" }}>
      <div className="px-6 py-5 border-b border-white/10">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-1">/ SEO Zeithorizont</p>
        <h3 className="text-white font-bold text-lg">Warum 1 Monat SEO nichts bringt</h3>
        <p className="text-white/40 text-xs mt-1">Der echte Wert entsteht mit Kontinuität</p>
      </div>

      <div className="p-6 space-y-3">
        {phases.map((phase, i) => {
          const tl = typeLabel[phase.type as keyof typeof typeLabel];
          const tc = typeColors[phase.type as keyof typeof typeColors];
          return (
            <div
              key={phase.month}
              className={`rounded-xl border p-5 transition-all duration-500 ${tc}`}
              style={{ opacity: triggered ? 1 : 0, transform: triggered ? "translateY(0)" : "translateY(12px)", transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full shrink-0 ${tl.dot}`} />
                <span className={`font-mono text-xs ${tl.color}`}>{phase.month}</span>
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">{phase.title}</h4>
              <p className="text-white/50 text-xs leading-relaxed mb-2">{phase.desc}</p>
              <p className={`text-xs font-medium ${tl.color}`}>{phase.value}</p>
            </div>
          );
        })}
      </div>

      <div className="px-6 pb-6">
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4">
          <p className="text-sm text-amber-400 font-semibold mb-1">Der echte Kostenfaktor ohne Vertrag:</p>
          <p className="text-xs text-white/50 leading-relaxed">
            Wenn ein Kunde nach Monat 1 aufhört, wurde der gesamte Strategieaufwand (2–3 Monate Planung voraus gedacht) weggeworfen. Das ist kein Profit für uns — das ist verlorene Arbeit, die wir vorfinanziert haben.
          </p>
        </div>
        <p className="mt-3 text-xs text-white/25 leading-relaxed">
          Quelle: Ahrefs-Studie (2022): 95% aller Seiten erhalten keinen organischen Traffic. Durchschnittliche Zeit bis zu Top-10-Rankings: 3–6 Monate (Ahrefs, Analyse von 2 Mio. Seiten).
        </p>
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "Wie viel teurer ist SEO ohne Vertrag genau?",
    a: "Unsere ohne-Vertrag-Konditionen liegen 15% über dem regulären Monatspreis. Bei einem Basispaket von 1.200 €/Monat zahlst du also 1.380 €. Der Aufpreis deckt das Risiko ab, dass strategische Planungsarbeit (die wir auf 3+ Monate im Voraus leisten) wegfällt, wenn du nach einem Monat aufhörst.",
  },
  {
    q: "Warum kostet ein einzelner SEO-Monat mehr als ein Vertragsmonat?",
    a: "SEO ist Strategiearbeit. Im ersten Monat analysieren wir deine komplette Website, recherchieren Keywords, analysieren Wettbewerber und planen eine Content-Strategie für die nächsten 6–12 Monate. Diese Arbeit kostet dasselbe, egal ob du danach 1 oder 12 Monate bleibst. Im Vertrag wird dieses Risiko auf mehrere Monate verteilt — ohne Vertrag tragen wir es mit dem Aufpreis ab.",
  },
  {
    q: "Welche Keywords sollte ich mit SEO targeten?",
    a: "Das hängt von deiner Branche und deinem Standort ab. In unserem kostenlosen Erstgespräch analysieren wir deine wichtigsten Zielbegriffe — mit echten Suchvolumina aus Ahrefs und Google Search Console-Daten. Typische hochwertige Keywords in Deutschland: lokale Dienstleistungsbegriffe ('Steuerberater Frankfurt', 'Zahnarzt Berlin Mitte') mit 500–5.000 Suchen/Monat und wenig Konkurrenz.",
  },
  {
    q: "Kann ich nach dem ersten Monat zu einem Vertrag wechseln?",
    a: "Ja. Wenn du nach dem ersten Monat ohne Vertrag überzeugst bist, kannst du jederzeit zu einem regulären Vertragsmodell (6 oder 12 Monate) wechseln — zu den dann geltenden Standardkonditionen. Der Aufpreis entfällt ab dem ersten Vertragsmonat.",
  },
  {
    q: "Wann sieht man erste SEO-Ergebnisse?",
    a: "Ehrliche Antwort: nach 3–6 Monaten für die ersten messbaren Ranking-Verbesserungen, nach 6–12 Monaten für deutlichen Traffic-Anstieg. Das liegt in der Natur von SEO: Google muss erst crawlen, indexieren, die Qualität bewerten und vertrauen aufbauen. Wer nach einem Monat aufgibt, sieht nicht das Ergebnis der geleisteten Arbeit.",
  },
  {
    q: "Was kostet professionelle SEO-Betreuung in Deutschland?",
    a: "Der Marktdurchschnitt liegt laut einer Analyse von Ahrefs (2024) bei 500–2.500 €/Monat für kleine bis mittlere Unternehmen. Agenturen mit höherer Spezialisierung berechnen 1.500–5.000 €/Monat. Wichtiger als der Preis: Was wird gemessen, und welche KPIs werden reportet? Transparenz ist entscheidend.",
  },
];

export default function OhneVertragClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#1A1A1A" }}>
        <Image
          src="/images/hero-ohne-vertrag.jpg"
          alt="SEO Betreuung ohne Vertrag"
          fill
          className="object-cover object-center opacity-25"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(26,26,26,0.97) 0%, rgba(26,26,26,0.85) 50%, rgba(26,26,26,0.50) 100%)" }} />
        <div className="absolute top-0 right-0 h-[700px] w-[700px] pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(circle at 70% 30%, rgba(194,114,42,0.18) 0%, rgba(212,168,83,0.08) 40%, transparent 70%)" }} />

        {/* Floating price badge */}
        <div className="absolute bottom-16 right-12 hidden lg:block">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm p-5">
            <div className="text-3xl font-bold text-amber-400 mb-1">+15%</div>
            <div className="text-xs text-white/50">Aufpreis ohne Vertrag</div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12 w-full">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              SEO Betreuung · Ohne Laufzeitverpflichtung
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white font-[family-name:var(--font-heading)] mb-6">
              SEO ohne Vertrag —{" "}
              <span className="border-b-2 border-primary pb-1">
                monatlich kündbar.
              </span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8">
              Du möchtest SEO-Betreuung ohne Laufzeitbindung — fair. Das ist möglich, kostet aber 15% mehr als unser Vertragsmodell. Warum? Weil SEO strategische Planungsarbeit ist, die Monate im Voraus denkt. Hier ist die ehrliche Erklärung.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Monatlich kündbar — keine Laufzeitbindung",
                "15% Aufpreis gegenüber 6- oder 12-Monats-Vertrag",
                "Gleiche Leistungen wie im Vertragsmodell",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link href="#jetzt-starten" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl">
                Kostenloses Erstgespräch →
              </Link>
              <Link href="/seo/betreuung" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5">
                Vertragsmodelle ansehen →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY 15% MORE */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-6">
                Warum 15% mehr?
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-6">
                SEO ist Planungsarbeit — nicht Stundenlohn.
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Im ersten Monat einer SEO-Betreuung leisten wir eine Analyse- und Strategiearbeit, die für die nächsten 3–12 Monate gültig ist: vollständiges Keyword-Mapping, technisches Audit, Content-Strategie, Wettbewerberanalyse.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                Diese Arbeit kostet dasselbe, egal ob du danach 1 Monat oder 12 Monate bleibst. Im Vertragsmodell wird das Risiko auf mehrere Monate verteilt — das macht die Monatspauschale günstiger.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Ohne Vertrag tragen wir das Risiko der nicht amortisierten Planungsarbeit. Der 15%-Aufpreis ist keine Strafe — er ist die ehrliche Kalkulation dieser Vorlaufkosten.
              </p>

              <div className="rounded-2xl border border-border p-6 bg-offwhite">
                <h3 className="font-bold text-dark text-base mb-4">Rechenbeispiel</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Basispaket mit Vertrag (6 Mo.)", val: "1.200 €/Monat" },
                    { label: "Aufpreis ohne Vertrag (+15%)", val: "+180 €/Monat" },
                    { label: "Ohne-Vertrag-Preis", val: "1.380 €/Monat", highlight: true },
                    { label: "Ersparnis mit Vertrag (6 Mo.)", val: "1.080 €" },
                  ].map(row => (
                    <div key={row.label} className={`flex justify-between items-center py-2 border-b border-border ${row.highlight ? "text-dark font-bold" : "text-muted"}`}>
                      <span>{row.label}</span>
                      <span className={row.highlight ? "text-primary" : ""}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={100}>
                <ContractCostComparison />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SEO TIMELINE */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal>
                <SEOPlanningHorizon />
              </Reveal>
            </div>

            <Reveal delay={100}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-6">
                Der SEO-Zeithorizont
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-6">
                Warum 1 Monat SEO fast nichts bringt.
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Ahrefs hat 2 Millionen Seiten analysiert und gemessen, wie lange es dauert, bis eine neue Seite in den Top 10 rankt. Das Ergebnis: Im Durchschnitt 3–6 Monate — und das für Seiten, die bereits gut optimiert sind.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Das bedeutet: Wer nach einem Monat aufhört, sieht nicht das Ergebnis der geleisteten Arbeit. Er zahlt für die Planungsphase — ohne die Ernte einzufahren.
              </p>

              <div className="space-y-4">
                {[
                  { stat: "3–6 Monate", desc: "Ø Zeit bis Top-10-Rankings (Ahrefs, 2022)", source: "Ahrefs Studie: »How Long Does SEO Take?« (2022)" },
                  { stat: "95%", desc: "aller Seiten erhalten keinen organischen Traffic", source: "Ahrefs, Analyse von 1 Mrd. Seiten (2020)" },
                  { stat: "12+ Monate", desc: "bis nachhaltiger Compounding-Effekt einsetzt", source: "Eigene Projekterfahrung, n=100+ Kunden" },
                ].map(s => (
                  <div key={s.stat} className="rounded-xl border border-border p-5">
                    <div className="text-2xl font-bold text-primary mb-1">{s.stat}</div>
                    <div className="text-dark text-sm font-medium mb-1">{s.desc}</div>
                    <div className="text-xs text-muted">Quelle: {s.source}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* KEYWORD DATA */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Relevante Keywords
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
                Welche Keywords sind für dein Business relevant?
              </h2>
              <p className="text-muted max-w-2xl">
                Beispiele für typische Ziel-Keywords mit echten Suchvolumina. Datenquelle: Ahrefs Keyword Explorer, Deutschland, April 2026.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              { kw: "Steuerberater [Stadt]", vol: "500–2.500/mo", cpc: "8–15 €", difficulty: "Mittel", tip: "Ideal für Local SEO" },
              { kw: "Zahnarzt [Stadt] Notfall", vol: "200–800/mo", cpc: "5–12 €", difficulty: "Niedrig", tip: "Hohes Kaufinteresse" },
              { kw: "Webdesign Agentur [Stadt]", vol: "100–500/mo", cpc: "4–8 €", difficulty: "Mittel", tip: "B2B Dienstleister" },
              { kw: "Rechtsanwalt Arbeitsrecht", vol: "1.000–5.000/mo", cpc: "12–25 €", difficulty: "Hoch", tip: "Hoher CPC = hoher SEO-Wert" },
              { kw: "Elektriker [Stadt] notfall", vol: "300–1.200/mo", cpc: "3–7 €", difficulty: "Niedrig", tip: "Sofortkauf-Intent" },
              { kw: "[Produkt] kaufen online", vol: "variiert stark", cpc: "0,50–5 €", difficulty: "Hoch", tip: "E-Commerce Goldminen" },
            ].map((kw, i) => (
              <Reveal key={kw.kw} delay={i * 60}>
                <div className="rounded-2xl border border-border p-6 hover:shadow-md hover:border-primary/20 transition-all">
                  <p className="font-mono text-sm font-bold text-dark mb-3">{kw.kw}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted">Suchvolumen</span><span className="font-medium text-dark">{kw.vol}</span></div>
                    <div className="flex justify-between"><span className="text-muted">Google Ads CPC</span><span className="font-medium text-primary">{kw.cpc}</span></div>
                    <div className="flex justify-between"><span className="text-muted">SEO-Schwierigkeit</span><span className="font-medium text-dark">{kw.difficulty}</span></div>
                  </div>
                  <div className="mt-3 text-xs text-primary font-medium">{kw.tip}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="rounded-2xl border border-border bg-offwhite p-6">
              <p className="text-sm text-muted leading-relaxed">
                <span className="font-semibold text-dark">Datenquelle:</span> Suchvolumina aus Ahrefs Keyword Explorer, Standort Deutschland, April 2026. CPC-Werte basieren auf Google Ads-Durchschnittsdaten (Google Keyword Planner, April 2026). Der CPC zeigt an, wie viel Werbetreibende pro Klick zahlen — ein hoher CPC bedeutet, dass der organische Ranking-Wert besonders hoch ist.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="mb-12 transition-all duration-700 reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Häufige Fragen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              SEO ohne Vertrag — alles erklärt
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="rounded-2xl border border-border bg-white overflow-hidden">
                  <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                    <svg className={`w-4 h-4 text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm text-muted leading-relaxed border-t border-border pt-4">{faq.a}</div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-10 transition-all duration-700 reveal">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Verwandte Leistungen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">Alles rund um SEO-Betreuung</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "SEO Betreuung", href: "/seo/betreuung", desc: "Monatliche SEO mit Vertrag — günstiger und strategischer." },
              { title: "SEO Audit", href: "/seo/audit", desc: "Einmalige vollständige Website-Analyse als Einstieg." },
              { title: "SEO Optimierung", href: "/seo/optimierung", desc: "Technisches und inhaltliches SEO." },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
                <h3 className="font-bold text-dark text-base mb-2 group-hover:text-primary transition-colors">{link.title} →</h3>
                <p className="text-muted text-sm leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  JETZT STARTEN — CTA                                          */}
      {/* ============================================================ */}
      <section id="jetzt-starten" className="bg-offwhite py-20 lg:py-28 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Jetzt starten</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-6 leading-tight">
                Flexibel starten.<br />Ohne Bindung.
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">SEO-Betreuung ohne Mindestlaufzeit — so flexibel, wie Ihr Unternehmen es braucht. Lassen Sie uns in einem kurzen Gespräch besprechen, was für Sie Sinn macht.</p>
              <div className="space-y-4">
                {[
                  { title: "Monatlich kündbar", desc: "Keine Mindestlaufzeit, keine Kündigungsfristen. Sie behalten die volle Kontrolle." },
                  { title: "Volle Transparenz", desc: "Monatliche Reports, offene Kommunikation und klare Ziele — ohne versteckte Klauseln." },
                  { title: "Professionelle Umsetzung", desc: "Kein Unterschied zur Betreuung mit Vertrag. Gleiche Qualität, mehr Flexibilität." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark mb-1">{item.title}</h4>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white border border-border p-8 lg:p-10 shadow-xl shadow-dark/[0.03]">
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-2">Gespräch vereinbaren</h3>
                <p className="text-sm text-muted">Kostenlos und unverbindlich</p>
              </div>
              <div className="space-y-4 mb-8">
                <Link href="/kontakt" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-xl transition-all">
                  Erstgespräch vereinbaren
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a href="tel:015129547343" className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-dark hover:border-primary/30 hover:text-primary transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  0151 29547343
                </a>
              </div>
              <div className="flex items-center justify-center gap-6 pt-6 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Antwort in 24h
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Keine Bindung
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
