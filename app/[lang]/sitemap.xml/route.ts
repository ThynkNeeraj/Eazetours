import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const locales = ["en", "fr", "de", "es"];
const baseUrl = "https://eazetours.vercel.app";

// Discover static pages in app/[lang] (excluding dynamic folders)
const discoverStaticPages = (lang: string): { route: string; lastmod: string }[] => {
  const dir = path.join(process.cwd(), "app", lang);
  const pages: { route: string; lastmod: string }[] = [];

  const walk = (currentPath: string, route = "") => {
    if (!fs.existsSync(currentPath)) return;
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        if (entry.name.startsWith("[")) continue; // skip dynamic folders
        walk(entryPath, `${route}/${entry.name}`);
      } else if (entry.isFile() && entry.name === "page.tsx") {
        const stats = fs.statSync(entryPath);
        pages.push({ route: route || "", lastmod: stats.mtime.toISOString() });
      }
    }
  };

  walk(dir);
  return pages;
};

// Read dynamic slugs from JSON data files
const readSlugs = (filePath: string, key: string): { slug: string; lastmod: string }[] => {
  if (!fs.existsSync(filePath)) return [];
  try {
    const data: any[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return data
      .filter((item) => item[key])
      .map((item) => ({
        slug: item[key],
        lastmod: item.date || new Date().toISOString(),
      }));
  } catch (err) {
    console.error(`Failed to read ${filePath}:`, err);
    return [];
  }
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname; // e.g., /en/sitemap.xml
    const match = pathname.match(/^\/(en|fr|de|es)\/sitemap\.xml$/);
    if (!match) return new NextResponse("Not Found", { status: 404 });

    const lang = match[1];
    const urls: { loc: string; lastmod?: string }[] = [];

    // 1️⃣ Static pages
    const staticPages = discoverStaticPages(lang);
    urls.push(
      ...staticPages.map((page) => ({
        loc: `${baseUrl}/${lang}${page.route ? `/${page.route}` : ""}`,
        lastmod: page.lastmod,
      }))
    );

    // 2️⃣ Packages dynamic slugs
    const packagesFile = path.join(process.cwd(), "data", lang, "packages.json");
    const packages = readSlugs(packagesFile, "Uri");
    urls.push(
      ...packages.map((p: { slug: string; lastmod: string }) => ({
        loc: `${baseUrl}/${lang}/packages/${p.slug}`,
        lastmod: p.lastmod,
      }))
    );

    // 3️⃣ Blog dynamic slugs
    const blogFile = path.join(process.cwd(), "data", lang, "blog.json");
    const blogs = readSlugs(blogFile, "slug");
    urls.push(
      ...blogs.map((b: { slug: string; lastmod: string }) => ({
        loc: `${baseUrl}/${lang}/blog/${b.slug}`,
        lastmod: b.lastmod,
      }))
    );

    // 4️⃣ Generate XML sitemap with hreflang
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
      .map((url) => {
        const hreflangs = locales
          .map(
            (l) =>
              `<xhtml:link rel="alternate" hreflang="${l}" href="${url.loc.replace(
                new RegExp(`/(en|fr|de|es)(/.*)?`),
                `/${l}$2`
              )}" />`
          )
          .join("\n    ");

        return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${hreflangs}
  </url>`;
      })
      .join("\n")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  } catch (err) {
    console.error("Sitemap generation error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
