"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleCheck,
  CornerDownRight,
  FileCheck2,
  FileSearch,
  Fingerprint,
  Link2,
  Network,
  Newspaper,
  Radar,
  ScanSearch,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  X,
} from "lucide-react";
import SubpageLayout from "@/app/components/SubpageLayout";
import { linkbuildingFaqs } from "./content";
import styles from "./linkbuilding.module.css";

type SourceTone = "priority" | "conditional" | "caution" | "reject";

type SourceType = {
  id: string;
  label: string;
  short: string;
  verdict: string;
  tone: SourceTone;
  summary: string;
  signals: readonly string[];
  watch: readonly string[];
  dimensions: readonly {
    label: string;
    value: "stark" | "mittel" | "schwach";
  }[];
};

const sourceTypes: readonly SourceType[] = [
  {
    id: "fachredaktion",
    label: "Fachredaktion",
    short: "Editorial Fit",
    verdict: "Priorisieren",
    tone: "priority",
    summary:
      "Eine unabhängige Fachredaktion kann ein starkes Signal sein, wenn Thema, Leserschaft und verlinkte Ressource wirklich zusammenpassen.",
    signals: [
      "Namentliche Autorenschaft und erkennbare Redaktion",
      "Eigenständige Inhalte für eine fachlich passende Leserschaft",
      "Der Link belegt oder vertieft eine konkrete Aussage",
    ],
    watch: [
      "Gastartikel-Farm ohne redaktionelles Profil",
      "Erzwungener Keyword-Anker statt natürlicher Quellenangabe",
    ],
    dimensions: [
      { label: "Themenbezug", value: "stark" },
      { label: "Redaktion", value: "stark" },
      { label: "Lesernutzen", value: "stark" },
    ],
  },
  {
    id: "verband",
    label: "Verband & Institution",
    short: "Context Check",
    verdict: "Kontext prüfen",
    tone: "conditional",
    summary:
      "Verbände und Institutionen sind nicht automatisch wertvoll. Entscheidend ist, ob die Nennung aus echter fachlicher Beziehung oder nur aus einem bezahlten Verzeichnis entsteht.",
    signals: [
      "Nachvollziehbare fachliche Verbindung zur Organisation",
      "Kuratiertes Ressourcenverzeichnis oder redaktioneller Kontext",
      "Transparente Kriterien für Aufnahme und Aktualisierung",
    ],
    watch: [
      "Jede Website kann sich gegen Gebühr eintragen",
      "Veraltete Listen ohne redaktionelle Pflege",
    ],
    dimensions: [
      { label: "Themenbezug", value: "stark" },
      { label: "Redaktion", value: "mittel" },
      { label: "Lesernutzen", value: "mittel" },
    ],
  },
  {
    id: "digital-pr",
    label: "Digital-PR-Erwähnung",
    short: "Earned Story",
    verdict: "Chance entwickeln",
    tone: "priority",
    summary:
      "Eine relevante Geschichte, ein belastbarer Datensatz oder eine hilfreiche Expertenperspektive kann redaktionelle Erwähnungen verdienen. Der Link bleibt eine Entscheidung der Redaktion.",
    signals: [
      "Eigenständiger Nachrichtenwert statt Werbebotschaft",
      "Belegbare Aussage und zitierfähige Primärquelle",
      "Individuell ausgewählte, thematisch passende Kontakte",
    ],
    watch: [
      "Pressemitteilung ohne relevante neue Information",
      "Versprochene Platzierung als Gegenleistung",
    ],
    dimensions: [
      { label: "Themenbezug", value: "stark" },
      { label: "Redaktion", value: "stark" },
      { label: "Lesernutzen", value: "stark" },
    ],
  },
  {
    id: "gastbeitrag",
    label: "Gastbeitrag",
    short: "Manual Review",
    verdict: "Streng prüfen",
    tone: "caution",
    summary:
      "Ein Gastbeitrag kann Wissen zugänglich machen – oder Teil eines skalierbaren Linkschemas sein. Publikation, Autorenschaft und redaktionelle Kontrolle entscheiden.",
    signals: [
      "Die Expertise des Autors ist für das Thema relevant",
      "Der Beitrag funktioniert auch ohne werbliche Verlinkung",
      "Die Publikation redigiert, prüft und lehnt Beiträge ab",
    ],
    watch: [
      "Beliebige Themen auf derselben Domain",
      "Verkaufte Slots mit vorgegebenem Ankertext",
    ],
    dimensions: [
      { label: "Themenbezug", value: "mittel" },
      { label: "Redaktion", value: "mittel" },
      { label: "Lesernutzen", value: "mittel" },
    ],
  },
  {
    id: "verzeichnis",
    label: "Massenverzeichnis",
    short: "Low Signal",
    verdict: "Nicht verfolgen",
    tone: "reject",
    summary:
      "Ein generisches Verzeichnis ohne fachliche Auswahl schafft selten einen guten Grund für den Link. Reichweite oder eine große Domain-Kennzahl ändern daran wenig.",
    signals: [
      "Nur bei echter lokaler oder fachlicher Nutzfunktion denkbar",
      "Eintrag muss aktuell, korrekt und für Nutzer auffindbar sein",
      "Aufnahme folgt nachvollziehbaren Qualitätskriterien",
    ],
    watch: [
      "Automatisierte Eintragung in zahlreiche Verzeichnisse",
      "Dünne Profilseiten ohne Publikum und redaktionellen Zweck",
    ],
    dimensions: [
      { label: "Themenbezug", value: "schwach" },
      { label: "Redaktion", value: "schwach" },
      { label: "Lesernutzen", value: "schwach" },
    ],
  },
  {
    id: "linkpaket",
    label: "PBN & Linkpaket",
    short: "Risk Pattern",
    verdict: "Ablehnen",
    tone: "reject",
    summary:
      "Ein vorgefertigtes Paket verkauft Stückzahl, nicht Relevanz. Kontrollierte Netzwerke, austauschbare Artikel und garantierte Keyword-Anker gehören nicht in nachhaltigen Linkaufbau.",
    signals: [
      "Keine positiven Qualitätssignale für diesen Ansatz",
      "Quellenwahl folgt Verfügbarkeit statt fachlicher Eignung",
      "Platzierung ist vom redaktionellen Wert entkoppelt",
    ],
    watch: [
      "Garantierte Anzahl und vorab festgelegte Domain-Werte",
      "Identische Muster über viele kontrollierte Websites",
    ],
    dimensions: [
      { label: "Themenbezug", value: "schwach" },
      { label: "Redaktion", value: "schwach" },
      { label: "Lesernutzen", value: "schwach" },
    ],
  },
];

const toneStyles: Record<SourceTone, { badge: string; line: string; dot: string }> = {
  priority: {
    badge: "border-emerald-600/25 bg-emerald-50 text-emerald-800",
    line: "bg-emerald-600",
    dot: "bg-emerald-600",
  },
  conditional: {
    badge: "border-secondary/40 bg-secondary/10 text-amber-900",
    line: "bg-secondary",
    dot: "bg-secondary",
  },
  caution: {
    badge: "border-primary/30 bg-primary/[0.07] text-primary-dark",
    line: "bg-primary",
    dot: "bg-primary",
  },
  reject: {
    badge: "border-red-700/20 bg-red-50 text-red-800",
    line: "bg-red-700",
    dot: "bg-red-700",
  },
};

const processMoves = [
  {
    number: "01",
    verb: "Spuren lesen",
    title: "Link-Gap und Ausgangslage",
    copy: "Wir betrachten Zielseiten, bestehende Verweise, Wettbewerber und interne Linkwege. So wird sichtbar, wo externe Bestätigung fehlt – und ob die betreffende Seite sie bereits verdient.",
    output: "Quellenfelder, Ziellogik, Prioritäten",
    icon: Radar,
  },
  {
    number: "02",
    verb: "Gründe schaffen",
    title: "Linkable Assets und PR-Winkel",
    copy: "Aus Expertise, Daten, Werkzeugen oder klaren Erklärungen entsteht eine Ressource mit Zitiergrund. Nicht jeder Anlass braucht eine große Kampagne – aber jeder Pitch braucht Substanz.",
    output: "Themenwinkel, Ressource, Quellenbeleg",
    icon: Sparkles,
  },
  {
    number: "03",
    verb: "Redaktionen verstehen",
    title: "Individuelle Quellenansprache",
    copy: "Wir wählen Kontakte nach Ressort, Publikum und bisheriger Berichterstattung. Die Ansprache erklärt den redaktionellen Nutzen; sie fordert keinen gekauften Keyword-Link.",
    output: "Passende Kontakte, nachvollziehbarer Pitch",
    icon: Newspaper,
  },
  {
    number: "04",
    verb: "Autorität leiten",
    title: "Prüfung und interne Verteilung",
    copy: "Neue Erwähnungen werden dokumentiert und im Kontext bewertet. Interne Links führen Relevanz anschließend zu den Seiten, die für Nutzer und Suche wichtig sind.",
    output: "Dokumentation, interne Linkwege, Lernschleife",
    icon: Workflow,
  },
] as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function EvidenceMap() {
  return (
    <div className={cx("relative overflow-hidden rounded-[28px] border border-white/10 bg-dark p-5 sm:p-7", styles.evidenceGrid)}>
      <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          Evidence map
        </span>
        <span>schematische Darstellung</span>
      </div>

      <div className="relative mx-auto aspect-[1.18/1] max-w-[560px]" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 470" fill="none">
          <path className={styles.drawLine} d="M90 91C177 80 180 190 278 232" stroke="#D4A853" strokeWidth="1.5" />
          <path className={styles.drawLine} d="M470 74C391 100 388 189 278 232" stroke="#C2722A" strokeWidth="1.5" />
          <path className={styles.drawLine} d="M73 358C166 365 180 274 278 232" stroke="#C2722A" strokeWidth="1.5" />
          <path className={styles.drawLine} d="M475 368C390 338 386 267 278 232" stroke="#D4A853" strokeWidth="1.5" />
          <path d="M279 230C315 233 348 226 385 209" stroke="white" strokeOpacity=".12" strokeWidth="1" strokeDasharray="3 8" />
          <circle className={styles.signalPulse} cx="90" cy="91" r="34" fill="#D4A853" fillOpacity=".08" stroke="#D4A853" strokeOpacity=".4" />
          <circle className={styles.signalPulse} cx="470" cy="74" r="30" fill="#C2722A" fillOpacity=".08" stroke="#C2722A" strokeOpacity=".42" style={{ animationDelay: "-1.2s" }} />
          <circle className={styles.signalPulse} cx="73" cy="358" r="31" fill="#C2722A" fillOpacity=".08" stroke="#C2722A" strokeOpacity=".42" style={{ animationDelay: "-.5s" }} />
          <circle className={styles.signalPulse} cx="475" cy="368" r="34" fill="#D4A853" fillOpacity=".08" stroke="#D4A853" strokeOpacity=".4" style={{ animationDelay: "-1.8s" }} />
          <circle cx="278" cy="232" r="73" fill="#F8F7F5" />
          <circle cx="278" cy="232" r="73" stroke="#D4A853" strokeOpacity=".42" />
          <circle cx="278" cy="232" r="61" stroke="#1A1A1A" strokeOpacity=".12" strokeDasharray="2 6" />
        </svg>

        <div className="absolute left-[4%] top-[7%] w-32 rounded-xl border border-secondary/30 bg-dark-light/90 px-3 py-2.5 text-white shadow-xl backdrop-blur">
          <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-secondary">Quelle A</span>
          <span className="mt-1 block text-[11px] font-semibold">Fachredaktion</span>
        </div>
        <div className="absolute right-[1%] top-[3%] w-32 rounded-xl border border-primary/35 bg-dark-light/90 px-3 py-2.5 text-white shadow-xl backdrop-blur">
          <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-primary-light">Quelle B</span>
          <span className="mt-1 block text-[11px] font-semibold">Digital PR</span>
        </div>
        <div className="absolute bottom-[8%] left-[1%] w-32 rounded-xl border border-primary/35 bg-dark-light/90 px-3 py-2.5 text-white shadow-xl backdrop-blur">
          <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-primary-light">Quelle C</span>
          <span className="mt-1 block text-[11px] font-semibold">Branchenbezug</span>
        </div>
        <div className="absolute bottom-[5%] right-0 w-32 rounded-xl border border-secondary/30 bg-dark-light/90 px-3 py-2.5 text-white shadow-xl backdrop-blur">
          <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-secondary">Quelle D</span>
          <span className="mt-1 block text-[11px] font-semibold">Link-Gap</span>
        </div>

        <div className="absolute left-1/2 top-1/2 flex h-[124px] w-[124px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center text-dark">
          <Fingerprint className="mb-2 h-5 w-5 text-primary" strokeWidth={1.5} />
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-dark/45">Beleg für</span>
          <span className="mt-1 font-[family-name:var(--font-heading)] text-base font-bold leading-tight">Ihre<br />Zielseite</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-[10px] text-white/45">
        <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-secondary" /> redaktionell begründbar</span>
        <span className="font-mono uppercase tracking-[0.12em]">Relevanz vor Reichweite</span>
      </div>
    </div>
  );
}

function SourceDueDiligence() {
  const [activeId, setActiveId] = useState(sourceTypes[0].id);
  const source = sourceTypes.find((item) => item.id === activeId) ?? sourceTypes[0];
  const tone = toneStyles[source.tone];

  return (
    <div className="overflow-hidden rounded-[30px] border border-dark/10 bg-[#efece6] shadow-[0_30px_80px_-45px_rgba(26,26,26,0.42)]">
      <div className="flex items-center justify-between border-b border-dark/10 px-5 py-4 sm:px-8">
        <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-dark/55">
          <ScanSearch className="h-4 w-4 text-primary" /> Quellen-Due-Diligence
        </span>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-dark/35 sm:block">Interaktiver Prüfrahmen</span>
      </div>

      <div className="grid lg:grid-cols-[285px_1fr]">
        <div className="border-b border-dark/10 bg-[#e7e2da] p-3 lg:border-b-0 lg:border-r lg:p-4" role="tablist" aria-label="Quellentyp auswählen">
          <p className="px-3 pb-3 pt-2 text-xs leading-relaxed text-dark/55">
            Wählen Sie einen Quellentyp. Das Urteil zeigt, worauf wir bei der manuellen Prüfung achten.
          </p>
          <div className="flex snap-x gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {sourceTypes.map((item, index) => {
              const active = item.id === source.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="source-verdict"
                  onClick={() => setActiveId(item.id)}
                  className={cx(
                    "group min-w-[210px] snap-start rounded-xl border px-4 py-3 text-left transition-all lg:min-w-0",
                    active
                      ? "border-dark bg-dark text-white shadow-lg"
                      : "border-dark/10 bg-white/55 text-dark hover:border-primary/35 hover:bg-white",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className={cx("font-mono text-[9px]", active ? "text-secondary" : "text-dark/35")}>0{index + 1}</span>
                    <span className="text-sm font-semibold">{item.label}</span>
                    <ArrowUpRight className={cx("ml-auto h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5", active ? "text-secondary" : "text-dark/25")} />
                  </span>
                  <span className={cx("mt-1.5 block pl-7 font-mono text-[8px] uppercase tracking-[0.15em]", active ? "text-white/45" : "text-dark/35")}>{item.short}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden bg-white p-5 sm:p-8 lg:p-10" id="source-verdict" role="tabpanel" aria-live="polite">
          <div className={cx("pointer-events-none absolute inset-x-0 top-0 h-px", styles.scanLine)} aria-hidden="true" />
          <div key={source.id} className={styles.verdictEnter}>
            <div className="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-dark/35">Aktives Dossier / {source.short}</span>
                <h3 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">{source.label}</h3>
              </div>
              <span className={cx("inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em]", tone.badge)}>
                <span className={cx("h-1.5 w-1.5 rounded-full", tone.dot)} />
                Urteil: {source.verdict}
              </span>
            </div>

            <p className="max-w-3xl border-b border-border py-7 text-lg leading-relaxed text-dark/70">{source.summary}</p>

            <div className="grid gap-8 py-7 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-dark">
                  <FileCheck2 className="h-4 w-4 text-primary" /> Was dafür sprechen kann
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {source.signals.map((signal) => (
                    <li key={signal} className="flex gap-3 text-sm leading-relaxed text-dark/65">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-red-900/10 bg-red-50/55 p-5">
                <h4 className="flex items-center gap-2 text-sm font-bold text-dark">
                  <Search className="h-4 w-4 text-red-700" /> Warnsignale
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {source.watch.map((warning) => (
                    <li key={warning} className="flex gap-3 text-sm leading-relaxed text-dark/65">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
              {source.dimensions.map((dimension) => (
                <div key={dimension.label} className="rounded-xl bg-offwhite px-4 py-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-dark/40">{dimension.label}</span>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={cx(
                        "h-1.5 flex-1 rounded-full",
                        dimension.value === "stark" && "bg-emerald-600",
                        dimension.value === "mittel" && "bg-secondary",
                        dimension.value === "schwach" && "bg-red-700",
                      )}
                    />
                    <span className="text-xs font-bold capitalize text-dark">{dimension.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-dark/40">
            Hinweis: Die Anzeige ist ein qualitativer Prüfrahmen, kein automatisierter Tool-Score und keine Bewertung einer konkreten Domain.
          </p>
        </div>
      </div>
    </div>
  );
}

function AuthorityFlow() {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-border bg-white p-5 sm:p-7">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-dark/45">Interne Autoritätsverteilung</span>
        <Network className="h-4 w-4 text-primary" />
      </div>
      <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
        <div className="rounded-2xl border-2 border-primary/20 bg-primary/[0.04] p-4 text-center">
          <Link2 className="mx-auto h-5 w-5 text-primary" />
          <span className="mt-2 block text-xs font-bold text-dark">Verlinkte Ressource</span>
          <span className="mt-1 block text-[10px] text-muted">Beleg, Tool oder Analyse</span>
        </div>
        <div className="flex items-center" aria-hidden="true">
          <span className="h-px w-5 bg-gradient-to-r from-primary to-secondary sm:w-10" />
          <ArrowRight className="h-4 w-4 text-secondary" />
        </div>
        <div className="flex flex-col gap-2">
          {["Leistungsseite", "Themen-Hub", "Passender Ratgeber"].map((item, index) => (
            <div key={item} className={cx("rounded-xl border px-3 py-2 text-[11px] font-semibold", index === 0 ? "border-secondary/40 bg-secondary/10 text-dark" : "border-border bg-offwhite text-dark/60")}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-7 border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted">
        Ein externer Link landet auf einer URL. Interne Links sorgen dafür, dass seine thematische Relevanz nicht dort stehen bleibt.
      </p>
    </div>
  );
}

function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="border-t border-dark/10">
      {linkbuildingFaqs.map((faq, index) => {
        const open = openFaq === index;
        const controlId = "linkbuilding-faq-" + index;
        return (
          <div key={faq.question} className="border-b border-dark/10">
            <button
              type="button"
              onClick={() => setOpenFaq(open ? null : index)}
              className="group flex w-full items-start gap-5 py-6 text-left sm:gap-8 sm:py-7"
              aria-expanded={open}
              aria-controls={controlId}
            >
              <span className="pt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">0{index + 1}</span>
              <span className="flex-1 font-[family-name:var(--font-heading)] text-xl font-bold leading-snug text-dark transition-colors group-hover:text-primary sm:text-2xl">{faq.question}</span>
              <span className={cx("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all", open ? "rotate-180 border-dark bg-dark text-white" : "border-dark/15 text-dark group-hover:border-primary group-hover:text-primary")}>
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            <div id={controlId} className={cx("grid transition-[grid-template-rows] duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 pl-9 pr-12 text-base leading-relaxed text-muted sm:pl-[68px]">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function LinkbuildingAgenturClient() {
  const [activeMove, setActiveMove] = useState(0);
  const move = processMoves[activeMove];
  const MoveIcon = move.icon;

  return (
    <SubpageLayout>
      <main className="overflow-x-clip bg-white">
        <section className="relative overflow-hidden border-b border-white/10 bg-dark text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 14% 18%, rgba(194,114,42,.38), transparent 25%), radial-gradient(circle at 83% 30%, rgba(212,168,83,.2), transparent 30%), linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)",
              backgroundSize: "auto, auto, 48px 48px, 48px 48px",
            }}
          />

          <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
            <div>
              <div className="mb-8 flex items-center gap-4 border-b border-white/15 pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                <span>SeoForge / Offpage SEO</span>
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-secondary">Dossier 04</span>
              </div>

              <p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Linkbuilding Agentur
              </p>
              <h1 className="max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(3.15rem,7vw,6.9rem)] font-bold leading-[.91] tracking-[-0.055em]">
                Backlinks mit
                <span className="block italic text-secondary">einem Grund.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/68 lg:text-xl">
                Linkaufbau beginnt nicht mit einer Domain-Liste. Er beginnt mit einer
                belegbaren Ressource, einer passenden Redaktion und der Frage, warum
                deren Leser genau diesen Verweis brauchen.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
                >
                  Linkprofil besprechen
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/seo/audit"
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 px-6 py-4 text-sm font-bold text-white transition-colors hover:border-secondary hover:text-secondary"
                >
                  Erst die SEO-Basis prüfen
                  <FileSearch className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-white/55">
                {["Manuelle Quellenprüfung", "Keine Linkpakete", "Dokumentierte Entscheidungen"].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CircleCheck className="h-4 w-4 text-secondary" /> {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
              <div className={cx("relative rounded-[26px] bg-[#f3efe7] p-6 text-dark sm:p-8", styles.paper)}>
                <span className={cx("absolute -top-7 left-5 bg-secondary px-5 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-dark", styles.folderTab)}>
                  Quellenakte / Vorprüfung
                </span>
                <div className="flex items-start justify-between border-b-2 border-dark pb-5">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-dark/40">Link Opportunity Record</span>
                    <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold">Lohnt dieser Verweis?</h2>
                  </div>
                  <ShieldCheck className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </div>

                <div className="divide-y divide-dark/12 py-2">
                  {[
                    ["01", "Themenbezug", "Passt Quelle zu Ziel und Aussage?"],
                    ["02", "Redaktion", "Wer prüft, pflegt und verantwortet?"],
                    ["03", "Lesernutzen", "Hilft der Link über SEO hinaus?"],
                    ["04", "Risikomuster", "Paket, Netzwerk oder echter Anlass?"],
                  ].map(([number, title, copy]) => (
                    <div key={number} className="grid grid-cols-[32px_1fr] gap-3 py-4">
                      <span className="font-mono text-[9px] font-bold text-primary">{number}</span>
                      <div>
                        <span className="block text-sm font-bold">{title}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-dark/55">{copy}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-between border-t-2 border-dark pt-5">
                  <span className="max-w-[230px] text-xs leading-relaxed text-dark/55">
                    Kennzahlen sind ein Hinweis. Die redaktionelle Plausibilität entscheidet.
                  </span>
                  <span className={cx("rounded-full border-2 border-primary px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-primary", styles.stamp)}>
                    manuell<br />geprüft
                  </span>
                </div>
              </div>
              <span className="absolute -bottom-8 right-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                Kein automatischer Domain-Score
              </span>
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-b border-dark/10 bg-secondary/15 py-3" aria-label="Leistungsprinzipien">
          <div className={cx("flex w-max items-center", styles.ticker)}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-9 px-5 font-mono text-[9px] font-bold uppercase tracking-[0.19em] text-dark/55 sm:gap-14">
                {[
                  "Relevanz vor Reichweite",
                  "Digital PR",
                  "Link-Gap-Analyse",
                  "Redaktionelle Quellen",
                  "Natürliche Ankertexte",
                  "Interne Autoritätswege",
                ].map((item) => (
                  <span key={`${copy}-${item}`} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="h-1.5 w-1.5 rotate-45 bg-primary" /> {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-16 lg:px-8">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">01 / Das Prinzip</p>
              <h2 className="mt-5 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.02] tracking-tight text-dark sm:text-5xl">
                Autorität lässt sich nicht bestellen. Aber vorbereiten.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Eine gute Backlinks Agentur jagt keiner Stückzahl hinterher. Sie findet
                Themen, Daten und Ressourcen, auf die andere Publikationen aus einem
                nachvollziehbaren redaktionellen Grund verweisen können.
              </p>
              <p className="mt-5 leading-relaxed text-muted">
                Deshalb betrachten wir zuerst die Zielseite: Deckt sie die Suchintention?
                Ist die Aussage belastbar? Gibt es intern einen sinnvollen Weg zu
                <Link href="/seo/content-strategie" className="mx-1 font-semibold text-primary underline decoration-primary/25 underline-offset-4 hover:decoration-primary">
                  relevanten Inhalten
                </Link>
                und Leistungen? Erst dann wird externe Autorität zum Hebel.
              </p>
              <div className="mt-8 border-l-2 border-secondary pl-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dark/35">Arbeitsregel</span>
                <p className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold italic leading-snug text-dark">
                  Der Link muss auch dann sinnvoll sein, wenn niemand an Rankings denkt.
                </p>
              </div>
            </div>
            <EvidenceMap />
          </div>
        </section>

        <section className="border-y border-dark/10 bg-offwhite py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-11 grid gap-5 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">02 / Quellenlabor</p>
                <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-dark sm:text-5xl">
                  Gleiche Kennzahl. Völlig anderer Wert.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-muted lg:justify-self-end">
                Domain-Metriken können zwei Quellen ähnlich aussehen lassen. Der Kontext
                erzählt oft eine andere Geschichte. Testen Sie im Dossier, wie sich das
                Urteil je nach Quellentyp verändert.
              </p>
            </div>
            <SourceDueDiligence />
          </div>
        </section>

        <section className="bg-dark py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">03 / Arbeitszyklus</p>
                <h2 className="mt-5 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.03] tracking-tight sm:text-5xl">
                  Vier Bewegungen. Eine Lernschleife.
                </h2>
                <p className="mt-6 leading-relaxed text-white/58">
                  Klicken Sie durch den Zyklus. Jeder Schritt produziert ein überprüfbares
                  Arbeitsergebnis – keine undurchsichtige Liste eingekaufter Domains.
                </p>
                <div className="mt-8 flex gap-2 lg:flex-col" role="tablist" aria-label="Linkbuilding-Arbeitszyklus">
                  {processMoves.map((item, index) => (
                    <button
                      key={item.number}
                      type="button"
                      role="tab"
                      aria-selected={activeMove === index}
                      onClick={() => setActiveMove(index)}
                      className={cx(
                        "group flex flex-1 items-center gap-3 border px-3 py-3 text-left transition-colors lg:px-4",
                        activeMove === index
                          ? "border-secondary bg-secondary text-dark"
                          : "border-white/12 bg-white/[.025] text-white/50 hover:border-white/30 hover:text-white",
                      )}
                    >
                      <span className="font-mono text-[9px] font-bold">{item.number}</span>
                      <span className="hidden text-sm font-bold lg:block">{item.verb}</span>
                      <CornerDownRight className="ml-auto hidden h-3.5 w-3.5 lg:block" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[470px] overflow-hidden rounded-[30px] border border-white/12 bg-dark-light p-6 sm:p-10" role="tabpanel" aria-live="polite">
                <span className="pointer-events-none absolute -right-2 -top-16 font-[family-name:var(--font-heading)] text-[180px] font-bold leading-none text-white/[.035] sm:text-[240px]">
                  {move.number}
                </span>
                <div key={move.number} className={styles.verdictEnter}>
                  <div className="flex items-center justify-between border-b border-white/12 pb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">Aktive Station / {move.number}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary-light">
                      <MoveIcon className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-9 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary-light">{move.verb}</p>
                  <h3 className="mt-3 max-w-xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl">{move.title}</h3>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{move.copy}</p>
                  <div className="mt-10 border-t border-white/12 pt-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Dokumentierter Output</span>
                    <p className="mt-2 flex items-center gap-3 font-semibold text-white">
                      <FileCheck2 className="h-4 w-4 text-secondary" /> {move.output}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-start lg:gap-16">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">04 / Lieferumfang</p>
                <h2 className="mt-5 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.03] tracking-tight text-dark sm:text-5xl">
                  Kein Backlink-Report ohne Entscheidungsgrund.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                  Das Reporting zeigt nicht nur, was passiert ist. Es hält fest, warum
                  eine Quelle verfolgt, verworfen oder erneut geprüft wurde – und welche
                  Zielseite davon profitieren soll.
                </p>

                <div className="mt-10 overflow-hidden rounded-[26px] border-2 border-dark bg-[#f4f0e8]">
                  <div className="flex items-center justify-between bg-dark px-5 py-4 text-white sm:px-7">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.19em]">Auszug / Monatsdossier</span>
                    <BookOpen className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="divide-y divide-dark/12 px-5 sm:px-7">
                    {[
                      ["POS 01", "Priorisierte Zielseiten", "Suchintention & interner Weg"],
                      ["POS 02", "Geprüfte Quellenfelder", "Fit, Redaktion & Risiko"],
                      ["POS 03", "Entwickelte Themenwinkel", "Anlass & Belegbarkeit"],
                      ["POS 04", "Ansprache und Rückmeldung", "Status ohne Schönfärbung"],
                      ["POS 05", "Erwähnungen und Learnings", "Kontext & nächste Entscheidung"],
                    ].map(([pos, title, detail]) => (
                      <div key={pos} className="grid gap-2 py-5 sm:grid-cols-[74px_1fr_auto] sm:items-baseline">
                        <span className="font-mono text-[9px] font-bold text-primary">{pos}</span>
                        <span className="font-semibold text-dark">{title}</span>
                        <span className="text-xs text-dark/45">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-28">
                <AuthorityFlow />
                <div className="mt-5 rounded-[26px] bg-primary p-6 text-white sm:p-8">
                  <Target className="h-6 w-6 text-secondary" />
                  <h3 className="mt-5 font-[family-name:var(--font-heading)] text-3xl font-bold">Wann Linkbuilding noch zu früh ist</h3>
                  <p className="mt-4 leading-relaxed text-white/75">
                    Wenn wichtige Seiten technisch nicht erreichbar sind, die Suchintention
                    verfehlen oder intern isoliert bleiben, beheben wir zuerst die Basis.
                    Ein <Link href="/seo/audit" className="font-bold text-white underline decoration-white/30 underline-offset-4">SEO Audit</Link> macht diese Reihenfolge sichtbar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-dark/10 bg-[#eee9e1] py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:px-8">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">05 / Klare Grenze</p>
              <h2 className="mt-5 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight text-dark sm:text-5xl">
                Was bei uns nicht als Strategie durchgeht.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Nachhaltiger Linkaufbau ist langsamer als ein Paketkauf – und ehrlicher.
                Redaktionelle Entscheidungen bleiben redaktionelle Entscheidungen.
              </p>
            </div>
            <div className="border-y-2 border-dark">
              {[
                ["Linkpakete nach Stückzahl", "Volumen ersetzt weder Themenbezug noch Lesernutzen."],
                ["Garantierte Rankings", "Kein seriöser Anbieter kontrolliert Suchergebnisse oder Redaktionen."],
                ["PBNs und versteckte Netzwerke", "Kontrolle über die Quelle ist kein Beleg für redaktionelle Qualität."],
                ["Erzwungene Keyword-Anker", "Ankertexte müssen aus dem Satz und der Quellenabsicht entstehen."],
                ["Domain-Metrik als einziges Kriterium", "Ein Score kann die manuelle Prüfung nicht übernehmen."],
              ].map(([title, copy], index) => (
                <div key={title} className="grid gap-3 border-b border-dark/15 py-6 last:border-b-0 sm:grid-cols-[42px_1fr_1.1fr] sm:items-baseline">
                  <span className="font-mono text-[9px] font-bold text-primary">0{index + 1}</span>
                  <span className={cx("w-fit bg-dark px-2 py-1 text-sm font-bold text-white", styles.redaction)}>{title}</span>
                  <span className="text-sm leading-relaxed text-dark/55">{copy}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">06 / Fragen</p>
              <h2 className="mt-5 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight text-dark sm:text-5xl">
                Linkbuilding, ohne Nebelmaschine.
              </h2>
              <p className="mt-6 leading-relaxed text-muted">
                Die häufigsten Fragen zu Quellen, Digital PR, Link-Gaps und seriösem Linkaufbau.
              </p>
            </div>
            <FaqSection />
          </div>
        </section>

        <section className="px-4 pb-6 sm:px-6">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-dark px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-secondary/20" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-8 -top-16 h-52 w-52 rounded-full border border-primary/30" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Nächster sinnvoller Schritt</span>
                <h2 className="mt-5 max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
                  Erst verstehen, welche Autorität Ihrer Seite fehlt.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
                  Im Erstgespräch prüfen wir Zielseiten, Wettbewerbsabstand und vorhandene
                  Assets. Danach wissen Sie, ob Linkbuilding aktuell der richtige Hebel ist.
                </p>
              </div>
              <Link href="/kontakt" className="group inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
                Erstgespräch anfragen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
