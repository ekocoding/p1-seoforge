import type { Metadata } from "next";
import SeoHubClient from "./SeoHubClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Leistungen — Beratung, Audit & Optimierung | SeoForge",
  description:
    "Alle SEO-Leistungen von SeoForge: Audit, Beratung, Betreuung, Content-Strategie, On-Page Optimierung und Shop SEO. Strukturiert. Nachhaltig.",
  alternates: { canonical: "https://seoforge.de/seo" },
};

export default function Page() {
  return <SeoHubClient />;
}
