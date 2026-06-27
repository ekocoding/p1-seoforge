"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ═══════════════════════════════════════════════════════════════════════════
   HERO RIPPLE — identisch mit WebdesignHero, Ghost-Word angepasst auf
   „WARTUNG". Cursor sendet konzentrische Wellen durch das Punktraster.
   Canvas 2D, weiß-dominant, pausiert offscreen, respektiert prefers-reduced-motion.
═══════════════════════════════════════════════════════════════════════════ */
function HeroRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const GAP = 34;
    let w = 0, h = 0;
    let dots: { x: number; y: number }[] = [];
    type Ring = { x: number; y: number; born: number };
    let rings: Ring[] = [];
    const mouse = { x: -9999, y: -9999, lx: -9999, ly: -9999 };
    let now = 0, lastIdle = 0;

    const build = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP; y < h; y += GAP)
        for (let x = GAP; x < w; x += GAP) dots.push({ x, y });
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    const spawn = (x: number, y: number) => {
      rings.push({ x, y, born: now });
      if (rings.length > 12) rings.shift();
    };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      const dx = mouse.x - mouse.lx, dy = mouse.y - mouse.ly;
      if (!reduce && dx * dx + dy * dy > 40 * 40) { spawn(mouse.x, mouse.y); mouse.lx = mouse.x; mouse.ly = mouse.y; }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const SPEED = 0.2;
    const BAND = 52;
    const MAXR = 460;
    let raf = 0, vis = true;

    const step = (ts: number) => {
      now = ts;
      ctx.clearRect(0, 0, w, h);
      if (!reduce && now - lastIdle > 2300) { spawn(w / 2, h * 0.46); lastIdle = now; }
      rings = rings.filter((r) => (now - r.born) * SPEED < MAXR);

      for (const d of dots) {
        let inten = 0;
        for (const r of rings) {
          const rad = (now - r.born) * SPEED;
          const dx = d.x - r.x, dy = d.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const delta = Math.abs(dist - rad);
          if (delta < BAND) {
            const v = (1 - delta / BAND) * (1 - rad / MAXR);
            if (v > inten) inten = v;
          }
        }
        const rr = 1 + inten * 3.4;
        const a = 0.12 + inten * 0.72;
        const cr = 26 + (194 - 26) * inten;
        const cg = 26 + (114 - 26) * inten;
        const cb = 26 + (42 - 26) * inten;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${a})`;
        ctx.arc(d.x, d.y, rr, 0, 6.2832);
        ctx.fill();
      }

      raf = vis && !reduce ? requestAnimationFrame(step) : 0;
    };

    const io = new IntersectionObserver(([en]) => {
      vis = en.isIntersecting;
      if (vis && !raf && !reduce) raf = requestAnimationFrame(step);
      else if (!vis && raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0 });
    io.observe(canvas);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

/* ─── Scroll-Reveal (IntersectionObserver → .scroll-visible) ────────────── */
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

/* ─── SectionHead ─────────────────────────────────────────────────────────── */
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

/* ─── Daten: Leistungs-Karten (Hairline-Grid / PILLARS) ─────────────────── */
const LEISTUNGEN = [
  {
    href: null,
    title: "Updates & Sicherheits-Patches",
    desc: "Regelmäßige Core-, Plugin- und Theme-Updates — bevor Angreifer veraltete Versionen ausnutzen. Jedes Update wird getestet, bevor es live geht.",
    meta: "Core · Plugins · Themes",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <path d="M4 4v6h6M20 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10a8 8 0 0 0-14.3-3.7L4 8M4 14a8 8 0 0 0 14.3 3.7L20 16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: null,
    title: "Backups & Wiederherstellung",
    desc: "Tägliche automatisierte Backups — Datenbank und Dateien. Im Ernstfall stellen wir Ihre Website in Minuten wieder her, nicht in Tagen.",
    meta: "Täglich · Verschlüsselt · Offsite",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: null,
    title: "Security-Monitoring & Malware-Schutz",
    desc: "Kontinuierliche Überwachung auf Malware, verdächtige Dateiänderungen und Schwachstellen. Wir reagieren, bevor Google Ihre Seite markiert.",
    meta: "Malware · Firewall · Alerts",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: null,
    title: "Performance & Core Web Vitals",
    desc: "Ladezeiten, LCP, CLS und INP bleiben im grünen Bereich. Regelmäßige Performance-Checks und gezielte Optimierungen halten Google-Benchmarks dauerhaft.",
    meta: "LCP · CLS · INP",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: null,
    title: "Uptime- & Verfügbarkeits-Monitoring",
    desc: "24/7-Überwachung der Erreichbarkeit. Bei einem Ausfall werden wir sofort benachrichtigt und handeln — bevor Ihre Kunden es merken.",
    meta: "24/7 · Sofort-Alert",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: null,
    title: "Inhalts-Pflege & kleine Änderungen",
    desc: "Texte anpassen, Bilder tauschen, neue Seiten anlegen — wir erledigen kleinere Inhaltsänderungen im vereinbarten Support-Kontingent, ohne separates Angebot.",
    meta: "Texte · Bilder · Seiten",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/website-wartung/wordpress",
    title: "WordPress-Wartung",
    desc: "Spezialisierte Wartung für WordPress-Websites: Core-Updates, Plugin-Management, Sicherheitshärtung und Datenbank-Optimierung — alles aus einer Hand.",
    meta: "WordPress · WooCommerce",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8" strokeLinecap="round" />
        <path d="M12 3a9 9 0 0 1 0 18" strokeLinecap="round" />
        <path d="M12 3a9 9 0 0 0 0 18" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* ─── Wartungspakete ─────────────────────────────────────────────────────── */
const PAKETE = [
  {
    name: "Basis",
    price: "ab 49 €",
    period: "/Monat",
    highlight: false,
    items: [
      "Core-, Plugin- & Theme-Updates",
      "Tägliche Backups (7 Tage Aufbewahrung)",
      "Uptime-Monitoring 24/7",
      "Benachrichtigung bei Ausfall",
      "Monatliches Update-Protokoll",
    ],
    note: "Ideal für einfache Informationswebsites.",
  },
  {
    name: "Plus",
    price: "ab 99 €",
    period: "/Monat",
    highlight: true,
    items: [
      "Alles aus Basis",
      "Security-Monitoring & Malware-Scan",
      "Monatlicher Performance-Check (Core Web Vitals)",
      "Monats-Report mit Empfehlungen",
      "Support-Kontingent (1 h/Monat)",
      "Backups 30 Tage Aufbewahrung",
    ],
    note: "Empfohlen für Unternehmenswebsites & Shops.",
  },
  {
    name: "Premium",
    price: "ab 199 €",
    period: "/Monat",
    highlight: false,
    items: [
      "Alles aus Plus",
      "Priorisierter Support (Antwort in 4 h)",
      "Inhaltsänderungen im Kontingent (3 h/Monat)",
      "Staging-Umgebung für sichere Updates",
      "Quartalsgespräch zur Website-Strategie",
      "Backups 90 Tage Aufbewahrung",
    ],
    note: "Für geschäftskritische Websites & WooCommerce.",
  },
];

/* ─── FAQ-Daten ──────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Was kostet Website-Wartung?",
    a: "Unsere Wartungsverträge starten ab 49 €/Monat für die Basis-Betreuung (Updates, Backups, Uptime-Monitoring). Das Plus-Paket mit Security, Performance-Checks und Support-Kontingent beginnt ab 99 €/Monat, das Premium-Paket mit priorisiertem Support und Staging ab 199 €/Monat. Alle Preise verstehen sich als monatlich kündbare Festpreise ohne Mindestlaufzeit.",
  },
  {
    q: "Brauche ich überhaupt einen Wartungsvertrag?",
    a: "Ja — besonders wenn Ihre Website geschäftskritisch ist. Software veraltet, Sicherheitslücken entstehen laufend, und veraltete Plugins sind der häufigste Einstiegspunkt für Hacker. Eine gewartete Website schützt Ihre Daten, die Daten Ihrer Kunden und Ihre Google-Rankings. Ohne Pflege riskieren Sie Ausfälle, Malware-Befall und absteigende Rankings.",
  },
  {
    q: "Was passiert ohne Wartung?",
    a: "Ohne regelmäßige Updates werden Sicherheitslücken in Plugins und dem CMS nicht geschlossen. Hacker nutzen bekannte Schwachstellen gezielt aus — typische Folgen: Malware-Injektion, Datenverlust, Blacklisting durch Google und Hosting-Anbieter. Zusätzlich sinken Ladezeiten mit der Zeit ohne Performance-Checks, was Rankings und Conversion-Rate schadet.",
  },
  {
    q: "Auch für Websites, die ihr nicht gebaut habt?",
    a: "Ja, wir übernehmen Wartungsverträge für bestehende Websites — unabhängig davon, wer sie gebaut hat. Wir analysieren zunächst den Status quo (Updates, Sicherheit, Performance) und beheben eventuelle Altlasten, bevor der laufende Betrieb startet. Falls die Website grundlegend veraltet ist, sprechen wir offen über einen Relaunch.",
  },
  {
    q: "Monatlich kündbar?",
    a: "Ja. Alle Wartungspakete sind monatlich kündbar — keine Mindestlaufzeit, kein Risiko. Wir sind überzeugt, dass Sie zufrieden bleiben, wenn Sie unsere Arbeit kennen. Deshalb binden wir Sie nicht vertraglich, sondern durch Qualität.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function WebsiteWartungClient() {
  useScrollReveal();
  const [visible, setVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const show = (delay: string) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(14px)",
    transition: `opacity 0.7s ${delay}, transform 0.7s ${delay}`,
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
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <Navbar />

      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FDFBF8 0%, #F6F1EA 100%)" }}
      >
        <HeroRipple />

        {/* Warme Glows + Vignette */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-44 right-[-10%] w-[620px] h-[620px] rounded-full blur-[150px]" style={{ background: "rgba(212,168,83,0.16)" }} />
          <div className="absolute bottom-[-12%] -left-40 w-[520px] h-[520px] rounded-full blur-[140px]" style={{ background: "rgba(194,114,42,0.10)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 56% 50% at 50% 44%, rgba(253,251,248,0.74), rgba(253,251,248,0) 66%)" }} />
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />

        {/* Ghost display text */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.045 }}
        >
          <span
            className="font-[family-name:var(--font-heading)] font-black text-dark leading-none tracking-tight"
            style={{ fontSize: "clamp(90px, 17vw, 280px)" }}
          >
            WARTUNG
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-8 pt-32 pb-28 text-center">

          {/* Badge */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/70 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary"
            style={show("0.1s")}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Website-Wartung &amp; Betreuung · SeoForge
          </div>

          {/* Headline */}
          <h1
            className="font-[family-name:var(--font-heading)] font-bold text-dark leading-[1.07] mb-7"
            style={{ ...show("0.2s"), fontSize: "clamp(36px, 5vw, 68px)", letterSpacing: "-0.025em" }}
          >
            Website-Wartung<br />
            <span
              style={{
                background: "linear-gradient(95deg, #C2722A 12%, #D4A853 88%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              &amp; Betreuung.
            </span>
          </h1>

          {/* Divider */}
          <div className="mb-8 flex items-center justify-center gap-4" style={show("0.28s")}>
            <div className="h-px w-10 bg-primary/40" />
            <span className="text-[10px] font-bold tracking-[0.26em] uppercase text-dark/30">
              Updates · Backups · Security · Performance
            </span>
            <div className="h-px w-10 bg-primary/40" />
          </div>

          {/* Description */}
          <p
            className="text-muted leading-[1.85] mb-10 max-w-2xl mx-auto"
            style={{ ...show("0.35s"), fontSize: "clamp(15px, 1.1vw, 17px)" }}
          >
            Updates, Backups, Security &amp; Performance — wir halten Ihre Website sicher,
            schnell und aktuell. Als professionelle Webdesign- und SEO-Agentur übernehmen
            wir die technische Pflege Ihrer Website, damit Sie sich auf Ihr Kerngeschäft
            konzentrieren können.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mb-14" style={show("0.45s")}>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
            >
              Wartungsvertrag anfragen
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href="#leistungen"
              className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-white/60 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-dark/65 transition-all hover:border-dark/30 hover:bg-white/85 hover:text-dark"
            >
              Leistungen ansehen
              <span className="text-primary text-xs">↓</span>
            </a>
          </div>

          {/* Ehrliche USP-Reihe */}
          <div className="flex flex-wrap justify-center items-center gap-x-7 gap-y-2.5" style={show("0.58s")}>
            {[
              "Updates & Sicherheits-Patches",
              "Tägliche Backups",
              "Monitoring & Uptime",
              "Antwort in unter 24 h",
            ].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 text-[12px] font-semibold text-dark/45">
                <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25"
          style={{ animation: "fadeIn 1s ease 1.4s both" }}
        >
          <span className="text-[10px] text-dark/40 font-mono tracking-[0.28em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-dark/30 to-transparent" />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style>{`
        .m3d { opacity: 0; transform: translateY(60px) rotateX(-14deg) scale(0.97); transform-origin: 50% 18%; transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); will-change: transform; backface-visibility: hidden; }
        .m3d.scroll-visible { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); }
        @media (prefers-reduced-motion: reduce), (scripting: none) { .m3d { opacity: 1; transform: none; transition: none; } }
        @keyframes wwFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .ww-fade { animation: wwFade 0.4s ease; }
      `}</style>

      {/* ══ WARUM LAUFENDE WARTUNG ════════════════════════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center scroll-hidden">
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-primary block mb-4">Warum Website-Wartung</span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-[44px] font-bold text-dark leading-[1.12] mb-7">
            Eine Website ohne Pflege<br />ist ein Sicherheitsrisiko.
          </h2>
          <div className="space-y-5 text-lg lg:text-xl text-muted leading-relaxed max-w-3xl mx-auto">
            <p>
              Software veraltet schnell: WordPress-Plugins, PHP-Versionen, SSL-Zertifikate —
              jede Komponente hat einen Lebenszyklus. Wer Updates ignoriert, öffnet Angreifern
              eine bekannte Hintertür. Die häufigste Ursache für Malware-Befall und Website-Hacks
              sind nicht ausgefeilte Angriffe, sondern veraltete Plugins und ungepatche Schwachstellen,
              die seit Wochen öffentlich bekannt sind.
            </p>
            <p>
              Dazu kommt der Performance-Verfall: Ohne regelmäßige Optimierung steigen Ladezeiten,
              Core Web Vitals verschlechtern sich und Google-Rankings sinken still und leise.
              Laufende Wartung ist kein optionaler Service — sie ist die Grundvoraussetzung dafür,
              dass Ihre Website dauerhaft sicher, schnell und sichtbar bleibt. Falls die Seite
              grundlegend veraltet ist, empfehlen wir offen einen{" "}
              <Link href="/webdesign/website-relaunch-agentur" className="text-primary font-semibold hover:underline">
                Website-Relaunch
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ══ LEISTUNGEN — Hairline-Grid / PILLARS ════════════════════════ */}
      <section id="leistungen" className="bg-white py-24 lg:py-32 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Wartungs-Leistungen"
            title={<>Alles, was Ihre<br />Website braucht.</>}
            copy="Von Updates über Backups bis zu Security und Performance — wir übernehmen die technische Verantwortung, Sie konzentrieren sich auf Ihr Geschäft."
          />
          <div className="m3d grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {LEISTUNGEN.map((l) => {
              const inner = (
                <>
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }} aria-hidden="true" />
                  <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {l.svg}
                  </div>
                  <h3 className="font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors">{l.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{l.desc}</p>
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wide text-dark/30 group-hover:text-primary/70 transition-colors">{l.meta}</span>
                    {l.href && <span className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">→</span>}
                  </div>
                </>
              );

              return l.href ? (
                <Link
                  key={l.title}
                  href={l.href}
                  className="group relative flex flex-col bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-[#FBF8F4]"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={l.title}
                  className="group relative flex flex-col bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-[#FBF8F4]"
                >
                  {inner}
                </div>
              );
            })}
            {/* CTA-Karte */}
            <Link href="/kontakt" className="group relative flex flex-col bg-white p-7 lg:p-8 transition-colors duration-300 hover:bg-[#FBF8F4]">
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl text-white" style={{ background: "linear-gradient(135deg, #C2722A, #D4A853)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
                  <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors">Nicht sicher, was Sie brauchen?</h3>
              <p className="text-muted text-sm leading-relaxed">
                Erzählen Sie uns kurz Ihre Situation — wir empfehlen das passende Paket.
                Kostenlos &amp; unverbindlich.
              </p>
              <div className="mt-auto pt-6 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wide text-primary/70">Kostenloses Gespräch</span>
                <span className="text-primary group-hover:translate-x-0.5 transition-all">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SO ARBEITEN WIR — Zyklus-Darstellung ════════════════════════ */}
      <section className="py-24 lg:py-32 border-t border-border" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="So arbeiten wir"
            title={<>Der Wartungs-Zyklus —<br />Monat für Monat.</>}
            copy="Kein einmaliger Service. Wartung ist ein kontinuierlicher Prozess, der Ihre Website dauerhaft in Topform hält."
          />
          <div className="scroll-hidden relative">
            {/* Zyklus-Steps */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0 relative">
              {/* Verbindungslinie Desktop */}
              <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 z-0" aria-hidden="true" />

              {[
                {
                  num: "01",
                  label: "Monitoring",
                  desc: "Uptime, Performance und Security werden rund um die Uhr überwacht. Abweichungen lösen sofort einen Alert aus.",
                  icon: "M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z",
                },
                {
                  num: "02",
                  label: "Update & Patch",
                  desc: "Alle verfügbaren Updates werden auf einer Staging-Umgebung getestet, bevor sie live gehen.",
                  icon: "M4 4v6h6M20 20v-6h-6M20 10a8 8 0 0 0-14.3-3.7L4 8M4 14a8 8 0 0 0 14.3 3.7L20 16",
                },
                {
                  num: "03",
                  label: "Backup",
                  desc: "Täglich werden Datenbank und Dateien gesichert und verschlüsselt offsite gespeichert.",
                  icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
                },
                {
                  num: "04",
                  label: "Test & QA",
                  desc: "Nach jedem Update prüfen wir Ladezeiten, Core Web Vitals und kritische Seitenfunktionen.",
                  icon: "M5 13l4 4L19 7",
                },
                {
                  num: "05",
                  label: "Report",
                  desc: "Einmal pro Monat erhalten Sie einen transparenten Bericht: Was wurde gemacht, was wurde gefunden, was kommt als nächstes.",
                  icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z",
                },
              ].map((step, i) => (
                <div key={step.num} className="relative z-10 flex flex-col items-center text-center px-4" style={{ transitionDelay: `${i * 80}ms` }}>
                  {/* Circle */}
                  <div
                    className="w-[104px] h-[104px] rounded-full border-2 border-primary/20 bg-white shadow-[0_8px_24px_-10px_rgba(194,114,42,0.25)] flex flex-col items-center justify-center mb-4 relative"
                  >
                    <span className="font-mono text-[10px] font-bold text-primary/60 mb-1">{step.num}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6 text-primary">
                      <path d={step.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {/* Pfeil rechts (nicht beim letzten) */}
                    {i < 4 && (
                      <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center">
                        <svg className="w-4 h-4 text-primary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-dark text-base mb-2">{step.label}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Zyklus-Hinweis */}
            <div className="mt-10 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm text-dark/55">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 4v1M12 19v1M4 12H3M21 12h-1M6.22 6.22l-.71-.71M18.49 18.49l-.71-.71M6.22 17.78l-.71.71M18.49 5.51l-.71.71" strokeLinecap="round" />
                </svg>
                Wiederholt sich jeden Monat — automatisch und zuverlässig.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WARTUNGSPAKETE ═══════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHead
            eyebrow="Wartungspakete"
            title={<>Drei Pakete,<br />ein klarer Festpreis.</>}
            copy="Festpreis pro Monat, monatlich kündbar, kein Risiko. Wählen Sie das Paket, das zu Ihrer Website passt."
          />
          <div className="grid lg:grid-cols-3 gap-6">
            {PAKETE.map((p) => (
              <div
                key={p.name}
                className={`m3d relative rounded-3xl border overflow-hidden flex flex-col transition-all duration-300 ${
                  p.highlight
                    ? "border-primary/40 shadow-[0_24px_60px_-20px_rgba(194,114,42,0.30)]"
                    : "border-border shadow-[0_8px_24px_-12px_rgba(26,26,26,0.12)]"
                } bg-white`}
              >
                {p.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #C2722A, #D4A853)" }} aria-hidden="true" />
                )}
                <div className={`px-6 pt-7 pb-5 border-b border-border ${p.highlight ? "bg-[#FBF8F4]" : ""}`}>
                  {p.highlight && (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase text-primary mb-3">
                      Empfohlen
                    </span>
                  )}
                  <div className="font-[family-name:var(--font-heading)] text-xl font-bold text-dark mb-1">{p.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-[family-name:var(--font-heading)] text-3xl font-black text-dark">{p.price}</span>
                    <span className="text-sm text-muted">{p.period}</span>
                  </div>
                  <p className="mt-2 text-[13px] text-muted">{p.note}</p>
                </div>
                <ul className="flex-1 px-6 py-5 space-y-3">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-dark/75">
                      <svg className="shrink-0 mt-0.5 w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="px-6 pb-7">
                  <Link
                    href="/kontakt"
                    className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
                      p.highlight
                        ? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl"
                        : "border border-primary/30 text-primary hover:bg-primary/[0.06]"
                    }`}
                  >
                    Paket anfragen
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="scroll-hidden mt-8 text-center text-sm text-muted">
            Alle Preise netto zzgl. MwSt. · Monatlich kündbar · Kein Risiko ·{" "}
            <Link href="/kontakt" className="text-primary font-semibold hover:underline">Individuelles Angebot anfragen</Link>
          </p>
        </div>
      </section>

      {/* ══ CROSS-SELLS ══════════════════════════════════════════════════ */}
      <section className="py-16 border-t border-border" style={{ background: "#F8F5F1" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scroll-hidden grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-white p-6">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary block mb-3">Ergänzend</span>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-dark text-lg mb-2">Laufende SEO-Betreuung</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                Wartung hält Ihre Website technisch fit — laufende SEO-Betreuung sorgt dafür,
                dass Ihre Rankings wachsen.
              </p>
              <Link href="/seo/betreuung" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:gap-2.5 transition-all">
                SEO-Betreuung ansehen →
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary block mb-3">Spezialisiert</span>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-dark text-lg mb-2">WordPress-Wartung</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                WordPress-spezifische Betreuung: Plugin-Management, WooCommerce, Datenbank-Optimierung
                und Sicherheitshärtung.
              </p>
              <Link href="/website-wartung/wordpress" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:gap-2.5 transition-all">
                WordPress-Wartung →
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary block mb-3">Alternative</span>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-dark text-lg mb-2">Website Relaunch</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                Manchmal ist Wartung nicht genug — eine veraltete Website braucht einen sauberen
                Neustart ohne Ranking-Verlust.
              </p>
              <Link href="/webdesign/website-relaunch-agentur" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:gap-2.5 transition-all">
                Relaunch ansehen →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 border-t border-border bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="scroll-hidden mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Häufige Fragen
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark">
              Alles zur Website-Wartung
            </h2>
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
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-400 ease-out"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-5 text-sm text-muted leading-relaxed border-t border-border pt-4">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ END-CTA (dunkel) ═════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ background: "#1A1A1A" }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-primary/[0.07] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="scroll-hidden">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-4">
              Wartungsvertrag anfragen
            </h2>
            <p className="text-white/60 text-lg mb-3 leading-relaxed">
              Wir analysieren Ihre Website, empfehlen das passende Paket und senden Ihnen ein
              transparentes Festpreisangebot — kostenlos und unverbindlich.
            </p>
            <p className="text-white/40 text-sm mb-9">
              Persönlicher Ansprechpartner · Antwort in unter 24 Stunden · Monatlich kündbar
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              Wartungsvertrag anfragen →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
