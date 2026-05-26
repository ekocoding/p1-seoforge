import type { Metadata } from "next";
import SeoTexteClient from "./SeoTexteClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Texte — Content der rankt und konvertiert | SeoForge",
  description:
    "Professionelle SEO-Texte von SeoForge: keyword-integriert, suchintentionsorientiert und E-E-A-T-konform. Für Websites, Blogs und Produktseiten.",
  alternates: { canonical: "https://seoforge.de/seo/texte" },
};

export default function Page() {
  return <SeoTexteClient />;
}
