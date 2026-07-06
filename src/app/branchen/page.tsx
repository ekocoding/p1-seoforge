import type { Metadata } from "next";
import BranchenClient from "./BranchenClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "SEO nach Branche — Ärzte, Anwälte, Shops & mehr | SeoForge",
  description:
    "SEO-Strategien nach Branche: Ärzte, Anwälte, Online-Shops, Handwerker, Immobilienmakler & SaaS — zugeschnitten auf Suchverhalten und Wettbewerb.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen" },
};

export default function BranchenPage() {
  return <BranchenClient />;
}
