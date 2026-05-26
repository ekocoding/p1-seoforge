import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import SubpageLayout from "../../components/SubpageLayout";
import MainzClient from "./MainzClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur Mainz | SeoForge – BioNTech, Medien & Wein",
  description:
    "SeoForge ist Ihre SEO Agentur in Mainz. BioNTech-Standort, ZDF, Gutenberg-Universität und Rheinhessens Weinwirtschaft — wir entwickeln SEO für Mainzs einzigartige Branchenmischung.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seoforge.de/standorte/seo-agentur-mainz",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Mainz",
  description:
    "SEO für Life-Sciences-Unternehmen, Medienbranche, Weinwirtschaft und Mittelstand in Mainz, der Landeshauptstadt von Rheinland-Pfalz.",
  url: "https://seoforge.de/standorte/seo-agentur-mainz",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mainz",
    postalCode: "55116",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Mainz",
  },
  telephone: "+4915203450695",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Mainz als SEO-Standort besonders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mainz vereint außergewöhnliche Faktoren: BioNTech als global bekannter mRNA-Pionier hat hier seinen Hauptsitz und hat Mainz international bekannt gemacht. ZDF und SWR setzen Content-Standards. Die Gutenberg-Universität (gegründet 1477) bringt 32.000 Studierende. Rheinhessen ist Deutschlands größtes Weinanbaugebiet. Diese Diversität schafft vielfältige SEO-Chancen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Mainzer Life-Sciences-Unternehmen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Life-Sciences-SEO erfordert E-E-A-T-konformen Content, der wissenschaftliche Autorität aufbaut ohne regulatorische Grenzen zu verletzen. Wir entwickeln Strategien für das BioNTech-Umfeld, Pharma-Unternehmen und Biotech-Startups — mit präzisen Fachbegriffen, die Investoren, Fachkräfte und internationale Partner ansprechen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert SEO in Mainz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive Life-Sciences- und Medien-Keywords entwickeln sich in der Regel in 3–6 Monaten. Die starke Rhein-Main-Suchnachfrage erleichtert schnelle Gewinne bei lokalen Keywords.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch Unternehmen in der Rhein-Main-Region?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Mainz ist Teil der 5,8-Millionen-Metropolregion Rhein-Main. Wir entwickeln regionale SEO-Strategien, die Mainz, Frankfurt und das gesamte Rhein-Main-Gebiet erschließen — ideal für Unternehmen, die regional wachsen wollen.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen Agenturen in Mainz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir arbeiten ohne Vertragszwang und kennen Mainz: den BioNTech-Effekt, die Medienbranche am ZDF-Standort, Rheinhessens Weinwirtschaft. Keine Standardpakete, sondern Strategien für Mainzs einzigartige Branchen-Kombination. Transparente Berichte inklusive.",
      },
    },
  ],
};

export default function MainzPage() {
  const articleHtml = readFileSync(
    join(process.cwd(), "content/mainz-article.html"),
    "utf8"
  );
  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MainzClient articleHtml={articleHtml} />
    </SubpageLayout>
  );
}
