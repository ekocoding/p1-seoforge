"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";

/* ------------------------------------------------------------------ */
/*  INTERSECTION OBSERVER                                              */
/* ------------------------------------------------------------------ */
function useInView(opts = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, ...opts }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

/* ------------------------------------------------------------------ */
/*  FAQ DATA                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    q: "Was ist GEO genau?",
    a: "GEO steht für Generative Engine Optimization. Es bezeichnet die Praxis, Inhalte und Marken so zu gestalten, dass KI-Systeme wie ChatGPT, Perplexity oder Google AI Overviews sie aktiv in ihren generierten Antworten zitieren. GEO optimiert nicht für Algorithmen, die eine Liste von Links erstellen, sondern für Modelle, die direkt Antworten formulieren.",
  },
  {
    q: "Was ist der Unterschied zwischen GEO und SEO?",
    a: "SEO optimiert für Suchalgorithmen, die Webseiten in einer Trefferliste sortieren. GEO optimiert für den Output-Layer, also die KI-generierte Antwort selbst. Bei SEO will man auf Platz 1 der Ergebnisliste. Bei GEO will man in der Antwort genannt werden, die der Nutzer statt der Liste bekommt.",
  },
  {
    q: "Kann ich GEO selbst umsetzen?",
    a: "Grundlegende Schritte wie das Erstellen eines llms.txt-Files oder das Überarbeiten von Inhalten im Answer-first-Format sind technisch machbar. Für systematische Citation-Strategien, Digital PR und Topical-Authority-Aufbau empfiehlt sich jedoch professionelle Unterstützung. KI-Systeme entwickeln sich schnell, und wer jetzt strategisch vorgeht, sichert sich einen Vorsprung.",
  },
  {
    q: "Wie schnell sieht man Ergebnisse bei GEO?",
    a: "Das hängt stark davon ab, wie stark Ihre Marke bereits digital verankert ist. Erste Erwähnungen in KI-Antworten sind nach einigen Wochen möglich, wenn Sie gezielte Maßnahmen umsetzen. Systematische und konsistente Citations aufzubauen, die stabil bleiben, dauert erfahrungsgemäß 3 bis 6 Monate.",
  },
  {
    q: "Welche Plattformen sind für GEO relevant?",
    a: "Die wichtigsten sind Google AI Overviews (in Suchergebnissen), ChatGPT (mit Browsing-Funktion), Perplexity AI, Microsoft Copilot und zunehmend auch branchenspezifische KI-Assistenten. Die genaue Gewichtung variiert je nach Branche und Zielgruppe.",
  },
  {
    q: "Brauche ich GEO, wenn ich schon gute SEO-Rankings habe?",
    a: "Ja. Gute SEO-Rankings und GEO-Sichtbarkeit überschneiden sich nur teilweise. KI-Systeme zitieren nicht automatisch die Seiten mit den besten Rankings. Sie bewerten Autorität, Strukturierung, E-E-A-T und die Art, wie Inhalte formuliert sind. Wer heute nur SEO betreibt, verliert morgen Traffic an KI-Antworten, ohne es zu merken.",
  },
];

/* ------------------------------------------------------------------ */
/*  GEO STEPS                                                          */
/* ------------------------------------------------------------------ */
const geoSteps = [
  {
    number: "01",
    title: "KI verarbeitet Webinhalte",
    text: "Große Sprachmodelle werden auf riesigen Mengen an Webinhalten trainiert und rufen beim Generieren von Antworten aktiv Quellen ab. Was nicht im Netz steht oder schlecht strukturiert ist, kann nicht zitiert werden. Das bedeutet: Sichtbarkeit beginnt mit der Qualität und Auffindbarkeit Ihrer Inhalte.",
  },
  {
    number: "02",
    title: "Topical Authority aufbauen",
    text: "KI-Systeme bevorzugen Quellen, die ein Thema umfassend und konsistent behandeln. Wer als Anlaufstelle für ein bestimmtes Wissensgebiet gilt, wird häufiger zitiert als eine Seite mit einem einzelnen Artikel. Topical Authority entsteht durch inhaltliche Tiefe, thematische Konsistenz und eine klare Positionierung.",
  },
  {
    number: "03",
    title: "E-E-A-T-Signale stärken",
    text: "Erfahrung, Expertise, Autorität und Vertrauenswürdigkeit. KI-Modelle erkennen Signale wie Autorenprofile, Quellenbelege, externe Verlinkungen und redaktionelle Tiefe. Diese Signale entscheiden, ob Ihre Inhalte als zitierwürdig gelten — und wie stark Ihr Markenname mit einem Thema assoziiert wird.",
  },
  {
    number: "04",
    title: "Citation-würdige Inhalte erstellen",
    text: "Inhalte müssen so formuliert sein, dass eine KI sie direkt in eine Antwort einbauen kann. Das bedeutet präzise Definitionen, klare Aussagen, gut strukturierte Abschnitte und ein Format, das auf Fragen antwortet statt auf Klicks zu optimieren. Jeder Abschnitt sollte eigenständig verständlich und zitierfähig sein.",
  },
];

/* ------------------------------------------------------------------ */
/*  GEO MASSNAHMEN                                                     */
/* ------------------------------------------------------------------ */
const massnahmen = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "Answer-first Content",
    text: "Inhalte beginnen mit der direkten Antwort auf die Frage, bevor sie in Details gehen. KI-Systeme extrahieren genau diesen ersten Satz — und formulieren daraus ihre Antwort. Wer im zweiten Absatz auf den Punkt kommt, wird kaum zitiert.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "llms.txt",
    text: "Eine maschinenlesbare Datei, die KI-Crawlern erklärt, welche Inhalte Ihrer Website am relevantesten sind. Ähnlich wie robots.txt, aber für Sprachmodelle. Sie gibt KI-Systemen eine direkte Orientierung darüber, wie Ihre Marke und Ihr Angebot einzuordnen sind.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "Digital PR und Citations",
    text: "Erwähnungen und Verlinkungen in vertrauenswürdigen Quellen signalisieren KI-Systemen, dass Ihre Marke Teil des Wissenskorpus eines Themas ist. Je mehr hochwertige Quellen Ihre Marke nennen, desto wahrscheinlicher erscheint sie in generierten Antworten.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "E-E-A-T stärken",
    text: "Autorenprofile, Quellenangaben, externe Verlinkungen und nachgewiesene Erfahrung machen Inhalte für KI-Systeme glaubwürdiger und zitierwürdiger. E-E-A-T ist kein abstraktes Konzept — es ist ein messbares Signal, das sich durch redaktionelle Sorgfalt aufbauen lässt.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: "Schema.org Markup",
    text: "Strukturierte Daten helfen KI-Systemen, den Kontext Ihrer Inhalte besser zu verstehen. FAQ, HowTo und Article-Schema sind besonders wirksam. Sie liefern maschinenlesbare Metainformationen, die KI beim Zuordnen von Inhalten zu Nutzeranfragen direkt verwerten kann.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: "Topical Authority",
    text: "Ein zusammenhängendes Netz von Inhalten zu einem Thema signalisiert Expertise. Wer ein Thema vollständig abdeckt, gilt als Autorität und wird häufiger zitiert. Das bedeutet nicht mehr Inhalte um des Inhalts willen — sondern strategisch aufgebaute inhaltliche Tiefe.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function WasIstGeoClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [definitionRef, definitionInView] = useInView();
  const [stepsRef, stepsInView] = useInView();
  const [compareRef, compareInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [massnahmenRef, massnahmenInView] = useInView();
  const [faqRef, faqInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/[0.07] via-secondary/[0.04] to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-gradient-to-tr from-secondary/[0.05] to-transparent blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Wissensartikel
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-4xl lg:text-6xl font-bold text-dark leading-[1.1] mb-6">
            Was ist GEO?
            <span className="block text-primary mt-1">Generative Engine Optimization erklärt</span>
          </h1>

          <p className="text-lg lg:text-xl text-muted leading-relaxed max-w-2xl">
            KI verändert, wie Menschen Informationen finden. Statt auf Links zu klicken, lesen sie direkt generierte Antworten. GEO ist die Disziplin, sicherzustellen, dass Ihre Marke in diesen Antworten vorkommt, nicht nur in der Linkliste dahinter.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["ChatGPT", "Perplexity AI", "Google AI Overviews", "Microsoft Copilot"].map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-border bg-offwhite px-4 py-1.5 text-sm text-dark/70 font-medium"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DEFINITION BLOCK                                             */}
      {/* ============================================================ */}
      <section
        ref={definitionRef as React.RefObject<HTMLElement>}
        className="bg-offwhite border-y border-border py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              definitionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left: prose text — 8 cols */}
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                    Definition
                  </span>
                  <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-6">
                    Was bedeutet GEO?
                  </h2>
                </div>

                <p className="text-lg lg:text-xl leading-relaxed text-dark/80 font-[family-name:var(--font-heading)]">
                  <strong className="text-dark">Generative Engine Optimization (GEO)</strong> ist die Optimierung von Inhalten und Marken für den Output-Layer moderner KI-Systeme. Das Ziel ist nicht, in einer Suchtrefferliste aufzutauchen, sondern direkt in der KI-generierten Antwort zitiert zu werden.
                </p>
                <p className="text-base lg:text-lg leading-relaxed text-muted">
                  Wenn jemand ChatGPT fragt, welche SEO Agentur er empfehlen kann, durchsucht das Modell sein trainiertes Wissen und aktuelle Quellen. GEO sorgt dafür, dass Ihre Marke in diesem Prozess vorkommt. Das unterscheidet GEO klar von klassischem SEO, das für Such-Algorithmen optimiert, und von LLMO (Large Language Model Optimization), die auf das Training der Modelle selbst abzielt. GEO arbeitet auf dem Output-Layer: der Antwort, die der Nutzer sieht.
                </p>
                <p className="text-base lg:text-lg leading-relaxed text-muted">
                  Diese Verschiebung ist fundamental. Früher reichte es, für einen bestimmten Suchbegriff gut zu ranken. Heute entscheidet ein Modell auf Basis von Autorität, Struktur und inhaltlicher Tiefe, welche Marken in seiner Antwort Platz finden. Wer nicht explizit für diesen Auswahlprozess optimiert, wird schlicht nicht genannt — unabhängig davon, wie gut seine SEO ist.
                </p>
                <p className="text-base lg:text-lg leading-relaxed text-muted">
                  GEO ist damit keine Ablösung von SEO, sondern eine notwendige Erweiterung. Beide Disziplinen greifen ineinander: Starke SEO-Grundlagen helfen KI-Systemen, Ihre Inhalte zu indexieren und zu verstehen. GEO sorgt dafür, dass diese Inhalte in den generierten Antworten auch tatsächlich auftauchen und Ihre Marke als Referenz genannt wird.
                </p>
              </div>

              {/* Right: image — 4 cols */}
              <div className="lg:col-span-4">
                <figure>
                  <img
                    src="/images/geo-ai-citation.png"
                    alt="KI-Chat-Interface das eine Marke in seiner Antwort direkt zitiert"
                    className="rounded-xl border border-border shadow-md w-full"
                  />
                  <figcaption className="mt-3 text-xs text-muted leading-snug italic">
                    KI-Antworten zitieren Marken direkt — GEO sorgt dafür, dass Ihre Marke dabei ist.
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW GEO WORKS — 4 STEPS                                     */}
      {/* ============================================================ */}
      <section
        ref={stepsRef as React.RefObject<HTMLElement>}
        className="bg-white py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              stepsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="mb-10">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                So funktioniert es
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight max-w-2xl">
                Wie GEO funktioniert
              </h2>
            </div>

            {/* Introductory prose */}
            <div className="space-y-4 mb-14 max-w-3xl">
              <p className="text-base lg:text-lg leading-relaxed text-muted">
                GEO ist kein einzelner Hebel. Es ist ein Zusammenspiel aus Inhalt, Autorität und technischer Struktur. Um zu verstehen, warum bestimmte Marken in KI-Antworten auftauchen und andere nicht, muss man verstehen, wie Sprachmodelle Quellen auswählen und verarbeiten.
              </p>
              <p className="text-base lg:text-lg leading-relaxed text-muted">
                KI-Systeme wie ChatGPT oder Perplexity generieren keine Antworten aus dem Nichts. Sie greifen auf zwei Quellen zurück: das Wissen aus ihrem Training — also alles, was sie während des Lernprozesses verarbeitet haben — und aktuelle Webinhalte, die sie in Echtzeit abrufen. Beide Quellen können Sie beeinflussen. GEO setzt genau dort an.
              </p>
              <p className="text-base lg:text-lg leading-relaxed text-muted">
                Der entscheidende Faktor ist nicht, ob Sie gefunden werden, sondern ob Sie als vertrauenswürdige Quelle eingestuft werden. Vier Mechanismen sind dafür zentral: die technische Auffindbarkeit Ihrer Inhalte, thematische Tiefe und Konsistenz, nachweisbare Autorität und ein Format, das KI-Systemen die direkte Übernahme in ihre Antworten erleichtert.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {geoSteps.map((step, i) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-border bg-offwhite p-7 transition-all duration-300 hover:shadow-md hover:border-primary/20"
                  style={{ transitionDelay: stepsInView ? `${i * 80}ms` : "0ms" }}
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white font-[family-name:var(--font-heading)] font-bold text-lg">
                    {step.number}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>

            {/* Layers diagram — full width below cards */}
            <figure className="mt-10">
              <img
                src="/images/geo-layers-diagram.png"
                alt="Diagramm der drei Optimierungsebenen: SEO Algorithm Layer, LLMO Model Layer, GEO Output Layer"
                className="rounded-2xl border border-border shadow-lg w-full"
              />
              <figcaption className="mt-4 text-xs text-muted text-center leading-snug italic">
                Die drei Optimierungsebenen: SEO (Algorithm Layer), LLMO (Model Layer) und GEO (Output Layer).
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  GEO VS SEO VS LLMO                                          */}
      {/* ============================================================ */}
      <section
        ref={compareRef as React.RefObject<HTMLElement>}
        className="bg-offwhite border-y border-border py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              compareInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                Vergleich
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight">
                GEO vs. SEO vs. LLMO
              </h2>
              <p className="mt-4 text-muted text-base lg:text-lg max-w-2xl leading-relaxed">
                Alle drei Disziplinen hängen zusammen, arbeiten aber auf verschiedenen Ebenen. Hier ist der Unterschied auf einen Blick.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  acronym: "SEO",
                  layer: "Algorithm Layer",
                  layerColor: "bg-blue-100 text-blue-700",
                  title: "Search Engine Optimization",
                  description:
                    "Optimiert Webseiten für Suchalgorithmen wie Google. Ziel ist ein gutes Ranking in der Trefferliste. SEO arbeitet auf der Ebene der Ranking-Faktoren: Ladezeit, Backlinks, Keywords, Struktur.",
                  what: "Trefferlisten-Position",
                  how: "Ranking-Algorithmen",
                  borderClass: "border-blue-200",
                  iconBg: "bg-blue-50",
                  iconColor: "text-blue-600",
                },
                {
                  acronym: "GEO",
                  layer: "Output Layer",
                  layerColor: "bg-primary/10 text-primary",
                  title: "Generative Engine Optimization",
                  description:
                    "Optimiert Inhalte und Marken dafür, in KI-generierten Antworten zitiert zu werden. GEO arbeitet auf dem Output-Layer: der fertigen Antwort, die der Nutzer bekommt, statt einer Linkliste.",
                  what: "Citation in KI-Antworten",
                  how: "Output-Qualität und Autorität",
                  borderClass: "border-primary/30",
                  iconBg: "bg-primary/[0.06]",
                  iconColor: "text-primary",
                  highlight: true,
                },
                {
                  acronym: "LLMO",
                  layer: "Model Layer",
                  layerColor: "bg-violet-100 text-violet-700",
                  title: "Large Language Model Optimization",
                  description:
                    "Versucht, das Wissen, das in KI-Modellen trainiert ist, zu beeinflussen. Das passiert über Trainingsdaten-Qualität und breit angelegte Markenpräsenz im Web über lange Zeiträume.",
                  what: "Trainingsdaten-Präsenz",
                  how: "Modelltraining",
                  borderClass: "border-violet-200",
                  iconBg: "bg-violet-50",
                  iconColor: "text-violet-600",
                },
              ].map((item) => (
                <div
                  key={item.acronym}
                  className={`rounded-2xl border ${item.borderClass} bg-white p-8 flex flex-col ${
                    item.highlight ? "ring-1 ring-primary/20 shadow-lg shadow-primary/[0.06]" : ""
                  }`}
                >
                  {item.highlight && (
                    <div className="mb-4 self-start rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white">
                      Diese Seite
                    </div>
                  )}
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}>
                    <span className={`font-[family-name:var(--font-heading)] font-bold text-sm ${item.iconColor}`}>
                      {item.acronym}
                    </span>
                  </div>
                  <span className={`mb-3 self-start rounded-full px-3 py-0.5 text-xs font-semibold ${item.layerColor}`}>
                    {item.layer}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6 flex-1">{item.description}</p>
                  <div className="border-t border-border pt-5 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Ziel</span>
                      <span className="text-dark font-medium text-right">{item.what}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Hebel</span>
                      <span className="text-dark font-medium text-right">{item.how}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY GEO MATTERS NOW                                         */}
      {/* ============================================================ */}
      <section
        ref={statsRef as React.RefObject<HTMLElement>}
        className="bg-white py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                Warum jetzt
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight max-w-2xl">
                Warum GEO jetzt wichtig ist
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left: prose text */}
              <div className="lg:col-span-6 space-y-5">
                <p className="text-base lg:text-lg leading-relaxed text-muted">
                  Google hat mit AI Overviews bereits begonnen, einen Großteil der Suchanfragen mit KI-generierten Antworten zu beantworten. Wer diese Antwort bekommt, klickt seltener auf die organischen Treffer darunter. Das nennt man Zero-Click-Search.
                </p>
                <p className="text-base lg:text-lg leading-relaxed text-muted">
                  Gleichzeitig nutzen immer mehr Menschen ChatGPT, Perplexity und ähnliche Tools direkt als Recherchewerkzeug. Sie fragen nicht mehr nach Links. Sie fragen nach Empfehlungen, Erklärungen und Einschätzungen. Marken, die in diesen Antworten fehlen, existieren für diese Nutzer schlicht nicht.
                </p>
                <p className="text-base lg:text-lg leading-relaxed text-muted">
                  Wer heute wartet, lässt anderen Unternehmen die Möglichkeit, sich als Referenz in KI-Modellen zu etablieren. Das wird schwerer zu korrigieren, je mehr dieser Wissenskorpus sich verfestigt.
                </p>

                <div className="pt-4">
                  <Link
                    href="/geo-agentur"
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Was unsere GEO Agentur konkret macht
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right: ecosystem image + stats grid */}
              <div className="lg:col-span-6">
                <figure className="mb-6">
                  <img
                    src="/images/geo-platforms-ecosystem.png"
                    alt="Ihre Marke im Zentrum des KI-Plattform-Ökosystems: ChatGPT, Perplexity, Gemini, Copilot, AI Overviews, Claude"
                    className="rounded-xl border border-border shadow-md w-full"
                  />
                  <figcaption className="mt-3 text-xs text-muted leading-snug italic">
                    GEO bedeutet: auf allen KI-Plattformen gleichzeitig sichtbar sein.
                  </figcaption>
                </figure>

                {/* Stats in 2x2 grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      stat: "58 %",
                      label: "der Google-Suchanfragen enden ohne Klick auf eine Website",
                      source: "SparkToro, 2024",
                    },
                    {
                      stat: "72 %",
                      label: "der 18- bis 34-Jährigen nutzen KI-Tools für Recherchen",
                      source: "HubSpot Research, 2024",
                    },
                    {
                      stat: "1 Mrd.+",
                      label: "monatliche Nutzer bei ChatGPT allein",
                      source: "OpenAI, 2025",
                    },
                    {
                      stat: "AI Overviews",
                      label: "erscheinen bei einem Großteil informationaler Suchanfragen in den USA",
                      source: "Google I/O, 2024",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border bg-offwhite p-4"
                    >
                      <span className="font-[family-name:var(--font-heading)] text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block mb-1">
                        {item.stat}
                      </span>
                      <p className="text-xs text-dark leading-relaxed mb-1">{item.label}</p>
                      <p className="text-xs text-muted">{item.source}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  GEO MASSNAHMEN                                              */}
      {/* ============================================================ */}
      <section
        ref={massnahmenRef as React.RefObject<HTMLElement>}
        className="bg-offwhite border-y border-border py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              massnahmenInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="mb-6">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                Konkrete Maßnahmen
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight max-w-2xl">
                Was GEO in der Praxis bedeutet
              </h2>
            </div>

            {/* Editorial intro paragraphs */}
            <div className="space-y-4 mb-14 max-w-3xl">
              <p className="text-base lg:text-lg leading-relaxed text-muted">
                GEO ist keine einzelne Maßnahme, die man einmal umsetzt und vergisst. Es ist ein koordiniertes System aus inhaltlichen, technischen und redaktionellen Hebeln — die alle in dieselbe Richtung arbeiten: Ihre Marke als zitierwürdige Quelle in KI-Systemen zu verankern.
              </p>
              <p className="text-base lg:text-lg leading-relaxed text-muted">
                Was diese Maßnahmen verbindet, ist das Prinzip der Vertrauenswürdigkeit. KI-Systeme zitieren keine Marken, weil sie laut oder häufig sichtbar sind. Sie zitieren Marken, die ihnen als verlässliche, strukturierte und thematisch relevante Quelle bekannt sind. Jede der folgenden Maßnahmen stärkt genau dieses Signal.
              </p>
              <p className="text-base lg:text-lg leading-relaxed text-muted">
                Die größte Wirkung entfalten diese Hebel nicht einzeln, sondern im Zusammenspiel. Wer nur ein llms.txt-File anlegt, ohne seine Inhalte zu überarbeiten, wird wenig erreichen. Wer dagegen Content, Struktur, Autorität und externe Präsenz systematisch aufbaut, schafft eine kumulative Wirkung, die sich in stabilen Citations niederschlägt.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {massnahmen.map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:shadow-md hover:border-primary/20"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">
                    {m.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark mb-2">
                    {m.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/[0.03] p-8">
              <div className="grid lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-9">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-2">
                    Diese Maßnahmen brauchen eine Strategie dahinter.
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    Einzelne Maßnahmen bringen begrenzte Ergebnisse. Was GEO wirklich wirkungsvoll macht, ist ein systematischer Ansatz, der alle Hebel koordiniert. Als{" "}
                    <Link href="/" className="text-primary font-medium hover:underline">
                      SEO Agentur
                    </Link>{" "}
                    entwickeln wir GEO-Strategien, die messbar sind und sich mit Ihren bestehenden SEO-Maßnahmen verbinden.
                  </p>
                </div>
                <div className="lg:col-span-3 flex lg:justify-end">
                  <Link
                    href="/geo-agentur"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 whitespace-nowrap"
                  >
                    Zur GEO Agentur
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section
        ref={faqRef as React.RefObject<HTMLElement>}
        className="bg-white py-24 lg:py-32"
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="mb-12 text-center">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                Häufige Fragen
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark">
                FAQ zu GEO
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-offwhite overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-[family-name:var(--font-heading)] font-semibold text-dark pr-4 leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`shrink-0 h-6 w-6 rounded-full border border-border flex items-center justify-center text-muted transition-transform duration-200 ${
                        openFaq === i ? "rotate-45 border-primary text-primary" : ""
                      }`}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        className="bg-dark py-20 lg:py-28"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-700 ${
              ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-5">
              Nächster Schritt
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Bereit, in KI-Antworten sichtbar zu werden?
            </h2>
            <p className="text-white/60 text-base lg:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Wir entwickeln Ihre GEO-Strategie, analysieren wo Sie heute stehen und zeigen, welche Maßnahmen die größte Wirkung haben.
            </p>
            <Link
              href="/geo-agentur"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/40"
            >
              Jetzt GEO-Strategie entwickeln
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
