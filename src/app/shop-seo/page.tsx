"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";

function useInView(opts = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1, ...opts });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800, start = performance.now();
    const tick = (now: number) => { const p = Math.min((now - start) / dur, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value)); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return (<div ref={ref as React.RefObject<HTMLDivElement>} className="text-center"><p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">{count}{suffix}</p><p className="text-sm text-muted">{label}</p></div>);
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, inView] = useInView();
  return (<div ref={ref as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>);
}

/* Hero Mockup — E-Commerce Dashboard */
function ShopMockup() {
  return (
    <div className="hero-dashboard">
      <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
        <div className="border-b border-border px-5 py-3 bg-gradient-to-r from-offwhite to-white flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-xs font-semibold text-dark">Shop Performance</span></div>
          <span className="text-[10px] text-muted">Live Tracking</span>
        </div>
        <div className="p-6">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Umsatz organisch", value: "+247%", sub: "vs. Vorjahr", color: "text-green-600" },
              { label: "Produkte Top 10", value: "84", sub: "+31 diese Woche", color: "text-primary" },
              { label: "Conversion Rate", value: "3.8%", sub: "+1.2% seit Start", color: "text-secondary" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-offwhite p-3.5">
                <p className="text-[10px] text-muted mb-1">{m.label}</p>
                <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                <p className="text-[9px] text-green-600 mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>

          {/* Product rankings table */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-offwhite/60 border-b border-border">
              <span className="text-[10px] font-semibold text-dark">Top Produkt-Rankings</span>
              <span className="text-[9px] text-muted">Letzte 7 Tage</span>
            </div>
            <div className="divide-y divide-border/50">
              {[
                { product: "Ergonomischer Buerostuhl Pro", pos: 2, trend: 5, vol: "2.400" },
                { product: "Standing Desk Eiche 160cm", pos: 4, trend: 3, vol: "1.800" },
                { product: "Monitor Arm Dual Premium", pos: 1, trend: 8, vol: "3.200" },
                { product: "Schreibtischlampe LED dimmbar", pos: 6, trend: 2, vol: "980" },
              ].map((p) => (
                <div key={p.product} className="flex items-center gap-3 px-4 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08] text-primary text-[10px] font-bold">#{p.pos}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-dark truncate">{p.product}</p>
                    <p className="text-[9px] text-muted">Vol: {p.vol}/Monat</p>
                  </div>
                  <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full shrink-0">+{p.trend}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini chart */}
          <div className="mt-4 rounded-xl bg-offwhite p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-dark">Organischer Umsatz (6 Monate)</span>
              <span className="text-[10px] text-green-600 font-semibold">+247%</span>
            </div>
            <div className="flex items-end gap-1 h-12">
              {[20, 28, 35, 42, 55, 62, 70, 78, 85, 90, 88, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-primary/80" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  { q: "Was kostet Shop SEO?", a: "E-Commerce SEO Projekte starten ab 2.500 Euro. Laufende Shop-Optimierung ab 1.500 Euro monatlich. Der Preis richtet sich nach Produktanzahl, Shop-System und Wettbewerbsintensitaet." },
  { q: "Welche Shop-Systeme unterstuetzt ihr?", a: "Shopify, WooCommerce, Magento, Shopware, PrestaShop und Custom-Loesungen. Das SEO-Prinzip ist ueberall gleich — die technische Umsetzung passen wir an Ihr System an." },
  { q: "Wie lange dauert es bis Shop SEO wirkt?", a: "Technische Fixes (Ladezeiten, Crawl-Fehler) wirken in Wochen. Produkt- und Kategorie-Rankings verbessern sich nach 2–4 Monaten. Voller Traffic-Impact nach 4–6 Monaten." },
  { q: "Optimiert ihr auch Produktbeschreibungen?", a: "Ja — entweder schreiben wir sie neu oder optimieren bestehende Texte. Jede Beschreibung wird auf das Ziel-Keyword, Suchintention und Conversion ausgerichtet." },
  { q: "Was ist mit Duplicate Content bei Produktvarianten?", a: "Ein klassisches E-Commerce Problem. Wir loesen es mit Canonical-Tags, Parameter-Handling und intelligenter Seitenarchitektur — damit Google nur die relevanten URLs indexiert." },
  { q: "Koennt ihr auch internationales Shop SEO?", a: "Ja — hreflang-Tags, laenderspezifische URL-Strukturen und mehrsprachige Keyword-Strategien. Besonders wichtig fuer Shops die in mehreren Maerkten verkaufen." },
];

export default function ShopSEOPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [editRef, editInView] = useInView();
  const [challengesRef, challengesInView] = useInView();
  const [processRef, processInView] = useInView();
  const [resultsRef, resultsInView] = useInView();
  const [faqRef, faqInView] = useInView();

  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-secondary/[0.06] via-primary/[0.04] to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-primary/[0.05] to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary hero-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                E-Commerce SEO
              </div>
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-dark font-[family-name:var(--font-heading)]">
                Shop SEO fuer mehr{" "}<span className="text-primary">Umsatz</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                Online-Shops haben eigene SEO-Regeln: Tausende Produktseiten, Filterkombinationen, Duplicate Content, Schema Markup. Wir kennen die Herausforderungen — und die Loesungen.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {["Produkt-Rankings", "Kategorie-SEO", "Schema Markup"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="#kontakt" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl">
                  Shop-Analyse anfragen
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#herausforderungen" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:text-primary">
                  E-Commerce Challenges
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.6s" }}>
                <div className="flex -space-x-2">
                  {["SK", "ML", "TR", "JW", "AH"].map((init, i) => (
                    <div key={init} className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 text-[10px] font-semibold text-white ring-2 ring-white" style={{ zIndex: 5 - i }}>{init}</div>
                  ))}
                </div>
                <p className="text-xs text-muted">Ueber <span className="font-semibold text-dark">80+ Online-Shops</span> optimiert</p>
              </div>
            </div>
            <ShopMockup />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-offwhite border-y border-border py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter value={80} suffix="+" label="Shops optimiert" />
            <Counter value={247} suffix="%" label="Mehr organischer Umsatz" />
            <Counter value={84} suffix="" label="Produkte in Top 10" />
            <Counter value={98} suffix="%" label="Kundenzufriedenheit" />
          </div>
        </div>
      </section>

      {/* EDITORIAL — Why Shop SEO is different */}
      <section ref={editRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`transition-all duration-700 ${editInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Besonderheit</span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-8">
                  Warum Online-Shops <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">eigene SEO-Regeln</span> brauchen
                </h2>
                <div className="space-y-6">
                  <p className="text-muted text-base lg:text-lg leading-relaxed">
                    Ein Online-Shop ist keine normale Website. Tausende Produktseiten, Filterkombinationen die Millionen URLs erzeugen, Duplicate Content durch Varianten, saisonale Sortimente die kommen und gehen. Standard-SEO reicht hier nicht.
                  </p>
                  <p className="text-muted text-base lg:text-lg leading-relaxed">
                    E-Commerce SEO erfordert spezialisiertes Know-how: Wie verhindert man Index-Bloat? Wie optimiert man Kategorie-Seiten ohne duennen Content? Wie setzt man Product Schema Markup richtig ein? Und wie priorisiert man bei 10.000+ Produkten?
                  </p>
                </div>
              </div>

              {/* Eyecatcher: Shop funnel visualization */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-border bg-offwhite/50 p-6">
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der E-Commerce SEO Funnel</p>
                  <div className="space-y-3">
                    {[
                      { step: "Suche", desc: "Kunde sucht Produkt bei Google", width: "w-full", color: "bg-primary/10 border-primary/20" },
                      { step: "Kategorie", desc: "Findet Ihre optimierte Kategorie-Seite", width: "w-[90%] mx-auto", color: "bg-primary/15 border-primary/25" },
                      { step: "Produkt", desc: "Klickt auf das optimierte Produkt", width: "w-[78%] mx-auto", color: "bg-primary/20 border-primary/30" },
                      { step: "Conversion", desc: "Kauft — dank ueberzeugender Seite", width: "w-[65%] mx-auto", color: "bg-primary text-white border-primary" },
                    ].map((s) => (
                      <div key={s.step} className={`${s.width} rounded-xl border ${s.color} p-3 text-center transition-all duration-300`}>
                        <p className={`text-sm font-semibold ${s.step === "Conversion" ? "text-white" : "text-dark"}`}>{s.step}</p>
                        <p className={`text-[10px] ${s.step === "Conversion" ? "text-white/80" : "text-muted"}`}>{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGES — Problem → Solution pairs */}
      <section id="herausforderungen" ref={challengesRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className={`mb-14 transition-all duration-700 ${challengesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Herausforderungen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">6 Shop-Probleme. 6 Loesungen.</h2>
            <p className="text-lg text-muted max-w-2xl">Jedes E-Commerce SEO Problem hat eine klare Loesung — wenn man weiss, wo man ansetzen muss.</p>
          </div>

          <div className={`space-y-4 transition-all duration-700 delay-200 ${challengesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              { problem: "Tausende Produktseiten mit Hersteller-Texten", solution: "Unique Descriptions + Product Schema mit Preis, Sterne, Verfuegbarkeit" },
              { problem: "Kategorieseiten ohne rankenden Content", solution: "SEO-Content der informiert und verkauft + strategische interne Verlinkung" },
              { problem: "Filter erzeugen Millionen URL-Kombinationen", solution: "Canonical-Strategie + Parameter-Handling + Crawl-Budget-Management" },
              { problem: "Duplicate Content durch Varianten & Sortierung", solution: "Index-Management + Canonicals + intelligente Seitenarchitektur" },
              { problem: "Keine Rich Snippets in den SERPs", solution: "Product, Offer, Review, FAQ Schema — Preis und Sterne direkt bei Google" },
              { problem: "Langsame Ladezeiten durch Bilder & Scripts", solution: "Bild-Komprimierung + Lazy Loading + Script-Optimierung ohne Funktionsverlust" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0 rounded-2xl border border-border bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                  {/* Problem */}
                  <div className="flex-1 p-5 md:p-6 flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                    <span className="text-sm text-dark/70">{item.problem}</span>
                  </div>
                  {/* Arrow */}
                  <div className="hidden md:flex shrink-0 w-10 items-center justify-center text-primary/30">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  {/* Solution */}
                  <div className="flex-1 p-5 md:p-6 md:bg-primary/[0.02] flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-dark font-medium">{item.solution}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP SYSTEMS — Logo/badge row */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-muted mb-8">Wir optimieren auf allen Plattformen</p>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
            {[
              { name: "Shopify", letter: "S", desc: "Liquid & Headless", bg: "bg-[#96bf48]/10", color: "text-[#96bf48]", border: "border-[#96bf48]/20" },
              { name: "WooCommerce", letter: "W", desc: "WordPress Plugin", bg: "bg-[#7f54b3]/10", color: "text-[#7f54b3]", border: "border-[#7f54b3]/20" },
              { name: "Magento", letter: "M", desc: "Adobe Commerce", bg: "bg-[#f46f25]/10", color: "text-[#f46f25]", border: "border-[#f46f25]/20" },
              { name: "Shopware", letter: "SW", desc: "6 & 5", bg: "bg-[#189eff]/10", color: "text-[#189eff]", border: "border-[#189eff]/20" },
              { name: "PrestaShop", letter: "P", desc: "Open Source", bg: "bg-[#df0067]/10", color: "text-[#df0067]", border: "border-[#df0067]/20" },
              { name: "Custom", letter: "</>", desc: "Eigenentwicklung", bg: "bg-primary/[0.08]", color: "text-primary", border: "border-primary/20" },
            ].map((sys) => (
              <div key={sys.name} className={`flex items-center gap-3 rounded-xl border ${sys.border} bg-white px-5 py-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}>
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${sys.bg} ${sys.color} text-sm font-bold`}>
                  {sys.letter}
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark">{sys.name}</p>
                  <p className="text-[10px] text-muted">{sys.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — Shop SEO Ablauf */}
      <section ref={processRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Ablauf</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Vom Shop-Audit zum organischen Umsatz</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Vier Phasen die Ihren Shop systematisch nach vorne bringen.</p>
          </div>

          {/* Funnel process — gets narrower */}
          <div className={`space-y-3 transition-all duration-700 delay-200 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              { num: "01", title: "Shop-Audit", desc: "Technische Analyse, Crawl-Probleme, Duplicate Content, Schema Markup, Site Speed — alles durchleuchten.", width: "lg:max-w-full", color: "border-l-primary" },
              { num: "02", title: "Kategorie & Produkt-Strategie", desc: "Keyword-Mapping fuer Kategorien und Top-Produkte. Suchintention matchen. Content-Plan erstellen.", width: "lg:max-w-[92%] lg:mx-auto", color: "border-l-secondary" },
              { num: "03", title: "Implementierung", desc: "Schema Markup, Meta-Daten, Produkttexte, interne Verlinkung, Filterseiten-Management umsetzen.", width: "lg:max-w-[84%] lg:mx-auto", color: "border-l-primary" },
              { num: "04", title: "Tracking & Skalierung", desc: "Rankings und Umsatz tracken. Was funktioniert auf weitere Produkte und Kategorien skalieren.", width: "lg:max-w-[76%] lg:mx-auto", color: "border-l-green-500 bg-gradient-to-r from-green-50/30 to-transparent" },
            ].map((step) => (
              <Reveal key={step.num}>
                <div className={`${step.width}`}>
                  <div className={`flex items-start gap-5 rounded-2xl border border-border ${step.color} border-l-[4px] bg-white p-5 lg:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20`}>
                    <span className="text-2xl font-bold text-primary/15 font-[family-name:var(--font-heading)] shrink-0 leading-none mt-1">{step.num}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark mb-1">{step.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="flex justify-center mt-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/[0.08] to-secondary/[0.05] border border-primary/15 px-6 py-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm font-semibold text-dark">Ergebnis: <span className="text-primary">+247% organischer Umsatz</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS — Before/After case study style */}
      <section ref={resultsRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`transition-all duration-700 ${resultsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Echte Ergebnisse</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">So veraendert Shop SEO das Geschaeft</h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">Keine Theorie — echte Durchschnittswerte unserer E-Commerce Kunden nach 6 Monaten.</p>
            </div>

            {/* Case study card */}
            <div className="rounded-3xl border border-border bg-white overflow-hidden shadow-lg shadow-dark/[0.03] mb-12">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Before */}
                <div className="p-8 lg:p-10 border-b md:border-b-0 md:border-r border-border">
                  <div className="flex items-center gap-2 mb-6"><div className="w-2.5 h-2.5 rounded-full bg-dark/20" /><span className="text-sm font-semibold text-dark/50">Vor Shop SEO</span></div>
                  <div className="space-y-5">
                    {[
                      { label: "Organischer Umsatz", value: "12.400 Euro/Monat" },
                      { label: "Produkte in Top 10", value: "11" },
                      { label: "Kategorie-Traffic", value: "2.800 Besucher" },
                      { label: "Conversion Rate", value: "1.2%" },
                    ].map((m) => (
                      <div key={m.label} className="flex items-center justify-between pb-3 border-b border-border/50 last:border-0 last:pb-0">
                        <span className="text-sm text-muted">{m.label}</span>
                        <span className="text-sm font-semibold text-dark/50">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* After */}
                <div className="p-8 lg:p-10 bg-primary/[0.02]">
                  <div className="flex items-center gap-2 mb-6"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /><span className="text-sm font-semibold text-green-600">Nach 6 Monaten Shop SEO</span></div>
                  <div className="space-y-5">
                    {[
                      { label: "Organischer Umsatz", value: "43.100 Euro/Monat", change: "+247%" },
                      { label: "Produkte in Top 10", value: "84", change: "+73" },
                      { label: "Kategorie-Traffic", value: "7.840 Besucher", change: "+180%" },
                      { label: "Conversion Rate", value: "3.8%", change: "+2.6%" },
                    ].map((m) => (
                      <div key={m.label} className="flex items-center justify-between pb-3 border-b border-border/50 last:border-0 last:pb-0">
                        <span className="text-sm text-dark/70">{m.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-dark">{m.value}</span>
                          <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">{m.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quote below */}
            <div className="border-l-[3px] border-primary pl-6 max-w-2xl mx-auto">
              <p className="font-[family-name:var(--font-heading)] text-xl text-dark leading-relaxed mb-4">
                Shop SEO ist die Disziplin, bei der technisches Know-how und E-Commerce Verstaendnis zusammenkommen muessen. Standard-SEO reicht hier nicht.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-bold">JH</div>
                <div><p className="text-sm font-semibold text-dark">Joel Heuchert</p><p className="text-xs text-muted">CEO & Gruender</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96 pb-6" : "max-h-0"}`}><p className="px-6 text-sm leading-relaxed text-muted">{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section className="bg-offwhite py-24 lg:py-32 border-t border-border" id="kontakt">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Kontakt</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">Shop-Analyse anfragen</h2>
            <p className="text-lg text-muted">Wir pruefen Ihren Online-Shop und zeigen, wo die groessten Umsatz-Potenziale liegen.</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8 lg:p-10 shadow-sm">
            <form className="space-y-5" action="/kontakt" method="POST">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label htmlFor="sh-name" className="block text-sm font-medium text-dark mb-2">Name *</label><input type="text" id="sh-name" name="name" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Ihr Name" /></div>
                <div><label htmlFor="sh-email" className="block text-sm font-medium text-dark mb-2">E-Mail *</label><input type="email" id="sh-email" name="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="ihre@email.de" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label htmlFor="sh-url" className="block text-sm font-medium text-dark mb-2">Shop-URL *</label><input type="url" id="sh-url" name="website" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="https://ihr-shop.de" /></div>
                <div><label htmlFor="sh-sys" className="block text-sm font-medium text-dark mb-2">Shop-System</label><input type="text" id="sh-sys" name="system" className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Shopify, WooCommerce, Magento..." /></div>
              </div>
              <div><label htmlFor="sh-msg" className="block text-sm font-medium text-dark mb-2">Was moechten Sie verbessern? (optional)</label><textarea id="sh-msg" name="message" rows={3} className="w-full resize-none px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Rankings, Produktseiten, Umsatz..." /></div>
              <button type="submit" className="w-full rounded-full bg-primary px-6 py-4 text-base font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20">Shop-Analyse anfragen</button>
              <p className="text-center text-xs text-muted">* Pflichtfelder | Antwort innerhalb von 24 Stunden</p>
            </form>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
