import type { Metadata } from "next";
import WebsiteRelaunchClient from "./WebsiteRelaunchClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Website Relaunch — Modernes Design ohne Ranking-Verlust | SeoForge",
  description:
    "Website Relaunch von SeoForge: modernes Design, optimierte UX und SEO-sicherer Umzug ohne Ranking-Verluste. Strategisch geplant, professionell umgesetzt.",
  alternates: { canonical: "https://seoforge.de/webdesign/website-relaunch" },
};

export default function Page() {
  return <WebsiteRelaunchClient />;
}
