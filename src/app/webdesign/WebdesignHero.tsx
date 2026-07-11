"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

/* ═══════════════════════════════════════════════════════════════════════════
   HERO RIPPLE — interaktives Punkt-Raster: der Cursor sendet konzentrische
   Wellen aus, die als helle Ringe durch das Raster laufen. Eigene Interaktion
   (weder Feder-Netz noch Strömungsfeld der Unterseiten). Canvas 2D, weiß-
   dominant, pausiert offscreen, respektiert prefers-reduced-motion.
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

    const SPEED = 0.2;   // px/ms ring expansion
    const BAND = 52;     // wavefront thickness
    const MAXR = 460;    // ring lifespan radius
    let raf = 0, vis = true;

    const step = (ts: number) => {
      now = ts;
      ctx.clearRect(0, 0, w, h);

      // Idle: gelegentliche Welle aus der Mitte, damit es lebt
      if (!reduce && now - lastIdle > 2300) { spawn(w / 2, h * 0.46); lastIdle = now; }
      // expired rings entfernen
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

// ─────────────────────────────────────────────────────────────────────────────
//  HERO
// ─────────────────────────────────────────────────────────────────────────────
export default function WebdesignHero() {
  return (
    <>
      <Navbar />

      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FDFBF8 0%, #F6F1EA 100%)" }}
      >
        {/* Interaktives Wellen-Raster */}
        <HeroRipple />

        {/* warme Glows + Vignette für Lesbarkeit */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-44 right-[-10%] w-[620px] h-[620px] rounded-full blur-[150px]" style={{ background: "rgba(212,168,83,0.16)" }} />
          <div className="absolute bottom-[-12%] -left-40 w-[520px] h-[520px] rounded-full blur-[140px]" style={{ background: "rgba(194,114,42,0.10)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 56% 50% at 50% 44%, rgba(253,251,248,0.74), rgba(253,251,248,0) 66%)" }} />
        </div>

        {/* Bottom fade into next section */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />

        {/* Ghost display text (statisch, dezent) */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.045 }}
        >
          <span
            className="font-[family-name:var(--font-heading)] font-black text-dark leading-none tracking-tight"
            style={{ fontSize: "clamp(90px, 17vw, 280px)" }}
          >
            WEBDESIGN
          </span>
        </div>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-8 pt-32 pb-28 text-center">

          {/* Badge */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/70 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Webdesign &amp; Entwicklung · SeoForge
          </div>

          {/* Headline */}
          <h1
            className="font-[family-name:var(--font-heading)] font-bold text-dark leading-[1.07] mb-7"
            style={{ fontSize: "clamp(36px, 5vw, 68px)", letterSpacing: "-0.025em" }}
          >
            Websites, die ranken.<br />
            <span
              style={{
                background: "linear-gradient(95deg, #C2722A 12%, #D4A853 88%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Designs, die konvertieren.
            </span>
          </h1>

          {/* Divider */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-primary/40" />
            <span className="text-[10px] font-bold tracking-[0.26em] uppercase text-dark/30">
              Next.js · TypeScript · Core Web Vitals · SEO
            </span>
            <div className="h-px w-10 bg-primary/40" />
          </div>

          {/* Description */}
          <p
            className="text-muted leading-[1.85] mb-10 max-w-2xl mx-auto"
            style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}
          >
            Kein Template, kein Baukasten: Wir entwickeln deine Website von Grund auf —
            individuelles, modernes Webdesign, sauberer Code und SEO als Fundament
            statt als Nachgedanke. Als professionelle SEO- und Webdesign-Agentur in
            einem bauen wir responsive Seiten, die in Google ranken, in der KI-Suche
            zitiert werden und Besucher zu Anfragen machen.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5"
            >
              Kostenloses Gespräch
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

          {/* Ehrliche USP-Reihe (keine erfundenen Zahlen) */}
          <div className="flex flex-wrap justify-center items-center gap-x-7 gap-y-2.5">
            {[
              "Custom Code — kein Baukasten",
              "SEO + GEO ab der ersten Zeile",
              "DevOps & KI-Workflows",
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
    </>
  );
}
