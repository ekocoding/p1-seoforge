import { getArticleBySlug, getArticlesByType } from '../../data/articles'
import ArticleLayout from '../../components/ArticleLayout'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getArticlesByType('news').map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} — SEO News | SeoForge`,
    description: article.excerpt,
    alternates: { canonical: `https://seoforge.de/wissen/news/${slug}` },
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article || article.type !== 'news') notFound()
  return <ArticleLayout article={article} />
}
