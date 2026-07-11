import type { Metadata } from 'next'
import Link from 'next/link'
import SubpageLayout from '../../components/SubpageLayout'
import ArticleCard from '../components/ArticleCard'
import { getArticlesByType } from '../data/articles'

export const metadata: Metadata = {
  alternates: { canonical: "https://seoforge.de/wissen/case-study" },
  title: 'SEO Case Studies',
  description: 'Echte Projektergebnisse und SEO-Erfolgsgeschichten von SeoForge — messbare Rankings, mehr Traffic und nachhaltiges Wachstum.',
  robots: { index: false, follow: true },
}

export default function CaseStudyListPage() {
  const articles = getArticlesByType('case-study')

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
              <span className="text-dark font-medium">Case Studies</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-offwhite border-b border-border py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Case Studies
              </div>
              <h1 className="text-4xl sm:text-5xl text-dark font-[family-name:var(--font-heading)] leading-[1.1] tracking-tight mb-5">
                SEO Case Studies
              </h1>
              <p className="text-lg leading-relaxed text-muted mb-4">
                Echte Projektergebnisse und Erfolgsgeschichten — wie SeoForge für Unternehmen
                messbare Rankings und nachhaltiges organisches Wachstum erzielt.
              </p>
              {articles.length > 0 ? (
                <p className="text-sm text-muted">
                  {articles.length} {articles.length === 1 ? 'Case Study' : 'Case Studies'} verfügbar
                </p>
              ) : (
                <p className="text-sm text-muted">Case Studies erscheinen demnächst</p>
              )}
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {articles.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} showTypeBadge={false} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center max-w-lg mx-auto">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-offwhite border border-border">
                  <svg className="h-10 w-10 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark mb-3">
                  Case Studies erscheinen demnächst.
                </h2>
                <p className="text-muted leading-relaxed">
                  Wir dokumentieren gerade unsere Projektergebnisse — bald erfahren Sie,
                  wie wir für Unternehmen messbare Rankings erzielt haben.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* End CTA */}
        <section className="bg-offwhite border-t border-border py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-dark font-bold leading-snug mb-4">
                Ihre Erfolgsgeschichte{' '}
                <span className="text-primary">beginnt hier.</span>
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Lassen Sie uns gemeinsam die nächste Case Study schreiben — mit messbaren
                Ergebnissen für Ihr Unternehmen.
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
