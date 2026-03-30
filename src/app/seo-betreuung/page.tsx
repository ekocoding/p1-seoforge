"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";
import BetreuungMockup from "./BetreuungMockup";
import WachstumSection from "../components/WachstumSection";

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

const faqs = [
  { q: "Warum reicht eine einmalige SEO-Optimierung nicht aus?", a: "Google ändert seinen Algorithmus über 500 Mal pro Jahr. Ihre Konkurrenz optimiert ständig. Einmalige Maßnahmen verpuffen — kontinuierliche Betreuung sichert und baut Ihre Positionen systematisch aus." },
  { q: "Wie lange dauert es bis ich Ergebnisse sehe?", a: "Erste Verbesserungen nach 1–3 Monaten. Technische Quick Wins wirken sofort. Nachhaltige Rankings entwickeln sich über 6–12 Monate. SEO ist ein Marathon — aber die Wirkung ist langfristig." },
  { q: "Wie laeuft die Zusammenarbeit ab?", a: "Monatlicher Zyklus: 1) Analyse & Audit, 2) Massnahmenplanung nach Impact, 3) Umsetzung durch unser Team, 4) Transparentes Reporting & persönliches Review-Gespräch." },
  { q: "Was unterscheidet SeoForge von anderen Agenturen?", a: "Direkter Kontakt zum Chef — keine Account-Manager. Wir kombinieren klassische SEO mit GEO für KI-Sichtbarkeit. Datengetrieben, transparent, ohne Vertragsfalle." },
  { q: "Kann ich jederzeit kündigen?", a: "Nach 3 Monaten Mindestlaufzeit monatlich kündbar. Wir setzen auf Qualität und Ergebnisse — nicht auf lange Vertragsbindungen." },
  { q: "Was kostet die monatliche Betreuung?", a: "Die Investition richtet sich nach Projektumfang, Wettbewerb und Zielen. Im kostenlosen Erstgespräch erstellen wir ein transparentes, individuelles Angebot." },
];

export default function SEOBetreuungPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [whyRef, whyInView] = useInView();
  const [scopeRef, scopeInView] = useInView();
  const [cycleRef, cycleInView] = useInView();
  const [whoRef, whoInView] = useInView();
  const [investRef, investInView] = useInView();
  const [faqRef, faqInView] = useInView();

  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-secondary/[0.05] to-transparent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32 lg:pt-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary hero-badge">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Monatliche SEO Betreuung
              </div>
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-dark font-[family-name:var(--font-heading)]">
                SEO ist kein Projekt.{" "}<span className="text-primary">SEO ist ein Prozess.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted hero-description">
                Einmalige Maßnahmen verpuffen. Professionelle SEO-Betreuung sichert nicht nur Rankings — sie entwickelt Ihre Website systematisch zur Branchen-Autorität weiter.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                {["Algorithmus-resilient", "KI-Sichtbarkeit", "Monatliches Reporting"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    <span className="text-sm text-muted">{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4 hero-cta">
                <Link href="/kontakt" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-xl">
                  Kostenloses Erstgespräch
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="#leistungen" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary/30 hover:text-primary">
                  Leistungsumfang
                </Link>
              </div>
            </div>
            <BetreuungMockup />
          </div>
        </div>
      </section>


      {/* WARUM BETREUUNG — Eyecatcher: Before/After timeline */}
      <section ref={whyRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`transition-all duration-700 ${whyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Realität</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark leading-tight mb-6">
                Warum laufende SEO Betreuung?
              </h2>
              <p className="text-lg text-muted">Google ändert seinen Algorithmus über <strong className="text-dark">500 Mal pro Jahr</strong>. Ihre Konkurrenz optimiert taeglich. Nur kontinuierliche Betreuung hält Ihre Positionen — und baut sie aus.</p>
            </div>

            {/* 4 Reasons as creative cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Algorithmus-Resilienz", desc: "Proaktive Anpassung an Google Core Updates. Wir reagieren nicht erst wenn Rankings fallen — wir antizipieren.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>, color: "border-t-primary" },
                { title: "Topical Authority", desc: "Systematischer Aufbau von Themen-Clustern. E-E-A-T-Signale die Sie zur vertrauenswuerdigsten Quelle machen.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>, color: "border-t-primary" },
                { title: "ROI-Fokus", desc: "Nicht nur Traffic — Conversion-Rate und Lead-Qualität messbar steigern. Jede Maßnahme hat ein Geschäftsziel.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: "border-t-primary" },
                { title: "Datenbasierte Agilität", desc: "Laufendes Monitoring von Rankings, Wettbewerb und Suchintentionen. Schnelle Kurskorrekturen bei Veränderungen.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>, color: "border-t-primary" },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <div className={`rounded-2xl ${item.color} border-t-[3px] border border-border bg-white p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">{item.icon}</div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-2">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WACHSTUM */}
      <WachstumSection />

      {/* LEISTUNGSUMFANG — Bento grid with featured card */}
      <section id="leistungen" ref={scopeRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`mb-14 transition-all duration-700 ${scopeInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Alles inklusive</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Was in Ihrer Betreuung steckt</h2>
            <p className="text-lg text-muted max-w-2xl">Sechs Disziplinen, ein Ziel: Ihre Website jeden Monat stärker machen.</p>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 delay-200 ${scopeInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Featured large card */}
            <div className="md:col-span-2 rounded-2xl border-2 border-primary/15 bg-gradient-to-br from-primary/[0.03] to-secondary/[0.02] p-8 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">KERN</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark mt-3 mb-2">Strategisches Monitoring</h3>
                  <p className="text-muted leading-relaxed">Rankings, KI-Zitationen, Wettbewerb — wir behalten alles im Blick. Marktveränderungen und Content-Gaps erkennen wir früh und reagieren proaktiv, bevor Sie Positionen verlieren.</p>
                </div>
              </div>
            </div>

            {/* Regular cards */}
            {[
              { num: "02", title: "On-Page & Semantik", desc: "Schema-Markups, Verlinkung, Pillar Pages. Thematische Autorität stärken." },
              { num: "03", title: "Technisches SEO", desc: "Core Web Vitals, Crawlbarkeit, Indexierung. Performance-Perfektion." },
              { num: "04", title: "Content-Evolution", desc: "Content Refresh + neue Artikel. Evergreen-Assets die wachsen." },
              { num: "05", title: "Linkbuilding", desc: "Hochwertige Backlinks. Qualität und Relevanz statt Masse." },
              { num: "06", title: "GEO / KI-Sichtbarkeit", desc: "ChatGPT, Gemini, Perplexity. Featured Snippets & AI Overviews." },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5">
                  <span className="text-3xl font-bold text-primary/10 font-[family-name:var(--font-heading)]">{item.num}</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark mt-2 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MONATLICHER ZYKLUS — 2x2 Flywheel grid */}
      <section ref={cycleRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${cycleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Der Zyklus</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Jeden Monat vier Phasen</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Kein Anfang, kein Ende — ein Kreislauf der Ihre Website mit jeder Runde stärker macht.</p>
          </div>

          <div className={`relative transition-all duration-700 delay-200 ${cycleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Center flywheel icon (desktop) */}
            <div className="hidden lg:flex absolute inset-0 items-center justify-center z-10 pointer-events-none">
              <div className="w-24 h-24 rounded-full bg-white border-2 border-primary/20 shadow-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
              </div>
            </div>
            {/* Connecting lines (desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-[25%] right-[25%] h-px bg-border -translate-y-1/2" />
            <div className="hidden lg:block absolute left-1/2 top-[15%] bottom-[15%] w-px bg-border -translate-x-1/2" />

            <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
              {[
                { num: "01", title: "Analysieren", sub: "Daten sammeln", desc: "Rankings, Traffic, Technik, Wettbewerb und KI-Sichtbarkeit prüfen. Wo stehen wir? Was hat sich verändert?", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>, color: "border-t-primary" },
                { num: "02", title: "Priorisieren", sub: "Impact-Matrix", desc: "Quick Wins zuerst, große Hebel parallel. Jede Maßnahme nach ROI sortiert. Kein Giesskannenprinzip.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>, color: "border-t-secondary" },
                { num: "03", title: "Umsetzen", sub: "Hands-on", desc: "Technik, Content, Links — alles aus einer Hand implementieren. Keine Delegation, keine Verzögerung.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.76-3.35a.9.9 0 010-1.56l5.76-3.35a.9.9 0 01.9 0l5.76 3.35a.9.9 0 010 1.56l-5.76 3.35a.9.9 0 01-.9 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.66 11.82v4.68a.9.9 0 00.45.78l5.76 3.35a.9.9 0 00.9 0l5.76-3.35a.9.9 0 00.45-.78v-4.68" /></svg>, color: "border-t-primary" },
                { num: "04", title: "Reporten", sub: "Transparent", desc: "Monatsbericht mit allen KPIs + persönliches Strategiegespräch. Sie wissen immer, woran wir arbeiten.", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>, color: "border-t-secondary" },
              ].map((step) => (
                <div key={step.num} className={`rounded-2xl ${step.color} border-t-[3px] border border-border bg-white p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.08] text-primary">{step.icon}</div>
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark">{step.title}</h3>
                        <p className="text-xs text-primary font-medium">{step.sub}</p>
                      </div>
                    </div>
                    <span className="text-3xl font-bold text-primary/10 font-[family-name:var(--font-heading)]">{step.num}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FUER WEN — Horizontal scrolling cards */}
      <section ref={whoRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={`grid lg:grid-cols-12 gap-12 items-center transition-all duration-700 ${whoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="lg:col-span-4">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Für wen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">Ist unsere Betreuung das Richtige für Sie?</h2>
              <p className="text-muted leading-relaxed mb-6">Unsere SEO Betreuung ist der richtige Schritt für alle, die SEO nicht als einmaliges Projekt, sondern als Wachstumsstrategie verstehen.</p>
              <Link href="/kontakt" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                Erstgespräch vereinbaren
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {[
                { title: "Etablierte Unternehmen", desc: "Rankings absichern, systematisch ausbauen, Marktposition verteidigen. Für alle die organischen Traffic als Geschäftsgrundlage verstehen.", tag: "Wachstum sichern" },
                { title: "E-Commerce & Online-Shops", desc: "Produkt-Rankings, Kategorie-Traffic und KI-Shopping-Empfehlungen kontinuierlich steigern. Mehr organischer Umsatz, Monat für Monat.", tag: "Umsatz steigern" },
                { title: "B2B, SaaS & Industrie", desc: "Topical Authority in Nischenmärkten aufbauen. Qualifizierte Leads generieren durch Content der die richtigen Entscheider erreicht.", tag: "Leads generieren" },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="flex items-start gap-5 rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold shadow-md font-[family-name:var(--font-heading)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-dark">{item.title}</h3>
                        <span className="hidden sm:inline text-[10px] font-semibold text-primary bg-primary/[0.08] px-2.5 py-1 rounded-full shrink-0">{item.tag}</span>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INVESTITION — Split card */}
      <section ref={investRef as React.RefObject<HTMLElement>} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className={`transition-all duration-700 ${investInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Die Investition</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Nachhaltiges Wachstum hat einen Preis</h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">Individuell, transparent, ohne Ueberraschungen.</p>
            </div>

            <div className="rounded-3xl border border-border bg-offwhite/30 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 lg:p-10">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-6">Was bestimmt die Investition?</h3>
                  <ul className="space-y-4">
                    {[
                      { title: "Projektumfang", desc: "Website-Größe, Keywords, Content-Bedarf" },
                      { title: "Wettbewerb", desc: "Branchenspezifische Konkurrenzsituation" },
                      { title: "Ihre Ziele", desc: "Traffic, Leads, Umsatz, Markenaufbau" },
                      { title: "Ausgangssituation", desc: "Technischer Zustand, bestehende Autorität" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">{i + 1}</span>
                        <div><p className="text-sm font-semibold text-dark">{item.title}</p><p className="text-xs text-muted">{item.desc}</p></div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 lg:p-10 bg-white border-l border-border">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-6">Was Sie erwarten können</h3>
                  <div className="space-y-4 mb-6">
                    {[
                      { label: "Traffic-Wachstum", value: "+40–120%" },
                      { label: "ROI-Timeline", value: "6–12 Monate" },
                      { label: "Vertragslaufzeit", value: "Flexibel" },
                      { label: "Kündbarkeit", value: "Monatlich" },
                    ].map((m) => (
                      <div key={m.label} className="flex items-center justify-between pb-3 border-b border-border/50 last:border-0 last:pb-0">
                        <span className="text-sm text-muted">{m.label}</span>
                        <span className="text-sm font-bold text-dark">{m.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/kontakt" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-lg">
                    Individuelles Angebot
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef as React.RefObject<HTMLElement>} className="bg-offwhite py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">FAQ</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark">Häufig gestellte Fragen</h2>
          </div>
          <div className={`space-y-3 transition-all duration-700 delay-100 ${faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white overflow-hidden transition-colors hover:border-primary/20">
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

      {/* KONTAKTFORMULAR */}
      <section className="bg-white py-24 lg:py-32" id="kontakt">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Kontakt</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">Erstgespräch vereinbaren</h2>
            <p className="text-lg text-muted">Wir besprechen Ihre Situation und erstellen ein individuelles Betreuungskonzept.</p>
          </div>
          <div className="rounded-3xl border border-border bg-offwhite/30 p-8 lg:p-10">
            <form className="space-y-5" action="/kontakt" method="POST">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label htmlFor="bt-name" className="block text-sm font-medium text-dark mb-2">Name *</label><input type="text" id="bt-name" name="name" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Ihr Name" /></div>
                <div><label htmlFor="bt-email" className="block text-sm font-medium text-dark mb-2">E-Mail *</label><input type="email" id="bt-email" name="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="ihre@email.de" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label htmlFor="bt-url" className="block text-sm font-medium text-dark mb-2">Website</label><input type="url" id="bt-url" name="website" className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="https://ihre-website.de" /></div>
                <div><label htmlFor="bt-co" className="block text-sm font-medium text-dark mb-2">Unternehmen</label><input type="text" id="bt-co" name="company" className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Ihr Unternehmen" /></div>
              </div>
              <div><label htmlFor="bt-msg" className="block text-sm font-medium text-dark mb-2">Was sind Ihre SEO-Ziele? (optional)</label><textarea id="bt-msg" name="message" rows={3} className="w-full resize-none px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" placeholder="Rankings verbessern, mehr Traffic, Leads generieren..." /></div>
              <button type="submit" className="w-full rounded-full bg-primary px-6 py-4 text-base font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20">Erstgespräch anfragen</button>
              <p className="text-center text-xs text-muted">* Pflichtfelder | Antwort innerhalb von 24 Stunden</p>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32 bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.08] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/[0.06] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            Bereit für kontinuierliches{" "}<span className="text-primary">Wachstum</span>?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">Lassen Sie uns besprechen, wie wir Ihre SEO auf das nächste Level bringen.</p>
          <Link href="/kontakt" className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary-dark hover:shadow-xl transition-all">
            Erstgespräch vereinbaren
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <div className="grid md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
            <div className="text-center"><p className="text-3xl font-bold text-primary mb-2">+127%</p><p className="text-sm text-white/50">Traffic-Wachstum</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-secondary mb-2">12 Mon.</p><p className="text-sm text-white/50">Durchschn. Laufzeit</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-primary mb-2">98%</p><p className="text-sm text-white/50">Kundenzufriedenheit</p></div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
