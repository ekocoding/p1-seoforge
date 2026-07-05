"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SubpageLayout from "@/app/components/SubpageLayout";
import GscImpressionsChart from "./GscImpressionsChart";

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
        style={{ transform: "scaleX(0)", background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
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
const DELIVERABLES = ["301-Redirect-Map", "Staging-Preview", "Ranking-Monitoring", "Core-Web-Vitals-Audit"];

const CHECKS = [
  { s: "M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", t: "Das Design wirkt alt", d: "Besucher entscheiden in Sekunden, ob sie einer Website vertrauen. Wirkt dein Auftritt wie aus einer anderen Zeit, springen potenzielle Kunden ab, bevor sie gelesen haben, was du überhaupt anbietest." },
  { s: "M7 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm5 14h.01", t: "Mobile Darstellung hakt", d: "Der Großteil des Traffics kommt heute über das Smartphone. Ruckelt die Navigation, sind Buttons zu klein oder Texte kaum lesbar, verlierst du genau dort die meisten Besucher." },
  { s: "M13 10V3L4 14h7v7l9-11h-7z", t: "Ladezeiten bremsen", d: "Eine Website, die mehrere Sekunden zum Laden braucht, kostet dich Besucher und Rankings gleichermaßen. Page Speed ist längst ein direkter Google-Rankingfaktor, kein Nice-to-have." },
  { s: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13L2 21.75l.8-2.935a4.5 4.5 0 011.13-1.897l12.932-12.43z", t: "Neues Branding, alte Seite", d: "Nach einem Rebranding mit neuem Logo, neuer Farbwelt oder neuem Messaging wirkt eine unveränderte Website wie ein Bruch. Kunden merken solche Unstimmigkeiten schneller, als man denkt." },
  { s: "M3 17l6-6 4 4 8-8M21 7v4M21 7h-4", t: "Traffic ohne Anfragen", d: "Wenn Besucherzahlen stabil sind, aber kaum Anfragen oder Käufe ankommen, liegt das fast nie am Traffic selbst — meistens an Nutzerführung, Struktur oder fehlenden klaren Handlungsaufforderungen." },
  { s: "M16 18l6-6-6-6M8 6l-6 6 6 6", t: "CMS wird zum Risiko", d: "Veraltete Systeme, unzählige Plugins, jede Änderung ein Blindflug. Wenn selbst kleine Anpassungen zum Risiko werden, ist das technische Fundament am Ende seiner Lebensdauer." },
];

const STEPS = [
  { nr: "01", t: "SEO-Analyse der Bestandsseite", d: "Wir erfassen alle rankenden URLs, den bestehenden Traffic und die aktuelle Seitenstruktur. Diese Bestandsaufnahme ist die Grundlage für alles, was danach kommt." },
  { nr: "02", t: "Konzept & Informationsarchitektur", d: "Aus der Analyse entsteht eine neue Sitemap und Seitenstruktur, abgestimmt auf Nutzerführung und Suchintention. Hier legen wir fest, welche Inhalte bleiben, zusammengeführt oder neu geschrieben werden." },
  { nr: "03", t: "Design & UX", d: "Auf Basis der neuen Struktur entwickeln wir das Design — individuell, nicht aus einem Baukasten, und konsequent auf Conversion statt nur auf Optik ausgelegt." },
  { nr: "04", t: "Entwicklung & Migration", d: "Die Website entsteht in Next.js oder WordPress, je nach Anforderung. Parallel migrieren wir die Inhalte und bauen die vollständige Redirect-Map auf." },
  { nr: "05", t: "Pre-Launch-SEO-Check", d: "Vor dem Go-live prüfen wir jede Weiterleitung, jede Canonical-URL, alle Meta-Angaben und das Schema-Markup einzeln. Nichts geht live, das wir nicht vorher getestet haben." },
  { nr: "06", t: "Launch & Monitoring", d: "Der Launch läuft kontrolliert über unsere CI/CD-Pipeline. Anschließend beobachten wir Rankings und Search Console 4–8 Wochen aktiv und reagieren sofort, wenn etwas auffällt." },
];

const PROJEKT_FAKTEN = [
  { val: "2–3 Wochen", t: "Bis zum Go-live", d: "Ein typischer Relaunch mit 5–15 Seiten ist in zwei bis drei Wochen live — von Kickoff bis Launch." },
  { val: "< 1 Woche", t: "Projektstart", d: "Nach der Beauftragung starten wir innerhalb einer Woche mit dem Kickoff — kein monatelanges Warten auf einen Slot." },
  { val: "50 / 50", t: "Zahlung", d: "Die Hälfte des Festpreises bei Projektstart, die andere Hälfte nach dem Go-live — keine versteckten Kosten." },
  { val: "ab Tag 1", t: "Dein Einblick", d: "Staging-URL ab dem ersten Tag: du siehst jeden Stand live und gibst Feedback, wann es dir passt — keine starren Runden." },
];

const GUT_ZU_WISSEN = [
  "Deine alte Website bleibt bis zum Go-live unverändert online.",
  "Der Go-live läuft ohne nennenswerte Ausfallzeit — und ist jederzeit rückrollbar.",
  "4–8 Wochen Ranking-Monitoring nach dem Launch sind inklusive.",
  "Volle Zugänge, Standard-Technologie — kein Baukasten-Lock-in.",
];

const RELAUNCH_FALLEN = [
  { falle: "Alte URLs werden ohne Weiterleitung abgeschaltet — Google läuft auf 404, Rankings und Backlink-Signale verpuffen.", schutz: "Vollständige 301-Redirect-Map vor dem Launch: jede alte URL bekommt ein festes neues Ziel — auch PDFs und Bilder." },
  { falle: "Das Noindex der Staging-Umgebung oder eine blockierende robots.txt geht mit live — Google wirft Seiten aus dem Index.", schutz: "Pre-Launch-Check von Meta-Robots, robots.txt und Sitemap auf der finalen Umgebung — bevor irgendetwas live geht." },
  { falle: "Weiterleitungen als 302 statt 301 oder in langen Ketten — Ranking-Signale kommen nur verwässert an.", schutz: "Direkte 301-Weiterleitungen ohne Ketten: alt zeigt in einem Sprung auf neu, dauerhaft statt temporär." },
  { falle: "Inhalte mit Traffic, Rankings oder Backlinks werden beim Aufräumen gelöscht — niemand merkt es vor dem Launch.", schutz: "Content-Inventur vor dem Konzept: alles mit Traffic, Rankings oder Backlinks wird migriert oder gezielt weitergeleitet." },
  { falle: "Canonical-Tags zeigen nach dem Launch auf Staging-URLs oder die falsche Domain — Google indexiert am Ziel vorbei.", schutz: "Jede Canonical-URL, jedes Meta-Tag und das Schema-Markup werden vor dem Go-live einzeln geprüft." },
  { falle: "Nach dem Launch schaut niemand mehr hin — Indexierungsfehler bleiben wochenlang unbemerkt und kosten Sichtbarkeit.", schutz: "Letzter Voll-Crawl der alten Website als Sicherheitsnetz plus 4–8 Wochen Search-Console-Monitoring — Korrekturen gehen über CI/CD in Minuten live." },
];

const BENEFITS = [
  { s: "M13 10V3L4 14h7v7l9-11h-7z", t: "Schnelleres technisches Fundament", d: "Bessere Ladezeiten und sauberer Code wirken sich direkt auf Rankings und Nutzererfahrung aus." },
  { s: "M3 17l6-6 4 4 8-8M21 7v4M21 7h-4", t: "Höhere Conversion Rate", d: "Klare Nutzerführung und durchdachte Handlungsaufforderungen wandeln mehr Besucher in Anfragen um." },
  { s: "M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z", t: "Sichtbarkeit in Google und KI-Suche", d: "Wir bauen Struktur und Inhalte so, dass sie auch von ChatGPT, Perplexity und AI Overviews sauber erfasst werden." },
  { s: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6", t: "Einfachere Pflege", d: "Ein modernes CMS bedeutet, dass du Inhalte selbst pflegen kannst, ohne für jede Kleinigkeit einen Entwickler zu brauchen." },
];

const FACTORS = [
  { s: "M3 3h18v18H3zM3 9h18M9 21V9", t: "Umfang der Website", d: "Mehr Unterseiten, Funktionen und Vorlagen bedeuten mehr Aufwand in Design und Entwicklung." },
  { s: "M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", t: "Bestehender Content", d: "Je mehr Inhalte migriert, überarbeitet oder neu geschrieben werden müssen, desto größer der Aufwand vor dem Launch." },
  { s: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z", t: "Technische Anforderungen", d: "Onlineshop, individuelle Schnittstellen oder Mehrsprachigkeit erhöhen den Entwicklungsaufwand spürbar." },
  { s: "M4 4v6h6M20 20v-6h-6M20 10a8 8 0 0 0-14.3-3.7L4 8M4 14a8 8 0 0 0 14.3 3.7L20 16", t: "SEO-Migrationsumfang", d: "Viele rankende URLs und Backlinks bedeuten eine umfangreichere Weiterleitungsmap und mehr Kontrollaufwand nach dem Launch." },
];

const faqs = [
  { q: "Wie läuft ein Website-Relaunch ohne Rankingverlust ab?", a: "Der Schlüssel liegt in der Vorbereitung, nicht im Launch selbst. Wir erfassen vor dem Relaunch jede rankende URL, erstellen eine vollständige 301-Weiterleitungsmap und prüfen vor dem Go-live jede Canonical-URL und jedes Meta-Tag einzeln. Nach dem Launch beobachten wir Search Console und Rankings 4–8 Wochen aktiv. Rankingverluste entstehen fast immer durch fehlende Weiterleitungen — genau das schließen wir systematisch aus." },
  { q: "Wann ist ein Relaunch überhaupt sinnvoll?", a: "Wenn mehrere Dinge gleichzeitig nicht mehr passen: veraltetes Design, schlechte mobile Darstellung, niedriger Page-Speed-Wert, eine neue Markenidentität oder eine Conversion Rate, die trotz stabilem Traffic nicht überzeugt. Im kostenlosen Erstgespräch schauen wir uns deine Situation an und sagen dir ehrlich, ob ein vollständiger Relaunch oder eine schrittweise Optimierung die bessere Lösung ist." },
  { q: "Was kostet ein Website-Relaunch bei SeoForge?", a: "Einfachere Relaunches mit 5 bis 15 Seiten starten ab 3.500 €, komplexere Projekte mit Onlineshop oder umfangreicher SEO-Migration ab 8.000 €. Den genauen Preis legen wir als verbindlichen Festpreis im kostenlosen Erstgespräch fest — abhängig vom Umfang deiner bestehenden Website und deinen Zielen. Eine pauschale Zahl ohne dieses Gespräch wäre unseriös." },
  { q: "Wie lange dauert ein Website-Relaunch?", a: "Ein typischer Relaunch mit 5 bis 15 Seiten ist bei uns in 2 bis 3 Wochen live — von Kickoff bis Go-live, Projektstart innerhalb einer Woche nach Beauftragung. Größere Projekte mit Onlineshop oder vielen URLs brauchen entsprechend länger; den konkreten Zeitplan bekommst du mit dem Festpreisangebot. Nach dem Go-live läuft zusätzlich das 4- bis 8-wöchige Ranking-Monitoring." },
  { q: "Kann ich meine bestehenden Inhalte behalten?", a: "Ja. Wir legen gemeinsam fest, welche Inhalte migriert, überarbeitet oder ersetzt werden. Besonders wichtig ist uns, keine Seite zu verlieren, die aktuell organischen Traffic bringt — sie wird entweder migriert oder erhält eine korrekte Weiterleitung. Guter, bereits rankender Content ist Kapital — ein Relaunch sollte ihn erhalten, nicht wegwerfen." },
  { q: "Betreut ihr die Website auch nach dem Relaunch weiter?", a: "Ja, und wir empfehlen das ausdrücklich. Nach einem Relaunch zeigen sich meist neue Optimierungspotenziale — durch die neue Struktur, frische Content-Chancen oder technische Feinheiten, die erst im laufenden Betrieb auffallen. Unsere monatliche SEO-Betreuung setzt direkt auf dem sauberen technischen Fundament auf, das der Relaunch geschaffen hat." },
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

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function WebsiteRelaunchClient() {
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggleCheck = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

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
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ScrollProgressBar />
      <style>{`
        .m3d { opacity: 0; transform: translateY(60px) rotateX(-14deg) scale(0.97); transform-origin: 50% 18%; transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); will-change: transform; backface-visibility: hidden; }
        .m3d.scroll-visible { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); }
        @keyframes chipPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .chip-dot { animation: chipPulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce), (scripting: none) {
          .m3d { opacity: 1; transform: none; transition: none; }
          .chip-dot { animation: none; }
        }
      `}</style>

      {/* ══ HERO — hell, zentriert, Deliverable-Statusleiste ══ */}
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
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Website-Relaunch Agentur</span>
            <span className="h-px w-8 bg-primary" />
          </div>

          <h1 className="hero-title font-[family-name:var(--font-heading)] text-[3.1rem] font-medium leading-[0.99] tracking-tight text-dark sm:text-7xl lg:text-[5.4rem]">
            Website-Relaunch{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #C2722A, #D4A853)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ohne Rankingverlust
            </span>
          </h1>

          <p className="hero-description mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted">
            Wir bauen deine Website technisch und gestalterisch neu auf und sichern parallel jede
            URL ab, die heute schon rankt. Kein Rätselraten nach dem Go-live — nur ein Plan, der
            vorher steht.
          </p>

          <div className="hero-cta mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark"
            >
              Kostenloses Relaunch-Gespräch vereinbaren
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
              Was jeder Relaunch bei uns enthält
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {DELIVERABLES.map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dark/70 transition-colors hover:border-primary/40"
                >
                  <span className="chip-dot h-1.5 w-1.5 rounded-full bg-primary" />
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ INTRO — Positionierung, Bild links ══ */}
      <section className="py-20 lg:py-28 overflow-hidden" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="scroll-hidden order-last lg:order-first" style={{ transitionDelay: "120ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full max-w-[600px] transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/relaunch-3d-transformation.png"
                  alt="3D-Illustration: verwitterte alte Website wird zur frischen neuen Website mit Terracotta-Design"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <p className="mt-3 text-xs italic text-muted">Vorher → Nachher: neues Design, gleicher SEO-Unterbau.</p>
            </div>

            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Was eine Relaunch-Agentur anders macht</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
                Deine Website ist kein leeres Blatt —<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  sie ist Kapital.
                </span>
              </h2>
              <div className="space-y-4 text-muted leading-relaxed max-w-lg">
                <p>
                  Eine Website-Relaunch-Agentur unterscheidet sich von einer klassischen
                  Webdesign-Agentur in einem entscheidenden Punkt: Sie behandelt eine bestehende
                  Website nicht als leere Fläche, sondern als gewachsenes System mit Geschichte.
                  Jede URL, die heute rankt, jeder Backlink, jede Position in der Google-Suche —
                  das ist Kapital, das über Jahre entstanden ist. Ein Relaunch, der das ignoriert,
                  baut zwar eine neue Website, reißt aber gleichzeitig ein, was vorher funktioniert hat.
                </p>
                <p>
                  Du brauchst so eine Agentur meistens nicht, weil du „mal wieder was Neues" willst,
                  sondern weil mehrere Dinge gleichzeitig nicht mehr passen: Design, Technik,
                  Struktur, manchmal auch die Marke dahinter. Ein reiner Grafik-Relaunch übersieht
                  fast immer die technische Seite — URLs ändern sich, Seiten verschwinden, und
                  niemand hat vorher eine Weiterleitung geplant. Die Folge sehen wir regelmäßig in
                  Erstgesprächen: Der organische Traffic bricht wenige Wochen nach einem fremden
                  Launch ein, meistens weil eine vollständige Weiterleitungsliste gefehlt hat.
                </p>
                <p>
                  Als SEO- und Webdesign-Agentur{" "}
                  <Link href="/" className="text-primary font-semibold hover:underline">SeoForge</Link>{" "}
                  gehen wir deshalb an jeden Relaunch zuerst mit der SEO-Brille heran und erst danach
                  mit der Design-Brille. Das heißt nicht, dass die Optik zweitrangig wird — nur, dass
                  sie nie auf Kosten deiner bestehenden Sichtbarkeit geht.
                </p>
              </div>
              <a
                href="#prozess"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-dark border-b border-dark/20 pb-0.5 hover:border-primary hover:text-primary transition-colors w-fit"
              >
                So läuft der Relaunch ab
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ANZEICHEN — Selbst-Check in 6 klickbaren Zellen ══ */}
      <section id="anzeichen" className="bg-white py-24 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Wann ist ein Relaunch fällig?"
            title={<>6 Zeichen, dass deine<br />Website neu muss.</>}
            copy="Mach den Selbst-Check: Klick an, was auf deine Website zutrifft — und sieh, wo du stehst."
          />

          <div className="grid gap-px bg-border border border-border rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
            {CHECKS.map((c, i) => {
              const on = checked.has(i);
              return (
                <div key={c.t} className="scroll-hidden h-full" style={{ transitionDelay: `${i * 70}ms` }}>
                  <button
                    type="button"
                    onClick={() => toggleCheck(i)}
                    aria-pressed={on}
                    className="group relative w-full h-full text-left p-7 lg:p-8 cursor-pointer transition-colors duration-300"
                    style={{ background: on ? "#fbf4ea" : "#fff" }}
                  >
                    <span
                      className={`absolute top-0 left-0 right-0 h-[2.5px] transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                      style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }}
                      aria-hidden="true"
                    />
                    <span className="flex items-center justify-between mb-5">
                      <span className="font-mono text-[11px] tracking-[0.18em] text-dark/45">CHECK 0{i + 1}</span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300 ${on ? "bg-primary text-white" : "border border-border bg-white text-transparent"}`}
                      >
                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </span>
                    <span className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {icon(c.s)}
                    </span>
                    <span className="block font-bold text-dark text-lg mb-2">{c.t}</span>
                    <span className="block text-sm text-muted leading-relaxed">{c.d}</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="scroll-hidden mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-mono text-sm text-dark">{checked.size}/6 treffen zu</span>
            <span className={`text-sm transition-colors ${checked.size >= 2 ? "text-dark" : "text-muted"}`}>
              Mehrere Punkte erkannt?{" "}
              <a href="#kontakt" className="font-semibold text-primary border-b border-primary/30 pb-px hover:border-primary transition-colors">
                Lass uns kurz drüber sprechen
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* ══ RANKINGS — Kern-USP + Beweis-App ══ */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Der Kern-USP"
            title={
              <>
                Relaunch{" "}
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ohne Rankingverlust.
                </span>
              </>
            }
            copy="Die größte Angst vor jedem Relaunch ist berechtigt — und mit System vollständig vermeidbar."
          />

          <div className="scroll-hidden grid md:grid-cols-2 gap-8 lg:gap-12 mb-10">
            <p className="text-muted text-[15px] leading-relaxed">
              Der Hauptgrund für Rankingverluste bei einem Relaunch ist fast immer derselbe:
              fehlende oder falsch gesetzte Weiterleitungen. Ändert sich eine URL-Struktur, ohne
              dass jede alte Adresse sauber auf ihr neues Ziel zeigt, landet Google auf einer
              404-Seite — und mit ihr verschwinden Ranking-Signale, die über Jahre aufgebaut
              wurden. Das betrifft nicht nur einzelne Unterseiten, sondern häufig auch Backlinks,
              die von anderen Websites auf genau diese URLs zeigen.
            </p>
            <p className="text-muted text-[15px] leading-relaxed">
              Deshalb beginnt bei uns jeder Relaunch mit einer vollständigen Erfassung der
              Bestandsseite: Welche URLs ranken, welche Backlinks bringen, welche Struktur Google
              aktuell kennt. Daraus entsteht eine Weiterleitungsmap — als 301, nicht als 302, denn
              nur die dauerhafte Weiterleitung überträgt die Ranking-Signale vollständig. Weil wir
              über eine eigene CI/CD-Pipeline ausliefern, geht der Relaunch kontrolliert live:
              Sollte in der Search Console etwas auffallen, rollen wir in Minuten zurück, statt
              tagelang manuell zu reparieren.
            </p>
          </div>

          <div className="m3d rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)]">
            <div className="hidden md:grid md:grid-cols-2 border-b border-border">
              <div className="flex items-center gap-2.5 px-6 py-4">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-dark/[0.06]">
                  <svg className="h-3 w-3 text-dark/40" viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">Die typische Falle</span>
              </div>
              <div className="flex items-center gap-2.5 px-6 py-4 border-l border-border" style={{ background: "#fbf4ea" }}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                  <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary">So sichern wir ab</span>
              </div>
            </div>
            <div className="divide-y divide-border">
              {RELAUNCH_FALLEN.map((r, i) => (
                <div key={i} className="grid md:grid-cols-2">
                  <div className="flex items-start gap-3 px-6 py-5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dark/[0.06] md:hidden">
                      <svg className="h-3 w-3 text-dark/40" viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                    </span>
                    <p className="text-sm text-dark/55 leading-relaxed">{r.falle}</p>
                  </div>
                  <div className="flex items-start gap-3 px-6 py-5 md:border-l md:border-border" style={{ background: "#fbf4ea" }}>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 md:hidden">
                      <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                    </span>
                    <p className="text-sm text-dark font-medium leading-relaxed">{r.schutz}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══ PROZESS — 6 Schritte + sticky 301-Brücke ══ */}
      <section id="prozess" className="bg-white py-24 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Unser Relaunch-Prozess"
            title={<>Sechs Schritte — und die<br />Fakten zu deinem Projekt.</>}
            copy="Strukturiert, ohne Ranking-Risiko — und mit den Antworten, die du vor dem Auftrag wirklich brauchst."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 lg:mb-14">
            {PROJEKT_FAKTEN.map((f, i) => (
              <div key={f.t} className="scroll-hidden" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="group h-full rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-1">
                  <div className="font-mono text-[11px] tracking-[0.16em] text-dark/45 mb-3">FAKT 0{i + 1}</div>
                  <div
                    className="font-[family-name:var(--font-heading)] text-3xl font-black leading-none mb-2"
                    style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {f.val}
                  </div>
                  <div className="font-bold text-dark text-sm mb-1.5">{f.t}</div>
                  <p className="text-muted text-[13px] leading-relaxed">{f.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_minmax(0,420px)] gap-10 lg:gap-16 items-start">
            <div className="rounded-2xl border border-border bg-white overflow-hidden divide-y divide-border">
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

            <div className="scroll-hidden lg:sticky lg:top-28" style={{ transitionDelay: "120ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-[0_18px_44px_-22px_rgba(26,26,26,0.20)] aspect-[16/10] w-full transform-gpu [backface-visibility:hidden]">
                <Image
                  src="/images/relaunch-3d-bruecke.png"
                  alt="3D-Illustration: goldene 301-Brücke trägt Rankings von der alten zur neuen Website"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
              <p className="mt-3 text-xs text-muted">
                Jede alte URL bekommt vor dem Launch ihr neues Ziel — die 301-Map ist die Brücke,
                über die deine Rankings umziehen.
              </p>
              <div className="mt-6 rounded-2xl border border-border bg-white p-5">
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-dark/45 mb-3">Gut zu wissen</p>
                <div className="space-y-2.5">
                  {GUT_ZU_WISSEN.map((g) => (
                    <div key={g} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <svg className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-[13px] text-dark leading-relaxed">{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VORTEILE — Speed-Beweis + Nutzen ══ */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-14 items-center">
            <div className="scroll-hidden" style={{ transitionDelay: "120ms" }}>
              <div className="rounded-3xl border border-border bg-white overflow-hidden shadow-[0_24px_60px_-28px_rgba(26,26,26,0.15)]">
                <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border bg-offwhite/60">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#C2722A" }} />
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/45">Google Search Console — Leistung</span>
                </div>
                <GscImpressionsChart />
              </div>
              <p className="mt-3 text-xs italic text-muted">Illustrative Darstellung einer Search-Console-Kurve — keine realen Kundendaten.</p>
            </div>

            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Was der Relaunch bringt</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-dark leading-tight mb-5">
                Mehr als<br />
                <span style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  eine neue Optik.
                </span>
              </h2>
              <p className="text-muted leading-relaxed max-w-md mb-6">
                Ein Relaunch ist bei uns kein isoliertes Projekt, sondern Teil unseres gesamten{" "}
                <Link href="/webdesign" className="text-primary font-semibold hover:underline">Webdesign</Link>-Leistungsspektrums
                — von der ersten Konzeption bis zur Betreuung danach. Du bekommst nicht nur eine
                neue Optik, sondern eine Website, die technisch, inhaltlich und strukturell auf
                Wachstum ausgelegt ist.
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

      {/* ══ KOSTEN — Preis-Transparenz ══ */}
      <section id="kosten" className="bg-white py-24 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="scroll-hidden">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Kosten &amp; Investition</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[42px] font-bold text-dark leading-[1.12] mb-6">
                Was kostet ein<br />Website-Relaunch?
              </h2>
              <p className="text-muted leading-relaxed mb-5">
                Was ein Website-Relaunch kostet, hängt stark vom Ausgangspunkt ab. Für einfachere
                Relaunches mit 5 bis 15 Seiten kalkulieren wir{" "}
                <strong className="text-dark font-semibold">ab 3.500 €</strong>. Komplexere
                Projekte — mit Onlineshop, individuellen Funktionen oder einer umfangreichen
                SEO-Migration über viele URLs hinweg — starten{" "}
                <strong className="text-dark font-semibold">ab 8.000 €</strong>. Ein pauschaler
                Preis ohne Erstgespräch wäre bei diesem Thema unseriös, weil zu viel vom Zustand
                der bestehenden Seite abhängt.
              </p>
              <p className="text-muted leading-relaxed mb-7">
                Deshalb steht am Anfang immer ein kostenloses Gespräch, in dem wir uns deine
                aktuelle Website, deine Rankings und deine Ziele ansehen. Daraus entsteht ein
                verbindlicher Festpreis — keine Abrechnung nach Stunden, keine Nachträge, die dich
                später überraschen. Was im Angebot steht, wird zu dem Preis umgesetzt, der
                vereinbart wurde.
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

            <div className="grid sm:grid-cols-2 gap-4">
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

      {/* ══ FAQ — schmal, ruhig, vor dem Finale ══ */}
      <section className="py-24 lg:py-32" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="scroll-hidden mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Häufige Fragen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[2.6rem] font-bold text-dark leading-tight">
              Alles zum Website-Relaunch
            </h2>
          </div>

          <div className="scroll-hidden rounded-2xl border border-border bg-white divide-y divide-border overflow-hidden">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={i}>
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
      </section>

      {/* ══ CTA — dunkel, Checkliste + Formular ══ */}
      <section className="bg-dark py-24 lg:py-32 scroll-mt-20" id="kontakt">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="absolute -bottom-10 left-0 h-[200px] w-[200px] rounded-full bg-secondary/[0.04] blur-3xl" />
          </div>

          <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="scroll-hidden">
              <h2 className="font-[family-name:var(--font-heading)] text-4xl text-white lg:text-5xl">
                Bereit für einen Relaunch, der{" "}
                <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                  deine Rankings nicht kostet
                </span>
                ?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Wir schauen uns deine bestehende Website kostenlos und unverbindlich an und sagen
                dir ehrlich, was ein Relaunch für deine Rankings und deine Conversion Rate bedeuten
                würde. Keine Verpflichtung — nur eine fundierte Einschätzung.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Kostenlose Analyse deiner aktuellen Website inklusive Rankings",
                  "Verbindlicher Festpreis nach dem Erstgespräch, keine versteckten Kosten",
                  "Persönlicher Ansprechpartner meldet sich innerhalb von 24 Stunden",
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
                  Wir melden uns innerhalb von 24 Stunden bei dir.
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
                  <input
                    type="url"
                    name="website"
                    aria-label="Deine aktuelle Website"
                    placeholder="Deine aktuelle Website"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <textarea
                    name="message"
                    rows={4}
                    aria-label="Nachricht"
                    placeholder="Was stört dich an der aktuellen Website?"
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.08]"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
                  >
                    Kostenlose Relaunch-Analyse anfordern
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
    </SubpageLayout>
  );
}
