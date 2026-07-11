"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import SubpageLayout from "@/app/components/SubpageLayout"

function useInView<T extends HTMLElement = HTMLElement>(opts = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true) // SSR-safe: initial sichtbar
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const { top, bottom } = el.getBoundingClientRect()
    if (bottom > 0 && top < window.innerHeight) return // Bereits im Viewport
    setInView(false)
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1, ...opts }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView] as const
}

function TypewriterStat({ value, inView, delay = 600 }: { value: string; inView: boolean; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!inView) return
    const timeout = setTimeout(() => {
      let i = 0
      const iv = setInterval(() => {
        i++
        setDisplayed(value.slice(0, i))
        if (i >= value.length) { clearInterval(iv); setTimeout(() => setDone(true), 1200) }
      }, 55)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(timeout)
  }, [inView, value, delay])
  return (
    <>
      {displayed}
      {!done && <span className="animate-[cursorBlink_0.7s_ease_infinite]">|</span>}
    </>
  )
}

// ============================================================
// FAQ ACCORDION COMPONENT
// ============================================================
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#E5E3DF] last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="font-semibold text-[#1A1A1A] pr-6 group-hover:text-[#C2722A] transition-colors">{q}</span>
        <span className={`text-[#C2722A] text-xl font-light transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-45' : 'rotate-0'}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <p className="text-[#6B6B6B] leading-relaxed text-[0.95rem]">{a}</p>
      </div>
    </div>
  )
}

/* ============================================================ */
/* INTERACTIVE APP 1 — Citation Trend Chart                     */
/* ============================================================ */
function CitationTrendChart() {
  const [chartRef, chartInView] = useInView<HTMLDivElement>()

  const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"]
  const brandData = [12, 15, 18, 22, 24, 28]
  const competitorData = [30, 32, 34, 36, 38, 41]

  const maxVal = 50
  const chartH = 180

  return (
    <section className="py-16 bg-[#F8F7F5]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
          / BEISPIEL: MENTION RATE VERLAUF
        </span>
        <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-3">
          So entwickelt sich KI-Sichtbarkeit über Zeit
        </h2>
        <p className="text-[#6B6B6B] mb-10 max-w-xl">
          Ein typischer Verlauf nach Start der GEO-Maßnahmen — Ihre Marke vs. Hauptwettbewerber.
        </p>

        <div
          ref={chartRef}
          className="bg-white border border-[#E5E3DF] rounded-2xl p-6 shadow-sm"
        >
          {/* Legend */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C2722A]" />
              <span className="text-sm text-[#6B6B6B]">Ihre Marke</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#E5E3DF]" />
              <span className="text-sm text-[#6B6B6B]">Hauptwettbewerber</span>
            </div>
          </div>

          {/* SVG Chart */}
          <svg
            viewBox={`0 0 600 ${chartH + 40}`}
            className="w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid lines */}
            {[0, 25, 50].map((v) => {
              const y = chartH - (v / maxVal) * chartH
              return (
                <g key={v}>
                  <line x1="40" y1={y} x2="580" y2={y} stroke="#E5E3DF" strokeWidth="1" strokeDasharray="4 4" />
                  <text x="32" y={y + 4} textAnchor="end" style={{ fontSize: 10, fill: "#6B6B6B" }}>{v}%</text>
                </g>
              )
            })}

            {/* Competitor bars */}
            {competitorData.map((val, i) => {
              const barW = 30
              const gap = 84
              const x = 50 + i * gap
              const barH = (val / maxVal) * chartH
              const y = chartH - barH
              return (
                <rect
                  key={`comp-${i}`}
                  x={x + barW + 4}
                  y={y}
                  width={barW}
                  height={chartInView ? barH : 0}
                  fill="#E5E3DF"
                  rx="4"
                  style={{ transition: `height 0.6s ease ${i * 0.08}s, y 0.6s ease ${i * 0.08}s` }}
                />
              )
            })}

            {/* Brand bars */}
            {brandData.map((val, i) => {
              const barW = 30
              const gap = 84
              const x = 50 + i * gap
              const barH = (val / maxVal) * chartH
              const y = chartH - barH
              return (
                <g key={`brand-${i}`}>
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={chartInView ? barH : 0}
                    fill="#C2722A"
                    rx="4"
                    style={{ transition: `height 0.6s ease ${i * 0.08}s, y 0.6s ease ${i * 0.08}s` }}
                  />
                  {chartInView && (
                    <text x={x + barW / 2} y={y - 4} textAnchor="middle" style={{ fontSize: 9, fill: "#C2722A", fontWeight: 700 }}>
                      {val}%
                    </text>
                  )}
                </g>
              )
            })}

            {/* X-axis labels */}
            {months.map((m, i) => {
              const gap = 84
              const x = 50 + i * gap + 30
              return (
                <text key={m} x={x} y={chartH + 18} textAnchor="middle" style={{ fontSize: 11, fill: "#6B6B6B" }}>
                  {m}
                </text>
              )
            })}
          </svg>

          <div className="mt-4 pt-4 border-t border-[#E5E3DF] flex flex-wrap gap-4 text-xs text-[#6B6B6B]">
            <span>ChatGPT GPT-4o · 20 Standard-Prompts · 3 Durchläufe je Prompt</span>
            <span className="ml-auto text-[#C2722A] font-semibold">+16 Pp. in 6 Monaten</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================ */
/* INTERACTIVE APP 2 — KPI Dashboard                            */
/* ============================================================ */
function KpiDashboard() {
  const [platform, setPlatform] = useState("chatgpt")

  const data: Record<string, { mentionRate: number; quality: number; sentiment: number; competitorDelta: number }> = {
    chatgpt: { mentionRate: 28, quality: 72, sentiment: 80, competitorDelta: -13 },
    gemini: { mentionRate: 42, quality: 68, sentiment: 75, competitorDelta: -5 },
    perplexity: { mentionRate: 35, quality: 81, sentiment: 88, competitorDelta: 3 },
    claude: { mentionRate: 15, quality: 60, sentiment: 90, competitorDelta: -22 },
  }

  const platforms = [
    { id: "chatgpt", label: "ChatGPT" },
    { id: "gemini", label: "Gemini" },
    { id: "perplexity", label: "Perplexity" },
    { id: "claude", label: "Claude" },
  ]

  const current = data[platform]

  const getColor = (val: number, invert = false) => {
    if (invert) {
      if (val > 0) return "text-green-600"
      if (val > -10) return "text-yellow-600"
      return "text-red-500"
    }
    if (val >= 70) return "text-green-600"
    if (val >= 40) return "text-yellow-600"
    return "text-red-500"
  }

  const metrics = [
    { label: "Mention Rate", value: `${current.mentionRate}%`, color: getColor(current.mentionRate) },
    { label: "Citation Quality", value: `${current.quality}/100`, color: getColor(current.quality) },
    { label: "Sentiment (positiv)", value: `${current.sentiment}%`, color: getColor(current.sentiment) },
    {
      label: "Competitor Delta",
      value: `${current.competitorDelta > 0 ? "+" : ""}${current.competitorDelta} Pp.`,
      color: getColor(current.competitorDelta, true),
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
          / INTERAKTIV: KPI DASHBOARD
        </span>
        <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-3">
          Wie Ihr GEO Dashboard aussieht
        </h2>
        <p className="text-[#6B6B6B] mb-8 max-w-xl">
          Wählen Sie eine Plattform und sehen Sie Beispiel-KPIs aus unserem monatlichen Report.
        </p>

        {/* Platform selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                platform === p.id
                  ? "bg-[#C2722A] text-white"
                  : "bg-[#F8F7F5] text-[#6B6B6B] hover:bg-[#E5E3DF]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-[#F8F7F5] border border-[#E5E3DF] rounded-xl p-5 text-center hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#C2722A]/8 hover:border-[#C2722A]/20 transition-all duration-300 cursor-default">
              <div className={`text-2xl font-bold mb-1 ${m.color}`}>{m.value}</div>
              <div className="text-xs text-[#6B6B6B]">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bar: mention rate */}
        <div className="mt-6 bg-[#F8F7F5] border border-[#E5E3DF] rounded-xl p-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#6B6B6B]">Mention Rate — {platforms.find((p) => p.id === platform)?.label}</span>
            <span className="font-semibold text-[#1A1A1A]">{current.mentionRate}%</span>
          </div>
          <div className="h-3 bg-[#E5E3DF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C2722A] rounded-full transition-all duration-700"
              style={{ width: `${current.mentionRate}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#6B6B6B] mt-1">
            <span>0%</span>
            <span>Ziel: 50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "GEO Monitoring",
      provider: { "@type": "Organization", name: "SeoForge" },
      serviceType: "Generative Engine Optimization Monitoring",
      areaServed: "Deutschland, Österreich, Schweiz",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Kann man KI-Antworten überhaupt zuverlässig monitoren — die Antworten sind doch jedes Mal anders?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Das ist richtig. KI-Systeme sind stochastisch — dieselbe Frage liefert nicht immer dieselbe Antwort. Deshalb verwenden wir standardisierte Prompt-Sets und führen jeden Prompt mehrfach aus. Aus der Häufigkeitsverteilung ergibt sich eine statistisch belastbare Mention Rate, die Trends zuverlässig sichtbar macht.",
          },
        },
        {
          "@type": "Question",
          name: "Unterscheidet sich GEO Monitoring von klassischem Brand-Monitoring (z.B. Google Alerts, Mention)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja, grundlegend. Klassisches Brand-Monitoring trackt, wo im Web Ihr Markenname erscheint. GEO Monitoring trackt, ob KI-Systeme Ihre Marke in generierten Antworten auf relevante Anfragen nennen — ein vollständig anderer Kanal, der von klassischen Tools nicht erfasst wird.",
          },
        },
        {
          "@type": "Question",
          name: "Wie häufig wird gemonitort und wie erhalte ich die Ergebnisse?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Standard ist monatliches Monitoring mit einem Report bis zum 5. des Folgemonats. Optional bieten wir quartalsweise Tiefenanalysen an. Der Report kommt als PDF und als interaktives Dashboard (Notion oder Google Looker Studio).",
          },
        },
        {
          "@type": "Question",
          name: "Was kostet das GEO Monitoring pro Monat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Abhängig von der Anzahl der Ziel-Plattformen, dem Prompt-Set-Umfang und der Anzahl der Wettbewerber im Benchmark. Einstiegspaket ab 490 €/Monat (2 Plattformen, 20 Prompts, 2 Wettbewerber). Vollpaket auf Anfrage.",
          },
        },
        {
          "@type": "Question",
          name: "Kann ich das GEO Monitoring auch ohne vorherigen Audit oder vorherige Optimierung starten?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja. Monitoring macht zu jedem Zeitpunkt Sinn — auch als Baseline vor dem Start jeder GEO-Maßnahme. Viele Kunden starten mit Monitoring, um den Status quo zu dokumentieren, und entscheiden dann auf Basis der ersten Daten, welche Maßnahmen Priorität haben.",
          },
        },
      ],
    },
  ],
}

export default function MonitoringPageClient() {
  const [heroRef, heroInView] = useInView<HTMLDivElement>()

  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============================================================ */}
      {/* SECTION 1 — HERO                                             */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Full-bleed background image */}
        <Image
          src="/images/geo-monitoring-visual-v2.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover object-center animate-[kenBurns_4s_ease-out_forwards]"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1A1A1A]/62" />

        {/* Subtle vignette — darkens edges */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(26,26,26,0.55) 100%)' }} />

        {/* Dot grid very subtle — visible as texture */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg className="absolute top-0 left-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="hero-dots-mon" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#ffffff" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#hero-dots-mon)" />
          </svg>
        </div>

        {/* Centered content */}
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center py-32">
          {/* Eyebrow label */}
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-8 block animate-[fadeUp_0.5s_ease_forwards]">/ GEO MONITORING</span>

          {/* H1 — line-by-line reveal, white text */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-[family-name:var(--font-heading)] text-white mb-8 leading-[1.05]">
            <span className="block overflow-hidden pb-1">
              <span className="block animate-[lineReveal_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                Was KI über
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="block animate-[lineReveal_0.7s_cubic-bezier(0.16,1,0.3,1)_0.12s_forwards]">
                Ihre <span className="text-[#C2722A]">Marke</span> sagt
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-[fadeUp_0.6s_ease_0.3s_forwards]">
            Kontinuierliches Monitoring Ihrer KI-Sichtbarkeit — Brand Mentions, Sentiment und Competitor-Vergleich in einem monatlichen Report.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mb-14 animate-[fadeUp_0.6s_ease_0.45s_forwards]">
            <Link href="/kontakt" className="px-8 py-4 bg-[#C2722A] text-white rounded-xl font-semibold hover:bg-[#A85E22] transition-all shadow-lg shadow-[#C2722A]/30">
              Monitoring anfragen
            </Link>
            <a href="#dashboard" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
              KPI-Dashboard ansehen ↓
            </a>
          </div>

          {/* Inline stat — compact, no big card */}
          <div className="flex justify-center gap-10 border-t border-white/10 pt-10 animate-[fadeUp_0.6s_ease_0.6s_forwards]">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C2722A] font-[family-name:var(--font-heading)] mb-1">
                <TypewriterStat value="67%" inView={heroInView} delay={800} />
              </div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">Konsumenten vertrauen KI mehr</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80 font-[family-name:var(--font-heading)] mb-1">4 Plattformen</div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">kontinuierlich überwacht</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80 font-[family-name:var(--font-heading)] mb-1">ab 490 €</div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">monatlich</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — KPI CARDS                                       */}
      {/* ============================================================ */}
      <section id="monitoring-kpis" className="py-24 bg-white">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / MONITORING-KPIS
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Die vier KPIs unseres GEO Monitorings
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            Messbare Kennzahlen aus unserem{" "}
            <Link href="/geo" className="text-[#C2722A] hover:underline font-medium">
              GEO als Leistungsbereich
            </Link>
            .
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Brand Mention Frequency",
                score: "30 %",
                desc: "Anteil der relevanten Prompts, auf die eine KI-Antwort Ihre Marke nennt.",
                example: "Beispiel: \"Ihre Marke wird in 6 von 20 Test-Prompts genannt = 30 % Mention Rate.\"",
              },
              {
                title: "Citation Quality Score",
                score: "0–100",
                desc: "Wird Ihre Marke als Hauptempfehlung, als Alternativ-Nennung oder als Randerwähnung zitiert?",
                example: "Beispiel: \"Hauptempfehlung = 10 Punkte; Randerwähnung = 2 Punkte.\"",
              },
              {
                title: "Sentiment Index",
                score: "80 %+",
                desc: "Ist der Kontext der Nennung positiv, neutral oder negativ? Manuelle Analyse der Antwort-Texte.",
                example: "Beispiel: \"Sentiment: 80 % positiv / 15 % neutral / 5 % negativ.\"",
              },
              {
                title: "Competitor Delta",
                score: "Delta",
                desc: "Wie verhält sich Ihre Mention Rate im Vergleich zu Ihren Top-3-Wettbewerbern auf denselben Prompts?",
                example: "Beispiel: \"Ihre Mention Rate: 30 %; Hauptwettbewerber: 55 % — Delta: -25 Pp.\"",
              },
            ].map((kpi, i) => (
              <div
                key={kpi.title}
                className="flex flex-col h-full border-b-2 border-[#C2722A] rounded-xl p-6 border border-[#E5E3DF] shadow-sm hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#C2722A]/8 hover:border-[#C2722A]/20 transition-all duration-300 cursor-default ease-out"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#C2722A] text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-[#D4A853]">{kpi.score}</span>
                </div>
                <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">{kpi.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-2">{kpi.desc}</p>
                <p className="text-xs text-[#6B6B6B]/70 italic mt-auto">{kpi.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* INTERACTIVE APP 1 — Citation Trend Chart (after Section 2)  */}
      {/* ============================================================ */}
      <CitationTrendChart />

      {/* ============================================================ */}
      {/* SECTION 3 — MONITORING SETUP                                */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / MONITORING-SETUP
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Wie unser GEO Monitoring technisch funktioniert
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            Kein Black-Box-Bericht — wir erklären, wie wir die Daten erheben.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                Grundlage unseres Monitorings ist ein strukturiertes Set von 20–50 Prompts, die gemeinsam mit dem
                Kunden beim Onboarding definiert werden. Alternativ empfehlen wir zuerst einen{" "}
                <Link href="/geo/audit" className="text-[#C2722A] hover:underline font-medium">
                  GEO Audit
                </Link>{" "}
                — er definiert die richtigen Prompts für Ihr Marktsegment.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "ChatGPT GPT-4o",
                  method: "API-Zugang für reproduzierbare Prompts, kein Browser-Zufall",
                  icon: "🤖",
                },
                {
                  name: "Google Gemini",
                  method: "Webinterface-Tests mit standardisierten Prompt-Templates",
                  icon: "✦",
                },
                {
                  name: "Perplexity",
                  method: "Web-Retrieval-Analyse — welche Quellen werden in den Antworten gelinkt?",
                  icon: "⊙",
                },
                {
                  name: "Claude Sonnet",
                  method: "Prompt-Tests mit Fokus auf Marken-Erkennungsrate",
                  icon: "◆",
                },
              ].map((platform) => (
                <div key={platform.name} className="flex items-start gap-4 bg-white border border-[#E5E3DF] rounded-xl p-4 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#C2722A]/8 hover:border-[#C2722A]/20 transition-all duration-300 cursor-default">
                  <div className="w-10 h-10 rounded-full bg-[#C2722A]/10 flex items-center justify-center text-lg shrink-0">
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] text-sm">{platform.name}</h3>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed mt-0.5">{platform.method}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — REPORTING                                       */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / MONATLICHES REPORTING
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Was Ihr monatlicher GEO Report enthält
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            Kein 40-seitiges PDF — ein klares Dashboard mit den Zahlen, die Sie für Entscheidungen brauchen.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Report mockup */}
            <div className="shadow-lg border border-[#E5E3DF] rounded-2xl p-6 bg-white">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#E5E3DF]">
                <h3 className="font-semibold text-[#1A1A1A]">GEO Report — April 2026</h3>
                <span className="text-xs text-[#6B6B6B] bg-[#F8F7F5] px-2.5 py-1 rounded-full">Monatlich</span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    label: "ChatGPT Mention Rate",
                    value: "28 %",
                    delta: "↑ +7 Pp. vs. Vormonat",
                    deltaColor: "text-green-600",
                  },
                  {
                    label: "Gemini Presence Score",
                    value: "42/100",
                    delta: "↑ +4 Punkte",
                    deltaColor: "text-green-600",
                  },
                  {
                    label: "Perplexity Citation Count",
                    value: "3",
                    delta: "↑ +2 Quellenlinks",
                    deltaColor: "text-green-600",
                  },
                  {
                    label: "Claude Mention Rate",
                    value: "15 %",
                    delta: "→ unverändert",
                    deltaColor: "text-[#6B6B6B]",
                  },
                  {
                    label: "Competitor Delta",
                    value: "-13 Pp.",
                    delta: "Ihr Score 28 % / Wettbewerber 41 %",
                    deltaColor: "text-red-500",
                  },
                  {
                    label: "Sentiment",
                    value: "76 %",
                    delta: "Positiv / 20 % Neutral / 4 % Negativ",
                    deltaColor: "text-[#6B6B6B]",
                  },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-[#E5E3DF]/60 last:border-0">
                    <span className="text-sm text-[#6B6B6B]">{row.label}</span>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-[#1A1A1A] mr-2">{row.value}</span>
                      <span className={`text-xs ${row.deltaColor}`}>{row.delta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contents list */}
            <div>
              <h3 className="font-semibold text-[#1A1A1A] text-lg mb-5">Der Report enthält:</h3>
              <ol className="space-y-4">
                {[
                  {
                    num: "1",
                    title: "Executive Summary (1 Seite)",
                    desc: "Gesamtentwicklung auf einen Blick",
                  },
                  {
                    num: "2",
                    title: "Plattform-Breakdown",
                    desc: "Detailauswertung pro KI-System",
                  },
                  {
                    num: "3",
                    title: "Wettbewerber-Vergleich",
                    desc: "Delta-Entwicklung über 3 Monate",
                  },
                  {
                    num: "4",
                    title: "Handlungsempfehlungen",
                    desc: "2–3 priorisierte Maßnahmen für den Folgemonat",
                  },
                  {
                    num: "5",
                    title: "Prompt-Library-Update",
                    desc: "Neue relevante Prompts, die wir identifiziert haben",
                  },
                ].map((item) => (
                  <li key={item.num} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#C2722A] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {item.num}
                    </div>
                    <div>
                      <span className="font-semibold text-[#1A1A1A] text-sm">{item.title}</span>
                      <p className="text-xs text-[#6B6B6B] mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* INTERACTIVE APP 2 — KPI Dashboard (after Section 4)         */}
      {/* ============================================================ */}
      <div id="dashboard">
        <KpiDashboard />
      </div>

      {/* Feature section: monitoring visual + context */}
      <section className="bg-[#1A1A1A] overflow-hidden">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 min-h-[380px]">
          <div className="relative min-h-[280px] lg:min-h-auto overflow-hidden">
            <Image
              src="/images/geo-monitoring-chart-v2.webp"
              alt="GEO Monitoring KPI Dashboard — Mention Rate und Competitor Delta"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1A1A]/60" />
          </div>
          <div className="px-8 py-10 lg:px-10 lg:py-12 flex flex-col justify-center text-white">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-4 block">/ KI-SICHTBARKEIT AUF EINEN BLICK</span>
            <h3 className="text-2xl lg:text-3xl font-[family-name:var(--font-heading)] mb-4 leading-tight">
              Ihr monatliches GEO Dashboard — alle KPIs, sofort interpretierbar
            </h3>
            <p className="text-white/70 leading-relaxed text-sm mb-6">
              Kein 40-seitiges PDF. Ein klares Dashboard, das zeigt, ob Sie vorankommen — oder ob Handlungsbedarf besteht.
            </p>
            <ul className="space-y-2.5">
              {["Mention Rate-Verlauf über 6 Monate", "Plattform-Breakdown pro KI-System", "Competitor Delta in Echtzeit"].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/70">
                  <svg className="w-4 h-4 text-[#C2722A] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — WARNZEICHEN & CHANCEN                          */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / KI-SICHTBARKEIT MESSEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Wann unser Monitoring Sie alarmiert — und wann es Chancen meldet
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            GEO Monitoring ist kein Schönwetter-Report. Wir zeigen Ihnen, wenn etwas schief läuft.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Warnzeichen */}
            <div
              className="border-l-4 border-red-400 bg-red-50/50 rounded-r-xl p-6"
            >
              <h3 className="font-semibold text-[#1A1A1A] text-lg mb-4 flex items-center gap-2">
                <span className="text-red-500">⚠</span> Warnzeichen
              </h3>
              <ul className="space-y-3">
                {[
                  "Mention Rate fällt um mehr als 20 % in einem Monat → sofortige Analyse-Eskalation",
                  "Sentiment-Shift: Negativer Anteil steigt auf über 15 % → Ursachenanalyse und Empfehlung",
                  "Wettbewerber überholt Sie auf einer Plattform um mehr als 30 Pp. → strategischer Alert",
                  "Neue Wettbewerber erscheinen in Ihrem Prompt-Set → Competitive Intelligence Update",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                    <span className="text-red-400 shrink-0 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chancen */}
            <div
              className="border-l-4 border-[#D4A853] bg-[#D4A853]/5 rounded-r-xl p-6"
            >
              <h3 className="font-semibold text-[#1A1A1A] text-lg mb-4 flex items-center gap-2">
                <span className="text-[#D4A853]">✦</span> Chancen
              </h3>
              <ul className="space-y-3">
                {[
                  "Plattform zeigt erhöhte Mention Rate ohne Maßnahme → Analyse welcher Content verantwortlich ist",
                  "Neues Themensegment taucht auf → Hinweis auf unbesetzte GEO-Lücke",
                  "Ein Content-Piece wird überdurchschnittlich häufig zitiert → Replikations-Empfehlung",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                    <span className="text-[#D4A853] shrink-0 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Warnzeichen führen direkt zu Maßnahmen in unserer{" "}
            <Link href="/geo/optimierung" className="text-[#C2722A] hover:underline font-medium">
              GEO Optimierung
            </Link>{" "}
            oder{" "}
            <Link href="/geo/content-strategie" className="text-[#C2722A] hover:underline font-medium">
              GEO Content Strategie
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — FAQ                                             */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="reveal max-w-3xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / HÄUFIGE FRAGEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-10">
            Häufige Fragen zum GEO Monitoring
          </h2>

          <div className="border-t border-[#E5E3DF]">
            <FaqItem
              q="Kann man KI-Antworten überhaupt zuverlässig monitoren — die Antworten sind doch jedes Mal anders?"
              a="Das ist richtig. KI-Systeme sind stochastisch — dieselbe Frage liefert nicht immer dieselbe Antwort. Deshalb verwenden wir standardisierte Prompt-Sets und führen jeden Prompt mehrfach aus. Aus der Häufigkeitsverteilung ergibt sich eine statistisch belastbare Mention Rate, die Trends zuverlässig sichtbar macht."
            />
            <FaqItem
              q="Unterscheidet sich GEO Monitoring von klassischem Brand-Monitoring (z.B. Google Alerts, Mention)?"
              a="Ja, grundlegend. Klassisches Brand-Monitoring trackt, wo im Web Ihr Markenname erscheint. GEO Monitoring trackt, ob KI-Systeme Ihre Marke in generierten Antworten auf relevante Anfragen nennen — ein vollständig anderer Kanal, der von klassischen Tools nicht erfasst wird."
            />
            <FaqItem
              q="Wie häufig wird gemonitort und wie erhalte ich die Ergebnisse?"
              a="Standard ist monatliches Monitoring mit einem Report bis zum 5. des Folgemonats. Optional bieten wir quartalsweise Tiefenanalysen an. Der Report kommt als PDF und als interaktives Dashboard (Notion oder Google Looker Studio)."
            />
            <FaqItem
              q="Was kostet das GEO Monitoring pro Monat?"
              a="Abhängig von der Anzahl der Ziel-Plattformen, dem Prompt-Set-Umfang und der Anzahl der Wettbewerber im Benchmark. Einstiegspaket ab 490 €/Monat (2 Plattformen, 20 Prompts, 2 Wettbewerber). Vollpaket auf Anfrage."
            />
            <FaqItem
              q="Kann ich das GEO Monitoring auch ohne vorherigen Audit oder vorherige Optimierung starten?"
              a="Ja. Monitoring macht zu jedem Zeitpunkt Sinn — auch als Baseline vor dem Start jeder GEO-Maßnahme. Viele Kunden starten mit Monitoring, um den Status quo zu dokumentieren, und entscheiden dann auf Basis der ersten Daten, welche Maßnahmen Priorität haben."
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — CTA                                             */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C2722A]/10 rounded-full blur-3xl -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4A853]/10 rounded-full blur-3xl -ml-40 -mb-40" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / GEO MONITORING STARTEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] mb-6">
            Behalten Sie die Kontrolle
            <br />
            <span>über Ihre KI-Sichtbarkeit</span>
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Monatliches GEO Monitoring — inklusive Wettbewerber-Benchmark, Sentiment-Analyse und priorisierten
            Handlungsempfehlungen.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["Report bis 5. des Monats", "Wettbewerber-Benchmark inklusive", "Kündbar monatlich"].map((b) => (
              <span key={b} className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                {b}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontakt"
              className="px-8 py-4 bg-[#C2722A] text-white rounded-full font-semibold hover:bg-[#A85E22] transition-all"
            >
              GEO Monitoring anfragen
            </Link>
            <Link
              href="/geo/audit"
              className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              Erst einen Audit starten
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  )
}
