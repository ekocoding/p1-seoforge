import { Metadata } from "next";
import SubpageLayout from "../components/SubpageLayout";
import { CheckCircle, FileText, Link2, Zap, Link as LinkIcon, ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "On Page Optimierung | SeoForge - Ihre SEO Agentur",
  description: "Professionelle On Page Optimierung von SeoForge. Meta-Tags, Struktur, interne Verlinkung und Ladezeiten optimieren.",
};

export default function OnPageOptimierungPage() {
  return (
    <SubpageLayout>
      {/* Split-Screen Hero */}
      <section className="bg-white py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#C2722A] hero-badge">
                Technische Perfektion
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl font-[family-name:var(--font-heading)] hero-title">
                On Page <span className="text-[#C2722A]">Optimierung</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#6B6B6B] hero-description">
                Wir optimieren jeden Aspekt Ihrer Website – von Meta-Tags über Überschriftenstruktur bis hin zu internen Verlinkungen. Technisch perfekt, inhaltlich stark, messbar erfolgreich.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 hero-cta">
                <a href="/kontakt" className="inline-flex items-center rounded-full bg-[#C2722A] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#a35f22] hover:shadow-lg">
                  Kostenlose Analyse anfordern
                </a>
              </div>
            </div>
            {/* Right: Mockup */}
            <div className="hero-dashboard">
              <PageAnalyzerMockup />
            </div>
          </div>
        </div>
      </section>

      {/* What is On Page Optimierung */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-6">
              Was ist On Page Optimierung?
            </h2>
            <p className="text-lg text-[#6B6B6B] leading-relaxed">
              On Page Optimierung umfasst alle Maßnahmen, die direkt auf Ihrer Website durchgeführt werden,
              um deren Sichtbarkeit in Suchmaschinen zu verbessern. Im Gegensatz zu Off Page SEO, das sich
              auf externe Faktoren wie Backlinks konzentriert, optimieren wir bei der On Page Optimierung
              Ihre Website-Struktur, Inhalte, technische Elemente und User Experience.
            </p>
            <p className="text-lg text-[#6B6B6B] leading-relaxed mt-4">
              Eine professionelle On Page Optimierung sorgt dafür, dass Suchmaschinen Ihre Inhalte verstehen,
              korrekt indexieren und für relevante Suchanfragen ausspielen können. Gleichzeitig verbessert
              sie die Nutzererfahrung und erhöht die Conversion-Rate.
            </p>
          </div>
        </div>
      </section>

      {/* Key Factors Grid */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-6">
              Diese Faktoren optimieren wir
            </h2>
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
              Unsere ganzheitliche On Page Optimierung deckt alle wichtigen Ranking-Faktoren ab
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {keyFactors.map((factor, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border border-[#E5E3DF] hover:border-[#C2722A] transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-[#C2722A]/10 rounded-lg flex items-center justify-center mb-6">
                  <factor.icon className="w-6 h-6 text-[#C2722A]" />
                </div>
                <h3 className="text-xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-3">
                  {factor.title}
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-6">
              Unser Optimierungsprozess
            </h2>
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
              Systematisch, datengetrieben und auf nachhaltigen Erfolg ausgerichtet
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="flex gap-6 animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#C2722A] text-white rounded-full flex items-center justify-center font-[family-name:var(--font-heading)] text-xl">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-[family-name:var(--font-heading)] text-[#1A1A1A] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1A1A1A]">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] text-white mb-6">
              Bereit für perfekte On Page Optimierung?
            </h2>
            <p className="text-xl text-[#6B6B6B] mb-8">
              Lassen Sie uns gemeinsam Ihre Website technisch und inhaltlich auf das nächste Level heben.
              Kontaktieren Sie uns für eine kostenlose Erstanalyse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/kontakt"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#C2722A] text-white rounded-lg hover:bg-[#D4A853] transition-colors duration-300 font-medium"
              >
                Kostenlose Analyse anfordern
              </a>
              <a
                href="/leistungen"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white rounded-lg hover:border-[#C2722A] hover:bg-[#C2722A]/10 transition-all duration-300 font-medium"
              >
                Alle Leistungen ansehen
              </a>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}

// Page Analyzer Mockup Component
function PageAnalyzerMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8 hero-dashboard">
      <div className="relative w-full max-w-2xl">
        {/* Main Webpage Mockup */}
        <div className="bg-white rounded-lg border-2 border-[#E5E3DF] shadow-xl p-6 space-y-4">
          {/* Header with Meta Tag Indicator */}
          <div className="relative">
            <div className="h-8 bg-[#F8F7F5] rounded border border-[#E5E3DF]"></div>
            <div className="absolute -right-2 -top-2">
              <div className="bg-[#C2722A] text-white text-xs px-2 py-1 rounded font-medium animate-pulse">
                Meta Tags ✓
              </div>
            </div>
          </div>

          {/* H1 with Score */}
          <div className="relative">
            <div className="h-10 bg-gradient-to-r from-[#C2722A]/20 to-transparent rounded border border-[#C2722A]/30 flex items-center px-3">
              <span className="text-xs font-medium text-[#C2722A]">H1</span>
            </div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2">
              <div className="bg-[#22C55E] text-white text-xs px-2 py-1 rounded font-medium">
                100
              </div>
            </div>
          </div>

          {/* Content blocks with H2 markers */}
          <div className="space-y-3">
            <div className="relative">
              <div className="h-6 bg-gradient-to-r from-[#D4A853]/20 to-transparent rounded border border-[#D4A853]/30 flex items-center px-3">
                <span className="text-xs font-medium text-[#D4A853]">H2</span>
              </div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                <div className="bg-[#22C55E] text-white text-xs px-2 py-1 rounded font-medium">
                  95
                </div>
              </div>
            </div>

            <div className="h-3 bg-[#F8F7F5] rounded w-full"></div>
            <div className="h-3 bg-[#F8F7F5] rounded w-4/5"></div>
            <div className="h-3 bg-[#F8F7F5] rounded w-3/4"></div>

            {/* Internal Link Indicator */}
            <div className="relative inline-block">
              <div className="h-3 bg-[#C2722A]/30 rounded w-32 relative">
                <LinkIcon className="w-3 h-3 text-[#C2722A] absolute -left-4 top-0" />
              </div>
              <div className="absolute -bottom-6 left-0">
                <div className="bg-[#C2722A] text-white text-xs px-2 py-1 rounded font-medium whitespace-nowrap">
                  Interne Links ✓
                </div>
              </div>
            </div>
          </div>

          {/* Second H2 Section */}
          <div className="space-y-3 mt-8">
            <div className="relative">
              <div className="h-6 bg-gradient-to-r from-[#D4A853]/20 to-transparent rounded border border-[#D4A853]/30 flex items-center px-3">
                <span className="text-xs font-medium text-[#D4A853]">H2</span>
              </div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                <div className="bg-[#22C55E] text-white text-xs px-2 py-1 rounded font-medium">
                  92
                </div>
              </div>
            </div>

            <div className="h-3 bg-[#F8F7F5] rounded w-full"></div>
            <div className="h-3 bg-[#F8F7F5] rounded w-5/6"></div>
          </div>
        </div>

        {/* Floating Score Sidebar */}
        <div className="absolute -right-8 top-8 bg-white rounded-lg border-2 border-[#E5E3DF] shadow-2xl p-4 w-48 space-y-3">
          <div className="text-center border-b border-[#E5E3DF] pb-3">
            <div className="text-3xl font-[family-name:var(--font-heading)] text-[#22C55E]">96</div>
            <div className="text-xs text-[#6B6B6B]">SEO Score</div>
          </div>

          <div className="space-y-2">
            <ScoreItem label="Meta Tags" score={100} />
            <ScoreItem label="Überschriften" score={98} />
            <ScoreItem label="Verlinkung" score={95} />
            <ScoreItem label="Ladezeit" score={92} />
            <ScoreItem label="URLs" score={94} />
            <ScoreItem label="Bilder" score={90} />
          </div>
        </div>

        {/* Floating Speed Indicator */}
        <div className="absolute -left-6 bottom-8 bg-white rounded-lg border-2 border-[#E5E3DF] shadow-xl p-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#22C55E]" />
          <div>
            <div className="text-sm font-medium text-[#1A1A1A]">1.2s</div>
            <div className="text-xs text-[#6B6B6B]">Ladezeit</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreItem({ label, score }: { label: string; score: number }) {
  const getColor = (score: number) => {
    if (score >= 90) return "#22C55E";
    if (score >= 70) return "#D4A853";
    return "#EF4444";
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[#6B6B6B]">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-[#F8F7F5] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${score}%`,
              backgroundColor: getColor(score),
            }}
          />
        </div>
        <span className="text-xs font-medium" style={{ color: getColor(score) }}>
          {score}
        </span>
      </div>
    </div>
  );
}

// Key Factors Data
const keyFactors = [
  {
    icon: FileText,
    title: "Meta-Tags",
    description: "Optimierung von Title-Tags, Meta-Descriptions und weiteren Meta-Elementen für maximale Click-Through-Rate in den SERPs.",
  },
  {
    icon: CheckCircle,
    title: "Überschriftenstruktur",
    description: "Logischer Aufbau von H1 bis H6 Überschriften mit gezielter Keyword-Integration für bessere Lesbarkeit und Crawlability.",
  },
  {
    icon: Link2,
    title: "Interne Verlinkung",
    description: "Strategische Vernetzung Ihrer Inhalte zur Stärkung wichtiger Seiten und Verbesserung der User Journey.",
  },
  {
    icon: Zap,
    title: "Ladegeschwindigkeit",
    description: "Technische Optimierung für schnelle Ladezeiten – ein entscheidender Ranking-Faktor und UX-Element.",
  },
  {
    icon: LinkIcon,
    title: "URL-Struktur",
    description: "Saubere, sprechende URLs mit klarer Hierarchie und optimaler Keyword-Platzierung.",
  },
  {
    icon: ImageIcon,
    title: "Bild-Optimierung",
    description: "Komprimierung, Alt-Texte, strukturierte Daten und Lazy Loading für bessere Performance und Accessibility.",
  },
];

// Process Steps Data
const processSteps = [
  {
    title: "Technische Analyse",
    description: "Wir untersuchen Ihre Website mit professionellen SEO-Tools und identifizieren alle On Page Schwachstellen. Dabei analysieren wir Meta-Tags, Überschriften, interne Verlinkung, Ladezeiten, mobile Optimierung und weitere technische Faktoren.",
  },
  {
    title: "Prioritäten festlegen",
    description: "Basierend auf der Analyse erstellen wir einen priorisierten Optimierungsplan. Wir konzentrieren uns zunächst auf Quick Wins mit hohem Impact und arbeiten dann systematisch alle weiteren Optimierungspotenziale ab.",
  },
  {
    title: "Implementierung",
    description: "Unser Team setzt alle Optimierungen fachgerecht um – von Meta-Tag-Anpassungen über Strukturverbesserungen bis hin zu technischen Performance-Optimierungen. Sie erhalten transparente Dokumentation aller Änderungen.",
  },
  {
    title: "Monitoring & Verfeinerung",
    description: "Nach der Implementierung überwachen wir kontinuierlich die Performance-Entwicklung. Wir messen Rankings, Traffic und User-Signale und verfeinern die Optimierungen basierend auf den Ergebnissen.",
  },
];
