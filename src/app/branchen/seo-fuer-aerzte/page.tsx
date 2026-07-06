import type { Metadata } from "next";
import BranchenDetailClient from "../BranchenDetailClient";
import { branchen } from "../branchenData";

export const dynamic = "force-static";

const branche = branchen.find((b) => b.slug === "seo-fuer-aerzte")!;

export const metadata: Metadata = {
  title: "SEO für Ärzte — Praxis sichtbar bei Google | SeoForge",
  description:
    "Patienten googeln Symptome und Behandlungen — nicht Ihren Praxisnamen. Wir sorgen dafür, dass Ihre Praxis in Google und KI-Suchen wie ChatGPT erscheint.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://seoforge.de/branchen/seo-fuer-aerzte" },
};

export default function SeoFuerAerztePage() {
  return <BranchenDetailClient branche={branche} />;
}
