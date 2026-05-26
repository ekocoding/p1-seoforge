import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "On Page Optimierung | Meta-Tags, Headings & Speed",
  description:
    "On Page Optimierung von SeoForge: Meta-Tags, Headings, interne Links und Core Web Vitals — systematisch optimiert für Score 96+. Direkte Umsetzung im CMS.",
  alternates: { canonical: "https://seoforge.de/seo/on-page-optimierung" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
