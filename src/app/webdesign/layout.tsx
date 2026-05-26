import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webdesign | Professionelle Websites die performen",
  description:
    "Webdesign von SeoForge: SEO-optimierte Websites, Landing Pages, Relaunch und App-Design. Schnell, conversion-stark und technisch auf dem neuesten Stand.",
  alternates: { canonical: "https://seoforge.de/webdesign" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
