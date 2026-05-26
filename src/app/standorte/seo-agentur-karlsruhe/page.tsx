import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import SubpageLayout from "../../components/SubpageLayout";
import KarlsruheClient from "./KarlsruheClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur Karlsruhe | SeoForge – IT, KI & TechnologieRegion",
  description:
    "SeoForge ist Ihre SEO Agentur in Karlsruhe. Spezialisiert auf IT, Cyber Security, KI und die TechnologieRegion. KIT, Cyber Valley, 7 Weltmarktführer — wir kennen Ihren Markt.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seoforge.de/standorte/seo-agentur-karlsruhe",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Karlsruhe",
  description:
    "SEO für IT-Unternehmen, Cyber Security, KI und Tech-Startups in Karlsruhe und der TechnologieRegion.",
  url: "https://seoforge.de/standorte/seo-agentur-karlsruhe",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karlsruhe",
    postalCode: "76133",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Karlsruhe",
  },
  telephone: "+4915203450695",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Karlsruhe als SEO-Standort einzigartig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Karlsruhe vereint das KIT als eine der führenden Forschungsuniversitäten Deutschlands, 7 Weltmarktführer, Cyber Valley als europäisches KI-Zentrum und eine außergewöhnlich dichte IT-Landschaft. Diese Faktoren schaffen intensiven Wettbewerb um digitale Sichtbarkeit — generisches SEO reicht hier nicht aus.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge IT-Unternehmen in Karlsruhe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir entwickeln Nischen-SEO-Strategien für Karlsruher IT-Unternehmen: technisch präziser Content, Topical Authority in spezifischen Branchen wie Cyber Security, KI oder Embedded Systems, und SEO, das Entscheider, Talente und Investoren gleichzeitig anspricht.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert es, bis SEO in Karlsruhe Ergebnisse zeigt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste Verbesserungen bei Technical SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive IT-Keywords entwickeln sich in 3–6 Monaten. Mit Nischen-Targeting sind schnelle Gewinne bei Long-Tail-Keywords möglich.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch Unternehmen in der TechnologieRegion Karlsruhe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Die TechnologieRegion Karlsruhe umfasst mehrere Landkreise (Pforzheim, Rastatt, Bruchsal u.a.). Wir betreuen Unternehmen aus dem gesamten Einzugsgebiet und berücksichtigen lokale und regionale Suchintentionen.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen SEO-Agenturen in Karlsruhe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keine Vertragsbindung, transparente Berichte und Strategien, die auf dem echten Karlsruher Techmarkt basieren — IT-Dichte, KI-Forschungskultur, spezifische B2B-Zielgruppen. Wir sprechen Ihre Tech-Sprache.",
      },
    },
  ],
};

export default function KarlsruhePage() {
  const articleHtml = readFileSync(
    join(process.cwd(), "content/karlsruhe-article.html"),
    "utf8"
  );
  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <KarlsruheClient articleHtml={articleHtml} />
    </SubpageLayout>
  );
}
