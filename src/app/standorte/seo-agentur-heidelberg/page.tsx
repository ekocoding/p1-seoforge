import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import SubpageLayout from "../../components/SubpageLayout";
import HeidelbergClient from "./HeidelbergClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur Heidelberg | SeoForge – Biotech, Wissenschaft & lokale Sichtbarkeit",
  description:
    "SeoForge ist Ihre SEO Agentur in Heidelberg. Spezialisiert auf Biotech, Wissenschaft, Tourismus und IT. 155.000 Einwohner, 66% Wissensberufe — wir kennen Ihren Markt.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seoforge.de/standorte/seo-agentur-heidelberg",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Heidelberg",
  description:
    "SEO für Biotech, Pharma, Tourismus und Wissensunternehmen in Heidelberg.",
  url: "https://seoforge.de/standorte/seo-agentur-heidelberg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Heidelberg",
    postalCode: "69115",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Heidelberg",
  },
  telephone: "+4915203450695",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Heidelberg als SEO-Standort einzigartig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Heidelberg vereint 40% Bevölkerung unter 30, 22% internationale Einwohner und 66% Wissensberufe. Biotech-Cluster mit 30+ Firmen, die Universität seit 1386 und globale Unternehmen schaffen eine online-affine Zielgruppe.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Heidelberger Biotech-Unternehmen bei SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Biotech-SEO erfordert fachlich korrekte Terminologie kombiniert mit E-A-T-Aufbau für Investoren, Partner und Fachkräfte. Wir entwickeln Content-Strategien auf Deutsch und Englisch.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert es, bis SEO in Heidelberg Ergebnisse zeigt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste Verbesserungen bei Technical SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive Keywords entwickeln sich in 3–6 Monaten.",
      },
    },
    {
      "@type": "Question",
      name: "Spielt die internationale Ausrichtung Heidelbergs eine Rolle für SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Mit 22% internationalen Einwohnern empfehlen wir vielen Heidelberger Unternehmen eine zweisprachige SEO-Strategie (Deutsch + Englisch) für maximale Reichweite.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen SEO-Agenturen in Heidelberg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keine Vertragsbindung, transparente Berichte und Strategien die auf dem echten Heidelberger Markt basieren — Biotech, akademische Zielgruppe, Tourismus.",
      },
    },
  ],
};

export default function HeidelbergPage() {
  const articleHtml = readFileSync(
    join(process.cwd(), "content/heidelberg-article.html"),
    "utf8"
  );
  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeidelbergClient articleHtml={articleHtml} />
    </SubpageLayout>
  );
}
