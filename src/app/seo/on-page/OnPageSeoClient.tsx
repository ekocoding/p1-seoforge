import Link from "next/link";
import FaqAccordion from "@/app/components/FaqAccordion";
import SubpageLayout from "@/app/components/SubpageLayout";


function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (<div className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>);
}

/* Hero Mockup — Three-pillar gauge */
function SeoGaugeMockup() {
  return (
    <div className="hero-dashboard">
      <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
        <div className="border-b border-border px-5 py-3 bg-gradient-to-r from-offwhite to-white flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /><span className="text-xs font-semibold text-dark">On Page SEO Score</span></div>
          <span className="text-[10px] text-muted">3 Säulen</span>
        </div>
        <div className="p-6">
          {/* Three gauges side by side */}
          <div className="grid grid-cols-3 gap-5 mb-5">
            {[
              { label: "Technik", score: 98, color: "#22c55e", detail: "Core Web Vitals, Crawlability, Mobile" },
              { label: "Content", score: 92, color: "#C2722A", detail: "Keywords, Struktur, E-E-A-T" },
              { label: "UX", score: 95, color: "#D4A853", detail: "Navigation, Speed, Conversion" },
            ].map((g) => (
              <div key={g.label} className="text-center">
                <div className="relative inline-block">
                  <svg className="w-28 h-28" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E3DF" strokeWidth="6" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke={g.color} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${g.score * 2.64} 264`} transform="rotate(-90 50 50)">
                      <animate attributeName="stroke-dasharray" values={`0 264;${g.score * 2.64} 264`} dur="1.8s" fill="freeze" />
                    </circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-dark font-[family-name:var(--font-heading)]">{g.score}</span>
                    <span className="text-[8px] text-muted">/100</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-dark mt-2">{g.label}</p>
                <p className="text-[10px] text-muted mt-0.5 leading-tight">{g.detail}</p>
              </div>
            ))}
          </div>

          {/* Overall score bar */}
          <div className="rounded-xl bg-gradient-to-r from-primary/[0.05] to-secondary/[0.03] border border-primary/10 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-dark">Gesamt On Page Score</p>
              <p className="text-[11px] text-muted">Technik + Content + UX kombiniert</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-2 bg-border rounded-full overflow-hidden hidden sm:block">
                <div className="h-full bg-primary rounded-full" style={{ width: "95%" }} />
              </div>
              <span className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">95</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  { q: "Was ist der Unterschied zwischen On Page SEO und On Page Optimierung?", a: "On Page Optimierung bezeichnet einzelne technische Maßnahmen (Meta-Tags, Headings). On Page SEO ist die übergeordnete Strategie, die Technik, Content und User Experience ganzheitlich vereint." },
  { q: "Was kostet ganzheitliches On Page SEO?", a: "Strategieentwicklung ab 2.500 Euro. Laufende Betreuung ab 1.500 Euro monatlich. Der Preis richtet sich nach Website-Größe und Wettbewerbsintensität." },
  { q: "Wie lange dauert es bis On Page SEO wirkt?", a: "Technische Quick Wins innerhalb von Wochen. Content- und UX-Verbesserungen zeigen sich nach 2–4 Monaten. Der volle Effekt der ganzheitlichen Strategie nach 4–6 Monaten." },
  { q: "Brauche ich On Page SEO wenn ich schon On Page Optimierung mache?", a: "Ja — denn Optimierung allein reicht nicht. Ohne übergreifende Strategie optimieren Sie moeglicherweise die falschen Dinge. On Page SEO sorgt dafür, dass Technik, Content und UX als System funktionieren." },
  { q: "Wie messt ihr den Erfolg von On Page SEO?", a: "Rankings, organischer Traffic, Core Web Vitals, Bounce Rate, Verweildauer, Conversion Rate und Page Experience Score. Monatliche Reports zeigen den Fortschritt transparent." },
  { q: "Macht ihr auch die Umsetzung?", a: "Ja — wir entwickeln die Strategie und setzen sie auch um. Direkt in Ihrem CMS oder in Zusammenarbeit mit Ihrem Entwicklerteam. Beides ist moeglich." },
];

export default function OnPageSeoClient() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-secondary/[0.05] to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary hero-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Ganzheitliche Strategie
              </div>
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-dark font-[family-name:var(--font-heading)]">
                On Page SEO:{" "}<span className="text-primary">Technik + Content + UX</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                Einzelne Stellschrauben drehen reicht nicht. Nachhaltiger SEO-Erfolg entsteht, wenn technische Perfektion, hochwertiger Content und optimale Nutzererfahrung als System zusammenwirken.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {["Technik + Content + UX", "Ganzheitlich", "Messbar"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="#jetzt-starten" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl">
                  Kostenlose Analyse
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#drei-säulen" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:text-primary">
                  Die 3 Säulen
                </Link>
              </div>
            </div>
            <SeoGaugeMockup />
          </div>
        </div>
      </section>

      {/* EDITORIAL — Was ist On Page SEO + Eyecatcher */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Strategie</span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-8">
                  On Page SEO ist mehr als Optimierung — es ist ein <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Gesamtkonzept</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-muted text-base lg:text-lg leading-relaxed">
                    Viele verwechseln <strong className="text-dark font-semibold">On Page SEO</strong> mit On Page Optimierung. Der Unterschied: Optimierung sind einzelne Maßnahmen — ein Title-Tag hier, ein Alt-Text dort. On Page SEO ist die übergreifende Strategie, die sicherstellt, dass alle Teile zusammenspielen.
                  </p>
                  <p className="text-muted text-base lg:text-lg leading-relaxed">
                    Google bewertet Websites ganzheitlich. Eine technisch perfekte Seite mit schlechtem Content rankt nicht. Content ohne Technik wird nie gecrawlt. Und selbst die besten Rankings bringen nichts, wenn die UX so schlecht ist, dass Nutzer sofort abspringen.
                  </p>
                </div>
              </div>
              {/* Venn diagram — right, vertically centered */}
              <div className="lg:col-span-5">
                <svg viewBox="0 0 300 280" fill="none" className="w-full h-auto max-w-[320px] mx-auto">
                  <circle cx="150" cy="100" r="75" fill="#22c55e" fillOpacity="0.06" stroke="#22c55e" strokeWidth="2" opacity="0.4" />
                  <circle cx="105" cy="180" r="75" fill="#C2722A" fillOpacity="0.06" stroke="#C2722A" strokeWidth="2" opacity="0.4" />
                  <circle cx="195" cy="180" r="75" fill="#D4A853" fillOpacity="0.06" stroke="#D4A853" strokeWidth="2" opacity="0.4" />
                  <text x="150" y="60" textAnchor="middle" fill="#22c55e" fontSize="15" fontWeight="700">Technik</text>
                  <text x="55" y="220" textAnchor="middle" fill="#C2722A" fontSize="15" fontWeight="700">Content</text>
                  <text x="245" y="220" textAnchor="middle" fill="#D4A853" fontSize="15" fontWeight="700">UX</text>
                  <circle cx="150" cy="155" r="26" fill="#C2722A" fillOpacity="0.15" stroke="#C2722A" strokeWidth="2.5" />
                  <text x="150" y="151" textAnchor="middle" fill="#C2722A" fontSize="10" fontWeight="800">ON PAGE</text>
                  <text x="150" y="165" textAnchor="middle" fill="#C2722A" fontSize="10" fontWeight="800">SEO</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DREI SAEULEN — Horizontal connected tabs */}
      <section id="drei-säulen" className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die 3 Säulen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Drei Disziplinen, ein Ergebnis</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Jede Säule deckt einen Bereich ab. Zusammen ergeben sie nachhaltigen SEO-Erfolg.</p>
          </div>

          <div className="relative transition-all duration-700 delay-200 reveal">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-[70px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-green-500/30 via-primary/30 to-secondary/30" />

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { title: "Technisches SEO", score: "98%", color: "bg-green-500", borderColor: "border-t-green-500", items: ["Core Web Vitals", "Crawl-Budget", "Structured Data", "Mobile-First"] },
                { title: "Content", score: "A+", color: "bg-primary", borderColor: "border-t-primary", items: ["Keyword-Strategie", "Suchintention", "E-E-A-T", "Content-Lücken"] },
                { title: "User Experience", score: "9.2", color: "bg-secondary", borderColor: "border-t-secondary", items: ["Navigation", "Bounce Rate", "Conversions", "Accessibility"] },
              ].map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 120}>
                  <div className="text-center">
                    {/* Score node */}
                    <div className={`relative z-10 mx-auto mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-full ${pillar.color} text-white shadow-lg border-4 border-white`}>
                      <div><p className="text-xl font-bold font-[family-name:var(--font-heading)]">{pillar.score}</p></div>
                    </div>
                    {/* Card below */}
                    <div className={`rounded-2xl ${pillar.borderColor} border-t-[3px] border border-border bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                      <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-4">{pillar.title}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {pillar.items.map((item) => (
                          <div key={item} className="flex items-center gap-1.5 text-xs text-dark/70">
                            <svg className="w-3 h-3 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UNTERSCHIED — Layered card */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">
            <div className="mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Unterschied</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">SEO vs. Optimierung — eine Ebene höher</h2>
              <p className="text-lg text-muted max-w-2xl">On Page Optimierung sind die Bausteine. On Page SEO ist der Bauplan.</p>
            </div>

            {/* Layered visualization */}
            <div className="relative">
              {/* Bottom layer — Optimierung */}
              <div className="rounded-2xl border border-border bg-offwhite/50 p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold text-muted bg-dark/5 px-3 py-1.5 rounded-full">Ebene 1</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">On Page Optimierung</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Title-Tags", "Meta-Desc.", "H1 Headings", "Alt-Texte", "Ladezeiten", "URLs", "Int. Links"].map((item) => (
                    <span key={item} className="text-xs text-muted bg-white border border-border px-3 py-1.5 rounded-lg">{item}</span>
                  ))}
                </div>

                {/* Top layer — SEO Strategy */}
                <div className="rounded-2xl border-2 border-primary/20 bg-white p-8 shadow-lg shadow-primary/[0.04]">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">Ebene 2</span>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">On Page SEO Strategie</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-5">Die übergeordnete Strategie die definiert: Welche Seiten, welche Keywords, welche Struktur, welche UX — und warum. Verbindet alle Einzelmaßnahmen zu einem System.</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { label: "Technische Architektur", sub: "Wie ist die Website aufgebaut?" },
                      { label: "Content-Strategie", sub: "Welche Inhalte für wen?" },
                      { label: "UX-Konzept", sub: "Wie navigieren Nutzer?" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl bg-offwhite/50 border border-border p-4">
                        <p className="text-sm font-semibold text-dark mb-1">{item.label}</p>
                        <p className="text-xs text-muted">{item.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WIRKUNG — Honest outcomes section */}
      <section className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">
            <div className="mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Was passiert</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Wenn alle 3 Säulen zusammenspielen</h2>
              <p className="text-lg text-muted max-w-2xl">Technische Perfektion, relevanter Content und optimale Nutzererfahrung wirken als System — und dieses System ist stärker als jede Einzelmaßnahme.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Google versteht Ihre Seite",
                  desc: "Technisch saubere Struktur, korrekte Schema-Markups, schnelle Ladezeiten — all das signalisiert Google Qualität. Gecrawlt, indexiert, bewertet.",
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
                  color: "border-t-green-500",
                  steps: ["Technischer Audit & Bereinigung", "Schema Markup Implementation", "Core Web Vitals Optimierung", "Mobile-First Verbesserungen"]
                },
                {
                  title: "Nutzer finden was sie suchen",
                  desc: "Content der zur Suchintention passt, logisch strukturiert ist und echten Mehrwert bietet — das hält Nutzer länger auf der Seite und reduziert Absprungraten.",
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
                  color: "border-t-primary",
                  steps: ["Suchintention-Analyse pro Seite", "Content-Struktur Optimierung", "E-E-A-T Signale stärken", "Semantische Tiefe aufbauen"]
                },
                {
                  title: "Rankings wachsen organisch",
                  desc: "Das Zusammenspiel von Technik, Content und UX baut nachhaltige Sichtbarkeit auf — nicht durch Tricks, sondern durch echte Qualität die Google belohnt.",
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>,
                  color: "border-t-secondary",
                  steps: ["Kontinuierliches Ranking-Monitoring", "Quick Wins zuerst umsetzen", "Langfristige Autorität aufbauen", "Regelmäßige Content-Updates"]
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <div className={`rounded-2xl ${item.color} border-t-[3px] border border-border bg-white p-7 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] text-primary mb-5">
                      {item.icon}
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mb-5">{item.desc}</p>
                    <div className="space-y-2">
                      {item.steps.map((step) => (
                        <div key={step} className="flex items-center gap-2 text-xs text-dark/70">
                          <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Quote */}
            <div className="rounded-2xl bg-white border border-border p-8 lg:p-10 text-center max-w-3xl mx-auto">
              <svg className="mx-auto mb-4 h-8 w-8 text-primary/20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              <p className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl text-dark leading-relaxed mb-6">On Page SEO wirkt nicht durch einzelne Stellschrauben — es wirkt als System. Und Systeme brauchen Zeit, bis sie ihr volles Potenzial entfalten.</p>
              <div className="flex items-center justify-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-bold">JH</div>
                <div className="text-left"><p className="text-sm font-semibold text-dark">Joel Heuchert</p><p className="text-xs text-muted">CEO & Gründer</p></div>
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
                On-Page Optimierung,<br />die rankt
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">Wir analysieren Ihre On-Page-Faktoren und zeigen Ihnen genau, was geändert werden muss — klar priorisiert und sofort umsetzbar.</p>
              <div className="space-y-4">
                {[
                  { title: "Vollständige On-Page-Analyse", desc: "Von Titles und Descriptions über Heading-Struktur bis zu interner Verlinkung — lückenlos dokumentiert." },
                  { title: "Priorisierte Maßnahmen", desc: "Sie erhalten einen klaren Plan, welche Seiten zuerst optimiert werden sollten und warum." },
                  { title: "Direkte Umsetzbarkeit", desc: "Unsere Empfehlungen sind so formuliert, dass Ihr Team oder Ihre Agentur sie direkt umsetzen kann." },
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
                  Analyse anfragen
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
