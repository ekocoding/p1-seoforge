import type { Article } from './types'

export const articles: Article[] = []

// Helper functions
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getArticlesByType(type: Article['type']): Article[] {
  return articles.filter(a => a.type === type)
}

export function getArticlesByThema(thema: Article['thema']): Article[] {
  return articles.filter(a => a.thema === thema)
}

export function getRelatedArticles(slug: string): Article[] {
  const article = getArticleBySlug(slug)
  if (!article) return []
  return article.relatedSlugs
    .map(s => getArticleBySlug(s))
    .filter(Boolean) as Article[]
}
