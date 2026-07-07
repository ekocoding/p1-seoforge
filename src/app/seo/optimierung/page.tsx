import type { Metadata } from "next";
import SeoOptimierungClient from "./SeoOptimierungClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "SEO Optimierung — Technik, Content & Struktur",
  description:
    
    "SeoForge optimiert ganzheitlich: Core Web Vitals, On-Page und Content — systematisch priorisiert für messbare Rankings und mehr organischen Traffic.",
  alternates: { canonical: "https://seoforge.de/seo/optimierung" },
};

export default function Page() {
  return <SeoOptimierungClient />;
}
