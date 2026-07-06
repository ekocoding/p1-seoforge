"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "@/app/components/SubpageLayout";
import { branchen } from "./branchenData";

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
   BRANCHEN-HUB — kompakter heller Hero, 6 Karten im Hairline-Grid,
   kurze Abschluss-Section (beige), kompaktes dunkles CTA-Band.
═══════════════════════════════════════════════════════════════════════════ */
export default function BranchenClient() {
  useScrollReveal();

  return (
    <SubpageLayout>
      <style>{`
        .scroll-hidden.rv-scale { transform: translateY(28px) scale(0.93); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-blur { filter: blur(12px); transform: translateY(26px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-scale.scroll-visible, .scroll-hidden.rv-blur.scroll-visible { transform: none; filter: none; }
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .scroll-hidden.rv-scale, .scroll-hidden.rv-blur { transform: none; filter: none; transition: none; }
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
          <div className="max-w-3xl">
            <div className="hero-badge mb-5 inline-flex items-center gap-2.5">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">SEO nach Branche</span>
            </div>

            <h1 className="hero-title font-[family-name:var(--font-heading)] text-[2.7rem] sm:text-[3.4rem] lg:text-[4rem] font-medium leading-[1.02] tracking-tight text-dark">
              SEO, das <span style={grad}>Ihre Branche versteht.</span>
            </h1>

            <p className="hero-description mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Patienten suchen anders als Mandanten, Shop-Kunden anders als B2B-Einkäufer. Deshalb starten wir
              nicht mit einem Standardpaket, sondern mit dem Suchverhalten Ihrer Kunden.
            </p>

            <div className="hero-cta mt-8">
              <a
                href="#branchen"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
              >
                Branchen ansehen
                <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 02 BRANCHEN-KARTEN — Hairline-Grid 2×3 ══ */}
      <section id="branchen" className="scroll-mt-20 border-t border-border bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="scroll-hidden grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-16 items-end mb-12 lg:mb-16">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Sechs Branchen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12]">
                Sechs Branchen, <span style={grad}>sechs Suchlogiken.</span>
              </h2>
            </div>
            <p className="text-muted leading-relaxed lg:pb-1.5 lg:text-right">
              Jede Seite zeigt, wie Ihre Kunden tatsächlich suchen, welche Portale dazwischenstehen und an
              welchen Hebeln wir ansetzen.
            </p>
          </div>

          <div className="grid gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {branchen.map((b, i) => {
              const iconImg = b.slug === "saas-seo" ? "saas" : b.slug.replace("seo-fuer-", "");
              return (
              <Link
                key={b.slug}
                href={`/branchen/${b.slug}`}
                className="scroll-hidden rv-scale group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white p-6 lg:p-7 shadow-[0_10px_30px_-20px_rgba(26,26,26,0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-26px_rgba(194,114,42,0.30)]"
                style={{ transitionDelay: `${i * 70}ms`, borderColor: undefined }}
              >
                <span
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-4 mb-6">
                  <span className="relative block h-24 w-24 lg:h-28 lg:w-28 shrink-0 overflow-hidden rounded-2xl border border-border transition-transform duration-500 group-hover:scale-[1.05] group-hover:rotate-[1.5deg]">
                    <Image
                      src={`/images/branchen-icons/${iconImg}.png`}
                      alt={`${b.name} — Illustration`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </span>
                  <span
                    className="font-[family-name:var(--font-heading)] text-5xl font-black text-primary/10 leading-none transition-colors duration-300 group-hover:text-primary/25"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                  {b.name}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{b.accent}</p>

                <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-dark group-hover:text-primary transition-colors">
                  Mehr erfahren
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 03 WARUM BRANCHENFOKUS — beige, kompakt ══ */}
      <section className="py-16 lg:py-24" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <span className="scroll-hidden rv-blur block font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45 mb-4">
            Warum Branchenfokus
          </span>
          <h2 className="scroll-hidden rv-blur font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
            Gleiches Handwerk, <span style={grad}>anderes Spielfeld.</span>
          </h2>
          <p className="scroll-hidden rv-blur text-muted leading-relaxed" style={{ transitionDelay: "100ms" }}>
            Suchverhalten, Portale und Wettbewerbsdichte unterscheiden sich von Branche zu Branche erheblich —
            was in einem Markt trägt, verpufft im nächsten wirkungslos. Deshalb beginnt jede Zusammenarbeit bei
            uns mit der Frage, wie Ihre Kunden tatsächlich suchen, und nicht mit einem vorgefertigten
            Maßnahmenkatalog.
          </p>
          <div className="scroll-hidden rv-blur mt-7" style={{ transitionDelay: "180ms" }}>
            <Link
              href="/leistungen"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors"
            >
              Alle Leistungen im Überblick
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 04 CTA-BAND — dunkel, kompakt ══ */}
      <section className="bg-dark py-20 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="scroll-hidden rv-blur font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] text-white leading-[1.15]">
              Lassen Sie uns über{" "}
              <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                Ihre Branche
              </span>{" "}
              sprechen.
            </h2>
            <p className="scroll-hidden rv-blur mt-5 text-white/60 leading-relaxed" style={{ transitionDelay: "100ms" }}>
              Im kostenlosen Erstgespräch erhalten Sie eine ehrliche Einschätzung, wo in Ihrem Markt die
              größten organischen Chancen liegen.
            </p>
            <div className="scroll-hidden rv-blur mt-8" style={{ transitionDelay: "180ms" }}>
              <Link
                href="/kontakt"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light"
              >
                Kostenloses Erstgespräch anfragen
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
