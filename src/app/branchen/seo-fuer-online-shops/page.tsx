import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-online-shops")!;

export const metadata: Metadata = {
  title: "SEO für Online-Shops: Kategorien, die ranken",
  description:
    "Shop-SEO gegen steigende Ads-Kosten: saubere Struktur, starke Kategorieseiten, Crawling-Budget im Griff. Jetzt kostenlosen Shop-Check anfordern.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-online-shops" },
};

export default function SeoFuerOnlineShopsPage() {
  return <BranchenDetailClient branche={branche} />;
}
