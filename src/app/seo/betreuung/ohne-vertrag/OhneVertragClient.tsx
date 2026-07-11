"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SubpageLayout from "@/app/components/SubpageLayout";

const AGREEMENT_POINTS = [
  {
    id: "kuendigung",
    label: "Kündigung",
    question: "Wann endet die Zusammenarbeit tatsächlich?",
    answer: "„Monatlich kündbar“ ist erst dann klar, wenn Stichtag, Wirksamkeit und bereits freigegebene Arbeit schriftlich geregelt sind. Ein Angebot sollte nicht nur die Laufzeit nennen, sondern auch erklären, was nach der Kündigung noch abgeschlossen wird.",
    artifact: "Stichtag, letzter Leistungszeitraum und offene Freigaben",
  },
  {
    id: "leistungsstand",
    label: "Leistungsstand",
    question: "Welche Arbeit ist am Monatsende fertig — und welche nur begonnen?",
    answer: "SEO-Aufgaben haben unterschiedliche Größen. Ein technischer Fix kann abgeschlossen sein, während ein Content-Brief erst in der Freigabe steckt. Deshalb braucht jeder Monat einen sichtbaren Stand: geplant, in Arbeit, veröffentlicht oder bewusst verschoben.",
    artifact: "Prioritätenboard mit Status und Begründung",
  },
  {
    id: "zugaenge",
    label: "Zugänge & Daten",
    question: "Bleiben Konten, Messpunkte und Dokumentation nutzbar?",
    answer: "Search Console, Analytics, Tag-Management, Redaktionssystem und Projektdateien dürfen nicht in persönlichen Agenturkonten verschwinden. Eigentum, Rollen und Exportwege sollten vor dem ersten Release geklärt sein.",
    artifact: "Zugängeliste, Kontoinhaberschaft und Datenexport",
  },
  {
    id: "uebergabe",
    label: "Übergabe",
    question: "Kann ein internes Team oder ein anderer Partner nahtlos übernehmen?",
    answer: "Eine brauchbare Übergabe erklärt nicht nur, was geändert wurde, sondern auch warum. Offene Risiken, verworfene Optionen, nächste Prüfungen und technische Abhängigkeiten gehören deshalb in die Abschlussnotiz.",
    artifact: "Release-Log, offene Risiken und nächste Entscheidung",
  },
];

const WORK_CYCLE = [
  {
    id: "prioritaet",
    label: "Priorität",
    title: "Befund in eine begründete nächste Aufgabe übersetzen",
    text: "Nicht die längste Liste gewinnt. Entscheidend ist, welche technische, inhaltliche oder strukturelle Änderung die größte Unsicherheit beseitigt und intern tatsächlich freigegeben werden kann.",
    proof: "Auswahlgrund und bewusst zurückgestellte Aufgaben",
  },
  {
    id: "release",
    label: "Release",
    title: "Die Änderung veröffentlichen und nachvollziehbar dokumentieren",
    text: "Ein Arbeitspaket zählt erst, wenn es geprüft, freigegeben und live ist. Dokumentation verbindet Anforderung, konkrete Änderung und betroffene URLs.",
    proof: "Veröffentlichte URLs, Änderung und Prüfdatum",
  },
  {
    id: "signal",
    label: "Signal",
    title: "Beobachten, was sich nach dem Release tatsächlich verändert",
    text: "Indexierung, Impressionen, Klicks und Leads reagieren nicht gleichzeitig. Die Auswertung trennt Frühindikatoren von Geschäftsergebnissen und benennt Messgrenzen offen.",
    proof: "Datenquelle, Beobachtungsfenster und Interpretation",
  },
  {
    id: "entscheidung",
    label: "Entscheidung",
    title: "Fortsetzen, korrigieren oder bewusst beenden",
    text: "Monatliche Kündbarkeit ist dann wertvoll, wenn jede neue Runde auf einem sichtbaren Lernstand basiert. So wird Flexibilität zur Steuerung — nicht zum planlosen Stop-and-Go.",
    proof: "Nächster Schritt, Verantwortliche und Übergabestatus",
  },
];

const faqs = [
  {
    q: "Was bedeutet SEO-Betreuung ohne Vertrag konkret?",
    a: "Gemeint ist eine laufende Zusammenarbeit ohne mehrmonatige Mindestlaufzeit. Entscheidend sind die Bedingungen im konkreten Angebot: Kündigungsstichtag, letzter Leistungszeitraum, Umgang mit bereits freigegebenen Aufgaben sowie Übergabe von Daten und Dokumentation.",
  },
  {
    q: "Ist eine monatlich kündbare SEO-Betreuung schlechter als ein Laufzeitmodell?",
    a: "Nicht automatisch. Strategie- und Qualitätsanforderungen bleiben gleich. Der Unterschied liegt in Planungssicherheit und Taktung: Bei monatlicher Entscheidung müssen Prioritäten, Freigaben und Übergabestände besonders klar dokumentiert werden.",
  },
  {
    q: "Lohnt sich nur ein einzelner Monat SEO?",
    a: "Für einen klar begrenzten Audit, eine technische Untersuchung oder ein definiertes Release kann ein kurzer Auftrag sinnvoll sein. Laufende SEO-Betreuung lebt dagegen aus mehreren Zyklen von Umsetzung, Beobachtung und neuer Priorisierung. Ein einzelner Monat sollte deshalb nicht mit einer Ranking-Garantie verbunden werden.",
  },
  {
    q: "Was passiert mit Zugängen und erstellten Unterlagen nach der Kündigung?",
    a: "Das sollte vor Projektstart schriftlich geregelt sein. Sinnvoll sind Unternehmenskonten für zentrale Tools, dokumentierte Rollen, exportierbare Briefings sowie ein Abschlussstand mit veröffentlichten Änderungen, offenen Risiken und nächsten Prüfungen.",
  },
  {
    q: "Kann später in einen länger geplanten Betreuungsmodus gewechselt werden?",
    a: "Ja, sofern beide Seiten Umfang und Planungsmodus neu vereinbaren. Die Entscheidung sollte sich an Aufgabenlage, internen Kapazitäten und gewünschtem Umsetzungstempo orientieren — nicht allein an einer vermeintlich günstigeren Monatszahl.",
  },
  {
    q: "Für wen passt SEO ohne Mindestlaufzeit eher nicht?",
    a: "Weniger passend ist das Modell, wenn intern niemand Freigaben übernimmt, Zugänge fehlen oder nach jedem Monat eine vollständige Ergebnisbewertung erwartet wird. In diesen Fällen sollte zuerst ein Audit oder ein klar begrenztes Umsetzungsprojekt die Grundlagen schaffen.",
  },
];

function AgreementDossier() {
  const [active, setActive] = useState(0);
  const point = AGREEMENT_POINTS[active];

  return (
    <section className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-7 border-b-2 border-dark pb-9 lg:grid-cols-[1fr_410px] lg:items-end lg:gap-16">
          <div>
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.23em] text-primary-dark">Vertragsklarheit</span>
            <h2 className="max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-dark lg:text-[52px]">
              Monatlich kündbar ist nur dann flexibel, wenn das Ende mitgedacht ist.
            </h2>
          </div>
          <p className="text-muted leading-relaxed">
            Öffne einen Punkt des Übergabedossiers. Diese vier Fragen gehören in ein
            belastbares Angebot, bevor die erste SEO-Aufgabe beginnt.
          </p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[2rem] border border-dark/20 lg:grid-cols-[.68fr_1.32fr]">
          <div className="border-b border-dark/15 bg-[#F4EFE8] lg:border-b-0 lg:border-r" role="tablist" aria-label="Vertragspunkt auswählen">
            {AGREEMENT_POINTS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="agreement-panel"
                onClick={() => setActive(index)}
                className={`grid w-full grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-dark/10 px-6 py-5 text-left last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary-dark ${active === index ? "bg-dark text-white" : "text-dark/55 hover:bg-white hover:text-dark"}`}
              >
                <span className={`font-mono text-[9px] font-bold ${active === index ? "text-secondary" : "text-primary-dark"}`}>{String(index + 1).padStart(2, "0")}</span>
                <span className="font-[family-name:var(--font-heading)] text-lg font-bold">{item.label}</span>
                <span className={active === index ? "text-secondary" : "text-dark/25"} aria-hidden="true">→</span>
              </button>
            ))}
          </div>

          <div id="agreement-panel" role="tabpanel" className="relative min-h-[480px] overflow-hidden bg-dark p-7 text-white sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -bottom-12 -right-3 font-[family-name:var(--font-heading)] text-[210px] font-black leading-none text-white/[0.035]" aria-hidden="true">{String(active + 1).padStart(2, "0")}</div>
            <div key={point.id} className="relative flex min-h-[380px] flex-col motion-safe:animate-[fadeIn_.25s_ease-out]">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Aktiver Prüfpunkt · {point.label}</span>
              <h3 className="mt-5 max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] sm:text-4xl">{point.question}</h3>
              <p className="mt-5 max-w-2xl text-base leading-[1.8] text-white/58">{point.answer}</p>
              <div className="mt-auto border-t border-white/15 pt-6">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">Sollte schriftlich sichtbar sein</span>
                <p className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold text-secondary">{point.artifact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkingCycle() {
  const [active, setActive] = useState(0);
  const phase = WORK_CYCLE[active];

  return (
    <section className="overflow-hidden bg-[#F4EFE8] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-16">
          <div>
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.23em] text-primary-dark">Arbeitslogik</span>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-dark lg:text-[50px]">
              Monatlich kündbar heißt nicht: jeden Monat bei null anfangen.
            </h2>
            <p className="mt-6 text-base leading-[1.8] text-muted">
              SEO braucht keine erfundene Standard-Timeline. Es braucht einen stabilen
              Lernzyklus, in dem jede Runde einen sichtbaren Ausgang besitzt. Wähle eine
              Phase und prüfe, was dort dokumentiert werden sollte.
            </p>

            <div className="mt-8 border-y border-dark/20" role="tablist" aria-label="Phase des SEO-Arbeitszyklus wählen">
              {WORK_CYCLE.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-controls="working-cycle-panel"
                  onClick={() => setActive(index)}
                  className={`grid w-full grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-dark/10 py-4 text-left last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark ${active === index ? "text-dark" : "text-dark/40 hover:text-dark/75"}`}
                >
                  <span className="font-mono text-[9px] font-bold text-primary-dark">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-[family-name:var(--font-heading)] text-lg font-bold">{item.label}</span>
                  <span className={active === index ? "text-primary-dark" : "text-dark/20"} aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>

          <div id="working-cycle-panel" role="tabpanel" className="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-dark p-7 text-white sm:p-10 lg:p-12">
            <svg viewBox="0 0 620 560" className="pointer-events-none absolute inset-0 h-full w-full opacity-35" aria-hidden="true">
              <path d="M110 420 C80 200 240 84 410 137 C542 178 553 370 410 443 C300 499 177 461 110 420Z" fill="none" stroke="#D4A853" strokeWidth="1" strokeDasharray="8 11" />
              <circle cx={150 + active * 90} cy={390 - active * 65} r="9" fill="#D4A853" />
              <circle cx={150 + active * 90} cy={390 - active * 65} r="23" fill="none" stroke="#D4A853" strokeWidth="1" />
            </svg>
            <div key={phase.id} className="relative flex min-h-[460px] flex-col motion-safe:animate-[fadeIn_.25s_ease-out]">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Arbeitszustand · {phase.label}</span>
              <div className="mt-auto">
                <h3 className="max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[44px]">{phase.title}</h3>
                <p className="mt-5 max-w-2xl text-base leading-[1.8] text-white/58">{phase.text}</p>
                <div className="mt-8 border-t border-white/15 pt-6">
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">Beleg dieser Phase</span>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-secondary">{phase.proof}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OhneVertragClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section data-hero className="relative flex min-h-screen items-center overflow-hidden bg-dark">
        <Image
          src="/images/seo-inhouse-gespraech-v2.jpg"
          alt="Zwei Kolleginnen besprechen Prioritäten einer laufenden SEO-Zusammenarbeit"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/45" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:52px_52px]" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/35 bg-dark/50 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-secondary backdrop-blur-sm">
              SEO Betreuung · flexible Laufzeit
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[64px]">
              SEO-Betreuung ohne Vertrag —
              <span className="mt-2 block text-secondary">monatlich kündbar und sauber übergebbar.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-white/68">
              Flexibilität ist mehr als eine kurze Laufzeit. Diese Seite zeigt, welche
              Kündigungs-, Dokumentations- und Übergaberegeln eine monatlich kündbare
              SEO-Betreuung braucht — und wann ein Audit oder ein begrenztes Projekt der
              ehrlichere Einstieg ist.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#klarheit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-secondary px-7 py-3.5 text-sm font-bold text-dark hover:bg-secondary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
                Vertragsklarheit prüfen ↓
              </a>
              <Link href="/seo/betreuung" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white hover:border-white/55 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Zur laufenden SEO-Betreuung →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div id="klarheit" className="scroll-mt-24">
        <AgreementDossier />
      </div>

      <WorkingCycle />

      <section className="bg-dark py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 border-b border-white/20 pb-10 lg:grid-cols-[1fr_430px] lg:items-end lg:gap-16">
            <div>
              <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.23em] text-secondary">Operative Klarheit</span>
              <h2 className="max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] lg:text-[52px]">
                Eine flexible SEO-Betreuung muss jederzeit erklärbar bleiben.
              </h2>
            </div>
            <p className="text-base leading-[1.8] text-white/58">
              Eine kurze Kündigungsfrist macht die Zusammenarbeit beweglich. Sie ersetzt
              aber weder einen klaren Leistungsrahmen noch verlässliche Zuständigkeiten.
              Entscheidend ist, ob ein Unternehmen jederzeit nachvollziehen kann, woran
              gearbeitet wird, wer entscheiden muss und wie ein Wechsel ohne
              Wissensverlust gelingt.
            </p>
          </div>

          <div className="mt-4 border-y border-white/20">
            <article className="grid gap-5 border-b border-white/15 py-8 sm:grid-cols-[48px_180px_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[48px_280px_minmax(0,1fr)] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">01</span>
              <h3 className="min-w-0 break-words font-[family-name:var(--font-heading)] text-xl font-bold">Arbeit und Abnahme</h3>
              <p className="text-sm leading-[1.85] text-white/58">
                Vor dem Start sollte schriftlich feststehen, welche Website-Bereiche
                betreut werden, welche Leistungen enthalten sind und wo die Verantwortung
                endet. Dazu gehören beispielsweise technische Analysen, Content-Briefings,
                interne Verlinkung, Abstimmung mit Entwicklung oder die Auswertung
                definierter Suchsignale. Ebenso wichtig sind Freigabewege, Ansprechpartner
                und die Form der Dokumentation. Für eine Kündigung braucht es eine operative
                Regel: Bis zu welchem Termin werden neue Aufgaben angenommen, welche
                begonnenen Arbeiten werden beendet und welcher Stand wird übergeben? So
                bleibt der letzte Monat ein geordneter Arbeitsabschnitt statt einer offenen
                Resteliste.
              </p>
            </article>

            <article className="grid gap-5 border-b border-white/15 py-8 sm:grid-cols-[48px_180px_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[48px_280px_minmax(0,1fr)] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">02</span>
              <h3 className="min-w-0 break-words font-[family-name:var(--font-heading)] text-xl font-bold">Konten und Material</h3>
              <p className="text-sm leading-[1.85] text-white/58">
                Zentrale Systeme sollten über unternehmenskontrollierte Konten erreichbar
                sein. Das betrifft nicht nur Search Console und Webanalyse, sondern auch
                Tag-Management, CMS, Crawl-Daten, Keyword-Sets, Briefings und
                Freigabeprotokolle. Ein sinnvolles Rollenmodell gibt der Agentur nur die
                Berechtigungen, die sie für ihre Arbeit benötigt. Gemeinsame Projektordner
                und klar benannte Dateien verhindern, dass wichtige Entscheidungen in
                einzelnen Postfächern oder privaten Tool-Accounts verschwinden. So bleibt
                die Infrastruktur nutzbar, auch wenn sich Ansprechpartner oder Dienstleister
                ändern.
              </p>
            </article>

            <article className="grid gap-5 border-b border-white/15 py-8 sm:grid-cols-[48px_180px_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[48px_280px_minmax(0,1fr)] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">03</span>
              <h3 className="min-w-0 break-words font-[family-name:var(--font-heading)] text-xl font-bold">Entscheidungsprotokoll</h3>
              <p className="text-sm leading-[1.85] text-white/58">
                Ein Monatsbericht allein steuert keine SEO-Arbeit. Hilfreicher ist ein
                fortlaufendes Entscheidungsprotokoll: Welches Problem wurde untersucht?
                Welche Annahme lag der Maßnahme zugrunde? Was wurde veröffentlicht, welches
                Signal wird beobachtet und wann wird neu bewertet? Dazu gehören auch
                zurückgestellte Aufgaben samt Begründung. Diese Taktung verbindet Strategie
                und Umsetzung über Monatsgrenzen hinweg. Kündbarkeit bedeutet dann nicht,
                die Richtung ständig neu zu wählen, sondern auf Grundlage eines aktuellen
                Arbeitsstands entscheiden zu können.
              </p>
            </article>

            <article className="grid gap-5 border-b border-white/15 py-8 sm:grid-cols-[48px_180px_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[48px_280px_minmax(0,1fr)] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">04</span>
              <h3 className="min-w-0 break-words font-[family-name:var(--font-heading)] text-xl font-bold">Betreuung oder Einzelauftrag</h3>
              <div className="text-sm leading-[1.85] text-white/58">
                <p>
                  Eine <Link href="/seo/betreuung" className="font-semibold text-secondary underline decoration-secondary/35 underline-offset-4 hover:text-secondary-light">laufende Betreuung</Link> passt, wenn regelmäßig priorisiert, umgesetzt, geprüft und nachgesteuert werden muss. Ein <Link href="/seo/audit" className="font-semibold text-secondary underline decoration-secondary/35 underline-offset-4 hover:text-secondary-light">SEO Audit</Link> liefert dagegen vor allem Diagnose, Ursachen und eine priorisierte Handlungsgrundlage. Ein begrenztes Projekt eignet sich, wenn das Ergebnis eindeutig abnehmbar ist — etwa eine Informationsarchitektur, ein technischer Maßnahmenplan oder die Überarbeitung eines festgelegten Seitenbereichs.
                </p>
                <p className="mt-4">
                  Wer nur Klarheit über den Ausgangszustand benötigt, braucht nicht
                  automatisch fortlaufende Betreuung. Wer viele voneinander abhängige
                  Änderungen veröffentlichen und aus ihren Signalen lernen will, profitiert
                  eher von einem wiederkehrenden Arbeitsmodus.
                </p>
              </div>
            </article>

            <article className="grid gap-5 bg-white/[0.04] py-8 sm:grid-cols-[48px_180px_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[48px_280px_minmax(0,1fr)] lg:py-10">
              <span className="font-mono text-[10px] font-bold text-secondary">05</span>
              <h3 className="min-w-0 break-words font-[family-name:var(--font-heading)] text-xl font-bold">Die Schlussakte</h3>
              <div>
                <p className="text-sm leading-[1.85] text-white/58">
                  Eine nützliche Abschlussübergabe führt Entscheidung, Umsetzung und
                  nächsten Schritt zusammen. Sie ist kein unsortierter Tool-Export, sondern
                  ermöglicht einem internen Team oder neuen Partner, ohne Rekonstruktion
                  verstreuter Dateien weiterzuarbeiten.
                </p>
                <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-white/72 sm:grid-cols-2 sm:gap-x-8">
                  <li className="border-l border-secondary pl-3">Änderungen mit URLs, Datum und Zweck</li>
                  <li className="border-l border-secondary pl-3">Offene Aufgaben, Risiken und Abhängigkeiten</li>
                  <li className="border-l border-secondary pl-3">Verworfene Optionen mit Begründung</li>
                  <li className="border-l border-secondary pl-3">Kontoinhaber und aktive Berechtigungen</li>
                  <li className="border-l border-secondary pl-3">Dashboards, Messpunkte und Datenlücken</li>
                  <li className="border-l border-secondary pl-3">Priorisierte nächste Prüfungen mit Kontext</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-dark/20 lg:grid-cols-2">
            <div className="bg-dark p-8 text-white lg:p-12">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Passt eher</span>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] lg:text-4xl">Wenn Flexibilität aktiv gesteuert wird.</h2>
              <ul className="mt-7 flex flex-col gap-4 text-sm leading-relaxed text-white/62">
                <li>Interne Ansprechpartner können Freigaben und Zugänge zuverlässig liefern.</li>
                <li>Prioritäten dürfen sich ändern, werden aber jeweils begründet dokumentiert.</li>
                <li>Ein sauberer Übergabestand ist genauso wichtig wie das nächste Release.</li>
              </ul>
            </div>
            <div className="bg-[#F4EFE8] p-8 lg:p-12">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary-dark">Passt eher nicht</span>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.08] text-dark lg:text-4xl">Wenn ein einzelner Auftrag das Problem klarer löst.</h2>
              <ul className="mt-7 flex flex-col gap-4 text-sm leading-relaxed text-muted">
                <li>Die Ausgangslage ist unbekannt und braucht zunächst einen belastbaren Befund.</li>
                <li>Es gibt nur eine definierte technische oder redaktionelle Baustelle.</li>
                <li>Erwartet wird ein garantiertes Ranking innerhalb eines festen Kurzzeitfensters.</li>
              </ul>
              <Link href="/seo/audit" className="mt-8 inline-flex font-semibold text-primary-dark underline decoration-primary-dark/35 underline-offset-4 hover:text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark">
                Einmaligen SEO Audit als Einstieg prüfen →
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 border-t border-dark/20 pt-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-4xl text-sm leading-[1.8] text-muted">
              Die Laufzeit beantwortet nicht, ob sich SEO wirtschaftlich trägt. Dafür müssen
              Investition, zusätzlicher Deckungsbeitrag und Attribution mit eigenen Daten
              modelliert werden. Der{" "}
              <Link href="/seo/betreuung/roi" className="font-semibold text-dark underline decoration-primary-dark decoration-2 underline-offset-4 hover:text-primary-dark">
                SEO-ROI-Rechner
              </Link>{" "}
              ist bewusst nur auf der Wirtschaftlichkeitsseite verankert und verwendet keine
              erfundenen Branchenbenchmarks.
            </p>
            <Link href="/seo/optimierung" className="inline-flex min-h-11 items-center justify-center rounded-full border border-dark px-5 py-3 text-sm font-semibold text-dark hover:bg-dark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark">
              Definierte SEO-Maßnahme prüfen →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F4EFE8] py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-12">
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary-dark">Häufige Fragen</span>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-dark">SEO ohne Vertrag — präzise erklärt</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <div key={faq.q} className="overflow-hidden rounded-2xl border border-border bg-white">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary-dark"
                  >
                    <span className="font-semibold text-dark">{faq.q}</span>
                    <span className={`text-primary-dark transition-transform motion-reduce:transition-none ${open ? "rotate-45" : ""}`} aria-hidden="true">＋</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="border-t border-border px-6 py-5 text-sm leading-[1.8] text-muted">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="jetzt-starten" className="border-y border-border bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary-dark">Nächster Schritt</span>
            <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.08] text-dark lg:text-5xl">Flexible Betreuung beginnt mit klaren Regeln.</h2>
            <p className="mt-5 max-w-3xl text-base leading-[1.8] text-muted">
              Beschreibe Website, Ausgangslage und interne Kapazität. Im Gespräch lässt sich
              einordnen, ob monatliche Betreuung, Audit oder ein begrenztes Projekt sinnvoller ist.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/kontakt" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-dark px-7 py-3.5 text-sm font-bold text-white hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-dark">
              Betreuung einordnen lassen →
            </Link>
            <a href="tel:015129547343" className="inline-flex min-h-12 items-center justify-center rounded-full border border-dark/20 px-7 py-3.5 text-sm font-semibold text-dark hover:border-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark">
              0151 29547343
            </a>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
