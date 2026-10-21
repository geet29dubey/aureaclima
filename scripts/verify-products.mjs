import assert from "node:assert/strict";
import { products } from "../src/data/products.ts";
import { productDictionaries } from "../src/i18n/product-dictionaries.ts";

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const escapeHtml = text => text.replaceAll("&", "&amp;").replaceAll("'", "&#x27;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
for (const locale of ["en", "es", "it"]) {
  const response = await fetch(`${base}/${locale}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const d = productDictionaries[locale];
  assert.ok(html.includes('id="products"'), `${locale}: gallery anchor`);
  assert.ok(html.includes(`href="/${locale}#products"`), `${locale}: navigation link`);
  assert.ok(html.includes(escapeHtml(d.title)), `${locale}: translated heading`);
  assert.ok(html.includes(escapeHtml(d.pricingDisclaimer)), `${locale}: pricing disclaimer`);
  assert.ok(html.includes(escapeHtml(d.demoDisclaimer)), `${locale}: demo disclaimer`);
  const cards = [...html.matchAll(/<article\b[^>]*id="product-([^\"]+)"[\s\S]*?<\/article>/g)];
  assert.equal(cards.length, 6, `${locale}: six products in initial HTML for direct AI links`);
  const formatter = new Intl.NumberFormat({ en: "en-GB", es: "es-ES", it: "it-IT" }[locale], { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  for (const product of products) {
    const card = cards.find(match => match[1] === product.slug)?.[0];
    assert.ok(card, `${locale}: stable anchor for ${product.slug}`);
    const copy = d.products[product.slug];
    for (const value of [copy.name, copy.category, copy.description, copy.imageAlt]) {
      assert.ok(card.includes(escapeHtml(value)), `${locale}/${product.slug}: localized content`);
    }
    assert.ok(card.includes(`src="${product.image}"`), `${locale}/${product.slug}: exact image path`);
    assert.equal((card.match(/<dt>/g) ?? []).length, 3, `${locale}/${product.slug}: three visible variants`);
    for (const variant of product.variants) {
      assert.ok(card.includes(variant.capacity), `${locale}/${product.slug}: capacity ${variant.capacity}`);
      assert.ok(card.includes(formatter.format(variant.price)), `${locale}/${product.slug}: price ${variant.price}`);
    }
    const cta = card.match(/<a\b[^>]*href="([^\"]+)"[^>]*data-destination="installation"/);
    assert.ok(cta, `${locale}/${product.slug}: existing installation JourneyLink`);
    const url = new URL(cta[1].replaceAll("&amp;", "&"), base);
    assert.equal(url.pathname, `/${locale}`);
    assert.equal(url.searchParams.get("demo_journey"), "installation");
    assert.equal(url.searchParams.get("lang"), locale);
    assert.equal(url.hash, "#services");
  }
  console.log(`PASS /${locale}: six localized products, 18 variants, prices, image paths, anchors and installation links.`);
}

for (const product of products) {
  const response = await fetch(new URL(product.image, base));
  assert.equal(response.status, 200, product.image);
  assert.match(response.headers.get("content-type") ?? "", /^image\/png\b/, product.image);
  console.log(`PASS image: ${product.image}`);
}
console.log("Gallery checks passed. All six product PNGs return HTTP 200.");
