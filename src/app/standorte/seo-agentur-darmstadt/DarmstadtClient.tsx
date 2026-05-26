import Image from "next/image";
import Link from "next/link";
import StandortFaq from "@/app/components/StandortFaq";
import CityContactForm from "@/app/components/CityContactForm";

/* ── data ── */
const industries = [
  { title: "IT & Tech-Startups", desc: "Die TU Darmstadt produziert jährlich Informatik-Absolventen, die in Darmstadt gründen. Wir entwickeln Product-led SEO für SaaS- und Deep-Tech-Startups, die in ihrer Nische Autorität aufbauen wollen.", featured: true },
  { title: "Life Sciences & Pharma", desc: "Merck KGaA und ein wachsendes Life-Sciences-Umfeld brauchen Fachcontent, der Regulatoren, Fachkräfte und Investoren anspricht — YMYL-konform und wissenschaftlich präzise.", featured: false },
  { title: "Raumfahrt & Forschung", desc: "Das ESOC (European Space Operations Centre) und die GSI bringen Spitzenforscher nach Darmstadt. Forschungseinrichtungen und Spin-offs profitieren von SEO, der wissenschaftliche Autorität aufbaut.", featured: false },
  { title: "Unternehmensberatung", desc: "Darmstadts Nähe zu Frankfurt und die TU-Alumni-Netzwerke ziehen Beratungsfirmen an. Thought-Leadership-Content ist der effektivste SEO-Hebel in diesem Segment.", featured: false },
  { title: "E-Commerce & Handel", desc: "Wachsende Kaufkraft durch gut bezahlte Tech-Jobs treibt den lokalen E-Commerce. Wir entwickeln SEO-Strategien für den Darmstädter Online-Handel.", featured: false },
  { title: "Bildung & EdTech", desc: "Mit TU Darmstadt, Hochschule Darmstadt und mehreren Fachschulen ist Bildung ein Kernmarkt. EdTech-Startups finden hier ihre Pilotnutzer und ihren Markt.", featured: false },
];

const process = [
  { step: "01", title: "SEO-Audit & Analyse", desc: "Vollständige technische Analyse Ihrer Website, Keyword-Recherche für den Darmstädter Tech-Markt und Wettbewerberanalyse. In 2 Wochen wissen Sie genau, wo Sie stehen." },
  { step: "02", title: "Tech-Content-Strategie", desc: "Content für technische Entscheider, Forscher und Investoren — kein Marketing-Sprech, sondern präzise Inhalte, die Autorität in Ihrer Nische aufbauen und die richtigen Zielgruppen ansprechen." },
  { step: "03", title: "Umsetzung & Optimierung", desc: "Technisches SEO, On-Page-Optimierung und Spin-off-spezifischer Content — alles in enger Abstimmung. Besonders für TU-nahe Startups und forschungsintensive Unternehmen ein entscheidender Schritt." },
  { step: "04", title: "Monitoring & Reporting", desc: "Monatliches Reporting mit klaren KPIs: Rankings, Traffic, Conversions. Transparent, verständlich — ohne Agentur-Blabla. Wir sprechen die Sprache der Wissenschaftsstadt." },
];

const faqs = [
  { q: "Was macht Darmstadt als SEO-Standort besonders?", a: "Darmstadt vereint außergewöhnliche Faktoren: TU Darmstadt als führende Forschungsuniversität, das ESOC als Europäisches Raumfahrtzentrum, Merck KGaA als weltältestes Pharma-Chemieunternehmen und über 160.000 Einwohner mit Nähe zum Rhein-Main-Gebiet. Dieser wissensintensive Markt schafft intensiven Wettbewerb um Fachkräfte, Kunden und digitale Sichtbarkeit." },
  { q: "Wie hilft SeoForge TU-Darmstadt-Spin-offs?", a: "TU-Spin-offs haben oft herausragende Technologien, aber keine digitale Sichtbarkeit. Wir entwickeln Product-led SEO mit technisch präzisem Content, der Nischen-Autorität aufbaut und Investoren, Partner und erste Kunden anspricht. Der Fokus liegt auf Long-Tail-Keywords mit hoher Conversion-Wahrscheinlichkeit." },
  { q: "Wie lange dauert SEO in Darmstadt?", a: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive Tech-Keywords entwickeln sich in der Regel in 3–6 Monaten. Darmstadts wissensintensiver Markt belohnt tiefe Nischen-Expertise schneller als breite Keyword-Targeting-Strategien." },
  { q: "Betreut SeoForge auch Unternehmen in der Rhein-Main-Region?", a: "Ja. Darmstadts Nähe zu Frankfurt macht viele Darmstädter Unternehmen de facto zu Rhein-Main-Playern. Wir entwickeln regionale SEO-Strategien, die sowohl Darmstadts Wissenschaftsstadt-Image als auch die Rhein-Main-Metropolregion strategisch erschließen." },
  { q: "Was unterscheidet SeoForge von anderen Agenturen in Darmstadt?", a: "Wir arbeiten ohne Vertragszwang und erstellen Berichte, die Sie wirklich verstehen. Entscheidend: Wir kennen das Darmstädter Tech-Ökosystem — TU-Spin-off-Kultur, Life-Sciences-Markt, die spezifischen B2B-Zielgruppen. Keine Standardpakete, sondern Strategien für Ihren konkreten Wissenschaftsmarkt." },
];

/* ── main component ── */
export default function DarmstadtClient({ articleHtml }: { articleHtml: string }) {
  return (
    <main className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative bg-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:block pointer-events-none">
          <Image
            src="/images/cities/darmstadt-hero.jpg"
            alt="SEO Agentur Darmstadt – Blick auf die Wissenschaftsstadt Darmstadt"
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
              <Link href="/" className="hover:text-muted transition-colors">SeoForge</Link>
              <span>/</span>
              <Link href="/standorte" className="hover:text-muted transition-colors">Standorte</Link>
              <span>/</span>
              <span className="text-muted/80">Darmstadt</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-6">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Darmstadt · Wissenschaftsstadt Hessen
            </div>

            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-4">/ SEO AGENTUR DARMSTADT</p>

            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.04] mb-6">
              SEO Agentur<br /><span className="gradient-text">Darmstadt</span>
            </h1>

            <div className="mb-8 space-y-4 max-w-xl">
              <p className="text-base text-muted leading-relaxed">
                Darmstadt trägt den Titel Wissenschaftsstadt zu Recht: Die TU Darmstadt mit über
                26.000 Studierenden zählt zu Deutschlands forschungsstärksten Technischen Universitäten.
                Merck KGaA, das weltälteste Pharma- und Chemieunternehmen mit über 60.000 Mitarbeitern
                weltweit, hat hier seinen Stammsitz. Das ESOC — European Space Operations Centre —
                macht Darmstadt zur Raumfahrthauptstadt Europas. Diese Konzentration aus Life Sciences,
                Deep-Tech und Raumfahrtforschung erzeugt eine B2B-Suchnachfrage, die präzise, fachlich
                fundierte Inhalte erfordert — generischer SEO-Content scheitert hier am Bildungsgrad
                der Zielgruppe.
              </p>
              <p className="text-base text-muted leading-relaxed">
                SeoForge setzt auf wissenschaftliche Glaubwürdigkeit als SEO-Hebel. Für TU-Spin-offs
                entwickeln wir Product-led Content mit technischer Tiefe; für Pharma- und Life-Sciences-
                Unternehmen bauen wir E-E-A-T-Autorität auf, die Regulatoren, Investoren und Fachkräfte
                gleichermaßen anspricht. Unsere Long-tail-Strategie erschließt spezifische B2B-Suchräume
                im Merck-Umfeld und im ESOC-Ökosystem.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="#kontakt" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
                Kostenlose SEO-Analyse
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <Link href="/seo-agentur" className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite">
                Unsere Leistungen
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted/70">
              {["< 24h Reaktionszeit", "Kein Vertrag", "KI-gestützt", "Vollständig transparent"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />{item}
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
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">/ Der Darmstädter Markt</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-5">
                Darmstadt: Wo Wissenschaft auf digitalen Wettbewerb trifft
              </h2>
              <p className="text-base text-muted leading-relaxed mb-4">
                Die Technische Universität Darmstadt mit über 26.000 Studierenden und die
                Hochschule Darmstadt produzieren jährlich Spitzentalente in Informatik,
                Elektrotechnik und Materialwissenschaften. Viele bleiben — und gründen. Das
                Startup-Ökosystem rund um den Merck Innovation Hub und TU-Inkubatoren
                wächst kontinuierlich.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Merck KGaA, das weltälteste Pharma-Chemieunternehmen mit über 60.000 Mitarbeitern
                weltweit, und das ESOC (European Space Operations Centre) als Europäisches
                Raumfahrtzentrum verleihen Darmstadt internationale Strahlkraft. Die regionale
                Wirtschaftsleistung liegt bei rund 24 Milliarden Euro. Software AG, heute Teil
                von OpenText, hat hier die Unternehmens-Software-DNA der Stadt geprägt.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Diese Wissensdichte schafft ein SEO-Paradox: technisch brillante
                Unternehmen sind digital oft unsichtbar. Wir ändern das — mit
                Strategien, die im anspruchsvollsten Wissenschaftsmarkt Hessens wirken.
              </p>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image src="/images/cities/darmstadt-city.jpg" alt="Darmstadt Wissenschaftsstadt – TU-Campus und Stadtbild" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm font-semibold">Darmstadt</p>
                  <p className="text-white/60 text-xs">160.000 Einwohner · Wissenschaftsstadt Hessens</p>
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
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">SEO für jede Branche in Darmstadt</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <div className="reveal" key={ind.title} style={{ animationDelay: `${i * 70}ms` }}>
                <div className={`rounded-xl border p-6 h-full ${ind.featured ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border bg-white"}`}>
                  {ind.featured && (
                    <span className="inline-flex items-center gap-1.5 mb-3 text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />Schwerpunkt
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

      {/* ═══ PROCESS ═══ */}
      <section className="bg-offwhite border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-14">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unser Prozess</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">So bringen wir Sie auf Seite&nbsp;1</h2>
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
                <Image src="/images/cities/karlsruhe-tech.jpg" alt="SeoForge Team – SEO Agentur Darmstadt" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
            <div className="reveal" style={{ animationDelay: "150ms" }}>
              <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Unsere Methode</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl mb-4">
                Technologie trifft <span className="gradient-text">Sichtbarkeit</span>
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Darmstadts Stärke liegt im Wissen — unsere Strategie macht dieses
                Wissen sichtbar. Product-led SEO für Spin-offs, wissenschaftlicher
                Content für Life Sciences, technisch präzise Texte für das
                ESOC-Umfeld und den Merck-Markt.
              </p>
              <ul className="space-y-3">
                {[
                  "TU-Content mit wissenschaftlicher Autorität für Forschungs-Spin-offs",
                  "Life-Sciences-SEO für das Merck-Umfeld und Pharma-Startups",
                  "ESOC-Kontext und Raumfahrtindustrie als Content-Hebel",
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
          <div className="reveal"><p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ SEO Wissen</p></div>
          <div className="reveal" style={{ animationDelay: "80ms" }}><div className="seo-content" dangerouslySetInnerHTML={{ __html: articleHtml }} /></div>
        </div>
      </section>

      {/* ═══ WHY SEOFORGE ═══ */}
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
          <div className="reveal text-center mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">/ Warum SeoForge</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-dark sm:text-4xl">Ihr Vorteil mit SeoForge Darmstadt</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Tech-Content-Expertise", desc: "Präziser Content für Forscher, Entwickler, IT-Entscheider — keine Marketing-Floskeln. Wir schreiben, was Entscheider in der Wissenschaftsstadt wirklich lesen." },
              { title: "Startup-Netzwerk", desc: "Wir kennen das TU-Darmstadt-Ökosystem und die Spin-off-Kultur. Von der Gründung bis zur Series-A — wir entwickeln SEO, das mit Ihrem Wachstum skaliert." },
              { title: "Wissenschaftliche Autorität", desc: "E-E-A-T Strategien für forschungsnahe Unternehmen: Merck-Umfeld, ESOC-Spin-offs, Life-Sciences-Startups. Autorität, die Google und Ihre Zielgruppe überzeugt." },
              { title: "Keine Verträge", desc: "Monatliche Zusammenarbeit ohne Mindestlaufzeit. Unsere Leistung überzeugt — nicht der Vertrag. Transparente Berichte inklusive." },
            ].map((b, i) => (
              <div className="reveal" key={b.title} style={{ animationDelay: `${i * 70}ms` }}>
                <div className="rounded-xl border border-border bg-white p-6 h-full">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><div className="h-3 w-3 rounded-full bg-primary" /></div>
                  <h3 className="font-semibold text-dark mb-2">{b.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StandortFaq items={faqs} defaultOpen={0} />

      <div id="kontakt"><CityContactForm city="Darmstadt" /></div>

      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/standorte" className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite">← Alle Standorte</Link>
            <Link href="/seo-agentur" className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-dark transition-colors hover:bg-offwhite">Unsere Leistungen</Link>
          </div>
        </div>
      </section>

    </main>
  );
}

