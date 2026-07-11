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

// ============================================================
// INTERACTIVE APP 1: Strategy Roadmap Builder
// ============================================================
function RoadmapBuilder() {
  const goals = ["Mehr Erwähnungen in ChatGPT", "Brand Citations aufbauen", "Wettbewerber überholen", "E-E-A-T signale stärken"]
  const durations = ["3 Monate", "6 Monate", "12 Monate"]
  const [goal, setGoal] = useState<number|null>(null)
  const [duration, setDuration] = useState<number|null>(null)
  const [shown, setShown] = useState(false)

  const roadmaps: Record<string, {phase: string; tasks: string[]}[]> = {
    "0-0": [{phase:"Monat 1",tasks:["GEO Audit (Baseline)","Prompt-Set definieren","Quick Wins identifizieren"]},{phase:"Monat 2–3",tasks:["Schema.org implementieren","FAQ-Content erstellen","Erste KPI-Messung"]}],
    "0-1": [{phase:"Monat 1",tasks:["GEO Audit","Wettbewerber-Benchmark"]},{phase:"Monat 2–3",tasks:["Schema.org + Entity","Content-Briefings"]},{phase:"Monat 4–6",tasks:["Citation Bait erstellen","Monitoring starten"]}],
    "0-2": [{phase:"Q1",tasks:["GEO Audit","Strategie-Workshop","Technische Basis"]},{phase:"Q2",tasks:["Content-Produktion","Authority Aufbau"]},{phase:"Q3",tasks:["Monitoring + Iteration","Team-Schulung"]},{phase:"Q4",tasks:["Scale & Expand","Quartals-Review"]}],
    "1-0": [{phase:"Monat 1",tasks:["Citation-Analyse","Autorenseiten erstellen","Fachmedien identifizieren"]},{phase:"Monat 2–3",tasks:["Guest Content","Digital PR","First Citations messen"]}],
    "1-1": [{phase:"Monat 1–2",tasks:["Citation Gap Analyse","E-E-A-T Audit"]},{phase:"Monat 3–4",tasks:["Authority Content","Fachmedien Outreach"]},{phase:"Monat 5–6",tasks:["Backlink-basierte Citations","Reporting"]}],
    "default": [{phase:"Phase 1",tasks:["GEO Audit & Analyse","Strategie definieren"]},{phase:"Phase 2",tasks:["Umsetzung priorisierter Maßnahmen"]},{phase:"Phase 3",tasks:["Monitoring & Iteration"]}],
  }

  const key = goal !== null && duration !== null ? `${goal}-${duration}` : null
  const roadmap = key ? (roadmaps[key] || roadmaps["default"]) : null

  return (
    <section className="py-20 bg-offwhite">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-primary mb-6 block">/ ROADMAP BUILDER</span>
          <h2 className="text-3xl font-[family-name:var(--font-heading)] text-dark">Ihre persönliche GEO-Roadmap</h2>
          <p className="text-muted mt-2">Wählen Sie Ihr primäres Ziel und den gewünschten Zeitraum.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-6 flex flex-col">
            <div className="bg-white rounded-2xl border border-border p-6">
              <p className="text-sm font-semibold text-dark mb-4">1. Ihr primäres Ziel</p>
              <div className="space-y-2">
                {goals.map((g, i) => (
                  <button key={i} onClick={() => { setGoal(i); setShown(false) }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all ${
                      goal === i ? 'bg-primary text-white border-primary' : 'border-border hover:border-primary/40'
                    }`}>{g}</button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
              <p className="text-sm font-semibold text-dark mb-4">2. Zeitraum</p>
              <div className="grid grid-cols-3 gap-2">
                {durations.map((d, i) => (
                  <button key={i} onClick={() => { setDuration(i); setShown(false) }}
                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                      duration === i ? 'bg-primary text-white border-primary' : 'border-border hover:border-primary/40'
                    }`}>{d}</button>
                ))}
              </div>
            </div>

            <button disabled={goal===null||duration===null}
              onClick={() => setShown(true)}
              className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold disabled:opacity-40 hover:bg-[#A85E22] transition-all">
              Meine Roadmap erstellen →
            </button>
          </div>

          <div className="h-full">
            {shown && roadmap ? (
              <div className="bg-white rounded-2xl border-2 border-primary p-6 space-y-4 shadow-lg shadow-primary/10 animate-[fadeUp_0.4s_ease-out]">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Ihre Roadmap</p>
                {roadmap.map((phase, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{i+1}</div>
                      {i < roadmap.length-1 && <div className="w-px flex-1 bg-border mt-1"/>}
                    </div>
                    <div className="pb-4">
                      <p className="font-semibold text-dark text-sm mb-2">{phase.phase}</p>
                      <ul className="space-y-1">
                        {phase.tasks.map((t,j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-muted">
                            <svg className="w-3.5 h-3.5 text-secondary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/></svg>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full min-h-[420px] rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 text-muted text-sm">
                <svg className="w-10 h-10 text-border" viewBox="0 0 40 40" fill="none">
                  <rect x="4" y="8" width="32" height="6" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="4" y="19" width="20" height="6" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="4" y="30" width="26" height="6" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span>Wählen Sie Ziel und Zeitraum</span>
                <span className="text-xs text-border">um Ihre persönliche Roadmap zu generieren</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// INTERACTIVE APP 2: Beratungsformat Selector
// ============================================================
function BeratungsformatSelector() {
  const [selected, setSelected] = useState<number|null>(null)
  const formats = [
    {
      need: "Ich will erst verstehen, was GEO für mich bedeutet",
      format: "Strategie-Erstgespräch (60 Min.)",
      price: "Kostenlos",
      includes: ["Kurzanalyse Ihrer KI-Sichtbarkeit", "Einschätzung Ihres GEO-Potenzials", "Empfehlung nächster Schritte"],
      badge: "Einstieg"
    },
    {
      need: "Ich habe eine SEO-Basis und will eine klare GEO-Strategie",
      format: "GEO Strategie-Workshop (2–4 Std.)",
      price: "Ab 1.200 €",
      includes: ["Vollständige Bestandsaufnahme", "2-stündiger Strategieworkshop", "Maßnahmenplan + KPI-Framework", "Follow-up Call nach 4 Wochen"],
      badge: "Empfohlen"
    },
    {
      need: "Ich will mein Team für GEO befähigen",
      format: "GEO Team-Workshop (Halbtag)",
      price: "Auf Anfrage",
      includes: ["Grundlagen GEO für Ihr Team", "Praxis-Übungen mit Ihren Inhalten", "GEO-Playbook zum Mitnehmen", "Q&A Session"],
      badge: "Teams"
    },
  ]
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-primary mb-6 block">/ BERATUNGSFORMAT FINDER</span>
          <h2 className="text-3xl font-[family-name:var(--font-heading)] text-dark">Welches Format passt zu Ihnen?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 auto-rows-fr">
          {formats.map((f, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              className={`text-left flex flex-col h-full rounded-2xl border-2 p-6 transition-all duration-300 ${
                selected === i ? 'border-primary bg-primary/[0.03] shadow-lg shadow-primary/10' : 'border-border hover:border-primary/40'
              }`}>
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  selected === i ? 'bg-primary text-white' : 'bg-offwhite text-muted'
                }`}>{f.badge}</span>
                <span className="text-sm font-semibold text-primary">{f.price}</span>
              </div>
              <p className="text-xs text-muted mb-3 italic">&ldquo;{f.need}&rdquo;</p>
              <p className="font-semibold text-dark text-sm mb-4">{f.format}</p>
              <div className={`flex-1 overflow-hidden transition-all duration-300 ${selected === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="space-y-2 pt-2 border-t border-border">
                  {f.includes.map((inc, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted">
                      <svg className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/></svg>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`text-xs font-medium mt-3 ${selected === i ? 'text-primary' : 'text-muted'}`}>
                {selected === i ? 'Ausgewählt — ' : 'Klicken für Details · '}
                <Link href="/kontakt" className="underline" onClick={e => e.stopPropagation()}>Anfragen</Link>
              </div>
            </button>
          ))}
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
      name: "GEO Beratung",
      provider: { "@type": "Organization", name: "SeoForge" },
      serviceType: "Generative Engine Optimization Beratung",
      areaServed: "Deutschland, Österreich, Schweiz",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Was ist der Unterschied zwischen GEO Beratung und einem GEO Audit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Der GEO Audit ist die Diagnose: Er zeigt Ihren aktuellen Status und Ihre Lücken. Die GEO Beratung ist die Therapie: Sie entwickelt auf Basis der Diagnose (oder einer eigenen Kurzanalyse) eine Strategie und einen konkreten Maßnahmenplan. Viele Kunden buchen erst einen Audit, dann eine Beratung.",
          },
        },
        {
          "@type": "Question",
          name: "Kann ich eine GEO Beratung auch ohne vorherigen Audit buchen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja. Wenn Sie bereits ein klares Bild Ihrer KI-Sichtbarkeit haben oder einfach strategisch starten wollen, ist eine Beratung ohne vorherigen Audit möglich. Wir integrieren dann eine Kurzanalyse in den ersten Beratungsschritt.",
          },
        },
        {
          "@type": "Question",
          name: "Wie lange dauert eine GEO Beratung und was kostet sie?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Der Prozess dauert in der Regel 2–3 Wochen von Briefing bis Maßnahmenplan. Preise variieren je nach Scope und Unternehmensgröße — wir erstellen gerne ein individuelles Angebot nach einem kostenlosen Erstgespräch.",
          },
        },
        {
          "@type": "Question",
          name: "Setzen Sie die Maßnahmen aus der Beratung auch um?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Das hängt von Ihrem Wunsch ab. Wir übergeben einen vollständig umsetzbaren Maßnahmenplan, den Sie intern oder mit uns realisieren können. Es gibt keine Pflicht zur Fortführung.",
          },
        },
        {
          "@type": "Question",
          name: "Welche Vorkenntnisse brauche ich für eine GEO Beratung?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Keine. Wir setzen kein Vorwissen zu GEO voraus. Ideal ist ein grundlegendes Verständnis von Content-Marketing und SEO — aber wir erklären alles, was für Ihre Situation relevant ist.",
          },
        },
      ],
    },
  ],
}

export default function BeratungPageClient() {
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
          src="/images/geo-beratung-visual-v2.webp"
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
            <defs><pattern id="hero-dots-beratung" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#ffffff" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#hero-dots-beratung)" />
          </svg>
        </div>

        {/* Centered content */}
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center py-32">
          {/* Eyebrow label */}
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-8 block animate-[fadeUp_0.5s_ease_forwards]">/ GEO BERATUNG</span>

          {/* H1 — line-by-line reveal, white text */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-[family-name:var(--font-heading)] text-white mb-8 leading-[1.05]">
            <span className="block overflow-hidden pb-1">
              <span className="block animate-[lineReveal_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                Ihre Strategie
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="block animate-[lineReveal_0.7s_cubic-bezier(0.16,1,0.3,1)_0.12s_forwards]">
                für <span className="text-[#C2722A]">KI-Sichtbarkeit</span>
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-[fadeUp_0.6s_ease_0.3s_forwards]">
            Gemeinsam entwickeln wir, wie Ihre Marke in ChatGPT, Gemini und Perplexity wahrgenommen wird — mit klarem Aktionsplan.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mb-14 animate-[fadeUp_0.6s_ease_0.45s_forwards]">
            <Link href="/kontakt" className="px-8 py-4 bg-[#C2722A] text-white rounded-xl font-semibold hover:bg-[#A85E22] transition-all shadow-lg shadow-[#C2722A]/30">
              Erstgespräch vereinbaren
            </Link>
            <a href="#formate" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
              Beratungsformate ansehen ↓
            </a>
          </div>

          {/* Inline stat — compact, no big card */}
          <div className="flex justify-center gap-10 border-t border-white/10 pt-10 animate-[fadeUp_0.6s_ease_0.6s_forwards]">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C2722A] font-[family-name:var(--font-heading)] mb-1">
                <TypewriterStat value="1/3" inView={heroInView} delay={800} />
              </div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">Markenrecherchen via KI bis 2026</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80 font-[family-name:var(--font-heading)] mb-1">3 Formate</div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">Beratungsoptionen</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80 font-[family-name:var(--font-heading)] mb-1">Kostenlos</div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">Erstgespräch</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — WAS BERATUNG BEINHALTET                         */}
      {/* ============================================================ */}
      <section id="beratungsleistungen" className="py-24 bg-white">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / BERATUNGSLEISTUNGEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Was die GEO Beratung von SeoForge beinhaltet
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            Drei Kernbereiche, die zusammen eine tragfähige GEO-Strategie ergeben.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                ),
                title: "Strategie-Entwicklung",
                body: (
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    Wir analysieren Ihre Marktposition, Ihre Zielgruppe und die KI-Plattformen, auf denen Ihre Kunden
                    aktiv sind. Daraus entwickeln wir eine maßgeschneiderte GEO-Strategie — priorisiert nach Impact und
                    Ressourcenbedarf. Einblick in{" "}
                    <Link href="/geo" className="text-[#C2722A] hover:underline font-medium">
                      GEO als Leistungsbereich
                    </Link>
                    .
                  </p>
                ),
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Maßnahmenplanung",
                body: (
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    Aus der Strategie wird ein konkreter Maßnahmenplan: welche Inhalte zu erstellen sind, welche
                    technischen Optimierungen Priorität haben, wie Authority Signals systematisch aufgebaut werden.
                  </p>
                ),
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                ),
                title: "Team-Enablement",
                body: (
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    Wir befähigen Ihr internes Team, GEO-Maßnahmen eigenständig umzusetzen: Workshopformat,
                    dokumentierte Playbooks, Frage-und-Antwort-Runden.
                  </p>
                ),
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="flex flex-col h-full p-6 rounded-xl border border-border hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#C2722A]/8 hover:border-[#C2722A]/20 transition-all duration-300 cursor-default ease-out"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-[#C2722A] text-white flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">{card.title}</h3>
                {card.body}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — FÜR WEN                                         */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / ZIELGRUPPEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Für wen lohnt sich eine GEO Beratung?
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            GEO Beratung ist nicht für jeden der erste Schritt. Hier finden Sie, was zu Ihrer Situation passt.
          </p>

          <div className="space-y-6">
            {[
              {
                title: "Etablierte Marken mit GEO-Ambitionen",
                body: "Sie haben eine funktionierende SEO-Basis und wollen jetzt systematisch KI-Sichtbarkeit aufbauen. Sie brauchen Strategie und Priorisierung, keine Grundlagen-Erklärung. → Direkt zur Beratung.",
              },
              {
                title: "E-Commerce mit beratungsintensiven Produkten",
                body: "Ihre Kunden recherchieren vor dem Kauf ausgiebig — und nutzen zunehmend KI-Assistenten für Produktvergleiche. In der GEO Beratung entwickeln wir, wie Ihre Produktinhalte in diesen Rechercheprozessen auftauchen.",
              },
              {
                title: "B2B-Unternehmen im Wettbewerbsumfeld",
                hasLink: true,
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="border-l-4 border-[#C2722A] rounded-xl p-6 bg-white"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">{card.title}</h3>
                {card.hasLink ? (
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    Ihre Zielgruppe fragt KI-Systeme nach Anbietern, Tools und Lösungen in Ihrem Bereich. Wenn Ihr
                    Name dort nicht fällt, fällt er auch nicht in der Kaufentscheidung. → Alternativ empfehlen wir
                    zuerst einen{" "}
                    <Link href="/geo/audit" className="text-[#C2722A] hover:underline font-medium">
                      GEO Audit
                    </Link>
                    .
                  </p>
                ) : (
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{card.body}</p>
                )}
              </div>
            ))}
          </div>

          {/* Feature split: text + strategy workshop image */}
          <div className="mt-14 rounded-2xl overflow-hidden border border-[#E5E3DF] grid lg:grid-cols-5 min-h-[300px]">
            <div className="lg:col-span-3 p-8 lg:p-10 bg-white flex flex-col justify-center">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-4 block">/ STRATEGIE-WORKSHOP</span>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-3 leading-tight">
                Ein Workshop, der Ihnen zeigt, wo Sie stehen — und wohin
              </h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">
                In einem 2-stündigen Strategieworkshop entwickeln wir gemeinsam eine GEO-Roadmap, die zu Ihrer Situation passt — priorisiert, konkret, umsetzbar.
              </p>
              <Link href="/kontakt" className="inline-flex items-center gap-2 text-[#C2722A] font-semibold text-sm group hover:gap-3 transition-all">
                Erstgespräch vereinbaren <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
            <div className="lg:col-span-2 relative min-h-[240px] lg:min-h-auto">
              <Image
                src="/images/geo-beratung-workshop-v2.webp"
                alt="GEO Strategie Workshop — Beratung und Roadmap"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP BUILDER — after Section 3, before Section 4 */}
      <RoadmapBuilder />

      {/* ============================================================ */}
      {/* SECTION 4 — BERATUNGSANSATZ                                 */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / BERATUNGSANSATZ
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-12">
            Wie eine GEO Beratung bei SeoForge abläuft
          </h2>

          {/* Desktop */}
          <div className="hidden lg:flex items-start gap-0">
            {[
              {
                num: "01",
                title: "Analyse & Bestandsaufnahme",
                desc: "Wir beginnen mit einer strukturierten Analyse Ihrer aktuellen KI-Sichtbarkeit, Ihrer Inhalte und Ihrer Wettbewerber. Falls noch kein GEO Audit vorliegt, integrieren wir eine Kurzanalyse direkt in den Beratungsprozess.",
              },
              {
                num: "02",
                title: "Strategieworkshop",
                desc: "Im Kern der Beratung steht ein zweistündiger Strategieworkshop — remote oder vor Ort. Wir erarbeiten gemeinsam GEO-Ziele, priorisieren Zielplattformen und legen die Stoßrichtung der Content- und Technik-Maßnahmen fest.",
              },
              {
                num: "03",
                title: "Maßnahmenplan & Roadmap",
                desc: "Nach dem Workshop erstellen wir einen detaillierten Maßnahmenplan mit klaren Verantwortlichkeiten, Zeitplan und Erfolgsmetriken. Kein generisches Dokument — sondern für Ihre Situation.",
              },
              {
                num: "04",
                title: "Übergabe & Fragen-Runde",
                desc: "Abschluss-Call zur Übergabe des Maßnahmenplans, Klärung offener Fragen und Definition der nächsten Schritte — ob intern oder mit uns.",
              },
            ].map((step, i, arr) => (
              <div key={step.num} className="flex-1 relative">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#C2722A] text-white flex items-center justify-center font-bold text-sm shrink-0 z-10 relative">
                    {step.num}
                  </div>
                  {i < arr.length - 1 && <div className="flex-1 h-0.5 bg-[#E5E3DF] mx-2" />}
                </div>
                <div className="pr-4">
                  <h3 className="font-semibold text-[#1A1A1A] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="lg:hidden space-y-6">
            {[
              {
                num: "01",
                title: "Analyse & Bestandsaufnahme",
                desc: "Wir beginnen mit einer strukturierten Analyse Ihrer aktuellen KI-Sichtbarkeit, Ihrer Inhalte und Ihrer Wettbewerber. Falls noch kein GEO Audit vorliegt, integrieren wir eine Kurzanalyse direkt in den Beratungsprozess.",
              },
              {
                num: "02",
                title: "Strategieworkshop",
                desc: "Im Kern der Beratung steht ein zweistündiger Strategieworkshop — remote oder vor Ort. Wir erarbeiten gemeinsam GEO-Ziele, priorisieren Zielplattformen und legen die Stoßrichtung der Content- und Technik-Maßnahmen fest.",
              },
              {
                num: "03",
                title: "Maßnahmenplan & Roadmap",
                desc: "Nach dem Workshop erstellen wir einen detaillierten Maßnahmenplan mit klaren Verantwortlichkeiten, Zeitplan und Erfolgsmetriken. Kein generisches Dokument — sondern für Ihre Situation.",
              },
              {
                num: "04",
                title: "Übergabe & Fragen-Runde",
                desc: "Abschluss-Call zur Übergabe des Maßnahmenplans, Klärung offener Fragen und Definition der nächsten Schritte — ob intern oder mit uns.",
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
      {/* SECTION 5 — OUTCOMES                                        */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / BERATUNGS-OUTCOMES
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Was Sie nach der GEO Beratung in Händen halten
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            Greifbare Ergebnisse, keine losen Empfehlungen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { name: "Dokumentierte GEO-Strategie mit Prioritäten und Zeitplan" },
              { name: "Maßnahmenplan nach Aufwand und Impact sortiert" },
              { name: "KPI-Framework: Wie messen Sie GEO-Fortschritt in Ihrem Unternehmen?" },
              { name: "Plattform-Priorisierung: Auf welchen KI-Systemen sollten Sie zuerst sichtbar sein?" },
              { name: "Content-Briefings für die wichtigsten GEO-Maßnahmen (wenn Scope das umfasst)" },
              { name: "Playbook für Ihr internes Team: Wiederverwendbare Prozesse und Checklisten" },
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
                <span className="font-semibold text-[#1A1A1A] text-sm">{item.name}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Viele Kunden starten nach der Beratung mit unserer{" "}
            <Link href="/geo/optimierung" className="text-[#C2722A] hover:underline font-medium">
              GEO Optimierung
            </Link>{" "}
            oder{" "}
            <Link href="/geo/content-strategie" className="text-[#C2722A] hover:underline font-medium">
              GEO Content Strategie
            </Link>{" "}
            — je nach Schwerpunkt des Maßnahmenplans.
          </p>
        </div>
      </section>

      {/* BERATUNGSFORMAT SELECTOR — between Section 5 (Outcomes) and Section 6 (FAQ) */}
      <div id="formate">
        <BeratungsformatSelector />
      </div>

      {/* ============================================================ */}
      {/* SECTION 6 — FAQ                                             */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="reveal max-w-3xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / HÄUFIGE FRAGEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-10">
            Häufige Fragen zur GEO Beratung
          </h2>

          <div className="border-t border-[#E5E3DF]">
            <FaqItem
              q="Was ist der Unterschied zwischen GEO Beratung und einem GEO Audit?"
              a="Der GEO Audit ist die Diagnose: Er zeigt Ihren aktuellen Status und Ihre Lücken. Die GEO Beratung ist die Therapie: Sie entwickelt auf Basis der Diagnose (oder einer eigenen Kurzanalyse) eine Strategie und einen konkreten Maßnahmenplan. Viele Kunden buchen erst einen Audit, dann eine Beratung."
            />
            <FaqItem
              q="Kann ich eine GEO Beratung auch ohne vorherigen Audit buchen?"
              a="Ja. Wenn Sie bereits ein klares Bild Ihrer KI-Sichtbarkeit haben oder einfach strategisch starten wollen, ist eine Beratung ohne vorherigen Audit möglich. Wir integrieren dann eine Kurzanalyse in den ersten Beratungsschritt."
            />
            <FaqItem
              q="Wie lange dauert eine GEO Beratung und was kostet sie?"
              a="Der Prozess dauert in der Regel 2–3 Wochen von Briefing bis Maßnahmenplan. Preise variieren je nach Scope und Unternehmensgröße — wir erstellen gerne ein individuelles Angebot nach einem kostenlosen Erstgespräch."
            />
            <FaqItem
              q="Setzen Sie die Maßnahmen aus der Beratung auch um?"
              a="Das hängt von Ihrem Wunsch ab. Wir übergeben einen vollständig umsetzbaren Maßnahmenplan, den Sie intern oder mit uns realisieren können. Es gibt keine Pflicht zur Fortführung."
            />
            <FaqItem
              q="Welche Vorkenntnisse brauche ich für eine GEO Beratung?"
              a="Keine. Wir setzen kein Vorwissen zu GEO voraus. Ideal ist ein grundlegendes Verständnis von Content-Marketing und SEO — aber wir erklären alles, was für Ihre Situation relevant ist."
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
            / GEO BERATUNG ANFRAGEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] mb-6">
            Bereit für Ihre
            <br />
            <span>GEO-Strategie?</span>
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Kostenloses Erstgespräch — wir klären in 30 Minuten, ob und wie eine GEO Beratung für Sie sinnvoll ist.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["Kostenloses Erstgespräch", "Maßnahmenplan inklusive", "Remote oder vor Ort"].map((b) => (
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
              Erstgespräch vereinbaren
            </Link>
            <Link
              href="/geo"
              className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              GEO Leistungen ansehen
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  )
}
