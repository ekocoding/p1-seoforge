import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import SubpageLayout from "../../components/SubpageLayout";
import PforzheimClient from "./PforzheimClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur Pforzheim | SeoForge – Schmuck, E-Commerce & Mittelstand",
  description:
    "SeoForge ist Ihre SEO Agentur in Pforzheim. Die Goldstadt mit 700+ Schmuck- und Uhrenbetrieben braucht E-Commerce-SEO und Mittelstand-Strategien — wir liefern sie.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seoforge.de/standorte/seo-agentur-pforzheim",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Pforzheim",
  description:
    "SEO für Schmuck- und Uhrenhersteller, E-Commerce und Mittelstandsbetriebe in Pforzheim, der Goldstadt.",
  url: "https://seoforge.de/standorte/seo-agentur-pforzheim",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pforzheim",
    postalCode: "75172",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Pforzheim",
  },
  telephone: "+4915203450695",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Pforzheim als SEO-Standort einzigartig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pforzheim ist weltweit als Goldstadt bekannt: 700+ Schmuck- und Uhrenbetriebe, internationale Exportnachfrage und eine Mittelstandskultur, die seit 1767 auf Handwerksexzellenz setzt. Diese Kombination schafft einzigartige SEO-Chancen — besonders für E-Commerce, B2B-Export und lokales Handwerk.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Pforzheimer Schmuckhändlern?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir entwickeln E-Commerce-SEO-Strategien speziell für Schmuck und Uhren: Produktseiten-Optimierung für kaufbereite Suchanfragen, Rich Snippets für Bewertungen und Preise, Google Shopping-Integration und 'Made in Pforzheim' als Vertrauenssignal gegen asiatische Konkurrenz.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert SEO in Pforzheim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für E-Commerce-Keywords entwickeln sich in der Regel in 3–6 Monaten. Mit gezielten Nischen-Keywords für Schmuck und Uhren sind schnelle Gewinne möglich.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge Unternehmen in der TechnologieRegion Karlsruhe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Pforzheims Nähe zu Karlsruhe und die TechnologieRegion schaffen gemeinsame Märkte. Wir entwickeln regionale Strategien, die sowohl Pforzheim als auch den Großraum Karlsruhe erschließen — ideal für Betriebe mit regionaler Reichweite.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen Agenturen in Pforzheim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir arbeiten ohne Vertragszwang und verstehen den Mittelstand. Keine übergroßen Agentur-Pakete, sondern skalierbare Strategien für Pforzheimer Betriebe — von der Ein-Mann-Goldschmiede bis zum exportierenden Schmuckhersteller. Transparente Berichte inklusive.",
      },
    },
  ],
};

export default function PforzheimPage() {
  const articleHtml = readFileSync(
    join(process.cwd(), "content/pforzheim-article.html"),
    "utf8"
  );
  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PforzheimClient articleHtml={articleHtml} />
    </SubpageLayout>
  );
}
