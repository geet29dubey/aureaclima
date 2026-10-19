import assert from "node:assert/strict";

// Exercise rendered HTML, including prerendered Cloudflare responses. DOM-level
// loader counts and opening the assistant still need a browser check.
const base = process.argv[2] ?? "http://127.0.0.1:3001";
const bookings = {
  en: ["book-repair", "technical-visit"],
  es: ["reservar-reparacion", "visita-tecnica"],
  it: ["prenota-riparazione", "visita-tecnica"],
};
let checked = 0;
for (const [locale, slugs] of Object.entries(bookings)) {
  const paths = ["", ...slugs, "legal/privacy", "legal/cookies", "legal/legal",
    "journey/maintenance", "journey/consultation", "thank-you/repair", "thank-you/installation"];
  for (const suffix of paths) {
    const path = `/${locale}${suffix ? `/${suffix}` : ""}`;
    const response = await fetch(new URL(path, base), {
      headers: { "User-Agent": "Mozilla/5.0 Chrome/130.0.0.0" },
    });
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
    assert.match(head, /<link\b[^>]*rel="icon"[^>]*href="\/icon\.svg"/, `head favicon: ${path}`);
    // The old Vinext helper declares global `const o`, making the first GHL
    // loader fail at parse time even when no duplicate loader exists.
    for (const [, attributes, code] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (/\btype="(?:module|application\/json)"/i.test(attributes)) continue;
      assert.ok(!code.includes("const a='data-vinext-streamed-icon'"), `GHL global collision: ${path}`);
    }
    const preloads = Array.from(html.matchAll(/<link\b[^>]*>/gi))
      .filter(([tag]) => tag.includes('rel="preload"') && tag.includes('href="https://widgets.leadconnectorhq.com/loader.js"'));
    assert.equal(preloads.length, 1, `one global chat loader preload: ${path}`);
    checked++;
  }
}
console.log(`PASS: ${checked} localized pages have one chat preload, head favicon metadata and no conflicting Vinext helper.`);
