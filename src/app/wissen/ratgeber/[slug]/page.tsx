import { getArticleBySlug, getArticlesByType } from '../../data/articles'
import ArticleLayout from '../../components/ArticleLayout'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getArticlesByType('ratgeber').map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} | SeoForge Wissen`,
    description: article.excerpt,
    alternates: { canonical: `https://seoforge.de/wissen/ratgeber/${slug}` },
  }
}

export default async function RatgeberArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article || article.type !== 'ratgeber') notFound()
  return <ArticleLayout article={article} />
}
