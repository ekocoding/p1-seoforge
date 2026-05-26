import type { Article } from '../data/types'
import Link from 'next/link'
import { getTypeLabel, getTypeBadgeClass, getThemaLabel } from './ArticleLayout'

interface ArticleCardProps {
  article: Article
  showTypeBadge?: boolean
}

export default function ArticleCard({ article, showTypeBadge = true }: ArticleCardProps) {
  return (
    <Link
      href={`/wissen/${article.type}/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-white hover:border-primary/30 hover:-translate-y-0.5 transition-all overflow-hidden"
    >
      <div className="flex-1 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {showTypeBadge && (
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getTypeBadgeClass(article.type)}`}>
                {getTypeLabel(article.type)}
              </span>
            )}
            <span className="inline-flex items-center rounded-full border border-border bg-offwhite px-3 py-1 text-xs font-medium text-muted">
              {getThemaLabel(article.thema)}
            </span>
          </div>
          {!article.published && (
            <span className="inline-flex items-center rounded-full border border-border bg-white px-2.5 py-1 text-xs font-medium text-muted">
              Demnächst
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-dark mb-2.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted line-clamp-3">
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
          Artikel lesen
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
