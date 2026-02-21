import type { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";

export const metadata: Metadata = {
  title: "SEO Wissen | SeoForge - Ratgeber & Guides",
  description:
    "Kostenlose SEO-Guides und Fachartikel von Experten. Lernen Sie alles über Suchmaschinenoptimierung, Content-Strategie und technisches SEO.",
};

const articles = [
  {
    title: "SEO Grundlagen: Der komplette Einsteiger-Guide 2024",
    excerpt:
      "Alles, was Sie über Suchmaschinenoptimierung wissen müssen. Von Keywords über On-Page-SEO bis zu Backlinks - verständlich erklärt.",
    category: "SEO Basics",
    readTime: "12 Min.",
    date: "2024-01-15",
  },
  {
    title: "Technisches SEO: Core Web Vitals richtig optimieren",
    excerpt:
      "Verbessern Sie die Performance Ihrer Website. Praktische Anleitung zur Optimierung von LCP, FID und CLS für bessere Rankings.",
    category: "Technisches SEO",
    readTime: "15 Min.",
    date: "2024-01-10",
  },
  {
    title: "Content-Strategie: So erstellen Sie SEO-optimierte Inhalte",
    excerpt:
      "Entwickeln Sie eine datengetriebene Content-Strategie. Von der Keyword-Recherche bis zur Content-Distribution.",
    category: "Content",
    readTime: "18 Min.",
    date: "2024-01-05",
  },
  {
    title: "Local SEO: Mehr lokale Kunden durch Google gewinnen",
    excerpt:
      "Optimieren Sie Ihr Google Business Profil und dominieren Sie die lokale Suche. Praktische Tipps für lokale Unternehmen.",
    category: "Local SEO",
    readTime: "10 Min.",
    date: "2023-12-28",
  },
  {
    title: "E-Commerce SEO: Shop-Optimierung für mehr Umsatz",
    excerpt:
      "Steigern Sie die Sichtbarkeit Ihres Online-Shops. Von Produktseiten-Optimierung bis zu strukturierten Daten.",
    category: "E-Commerce",
    readTime: "20 Min.",
    date: "2023-12-20",
  },
  {
    title: "Linkbuilding-Strategien: Hochwertige Backlinks aufbauen",
    excerpt:
      "Lernen Sie White-Hat-Linkbuilding-Techniken kennen. Von Digital PR bis zu strategischen Kooperationen.",
    category: "Linkbuilding",
    readTime: "14 Min.",
    date: "2023-12-15",
  },
];

const categoryColors: { [key: string]: string } = {
  "SEO Basics": "bg-blue-100 text-blue-700 border-blue-200",
  "Technisches SEO": "bg-purple-100 text-purple-700 border-purple-200",
  "Content": "bg-green-100 text-green-700 border-green-200",
  "Local SEO": "bg-orange-100 text-orange-700 border-orange-200",
  "E-Commerce": "bg-pink-100 text-pink-700 border-pink-200",
  "Linkbuilding": "bg-cyan-100 text-cyan-700 border-cyan-200",
};

export default function WissenPage() {
  return (
    <SubpageLayout>
      <main className="bg-white">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-offwhite to-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Kostenlose SEO-Guides
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-dark sm:text-5xl lg:text-6xl font-[family-name:var(--font-heading)]">
                SEO <span className="text-primary">Wissen</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Umfassende Guides und Fachartikel von SEO-Experten. Lernen Sie
                die neuesten Strategien und Best Practices für erfolgreiche
                Suchmaschinenoptimierung.
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <article
                  key={article.title}
                  className="group relative flex flex-col rounded-2xl border border-border bg-white transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.04] hover:-translate-y-1 overflow-hidden"
                >
                  {/* Category Badge */}
                  <div className="p-6 pb-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                        categoryColors[article.category]
                      }`}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 px-6 pb-6">
                    <h2 className="text-xl font-bold text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-border bg-offwhite/50 px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{article.readTime}</span>
                    </div>
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-dark">
                      Lesen
                      <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 01.75-.75h10.638L11.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 11-1.04-1.08l3.158-2.96H3.75A.75.75 0 013 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Decorative gradient */}
                  <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-primary/[0.05] to-transparent blur-2xl" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA Section */}
        <section className="border-t border-border bg-gradient-to-br from-offwhite via-white to-offwhite py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/[0.08]">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl font-[family-name:var(--font-heading)]">
                Bleiben Sie <span className="text-primary">informiert</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Erhalten Sie die neuesten SEO-Tipps und Updates direkt in Ihr Postfach.
                Kostenlos und jederzeit abbestellbar.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Ihre E-Mail-Adresse"
                  className="flex-1 rounded-full border border-border bg-white px-6 py-3 text-sm text-dark placeholder:text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                />
                <a
                  href="/kontakt"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 text-center"
                >
                  Anmelden
                </a>
              </div>
              <p className="mt-4 text-xs text-muted">
                Kein Spam. Nur wertvolle SEO-Insights.
              </p>
            </div>
          </div>
        </section>
      </main>
    </SubpageLayout>
  );
}
