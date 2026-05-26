import type { Metadata } from "next";
import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";
import { getArticleBySlug, articles } from "./data/articles";

export const metadata: Metadata = {
  title: "SEO Wissen | SeoForge — Kostenlose Guides & Ratgeber",
  description:
    "Kostenlose SEO-Guides, Fachartikel und Praxis-Ratgeber von Experten. Alles über SEO, On-Page, Technisches SEO, GEO und Local SEO.",
};

const clusters = {
  seo: {
    key: "seo",
    label: "SEO",
    color: "bg-primary/10 text-primary border-primary/20",
    dotColor: "bg-primary",
    leistungHref: "/seo",
    description:
      "SEO-Grundlagen, Kosten, Strategie und Entscheidungshilfen für Unternehmen.",
    articles: [
      {
        title: "Was ist SEO? Der komplette Guide",
        excerpt:
          "Suchmaschinenoptimierung verständlich erklärt — von der Funktionsweise bis zur Strategie.",
        readTime: "10 Min.",
        slug: "was-ist-seo",
      },
      {
        title: "SEO Kosten: Was kostet professionelle Optimierung?",
        excerpt:
          "Preise, Budgetrahmen und worauf Sie bei der Auswahl einer SEO-Agentur achten sollten.",
        readTime: "8 Min.",
        slug: "seo-kosten",
      },
      {
        title: "SEO Agentur vs. Freelancer: Was ist das Richtige?",
        excerpt:
          "Ein ehrlicher Vergleich — wann welche Option sinnvoll ist.",
        readTime: "7 Min.",
        slug: "seo-agentur-vs-freelancer",
      },
    ],
  },
  "on-page": {
    key: "on-page",
    label: "On-Page SEO",
    color: "bg-secondary/10 text-secondary border-secondary/20",
    dotColor: "bg-secondary",
    leistungHref: "/seo/on-page-optimierung",
    description:
      "Title Tags, Meta Descriptions, Struktur und Content — alles was direkt auf der Seite passiert.",
    articles: [
      {
        title: "Title Tags richtig optimieren",
        excerpt:
          "Wie der wichtigste On-Page-Faktor funktioniert und wie Sie ihn korrekt einsetzen.",
        readTime: "7 Min.",
        slug: "title-tags-optimieren",
      },
      {
        title: "Meta Descriptions: Best Practices 2026",
        excerpt: "Was Meta Descriptions leisten können — und was nicht.",
        readTime: "5 Min.",
        slug: "meta-descriptions",
      },
      {
        title: "Interne Verlinkung: Strategie und Umsetzung",
        excerpt:
          "Wie interne Links PageRank verteilen und die Crawlbarkeit verbessern.",
        readTime: "9 Min.",
        slug: "interne-verlinkung",
      },
    ],
  },
  "technical-seo": {
    key: "technical-seo",
    label: "Technisches SEO",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dotColor: "bg-blue-500",
    leistungHref: "/seo/audit",
    description:
      "Core Web Vitals, Crawling, strukturierte Daten und alles was im Hintergrund über Rankings entscheidet.",
    articles: [
      {
        title: "Core Web Vitals: LCP, INP und CLS optimieren",
        excerpt: "Googles Performance-Metriken verstehen und verbessern.",
        readTime: "12 Min.",
        slug: "core-web-vitals",
      },
      {
        title: "Crawling & Indexierung: Wie Google Ihre Seite liest",
        excerpt:
          "robots.txt, Sitemaps und Crawl-Budget richtig konfigurieren.",
        readTime: "10 Min.",
        slug: "crawling-indexierung",
      },
      {
        title: "Schema Markup: Strukturierte Daten implementieren",
        excerpt:
          "JSON-LD, Rich Snippets und wie strukturierte Daten Rankings beeinflussen.",
        readTime: "13 Min.",
        slug: "schema-markup",
      },
    ],
  },
  geo: {
    key: "geo",
    label: "GEO & KI-Suche",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    dotColor: "bg-violet-500",
    leistungHref: "/geo",
    description:
      "Generative Engine Optimization — Sichtbarkeit in ChatGPT, Perplexity und Google AI Overviews.",
    articles: [
      {
        title: "Was ist GEO? Generative Engine Optimization erklärt",
        excerpt:
          "Der nächste Schritt nach klassischem SEO — was GEO bedeutet und warum es jetzt relevant wird.",
        readTime: "8 Min.",
        slug: "was-ist-geo",
      },
      {
        title: "Google AI Overviews: Was Unternehmen jetzt wissen müssen",
        excerpt:
          "Wie AI Overviews funktionieren und wie Sie darin erscheinen.",
        readTime: "9 Min.",
        slug: "google-ai-overviews",
      },
      {
        title: "E-E-A-T: Expertise, Erfahrung, Autorität, Vertrauen",
        excerpt:
          "Wie Google und KI-Systeme Vertrauen bewerten — und wie Sie Signale stärken.",
        readTime: "10 Min.",
        slug: "e-e-a-t",
      },
    ],
  },
  "local-seo": {
    key: "local-seo",
    label: "Local SEO",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-500",
    leistungHref: "/seo",
    description:
      "Google Business Profile, lokale Rankings und regionale Sichtbarkeit für Unternehmen vor Ort.",
    articles: [
      {
        title: "Google Business Profile optimieren: Der komplette Guide",
        excerpt:
          "Schritt für Schritt zum optimalen GBP — von der Einrichtung bis zu Posts.",
        readTime: "14 Min.",
        slug: "google-business-profile",
      },
      {
        title: "Lokale Rankingfaktoren: Was wirklich zählt",
        excerpt:
          "Proximity, Relevanz, Autorität — wie Google lokale Ergebnisse bewertet.",
        readTime: "9 Min.",
        slug: "lokale-rankingfaktoren",
      },
      {
        title: "NAP-Konsistenz: Citations richtig aufbauen",
        excerpt:
          "Name, Adresse, Telefon konsistent halten — welche Verzeichnisse wirklich zählen.",
        readTime: "7 Min.",
        slug: "nap-citations",
      },
    ],
  },
};

const clusterOrder = ["seo", "on-page", "technical-seo", "geo", "local-seo"] as const;

const formatTabs = [
  { label: "Alle Formate", href: "/wissen" },
  { label: "Ratgeber", href: "/wissen/ratgeber" },
  { label: "Glossar", href: "/wissen/glossar" },
  { label: "Case Study", href: "/wissen/case-study" },
  { label: "News", href: "/wissen/news" },
];

export default function WissenPage() {
  const totalArticles = articles.length;

  return (
    <SubpageLayout>
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-offwhite border-b border-border py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Kostenlose SEO-Ratgeber
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl text-dark font-[family-name:var(--font-heading)] leading-[1.05] tracking-tight">
                SEO{" "}
                <span className="text-primary">Wissen</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted max-w-xl">
                Praxisnahe Guides und Fachartikel von SEO-Experten — kostenlos,
                verständlich und direkt umsetzbar. Für Unternehmen, die
                verstehen wollen, was hinter Rankings steckt.
              </p>
              {/* Category pills */}
              <div className="mt-10 flex flex-wrap gap-2.5">
                {clusterOrder.map((key) => {
                  const cluster = clusters[key];
                  return (
                    <a
                      key={key}
                      href={`#${key}`}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all hover:shadow-sm hover:-translate-y-0.5 ${cluster.color}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${cluster.dotColor}`} />
                      {cluster.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-b border-border bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-border">
              {[
                { value: "5", label: "Themenbereiche" },
                { value: "4", label: "Content-Formate" },
                { value: String(totalArticles), label: "Artikel" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 py-5 sm:px-10 first:pl-0 last:pr-0"
                >
                  <span className="text-2xl font-bold text-dark font-[family-name:var(--font-heading)]">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Format Tabs */}
        <div className="border-b border-border bg-white py-5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted mr-1">
                Format:
              </span>
              {formatTabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="inline-flex items-center rounded-full border border-border bg-offwhite px-4 py-1.5 text-sm font-medium text-dark hover:border-primary/30 hover:text-primary transition-all"
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* GEO Spotlight */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl bg-dark text-white overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left */}
                <div className="p-10 lg:p-14 flex flex-col justify-center">
                  <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-violet-500/20 border border-violet-400/30 px-3.5 py-1.5 text-sm font-medium text-violet-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    Neu: GEO & KI-Suche
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] leading-tight mb-4">
                    Was ist GEO?{" "}
                    <span className="text-violet-400">Generative Engine Optimization</span>{" "}
                    erklärt
                  </h2>
                  <p className="text-white/60 leading-relaxed mb-8 max-w-md">
                    Der nächste Schritt nach klassischem SEO — was GEO bedeutet,
                    warum ChatGPT, Perplexity und Google AI Overviews jetzt
                    relevant werden und wie Sie als Antwort erscheinen.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/wissen/geo"
                      className="inline-flex items-center gap-2 rounded-full bg-violet-500 hover:bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all"
                    >
                      GEO-Ratgeber lesen
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <Link
                      href="/geo"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:border-white/40 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white transition-all"
                    >
                      GEO-Leistungen ansehen
                    </Link>
                  </div>
                </div>
                {/* Right — decorative */}
                <div className="relative hidden lg:flex items-center justify-center p-14 overflow-hidden">
                  {/* Background grid */}
                  <div className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  {/* Central visual */}
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    {/* AI platforms */}
                    <div className="flex gap-4 mb-2">
                      {[
                        { name: "ChatGPT", bg: "bg-emerald-500/20 border-emerald-400/30 text-emerald-300" },
                        { name: "Perplexity", bg: "bg-violet-500/20 border-violet-400/30 text-violet-300" },
                        { name: "Google AI", bg: "bg-blue-500/20 border-blue-400/30 text-blue-300" },
                      ].map((p) => (
                        <div
                          key={p.name}
                          className={`rounded-xl border px-4 py-2.5 text-xs font-semibold ${p.bg}`}
                        >
                          {p.name}
                        </div>
                      ))}
                    </div>
                    {/* Central card */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 w-64 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-8 rounded-full bg-violet-500/30 flex items-center justify-center">
                          <svg className="h-4 w-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-white/70">KI-Antwort gefunden</span>
                      </div>
                      <p className="text-xs leading-relaxed text-white/50">
                        &quot;Laut SeoForge ist GEO die Optimierung für generative KI-Suchantworten...&quot;
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-violet-500/40" />
                        <span className="text-[10px] text-violet-400 font-medium">Quelle: seoforge.de</span>
                      </div>
                    </div>
                    <div className="text-xs text-white/30 text-center">Sichtbarkeit in der KI-Suche</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cluster sections */}
        {clusterOrder.map((key) => {
          const cluster = clusters[key];
          return (
            <section
              key={key}
              id={key}
              className="py-14 lg:py-20 border-t border-border"
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                  <div className="max-w-xl">
                    <div
                      className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium ${cluster.color}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${cluster.dotColor}`} />
                      {cluster.label}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-heading)] text-dark font-bold leading-snug">
                      {cluster.description}
                    </h2>
                  </div>
                  <Link
                    href={`/wissen/${key}`}
                    className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    Alle Artikel ansehen
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>

                {/* Article cards */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cluster.articles.map((article) => {
                    const registryArticle = getArticleBySlug(article.slug);
                    const articleHref = registryArticle
                      ? `/wissen/${registryArticle.type}/${registryArticle.slug}`
                      : `/wissen/${key}`;
                    const isPublished = registryArticle?.published ?? false;

                    return (
                      <Link
                        key={article.slug}
                        href={articleHref}
                        className="group flex flex-col rounded-2xl border border-border bg-white hover-lift hover:border-primary/30 transition-colors overflow-hidden"
                      >
                        <div className="flex-1 p-6">
                          <div className="mb-4 flex items-center justify-between">
                            <span
                              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${cluster.color}`}
                            >
                              {cluster.label}
                            </span>
                            {!isPublished && (
                              <span className="text-xs font-medium text-muted bg-border/60 px-2.5 py-1 rounded-full">
                                Bald verfügbar
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-bold text-dark mb-2.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted line-clamp-2">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-border bg-offwhite/50 px-6 py-3.5">
                          <div className="flex items-center gap-1.5 text-xs text-muted">
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {article.readTime}
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                            {isPublished ? "Artikel lesen" : "Zum Thema"}
                            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="bg-offwhite border-t border-border py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-dark font-bold leading-snug mb-4">
                Bereit für mehr{" "}
                <span className="text-primary">Sichtbarkeit?</span>
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Wissen ist der erste Schritt — Umsetzung der zweite. Jetzt
                kostenlos beraten lassen und herausfinden, was Ihre Website
                nach vorne bringt.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-dark px-8 py-4 text-sm font-semibold text-white transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Jetzt kostenlos beraten lassen
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
