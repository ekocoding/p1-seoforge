import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicRoot = path.join(root, "public");
const sourceRoot = path.join(root, "src", "app");
const rasterExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(target) : [target];
    }),
  );
  return nested.flat();
}

const [publicFiles, sourceFiles] = await Promise.all([
  walk(publicRoot),
  walk(sourceRoot),
]);

const sources = await Promise.all(
  sourceFiles
    .filter((file) => /\.(?:css|ts|tsx)$/.test(file))
    .map(async (file) => ({
      file: path.relative(root, file),
      text: await readFile(file, "utf8"),
    })),
);

const assets = await Promise.all(
  publicFiles
    .filter((file) => rasterExtensions.has(path.extname(file).toLowerCase()))
    .map(async (file) => {
      const relative = path.relative(publicRoot, file);
      const reference = `/${relative.split(path.sep).join("/")}`;
      const info = await stat(file);
      const usedBy = sources
        .filter((source) => source.text.includes(reference))
        .map((source) => source.file);
      return {
        reference,
        kb: Math.round(info.size / 1024),
        usedBy,
      };
    }),
);

const sourceMarkup = sources.flatMap((source) => {
  const rawImages = [...source.text.matchAll(/<img\b[\s\S]*?\/>/g)].map((match) => ({
    file: source.file,
    markup: match[0],
  }));
  const nextImages = [...source.text.matchAll(/<Image\b[\s\S]*?\/>/g)].map((match) => ({
    file: source.file,
    markup: match[0],
  }));
  return [...rawImages.map((entry) => ({ ...entry, type: "img" })), ...nextImages.map((entry) => ({ ...entry, type: "Image" }))];
});

const rawRasterWithoutLazy = sourceMarkup
  .filter(({ type, markup }) => type === "img" && /\.(?:avif|gif|jpe?g|png|webp)/i.test(markup) && !/loading=["']lazy["']/.test(markup))
  .map(({ file, markup }) => ({
    file,
    src: markup.match(/src=["']([^"']+)/)?.[1] ?? "dynamic",
  }));

const fillWithoutSizes = sourceMarkup
  .filter(({ type, markup }) => type === "Image" && /\bfill\b/.test(markup) && !/\bsizes=/.test(markup))
  .map(({ file, markup }) => ({
    file,
    src: markup.match(/src=["']([^"']+)/)?.[1] ?? "dynamic",
  }));

const cssRasterReferences = sources.flatMap((source) =>
  [...source.text.matchAll(/url\(["']?(\/[^)'"\s]+\.(?:avif|gif|jpe?g|png|webp))["']?\)/gi)].map((match) => ({
    file: source.file,
    src: match[1],
  })),
);

const report = {
  summary: {
    rasterAssets: assets.length,
    usedRasterAssets: assets.filter((asset) => asset.usedBy.length).length,
    usedSourcesOver300Kb: assets.filter((asset) => asset.kb > 300 && asset.usedBy.length).length,
    unusedSourcesOver500Kb: assets.filter((asset) => asset.kb > 500 && !asset.usedBy.length).length,
    rawRasterWithoutLazy: rawRasterWithoutLazy.length,
    nextImageFillWithoutSizes: fillWithoutSizes.length,
    cssRasterReferences: cssRasterReferences.length,
  },
  rawRasterWithoutLazy,
  nextImageFillWithoutSizes: fillWithoutSizes,
  cssRasterReferences,
  usedSourcesOver300Kb: assets
    .filter((asset) => asset.kb > 300 && asset.usedBy.length)
    .sort((a, b) => b.kb - a.kb),
  unusedSourcesOver500Kb: assets
    .filter((asset) => asset.kb > 500 && !asset.usedBy.length)
    .sort((a, b) => b.kb - a.kb),
};

console.log(JSON.stringify(report, null, 2));
