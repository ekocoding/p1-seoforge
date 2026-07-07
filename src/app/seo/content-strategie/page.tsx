import type { Metadata } from "next";
import ContentStrategieClient from "./ContentStrategieClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Content Strategie — Topical Authority",
  description:
    
    "SeoForge entwickelt Content-Strategien mit System: Topic Cluster, Keyword Mapping, Redaktionsplan — für Topical Authority die dauerhaft rankfähig bleibt.",
  alternates: { canonical: "https://seoforge.de/seo/content-strategie" },
};

export default function Page() {
  return <ContentStrategieClient />;
}
