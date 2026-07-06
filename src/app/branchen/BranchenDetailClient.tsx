"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SubpageLayout from "@/app/components/SubpageLayout";
import type { Branche } from "./branchenData";

/* ─── Scroll-Reveal (IntersectionObserver → .scroll-visible) ──────────────── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        }),
      { threshold: 0.22, rootMargin: "0px 0px -16% 0px" }
    );
    document.querySelectorAll(".scroll-hidden").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const grad: React.CSSProperties = {
  background: "linear-gradient(90deg, #C2722A, #D4A853)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

/* ═══════════════════════════════════════════════════════════════════════════
   EIN Template für alle 6 Branchen-Unterseiten — Struktur + Typo tragen,
   keine Bilder, keine Apps. Hero hell → Warum (weiß) → Hebel (beige) →
   FAQ (weiß) → CTA-Band (dunkel).
═══════════════════════════════════════════════════════════════════════════ */
export default function BranchenDetailClient({ branche }: { branche: Branche }) {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: branche.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style>{`
        .scroll-hidden.rv-left { transform: translateX(-56px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-right { transform: translateX(56px); transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-scale { transform: translateY(28px) scale(0.93); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-blur { filter: blur(12px); transform: translateY(26px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-left.scroll-visible, .scroll-hidden.rv-right.scroll-visible, .scroll-hidden.rv-scale.scroll-visible, .scroll-hidden.rv-blur.scroll-visible { transform: none; filter: none; }
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .scroll-hidden.rv-left, .scroll-hidden.rv-right, .scroll-hidden.rv-scale, .scroll-hidden.rv-blur { transform: none; filter: none; transition: none; }
        }
      `}</style>

      {/* ══ 01 HERO — hell, kompakt ══ */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute left-[10%] top-[-18%] h-[620px] w-[950px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(212,168,83,0.18), transparent 60%)" }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(26,26,26,0.045) 1px, transparent 0)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse 55% 60% at 25% 35%, #000 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 55% 60% at 25% 35%, #000 30%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 pt-16 lg:pt-24 pb-14 lg:pb-20">
          <div className="max-w-4xl">
            <div className="hero-badge mb-5 inline-flex items-center gap-2.5">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Branchen · {branche.kurzName}
              </span>
            </div>

            <h1 className="hero-title font-[family-name:var(--font-heading)] text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-medium leading-[1.05] tracking-tight text-dark">
              {branche.h1.pre}
              <span style={grad}>{branche.h1.grad}</span>
              {branche.h1.post}
            </h1>

            <p className="hero-description mt-5 max-w-2xl text-lg leading-relaxed text-muted">{branche.subline}</p>

            <div className="hero-cta mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <a
                href="#kontakt"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
              >
                {branche.ctaLabel}
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <Link
                href="/branchen"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Alle Branchen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 02 WARUM — weiß, editorial ══ */}
      <section className="border-t border-border bg-white py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden rv-left lg:sticky lg:top-28">
              <span className="block font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45 mb-4">
                01 — Die Ausgangslage
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[40px] font-bold text-dark leading-[1.12]">
                {branche.warumTitle.pre}
                <span style={grad}>{branche.warumTitle.grad}</span>
              </h2>
            </div>

            <div className="space-y-6">
              {branche.warumAbsaetze.map((absatz, i) => (
                <p
                  key={i}
                  className="scroll-hidden rv-blur text-[15px] lg:text-base text-muted leading-relaxed"
                  style={{ transitionDelay: `${i * 110}ms` }}
                >
                  {absatz}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 03 HEBEL — beige, Hairline-Grid 2×2 mit Ghost-Ziffern ══ */}
      <section className="py-20 lg:py-28" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-16 items-end mb-12 lg:mb-16">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Konkrete Hebel</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12]">
                Die vier Hebel <span style={grad}>für Ihre Sichtbarkeit.</span>
              </h2>
            </div>
            <p className="text-muted leading-relaxed lg:pb-1.5 lg:text-right">
              Kein Standardpaket: An diesen vier Punkten setzen wir an, weil sie in Ihrer Branche über
              organische Sichtbarkeit entscheiden.
            </p>
          </div>

          <div className="grid gap-px bg-border border border-border rounded-2xl overflow-hidden sm:grid-cols-2">
            {branche.hebel.map((h, i) => (
              <div key={h.titel} className="scroll-hidden rv-scale bg-white" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="group relative h-full p-6 lg:p-8 transition-colors duration-300 hover:bg-[#FBF8F4]">
                  <span
                    className="absolute top-0 left-0 right-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="block font-[family-name:var(--font-heading)] text-5xl font-black text-primary/10 leading-none mb-4 transition-colors duration-300 group-hover:text-primary/25"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-2.5 group-hover:text-primary transition-colors">
                    {h.titel}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 04 FAQ — weiß, 3 Accordions ══ */}
      <section className="bg-white py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden rv-left">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Häufige Fragen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-4">
                Drei Fragen — <span style={grad}>ehrlich beantwortet.</span>
              </h2>
              <p className="text-muted leading-relaxed">
                Die Fragen, die {branche.kurzName === "SaaS" ? "SaaS-Teams" : branche.kurzName} uns im
                Erstgespräch am häufigsten stellen — ohne Kleingedrucktes.
              </p>
            </div>

            <div className="scroll-hidden rv-right" style={{ transitionDelay: "120ms" }}>
              <div className="rounded-2xl border border-border bg-white divide-y divide-border overflow-hidden">
                {branche.faq.map((faq, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={faq.q}>
                      <button
                        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer transition-colors hover:bg-offwhite"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                      >
                        <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                        <svg
                          className={`w-4 h-4 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        >
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                      </button>
                      <div
                        className="grid transition-[grid-template-rows] duration-400 ease-out"
                        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-5 text-sm text-muted leading-relaxed">{faq.a}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 05 CTA-BAND — dunkel, kompakt ══ */}
      <section id="kontakt" className="scroll-mt-20 bg-dark py-20 lg:py-28">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="scroll-hidden rv-blur font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] text-white leading-[1.15]">
              {branche.ctaSatz.pre}
              <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                {branche.ctaSatz.grad}
              </span>
            </h2>
            <p className="scroll-hidden rv-blur mt-5 text-white/60 leading-relaxed" style={{ transitionDelay: "100ms" }}>
              Kostenlose Erstanalyse, Antwort innerhalb von 24 Stunden — von einem festen Ansprechpartner.
            </p>
            <div className="scroll-hidden rv-blur mt-8" style={{ transitionDelay: "180ms" }}>
              <Link
                href="/kontakt"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light"
              >
                {branche.ctaButtonLabel}
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
