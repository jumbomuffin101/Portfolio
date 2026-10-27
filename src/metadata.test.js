import { readFileSync, existsSync } from "fs";
import path from "path";

test("static crawlers receive complete social metadata and real preview assets", () => {
  const root = path.join(__dirname, "../public");
  const source = readFileSync(path.join(root, "index.html"), "utf8");
  const html = new DOMParser().parseFromString(source, "text/html");
  const canonical = html.querySelector('link[rel="canonical"]').getAttribute("href");
  const preview = new URL(html.querySelector('meta[property="og:image"]').getAttribute("content"));
  expect(canonical).toBe("https://jumbomuffin101.github.io/Portfolio/");
  expect(preview.pathname.startsWith("/Portfolio/")).toBe(true);
  const png = readFileSync(path.join(root, path.basename(preview.pathname)));
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  expect(html.querySelector('meta[name="twitter:card"]').content).toBe("summary_large_image");
  expect(existsSync(path.join(root, "favicon.svg"))).toBe(true);
  expect(existsSync(path.join(root, "apple-touch-icon.png"))).toBe(true);
  const robots = readFileSync(path.join(root, "robots.txt"), "utf8");
  expect(robots).not.toMatch(/import |createRoot|reportWebVitals/);
  expect(robots).toContain("Sitemap: https://jumbomuffin101.github.io/Portfolio/sitemap.xml");
  const fallback = html.querySelector("noscript");
  expect(fallback.textContent).toContain("Download Resume");
  expect(fallback.querySelector('a[href^="mailto:"]').getAttribute("href")).toBe("mailto:arawat3@stevens.edu");
});
