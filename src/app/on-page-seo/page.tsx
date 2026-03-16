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

/* Hero Mockup — Three-pillar gauge */
function SeoGaugeMockup() {
  return (
    <div className="hero-dashboard">
      <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
        <div className="border-b border-border px-5 py-3 bg-gradient-to-r from-offwhite to-white flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /><span className="text-xs font-semibold text-dark">On Page SEO Score</span></div>
          <span className="text-[10px] text-muted">3 Saeulen</span>
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
  { q: "Was ist der Unterschied zwischen On Page SEO und On Page Optimierung?", a: "On Page Optimierung bezeichnet einzelne technische Massnahmen (Meta-Tags, Headings). On Page SEO ist die uebergeordnete Strategie, die Technik, Content und User Experience ganzheitlich vereint." },
  { q: "Was kostet ganzheitliches On Page SEO?", a: "Strategieentwicklung ab 2.500 Euro. Laufende Betreuung ab 1.500 Euro monatlich. Der Preis richtet sich nach Website-Groesse und Wettbewerbsintensitaet." },
  { q: "Wie lange dauert es bis On Page SEO wirkt?", a: "Technische Quick Wins innerhalb von Wochen. Content- und UX-Verbesserungen zeigen sich nach 2–4 Monaten. Der volle Effekt der ganzheitlichen Strategie nach 4–6 Monaten." },
  { q: "Brauche ich On Page SEO wenn ich schon On Page Optimierung mache?", a: "Ja — denn Optimierung allein reicht nicht. Ohne uebergreifende Strategie optimieren Sie moeglicherweise die falschen Dinge. On Page SEO sorgt dafuer, dass Technik, Content und UX als System funktionieren." },
  { q: "Wie messt ihr den Erfolg von On Page SEO?", a: "Rankings, organischer Traffic, Core Web Vitals, Bounce Rate, Verweildauer, Conversion Rate und Page Experience Score. Monatliche Reports zeigen den Fortschritt transparent." },
  { q: "Macht ihr auch die Umsetzung?", a: "Ja — wir entwickeln die Strategie und setzen sie auch um. Direkt in Ihrem CMS oder in Zusammenarbeit mit Ihrem Entwicklerteam. Beides ist moeglich." },
];

export default function OnPageSeoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [editRef, editInView] = useInView();
  const [pillarsRef, pillarsInView] = useInView();
  const [diffRef, diffInView] = useInView();
  const [benefitsRef, benefitsInView] = useInView();
  const [faqRef, faqInView] = useInView();

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
                {["Technik 98/100", "Content A+", "UX Score 9.2"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="#kontakt" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl">
                  Kostenlose Analyse
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#drei-saeulen" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:text-primary">
                  Die 3 Saeulen
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.6s" }}>
                <div className="flex -space-x-2">
                  {["MK", "SL", "TR", "JW", "PH"].map((init, i) => (
                    <div key={init} className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 text-[10px] font-semibold text-white ring-2 ring-white" style={{ zIndex: 5 - i }}>{init}</div>
                  ))}
                </div>
                <p className="text-xs text-muted">Ueber <span className="font-semibold text-dark">200+ Websites</span> ganzheitlich optimiert</p>
              </div>
            </div>
            <SeoGaugeMockup />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-offwhite border-y border-border py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter value={200} suffix="+" label="Websites optimiert" />
            <Counter value={95} suffix="/100" label="Durchschn. Score" />
            <Counter value={340} suffix="%" label="Mehr organischer Traffic" />
            <Counter value={98} suffix="%" label="Kundenzufriedenheit" />
          </div>
        </div>
      </section>

      {/* EDITORIAL — Was ist On Page SEO + Eyecatcher */}
      <section ref={editRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`transition-all duration-700 ${editInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Strategie</span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-8">
                  On Page SEO ist mehr als Optimierung — es ist ein <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Gesamtkonzept</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-muted text-base lg:text-lg leading-relaxed">
                    Viele verwechseln <strong className="text-dark font-semibold">On Page SEO</strong> mit On Page Optimierung. Der Unterschied: Optimierung sind einzelne Massnahmen — ein Title-Tag hier, ein Alt-Text dort. On Page SEO ist die uebergreifende Strategie, die sicherstellt, dass alle Teile zusammenspielen.
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
      <section id="drei-saeulen" ref={pillarsRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${pillarsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die 3 Saeulen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Drei Disziplinen, ein Ergebnis</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Jede Saeule deckt einen Bereich ab. Zusammen ergeben sie nachhaltigen SEO-Erfolg.</p>
          </div>

          <div className={`relative transition-all duration-700 delay-200 ${pillarsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-[70px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-green-500/30 via-primary/30 to-secondary/30" />

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { title: "Technisches SEO", score: "98%", color: "bg-green-500", borderColor: "border-t-green-500", items: ["Core Web Vitals", "Crawl-Budget", "Structured Data", "Mobile-First"] },
                { title: "Content", score: "A+", color: "bg-primary", borderColor: "border-t-primary", items: ["Keyword-Strategie", "Suchintention", "E-E-A-T", "Content-Luecken"] },
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
      <section ref={diffRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className={`transition-all duration-700 ${diffInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Unterschied</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">SEO vs. Optimierung — eine Ebene hoeher</h2>
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
                  <p className="text-sm text-muted leading-relaxed mb-5">Die uebergeordnete Strategie die definiert: Welche Seiten, welche Keywords, welche Struktur, welche UX — und warum. Verbindet alle Einzelmassnahmen zu einem System.</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { label: "Technische Architektur", sub: "Wie ist die Website aufgebaut?" },
                      { label: "Content-Strategie", sub: "Welche Inhalte fuer wen?" },
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

      {/* RESULTS — Big numbers + quote */}
      <section ref={benefitsRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`transition-all duration-700 ${benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Ergebnisse</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Was passiert wenn alle 3 Saeulen stimmen</h2>
            </div>

            {/* Result cards — horizontal scroll feel */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {[
                { value: "+340%", label: "Organischer Traffic", sub: "Durchschnitt nach 6 Monaten" },
                { value: "Top 3", label: "Ranking-Position", sub: "Fuer Haupt-Keywords" },
                { value: "-62%", label: "Bounce Rate", sub: "Nutzer bleiben laenger" },
                { value: "+180%", label: "Conversions", sub: "Mehr Anfragen & Leads" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-white p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 font-[family-name:var(--font-heading)]">{stat.value}</p>
                  <p className="text-sm font-semibold text-dark mb-1">{stat.label}</p>
                  <p className="text-xs text-muted">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="rounded-2xl bg-white border border-border p-8 lg:p-10 text-center max-w-3xl mx-auto">
              <svg className="mx-auto mb-4 h-8 w-8 text-primary/20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              <p className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl text-dark leading-relaxed mb-6">Ganzheitliches On Page SEO ist der Unterschied zwischen einer Website die existiert — und einer die performt.</p>
              <div className="flex items-center justify-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-bold">JH</div>
                <div className="text-left"><p className="text-sm font-semibold text-dark">Joel Heuchert</p><p className="text-xs text-muted">CEO & Gruender</p></div>
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
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">On Page SEO Analyse anfragen</h2>
            <p className="text-lg text-muted">Wir pruefen wie gut Technik, Content und UX auf Ihrer Website zusammenspielen.</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8 lg:p-10 shadow-sm">
            <form className="space-y-5" action="/kontakt" method="POST">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label htmlFor="ops-name" className="block text-sm font-medium text-dark mb-2">Name *</label><input type="text" id="ops-name" name="name" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Ihr Name" /></div>
                <div><label htmlFor="ops-email" className="block text-sm font-medium text-dark mb-2">E-Mail *</label><input type="email" id="ops-email" name="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="ihre@email.de" /></div>
              </div>
              <div><label htmlFor="ops-url" className="block text-sm font-medium text-dark mb-2">Website *</label><input type="url" id="ops-url" name="website" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="https://ihre-website.de" /></div>
              <div><label htmlFor="ops-msg" className="block text-sm font-medium text-dark mb-2">Was moechten Sie verbessern? (optional)</label><textarea id="ops-msg" name="message" rows={3} className="w-full resize-none px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Rankings, Ladezeiten, Content, UX..." /></div>
              <button type="submit" className="w-full rounded-full bg-primary px-6 py-4 text-base font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20">Analyse anfragen</button>
              <p className="text-center text-xs text-muted">* Pflichtfelder | Antwort innerhalb von 24 Stunden</p>
            </form>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
