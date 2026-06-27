import type { Metadata } from 'next'
import Link from 'next/link'
import SubpageLayout from '../../components/SubpageLayout'
import ArticleCard from '../components/ArticleCard'
import { getArticlesByType } from '../data/articles'

export const metadata: Metadata = {
  alternates: { canonical: "https://seoforge.de/wissen/glossar" },
  title: 'SEO Glossar | SeoForge Wissen',
  description: 'SEO-Begriffe einfach erklärt — das Glossar von SeoForge für Fachbegriffe aus Suchmaschinenoptimierung und Online-Marketing.',
}

export default function GlossarListPage() {
  const articles = getArticlesByType('glossar')

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
              <span className="text-dark font-medium">Glossar</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-offwhite border-b border-border py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/[0.06] px-4 py-1.5 text-sm font-medium text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Glossar
              </div>
              <h1 className="text-4xl sm:text-5xl text-dark font-[family-name:var(--font-heading)] leading-[1.1] tracking-tight mb-5">
                SEO Glossar
              </h1>
              <p className="text-lg leading-relaxed text-muted mb-4">
                Fachbegriffe aus SEO, GEO und Online-Marketing einfach und verständlich erklärt —
                damit Sie in jeder Agentur-Besprechung mitreden können.
              </p>
              {articles.length > 0 ? (
                <p className="text-sm text-muted">
                  {articles.length} {articles.length === 1 ? 'Begriff' : 'Begriffe'} erklärt
                </p>
              ) : (
                <p className="text-sm text-muted">Glossar-Einträge erscheinen demnächst</p>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark mb-3">
                  Glossar-Einträge erscheinen demnächst.
                </h2>
                <p className="text-muted leading-relaxed">
                  Wir arbeiten an umfassenden Erklärungen zu allen wichtigen SEO- und GEO-Begriffen.
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
                Fragen zu SEO-Begriffen?{' '}
                <span className="text-primary">Wir erklären sie.</span>
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Im kostenlosen Erstgespräch erklären wir Ihnen alles — ohne Fachjargon.
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
