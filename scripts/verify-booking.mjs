import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const routes = [
  ["es", "reservar-reparacion", "Reserva tu reparación", "2mx87dKXDAELxB9ZsF2o"],
  ["en", "book-repair", "Book your repair", "2mx87dKXDAELxB9ZsF2o"],
  ["it", "prenota-riparazione", "Prenota la tua riparazione", "2mx87dKXDAELxB9ZsF2o"],
  ["es", "visita-tecnica", "Reserva una visita técnica", "w98VsKu9fVmmH4kh9Cma"],
  ["en", "technical-visit", "Book a technical visit", "w98VsKu9fVmmH4kh9Cma"],
  ["it", "visita-tecnica", "Prenota una visita tecnica", "w98VsKu9fVmmH4kh9Cma"],
];
const styles = new Set();
for (const [locale, lang, title] of [["es", "es-ES", "Gracias por tu confianza."], ["en", "en", "Thank you for choosing us."], ["it", "it-IT", "Grazie per la tua fiducia."]]) {
  for (const service of ["repair", "installation"]) {
    const path = `/${locale}/thank-you/${service}`;
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes(`lang="${lang}"`), `thank-you language: ${path}`);
    assert.ok(html.includes(`<h1 id="thank-you-title">${title}</h1>`), `thank-you heading: ${path}`);
    assert.ok(html.includes('content="noindex, nofollow"'), `private confirmation: ${path}`);
    assert.ok(html.includes(`rel="canonical" href="https://aureaclima.rooklyn.co${path}"`), `thank-you canonical: ${path}`);
    assert.ok(html.includes('href="https://rooklyn.co"'), `contact CTA: ${path}`);
    console.log(`PASS ${path}`);
  }
}
for (const [locale, slug, heading, calendarId] of routes) {
  const path = `/${locale}/${slug}`;
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(html.includes(`<h1 id="booking-title">${heading}</h1>`), `heading: ${path}`);
  assert.ok(html.includes(`rel="canonical" href="https://aureaclima.rooklyn.co${path}"`), `canonical: ${path}`);
  assert.ok(html.includes(`src="https://api.leadconnectorhq.com/widget/booking/${calendarId}?redirect=false"`), `calendar: ${path}`);
  assert.equal((html.match(/<iframe\b/g) ?? []).length, 1, `one calendar: ${path}`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `one page title: ${path}`);
  assert.ok(html.includes('id="main"') && html.includes('class="site-header"') && html.includes("<footer"), `shared layout: ${path}`);
  for (const match of html.matchAll(/href="([^\"]+\.css[^\"]*)"/g)) styles.add(match[1].replaceAll("&amp;", "&"));
  console.log(`PASS ${path}`);
}
assert.ok(styles.size, "compiled stylesheets");
for (const style of styles) {
  const response = await fetch(new URL(style, base));
  assert.equal(response.status, 200, style);
  assert.ok((await response.text()).length, style);
}
for (const path of ["/en/reservar-reparacion", "/es/book-repair", "/it/missing-booking", "/en/missing/nested-page", "/en/thank-you/unknown", "/fr/thank-you/repair"]) {
  assert.equal((await fetch(`${base}${path}`)).status, 404, path);
}
console.log("PASS: six localized booking pages and six thank-you pages, matching calendars, canonical URLs, shared layouts, stylesheets and invalid-route 404s.");
