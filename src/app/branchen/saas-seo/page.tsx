import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "saas-seo")!;

export const metadata: Metadata = {
  title: "SaaS SEO — sichtbar in Google & KI-Suche | SeoForge",
  description:
    "B2B-Einkäufer vergleichen Software über Google und fragen ChatGPT nach Empfehlungen. Wir bauen Sichtbarkeit auf, die in beiden Suchwelten funktioniert.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/saas-seo" },
};

export default function SaasSeoPage() {
  return <BranchenDetailClient branche={branche} />;
}
