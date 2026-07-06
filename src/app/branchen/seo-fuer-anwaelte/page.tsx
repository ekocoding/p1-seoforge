import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-anwaelte")!;

export const metadata: Metadata = {
  title: "SEO für Anwälte — Kanzlei-Sichtbarkeit | SeoForge",
  description:
    "Mandanten googeln ihr Problem, nie einen Paragrafen. Wir bauen Kanzlei-Sichtbarkeit dort auf, wo Klicks am teuersten und Rankings am wertvollsten sind.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-anwaelte" },
};

export default function SeoFuerAnwaeltePage() {
  return <BranchenDetailClient branche={branche} />;
}
