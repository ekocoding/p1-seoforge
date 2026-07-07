"use client";

import { useEffect, useState } from "react";
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
const SPIELFELD = [
  { label: "Ärzte", slug: "seo-fuer-aerzte", query: "kieferorthopäde kosten kinder köln",
    gegner: "Jameda, Doctolib und Gesundheitsportale belegen die ersten Plätze — die Praxis-Website taucht oft gar nicht auf.",
    seitentyp: "Eigene Behandlungs- und Symptomseiten je Leistung — nicht eine allgemeine Leistungsübersicht.",
    hebel: "Vertrauenssignale für Googles strenge Gesundheits-Standards (YMYL) plus lokale Präsenz über das Google Business Profil.",
    cta: "Zur Analyse für Praxen" },
  { label: "Anwälte", slug: "seo-fuer-anwaelte", query: "fristlose kündigung wohnung was tun",
    gegner: "Ratgeberportale und Kanzleien mit Content-Redaktion — dazu die teuersten Klickpreise im deutschen Ads-Markt.",
    seitentyp: "Ratgeber-Inhalte zu Mandantenfragen in Alltagssprache — nicht Paragrafen-Listen nach Rechtsgebiet.",
    hebel: "Eine Content-Strategie entlang des Rechtsfalls: sichtbar werden, bevor der Mandant eine Kanzlei googelt.",
    cta: "Zur Analyse für Kanzleien" },
  { label: "Online-Shops", slug: "seo-fuer-online-shops", query: "laufschuhe damen neutral größe 39",
    gegner: "Amazon, Idealo und Marktplätze dominieren die Produktsuche — und Filter-URLs verbrennen intern das Crawling-Budget.",
    seitentyp: "Kategorieseiten mit eigenem Inhalt und sauberer Struktur — sie tragen mehr als einzelne Produktseiten.",
    hebel: "Technische Sauberkeit: Duplicate Content aus Filtern beheben und das Sortiment für Google lesbar machen.",
    cta: "Zur Analyse für Shops" },
  { label: "Handwerker", slug: "seo-fuer-handwerker", query: "heizung notdienst wochenende",
    gegner: "MyHammer, Check24 und Vermittlungsportale fangen Anfragen ab — und kassieren pro Kontakt Provision.",
    seitentyp: "Leistungsseiten je Gewerk und Einsatzort — kombiniert mit einem gepflegten Google Business Profil.",
    hebel: "Lokale Signale: Maps-Sichtbarkeit, Bewertungen und Ortsbezug, damit Anfragen direkt statt über Portale kommen.",
    cta: "Zur Analyse für Betriebe" },
  { label: "Makler", slug: "seo-fuer-immobilienmakler", query: "was ist meine wohnung wert",
    gegner: "ImmoScout24 und Immowelt besetzen die Objektsuche fast vollständig — dort ist organisch kaum vorbeizukommen.",
    seitentyp: "Eigentümer-Ratgeber zu Bewertung, Verkauf und Erbe — die Suchen VOR dem Portal-Kontakt.",
    hebel: "Eigentümer-Leads abholen, bevor das Objekt auf einem Portal landet — dort ist der Wettbewerb am kleinsten.",
    cta: "Zur Analyse für Maklerbüros" },
  { label: "SaaS", slug: "saas-seo", query: "projektmanagement tool alternative",
    gegner: "G2, OMR Reviews und VC-finanzierte Wettbewerber mit großen Content-Teams besetzen die Vergleichs-Suchen.",
    seitentyp: "Problem-, Vergleichs- und Alternative-Seiten — die Suchphase kurz vor der Kaufentscheidung.",
    hebel: "GEO: sichtbar werden, wenn ChatGPT und Perplexity Software empfehlen — der Kanal, den fast alle ignorieren.",
    cta: "Zur Analyse für SaaS" },
];

export default function BranchenClient() {
  const [feld, setFeld] = useState(0);
  useScrollReveal();

  return (
    <SubpageLayout>
      <style>{`
        @keyframes aeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .ae-in { opacity: 0; animation: aeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes chipPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .chip-dot { animation: chipPulse 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ae-in { animation: none; opacity: 1; } .chip-dot { animation: none; } }
        .scroll-hidden.rv-scale { transform: translateY(28px) scale(0.93); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-blur { filter: blur(12px); transform: translateY(26px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1); }
        .scroll-hidden.rv-scale.scroll-visible, .scroll-hidden.rv-blur.scroll-visible { transform: none; filter: none; }
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .scroll-hidden.rv-scale, .scroll-hidden.rv-blur { transform: none; filter: none; transition: none; }
        }
      `}</style>

      {/* ══ 01 HERO — Golden Circuit (dunkel) ══ */}
      <section className="relative overflow-hidden" style={{ background: "#161311" }}>
        <Image
          src="/images/hero-bg-circuit.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(95deg, rgba(15,12,9,0.55) 0%, rgba(15,12,9,0.25) 45%, rgba(15,12,9,0) 75%)" }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 pt-20 lg:pt-28 pb-16 lg:pb-24">
          <div className="max-w-3xl">
            <div className="hero-badge mb-5 inline-flex items-center gap-2.5">
              <span className="h-px w-8 bg-secondary" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">SEO nach Branche</span>
            </div>

            <h1 className="hero-title font-[family-name:var(--font-heading)] text-[2.7rem] sm:text-[3.4rem] lg:text-[4rem] font-medium leading-[1.02] tracking-tight text-white">
              SEO, das{" "}
              <span style={{ background: "linear-gradient(92deg, #D98A3F, #D4A853)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                Ihre Branche versteht.
              </span>
            </h1>

            <p className="hero-description mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              Patienten suchen anders als Mandanten, Shop-Kunden anders als B2B-Einkäufer. Deshalb starten wir
              nicht mit einem Standardpaket, sondern mit dem Suchverhalten Ihrer Kunden.
            </p>

            <div className="hero-cta mt-8">
              <a
                href="#branchen"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)] transition-all hover:bg-primary-dark"
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

      {/* ══ 03 SPIELFELD-VERGLEICH — interaktiver Beweis der These ══ */}
      <section className="py-20 lg:py-28" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">

            <div className="lg:sticky lg:top-28">
              <span className="scroll-hidden rv-left block font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45 mb-4">
                Warum Branchenfokus
              </span>
              <h2 className="scroll-hidden rv-left font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight">
                Gleiches Handwerk, <span style={grad}>anderes Spielfeld.</span>
              </h2>
              <p className="scroll-hidden rv-left mt-5 text-muted leading-relaxed" style={{ transitionDelay: "90ms" }}>
                Wie Ihre Kunden suchen, wer in den Suchergebnissen dazwischensteht und welche Seiten
                überhaupt ranken können — das unterscheidet sich von Branche zu Branche fundamental.
                Klicken Sie sich durch: Dieselben vier Fragen, sechs völlig verschiedene Antworten.
              </p>
              <p className="scroll-hidden rv-left mt-4 text-sm text-muted leading-relaxed" style={{ transitionDelay: "150ms" }}>
                Genau deshalb beginnt jede Zusammenarbeit bei uns mit dem Suchverhalten Ihres Marktes —
                nicht mit einem vorgefertigten Maßnahmenkatalog.
              </p>
            </div>

            <div className="scroll-hidden rv-right rounded-3xl border border-border bg-white shadow-[0_24px_60px_-30px_rgba(26,26,26,0.18)] overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-6 py-3.5">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dark/55">
                  <span className="chip-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  Spielfeld-Vergleich
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dark/35">6 Branchen</span>
              </div>

              <div className="flex flex-wrap gap-1.5 border-b border-border px-5 py-4" style={{ background: "#FBF8F4" }}>
                {SPIELFELD.map((sp, i) => (
                  <button
                    key={sp.label}
                    onClick={() => setFeld(i)}
                    aria-pressed={feld === i}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200 ${
                      feld === i
                        ? "bg-primary text-white shadow-sm"
                        : "bg-white text-dark/65 border border-border hover:border-[#ecd3ba] hover:text-dark"
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>

              <div key={feld} className="px-6 py-2 lg:px-7">
                <div className="ae-in flex items-center gap-3 rounded-full border border-border bg-white px-4 py-3 my-5 shadow-sm" style={{ animationDelay: "40ms" }}>
                  <svg className="h-4 w-4 shrink-0 text-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span className="truncate text-[15px] text-dark">{SPIELFELD[feld].query}</span>
                  <span className="ml-auto hidden sm:block font-mono text-[10px] uppercase tracking-[0.14em] text-dark/35">So sucht Ihr Kunde</span>
                </div>

                {[
                  { k: "Wer dazwischensteht", v: SPIELFELD[feld].gegner, d: "120ms" },
                  { k: "Was ranken muss", v: SPIELFELD[feld].seitentyp, d: "200ms" },
                  { k: "Der größte Hebel", v: SPIELFELD[feld].hebel, d: "280ms" },
                ].map((row) => (
                  <div key={row.k} className="ae-in grid grid-cols-[130px_1fr] sm:grid-cols-[170px_1fr] gap-4 border-t border-border py-4" style={{ animationDelay: row.d }}>
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-dark/40 pt-0.5">{row.k}</span>
                    <span className="text-[15px] leading-relaxed text-dark">{row.v}</span>
                  </div>
                ))}

                <div className="ae-in border-t border-border py-4 mb-1" style={{ animationDelay: "360ms" }}>
                  <Link
                    href={`/branchen/${SPIELFELD[feld].slug}`}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    {SPIELFELD[feld].cta}
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

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
