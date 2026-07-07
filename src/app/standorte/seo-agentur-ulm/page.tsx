import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import SubpageLayout from "../../components/SubpageLayout";
import UlmClient from "./UlmClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur Ulm — MedTech & Science City",
  description:
    "SeoForge ist Ihre SEO Agentur in Ulm. Einsteins Geburtsstadt, Ulmer Münster, Daimler Truck und wachsendes MedTech-Cluster — wir entwickeln SEO für Ulms Industrie- und Wissenschaftsmarkt.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seoforge.de/standorte/seo-agentur-ulm",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Ulm",
  description:
    "SEO für Medizintechnik, Automotive-Zulieferer, IT-Unternehmen und Mittelstand in Ulm und Neu-Ulm.",
  url: "https://seoforge.de/standorte/seo-agentur-ulm",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ulm",
    postalCode: "89073",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Ulm",
  },
  telephone: "+4915129547343",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Ulm als SEO-Standort besonders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ulm ist Einsteins Geburtsstadt, Heimat des weltberühmten Ulmer Münsters (161,5 m, Weltrekordhöhe) und wachsendes MedTech-Zentrum. Daimler Truck, Iveco und ein starkes Life-Sciences-Cluster prägen die Wirtschaft. Die einzigartige Zwei-Länder-Lage (Baden-Württemberg und Bayern) macht Ulm und Neu-Ulm zu einem kombinierten Markt mit besonderem SEO-Potential.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Ulmer Medizintechnikunternehmen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MedTech-SEO erfordert regulatorisch korrekten, technisch präzisen Content, der gleichzeitig Fachkräfte, Einkäufer und internationale Partner anspricht. Wir entwickeln Strategien für das Ulmer MedTech-Cluster — Storz, Schölly und Wettbewerber — mit Keywords, die B2B-Entscheidungsträger in der Medizintechnik ansprechen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert SEO in Ulm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für MedTech- und Automotive-Keywords entwickeln sich in der Regel in 3–6 Monaten. Ulms starke Industrie-Cluster erleichtern schnelle Gewinne bei spezifischen B2B-Keywords.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch Unternehmen in Neu-Ulm und der Region?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Ulm und Neu-Ulm sind faktisch eine gemeinsame Wirtschaftsregion über Ländergrenzen hinweg. Wir entwickeln Strategien, die beide Städte und die gesamte IHK-Region Ulm (Heidenheim, Biberach, Ehingen) als kombinierten Markt erschließen.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen Agenturen in Ulm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir arbeiten ohne Vertragszwang und kennen Ulms Märkte: MedTech-Regulatorik, Daimler-Truck-Ökosystem, Science City Initiative. Keine Einheitslösungen, sondern Strategien für Ulms einzigartige Industrie- und Wissenschaftsbasis. Transparente Berichte inklusive.",
      },
    },
  ],
};

export default function UlmPage() {
  const articleHtml = readFileSync(
    join(process.cwd(), "content/ulm-article.html"),
    "utf8"
  );
  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <UlmClient articleHtml={articleHtml} />
    </SubpageLayout>
  );
}
