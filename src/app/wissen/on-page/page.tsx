import type { Metadata } from "next";
import WissenPillarPage from "../WissenPillarPage";
import type { PillarCluster } from "../WissenPillarPage";

export const metadata: Metadata = {
  title: "On-Page SEO: Title Tags, Meta, Content & Struktur | Wissen — SeoForge",
  description:
    "Alles über On-Page SEO: Title Tags, Meta Descriptions, interne Verlinkung, Duplicate Content und Keyword-Recherche. Praxisnahe Guides.",
  alternates: { canonical: "https://seoforge.de/wissen/on-page" },
};

const cluster: PillarCluster = {
  key: "on-page",
  label: "On-Page SEO",
  h1: "On-Page SEO: Alles was auf der Seite zählt",
  color: "bg-secondary/10 text-secondary border-secondary/20",
  dotColor: "bg-secondary",
  leistungHref: "/seo/on-page-optimierung",
  description:
    "Title Tags, Meta Descriptions, Struktur und Content — alles was direkt auf der Seite passiert und Google signalisiert, wofür Ihre Seite relevant ist.",
  topics: ["Title Tags", "Meta Descriptions", "Interne Verlinkung", "Duplicate Content", "Keyword-Recherche"],
  articles: [
    {
      title: "Title Tags richtig optimieren",
      excerpt:
        "Wie der wichtigste On-Page-Faktor funktioniert und wie Sie ihn korrekt einsetzen.",
      readTime: "7 Min.",
      slug: "title-tags-optimieren",
    },
    {
      title: "Meta Descriptions: Best Practices 2026",
      excerpt: "Was Meta Descriptions leisten können — und was nicht.",
      readTime: "5 Min.",
      slug: "meta-descriptions",
    },
    {
      title: "Interne Verlinkung: Strategie und Umsetzung",
      excerpt:
        "Wie interne Links PageRank verteilen und die Crawlbarkeit verbessern.",
      readTime: "9 Min.",
      slug: "interne-verlinkung",
    },
    {
      title: "Duplicate Content: Ursachen und Lösungen",
      excerpt:
        "Canonicals, Weiterleitungen und Content-Konsolidierung — praxisnah erklärt.",
      readTime: "8 Min.",
      slug: "duplicate-content",
    },
    {
      title: "Keyword-Recherche: Methoden und Tools",
      excerpt:
        "Von Suchvolumen bis Suchintention — wie Sie die richtigen Keywords finden.",
      readTime: "11 Min.",
      slug: "keyword-recherche",
    },
  ],
};

export default function OnPagePillarPage() {
  return <WissenPillarPage cluster={cluster} />;
}
