import type { Metadata } from "next";
import ContentStrategieClient from "./ContentStrategieClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Content Strategie — Topic Clusters & Keyword-Architektur | SeoForge",
  description:
    "SEO Content Strategie von SeoForge: Topic Cluster Aufbau, Keyword Mapping und Redaktionskalender für nachhaltige Topical Authority und dauerhafte Rankings.",
  alternates: { canonical: "https://seoforge.de/seo/content-strategie" },
};

export default function Page() {
  return <ContentStrategieClient />;
}
