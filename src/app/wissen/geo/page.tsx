import type { Metadata } from "next";
import WissenPillarPage from "../WissenPillarPage";
import type { PillarCluster } from "../WissenPillarPage";

export const metadata: Metadata = {
  title: "GEO & KI-Suche: ChatGPT, Perplexity & AI Overviews | Wissen — SeoForge",
  description:
    "Generative Engine Optimization verständlich erklärt. Wie Sie in ChatGPT, Perplexity und Google AI Overviews sichtbar werden.",
  alternates: { canonical: "https://seoforge.de/wissen/geo" },
};

const cluster: PillarCluster = {
  key: "geo",
  label: "GEO & KI-Suche",
  h1: "GEO & KI-Suche: Sichtbarkeit in der nächsten Suchgeneration",
  color: "bg-violet-50 text-violet-700 border-violet-200",
  dotColor: "bg-violet-500",
  leistungHref: "/geo",
  description:
    "Generative Engine Optimization — Sichtbarkeit in ChatGPT, Perplexity und Google AI Overviews. Der nächste Schritt nach klassischem SEO.",
  topics: ["Was ist GEO", "Google AI Overviews", "E-E-A-T", "ChatGPT & Perplexity", "Strukturierte Daten für KI"],
  articles: [
    {
      title: "Was ist GEO? Generative Engine Optimization erklärt",
      excerpt:
        "Der nächste Schritt nach klassischem SEO — was GEO bedeutet und warum es jetzt relevant wird.",
      readTime: "8 Min.",
      slug: "was-ist-geo",
    },
    {
      title: "Google AI Overviews: Was Unternehmen jetzt wissen müssen",
      excerpt:
        "Wie AI Overviews funktionieren und wie Sie darin erscheinen.",
      readTime: "9 Min.",
      slug: "google-ai-overviews",
    },
    {
      title: "E-E-A-T: Expertise, Erfahrung, Autorität, Vertrauen",
      excerpt:
        "Wie Google und KI-Systeme Vertrauen bewerten — und wie Sie Signale stärken.",
      readTime: "10 Min.",
      slug: "e-e-a-t",
    },
    {
      title: "ChatGPT & Perplexity: Sichtbarkeit in KI-Suchen",
      excerpt:
        "Wie KI-Assistenten Quellen auswählen und wie Sie als Antwort erscheinen.",
      readTime: "8 Min.",
      slug: "chatgpt-perplexity-sichtbarkeit",
    },
    {
      title: "Strukturierte Daten für KI-Suchmaschinen",
      excerpt:
        "Welche Schema-Typen KI-Systeme bevorzugen und wie Sie diese implementieren.",
      readTime: "11 Min.",
      slug: "strukturierte-daten-ki",
    },
  ],
};

export default function GEOPillarPage() {
  return <WissenPillarPage cluster={cluster} />;
}
