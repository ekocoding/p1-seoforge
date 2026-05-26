import type { Metadata } from "next";
import SeoSelbstMachenClient from "./SeoSelbstMachenClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO selbst machen — Der ehrliche SeoForge-Guide",
  description:
    
    "SeoForge zeigt ehrlich, wie SEO wirklich funktioniert: Keyword-Recherche, Technik, Content — Schritt für Schritt, ohne verstecktes Verkaufspitch.",
  alternates: { canonical: "https://seoforge.de/seo/selbst-machen" },
};

export default function Page() {
  return <SeoSelbstMachenClient />;
}
