"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import SubpageLayout from "@/app/components/SubpageLayout";


function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (<div className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>);
}

function AnimatedNumber({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const dur = 1800, start = performance.now();
    const tick = (now: number) => { const p = Math.min((now - start) / dur, 1); const ease = 1 - Math.pow(1 - p, 3); setCount(parseFloat((ease * value).toFixed(decimals))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [value, decimals]);
  return (<span>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</span>);
}

const industries: Record<string, { label: string; multiplier: number; cpc: number; convRate: number; avgOrder: number }> = {
  ecommerce:       { label: "E-Commerce",       multiplier: 2.4, cpc: 0.85, convRate: 0.025, avgOrder: 85 },
  saas:            { label: "SaaS / Software",   multiplier: 3.0, cpc: 4.20, convRate: 0.032, avgOrder: 180 },
  dienstleistungen:{ label: "Dienstleistungen",  multiplier: 2.1, cpc: 2.50, convRate: 0.04,  avgOrder: 250 },
  handwerk:        { label: "Handwerk",          multiplier: 1.9, cpc: 3.20, convRate: 0.06,  avgOrder: 400 },
  gesundheit:      { label: "Gesundheit",        multiplier: 2.6, cpc: 2.80, convRate: 0.035, avgOrder: 120 },
};

const faqs = [
  {
    q: "Wie lange dauert es bis SEO ROI positiv wird?",
    a: "Die meisten Websites sehen den Break-Even nach 6–9 Monaten. Technische Quick Wins können innerhalb der ersten 30 Tage Wirkung zeigen. Nachhaltiger positiver ROI entsteht typischerweise ab Monat 6–8, wenn Content-Cluster beginnen zu ranken.",
  },
  {
    q: "Ist der ROI-Rechner realistisch?",
    a: "Die Berechnungen basieren auf deutschen Marktdurchschnittswerten (Searchmetrics, Google Ads Benchmarks 2025). Tatsächliche Ergebnisse hängen von Wettbewerb, Website-Zustand und Qualität der Umsetzung ab. Wir nutzen bewusst konservative Schätzungen.",
  },
  {
    q: "Was kostet eine monatliche SEO Betreuung bei SeoForge?",
    a: "Der Einstieg beginnt ab €750/Monat für kleine Websites. Für mittelständische Projekte mit moderatem Wettbewerb liegt das typische Budget bei €1.500–€3.000/Monat. Im kostenlosen Erstgespräch erstellen wir ein individuelles Angebot.",
  },
  {
    q: "Kann ich SEO mit Google Ads kombinieren?",
    a: "Ja — und das ist oft die klügste Kurzfriststrategie. Google Ads liefert sofort Traffic während SEO aufgebaut wird. Nach 12 Monaten reduzieren die meisten Kunden ihr Ads-Budget signifikant, da organischer Traffic die Lücke schließt.",
  },
  {
    q: "Was passiert wenn ich die SEO Betreuung kündige?",
    a: "Rankings bleiben bestehen — das ist der fundamentale Unterschied zu bezahlter Werbung. Ohne aktive Betreuung erodieren Positionen langsam über Monate, nicht über Nacht. Ihr aufgebautes Content-Kapital gehört Ihnen.",
  },
  {
    q: "Lohnt sich SEO für kleine Budgets?",
    a: "Ja, wenn die Prioritäten stimmen. Mit €750–€1.000/Monat fokussieren wir uns auf die 20% der Maßnahmen die 80% des ROI bringen: technische Grundlagen, 2–3 starke Content-Pieces pro Monat, lokale Sichtbarkeit.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO Betreuung ROI Analyse",
  provider: { "@type": "Organization", name: "SeoForge", url: "https://seoforge.de" },
  description: "Interaktiver ROI-Rechner für monatliche SEO Betreuung mit Branchenvergleich",
  url: "https://seoforge.de/seo/betreuung/roi",
  areaServed: { "@type": "Country", name: "Germany" },
};

export default function SeoBetreuungROIClient() {
  const [budget, setBudget] = useState(1500);
  const [visitors, setVisitors] = useState(1000);
  const [industry, setIndustry] = useState("dienstleistungen");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chartInView, setChartInView] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setChartInView(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const calc = useMemo(() => {
    const ind = industries[industry];
    const trafficAfter12 = Math.round(visitors * ind.multiplier);
    const trafficValue = Math.round(trafficAfter12 * ind.cpc);
    const newLeads = Math.round(trafficAfter12 * ind.convRate);
    const totalInvestment = budget * 12;
    const monthlyRevenue = Math.round(newLeads * ind.avgOrder);
    const annualRevenue = monthlyRevenue * 12;
    const roi = Math.round(((annualRevenue - totalInvestment) / totalInvestment) * 100);
    return { trafficAfter12, trafficValue, newLeads, totalInvestment, monthlyRevenue, annualRevenue, roi };
  }, [budget, visitors, industry]);

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1A1A1A]">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-60 -right-60 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hero-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                SEO ROI Analyse
              </div>
              <h1 className="hero-title font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] text-white">
                Lohnt sich SEO{" "}
                <span className="block">Betreuung?</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Spoiler: Ja.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 hero-description">
                Kein Bauchgefühl, keine Versprechen — nur Zahlen. Berechnen Sie Ihren persönlichen ROI und sehen Sie warum SEO Google Ads langfristig schlägt.
              </p>
              {/* Stat pills */}
              <div className="mt-8 flex flex-wrap gap-3 hero-description" style={{ animationDelay: "0.25s" }}>
                {[
                  { icon: "⌀", label: "ROI 312%" },
                  { icon: "📈", label: "Traffic wächst 12–36 Monate" },
                  { icon: "♾️", label: "Kein Stop-and-Go" },
                ].map((pill) => (
                  <div key={pill.label} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                    <span>{pill.icon}</span>
                    <span>{pill.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 hero-cta">
                <a href="#rechner" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-xl">
                  Zum ROI-Rechner
                  <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>

            {/* Right — floating stat cards */}
            <div className="relative flex justify-center hero-dashboard">
              <div className="relative w-full max-w-sm">
                {/* Main card */}
                <div className="float-card-1 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <p className="text-sm font-medium text-white/50 mb-2">Ø Monatliche Investition</p>
                  <p className="font-[family-name:var(--font-heading)] text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">€1.500</p>
                  <p className="text-sm text-white/60 mt-3">Traffic-Wert nach 12 Monaten:</p>
                  <p className="text-xl font-bold text-white mt-1">€4.680</p>
                  <div className="mt-6 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="text-xs text-white/50">Basierend auf deutschen Marktdaten 2026</span>
                  </div>
                </div>
                {/* Overlapping ROI badge */}
                <div className="float-card-2 absolute -bottom-6 -right-6 rounded-2xl border border-secondary/30 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] p-5 shadow-2xl">
                  <p className="text-xs font-bold tracking-wider text-secondary/70 uppercase mb-1">ROI</p>
                  <p className="font-[family-name:var(--font-heading)] text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">312%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SEO vs GOOGLE ADS ── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Langfristvergleich</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-6">
                SEO vs. Google Ads
              </h2>
              <p className="text-lg text-muted">Gleiche Suchintention. Völlig andere Logik.</p>
            </div>
          </Reveal>

          {/* SVG Chart */}
          <Reveal delay={100}>
            <div ref={chartRef} className="rounded-2xl border border-border bg-offwhite p-6 lg:p-10 mb-12">
              <svg viewBox="0 0 700 320" className="w-full" aria-label="SEO vs Google Ads Vergleichschart">
                {/* Grid lines */}
                {[0, 80, 160, 220, 280].map((y, i) => (
                  <line key={i} x1="60" y1={300 - y} x2="680" y2={300 - y} stroke="#E5E3DF" strokeWidth="1" />
                ))}
                {/* Y-axis labels */}
                {[
                  { y: 300, label: "0" },
                  { y: 220, label: "500" },
                  { y: 140, label: "1.000" },
                  { y: 80, label: "2.500" },
                  { y: 20, label: "5.000" },
                ].map(({ y, label }) => (
                  <text key={label} x="54" y={y + 4} textAnchor="end" fontSize="11" fill="#6B6B6B">{label}</text>
                ))}
                {/* X-axis labels */}
                {[
                  { x: 180, label: "Monat 3" },
                  { x: 300, label: "Monat 6" },
                  { x: 430, label: "Monat 12" },
                  { x: 555, label: "Monat 18" },
                  { x: 668, label: "Monat 24" },
                ].map(({ x, label }) => (
                  <text key={label} x={x} y="318" textAnchor="middle" fontSize="11" fill="#6B6B6B">{label}</text>
                ))}
                {/* Y-axis title */}
                <text x="14" y="160" textAnchor="middle" fontSize="11" fill="#6B6B6B" transform="rotate(-90, 14, 160)">Monatl. Besucher</text>

                {/* Dotted vertical line at month 12 */}
                <line x1="430" y1="20" x2="430" y2="300" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.5" />
                <text x="434" y="38" fontSize="10" fill="#ef4444" opacity="0.8">Wenn du aufhörst</text>
                <text x="434" y="50" fontSize="10" fill="#ef4444" opacity="0.8">zu zahlen</text>

                {/* Google Ads line: flat until month 12, then drops to 0 */}
                {chartInView && (
                  <polyline
                    points="60,220 180,200 300,190 430,185 430,300 680,300"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    className="svg-line-draw"
                    strokeDasharray="2000"
                    strokeDashoffset={chartInView ? "0" : "2000"}
                    style={{ transition: "stroke-dashoffset 1.8s ease-out 0.3s" }}
                  />
                )}

                {/* SEO line: starts slow, curves upward past month 12 */}
                {chartInView && (
                  <polyline
                    points="60,295 180,280 300,255 430,200 555,120 668,40"
                    fill="none"
                    stroke="#C2722A"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeDasharray="2000"
                    strokeDashoffset={chartInView ? "0" : "2000"}
                    style={{ transition: "stroke-dashoffset 2s ease-out 0.5s" }}
                  />
                )}

                {/* SEO area fill */}
                {chartInView && (
                  <polygon
                    points="60,295 180,280 300,255 430,200 555,120 668,40 668,300 60,300"
                    fill="url(#seoGrad)"
                    opacity="0.15"
                  />
                )}

                <defs>
                  <linearGradient id="seoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C2722A" />
                    <stop offset="100%" stopColor="#C2722A" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-8 bg-primary rounded" />
                  <span className="text-sm text-muted">SEO (organisch)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-8 bg-red-400 rounded" />
                  <span className="text-sm text-muted">Google Ads (bezahlt)</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Comparison table */}
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark text-white">
                    <th className="px-6 py-4 text-left font-semibold">Kriterium</th>
                    <th className="px-6 py-4 text-center font-semibold text-primary">SEO Betreuung</th>
                    <th className="px-6 py-4 text-center font-semibold text-red-400">Google Ads</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { criterion: "Traffic bei Pause", seo: { ok: true, text: "Bleibt bestehen" }, ads: { ok: false, text: "Sofort weg" } },
                    { criterion: "Kosten nach 12 Monaten", seo: { ok: true, text: "Sinken effektiv" }, ads: { ok: false, text: "Gleichbleibend" } },
                    { criterion: "Vertrauen", seo: { ok: true, text: "Höher (organisch)" }, ads: { ok: false, text: "Niedriger (Anzeige)" } },
                    { criterion: "Compound-Effekt", seo: { ok: true, text: "Ja" }, ads: { ok: false, text: "Nein" } },
                    { criterion: "Klickpreis", seo: { ok: true, text: "€0" }, ads: { ok: false, text: "€0.50–€8.00" } },
                    { criterion: "Langzeit-ROI", seo: { ok: true, text: "Sehr hoch" }, ads: { ok: false, text: "Begrenzt" } },
                  ].map((row, i) => (
                    <tr key={row.criterion} className={`border-t border-border transition-colors hover:bg-offwhite ${i % 2 === 0 ? "bg-white" : "bg-offwhite/40"}`}>
                      <td className="px-6 py-4 font-medium text-dark">{row.criterion}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-green-700">
                          <svg className="h-4 w-4 text-green-500 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                          {row.seo.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-red-600">
                          <svg className="h-4 w-4 text-red-500 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" /></svg>
                          {row.ads.text}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. ROI RECHNER ── */}
      <section id="rechner" className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">INTERAKTIVER RECHNER</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-6">
                Berechnen Sie Ihren SEO-ROI
              </h2>
              <p className="text-lg text-muted">Passen Sie die Parameter an Ihr Unternehmen an und sehen Sie Ihr Potenzial in Echtzeit.</p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Inputs */}
            <Reveal delay={100}>
              <div className="space-y-8">
                {/* Budget Slider */}
                <div className="rounded-2xl border border-border bg-white p-6 lg:p-8">
                  <label className="block text-sm font-bold text-dark mb-1">Monatliches SEO-Budget</label>
                  <p className="text-xs text-muted mb-4">Wie viel möchten Sie monatlich in SEO investieren?</p>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-[family-name:var(--font-heading)] text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      €{budget.toLocaleString("de-DE")}
                    </span>
                    <span className="text-sm text-muted">/ Monat</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={5000}
                    step={100}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "#C2722A" }}
                  />
                  <div className="flex justify-between text-xs text-muted mt-2 mb-5">
                    <span>€500</span>
                    <span>€5.000</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[750, 1500, 3000].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setBudget(preset)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all border ${budget === preset ? "bg-primary text-white border-primary" : "border-border text-muted hover:border-primary/40 hover:text-primary"}`}
                      >
                        €{preset.toLocaleString("de-DE")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industry Select */}
                <div className="rounded-2xl border border-border bg-white p-6 lg:p-8">
                  <label className="block text-sm font-bold text-dark mb-1">Ihre Branche</label>
                  <p className="text-xs text-muted mb-4">Branchenspezifische Conversion-Raten und CPC-Werte fließen in die Berechnung ein.</p>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(industries).map(([key, ind]) => (
                      <button
                        key={key}
                        onClick={() => setIndustry(key)}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all ${industry === key ? "border-primary bg-primary/[0.06] text-primary" : "border-border text-dark hover:border-primary/30 hover:bg-offwhite"}`}
                      >
                        <span>{ind.label}</span>
                        {industry === key && (
                          <svg className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visitors Input */}
                <div className="rounded-2xl border border-border bg-white p-6 lg:p-8">
                  <label className="block text-sm font-bold text-dark mb-1">Aktuelle monatliche Besucher (organisch)</label>
                  <p className="text-xs text-muted mb-4">Wie viele organische Besucher kommen aktuell auf Ihre Website pro Monat?</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setVisitors((v) => Math.max(100, v - 100))}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-dark transition hover:border-primary/40 hover:text-primary"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" /></svg>
                    </button>
                    <input
                      type="number"
                      value={visitors}
                      min={100}
                      max={100000}
                      onChange={(e) => setVisitors(Math.max(100, Number(e.target.value)))}
                      className="flex-1 rounded-xl border border-border px-4 py-2.5 text-center text-lg font-bold text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      onClick={() => setVisitors((v) => Math.min(100000, v + 100))}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-dark transition hover:border-primary/40 hover:text-primary"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v5.5h5.5a.75.75 0 010 1.5h-5.5v5.5a.75.75 0 01-1.5 0v-5.5H3.75a.75.75 0 010-1.5h5.5V3.75A.75.75 0 0110 3z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                </div>

                {/* Hinweis */}
                <div className="flex gap-3 rounded-xl border border-border bg-white/70 p-4">
                  <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" /></svg>
                  <p className="text-xs text-muted leading-relaxed">Diese Schätzungen basieren auf konservativen deutschen Marktdurchschnittswerten. Individuelle Ergebnisse hängen von Website-Zustand, Wettbewerb und Umsetzungsqualität ab.</p>
                </div>
              </div>
            </Reveal>

            {/* Results Card */}
            <Reveal delay={200}>
              <div className="lg:sticky lg:top-28 rounded-2xl bg-[#1A1A1A] p-8 text-white shadow-2xl">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-1">Prognose</p>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">Ihr geschätzter SEO-ROI</h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">Nach 12 Monaten</div>
                </div>

                {/* Traffic metrics */}
                <div className="space-y-4 mb-6">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-white/50 mb-1">Monatlicher Traffic nach 12 Monaten</p>
                    <p className="text-2xl font-bold text-white transition-all duration-500">
                      {calc.trafficAfter12.toLocaleString("de-DE")} <span className="text-sm font-normal text-white/50">Besucher/Monat</span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-white/50 mb-1">Traffic-Wert (was Google Ads kosten würde)</p>
                    <p className="text-2xl font-bold text-white transition-all duration-500">
                      €{calc.trafficValue.toLocaleString("de-DE")} <span className="text-sm font-normal text-white/50">/ Monat</span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-white/50 mb-1">Neue potenzielle Leads / Monat</p>
                    <p className="text-2xl font-bold text-white transition-all duration-500">
                      {calc.newLeads.toLocaleString("de-DE")} <span className="text-sm font-normal text-white/50">Leads</span>
                    </p>
                  </div>
                </div>

                {/* Investment vs Revenue */}
                <div className="border-t border-white/10 pt-6 mb-6 space-y-3">
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-4">Investition vs. Ertrag</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/60">Jahresinvestition</span>
                    <span className="text-sm font-semibold text-white">€{calc.totalInvestment.toLocaleString("de-DE")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/60">Pot. Jahresumsatz (neue Leads)</span>
                    <span className="text-sm font-semibold text-green-400">€{calc.annualRevenue.toLocaleString("de-DE")}</span>
                  </div>
                </div>

                {/* ROI big number */}
                <div className="rounded-xl border border-primary/30 bg-primary/10 p-6 mb-6 text-center">
                  <p className="text-xs text-white/50 mb-2">Return on Investment</p>
                  <p className="font-[family-name:var(--font-heading)] text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transition-all duration-500">
                    {calc.roi}%
                  </p>
                  <p className="text-xs text-white/40 mt-2">ROI nach 12 Monaten</p>
                </div>

                <p className="text-xs text-white/30 text-center mb-5 leading-relaxed">
                  Basierend auf deutschen Marktdurchschnittswerten. Individuelle Ergebnisse können abweichen.
                </p>

              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. ZINSESZINS-EFFEKT ── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Langzeitstrategie</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-6">
                Der Zinseszins-Effekt
              </h2>
              <p className="text-lg text-muted">Warum SEO-Investitionen mit der Zeit immer effizienter werden.</p>
            </div>
          </Reveal>

          {/* Year cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                year: "Jahr 1",
                investment: "€1.500",
                growth: "+80%",
                costPerVisitor: "€1.50",
                content: "12",
                highlight: false,
              },
              {
                year: "Jahr 2",
                investment: "€1.500",
                growth: "+150%",
                costPerVisitor: "€0.60",
                content: "28",
                highlight: false,
              },
              {
                year: "Jahr 3",
                investment: "€1.500",
                growth: "+220%",
                costPerVisitor: "€0.34",
                content: "52",
                highlight: true,
              },
            ].map((col, i) => (
              <Reveal key={col.year} delay={i * 120}>
                <div className={`relative rounded-2xl border p-6 lg:p-8 transition-all hover:shadow-lg hover:-translate-y-0.5 ${col.highlight ? "border-secondary bg-gradient-to-br from-secondary/5 to-primary/5" : "border-border bg-white"}`}>
                  {col.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-xs font-bold text-white shadow-md">Bestes ROI</span>
                    </div>
                  )}
                  <p className={`font-[family-name:var(--font-heading)] text-2xl font-bold mb-6 ${col.highlight ? "text-primary" : "text-dark"}`}>{col.year}</p>
                  <div className="space-y-4">
                    {[
                      { label: "Monatl. Investition", value: col.investment },
                      { label: "Traffic-Zuwachs", value: col.growth, accent: true },
                      { label: "Kosten pro Besucher", value: col.costPerVisitor },
                      { label: "Content-Assets", value: col.content },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center border-b border-border pb-3 last:border-0 last:pb-0">
                        <span className="text-sm text-muted">{row.label}</span>
                        <span className={`text-sm font-bold ${row.accent ? "text-green-600" : "text-dark"}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Flywheel */}
          <Reveal delay={100}>
            <div className="rounded-2xl border border-border bg-offwhite p-8 lg:p-12">
              <p className="text-center text-sm font-bold tracking-[0.15em] uppercase text-muted mb-8">Der SEO-Flywheel-Effekt</p>
              <div className="flex flex-wrap items-center justify-center gap-0">
                {[
                  { label: "Content", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg> },
                  { label: "Rankings", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
                  { label: "Traffic", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg> },
                  { label: "Authority", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> },
                ].map((step, i, arr) => (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm border border-primary/20">
                        {step.icon}
                      </div>
                      <span className="text-xs font-bold text-dark">{step.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="mx-3 flex items-center text-primary/40">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                      </div>
                    )}
                    {i === arr.length - 1 && (
                      <div className="ml-3 flex items-center gap-1 text-xs text-primary/60 italic">
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" /></svg>
                        <span>wiederholt</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. BRANCHEN-BENCHMARKS ── */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">DEUTSCHE MARKTZAHLEN 2026</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-6">
                Branchen-Benchmarks
              </h2>
              <p className="text-lg text-muted">Typische SEO-Ergebnisse nach 12 Monaten professioneller Betreuung — nach Branche.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-offwhite">
                    <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-muted uppercase">Branche</th>
                    <th className="px-6 py-4 text-left text-xs font-bold tracking-wider text-muted uppercase">Ø Traffic nach 12M</th>
                    <th className="px-6 py-4 text-center text-xs font-bold tracking-wider text-muted uppercase">Ø CPC Wert</th>
                    <th className="px-6 py-4 text-center text-xs font-bold tracking-wider text-muted uppercase">Conv.-Rate</th>
                    <th className="px-6 py-4 text-center text-xs font-bold tracking-wider text-muted uppercase">Lead-Wert</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "E-Commerce", traffic: "+140%", trafficNum: 140, cpc: "€0.85", conv: "2.5%", lead: "€85" },
                    { name: "SaaS / Software", traffic: "+200%", trafficNum: 200, cpc: "€4.20", conv: "3.2%", lead: "€180" },
                    { name: "Dienstleistungen", traffic: "+110%", trafficNum: 110, cpc: "€2.50", conv: "4.0%", lead: "€250" },
                    { name: "Handwerk / Gewerk", traffic: "+90%", trafficNum: 90, cpc: "€3.20", conv: "6.0%", lead: "€400" },
                    { name: "Gesundheit / Praxis", traffic: "+160%", trafficNum: 160, cpc: "€2.80", conv: "3.5%", lead: "€120" },
                  ].map((row, i) => (
                    <tr key={row.name} className={`border-b border-border transition-colors hover:bg-offwhite/60 ${i % 2 === 0 ? "bg-white" : "bg-offwhite/20"}`}>
                      <td className="px-6 py-5 font-semibold text-dark">{row.name}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-green-600 w-14 shrink-0">{row.traffic}</span>
                          <div className="flex-1 h-2 rounded-full bg-border overflow-hidden max-w-[160px]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                              style={{ width: `${Math.min(row.trafficNum / 2, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center text-muted">{row.cpc}</td>
                      <td className="px-6 py-5 text-center text-muted">{row.conv}</td>
                      <td className="px-6 py-5 text-center font-semibold text-dark">{row.lead}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. WAS ZÄHLT ALS ROI ── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Ganzheitliche Betrachtung</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-6">
                Was SEO wirklich zurückbringt
              </h2>
              <p className="text-lg text-muted">ROI ist mehr als Zahlen in einem Rechner. SEO schafft mehrschichtigen Unternehmenswert.</p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Direkte Leads",
                desc: "Organische Anfragen, Formulare, Anrufe direkt aus Suchergebnissen. Qualitativ hochwertig — die Nutzer suchen aktiv nach Ihnen.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                ),
              },
              {
                title: "Traffic-Wert-Substitution",
                desc: "Was Sie bei Google Ads für denselben Traffic zahlen würden. Bei 5.000 Besuchern/Monat und €2 CPC sind das €10.000 — monatlich.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                ),
              },
              {
                title: "Markenbekanntheit",
                desc: "Sichtbarkeit in KI-Antworten (ChatGPT, Gemini) und Featured Snippets. Die nächste Dimension organischer Reichweite.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                ),
              },
              {
                title: "Wettbewerbsvorteil",
                desc: "Jede Seite die rankt, verdrängt einen Konkurrenten. Dauerhafter Marktvorteil der sich mit der Zeit kumuliert.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                  </svg>
                ),
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div className="rounded-2xl border border-border bg-white p-6 lg:p-8 transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {card.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark mb-2">{card.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Häufige Fragen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-6">
                SEO ROI — Ihre Fragen
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="rounded-2xl border border-border bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-offwhite/50"
                  >
                    <span className="font-semibold text-dark pr-4">{faq.q}</span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-64" : "max-h-0"}`}>
                    <p className="px-6 pb-5 text-sm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Reveal>
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
                Bereit zum Start?<br />Wir rechnen gemeinsam.
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">Der ROI-Rechner hat Ihnen ein erstes Bild gegeben. Lassen Sie uns in einem Gespräch besprechen, wie wir das Potenzial konkret für Ihr Unternehmen realisieren.</p>
              <div className="space-y-4">
                {[
                  { title: "Individuelle ROI-Analyse", desc: "Basierend auf Ihrer Branche, Ihrem Wettbewerb und Ihren Zielen — nicht auf generischen Durchschnittswerten." },
                  { title: "Datenbasierte Prognose", desc: "Wir zeigen Ihnen, welche Rankings realistisch sind und was das für Ihren Traffic und Umsatz bedeutet." },
                  { title: "Transparente Investition", desc: "Klare Kosten, klare Erwartungen. Sie wissen vorher, womit Sie rechnen können." },
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
