import type { Metadata } from 'next'
import Link from 'next/link'
import SubpageLayout from '../../components/SubpageLayout'
import ArticleCard from '../components/ArticleCard'
import { getArticlesByType } from '../data/articles'

export const metadata: Metadata = {
  alternates: { canonical: "https://seoforge.de/wissen/ratgeber" },
  title: 'SEO Ratgeber & Guides | SeoForge Wissen',
  description: 'Praxisnahe SEO-Ratgeber und Schritt-für-Schritt-Guides von Experten.',
}

const themaFilters = [
  { label: 'Alle', href: '/wissen/ratgeber' },
  { label: 'SEO Grundlagen', href: '/wissen/seo' },
  { label: 'GEO & KI-Suche', href: '/wissen/geo' },
  { label: 'On-Page SEO', href: '/wissen/on-page' },
  { label: 'Technisches SEO', href: '/wissen/technical-seo' },
  { label: 'Local SEO', href: '/wissen/local-seo' },
  { label: 'Webdesign', href: '/wissen/webdesign' },
]

export default function RatgeberListPage() {
  const articles = getArticlesByType('ratgeber')

  return (
    <SubpageLayout>
      <main className="bg-white">
        {/* Breadcrumb */}
        <div className="bg-offwhite border-b border-border py-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted">
              <Link href="/wissen" className="hover:text-primary transition-colors">
                Wissen
              </Link>
              <svg className="h-3.5 w-3.5 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-dark font-medium">Ratgeber</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-offwhite border-b border-border py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Ratgeber
              </div>
              <h1 className="text-4xl sm:text-5xl text-dark font-[family-name:var(--font-heading)] leading-[1.1] tracking-tight mb-5">
                SEO Ratgeber
              </h1>
              <p className="text-lg leading-relaxed text-muted mb-4">
                Praxisnahe SEO-Ratgeber und Schritt-für-Schritt-Guides von Experten — kostenlos,
                verständlich und direkt umsetzbar.
              </p>
              <p className="text-sm text-muted">
                {articles.length} {articles.length === 1 ? 'Artikel' : 'Artikel'} verfügbar
              </p>
            </div>
          </div>
        </section>

        {/* Filter Pills */}
        <div className="border-b border-border bg-white py-5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted mr-1">
                Thema:
              </span>
              {themaFilters.map((filter) => (
                <Link
                  key={filter.href}
                  href={filter.href}
                  className="inline-flex items-center rounded-full border border-border bg-offwhite px-4 py-1.5 text-sm font-medium text-dark hover:border-primary/30 hover:text-primary transition-all"
                >
                  {filter.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} showTypeBadge={false} />
              ))}
            </div>
          </div>
        </section>

        {/* End CTA */}
        <section className="bg-offwhite border-t border-border py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-dark font-bold leading-snug mb-4">
                Bereit für mehr{' '}
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
  )
}
