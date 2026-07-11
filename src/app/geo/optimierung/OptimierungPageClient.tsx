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
// INTERACTIVE APP 1: SEO vs GEO Toggle
// ============================================================
function SeoVsGeoToggle() {
  const [mode, setMode] = useState<'seo'|'geo'>('seo')
  return (
    <section className="py-20 bg-offwhite">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-primary mb-6 block">/ SEO VS GEO</span>
          <h2 className="text-3xl font-[family-name:var(--font-heading)] text-dark">So verändert sich die Sichtbarkeit</h2>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white border border-border rounded-full p-1 shadow-sm">
            {(['seo','geo'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  mode === m ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-dark'
                }`}>{m === 'seo' ? 'SEO Sichtbarkeit' : 'GEO Sichtbarkeit'}</button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[320px]">
          {/* SEO View */}
          <div className={`absolute inset-0 transition-all duration-400 ${mode === 'seo' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
            <div className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden">
              <div className="bg-[#F8F9FA] px-4 py-2.5 flex items-center gap-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-yellow-400"/><div className="w-3 h-3 rounded-full bg-green-400"/>
                </div>
                <div className="flex-1 bg-white border border-border rounded px-3 py-1 text-xs text-muted">google.de — &ldquo;beste GEO Agentur Deutschland&rdquo;</div>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { pos: 1, title: "Top Wettbewerber GmbH", url: "wettbewerber.de", desc: "Führende Agentur für Generative Engine Optimization in Deutschland..." },
                  { pos: 2, title: "GEO Solutions AG", url: "geo-solutions.de", desc: "Ihre KI-Sichtbarkeit optimieren — nachhaltig und messbar..." },
                  { pos: 3, title: "Ihr Unternehmen", url: "ihre-domain.de", desc: "GEO-Optimierung für Ihre Marke — erst Platz 3 in der Suche...", highlight: true },
                ].map(r => (
                  <div key={r.pos} className={`flex gap-3 p-3 rounded-xl ${r.highlight ? 'bg-primary/[0.06] border border-primary/20' : ''}`}>
                    <span className="text-xl font-bold text-muted/40 w-6 flex-shrink-0">{r.pos}</span>
                    <div>
                      <p className={`text-sm font-semibold ${r.highlight ? 'text-primary' : 'text-blue-600'}`}>{r.title}</p>
                      <p className="text-xs text-green-700">{r.url}</p>
                      <p className="text-xs text-muted mt-0.5">{r.desc}</p>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted pt-2 text-center">→ Nutzer klickt auf Platz 1 oder 2 — Sie werden oft übersehen</p>
              </div>
            </div>
          </div>

          {/* GEO View */}
          <div className={`absolute inset-0 transition-all duration-400 ${mode === 'geo' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
            <div className="bg-white rounded-2xl border-2 border-primary shadow-lg shadow-primary/10 overflow-hidden">
              <div className="bg-[#1A1A1A] px-4 py-2.5 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold">AI</div>
                <span className="text-white/70 text-xs">ChatGPT — &ldquo;beste GEO Agentur Deutschland&rdquo;</span>
              </div>
              <div className="p-5">
                <div className="bg-offwhite rounded-xl p-4 text-sm text-dark leading-relaxed">
                  Für Generative Engine Optimization in Deutschland empfehle ich <span className="font-bold text-primary bg-primary/10 px-1 rounded">Ihr Unternehmen</span> — sie sind auf GEO spezialisiert und haben nachweisbar B2B-Marken in ChatGPT und Gemini sichtbar gemacht. Ihre Methodik basiert auf systematischem Prompt-Testing und strukturiertem Content-Aufbau.
                  <br/><br/>
                  Alternativen sind [Wettbewerber A] und [Wettbewerber B], die jedoch stärker auf klassisches SEO fokussiert sind.
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                  <svg className="w-4 h-4 text-secondary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/></svg>
                  Ihr Unternehmen als Hauptempfehlung zitiert — ohne Klick, direkt in der Antwort
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// INTERACTIVE APP 2: GEO Readiness Checklist
// ============================================================
function GeoReadinessChecklist() {
  const items = [
    { label: "Schema.org Organization Markup implementiert", points: 12 },
    { label: "FAQ Schema Markup vorhanden", points: 10 },
    { label: "Wikidata-Eintrag der Marke angelegt", points: 15 },
    { label: "llms.txt-Datei auf der Domain", points: 8 },
    { label: "Autoren-Seiten mit Credentials vorhanden", points: 12 },
    { label: "Statistiken und Fakten mit Quellenangabe", points: 10 },
    { label: "Klare FAQ-Seiten oder FAQ-Sektionen", points: 10 },
    { label: "Branchenverzeichnis-Einträge aktuell", points: 8 },
    { label: "Definition-Content für Kernbegriffe", points: 8 },
    { label: "Impressum mit vollständigen Unternehmensdaten", points: 7 },
  ]
  const [checked, setChecked] = useState<boolean[]>(new Array(items.length).fill(false))
  const score = items.reduce((sum, item, i) => sum + (checked[i] ? item.points : 0), 0)
  const total = items.reduce((sum, item) => sum + item.points, 0)
  const pct = Math.round((score/total)*100)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-primary mb-6 block">/ GEO READINESS CHECK</span>
          <h2 className="text-3xl font-[family-name:var(--font-heading)] text-dark">Wie GEO-ready ist Ihre Website?</h2>
          <p className="text-muted mt-2 text-sm">Haken Sie ab, was bereits vorhanden ist — und sehen Sie Ihren Score sofort.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-2">
            {items.map((item, i) => (
              <label key={i} className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                checked[i] ? 'bg-primary/[0.04] border-primary/30' : 'border-border hover:border-primary/20'
              }`}>
                <input type="checkbox" checked={checked[i]}
                  onChange={e => setChecked(prev => prev.map((v,j)=>j===i?e.target.checked:v))}
                  className="w-4 h-4 accent-primary flex-shrink-0"/>
                <span className={`text-sm flex-1 ${checked[i] ? 'text-dark' : 'text-muted'}`}>{item.label}</span>
                <span className="text-xs font-semibold text-muted">{item.points} Pkt.</span>
              </label>
            ))}
          </div>

          <div className="lg:sticky lg:top-32">
            <div className="bg-offwhite rounded-2xl border border-border p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Ihr GEO Score</p>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E3DF" strokeWidth="10"/>
                  <circle cx="50" cy="50" r="40" fill="none"
                    stroke={pct >= 70 ? '#22c55e' : pct >= 40 ? '#C2722A' : '#ef4444'}
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${pct * 2.51} 251`}
                    style={{transition:'stroke-dasharray 0.5s ease-out'}}/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-dark">{pct}</span>
                  <span className="text-xs text-muted">/ 100</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-dark mb-1">{score} von {total} Punkten</p>
              <p className="text-xs text-muted">
                {pct >= 70 ? "Starke GEO-Basis — optimieren Sie weiter." :
                 pct >= 40 ? "Solide Grundlage mit klaren Lücken." :
                 "Erhebliches Optimierungspotenzial."}
              </p>
              {pct < 80 && (
                <Link href="/kontakt" className="mt-4 block text-xs font-semibold text-primary hover:underline">
                  Fehlende Punkte umsetzen →
                </Link>
              )}
            </div>
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
      name: "GEO Optimierung",
      provider: { "@type": "Organization", name: "SeoForge" },
      serviceType: "Generative Engine Optimization",
      areaServed: "Deutschland, Österreich, Schweiz",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Ersetzt GEO Optimierung klassisches SEO?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nein. GEO und SEO sind komplementär. Google-Rankings bleiben wichtig. GEO-Optimierung adressiert den wachsenden Anteil von Informationssuchen, die über KI-Assistenten stattfinden — und die von klassischem SEO-Ranking nicht erfasst werden. Wir empfehlen, beides parallel zu betreiben.",
          },
        },
        {
          "@type": "Question",
          name: "Wie lange dauert es, bis GEO-Optimierung wirkt?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Technische Maßnahmen (Schema.org, Entity-Verankerung) zeigen erste Effekte in 4–8 Wochen. Inhaltliche Maßnahmen (Citation Bait, Authority Content) brauchen 3–6 Monate, bis KI-Systeme die neuen Inhalte indexieren und einbeziehen. GEO ist kein Sprint.",
          },
        },
        {
          "@type": "Question",
          name: "Was kostet eine GEO Optimierung?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Abhängig von Scope, Anzahl der Seiten und gewünschter Plattform-Abdeckung. Wir erstellen nach einem kostenlosen Erstgespräch ein individuelles Angebot. Als Orientierung: ein fokussiertes Optimierungspaket für einen Kernbereich startet ab 1.500 €.",
          },
        },
        {
          "@type": "Question",
          name: "Können Sie GEO-Optimierung auch für bestehende Inhalte durchführen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja. Wir analysieren Ihren bestehenden Content auf GEO-Potenziale und optimieren ihn gezielt — das ist oft effizienter als komplett neue Inhalte zu erstellen.",
          },
        },
        {
          "@type": "Question",
          name: "Brauche ich zuerst einen GEO Audit bevor wir mit der Optimierung starten?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Empfohlen, aber nicht zwingend. Ein Audit liefert die Datenbasis für priorisierte Maßnahmen. Wenn Sie in einem klar definierten Bereich starten wollen (z.B. nur Schema.org-Implementierung), können wir auch ohne Audit beginnen.",
          },
        },
      ],
    },
  ],
}

export default function OptimierungPageClient() {
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
          src="/images/geo-optimierung-visual-v2.webp"
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
            <defs><pattern id="hero-dots-opt" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#ffffff" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#hero-dots-opt)" />
          </svg>
        </div>

        {/* Centered content */}
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center py-32">
          {/* Eyebrow label */}
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-8 block animate-[fadeUp_0.5s_ease_forwards]">/ GEO OPTIMIERUNG</span>

          {/* H1 — line-by-line reveal, white text */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-[family-name:var(--font-heading)] text-white mb-8 leading-[1.05]">
            <span className="block overflow-hidden pb-1">
              <span className="block animate-[lineReveal_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                Mehr Präsenz
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="block animate-[lineReveal_0.7s_cubic-bezier(0.16,1,0.3,1)_0.12s_forwards]">
                in <span className="text-[#C2722A]">KI-Antworten</span>
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light animate-[fadeUp_0.6s_ease_0.3s_forwards]">
            Wir optimieren Ihre Inhalte, technische Basis und Authority Signals — damit KI-Systeme Ihre Marke sehen, verstehen und zitieren.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mb-14 animate-[fadeUp_0.6s_ease_0.45s_forwards]">
            <Link href="/kontakt" className="px-8 py-4 bg-[#C2722A] text-white rounded-xl font-semibold hover:bg-[#A85E22] transition-all shadow-lg shadow-[#C2722A]/30">
              Optimierung anfragen
            </Link>
            <a href="#massnahmen" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
              Maßnahmen entdecken ↓
            </a>
          </div>

          {/* Inline stat — compact, no big card */}
          <div className="flex justify-center gap-10 border-t border-white/10 pt-10 animate-[fadeUp_0.6s_ease_0.6s_forwards]">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C2722A] font-[family-name:var(--font-heading)] mb-1">
                <TypewriterStat value="40%" inView={heroInView} delay={800} />
              </div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">häufiger zitiert mit Schema.org</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80 font-[family-name:var(--font-heading)] mb-1">3 Ebenen</div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">Technisch, Inhalt, Authority</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80 font-[family-name:var(--font-heading)] mb-1">Schema.org</div>
              <div className="text-xs text-white/50 font-mono uppercase tracking-widest">KI-lesbare Struktur</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — BEFORE/AFTER                                    */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / GEO OPTIMIERUNG VORHER/NACHHER
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Was GEO-Optimierung an Ihrer Online-Präsenz verändert
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-2 max-w-2xl">
            Klassisches SEO optimiert für Algorithmen. GEO optimiert dafür, dass KI-Systeme Ihre Marke als
            glaubwürdige Quelle einordnen. Mehr über{" "}
            <Link href="/geo" className="text-[#C2722A] hover:underline font-medium">
              GEO als Disziplin
            </Link>
            .
          </p>

          <div className="mt-10 grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Left */}
            <div
              className="flex flex-col justify-center border border-stone-300 rounded-xl p-6"
            >
              <h3 className="font-semibold text-[#1A1A1A] mb-4">Klassische SEO-Signale</h3>
              <ul className="space-y-2">
                {[
                  "Backlinks (Domain Authority)",
                  "Keyword-Dichte",
                  "Seitenladezeit",
                  "Meta-Tags",
                  "Interne Verlinkung",
                  "Mobile-First-Indexing",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#6B6B6B]/70 mt-4 leading-relaxed">
                Wichtig für Google-Rankings — aber KI-Systeme nutzen diese Signale nur indirekt.
              </p>
            </div>

            {/* Right */}
            <div
              className="flex flex-col justify-center border-2 border-[#C2722A] rounded-xl p-6"
            >
              <h3 className="font-semibold text-[#1A1A1A] mb-4">GEO-Signale</h3>
              <ul className="space-y-2">
                {[
                  "Entity-Coverage",
                  "Zitierbarkeit (Fakten/Statistiken/Definitionen)",
                  "Structured Data (Schema.org)",
                  "E-E-A-T-Tiefe (Experten-Credentials)",
                  "Citation Bait (Inhalte die andere zitieren)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                    <svg
                      className="w-4 h-4 text-[#C2722A] shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEO VS GEO TOGGLE — after Section 2 (Before/After) */}
      <SeoVsGeoToggle />

      {/* ============================================================ */}
      {/* SECTION 3 — MASSNAHMEN                                      */}
      {/* ============================================================ */}
      <section id="massnahmen" className="py-24 bg-[#F8F7F5]">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / OPTIMIERUNGSMASSNAHMEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Was wir bei der GEO Optimierung konkret tun
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            Priorisiert nach Impact — wir starten immer mit den Maßnahmen, die am schnellsten Sichtbarkeit aufbauen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                category: "Technisch",
                items: [
                  "Schema.org-Markup (Organization, Product, FAQ, HowTo, Article)",
                  "Wikidata-Entity anlegen / pflegen",
                  "Sitelinks & Google Knowledge Panel",
                  "Strukturierte FAQs",
                ],
              },
              {
                category: "Inhaltlich",
                items: [
                  "Definition Content",
                  "Statistik-Content",
                  "Comparison Content",
                  "Expert Quotes",
                ],
              },
              {
                category: "Authority",
                items: [
                  "Citation Bait",
                  "E-E-A-T-Signale",
                  "Nischen-Direktory-Präsenz",
                ],
              },
            ].map((group) => (
              <div key={group.category}>
                <h3 className="font-semibold text-[#C2722A] uppercase text-xs tracking-widest mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <svg
                        className="w-4 h-4 text-[#D4A853] shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-[#1A1A1A]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#6B6B6B] leading-relaxed mt-10">
            Nicht sicher welche Maßnahmen Ihr Unternehmen zuerst braucht? Ein{" "}
            <Link href="/geo/audit" className="text-[#C2722A] hover:underline font-medium">
              GEO Audit
            </Link>{" "}
            schafft die Datenbasis. Die inhaltliche Dimension decken wir mit der{" "}
            <Link href="/geo/content-strategie" className="text-[#C2722A] hover:underline font-medium">
              GEO Content Strategie
            </Link>{" "}
            ab.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — TECHNISCHE FUNDAMENTE                           */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / TECHNISCHE GEO-BASIS
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Die drei technischen Fundamente der GEO Optimierung
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            Ohne diese Basis interpretieren KI-Systeme Ihre Inhalte falsch — egal wie gut Ihr Content ist.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Strukturierte Daten (Schema.org)",
                desc: "KI-Systeme wie Google's SGE nutzen Schema.org-Markup, um Entities, Fakten und Relationen zu verstehen. Fehlendes oder falsches Markup bedeutet: die KI rät. Mit validiertem Schema.org-Markup geben Sie der KI exakte Informationen.",
                example: "Beispiel: Organization-Markup mit vollständigen Kontaktdaten und Branchenklassifikation.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ),
              },
              {
                title: "Entity-Verankerung (Knowledge Graph)",
                desc: "Ihre Marke muss als Entität existieren — in Wikidata, im Google Knowledge Graph, in Branchenverzeichnissen. Ohne Entity-Verankerung behandelt die KI Ihre Marke als unbekannte Zeichenkette, nicht als bekanntes Unternehmen.",
                example: "Beispiel: Wikidata-Eintrag mit Gründungsjahr, Branche, Gründern.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                ),
              },
              {
                title: "Crawlbarkeit & Indexierungstiefe",
                desc: "Perplexity und andere Retrieval-basierte KI-Systeme crawlen das Web. Seiten mit schlechter Indexierungstiefe, robots.txt-Blockierungen oder dünnem Content werden schlicht nicht als Quellen verwendet.",
                example: "Beispiel: llms.txt-Datei, die KI-Crawlern sagt welche Seiten relevant sind.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ),
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="flex flex-col h-full p-6 rounded-xl border border-border hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#C2722A]/8 hover:border-[#C2722A]/20 transition-all duration-300 cursor-default"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-[#C2722A] flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2">{card.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">{card.desc}</p>
                <p className="text-xs text-[#6B6B6B]/70 italic">{card.example}</p>
              </div>
            ))}
          </div>

          {/* Dark feature split: Schema.org context + code image */}
          <div className="mt-14 rounded-2xl overflow-hidden bg-[#1A1A1A] grid lg:grid-cols-2 min-h-[320px]">
            <div className="p-8 lg:p-10 flex flex-col justify-center text-white">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-4 block">/ SCHEMA.ORG IN DER PRAXIS</span>
              <h3 className="text-2xl lg:text-3xl font-[family-name:var(--font-heading)] mb-4 leading-tight">
                So sieht valides GEO-Markup aus — und warum KI es bevorzugt
              </h3>
              <p className="text-white/70 leading-relaxed text-sm mb-6">
                Ein Organization-Markup mit vollständigen Markendaten gibt KI-Systemen exakte Informationen — statt sie raten zu lassen, wer Sie sind.
              </p>
              <div className="flex flex-col gap-1.5 text-sm font-mono bg-white/5 rounded-xl px-5 py-4 border border-white/10">
                <span className="text-[#D4A853]">{'"@type"'}: <span className="text-white/80">"Organization"</span></span>
                <span className="text-[#D4A853]">{'"name"'}: <span className="text-white/80">"Ihr Unternehmen"</span></span>
                <span className="text-[#D4A853]">{'"sameAs"'}: <span className="text-white/60">["wikidata.org/..."]</span></span>
              </div>
            </div>
            <div className="relative min-h-[260px] lg:min-h-auto">
              <Image
                src="/images/geo-optimierung-technical-v2.webp"
                alt="JSON-LD Schema.org Markup im Code-Editor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1A1A1A]/70" />
            </div>
          </div>
        </div>
      </section>

      {/* GEO READINESS CHECKLIST — after Section 4 (Technical) */}
      <GeoReadinessChecklist />

      {/* ============================================================ */}
      {/* SECTION 5 — ERGEBNISSE MESSEN                               */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="reveal max-w-5xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#C2722A] mb-6 block">
            / GEO OPTIMIERUNG MESSEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-4">
            Wie Sie den Erfolg der GEO Optimierung messen
          </h2>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl">
            GEO-Ergebnisse sind messbar — sie erfordern nur andere Metriken als klassisches SEO.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col justify-center space-y-4">
              {[
                {
                  name: "Brand Mention Rate",
                  desc: "Wie oft erscheint Ihre Marke in KI-Antworten auf branchenrelevante Prompts?",
                },
                {
                  name: "Citation Quality Score",
                  desc: "Werden Sie als Primärquelle genannt oder nur als Randerwähnung?",
                },
                {
                  name: "Plattform-Coverage",
                  desc: "Auf wie vielen der Ziel-Plattformen (ChatGPT, Gemini, Perplexity, Claude) sind Sie sichtbar?",
                },
                {
                  name: "Competitor Delta",
                  desc: "Verhältnis Ihrer Nennungsrate zu der Ihrer Top-3-Wettbewerber",
                },
              ].map((metric) => (
                <div key={metric.name} className="border border-[#E5E3DF] rounded-xl p-5 bg-white hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#C2722A]/8 hover:border-[#C2722A]/20 transition-all duration-300 cursor-default">
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">{metric.name}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{metric.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-semibold text-[#1A1A1A] text-lg mb-4">
                Warum GEO-Metriken sich von SEO-Metriken unterscheiden
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">
                Klassisches SEO misst Rankings, Klickraten und organischen Traffic. Diese Metriken erfassen nicht,
                was in KI-Antworten passiert — denn KI-Antworten erzeugen meist keinen direkten Klick.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                GEO-Metriken messen stattdessen Präsenz, Relevanz und Qualität von Marken-Nennungen in
                KI-generierten Antworten. Das erfordert strukturiertes Prompt-Testing und manuelle Analyse.
              </p>
              <p className="text-sm text-[#6B6B6B]">
                Wir verfolgen diese Metriken systematisch in unserem{" "}
                <Link href="/geo/monitoring" className="text-[#C2722A] hover:underline font-medium">
                  GEO Monitoring
                </Link>
                .
              </p>
            </div>
          </div>
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
            Häufige Fragen zur GEO Optimierung
          </h2>

          <div className="border-t border-[#E5E3DF]">
            <FaqItem
              q="Ersetzt GEO Optimierung klassisches SEO?"
              a="Nein. GEO und SEO sind komplementär. Google-Rankings bleiben wichtig. GEO-Optimierung adressiert den wachsenden Anteil von Informationssuchen, die über KI-Assistenten stattfinden — und die von klassischem SEO-Ranking nicht erfasst werden. Wir empfehlen, beides parallel zu betreiben."
            />
            <FaqItem
              q="Wie lange dauert es, bis GEO-Optimierung wirkt?"
              a="Technische Maßnahmen (Schema.org, Entity-Verankerung) zeigen erste Effekte in 4–8 Wochen. Inhaltliche Maßnahmen (Citation Bait, Authority Content) brauchen 3–6 Monate, bis KI-Systeme die neuen Inhalte indexieren und einbeziehen. GEO ist kein Sprint."
            />
            <FaqItem
              q="Was kostet eine GEO Optimierung?"
              a="Abhängig von Scope, Anzahl der Seiten und gewünschter Plattform-Abdeckung. Wir erstellen nach einem kostenlosen Erstgespräch ein individuelles Angebot. Als Orientierung: ein fokussiertes Optimierungspaket für einen Kernbereich startet ab 1.500 €."
            />
            <FaqItem
              q="Können Sie GEO-Optimierung auch für bestehende Inhalte durchführen?"
              a="Ja. Wir analysieren Ihren bestehenden Content auf GEO-Potenziale und optimieren ihn gezielt — das ist oft effizienter als komplett neue Inhalte zu erstellen."
            />
            <FaqItem
              q="Brauche ich zuerst einen GEO Audit bevor wir mit der Optimierung starten?"
              a="Empfohlen, aber nicht zwingend. Ein Audit liefert die Datenbasis für priorisierte Maßnahmen. Wenn Sie in einem klar definierten Bereich starten wollen (z.B. nur Schema.org-Implementierung), können wir auch ohne Audit beginnen."
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
            / GEO OPTIMIERUNG STARTEN
          </span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] mb-6">
            Bereit, in KI-Antworten
            <br />
            <span>sichtbar zu werden?</span>
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Wir analysieren Ihren GEO-Status und starten mit den Maßnahmen, die am schnellsten wirken.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["Erste Effekte in 4–8 Wochen", "Keine SEO-Kenntnisse nötig", "Laufendes Monitoring optional"].map(
              (b) => (
                <span key={b} className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                  {b}
                </span>
              )
            )}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontakt"
              className="px-8 py-4 bg-[#C2722A] text-white rounded-full font-semibold hover:bg-[#A85E22] transition-all"
            >
              GEO Optimierung anfragen
            </Link>
            <Link
              href="/geo/audit"
              className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
            >
              GEO Audit zuerst
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  )
}
