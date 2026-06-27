import Image from "next/image";
import Link from "next/link";
import StandortFaq from "@/app/components/StandortFaq";
import CityContactForm from "@/app/components/CityContactForm";
import { KeywordVolumeApp, RankingProgressApp } from "./UlmWidgets";

/* ── data ── */
const cityStats = [
  { value: "128.000",      label: "Einwohner" },
  { value: "11.000+",      label: "Uni & HS Studierende" },
  { value: "Daimler Truck", label: "Produktionsstandort" },
  { value: "Medizintechnik", label: "Wachstumsbranche" },
];

const industries = [
  { title: "Medizintechnik & Life Sciences", desc: "Storz, Schölly und weitere Medizintechnikhersteller machen Ulm zum wachsenden MedTech-Cluster. Wir entwickeln SEO-Strategien, die technische Präzision mit B2B-Marktreach verbinden — für Fachkräfte, Einkäufer und internationale Partner.", featured: true },
  { title: "Automotive & Produktion", desc: "Daimler Truck und Iveco machen Ulm zum bedeutenden Automotive-Standort. Zulieferer und Technologiepartner profitieren von B2B-SEO, das Einkäufer und Entscheider im Automotive-Ökosystem anspricht.", featured: false },
  { title: "IT & Software", desc: "Ulms Science City Initiative und die Universität Ulm treiben Tech-Gründungen an. IT-Unternehmen und Software-Dienstleister profitieren von Nischen-SEO für ihre spezifischen Zielgruppen.", featured: false },
  { title: "Tourismus & Münster", desc: "Das Ulmer Münster mit seinem Weltrekord-Kirchturm und Einsteins Geburtsstadt ziehen Touristen aus aller Welt an. Tourismus-Akteure und Gastronomie profitieren von lokalem SEO und Google Business.", featured: false },
  { title: "Bildung & Forschung", desc: "Universität Ulm und Hochschule Ulm bilden die akademische Basis für Forschung und Innovation. Spin-offs und Bildungseinrichtungen profitieren von E-E-A-T-starkem SEO, das wissenschaftliche Autorität aufbaut.", featured: false },
  { title: "E-Commerce & Handel", desc: "Ulms wachsende Kaufkraft durch Industrie- und Forschungsjobs treibt den lokalen Online-Handel. Wir entwickeln E-Commerce-SEO für den Ulmer Markt — mit regionalem Fokus auf Ulm und Neu-Ulm.", featured: false },
];

const process = [
  { step: "01", title: "SEO-Audit & Analyse", desc: "Vollständige technische Analyse Ihrer Website, Keyword-Recherche für den Ulmer MedTech- und Automotive-Markt und Wettbewerberanalyse. In 2 Wochen wissen Sie genau, wo Sie stehen." },
  { step: "02", title: "MedTech-Strategie", desc: "Branchenspezifische Content-Strategie für Medizintechnik, Automotive und Science City Ulm: regulatorisch korrekte Inhalte für MedTech, B2B-Content für Automotive-Zulieferer, Nischen-Keywords für IT-Startups." },
  { step: "03", title: "Umsetzung & Optimierung", desc: "Technisches SEO, On-Page-Optimierung und branchenspezifischer Content — für MedTech-Hersteller, Daimler-Truck-Zulieferer und die Science City Initiative. Ulm und Neu-Ulm als kombinierter Markt." },
  { step: "04", title: "Monitoring & Reporting", desc: "Monatliches Reporting mit klaren KPIs: Rankings, Traffic, Conversions. Transparent, verständlich — und immer mit Blick auf die Besonderheiten des Ulmer Industrie- und Wissenschaftsmarkts." },
];

const faqs = [
  { q: "Was macht Ulm als SEO-Standort besonders?", a: "Ulm ist Einsteins Geburtsstadt, Heimat des weltberühmten Ulmer Münsters (161,5 m, Weltrekordhöhe) und wachsendes MedTech-Zentrum. Daimler Truck, Iveco und ein starkes Life-Sciences-Cluster prägen die Wirtschaft. Die einzigartige Zwei-Länder-Lage (Baden-Württemberg und Bayern) macht Ulm und Neu-Ulm zu einem kombinierten Markt mit besonderem SEO-Potential." },
  { q: "Wie hilft SeoForge Ulmer Medizintechnikunternehmen?", a: "MedTech-SEO erfordert regulatorisch korrekten, technisch präzisen Content, der gleichzeitig Fachkräfte, Einkäufer und internationale Partner anspricht. Wir entwickeln Strategien für das Ulmer MedTech-Cluster — Storz, Schölly und Wettbewerber — mit Keywords, die B2B-Entscheidungsträger in der Medizintechnik ansprechen." },
  { q: "Wie lange dauert SEO in Ulm?", a: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für MedTech- und Automotive-Keywords entwickeln sich in der Regel in 3–6 Monaten. Ulms starke Industrie-Cluster erleichtern schnelle Gewinne bei spezifischen B2B-Keywords." },
  { q: "Betreut SeoForge auch Unternehmen in Neu-Ulm und der Region?", a: "Ja. Ulm und Neu-Ulm sind faktisch eine gemeinsame Wirtschaftsregion über Ländergrenzen hinweg. Wir entwickeln Strategien, die beide Städte und die gesamte IHK-Region Ulm (Heidenheim, Biberach, Ehingen) als kombinierten Markt erschließen." },
  { q: "Was unterscheidet SeoForge von anderen Agenturen in Ulm?", a: "Wir arbeiten ohne Vertragszwang und kennen Ulms Märkte: MedTech-Regulatorik, Daimler-Truck-Ökosystem, Science City Initiative. Keine Einheitslösungen, sondern Strategien für Ulms einzigartige Industrie- und Wissenschaftsbasis. Transparente Berichte inklusive." },
];

/* ── main component ── */
export default function UlmClient({ articleHtml }: { articleHtml: string }) {
  return (
    <main className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block pointer-events-none">
          <Image
            src="/images/cities/ulm-hero.jpg"
            alt="SEO Agentur Ulm – Einstein-Stadt Medizintechnik-Cluster"
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
              <span className="text-dark/70">Ulm</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Ulm · Einstein-Stadt · Medizintechnik-Cluster
            </div>
            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">/ SEO AGENTUR ULM</p>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.04] mb-6">
              SEO Agentur<br /><span className="gradient-text">Ulm</span>
            </h1>
            <div className="mb-8 space-y-4 max-w-xl">
              <p className="text-base text-muted leading-relaxed">
                Ulm ist Einsteins Geburtsstadt und Heimat des weltrekordhohen Münsters — und
                zugleich ein wachsender Industriestandort mit starker B2B-Nachfrage. Daimler Truck
                mit seinem Produktionsstandort und Iveco prägen die Automotive-Achse; ein zunehmend
                dichtes Medizintechnik-Cluster mit Unternehmen wie Storz und Schölly positioniert Ulm
                als MedTech-Zentrum Oberschwabens. Die Science City Initiative der Universität Ulm
                vernetzt Forschung und Wirtschaft systematisch. Die einzigartige Zwei-Länder-Lage an
                der A8 und der Donau verbindet Baden-Württemberg und Bayern zu einem kombinierten
                Markt mit regionalem Suchvolumen aus beiden Bundesländern.
              </p>
              <p className="text-base text-muted leading-relaxed">
                SeoForge baut Medizintechnik-Inhaltsautorität auf: regulatorisch korrekte Texte
                für CE-zertifizierte Produkte, B2B-Keywords für internationale MedTech-Einkäufer
                und strukturierte Daten für komplexe Produktkataloge. Im Automotive-Segment entwickeln
                wir Lieferketten-Content für das Daimler-Truck-Zuliefererökosystem. Einstein-Storytelling
                und Tourismus-Keywords für Münster und Donauregion erschließen zusätzliche regionale
                Suchräume.
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
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">/ Der Ulmer Markt</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-5">
                Ulm: Wo Industrie, Wissenschaft und Geschichte aufeinandertreffen
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                Das Ulmer Münster mit 161,5 Metern ist der höchste Kirchturm der Welt —
                und ein Symbol für Ulms Anspruch. Albert Einstein, geboren in Ulm, steht
                für den Geist dieser Stadt. Diese kulturelle Tiefe verbindet sich mit
                einer wachsenden Wirtschaftskraft: Daimler Truck und Iveco machen Ulm
                zum bedeutenden Automotive-Standort an der A8.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Das wachsende Medizintechnik-Cluster mit Unternehmen wie Storz und Schölly
                und die Science City Initiative der Universität Ulm positionieren Ulm als
                Innovationsstandort der Zukunft — mit starker B2B-Nachfrage nach digitaler
                Sichtbarkeit.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Ulms einzigartige Zwei-Länder-Lage an Donau und A8 macht Ulm und Neu-Ulm
                faktisch zu einem kombinierten Schwaben-Markt — mit SEO-Potenzial
                für Baden-Württemberg und Bayern gleichzeitig.
              </p>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/cities/ulm-city.jpg"
                  alt="Ulm Münster und Donau – Einstein-Stadt und MedTech-Cluster"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-semibold">Ulm</p>
                  <p className="text-white/60 text-xs">128.000 Einwohner · Einstein-Stadt an der Donau</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <div id="kontakt">
        <CityContactForm city="Ulm" />
      </div>

      {/* ═══ INDUSTRY FOCUS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Branchen-SEO</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">
              SEO für jede Branche in Ulm
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
                  alt="SeoForge Team – SEO Agentur Ulm"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unsere Methode</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
                Innovation an <span className="gradient-text">Donau & A8</span>
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Ulm verbindet Hochpräzisions-Industrie mit Wissenschaft. SEO hier bedeutet:
                regulatorisch korrekter MedTech-Content, B2B-Reichweite für Daimler-Truck-
                Zulieferer und Einstein-Storytelling, das Tourismus und Stadtidentität stärkt.
              </p>
              <ul className="space-y-3">
                {[
                  "MedTech-Content: regulatorisch korrekt, B2B-suchoptimiert für Storz/Schölly-Markt",
                  "Automotive-SEO für Daimler Truck und Iveco Zuliefererökosystem",
                  "Einstein-Storytelling und Tourismus-Keywords für Münster und Kulturerbe",
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
              Ihr Vorteil mit SeoForge Ulm
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { title: "MedTech-Content-Expertise", desc: "Präzise Inhalte für Medizintechnikhersteller — regulatorisch korrekt, suchoptimiert und für internationale B2B-Einkäufer verständlich. Das Ulmer MedTech-Cluster verdient SEO auf höchstem Niveau." },
              { title: "Automotive-B2B", desc: "SEO für Zulieferer im Daimler-Truck-Ökosystem: technischer Content, der Einkäufer und Entwickler gleichzeitig anspricht. Wir kennen die B2B-Anforderungen der Automotive-Branche." },
              { title: "Grenzstadt-Strategie", desc: "Ulm/Neu-Ulm als kombinierter Markt — Baden-Württemberg und Bayern in einer integrierten SEO-Strategie. Wir erschließen beide Regionen gleichzeitig." },
              { title: "Keine Verträge", desc: "Monatliche Zusammenarbeit ohne Mindestlaufzeit. Unsere Leistung überzeugt — nicht der Vertrag. Transparente Berichte inklusive." },
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
