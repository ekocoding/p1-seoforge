import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-online-shops")!;

export const metadata: Metadata = {
  title: "SEO für Online-Shops — Seiten, die verkaufen | SeoForge",
  description:
    "Jeder Klick auf Ads kostet Marge — organische Rankings bringen Kunden ohne Klickkosten. Wir bringen Struktur in Ihren Shop, damit Google ihn versteht.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-online-shops" },
};

export default function SeoFuerOnlineShopsPage() {
  return <BranchenDetailClient branche={branche} />;
}
