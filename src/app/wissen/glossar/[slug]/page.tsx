import { getArticleBySlug, getArticlesByType } from '../../data/articles'
import ArticleLayout from '../../components/ArticleLayout'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getArticlesByType('glossar').map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.metaTitle ?? article.title,
    description: article.excerpt,
    alternates: { canonical: `https://seoforge.de/wissen/glossar/${slug}` },
  }
}

export default async function GlossarArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article || article.type !== 'glossar') notFound()
  return <ArticleLayout article={article} />
}
