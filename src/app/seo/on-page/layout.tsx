import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "On Page SEO | Technik, Content & UX als System",
  description:
    "Ganzheitliches On Page SEO von SeoForge: Technik, Content und UX als System. Nachhaltige Rankings entstehen, wenn alle drei Säulen zusammenspielen.",
  alternates: { canonical: "https://seoforge.de/seo/on-page" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
