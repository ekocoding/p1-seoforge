import { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";
import {
  ShoppingCart,
  TrendingUp,
  BarChart3,
  Package,
  ArrowUpRight,
  CheckCircle2,
  Search,
  Target,
  Filter,
  FileText,
  Code,
  Star
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop SEO | SeoForge - E-Commerce SEO Agentur",
  description: "Spezialisierte Shop SEO von SeoForge. E-Commerce SEO für Online-Shops - mehr Sichtbarkeit, mehr Kunden, mehr Umsatz.",
};

export default function ShopSEOPage() {
  return (
    <SubpageLayout>
      {/* Centered Hero Section with E-Commerce Analytics Mockup */}
      <section className="py-20 lg:py-32 bg-offwhite">
        <div className="max-w-7xl mx-auto px-6">
          {/* Centered Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-sm text-muted mb-6">
              <ShoppingCart className="w-4 h-4 text-primary" />
              E-Commerce SEO Expertise
            </div>
            <h1 className="hero-title text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-dark mb-6">
              Shop SEO für mehr <span className="text-primary">Umsatz</span>
            </h1>
            <p className="hero-description text-xl text-muted leading-relaxed">
              Spezialisierte Suchmaschinenoptimierung für Online-Shops. Wir bringen Ihre Produkte auf Seite 1 und verwandeln Suchende in kaufende Kunden.
            </p>
          </div>

          {/* E-Commerce Analytics Mockup - Centered */}
          <div className="hero-dashboard max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-dark mb-1">
                      E-Commerce Performance Dashboard
                    </h3>
                    <p className="text-sm text-muted">Live Produktranking & Umsatzanalyse</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">Live Tracking</span>
                  </div>
                </div>
              </div>

              {/* Key Metrics Row */}
              <div className="grid grid-cols-4 gap-6 px-8 py-6 border-b border-border bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-muted uppercase tracking-wide">Organischer Traffic</span>
                  </div>
                  <div className="text-2xl font-bold text-dark">+247%</div>
                  <div className="text-xs text-green-600 mt-1">↗ +12.4k Besucher</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted uppercase tracking-wide">Top 10 Produkte</span>
                  </div>
                  <div className="text-2xl font-bold text-dark">84</div>
                  <div className="text-xs text-primary mt-1">↗ +31 diese Woche</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-secondary" />
                    <span className="text-xs text-muted uppercase tracking-wide">Conversion Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-dark">4.8%</div>
                  <div className="text-xs text-secondary mt-1">↗ +1.2% MoM</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-muted uppercase tracking-wide">Sichtbarkeit</span>
                  </div>
                  <div className="text-2xl font-bold text-dark">92/100</div>
                  <div className="text-xs text-yellow-600 mt-1">Ausgezeichnet</div>
                </div>
              </div>

              {/* Product Ranking Table */}
              <div className="px-8 py-6">
                <h4 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Top Produkte nach Ranking
                </h4>
                <div className="space-y-3">
                  {/* Product Row 1 */}
                  <div className="flex items-center gap-4 p-4 bg-offwhite rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-dark text-sm mb-1">
                        Premium Leder Sneaker Herren
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted">
                        <span>Keyword: "designer sneaker herren"</span>
                        <span>•</span>
                        <span className="text-green-600 font-medium">Position 2</span>
                        <span>•</span>
                        <span>Vol: 12.1k/mo</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <div className="text-muted text-xs mb-1">Traffic</div>
                        <div className="font-bold text-dark">3.2k/mo</div>
                      </div>
                      <div className="text-right">
                        <div className="text-muted text-xs mb-1">Revenue</div>
                        <div className="font-bold text-dark">€48k</div>
                      </div>
                      <div className="w-16 h-8 bg-green-100 border border-green-300 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-green-700">↑ 5</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Row 2 */}
                  <div className="flex items-center gap-4 p-4 bg-offwhite rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-muted to-dark rounded-lg flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-dark text-sm mb-1">
                        Vegane Handtasche Damen Elegant
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted">
                        <span>Keyword: "vegane handtasche"</span>
                        <span>•</span>
                        <span className="text-green-600 font-medium">Position 1</span>
                        <span>•</span>
                        <span>Vol: 8.4k/mo</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <div className="text-muted text-xs mb-1">Traffic</div>
                        <div className="font-bold text-dark">4.1k/mo</div>
                      </div>
                      <div className="text-right">
                        <div className="text-muted text-xs mb-1">Revenue</div>
                        <div className="font-bold text-dark">€62k</div>
                      </div>
                      <div className="w-16 h-8 bg-green-100 border border-green-300 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-green-700">↑ 8</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Row 3 */}
                  <div className="flex items-center gap-4 p-4 bg-offwhite rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-dark text-sm mb-1">
                        Bio Baumwolle T-Shirt Unisex
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted">
                        <span>Keyword: "bio t-shirt baumwolle"</span>
                        <span>•</span>
                        <span className="text-primary font-medium">Position 4</span>
                        <span>•</span>
                        <span>Vol: 5.2k/mo</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <div className="text-muted text-xs mb-1">Traffic</div>
                        <div className="font-bold text-dark">1.8k/mo</div>
                      </div>
                      <div className="text-right">
                        <div className="text-muted text-xs mb-1">Revenue</div>
                        <div className="font-bold text-dark">€18k</div>
                      </div>
                      <div className="w-16 h-8 bg-yellow-100 border border-yellow-300 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-yellow-700">↑ 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Graph Section */}
              <div className="px-8 py-6 border-t border-border bg-gradient-to-b from-white to-offwhite">
                <h4 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Organischer Shop-Umsatz (12 Monate)
                </h4>
                <div className="flex items-end justify-between gap-2 h-32">
                  {[42, 48, 55, 51, 62, 71, 78, 85, 92, 98, 105, 118].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gradient-to-t from-primary to-secondary rounded-t opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${height}%` }}></div>
                      <span className="text-xs text-muted">
                        {["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Shop SEO Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6 animate-fade-up">
              <Search className="w-4 h-4" />
              Die Grundlagen
            </div>
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6 animate-fade-up">
              Was ist Shop SEO?
            </h2>
            <div className="space-y-4 text-lg text-muted leading-relaxed animate-fade-up">
              <p>
                Shop SEO ist die spezialisierte Suchmaschinenoptimierung für E-Commerce-Websites. Im Gegensatz zu klassischer SEO konzentriert sich Shop SEO auf die einzigartigen Herausforderungen von Online-Shops: Tausende Produktseiten, komplexe Filterstrukturen, dynamische Inhalte und die Notwendigkeit, Kaufabsicht zu maximieren.
              </p>
              <p>
                Während eine normale Website vielleicht 10-50 Seiten hat, können Online-Shops Tausende von Produkt- und Kategorieseiten haben. Jede dieser Seiten muss optimiert werden, um in Suchmaschinen gefunden zu werden – und zwar für die richtigen Keywords, die kaufbereite Kunden nutzen.
              </p>
              <p>
                Bei SeoForge verstehen wir, dass Shop SEO weit über klassische OnPage-Optimierung hinausgeht. Es geht um technische Perfektion, strukturierte Daten für Rich Snippets, Content-Strategien für Kategorieseiten und die richtige Balance zwischen SEO und User Experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* E-Commerce Challenges Section */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-sm text-muted mb-6 animate-fade-up">
              <Target className="w-4 h-4 text-primary" />
              Unsere Expertise
            </div>
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6 animate-fade-up">
              E-Commerce SEO Herausforderungen, die wir <span className="text-primary">lösen</span>
            </h2>
            <p className="text-xl text-muted animate-fade-up">
              Shop SEO ist komplex. Wir haben jahrelange Erfahrung mit den typischen Stolpersteinen und wissen, wie man sie vermeidet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Challenge 1 */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Package className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-4">
                Produktseiten-Optimierung
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Jede Produktseite muss für relevante Keywords ranken, ohne Duplicate Content zu erzeugen. Wir optimieren Titel, Beschreibungen, Bilder und strukturierte Daten für maximale Sichtbarkeit.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Unique Product Descriptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Alt-Text & Image SEO</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Product Schema Markup</span>
                </li>
              </ul>
            </div>

            {/* Challenge 2 */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Search className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-4">
                Kategorieseiten-Strategie
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Kategorieseiten sind die stärksten Ranking-Assets eines Shops. Wir entwickeln Content-Strategien, die informativ und verkaufsfördernd zugleich sind.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">SEO-optimierte Category Content</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Interne Verlinkungsstruktur</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Breadcrumb & Navigation</span>
                </li>
              </ul>
            </div>

            {/* Challenge 3 */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Filter className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-4">
                Filterseiten & Faceted Navigation
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Filter und Faceted Navigation können zu Millionen von URL-Kombinationen führen. Wir implementieren intelligente Lösungen, um Duplicate Content zu vermeiden.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Canonical Tag Strategie</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Robots.txt & Crawl Budget</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Parameter Handling</span>
                </li>
              </ul>
            </div>

            {/* Challenge 4 */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-4">
                Duplicate Content Management
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Ähnliche Produkte, Varianten und gefilterte Ansichten können Duplicate Content erzeugen. Wir entwickeln technische Lösungen, die Ihr Crawl Budget schonen.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Canonical Tag Implementation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Content Variation Strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Hreflang für internationale Shops</span>
                </li>
              </ul>
            </div>

            {/* Challenge 5 */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Code className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-4">
                Schema Markup & Rich Snippets
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Strukturierte Daten sind essenziell für E-Commerce. Wir implementieren vollständige Schema.org Markup für Produkte, Bewertungen, Preise und Verfügbarkeit.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Product Schema (Price, Availability)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Review & Rating Markup</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Breadcrumb & Organization Schema</span>
                </li>
              </ul>
            </div>

            {/* Challenge 6 */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-4">
                Performance & Core Web Vitals
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Shops mit vielen Bildern und Produkten kämpfen oft mit Performance. Wir optimieren Ladezeiten, um bessere Rankings und höhere Conversion Rates zu erzielen.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Image Optimization & Lazy Loading</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">LCP, FID, CLS Verbesserung</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted">Mobile-First Optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6 animate-fade-up">
              <Package className="w-4 h-4" />
              Plattform-Expertise
            </div>
            <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-dark mb-6 animate-fade-up">
              Shop-Systeme, mit denen wir <span className="text-primary">arbeiten</span>
            </h2>
            <p className="text-xl text-muted animate-fade-up">
              Jede E-Commerce-Plattform hat ihre eigenen SEO-Herausforderungen. Wir kennen sie alle und wissen, wie man das Maximum herausholt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Shopify */}
            <div className="group bg-offwhite rounded-2xl p-8 border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-dark mb-3">Shopify</h3>
              <p className="text-muted leading-relaxed mb-4">
                Die führende Cloud-Lösung für E-Commerce. Wir optimieren Theme-Struktur, Apps und Liquid-Templates für SEO.
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Theme & App Optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Shopify Plus SEO</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Headless Commerce SEO</span>
                </li>
              </ul>
            </div>

            {/* WooCommerce */}
            <div className="group bg-offwhite rounded-2xl p-8 border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-dark mb-3">WooCommerce</h3>
              <p className="text-muted leading-relaxed mb-4">
                Das flexibelste WordPress-Plugin für Shops. Wir nutzen die volle Kontrolle über Code und Plugins für maximale SEO-Performance.
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>WordPress & WooCommerce SEO</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Plugin Optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Custom Product Taxonomies</span>
                </li>
              </ul>
            </div>

            {/* Shopware */}
            <div className="group bg-offwhite rounded-2xl p-8 border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-dark mb-3">Shopware</h3>
              <p className="text-muted leading-relaxed mb-4">
                Die deutsche Enterprise-Lösung. Wir kennen die technischen Details von Shopware 5 und Shopware 6 für professionelle Shop SEO.
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Shopware 5 & 6 Expertise</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Custom Plugin Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Multi-Channel SEO</span>
                </li>
              </ul>
            </div>

            {/* Magento */}
            <div className="group bg-offwhite rounded-2xl p-8 border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-dark mb-3">Magento</h3>
              <p className="text-muted leading-relaxed mb-4">
                Die mächtigste Open-Source-Plattform für große Shops. Wir optimieren Magento 2 / Adobe Commerce für Enterprise-E-Commerce.
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Magento 2 & Adobe Commerce</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Multi-Store SEO Setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Technical Performance Tuning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-dark via-dark to-primary/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white/90 mb-6 animate-fade-up">
            <TrendingUp className="w-4 h-4" />
            Bereit für mehr Umsatz?
          </div>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-white mb-6 animate-fade-up">
            Lassen Sie uns Ihren Shop auf die nächste Stufe bringen
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed animate-fade-up">
            Wir analysieren Ihren Shop kostenlos und zeigen Ihnen konkrete Potenziale für mehr organischen Traffic und höhere Umsätze auf.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up">
            <Link
              href="/kontakt"
              className="group px-8 py-4 bg-white text-dark rounded-xl font-semibold hover:bg-offwhite transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-2"
            >
              Kostenlose Shop-Analyse anfordern
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link
              href="/leistungen"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Alle Leistungen ansehen
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
