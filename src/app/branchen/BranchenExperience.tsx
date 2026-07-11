"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { branchen } from "./branchenData";
import type { Branche } from "./branchenData";

type World = "care" | "law" | "commerce" | "craft" | "property" | "saas";

type SearchStage = {
  label: string;
  query: string;
  explanation: string;
};

type ServiceRoute = {
  href: string;
  label: string;
  detail: string;
};

type BranchExperience = {
  world: World;
  accent: string;
  soft: string;
  ink: string;
  fieldLabel: string;
  visualLabel: string;
  stages: [SearchStage, SearchStage, SearchStage];
  routes: [ServiceRoute, ServiceRoute, ServiceRoute];
};

const EXPERIENCE: Record<string, BranchExperience> = {
  "seo-fuer-aerzte": {
    world: "care",
    accent: "#17656A",
    soft: "#E5F1EF",
    ink: "#10383B",
    fieldLabel: "Patientenpfad",
    visualLabel: "Von der Frage zum Termin",
    stages: [
      { label: "Symptom", query: "hautärztin akne berlin", explanation: "Der Erstkontakt beginnt bei einem Problem, nicht beim Praxisnamen." },
      { label: "Vertrauen", query: "Behandlung · Profil · Quellen", explanation: "Fachliche Einordnung und lokale Signale machen die Praxis vergleichbar." },
      { label: "Termin", query: "Eigene Website → Kontakt", explanation: "Die Entscheidung landet auf einem digitalen Kontaktweg, den die Praxis kontrolliert." },
    ],
    routes: [
      { href: "/seo/optimierung", label: "SEO-Optimierung", detail: "Technik, Seitenstruktur und lokale Relevanz zusammenführen." },
      { href: "/geo-agentur", label: "GEO für Praxen", detail: "Medizinische Expertise auch für KI-Antworten verständlich belegen." },
      { href: "/webdesign/firmenwebsite-erstellen-lassen", label: "Praxiswebsite", detail: "Vertrauen und Kontaktwege auf der eigenen Website klar gestalten." },
    ],
  },
  "seo-fuer-zahnaerzte": {
    world: "care",
    accent: "#2D6F7B",
    soft: "#E7F1F3",
    ink: "#173B43",
    fieldLabel: "Behandlungspfad",
    visualLabel: "Von der Leistung zur Praxiswahl",
    stages: [
      { label: "Behandlung", query: "implantat kosten köln", explanation: "Patienten recherchieren Leistung, Ablauf und Kosten lange vor dem Anruf." },
      { label: "Abgleich", query: "Erklärung · Maps · Erfahrung", explanation: "Behandlungsseite und lokale Vertrauenssignale werden gemeinsam geprüft." },
      { label: "Praxiswahl", query: "Praxiswebsite → Anfrage", explanation: "Ein verständlicher nächster Schritt führt aus der Recherche zur Praxis." },
    ],
    routes: [
      { href: "/seo/content-strategie", label: "Behandlungsinhalte", detail: "Fragen zu Implantat, Aligner und Prophylaxe strukturiert beantworten." },
      { href: "/geo/optimierung", label: "KI-Sichtbarkeit", detail: "Praxis und Behandlungen als belastbare Entitäten auszeichnen." },
      { href: "/webdesign/firmenwebsite-erstellen-lassen", label: "Praxiswebsite", detail: "Die digitale Praxiswahl auf einen klaren Kontaktweg ausrichten." },
    ],
  },
  "seo-fuer-kieferorthopaeden": {
    world: "care",
    accent: "#486586",
    soft: "#E8EDF3",
    ink: "#23374E",
    fieldLabel: "Entscheidungsbogen",
    visualLabel: "Von der Elternfrage zur Beratung",
    stages: [
      { label: "Frage", query: "zahnspange kinder wann", explanation: "Die Suche startet oft Monate vor einer konkreten Praxisentscheidung." },
      { label: "Orientierung", query: "Alter · Methode · Ablauf", explanation: "Verständliche Themenpfade begleiten Eltern durch eine lange Abwägung." },
      { label: "Beratung", query: "Einzugsgebiet → Termin", explanation: "Lokale Präsenz und fachliche Klarheit führen zur Erstberatung." },
    ],
    routes: [
      { href: "/seo/content-strategie", label: "Themenarchitektur", detail: "Elternfragen nach Alter, Methode und Ablauf sauber miteinander verbinden." },
      { href: "/geo-agentur", label: "GEO-Sichtbarkeit", detail: "Fachliche Antworten für Google und KI-Systeme strukturiert bereitstellen." },
      { href: "/seo/betreuung", label: "Laufende Betreuung", detail: "Sichtbarkeit über den gesamten mehrmonatigen Entscheidungsweg ausbauen." },
    ],
  },
  "seo-fuer-physiotherapeuten": {
    world: "care",
    accent: "#426D55",
    soft: "#E8F0EA",
    ink: "#243D2F",
    fieldLabel: "Versorgungspfad",
    visualLabel: "Von Beschwerden zur passenden Leistung",
    stages: [
      { label: "Beschwerde", query: "physio kiefergelenk mannheim", explanation: "Gesucht wird nach Beschwerde, Spezialisierung oder kurzfristiger Hilfe." },
      { label: "Passung", query: "Leistung · Nähe · Verfügbarkeit", explanation: "Angebot und Einzugsgebiet müssen in einem Blick verständlich werden." },
      { label: "Buchung", query: "Praxiswebsite → Kontakt", explanation: "Ein klarer Kontaktweg entlastet Telefon und Empfang." },
    ],
    routes: [
      { href: "/seo/optimierung", label: "Lokale SEO", detail: "Beschwerden, Leistungen und Standorte technisch sauber verbinden." },
      { href: "/geo/optimierung", label: "GEO-Optimierung", detail: "Spezialisierungen für assistierende Suchsysteme eindeutig beschreiben." },
      { href: "/webdesign/firmenwebsite-erstellen-lassen", label: "Praxiswebsite", detail: "Leistungsauswahl und Kontakt ohne Umwege gestalten." },
    ],
  },
  "seo-fuer-heilpraktiker": {
    world: "care",
    accent: "#756342",
    soft: "#F1ECE1",
    ink: "#423821",
    fieldLabel: "Vertrauenspfad",
    visualLabel: "Von der Methode zum Erstkontakt",
    stages: [
      { label: "Anliegen", query: "heilpraktiker migräne mannheim", explanation: "Die Suche verbindet Beschwerden, Methoden und räumliche Nähe." },
      { label: "Einordnung", query: "Methode · Person · Grenzen", explanation: "Sachliche Inhalte helfen, Eignung und Erwartung realistisch einzuordnen." },
      { label: "Erstkontakt", query: "Praxiswebsite → Gespräch", explanation: "Persönlichkeit und ein ruhiger Kontaktweg schließen die Vertrauenslücke." },
    ],
    routes: [
      { href: "/seo/content-strategie", label: "Vertrauensinhalte", detail: "Methoden, Grenzen und Abläufe sachlich miteinander verknüpfen." },
      { href: "/geo/optimierung", label: "KI-Auffindbarkeit", detail: "Leistungsfelder und lokale Zuordnung eindeutig strukturieren." },
      { href: "/webdesign/firmenwebsite-erstellen-lassen", label: "Praxiswebsite", detail: "Persönliche Positionierung und Erstkontakt visuell glaubwürdig machen." },
    ],
  },
  "seo-fuer-anwaelte": {
    world: "law",
    accent: "#40546D",
    soft: "#E9EDF2",
    ink: "#202D3D",
    fieldLabel: "Mandatsakte",
    visualLabel: "Vom Rechtsproblem zur Anfrage",
    stages: [
      { label: "Problem", query: "kündigung erhalten was tun", explanation: "Mandanten formulieren ihre Lage, nicht den passenden Paragrafen." },
      { label: "Expertise", query: "Rechtsgebiet · Fallnähe · Ort", explanation: "Spezialisierung und verständliche Einordnung reduzieren Unsicherheit." },
      { label: "Mandat", query: "Kanzleiwebsite → Kontakt", explanation: "Ein klarer Kontaktweg übersetzt akuten Informationsbedarf in eine Anfrage." },
    ],
    routes: [
      { href: "/seo/content-strategie", label: "Rechtsgebiets-Cluster", detail: "Problemlagen ohne Überschneidungen den passenden Leistungsseiten zuordnen." },
      { href: "/geo-agentur", label: "GEO für Kanzleien", detail: "Fachliche Autorität in klassischen und generativen Suchen stärken." },
      { href: "/webdesign/firmenwebsite-erstellen-lassen", label: "Kanzleiwebsite", detail: "Expertise, Diskretion und Kontakt in eine klare Oberfläche übersetzen." },
    ],
  },
  "seo-fuer-online-shops": {
    world: "commerce",
    accent: "#3E6B4E",
    soft: "#E8F0E9",
    ink: "#203A29",
    fieldLabel: "Kategoriepfad",
    visualLabel: "Von der Suche bis zum Produkt",
    stages: [
      { label: "Bedarf", query: "laufschuhe damen neutral 39", explanation: "Die kaufnahe Suche ist konkreter als eine allgemeine Produktkategorie." },
      { label: "Auswahl", query: "Kategorie · Filter · Beratung", explanation: "Indexierbare Kategorien und hilfreiche Auswahltexte bündeln die Nachfrage." },
      { label: "Produkt", query: "Passende Auswahl → Produkt", explanation: "Ein sauberer Pfad hält Nutzer und Crawler von Filter-Sackgassen fern." },
    ],
    routes: [
      { href: "/seo/content-strategie", label: "Shop-Content", detail: "Kategorien, Ratgeber und Produkte ohne Kannibalisierung planen." },
      { href: "/seo/optimierung", label: "Technische SEO", detail: "Filter, Canonicals und Crawl-Budget kontrollierbar machen." },
      { href: "/webdesign/website-relaunch-agentur", label: "Shop-Relaunch", detail: "Sichtbarkeit und Nutzerführung bei strukturellen Änderungen bewahren." },
    ],
  },
  "seo-fuer-handwerker": {
    world: "craft",
    accent: "#285F89",
    soft: "#E6EFF5",
    ink: "#153A56",
    fieldLabel: "Einsatzplan",
    visualLabel: "Von der lokalen Suche zum Auftrag",
    stages: [
      { label: "Bedarf", query: "heizung notdienst wochenende", explanation: "Dringlichkeit, Leistung und Ort bestimmen die Suchanfrage." },
      { label: "Gebiet", query: "Maps · Leistungsseite · Radius", explanation: "Ein klares Einsatzgebiet verhindert irrelevante Anfragen außerhalb der Route." },
      { label: "Kontakt", query: "Betriebswebsite → Anruf", explanation: "Erreichbarkeit und Leistung müssen auf dem Smartphone sofort erfassbar sein." },
    ],
    routes: [
      { href: "/seo/optimierung", label: "Local SEO", detail: "Leistungen und Einsatzorte als belastbare Seitenstruktur aufbauen." },
      { href: "/geo/optimierung", label: "KI-Sichtbarkeit", detail: "Betrieb, Gewerke und Einzugsgebiet eindeutig maschinenlesbar machen." },
      { href: "/webdesign/firmenwebsite-erstellen-lassen", label: "Betriebswebsite", detail: "Mobile Anfragewege für dringende und geplante Aufträge schärfen." },
    ],
  },
  "seo-fuer-immobilienmakler": {
    world: "property",
    accent: "#865242",
    soft: "#F1E8E3",
    ink: "#442C25",
    fieldLabel: "Eigentümerroute",
    visualLabel: "Von der Marktfrage zum Erstgespräch",
    stages: [
      { label: "Marktfrage", query: "wohnung verkaufen mannheim", explanation: "Eigentümer suchen Orientierung, bevor sie einen Makler auswählen." },
      { label: "Revier", query: "Stadtteil · Bewertung · Referenz", explanation: "Lokale Marktkenntnis muss jenseits austauschbarer Objektlisten sichtbar werden." },
      { label: "Gespräch", query: "Eigene Website → Bewertung", explanation: "Ein klarer Einstieg holt die Anfrage vor dem Immobilienportal ab." },
    ],
    routes: [
      { href: "/seo/content-strategie", label: "Eigentümer-Content", detail: "Bewertung, Verkauf und Stadtteilwissen zu einem Themenrevier verbinden." },
      { href: "/geo-agentur", label: "GEO für Makler", detail: "Lokale Autorität auch in generativen Empfehlungen sichtbar machen." },
      { href: "/webdesign/firmenwebsite-erstellen-lassen", label: "Maklerwebsite", detail: "Eigentümeransprache und Objektkompetenz eigenständig inszenieren." },
    ],
  },
  "saas-seo": {
    world: "saas",
    accent: "#C97931",
    soft: "#F3E8DB",
    ink: "#171411",
    fieldLabel: "Demand Graph",
    visualLabel: "Vom Problem zur Produktentscheidung",
    stages: [
      { label: "Problem", query: "workflow freigaben automatisieren", explanation: "Die Nachfrage entsteht beim Arbeitsproblem, nicht beim Produktnamen." },
      { label: "Abgleich", query: "Use Case · Vergleich · Integration", explanation: "Produktwissen muss entlang realer Auswahlkriterien auffindbar werden." },
      { label: "Signup", query: "Produktseite → Demo oder Trial", explanation: "Der organische Pfad endet in einem messbaren Produktschritt." },
    ],
    routes: [
      { href: "/seo/content-strategie", label: "Demand-Cluster", detail: "Use Cases, Vergleiche und Integrationen nach Suchintention ordnen." },
      { href: "/geo-agentur", label: "GEO für SaaS", detail: "Produktentität und Kategorie in KI-Empfehlungen konsistent erklären." },
      { href: "/webdesign/website-relaunch-agentur", label: "SaaS-Relaunch", detail: "Informationsarchitektur und organische Nachfrage gemeinsam migrieren." },
    ],
  },
};

export function getBranchExperience(slug: string): BranchExperience {
  return EXPERIENCE[slug] ?? EXPERIENCE["seo-fuer-aerzte"];
}

export function getBranchThemeStyle(slug: string): CSSProperties {
  const exp = getBranchExperience(slug);
  return {
    "--branch-accent": exp.accent,
    "--branch-soft": exp.soft,
    "--branch-ink": exp.ink,
  } as CSSProperties;
}

function WorldGlyph({ world, className = "h-8 w-8" }: { world: World; className?: string }) {
  const common = { className, viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (world === "care") return <svg {...common}><circle cx="24" cy="24" r="18" /><path d="M12 25h7l3-8 5 15 3-7h6" /></svg>;
  if (world === "law") return <svg {...common}><path d="M24 8v31M14 39h20M11 14h26" /><path d="m14 14-7 12h14l-7-12Zm20 0-7 12h14l-7-12Z" /><path d="M7 26c1.5 4 12.5 4 14 0M27 26c1.5 4 12.5 4 14 0" /></svg>;
  if (world === "commerce") return <svg {...common}><path d="M8 13h32v27H8zM8 21h32M18 21v19" /><path d="m13 13 3-6h16l3 6M24 27v7m-3-3h6" /></svg>;
  if (world === "craft") return <svg {...common}><path d="M7 37 36 8l5 5-29 29H7v-5Z" /><path d="m29 15 5 5M12 32l5 5M9 19h12M9 19V9h10" /></svg>;
  if (world === "property") return <svg {...common}><path d="m7 23 17-14 17 14M12 20v20h24V20M20 40V28h8v12" /><path d="M17 18h14" /></svg>;
  return <svg {...common}><path d="M9 13h30v22H9zM15 20l5 4-5 4M24 28h9" /><circle cx="13" cy="9" r="1" fill="currentColor" stroke="none" /><circle cx="18" cy="9" r="1" fill="currentColor" stroke="none" /></svg>;
}

function shapeStyle(world: World): CSSProperties {
  if (world === "care") return { borderRadius: "48% 48% 2.2rem 2.2rem / 34% 34% 2.2rem 2.2rem" };
  if (world === "law") return { clipPath: "polygon(0 0, 84% 0, 100% 15%, 100% 100%, 0 100%)" };
  if (world === "craft") return { clipPath: "polygon(5% 2%, 100% 0, 95% 98%, 0 100%)" };
  if (world === "property") return { borderRadius: "15rem 15rem 1.4rem 1.4rem" };
  if (world === "commerce") return { borderRadius: "0.35rem" };
  return { clipPath: "polygon(0 0, 94% 0, 100% 8%, 100% 100%, 6% 100%, 0 92%)" };
}

export function BranchenHero({ branche, bildKey }: { branche: Branche; bildKey: string }) {
  const exp = getBranchExperience(branche.slug);
  const [active, setActive] = useState(0);
  const stage = exp.stages[active];
  const tech = exp.world === "saas";

  return (
    <section data-hero data-branch-ui data-world={exp.world} className="relative isolate overflow-hidden bg-[#f8f5f0]" style={getBranchThemeStyle(branche.slug)}>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-y-0 right-0 w-[44%] bg-[var(--branch-soft)]/70" />
        <div className="absolute -left-36 top-20 h-96 w-96 rounded-full border border-[var(--branch-accent)]/15" />
        <div className="absolute -left-24 top-32 h-72 w-72 rounded-full border border-[var(--branch-accent)]/10" />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(var(--branch-ink) 1px, transparent 1px), linear-gradient(90deg, var(--branch-ink) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      <div className="mx-auto grid min-h-[690px] max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[minmax(0,0.93fr)_minmax(460px,1.07fr)] lg:gap-16 lg:px-8 lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-dark/45 lg:mb-7">
            <Link href="/branchen" className="rounded-sm transition-colors hover:text-[var(--branch-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--branch-accent)]">Branchen</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--branch-accent)]" aria-current="page">{branche.kurzName}</span>
          </nav>

          <div className="mb-4 flex items-center gap-3 text-[var(--branch-accent)] lg:mb-5">
            <WorldGlyph world={exp.world} className="h-7 w-7" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]">{exp.fieldLabel}</span>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.1rem,10.4vw,4.55rem)] font-medium leading-[0.98] tracking-[-0.035em] text-dark lg:text-[clamp(2.35rem,4.45vw,4.55rem)]">
            {branche.h1.pre}
            <span className="text-[var(--branch-accent)]">{branche.h1.grad}</span>
            {branche.h1.post}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted lg:mt-6 lg:text-lg">{branche.subline}</p>

          <div className="mt-7 hidden max-w-xl border-l-2 border-[var(--branch-accent)] pl-4 sm:block">
            <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-dark/40">Branchenthese</span>
            <p className="mt-1.5 text-sm font-semibold leading-relaxed text-dark/80">{branche.accent}</p>
          </div>

          <div className="mt-7 flex flex-col items-start gap-5 sm:mt-8 sm:flex-row sm:items-center">
            <a href="#kontakt" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--branch-ink)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_36px_-18px_var(--branch-ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--branch-accent)]">
              {branche.ctaLabel}
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </a>
            <a href="#suchlogik" className="hidden border-b border-dark/25 pb-1 text-sm font-semibold text-dark transition-colors hover:border-[var(--branch-accent)] hover:text-[var(--branch-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--branch-accent)] sm:inline-flex">Suchpfad ansehen</a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[610px] lg:mx-0">
          <div className="absolute -left-5 top-14 z-20 hidden h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-[var(--branch-ink)] text-white shadow-xl lg:flex">
            <WorldGlyph world={exp.world} className="h-11 w-11" />
          </div>
          <figure className="relative ml-auto aspect-[0.92/1] w-[92%] overflow-hidden bg-[var(--branch-ink)] shadow-[0_42px_90px_-38px_var(--branch-ink)]" style={shapeStyle(exp.world)}>
            <Image
              src={tech ? "/images/hero-bg-circuit.jpg" : `/images/branchen-hero/${bildKey}.jpg`}
              alt={tech ? "" : branche.heroBildAlt}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 92vw"
              className={`object-cover ${tech ? "opacity-80" : ""}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--branch-ink)]/75 via-transparent to-transparent" aria-hidden="true" />
            <figcaption className="absolute bottom-7 left-6 right-6 z-10 text-white lg:bottom-44">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">{exp.visualLabel}</span>
              <p className="mt-2 max-w-sm font-[family-name:var(--font-heading)] text-xl font-semibold leading-tight lg:text-2xl">{stage.explanation}</p>
            </figcaption>
          </figure>

          <div id="suchlogik" className="absolute left-0 top-6 z-30 mr-auto w-[96%] scroll-mt-32 border border-white/40 bg-white/95 p-4 shadow-[0_28px_70px_-26px_var(--branch-ink)] backdrop-blur-md sm:p-5 lg:relative lg:left-auto lg:top-auto lg:-ml-5 lg:-mt-36 lg:w-[94%]" aria-live="polite">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-dark/10 pb-3">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--branch-accent)]">Beispielhafter Suchpfad</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-dark/35">Keine Messwerte</span>
            </div>
            <div className="grid grid-cols-3 gap-1" role="tablist" aria-label={`${exp.fieldLabel}: Phase auswählen`}>
              {exp.stages.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  id={`branch-stage-tab-${index}`}
                  aria-selected={active === index}
                  aria-controls="branch-stage-panel"
                  onClick={() => setActive(index)}
                  className={`group min-w-0 border-t-2 px-1 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--branch-accent)] ${active === index ? "border-[var(--branch-accent)] text-dark" : "border-dark/10 text-dark/40 hover:border-dark/30 hover:text-dark/70"}`}
                >
                  <span className="block font-mono text-[8px] uppercase tracking-[0.14em]">0{index + 1}</span>
                  <span className="mt-1 block truncate text-[11px] font-semibold sm:text-xs">{item.label}</span>
                </button>
              ))}
            </div>
            <div id="branch-stage-panel" role="tabpanel" aria-labelledby={`branch-stage-tab-${active}`} className="mt-3 flex min-w-0 items-center gap-3 bg-[var(--branch-soft)] px-3 py-2.5">
              <svg className="h-4 w-4 shrink-0 text-[var(--branch-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>
              <span className="truncate text-sm text-[var(--branch-ink)]">{stage.query}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BranchenSectionRail({ branche }: { branche: Branche }) {
  return (
    <nav data-branch-ui aria-label="Kapitel dieser Branchenseite" className="sticky top-20 z-30 overflow-x-auto border-y border-dark/10 bg-white/90 backdrop-blur-md" style={getBranchThemeStyle(branche.slug)}>
      <div className="mx-auto flex w-max min-w-full max-w-7xl items-center gap-6 px-6 py-3 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-dark/45 lg:px-8">
        <span className="flex items-center gap-2 text-[var(--branch-accent)]"><span className="h-1.5 w-1.5 rounded-full bg-[var(--branch-accent)]" aria-hidden="true" />{branche.kurzName}</span>
        <a href="#ausgangslage" className="transition-colors hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--branch-accent)]">Ausgangslage</a>
        <a href="#vorgehen" className="transition-colors hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--branch-accent)]">Vorgehen</a>
        <a href="#hebel" className="transition-colors hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--branch-accent)]">Hebel</a>
        <a href="#fragen" className="transition-colors hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--branch-accent)]">Fragen</a>
        <Link href="/branchen" className="ml-auto border-l border-dark/10 pl-6 text-dark/65 transition-colors hover:text-[var(--branch-accent)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--branch-accent)]">Branchen-Hub ↗</Link>
      </div>
    </nav>
  );
}

export function PraxisNavigator({ branche }: { branche: Branche }) {
  const [active, setActive] = useState(0);
  if (!branche.praxisTypen?.length) return null;
  const entries = branche.praxisTypen.flatMap((item) => {
    const target = branchen.find((candidate) => candidate.slug === item.slug);
    return target ? [{ ...item, target }] : [];
  });
  const current = entries[active] ?? entries[0];
  if (!current) return null;

  return (
    <section data-branch-ui className="overflow-hidden border-y border-dark/10 bg-white py-16 lg:py-20" style={getBranchThemeStyle(branche.slug)}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(420px,1.28fr)] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--branch-accent)]">Praxis-Silo</span>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] text-dark lg:text-[40px]">Vom Überblick in die passende Fachpraxis.</h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">Die Ärzteseite bündelt die gemeinsame lokale Suchlogik. Die Spokes vertiefen Behandlungen, Entscheidungswege und Fachfragen, ohne dieselben Suchintentionen doppelt zu besetzen.</p>

          <div className="mt-8 border-y border-dark/10">
            {entries.map((entry, index) => (
              <Link
                key={entry.slug}
                href={`/branchen/${entry.slug}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`group grid grid-cols-[36px_1fr_auto] items-center gap-3 border-b border-dark/10 px-1 py-4 last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--branch-accent)] ${active === index ? "text-[var(--branch-accent)]" : "text-dark"}`}
              >
                <span className="font-mono text-[9px] text-dark/35">0{index + 1}</span>
                <span><strong className="block text-sm">{entry.target.kurzName}</strong><span className="mt-1 block text-xs font-normal text-muted">{entry.teaser}</span></span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="relative min-h-[430px] bg-[var(--branch-soft)] p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-5 border border-[var(--branch-accent)]/20" aria-hidden="true" />
          <svg className="absolute inset-0 h-full w-full text-[var(--branch-accent)]/20" viewBox="0 0 600 430" fill="none" aria-hidden="true">
            <path d="M76 214 C170 214 188 98 300 98 S430 214 524 214" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 7" />
            <path d="M76 214 C170 214 188 332 300 332 S430 214 524 214" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 7" />
            <circle cx="76" cy="214" r="50" stroke="currentColor" /><circle cx="524" cy="214" r="50" stroke="currentColor" />
          </svg>
          <div className="relative flex h-full min-h-[350px] flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--branch-accent)]">Aktiver Themenpfad</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-dark/35">Hub → Spoke</span>
            </div>
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[var(--branch-accent)]/30 bg-white text-[var(--branch-accent)] shadow-[0_22px_50px_-28px_var(--branch-ink)] [&_svg]:h-10 [&_svg]:w-10">{current.target.icon}</div>
            <div className="relative bg-white p-5 shadow-[0_24px_60px_-34px_var(--branch-ink)]">
              <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-dark/35">Vertiefung</span>
              <h3 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--branch-ink)]">{current.target.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{current.teaser}</p>
              <Link href={`/branchen/${current.slug}`} className="mt-4 inline-flex border-b border-[var(--branch-accent)] pb-0.5 text-xs font-semibold text-[var(--branch-accent)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--branch-accent)]">Zur Fachseite →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BranchenHebel({ branche }: { branche: Branche }) {
  const exp = getBranchExperience(branche.slug);
  const [active, setActive] = useState(0);

  return (
    <div data-branch-ui className="grid overflow-hidden border border-dark/15 bg-white shadow-[0_32px_75px_-40px_var(--branch-ink)] lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)]" style={getBranchThemeStyle(branche.slug)}>
      <div className="relative overflow-hidden bg-[var(--branch-ink)] p-7 text-white lg:min-h-[520px] lg:p-9">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10" aria-hidden="true" />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">Arbeitskarte · {branche.kurzName}</span>
        <WorldGlyph world={exp.world} className="mt-10 h-20 w-20 text-[var(--branch-accent)]" />
        <p className="mt-8 max-w-xs font-[family-name:var(--font-heading)] text-2xl font-semibold leading-tight">Vier Stellschrauben, aber keine vorgefertigte Paketlogik.</p>
        <div className="mt-10 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
          <span className="h-px flex-1 bg-white/15" />
          <span>Fokus 0{active + 1}</span>
        </div>
      </div>

      <div className="divide-y divide-dark/10">
        {branche.hebel.map((item, index) => {
          const open = active === index;
          return (
            <button
              key={item.titel}
              type="button"
              onClick={() => setActive(index)}
              aria-expanded={open}
              className={`group grid w-full grid-cols-[44px_1fr_auto] gap-3 px-5 py-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--branch-accent)] sm:px-7 lg:py-7 ${open ? "bg-[var(--branch-soft)]" : "hover:bg-dark/[0.025]"}`}
            >
              <span className={`font-mono text-[10px] font-semibold ${open ? "text-[var(--branch-accent)]" : "text-dark/30"}`}>0{index + 1}</span>
              <span className="min-w-0">
                <strong className={`block font-[family-name:var(--font-heading)] text-lg leading-snug lg:text-xl ${open ? "text-[var(--branch-ink)]" : "text-dark/70"}`}>{item.titel}</strong>
                <span aria-hidden={!open} className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                  <span className="overflow-hidden"><span className="mt-3 block max-w-2xl text-sm leading-relaxed text-muted">{item.text}</span></span>
                </span>
              </span>
              <span className={`mt-1 text-lg text-[var(--branch-accent)] transition-transform ${open ? "rotate-45" : ""}`} aria-hidden="true">+</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BranchenSiloNavigator({ branche }: { branche: Branche }) {
  const exp = getBranchExperience(branche.slug);
  return (
    <section data-branch-ui className="relative overflow-hidden bg-[var(--branch-ink)] py-20 text-white lg:py-24" style={getBranchThemeStyle(branche.slug)}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(440px,1.28fr)] lg:gap-20 lg:px-8">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--branch-accent)]">Silo · nächste Ebene</span>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] lg:text-[42px]">Von der Branchenfrage in die passende Disziplin.</h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">Diese Seite beantwortet die branchenspezifische Suchlogik. Die vertiefenden Leistungsseiten erklären Umsetzung, laufende Arbeit und technisches Vorgehen – ohne den Branchen-Intent zu duplizieren.</p>
          <Link href="/branchen" className="mt-8 inline-flex items-center gap-2 border-b border-white/25 pb-1 text-sm font-semibold text-white/80 transition-colors hover:border-[var(--branch-accent)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--branch-accent)]">Alle Branchen im Überblick <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="border-y border-white/15">
          {exp.routes.map((route, index) => (
            <Link key={route.href} href={route.href} className="group grid grid-cols-[38px_1fr_auto] gap-3 border-b border-white/15 py-6 last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--branch-accent)]">
              <span className="pt-1 font-mono text-[9px] text-[var(--branch-accent)]">0{index + 1}</span>
              <span><strong className="block font-[family-name:var(--font-heading)] text-lg text-white lg:text-xl">{route.label}</strong><span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-white/50">{route.detail}</span></span>
              <span className="pt-1 text-[var(--branch-accent)] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
