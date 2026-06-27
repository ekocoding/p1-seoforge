import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import SubpageLayout from "../../components/SubpageLayout";
import KoblenzClient from "./KoblenzClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur Koblenz | SeoForge – Behörden, Tourismus & Mittelrhein",
  description:
    "SeoForge ist Ihre SEO Agentur in Koblenz. BAAINBw, Deutsches Eck, UNESCO-Welterbe und Mittelrhein-Tourismus — wir entwickeln SEO für Koblenz und die gesamte Region.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seoforge.de/standorte/seo-agentur-koblenz",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Koblenz",
  description:
    "SEO für Dienstleister im Behördenumfeld, Tourismus, Mittelstand und Logistik in Koblenz am Rhein-Mosel-Eck.",
  url: "https://seoforge.de/standorte/seo-agentur-koblenz",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Koblenz",
    postalCode: "56068",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Koblenz",
  },
  telephone: "+4915129547343",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Koblenz als SEO-Standort besonders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Koblenz vereint außergewöhnliche Faktoren: Das BAAINBw als größter Arbeitgeber mit ~4.500 Mitarbeitern, das Deutsche Eck als Deutschlands bekanntestes Flussconfluenz, UNESCO-Welterbe-Status des Oberen Mittelrheintals und eine starke Tourismus-Nachfrage. Diese Kombination schafft vielfältige SEO-Chancen für Dienstleister, Tourismus und Mittelstand.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Koblenzer Dienstleistern im Behördenumfeld?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B2B-SEO im Behördenumfeld erfordert präzisen, seriösen Content, der Kompetenz und Verlässlichkeit ausstrahlt. Wir entwickeln Strategien für IT-Dienstleister, Berater und Systemintegratoren im BAAINBw-Umfeld — mit Keywords, die Entscheider in Bundesbehörden und öffentlichen Auftraggebern ansprechen.",
      },
    },
    {
      "@type": "Question",
      name: "Lohnt sich Tourismus-SEO in Koblenz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolut. Das Deutsche Eck, die Festung Ehrenbreitstein und das UNESCO-Welterbe Mittelrhein ziehen Touristen aus aller Welt an. Hotels, Weinbars und Ausflugsanbieter finden in gezieltem Tourismus-SEO, Google Business-Optimierung und saisonalen Keywords einen direkten Weg zu mehr Buchungen.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge Unternehmen in der gesamten Mittelrhein-Region?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Koblenz ist das Zentrum des Mittelrheins — umgeben von Westerwald, Eifel, Hunsrück und dem Moseltal. Wir entwickeln regionale Strategien, die Koblenz als Hub nutzen und Kunden aus dem gesamten Einzugsgebiet ansprechen.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen Agenturen in Koblenz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir arbeiten ohne Vertragszwang und kennen den Koblenzer Markt: das Behördenumfeld, die Tourismussaison, die Mittelstand-Strukturen. Keine Einheitslösungen, sondern Strategien für Koblenz und die Mittelrhein-Region. Transparente Berichte inklusive.",
      },
    },
  ],
};

export default function KoblenzPage() {
  const articleHtml = readFileSync(
    join(process.cwd(), "content/koblenz-article.html"),
    "utf8"
  );
  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <KoblenzClient articleHtml={articleHtml} />
    </SubpageLayout>
  );
}
