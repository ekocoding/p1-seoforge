import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { articles } from "./wissen/data/articles";

const BASE = "https://seoforge.de";

// Routes excluded from the sitemap (noindex pages)
const EXCLUDE = ["/impressum", "/datenschutz"];

function walk(appDir: string, rel = ""): string[] {
  const absDir = rel ? path.join(appDir, rel) : appDir;
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(absDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const routes: string[] = [];

  if (rel && entries.some((e) => e.isFile() && e.name === "page.tsx")) {
    const route = "/" + rel.replace(/\\/g, "/");
    const excluded = EXCLUDE.some(
      (ex) => route === ex || route.startsWith(ex + "/")
    );
    if (!excluded) routes.push(route);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    // Skip route groups, private folders, component/utility folders, dynamic segments
    if (
      name.startsWith("(") ||
      name.startsWith("_") ||
      name.startsWith("[") ||
      name === "components" ||
      name === "api" ||
      name === "data"
    )
      continue;
    routes.push(...walk(appDir, rel ? `${rel}/${name}` : name));
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), "src/app");
  const staticRoutes = ["/", ...walk(appDir)];

  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/wissen/${a.type}/${a.slug}`,
    lastModified: new Date(a.lastUpdated),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((url) => {
      const depth = url.split('/').filter(Boolean).length;
      const priority = depth === 0 ? 1.0 : depth === 1 ? 0.8 : depth === 2 ? 0.7 : 0.6;
      return {
        url: `${BASE}${url}`,
        lastModified: new Date(),
        changeFrequency: depth <= 1 ? 'weekly' as const : 'monthly' as const,
        priority,
      };
    }),
    ...articleUrls,
  ];
}
