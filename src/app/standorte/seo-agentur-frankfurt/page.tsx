import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import SubpageLayout from "../../components/SubpageLayout";
import FrankfurtClient from "./FrankfurtClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur Frankfurt — Finanz, FinTech & B2B",
  description:
    "SeoForge ist Ihre SEO Agentur in Frankfurt. Spezialisiert auf Finanz, FinTech und B2B. EZB, DAX, 200+ Banken — wir kennen den härtesten digitalen Markt Deutschlands.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seoforge.de/standorte/seo-agentur-frankfurt",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Frankfurt",
  description: "SEO für Finanzunternehmen, FinTechs und B2B-Dienstleister in Frankfurt und der Rhein-Main-Region.",
  url: "https://seoforge.de/standorte/seo-agentur-frankfurt",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Frankfurt am Main",
    postalCode: "60311",
    addressCountry: "DE",
  },
  areaServed: { "@type": "City", name: "Frankfurt am Main" },
  telephone: "+4915129547343",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Frankfurt als SEO-Markt einzigartig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Frankfurt vereint EZB, 200+ Banken und die Deutsche Börse mit 30% internationaler Bevölkerung. SEO muss hier deutsche und internationale Suchintentionen bedienen, Finanz-Compliance berücksichtigen und in einem der teuersten B2B-Märkte Europas wirken.",
      },
    },
    {
      "@type": "Question",
      name: "Wie wichtig ist zweisprachiges SEO in Frankfurt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sehr wichtig. Mit 30% internationaler Bevölkerung und der EZB als Arbeitgeber ist Englisch in Frankfurt Geschäftssprache. Wir empfehlen eine hreflang-Strategie mit deutschem und englischem Content.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Frankfurter Finanzunternehmen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finanz-SEO erfordert YMYL- und E-E-A-T-konforme Inhalte, die BaFin-Regularien korrekt abbilden und echte Expertise demonstrieren. Wir entwickeln Content-Strategien für regulierte Finanzprodukte, FinTechs und Investmentfirmen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert es, bis SEO in Frankfurt Ergebnisse zeigt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste Verbesserungen bei technischem SEO und Local SEO sind nach 4–8 Wochen messbar. In kompetitiven Frankfurter Finanzkeywords entstehen nachhaltige Rankings in 6–12 Monaten.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen SEO-Agenturen in Frankfurt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keine Vertragsbindung, transparente Berichte und Strategien, die auf dem echten Frankfurter Markt basieren — Finanz-Compliance, internationale Zielgruppen, FinTech-Dynamik. Kein generischer Content.",
      },
    },
  ],
};

export default function FrankfurtPage() {
  const articleHtml = readFileSync(join(process.cwd(), "content/frankfurt-article.html"), "utf8");
  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FrankfurtClient articleHtml={articleHtml} />
    </SubpageLayout>
  );
}
