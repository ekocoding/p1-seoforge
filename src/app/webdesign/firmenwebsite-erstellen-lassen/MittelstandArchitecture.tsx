import Link from "next/link";

const PAGE_FAMILIES = [
  {
    label: "Orientierung",
    pages: "Startseite · Unternehmen",
    job: "ordnet Angebot, Positionierung und Ansprechpartner ein",
  },
  {
    label: "Nachfrage",
    pages: "Leistungen · Lösungen · Regionen",
    job: "beantwortet konkrete Such- und Beschaffungsfragen auf eigenen URLs",
  },
  {
    label: "Beleg",
    pages: "Projekte · Verfahren · Qualität",
    job: "macht Auswahlkriterien und Arbeitsweise nachvollziehbar",
  },
  {
    label: "Handlung",
    pages: "Kontakt · Anfrage · Karriere",
    job: "führt unterschiedliche Besucher zum passenden nächsten Schritt",
  },
];

export default function MittelstandArchitecture() {
  return (
    <section id="firmenwebsite-architektur" className="scroll-mt-24 overflow-hidden bg-[#F4EFE8] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="scroll-hidden grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="mb-4 block font-mono text-[10px] font-semibold uppercase tracking-[0.23em] text-primary-dark">Informationsarchitektur</span>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.05] text-dark lg:text-[50px]">
              Welche Seiten braucht eine Firmenwebsite?
            </h2>
            <p className="mt-6 text-base leading-[1.8] text-muted">
              Nicht jede Firma braucht dieselbe Seitenzahl. Entscheidend ist, welche
              Fragen Kunden, Bewerber oder Partner getrennt beantworten müssen. Eine
              Startseite gibt Orientierung; sie sollte nicht zugleich jede Leistung,
              jeden Standort und jeden Einwand vollständig tragen.
            </p>
            <p className="mt-4 text-base leading-[1.8] text-muted">
              Für zentrale Leistungen entstehen deshalb eigene Seiten mit passendem
              Suchintent, Belegen und Anschlusswegen. Diese Struktur schafft zugleich
              die Grundlage für natürliche interne Verlinkung: von der Übersicht in
              die Vertiefung, von dort zu Projekten, Fragen und Kontakt.
            </p>
          </div>

          <div className="scroll-hidden overflow-hidden border-y-2 border-dark bg-white">
            <div className="relative border-b border-dark/20 bg-dark p-7 text-white sm:p-9">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary">Beispielhafte Seitenlogik · Umfang folgt dem Geschäftsmodell</span>
              <div className="mt-8 flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-secondary/50 bg-secondary/10 font-[family-name:var(--font-heading)] text-lg font-bold text-white">Start</span>
                <span className="h-px flex-1 bg-gradient-to-r from-secondary to-secondary/10" aria-hidden="true" />
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/45">verteilt Kontext, nicht Textmasse</span>
              </div>
            </div>

            <div>
              {PAGE_FAMILIES.map((family, index) => (
                <div key={family.label} className="grid gap-3 border-b border-dark/15 p-7 last:border-b-0 sm:grid-cols-[42px_150px_1fr] sm:items-start sm:p-8">
                  <span className="font-mono text-[10px] font-bold text-primary-dark">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="block font-[family-name:var(--font-heading)] text-lg font-bold text-dark">{family.label}</span>
                    <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.12em] text-dark/38">{family.pages}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{family.job}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scroll-hidden mt-12 grid gap-6 border-t border-dark/25 pt-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="max-w-4xl text-sm leading-[1.8] text-muted">
            Innerhalb unseres Webdesign-Angebots bleibt die Orientierung klar: Diese Seite gehört der
            konkreten <strong className="font-semibold text-dark">Firmenwebsite für KMU</strong>.
            Der übergeordnete Überblick erklärt das breitere Thema{" "}
            <Link href="/webdesign/website-erstellen-lassen" className="font-semibold text-dark underline decoration-primary-dark decoration-2 underline-offset-4 hover:text-primary-dark">Website erstellen lassen</Link>.
            Für ein bestehendes URL-Set führt die{" "}
            <Link href="/webdesign/website-relaunch-agentur" className="font-semibold text-dark underline decoration-primary-dark decoration-2 underline-offset-4 hover:text-primary-dark">Relaunch-Planung</Link>{" "}
            durch Migration und Weiterleitungen; einzelne Kampagnenziele gehören in eine fokussierte{" "}
            <Link href="/webdesign/landingpage-erstellen-lassen" className="font-semibold text-dark underline decoration-primary-dark decoration-2 underline-offset-4 hover:text-primary-dark">Landing Page</Link>.
          </p>
          <Link
            href="/webdesign"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-dark px-5 py-3 text-sm font-semibold text-dark transition-colors hover:bg-dark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark"
          >
            Alle Webdesign-Wege ansehen →
          </Link>
        </div>
      </div>
    </section>
  );
}
