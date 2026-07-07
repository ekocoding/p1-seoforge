"use client";

import { useState } from "react";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";
import FaqAccordion from "../components/FaqAccordion";

const subpages = [
  {
    num: "01", title: "SEO Audit", href: "/seo/audit", tag: "Analyse",
    brief: "Technische Basis legen",
    desc: "Ein vollständiger technischer Audit zeigt genau wo Ihre Website steht und welche Hebel den größten Impact haben. Crawlbarkeit, Core Web Vitals, Indexierung, Backlink-Profil — alles auf einen Blick.",
    bullets: ["Technischer Full-Audit", "Keyword-Gap Analyse", "Wettbewerbs-Benchmarking", "Priorisierte Maßnahmenliste"],
  },
  {
    num: "02", title: "SEO Beratung", href: "/seo/beratung", tag: "Strategie",
    brief: "Strategie vor Umsetzung",
    desc: "Bevor irgendetwas umgesetzt wird, braucht es eine klare Strategie. Keyword-Mapping, Wettbewerbsanalyse und eine realistische Roadmap — damit jeder Schritt zielgerichtet ist.",
    bullets: ["Keyword-Strategie & Mapping", "Wettbewerber-Analyse", "SEO-Roadmap mit Prioritäten", "GEO / KI-Sichtbarkeit berücksichtigt"],
  },
  {
    num: "03", title: "SEO Betreuung", href: "/seo/betreuung", tag: "Laufend",
    brief: "Kontinuierlich stärker werden",
    desc: "SEO ist kein Projekt — es ist ein System. Monatliche Betreuung die sich an Daten orientiert, nicht an einem fixen Kalender. Adaptiv, transparent, ohne Vertragsbindung.",
    bullets: ["Monatliches Monitoring & Reporting", "Technisches SEO, Content & Links", "Kein Fahrplan — ein Kompass", "Flexibel kündbar"],
  },
  {
    num: "04", title: "Content Strategie", href: "/seo/content-strategie", tag: "Content",
    brief: "Content der systematisch rankt",
    desc: "Zufallsartikel bringen keine Rankings. Topic Clusters, Keyword Mapping und ein strukturierter Redaktionskalender bauen Topical Authority auf — die Basis für nachhaltige Sichtbarkeit.",
    bullets: ["Topic Cluster Aufbau", "Keyword Mapping & Priorisierung", "Redaktionskalender", "E-E-A-T Signale stärken"],
  },
  {
    num: "05", title: "On Page SEO", href: "/seo/on-page", tag: "On-Page",
    brief: "Technik, Content und UX als System",
    desc: "On Page SEO funktioniert nur wenn Technik, Content und User Experience zusammenspielen. Alle drei Säulen müssen greifen damit Google Ihre Seite versteht und Nutzer konvertieren.",
    bullets: ["Technisches Fundament", "Semantische Content-Optimierung", "UX & Konversionsrate", "Interne Verlinkungsstruktur"],
  },
  {
    num: "06", title: "On Page Optimierung", href: "/seo/on-page-optimierung", tag: "Optimierung",
    brief: "Jede Seite systematisch stärken",
    desc: "Meta-Tags, Headings, interne Links, Bilder, Speed — über 200 Prüfpunkte pro Seite. Systematisch und messbar, mit direkter Umsetzung im CMS.",
    bullets: ["Meta-Tags & Headings optimieren", "Core Web Vitals (LCP < 2.5s)", "URL-Struktur & interne Links", "Bilder (WebP & Alt-Texte)"],
  },
  {
    num: "07", title: "SEO Optimierung", href: "/seo/optimierung", tag: "Technik",
    brief: "Alle Ranking-Faktoren verbessern",
    desc: "SEO Optimierung umfasst alle technischen und inhaltlichen Maßnahmen die Ihre Sichtbarkeit verbessern. Von der Seitenstruktur bis zum Backlink-Profil — systematisch und datenbasiert.",
    bullets: ["Technische Optimierung", "Content-Optimierung", "Off-Page & Backlinks", "Lokale SEO-Faktoren"],
  },
  {
    num: "08", title: "SEO selbst machen", href: "/seo/selbst-machen", tag: "Guide",
    brief: "Schritt für Schritt zum Ranking",
    desc: "Für alle die SEO selbst in die Hand nehmen wollen: Ein strukturierter Guide von der Keyword-Recherche bis zur technischen Optimierung — für Einsteiger und Fortgeschrittene.",
    bullets: ["Keyword-Recherche Grundlagen", "Technisches SEO Basis-Check", "Content-Erstellung", "Erste Backlinks aufbauen"],
  },
  {
    num: "09", title: "SEO Texte", href: "/seo/texte", tag: "Content",
    brief: "Content der rankt und konvertiert",
    desc: "Keyword-optimierte Inhalte für Websites, Blogs und Produktseiten — geschrieben für Suchmaschinen und Menschen. Mit Rankingwirkung und ohne generisches Filler-Content.",
    bullets: ["Keyword-Integration", "Suchintention treffen", "E-E-A-T in Texten", "CTA & Conversion-Fokus"],
  },
];

export default function SeoHubClient() {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Wie lange dauert es bis SEO Ergebnisse zeigt?", acceptedAnswer: { "@type": "Answer", text: "Das hängt von der Ausgangslage, dem Wettbewerb und dem Maßnahmenumfang ab. Erste Bewegungen in den Rankings sind oft nach sechs bis acht Wochen sichtbar. Substanzielle Traffic-Steigerungen entstehen typischerweise nach drei bis sechs Monaten — bei konsistenter Arbeit. In stark umkämpften Märkten muss man realistischerweise mit längeren Zeiträumen rechnen." } },
      { "@type": "Question", name: "Kann ich SEO auch selbst umsetzen?", acceptedAnswer: { "@type": "Answer", text: "Grundlegende Maßnahmen wie Google Search Console einrichten, Title Tags pflegen oder einfache Content-Updates sind eigenständig machbar. Vollständiges DIY-SEO erfordert aber 25–40 Stunden pro Monat und kontinuierliches Fachwissen das sich ständig weiterentwickelt." } },
      { "@type": "Question", name: "Unterscheidet sich SEO für Online-Shops von normalem SEO?", acceptedAnswer: { "@type": "Answer", text: "Ja, deutlich. Shops stehen vor spezifischen Problemen: Tausende Produktseiten mit ähnlichen Texten, Duplicate Content durch Filter-URLs, komplexe Kategoriestrukturen, Schema Markup für Preise und Lagerbestand. Shop SEO erfordert andere Tools, andere Content-Strategien und mehr technisches Fingerspitzengefühl als klassische Website-Optimierung." } },
      { "@type": "Question", name: "Was ist der Unterschied zwischen SEO Beratung und SEO Betreuung?", acceptedAnswer: { "@type": "Answer", text: "Bei der SEO Beratung liefern wir Strategie, Analyse und Entscheidungsgrundlagen — Ihr Team setzt um. Bei der SEO Betreuung übernehmen wir die Umsetzung selbst: monatliche Optimierungen, Reporting, Anpassungen auf Basis aktueller Daten. Welches Modell passt, klären wir im Erstgespräch." } },
      { "@type": "Question", name: "Was macht SeoForge anders als andere Agenturen?", acceptedAnswer: { "@type": "Answer", text: "Kein Account-Manager zwischen Ihnen und der Arbeit. Joel Heuchert betreut jeden Kunden direkt — vom ersten Audit bis zur laufenden Optimierung. Keine Standard-Pakete, keine Vertragsfallen. Alles wird priorisiert nach dem, was für Ihre konkrete Situation den größten Impact hat." } },
    ],
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style>{`
        @media (max-width: 768px) {
          .seo-hero-grid { grid-template-columns: 1fr !important; }
          .seo-hero-left { padding: 80px 28px 40px !important; min-height: 60vh; }
          .seo-hero-right { display: none !important; }
          .seo-menu-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .seo-menu-row { grid-template-columns: 56px 1fr 32px !important; }
          .seo-menu-tag { display: none !important; }
          .seo-menu-expanded { grid-template-columns: 1fr !important; gap: 20px !important; }
          .seo-content-inner { padding: 0 24px !important; }
          .seo-menu-header { grid-template-columns: 1fr !important; gap: 20px !important; }
          .seo-cta-inner { padding: 0 24px !important; }
          .seo-menu-padding { padding: 0 24px !important; }
        }
      `}</style>

      {/* ── HERO — Cinematic Splitscreen ── */}
      <section className="seo-hero-grid" style={{ position: "relative", height: "100vh", minHeight: "700px", display: "grid", gridTemplateColumns: "50% 50%", overflow: "hidden" }}>

        {/* LEFT — Light editorial */}
        <div className="seo-hero-left" style={{ background: "#FAFAF8", display: "flex", flexDirection: "column", justifyContent: "center", padding: "88px 72px 64px 80px", position: "relative" }}>

          {/* Vertical divider line */}
          <div aria-hidden="true" style={{ position: "absolute", right: 0, top: "8%", bottom: "8%", width: "1px", background: "linear-gradient(to bottom, transparent, rgba(194,114,42,0.25), transparent)", zIndex: 10 }} />

          {/* Overline */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "44px" }}>
            <div style={{ width: "36px", height: "1px", background: "#C2722A", opacity: 0.7 }} />
            <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".32em", textTransform: "uppercase", color: "#C2722A" }}>Suchmaschinenoptimierung</span>
            <div style={{ width: "16px", height: "1px", background: "#C2722A", opacity: 0.25 }} />
          </div>

          {/* H1 */}
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(56px, 5vw, 84px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.028em", color: "#0F0F0F", marginBottom: "22px" }}>
            SEO.<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#C2722A" }}>Strukturiert.<br />Nachhaltig.</em>
          </h1>

          {/* Rule */}
          <div style={{ width: "44px", height: "2px", background: "#C2722A", opacity: 0.5, marginBottom: "22px" }} />

          {/* Description */}
          <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.85, color: "rgba(15,15,15,0.52)", maxWidth: "420px", marginBottom: "36px" }}>
            Suchmaschinenoptimierung ist keine Blackbox. Es ist ein System aus Technik, Content und Autorität — das messbar aufgebaut und dauerhaft gepflegt werden muss.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <Link
              href="/kontakt"
              style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", textDecoration: "none", color: "#FAFAF8", background: "#C2722A", padding: "15px 40px", display: "inline-block", transition: "opacity .2s" }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = ".82")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Beratungsgespräch
            </Link>
            <Link
              href="#leistungen"
              style={{ fontSize: "12px", fontWeight: 400, color: "rgba(15,15,15,0.32)", textDecoration: "none", letterSpacing: ".06em", borderBottom: "1px solid rgba(15,15,15,0.18)", paddingBottom: "2px" }}
            >
              Alle SEO Leistungen
            </Link>
          </div>

          {/* Scroll cue */}
          <div style={{ position: "absolute", bottom: "36px", left: "80px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "1px", height: "44px", background: "linear-gradient(to bottom, rgba(194,114,42,0.5), transparent)" }} />
            <span style={{ fontSize: "8px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(15,15,15,0.18)" }}>Scroll</span>
          </div>
        </div>

        {/* RIGHT — Dark visual with subpage mini-grid */}
        <div className="seo-hero-right" style={{ background: "#0A0A0A", display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 72px 64px 72px", position: "relative", overflow: "hidden" }}>

          {/* Ambient glow */}
          <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(194,114,42,0.07) 0%, transparent 68%)", pointerEvents: "none" }} />

          {/* Corner decoration */}
          <div aria-hidden="true" style={{ position: "absolute", top: "-60px", right: "-40px", fontFamily: "var(--font-heading)", fontSize: "360px", fontWeight: 700, lineHeight: 1, color: "rgba(194,114,42,0.03)", userSelect: "none", pointerEvents: "none", letterSpacing: "-0.05em" }}>S</div>

          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={{ width: "20px", height: "1px", background: "#C2722A", opacity: 0.5 }} />
            <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(194,114,42,0.55)" }}>10 Disziplinen</span>
          </div>

          {/* 2-col mini grid of subpages */}
          <div className="seo-menu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", position: "relative", zIndex: 2 }}>
            {subpages.map((p) => (
              <Link
                key={p.num}
                href={p.href}
                style={{
                  textDecoration: "none",
                  padding: "14px 16px",
                  border: "1px solid rgba(255,255,255,0.055)",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.018)",
                  transition: "border-color .25s, background .25s",
                  display: "block",
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(194,114,42,0.45)"; e.currentTarget.style.background = "rgba(194,114,42,0.06)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.055)"; e.currentTarget.style.background = "rgba(255,255,255,0.018)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "11px", fontWeight: 700, color: "rgba(194,114,42,0.38)", letterSpacing: ".04em" }}>{p.num}</span>
                  <span style={{ fontSize: "8px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(240,234,224,0.18)", background: "rgba(255,255,255,0.045)", padding: "2px 7px", borderRadius: "3px" }}>{p.tag}</span>
                </div>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "13.5px", fontWeight: 700, color: "#F0EAE0", margin: 0, lineHeight: 1.25 }}>{p.title}</p>
                <p style={{ fontSize: "10px", color: "rgba(240,234,224,0.28)", margin: "4px 0 0", lineHeight: 1.45 }}>{p.brief}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE SUBPAGE MENU ── */}
      <section id="leistungen" style={{ background: "#111111", padding: "80px 0 0" }}>
        <div className="seo-menu-padding" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}>

          {/* Header */}
          <div
            className="seo-menu-header transition-all duration-700 reveal"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "end", marginBottom: "52px", paddingBottom: "40px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                <div style={{ width: "24px", height: "1px", background: "#C2722A" }} />
                <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "#C2722A" }}>SEO Leistungen</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(30px, 3vw, 48px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#F0EAE0", margin: 0 }}>
                10 SEO-Disziplinen.<br />Eine Strategie.
              </h2>
            </div>
            <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.85, color: "rgba(240,234,224,0.32)", margin: 0 }}>
              Jede Disziplin ist ein Baustein — zusammen bilden sie ein vollständiges SEO-System. Klicken Sie auf einen Bereich um Details zu sehen.
            </p>
          </div>

          {/* Interactive list */}
          <div className="transition-all duration-700 delay-100 reveal">
            {subpages.map((page, i) => (
              <div
                key={page.num}
                style={{
                  borderBottom: i < subpages.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: activeItem === i ? "rgba(194,114,42,0.025)" : "transparent",
                  transition: "background .25s",
                  cursor: "pointer",
                }}
                onClick={() => setActiveItem(activeItem === i ? null : i)}
              >
                {/* Row */}
                <div className="seo-menu-row" style={{ display: "grid", gridTemplateColumns: "68px 1fr 110px 28px", gap: "20px", alignItems: "center", padding: "22px 0" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "42px", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", color: activeItem === i ? "rgba(194,114,42,0.32)" : "rgba(194,114,42,0.1)", transition: "color .3s" }}>
                    {page.num}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.01em", color: activeItem === i ? "#C2722A" : "#F0EAE0", marginBottom: "3px", lineHeight: 1.2, transition: "color .3s" }}>
                      {page.title}
                    </h3>
                    <p style={{ fontSize: "12.5px", color: "rgba(240,234,224,0.32)", margin: 0, lineHeight: 1.4 }}>{page.brief}</p>
                  </div>
                  <span className="seo-menu-tag" style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: activeItem === i ? "rgba(194,114,42,0.85)" : "rgba(240,234,224,0.2)", background: activeItem === i ? "rgba(194,114,42,0.12)" : "rgba(255,255,255,0.04)", padding: "5px 12px", borderRadius: "20px", textAlign: "center", transition: "all .3s", whiteSpace: "nowrap" }}>
                    {page.tag}
                  </span>
                  <svg style={{ color: activeItem === i ? "#C2722A" : "rgba(240,234,224,0.18)", transition: "transform .35s, color .3s", transform: activeItem === i ? "rotate(90deg)" : "rotate(0deg)", flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>

                {/* Expanded panel */}
                <div style={{ overflow: "hidden", maxHeight: activeItem === i ? "440px" : "0", transition: "max-height .45s ease" }}>
                  <div className="seo-menu-expanded" style={{ paddingLeft: "88px", paddingBottom: "36px", display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "start" }}>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.85, color: "rgba(240,234,224,0.48)", marginBottom: "20px" }}>{page.desc}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                        {page.bullets.map((b) => (
                          <div key={b} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <svg style={{ color: "#C2722A", flexShrink: 0 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                            <span style={{ fontSize: "13px", color: "rgba(240,234,224,0.5)" }}>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ paddingTop: "4px" }}>
                      <Link
                        href={page.href}
                        style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: ".13em", textTransform: "uppercase", textDecoration: "none", color: "#0A0A0A", background: "#C2722A", padding: "13px 28px", display: "inline-flex", alignItems: "center", gap: "8px", transition: "opacity .2s", whiteSpace: "nowrap" }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseOver={(e) => (e.currentTarget.style.opacity = ".82")}
                        onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        {page.title}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: "80px" }} />
      </section>

      {/* ── SEO CONTENT ARTICLE ── */}
      <section style={{ background: "#FAFAF8", padding: "120px 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div
          className="seo-content-inner transition-all duration-700 reveal"
          style={{ maxWidth: "820px", margin: "0 auto", padding: "0 40px" }}
        >
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "52px" }}>
            <div style={{ width: "32px", height: "1px", background: "#C2722A", opacity: 0.6 }} />
            <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "#C2722A" }}>SEO Grundlagen</span>
          </div>

          <div style={{ fontFamily: "var(--font-sans)", color: "#0F0F0F" }}>

            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0F0F0F", marginBottom: "20px" }}>
              Was ist SEO — und warum ist es entscheidend?
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "20px" }}>
              SEO — Suchmaschinenoptimierung — ist die Disziplin, die dafür sorgt, dass Ihre Website bei Google und anderen Suchmaschinen gefunden wird. Nicht durch bezahlte Anzeigen, sondern durch organische Sichtbarkeit: die Ergebnisse, denen Nutzer am stärksten vertrauen. Wer verstanden hat wie SEO wirklich funktioniert, begreift schnell warum es eines der wirkungsvollsten Marketing-Instrumente überhaupt ist — mit Wirkung die sich über Jahre aufbaut, nicht über Nacht verpufft.
            </p>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "48px" }}>
              Im Kern beantwortet SEO eine simple Frage: <strong style={{ color: "#0F0F0F", fontWeight: 600 }}>Warum sollte Google Ihre Seite besser bewerten als die Ihrer Mitbewerber?</strong> Die Antwort liegt in drei Säulen: technische Exzellenz, inhaltliche Relevanz und externe Autorität. Wer alle drei konsequent aufbaut, gewinnt — dauerhaft.
            </p>

            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.015em", color: "#0F0F0F", marginBottom: "18px" }}>
              Die drei Säulen moderner Suchmaschinenoptimierung
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "28px" }}>
              Google bewertet Websites nach Hunderten von Signalen — aber am Ende lassen sie sich auf drei fundamentale Bereiche zurückführen:
            </p>

            {/* Three pillars */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "48px" }}>
              {[
                {
                  num: "01", title: "Technisches SEO",
                  desc: "Google muss Ihre Seite crawlen, verstehen und indexieren können. Core Web Vitals, Ladezeiten, mobile Optimierung, saubere URL-Strukturen und fehlerfreie Crawlbarkeit sind keine Kür — sie sind Pflicht.",
                },
                {
                  num: "02", title: "Content & Relevanz",
                  desc: "Jede Seite muss eine klare Suchintention bedienen. Tiefe statt Breite, Expertise statt Filler. E-E-A-T — Experience, Expertise, Authoritativeness, Trustworthiness — ist das Maß das Google anlegt.",
                },
                {
                  num: "03", title: "Autorität & Backlinks",
                  desc: "Externe Links von vertrauenswürdigen Quellen sind nach wie vor einer der stärksten Ranking-Faktoren. Qualität schlägt Quantität — ein Link von einer relevanten, starken Domain ist mehr wert als hundert schwache.",
                },
              ].map((p) => (
                <div key={p.num} style={{ padding: "24px", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "12px", background: "#fff" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "36px", fontWeight: 700, color: "rgba(194,114,42,0.12)", letterSpacing: "-0.03em", lineHeight: 1, display: "block", marginBottom: "8px" }}>{p.num}</span>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 700, color: "#0F0F0F", marginBottom: "10px", letterSpacing: "-0.01em" }}>{p.title}</h3>
                  <p style={{ fontSize: "13.5px", fontWeight: 300, lineHeight: 1.8, color: "rgba(15,15,15,0.52)", margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>

            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.015em", color: "#0F0F0F", marginBottom: "18px" }}>
              Wie SEO in der Praxis funktioniert
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "20px" }}>
              Erfolgreiches SEO beginnt immer mit einer soliden Analyse. Ein <Link href="/seo/audit" style={{ color: "#C2722A", textDecoration: "none", borderBottom: "1px solid rgba(194,114,42,0.3)" }}>SEO Audit</Link> legt offen wo die Website aktuell steht — technisch, inhaltlich und in Bezug auf Autorität. Daraus entsteht eine priorisierte Roadmap: Was bringt den größten Impact in der kürzesten Zeit?
            </p>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "20px" }}>
              Die <Link href="/seo/on-page-optimierung" style={{ color: "#C2722A", textDecoration: "none", borderBottom: "1px solid rgba(194,114,42,0.3)" }}>On Page Optimierung</Link> sorgt dafür, dass jede einzelne Seite optimal auf ihre Ziel-Keywords ausgerichtet ist: Meta-Tags, Heading-Hierarchie, interne Verlinkung, Ladezeiten. Parallel dazu arbeitet eine <Link href="/seo/content-strategie" style={{ color: "#C2722A", textDecoration: "none", borderBottom: "1px solid rgba(194,114,42,0.3)" }}>SEO Content Strategie</Link> daran, thematische Autorität aufzubauen — durch Topic Clusters die zeigen dass Ihre Website das Thema wirklich durchdringt.
            </p>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "48px" }}>
              Das Ergebnis ist kein einmaliger Sprint, sondern kontinuierliches Wachstum. Deshalb ist <Link href="/seo/betreuung" style={{ color: "#C2722A", textDecoration: "none", borderBottom: "1px solid rgba(194,114,42,0.3)" }}>laufende SEO Betreuung</Link> für die meisten Unternehmen das wirkungsvollste Modell: Monat für Monat werden die stärksten Hebel identifiziert und umgesetzt — adaptiv, ohne fixen Kalender.
            </p>

            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.015em", color: "#0F0F0F", marginBottom: "18px" }}>
              Die häufigsten SEO-Fehler — und wie man sie vermeidet
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "24px" }}>
              In der Praxis scheitern viele SEO-Projekte nicht an mangelndem Einsatz, sondern an falschen Prioritäten. Die häufigsten Fehler:
            </p>
            <ul style={{ margin: "0 0 48px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "Keyword-Stuffing statt Relevanz", desc: "Texte die nur aus Keywords bestehen, ranken nicht mehr. Google bewertet semantische Tiefe und den tatsächlichen Mehrwert für den Leser." },
                { title: "Technische Probleme ignorieren", desc: "Fehlende Canonical Tags, Duplicate Content, Crawling-Fehler oder schlechte Core Web Vitals bremsen selbst starken Content aus." },
                { title: "Einmalig optimieren und aufhören", desc: "SEO ist kein Projekt mit Abgabedatum. Algorithmen ändern sich, Wettbewerber optimieren ständig. Kontinuität entscheidet." },
                { title: "Falsche Keywords targetieren", desc: "Traffic-Volumen allein ist kein Erfolgsmaßstab. Keywords mit klarer Kaufabsicht und realistischer Ranking-Chance sind wertvoller als Massen-Keywords ohne Konversionspotential." },
                { title: "Content ohne Strategie produzieren", desc: "Artikel die kein klares Keyword-Ziel haben, keinem Topic Cluster zugeordnet sind und die interne Verlinkung ignorieren — verschwinden im digitalen Nirgendwo." },
              ].map((item) => (
                <li key={item.title} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "14px", alignItems: "start", padding: "16px 20px", background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "10px" }}>
                  <svg style={{ color: "#C2722A", flexShrink: 0, marginTop: "2px" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F0F0F", marginBottom: "4px" }}>{item.title}</p>
                    <p style={{ fontSize: "13px", fontWeight: 300, lineHeight: 1.7, color: "rgba(15,15,15,0.52)", margin: 0 }}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.015em", color: "#0F0F0F", marginBottom: "18px" }}>
              SEO und GEO — Sichtbarkeit im KI-Zeitalter
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "20px" }}>
              Klassisches SEO bleibt das Fundament — aber die Suche verändert sich grundlegend. Google zeigt immer häufiger AI Overviews statt klassischer 10-blaue-Links-Ergebnisse. ChatGPT, Gemini und Perplexity werden zu direkten Anlaufstellen für Informationen. Wer als Unternehmen sichtbar bleiben will, muss neben traditioneller Suchmaschinenoptimierung auch Generative Engine Optimization (GEO) berücksichtigen.
            </p>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "48px" }}>
              GEO bedeutet: Inhalte so strukturieren, formatieren und mit Autorität versehen, dass KI-Systeme sie zitieren und weiterempfehlen. Die gute Nachricht: Wer starkes SEO betreibt, hat für GEO bereits das beste Fundament. Beide Disziplinen laufen bei SeoForge parallel.
            </p>

            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.015em", color: "#0F0F0F", marginBottom: "18px" }}>
              Wann lohnt sich professionelle SEO-Unterstützung?
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "20px" }}>
              <Link href="/seo/selbst-machen" style={{ color: "#C2722A", textDecoration: "none", borderBottom: "1px solid rgba(194,114,42,0.3)" }}>SEO selbst zu machen</Link> ist möglich — für einfache Websites in Märkten mit wenig Wettbewerb. Sobald jedoch Mitbewerber professionell optimieren, der Markt umkämpft ist oder das SEO-Potenzial maßgeblich zum Geschäftserfolg beiträgt, zahlt sich Agenturunterstützung schnell aus.
            </p>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "20px" }}>
              Eine <Link href="/seo/beratung" style={{ color: "#C2722A", textDecoration: "none", borderBottom: "1px solid rgba(194,114,42,0.3)" }}>SEO Beratung</Link> ist oft der sinnvolle erste Schritt: Klarheit über die aktuelle Situation, eine realistische Roadmap und eine Priorisierung die Zeit und Budget schont. Aus der Beratung wird bei vielen Unternehmen eine laufende Partnerschaft — weil die Ergebnisse für sich sprechen.
            </p>
            <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.9, color: "rgba(15,15,15,0.6)", marginBottom: "0" }}>
              Bei SeoForge bekommen Sie direkten Kontakt zum Experten — keine Account-Manager, keine Standard-Pakete. Jedes Projekt wird individuell analysiert, priorisiert und umgesetzt. Das ist der Unterschied zwischen SEO das auf dem Papier funktioniert — und SEO das wirklich rankt.
            </p>
          {/* FAQ */}
            <div style={{ marginTop: "64px", paddingTop: "56px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px, 2.4vw, 36px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.015em", color: "#0F0F0F", marginBottom: "32px" }}>
                Häufige Fragen zu SEO
              </h2>
              <FaqAccordion items={[
                { q: "Wie lange dauert es bis SEO Ergebnisse zeigt?", a: "Das hängt von der Ausgangslage, dem Wettbewerb und dem Maßnahmenumfang ab. Erste Bewegungen in den Rankings sind oft nach sechs bis acht Wochen sichtbar. Substanzielle Traffic-Steigerungen entstehen typischerweise nach drei bis sechs Monaten — bei konsistenter Arbeit. In stark umkämpften Märkten muss man realistischerweise mit längeren Zeiträumen rechnen." },
                { q: "Kann ich SEO auch selbst umsetzen?", a: "Grundlegende Maßnahmen wie Google Search Console einrichten, Title Tags pflegen oder einfache Content-Updates sind eigenständig machbar. Vollständiges DIY-SEO erfordert aber 25–40 Stunden pro Monat und kontinuierliches Fachwissen das sich ständig weiterentwickelt. Unsere Seite SEO selbst machen gibt dazu eine ehrliche Einschätzung." },
                { q: "Unterscheidet sich SEO für Online-Shops von normalem SEO?", a: "Ja, deutlich. Shops stehen vor spezifischen Problemen: Tausende Produktseiten mit ähnlichen Texten, Duplicate Content durch Filter-URLs, komplexe Kategoriestrukturen, Schema Markup für Preise und Lagerbestand. Shop SEO erfordert andere Tools, andere Content-Strategien und mehr technisches Fingerspitzengefühl als klassische Website-Optimierung." },
                { q: "Was ist der Unterschied zwischen SEO Beratung und SEO Betreuung?", a: "Bei der SEO Beratung liefern wir Strategie, Analyse und Entscheidungsgrundlagen — Ihr Team setzt um. Bei der SEO Betreuung übernehmen wir die Umsetzung selbst: monatliche Optimierungen, Reporting, Anpassungen auf Basis aktueller Daten. Welches Modell passt, klären wir im Erstgespräch." },
                { q: "Was macht SeoForge anders als andere Agenturen?", a: "Kein Account-Manager zwischen Ihnen und der Arbeit. Joel Heuchert betreut jeden Kunden direkt — vom ersten Audit bis zur laufenden Optimierung. Keine Standard-Pakete, keine Vertragsfallen. Alles wird priorisiert nach dem, was für Ihre konkrete Situation den größten Impact hat." },
              ]} />
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#0A0A0A", padding: "120px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "640px", height: "640px", borderRadius: "50%", background: "radial-gradient(circle, rgba(194,114,42,0.06) 0%, transparent 68%)", pointerEvents: "none" }} />
        <div className="seo-cta-inner" style={{ position: "relative", maxWidth: "620px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "28px" }}>
            <div style={{ width: "24px", height: "1px", background: "#C2722A", opacity: 0.6 }} />
            <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "#C2722A" }}>Jetzt starten</span>
            <div style={{ width: "24px", height: "1px", background: "#C2722A", opacity: 0.6 }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.025em", color: "#F0EAE0", marginBottom: "22px" }}>
            SEO die wirklich<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#C2722A" }}>funktioniert.</em>
          </h2>
          <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.8, color: "rgba(240,234,224,0.42)", marginBottom: "40px" }}>
            Kostenloses Erstgespräch — wir analysieren Ihre Situation und zeigen Ihnen wo die größten Hebel liegen.
          </p>
          <Link
            href="/kontakt"
            style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", textDecoration: "none", color: "#0A0A0A", background: "#C2722A", padding: "17px 48px", display: "inline-block", transition: "opacity .2s" }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = ".82")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Erstgespräch vereinbaren
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
