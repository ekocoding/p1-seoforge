import type { Metadata } from "next";
import SeoTexteClient from "./SeoTexteClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Texte — Keyword-optimiert & lesenswert",
  description:
    
    "SeoForge schreibt SEO-Texte mit E-E-A-T-Fokus, Suchintention und Keyword-Strategie — für Websites, Blogs und Online-Shops die dauerhaft top performen.",
  alternates: { canonical: "https://seoforge.de/seo/texte" },
};

export default function Page() {
  return <SeoTexteClient />;
}
