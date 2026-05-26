import Image from "next/image";
import Link from "next/link";
import StandortFaq from "@/app/components/StandortFaq";
import CityContactForm from "@/app/components/CityContactForm";
import { KeywordVolumeApp, RankingProgressApp } from "./KoblenzWidgets";

/* ── data ── */
const cityStats = [
  { value: "115.000",      label: "Einwohner" },
  { value: "10.000+",      label: "Uni Studierende" },
  { value: "Deutsches Eck", label: "Rhein & Mosel" },
  { value: "UNESCO",       label: "Welterbe Mittelrhein" },
];

const industries = [
  { title: "Dienstleistung & Verwaltung", desc: "Das BAAINBw ist größter Arbeitgeber in Koblenz, flankiert von Landes- und Bundesbehörden. Dienstleister im Umfeld öffentlicher Auftraggeber profitieren von gezieltem B2B-SEO, das Fachkräfte und Entscheider gleichermaßen anspricht.", featured: true },
  { title: "Tourismus & Weinregion", desc: "Das Deutsche Eck, die Festung Ehrenbreitstein und die UNESCO-Welterbe-Region Mittelrhein ziehen Touristen aus aller Welt. Hotels, Weinbars und Ausflugsanbieter gewinnen Gäste über gezieltes Tourismus-SEO.", featured: false },
  { title: "Logistik & Transport", desc: "Koblenz liegt an einer der meistbefahrenen Binnenwasserstraßen Europas. Logistikdienstleister und Transportunternehmen profitieren von B2B-SEO, das Auftraggeber in der Region erreicht.", featured: false },
  { title: "Gesundheit & Pflege", desc: "Koblenz ist Gesundheitszentrum des Mittelrheins. Kliniken, Praxen und Pflegedienste gewinnen Patienten und Fachkräfte über lokales SEO mit regionalem Fokus.", featured: false },
  { title: "Handwerk & Bau", desc: "Die wachsende Region Koblenz schafft starke Nachfrage nach Handwerk und Bauleistungen. Lokales SEO mit handwerksspezifischen Keywords bringt Anfragen von Privat- und Geschäftskunden.", featured: false },
  { title: "IT & Beratung", desc: "Koblenz wächst als Standort für IT-Beratung und Digitalisierung — getrieben vom BAAINBw-Umfeld und der Universität Koblenz. IT-Unternehmen profitieren von gezieltem B2B-SEO.", featured: false },
];

const process = [
  { step: "01", title: "SEO-Audit & Analyse", desc: "Vollständige technische Analyse Ihrer Website, Keyword-Recherche für den Koblenzer Markt — Tourismus, Verwaltung, Mittelstand — und Wettbewerberanalyse. In 2 Wochen wissen Sie genau, wo Sie stehen." },
  { step: "02", title: "Mittelrhein-Strategie", desc: "Regionale SEO-Strategie für Koblenz und Umland: Westerwald, Eifel, Hunsrück. Wir erschließen den Mittelrhein-Markt mit Keywords, die regionale Kaufkraft und überregionale Sichtbarkeit verbinden." },
  { step: "03", title: "Umsetzung & Optimierung", desc: "Technisches SEO, On-Page-Optimierung und branchenspezifischer Content — für Behörden-Dienstleister, Tourismus-Akteure und den Koblenzer Mittelstand. Lokale Signale inklusive." },
  { step: "04", title: "Monitoring & Reporting", desc: "Monatliches Reporting mit klaren KPIs: Rankings, Traffic, Conversions. Transparent, verständlich — und immer mit Blick auf die Besonderheiten des Mittelrhein-Markts." },
];

const faqs = [
  { q: "Was macht Koblenz als SEO-Standort besonders?", a: "Koblenz vereint außergewöhnliche Faktoren: Das BAAINBw als größter Arbeitgeber mit ~4.500 Mitarbeitern, das Deutsche Eck als Deutschlands bekanntestes Flussconfluenz, UNESCO-Welterbe-Status des Oberen Mittelrheintals und eine starke Tourismus-Nachfrage. Diese Kombination schafft vielfältige SEO-Chancen für Dienstleister, Tourismus und Mittelstand." },
  { q: "Wie hilft SeoForge Koblenzer Dienstleistern im Behördenumfeld?", a: "B2B-SEO im Behördenumfeld erfordert präzisen, seriösen Content, der Kompetenz und Verlässlichkeit ausstrahlt. Wir entwickeln Strategien für IT-Dienstleister, Berater und Systemintegratoren im BAAINBw-Umfeld — mit Keywords, die Entscheider in Bundesbehörden und öffentlichen Auftraggebern ansprechen." },
  { q: "Lohnt sich Tourismus-SEO in Koblenz?", a: "Absolut. Das Deutsche Eck, die Festung Ehrenbreitstein und das UNESCO-Welterbe Mittelrhein ziehen Touristen aus aller Welt an. Hotels, Weinbars und Ausflugsanbieter finden in gezieltem Tourismus-SEO, Google Business-Optimierung und saisonalen Keywords einen direkten Weg zu mehr Buchungen." },
  { q: "Betreut SeoForge Unternehmen in der gesamten Mittelrhein-Region?", a: "Ja. Koblenz ist das Zentrum des Mittelrheins — umgeben von Westerwald, Eifel, Hunsrück und dem Moseltal. Wir entwickeln regionale Strategien, die Koblenz als Hub nutzen und Kunden aus dem gesamten Einzugsgebiet ansprechen." },
  { q: "Was unterscheidet SeoForge von anderen Agenturen in Koblenz?", a: "Wir arbeiten ohne Vertragszwang und kennen den Koblenzer Markt: das Behördenumfeld, die Tourismussaison, die Mittelstand-Strukturen. Keine Einheitslösungen, sondern Strategien für Koblenz und die Mittelrhein-Region. Transparente Berichte inklusive." },
];

/* ── main component ── */
export default function KoblenzClient({ articleHtml }: { articleHtml: string }) {
  return (
    <main className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block pointer-events-none">
          <Image
            src="/images/cities/koblenz-hero.jpg"
            alt="SEO Agentur Koblenz – Deutsches Eck UNESCO Welterbe"
            fill
            className="object-cover object-center"
            priority
            sizes="42vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.3) 40%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-24 lg:py-32">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-2 text-xs text-muted/60 font-mono mb-8">
              <Link href="/" className="hover:text-dark transition-colors">SeoForge</Link>
              <span>/</span>
              <Link href="/standorte" className="hover:text-dark transition-colors">Standorte</Link>
              <span>/</span>
              <span className="text-dark/70">Koblenz</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Koblenz · Deutsches Eck · UNESCO Welterbe
            </div>
            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">/ SEO AGENTUR KOBLENZ</p>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.04] mb-6">
              SEO Agentur<br /><span className="gradient-text">Koblenz</span>
            </h1>
            <div className="mb-8 space-y-4 max-w-xl">
              <p className="text-base text-muted leading-relaxed">
                Koblenz liegt am Deutschen Eck, wo Rhein und Mosel zusammenfließen — einem der
                bekanntesten Wahrzeichen Deutschlands. Das UNESCO-Welterbe Oberes Mittelrheintal
                macht die Region international sichtbar und bringt Touristen aus aller Welt. Das
                BAAINBw (Bundesamt für Ausrüstung, Informationstechnik und Nutzung der Bundeswehr)
                mit rund 4.500 Mitarbeitern ist der größte Arbeitgeber der Stadt und prägt das
                öffentliche Dienstleistungsumfeld. Die Universität Koblenz mit über 10.000 Studierenden
                und die Lage zwischen Westerwald, Eifel und Hunsrück machen Koblenz zum strategischen
                Zentrum einer weiträumigen Mittelrhein-Region.
              </p>
              <p className="text-base text-muted leading-relaxed">
                SeoForge erschließt die Mittelrhein-Region systematisch: B2B-Content für Dienstleister
                im BAAINBw-Umfeld, der Kompetenz und Verlässlichkeit gegenüber öffentlichen Auftraggebern
                ausstrahlt. Tourismus-SEO mit Deutsches-Eck-, Festung- und UNESCO-Welterbe-Keywords
                bringt Buchungen zu Hotels und Ausflugsbetrieben. Regionale Keyword-Strategien
                erschließen Westerwald, Eifel und Hunsrück als kombinierten Einzugsbereich.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Kostenlose SEO-Analyse
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
                  <span className="h-1 w-1 rounded-full bg-primary/50" />{item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {cityStats.map(({ value, label }, i) => (
              <div className="reveal" key={label} style={{ animationDelay: `${i * 80}ms` }}>
                <div>
                  <div className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted mt-1">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CITY INTRO ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">/ Der Koblenzer Markt</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-5">
                Koblenz: Wo Geschichte auf wirtschaftliche Gegenwart trifft
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                Koblenz wurde im 1. Jahrhundert von den Römern gegründet — und ist bis
                heute das Zentrum des Mittelrheins. Das BAAINBw (Bundesamt für Ausrüstung,
                Informationstechnik und Nutzung der Bundeswehr) mit rund 4.500 Mitarbeitern
                ist der größte Arbeitgeber der Stadt.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Das Deutsche Eck, wo Rhein und Mosel zusammenfließen, und das UNESCO-Welterbe
                Oberes Mittelrheintal ziehen Touristen aus aller Welt an und schaffen eine
                starke lokale Wirtschaft rund um Tourismus, Gastronomie und Weinregion.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Die Universität Koblenz mit über 10.000 Studierenden und die Lage
                zwischen Westerwald, Eifel und Hunsrück machen Koblenz zum strategischen
                SEO-Hub für die gesamte Mittelrhein-Region.
              </p>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/cities/koblenz-city.jpg"
                  alt="Koblenz Deutsches Eck – Rhein und Mosel Zusammenfluss"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-semibold">Koblenz</p>
                  <p className="text-white/60 text-xs">115.000 Einwohner · Deutsches Eck · UNESCO Welterbe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRY FOCUS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Branchen-SEO</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              SEO für jede Branche in Koblenz
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <div className="reveal" key={ind.title} style={{ animationDelay: `${i * 70}ms` }}>
                <div className={`rounded-xl border p-6 h-full ${ind.featured ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border bg-white"}`}>
                  {ind.featured && (
                    <span className="inline-flex items-center gap-1.5 mb-3 text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Schwerpunkt
                    </span>
                  )}
                  <h3 className="font-semibold text-dark mb-2">{ind.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KEYWORD VOLUME APP ═══ */}
      <KeywordVolumeApp />

      {/* ═══ PROCESS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-14">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unser Prozess</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              So bringen wir Sie auf Seite&nbsp;1
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <div className="reveal" key={p.step} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="relative bg-white rounded-xl border border-border p-6 h-full">
                  <div className="font-mono text-3xl font-bold text-primary/20 mb-4">{p.step}</div>
                  <h3 className="font-semibold text-dark mb-2">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <svg className="w-6 h-6 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
                  alt="SeoForge Team – SEO Agentur Koblenz"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unsere Methode</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
                Lokal verankert <span className="gradient-text">regional sichtbar</span>
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Koblenz verbindet Tourismus, Verwaltung und Mittelstand. Unsere SEO-Strategie
                erschließt den gesamten Mittelrhein — mit regionalen Signalen für lokale Kaufkraft
                und überregionaler Reichweite für Fach- und Saisonkunden.
              </p>
              <ul className="space-y-3">
                {[
                  "Mittelrhein-Region: Westerwald, Eifel, Hunsrück strategisch erschließen",
                  "Touristische Keywords für Deutsches Eck, Festung Ehrenbreitstein, Weinregion",
                  "B2B-Content für Verwaltungsumfeld: BAAINBw-Dienstleister und Behörden",
                  "Monatliches Reporting ohne Agentur-Blabla",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />{item}
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
              Ihr Vorteil mit SeoForge Koblenz
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Mittelrhein-Markt", desc: "Regionale SEO-Expertise für Koblenz und Umland: Westerwald, Eifel, Hunsrück. Wir erschließen den gesamten Mittelrhein-Markt mit einer integrierten Strategie." },
              { title: "Tourismus-SEO", desc: "Rhein/Mosel-Keywords, Weinregion, UNESCO-Welterbe: Wir bringen Touristen auf Ihre Website — von der Buchungsanfrage bis zur Weingutsbesichtigung." },
              { title: "B2B im Verwaltungsumfeld", desc: "Präziser Content für Behörden-Dienstleister: IT, Beratung, Systemintegration. Wir kennen die Anforderungen im BAAINBw-Umfeld und entwickeln passende B2B-Strategien." },
              { title: "Keine Verträge", desc: "Monatliche Zusammenarbeit ohne Mindestlaufzeit. Unsere Leistung überzeugt — nicht der Vertrag. Transparente Berichte inklusive." },
            ].map((b, i) => (
              <div className="reveal" key={b.title} style={{ animationDelay: `${i * 70}ms` }}>
                <div className="rounded-xl border border-border bg-white p-6 h-full">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <h3 className="font-semibold text-dark mb-2">{b.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <StandortFaq items={faqs} defaultOpen={0} />

      {/* ═══ CONTACT ═══ */}
      <div id="kontakt">
        <CityContactForm city="Koblenz" />
      </div>

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
