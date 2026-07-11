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

function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(target * eased)
      setCount(start)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, target, duration])
  return count
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

// ============================================================
// INTERACTIVE APP 1: Platform Citation Chart
// ============================================================
function PlatformCitationChart() {
  const [ref, inView] = useInView<HTMLDivElement>()
  const platforms = [
    { name: "ChatGPT GPT-4o", without: 12, with: 45 },
    { name: "Google Gemini", without: 8, with: 38 },
    { name: "Perplexity AI", without: 5, with: 29 },
    { name: "Claude Sonnet", without: 3, with: 22 },
  ]
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-primary mb-6 block">/ PLATTFORM-COVERAGE</span>
          <h2 className="text-3xl font-[family-name:var(--font-heading)] text-dark">Citation Rate vor und nach GEO Audit</h2>
          <p className="text-muted mt-2 text-sm">Durchschnittliche Werte aus SeoForge-Kundenprojekten 2024–2025</p>
        </div>

        <div ref={ref} className="space-y-6 bg-offwhite rounded-2xl p-8 border border-border">
          <div className="flex items-center gap-4 text-xs text-muted mb-2">
            <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-border"/> Ohne GEO</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-primary"/> Mit GEO</span>
          </div>

          {platforms.map((p, i) => (
            <div key={p.name} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-dark">{p.name}</span>
                <span className="text-primary font-semibold">+{p.with - p.without} Pp.</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-muted text-right">{p.without}%</span>
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-stone-300 rounded-full transition-all duration-700"
                      style={{ width: inView ? `${p.without}%` : '0%', transitionDelay: `${i*100}ms` }}/>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-primary text-right font-semibold">{p.with}%</span>
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                      style={{ width: inView ? `${p.with}%` : '0%', transitionDelay: `${i*100+200}ms` }}/>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <p className="text-xs text-muted mt-4 pt-4 border-t border-border">Quelle: SeoForge Kundendaten 2024–2025 · n=47 Projekte</p>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// INTERACTIVE APP 2: GEO Score Simulator
// ============================================================
function GeoScoreSimulator() {
  const industries = ["Recht & Kanzleien", "Medizin & Gesundheit", "B2B Software", "Immobilien", "E-Commerce", "Finanzen & Versicherung"]
  const [industry, setIndustry] = useState(0)
  const [quality, setQuality] = useState(3)
  const [calculated, setCalculated] = useState(false)

  const baseScore = [42, 55, 61, 48, 52, 58][industry]
  const qualityBonus = (quality - 1) * 8
  const totalScore = Math.min(baseScore + qualityBonus, 95)
  const citationRate = Math.round(totalScore * 0.45)
  const brandAuthority = Math.round(totalScore * 0.35)
  const contentScore = Math.round(totalScore * 0.20)

  return (
    <section className="py-20 bg-offwhite">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-primary mb-6 block">/ GEO SCORE SIMULATOR</span>
          <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-dark">Schätzen Sie Ihr GEO-Potenzial</h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">Wählen Sie Ihre Branche und die aktuelle Content-Qualität — erhalten Sie eine erste Einschätzung.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Inputs */}
          <div className="bg-white rounded-2xl border border-border p-8 flex flex-col gap-8">
            <div>
              <label className="block text-sm font-semibold text-dark mb-3">Ihre Branche</label>
              <div className="grid grid-cols-2 gap-2">
                {industries.map((ind, i) => (
                  <button
                    key={i}
                    onClick={() => { setIndustry(i); setCalculated(false) }}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-all text-left ${
                      industry === i ? 'bg-primary text-white border-primary' : 'border-border text-dark hover:border-primary/50'
                    }`}
                  >{ind}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Content-Qualität: <span className="text-primary">{["Grundlegend", "Vorhanden", "Gut", "Sehr gut", "Exzellent"][quality-1]}</span>
              </label>
              <input
                type="range" min={1} max={5} value={quality}
                onChange={e => { setQuality(Number(e.target.value)); setCalculated(false) }}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>Kaum Content</span><span>Exzellent strukturiert</span>
              </div>
            </div>

            <button
              onClick={() => setCalculated(true)}
              className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-[#A85E22] transition-all"
            >Score berechnen →</button>
          </div>

          {/* Right: Score display */}
          <div className={`bg-white rounded-2xl border-2 p-8 flex flex-col gap-6 transition-all duration-500 ${
            calculated ? 'border-primary shadow-lg shadow-primary/10' : 'border-border opacity-60'
          }`}>
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E3DF" strokeWidth="8"/>
                  <circle
                    cx="50" cy="50" r="40" fill="none" stroke="#C2722A" strokeWidth="8"
                    strokeDasharray={`${calculated ? totalScore * 2.51 : 0} 251`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 1.2s ease-out' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-dark">{calculated ? totalScore : '--'}</span>
                  <span className="text-xs text-muted">/ 100</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Citation Rate Potential", value: calculated ? citationRate : 0, max: 45 },
                { label: "Brand Authority Score", value: calculated ? brandAuthority : 0, max: 35 },
                { label: "Content Citability", value: calculated ? contentScore : 0, max: 20 },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted">{s.label}</span>
                    <span className="font-semibold text-dark">{s.value}/{s.max}</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                      style={{ width: calculated ? `${(s.value/s.max)*100}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {calculated && (
              <p className="text-xs text-muted text-center pt-2 border-t border-border">
                {totalScore < 50 ? "Ein GEO Audit deckt erhebliche Optimierungspotenziale auf." :
                 totalScore < 75 ? "Solide Basis — gezielte GEO-Maßnahmen können Ihre Sichtbarkeit verdoppeln." :
                 "Starke Ausgangslage — fokussiertes GEO Monitoring sichert Ihre Position."}
              </p>
            )}
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
      name: "GEO Audit",
      provider: { "@type": "Organization", name: "SeoForge" },
      serviceType: "Generative Engine Optimization Audit",
      areaServed: "Deutschland, Österreich, Schweiz",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Was genau ist ein GEO Audit und was unterscheidet ihn von einem klassischen SEO-Audit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ein SEO-Audit analysiert, wie Ihre Seite auf Google rankt. Ein GEO Audit analysiert, ob und wie KI-Systeme wie ChatGPT, Gemini oder Perplexity Ihre Marke in generierten Antworten nennen. Die Methodik ist grundlegend anders: statt Crawler-Daten verwenden wir strukturierte Prompt-Tests und Antwort-Analyse.",
          },
        },
        {
          "@type": "Question",
          name: "Für welche Unternehmen lohnt sich ein GEO Audit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Für jedes Unternehmen, das in einem informationsintensiven Markt aktiv ist: B2B-Dienstleister, E-Commerce mit beratungsintensiven Produkten, Kanzleien, Agenturen, SaaS-Anbieter. Besonders lohnenswert, wenn Ihre Kunden mit Recherchefragen zu KI-Systemen tendieren.",
          },
        },
        {
          "@type": "Question",
          name: "Wie lange dauert ein GEO Audit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Von Briefing bis Reportlieferung vergehen in der Regel 8–10 Werktage. Für Unternehmen mit sehr breitem Produktportfolio kann der Scope auf Anfrage erweitert werden.",
          },
        },
        {
          "@type": "Question",
          name: "Werden die Ergebnisse des Audits vertraulich behandelt?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja. Alle Wettbewerber-Analysen, Keyword-Daten und Unternehmensinformationen werden vertraulich behandelt und nicht an Dritte weitergegeben. Wir unterzeichnen auf Wunsch eine NDA vor Projektbeginn.",
          },
        },
        {
          "@type": "Question",
          name: "Was passiert nach dem Audit — bieten Sie auch die Umsetzung an?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja. Der Aktionsplan im Report ist direkt umsetzbar. Wir können die Maßnahmen in unserer GEO Optimierung oder GEO Content Strategie für Sie umsetzen. Es gibt keine Pflicht zur Fortführung.",
          },
        },
      ],
    },
  ],
}

export default function AuditPageClient() {
  const [heroRef, heroInView] = useInView<HTMLDivElement>()
  const [statsRef, statsInView] = useInView<HTMLDivElement>()

  const stat80 = useCountUp(80, statsInView)
  const stat40 = useCountUp(40, statsInView)
  const stat13 = useCountUp(13, statsInView)

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
          src="/images/geo-audit-visual-v2.webp"
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
            <defs><pattern id="hero-dots-audit" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#ffffff" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#hero-dots-audit)" />
          </svg>
        </div>

        {/* Centered content */}
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center py-32">
          {/* Eyebrow label */}
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-8 block animate-[fadeUp_0.5s_ease_forwards]">/ GEO AUDIT</span>

          {/* H1 — line-by-line reveal, white text */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-[family-name:var(--font-heading)] text-white mb-8 leading-[1.05]">
            <span className="block overflow-hidden pb-1">
              <span className="block animate-[lineReveal_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                Wo steht Ihre
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="block animate-[lineReveal_0.7s_cubic-bezier(0.16,1,0.3,1)_0.12s_forwards]">
                <span className="text-[#C2722A]">Marke</span> in KI-Antworten?
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-[fadeUp_0.6s_ease_0.3s_forwards]">
            Unser GEO Audit analysiert, ob ChatGPT, Gemini, Perplexity und Claude Ihre Marke kennen, nennen und empfehlen.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mb-14 animate-[fadeUp_0.6s_ease_0.45s_forwards]">
            <Link href="/kontakt" className="px-8 py-4 bg-[#C2722A] text-white rounded-xl font-semibold hover:bg-[#A85E22] transition-all shadow-lg shadow-[#C2722A]/30">
              GEO Audit anfragen
            </Link>
            <a href="#audit-umfang" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
              Zum Audit-Umfang ↓
            </a>
          </div>

          {/* Inline stat — compact, no big card */}
          <div className="flex justify-center gap-10 border-t border-white/10 pt-10 animate-[fadeUp_0.6s_ease_0.6s_forwards]">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C2722A] font-[family-name:var(--font-heading)] mb-1">
                <TypewriterStat value="80%" inView={heroInView} delay={800} />
              </div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">der Nutzer recherchieren mit KI</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80 font-[family-name:var(--font-heading)] mb-1">10 Tage</div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">Lieferzeit Audit-Report</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80 font-[family-name:var(--font-heading)] mb-1">4</div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">KI-Plattformen analysiert</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — WAS EIN GEO AUDIT UMFASST                       */}
      {/* ============================================================ */}
      <section id="audit-umfang" className="py-24 bg-white">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / AUDIT-UMFANG
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Was ein GEO Audit von SeoForge umfasst
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-4 max-w-2xl">
            Vier Analyse-Dimensionen, die gemeinsam ein vollständiges Bild Ihrer KI-Sichtbarkeit ergeben.
            Erfahren Sie mehr über{" "}
            <Link href="/geo" className="text-[#C2722A] hover:underline font-medium">
              Generative Engine Optimization im Überblick
            </Link>
            .
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {[
              {
                title: "ChatGPT Presence",
                desc: "Wie häufig und in welchem Kontext nennt ChatGPT (GPT-4o) Ihre Marke bei relevanten Anfragen in Ihrem Marktsegment? Analyse über 30+ branchentypische Prompts.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12zm0-9a1 1 0 00-1 1v3a1 1 0 001 1h2a1 1 0 000-2h-1V8a1 1 0 00-1-1z" />
                  </svg>
                ),
              },
              {
                title: "Gemini & Perplexity Coverage",
                desc: "Google Gemini und Perplexity nutzen Web-Retrieval in Echtzeit. Wir prüfen, ob Ihre Inhalte als Quellen erscheinen und ob Ihre Marke in generierten Antworten zitiert wird.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                ),
              },
              {
                title: "Entity & Structured Data Check",
                desc: "KI-Systeme bevorzugen Inhalte mit klarer Entity-Struktur (Wikidata-Einträge, Schema.org-Markup, eindeutige Markennamen). Wir prüfen Ihre technische GEO-Basis.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ),
              },
              {
                title: "Wettbewerber-Benchmark",
                desc: "Ihre KI-Sichtbarkeit im direkten Vergleich: Wie oft werden Ihre Top-3-Wettbewerber in denselben Anfragen genannt? Was machen sie anders?",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="flex flex-col h-full p-6 rounded-xl border border-border hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#C2722A]/8 hover:border-[#C2722A]/20 transition-all duration-300 cursor-default ease-out"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-[#C2722A] flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM CITATION CHART — after Section 2 */}
      <PlatformCitationChart />

      {/* ============================================================ */}
      {/* SECTION 3 — STATS / WARUM JETZT                             */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F7F5]">
        <div
          ref={statsRef}
          className="max-w-5xl mx-auto px-6 lg:px-8"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / KI-SICHTBARKEIT ANALYSE
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            KI ersetzt Suchergebnisse – und die meisten Marken fehlen
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-12 max-w-2xl">
            <Link href="/was-ist-geo" className="text-[#C2722A] hover:underline font-medium">
              Was ist GEO?
            </Link>{" "}
            Die neue Disziplin, die entscheidet, ob Sie in der KI-Ära gefunden werden.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E3DF] bg-white rounded-2xl border border-[#E5E3DF] overflow-hidden">
            <div className="p-8">
              <div className="font-mono text-6xl lg:text-7xl font-bold text-[#C2722A] mb-3">
                {stat40} %
              </div>
              <p className="text-sm text-[#1A1A1A] leading-relaxed mb-2">
                Antworten auf Perplexity enthalten laut einer Studie der Princeton und Columbia University (2023)
                mindestens eine externe Quellennennung — die Frage ist, ob Ihre Marke dabei ist.
              </p>
              <span className="text-xs text-[#6B6B6B]">Princeton &amp; Columbia University, 2023</span>
            </div>
            <div className="p-8">
              <div className="font-mono text-6xl lg:text-7xl font-bold text-[#C2722A] mb-3">
                1 Mrd.
              </div>
              <p className="text-sm text-[#1A1A1A] leading-relaxed mb-2">
                Anfragen täglich verarbeitet ChatGPT laut OpenAI (Stand: 2024) — ohne klassisches Ranking, ohne
                klickbare Suchergebnisse.
              </p>
              <span className="text-xs text-[#6B6B6B]">OpenAI, 2024</span>
            </div>
            <div className="p-8">
              <div className="font-mono text-6xl lg:text-7xl font-bold text-[#C2722A] mb-3">
                {stat13} %
              </div>
              <p className="text-sm text-[#1A1A1A] leading-relaxed mb-2">
                der Google-Suchanfragen geben bereits KI-Overviews als Hauptantwort aus (SparkToro / Datos, 2024) —
                Tendenz steigend.
              </p>
              <span className="text-xs text-[#6B6B6B]">SparkToro / Datos, 2024</span>
            </div>
          </div>

          {/* Feature split: platforms visual + context callout */}
          <div className="mt-14 rounded-2xl overflow-hidden bg-[#1A1A1A] grid lg:grid-cols-2 min-h-[320px]">
            <div className="relative min-h-[260px] lg:min-h-auto">
              <Image
                src="/images/geo-audit-platforms-v2.webp"
                alt="KI-Plattform Sichtbarkeitsvergleich — ohne vs. mit GEO"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1A1A]/60" />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center text-white">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-4 block">/ WARUM ES ZÄHLT</span>
              <h3 className="text-2xl lg:text-3xl font-[family-name:var(--font-heading)] mb-4 leading-tight">
                Ohne GEO Audit erscheint Ihre Marke nicht in KI-Antworten
              </h3>
              <p className="text-white/70 leading-relaxed text-sm mb-6">
                ChatGPT, Gemini und Perplexity nennen täglich Marken — die, die sie kennen, und die, deren Inhalte klar genug strukturiert sind, um verstanden zu werden.
              </p>
              <Link href="/kontakt" className="inline-flex items-center gap-2 text-[#C2722A] font-semibold text-sm group hover:gap-3 transition-all">
                GEO Audit anfragen <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GEO SCORE SIMULATOR — after Section 3 (Stats), before Section 4 (Process) */}
      <GeoScoreSimulator />

      {/* ============================================================ */}
      {/* SECTION 4 — AUDIT-PROZESS                                   */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / AUDIT-PROZESS
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-12">
            In 4 Schritten zu Ihrem GEO Audit
          </h2>

          {/* Desktop horizontal timeline */}
          <div className="hidden lg:flex items-start gap-0">
            {[
              {
                num: "01",
                title: "Briefing (Tag 1–2)",
                desc: "Sie teilen uns Ihre wichtigsten Keywords, Wettbewerber und Zielgruppe mit. Wir definieren gemeinsam den Analyse-Scope: welche Branchen-Prompts, welche KI-Plattformen.",
              },
              {
                num: "02",
                title: "Datenerhebung (Tag 3–7)",
                desc: "Unser Team stellt über 60 strukturierte Anfragen an ChatGPT, Gemini, Perplexity und Claude. Alle Antworten werden dokumentiert, gecrawlt und ausgewertet.",
              },
              {
                num: "03",
                title: "Technische Analyse (Tag 5–8)",
                desc: "Parallel analysieren wir Ihre technische GEO-Basis: Schema.org-Markup, E-E-A-T-Signale, Entity-Präsenz in Wikidata und Knowledge Graphs.",
              },
              {
                num: "04",
                title: "Report & Präsentation (Tag 9–10)",
                desc: "Sie erhalten den vollständigen GEO Audit Report plus einen priorisierten Aktionsplan. Auf Wunsch präsentieren wir die Ergebnisse in einem 60-minütigen Call.",
              },
            ].map((step, i, arr) => (
              <div
                key={step.num}
                className="flex-1 relative"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#C2722A] text-white flex items-center justify-center font-bold text-sm shrink-0 z-10 relative">
                    {step.num}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex-1 h-0.5 bg-[#E5E3DF] mx-2" />
                  )}
                </div>
                <div className="pr-4">
                  <h3 className="font-semibold text-[#1A1A1A] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden space-y-6">
            {[
              {
                num: "01",
                title: "Briefing (Tag 1–2)",
                desc: "Sie teilen uns Ihre wichtigsten Keywords, Wettbewerber und Zielgruppe mit. Wir definieren gemeinsam den Analyse-Scope: welche Branchen-Prompts, welche KI-Plattformen.",
              },
              {
                num: "02",
                title: "Datenerhebung (Tag 3–7)",
                desc: "Unser Team stellt über 60 strukturierte Anfragen an ChatGPT, Gemini, Perplexity und Claude. Alle Antworten werden dokumentiert, gecrawlt und ausgewertet.",
              },
              {
                num: "03",
                title: "Technische Analyse (Tag 5–8)",
                desc: "Parallel analysieren wir Ihre technische GEO-Basis: Schema.org-Markup, E-E-A-T-Signale, Entity-Präsenz in Wikidata und Knowledge Graphs.",
              },
              {
                num: "04",
                title: "Report & Präsentation (Tag 9–10)",
                desc: "Sie erhalten den vollständigen GEO Audit Report plus einen priorisierten Aktionsplan. Auf Wunsch präsentieren wir die Ergebnisse in einem 60-minütigen Call.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C2722A] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">{step.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — DELIVERABLES                                    */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / AUDIT-DELIVERABLES
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Was Sie nach dem GEO Audit in Händen halten
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            Kein vages Dokument — konkrete Zahlen, klarer Benchmark, priorisierter Aktionsplan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                name: "GEO Visibility Score",
                desc: "Ihre Marke als Zahl — Nennungsrate über alle Plattformen, nach Kategorie aufgeschlüsselt.",
              },
              {
                name: "Plattform-Detailbericht",
                desc: "Pro KI-System (ChatGPT, Gemini, Perplexity, Claude) eine eigene Auswertung mit Antwort-Screenshots.",
              },
              {
                name: "Wettbewerber-Benchmark-Tabelle",
                desc: "Ihre Top-3-Wettbewerber im Direktvergleich — dieselben Prompts, dieselbe Methodik.",
              },
              {
                name: "Technisches GEO-Audit",
                desc: "Bewertung Ihrer Schema-Abdeckung, E-E-A-T-Signale und Entity-Struktur auf einer 20-Punkte-Checkliste.",
              },
              {
                name: "Priorisierter Aktionsplan",
                desc: "Maßnahmen nach Impact und Aufwand sortiert — was Sie als erstes angehen sollten, um schnell KI-Sichtbarkeit aufzubauen.",
              },
            ].map((item) => (
              <div key={item.name} className="flex gap-3">
                <svg
                  className="w-5 h-5 text-[#D4A853] shrink-0 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <span className="font-semibold text-[#1A1A1A]">{item.name}</span>
                  <p className="text-sm text-[#6B6B6B] mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Auf Basis des Audits empfehlen wir entweder unsere{" "}
            <Link href="/geo/beratung" className="text-[#C2722A] hover:underline font-medium">
              GEO Beratung
            </Link>{" "}
            oder direkt ein{" "}
            <Link href="/geo/monitoring" className="text-[#C2722A] hover:underline font-medium">
              laufendes GEO Monitoring
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — FAQ                                             */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="reveal max-w-3xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / HÄUFIGE FRAGEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-10">
            Häufige Fragen zum GEO Audit
          </h2>

          <div className="border-t border-[#E5E3DF]">
            <FaqItem
              q="Was genau ist ein GEO Audit und was unterscheidet ihn von einem klassischen SEO-Audit?"
              a="Ein SEO-Audit analysiert, wie Ihre Seite auf Google rankt. Ein GEO Audit analysiert, ob und wie KI-Systeme wie ChatGPT, Gemini oder Perplexity Ihre Marke in generierten Antworten nennen. Die Methodik ist grundlegend anders: statt Crawler-Daten verwenden wir strukturierte Prompt-Tests und Antwort-Analyse."
            />
            <FaqItem
              q="Für welche Unternehmen lohnt sich ein GEO Audit?"
              a="Für jedes Unternehmen, das in einem informationsintensiven Markt aktiv ist: B2B-Dienstleister, E-Commerce mit beratungsintensiven Produkten, Kanzleien, Agenturen, SaaS-Anbieter. Besonders lohnenswert, wenn Ihre Kunden mit Recherchefragen zu KI-Systemen tendieren."
            />
            <FaqItem
              q="Wie lange dauert ein GEO Audit?"
              a="Von Briefing bis Reportlieferung vergehen in der Regel 8–10 Werktage. Für Unternehmen mit sehr breitem Produktportfolio kann der Scope auf Anfrage erweitert werden."
            />
            <FaqItem
              q="Werden die Ergebnisse des Audits vertraulich behandelt?"
              a="Ja. Alle Wettbewerber-Analysen, Keyword-Daten und Unternehmensinformationen werden vertraulich behandelt und nicht an Dritte weitergegeben. Wir unterzeichnen auf Wunsch eine NDA vor Projektbeginn."
            />
            <FaqItem
              q="Was passiert nach dem Audit — bieten Sie auch die Umsetzung an?"
              a="Ja. Der Aktionsplan im Report ist direkt umsetzbar. Wir können die Maßnahmen in unserer GEO Optimierung oder GEO Content Strategie für Sie umsetzen. Es gibt keine Pflicht zur Fortführung."
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
            / GEO AUDIT ANFRAGEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] mb-6">
            Finden Sie heraus, wo
            <br />
            <span>Ihre Marke in der KI steht</span>
          </h2>
          <p className="text-xl text-white/70 mb-8">
            GEO Audit in 10 Werktagen — inklusive Wettbewerber-Benchmark und priorisiertem Aktionsplan.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["Lieferung in 10 Werktagen", "Wettbewerber-Benchmark inklusive", "NDA auf Anfrage"].map((b) => (
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
              GEO Audit anfragen
            </Link>
            <Link
              href="/was-ist-geo"
              className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              Was ist GEO?
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  )
}
