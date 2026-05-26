import type { Metadata } from "next";
import SeoSelbstMachenClient from "./SeoSelbstMachenClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO selbst machen — Schritt-für-Schritt Guide | SeoForge",
  description:
    "Schritt-für-Schritt SEO Guide von SeoForge: Keyword-Recherche, technische Basis, Content-Erstellung und erste Backlinks. Ehrlich, praxisnah, umsetzbar.",
  alternates: { canonical: "https://seoforge.de/seo/selbst-machen" },
};

export default function Page() {
  return <SeoSelbstMachenClient />;
}
