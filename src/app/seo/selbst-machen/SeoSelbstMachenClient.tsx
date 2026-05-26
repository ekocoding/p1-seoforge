"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SubpageLayout from "@/app/components/SubpageLayout";
import FaqAccordion from "@/app/components/FaqAccordion";


function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      className="reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ZeitaufwandCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const bars = [
    { label: "Basics selbst", hours: "8–15 Std./Monat", percent: 38, color: "bg-emerald-400", desc: "GSC auswerten, Content schreiben, kleine Fixes" },
    { label: "Vollständiges SEO selbst", hours: "25–40 Std./Monat", percent: 100, color: "bg-amber-400", desc: "Nicht realistisch für die meisten Unternehmer" },
    { label: "Mit Agentur", hours: "2–4 Std./Monat", percent: 10, color: "bg-primary", desc: "Briefings, Reviews, Abstimmungsgespräche" },
  ];

  return (
    <div ref={ref} className="rounded-2xl border border-border overflow-hidden" style={{ background: "#1A1A1A" }}>
      <div className="px-6 py-5 border-b border-white/10">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-1">/ Zeitaufwand</p>
        <h3 className="text-white font-bold text-lg">Der ehrliche Realitätscheck</h3>
        <p className="text-white/40 text-xs mt-1">Wie viel Zeit kostet SEO wirklich?</p>
      </div>

      <div className="p-6 space-y-6">
        {bars.map((bar, i) => (
          <div
            key={bar.label}
            style={{ opacity: triggered ? 1 : 0, transform: triggered ? "translateY(0)" : "translateY(12px)", transitionDelay: `${i * 120}ms`, transition: "all 0.5s ease" }}
          >
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-white font-semibold text-sm">{bar.label}</span>
              <span className={`font-mono text-sm font-bold ${bar.color.replace("bg-", "text-")}`}>{bar.hours}</span>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full ${bar.color} transition-all duration-1000`}
                style={{ width: triggered ? `${bar.percent}%` : "0%", transitionDelay: `${i * 120 + 200}ms` }}
              />
            </div>
            <p className="text-white/40 text-xs mt-1.5">{bar.desc}</p>
          </div>
        ))}

        <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 mt-4">
          <p className="text-sm text-amber-400 font-semibold mb-1">Was das bedeutet:</p>
          <p className="text-xs text-white/50 leading-relaxed">
            40 Stunden im Monat sind 10 Stunden pro Woche — das entspricht einem Quartzeit-Job. Für die meisten Unternehmer ist das unrealistisch, wenn sie gleichzeitig ihr Kerngeschäft betreiben.
          </p>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "Kann ich SEO wirklich selbst machen?",
    a: "Ja — Teile davon. Google Search Console einrichten, Google Business Profile pflegen, Title Tags schreiben, interne Verlinkung verbessern und PageSpeed prüfen sind Aufgaben, die jeder mit etwas Lernbereitschaft angehen kann. Technisches SEO, Linkbuilding und Keyword-Strategie erfordern hingegen deutlich mehr Expertise und Tools.",
  },
  {
    q: "Wie lange brauche ich, um SEO zu lernen?",
    a: "Für die Basics (GSC, On-Page-Basics, Content-Schreiben): 2–4 Wochen intensives Lernen. Für vollständiges technisches SEO und Keyword-Strategie: 6–12 Monate Praxis. Um mit einer erfahrenen SEO-Agentur gleichzuziehen: mehrere Jahre. Die meisten Unternehmer investieren diese Zeit besser in ihr Kerngeschäft.",
  },
  {
    q: "Welche kostenlosen SEO-Tools sind am besten?",
    a: "Die besten kostenlosen Tools: Google Search Console (Pflicht, liefert echte Daten direkt von Google), Google Business Profile (für lokale Sichtbarkeit), Ahrefs Webmaster Tools (kostenlose Backlink-Analyse), Screaming Frog (bis 500 URLs kostenlos für technisches Crawling), Ubersuggest Free (Keyword-Recherche-Einstieg).",
  },
  {
    q: "Wann sollte ich eine SEO Agentur beauftragen?",
    a: "Wenn mindestens 3 dieser Punkte zutreffen: Dein organischer Umsatz übersteigt 50.000 €/Jahr, du hast starken lokalen oder nationalen Wettbewerb, du hast weniger als 8 Stunden/Woche für SEO, deine Website hatte bereits einen Traffic-Einbruch, oder du willst messbare Ergebnisse in 6–12 Monaten. Je mehr zutreffen, desto klarer lohnt sich externe Hilfe.",
  },
  {
    q: "Was kostet SEO mit einer Agentur im Vergleich?",
    a: "Seriöse SEO-Agenturen in Deutschland berechnen 800–3.000 €/Monat für kleine bis mittlere Unternehmen. Dafür bekommst du: vollständige Strategie, technisches SEO, Content-Produktion, Linkbuilding und monatliches Reporting — Arbeit, für die du selbst 25–40 Stunden/Monat investieren müsstest. Rechne deine eigenen Stunden gegen, und die Agentur ist oft günstiger.",
  },
];

export default function SeoSelbstMachenClient() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "SEO selbst machen: Was du schaffst — und wo die Grenzen liegen",
        description: "Ehrlicher Guide: Was kannst du bei SEO selbst tun? Welche Tools brauchst du? Und wann lohnt sich eine Agentur?",
        author: { "@type": "Organization", name: "SeoForge" },
        publisher: { "@type": "Organization", name: "SeoForge" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-secondary/[0.05] to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12 w-full">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              SEO selbst machen
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-dark font-[family-name:var(--font-heading)] mb-6">
              SEO selbst machen: Was du schaffst —{" "}
              <span className="text-primary">und wo die Grenzen liegen.</span>
            </h1>

            <p className="text-muted text-lg leading-relaxed max-w-2xl mb-8">
              Kein Sales Pitch. Kein "nur wir können das". Dieser Guide erklärt ehrlich, was du selbst tun kannst, welche Tools dabei helfen — und wann es wirklich Sinn macht, eine Agentur einzuschalten.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {["Konkrete Anleitung", "Tool-Empfehlungen", "Ehrlicher Vergleich"].map((pill) => (
                <span key={pill} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-offwhite px-4 py-1.5 text-sm text-dark">
                  <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  {pill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/seo/betreuung" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl">
                Zur SEO Betreuung →
              </Link>
              <Link href="#jetzt-starten" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:text-primary">
                Kostenloses Erstgespräch →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WAS DU SELBST TUN KANNST */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Was du schaffst
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
                5 SEO-Maßnahmen, die jeder selbst umsetzen kann
              </h2>
              <p className="text-muted max-w-2xl">
                Diese Maßnahmen brauchen keine Agentur, kein teures Tool, keine Programmierkenntnisse. Nur etwas Zeit und Konsequenz.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              {
                num: "01",
                title: "Google Search Console einrichten & auswerten",
                desc: "Welche Seiten ranken, welche Fehler gibt es, welche Suchanfragen führen zu deiner Website — all das siehst du hier kostenlos direkt von Google.",
                tip: "So geht's: search.google.com/search-console → Website verifizieren → Wöchentlich Performance-Bericht öffnen und Top-Keywords notieren.",
                effort: "2 Std. Einrichtung, 30 Min./Woche Pflege",
              },
              {
                num: "02",
                title: "Google Business Profile optimieren",
                desc: "Für lokale Unternehmen ist das Pflicht — und es ist komplett kostenlos. Vollständiges Profil, aktuelle Öffnungszeiten, Fotos und regelmäßige Posts erhöhen die lokale Sichtbarkeit massiv.",
                tip: "So geht's: business.google.com → Profil vollständig ausfüllen → Monatlich 1–2 Posts schreiben → Auf alle Bewertungen antworten.",
                effort: "3 Std. Einrichtung, 1 Std./Monat Pflege",
              },
              {
                num: "03",
                title: "Title Tags & Meta Descriptions schreiben",
                desc: "Der größte Quick Win mit dem wenigsten Aufwand. Jede Seite deiner Website sollte einen einzigartigen, keyword-optimierten Title Tag haben (50–60 Zeichen) und eine ansprechende Meta Description (150–160 Zeichen).",
                tip: "So geht's: Google Search Console → Seiten mit niedriger CTR finden → Title Tags mit Ziel-Keyword umschreiben → Verbesserung nach 4–6 Wochen messen.",
                effort: "30–60 Min. pro Seite, einmalig",
              },
              {
                num: "04",
                title: "Interne Verlinkung verbessern",
                desc: "Verlinkst du deine wichtigsten Seiten gegenseitig? Interne Links helfen Google zu verstehen, welche Seiten wichtig sind — und Nutzern, relevante Inhalte zu finden.",
                tip: "So geht's: Blog-Artikel auf wichtige Produktseiten verlinken. Hauptnavigation auf alle wichtigen Kategorien. 'Verwandte Artikel' am Ende jedes Blog-Posts.",
                effort: "2–4 Std. für die ersten Optimierungen",
              },
              {
                num: "05",
                title: "PageSpeed prüfen & offensichtliche Fehler beheben",
                desc: "Core Web Vitals sind ein Google-Rankingfaktor. Bilder zu groß, JavaScript blockiert den Render, kein Caching — diese Fehler sind oft einfach zu beheben und haben sofortige Wirkung.",
                tip: "So geht's: pagespeed.web.dev → URL eingeben → Empfehlungen abarbeiten. Größte Hebel: Bilder komprimieren (TinyPNG), Caching-Plugin installieren (z.B. W3 Total Cache bei WordPress).",
                effort: "2–5 Std. für offensichtliche Fixes",
              },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 60}>
                <div className="rounded-2xl border border-border bg-white p-6 hover:shadow-lg transition-all">
                  <div className="flex gap-5 items-start">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold shadow-md">
                      {item.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-dark text-base mb-2">{item.title}</h3>
                      <p className="text-muted text-sm leading-relaxed mb-3">{item.desc}</p>
                      <div className="rounded-xl bg-offwhite border border-border p-4">
                        <p className="text-xs font-semibold text-dark mb-1">So geht&apos;s:</p>
                        <p className="text-xs text-muted leading-relaxed">{item.tip.replace("So geht's: ", "")}</p>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs text-muted">{item.effort}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WAS ECHTER EXPERTISE BRAUCHT */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Wo es schwieriger wird
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
                Diese Bereiche brauchen echte Expertise
              </h2>
              <p className="text-muted max-w-2xl">
                Nicht unmöglich — aber Fehler hier können Rankings kosten, die man mühsam wieder aufbauen muss.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "Technisches SEO",
                desc: "Core Web Vitals, Crawl-Budget, Indexierungsfehler, strukturierte Daten (Schema.org), Canonical Tags, hreflang — das sind Dinge, die bei falscher Umsetzung aktiv schaden können.",
                risk: "Fehler können dazu führen, dass Google Seiten nicht indexiert.",
              },
              {
                title: "Keyword-Strategie & Keyword-Kannibalisierung",
                desc: "Falsches Keyword-Mapping kostet Rankings. Wenn zwei deiner Seiten auf dasselbe Keyword optimiert sind, konkurrieren sie gegeneinander — beide ranken schlechter.",
                risk: "Kannibalisierung ist oft der Grund, warum Rankings stagnieren.",
              },
              {
                title: "Linkbuilding",
                desc: "Schlechte Links können Google Penalties auslösen. Linkbuilding erfordert echte Beziehungen, Qualitätsbewertung und eine Strategie, die zu deinem Profil passt.",
                risk: "Spam-Links führen zu manuellen Maßnahmen und Traffic-Einbrüchen.",
              },
              {
                title: "Penalty-Recovery",
                desc: "Hat deine Website bereits einen Traffic-Einbruch erlitten? Penalties zu beheben — egal ob algorithmisch durch ein Core Update oder manuell — ohne tiefes Fachwissen ist riskant.",
                risk: "Falsche Recovery-Maßnahmen verlängern die Erholungszeit erheblich.",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <div className="rounded-2xl border border-amber-500/20 border-t-[3px] border-t-amber-500/40 bg-white p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 mt-0.5">
                      <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-dark text-base">{card.title}</h3>
                  </div>
                  <p className="text-muted text-sm leading-relaxed mb-4">{card.desc}</p>
                  <div className="rounded-lg bg-amber-500/5 border border-amber-500/10 px-4 py-2.5">
                    <p className="text-xs text-amber-600 font-medium">{card.risk}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ZEITAUFWAND REALITÄTSCHECK — dark */}
      <section className="py-24 lg:py-32" style={{ background: "#1A1A1A" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">/ Zeitaufwand</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-6">
                Der ehrliche Realitätscheck.
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Viele unterschätzen, wie viel Zeit professionelles SEO kostet. Hier sind realistische Zahlen — ohne Beschönigung.
              </p>

              <div className="space-y-4">
                {[
                  {
                    scenario: "Minimum für Basics",
                    detail: "GSC auswerten, Title Tags schreiben, ein Blog-Post pro Monat",
                    time: "8–12 Std./Monat",
                    verdict: "Machbar, aber langsamer Fortschritt",
                    color: "text-emerald-400",
                  },
                  {
                    scenario: "Vollständiges DIY-SEO",
                    detail: "Technisches SEO, Keyword-Recherche, Content, Linkbuilding, Reporting",
                    time: "25–40 Std./Monat",
                    verdict: "10 Stunden/Woche — ein Teilzeit-Job",
                    color: "text-amber-400",
                  },
                  {
                    scenario: "Mit SEO-Agentur",
                    detail: "Briefings, Reviews, Strategiegespräche, Freigaben",
                    time: "2–4 Std./Monat",
                    verdict: "Dein Fokus bleibt auf dem Kerngeschäft",
                    color: "text-primary",
                  },
                ].map((item, i) => (
                  <Reveal key={item.scenario} delay={i * 80}>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold text-sm">{item.scenario}</span>
                        <span className={`font-mono text-sm font-bold ${item.color}`}>{item.time}</span>
                      </div>
                      <p className="text-white/40 text-xs mb-2">{item.detail}</p>
                      <p className={`text-xs font-medium ${item.color}`}>{item.verdict}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={100}>
              <ZeitaufwandCard />
            </Reveal>
          </div>
        </div>
      </section>

      {/* KOSTENLOSE TOOLS */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Kostenlose Tools
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
                Die besten kostenlosen SEO-Tools
              </h2>
              <p className="text-muted max-w-2xl">
                Diese Tools brauchst du für DIY-SEO. Alle haben kostenlose Versionen, die für den Einstieg vollkommen ausreichen.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Google Search Console",
                desc: "Pflicht für jede Website. Direkte Daten von Google: Klicks, Impressionen, Positionen, Crawling-Fehler, Core Web Vitals. Kostenlos.",
                tag: "Pflicht",
                tagColor: "bg-primary/10 text-primary",
                url: "search.google.com/search-console",
              },
              {
                name: "Google Business Profile",
                desc: "Für lokale Unternehmen unverzichtbar. Vollständiges Profil, Öffnungszeiten, Fotos, Posts und Bewertungsmanagement — alles kostenlos.",
                tag: "Lokal SEO",
                tagColor: "bg-emerald-500/10 text-emerald-600",
                url: "business.google.com",
              },
              {
                name: "Ubersuggest (kostenlose Version)",
                desc: "Einstieg in Keyword-Recherche. Zeigt Suchvolumen, SEO-Schwierigkeit und Content-Ideen. Für erste Analysen ausreichend.",
                tag: "Keyword-Recherche",
                tagColor: "bg-secondary/10 text-secondary",
                url: "ubersuggest.com",
              },
              {
                name: "Screaming Frog (kostenlos bis 500 URLs)",
                desc: "Website-Crawler für technisches SEO. Findet fehlende Title Tags, doppelte Meta Descriptions, broken Links und Redirect-Ketten.",
                tag: "Technisches SEO",
                tagColor: "bg-amber-500/10 text-amber-600",
                url: "screamingfrog.co.uk",
              },
              {
                name: "Ahrefs Webmaster Tools (kostenlos)",
                desc: "Kostenlose Backlink-Analyse für deine eigene Website. Zeigt, wer auf dich verlinkt, mit welchen Ankertexten und welche Seiten am stärksten sind.",
                tag: "Backlinks",
                tagColor: "bg-primary/10 text-primary",
                url: "ahrefs.com/webmaster-tools",
              },
              {
                name: "Google PageSpeed Insights",
                desc: "Prüft Core Web Vitals und PageSpeed direkt mit echten Nutzerdaten (CrUX) und Lab-Daten. Zeigt konkrete Optimierungsempfehlungen.",
                tag: "Performance",
                tagColor: "bg-emerald-500/10 text-emerald-600",
                url: "pagespeed.web.dev",
              },
            ].map((tool, i) => (
              <Reveal key={tool.name} delay={i * 60}>
                <div className="rounded-2xl border border-border bg-white p-6 hover:shadow-lg hover:border-primary/20 transition-all h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-dark text-base">{tool.name}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${tool.tagColor}`}>{tool.tag}</span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed flex-1">{tool.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-primary font-mono">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                    {tool.url}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WANN LOHNT SICH EXTERNE HILFE */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-6">
                Ehrliche Einschätzung
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-6">
                Wann lohnt sich externe SEO-Hilfe?
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Wenn 3 oder mehr dieser Punkte auf dich zutreffen, macht eine Agentur in der Regel mehr Sinn als DIY. Nicht weil du es nicht könntest — sondern weil deine Zeit wertvoller eingesetzt ist.
              </p>
              <p className="text-muted leading-relaxed">
                Das ist keine Verkaufsstrategie, das ist Mathematik: Rechne deinen Stundenlohn gegen 25–40 Stunden SEO-Arbeit im Monat — und vergleiche das mit dem Agenturpreis.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-2xl border border-border bg-offwhite p-6">
                <p className="text-sm font-bold text-dark mb-5">Trifft das auf dich zu?</p>
                <div className="space-y-3">
                  {[
                    "Dein Umsatz über organischen Traffic übersteigt 50.000 €/Jahr",
                    "Du hast starken lokalen oder nationalen Wettbewerb",
                    "Du hast weniger als 8 Stunden pro Woche für SEO",
                    "Deine Website hatte bereits einen Traffic-Einbruch",
                    "Du willst messbare Ergebnisse in 6–12 Monaten",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
                      <div className="h-5 w-5 rounded border-2 border-primary/30 bg-primary/5 shrink-0 mt-0.5 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-sm bg-primary/40" />
                      </div>
                      <p className="text-sm text-dark leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-primary/5 border border-primary/20 p-4">
                  <p className="text-sm text-primary font-semibold">3 oder mehr Punkte zutreffend?</p>
                  <p className="text-xs text-muted mt-1">Dann lohnt sich ein kostenloses Gespräch mit einem SEO-Experten.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DIY vs. AGENTUR VERGLEICH */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Der Vergleich
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">
                DIY vs. Agentur — die ehrliche Tabelle
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-3 bg-offwhite border-b border-border">
                <div className="p-4 text-xs font-bold text-muted uppercase tracking-widest" />
                <div className="p-4 text-center">
                  <span className="text-sm font-bold text-dark">DIY</span>
                </div>
                <div className="p-4 text-center">
                  <span className="text-sm font-bold text-primary">Agentur</span>
                </div>
              </div>

              {[
                { label: "Monatliche Kosten", diy: "Tool-Kosten (0–200 €)", agency: "800–3.000 €+", agencyPositive: false },
                { label: "Zeitaufwand", diy: "15–40 Std./Monat", agency: "2–4 Std./Monat", agencyPositive: true },
                { label: "Expertise-Level", diy: "Lernkurve 6–12 Monate", agency: "Sofort einsatzbereit", agencyPositive: true },
                { label: "Ergebnisse", diy: "Langsamer", agency: "Schneller & nachhaltiger", agencyPositive: true },
                { label: "Risiko", diy: "Höher (Fehler möglich)", agency: "Geringer", agencyPositive: true },
                { label: "Kontrolle", diy: "Volle Kontrolle", agency: "Delegiert", agencyPositive: false },
              ].map((row, i) => (
                <div key={row.label} className={`grid grid-cols-3 border-b border-border last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-offwhite/30"}`}>
                  <div className="p-4 text-sm text-muted font-medium">{row.label}</div>
                  <div className={`p-4 text-center text-sm font-semibold ${!row.agencyPositive ? "text-primary" : "text-muted"}`}>{row.diy}</div>
                  <div className={`p-4 text-center text-sm font-semibold ${row.agencyPositive ? "text-primary" : "text-muted"}`}>{row.agency}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="mb-12 transition-all duration-700 reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Häufige Fragen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              SEO selbst machen — alles beantwortet
            </h2>
          </div>

          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-20" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-10 transition-all duration-700 reveal">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Weiterlesen</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark">Verwandte Themen</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Professionelle SEO Betreuung", href: "/seo/betreuung", desc: "Monatliche Betreuung durch Experten — für messbare Ergebnisse." },
              { title: "Wann sich SEO rechnet", href: "/seo/betreuung/roi", desc: "ROI-Formeln und Vergleichsrechnungen für SEO vs. Google Ads." },
              { title: "Einmalige SEO Beratung", href: "/seo/beratung", desc: "Strategie-Session ohne Vertragsbindung — für den nächsten Schritt." },
              { title: "SEO Audit", href: "/seo/audit", desc: "Vollständige Website-Analyse — wir zeigen genau, was zu tun ist." },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl border border-border bg-white p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
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
                Wenn du Hilfe<br />brauchst, sind wir da
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">SEO selbst machen ist möglich — aber manchmal lohnt es sich, Profis hinzuzuziehen. Kein Druck, kein Pitch. Nur eine ehrliche Einschätzung.</p>
              <div className="space-y-4">
                {[
                  { title: "Ehrliche Beratung", desc: "Wir sagen dir, was du wirklich brauchst — auch wenn das bedeutet, dass du es erstmal selbst weiter machst." },
                  { title: "Kein Verkaufsdruck", desc: "Ein kostenloses Gespräch ist genau das: kostenlos und ohne Verpflichtung. Versprochen." },
                  { title: "Gemeinsamer Plan", desc: "Falls du Unterstützung möchtest, entwickeln wir zusammen einen Plan, der zu deinem Budget und deinen Zielen passt." },
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
                  Erstgespräch anfragen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a href="tel:015203450695" className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-dark hover:border-primary/30 hover:text-primary transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  0152 03450695
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
