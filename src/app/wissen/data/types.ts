export type ArticleType = 'ratgeber' | 'glossar' | 'case-study' | 'news'
export type ArticleThema = 'seo' | 'geo' | 'on-page' | 'technical-seo' | 'local-seo' | 'webdesign'

export interface ArticleServiceLink {
  label: string
  href: string
}

export interface Article {
  slug: string
  type: ArticleType
  thema: ArticleThema
  title: string
  excerpt: string
  readTime: string
  publishDate: string   // 'YYYY-MM-DD'
  lastUpdated: string   // 'YYYY-MM-DD'
  serviceLinks: ArticleServiceLink[]   // 2-3 kontextuelle Service-Links
  relatedSlugs: string[]               // Slugs anderer Artikel
  published: boolean                   // false = "Demnächst verfügbar"
  banner?: string                      // Pfad zum Banner-Bild unter /public (optional)
  faq?: { q: string; a: string }[]     // FAQ-Q&A für FAQPage-Schema (JSON-LD); Anzeige bleibt im content
  content?: string                     // HTML-String mit id-Attributen auf Headings
}
