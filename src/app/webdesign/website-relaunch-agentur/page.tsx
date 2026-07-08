import type { Metadata } from "next";
import WebsiteRelaunchClient from "./WebsiteRelaunchClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Website-Relaunch Agentur — ohne Ranking-Verlust",
  description:
    "Website-Relaunch Agentur SeoForge: modernes Design, optimierte UX und SEO-sicherer Umzug ohne Ranking-Verluste — strategisch geplant, professionell umgesetzt.",
  alternates: { canonical: "https://seoforge.de/webdesign/website-relaunch-agentur" },
};

export default function Page() {
  return <WebsiteRelaunchClient />;
}
