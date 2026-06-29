import type { Metadata } from "next";
import Script from "next/script";
import KiSeoAgenturClient from "./KiSeoAgenturClient";
import { FAQ_ITEMS } from "./data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "KI-SEO-Agentur — Sichtbarkeit in ChatGPT & Perplexity | SeoForge",
  description:
    "Ihre Marke in ChatGPT, Perplexity und Google AI Overviews etablieren. KI-SEO-Beratung von SeoForge — technisch fundiert, messbar, ohne leere Versprechen.",
  alternates: { canonical: "https://seoforge.de/ki-seo-agentur" },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SeoForge — KI-SEO-Agentur",
  url: "https://seoforge.de/ki-seo-agentur",
  description:
    "KI-SEO-Agentur für Marken-Sichtbarkeit in ChatGPT, Perplexity und Google AI Overviews: Entitätsaufbau, zitierfähiger Content, digitale PR und KI-Sichtbarkeits-Monitoring.",
  areaServed: "DE",
  serviceType: "KI-SEO / Generative Engine Optimization",
  provider: {
    "@type": "Organization",
    name: "SeoForge",
    url: "https://seoforge.de",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <Script
        id="kiseo-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id="kiseo-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <KiSeoAgenturClient />
    </>
  );
}
