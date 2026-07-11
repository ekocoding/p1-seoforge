"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

/* Gold-Gradient für den H1-Span — hellerer Start für Kontrast auf dunklem Grund */
const gradHero: CSSProperties = {
  background: "linear-gradient(92deg, #D98A3F, #D4A853)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

/* ─────────────────────────────────────────────────────────────────────────────
   HERO — Golden Circuit V2: dunkles Leiterbahn-Bild full-bleed,
   dezenter dunkler Lesbarkeits-Verlauf von links, Hell-auf-Dunkel-Typo
───────────────────────────────────────────────────────────────────────────── */
export default function LeistungenHero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ background: "#161311" }}
    >
      {/* Golden-Circuit-Background */}
      <Image
        src="/images/hero-bg-circuit.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Sehr dezenter dunkler Lesbarkeits-Verlauf von links */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(95deg, rgba(15,12,9,0.55) 0%, rgba(15,12,9,0.25) 45%, rgba(15,12,9,0) 75%)",
        }}
      />

      {/* Subtle grain texture overlay — adds premium paper feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />

      {/* Decorative watermark — white, barely visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0.03 }}
      >
        <span
          className="font-[family-name:var(--font-heading)] font-black text-white leading-none"
          style={{ fontSize: "clamp(160px, 28vw, 420px)" }}
        >
          03
        </span>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Badge */}
        <p className="hero-badge text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-light mb-7">
          SeoForge · Leistungen
        </p>

        {/* Headline */}
        <h1
          className="hero-title font-[family-name:var(--font-heading)] text-white leading-[1.05] mb-7"
        >
          SEO, GEO, Webdesign.<br />
          <span style={gradHero}>Ein klares Leistungssystem.</span>
        </h1>

        {/* Sub-copy */}
        <p className="hero-description text-lg text-white/75 max-w-lg mx-auto mb-14 leading-relaxed">
          Vier Disziplinen mit unterschiedlichen Aufgaben — gemeinsam planbar,
          sauber voneinander abgegrenzt und passend zur Ausgangslage kombinierbar.
        </p>

        {/* Anchor pills — dunkle Glas-Pills */}
        <div className="hero-cta flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "01 · SEO",       href: "#seo"       },
            { label: "02 · GEO",       href: "#geo"       },
            { label: "03 · Webdesign", href: "#webdesign" },
            { label: "04 · KI-SEO",    href: "#ki-seo"    },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="group inline-flex items-center gap-2.5 border border-white/15 text-white/85 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium hover:border-secondary hover:text-white hover:bg-white/[0.14] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              {label}
              <span className="text-secondary text-xs float-chevron">↓</span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom separator — thin line for clean transition to dark section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.08]" />

      {/* Scroll label */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] text-white font-mono tracking-[0.3em]">SCROLL</span>
        <span className="text-white text-xs float-chevron">↓</span>
      </div>
    </section>
  );
}
