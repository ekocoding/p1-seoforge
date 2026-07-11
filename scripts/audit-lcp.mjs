import { chromium } from "playwright";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:3000";
const routes = process.argv.slice(3).length
  ? process.argv.slice(3)
  : ["/", "/geo", "/geo-agentur", "/webdesign"];

const viewports = [
  { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2 },
];

const browser = await chromium.launch({ headless: true });
const results = [];

for (const viewport of viewports) {
  for (const route of routes) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.deviceScaleFactor,
    });
    const page = await context.newPage();

    await page.addInitScript(() => {
      window.__seoForgeLcp = [];
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const element = entry.element;
          window.__seoForgeLcp.push({
            startTime: Math.round(entry.startTime),
            renderTime: Math.round(entry.renderTime),
            loadTime: Math.round(entry.loadTime),
            size: entry.size,
            url: entry.url || null,
            tag: element?.tagName ?? null,
            id: element?.id ?? null,
            className:
              typeof element?.className === "string" ? element.className : null,
            text: element?.textContent?.trim().replace(/\s+/g, " ").slice(0, 140) ?? null,
          });
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });
    });

    const response = await page.goto(new URL(route, baseUrl).href, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    await page.waitForTimeout(3_000);

    const metrics = await page.evaluate(() => {
      const resourceEntries = performance
        .getEntriesByType("resource")
        .filter((entry) =>
          /\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?|$)|\/_next\/image\?/.test(entry.name),
        )
        .map((entry) => ({
          url: entry.name,
          initiatorType: entry.initiatorType,
          transferKb: Math.round(entry.transferSize / 1024),
          encodedKb: Math.round(entry.encodedBodySize / 1024),
          durationMs: Math.round(entry.duration),
          startMs: Math.round(entry.startTime),
        }))
        .sort((a, b) => b.transferKb - a.transferKb);

      const images = [...document.images]
        .map((image) => {
          const rect = image.getBoundingClientRect();
          return {
            src: image.currentSrc || image.src,
            alt: image.alt,
            loading: image.loading || "auto",
            fetchPriority: image.fetchPriority || "auto",
            decoding: image.decoding || "auto",
            natural: `${image.naturalWidth}x${image.naturalHeight}`,
            rendered: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
            aboveFold: rect.top < innerHeight && rect.bottom > 0,
          };
        })
        .filter((image) => image.aboveFold);

      const navigation = performance.getEntriesByType("navigation")[0];
      return {
        lcp: window.__seoForgeLcp.at(-1) ?? null,
        navigation: navigation
          ? {
              responseStartMs: Math.round(navigation.responseStart),
              domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
              loadMs: Math.round(navigation.loadEventEnd),
              transferKb: Math.round(navigation.transferSize / 1024),
            }
          : null,
        aboveFoldImages: images,
        largestImageTransfers: resourceEntries.slice(0, 12),
        totalImageTransferKb: resourceEntries.reduce(
          (total, entry) => total + entry.transferKb,
          0,
        ),
      };
    });

    results.push({
      route,
      viewport: viewport.name,
      status: response?.status() ?? null,
      ...metrics,
    });
    await context.close();
  }
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
