import Link from "next/link";
import FaqAccordion from "@/app/components/FaqAccordion";
import SubpageLayout from "@/app/components/SubpageLayout";


function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (<div className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>);
}

/* Hero Mockup — Network cluster visualization */
function StrategyMockup() {
  return (
    <div className="hero-dashboard">
      <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
        <div className="border-b border-border px-5 py-3 bg-gradient-to-r from-offwhite to-white flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /><span className="text-xs font-semibold text-dark">Content Cluster Map</span></div>
          <span className="text-[10px] text-muted">8 Cluster aktiv</span>
        </div>
        <div className="p-5">
          {/* SVG Network */}
          <svg viewBox="0 0 280 200" fill="none" className="w-full h-auto">
            {/* Connection lines — web/net pattern */}
            <line x1="140" y1="100" x2="50" y2="40" stroke="#C2722A" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.2" />
            <line x1="140" y1="100" x2="230" y2="35" stroke="#C2722A" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.2" />
            <line x1="140" y1="100" x2="40" y2="150" stroke="#D4A853" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.2" />
            <line x1="140" y1="100" x2="245" y2="155" stroke="#D4A853" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.2" />
            <line x1="140" y1="100" x2="100" y2="180" stroke="#C2722A" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.2" />
            <line x1="140" y1="100" x2="190" y2="180" stroke="#C2722A" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.2" />
            {/* Cross connections */}
            <line x1="50" y1="40" x2="40" y2="150" stroke="#C2722A" strokeWidth="1" opacity="0.08" />
            <line x1="230" y1="35" x2="245" y2="155" stroke="#D4A853" strokeWidth="1" opacity="0.08" />
            <line x1="100" y1="180" x2="40" y2="150" stroke="#C2722A" strokeWidth="1" opacity="0.08" />
            <line x1="190" y1="180" x2="245" y2="155" stroke="#D4A853" strokeWidth="1" opacity="0.08" />

            {/* Center hub */}
            <circle cx="140" cy="100" r="28" fill="white" stroke="#C2722A" strokeWidth="2.5" />
            <text x="140" y="96" textAnchor="middle" fill="#C2722A" fontSize="8" fontWeight="800">PILLAR</text>
            <text x="140" y="108" textAnchor="middle" fill="#1A1A1A" fontSize="7" fontWeight="600">Hauptthema</text>

            {/* Outer nodes */}
            <circle cx="50" cy="40" r="18" fill="white" stroke="#D4A853" strokeWidth="2" />
            <text x="50" y="43" textAnchor="middle" fill="#1A1A1A" fontSize="7" fontWeight="700">Blog</text>

            <circle cx="230" cy="35" r="18" fill="white" stroke="#D4A853" strokeWidth="2" />
            <text x="230" y="38" textAnchor="middle" fill="#1A1A1A" fontSize="7" fontWeight="700">Guide</text>

            <circle cx="40" cy="150" r="18" fill="white" stroke="#C2722A" strokeWidth="2" />
            <text x="40" y="153" textAnchor="middle" fill="#1A1A1A" fontSize="7" fontWeight="700">FAQ</text>

            <circle cx="245" cy="155" r="18" fill="white" stroke="#C2722A" strokeWidth="2" />
            <text x="245" y="158" textAnchor="middle" fill="#1A1A1A" fontSize="7" fontWeight="700">Case</text>

            <circle cx="100" cy="180" r="18" fill="white" stroke="#D4A853" strokeWidth="2" />
            <text x="100" y="183" textAnchor="middle" fill="#1A1A1A" fontSize="7" fontWeight="700">Landing</text>

            <circle cx="190" cy="180" r="18" fill="white" stroke="#D4A853" strokeWidth="2" />
            <text x="190" y="183" textAnchor="middle" fill="#1A1A1A" fontSize="7" fontWeight="700">Blog 2</text>
          </svg>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[{ label: "Keywords", value: "127" }, { label: "Cluster", value: "8" }, { label: "Seiten", value: "34" }].map((s) => (
              <div key={s.label} className="text-center rounded-lg bg-offwhite p-2">
                <p className="text-sm font-bold text-primary">{s.value}</p>
                <p className="text-[9px] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  { q: "Was kostet eine SEO Content Strategie?", a: "Eine initiale Strategieentwicklung startet ab 3.000 Euro. Laufende Content-Planung und -Begleitung ab 1.500 Euro monatlich. Im Erstgespräch klären wir Ihren Bedarf." },
  { q: "Wie lange dauert die Strategieentwicklung?", a: "Die initiale Strategie steht nach 2–3 Wochen: Keyword-Recherche, Cluster-Planung, Redaktionskalender. Danach beginnt die laufende Content-Produktion." },
  { q: "Schreibt ihr die Inhalte auch?", a: "Ja — oder wir liefern Briefings für Ihr Team. Beides ist moeglich. Die Strategie definiert Was und Warum, die Umsetzung können wir komplett übernehmen." },
  { q: "Wie schnell sehe ich Ergebnisse?", a: "Erste Rankings nach 2–3 Monaten, signifikanter Traffic-Aufbau nach 4–6 Monaten. Content-SEO ist ein Flywheel — je mehr guter Content, desto schneller das Wachstum." },
  { q: "Was ist ein Topic Cluster?", a: "Ein Pillar-Artikel als zentraler Hub, umgeben von spezifischen Cluster-Artikeln die alle intern verlinkt sind. Baut thematische Autorität auf und stärkt Rankings für das gesamte Themenfeld." },
  { q: "Brauche ich einen Blog dafür?", a: "Nicht zwingend. Content-Strategie umfasst auch Service-Seiten, FAQ-Sektionen, Kategorietexte und Landing Pages. Ein Blog ist ein gutes Werkzeug, aber nicht das einzige." },
];

export default function ContentStrategieClient() {

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
                Strategische Content-Planung
              </div>
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-dark font-[family-name:var(--font-heading)]">
                Content, der ein{" "}<span className="text-primary">System</span> hat
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                Keine zufälligen Blog-Artikel. Sondern eine datengetriebene Content-Architektur aus Topic Clusters, Keyword-Mapping und redaktioneller Planung — die organischen Traffic planbar macht.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {["Topic Clusters", "Keyword Mapping", "Redaktionskalender"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="#jetzt-starten" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl">
                  Strategie-Gespräch buchen
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#framework" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:text-primary">
                  Unser Framework
                </Link>
              </div>
            </div>
            <StrategyMockup />
          </div>
        </div>
      </section>

      {/* EDITORIAL — Was Content Strategie bedeutet */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Kern</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-8">
                Content ohne Strategie ist wie eine <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Bibliothek ohne System</span>
              </h2>
              <p className="text-lg lg:text-xl text-muted leading-relaxed">
                Viel Material, aber niemand findet was er sucht. Eine SEO Content Strategie bringt Ordnung: Welche Themen, für wen, in welcher Reihenfolge, mit welchem Ziel. Datengetrieben statt aus dem Bauch.
              </p>
            </div>

            {/* Eyecatcher: Content Funnel — from chaos to system */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Without strategy — chaos */}
              <div className="rounded-2xl border border-border overflow-hidden bg-white">
                {/* Header */}
                <div className="flex items-center gap-3 p-6 border-b border-border bg-dark/[0.02]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <span className="text-sm font-bold text-red-500">Ohne Content-Strategie</span>
                </div>
                {/* Issues list */}
                <div className="p-6 space-y-3 mb-4">
                  {[
                    { label: "Zufällige Artikel", desc: "Ohne roten Faden, ohne SEO-Zusammenhang" },
                    { label: "Keyword-Kannibalisierung", desc: "Mehrere Seiten konkurrieren um dasselbe Keyword" },
                    { label: "Content-Lücken unbekannt", desc: "Man weiß nicht was fehlt — und schreibt das Falsche" },
                    { label: "Traffic stagniert", desc: "Neue Inhalte bringen kaum neue Besucher" },
                    { label: "ROI nicht messbar", desc: "Content-Budget ohne klare Erfolgskontrolle" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-red-50/40 border border-red-100/60">
                      <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      <div>
                        <p className="text-sm font-semibold text-dark/80">{item.label}</p>
                        <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Chaos visualization */}
                <div className="mx-6 mb-6 rounded-xl bg-dark/[0.02] border border-border p-4">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3">Content-Dashboard</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Blog?", "SEO?", "Keywords??", "Pillar??", "Was posten?", "Wann?", "Für wen?", "Wie lang?"].map((t, i) => (
                      <span key={t} className={`text-[10px] text-dark/30 bg-dark/[0.03] border border-dark/8 px-2 py-1 rounded ${i % 3 === 0 ? "rotate-[-2deg]" : i % 3 === 1 ? "rotate-[1.5deg]" : "rotate-[-1deg]"}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: With strategy — system */}
              <div className="rounded-2xl border-2 border-primary/20 overflow-hidden bg-white shadow-xl shadow-primary/[0.04]">
                {/* Header */}
                <div className="flex items-center gap-3 p-6 border-b border-primary/10 bg-gradient-to-r from-primary/[0.03] to-secondary/[0.02]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="text-sm font-bold text-green-600">Mit SeoForge Content-Strategie</span>
                </div>
                {/* Benefits list */}
                <div className="p-6 space-y-3 mb-4">
                  {[
                    { label: "Topic Clusters", desc: "Pillar-Artikel + Cluster-Seiten mit klarer Verlinkung" },
                    { label: "Keyword-Mapping", desc: "Jedes Keyword hat genau eine URL — kein Wettbewerb intern" },
                    { label: "Content-Lücken", desc: "Wir wissen genau welche Themen fehlen und priorisieren" },
                    { label: "Messbares Wachstum", desc: "Organischer Traffic wächst Monat für Monat nachweisbar" },
                    { label: "Business-Impact", desc: "Jeder Artikel hat ein klares Ziel: Traffic, Lead oder Sale" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-green-50/50 border border-green-100/60">
                      <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <div>
                        <p className="text-sm font-semibold text-dark">{item.label}</p>
                        <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* System visualization - mini cluster network */}
                <div className="mx-6 mb-6 rounded-xl bg-primary/[0.03] border border-primary/10 p-4">
                  <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-3">Content Cluster Map — aktiv</p>
                  <svg viewBox="0 0 300 90" fill="none" className="w-full h-auto">
                    <line x1="150" y1="45" x2="40" y2="18" stroke="#C2722A" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.3" />
                    <line x1="150" y1="45" x2="260" y2="18" stroke="#C2722A" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.3" />
                    <line x1="150" y1="45" x2="45" y2="72" stroke="#D4A853" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.3" />
                    <line x1="150" y1="45" x2="255" y2="72" stroke="#D4A853" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.3" />
                    <line x1="150" y1="45" x2="150" y2="82" stroke="#C2722A" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.3" />
                    <circle cx="150" cy="45" r="20" fill="white" stroke="#C2722A" strokeWidth="2" />
                    <text x="150" y="42" textAnchor="middle" fill="#C2722A" fontSize="6.5" fontWeight="800">PILLAR</text>
                    <text x="150" y="52" textAnchor="middle" fill="#1A1A1A" fontSize="5.5" fontWeight="600">SEO Agentur</text>
                    {[{cx:40,cy:18,t:"Blog"},{cx:260,cy:18,t:"Guide"},{cx:45,cy:72,t:"FAQ"},{cx:255,cy:72,t:"Case"},{cx:150,cy:82,t:"Tool"}].map(n => (
                      <g key={n.t}>
                        <circle cx={n.cx} cy={n.cy} r="12" fill="white" stroke="#D4A853" strokeWidth="1.5" />
                        <text x={n.cx} y={n.cy+3} textAnchor="middle" fill="#1A1A1A" fontSize="5.5" fontWeight="700">{n.t}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRAMEWORK — Connected horizontal pipeline */}
      <section id="framework" className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Das Framework</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">4 Säulen — ein System</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Jede Säule füttert die nächste. Am Ende steht ein Content-Flywheel, das mit jeder Runde stärker wird.</p>
          </div>

          <div className="relative transition-all duration-700 delay-200 reveal">
            {/* Connecting gradient line */}
            <div className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-primary via-secondary via-primary to-secondary rounded-full opacity-20" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: "01", title: "Topic Clusters", desc: "Pillar + Cluster-Artikel. Thematische Hubs die Domain Authority aufbauen.", icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg> },
                { num: "02", title: "Keyword Mapping", desc: "Jedes Keyword einer URL. Suchintention definiert. Keine Kannibalisierung.", icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg> },
                { num: "03", title: "Content Calendar", desc: "Nach Impact priorisiert. Saisonalitaet, Quick Wins, langfristige Hebel.", icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg> },
                { num: "04", title: "Messen & Skalieren", desc: "Rankings + Traffic tracken. Was funktioniert verdoppeln, Rest anpassen.", icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
              ].map((pillar, i) => (
                <div key={pillar.num} className="relative text-center">
                  {/* Circle node */}
                  <div className="relative z-10 mx-auto mb-5 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-white border-[3px] border-primary shadow-lg">
                    <span className="text-primary">{pillar.icon}</span>
                  </div>
                  {/* Arrow between (desktop) */}
                  {i < 3 && <div className="hidden lg:block absolute top-[45px] -right-4 z-20 text-primary/30"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></div>}
                  <span className="text-xs font-bold text-primary/40 font-[family-name:var(--font-heading)]">{pillar.num}</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark mt-1 mb-2">{pillar.title}</h3>
                  <p className="text-xs text-muted leading-relaxed max-w-[220px] mx-auto">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Flywheel badge */}
            <div className="mt-10 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-5 py-2.5 shadow-sm">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                <span className="text-sm text-dark font-medium">Jede Runde stärker — das Content-Flywheel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT TYPES — Bento grid with mixed sizes */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Content-Mix</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">6 Formate, ein Ziel: Traffic der bleibt</h2>
            <p className="text-lg text-muted max-w-2xl">Jedes Format erfüllt eine andere Funktion in Ihrem Content-Ökosystem. Wir planen den richtigen Mix.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 delay-200 reveal">
            {/* Pillar — large card spanning 2 cols */}
            <div className="md:col-span-2 rounded-2xl border-2 border-primary/15 bg-gradient-to-br from-primary/[0.03] to-secondary/[0.02] p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/25">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">ANKER</span>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mb-2">Pillar Pages</h3>
              <p className="text-muted leading-relaxed">3000+ Wörter Hub-Seiten zu Ihren Kernthemen. Der zentrale Anker jedes Topic Clusters. Alle Cluster-Artikel verlinken hierhin — und bauen so thematische Autorität auf.</p>
            </div>

            {/* Remaining formats — normal cards */}
            {[
              { title: "Blog-Artikel", tag: "Traffic", desc: "Long-Tail-Keywords targetieren. 1500–2000 Wörter. Verlinkt zur Pillar Page." },
              { title: "Landing Pages", tag: "Conversion", desc: "Kommerzielle Keywords. Aus organischem Traffic werden Anfragen und Kunden." },
              { title: "FAQ-Seiten", tag: "Quick Win", desc: "Featured Snippet optimiert. Schnelle Rankings für Frage-Keywords." },
              { title: "Case Studies", tag: "Trust", desc: "Messbarer Erfolg als Content. Baut Vertrauen und rankt für Long-Tail." },
              { title: "Guides & Tools", tag: "Backlinks", desc: "Umfassende Evergreen-Assets die natürlich Backlinks anziehen." },
            ].map((type) => (
              <div key={type.title} className="rounded-2xl border border-border bg-offwhite/30 p-6 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-primary/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">{type.title}</h3>
                  <span className="text-[10px] font-semibold text-primary bg-primary/[0.08] px-2.5 py-1 rounded-full">{type.tag}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — Funnel visualization */}
      <section className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-16 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Ablauf</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Von der Analyse zum ersten Artikel</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Fünf Schritte. Am Ende steht ein Redaktionsplan, mit dem Ihr Team sofort loslegen kann.</p>
          </div>

          {/* Funnel-style: widest at top, narrowest at bottom */}
          <div className="transition-all duration-700 delay-200 reveal">
            <div className="space-y-3">
              {[
                { num: "01", title: "Zielgruppe & Markt analysieren", desc: "Wer sucht was? In welcher Phase? Pain Points und Content-Lücken aufdecken.", width: "lg:max-w-full", color: "border-l-primary", bg: "bg-white" },
                { num: "02", title: "Keyword-Universum aufbauen", desc: "Alle relevanten Keywords clustern, Suchintention definieren, nach Geschäftswert priorisieren.", width: "lg:max-w-[92%] lg:mx-auto", color: "border-l-secondary", bg: "bg-white" },
                { num: "03", title: "Topic Clusters definieren", desc: "Keywords zu Clustern gruppieren. Pillar Pages festlegen. Verlinkungsarchitektur planen.", width: "lg:max-w-[84%] lg:mx-auto", color: "border-l-primary", bg: "bg-white" },
                { num: "04", title: "Redaktionskalender erstellen", desc: "Content-Pieces nach Impact priorisieren. Timelines, Verantwortlichkeiten, Quick Wins.", width: "lg:max-w-[76%] lg:mx-auto", color: "border-l-secondary", bg: "bg-white" },
                { num: "05", title: "Produzieren & messen", desc: "Content erstellen, SEO-optimieren, intern verlinken. Ergebnisse tracken und iterieren.", width: "lg:max-w-[68%] lg:mx-auto", color: "border-l-primary", bg: "bg-gradient-to-r from-primary/[0.04] to-secondary/[0.02]" },
              ].map((step) => (
                <Reveal key={step.num}>
                  <div className={`${step.width}`}>
                    <div className={`flex items-start gap-5 rounded-2xl border border-border ${step.color} border-l-[4px] ${step.bg} p-5 lg:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20`}>
                      <span className="text-2xl font-bold text-primary/15 font-[family-name:var(--font-heading)] shrink-0 leading-none mt-1">{step.num}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark mb-1">{step.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Result arrow */}
            <div className="flex justify-center mt-6">
              <div className="flex flex-col items-center gap-2">
                <svg className="w-5 h-5 text-primary/30" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/[0.08] to-secondary/[0.05] border border-primary/15 px-6 py-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm font-semibold text-dark">Redaktionsplan steht — <span className="text-primary">Content-Produktion startet</span></span>
                </div>
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
                Content-Strategie,<br />die wirkt
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">Lassen Sie uns gemeinsam planen, wie Sie mit gezielten Inhalten thematische Autorität aufbauen und langfristig bessere Rankings erzielen.</p>
              <div className="space-y-4">
                {[
                  { title: "Topic-Cluster-Architektur", desc: "Wir planen Inhalte, die sich gegenseitig stärken — für nachhaltige Autorität in Ihrer Branche." },
                  { title: "Datenbasierte Planung", desc: "Jedes Thema, jeder Content-Typ ist durch Suchvolumen, Suchintention und Wettbewerbsanalyse begründet." },
                  { title: "Langfristiger Aufbau", desc: "Eine gute Content-Strategie wirkt Monate nach der Umsetzung — und wird mit der Zeit immer stärker." },
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
                  Strategie anfragen
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
