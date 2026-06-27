import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import SubpageLayout from "../../components/SubpageLayout";
import DarmstadtClient from "./DarmstadtClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur Darmstadt | SeoForge – IT, Life Sciences & Wissenschaftsstadt",
  description:
    "SeoForge ist Ihre SEO Agentur in Darmstadt. TU Darmstadt, ESOC, Merck KGaA — wir kennen die Wissenschaftsstadt und entwickeln SEO für Tech-Startups, Pharma und Forschung.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seoforge.de/standorte/seo-agentur-darmstadt",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Darmstadt",
  description:
    "SEO für IT-Startups, Life Sciences, Pharma und Forschungseinrichtungen in Darmstadt, der Wissenschaftsstadt.",
  url: "https://seoforge.de/standorte/seo-agentur-darmstadt",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Darmstadt",
    postalCode: "64283",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Darmstadt",
  },
  telephone: "+4915129547343",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Darmstadt als SEO-Standort besonders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Darmstadt vereint außergewöhnliche Faktoren: TU Darmstadt als führende Forschungsuniversität, das ESOC als Europäisches Raumfahrtzentrum, Merck KGaA als weltältestes Pharma-Chemieunternehmen und über 160.000 Einwohner mit Nähe zum Rhein-Main-Gebiet. Dieser wissensintensive Markt schafft intensiven Wettbewerb um Fachkräfte, Kunden und digitale Sichtbarkeit.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge TU-Darmstadt-Spin-offs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TU-Spin-offs haben oft herausragende Technologien, aber keine digitale Sichtbarkeit. Wir entwickeln Product-led SEO mit technisch präzisem Content, der Nischen-Autorität aufbaut und Investoren, Partner und erste Kunden anspricht. Der Fokus liegt auf Long-Tail-Keywords mit hoher Conversion-Wahrscheinlichkeit.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert SEO in Darmstadt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive Tech-Keywords entwickeln sich in der Regel in 3–6 Monaten. Darmstadts wissensintensiver Markt belohnt tiefe Nischen-Expertise schneller als breite Keyword-Targeting-Strategien.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch Unternehmen in der Rhein-Main-Region?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Darmstadts Nähe zu Frankfurt macht viele Darmstädter Unternehmen de facto zu Rhein-Main-Playern. Wir entwickeln regionale SEO-Strategien, die sowohl Darmstadts Wissenschaftsstadt-Image als auch die Rhein-Main-Metropolregion strategisch erschließen.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen Agenturen in Darmstadt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir arbeiten ohne Vertragszwang und erstellen Berichte, die Sie wirklich verstehen. Entscheidend: Wir kennen das Darmstädter Tech-Ökosystem — TU-Spin-off-Kultur, Life-Sciences-Markt, die spezifischen B2B-Zielgruppen. Keine Standardpakete, sondern Strategien für Ihren konkreten Wissenschaftsmarkt.",
      },
    },
  ],
};

export default function DarmstadtPage() {
  const articleHtml = readFileSync(
    join(process.cwd(), "content/darmstadt-article.html"),
    "utf8"
  );
  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DarmstadtClient articleHtml={articleHtml} />
    </SubpageLayout>
  );
}
