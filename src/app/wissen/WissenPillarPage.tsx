import Link from "next/link";
import SubpageLayout from "../components/SubpageLayout";
import { articles as publishedArticles } from "./data/articles";

export interface PillarArticle {
  title: string;
  excerpt: string;
  readTime: string;
  slug: string;
}

export interface PillarCluster {
  key: string;
  label: string;
  h1: string;
  color: string;
  dotColor: string;
  leistungHref: string;
  description: string;
  topics: string[];
  articles: PillarArticle[];
}

export default function WissenPillarPage({ cluster }: { cluster: PillarCluster }) {
  const liveBySlug = new Map(
    publishedArticles.filter((article) => article.published).map((article) => [article.slug, article])
  );
  const liveCount = cluster.articles.filter((article) => liveBySlug.has(article.slug)).length;

  return (
    <SubpageLayout>
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-offwhite border-b border-border py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted">
              <Link
                href="/wissen"
                className="hover:text-primary transition-colors"
              >
                Wissen
              </Link>
              <svg className="h-3.5 w-3.5 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-dark font-medium">{cluster.label}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium ${cluster.color}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${cluster.dotColor}`} />
                  {cluster.label}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] text-dark font-[family-name:var(--font-heading)] leading-[1.1] tracking-tight mb-5">
                  {cluster.h1}
                </h1>
                <p className="text-lg leading-relaxed text-muted max-w-lg">
                  {cluster.description}
                </p>
              </div>
              {/* Decorative stat card */}
              <div className="hidden lg:flex justify-end">
                <div className="rounded-2xl border border-border bg-white shadow-sm p-8 w-72">
                  <div className="text-4xl font-bold font-[family-name:var(--font-heading)] text-dark mb-1">
                    {liveCount}
                  </div>
                  <div className="text-sm text-muted mb-6">
                    veröffentlichte Guides
                  </div>
                  <div className="space-y-2">
                    {cluster.articles.slice(0, 3).map((a) => (
                      <div
                        key={a.slug}
                        className="flex items-center gap-2.5 text-xs text-muted"
                      >
                        <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${cluster.dotColor}`} />
                        <span className="line-clamp-1">{a.title}</span>
                      </div>
                    ))}
                    {cluster.articles.length > 3 && (
                      <div className="text-xs text-muted pl-4">
                        + {cluster.articles.length - 3} weitere
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topics covered */}
        <section className="border-b border-border bg-white py-6">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted mr-1">
                Themen:
              </span>
              {cluster.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-border bg-offwhite px-3.5 py-1.5 text-xs font-medium text-dark"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Article grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-heading)] text-dark font-bold mb-2">
                Alle Guides im Themenbereich
              </h2>
              <p className="text-muted text-sm">
                Veröffentlichte Guides sind direkt verlinkt. Geplante Themen bleiben transparent als Vorschau sichtbar.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {cluster.articles.map((article, index) => {
                const liveArticle = liveBySlug.get(article.slug);
                const href = liveArticle ? `/wissen/${liveArticle.type}/${liveArticle.slug}` : null;
                const card = (
                <article className={`group relative flex h-full flex-col rounded-2xl border border-border bg-white transition-colors overflow-hidden ${href ? "hover-lift hover:border-primary/30" : "opacity-75"}`}>
                  <div className="flex-1 p-8">
                    {/* Number + badge row */}
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-4xl font-bold font-[family-name:var(--font-heading)] text-border select-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${href ? "bg-emerald-50 text-emerald-700" : "bg-border/60 text-muted"}`}>
                        {href ? "Veröffentlicht" : "In Planung"}
                      </span>
                    </div>
                    {/* Category badge */}
                    <div className="mb-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${cluster.color}`}
                      >
                        {cluster.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-3 leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border bg-offwhite/50 px-8 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {article.readTime} Lesezeit
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${href ? "text-primary" : "text-muted"}`}>
                      {href ? "Guide lesen" : "Vorschau"}
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </article>
                );

                return href ? (
                  <Link key={article.slug} href={href} className="block h-full" aria-label={`${article.title} lesen`}>
                    {card}
                  </Link>
                ) : (
                  <div key={article.slug}>{card}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA box */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl bg-dark text-white p-10 lg:p-14">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3.5 py-1.5 text-xs font-medium text-white/70">
                    Professionelle Betreuung
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] leading-tight mb-4">
                    Professionelle {cluster.label}-Betreuung statt selbst lesen?
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    Wissen ist gut — Umsetzung ist besser. Wir übernehmen die
                    komplette Optimierung für Sie, transparent und messbar.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:justify-end">
                  <Link
                    href={cluster.leistungHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-dark px-7 py-3.5 text-sm font-semibold text-white transition-all"
                  >
                    Leistungen ansehen
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:border-white/40 px-7 py-3.5 text-sm font-semibold text-white/80 hover:text-white transition-all"
                  >
                    Kostenloses Erstgespräch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="border-t border-border bg-offwhite py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href="/wissen"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l3.158 2.96a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              Zurück zur Wissensübersicht
            </Link>
          </div>
        </div>
      </main>
    </SubpageLayout>
  );
}
