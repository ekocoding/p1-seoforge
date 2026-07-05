"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "@/app/components/SubpageLayout";
import FaqAccordion from "@/app/components/FaqAccordion";
import WachstumSection from "@/app/components/WachstumSection";
import { TOOL_LOGOS } from "@/app/components/TrustSection";


function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const dur = 1800, start = performance.now();
    const tick = (now: number) => { const p = Math.min((now - start) / dur, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value)); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [value]);
  return (<div className="text-center"><p className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">{count}{suffix}</p><p className="text-sm text-muted">{label}</p></div>);
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (<div className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>);
}

const faqs = [
  { q: "Warum reicht eine einmalige SEO-Optimierung nicht aus?", a: "Google ändert seinen Algorithmus über 500 Mal pro Jahr. Ihre Konkurrenz optimiert ständig. Einmalige Maßnahmen verpuffen — kontinuierliche Betreuung sichert und baut Ihre Positionen systematisch aus." },
  { q: "Wie lange dauert es bis ich Ergebnisse sehe?", a: "Erste Verbesserungen nach 1–3 Monaten. Technische Quick Wins wirken sofort. Nachhaltige Rankings entwickeln sich über 6–12 Monate. SEO ist ein Marathon — aber die Wirkung ist langfristig." },
  { q: "Wie laeuft die Zusammenarbeit ab?", a: "Monatlicher Zyklus: 1) Analyse & Audit, 2) Massnahmenplanung nach Impact, 3) Umsetzung durch unser Team, 4) Transparentes Reporting & persönliches Review-Gespräch." },
  { q: "Was unterscheidet SeoForge von anderen Agenturen?", a: "Direkter Kontakt zum Chef — keine Account-Manager. Wir kombinieren klassische SEO mit GEO für KI-Sichtbarkeit. Datengetrieben, transparent, ohne Vertragsfalle." },
  { q: "Kann ich jederzeit kündigen?", a: "Nach 3 Monaten Mindestlaufzeit monatlich kündbar. Wir setzen auf Qualität und Ergebnisse — nicht auf lange Vertragsbindungen." },
  { q: "Was kostet die monatliche Betreuung?", a: "Die Investition richtet sich nach Projektumfang, Wettbewerb und Zielen. Im kostenlosen Erstgespräch erstellen wir ein transparentes, individuelles Angebot." },
  { q: "Was passiert, wenn ich kündige — gehen Rankings verloren?", a: "Rankings, die durch gute Inhalte, saubere Technik und relevante Backlinks entstanden sind, verschwinden nicht automatisch, weil die Betreuung endet. Ohne laufende Pflege verlieren Sie aber tendenziell an Boden, weil Wettbewerber aktiv bleiben und Google seine Bewertungskriterien fortlaufend anpasst. Kündigen Sie, bleibt der bisherige Stand zunächst erhalten und verwässert schrittweise statt schlagartig. Gerade gut rankende Websites profitieren deshalb von kontinuierlicher Betreuung." },
  { q: "Deckt die Betreuung auch KI-Sichtbarkeit (ChatGPT & Co.) ab?", a: "Ja. Neben klassischen Google-Rankings arbeiten wir auch an Ihrer Sichtbarkeit in ChatGPT, Perplexity und den AI Overviews von Google, kurz GEO genannt. Beide Disziplinen hängen enger zusammen, als es zunächst scheint, denn KI-Systeme greifen häufig auf dieselben Inhalte und Signale zurück wie die klassische Suche. Wir behandeln SEO und GEO deshalb als ein gemeinsames Arbeitsfeld, nicht als zwei getrennte Leistungen." },
];

export default function SeoBetreuungClient() {
  const [activeArea, setActiveArea] = useState<number>(-1);

  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO — Full-bleed magazine cover, image behind, text floats left */}
      <style>{`
        @media (max-width: 768px) {
          .betreuung-content { width: 100% !important; padding: 100px 24px 48px !important; }
          .betreuung-h1 { font-size: 36px !important; }
          .betreuung-section-inner { padding: 0 24px !important; grid-template-columns: 1fr !important; gap: 40px !important; }
          .betreuung-section-inner-3col { padding: 0 24px !important; grid-template-columns: 1fr !important; gap: 40px !important; }
          .betreuung-header-inner { padding: 40px 24px 32px !important; }
        }
      `}</style>
      <section style={{ position: "relative", height: "92vh", minHeight: "680px", overflow: "hidden", background: "#0F0F0F" }}>

        {/* Full-bleed photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/seo/betreuung-hero.jpg"
          alt="SEO Betreuung"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 80%" }}
        />

        {/* Left gradient — white fade so text is readable, opens up on right */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(105deg, #FAFAF8 0%, #FAFAF8 38%, rgba(250,250,248,0.96) 50%, rgba(250,250,248,0.70) 62%, rgba(250,250,248,0.10) 78%, transparent 100%)",
        }} />

        {/* Bottom vignette — subtle grounding */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", pointerEvents: "none",
          background: "linear-gradient(to top, rgba(250,250,248,0.6), transparent)",
        }} />

        {/* Decorative "×" */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "-80px", left: "-40px",
          fontFamily: "var(--font-heading)", fontSize: "560px", fontWeight: 700, lineHeight: 1,
          color: "rgba(194,114,42,0.05)", userSelect: "none", pointerEvents: "none", zIndex: 2,
          letterSpacing: "-0.05em",
        }}>×</div>

        {/* Content — left column, sits over gradient */}
        <div className="betreuung-content" style={{
          position: "relative", zIndex: 10,
          minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "88px 80px 48px 80px", width: "58vw", maxWidth: "860px",
        }}>

          {/* Overline */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px" }}>
            <div style={{ width: "36px", height: "1px", background: "#C2722A", opacity: 0.7 }} />
            <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "#C2722A" }}>
              Monatliche SEO-Betreuung
            </span>
            <div style={{ width: "20px", height: "1px", background: "#C2722A", opacity: 0.3 }} />
          </div>

          {/* Headline — 2–3 natural lines, no forced word breaks */}
          <h1 className="betreuung-h1" style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(52px, 5.2vw, 76px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#0F0F0F",
            marginBottom: "20px",
          }}>
            SEO ist kein Projekt.<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#C2722A" }}>Es ist ein System.</em>
          </h1>

          {/* Orange rule */}
          <div style={{ width: "48px", height: "2px", background: "#C2722A", opacity: 0.55, marginBottom: "18px" }} />

          {/* Subheadline */}
          <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.8, color: "rgba(15,15,15,0.60)", maxWidth: "680px", marginBottom: "12px" }}>
            Einmalige SEO-Maßnahmen verpuffen — das kennen viele Unternehmen. Rankings steigen kurz, dann stagnieren sie, und mit jedem Google-Update verliert man wieder Boden. Professionelle SEO-Betreuung funktioniert anders: Sie entwickelt Ihre Website Monat für Monat systematisch weiter, baut echte Autorität in Ihrer Branche auf und sichert das, was Sie sich erarbeitet haben.
          </p>

          {/* Supporting copy */}
          <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.8, color: "rgba(15,15,15,0.60)", maxWidth: "680px", marginBottom: "24px" }}>
            Google aktualisiert seinen Algorithmus über 500 Mal pro Jahr. Ihre Mitbewerber optimieren täglich. Ohne kontinuierliche Betreuung verlieren Sie Rankings still und leise — oft, bevor Sie es in Ihren Traffic-Zahlen sehen. Mit SeoForge bekommen Sie einen festen Ansprechpartner, der Ihre Website kennt, Chancen erkennt und konsequent umsetzt.
          </p>

          {/* Key inclusions — 3 bullet points */}
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "Monatliches Ranking- & Wettbewerbs-Monitoring",
              "Technisches SEO, Content-Ausbau & Linkbuilding",
              "Transparentes Reporting + direkter Ansprechpartner",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13.5px", color: "rgba(15,15,15,0.65)", lineHeight: 1.5 }}>
                <svg style={{ flexShrink: 0, marginTop: "2px", color: "#C2722A" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
            <Link
              href="#jetzt-starten"
              style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", textDecoration: "none", color: "#FAFAF8", background: "#C2722A", padding: "14px 40px", display: "inline-block", transition: "opacity .2s" }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = ".82")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Erstgespräch vereinbaren
            </Link>
            <Link
              href="#leistungen"
              style={{ fontSize: "12px", fontWeight: 400, color: "rgba(15,15,15,0.40)", textDecoration: "none", letterSpacing: ".06em", borderBottom: "1px solid rgba(15,15,15,0.18)", paddingBottom: "2px" }}
            >
              Leistungsumfang ansehen
            </Link>
          </div>

        </div>

        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, rgba(194,114,42,0.5), transparent)" }} />
          <span style={{ fontSize: "8px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(15,15,15,0.2)" }}>Scroll</span>
        </div>
      </section>


      {/* SOFTWARE CAROUSEL — 2 counter-rotating rows */}
      <section style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <style>{`
          @keyframes btr-ltr { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
          @keyframes btr-rtl { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
          .btr-row-ltr { animation: btr-ltr 36s linear infinite; }
          .btr-row-rtl { animation: btr-rtl 28s linear infinite; }
        `}</style>

        {/* Header */}
        <div className="betreuung-header-inner" style={{ textAlign: "center", padding: "72px 40px 52px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "22px" }}>
            <div style={{ width: "32px", height: "1px", background: "#C2722A", opacity: 0.65 }} />
            <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".32em", textTransform: "uppercase", color: "#C2722A" }}>
              Unsere Werkzeuge
            </span>
            <div style={{ width: "32px", height: "1px", background: "#C2722A", opacity: 0.65 }} />
          </div>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(20px, 2.8vw, 40px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#0F0F0F",
            margin: "0 auto 24px",
          }}>
            Enterprise Software für die bestmögliche SEO-Betreuung
          </h2>
          <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.85, color: "rgba(15,15,15,0.55)", maxWidth: "860px", margin: "0 auto" }}>
            Wir arbeiten ausschließlich mit den führenden Plattformen der Branche — von technischen Crawlern bis zu KI-gestützten Rankinganalysen. Jedes Tool wird gezielt eingesetzt, um Ihre spezifische Situation zu analysieren und die richtigen Hebel zu identifizieren. Keine Bauchgefühle, keine Standardrezepte — nur belastbare Daten, die echte Entscheidungen ermöglichen.
          </p>
        </div>

        {/* Row 1 — LTR, original order */}
        <div style={{ position: "relative", overflow: "hidden", marginBottom: "20px" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "140px", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to right, #fff 20%, transparent)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "140px", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to left, #fff 20%, transparent)" }} />
          <div className="btr-row-ltr" style={{ display: "flex", alignItems: "center", gap: "72px", width: "max-content", padding: "10px 0" }}>
            {[...TOOL_LOGOS.slice(0,4), ...TOOL_LOGOS.slice(0,4), ...TOOL_LOGOS.slice(0,4)].map((Logo, i) => <Logo key={i} />)}
          </div>
        </div>

        {/* Row 2 — RTL, second half of logos */}
        <div style={{ position: "relative", overflow: "hidden", paddingBottom: "64px" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "140px", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to right, #fff 20%, transparent)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "140px", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to left, #fff 20%, transparent)" }} />
          <div className="btr-row-rtl" style={{ display: "flex", alignItems: "center", gap: "72px", width: "max-content", padding: "10px 0" }}>
            {[...TOOL_LOGOS.slice(4), ...TOOL_LOGOS.slice(4), ...TOOL_LOGOS.slice(4), ...TOOL_LOGOS.slice(4), ...TOOL_LOGOS.slice(4)].map((Logo, i) => <Logo key={`r${i}`} />)}
          </div>
        </div>
      </section>

      {/* WARUM BETREUUNG — Enterprise editorial split-column */}
      <section style={{ background: "#FAFAF8", padding: "120px 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="betreuung-section-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "100px", alignItems: "center" }}>

          {/* LEFT — sticky editorial anchor */}
          <div className="transition-all duration-700 reveal" style={{ position: "sticky", top: "120px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "28px", height: "1px", background: "#C2722A", opacity: 0.7 }} />
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "#C2722A" }}>Die Realität</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 2.4vw, 38px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0F0F0F", marginBottom: "16px" }}>
              Warum laufende SEO-Betreuung?
            </h2>
            <div style={{ width: "36px", height: "2px", background: "#C2722A", opacity: 0.5, marginBottom: "18px" }} />
            <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.85, color: "rgba(15,15,15,0.52)", marginBottom: "16px" }}>
              Google ändert seinen Algorithmus über <strong style={{ color: "#0F0F0F", fontWeight: 600 }}>500 Mal pro Jahr</strong>. Wer heute auf Seite 1 steht, kann morgen auf Seite 3 abrutschen — nicht wegen eigener Fehler, sondern weil sich die Spielregeln geändert haben. Einmalige SEO-Maßnahmen haben keine Chance, mit diesem Tempo Schritt zu halten.
            </p>
            <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.85, color: "rgba(15,15,15,0.52)", marginBottom: "16px" }}>
              Ihre Mitbewerber schlafen nicht. Während Sie auf Ihren einmaligen SEO-Bericht warten, optimieren sie Inhalte, bauen Backlinks auf und verbessern ihre technische Performance — Monat für Monat. Kontinuierliche Betreuung ist kein Luxus, sondern der Mindesteinsatz im modernen SEO-Wettbewerb.
            </p>
            <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.85, color: "rgba(15,15,15,0.52)", marginBottom: "16px" }}>
              Nachhaltiges Wachstum entsteht durch Zinseszinseffekte: Jede Optimierung baut auf der vorherigen auf. Ein Backlink heute stärkt die Domain-Autorität für alle künftigen Inhalte. Ein Content-Cluster heute erleichtert das Ranking neuer Seiten morgen. Dieser Effekt lässt sich nicht einmalig erkaufen — er muss systematisch aufgebaut werden.
            </p>
          </div>

          {/* RIGHT — numbered editorial list */}
          <div className="transition-all duration-700 delay-150 reveal">
            {[
              { num: "01", icon: "resilienz", title: "Algorithmus-Resilienz", desc: "Google Core Updates können Rankings über Nacht verschieben. Wir beobachten jeden Update-Zyklus aktiv und passen Ihre Strategie proaktiv an — nicht erst wenn der Traffic einbricht." },
              { num: "02", icon: "authority", title: "Topical Authority", desc: "Einzelne Keywords gewinnen Sie mit Tricks. Dauerhaft sichtbar werden Sie durch systematischen Aufbau von Themen-Clustern. E-E-A-T-Signale machen Sie zur vertrauenswürdigsten Quelle in Ihrer Nische." },
              { num: "03", icon: "roi", title: "ROI-Fokus", desc: "Traffic ist kein Selbstzweck. Jede Maßnahme hat ein Geschäftsziel — mehr qualifizierte Leads, höhere Conversion-Rate, messbaren Umsatz. Wir optimieren auf das, was zählt." },
              { num: "04", icon: "agilitaet", title: "Datenbasierte Agilität", desc: "Kontinuierliches Monitoring von Rankings, Wettbewerb und Suchintentionen gibt uns den Vorsprung. Wir erkennen Chancen früh und reagieren auf Veränderungen, bevor sie zur Bedrohung werden." },
            ].map((item, i) => (
              <div key={item.num} style={{
                display: "grid", gridTemplateColumns: "64px 1fr", gap: "24px", alignItems: "start",
                paddingTop: i === 0 ? "0" : "36px", paddingBottom: "36px",
                borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.07)" : "none",
              }}>
                <Image src={`/images/betreuung-icons/${item.icon}.png`} alt="" width={48} height={48} style={{ width: "48px", height: "48px", objectFit: "contain" }} />
                <div style={{ paddingTop: "6px" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "21px", fontWeight: 700, color: "#0F0F0F", marginBottom: "10px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.85, color: "rgba(15,15,15,0.52)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BETREUUNGSMONAT — Editorial fact sheet, mono week labels */}
      <section style={{ background: "#fff", padding: "120px 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <style>{`
          @media (max-width: 768px) {
            .btm-split { grid-template-columns: 1fr !important; gap: 36px !important; }
            .btm-row { grid-template-columns: 1fr !important; gap: 10px !important; }
          }
        `}</style>
        <div className="betreuung-section-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>

          {/* Header row */}
          <div className="btm-split transition-all duration-700 reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end", marginBottom: "56px", paddingBottom: "44px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "28px", height: "1px", background: "#C2722A", opacity: 0.7 }} />
                <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "#C2722A" }}>Der Ablauf</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 2.8vw, 42px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0F0F0F", margin: 0 }}>
                So sieht ein<br />Betreuungsmonat aus
              </h2>
            </div>
            <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.85, color: "rgba(15,15,15,0.52)", margin: 0, paddingBottom: "4px" }}>
              Viele Kunden fragen sich, was in einem SEO-Betreuungsmonat tatsächlich passiert, außer dass am Ende ein Report im Postfach landet. Bei uns folgt jeder Monat einem Ablauf aus Analyse, Umsetzung, Monitoring und Abstimmung, der sich an Ihrer Website und der aktuellen Wettbewerbssituation ausrichtet statt an einem starren Schema.
            </p>
          </div>

          {/* 4 editorial rows — mono label left, copy right */}
          <div>
            {[
              { label: "Woche 1", title: "Analyse & Priorisierung", desc: "Wir werten die aktuellen Daten aus Google Search Console, Semrush und Ahrefs aus und ordnen ein, wo die größten Potenziale liegen. Daraus entsteht eine Prioritätenliste nach Aufwand und Wirkung, nicht danach, was sich am schnellsten abhaken lässt." },
              { label: "Woche 2–3", title: "Umsetzung", desc: "In diesen zwei Wochen setzen wir die priorisierten Maßnahmen um, von technischen Korrekturen über Content-Überarbeitung bis zu strukturellen Änderungen an der Seite. Dank unserer CI/CD-Pipeline sind Anpassungen innerhalb von Minuten live, ein Wartefenster wie bei klassischen Deployment-Prozessen kennen wir nicht." },
              { label: "Laufend", title: "Monitoring", desc: "Rankings, Sichtbarkeit in der klassischen Suche und zunehmend auch in KI-Antworten wie ChatGPT oder Perplexity beobachten wir während des gesamten Monats, nicht nur zu festen Stichtagen. So fällt uns ein Ranking-Einbruch oder ein technisches Problem auf, bevor er sich negativ in Ihrem nächsten Report niederschlägt." },
              { label: "Monatsende", title: "Reporting & Abstimmung", desc: "Zum Monatsende bündeln wir die Ergebnisse und besprechen mit Ihnen, was als Nächstes Priorität hat. In diesem Gespräch passen wir bei Bedarf auch die Ausrichtung für den kommenden Monat an, etwa wenn sich Wettbewerb oder Geschäftsschwerpunkte verschoben haben." },
            ].map((step, i) => (
              <Reveal key={step.label} delay={i * 100}>
                <div className="btm-row" style={{
                  display: "grid", gridTemplateColumns: "180px 1fr", gap: "48px", alignItems: "start",
                  paddingTop: i === 0 ? "0" : "36px", paddingBottom: i === 3 ? "0" : "36px",
                  borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.07)" : "none",
                }}>
                  <span style={{ fontFamily: "var(--font-mono), ui-monospace, 'SFMono-Regular', Menlo, monospace", fontSize: "11px", fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase", color: "#C2722A", paddingTop: "7px" }}>
                    {step.label}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "21px", fontWeight: 700, color: "#0F0F0F", marginBottom: "10px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.85, color: "rgba(15,15,15,0.52)", maxWidth: "760px", margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENZ & REPORTING — Report-Panel mit Mono-Header */}
      <section style={{ background: "#FAFAF8", padding: "120px 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="betreuung-section-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: "90px", alignItems: "center" }}>

          {/* LEFT — copy */}
          <div className="transition-all duration-700 reveal">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "1px", background: "#C2722A", opacity: 0.7 }} />
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "#C2722A" }}>Ihr Monatsreport</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 2.4vw, 38px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0F0F0F", marginBottom: "16px" }}>
              Transparenz &amp; Reporting
            </h2>
            <div style={{ width: "36px", height: "2px", background: "#C2722A", opacity: 0.5, marginBottom: "18px" }} />
            <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.85, color: "rgba(15,15,15,0.52)", marginBottom: "16px" }}>
              Ein SEO-Report, den niemand versteht, nützt niemandem. Unser monatliches Reporting zeigt die Entwicklung Ihrer Rankings für die vereinbarten Keywords, den organischen Traffic im Zeitverlauf, welche Maßnahmen wir im abgelaufenen Monat konkret umgesetzt haben und was als Nächstes ansteht. Da Sichtbarkeit heute auch in ChatGPT, Perplexity und den AI Overviews von Google stattfindet, fließt die Entwicklung Ihrer KI-Sichtbarkeit ebenfalls in den Bericht ein.
            </p>
            <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.85, color: "rgba(15,15,15,0.52)", margin: 0 }}>
              Dabei arbeiten wir nicht mit intern geschönten Auswertungen, die Sie nie zu Gesicht bekommen: Sie sehen dieselben Daten aus Google Search Console, Semrush und Ahrefs, mit denen auch wir arbeiten. Weil Rankings allein noch keine Rechnung bezahlen, ordnen wir die Ergebnisse zusätzlich in eine{" "}
              <Link
                href="/seo/betreuung/roi"
                style={{ color: "#C2722A", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px", textDecorationColor: "rgba(194,114,42,0.4)", transition: "text-decoration-color .2s" }}
                onMouseOver={(e) => (e.currentTarget.style.textDecorationColor = "#C2722A")}
                onMouseOut={(e) => (e.currentTarget.style.textDecorationColor = "rgba(194,114,42,0.4)")}
              >
                ROI-Analyse
              </Link>{" "}
              ein, die zeigt, was die Betreuung wirtschaftlich tatsächlich einbringt.
            </p>
          </div>

          {/* RIGHT — Report panel */}
          <div className="transition-all duration-700 delay-150 reveal">
            <div style={{ background: "#fff", border: "1px solid #E5E3DF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 60px rgba(15,15,15,0.06)" }}>

              {/* Mono header row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: "1px solid #E5E3DF", background: "#FAFAF8" }}>
                <span style={{ fontFamily: "var(--font-mono), ui-monospace, 'SFMono-Regular', Menlo, monospace", fontSize: "10px", fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(15,15,15,0.45)" }}>
                  Monatsreport
                </span>
                <div style={{ display: "flex", gap: "6px" }} aria-hidden="true">
                  <span style={{ display: "block", width: "8px", height: "8px", borderRadius: "50%", background: "#E5E3DF" }} />
                  <span style={{ display: "block", width: "8px", height: "8px", borderRadius: "50%", background: "#D4A853" }} />
                  <span style={{ display: "block", width: "8px", height: "8px", borderRadius: "50%", background: "#C2722A" }} />
                </div>
              </div>

              {/* 4 report items */}
              {[
                { title: "Ranking-Entwicklung", desc: "Positionsveränderungen der vereinbarten Keywords im Zeitverlauf, nicht nur eine Momentaufnahme." },
                { title: "Organischer Traffic", desc: "Besucherentwicklung aus der Suche, aufgeschlüsselt nach den wichtigsten Landingpages." },
                { title: "Umgesetzte Maßnahmen", desc: "Eine nachvollziehbare Liste dessen, was im Monat tatsächlich passiert ist." },
                { title: "Nächste Schritte", desc: "Die priorisierten Punkte für den kommenden Monat, mit kurzer Begründung." },
              ].map((item, i) => (
                <div key={item.title} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: "16px", alignItems: "start", padding: "22px 24px", borderBottom: i < 3 ? "1px solid #EDEAE3" : "none" }}>
                  <span style={{ fontFamily: "var(--font-mono), ui-monospace, 'SFMono-Regular', Menlo, monospace", fontSize: "11px", fontWeight: 500, letterSpacing: ".08em", color: "#C2722A", paddingTop: "3px" }}>
                    0{i + 1}
                  </span>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F0F0F", marginBottom: "4px" }}>{item.title}</p>
                    <p style={{ fontSize: "13px", fontWeight: 300, lineHeight: 1.7, color: "rgba(15,15,15,0.52)", margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WACHSTUM */}
      <WachstumSection />

      {/* LEISTUNGSUMFANG — Dark editorial index */}
      <section id="leistungen" style={{ background: "#111111", padding: "120px 0" }}>
        <div className="betreuung-section-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>

          {/* Header row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-20 transition-all duration-700 reveal"
            style={{ alignItems: "end", marginBottom: "64px", paddingBottom: "48px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "28px", height: "1px", background: "#C2722A", opacity: 0.7 }} />
                <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "#C2722A" }}>Alles inklusive</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 3.2vw, 48px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#F0EAE0", margin: 0 }}>
                Was in Ihrer<br />Betreuung steckt
              </h2>
            </div>
            <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.85, color: "rgba(240,234,224,0.38)", margin: 0, paddingBottom: "4px" }}>
              Sechs Disziplinen — ein Ziel: Ihre Website jeden Monat stärker machen. Keine Baustellen, keine Lücken. Alles aus einer Hand, mit einem festen Ansprechpartner.
            </p>
          </div>

          {/* 6 items — 2 column, 3 row editorial grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 transition-all duration-700 delay-150 reveal">
            {[
              { num: "01", title: "Strategisches Monitoring", desc: "Rankings, KI-Zitationen und Wettbewerb im Blick. Content-Gaps früh erkennen — bevor Sie Positionen verlieren." },
              { num: "02", title: "On-Page & Semantik", desc: "Schema-Markups, interne Verlinkung, Pillar Pages. Thematische Autorität, die Google nachhaltig belohnt." },
              { num: "03", title: "Technisches SEO", desc: "Core Web Vitals, Crawlbarkeit, Indexierung. Performance-Perfektion als dauerhaftes Fundament." },
              { num: "04", title: "Content-Evolution", desc: "Content Refresh und neue Zielartikel. Evergreen-Assets, die mit jedem Monat stärker werden." },
              { num: "05", title: "Linkbuilding", desc: "Hochwertige Backlinks aus relevanten Quellen. Qualität und Relevanz statt Masse — sicher und nachhaltig." },
              { num: "06", title: "GEO / KI-Sichtbarkeit", desc: "ChatGPT, Gemini, Perplexity. Featured Snippets und AI Overviews — die neue Dimension der Sichtbarkeit." },
            ].map((item, i) => {
              const col = i % 2;
              const row = Math.floor(i / 2);
              const isLastRow = row === 2;
              return (
                <div key={item.num} style={{
                  padding: "40px 0",
                  paddingRight: col === 0 ? "64px" : "0",
                  paddingLeft: col === 1 ? "64px" : "0",
                  borderBottom: !isLastRow ? "1px solid rgba(255,255,255,0.06)" : "none",
                  borderLeft: col === 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  display: "grid", gridTemplateColumns: "52px 1fr", gap: "20px", alignItems: "start",
                }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "52px", fontWeight: 700, lineHeight: 1, color: "rgba(194,114,42,0.15)", letterSpacing: "-0.03em" }}>
                    {item.num}
                  </span>
                  <div style={{ paddingTop: "8px" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 700, color: "#F0EAE0", marginBottom: "10px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "13.5px", fontWeight: 300, lineHeight: 1.85, color: "rgba(240,234,224,0.42)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom note */}
          <div className="transition-all duration-700 delay-300 reveal"
            style={{ marginTop: "64px", paddingTop: "48px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontSize: "14px", fontWeight: 300, color: "rgba(240,234,224,0.35)", letterSpacing: ".02em" }}>
              Alle Leistungen monatlich kündbar — kein Vertragszwang.
            </p>
          </div>
        </div>
      </section>

      {/* ADAPTIVE BETREUUNG */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-16 transition-all duration-700 reveal">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Wie wir arbeiten</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-dark mb-4">Kein Fahrplan. Ein Kompass.</h2>
            <p className="text-lg text-muted max-w-2xl">SEO folgt keinem fixen Kalender — es folgt den Daten. Was im Januar Priorität hat, entscheidet die aktuelle Situation, nicht ein Schema. So funktioniert adaptive Betreuung.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 transition-all duration-700 delay-150 reveal">

            {/* LEFT — Erstanalyse dark card */}
            <div className="rounded-3xl overflow-hidden bg-[#111111] p-8 lg:p-10">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary/70">Start</span>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#F0EAE0]">Erstanalyse</h3>
                  </div>
                </div>
                <p className="text-sm text-[#F0EAE0]/50 leading-relaxed">
                  Bevor wir eine einzige Maßnahme umsetzen, verstehen wir Ihre Website vollständig: technischer Zustand, Content-Lücken, Wettbewerbs-Situation und Ihre konkreten Geschäftsziele.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  { title: "Technischer Full-Audit", desc: "Core Web Vitals, Crawlbarkeit, Indexierung" },
                  { title: "Keyword-Gap Analyse", desc: "Was rankt die Konkurrenz, was fehlt Ihnen" },
                  { title: "Content-Inventar", desc: "Vorhandenes bewerten, Lücken identifizieren" },
                  { title: "Wettbewerbs-Benchmarking", desc: "Wo stehen Sie im Vergleich" },
                  { title: "KPI-Definition", desc: "Was ist Erfolg für Ihr Unternehmen" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 rounded-xl bg-white/[0.04] border border-white/[0.06] p-3.5">
                    <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" /></svg>
                    <div>
                      <p className="text-sm font-semibold text-[#F0EAE0]">{item.title}</p>
                      <p className="text-xs text-[#F0EAE0]/40 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-primary/[0.12] border border-primary/20 p-4 flex items-center gap-3">
                <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm text-[#F0EAE0]/80 font-medium">Ergebnis: Ihr individueller SEO-Fahrplan</span>
              </div>
            </div>

            {/* RIGHT — Adaptive monthly priorities */}
            <div>
              <div className="mb-5">
                <p className="text-sm font-semibold text-dark mb-1">Ab Monat 1: Prioritäten folgen den Daten</p>
                <p className="text-sm text-muted">Klicken Sie auf einen Bereich, um zu sehen was dort monatlich passiert.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  {
                    title: "Technisches SEO",
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.76-3.35a.9.9 0 010-1.56l5.76-3.35a.9.9 0 01.9 0l5.76 3.35a.9.9 0 010 1.56l-5.76 3.35a.9.9 0 01-.9 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.66 11.82v4.68a.9.9 0 00.45.78l5.76 3.35a.9.9 0 00.9 0l5.76-3.35a.9.9 0 00.45-.78v-4.68" /></svg>,
                    brief: "Core Web Vitals, Crawlbarkeit, Indexierung",
                    items: ["Core Web Vitals Monitoring & Fixes", "Crawl-Budget Optimierung", "Technische Fehler beheben", "Schema Markup Updates", "JavaScript-Rendering Checks"]
                  },
                  {
                    title: "Content-Aufbau",
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
                    brief: "Neue Artikel, Content-Updates, Briefings",
                    items: ["Content-Gap Artikel erstellen", "Bestehende Seiten aktualisieren", "Pillar Pages ausbauen", "Content-Briefings liefern", "E-E-A-T Signale stärken"]
                  },
                  {
                    title: "Backlink-Aufbau",
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
                    brief: "Hochwertige Verlinkungen aufbauen",
                    items: ["Hochwertige Link-Quellen identifizieren", "Digitale PR & Gastbeiträge", "Broken-Link-Building", "Link-Qualität überwachen", "Toxische Links disavowen"]
                  },
                  {
                    title: "Monitoring & Analyse",
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
                    brief: "Rankings, Traffic, Wettbewerb beobachten",
                    items: ["Ranking-Veränderungen tracken", "Wettbewerber-Bewegungen beobachten", "Traffic-Anomalien erkennen", "Google Algorithm Updates einschätzen", "Monatsbericht & Strategiegespräch"]
                  },
                ].map((area, i) => (
                  <button
                    key={area.title}
                    onClick={() => setActiveArea(activeArea === i ? -1 : i)}
                    className={`text-left rounded-2xl border-2 p-5 transition-all duration-300 ${
                      activeArea === i
                        ? "border-primary bg-primary/[0.04] shadow-lg shadow-primary/10"
                        : "border-border bg-white hover:border-primary/30 hover:shadow-md"
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl mb-3 transition-colors ${activeArea === i ? "bg-primary text-white" : "bg-primary/[0.08] text-primary"}`}>
                      {area.icon}
                    </div>
                    <h3 className={`font-[family-name:var(--font-heading)] font-bold mb-1 transition-colors ${activeArea === i ? "text-primary" : "text-dark"}`}>
                      {area.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">{area.brief}</p>
                  </button>
                ))}
              </div>

              {/* Detail panel */}
              <div className={`overflow-hidden transition-all duration-500 ${activeArea >= 0 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                {activeArea >= 0 && (
                  <div className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-5">
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-primary mb-3">
                      Was wir monatlich im Bereich {["Technik", "Content", "Links", "Monitoring"][activeArea]} tun
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        ["Core Web Vitals Monitoring & Fixes", "Crawl-Budget Optimierung", "Technische Fehler beheben", "Schema Markup Updates", "JavaScript-Rendering Checks"],
                        ["Content-Gap Artikel erstellen", "Bestehende Seiten aktualisieren", "Pillar Pages ausbauen", "Content-Briefings liefern", "E-E-A-T Signale stärken"],
                        ["Hochwertige Link-Quellen identifizieren", "Digitale PR & Gastbeiträge", "Broken-Link-Building", "Link-Qualität überwachen", "Toxische Links disavowen"],
                        ["Ranking-Veränderungen tracken", "Wettbewerber-Bewegungen beobachten", "Traffic-Anomalien erkennen", "Google Algorithm Updates einschätzen", "Monatsbericht & Strategiegespräch"],
                      ][activeArea].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-dark/70">
                          <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-xl bg-offwhite border border-border p-4">
                <p className="text-xs text-muted leading-relaxed">
                  <strong className="text-dark font-semibold">Wie entscheidet sich die monatliche Gewichtung?</strong> Durch Daten: Ranking-Veränderungen, technische Befunde, Content-Gaps und Wettbewerbs-Moves. Was am dringendsten ist, bekommt die meiste Aufmerksamkeit — jeden Monat neu bewertet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUER WEN — Horizontal scrolling cards */}
      <section className="bg-offwhite py-24 lg:py-32 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center transition-all duration-700 reveal">
            <div className="lg:col-span-4">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Für wen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mb-4">Ist unsere Betreuung das Richtige für Sie?</h2>
              <p className="text-muted leading-relaxed mb-6">Unsere SEO Betreuung ist der richtige Schritt für alle, die SEO nicht als einmaliges Projekt, sondern als Wachstumsstrategie verstehen.</p>
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
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="transition-all duration-700 reveal">
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
                <div className="p-8 lg:p-10 bg-white border-l border-border flex flex-col">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-3">Investition, die sich verzinst</h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">SEO wirkt über Zinseszins: Die Investition bleibt planbar, der Ertrag wächst überproportional. Ab dem Break-even arbeitet Ihre Seite für Sie.</p>

                  <div className="relative">
                    <svg viewBox="0 0 340 210" className="w-full h-auto" role="img" aria-label="Schematischer Verlauf: Investition gegen Ertrag über die Zeit">
                      <style>{`
                        @keyframes roiDraw { to { stroke-dashoffset: 0; } }
                        @keyframes roiFade { to { opacity: 1; } }
                        .roi-l { stroke-dasharray: 440; stroke-dashoffset: 440; animation: roiDraw 1.7s ease-out forwards; }
                        .roi-l2 { animation-delay: .2s; }
                        .roi-rev, .roi-dot, .roi-belab { opacity: 0; animation: roiFade .6s ease-out forwards; animation-delay: 1.35s; }
                      `}</style>
                      <line x1="40" y1="22" x2="40" y2="190" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                      <line x1="40" y1="190" x2="324" y2="190" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                      <path className="roi-rev" d="M195 120 C 235 84 285 60 316 44 L 316 96 L 195 120 Z" fill="rgba(194,114,42,0.12)" />
                      <path className="roi-l" d="M44 158 L 316 96" fill="none" stroke="#9b9b9b" strokeWidth="2.5" strokeLinecap="round" />
                      <path className="roi-l roi-l2" d="M44 182 C 120 176 165 148 195 120 C 235 84 285 60 316 44" fill="none" stroke="#C2722A" strokeWidth="3" strokeLinecap="round" />
                      <g className="roi-dot">
                        <line x1="195" y1="120" x2="195" y2="190" stroke="rgba(194,114,42,0.35)" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="195" cy="120" r="5" fill="#fff" stroke="#C2722A" strokeWidth="2.5" />
                      </g>
                      <text className="roi-belab" x="195" y="205" textAnchor="middle" fontSize="9" fill="rgba(15,15,15,0.5)" fontWeight="600">Break-even</text>
                      <text x="46" y="18" fontSize="9" fill="rgba(15,15,15,0.4)">Wert</text>
                      <text x="300" y="185" fontSize="9" fill="rgba(15,15,15,0.4)">Zeit</text>
                    </svg>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-dark"><span className="inline-block w-4 h-[3px] rounded bg-[#9b9b9b]" />Investition</span>
                    <span className="inline-flex items-center gap-1.5 text-dark"><span className="inline-block w-4 h-[3px] rounded bg-primary" />Ertrag</span>
                    <span className="text-muted">ohne Mindestlaufzeit · monatlich kündbar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAUFZEIT & FAIRNESS — Kompaktes dunkles Statement */}
      <section style={{ background: "#111111", padding: "96px 0" }}>
        <div className="betreuung-section-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: "90px", alignItems: "start" }}>

          {/* LEFT — heading anchor */}
          <div className="transition-all duration-700 reveal">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "1px", background: "#C2722A", opacity: 0.7 }} />
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "#C2722A" }}>Faire Zusammenarbeit</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 2.6vw, 40px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#F0EAE0", marginBottom: "18px" }}>
              Laufzeit &amp; Fairness
            </h2>
            <div style={{ width: "36px", height: "2px", background: "#C2722A", opacity: 0.5 }} />
          </div>

          {/* RIGHT — copy */}
          <div className="transition-all duration-700 delay-150 reveal">
            <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.9, color: "rgba(240,234,224,0.5)", marginBottom: "20px" }}>
              Seriöse SEO-Arbeit braucht Zeit. Erste messbare Effekte zeigen sich in der Regel nach drei bis sechs Monaten, weil Google neue Inhalte und technische Änderungen erst crawlen, bewerten und einordnen muss, bevor sich das in den Rankings niederschlägt. Wer Ihnen signifikante Ergebnisse nach zwei oder drei Wochen verspricht, verspricht etwas, das technisch kaum haltbar ist. Diese Zeitspanne ändert aber nichts daran, dass die vertragliche Bindung fair bleiben muss und nicht länger laufen sollte, als für seriöse Arbeit nötig ist.
            </p>
            <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.9, color: "rgba(240,234,224,0.5)", margin: 0 }}>
              Deshalb bieten wir SEO-Betreuung auch{" "}
              <Link
                href="/seo/betreuung/ohne-vertrag"
                style={{ color: "#C2722A", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "4px", textDecorationColor: "rgba(194,114,42,0.45)", transition: "text-decoration-color .2s" }}
                onMouseOver={(e) => (e.currentTarget.style.textDecorationColor = "#C2722A")}
                onMouseOut={(e) => (e.currentTarget.style.textDecorationColor = "rgba(194,114,42,0.45)")}
              >
                ohne Mindestlaufzeit
              </Link>{" "}
              an, für Kunden, die sich nicht langfristig binden möchten oder uns zunächst im laufenden Betrieb kennenlernen wollen. Die monatliche Kündbarkeit ist dabei kein Kompromiss, sondern Prinzip: Wenn wir uns jeden Monat neu bewähren müssen, bleibt die Qualität unserer Arbeit die einzige Bindung, die zählt, nicht eine Unterschrift aus dem ersten Monat.
            </p>
          </div>
        </div>
      </section>

      {/* ── DEEP DIVE LINKS ── */}
      <section className="bg-white py-24 lg:py-32 border-t border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold tracking-[.2em] uppercase text-primary">Tiefer eintauchen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark mt-3">
              Alles zur SEO Betreuung im Detail
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">

            {/* Card 1 — ROI Analyse */}
            <Link href="/seo/betreuung/roi"
              className="group relative overflow-hidden rounded-3xl border border-dark/[0.08] bg-dark p-8 lg:p-10 flex flex-col hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
            >
              {/* Background number */}
              <span className="absolute -right-4 -top-8 font-[family-name:var(--font-heading)] text-[160px] font-bold leading-none select-none pointer-events-none"
                style={{ color: "rgba(194,114,42,0.08)" }}>01</span>

              {/* Tag */}
              <div className="flex items-center gap-2 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/30 bg-primary/10 rounded-full px-3 py-1">
                  Kostenloser Rechner
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">/ ROI Analyse</span>
              </div>

              {/* Heading */}
              <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                Was bringt SEO-Betreuung wirklich?<br />Rechnen Sie es nach.
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
                Kein Bauchgefühl, keine Versprechen — nur Zahlen. Geben Sie Ihre Ausgaben und aktuelle Situation ein und sehen Sie, ab wann sich laufende SEO-Betreuung für Sie rechnet.
              </p>

              {/* Feature bullets */}
              <div className="flex flex-col gap-2.5 mb-10">
                {[
                  "Interaktiver ROI-Rechner mit Branchenvergleich",
                  "Break-Even-Analyse: Ab wann rechnet es sich?",
                  "SEO vs. Google Ads — der langfristige Vergleich",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm text-white/55">{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold group-hover:bg-primary/90 transition-colors">
                  Zum ROI-Rechner
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
                  </svg>
                </span>
                <span className="text-xs text-white/25">kostenlos & anonym</span>
              </div>
            </Link>

            {/* Card 2 — Ohne Vertrag */}
            <Link href="/seo/betreuung/ohne-vertrag"
              className="group relative overflow-hidden rounded-3xl border border-dark/[0.08] bg-offwhite p-8 lg:p-10 flex flex-col hover:border-primary/30 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-dark/[0.06] hover:-translate-y-1"
            >
              {/* Background number */}
              <span className="absolute -right-4 -top-8 font-[family-name:var(--font-heading)] text-[160px] font-bold leading-none select-none pointer-events-none"
                style={{ color: "rgba(26,26,26,0.04)" }}>02</span>

              {/* Tag */}
              <div className="flex items-center gap-2 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-dark/60 border border-dark/15 rounded-full px-3 py-1">
                  Kein Risiko
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-dark/30">/ Ohne Vertrag</span>
              </div>

              {/* Heading */}
              <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                Monatlich kündbar.<br />Ohne Wenn und Aber.
              </h3>
              <p className="text-dark/50 text-sm leading-relaxed mb-8 max-w-md">
                Keine Mindestlaufzeit, keine versteckten Klauseln. Sie starten, wenn Sie bereit sind — und hören auf, wenn Sie möchten. Was das konkret bedeutet und warum wir das anbieten können, erfahren Sie hier.
              </p>

              {/* Feature bullets */}
              <div className="flex flex-col gap-2.5 mb-10">
                {[
                  "Monatliche Kündigung ab dem ersten Tag",
                  "Transparenter Preisunterschied: Vertrag vs. Ohne",
                  "Wann sich welches Modell für Sie lohnt",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm text-dark/50">{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark text-white rounded-full text-sm font-semibold group-hover:bg-primary transition-colors duration-300">
                  Flexibilität erkunden
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/>
                  </svg>
                </span>
                <span className="text-xs text-dark/25">kein Vertrag notwendig</span>
              </div>
            </Link>

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
                SEO-Betreuung,<br />die liefert
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">Wir übernehmen die Arbeit, Sie behalten die Kontrolle. Starten Sie mit einem kostenlosen Erstgespräch — unverbindlich und ohne Mindestlaufzeit.</p>
              <div className="space-y-4">
                {[
                  { title: "Transparentes Monitoring", desc: "Sie sehen jederzeit, was wir tun — mit monatlichen Reports, die wirklich verständlich sind." },
                  { title: "Monatliche Strategie-Reviews", desc: "Wir analysieren Fortschritte, passen die Strategie an und halten Sie auf dem Laufenden." },
                  { title: "Flexible Zusammenarbeit", desc: "Keine starren Pakete. Wir arbeiten so, wie es zu Ihrem Unternehmen passt." },
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
                  Erstgespräch vereinbaren
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
      {/* FAQ */}
      <section className="bg-offwhite py-24 lg:py-32 border-t border-border">
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
    </SubpageLayout>
  );
}
