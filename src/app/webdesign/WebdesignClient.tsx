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

const PRINCIPLES = [
  { t: "SEO & Webdesign aus einem Team", d: "Design, Technik und Sichtbarkeit kommen aus einer Hand — keine Schnittstellenverluste zwischen zwei Dienstleistern.", m: "Ein Team", s: "M9 5l7 7-7 7" },
  { t: "DevOps & CI/CD", d: "Automatisierte Tests, Pipeline-Deployments und Versionierung. Änderungen gehen kontrolliert live — jederzeit zurückrollbar.", m: "Live in Minuten", s: "M5 13l4 4L19 7" },
  { t: "KI-Workflows als Preisvorteil", d: "KI übernimmt die Routine — Boilerplate, Tests, Doku. Kürzere Laufzeiten und faire Festpreise bei gleicher Qualität.", m: "Fairer Festpreis", s: "M13 10V3L4 14h7v7l9-11h-7z" },
  { t: "Custom Code statt Baukasten", d: "Handgeschriebener Code mit Next.js oder WordPress — kein Template, kein Plugin-Overhead, keine Sicherheitslast.", m: "Next.js · WordPress", s: "M16 18l6-6-6-6M8 6l-6 6 6 6" },
  { t: "SEO + GEO ab der ersten Zeile", d: "Sichtbar in Google — und in der KI-Suche. Inhalte, die ChatGPT, Perplexity und AI Overviews als Quelle zitieren.", m: "Zwei Sichtbarkeits-Kanäle", s: "M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" },
  { t: "Antwort in unter 24 Stunden", d: "Du erreichst einen persönlichen Ansprechpartner statt ein Ticketsystem — und bekommst garantiert in unter 24 h eine Antwort.", m: "Direkt erreichbar", s: "M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
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
  { q: "Was kostet eine professionelle Website?", a: "Der Preis hängt von Umfang, Design-Komplexität und Funktionen ab. Custom-coded Websites starten bei uns ab 1.500 € — dank KI-Workflows deutlich günstiger als klassische Agenturen. Im kostenlosen Erstgespräch bekommst du ein transparentes Festpreisangebot ohne versteckte Kosten." },
  { q: "Wie lange dauert die Entwicklung?", a: "Das hängt vom Umfang ab: Nach dem Konzept folgen Design-Runden, Entwicklung und Testing. Durch KI-gestützte Workflows und automatisierte Deployments sind wir spürbar schneller als klassische Agenturen — den konkreten Zeitplan bekommst du mit dem Festpreisangebot." },
  { q: "Was passiert, wenn mir das Design nicht gefällt?", a: "Design-Feedback gehört zum Prozess — deshalb bauen wir es strukturiert ein. Es gibt zwei feste Design-Review-Runden mit deiner Beteiligung, bevor die Entwicklung startet. Was darin abgenommen wird, ist verbindlich — so vermeiden wir Endlosschleifen auf beiden Seiten." },
  { q: "Kann ich den Fortschritt verfolgen?", a: "Ja — ab dem ersten Entwicklungstag gibt es eine Staging-URL, auf die du jederzeit zugreifen kannst. Durch die CI/CD-Pipeline siehst du neue Änderungen oft innerhalb von Minuten am echten Produkt statt in einem Status-Meeting." },
  { q: "Next.js oder WordPress — was ist besser?", a: "Beides hat seinen Platz. Next.js liefert sehr schnelle Ladezeiten, starke Core Web Vitals und keinen Plugin-Overhead; WordPress ist stark, wenn du Inhalte selbst pflegen willst. Wir empfehlen immer die Technologie, die zu deinen Zielen passt — nicht die teuerste." },
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

const COST_FACTORS = [
  ["Umfang & Seitenzahl", "One-Pager oder mehrseitige Unternehmens-Website mit Unterseiten."],
  ["Individuelles Design", "Maßgeschneidertes UI statt Template — abgestimmt auf deine Marke."],
  ["Funktionen", "Buchung, Mehrsprachigkeit, Schnittstellen oder ein Online-Shop."],
  ["Content & Pflege", "Texte, Bilder, CMS-Einrichtung sowie laufendes Hosting & Wartung."],
];

/* ─── Editorial-Header ────────────────────────────────────────────────────── */
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

/* ─── So arbeiten wir — interaktives Radial (Hub + Satelliten) ─────────────── */
function WorkWheel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const N = PRINCIPLES.length;
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % N), 3000);
    return () => clearInterval(id);
  }, [paused, N]);

  const nodes = PRINCIPLES.map((_, i) => {
    const ang = (-90 + (360 / N) * i) * (Math.PI / 180);
    return { x: 50 + 39 * Math.cos(ang), y: 50 + 39 * Math.sin(ang) };
  });
  const p = PRINCIPLES[active];

  return (
    <div
      className="scroll-hidden grid lg:grid-cols-[minmax(0,440px)_1fr] gap-12 lg:gap-16 items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Radial (Desktop) */}
      <div className="relative hidden lg:block w-full max-w-[440px] aspect-square mx-auto">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs><linearGradient id="wwg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C2722A" /><stop offset="1" stopColor="#D4A853" /></linearGradient></defs>
          <circle cx="50" cy="50" r="39" fill="none" stroke="rgba(26,26,26,0.08)" strokeWidth="0.35" strokeDasharray="0.6 2.6" />
          {nodes.map((n, i) => (
            <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke={i === active ? "url(#wwg)" : "rgba(26,26,26,0.07)"} strokeWidth={i === active ? 1 : 0.4} style={{ transition: "all 0.4s ease" }} />
          ))}
        </svg>
        {/* Hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36%] aspect-square rounded-full bg-white border border-border shadow-[0_22px_50px_-26px_rgba(26,26,26,0.3)] flex flex-col items-center justify-center text-center">
          <span className="text-2xl leading-none mb-1" style={{ color: "#C2722A" }}>✻</span>
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-dark/45 leading-tight">So<br />arbeiten<br />wir</span>
        </div>
        {/* Satelliten */}
        {PRINCIPLES.map((pr, i) => {
          const n = nodes[i]; const on = i === active;
          return (
            <button
              key={pr.t}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-label={pr.t}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl flex items-center justify-center transition-all duration-300"
              style={{
                left: `${n.x}%`, top: `${n.y}%`,
                width: on ? 80 : 66, height: on ? 80 : 66,
                background: on ? "linear-gradient(135deg,#C2722A,#D4A853)" : "#fff",
                border: on ? "none" : "1px solid var(--color-border)",
                color: on ? "#fff" : "rgba(26,26,26,0.55)",
                boxShadow: on ? "0 16px 32px -10px rgba(194,114,42,0.55)" : "0 8px 18px -12px rgba(26,26,26,0.25)",
              }}
            >
              {icon(pr.s)}
            </button>
          );
        })}
      </div>

      {/* Detail */}
      <div className="relative">
        {/* Mobile-Auswahl */}
        <div className="lg:hidden flex flex-wrap gap-2 mb-7">
          {PRINCIPLES.map((pr, i) => {
            const on = i === active;
            return (
              <button key={pr.t} type="button" onClick={() => setActive(i)} aria-label={pr.t}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{ background: on ? "linear-gradient(135deg,#C2722A,#D4A853)" : "#fff", color: on ? "#fff" : "rgba(26,26,26,0.55)", border: on ? "none" : "1px solid var(--color-border)" }}>
                {icon(pr.s)}
              </button>
            );
          })}
        </div>
        <div key={active} className="ww-fade">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-[family-name:var(--font-heading)] font-black leading-none" style={{ fontSize: "clamp(48px,6vw,68px)", background: "linear-gradient(135deg,#C2722A,#D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{String(active + 1).padStart(2, "0")}</span>
            <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase text-primary">{p.m}</span>
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-dark mb-3">{p.t}</h3>
          <p className="text-muted leading-relaxed max-w-lg">{p.d}</p>
          <div className="flex gap-1.5 mt-8">
            {PRINCIPLES.map((_, i) => (
              <button key={i} type="button" onClick={() => setActive(i)} aria-label={`Prinzip ${i + 1}`} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === active ? 28 : 8, background: i === active ? "#C2722A" : "rgba(26,26,26,0.15)" }} />
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes wwFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } } .ww-fade { animation: wwFade 0.4s ease; }`}</style>
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

      {/* ══ WARUM SEOFORGE — Fließtext ══ */}
      <section className="py-20 lg:py-28" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center scroll-hidden">
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Warum SeoForge</span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[44px] font-bold text-dark leading-[1.12] mb-7">
            SEO und Webdesign gehören zusammen.
          </h2>
          <div className="space-y-5 text-lg lg:text-xl text-muted leading-relaxed">
            <p>
              Die meisten Agenturen trennen Design und Sichtbarkeit: Die einen bauen etwas Schönes,
              die anderen sollen es hinterher „ranken lassen". Heraus kommen Websites, die gut aussehen,
              aber langsam laden, schlecht gefunden werden und kaum Anfragen bringen. Wer beides auf zwei
              Dienstleister verteilt, zahlt doppelt — und verliert trotzdem.
            </p>
            <p>
              Bei SeoForge kommt alles aus einem Team: Strategie, Design, Code und SEO greifen von der
              ersten Zeile ineinander. Wir bauen Websites, die nicht nur überzeugen, sondern von Anfang an
              dafür gemacht sind, in Google <strong className="text-dark font-semibold">und</strong> in der
              KI-Suche gefunden zu werden — schnell, sauber entwickelt und messbar wirksam.
            </p>
          </div>
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

      {/* ══ CONTENT — Was gutes Webdesign ausmacht ══ */}
      <section className="bg-white py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Webdesign-Ratgeber"
            title={<>Was professionelles<br />Webdesign 2026 ausmacht.</>}
            copy="Modernes Webdesign ist mehr als Optik. Diese sechs Faktoren entscheiden 2026 über Sichtbarkeit, Nutzererlebnis und Anfragen — und sind bei uns Standard, nicht Aufpreis."
          />
          <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
            {ASPECTS.map((a, i) => (
              <div key={a.t} className="scroll-hidden flex gap-5" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">{icon(a.s)}</div>
                <div>
                  <h3 className="font-bold text-dark text-lg mb-1.5">{a.t}</h3>
                  <p className="text-muted text-sm leading-relaxed">{a.d}</p>
                  {a.link && (
                    <Link href={a.link.href} className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:gap-2.5 transition-all">
                      {a.link.label}
                      <span>→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
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

      {/* ══ PRINZIPIEN ══ */}
      <section className="py-24 lg:py-32 overflow-hidden border-t border-border" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="So arbeiten wir"
            title={<>Sechs Prinzipien,<br />ein messbares Ergebnis.</>}
            copy="Keine Hochglanz-Versprechen — der konkrete Unterschied zwischen uns und einer klassischen Webdesign-Agentur."
          />
          <WorkWheel />
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
        </div>
      </section>

      {/* ══ CONTENT — Was kostet eine Website ══ */}
      <section className="bg-white py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Kosten & Investition"
            title={<>Was kostet eine<br />professionelle Website?</>}
            copy="Die ehrliche Antwort: Es kommt auf den Umfang an. Vier Faktoren bestimmen den Preis — den verbindlichen Festpreis legen wir transparent im Erstgespräch fest."
          />
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="scroll-hidden">
              <p className="text-muted leading-relaxed mb-5">
                Seriöse Pauschalpreise gibt es im Webdesign nicht — ein einfacher One-Pager
                kostet weniger als eine mehrsprachige Unternehmens-Website mit Shop. Entscheidend
                ist nicht der niedrigste Preis, sondern was du dafür bekommst: Custom Code,
                Performance und ein SEO-Fundament, das Anfragen bringt.
              </p>
              <p className="text-muted leading-relaxed mb-7">
                Bei uns starten custom-coded Websites <strong className="text-dark font-semibold">ab 1.500 €</strong> —
                dank KI-Workflows und DevOps-Automatisierung deutlich unter klassischen
                Agenturpreisen. Gerade für den{" "}
                <Link href="/webdesign/firmenwebsite-erstellen-lassen" className="text-primary font-semibold hover:underline">Mittelstand</Link>{" "}
                rechnet sich das. Den Festpreis bekommst du nach einem kostenlosen Erstgespräch —
                ohne versteckte Kosten.
              </p>
              <Link href="/kontakt" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl">
                Festpreis anfragen
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
            <div className="m3d rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-30px_rgba(26,26,26,0.18)]">
              <div className="px-6 py-4 border-b border-border bg-offwhite/60">
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-dark/45">Preisfaktoren</span>
              </div>
              <div className="divide-y divide-border">
                {COST_FACTORS.map(([k, v], i) => (
                  <div key={k} className="flex gap-4 px-6 py-4">
                    <span className="font-mono text-xs font-bold text-primary pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="font-bold text-dark text-sm">{k}</div>
                      <div className="text-muted text-[13px] leading-relaxed">{v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-24 lg:py-32 border-t border-border" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="scroll-hidden mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">Häufige Fragen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">Alles zum Webdesign</h2>
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
      </section>

      {/* ══ CTA ══ */}
      <section className="relative py-24 overflow-hidden" style={{ background: "#1A1A1A" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-primary/[0.07] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="scroll-hidden">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-4">Bereit für eine Website, die wirklich liefert?</h2>
            <p className="text-white/60 text-lg mb-3 leading-relaxed">Kostenloses Erstgespräch — wir klären in 30 Minuten, was dein Projekt braucht und was es kostet.</p>
            <p className="text-white/40 text-sm mb-9">Persönlicher Ansprechpartner · Antwort in unter 24 Stunden · Festpreis nach Erstgespräch</p>
            <Link href="/kontakt" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl transition-all">
              Kostenloses Gespräch buchen →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
