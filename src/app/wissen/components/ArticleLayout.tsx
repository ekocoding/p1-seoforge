import type { Article, ArticleType, ArticleThema } from '../data/types'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import SubpageLayout from '../../components/SubpageLayout'
import { getRelatedArticles } from '../data/articles'

interface ArticleLayoutProps {
  article: Article
  children?: React.ReactNode
}

// Label helpers
export function getTypeLabel(type: ArticleType): string {
  const labels: Record<ArticleType, string> = {
    ratgeber: 'Ratgeber',
    glossar: 'Glossar',
    'case-study': 'Case Study',
    news: 'News',
  }
  return labels[type]
}

export function getTypeBadgeClass(type: ArticleType): string {
  const classes: Record<ArticleType, string> = {
    ratgeber: 'bg-primary/10 text-primary border-primary/20',
    glossar: 'bg-secondary/10 text-secondary border-secondary/20',
    'case-study': 'bg-blue-50 text-blue-700 border-blue-200',
    news: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  }
  return classes[type]
}

export function getThemaLabel(thema: ArticleThema): string {
  const labels: Record<ArticleThema, string> = {
    seo: 'SEO Grundlagen',
    geo: 'GEO & KI-Suche',
    'on-page': 'On-Page SEO',
    'technical-seo': 'Technisches SEO',
    'local-seo': 'Local SEO',
    webdesign: 'Webdesign',
  }
  return labels[thema]
}

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', shy: '',
  mdash: '—', ndash: '–', hellip: '…', laquo: '«', raquo: '»',
  bdquo: '„', ldquo: '“', rdquo: '”', sbquo: '‚', lsquo: '‘', rsquo: '’',
  auml: 'ä', ouml: 'ö', uuml: 'ü', Auml: 'Ä', Ouml: 'Ö', Uuml: 'Ü', szlig: 'ß',
  eacute: 'é', egrave: 'è', agrave: 'à', ccedil: 'ç', euro: '€',
}

// Server-seitiges Decoding (kein DOM): named + numerische Entities → echte Zeichen.
function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => (name in NAMED_ENTITIES ? NAMED_ENTITIES[name] : m))
}

function extractToc(html: string): TocItem[] {
  const regex = /<h([23])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>/gi
  const items: TocItem[] = []
  let match
  while ((match = regex.exec(html)) !== null) {
    items.push({
      level: parseInt(match[1]) as 2 | 3,
      id: match[2],
      text: decodeEntities(match[3].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
    })
  }
  return items
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function ArticleLayout({ article, children }: ArticleLayoutProps) {
  const relatedArticles = getRelatedArticles(article.slug)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.publishDate,
    dateModified: article.lastUpdated,
    author: {
      '@type': 'Person',
      name: 'Joel Heuchert',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SeoForge',
      url: 'https://seoforge.de',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Wissen',
        item: 'https://seoforge.de/wissen',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: getTypeLabel(article.type),
        item: `https://seoforge.de/wissen/${article.type}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: getThemaLabel(article.thema),
        item: `https://seoforge.de/wissen/${article.thema}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.title,
        item: `https://seoforge.de/wissen/${article.type}/${article.slug}`,
      },
    ],
  }

  const faqJsonLd = article.faq && article.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  return (
    <SubpageLayout>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <Script
          id="faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <main className="bg-white">
        {/* A) Breadcrumb Bar */}
        <div className="bg-offwhite border-b border-border py-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted flex-wrap">
              <Link href="/wissen" className="hover:text-primary transition-colors">
                Wissen
              </Link>
              <svg className="h-3.5 w-3.5 text-border shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/wissen/${article.type}`} className="hover:text-primary transition-colors">
                {getTypeLabel(article.type)}
              </Link>
              <svg className="h-3.5 w-3.5 text-border shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/wissen/${article.thema}`} className="hover:text-primary transition-colors">
                {getThemaLabel(article.thema)}
              </Link>
              <svg className="h-3.5 w-3.5 text-border shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-dark font-medium line-clamp-1">{article.title}</span>
            </nav>
          </div>
        </div>

        {/* B) Article Header — kein schwerer Hero: H1 → Banner */}
        <section className="bg-white pt-10 lg:pt-14 pb-8 lg:pb-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Badges */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getTypeBadgeClass(article.type)}`}>
                  {getTypeLabel(article.type)}
                </span>
                <span className="inline-flex items-center rounded-full border border-border bg-offwhite px-3 py-1 text-xs font-medium text-muted">
                  {getThemaLabel(article.thema)}
                </span>
                {!article.published && (
                  <span className="inline-flex items-center rounded-full border border-border bg-offwhite px-3 py-1 text-xs font-medium text-muted">
                    Demnächst verfügbar
                  </span>
                )}
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl text-dark font-[family-name:var(--font-heading)] leading-[1.1] tracking-tight mb-5">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg leading-relaxed text-muted mb-6 max-w-2xl">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readTime} Lesezeit
                </span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>Veröffentlicht: {formatDate(article.publishDate)}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>Aktualisiert: {formatDate(article.lastUpdated)}</span>
              </div>
            </div>

            {/* Banner */}
            {article.banner && (
              <div className="relative mt-8 lg:mt-10 w-full h-[170px] sm:h-[240px] lg:h-[320px] overflow-hidden rounded-2xl border border-border bg-offwhite">
                <Image
                  src={article.banner}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1216px"
                  className="object-cover object-center"
                />
              </div>
            )}
          </div>
        </section>

        {/* C) Content or "Coming Soon" */}
        <section className="pt-10 lg:pt-12 pb-16 lg:pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {article.published && (children || article.content) ? (
              /* Two-column layout for published articles */
              <div className="grid lg:grid-cols-[65fr_35fr] gap-12 items-start">
                {/* Left: prose content — großzügige vertikale Rhythmik (Heading-Abstand oben ~2-3x Absatz, unten kleiner) */}
                <div className="prose prose-lg max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-headings:text-dark prose-headings:scroll-mt-28 prose-h2:mt-16 prose-h2:mb-6 prose-h3:mt-11 prose-h3:mb-4 prose-p:leading-[1.8] prose-li:leading-[1.75] prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                  {children ? children : (
                    <div
                      dangerouslySetInnerHTML={{ __html: article.content! }}
                    />
                  )}
                </div>

                {/* Right: sticky sidebar */}
                <div className="lg:sticky lg:top-28 space-y-6">
                  {/* TOC */}
                  {article.content && (() => {
                    const toc = extractToc(article.content)
                    return toc.length > 0 ? (
                      <nav className="rounded-2xl border border-border bg-offwhite p-5" aria-label="Inhaltsverzeichnis">
                        <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted">
                          <svg className="h-3.5 w-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h7" />
                          </svg>
                          Inhalt
                        </p>
                        <ul className="space-y-0.5 border-l border-border">
                          {toc.map(item => (
                            <li key={item.id}>
                              <a
                                href={`#${item.id}`}
                                className={`group relative -ml-px flex border-l-2 border-transparent transition-colors hover:border-primary ${
                                  item.level === 3
                                    ? 'py-1 pl-6 pr-2 text-[13px] text-muted hover:text-primary'
                                    : 'py-1.5 pl-4 pr-2 text-sm font-medium text-dark/75 hover:text-primary'
                                }`}
                              >
                                <span className="line-clamp-2">{item.text}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    ) : null
                  })()}
                </div>
              </div>
            ) : (
              /* "Coming Soon" state */
              <div className="flex flex-col items-center justify-center py-20 text-center max-w-lg mx-auto">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-offwhite border border-border">
                  <svg className="h-10 w-10 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark mb-3">
                  Dieser Artikel erscheint demnächst.
                </h2>
                <p className="text-muted leading-relaxed mb-8">
                  {article.excerpt}
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-dark px-7 py-3.5 text-sm font-semibold text-white transition-all shadow-lg shadow-primary/20"
                >
                  Jetzt beraten lassen
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* E) End CTA */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl bg-dark text-white p-10 lg:p-14 text-center">
              <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] leading-tight mb-4">
                Bereit für mehr{' '}
                <span className="text-primary">Rankings?</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 max-w-md mx-auto">
                Wissen ist der erste Schritt — professionelle Umsetzung der zweite.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-dark px-7 py-3.5 text-sm font-semibold text-white transition-all"
                >
                  Kostenloses Erstgespräch
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="/leistungen"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:border-white/40 px-7 py-3.5 text-sm font-semibold text-white/80 hover:text-white transition-all"
                >
                  Alle Leistungen
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* F) Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12 lg:py-16 border-t border-border">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark mb-8">
                Verwandte Artikel
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.slice(0, 3).map((related) => (
                  <Link
                    key={related.slug}
                    href={`/wissen/${related.type}/${related.slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-white hover:border-primary/30 hover:-translate-y-0.5 transition-all overflow-hidden"
                  >
                    <div className="flex-1 p-6">
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getTypeBadgeClass(related.type)}`}>
                          {getTypeLabel(related.type)}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-border bg-offwhite px-3 py-1 text-xs font-medium text-muted">
                          {getThemaLabel(related.thema)}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-dark mb-2.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted line-clamp-3">
                        {related.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-border bg-offwhite/50 px-6 py-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {related.readTime}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        Artikel lesen
                        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* G) Back Link */}
        <div className="border-t border-border bg-offwhite py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href={`/wissen/${article.thema}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l3.158 2.96a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              Zurück zu {getThemaLabel(article.thema)}
            </Link>
          </div>
        </div>
      </main>
    </SubpageLayout>
  )
}
