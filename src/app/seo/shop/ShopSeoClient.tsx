import Link from "next/link";
import FaqAccordion from "@/app/components/FaqAccordion";
import SubpageLayout from "@/app/components/SubpageLayout";


function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (<div className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>);
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
                { product: "Ergonomischer Bürostuhl Pro", pos: 2, trend: 5, vol: "2.400" },
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
  { q: "Was kostet Shop SEO?", a: "E-Commerce SEO Projekte starten ab 2.500 Euro. Laufende Shop-Optimierung ab 1.500 Euro monatlich. Der Preis richtet sich nach Produktanzahl, Shop-System und Wettbewerbsintensität." },
  { q: "Welche Shop-Systeme unterstuetzt ihr?", a: "Shopify, WooCommerce, Magento, Shopware, PrestaShop und Custom-Lösungen. Das SEO-Prinzip ist überall gleich — die technische Umsetzung passen wir an Ihr System an." },
  { q: "Wie lange dauert es bis Shop SEO wirkt?", a: "Technische Fixes (Ladezeiten, Crawl-Fehler) wirken in Wochen. Produkt- und Kategorie-Rankings verbessern sich nach 2–4 Monaten. Voller Traffic-Impact nach 4–6 Monaten." },
  { q: "Optimiert ihr auch Produktbeschreibungen?", a: "Ja — entweder schreiben wir sie neu oder optimieren bestehende Texte. Jede Beschreibung wird auf das Ziel-Keyword, Suchintention und Conversion ausgerichtet." },
  { q: "Was ist mit Duplicate Content bei Produktvarianten?", a: "Ein klassisches E-Commerce Problem. Wir loesen es mit Canonical-Tags, Parameter-Handling und intelligenter Seitenarchitektur — damit Google nur die relevanten URLs indexiert." },
  { q: "Könnt ihr auch internationales Shop SEO?", a: "Ja — hreflang-Tags, länderspezifische URL-Strukturen und mehrsprachige Keyword-Strategien. Besonders wichtig für Shops die in mehreren Märkten verkaufen." },
];

export default function ShopSeoClient() {
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
                Shop SEO für mehr{" "}<span className="text-primary">Umsatz</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                Online-Shops haben eigene SEO-Regeln: Tausende Produktseiten, Filterkombinationen, Duplicate Content, Schema Markup. Wir kennen die Herausforderungen — und die Lösungen.
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
                <Link href="#jetzt-starten" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl">
                  Shop-Analyse anfragen
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#herausforderungen" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:text-primary">
                  E-Commerce Challenges
                </Link>
              </div>
            </div>
            <ShopMockup />
          </div>
        </div>
      </section>

      {/* EDITORIAL — Why Shop SEO is different */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">
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
                      { step: "Conversion", desc: "Kauft — dank überzeugender Seite", width: "w-[65%] mx-auto", color: "bg-primary text-white border-primary" },
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
      <section id="herausforderungen" className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-14 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Herausforderungen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">6 Shop-Probleme. 6 Lösungen.</h2>
            <p className="text-lg text-muted max-w-2xl">Jedes E-Commerce SEO Problem hat eine klare Lösung — wenn man weiss, wo man ansetzen muss.</p>
          </div>

          <div className="space-y-4 transition-all duration-700 delay-200 reveal">
            {[
              { problem: "Tausende Produktseiten mit Hersteller-Texten", solution: "Unique Descriptions + Product Schema mit Preis, Sterne, Verfügbarkeit" },
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

            {/* Shopify */}
            <div className="flex items-center gap-3 rounded-xl border border-[#96bf48]/20 bg-white px-5 py-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#96bf48]/10 shrink-0">
                {/* Shopify bag icon */}
                <svg className="h-7 w-7" viewBox="0 0 109 124" fill="none">
                  <path d="M74.7 14.8s-.3-1.5-1.5-2.4c-1.2-.9-3-.9-3-.9s-1.5-2.1-4.8-3.9C62.1 5.9 57.9 6 57.9 6c-3.6 0-7.5 1.5-10.2 5.1-1.8 2.4-2.7 5.4-3 8.7-.6 0-1.2 0-1.8.3-3.9 1.2-4.2 1.5-4.8 5.4L30.6 95.8l41.7 7.8 22.5-5.7L74.7 14.8zM62.7 18.7c-.3 2.4-.9 4.5-1.5 6.9-2.7-.6-5.7-1.2-8.7-1.5.6-5.1 2.7-8.4 3.9-10.2 2.4 1.2 4.8 2.7 6.3 4.8z" fill="#96bf48"/>
                  <path d="M74.7 14.8s-.3-1.5-1.5-2.4c-1.2-.9-3-.9-3-.9s-.9-1.2-2.4-2.4c.6 5.4.9 9.6.9 9.6l7.5 2.1-.6-6h-.9z" fill="#5e8e3e"/>
                  <path d="M52.5 26.1c-3 0-5.7.3-8.1.6L41.7 44.4c2.7-.6 5.7-.9 9-.9 6.3 0 11.7 1.5 11.7 1.5s-1.5-10.2-1.8-11.4c-2.1-.9-4.5-1.5-6.9-1.5zM38.1 78.3l-1.8 10.8s3.9 1.8 9 1.8c4.5 0 7.2-1.2 7.2-1.2L50.7 78c-2.1.6-4.5.9-6.9.9-2.4-.3-4.5-.9-5.7-0.6z" fill="#fff"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">Shopify</p>
                <p className="text-[10px] text-muted">Liquid & Headless</p>
              </div>
            </div>

            {/* WooCommerce */}
            <div className="flex items-center gap-3 rounded-xl border border-[#7f54b3]/20 bg-white px-5 py-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#7f54b3]/10 shrink-0">
                <svg className="h-7 w-7" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" rx="12" fill="#7f54b3" opacity="0.15"/>
                  <path d="M10 35C10 29 14 25 20 25H80C86 25 90 29 90 35V65C90 71 86 75 80 75H20C14 75 10 71 10 65V35Z" fill="#7f54b3"/>
                  <path d="M20 42L30 58L40 46L50 58L60 42L70 58L80 42" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">WooCommerce</p>
                <p className="text-[10px] text-muted">WordPress Plugin</p>
              </div>
            </div>

            {/* Custom */}
            <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-white px-5 py-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/[0.08] text-primary text-sm font-bold shrink-0">
                &lt;/&gt;
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">Custom</p>
                <p className="text-[10px] text-muted">Eigenentwicklung</p>
              </div>
            </div>

            {/* Magento */}
            <div className="flex items-center gap-3 rounded-xl border border-[#f46f25]/20 bg-white px-5 py-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f46f25]/10 text-[#f46f25] text-sm font-bold shrink-0">M</div>
              <div>
                <p className="text-sm font-semibold text-dark">Magento</p>
                <p className="text-[10px] text-muted">Adobe Commerce</p>
              </div>
            </div>

            {/* Shopware */}
            <div className="flex items-center gap-3 rounded-xl border border-[#189eff]/20 bg-white px-5 py-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#189eff]/10 text-[#189eff] text-sm font-bold shrink-0">SW</div>
              <div>
                <p className="text-sm font-semibold text-dark">Shopware</p>
                <p className="text-[10px] text-muted">6 & 5</p>
              </div>
            </div>

            {/* PrestaShop */}
            <div className="flex items-center gap-3 rounded-xl border border-[#df0067]/20 bg-white px-5 py-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#df0067]/10 text-[#df0067] text-sm font-bold shrink-0">P</div>
              <div>
                <p className="text-sm font-semibold text-dark">PrestaShop</p>
                <p className="text-[10px] text-muted">Open Source</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROCESS — Shop SEO Ablauf */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-16 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Ablauf</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Vom Shop-Audit zum organischen Umsatz</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Vier Phasen die Ihren Shop systematisch nach vorne bringen.</p>
          </div>

          {/* Funnel process — gets narrower */}
          <div className="space-y-3 transition-all duration-700 delay-200 reveal">
            {[
              { num: "01", title: "Shop-Audit", desc: "Technische Analyse, Crawl-Probleme, Duplicate Content, Schema Markup, Site Speed — alles durchleuchten.", width: "lg:max-w-full", color: "border-l-primary" },
              { num: "02", title: "Kategorie & Produkt-Strategie", desc: "Keyword-Mapping für Kategorien und Top-Produkte. Suchintention matchen. Content-Plan erstellen.", width: "lg:max-w-[92%] lg:mx-auto", color: "border-l-secondary" },
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
                <span className="text-sm font-semibold text-dark">Ergebnis: <span className="text-primary">Mehr organischer Umsatz</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WIRKUNG — Honest results section */}
      <section className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Was Shop SEO verändert</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Organischer Traffic wird zur Umsatzmaschine</h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">Shop SEO ist eine Investition die sich mit jedem Monat stärker auszahlt. Hier ist wie der Aufbau typischerweise verläuft.</p>
            </div>

            {/* Timeline-style growth stages */}
            <div className="grid md:grid-cols-3 gap-5 mb-12">
              {[
                {
                  phase: "Phase 1", time: "Monat 1–2", title: "Fundament legen",
                  desc: "Technische Probleme beheben, Schema Markup einrichten, Duplicate Content lösen, Ladezeiten verbessern. Die Grundlage für alles Weitere.",
                  steps: ["Shop-Audit & Diagnose", "Crawl-Fehler beheben", "Schema Markup aktivieren", "Core Web Vitals optimieren"],
                  color: "border-t-primary"
                },
                {
                  phase: "Phase 2", time: "Monat 2–4", title: "Rankings aufbauen",
                  desc: "Kategorie-Seiten optimieren, Top-Produkte mit uniquem Content versorgen, interne Verlinkung stärken. Erste Rankings entstehen.",
                  steps: ["Keyword-Mapping für Kategorien", "Produkttexte optimieren", "Interne Verlinkung stärken", "Meta-Daten optimieren"],
                  color: "border-t-secondary"
                },
                {
                  phase: "Phase 3", time: "Ab Monat 4", title: "Skalieren",
                  desc: "Was funktioniert, auf weitere Produkte und Kategorien ausrollen. Traffic und Umsatz wachsen kontinuierlich mit jedem neuen optimierten Bereich.",
                  steps: ["Gewinnende Seiten skalieren", "Neue Produkte optimieren", "Backlinks aufbauen", "Saisonale Chancen nutzen"],
                  color: "border-t-green-500"
                },
              ].map((phase, i) => (
                <Reveal key={phase.phase} delay={i * 100}>
                  <div className={`rounded-2xl ${phase.color} border-t-[3px] border border-border bg-white p-7 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-primary bg-primary/[0.08] px-3 py-1 rounded-full">{phase.phase}</span>
                      <span className="text-xs text-muted">{phase.time}</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">{phase.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mb-5">{phase.desc}</p>
                    <div className="space-y-2">
                      {phase.steps.map((step) => (
                        <div key={step} className="flex items-center gap-2 text-xs text-dark/70">
                          <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Quote */}
            <div className="border-l-[3px] border-primary pl-6 max-w-2xl mx-auto">
              <p className="font-[family-name:var(--font-heading)] text-xl text-dark leading-relaxed mb-4">
                Shop SEO ist die Disziplin, bei der technisches Know-how und E-Commerce Verständnis zusammenkommen müssen. Standard-SEO reicht hier nicht.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-bold">JH</div>
                <div><p className="text-sm font-semibold text-dark">Joel Heuchert</p><p className="text-xs text-muted">CEO & Gründer</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-14 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">FAQ</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">Häufig gestellte Fragen</h2>
          </div>
          <div className="transition-all duration-700 delay-100 reveal">
            <FaqAccordion items={faqs} />
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
                Mehr Umsatz durch<br />bessere Sichtbarkeit
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">E-Commerce-SEO ist eine der effektivsten Methoden, um nachhaltig mehr Besucher und Käufer zu gewinnen. Lassen Sie uns Ihr Shop-Potenzial analysieren.</p>
              <div className="space-y-4">
                {[
                  { title: "Kostenlose Shop-Analyse", desc: "Wir prüfen Ihre Produkt- und Kategorieseiten auf Optimierungspotenzial — konkret und nachvollziehbar." },
                  { title: "Individuelle E-Commerce-Strategie", desc: "Kein Standard-Paket. Eine Strategie, die zu Ihrem Sortiment, Ihrer Plattform und Ihren Zielen passt." },
                  { title: "Messbare Ergebnisse", desc: "Mehr organischer Traffic, mehr Rankings, mehr Umsatz — alles transparent nachvollziehbar." },
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
                  Shop-Analyse anfragen
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
