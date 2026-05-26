import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Design | UI/UX für Web-Applikationen",
  description:
    "App Design von SeoForge: Professionelles UI/UX für Web-Apps. Nutzerfreundlich, modern und technisch sauber — von der Konzeption bis zur fertigen Oberfläche.",
  alternates: { canonical: "https://seoforge.de/webdesign/app-design" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
