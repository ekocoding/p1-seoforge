"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";
import EditorMockup from "./EditorMockup";
import OrderForm from "./OrderForm";

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
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1, ...opts }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

/* ------------------------------------------------------------------ */
/*  ANIMATED COUNTER                                                   */
/* ------------------------------------------------------------------ */
function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800, start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">{count}{suffix}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  REVEAL CARD — for text samples section                             */
/* ------------------------------------------------------------------ */
function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
const faqs = [
  { q: "Was kosten SEO Texte bei SeoForge?", a: "Die Preise richten sich nach Textlaenge, Recherche-Aufwand und Thema. Blog-Artikel ab 350 Euro, Landingpages ab 500 Euro, Produkttexte ab 80 Euro pro Stueck. Im Erstgespraech erstellen wir ein individuelles Angebot." },
  { q: "Wie lange dauert die Texterstellung?", a: "Standard-Lieferzeit ist 5–7 Werktage nach Briefing-Freigabe. Express-Lieferung in 2–3 Tagen ist gegen Aufpreis moeglich. Bei groesseren Projekten erstellen wir einen Redaktionsplan mit klaren Meilensteinen." },
  { q: "Schreibt ihr auch in Englisch?", a: "Ja, wir erstellen SEO-Texte auf Deutsch und Englisch. Fuer andere Sprachen arbeiten wir mit muttersprachlichen Textern zusammen. Sprechen Sie uns an." },
  { q: "Wie stellt ihr sicher, dass die Texte ranken?", a: "Jeder Text basiert auf Keyword-Recherche, Wettbewerbsanalyse und Suchintentions-Analyse. Wir optimieren Struktur, Meta-Daten und interne Verlinkung. Dazu pruefen wir jeden Text mit professionellen SEO-Tools vor der Lieferung." },
  { q: "Kann ich Aenderungen anfordern?", a: "Selbstverstaendlich. Eine Korrekturschleife ist immer inklusive. Wir arbeiten eng mit Ihnen zusammen, bis der Text Ihren Vorstellungen entspricht." },
  { q: "Liefert ihr auch die Meta-Daten mit?", a: "Ja, jeder Text wird mit optimiertem Meta-Title, Meta-Description und Empfehlungen fuer die URL-Struktur geliefert. Auf Wunsch auch mit internen Verlinkungsvorschlaegen und Schema-Markup-Empfehlungen." },
];

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function SeoTextePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFormat, setActiveFormat] = useState(0);
  const [whyRef, whyInView] = useInView();
  const [formatRef, formatInView] = useInView();
  const [processRef, processInView] = useInView();
  const [sampleRef, sampleInView] = useInView();
  const [faqRef, faqInView] = useInView();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const formats = [
    {
      title: "Blog-Artikel & Ratgeber",
      desc: "Informative Longreads, die Expertise demonstrieren, organischen Traffic aufbauen und Ihre Zielgruppe durch den Funnel begleiten. Recherchiert, strukturiert, optimiert.",
      specs: "1.500–3.000 Woerter | 5–7 Werktage | inkl. Meta-Daten",
      features: ["Keyword-Recherche & Mapping", "Wettbewerber-Content-Analyse", "Heading-Struktur (H1–H6)", "Interne Verlinkungsvorschlaege", "Featured-Snippet-Optimierung", "Lesbarkeits-Check"],
    },
    {
      title: "Landingpages & Service-Seiten",
      desc: "Conversion-fokussierte Seiten, die fuer spezifische Keywords ranken und Besucher in Anfragen verwandeln. Klar strukturiert, ueberzeugend getextet, SEO-optimiert.",
      specs: "800–2.000 Woerter | 5–7 Werktage | inkl. CTA-Strategie",
      features: ["Suchintentions-Analyse", "Conversion-Copywriting", "Trust-Elemente & Social Proof", "Schema Markup Empfehlungen", "A/B-Test-Varianten auf Wunsch", "Mobile-optimierte Struktur"],
    },
    {
      title: "Produktbeschreibungen",
      desc: "SEO-optimierte Produkttexte, die sowohl in der Google-Suche als auch auf Kategorie-Seiten ueberzeugen. Einzigartig, nicht generiert, mit Verkaufspsychologie.",
      specs: "150–500 Woerter | Bulk moeglich | inkl. Meta-Daten",
      features: ["Unique Content pro Produkt", "Feature-Benefit-Struktur", "Keyword-Integration natuerlich", "Kategorie-Kontext beruecksichtigt", "Structured Data Empfehlung", "Skalierbar ab 10 Stueck"],
    },
    {
      title: "Kategorietexte & Pillar Pages",
      desc: "Umfassende Uebersichtsseiten, die thematische Autoritaet aufbauen und als Hub fuer Ihre Topic-Cluster dienen. Der Anker Ihrer Content-Strategie.",
      specs: "2.000–5.000 Woerter | 7–10 Werktage | inkl. Cluster-Plan",
      features: ["Topic-Cluster-Architektur", "Interne Link-Strategie", "FAQ-Sektion mit Schema", "Visuelles Content-Konzept", "E-E-A-T-Signale eingebaut", "Update-Strategie inkludiert"],
    },
  ];

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-secondary/[0.06] via-primary/[0.04] to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-primary/[0.05] to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary hero-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Professionelle SEO Texte
              </div>
              <h1 className="hero-title text-5xl lg:text-6xl leading-[1.12] text-dark font-[family-name:var(--font-heading)]">
                <span className="block">SEO Texte, die</span>
                <span className="text-primary">ranken und verkaufen</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                SEO Texte, die nicht nach SEO klingen. Wir schreiben Inhalte, die Google versteht und Ihre Zielgruppe ueberzeugt — recherchiert, strukturiert und auf Conversion optimiert.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {["Keyword-recherchiert", "Unique Content", "Lieferung in 5–7 Tagen"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="#bestellen" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30">
                  Texte anfragen
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#formate" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:bg-primary/[0.04] hover:text-primary">
                  Content-Formate
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.6s" }}>
                <div className="flex -space-x-2">
                  {["SK", "ML", "RB", "JT", "AW"].map((init, i) => (
                    <div key={init} className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 text-[10px] font-semibold text-white ring-2 ring-white" style={{ zIndex: 5 - i }}>{init}</div>
                  ))}
                </div>
                <p className="text-xs text-muted">Ueber <span className="font-semibold text-dark">5.000 Texte</span> ausgeliefert</p>
              </div>
            </div>
            <EditorMockup />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STATS                                                        */}
      {/* ============================================================ */}
      <section className="bg-offwhite border-y border-border py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter value={5000} suffix="+" label="Texte ausgeliefert" />
            <Counter value={94} suffix="/100" label="Durchschn. SEO Score" />
            <Counter value={340} suffix="%" label="Mehr organischer Traffic" />
            <Counter value={98} suffix="%" label="Kundenzufriedenheit" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY — Editorial with "manuscript" eyecatcher                 */}
      {/* ============================================================ */}
      <section ref={whyRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`transition-all duration-700 ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

            <div className="mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Warum es wichtig ist</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight max-w-3xl">
                Content ist nicht gleich Content
              </h2>
            </div>

            <div className="mb-12 max-w-4xl">
              <p className="text-xl lg:text-2xl leading-relaxed text-dark/80 font-[family-name:var(--font-heading)]">
                Jeder kann Texte schreiben. Aber Texte, die gleichzeitig <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">ranken, ueberzeugen und konvertieren</span> — das erfordert Methode, Recherche und Erfahrung.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
              <div className="lg:col-span-7 space-y-6">
                <p className="text-muted text-base lg:text-lg leading-relaxed">
                  Die meisten Unternehmen unterschaetzen, was in einem guten SEO-Text steckt. Es beginnt mit der Keyword-Recherche: Welche Begriffe sucht Ihre Zielgruppe tatsaechlich? In welcher Phase der Customer Journey? Mit welcher Intention? Erst wenn diese Fragen beantwortet sind, beginnt das eigentliche Schreiben.
                </p>
                <p className="text-muted text-base lg:text-lg leading-relaxed">
                  Unsere Texter verbinden journalistische Qualitaet mit SEO-Expertise. Jeder Text wird individuell recherchiert, strukturiert und optimiert — kein Template, kein KI-Output, kein Copy-Paste. Das Ergebnis sind Inhalte, die Google als relevant einstuft und die Ihre Leser zum Handeln bewegen.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-gradient-to-br from-primary/[0.04] to-secondary/[0.03] border border-primary/10 p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">Was guten SEO-Content ausmacht</h3>
                  </div>
                  <ul className="space-y-3">
                    {["Basiert auf echter Keyword-Recherche", "Beantwortet die Suchintention vollstaendig", "Strukturiert fuer Leser UND Suchmaschinen", "Einzigartig — kein Duplicate Content", "Integriert natuerliche interne Verlinkung", "Liefert mehr Tiefe als die Konkurrenz"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-dark/80 leading-relaxed">
                        <span className="mt-0.5 text-primary font-bold font-[family-name:var(--font-heading)]">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* EYECATCHER: Content Creation Workspace */}
            <div className="rounded-3xl bg-gradient-to-br from-offwhite to-white border border-border overflow-hidden shadow-xl shadow-dark/[0.04] p-6 lg:p-10">
              {/* Workspace header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">Content Workspace</h3>
                    <p className="text-xs text-muted">Live-Einblick in unseren Schreibprozess</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-semibold text-green-700">SEO Score: 94</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-offwhite border border-border text-[10px] text-muted font-medium">1.847 Woerter</div>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-6">
                {/* Main writing area — 3 cols */}
                <div className="lg:col-span-3 space-y-5">
                  {/* Keyword tags */}
                  <div>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-wide mb-2">Ziel-Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { kw: "seo texte kaufen", vol: "1.200", primary: true },
                        { kw: "seo content erstellen", vol: "880", primary: false },
                        { kw: "professionelle webtexte", vol: "590", primary: false },
                        { kw: "texte schreiben lassen", vol: "1.600", primary: false },
                      ].map((k) => (
                        <span key={k.kw} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${k.primary ? "bg-primary text-white" : "bg-white border border-border text-dark/70"}`}>
                          {k.kw}
                          <span className={`text-[9px] ${k.primary ? "text-white/70" : "text-muted"}`}>{k.vol}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Article structure preview */}
                  <div className="rounded-xl border border-border bg-white p-6">
                    <div className="space-y-3">
                      {/* H1 */}
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 mt-0.5 text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">H1</span>
                        <div className="flex-1">
                          <div className="h-6 rounded bg-dark/80 w-4/5" />
                        </div>
                      </div>
                      {/* Intro paragraph */}
                      <div className="pl-10 space-y-1.5">
                        <div className="h-2.5 rounded bg-dark/8 w-full" />
                        <div className="h-2.5 rounded bg-dark/8 w-11/12" />
                        <div className="h-2.5 rounded bg-primary/15 w-3/4" />
                      </div>
                      {/* H2 */}
                      <div className="flex items-start gap-3 pt-2">
                        <span className="shrink-0 mt-0.5 text-[9px] font-bold text-secondary bg-secondary/10 px-1.5 py-0.5 rounded">H2</span>
                        <div className="flex-1"><div className="h-5 rounded bg-dark/60 w-3/5" /></div>
                      </div>
                      <div className="pl-10 space-y-1.5">
                        <div className="h-2.5 rounded bg-dark/8 w-full" />
                        <div className="h-2.5 rounded bg-dark/8 w-10/12" />
                        <div className="h-2.5 rounded bg-dark/8 w-full" />
                        <div className="h-2.5 rounded bg-primary/12 w-2/3" />
                      </div>
                      {/* H2 */}
                      <div className="flex items-start gap-3 pt-2">
                        <span className="shrink-0 mt-0.5 text-[9px] font-bold text-secondary bg-secondary/10 px-1.5 py-0.5 rounded">H2</span>
                        <div className="flex-1"><div className="h-5 rounded bg-dark/60 w-2/5" /></div>
                      </div>
                      <div className="pl-10 space-y-1.5">
                        <div className="h-2.5 rounded bg-dark/8 w-full" />
                        <div className="h-2.5 rounded bg-dark/8 w-9/12" />
                      </div>
                      {/* H3 */}
                      <div className="flex items-start gap-3 pt-1">
                        <span className="shrink-0 mt-0.5 text-[8px] font-bold text-muted bg-offwhite px-1.5 py-0.5 rounded border border-border">H3</span>
                        <div className="flex-1"><div className="h-4 rounded bg-dark/40 w-1/3" /></div>
                      </div>
                      <div className="pl-10 space-y-1.5">
                        <div className="h-2.5 rounded bg-dark/8 w-full" />
                        <div className="h-2.5 rounded bg-dark/8 w-11/12" />
                        <div className="h-2.5 rounded bg-primary/10 w-4/5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar — 2 cols */}
                <div className="lg:col-span-2 space-y-5">
                  {/* Quality metrics */}
                  <div className="rounded-xl border border-border bg-white p-5">
                    <h4 className="text-sm font-semibold text-dark mb-4">Content-Qualitaet</h4>
                    <div className="space-y-4">
                      {[
                        { label: "Lesbarkeit", score: "A+", pct: 96, color: "bg-green-500" },
                        { label: "Keyword-Integration", score: "2.4%", pct: 88, color: "bg-primary" },
                        { label: "Einzigartigkeit", score: "100%", pct: 100, color: "bg-green-500" },
                        { label: "Struktur", score: "Optimal", pct: 92, color: "bg-primary" },
                      ].map((m) => (
                        <div key={m.label}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs text-muted">{m.label}</span>
                            <span className="text-xs font-semibold text-dark">{m.score}</span>
                          </div>
                          <div className="h-1.5 bg-border rounded-full overflow-hidden">
                            <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables checklist */}
                  <div className="rounded-xl border border-primary/15 bg-gradient-to-br from-primary/[0.04] to-secondary/[0.02] p-5">
                    <h4 className="text-sm font-semibold text-dark mb-3">Im Lieferumfang</h4>
                    <div className="space-y-2">
                      {["SEO-optimierter Fliesstext", "Meta-Title & Description", "Heading-Struktur (H1–H3)", "Interne Link-Empfehlungen", "Keyword-Dichte geprueft", "Plagiatspruefung bestanden"].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          <span className="text-xs text-dark/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FORMATE — Switchable format cards                            */}
      {/* ============================================================ */}
      <section id="formate" ref={formatRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${formatInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Content-Formate</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Welchen Content brauchen Sie?</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Jedes Format hat seinen Zweck. Waehlen Sie, was zu Ihren Zielen passt.</p>
          </div>

          <div className={`transition-all duration-700 delay-200 ${formatInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Format selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {formats.map((f, i) => (
                <button key={i} onClick={() => setActiveFormat(i)} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeFormat === i ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white border border-border text-dark/70 hover:border-primary/30 hover:text-primary"}`}>
                  {f.title.split(" & ")[0]}
                </button>
              ))}
            </div>

            {/* Active format detail */}
            {formats.map((f, i) => (
              <div key={i} className={`${activeFormat === i ? "block" : "hidden"}`}>
                <div className="bg-white rounded-2xl border border-border p-8 lg:p-12 shadow-sm">
                  <div className="grid lg:grid-cols-2 gap-10">
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-4">{f.title}</h3>
                      <p className="text-muted text-base lg:text-lg leading-relaxed mb-4">{f.desc}</p>
                      <p className="text-xs font-medium text-primary bg-primary/[0.06] inline-block px-3 py-1.5 rounded-full mb-6">{f.specs}</p>
                      <Link href="#bestellen" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
                        Dieses Format anfragen
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </Link>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-[0.15em] uppercase text-muted mb-4">Inklusive:</p>
                      <ul className="space-y-3">
                        {f.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-dark/80">
                            <svg className="w-4 h-4 mt-0.5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROZESS — Content creation journey                           */}
      {/* ============================================================ */}
      <section ref={processRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Prozess</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Vom Briefing zum fertigen Text</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Fuenf Stationen, ein Ziel: Content, der rankt und konvertiert.</p>
          </div>

          <div className={`transition-all duration-700 delay-200 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Journey visualization — alternating left/right like a winding road */}
            <div className="relative">
              {/* Dashed center line (desktop) */}
              <div className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px border-l-[2px] border-dashed border-primary/20 pointer-events-none" />

              <div className="space-y-8 lg:space-y-0">
                {[
                  {
                    num: "01", title: "Briefing", subtitle: "Was soll der Text leisten?",
                    desc: "Wir klaeren gemeinsam: Wer ist die Zielgruppe? Welches Ziel verfolgt der Text? Welche Keywords sind relevant? Gibt es Vorgaben zu Tonalitaet und Laenge? Je praeziser das Briefing, desto besser das Ergebnis.",
                    detail: "Dauer: 30 Min. Call oder Briefing-Formular",
                    side: "left",
                  },
                  {
                    num: "02", title: "Recherche", subtitle: "Daten sammeln, Wettbewerb verstehen",
                    desc: "Keyword-Recherche mit Suchvolumen und Wettbewerb. Analyse der Top-10-Ergebnisse: Was decken sie ab? Was fehlt? Wo koennen wir mehr Tiefe liefern? Suchintention klaren — informational, transaktional oder navigational.",
                    detail: "Tools: Ahrefs, Sistrix, Google Search Console",
                    side: "right",
                  },
                  {
                    num: "03", title: "Texterstellung", subtitle: "Schreiben mit System",
                    desc: "Unsere Texter arbeiten nach dem Recherche-Briefing: Klare Heading-Struktur, natuerliche Keyword-Integration, ueberzeugende Argumentation. Jeder Absatz hat einen Zweck. Kein Fuelltext, kein generisches Gerede.",
                    detail: "Lieferzeit: 5–7 Werktage ab Briefing-Freigabe",
                    side: "left",
                  },
                  {
                    num: "04", title: "SEO-Feinschliff", subtitle: "Jeden Hebel nutzen",
                    desc: "Meta-Title und Description optimieren. Keyword-Dichte pruefen. Interne Verlinkung setzen. Lesbarkeit testen. Heading-Tags verifizieren. Duplicate-Content ausschliessen. Erst wenn alles stimmt, geht der Text in die finale Runde.",
                    detail: "Geprueft mit: Surfer SEO, Hemingway, Copyscape",
                    side: "right",
                  },
                  {
                    num: "05", title: "Qualitaetskontrolle & Lieferung", subtitle: "Perfektion vor Uebergabe",
                    desc: "Lektorat, Korrekturlesen, finaler SEO-Audit. Sie erhalten den fertigen Text mit Meta-Daten, Strukturempfehlungen und internen Verlinkungsvorschlaegen. Eine Korrekturschleife ist immer inklusive.",
                    detail: "Format: Google Doc, Word oder direkt in Ihr CMS",
                    side: "left",
                  },
                ].map((step, i) => (
                  <div key={step.num} className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${i > 0 ? "lg:pt-8" : ""}`}>
                    {/* Center node (desktop) */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 z-10 h-14 w-14 items-center justify-center rounded-full bg-white border-[3px] border-primary shadow-lg">
                      <span className="text-primary text-lg font-bold font-[family-name:var(--font-heading)]">{step.num}</span>
                    </div>

                    {/* Content — alternates sides */}
                    <div className={`${step.side === "right" ? "lg:col-start-2" : "lg:col-start-1"} ${step.side === "right" ? "lg:pl-12" : "lg:pr-12 lg:text-right"}`}>
                      {/* Mobile number */}
                      <div className="lg:hidden flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">{step.num}</div>
                        <div>
                          <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">{step.title}</h3>
                          <p className="text-xs text-primary font-medium">{step.subtitle}</p>
                        </div>
                      </div>

                      {/* Desktop content */}
                      <div className="rounded-2xl border border-border bg-offwhite/30 p-6 lg:p-8 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-primary/20">
                        <div className="hidden lg:block mb-3">
                          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">{step.title}</h3>
                          <p className="text-xs text-primary font-medium mt-0.5">{step.subtitle}</p>
                        </div>
                        <p className="text-sm text-muted leading-relaxed mb-4">{step.desc}</p>
                        <div className={`inline-flex items-center gap-2 text-[10px] font-medium text-dark/50 bg-white border border-border rounded-full px-3 py-1.5 ${step.side === "right" ? "" : "lg:ml-auto"}`}>
                          <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Finish flag */}
              <div className="relative lg:flex lg:justify-center mt-10 lg:mt-12">
                <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary/[0.08] to-secondary/[0.05] border border-primary/15 px-6 py-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm font-semibold text-dark">Fertiger Text mit <span className="text-primary">SEO Score 90+</span> ausgeliefert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TEXT SAMPLES — Before/After with detail                       */}
      {/* ============================================================ */}
      <section ref={sampleRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${sampleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Vorher → Nachher</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">So verwandeln wir Texte</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Echte Beispiele, wie professionelle SEO-Optimierung aus durchschnittlichen Texten Top-Performer macht.</p>
          </div>

          <div className="space-y-10">
            {/* Example 1: Intro / Hero Text */}
            <RevealCard>
              <div className="rounded-2xl border border-border bg-white overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 bg-offwhite/50 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">Beispiel 1</span>
                    <span className="text-sm font-semibold text-dark">Service-Seite Intro</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-muted">
                    <span>Branche: SaaS</span>
                    <span>Keyword: „projektmanagement software"</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-6 lg:p-8 border-b md:border-b-0 md:border-r border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-xs font-semibold text-red-500">Vorher</span>
                      <span className="ml-auto text-[10px] text-red-400 bg-red-50 px-2 py-0.5 rounded-full">Score: 31</span>
                    </div>
                    <p className="text-sm text-dark/50 leading-relaxed italic mb-5">"Wir bieten Projektmanagement Software an. Unsere Projektmanagement Software ist die beste. Mit unserer Projektmanagement Software koennen Sie Projekte besser managen. Testen Sie unsere Projektmanagement Software jetzt kostenlos."</p>
                    <div className="space-y-2 pt-4 border-t border-border">
                      {[
                        { label: "Keyword-Dichte", value: "6.8%", verdict: "Ueberoptimiert" },
                        { label: "Lesbarkeit", value: "D", verdict: "Schwer lesbar" },
                        { label: "Suchintention", value: "Verfehlt", verdict: "Kein Mehrwert" },
                      ].map((m) => (
                        <div key={m.label} className="flex items-center justify-between text-[11px]">
                          <span className="text-muted">{m.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-red-500">{m.value}</span>
                            <span className="text-red-400 bg-red-50 px-1.5 py-0.5 rounded text-[9px]">{m.verdict}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 lg:p-8 bg-green-50/20">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-semibold text-green-600">Nachher</span>
                      <span className="ml-auto text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-semibold">Score: 94</span>
                    </div>
                    <p className="text-sm text-dark leading-relaxed mb-5">"Projekte scheitern selten an fehlenden Ideen — sie scheitern an fehlender Uebersicht. Unsere Projektmanagement-Loesung gibt Teams die Struktur, die sie brauchen: von der Aufgabenplanung ueber Echtzeit-Kollaboration bis zum automatisierten Reporting. Fuer Teams, die liefern statt verwalten."</p>
                    <div className="space-y-2 pt-4 border-t border-green-100">
                      {[
                        { label: "Keyword-Dichte", value: "2.1%", verdict: "Optimal" },
                        { label: "Lesbarkeit", value: "A+", verdict: "Sehr gut" },
                        { label: "Suchintention", value: "Getroffen", verdict: "Loesungsorientiert" },
                      ].map((m) => (
                        <div key={m.label} className="flex items-center justify-between text-[11px]">
                          <span className="text-muted">{m.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-green-600">{m.value}</span>
                            <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded text-[9px]">{m.verdict}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealCard>

            {/* Example 2: Product Description */}
            <RevealCard delay={150}>
              <div className="rounded-2xl border border-border bg-white overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 bg-offwhite/50 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">Beispiel 2</span>
                    <span className="text-sm font-semibold text-dark">Produktbeschreibung</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-muted">
                    <span>Branche: E-Commerce</span>
                    <span>Keyword: „ergonomischer buerostuhl"</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-6 lg:p-8 border-b md:border-b-0 md:border-r border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-xs font-semibold text-red-500">Vorher</span>
                      <span className="ml-auto text-[10px] text-red-400 bg-red-50 px-2 py-0.5 rounded-full">Score: 28</span>
                    </div>
                    <p className="text-sm text-dark/50 leading-relaxed italic mb-5">"Dieser ergonomische Buerostuhl ist sehr bequem. Er hat viele Funktionen und ist in verschiedenen Farben erhaeltlich. Der Stuhl ist gut fuer den Ruecken. Bestellen Sie jetzt."</p>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      <span className="text-[9px] text-red-500 bg-red-50 px-2 py-1 rounded">Keine Features</span>
                      <span className="text-[9px] text-red-500 bg-red-50 px-2 py-1 rounded">Kein USP</span>
                      <span className="text-[9px] text-red-500 bg-red-50 px-2 py-1 rounded">Austauschbar</span>
                      <span className="text-[9px] text-red-500 bg-red-50 px-2 py-1 rounded">Kein Schema</span>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8 bg-green-50/20">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-semibold text-green-600">Nachher</span>
                      <span className="ml-auto text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-semibold">Score: 92</span>
                    </div>
                    <p className="text-sm text-dark leading-relaxed mb-5">"8 Stunden sitzen, null Rueckenschmerzen: Der ErgoFlex Pro passt sich Ihrer Wirbelsaeule an — nicht umgekehrt. 4D-Armlehnen, atmungsaktives Mesh, 120kg Belastbarkeit. Entwickelt mit Orthpaeden, getestet von Teams, die taeglich 10+ Stunden am Schreibtisch verbringen."</p>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-green-100">
                      <span className="text-[9px] text-green-600 bg-green-50 px-2 py-1 rounded">Feature-Benefit</span>
                      <span className="text-[9px] text-green-600 bg-green-50 px-2 py-1 rounded">Klarer USP</span>
                      <span className="text-[9px] text-green-600 bg-green-50 px-2 py-1 rounded">Social Proof</span>
                      <span className="text-[9px] text-green-600 bg-green-50 px-2 py-1 rounded">Schema-ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealCard>

            {/* Result summary */}
            <RevealCard delay={300}>
              <div className="rounded-2xl bg-gradient-to-r from-primary/[0.06] to-secondary/[0.03] border border-primary/10 p-8 lg:p-10">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <h3 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark mb-3">
                      Das Muster ist immer gleich
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Generische Texte reden ueber sich selbst. Gute SEO-Texte reden ueber das Problem des Lesers — und bieten die Loesung. Sie sind spezifisch statt vage, nutzenorientiert statt feature-lastig, und strukturiert fuer Leser UND Suchmaschinen.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="text-5xl font-bold text-primary font-[family-name:var(--font-heading)]">3x</div>
                    <p className="text-xs text-muted">Durchschn. mehr organischer<br />Traffic nach Textoptimierung</p>
                  </div>
                </div>
              </div>
            </RevealCard>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section ref={faqRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">FAQ</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">Haeufig gestellte Fragen</h2>
          </div>
          <div className={`space-y-3 transition-all duration-700 delay-100 ${faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border bg-offwhite/50 overflow-hidden transition-colors hover:border-primary/20">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-semibold text-dark pr-4">{faq.q}</span>
                  <svg className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96 pb-6" : "max-h-0"}`}>
                  <p className="px-6 text-sm leading-relaxed text-muted">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BESTELLEN                                                    */}
      {/* ============================================================ */}
      <section className="bg-offwhite py-24 lg:py-32 border-t border-border" id="bestellen">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Jetzt bestellen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">Content auf Bestellung</h2>
            <p className="text-lg text-muted">Teilen Sie uns Ihre Anforderungen mit — wir melden uns innerhalb von 24 Stunden.</p>
          </div>
          <div className="bg-white rounded-3xl border border-border p-8 lg:p-10 shadow-sm">
            <OrderForm />
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
