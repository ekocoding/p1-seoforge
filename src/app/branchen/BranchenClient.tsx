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

          <div className="grid gap-x-8 gap-y-14 lg:gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {branchen.map((b, i) => {
              const iconImg = b.slug === "saas-seo" ? "saas" : b.slug.replace("seo-fuer-", "");
              return (
              <Link
                key={b.slug}
                href={`/branchen/${b.slug}`}
                className="scroll-hidden rv-scale group flex flex-col items-center text-center px-2"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="relative block h-28 w-28 lg:h-32 lg:w-32 overflow-hidden rounded-full ring-1 ring-border shadow-[0_14px_34px_-20px_rgba(194,114,42,0.35)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_50px_-22px_rgba(194,114,42,0.45)] group-hover:ring-[#ecd3ba]">
                  <Image
                    src={`/images/branchen-icons/${iconImg}.png`}
                    alt={`${b.name} — Illustration`}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                  />
                </span>

                <h3 className="mt-6 font-[family-name:var(--font-heading)] text-xl lg:text-[22px] font-bold text-dark transition-colors duration-300 group-hover:text-primary">
                  {b.name}
                </h3>
                <p className="mt-3 max-w-[300px] text-sm leading-relaxed text-muted">{b.accent}</p>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 03 WARUM SEOFORGE — 2×2 Panels (Sureoak-Muster) ══ */}
      <section className="py-20 lg:py-28" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
            <span className="scroll-hidden rv-blur block font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45 mb-4">
              Warum Branchenfokus
            </span>
            <h2 className="scroll-hidden rv-blur font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight">
              Gleiches Handwerk, <span style={grad}>anderes Spielfeld.</span>
            </h2>
            <p className="scroll-hidden rv-blur mt-5 text-muted leading-relaxed" style={{ transitionDelay: "100ms" }}>
              Suchverhalten, Portale und Wettbewerbsdichte unterscheiden sich von Branche zu Branche erheblich.
              Deshalb beginnt jede Zusammenarbeit bei uns mit der Frage, wie Ihre Kunden tatsächlich suchen —
              nicht mit einem vorgefertigten Maßnahmenkatalog.
            </p>
          </div>

          <div className="grid gap-5 lg:gap-6 md:grid-cols-2">
            {[
              {
                t: "Kein Schema F",
                d: "Ein Maßnahmenkatalog, der für einen Online-Shop trägt, verpufft bei einer Kanzlei wirkungslos. Wir arbeiten entlang der Suchlogik Ihrer Branche — mit den Seitentypen, Inhalten und Signalen, die in Ihrem Markt tatsächlich über Sichtbarkeit entscheiden.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />,
              },
              {
                t: "Mehr als SEO",
                d: "SEO, GEO und Webdesign kommen bei uns aus einer Hand. Wenn Ihre Branche eine schnellere Website, bessere Landingpages oder Inhalte braucht, müssen Sie keine zweite Agentur koordinieren — wir setzen es direkt um, per CI/CD in Minuten statt Wochen.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />,
              },
              {
                t: "Partner statt Ticketnummer",
                d: "Sie haben einen festen Ansprechpartner, der Ihre Branche und Ihre Website kennt und innerhalb von 24 Stunden antwortet. Und Sie sehen dieselben Daten wie wir — Google Search Console, Semrush, Ahrefs — statt geschönter Zusammenfassungen.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a6.026 6.026 0 01-.941 3.197m0 0A11.943 11.943 0 0112 21c2.17 0 4.207-.576 5.963-1.584m-11.926 0A11.945 11.945 0 010 18.719m6.062-3.197A5.971 5.971 0 006 18.719m0 0v.031c0 .225.012.447.037.666" />,
              },
              {
                t: "Sichtbar auch in der KI-Suche",
                d: "Immer mehr Kunden fragen ChatGPT oder Perplexity statt Google — in den meisten Branchen ignoriert der Wettbewerb diesen Kanal noch komplett. Wir bauen Ihre Sichtbarkeit für beide Suchwelten auf, bevor es Ihre Konkurrenz tut.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />,
              },
            ].map((card, i) => (
              <div
                key={card.t}
                className="scroll-hidden rv-scale rounded-3xl border border-border bg-white p-8 lg:p-10"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "#fbf4ea", border: "1px solid #ecd3ba" }}>
                  <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">{card.icon}</svg>
                </span>
                <h3 className="mt-6 font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-dark">{card.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{card.d}</p>
              </div>
            ))}
          </div>

          <div className="scroll-hidden rv-blur mt-12 text-center" style={{ transitionDelay: "120ms" }}>
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

      {/* ══ 04 CTA — voll-flächiges Marken-Band (Sureoak-Muster) ══ */}
      <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: "linear-gradient(130deg, #C2722A 0%, #CE8B3E 55%, #D4A853 100%)" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-24 -right-16 h-[380px] w-[380px] rounded-full bg-white/[0.07] blur-3xl" />
          <div className="absolute -bottom-28 -left-16 h-[320px] w-[320px] rounded-full bg-white/[0.06] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="scroll-hidden rv-blur font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-[46px] font-bold text-white leading-[1.12]">
            Ihre kostenlose Erstanalyse — für Ihre Branche.
          </h2>
          <p className="scroll-hidden rv-blur mx-auto mt-5 max-w-2xl text-white/85 leading-relaxed lg:text-lg" style={{ transitionDelay: "100ms" }}>
            Wir prüfen Ihre Website, Ihre Rankings und Ihre Sichtbarkeit in der KI-Suche — und sagen Ihnen
            ehrlich, wo in Ihrem Markt die größten Chancen liegen. Unverbindlich und ohne Verkaufsdruck.
          </p>
          <div className="scroll-hidden rv-blur mt-9" style={{ transitionDelay: "180ms" }}>
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-sm font-bold text-primary shadow-[0_18px_40px_-14px_rgba(26,26,26,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-16px_rgba(26,26,26,0.4)]"
            >
              Kostenlose Erstanalyse anfordern
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              Antwort &lt; 24 h · unverbindlich · keine Vorlage nötig
            </p>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
