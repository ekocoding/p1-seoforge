import type { Metadata } from "next";
import WebdesignClient from "./WebdesignClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Webdesign Agentur — Websites die konvertieren | SeoForge",
  description:
    "Professionelles Webdesign von SeoForge: responsive Websites, Landing Pages, Relaunch und App Design — SEO-first, schnell und conversion-optimiert.",
  alternates: { canonical: "https://seoforge.de/webdesign" },
};

export default function Page() {
  return <WebdesignClient />;
}
