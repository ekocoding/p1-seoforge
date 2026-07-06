import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-handwerker")!;

export const metadata: Metadata = {
  title: "SEO für Handwerker — lokal gefunden werden | SeoForge",
  description:
    "Kunden suchen „Handwerker in meiner Nähe“. Wir sorgen dafür, dass Ihr Betrieb in Google und auf Google Maps gefunden wird — ohne Provisionen an Portale.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-handwerker" },
};

export default function SeoFuerHandwerkerPage() {
  return <BranchenDetailClient branche={branche} />;
}
