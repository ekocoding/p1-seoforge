import Image from "next/image";
import Link from "next/link";
import StandortFaq from "@/app/components/StandortFaq";
import CityContactForm from "@/app/components/CityContactForm";

/* ── data ── */
const industries = [
  { title: "Automotive & Zulieferer", desc: "Bosch, Porsche und Mercedes-Benz prägen Stuttgart — darunter hunderte Tier-1- und Tier-2-Zulieferer. B2B-Einkäufer suchen Lieferanten zunehmend online. Wir entwickeln SEO-Strategien, die in dieser komplexen Lieferkette sichtbar machen.", featured: true },
  { title: "IT & Engineering", desc: "Von SAP-Beratung bis Maschinenbau-Software: Stuttgarts Tech-Sektor wächst durch die Automotive-Transformation. Wir positionieren IT-Dienstleister für die hochwertigsten Anfragen im B2B-Markt.", featured: false },
  { title: "Unternehmensberatung", desc: "Consulting-Firmen konkurrieren mit globalen Big-4-Agenturen und spezialisierten Boutiques. Thought-Leadership-Content kombiniert mit technischem SEO ist die nachhaltigste Antwort.", featured: false },
  { title: "Gesundheit & Pharma", desc: "Der Stuttgarter Gesundheitsmarkt wächst. Kliniken, Praxen und Pharmaunternehmen finden online neue Patienten und Partner — mit E-A-T-konformem SEO, das Vertrauen aufbaut.", featured: false },
  { title: "Immobilien & Bau", desc: "Stuttgart gehört zu den teuersten Immobilienmärkten Deutschlands. Makler, Bauträger und Architekten profitieren von starkem lokalem SEO mit präziser Stadtteil-Ausrichtung.", featured: false },
  { title: "Handel & E-Commerce", desc: "Von der Königstraße bis zum Online-Shop: Wir verbinden lokale und nationale SEO-Strategien für maximale Reichweite — sowohl für stationäre Händler als auch für Pure-Player.", featured: false },
];

const process = [
  { step: "01", title: "SEO-Audit & Analyse", desc: "Vollständige technische Analyse Ihrer Website, Keyword-Recherche für den Stuttgarter B2B-Markt und Wettbewerberanalyse. In 2 Wochen wissen Sie genau, wo Sie stehen." },
  { step: "02", title: "Strategie & Roadmap", desc: "Für Stuttgart bedeutet das: B2B-Suchintentionen verstehen, Automotive-Nomenklatur kennen und Entscheidungsprozesse mit langen Kaufzyklen in SEO übersetzen." },
  { step: "03", title: "Umsetzung & Optimierung", desc: "Technische Fixes, On-Page-Optimierung, Fachcontent-Erstellung und lokale Signale — alles in enger Abstimmung. Kein Outsourcing, keine Blackbox." },
  { step: "04", title: "Monitoring & Reporting", desc: "Monatliches Reporting mit klaren KPIs: Rankings, organischer Traffic, Leads. Transparent und verständlich — auch für Entscheider ohne SEO-Vorkenntnisse." },
];

const faqs = [
  { q: "Warum ist Stuttgart ein besonders schwieriger SEO-Markt?", a: "Stuttgart hat eine der wirtschaftsstärksten B2B-Landschaften Deutschlands: 31.400 Unternehmen in der Stadt, 244.000 in der Region, mit einem Schwergewicht auf Automotive, Engineering und IT. Diese Dichte führt zu intensivem Wettbewerb um digitale Sichtbarkeit — besonders im B2B-Bereich, wo Einkäufer zunehmend online nach Lieferanten und Dienstleistern suchen." },
  { q: "Wie hilft SeoForge Automotive-Zulieferern in Stuttgart?", a: "Automotive-SEO erfordert Branchenkenntnis: Wir kennen die Tier-1/Tier-2-Lieferkette, die Nomenklatur und die spezifischen Suchbegriffe, die Einkäufer bei OEMs wie Porsche, Bosch oder Mercedes verwenden. Wir entwickeln Content-Strategien, die in diesem hochspezialisierten B2B-Segment Sichtbarkeit und Vertrauen aufbauen." },
  { q: "Wie lange dauert es, bis SEO in Stuttgart Ergebnisse zeigt?", a: "Erste Verbesserungen bei technischem SEO und Local SEO sind nach 4–8 Wochen messbar. Für kompetitive B2B-Keywords im Automotive-Bereich entstehen nachhaltige Rankings typischerweise nach 6–9 Monaten. Die Investition lohnt sich: Wer jetzt SEO-Boden gutmacht, sichert sich die digitale Poleposition für das nächste Jahrzehnt." },
  { q: "Betreut SeoForge auch Unternehmen in der Stuttgarter Region?", a: "Ja. Die Region Stuttgart umfasst Böblingen, Esslingen, Ludwigsburg, Waiblingen und weitere Landkreise mit insgesamt 2,8 Millionen Einwohnern und 244.000 Unternehmen. Wir berücksichtigen lokale und regionale Suchintentionen in unserer SEO-Strategie." },
  { q: "Was unterscheidet SeoForge von anderen SEO-Agenturen in Stuttgart?", a: "Keine Vertragsbindung, transparente Berichte und Strategien, die auf dem echten Stuttgarter Markt basieren — B2B-Lieferketten, Automotive-Transformation, regionale Kaufkraft. Wir schreiben keinen generischen Content, sondern Texte, die Fachleute ernst nehmen." },
];

/* ── main ── */
export default function StuttgartClient({ articleHtml }: { articleHtml: string }) {
  return (
    <main className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block pointer-events-none">
          <Image
            src="/images/cities/stuttgart-hero.jpg"
            alt="SEO Agentur Stuttgart – Blick auf Stuttgart Schlossplatz"
            fill
            className="object-cover object-center"
            priority
            sizes="42vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.3) 40%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-24 lg:py-32">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-2 text-xs text-muted/60 font-mono mb-8">
              <Link href="/" className="hover:text-muted transition-colors">SeoForge</Link>
              <span>/</span>
              <Link href="/standorte" className="hover:text-muted transition-colors">Standorte</Link>
              <span>/</span>
              <span className="text-muted/80">Stuttgart</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Stuttgart · Landeshauptstadt Baden-Württemberg
            </div>

            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">
              / SEO AGENTUR STUTTGART
            </p>

            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.04] mb-6">
              SEO Agentur<br /><span className="gradient-text">Stuttgart</span>
            </h1>

            <div className="mb-8 space-y-4 max-w-xl">
              <p className="text-base text-muted leading-relaxed">
                Stuttgart ist Deutschlands Automotive-Hauptstadt: Bosch, Porsche und Mercedes-Benz
                prägen über 118.000 Arbeitsplätze allein im Cluster. Hinzu kommen hunderte Tier-1- und
                Tier-2-Zulieferer sowie Engineering-Dienstleister, die um dieselben B2B-Einkäufer und
                Entscheider konkurrieren. Die laufende Transformation zur Elektromobilität und zu
                Software-defined Vehicles öffnet neue digitale Suchräume: Einkäufer suchen Lieferanten
                für Batterie-, Power-Electronics- und ADAS-Komponenten zunehmend über Google. Die Region
                Stuttgart vereint 244.000 Unternehmen und ein BIP von rund 110 Milliarden Euro —
                ein B2B-Markt, der online gewonnen oder verloren wird.
              </p>
              <p className="text-base text-muted leading-relaxed">
                SeoForge denkt in Lieferketten und Kaufzyklen. Wir entwickeln B2B-Content, der
                Automotive-Nomenklatur beherrscht und Einkaufsentscheider bei Bosch, Porsche und
                Mercedes-Benz direkt anspricht. Technisches SEO für komplexe Produkt- und
                Zertifizierungsseiten, strukturierte Daten für Kataloge und Long-tail-Strategien
                für Nischenzulieferer — das ist unser Vorteil im Stuttgarter Markt.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Kostenlose SEO-Analyse
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link
                href="/seo-agentur"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite"
              >
                Unsere Leistungen
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted/70">
              {["< 24h Reaktionszeit", "Kein Vertrag", "KI-gestützt", "Vollständig transparent"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CITY INTRO ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">
              / Der Stuttgarter Markt
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-5">
                Stuttgart: Wo Automotive auf digitalen Wandel trifft
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                Stuttgart ist eine B2B-Stadt par excellence. Über 118.000 Menschen
                arbeiten im Automotive-Cluster — Zulieferer, Ingenieursbüros,
                Softwareentwickler und Berater sitzen auf engstem Raum. Bosch,
                Mercedes-Benz und Porsche setzen die Maßstäbe; das BIP der Region
                Stuttgart liegt bei rund 110 Milliarden Euro.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Die Transformation zu Elektromobilität und Software-defined Vehicles
                öffnet ein historisches Fenster: B2B-Einkäufer suchen neue Lieferanten
                online — und wer jetzt SEO-Boden gutmacht, sichert sich die digitale
                Poleposition für das nächste Jahrzehnt. Die Universität Stuttgart
                mit rund 25.000 Studierenden versorgt das Ökosystem mit Ingenieurnachwuchs.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Mit 244.000 Unternehmen in der Region ist der Wettbewerb enorm.
                Generisches SEO funktioniert hier nicht. Gefragt sind
                Branchenkenntnis, präzises Keyword-Targeting und Content,
                der Fachentscheider wirklich überzeugt.
              </p>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/cities/stuttgart-city.jpg"
                  alt="Stuttgart Schlossplatz – Wirtschaftsstandort und B2B-Zentrum"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-semibold">Stuttgart</p>
                  <p className="text-white/60 text-xs">635.000 Einwohner · Automotive-Hauptstadt Deutschlands</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <div id="kontakt">
        <CityContactForm city="Stuttgart" />
      </div>

      {/* ═══ INDUSTRY FOCUS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Branchen-SEO</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              SEO für jede Branche in Stuttgart
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {industries.map((ind, i) => (
              <div className="reveal" key={ind.title} style={{ animationDelay: `${i * 60}ms` }}>
                <div className="group grid md:grid-cols-[56px_260px_1fr] gap-2 md:gap-8 py-7 px-4 -mx-4 items-baseline hover:bg-white rounded-xl transition-colors duration-300">
                  <span className="font-mono text-xs font-bold text-primary/40 group-hover:text-primary transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark leading-snug">{ind.title}</h3>
                    {ind.featured && (
                      <span className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-primary uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Schwerpunkt
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-14">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unser Prozess</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              So bringen wir Sie auf Seite&nbsp;1
            </h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-[25px] top-4 bottom-4 w-px bg-primary/15" aria-hidden="true" />
            <div className="space-y-5">
              {process.map((p, i) => (
                <div className="reveal relative flex gap-6 items-start" key={p.step} style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="relative z-10 shrink-0 w-[52px] h-[52px] rounded-2xl bg-white border border-primary/25 shadow-sm flex items-center justify-center">
                    <span className="font-mono text-sm font-bold text-primary">{p.step}</span>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl border border-border p-6 hover:border-primary/25 hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-dark mb-1.5">{p.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TEAM IMAGE + METHODE ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="reveal">
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "16/10" }}>
                <Image
                  src="/images/cities/karlsruhe-tech.jpg"
                  alt="SeoForge Team – SEO Agentur Stuttgart"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unsere Methode</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
                B2B-SEO für <span className="gradient-text">Weltmarktführer</span>
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Stuttgart verlangt mehr als Standard-SEO. Wir denken in Lieferketten,
                Kaufzyklen und Entscheidungsprozessen — und entwickeln Strategien,
                die im härtesten B2B-Markt Deutschlands nachhaltig wirken.
              </p>
              <ul className="space-y-3">
                {[
                  "Automotive-Content entlang der gesamten Tier-1/Tier-2-Lieferkette",
                  "B2B-Keyword-Strategien für Mittelstand, Bosch/Porsche/Daimler-Ecosystem",
                  "Technisches SEO für komplexe Produkt- und Dienstleistungsseiten",
                  "Monatliches Reporting ohne Agentur-Blabla",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SEO CONTENT ARTICLE ═══ */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ SEO Wissen</p>
          </div>
          <div className="reveal" style={{ animationDelay: "80ms" }}>
            <div className="seo-content" dangerouslySetInnerHTML={{ __html: articleHtml }} />
          </div>
        </div>
      </section>

      {/* ═══ WHY SEOFORGE ═══ */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Warum SeoForge</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              Ihr Vorteil mit SeoForge Stuttgart
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { title: "B2B-SEO-Expertise", desc: "Stuttgarts Stärke liegt im B2B. Wir kennen Kaufzyklen, Entscheidungsprozesse und die Suchbegriffe, die Einkäufer in der Automotive-Lieferkette wirklich verwenden." },
              { title: "Branchenkenntnis", desc: "Wir verstehen die Automotive-Lieferkette, Engineering-Nomenklatur und IT-Märkte. Content, der klingt, als käme er von Fachleuten — nicht von Marketern." },
              { title: "Technisches SEO", desc: "Core Web Vitals, JavaScript-SEO, strukturierte Daten für komplexe Produkt- und Dienstleistungsseiten — sauber umgesetzt, messbar verbessert." },
              { title: "Keine Verträge", desc: "Monatliche Zusammenarbeit ohne Mindestlaufzeit. Transparente Berichte, klare KPIs. Unsere Leistung überzeugt — nicht der Vertrag." },
            ].map((b, i) => (
              <div className="reveal" key={b.title} style={{ animationDelay: `${i * 70}ms` }}>
                <div className="rounded-2xl border border-border bg-white p-7 h-full flex gap-5 items-start hover:border-primary/25 hover:shadow-md transition-all duration-300">
                  <div className="shrink-0 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <div className="h-3.5 w-3.5 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1.5">{b.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <StandortFaq items={faqs} defaultOpen={0} />

      {/* ═══ BOTTOM NAV ═══ */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/standorte" className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite">
              ← Alle Standorte
            </Link>
            <Link href="/seo-agentur" className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite">
              Unsere Leistungen
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
