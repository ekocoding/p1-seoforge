import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import SubpageLayout from "../../components/SubpageLayout";
import StuttgartClient from "./StuttgartClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur Stuttgart | SeoForge – Automotive, B2B & Tech SEO",
  description:
    "SeoForge ist Ihre SEO Agentur in Stuttgart. Spezialisiert auf Automotive, B2B und IT. 635.000 Einwohner, 118.000 Automotive-Jobs, Bosch & Porsche — wir kennen Ihren Markt.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seoforge.de/standorte/seo-agentur-stuttgart",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Stuttgart",
  description:
    "SEO für Automotive-Zulieferer, IT-Unternehmen und B2B-Dienstleister in Stuttgart und der Region.",
  url: "https://seoforge.de/standorte/seo-agentur-stuttgart",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Stuttgart",
    postalCode: "70173",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Stuttgart",
  },
  telephone: "+4915203450695",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Warum ist Stuttgart ein besonders schwieriger SEO-Markt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stuttgart hat eine der wirtschaftsstärksten B2B-Landschaften Deutschlands: 31.400 Unternehmen in der Stadt, 244.000 in der Region, mit einem Schwergewicht auf Automotive, Engineering und IT. Diese Dichte führt zu intensivem Wettbewerb um digitale Sichtbarkeit.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Automotive-Zulieferern in Stuttgart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir kennen die Tier-1/Tier-2-Lieferkette, die Nomenklatur und die spezifischen Suchbegriffe, die Einkäufer bei OEMs wie Porsche, Bosch oder Mercedes verwenden. Wir entwickeln Content-Strategien für dieses hochspezialisierten B2B-Segment.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert es, bis SEO in Stuttgart Ergebnisse zeigt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste Verbesserungen bei technischem SEO und Local SEO sind nach 4–8 Wochen messbar. Für kompetitive B2B-Keywords entstehen nachhaltige Rankings typischerweise nach 6–9 Monaten.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch Unternehmen in der Stuttgarter Region?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Die Region Stuttgart umfasst Böblingen, Esslingen, Ludwigsburg, Waiblingen und weitere Landkreise mit 2,8 Millionen Einwohnern und 244.000 Unternehmen. Wir berücksichtigen lokale und regionale Suchintentionen.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen SEO-Agenturen in Stuttgart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keine Vertragsbindung, transparente Berichte und Strategien, die auf dem echten Stuttgarter Markt basieren — B2B-Lieferketten, Automotive-Transformation, regionale Kaufkraft. Kein generischer Content.",
      },
    },
  ],
};

export default function StuttgartPage() {
  const articleHtml = readFileSync(
    join(process.cwd(), "content/stuttgart-article.html"),
    "utf8"
  );
  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <StuttgartClient articleHtml={articleHtml} />
    </SubpageLayout>
  );
}
