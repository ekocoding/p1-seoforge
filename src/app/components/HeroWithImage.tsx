"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroWithImage() {
  return (
    <section style={{ position: "relative", minHeight: "92vh", overflow: "hidden", background: "#0F0F0F" }}>

      {/* Full-bleed photo */}
      <Image
        src="/images/homepage-hero-v1@2x.jpg"
        alt="SeoForge — modernes Agentur-Team bei der Arbeit"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "52% 50%" }}
      />

      {/* Left gradient — warm white fade, opens up right where the people are */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(105deg, #FAFAF8 0%, #FAFAF8 36%, rgba(250,250,248,0.96) 48%, rgba(250,250,248,0.68) 60%, rgba(250,250,248,0.10) 76%, transparent 100%)",
      }} />

      {/* Bottom vignette */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "180px", pointerEvents: "none",
        background: "linear-gradient(to top, rgba(250,250,248,0.55), transparent)",
      }} />

      {/* Decorative mark */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-60px", left: "-30px",
        fontFamily: "var(--font-heading)", fontSize: "520px", fontWeight: 700, lineHeight: 1,
        color: "rgba(194,114,42,0.045)", userSelect: "none", pointerEvents: "none", zIndex: 2,
        letterSpacing: "-0.05em",
      }}>×</div>

      <style>{`
        @media (max-width: 768px) {
          .hero-content-main { width: 100% !important; padding: 100px 24px 48px !important; }
          .hero-h1-main { font-size: 36px !important; }
          .hero-overline-text { letter-spacing: .18em !important; }
          .hero-overline-right { display: none !important; }
        }
      `}</style>

      {/* Content */}
      <div className="hero-content-main" style={{
        position: "relative", zIndex: 10,
        minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "120px 80px 56px 80px", width: "56vw", maxWidth: "820px",
      }}>

        {/* Overline */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px", flexWrap: "nowrap", minWidth: 0 }}>
          <div style={{ flexShrink: 0, width: "36px", height: "1px", background: "#C2722A", opacity: 0.7 }} />
          <span className="hero-overline-text" style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".25em", textTransform: "uppercase", color: "#C2722A", whiteSpace: "nowrap" }}>
            SEO · GEO · Webdesign
          </span>
          <div className="hero-overline-right" style={{ flexShrink: 0, width: "20px", height: "1px", background: "#C2722A", opacity: 0.3 }} />
        </div>

        {/* Headline */}
        <h1 className="hero-h1-main" style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(52px, 5.2vw, 76px)",
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.025em",
          color: "#0F0F0F",
          marginBottom: "20px",
        }}>
          Sichtbarkeit,<br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "#C2722A" }}>die Umsatz schafft.</em>
        </h1>

        {/* Orange rule */}
        <div style={{ width: "48px", height: "2px", background: "#C2722A", opacity: 0.55, marginBottom: "18px" }} />

        {/* Body */}
        <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.8, color: "rgba(15,15,15,0.60)", maxWidth: "640px", marginBottom: "12px" }}>
          Rankings entstehen nicht durch Zufall. Hinter jedem Top-Ergebnis steckt eine durchdachte Strategie — technisch sauber, inhaltlich stark, datenbasiert optimiert. Wir bauen organische Sichtbarkeit, die Ihrem Unternehmen monatlich neues Wachstum bringt.
        </p>

        <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.8, color: "rgba(15,15,15,0.60)", maxWidth: "640px", marginBottom: "24px" }}>
          Kein Rätselraten, keine Blackbox. Als persönlicher Ansprechpartner kombinieren wir technisches SEO, Content-Strategie und KI-Sichtbarkeit zu einem System, das messbar und transparent funktioniert.
        </p>

        {/* Bullet checkmarks */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "11px" }}>
          {[
            "Technisches SEO · Content · Linkbuilding · GEO",
            "Kein Vertragszwang — monatlich kündbar",
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
            href="/kontakt"
            style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", textDecoration: "none", color: "#FAFAF8", background: "#C2722A", padding: "14px 40px", display: "inline-block", transition: "opacity .2s" }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = ".82")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Kostenlose SEO-Analyse
          </Link>
          <Link
            href="/referenzen"
            style={{ fontSize: "12px", fontWeight: 400, color: "rgba(15,15,15,0.40)", textDecoration: "none", letterSpacing: ".06em", borderBottom: "1px solid rgba(15,15,15,0.18)", paddingBottom: "2px" }}
          >
            Referenzen ansehen
          </Link>
        </div>

      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, rgba(194,114,42,0.5), transparent)" }} />
        <span style={{ fontSize: "8px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(15,15,15,0.2)" }}>Scroll</span>
      </div>
    </section>
  );
}
