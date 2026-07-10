"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import WebdesignHero from "./WebdesignHero";

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

/* ─── Daten ───────────────────────────────────────────────────────────────── */
const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VS_ROWS = [
  { alt: "Design hier, SEO dort — zwei Dienstleister, doppelte Abstimmung", forge: "Design, Code und SEO aus einem Team — verzahnt ab der ersten Zeile" },
  { alt: "Template vom Baukasten, Plugin-Overhead inklusive", forge: "Custom Code mit Next.js oder WordPress — schlank, schnell, sicher" },
  { alt: "Änderungen dauern Wochen und gehen ungetestet live", forge: "CI/CD-Pipeline: kontrolliert live in Minuten — jederzeit zurückrollbar" },
  { alt: "Abrechnung nach Aufwand — der Preis wächst mit", forge: "KI-Workflows übernehmen die Routine — fairer, verbindlicher Festpreis" },
  { alt: "Nur auf Google optimiert — die KI-Suche wird ignoriert", forge: "SEO + GEO: sichtbar in Google und zitierfähig für ChatGPT & Co." },
  { alt: "Ticketsystem — Antwort irgendwann", forge: "Persönlicher Ansprechpartner — Antwort in unter 24 Stunden" },
];

const TECH = [
  {
    num: "01", category: "SEO-Fundament", headline: "Technisches SEO · Core Web Vitals · Schema",
    desc: "Ohne starkes SEO-Fundament wirken Design und Code nicht. Wir bauen es zuerst — nicht zuletzt.",
    items: ["SEO-optimierte URL-Struktur", "Schema-Markup & strukturierte Daten", "Core Web Vitals (LCP · CLS · INP)", "Interne Linkarchitektur", "Sitemap, Robots & Indexierung", "GEO: zitierfähig für die KI-Suche"],
    impact: { val: "SEO", label: "Fundament von Tag 1" },
  },
  {
    num: "02", category: "Entwicklung", headline: "Next.js · React · TypeScript · CI/CD",
    desc: "Schnelle Websites mit modernem Stack: SSR/SSG, Edge-Deployment und automatisierte Pipelines.",
    items: ["Next.js · App Router", "TypeScript — type-safe", "CI/CD-Pipeline & Preview-Deploys", "Edge Functions", "Bildoptimierung (WebP / AVIF)", "Core Web Vitals optimiert"],
    impact: { val: "Speed", label: "Performance by default" },
  },
  {
    num: "03", category: "Design & UX", headline: "Wireframes · UI · Conversion",
    desc: "Design, das nicht nur gut aussieht, sondern führt: durchdachte Wireframes, klare Nutzerführung, CRO.",
    items: ["Wireframes & Klick-Prototypen", "Mobile-First & responsive", "Durchdachte UX-Flows", "Conversion-orientiertes Layout", "Konsistentes Design-System", "Barrierearm (WCAG-orientiert)"],
    impact: { val: "CRO", label: "auf Conversion designt" },
  },
];

const faqs = [
  { q: "Was kostet eine professionelle Website?", a: "Der Preis hängt von Umfang, Design-Komplexität und Funktionen ab. Custom-coded Websites starten bei uns ab 1.500 € — dank KI-Workflows deutlich günstiger als bei einer klassischen Webdesign-Agentur. Im kostenlosen Erstgespräch bekommst du ein transparentes Festpreisangebot ohne versteckte Kosten." },
  { q: "Wie lange dauert die Entwicklung?", a: "Das hängt vom Umfang ab: Nach dem Konzept folgen Design-Runden, Entwicklung und Testing. Durch KI-gestützte Workflows und automatisierte Deployments sind wir spürbar schneller als klassische Agenturen — den konkreten Zeitplan bekommst du mit dem Festpreisangebot." },
  { q: "Was passiert, wenn mir das Design nicht gefällt?", a: "Design-Feedback gehört zum Prozess — deshalb bauen wir es strukturiert ein. Es gibt zwei feste Design-Review-Runden mit deiner Beteiligung, bevor die Entwicklung startet. Was darin abgenommen wird, ist verbindlich — so vermeiden wir Endlosschleifen auf beiden Seiten." },
  { q: "Kann ich den Fortschritt verfolgen?", a: "Ja — ab dem ersten Entwicklungstag gibt es eine Staging-URL, auf die du jederzeit zugreifen kannst. Durch die CI/CD-Pipeline siehst du neue Änderungen oft innerhalb von Minuten am echten Produkt statt in einem Status-Meeting." },
  { q: "Next.js oder WordPress — was ist besser?", a: "Beides hat seinen Platz. Next.js liefert sehr schnelle Ladezeiten, starke Core Web Vitals und keinen Plugin-Overhead. WordPress ist stark, wenn du Inhalte selbst pflegen willst. Wir empfehlen immer die Technologie, die zu deinen Zielen passt — nicht die teuerste." },
  { q: "Was bedeutet „KI-gestützte Entwicklung“ — wird meine Website dann generisch?", a: "Nein. KI beschleunigt bei uns nur die Routine: Boilerplate-Code, Tests, Dokumentation, Copy-Varianten. Design und Entwicklung sind vollständig custom — auf Basis deiner Marke und Zielgruppe. Das Ergebnis ist maßgeschneidert, die Entwicklungszeit kürzer." },
  { q: "Was passiert nach dem Launch?", a: "Nach dem Go-Live begleiten wir aktiv: Search-Console-Monitoring, Ranking-Verfolgung, Performance-Checks. Danach optional laufende Betreuung, Content-Updates oder ein SEO-Retainer. Wir übergeben nicht einfach und sind weg." },
  { q: "Bietet ihr auch Website-Relaunches an?", a: "Ja. Wir analysieren zuerst deine bestehende Website und migrieren sauber mit 301-Weiterleitungen und Search-Console-Monitoring — kein Ranking-Verlust durch einen unsauber durchgeführten Relaunch. Mehr dazu auf der Seite Website Relaunch." },
];

/* ─── Content: Was gutes Webdesign ausmacht (rankingrelevant) ─────────────── */
const ASPECTS: { t: string; d: string; s: string; link?: { href: string; label: string } }[] = [
  { t: "Mobile-First & Responsive", d: "Über die Hälfte des Traffics kommt vom Smartphone. Wir entwerfen zuerst für kleine Screens und skalieren nach oben — auf Smartphone, Tablet und Desktop gleichermaßen scharf und bedienbar.", s: "M7 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm5 14h.01" },
  { t: "Ladezeit & Core Web Vitals", d: "Google bewertet die echte Nutzererfahrung: LCP unter 2,5 s, CLS unter 0,1. Wir setzen auf einen schlanken Code-Stack, der diese Google-Benchmarks von Haus aus erreicht — nicht erst nach Plugins.", s: "M13 10V3L4 14h7v7l9-11h-7z" },
  { t: "Durchdachte UX & Nutzerführung", d: "Gutes Design denkt in Nutzerzielen, nicht in Effekten. Eine klare Struktur bringt Besucher schneller zum Ziel — und damit zur Anfrage. Form folgt Funktion, nicht umgekehrt.", s: "M3 3h7v7H3zM14 3h7v4h-7zM14 11h7v10h-7zM3 14h7v7H3z" },
  { t: "SEO-Fundament im Code", d: "Saubere URL-Struktur, Schema-Markup und schnelle Technik stecken im Code — nicht obendrauf. So ist deine Website von Tag 1 rankingfähig, in Google und in der KI-Suche.", s: "M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z", link: { href: "/webdesign/website-erstellen-lassen", label: "Website erstellen lassen" } },
  { t: "Barrierefreiheit (BFSG)", d: "Seit Juni 2025 ist Barrierefreiheit für viele Unternehmen Pflicht (Barrierefreiheitsstärkungsgesetz). Barrierearme Seiten ranken besser und konvertieren mehr — wir bauen sie standardmäßig zugänglich.", s: "M12 4a2 2 0 1 0 0-0.01M4.5 8.5l7.5 1.5 7.5-1.5M12 10v5l-2.5 5M12 15l2.5 5" },
  { t: "Conversion-Optimierung", d: "Eine schöne Website ist wertlos, wenn niemand anfragt. Klare CTAs, Vertrauenselemente und conversion-orientierte Layouts machen aus Besuchern Kunden — besonders bei Kampagnen-Seiten.", s: "M3 17l6-6 4 4 8-8M21 7v4M21 7h-4", link: { href: "/webdesign/landingpage-erstellen-lassen", label: "Conversion-Landing-Pages" } },
];

const COST_TILES = [
  { t: "Umfang & Seitenzahl", d: "One-Pager oder mehrseitige Unternehmens-Website mit Unterseiten.", s: "M3 3h18v18H3zM3 9h18M9 21V9" },
  { t: "Individuelles Design", d: "Maßgeschneidertes UI statt Template — abgestimmt auf deine Marke.", s: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13L2 21.75l.8-2.935a4.5 4.5 0 011.13-1.897l12.932-12.43z" },
  { t: "Funktionen", d: "Buchung, Mehrsprachigkeit, Schnittstellen oder ein Online-Shop.", s: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" },
  { t: "Content & Pflege", d: "Texte, Bilder, CMS-Einrichtung sowie laufendes Hosting & Wartung.", s: "M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" },
];

/* ─── Editorial-Header/* ─── Editorial-Header ────────────────────────────────────────────────────── */
function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy: string }) {
  return (
    <div className="scroll-hidden grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-16 items-end mb-12 lg:mb-16">
      <div>
        <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">{eyebrow}</span>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12]">{title}</h2>
      </div>
      <p className="text-muted leading-relaxed lg:pb-1.5 lg:text-right">{copy}</p>
    </div>
  );
}

/* ─── Interaktiver Tech-Stack (hell) ──────────────────────────────────────── */
function TechSwitcher() {
  const [active, setActive] = useState(0);
  const t = TECH[active];
  return (
    <div className="scroll-hidden grid lg:grid-cols-[minmax(0,380px)_1fr] gap-6 lg:gap-10 items-stretch">
      {/* Auswahl */}
      <div className="flex flex-col gap-3">
        {TECH.map((layer, i) => {
          const on = active === i;
          return (
            <button
              key={layer.num}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className="flex-1 text-left rounded-2xl border p-5 lg:p-6 transition-all duration-300 cursor-pointer"
              style={{
                background: on ? "#fff" : "transparent",
                borderColor: on ? "rgba(194,114,42,0.3)" : "var(--color-border)",
                boxShadow: on ? "0 18px 44px -20px rgba(194,114,42,0.25)" : "none",
              }}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold" style={{ color: on ? "#C2722A" : "rgba(26,26,26,0.3)" }}>{layer.num}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-[family-name:var(--font-heading)] text-lg font-black text-dark leading-tight">{layer.category}</div>
                  <div className="text-[11px] text-muted truncate">{layer.headline}</div>
                </div>
                <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: on ? "#C2722A" : "rgba(26,26,26,0.05)", color: on ? "#fff" : "rgba(26,26,26,0.35)" }}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="relative rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)] flex flex-col">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
          <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
          <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-dark/45">{t.category}</span>
          <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1">
            <span className="font-[family-name:var(--font-heading)] text-sm font-black text-primary">{t.impact.val}</span>
            <span className="text-[11px] text-dark/55">{t.impact.label}</span>
          </span>
        </div>
        <div key={active} className="flex-1 p-6 lg:p-8">
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-2">{t.headline}</h3>
          <p className="text-muted text-sm leading-relaxed mb-6 max-w-xl">{t.desc}</p>
          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {t.items.map((it, i) => (
              <div key={it} className="bg-white p-4 flex items-center gap-3" style={{ animation: `tsIn 0.4s ease both ${i * 70}ms` }}>
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                </span>
                <span className="text-sm text-dark font-medium">{it}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes tsIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

/* ─── Leistungen im Detail: Splitscreens zu allen Unterseiten ─────────────── */
const DETAIL_SPLITS = [
  {
    href: "/webdesign/website-erstellen-lassen",
    eyebrow: "Neue Website",
    t1: "Website erstellen lassen —",
    t2: "individuell statt Baukasten.",
    copy: "Von der ersten Skizze bis zum Launch: custom Design, sauberer Code und ein SEO-Fundament ab der ersten Zeile — zum transparenten Festpreis. Der komplette Überblick über Prozess, Kosten und Technologie.",
    cta: "Website-Erstellung ansehen",
    img: "/images/webdesign-3d-neuewebsite.png",
    alt: "3D-Illustration: neue Website wird aus einzelnen Design-Bausteinen individuell zusammengesetzt",
  },
  {
    href: "/webdesign/firmenwebsite-erstellen-lassen",
    eyebrow: "Für den Mittelstand",
    t1: "Professionelle Website —",
    t2: "auch mit kleinerem Budget.",
    copy: "Nicht jedes Unternehmen braucht ein 10.000-€-Projekt. Wir entwickeln solide, schnelle und SEO-taugliche Websites für den Mittelstand — ohne Abstriche bei Qualität und Code.",
    cta: "Firmenwebsite-Angebot ansehen",
    img: "/images/webdesign-3d-mittelstand.png",
    alt: "3D-Illustration: professionelle Unternehmens-Website zum fairen Preis für den Mittelstand",
  },
  {
    href: "/webdesign/landingpage-erstellen-lassen",
    eyebrow: "Alles auf einer Seite",
    t1: "One Pager & Landing Pages —",
    t2: "konzentriert, schnell, überzeugend.",
    copy: "Ein One Pager bringt deine Kernbotschaft auf den Punkt — ohne Ablenkung. Ideal für Kampagnen, Gründer und Unternehmen, die schnell und günstig online sein wollen. Mit SEO-Fundament und vollständigem Custom Design.",
    cta: "One Pager entdecken",
    img: "/images/webdesign-3d-onepager.png",
    alt: "3D-Illustration: One-Pager-Website als durchgehende Seite mit einem klaren Call-to-Action",
  },
  {
    href: "/webdesign/website-relaunch-agentur",
    eyebrow: "Bestandswebsite",
    t1: "Website Relaunch —",
    t2: "ohne Ranking-Verlust.",
    copy: "Bestehende Website veraltet, aber die Rankings sollen bleiben? Wir modernisieren mit sauberem 301-Setup, Search-Console-Monitoring und einer Migration, die Google nicht bemerkt — deployt über unsere CI/CD-Pipeline.",
    cta: "Relaunch-Prozess ansehen",
    img: "/images/webdesign-3d-relaunch.png",
    alt: "3D-Illustration: Website-Relaunch — alte graue Website wird zur modernen Website mit warmen Akzenten",
  },
  {
    href: "/webdesign/app-design",
    eyebrow: "Digitale Produkte",
    t1: "App-Design —",
    t2: "durchdacht bis ins letzte Pixel.",
    copy: "UX und UI für Web-Apps und Mobile: von interaktiven Prototypen über durchdachte User Flows bis zur sauberen Implementierung — mit einem konsistenten Design-System als Fundament.",
    cta: "App-Design entdecken",
    img: "/images/webdesign-3d-appdesign.png",
    alt: "3D-Illustration: App-Design — Smartphone mit schwebenden UI-Karten, Charts und Bedienelementen",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function WebdesignClient() {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <WebdesignHero />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style>{`
        .m3d { opacity: 0; transform: translateY(60px) rotateX(-14deg) scale(0.97); transform-origin: 50% 18%; transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); will-change: transform; backface-visibility: hidden; }
        .m3d.scroll-visible { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); }
        @media (prefers-reduced-motion: reduce), (scripting: none) { .m3d { opacity: 1; transform: none; transition: none; } }
      `}</style>

      {/* ══ WARUM SEOFORGE — Editorial + Belege ══ */}
      <section className="py-20 lg:py-28 overflow-hidden" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Warum SeoForge</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[44px] font-bold text-dark leading-[1.12] mb-7">
                SEO und Webdesign<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>gehören zusammen.</span>
              </h2>
              <div className="space-y-5 text-muted text-lg leading-relaxed">
                <p>
                  Die typische Webdesign-Agentur trennt Design und Sichtbarkeit. Die einen bauen etwas
                  Schönes, die anderen sollen es hinterher „ranken lassen“. Heraus kommen Websites, die
                  gut aussehen — aber langsam laden, schlecht gefunden werden und kaum Anfragen bringen.
                </p>
                <p>
                  Bei SeoForge kommt alles aus einem Team. Strategie, Design, Code und SEO greifen ab
                  der ersten Zeile ineinander — die Keyword-Strategie dahinter liefert unsere{" "}
                  <Link href="/seo-agentur" className="border-b-2 border-primary font-semibold text-dark transition-colors hover:bg-[#fbf4ea] hover:text-primary">
                    SEO Agentur
                  </Link>
                  . So entstehen Websites, die in Google{" "}
                  <strong className="text-dark font-semibold">und</strong> in der KI-Suche gefunden
                  werden. Schnell, sauber entwickelt, messbar wirksam.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem]" style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(212,168,83,0.14), transparent 70%)" }} aria-hidden="true" />
              <div className="relative flex flex-col gap-4">
                {[
                  { t: "DevOps & CI/CD", d: "Änderungen gehen kontrolliert live — in Minuten, jederzeit zurückrollbar.", s: "M5 13l4 4L19 7", off: "lg:translate-x-0" },
                  { t: "KI-Workflows", d: "Routine automatisiert — kürzere Laufzeiten, fairer Festpreis.", s: "M13 10V3L4 14h7v7l9-11h-7z", off: "lg:translate-x-10" },
                  { t: "Antwort in unter 24 h", d: "Persönlicher Ansprechpartner statt Ticketsystem — garantiert.", s: "M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", off: "lg:translate-x-20" },
                ].map((c, i) => (
                  <div key={c.t} className={`scroll-hidden ${c.off}`} style={{ transitionDelay: `${i * 90}ms` }}>
                    <div className="group flex items-center gap-5 rounded-2xl border border-border bg-white p-5 lg:p-6 shadow-[0_16px_40px_-24px_rgba(26,26,26,0.18)] hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300">
                      <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)" }}>
                        {icon(c.s)}
                      </div>
                      <div>
                        <h3 className="font-bold text-dark text-base mb-0.5">{c.t}</h3>
                        <p className="text-muted text-sm leading-relaxed">{c.d}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTENT — Was gutes Webdesign ausmacht (Bento) ══ */}
      <section className="bg-white py-24 lg:py-32 border-t-2 border-dark">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Webdesign-Ratgeber"
            title={<>Was professionelles<br />Webdesign 2026 ausmacht.</>}
            copy="Modernes Webdesign ist mehr als Optik. Diese sechs Faktoren entscheiden 2026 über Sichtbarkeit, Nutzererlebnis und Anfragen — und sind bei uns Standard, nicht Aufpreis."
          />
          <div className="grid md:grid-cols-6 gap-4">
            {ASPECTS.map((a, i) => {
              const featured = i === 0;
              const wide = i === ASPECTS.length - 1;
              const span = featured ? "md:col-span-4" : wide ? "md:col-span-6" : "md:col-span-2";
              return (
                <div key={a.t} className={`scroll-hidden ${span}`} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                  <div
                    className={`group relative h-full rounded-3xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_24px_50px_-30px_rgba(194,114,42,0.35)] hover:-translate-y-1 ${wide ? "flex flex-col sm:flex-row sm:items-center gap-5 p-7 lg:p-8" : "p-7 lg:p-8"}`}
                    style={{ background: featured ? "linear-gradient(135deg, #FBF6EF 0%, #fff 55%)" : "#fff" }}
                  >
                    {featured && (
                      <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full" style={{ background: "radial-gradient(circle, rgba(212,168,83,0.16), transparent 70%)" }} aria-hidden="true" />
                    )}
                    <div className={`${wide ? "shrink-0" : "mb-5"} inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300`}>
                      {icon(a.s)}
                    </div>
                    <div className={wide ? "flex-1" : undefined}>
                      <h3 className={`font-bold text-dark mb-2 ${featured ? "font-[family-name:var(--font-heading)] text-2xl" : "text-lg"}`}>{a.t}</h3>
                      <p className={`text-muted leading-relaxed ${featured ? "text-base max-w-xl" : "text-sm"}`}>{a.d}</p>
                      {a.link && (
                        <Link href={a.link.href} className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:gap-2.5 transition-all">
                          {a.link.label}
                          <span>→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="scroll-hidden mt-8 text-sm text-muted leading-relaxed max-w-3xl">
            Du planst ein konkretes Projekt? Ob{" "}
            <Link href="/webdesign/website-erstellen-lassen" className="text-primary font-semibold hover:underline">neue Website</Link>,{" "}
            <Link href="/webdesign/firmenwebsite-erstellen-lassen" className="text-primary font-semibold hover:underline">Firmenwebsite für den Mittelstand</Link>,{" "}
            <Link href="/webdesign/landingpage-erstellen-lassen" className="text-primary font-semibold hover:underline">Landing Page</Link>,{" "}
            <Link href="/webdesign/website-relaunch-agentur" className="text-primary font-semibold hover:underline">Relaunch</Link>{" "}oder{" "}
            <Link href="/webdesign/app-design" className="text-primary font-semibold hover:underline">App-Design</Link>{" "}— wir bauen den passenden Weg, mit SEO als Fundament. Und nach dem Launch:{" "}
            <Link href="/website-wartung" className="text-primary font-semibold hover:underline">laufende Website-Wartung &amp; Betreuung</Link>.
          </p>
        </div>
      </section>

      {/* ══ TERRACOTTA-BAND — Mid-Page-CTA ══ */}
      <section className="py-16 lg:py-20 overflow-x-clip" style={{ background: "#C2722A" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="scroll-hidden rv-left">
            <span className="block font-mono text-[11px] tracking-[0.22em] uppercase text-white/70 mb-3">Webdesign-Agentur — nächster Schritt</span>
            <p className="font-[family-name:var(--font-heading)] text-2xl lg:text-4xl font-bold leading-[1.1] text-white">
              Staging ab Tag 1. Start in unter einer Woche.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="scroll-hidden rv-right inline-flex items-center gap-3 rounded-full bg-dark px-8 py-4 font-semibold text-white transition-colors hover:bg-[#2a2a2a] shadow-[0_18px_40px_-14px_rgba(26,26,26,0.55)]"
          >
            Kostenloses Erstgespräch <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ══ LEISTUNGEN — Splitscreens zu allen Unterseiten ══ */}
      {DETAIL_SPLITS.map((s, i) => {
        const imgRight = i % 2 === 0;
        return (
          <section
            key={s.href}
            id={i === 0 ? "leistungen" : undefined}
            className={`border-t border-border overflow-hidden py-20 lg:py-28 scroll-mt-20 ${imgRight ? "bg-white" : ""}`}
            style={imgRight ? undefined : { background: "#F8F5F1" }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="scroll-hidden">
                  <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">{s.eyebrow}</span>
                  <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
                    {s.t1}<br />
                    <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      {s.t2}
                    </span>
                  </h2>
                  <p className="text-muted leading-relaxed mb-8 max-w-md">{s.copy}</p>
                  <Link
                    href={s.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors w-fit"
                  >
                    {s.cta}
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
                <div
                  className={`scroll-hidden flex justify-center ${imgRight ? "lg:justify-end" : "lg:order-first lg:justify-start"}`}
                  style={{ transitionDelay: "120ms" }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                    <Image src={s.img} alt={s.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 600px" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ══ VERGLEICH — Typische Agentur vs. SeoForge (Ink-Anker) ══ */}
      <section className="bg-dark py-24 lg:py-32 overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-16 items-end mb-12 lg:mb-16">
            <div>
              <span className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary mb-5">
                <span className="h-[2px] w-7 bg-secondary" aria-hidden="true" />
                Der Unterschied
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[48px] font-bold text-white leading-[1.1]">
                Typische Webdesign-Agentur{" "}
                <span style={{ background: "linear-gradient(92deg, #D4A853, #e0bc72)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>vs. SeoForge.</span>
              </h2>
            </div>
            <p className="text-white/60 leading-relaxed lg:pb-1.5 lg:text-right">
              Keine Hochglanz-Versprechen — der konkrete Unterschied in sechs Punkten. So arbeiten wir, und so rechnet es sich für dich.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 items-stretch">
            <div className="scroll-hidden rv-left">
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 lg:p-9">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/45 mb-7">
                  Typische Agentur
                </span>
                <ul className="space-y-5">
                  {VS_ROWS.map((r) => (
                    <li key={r.alt} className="flex gap-3.5 items-start">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white/35" viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                      </span>
                      <span className="text-sm lg:text-[15px] text-white/55 leading-relaxed">{r.alt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="scroll-hidden rv-scale" style={{ transitionDelay: "120ms" }}>
              <div className="relative h-full rounded-3xl p-7 lg:p-9" style={{ background: "#F8F5F1", boxShadow: "0 40px 90px -30px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,168,83,0.25)" }}>
                <span
                  className="pointer-events-none absolute -right-3 -top-4 z-10 inline-block border-2 border-primary px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
                  style={{ transform: "rotate(-4deg)", background: "rgba(251,244,234,0.92)" }}
                  aria-hidden="true"
                >
                  Staging · Tag 1
                </span>
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white mb-7" style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}>
                  SeoForge
                </span>
                <ul className="space-y-5">
                  {VS_ROWS.map((r) => (
                    <li key={r.forge} className="flex gap-3.5 items-start">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                        <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                      </span>
                      <span className="text-sm lg:text-[15px] text-dark font-medium leading-relaxed">{r.forge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TECH-STACK (interaktiv) ══ */}
      <section className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Tech-Stack"
            title={<>Technologie,<br />die liefert.</>}
            copy="Drei Schichten, ein Ergebnis. Wähle eine Schicht — rechts siehst du, was drinsteckt."
          />
          <TechSwitcher />

          {/* Womit wir bauen — Logo-Chips */}
          <div className="mt-14 border-t-2 border-dark pt-9">
            <span className="mb-6 block font-mono text-[11px] uppercase tracking-[0.2em] text-dark/40">Womit wir bauen</span>
            <div className="flex flex-wrap gap-4">
              {[
                { src: "/logos/nextdotjs.svg", name: "Next.js", sub: "Framework" },
                { src: "/logos/tailwindcss.svg", name: "Tailwind CSS", sub: "Styling" },
                { src: "/logos/vercel.svg", name: "Vercel", sub: "Hosting & Edge" },
                { src: "/logos/wordpress.svg", name: "WordPress", sub: "CMS" },
                { src: "/logos/shopify.svg", name: "Shopify", sub: "E-Commerce" },
              ].map((t, i) => (
                <div key={t.name} className="scroll-hidden group flex min-w-[190px] items-center gap-4 rounded-xl border border-border bg-white px-5 py-4 transition-all hover:border-[#ecd3ba] hover:bg-[#fbf4ea] hover:shadow-[0_14px_30px_-16px_rgba(194,114,42,0.35)]" style={{ transitionDelay: `${i * 70}ms` }}>
                  <Image src={t.src} alt={`${t.name} Logo`} width={28} height={28} className="h-7 w-auto grayscale opacity-60 transition-all duration-200 group-hover:grayscale-0 group-hover:opacity-100" />
                  <span className="leading-tight">
                    <b className="block font-[family-name:var(--font-heading)] text-sm font-bold text-dark">{t.name}</b>
                    <small className="font-mono text-[10px] uppercase tracking-[0.08em] text-dark/40">{t.sub}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTENT — Was kostet eine Website ══ */}
      <section className="bg-white py-24 lg:py-32 border-t-2 border-dark">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Kosten & Investition"
            title={<>Was kostet eine<br />professionelle Website?</>}
            copy="Die ehrliche Antwort: Es kommt auf den Umfang an. Vier Faktoren bestimmen den Preis — den verbindlichen Festpreis legen wir transparent im Erstgespräch fest."
          />
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="scroll-hidden">
              <p className="text-muted leading-relaxed mb-5">
                Seriöse Pauschalpreise gibt es im Webdesign nicht. Ein einfacher One-Pager
                kostet weniger als eine mehrsprachige Unternehmens-Website mit Shop. Entscheidend
                ist nicht der niedrigste Preis, sondern was du dafür bekommst: individuelles
                Webdesign, sauberer Code und ein SEO-Fundament, das Anfragen bringt.
              </p>
              <p className="text-muted leading-relaxed mb-7">
                Bei uns starten custom-coded Websites <strong className="text-dark font-semibold">ab 1.500 €</strong>.
                KI-Workflows und DevOps-Automatisierung halten den Preis deutlich unter dem
                klassischer Agenturen. Gerade für den{" "}
                <Link href="/webdesign/firmenwebsite-erstellen-lassen" className="text-primary font-semibold hover:underline">Mittelstand</Link>{" "}
                rechnet sich das. Den Festpreis bekommst du nach einem kostenlosen Erstgespräch —
                ohne versteckte Kosten.
              </p>
              <Link href="/kontakt" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl">
                Festpreis anfragen
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <p className="mt-5 text-sm text-muted">
                Ausführlich im Ratgeber:{" "}
                <Link href="/wissen/ratgeber/was-kostet-eine-website" className="text-primary font-semibold hover:underline">Was kostet eine Website?</Link>
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {COST_TILES.map((f, i) => (
                <div key={f.t} className="scroll-hidden" style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="group h-full rounded-2xl border border-border bg-white p-6 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">{icon(f.s)}</div>
                    <div className="font-bold text-dark text-sm mb-1.5">{f.t}</div>
                    <p className="text-muted text-[13px] leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-24 lg:py-32 border-t border-border" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="scroll-hidden lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">Häufige Fragen</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-4">
                Alles zur<br />Webdesign-Agentur.
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Deine Frage ist nicht dabei? Schreib uns — wir antworten garantiert in unter 24 Stunden.
              </p>
              <Link href="/kontakt" className="group inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors">
                Frage stellen
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={i} className="scroll-hidden" style={{ transitionDelay: `${i * 40}ms` }}>
                    <div className={`rounded-2xl border bg-white overflow-hidden transition-colors duration-300 ${open ? "border-primary/30" : "border-border"}`}>
                      <button className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open}>
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

      {/* ══ CTA ══ */}
      <section className="bg-dark py-24 lg:py-32" id="kontakt">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
          </div>

          <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="scroll-hidden">
              <h2 className="font-[family-name:var(--font-heading)] text-4xl text-white lg:text-5xl">
                Bereit für eine Website, die{" "}
                <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                  wirklich liefert
                </span>
                ?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Lass uns in einem kostenlosen Erstgespräch klären, was dein Projekt braucht und
                was es bei unserer Webdesign-Agentur kostet. Keine Verpflichtungen — nur eine
                ehrliche Einschätzung.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Kostenloses Erstgespräch — in 30 Minuten weißt du, woran du bist",
                  "Verbindlicher Festpreis statt Stundensatz-Überraschungen",
                  "Persönlicher Ansprechpartner — Antwort in unter 24 Stunden",
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

            <div className="scroll-hidden" style={{ transitionDelay: "100ms" }}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl text-white">
                  Jetzt Kontakt aufnehmen
                </h3>
                <p className="mt-1 text-sm text-white/50">
                  Wir melden uns innerhalb von 24 Stunden bei dir.
                </p>
                <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      aria-label="Dein Name"
                      placeholder="Dein Name"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                    />
                    <input
                      type="text"
                      name="company"
                      aria-label="Unternehmen"
                      placeholder="Unternehmen"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    aria-label="Deine E-Mail-Adresse"
                    placeholder="Deine E-Mail-Adresse"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <input
                    type="url"
                    name="website"
                    aria-label="Deine Website-URL (optional)"
                    placeholder="Deine Website-URL (optional)"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <textarea
                    name="message"
                    rows={4}
                    aria-label="Nachricht"
                    placeholder="Worum geht es? Neue Website, Relaunch, Landing Page …"
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
                  >
                    Kostenlose Beratung anfordern
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
