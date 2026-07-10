"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AnatomieExplorer from "./AnatomieExplorer";
import MessageMatchDemo from "./MessageMatchDemo";

/* ─── Scroll-Reveal (IntersectionObserver → .scroll-visible) ──────────────── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        }),
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll(".scroll-hidden, .m3d").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Scroll-Progress (fixed, rAF-gedrosselt) ─────────────────────────────── */
function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-[80] h-[3px]" aria-hidden="true">
      <div
        ref={ref}
        className="h-full origin-left"
        style={{ transform: "scaleX(0)", background: "linear-gradient(90deg, #C2722A, #D4A853)", boxShadow: "0 0 10px rgba(194,114,42,0.5)" }}
      />
    </div>
  );
}

/* ─── Icon-Helper ─────────────────────────────────────────────────────────── */
const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Daten ───────────────────────────────────────────────────────────────── */
const FUNNEL = [
  { label: "Problem", href: "#einsatz" },
  { label: "Beweis", href: "#anatomie" },
  { label: "Prozess", href: "#prozess" },
  { label: "Preis", href: "#kosten" },
  { label: "Abschluss", href: "#kontakt" },
];

const EINSATZ = [
  { s: "M3 11l18-5v12L3 13v-2zM11.6 16.8a3 3 0 1 1-5.8-1.6", t: "Google- und Meta-Ads-Kampagnen", d: "Wer Budget in Google Ads oder Meta-Kampagnen steckt, verliert einen Teil davon, wenn die Zielseite nicht zur Anzeige passt. Eine eigene Landing Page pro Kampagne hält Botschaft und Angebot exakt beieinander. Das wirkt sich meist auch positiv auf den Qualitätsfaktor aus." },
  { s: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", t: "Produkt- und Angebots-Launches", d: "Bei einem neuen Produkt, einem Sonderrabatt oder einer zeitlich begrenzten Aktion lohnt sich keine dauerhafte Position in der Hauptnavigation. Eine Landing Page geht schnell online, lässt sich beliebig oft anpassen und verschwindet nach der Aktion wieder." },
  { s: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", t: "B2B-Lead-Generierung", d: "Im B2B-Vertrieb übernimmt die Landing Page oft die Rolle des ersten Verkaufsgesprächs. Ein klares Angebot, ein kurzes Formular und ein greifbarer nächster Schritt bringen meist mehr qualifizierte Anfragen als eine allgemeine Kontaktseite." },
  { s: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", t: "Events und Aktionen", d: "Messen, Webinare oder saisonale Aktionen brauchen eine Seite, die Termin, Nutzen und Anmeldung auf den ersten Blick zeigt. Sobald das Event vorbei ist, nehmen wir die Seite offline oder passen sie für die nächste Runde an." },
];

const STEPS = [
  { nr: "01", t: "Briefing & Zieldefinition", d: "Am Anfang klären wir Kampagnenziel, Zielgruppe und die eine gewünschte Handlung — Kauf, Anfrage oder Terminbuchung. Daraus leiten wir Struktur und Kernbotschaft der Seite ab." },
  { nr: "02", t: "Konzept & Wireframe", d: "Wir bauen ein Wireframe, das Message Match, CTA-Platzierung und Social-Proof-Elemente entlang der Customer Journey anordnet. So steht die Struktur, bevor die erste Zeile Design entsteht." },
  { nr: "03", t: "Design & Copywriting", d: "Design und Text entstehen im Zusammenspiel, nicht nacheinander — Bildsprache und Wording müssen zur Anzeige passen, aus der die Besucher kommen. Wir texten dabei so, wie du selbst mit deinen Kunden sprechen würdest." },
  { nr: "04", t: "Custom-Code-Entwicklung", d: "Statt Pagebuilder setzen wir auf handgeschriebenen Code in Next.js oder WordPress, je nachdem was besser zu deiner bestehenden Infrastruktur passt. Das hält die Ladezeit unter 2 Sekunden." },
  { nr: "05", t: "Launch, Tracking & Optimierung", d: "Nach dem Launch messen wir jeden Klick über GA4 und die verknüpften Ads-Konten. Dank unserer CI/CD-Pipeline gehen Anpassungen für A/B-Tests oder neue Kampagnenphasen innerhalb weniger Minuten live." },
];

const FACTORS = [
  { s: "M3 3h18v18H3zM3 9h18M9 21V9", t: "Seitenumfang", d: "Ein einzelner Screen mit einem CTA kostet weniger als eine mehrteilige Seite mit mehreren Abschnitten und Formularen." },
  { s: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", t: "Varianten für A/B-Tests", d: "Jede zusätzliche Design- oder Text-Variante erhöht den Entwicklungsaufwand." },
  { s: "M3 3v18h18M18 17V9M13 17V5M8 17v-3", t: "Tracking-Tiefe", d: "Ein einfaches Conversion-Tag ist schneller eingerichtet als eine Anbindung an CRM- oder Marketing-Automation-Systeme." },
  { s: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13L2 21.75l.8-2.935a4.5 4.5 0 011.13-1.897l12.932-12.43z", t: "Copywriting & Content", d: "Individuell getexteter Content und eigens erstellte Grafiken brauchen mehr Zeit als vorhandenes Material." },
];

const BENEFITS = [
  { s: "M16 18l6-6-6-6M8 6l-6 6 6 6", t: "Technisches Fundament statt Baukasten", d: "Custom Code ohne Plugin-Wildwuchs lädt schneller, sieht auf jedem Endgerät gleich sauber aus und lässt sich ohne Einschränkungen erweitern." },
  { s: "M13 10V3L4 14h7v7l9-11h-7z", t: "Schnelle Anpassungen dank CI/CD", d: "Über unsere DevOps-Pipeline gehen Textänderungen oder neue Varianten in Minuten live — wichtig, wenn eine Kampagne mitten in der Laufzeit nachjustiert werden muss." },
  { s: "M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z", t: "SEO-Fundament auch für One Pager", d: "Selbst eine einzelne Landing Page bauen wir technisch so sauber, dass sie rankingfähig bleibt — und dank sauberer Struktur auch für KI-Suchsysteme (GEO) zitierfähig." },
  { s: "M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", t: "Persönlicher Ansprechpartner", d: "Du hast eine feste Kontaktperson für dein Projekt und bekommst Rückmeldungen in der Regel innerhalb von 24 Stunden." },
];

const faqs = [
  { q: "Was unterscheidet eine Landing Page von einer normalen Website?", a: "Eine Website bildet dein gesamtes Angebot ab und lädt zum Stöbern über mehrere Seiten ein. Eine Landing Page verfolgt dagegen genau ein Ziel — meist eine Anfrage, einen Kauf oder eine Anmeldung — und verzichtet bewusst auf Navigation und Ablenkung. Sie ist für eine einzelne Kampagne oder ein einzelnes Angebot gebaut — und dadurch deutlich fokussierter." },
  { q: "Was kostet eine Landingpage bei SeoForge?", a: "Custom-coded Landing Pages starten bei uns ab 1.500 €. Den finalen Preis legen wir als verbindlichen Festpreis fest, nachdem wir Umfang, Ziel und Tracking-Anforderungen in einem kostenlosen Erstgespräch besprochen haben. So gibt es während des Projekts keine bösen Überraschungen bei der Rechnung." },
  { q: "Wie lange dauert es, bis meine Landing Page live ist?", a: "Eine Landing Page ist deutlich schneller live als eine komplette Website, meist innerhalb weniger Wochen. Wie schnell es konkret geht, hängt von Umfang, Varianten, Content und Tracking-Anbindung ab. Das besprechen wir im Erstgespräch." },
  { q: "Bindet ihr die Landing Page an meine Google- und Meta-Ads-Kampagnen an?", a: "Ja. Wir richten GA4, Google-Ads-Conversion-Tracking und Meta Pixel direkt beim Launch ein, sodass jeder Klick von Anfang an messbar ist. So siehst du sofort, welche Anzeige oder Zielgruppe tatsächlich Anfragen oder Käufe bringt, statt erst Wochen später zu raten." },
  { q: "Was ist der Unterschied zwischen einem One Pager und einer Landingpage?", a: "Ein One Pager ist technisch eine Landing Page. Er ist aber meist für organischen oder allgemeinen Traffic gedacht statt für eine einzelne Ads-Kampagne — etwa als kompakte Firmenpräsenz. Beide folgen dem gleichen Prinzip: ein Ziel, ein CTA. Ein One Pager bildet aber oft mehrere Themen auf einer Seite ab statt nur ein Angebot." },
  { q: "Kann ich die Landing Page nach dem Launch noch anpassen?", a: "Ja, und das sollte auch passieren. Dank unserer CI/CD-Pipeline gehen Textänderungen, neue Varianten oder Anpassungen an der Kampagne innerhalb weniger Minuten live. Gerade in den ersten Wochen nach Launch lohnt es sich, Headline, CTA oder Formular anhand der Tracking-Daten laufend nachzuschärfen." },
];

/* ─── Editorial-Header ────────────────────────────────────────────────────── */
function SectionHead({ eyebrow, title, copy, dark }: { eyebrow: string; title: React.ReactNode; copy: string; dark?: boolean }) {
  return (
    <div className="scroll-hidden grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-16 items-end mb-12 lg:mb-16">
      <div>
        <span className={`text-xs font-bold tracking-[0.22em] uppercase block mb-4 ${dark ? "font-mono text-[11px] text-secondary" : "text-primary"}`}>{eyebrow}</span>
        <h2 className={`font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold leading-[1.12] ${dark ? "text-white" : "text-dark"}`}>{title}</h2>
      </div>
      <p className={`leading-relaxed lg:pb-1.5 lg:text-right ${dark ? "text-white/60" : "text-muted"}`}>{copy}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function LandingPagesClient() {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ScrollProgressBar />
      <style>{`
        .m3d { opacity: 0; transform: translateY(60px) rotateX(-14deg) scale(0.97); transform-origin: 50% 18%; transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); will-change: transform; backface-visibility: hidden; }
        .m3d.scroll-visible { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); }
        @media (prefers-reduced-motion: reduce), (scripting: none) { .m3d { opacity: 1; transform: none; transition: none; } }
      `}</style>

      {/* ══ HERO — Big Type + Funnel-Leiste ══ */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute left-1/2 top-[-20%] h-[640px] w-[1000px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse at center, rgba(212,168,83,0.18), transparent 60%)" }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(26,26,26,0.045) 1px, transparent 0)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse 70% 55% at 50% 30%, #000 35%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 30%, #000 35%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-6 lg:px-8 pt-28 lg:pt-36 pb-24 lg:pb-28 text-center">
          <div className="hero-badge mb-7 inline-flex items-center gap-2.5">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Landingpage erstellen lassen</span>
            <span className="h-px w-8 bg-primary" />
          </div>

          <h1 className="hero-title font-[family-name:var(--font-heading)] text-[3.1rem] font-medium leading-[0.99] tracking-tight text-dark sm:text-7xl lg:text-[5.2rem]">
            Landing Page erstellen lassen —{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #C2722A, #D4A853)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              custom-coded statt Baukasten.
            </span>
          </h1>

          <p className="hero-description mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted">
            Du willst eine Landingpage erstellen lassen, die dein Werbebudget verdient? Wir
            entwickeln custom-coded Landing Pages und One Pager für Ads-Kampagnen und
            Produkt-Launches. Keine Kompromisse bei Ladezeit oder Tracking — nur eine Seite
            mit einem Ziel: mehr Anfragen und Käufe aus deiner Kampagne.
          </p>

          <div className="hero-cta mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
            >
              Kostenloses Erstgespräch vereinbaren
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#prozess"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-8 py-4 text-sm font-semibold text-dark transition-all hover:border-primary/40"
            >
              Ablauf &amp; Preise ansehen
            </a>
          </div>

          <div className="hero-description mt-14 flex flex-col items-center gap-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted/70">
              So ist diese Seite aufgebaut — wie jede gute Landingpage
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
              {FUNNEL.map((f, i) => (
                <span key={f.label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-border text-sm" aria-hidden="true">→</span>}
                  <a
                    href={f.href}
                    className="inline-flex items-center rounded-full border border-border bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dark/70 transition-colors hover:border-primary/40 hover:text-dark"
                  >
                    {f.label}
                  </a>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ INTRO — Homepage vs. Landingpage ══ */}
      <section className="py-20 lg:py-28 overflow-hidden" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="scroll-hidden order-last lg:order-first" style={{ transitionDelay: "120ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/lp-3d-wege.png"
                  alt="3D-Illustration: verzweigtes Wegenetz einer Website links, gerader Weg einer Landing Page zum Call-to-Action rechts"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <p className="mt-3 text-xs italic text-muted">Links: Website zum Stöbern. Rechts: eine Seite, ein Ziel.</p>
            </div>

            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Landingpage vs. normale Unterseite</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
                Eine Seite,<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ein Ziel.
                </span>
              </h2>
              <div className="space-y-4 text-muted leading-relaxed max-w-lg">
                <p>
                  Eine Landing Page ist keine verkleinerte Website. Eine normale Unterseite lädt
                  zum Stöbern ein und deckt mehrere Themen gleichzeitig ab. Eine Landing Page
                  verfolgt genau ein Ziel: den Klick, die Anfrage, den Kauf. Jedes Element arbeitet
                  auf dieses Ziel hin — Headline, Bild, Text, Button. Ohne Hauptnavigation, ohne
                  Ablenkung, ohne Umweg.
                </p>
                <p>
                  Der Unterschied zeigt sich vor allem im Traffic. Wer über eine Google-Ads-Anzeige
                  oder einen Meta-Post kommt, hat bereits eine Erwartung im Kopf. Die Landing Page
                  muss dieses Versprechen sofort einlösen. Genau hier scheitern viele normale
                  Unterseiten. Deshalb bauen wir Landing Pages als eigenständiges Werkzeug innerhalb
                  unseres{" "}
                  <Link href="/webdesign" className="text-primary font-semibold hover:underline">Webdesign</Link>-Angebots
                  — nicht als Nebenprodukt der Hauptseite.
                </p>
                <p>
                  Du brauchst eine Landing Page, sobald du bezahlten Traffic auf ein einzelnes
                  Angebot lenkst. Auch für einen Produkt-Launch oder gezielte Lead-Generierung
                  lohnt sie sich. Läuft die Kampagne stattdessen auf die Startseite, verlierst du
                  viele Besucher, bevor sie verstanden haben, worum es geht.
                </p>
              </div>
              <a
                href="#einsatz"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors w-fit"
              >
                Wann du eine Landing Page brauchst
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ EINSATZ — 4 Szenarien ══ */}
      <section id="einsatz" className="bg-white py-24 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Wann sich eine Landing Page lohnt"
            title={<>Vier Szenarien,<br />ein Muster.</>}
            copy="Sobald Budget hinter deinem Traffic steckt, entscheidet die Zielseite darüber, was davon ankommt."
          />

          <div className="grid gap-px bg-border border border-border rounded-2xl overflow-hidden md:grid-cols-2">
            {EINSATZ.map((e, i) => (
              <div key={e.t} className="scroll-hidden h-full" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="group relative h-full bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-[#FBF8F4]">
                  <span
                    className="absolute top-0 left-0 right-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                    aria-hidden="true"
                  />
                  <div className="font-mono text-[11px] tracking-[0.18em] text-dark/45 mb-5">SZENARIO 0{i + 1}</div>
                  <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {icon(e.s)}
                  </div>
                  <h3 className="font-bold text-dark text-lg mb-2">{e.t}</h3>
                  <p className="text-sm text-muted leading-relaxed">{e.d}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="scroll-hidden mt-6 text-sm text-muted">
            Und woraus besteht so eine Seite?{" "}
            <a href="#anatomie" className="font-semibold text-primary border-b border-primary/30 pb-px hover:border-primary transition-colors">
              Zur Anatomie einer Landingpage
            </a>
          </p>
        </div>
      </section>

      {/* ══ ANATOMIE — Explorer (App 1), Ink-Anker: Papier-Karte auf dunkler Fläche ══ */}
      <section id="anatomie" className="bg-dark py-24 lg:py-32 scroll-mt-20 overflow-x-clip">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead
            dark
            eyebrow="Der Beweis"
            title={<>Die Anatomie einer Landingpage,<br />die konvertiert.</>}
            copy="Landingpage erstellen lassen heißt vor allem: sechs Conversion-Prinzipien sauber umsetzen. Klick dich durch — jede Zone der Skizze gehört zu einem."
          />

          <div
            className="m3d rounded-3xl"
            style={{ boxShadow: "0 40px 90px -30px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,168,83,0.25)" }}
          >
            <AnatomieExplorer />
          </div>

          <div className="scroll-hidden mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">Schematische Darstellung</p>
            <p className="text-sm text-white/60">
              So setzen wir das für dich um:{" "}
              <a href="#prozess" className="font-semibold text-secondary border-b border-secondary/40 pb-px hover:border-secondary transition-colors">
                Zum Ablauf
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ══ PROZESS — 5 Schritte + Anatomie-Bild ══ */}
      <section id="prozess" className="bg-white py-24 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Unser Prozess"
            title={<>Landingpage erstellen lassen —<br />in fünf Schritten.</>}
            copy="Design und Text entstehen im Zusammenspiel — und nach dem Launch fängt die Optimierung erst an."
          />

          <div className="grid lg:grid-cols-[1fr_minmax(0,420px)] gap-10 lg:gap-16 items-start">
            <div>
            <div className="rounded-2xl border border-border bg-white overflow-hidden divide-y divide-border shadow-[0_28px_60px_-30px_rgba(26,26,26,0.35)]">
              {STEPS.map((s, i) => {
                const last = i === STEPS.length - 1;
                return (
                  <div key={s.nr} className="scroll-hidden" style={{ transitionDelay: `${i * 60}ms` }}>
                    <div
                      className="relative flex gap-5 p-6 lg:p-7 transition-colors duration-300 hover:bg-[#FBF8F4]"
                      style={last ? { background: "#fbf4ea" } : undefined}
                    >
                      {last && (
                        <span className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: "linear-gradient(180deg, #C2722A, #D4A853)" }} aria-hidden="true" />
                      )}
                      <span className="font-[family-name:var(--font-heading)] text-4xl font-black text-primary/20 w-14 shrink-0 leading-none pt-0.5">{s.nr}</span>
                      <div>
                        <h3 className="font-bold text-dark mb-1.5">{s.t}</h3>
                        <p className="text-sm text-muted leading-relaxed">{s.d}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tech-Beleg: echte Tools aus den Schritten 04 + 05 */}
            <div className="scroll-hidden mt-9 border-t-2 border-dark pt-7">
              <span className="mb-5 block font-mono text-[11px] uppercase tracking-[0.2em] text-dark/40">Womit wir bauen &amp; messen</span>
              <div className="flex flex-wrap gap-3">
                {[
                  { src: "/logos/nextdotjs.svg", name: "Next.js", sub: "Framework" },
                  { src: "/logos/wordpress.svg", name: "WordPress", sub: "CMS-Option" },
                  { src: "/logos/googleanalytics.svg", name: "GA4", sub: "Tracking" },
                  { src: "/logos/google.svg", name: "Google Ads", sub: "Kampagnen" },
                ].map((t, i) => (
                  <div
                    key={t.name}
                    className="scroll-hidden group flex min-w-[160px] items-center gap-3.5 rounded-xl border border-border bg-white px-4 py-3 transition-all hover:border-[#ecd3ba] hover:bg-[#fbf4ea] hover:shadow-[0_14px_30px_-16px_rgba(194,114,42,0.35)]"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <Image
                      src={t.src}
                      alt={`${t.name} Logo`}
                      width={24}
                      height={24}
                      className="h-6 w-auto grayscale opacity-60 transition-all duration-200 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <span className="leading-tight">
                      <b className="block font-[family-name:var(--font-heading)] text-sm font-bold text-dark">{t.name}</b>
                      <small className="font-mono text-[10px] uppercase tracking-[0.08em] text-dark/40">{t.sub}</small>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            </div>

            <div className="scroll-hidden lg:sticky lg:top-28" style={{ transitionDelay: "120ms" }}>
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-square w-full max-w-[420px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/landingpage-anatomie.webp"
                  alt="Aufbau einer conversion-optimierten Landingpage: Hero, Benefit-Blöcke, Social Proof und klarer Call-to-Action"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
              <p className="mt-3 text-xs text-muted">
                Das Ergebnis: eine Seite, ein Ziel, ein glühender CTA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ KOSTEN — Preisanker + 4 Faktoren ══ */}
      <section id="kosten" className="py-24 lg:py-32 scroll-mt-20" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Kosten &amp; Investition</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-6">
                Landingpage erstellen lassen:<br />die Kosten.
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Eine custom-coded Landing Page startet bei SeoForge{" "}
                <strong className="text-dark font-semibold">ab 1.500 €</strong>. Den finalen Preis
                legen wir als verbindlichen Festpreis fest — nach einem kostenlosen Erstgespräch
                zu Umfang, Ziel und technischen Anforderungen. Keine Nachverhandlung während des
                Projekts, keine versteckten Stunden.
              </p>
              <p className="text-muted leading-relaxed mb-7">
                Wie hoch der Preis ausfällt, hängt von vier Faktoren ab: Umfang der Seite,
                Varianten für A/B-Tests, Copywriting-Aufwand und Tiefe der Tracking-Anbindung.
                Willst du nur einen Onepager erstellen lassen, bleibt das Budget entsprechend
                schlank — was einen One Pager ausmacht, erklärt unser{" "}
                <Link href="/wissen/ratgeber/one-pager-website" className="border-b-2 border-primary font-semibold text-dark transition-colors hover:bg-[#fbf4ea] hover:text-primary">
                  Ratgeber zur One-Pager-Website
                </Link>
                . Eine mehrsprachige Landing Page mit mehreren Varianten und CRM-Anbindung kostet
                entsprechend mehr.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:-translate-y-0.5"
                >
                  Kostenlose Ersteinschätzung
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <span className="font-mono text-xs text-muted">Verbindlicher Festpreis nach Erstgespräch</span>
              </div>
            </div>

            <div className="relative grid sm:grid-cols-2 gap-4">
              <span
                className="pointer-events-none absolute -right-2 -top-4 z-10 inline-block border-2 border-primary px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
                style={{ transform: "rotate(-4deg)", background: "rgba(251,244,234,0.92)" }}
                aria-hidden="true"
              >
                Festpreis · ab 1.500 €
              </span>
              {FACTORS.map((f, i) => (
                <div key={f.t} className="scroll-hidden" style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="group h-full rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-1">
                    <div className="font-mono text-[11px] tracking-[0.16em] text-dark/45 mb-4">FAKTOR 0{i + 1}</div>
                    <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {icon(f.s)}
                    </div>
                    <div className="font-bold text-dark text-sm mb-1.5">{f.t}</div>
                    <p className="text-muted text-[13px] leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA-BAND — Terracotta-Solid (Mid-Page) ══ */}
      <section className="py-16 lg:py-20 overflow-x-clip" style={{ background: "#C2722A" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="scroll-hidden rv-left">
            <span className="block font-mono text-[11px] tracking-[0.22em] uppercase text-white/70 mb-3">Nächster Schritt</span>
            <p className="font-[family-name:var(--font-heading)] text-2xl lg:text-4xl font-bold leading-[1.1] text-white">
              Landingpage erstellen lassen — zum verbindlichen Festpreis.
            </p>
          </div>
          <a
            href="#kontakt"
            className="scroll-hidden rv-right inline-flex items-center gap-3 rounded-full bg-dark px-8 py-4 font-semibold text-white transition-colors hover:bg-[#2a2a2a] shadow-[0_18px_40px_-14px_rgba(26,26,26,0.55)]"
          >
            Kostenloses Erstgespräch <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ══ VORTEILE — Message-Match-Demo (App 2) + Nutzen ══ */}
      <section id="vorteile" className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="scroll-hidden order-last lg:order-first" style={{ transitionDelay: "120ms" }}>
              <div className="rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)]">
                <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
                  <span className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-dark/45">Message-Match — Anzeige ↔ Landingpage</span>
                </div>
                <MessageMatchDemo />
              </div>
              <p className="mt-3 text-xs italic text-muted">Illustrative Demo — vereinfachte Darstellung.</p>
            </div>

            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Warum vom Profi</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
                Baukasten kann schnell.<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Custom kann richtig.
                </span>
              </h2>
              <p className="text-muted leading-relaxed max-w-md mb-6">
                Baukasten-Tools versprechen eine Landing Page in einer Stunde. Was sie selten
                liefern: saubere Ladezeiten, exaktes Tracking und die Möglichkeit, schnell
                nachzujustieren. Wir bei{" "}
                <Link href="/" className="text-primary font-semibold hover:underline">SeoForge</Link>{" "}
                bauen Landing Pages custom-coded, mit demselben technischen Fundament wie unsere
                kompletten Websites. Dasselbe Fundament nutzt auch unsere{" "}
                <Link href="/seo-agentur" className="border-b-2 border-primary font-semibold text-dark transition-colors hover:bg-[#fbf4ea] hover:text-primary">
                  SEO-Agentur
                </Link>{" "}
                für organische Rankings — hier ist es fokussiert auf ein einziges Ziel.
              </p>
              <div className="divide-y divide-border border-t border-b border-border">
                {BENEFITS.map((b, i) => (
                  <div key={b.t} className="scroll-hidden" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="group flex items-start gap-4 py-4">
                      <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {icon(b.s)}
                      </span>
                      <span>
                        <span className="block font-bold text-dark text-sm mb-0.5">{b.t}</span>
                        <span className="block text-[13px] text-muted leading-relaxed">{b.d}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ — Sticky-Sidebar ══ */}
      <section id="faq" className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Häufige Fragen
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[2.6rem] font-bold text-dark leading-tight mb-4">
                Alles zur<br />Landing Page.
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Deine Frage ist nicht dabei? Dann direkt ins Erstgespräch — wir antworten in unter
                24 Stunden.
              </p>
              <a href="#kontakt" className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors">
                Frage stellen
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={i} className="scroll-hidden" style={{ transitionDelay: `${i * 40}ms` }}>
                    <div className={`rounded-2xl border bg-white overflow-hidden transition-colors duration-300 ${open ? "border-primary/30" : "border-border"}`}>
                      <button
                        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                      >
                        <span className="font-semibold text-dark text-sm pr-4">{faq.q}</span>
                        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-primary text-white rotate-180" : "bg-primary/[0.08] text-primary"}`}>
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 9l-7 7-7-7" /></svg>
                        </span>
                      </button>
                      <div className="grid transition-[grid-template-rows] duration-400 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                        <div className="overflow-hidden">
                          <div className="px-6 pb-5 text-sm text-muted leading-relaxed border-t border-border pt-4">{faq.a}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA — Dunkles Finale mit 3-Felder-Formular ══ */}
      <section className="bg-dark py-24 lg:py-32 scroll-mt-20" id="kontakt">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
          </div>

          <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="scroll-hidden">
              <h2 className="font-[family-name:var(--font-heading)] text-4xl text-white lg:text-5xl">
                Bereit für eine Landing Page, die{" "}
                <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                  dein Kampagnenbudget nicht verbrennt
                </span>
                ?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Du willst deine Landingpage erstellen lassen? Lass uns im kostenlosen Erstgespräch
                über dein Ziel, deine Kampagne und den verbindlichen Festpreis sprechen. Wir melden
                uns innerhalb von 24 Stunden zurück.
              </p>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                Das klären wir im Erstgespräch
              </p>
              <div className="mt-4 space-y-4">
                {[
                  "Kampagnenziel und Zielgruppe (z. B. Ads, Launch, Lead-Generierung)",
                  "Gewünschter Zeitrahmen für den Launch",
                  "Bestehende Tracking- oder CRM-Anbindung, falls vorhanden",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <svg className="h-3 w-3 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-hidden" style={{ transitionDelay: "120ms" }}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl text-white">
                  Jetzt Kontakt aufnehmen
                </h3>
                <p className="mt-1 text-sm text-white/50">
                  3 Felder. Mehr braucht eine gute Landingpage nicht.
                </p>
                <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    name="name"
                    aria-label="Dein Name"
                    placeholder="Dein Name"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <input
                    type="email"
                    name="email"
                    aria-label="Deine E-Mail-Adresse"
                    placeholder="Deine E-Mail-Adresse"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <textarea
                    name="message"
                    rows={4}
                    aria-label="Was soll deine Landingpage erreichen?"
                    placeholder="Was soll deine Landingpage erreichen?"
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
                  >
                    Kostenloses Erstgespräch anfragen
                  </button>
                  <p className="text-center text-xs text-white/30">
                    Deine Daten werden vertraulich behandelt.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
