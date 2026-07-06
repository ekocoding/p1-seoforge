import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "saas-seo")!;

export const metadata: Metadata = {
  title: "SaaS SEO: Sichtbar in Google & ChatGPT | SeoForge",
  description:
    "Problem-Keywords, Vergleichsseiten & GEO für KI-Empfehlungen — SaaS SEO für den DACH-Markt. Kostenlose GEO- und SEO-Analyse anfragen.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/saas-seo" },
};

export default function SaasSeoPage() {
  return <BranchenDetailClient branche={branche} />;
}
