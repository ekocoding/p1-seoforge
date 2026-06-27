import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import SubpageLayout from "../../components/SubpageLayout";
import FreiburgClient from "./FreiburgClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur Freiburg | SeoForge – Cleantech, Tourismus & Universität",
  description:
    "SeoForge ist Ihre SEO Agentur in Freiburg. Europas Solarhauptstadt, Schwarzwald-Tor und Uni-Stadt seit 1457 — wir entwickeln SEO für Cleantech, Tourismus und Wissenschaft.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seoforge.de/standorte/seo-agentur-freiburg",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Freiburg",
  description:
    "SEO für Cleantech-Unternehmen, Tourismus, Forschungseinrichtungen und Mittelstand in Freiburg im Breisgau.",
  url: "https://seoforge.de/standorte/seo-agentur-freiburg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Freiburg im Breisgau",
    postalCode: "79098",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Freiburg im Breisgau",
  },
  telephone: "+4915129547343",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Freiburg als SEO-Standort einzigartig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Freiburg vereint außergewöhnliche Faktoren: Europas Solarhauptstadt mit Fraunhofer ISE als weltgrößtem Solarforschungsinstitut, die Albert-Ludwigs-Universität mit 25.000 Studierenden (gegründet 1457), Schwarzwald-Tourismus mit 6+ Millionen Übernachtungen jährlich und das Green-City-Image als authentisches Nachhaltigkeitsmerkmal. Diese Vielfalt schafft ein einzigartiges SEO-Potential.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Freiburger Cleantech-Unternehmen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cleantech-SEO in Freiburg erfordert international ausgerichteten technischen Content, der Investoren, Partner und Fachkräfte weltweit anspricht. Wir entwickeln B2B-SEO-Strategien mit präzisen Fachbegriffen, strukturierten Daten für komplexe Technologien und E-E-A-T-Signalen, die Freiburgs Solarhauptstadt-Status als Autorität nutzen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert SEO in Freiburg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive Cleantech- und Tourismus-Keywords entwickeln sich in der Regel in 3–6 Monaten. Freiburgs starkes regionales Suchvolumen erleichtert schnelle Gewinne bei lokalen Keywords.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch Tourismus in der Schwarzwaldregion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Schwarzwald-Tourismus ist ein starkes regionales SEO-Thema. Wir entwickeln Local-SEO-Strategien für Hotels, Pensionen und Ausflugsziele in Freiburg und dem gesamten Schwarzwald — inklusive Tourismus-Keywords, Google Business-Optimierung und saisonaler Content-Planung.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen Agenturen in Freiburg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir arbeiten ohne Vertragszwang und verstehen Freiburgs besondere Märkte: Cleantech, Wissenschaft, Tourismus. Keine generischen Pakete, sondern Strategien, die Freiburgs Green-City-DNA und akademische Kultur als Wettbewerbsvorteil nutzen. Transparente Berichte inklusive.",
      },
    },
  ],
};

export default function FreiburgPage() {
  const articleHtml = readFileSync(
    join(process.cwd(), "content/freiburg-article.html"),
    "utf8"
  );
  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FreiburgClient articleHtml={articleHtml} />
    </SubpageLayout>
  );
}
