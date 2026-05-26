import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Relaunch | Neue Performance ohne Ranking-Verlust",
  description:
    "Website Relaunch von SeoForge: Technische Modernisierung und neues Design — ohne Rankings zu verlieren. Redirect-Mapping, SEO-Sicherung und saubere Migration.",
  alternates: { canonical: "https://seoforge.de/webdesign/website-relaunch" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
