#!/usr/bin/env node
/**
 * Lists every highlighted [placeholder] still showing on the site, page by page,
 * so you know exactly what the hospital still needs to confirm before launch.
 *
 *   npm run build && npm start        # in one terminal
 *   npm run placeholders              # in another (or: npm run placeholders -- http://localhost:3001)
 *
 * It reads /sitemap.xml from the running site and looks for the `ph` class that
 * the <Copy> component puts on every unresolved [bracketed] value.
 */

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");

const decode = (s) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

async function get(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return res.text();
}

let sitemap;
try {
  sitemap = await get(`${base}/sitemap.xml`);
} catch (error) {
  console.error(`Could not reach ${base}. Is the site running?\n(${error.message})`);
  process.exit(1);
}

// The sitemap uses NEXT_PUBLIC_SITE_URL as host; fetch from the local server instead.
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const byValue = new Map();
let total = 0;

for (const path of paths) {
  const html = await get(`${base}${path}`);
  const found = [...html.matchAll(/<span class="ph"[^>]*>([\s\S]*?)<\/span>/g)].map((m) =>
    decode(m[1]),
  );
  if (found.length === 0) continue;

  console.log(`\n${path}  (${found.length})`);
  for (const value of found) {
    console.log(`   ${value}`);
    total += 1;
    byValue.set(value, (byValue.get(value) ?? 0) + 1);
  }
}

console.log("\n──────────────────────────────────────────");
console.log(`${total} placeholder(s) across ${paths.length} pages, ${byValue.size} distinct.`);
if (total === 0) {
  console.log("Nothing left to fill in. 🎉");
} else {
  console.log("\nMost repeated (fix these in src/content/ first):");
  [...byValue.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([value, n]) => console.log(`  ${String(n).padStart(3)} ×  ${value}`));
  process.exitCode = 1;
}
