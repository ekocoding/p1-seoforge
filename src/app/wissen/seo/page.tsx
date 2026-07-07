import type { Metadata } from "next";
import WissenPillarPage from "../WissenPillarPage";
import type { PillarCluster } from "../WissenPillarPage";

export const metadata: Metadata = {
  title: "SEO Grundlagen & Strategie",
  description:
    "Alles über SEO-Grundlagen, Kosten, Agenturwahl und Strategie. Kostenlose Guides von SEO-Experten für Unternehmen.",
  alternates: { canonical: "https://seoforge.de/wissen/seo" },
};

const cluster: PillarCluster = {
  key: "seo",
  label: "SEO",
  h1: "SEO Grundlagen & Strategie",
  color: "bg-primary/10 text-primary border-primary/20",
  dotColor: "bg-primary",
  leistungHref: "/seo",
  description:
    "SEO-Grundlagen, Kosten, Strategie und Entscheidungshilfen für Unternehmen. Verstehen, was hinter Google-Rankings steckt — und wie man sie nachhaltig verbessert.",
  topics: ["SEO Kosten", "Agentur vs. Freelancer", "SEO Grundlagen", "Google Ads Vergleich", "Zeitrahmen"],
  articles: [
    {
      title: "Was ist SEO? Der komplette Guide",
      excerpt:
        "Suchmaschinenoptimierung verständlich erklärt — von der Funktionsweise bis zur Strategie.",
      readTime: "10 Min.",
      slug: "was-ist-seo",
    },
    {
      title: "SEO Kosten: Was kostet professionelle Optimierung?",
      excerpt:
        "Preise, Budgetrahmen und worauf Sie bei der Auswahl einer SEO-Agentur achten sollten.",
      readTime: "8 Min.",
      slug: "seo-kosten",
    },
    {
      title: "SEO Agentur vs. Freelancer: Was ist das Richtige?",
      excerpt:
        "Ein ehrlicher Vergleich — wann welche Option sinnvoll ist.",
      readTime: "7 Min.",
      slug: "seo-agentur-vs-freelancer",
    },
    {
      title: "SEO vs. Google Ads: Der direkte Vergleich",
      excerpt:
        "Langfristige Sichtbarkeit oder sofortige Reichweite? Beide Kanäle im Vergleich.",
      readTime: "9 Min.",
      slug: "seo-vs-google-ads",
    },
    {
      title: "Wie lange dauert SEO? Realistische Zeitrahmen",
      excerpt:
        "Was in 3 Monaten möglich ist — und was nicht. Erwartungen richtig setzen.",
      readTime: "6 Min.",
      slug: "wie-lange-dauert-seo",
    },
  ],
};

export default function SEOPillarPage() {
  return <WissenPillarPage cluster={cluster} />;
}
