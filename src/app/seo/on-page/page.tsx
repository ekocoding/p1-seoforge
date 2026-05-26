import type { Metadata } from "next";
import OnPageSeoClient from "./OnPageSeoClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "On-Page SEO — Technik, Content & UX als System | SeoForge",
  description:
    "On-Page SEO von SeoForge: technisches Fundament, semantische Content-Optimierung und UX. Alle Seitenfaktoren zusammen optimiert für maximale Sichtbarkeit.",
  alternates: { canonical: "https://seoforge.de/seo/on-page" },
};

export default function Page() {
  return <OnPageSeoClient />;
}
