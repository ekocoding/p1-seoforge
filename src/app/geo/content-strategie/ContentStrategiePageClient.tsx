"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
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
/* INTERACTIVE APP 1 — Citability Pyramid                       */
/* ============================================================ */
function CitabilityPyramid() {
  const [activeLevel, setActiveLevel] = useState<number | null>(null)

  const levels = [
    {
      label: "Citable Facts",
      width: "w-24",
      color: "bg-[#C2722A]",
      textColor: "text-white",
      score: 40,
      desc: "Konkrete Zahlen, benannte Quellen, datierte Aussagen. \"73 % der B2B-Einkäufer (Gartner, 2024)\" — exakt das, was KI zitiert.",
      examples: ["Statistiken mit Quelle", "Datierte Studienreferenzen", "Prozentangaben"],
    },
    {
      label: "Expert Authority",
      width: "w-40",
      color: "bg-[#D4A853]",
      textColor: "text-white",
      score: 30,
      desc: "Autorenangaben mit Credentials, Verlinkungen auf Fachmedien, Named Quotes von Experten erhöhen die Zitierwahrscheinlichkeit.",
      examples: ["Autoren-Credentials", "Fachmedien-Backlinks", "Named Quotes"],
    },
    {
      label: "Structured Content",
      width: "w-56",
      color: "bg-[#1A1A1A]",
      textColor: "text-white",
      score: 20,
      desc: "Klare H1–H3-Hierarchie, Schema.org-Markup, FAQ-Blöcke. Maschinenlesbare Struktur ist die Grundvoraussetzung für KI-Indexierung.",
      examples: ["H1–H3 Hierarchie", "Schema.org Markup", "FAQ-Blöcke"],
    },
    {
      label: "Base: Readable Text",
      width: "w-72",
      color: "bg-[#E5E3DF]",
      textColor: "text-[#1A1A1A]",
      score: 10,
      desc: "Klarer, grammatikalisch korrekter Text ohne Konjunktive. Die Basis — notwendig, aber allein nicht ausreichend für GEO-Sichtbarkeit.",
      examples: ["Klarer Schreibstil", "Aktiv statt Passiv", "Keine Konjunktive"],
    },
  ]

  return (
    <section className="py-16 bg-[#F8F7F5]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
          / INTERAKTIV: ZITIERBARKEITS-PYRAMIDE
        </span>
        <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-3">
          Was macht Inhalte zitierbar?
        </h2>
        <p className="text-[#6B6B6B] mb-10 max-w-xl">
          Klicken Sie auf eine Ebene, um zu verstehen, wie sie zur KI-Zitierbarkeit beiträgt.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Pyramid */}
          <div className="flex flex-col items-center gap-2">
            {levels.map((level, i) => (
              <button
                key={level.label}
                onClick={() => setActiveLevel(activeLevel === i ? null : i)}
                className={`${level.width} ${level.color} ${level.textColor} rounded-lg py-3 text-xs font-semibold text-center transition-all duration-200 hover:opacity-90 hover:scale-105 ${activeLevel === i ? "ring-2 ring-[#C2722A] ring-offset-2 scale-105" : ""}`}
              >
                {level.label}
              </button>
            ))}
            <p className="text-xs text-[#6B6B6B] mt-3 text-center">
              Breiter = größere Textmenge · Höher = höherer GEO-Impact
            </p>
          </div>

          {/* Detail panel */}
          <div className="min-h-[200px]">
            {activeLevel !== null ? (
              <div className="bg-white border border-[#E5E3DF] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${levels[activeLevel].color}`} />
                  <h3 className="font-semibold text-[#1A1A1A]">{levels[activeLevel].label}</h3>
                  <span className="ml-auto text-xs font-semibold text-[#C2722A] bg-[#C2722A]/10 px-2.5 py-1 rounded-full">
                    +{levels[activeLevel].score} GEO Score
                  </span>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{levels[activeLevel].desc}</p>
                <div className="space-y-1">
                  {levels[activeLevel].examples.map((ex) => (
                    <div key={ex} className="flex items-center gap-2 text-xs text-[#1A1A1A]">
                      <svg className="w-3.5 h-3.5 text-[#C2722A] shrink-0" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.78 6.237l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06L6.75 9.116l3.97-3.97a.75.75 0 111.06 1.06v.031z" />
                      </svg>
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[200px] border-2 border-dashed border-[#E5E3DF] rounded-2xl">
                <p className="text-sm text-[#6B6B6B] text-center px-6">
                  Klicken Sie auf eine Pyramiden-Ebene, um Details zu sehen
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================ */
/* INTERACTIVE APP 2 — Content Citability Scorer                */
/* ============================================================ */
function CitabilityScorer() {
  const criteria = [
    { id: "facts", label: "Enthält konkrete Zahlen / Statistiken mit Quellenangabe", points: 20 },
    { id: "schema", label: "Schema.org-Markup vorhanden (Article, FAQ, HowTo)", points: 15 },
    { id: "author", label: "Autorenangabe mit Credentials / Fachgebiet", points: 15 },
    { id: "headings", label: "Klare H1–H3 Überschriften-Hierarchie", points: 10 },
    { id: "faq", label: "FAQ-Block mit präzisen Frage-Antwort-Paaren", points: 15 },
    { id: "definitions", label: "Definitionen von Fachbegriffen im Text", points: 10 },
    { id: "external", label: "Verlinkungen auf Fachmedien / Studien", points: 10 },
    { id: "active", label: "Aktive Sprache, keine Konjunktive (\"wäre\", \"könnte\")", points: 5 },
  ]

  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const totalScore = criteria.reduce((sum, c) => (checked[c.id] ? sum + c.points : sum), 0)
  const maxScore = criteria.reduce((sum, c) => sum + c.points, 0)
  const pct = Math.round((totalScore / maxScore) * 100)

  const getLabel = () => {
    if (pct >= 80) return { text: "Sehr gut zitierbar", color: "text-green-600" }
    if (pct >= 60) return { text: "Gut zitierbar", color: "text-emerald-600" }
    if (pct >= 40) return { text: "Optimierung empfohlen", color: "text-yellow-600" }
    return { text: "Kaum zitierbar", color: "text-red-600" }
  }

  const label = getLabel()
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (pct / 100) * circumference

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
          / TOOL: CONTENT CITABILITY CHECKER
        </span>
        <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-3">
          Wie zitierbar ist Ihr Content?
        </h2>
        <p className="text-[#6B6B6B] mb-10 max-w-xl">
          Prüfen Sie Ihren bestehenden Content anhand der wichtigsten GEO-Kriterien.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Checklist */}
          <div className="flex flex-col justify-center space-y-3">
            {criteria.map((c) => (
              <label
                key={c.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-[#E5E3DF] cursor-pointer hover:bg-[#F8F7F5] transition-colors"
              >
                <input
                  type="checkbox"
                  className="mt-0.5 accent-[#C2722A] w-4 h-4 shrink-0"
                  checked={!!checked[c.id]}
                  onChange={(e) => setChecked((prev) => ({ ...prev, [c.id]: e.target.checked }))}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-[#1A1A1A] leading-snug">{c.label}</span>
                </div>
                <span className="text-xs font-semibold text-[#C2722A] whitespace-nowrap">+{c.points}</span>
              </label>
            ))}
          </div>

          {/* Score display */}
          <div className="flex flex-col items-center justify-center bg-[#F8F7F5] rounded-2xl p-8 border border-[#E5E3DF]">
            <svg width="120" height="120" viewBox="0 0 120 120" className="mb-4">
              <circle cx="60" cy="60" r="45" fill="none" stroke="#E5E3DF" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#C2722A"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 60 60)"
                style={{ transition: "stroke-dashoffset 0.4s ease" }}
              />
              <text x="60" y="56" textAnchor="middle" className="font-bold" style={{ fontSize: 22, fill: "#1A1A1A", fontWeight: 700 }}>
                {pct}%
              </text>
              <text x="60" y="72" textAnchor="middle" style={{ fontSize: 10, fill: "#6B6B6B" }}>
                Zitierbarkeit
              </text>
            </svg>
            <p className={`text-lg font-semibold mb-1 ${label.color}`}>{label.text}</p>
            <p className="text-sm text-[#6B6B6B] mb-6 text-center">
              {totalScore} von {maxScore} Punkten erreicht
            </p>
            {pct < 60 && (
              <div className="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 leading-relaxed">
                <strong>Empfehlung:</strong> Fügen Sie Fakten mit Quellenangaben hinzu und strukturieren Sie Ihren
                Content mit Schema.org-Markup, um die Zitierbarkeit deutlich zu steigern.
              </div>
            )}
            {pct >= 60 && pct < 80 && (
              <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-800 leading-relaxed">
                <strong>Gut!</strong> Noch fehlende Kriterien ergänzen, um maximale GEO-Sichtbarkeit zu erreichen.
              </div>
            )}
            {pct >= 80 && (
              <div className="w-full bg-green-50 border border-green-200 rounded-xl p-4 text-xs text-green-800 leading-relaxed">
                <strong>Exzellent!</strong> Ihr Content ist optimal für KI-Zitation aufgestellt.
              </div>
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
      name: "GEO Content Strategie",
      provider: { "@type": "Organization", name: "SeoForge" },
      serviceType: "Generative Engine Optimization Content Strategy",
      areaServed: "Deutschland, Österreich, Schweiz",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Muss ich für GEO mehr Content produzieren?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nicht unbedingt mehr, aber gezielter. Oft ist es effizienter, bestehende Inhalte GEO-zu-optimieren (Fakten hinzufügen, Struktur verbessern, Schema-Markup ergänzen), als neue Inhalte zu erstellen. Unser erster Schritt ist immer ein Themen-Audit, der das Potenzial bestehender Seiten bewertet.",
          },
        },
        {
          "@type": "Question",
          name: "Funktioniert GEO Content auf Deutsch genauso gut wie auf Englisch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Deutschsprachige KI-Antworten nutzen deutschsprachige Quellen — das ist ein Vorteil für deutsche Unternehmen. Die Prinzipien (Struktur, Fakten, Zitierbarkeit) gelten sprach-unabhängig. Aktuelle Modelle wie Gemini und Claude sind mehrsprachig und zitieren qualitativ hochwertige deutschsprachige Quellen.",
          },
        },
        {
          "@type": "Question",
          name: "Schreiben Sie den Content für uns oder beraten Sie nur?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Beides möglich. Wir bieten vollständige Content-Produktion (Recherche, Briefing, Schreiben, Schema-Markup) oder reine Strategie und Briefings, die Ihr internes Team umsetzt. Was passt, klären wir im Erstgespräch.",
          },
        },
        {
          "@type": "Question",
          name: "Wie viele Inhalte brauche ich für messbare GEO-Ergebnisse?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Es gibt keine Mindestzahl, aber als Orientierung: 5–10 gut optimierte GEO-Pieces in einem definierten Themenbereich erzeugen erfahrungsgemäß messbare Veränderungen in der Brand Mention Rate innerhalb von 3–4 Monaten.",
          },
        },
        {
          "@type": "Question",
          name: "Was ist der Unterschied zwischen GEO Content Strategie und klassischer Content-Strategie?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eine klassische Content-Strategie optimiert für Suchalgorithmen (Keywords, Backlinks, Ranking). Eine GEO Content Strategie optimiert für KI-Zitation (Zitierbarkeit, Struktur, Authority, Fakten-Dichte). Die Zielgruppe des Contents ist dieselbe — aber der Kanal, über den sie den Content findet, ändert sich.",
          },
        },
      ],
    },
  ],
}

export default function ContentStrategiePageClient() {
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
        <img
          src="/images/geo-content-visual.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center animate-[kenBurns_4s_ease-out_forwards]"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1A1A1A]/62" />

        {/* Subtle vignette — darkens edges */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(26,26,26,0.55) 100%)' }} />

        {/* Dot grid very subtle — visible as texture */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg className="absolute top-0 left-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="hero-dots-cs" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#ffffff" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#hero-dots-cs)" />
          </svg>
        </div>

        {/* Centered content */}
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center py-32">
          {/* Eyebrow label */}
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-8 block animate-[fadeUp_0.5s_ease_forwards]">/ GEO CONTENT STRATEGIE</span>

          {/* H1 — line-by-line reveal, white text */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-[family-name:var(--font-heading)] text-white mb-8 leading-[1.05]">
            <span className="block overflow-hidden pb-1">
              <span className="block animate-[lineReveal_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                Inhalte, die
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="block animate-[lineReveal_0.7s_cubic-bezier(0.16,1,0.3,1)_0.12s_forwards]">
                <span className="text-[#C2722A]">KI-Systeme</span> zitieren
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-[fadeUp_0.6s_ease_0.3s_forwards]">
            Wir entwickeln Inhalte, die ChatGPT, Gemini und Perplexity als Antwortquelle nutzen — mit Strategie, Struktur und Substanz.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mb-14 animate-[fadeUp_0.6s_ease_0.45s_forwards]">
            <Link href="/kontakt" className="px-8 py-4 bg-[#C2722A] text-white rounded-xl font-semibold hover:bg-[#A85E22] transition-all shadow-lg shadow-[#C2722A]/30">
              Content-Strategie anfragen
            </Link>
            <a href="#formate" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
              Inhaltsformate ansehen ↓
            </a>
          </div>

          {/* Inline stat — compact, no big card */}
          <div className="flex justify-center gap-10 border-t border-white/10 pt-10 animate-[fadeUp_0.6s_ease_0.6s_forwards]">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C2722A] font-[family-name:var(--font-heading)] mb-1">
                <TypewriterStat value="3,7x" inView={heroInView} delay={800} />
              </div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">häufiger zitiert mit Fakten</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80 font-[family-name:var(--font-heading)] mb-1">7 Formate</div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">für KI-Zitierbarkeit</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80 font-[family-name:var(--font-heading)] mb-1">Authoritas</div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">2024</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — 4 PRINZIPIEN                                    */}
      {/* ============================================================ */}
      <section id="prinzipien" className="py-24 bg-white">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / PRINZIPIEN KI-FREUNDLICHER INHALTE
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Die vier Prinzipien von Inhalten, die KI zitiert
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            Alle Maßnahmen in unserem{" "}
            <Link href="/geo" className="text-[#C2722A] hover:underline font-medium">
              GEO als Leistungsbereich
            </Link>{" "}
            basieren auf diesen vier Grundprinzipien.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Authoritative",
                desc: "KI-Systeme bevorzugen Quellen, die von anderen zitiert werden. Das bedeutet: Inhalte müssen faktisch korrekt, fachlich tief und durch nachweisbare Expertise gestützt sein. Autoren-Credentials, Studienreferenzen und externe Verlinkungen sind keine Extras — sie sind Pflicht.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ),
              },
              {
                title: "Structured",
                desc: "Inhalte müssen maschinenlesbar sein. Klare Überschriften-Hierarchie (H1–H3), Schema.org-Markup, FAQ-Blöcke mit präzisen Antworten, Aufzählungen mit konsistenter Logik. KI-Systeme zerlegen Texte in Chunks — gut strukturierte Texte werden besser verstanden.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                ),
              },
              {
                title: "Specific",
                desc: "Vage Aussagen werden nicht zitiert. Konkrete Zahlen, benannte Quellen, präzise Definitionen — das ist zitierwürdiger Content. \"73 % der B2B-Einkäufer nutzen laut Gartner KI-Assistenten für Produktrecherche\" ist zitierbar.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd" />
                  </svg>
                ),
              },
              {
                title: "Citable",
                desc: "\"Citable\" bedeutet: der Satz funktioniert als Zitat. Kurze, prägnante Aussagen mit Subjekt, Prädikat, Objekt — ohne Konjunktive, ohne Einschränkungen. \"Das Unternehmen X hat [Leistung] erreicht\" ist zitierbar. \"Es könnte möglicherweise sein, dass...\" ist es nicht.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="flex flex-col h-full border border-[#E5E3DF] rounded-xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#C2722A]/8 hover:border-[#C2722A]/20 transition-all duration-300 cursor-default ease-out"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-[#C2722A] flex items-center justify-center mb-4 shrink-0">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-[#1A1A1A] text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* INTERACTIVE APP 1 — Citability Pyramid (after Section 2)    */}
      {/* ============================================================ */}
      <CitabilityPyramid />

      {/* ============================================================ */}
      {/* SECTION 3 — WIE KI INHALTE AUSWÄHLT                        */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / WIE KI QUELLEN AUSWÄHLT
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Warum KI-Systeme manche Inhalte zitieren und andere ignorieren
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            <Link href="/was-ist-geo" className="text-[#C2722A] hover:underline font-medium">
              Was KI-Systeme grundlegend unterscheidet
            </Link>{" "}
            — und wie diese Unterschiede Ihre Content-Strategie beeinflussen.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="prose prose-sm text-[#6B6B6B] max-w-none">
              <p className="leading-relaxed">
                Verschiedene KI-Systeme funktionieren unterschiedlich — und das beeinflusst, welche Inhalte sie
                bevorzugen. Wer das versteht, kann Inhalte gezielt für die richtigen Mechanismen optimieren.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "Trainingsdaten-Logik",
                  desc: "Ältere GPT-Modelle (ohne Web-Zugriff) kennen Inhalte, die vor ihrem Trainings-Cutoff veröffentlicht wurden. Je mehr andere Quellen auf Ihren Content verlinken, desto wahrscheinlicher ist er im Training enthalten.",
                },
                {
                  name: "RLHF",
                  desc: "Antworten, die von menschlichen Bewertern als qualitativ hochwertig eingestuft werden, fließen in das Training zurück. Inhalte, die klare, faktische Antworten liefern, werden durch diesen Mechanismus bevorzugt.",
                },
                {
                  name: "Web Retrieval (RAG)",
                  desc: "Perplexity, Gemini und aktuelles ChatGPT mit Browsing suchen in Echtzeit nach Quellen. Hier gelten ähnliche Regeln wie bei Google: Autorität, Aktualität und strukturierte Inhalte gewinnen.",
                },
                {
                  name: "Source Authority",
                  desc: "Alle KI-Systeme gewichten Quellen nach Autorität. Eine .de-Domain mit Experten-Autoren-Seiten, Fachmedien-Backlinks und Wikidata-Eintrag schlägt eine anonyme Blog-Seite — auch wenn der Inhalt ähnlich ist.",
                },
              ].map((card) => (
                <div key={card.name} className="border border-[#E5E3DF] rounded-xl p-5 bg-white hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#C2722A]/8 hover:border-[#C2722A]/20 transition-all duration-300 cursor-default">
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">{card.name}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — PROZESS                                         */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / PROZESS
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-12">
            In 5 Schritten zur GEO Content Strategie
          </h2>

          {/* Desktop horizontal */}
          <div className="hidden lg:flex items-start gap-0">
            {[
              {
                num: "01",
                title: "Themen-Audit",
                desc: "Wir analysieren Ihren bestehenden Content auf GEO-Potenziale. Welche Seiten haben ansatzweise die richtigen Inhalte, brauchen aber GEO-Optimierung? Welche Themen fehlen vollständig?",
              },
              {
                num: "02",
                title: "Keyword-zu-Prompt-Mapping",
                desc: "Klassische Keywords werden auf KI-Prompts gemappt (\"Welche CRM-Software eignet sich für mittelständische Unternehmen?\"). Das verändert den Content-Fokus grundlegend.",
              },
              {
                num: "03",
                title: "Format-Entscheidung",
                desc: "Welche Content-Formate passen zu welchen GEO-Zielen? FAQ-Content, Definition-Content, Vergleichsseiten, Statistik-Hubs, Expert-Roundups — jedes Format hat seine GEO-Stärken.",
              },
              {
                num: "04",
                title: "Content-Briefings",
                desc: "Wir erstellen detaillierte Briefings pro Piece: Ziel-Prompts, Ziel-KI-Plattform, Struktur-Vorgabe, Fakten-Quellen, Zitat-Kandidaten.",
              },
              {
                num: "05",
                title: "Publish & GEO Optimierung",
                desc: "Fertige Inhalte werden mit vollständigem Schema.org-Markup veröffentlicht und in das GEO-Monitoring-Tracking aufgenommen.",
                hasLink: true,
              },
            ].map((step, i, arr) => (
              <div
                key={step.num}
                className="flex-1 relative"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#C2722A] text-white flex items-center justify-center font-bold text-sm shrink-0 z-10 relative">
                    {step.num}
                  </div>
                  {i < arr.length - 1 && <div className="flex-1 h-0.5 bg-[#E5E3DF] mx-2" />}
                </div>
                <div className="pr-4">
                  <h3 className="font-semibold text-[#1A1A1A] mb-2">{step.title}</h3>
                  {step.hasLink ? (
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">
                      Fertige Inhalte werden mit vollständigem Schema.org-Markup veröffentlicht und in das
                      GEO-Monitoring-Tracking aufgenommen. Mehr zur{" "}
                      <Link
                        href="/geo/optimierung"
                        className="text-[#C2722A] hover:underline font-medium"
                      >
                        GEO Optimierung
                      </Link>
                      .
                    </p>
                  ) : (
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">{step.desc}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden space-y-6">
            {[
              {
                num: "01",
                title: "Themen-Audit",
                desc: "Wir analysieren Ihren bestehenden Content auf GEO-Potenziale. Welche Seiten haben ansatzweise die richtigen Inhalte, brauchen aber GEO-Optimierung? Welche Themen fehlen vollständig?",
              },
              {
                num: "02",
                title: "Keyword-zu-Prompt-Mapping",
                desc: "Klassische Keywords werden auf KI-Prompts gemappt. Das verändert den Content-Fokus grundlegend.",
              },
              {
                num: "03",
                title: "Format-Entscheidung",
                desc: "Welche Content-Formate passen zu welchen GEO-Zielen? FAQ-Content, Definition-Content, Vergleichsseiten, Statistik-Hubs, Expert-Roundups — jedes Format hat seine GEO-Stärken.",
              },
              {
                num: "04",
                title: "Content-Briefings",
                desc: "Wir erstellen detaillierte Briefings pro Piece: Ziel-Prompts, Ziel-KI-Plattform, Struktur-Vorgabe, Fakten-Quellen, Zitat-Kandidaten.",
              },
              {
                num: "05",
                title: "Publish & GEO Optimierung",
                desc: "Fertige Inhalte werden mit vollständigem Schema.org-Markup veröffentlicht und in das GEO-Monitoring-Tracking aufgenommen.",
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
      {/* SECTION 5 — FORMATE TABELLE                                 */}
      {/* ============================================================ */}
      <section id="formate" className="py-24 bg-[#F8F7F5]">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / CONTENT-FORMATE
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Welche Content-Formate für GEO am besten funktionieren
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            Nicht jedes Format ist gleich wertvoll für KI-Sichtbarkeit. Diese Übersicht zeigt, wo Sie Ihre
            Kapazitäten einsetzen sollten.
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#E5E3DF]">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-[#D4A853] text-white">
                  <th className="text-left px-5 py-3 text-sm font-semibold">Content-Format</th>
                  <th className="text-left px-5 py-3 text-sm font-semibold">GEO-Eignung</th>
                  <th className="text-left px-5 py-3 text-sm font-semibold">Warum</th>
                  <th className="text-left px-5 py-3 text-sm font-semibold">Beispiel</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    format: "FAQ-Content",
                    eignung: "Sehr hoch",
                    eignungColor: "bg-green-100 text-green-700",
                    warum:
                      "KI-Systeme sind für Frage-Antwort-Interaktionen trainiert — FAQs liefern exakt diese Struktur",
                    beispiel: '"Was ist [Begriff]?"',
                  },
                  {
                    format: "Definition Content",
                    eignung: "Sehr hoch",
                    eignungColor: "bg-green-100 text-green-700",
                    warum: "Klare Begriffsdefinitionen werden direkt in KI-Antworten übernommen",
                    beispiel: '"Definition: GEO"',
                  },
                  {
                    format: "Comparison Content",
                    eignung: "Hoch",
                    eignungColor: "bg-emerald-50 text-emerald-600",
                    warum: "Käufer-Journey-Fragen werden häufig über KI gestellt",
                    beispiel: '"[Produkt A] vs. [Produkt B]"',
                  },
                  {
                    format: "Statistik-Hubs",
                    eignung: "Hoch",
                    eignungColor: "bg-emerald-50 text-emerald-600",
                    warum: "Original-Daten werden von anderen zitiert = Authority-Signal",
                    beispiel: '"Statistiken zur KI-Nutzung 2025"',
                  },
                  {
                    format: "Expert Quotes / Interviews",
                    eignung: "Mittel",
                    eignungColor: "bg-yellow-50 text-yellow-700",
                    warum: "Named authorities erhöhen Zitierwahrscheinlichkeit",
                    beispiel: "Interview mit Experte",
                  },
                  {
                    format: "How-To-Guides",
                    eignung: "Mittel",
                    eignungColor: "bg-yellow-50 text-yellow-700",
                    warum: "Gut strukturiert = zitierbar; zu lang = nur teilweise verwendet",
                    beispiel: '"In 5 Schritten zu [Ziel]"',
                  },
                  {
                    format: "Meinungs-Content",
                    eignung: "Niedrig",
                    eignungColor: "bg-stone-100 text-stone-500",
                    warum: "KI meidet Opinion-Content als Antwortquelle",
                    beispiel: "—",
                  },
                ].map((row, i) => (
                  <tr key={row.format} className={i % 2 === 0 ? "bg-white" : "bg-[#F8F7F5]"}>
                    <td className="px-5 py-3 text-sm font-medium text-[#1A1A1A]">{row.format}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.eignungColor}`}>
                        {row.eignung}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-[#6B6B6B] leading-relaxed">{row.warum}</td>
                    <td className="px-5 py-3 text-sm text-[#6B6B6B] italic">{row.beispiel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* INTERACTIVE APP 2 — CitabilityScorer (between Sec 5 & 6)   */}
      {/* ============================================================ */}
      <CitabilityScorer />

      {/* ============================================================ */}
      {/* SECTION 6 — VORHER/NACHHER                                  */}
      {/* ============================================================ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          {/* Feature header: image + section intro side by side */}
          <div className="grid lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-[#E5E3DF] mb-14">
            <div className="lg:col-span-3 relative min-h-[240px] lg:min-h-[320px]">
              <img
                src="/images/geo-content-editorial.jpg"
                alt="Content wird von KI zitiert — Vorher Nachher Vergleich"
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={(e) => { e.currentTarget.style.display = "none" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
            </div>
            <div className="lg:col-span-2 p-8 lg:p-10 bg-[#F8F7F5] flex flex-col justify-center">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-4 block">/ BEISPIEL: VORHER / NACHHER</span>
              <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-3 leading-tight">
                So sieht GEO-optimierter Content konkret aus
              </h2>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                Dasselbe Thema — einmal klassischer SEO-Text, einmal als GEO-optimierter Text, den KI als Quelle zitiert.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Vorher */}
            <div className="border-l-4 border-stone-300 bg-stone-50 p-5 rounded-r-xl flex flex-col">
              <h3 className="font-semibold text-[#1A1A1A] text-sm uppercase tracking-wide mb-4">
                Vorher — Klassischer SEO-Text
              </h3>
              <blockquote className="text-sm text-[#6B6B6B] leading-relaxed italic border-l-2 border-stone-300 pl-4 mb-4 flex-1">
                "SeoForge ist eine erfahrene SEO-Agentur aus Deutschland, die Ihnen hilft, Ihre
                Online-Sichtbarkeit zu verbessern. Wir bieten verschiedene Leistungen an, die auf Ihre
                Bedürfnisse zugeschnitten sind."
              </blockquote>
              <div className="flex flex-wrap gap-2">
                {["Keine Fakten", "Keine Entity-Anker", "Kein Schema-Markup", "Nicht zitierbar"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-red-50 text-red-600 text-xs rounded-full border border-red-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Nachher */}
            <div className="border-l-4 border-[#C2722A] bg-[#C2722A]/5 p-5 rounded-r-xl flex flex-col">
              <h3 className="font-semibold text-[#1A1A1A] text-sm uppercase tracking-wide mb-4">
                Nachher — GEO-optimierter Text
              </h3>
              <blockquote className="text-sm text-[#1A1A1A] leading-relaxed italic border-l-2 border-[#C2722A] pl-4 mb-4 flex-1">
                "SeoForge ist eine auf Generative Engine Optimization (GEO) spezialisierte SEO-Agentur mit Sitz in
                Deutschland (gegründet 2021). GEO bezeichnet die Optimierung von Online-Inhalten für die Zitation
                durch KI-Systeme wie ChatGPT, Google Gemini und Perplexity AI. Laut einer Studie von BrightEdge
                (2024) generieren KI-Assistenten bereits 20 % der organischen Traffic-Zuweisungen in B2B-Segmenten."
              </blockquote>
              <div className="flex flex-wrap gap-2">
                {["Entity-Anker", "Definition im Text", "Fakt mit Quelle", "Vollständige Eigennamen"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — FAQ                                             */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="reveal max-w-3xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / HÄUFIGE FRAGEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-10">
            Häufige Fragen zur GEO Content Strategie
          </h2>

          <div className="border-t border-[#E5E3DF]">
            <FaqItem
              q="Muss ich für GEO mehr Content produzieren?"
              a="Nicht unbedingt mehr, aber gezielter. Oft ist es effizienter, bestehende Inhalte GEO-zu-optimieren (Fakten hinzufügen, Struktur verbessern, Schema-Markup ergänzen), als neue Inhalte zu erstellen. Unser erster Schritt ist immer ein Themen-Audit, der das Potenzial bestehender Seiten bewertet."
            />
            <FaqItem
              q="Funktioniert GEO Content auf Deutsch genauso gut wie auf Englisch?"
              a="Deutschsprachige KI-Antworten nutzen deutschsprachige Quellen — das ist ein Vorteil für deutsche Unternehmen. Die Prinzipien (Struktur, Fakten, Zitierbarkeit) gelten sprach-unabhängig. Aktuelle Modelle wie Gemini und Claude sind mehrsprachig und zitieren qualitativ hochwertige deutschsprachige Quellen."
            />
            <FaqItem
              q="Schreiben Sie den Content für uns oder beraten Sie nur?"
              a="Beides möglich. Wir bieten vollständige Content-Produktion (Recherche, Briefing, Schreiben, Schema-Markup) oder reine Strategie und Briefings, die Ihr internes Team umsetzt. Was passt, klären wir im Erstgespräch."
            />
            <FaqItem
              q="Wie viele Inhalte brauche ich für messbare GEO-Ergebnisse?"
              a="Es gibt keine Mindestzahl, aber als Orientierung: 5–10 gut optimierte GEO-Pieces in einem definierten Themenbereich erzeugen erfahrungsgemäß messbare Veränderungen in der Brand Mention Rate innerhalb von 3–4 Monaten."
            />
            <FaqItem
              q="Was ist der Unterschied zwischen GEO Content Strategie und klassischer Content-Strategie?"
              a="Eine klassische Content-Strategie optimiert für Suchalgorithmen (Keywords, Backlinks, Ranking). Eine GEO Content Strategie optimiert für KI-Zitation (Zitierbarkeit, Struktur, Authority, Fakten-Dichte). Die Zielgruppe des Contents ist dieselbe — aber der Kanal, über den sie den Content findet, ändert sich."
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8 — CTA                                             */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C2722A]/10 rounded-full blur-3xl -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4A853]/10 rounded-full blur-3xl -ml-40 -mb-40" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / GEO CONTENT STRATEGIE ANFRAGEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] mb-6">
            Inhalte entwickeln,
            <br />
            <span>die KI-Systeme zitieren</span>
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Wir erstellen Ihre GEO Content Strategie — von der Themenauswahl bis zum fertigen Content-Briefing.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["Inkl. Themen-Audit", "Deutsch- und englischsprachige Märkte", "Umsetzung optional"].map((b) => (
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
              GEO Content Strategie anfragen
            </Link>
            <Link
              href="/geo/monitoring"
              className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              GEO Monitoring ansehen
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  )
}
