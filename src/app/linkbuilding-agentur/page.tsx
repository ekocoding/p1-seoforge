import type { Metadata } from "next";
import LinkbuildingAgenturClient from "./LinkbuildingAgenturClient";
import { linkbuildingFaqs } from "./content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Linkbuilding Agentur für redaktionelle Backlinks",
  description:
    "Linkbuilding Agentur für relevante Backlinks, Digital PR und Link-Gap-Analysen. Redaktioneller Linkaufbau mit manueller Quellenprüfung.",
  keywords: [
    "Linkbuilding Agentur",
    "Backlinks Agentur",
    "SEO Linkbuilding Agentur",
    "Linkaufbau Agentur",
  ],
  alternates: {
    canonical: "https://seoforge.de/linkbuilding-agentur",
  },
  openGraph: {
    title: "Linkbuilding Agentur für redaktionelle Backlinks",
    description:
      "Relevanter Linkaufbau, Digital PR und manuelle Quellenprüfung – ohne Linkpakete und Massenplatzierungen.",
    url: "https://seoforge.de/linkbuilding-agentur",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://seoforge.de/linkbuilding-agentur#service",
      name: "Linkbuilding und redaktioneller Linkaufbau",
      serviceType: "Linkbuilding Agentur",
      url: "https://seoforge.de/linkbuilding-agentur",
      description:
        "Redaktioneller Linkaufbau, Digital PR, Link-Gap-Analyse und manuelle Quellenprüfung.",
      provider: {
        "@type": "Organization",
        name: "SeoForge",
        url: "https://seoforge.de",
      },
      areaServed: {
        "@type": "Country",
        name: "Deutschland",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: "https://seoforge.de",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Linkbuilding Agentur",
          item: "https://seoforge.de/linkbuilding-agentur",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: linkbuildingFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function LinkbuildingAgenturPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LinkbuildingAgenturClient />
    </>
  );
}
