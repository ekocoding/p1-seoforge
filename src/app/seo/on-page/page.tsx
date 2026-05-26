import type { Metadata } from "next";
import OnPageSeoClient from "./OnPageSeoClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "On-Page SEO — Technik, Content & UX vereint | SeoForge",
  description:
    
    "Alle Faktoren in einem Zug: SeoForge optimiert Technik, Content und UX — damit Google und Nutzer Ihre Seite gleichermaßen als relevant erkennen.",
  alternates: { canonical: "https://seoforge.de/seo/on-page" },
};

export default function Page() {
  return <OnPageSeoClient />;
}
