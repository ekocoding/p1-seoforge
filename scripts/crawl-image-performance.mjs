import { chromium } from "playwright";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:3000";
const showAll = process.argv.includes("--all");
const routeArgs = process.argv.slice(3).filter((arg) => !arg.startsWith("--"));

async function discoverRoutes() {
  if (routeArgs.length) return routeArgs;
  const response = await fetch(new URL("/sitemap.xml", baseUrl));
  if (!response.ok) throw new Error(`Sitemap failed with HTTP ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => {
    const url = new URL(match[1]);
    return `${url.pathname}${url.search}`;
  });
}

const routes = [...new Set(await discoverRoutes())];
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const queue = [...routes];
const results = [];

async function auditRoute() {
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__seoForgeLcp = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__seoForgeLcp.push({
          startTime: Math.round(entry.startTime),
          size: entry.size,
          url: entry.url || null,
          tag: entry.element?.tagName ?? null,
        });
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });

  while (queue.length) {
    const route = queue.shift();
    try {
      const response = await page.goto(new URL(route, baseUrl).href, {
        waitUntil: "domcontentloaded",
        timeout: 45_000,
      });
      await page.waitForTimeout(700);
      const lcp = await page.evaluate(() => window.__seoForgeLcp.at(-1) ?? null);

      await page.evaluate(async () => {
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - innerHeight);
        const steps = Math.min(14, Math.max(1, Math.ceil(maxScroll / innerHeight)));
        for (let step = 1; step <= steps; step += 1) {
          scrollTo(0, (maxScroll * step) / steps);
          await new Promise((resolve) => setTimeout(resolve, 70));
        }
      });
      await page.waitForTimeout(350);

      const data = await page.evaluate(() => {
        const transfers = performance
          .getEntriesByType("resource")
          .filter((entry) =>
            /\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?|$)|\/_next\/image\?/.test(entry.name),
          )
          .map((entry) => ({
            url: entry.name,
            kb: Math.round(entry.transferSize / 1024),
            durationMs: Math.round(entry.duration),
            initiatorType: entry.initiatorType,
          }))
          .sort((a, b) => b.kb - a.kb);

        const images = [...document.images].map((image) => {
          const rect = image.getBoundingClientRect();
          return {
            src: image.currentSrc || image.src,
            alt: image.alt,
            loading: image.loading || "auto",
            fetchPriority: image.fetchPriority || "auto",
            broken: image.complete && image.naturalWidth === 0,
            aboveFoldNow: rect.top < innerHeight && rect.bottom > 0,
          };
        });

        return {
          imageTransferKb: transfers.reduce((sum, entry) => sum + entry.kb, 0),
          largestTransferKb: transfers[0]?.kb ?? 0,
          transfersOver150Kb: transfers.filter((entry) => entry.kb > 150),
          brokenImages: images.filter((image) => image.broken),
        };
      });

      results.push({
        route,
        status: response?.status() ?? null,
        lcp,
        ...data,
      });
    } catch (error) {
      results.push({ route, error: error instanceof Error ? error.message : String(error) });
    }
  }
  await page.close();
}

await Promise.all(Array.from({ length: Math.min(4, routes.length) }, () => auditRoute()));
await context.close();
await browser.close();

const offenders = results.filter(
  (result) =>
    result.error ||
    result.status !== 200 ||
    result.largestTransferKb > 150 ||
    result.imageTransferKb > 1_000 ||
    result.brokenImages?.length,
);

console.log(
  JSON.stringify(
    {
      summary: {
        routes: results.length,
        non200: results.filter((result) => result.status !== 200).length,
        brokenImages: results.reduce((sum, result) => sum + (result.brokenImages?.length ?? 0), 0),
        routesWithImageOver150Kb: results.filter((result) => result.largestTransferKb > 150).length,
        routesOver1MbImages: results.filter((result) => result.imageTransferKb > 1_000).length,
      },
      routes: showAll ? results : offenders,
    },
    null,
    2,
  ),
);
