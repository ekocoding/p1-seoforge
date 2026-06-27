import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import SubpageLayout from "../../components/SubpageLayout";
import WiesbadenClient from "./WiesbadenClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Agentur Wiesbaden | SeoForge – Versicherung, IT & Rheingau",
  description:
    "SeoForge ist Ihre SEO Agentur in Wiesbaden. R+V Versicherung, Destatis, Kurstadt-Image und Rheingau-Weinregion — wir entwickeln Premium-SEO für Hessens Landeshauptstadt.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://seoforge.de/standorte/seo-agentur-wiesbaden",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SeoForge – SEO Agentur Wiesbaden",
  description:
    "SEO für Versicherungen, IT-Unternehmen, Immobilien und Tourismus in Wiesbaden, der Landeshauptstadt von Hessen.",
  url: "https://seoforge.de/standorte/seo-agentur-wiesbaden",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Wiesbaden",
    postalCode: "65183",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Wiesbaden",
  },
  telephone: "+4915129547343",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was macht Wiesbaden als SEO-Standort besonders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wiesbaden vereint außergewöhnliche Faktoren: Destatis und BKA als Bundesbehörden, R+V Versicherung mit 4.800 Mitarbeitern vor Ort, das elegante Kurstadt-Image mit Kurhaus und Thermalbädern, die Nähe zu Frankfurt (20 km) und der Rheingau als Premiumweinregion. Diese Kombination schafft einen anspruchsvollen, aber ertragreichen SEO-Markt.",
      },
    },
    {
      "@type": "Question",
      name: "Wie hilft SeoForge Wiesbadener Finanz- und Versicherungsunternehmen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finanz- und Versicherungs-SEO erfordert YMYL-konformen Content, der E-E-A-T-Standards erfüllt und gleichzeitig Entscheider und Privatkunden anspricht. Wir entwickeln Strategien für Versicherungsmakler, Finanzberater und FinTechs im Wiesbadener Markt — Compliance-konform und suchmaschinenoptimiert.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert SEO in Wiesbaden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Erste Verbesserungen bei technischem SEO und Local SEO sind oft nach 4–8 Wochen messbar. Nachhaltige Rankings für wettbewerbsintensive Finanz- und Immobilien-Keywords entwickeln sich in der Regel in 3–6 Monaten. Die starke Rhein-Main-Suchnachfrage erleichtert schnelle Gewinne bei lokalen Keywords.",
      },
    },
    {
      "@type": "Question",
      name: "Betreut SeoForge auch Unternehmen in der Rhein-Main-Region?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Wiesbadens Nähe zu Frankfurt (20 km) und die Rhein-Main-Metropolregion mit 5,8 Millionen Menschen sind strategisch wichtige Märkte. Wir entwickeln regionale Strategien, die Wiesbaden als Premium-Standort positionieren und gleichzeitig die gesamte Metropolregion erschließen.",
      },
    },
    {
      "@type": "Question",
      name: "Was unterscheidet SeoForge von anderen Agenturen in Wiesbaden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir arbeiten ohne Vertragszwang und kennen Wiesbadens Märkte: YMYL-konforme Finanz-Inhalte, Premium-Positionierung für die Kurstadt, Rheingau-SEO für Weinregion. Keine Standardpakete, sondern Strategien für Wiesbadens einzigartigen Premium-Markt. Transparente Berichte inklusive.",
      },
    },
  ],
};

export default function WiesbadenPage() {
  const articleHtml = readFileSync(
    join(process.cwd(), "content/wiesbaden-article.html"),
    "utf8"
  );
  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <WiesbadenClient articleHtml={articleHtml} />
    </SubpageLayout>
  );
}
