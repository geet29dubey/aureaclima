import assert from "node:assert/strict";
import test from "node:test";
import { attributedUrl, destinationUrl, validUrl, resolveLocalizedUrl } from "../src/config/integrations.ts";
import { ghlForms, ghlFormUrl } from "../src/config/ghl-forms.ts";
import { selectedService } from "../src/lib/journey-selection.ts";
import { serviceDictionaries } from "../src/i18n/service-dictionaries.ts";
import { parseConsent } from "../src/lib/consent.ts";
import { dictionaries, locales } from "../src/i18n/dictionaries.ts";
import { bookingConfig, bookingPath, bookingService, localizedPathname, thankYouPath } from "../src/config/booking.ts";
import { bookingDictionaries } from "../src/i18n/booking-dictionaries.ts";
import { thankYouDictionaries } from "../src/i18n/thank-you-dictionaries.ts";
import { isBookingCompletion } from "../src/lib/booking-completion.ts";
import { officialGHL } from "../src/config/official-ghl.ts";

test("GHL chat retains the supplied official loader configuration", () => {
  assert.equal(officialGHL.chat?.scriptUrl, "https://widgets.leadconnectorhq.com/loader.js");
  assert.deepEqual(officialGHL.chat?.attributes, {
    "data-resources-url": "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
    "data-widget-id": "6ab00f882251fa79529e1b8c",
  });
});

test("only a completion message from the active calendar can finish booking", () => {
  const frame = {};
  const src = bookingConfig.repair.en.widget.src;
  const data = ["msgsndr-booking-complete", { calendarId: "2mx87dKXDAELxB9ZsF2o" }];
  const event = { source: frame, origin: "https://api.leadconnectorhq.com", data };
  assert.equal(isBookingCompletion(event, frame, src), true);
  assert.equal(isBookingCompletion({ ...event, origin: "https://untrusted.test" }, frame, src), false);
  assert.equal(isBookingCompletion({ ...event, source: {} }, frame, src), false);
  assert.equal(isBookingCompletion(event, null, src), false);
  assert.equal(isBookingCompletion(event, frame, bookingConfig.installation.en.widget.src), false);
  for (const invalid of [null, {}, "msgsndr-booking-complete", ["msgsndr-booking-complete"], ["msgsndr-booking-complete", null], ["form-submitted", data[1]], ["highlevel.setHeight", data[1]], ["msgsndr-booking-complete", {}]]) {
    assert.equal(isBookingCompletion({ ...event, data: invalid }, frame, src), false);
  }
});

test("thank-you pages retain the service when changing language", () => {
  for (const service of ["repair", "installation"] as const) for (const locale of locales) {
    const path = thankYouPath(service, locale);
    assert.equal(path, `/${locale}/thank-you/${service}`);
    assert.ok(thankYouDictionaries[locale].services[service].title);
    for (const target of locales) assert.equal(localizedPathname(path, locale, target), thankYouPath(service, target));
  }
});

test("booking routes translate to the equivalent service across all locales", () => {
  const expected = {
    repair: { es: "/es/reservar-reparacion", en: "/en/book-repair", it: "/it/prenota-riparazione" },
    installation: { es: "/es/visita-tecnica", en: "/en/technical-visit", it: "/it/visita-tecnica" },
  };
  for (const service of ["repair", "installation"] as const) for (const locale of locales) {
    assert.equal(bookingPath(service, locale), expected[service][locale]);
    assert.equal(bookingService(locale, bookingConfig[service][locale].slug), service);
    for (const target of locales) {
      assert.equal(localizedPathname(expected[service][locale], locale, target), expected[service][target]);
      assert.equal(localizedPathname(`${expected[service][locale]}/`, locale, target), expected[service][target]);
    }
  }
  assert.equal(bookingService("en", "reservar-reparacion"), null);
  assert.equal(bookingService("es", "book-repair"), null);
  assert.equal(bookingService("it", "missing-page"), null);
  assert.equal(localizedPathname("/en/legal/privacy", "en", "it"), "/it/legal/privacy");
  assert.equal(localizedPathname("/en", "en", "es"), "/es");
});

test("booking variants use the supplied calendars and complete translated content", () => {
  const calendarIds = { repair: "2mx87dKXDAELxB9ZsF2o", installation: "w98VsKu9fVmmH4kh9Cma" };
  for (const service of ["repair", "installation"] as const) for (const locale of locales) {
    const { widget } = bookingConfig[service][locale];
    assert.equal(widget.src, `https://api.leadconnectorhq.com/widget/booking/${calendarIds[service]}`);
    assert.ok(widget.id.startsWith(`${calendarIds[service]}_`));
    const content = bookingDictionaries[locale].services[service];
    assert.equal(content.steps.length, 4);
    assert.equal(content.reviews.length, 4);
    assert.equal(content.benefits.length, 3);
    assert.equal(content.reassurance.benefits.length, 3);
    assert.ok(content.iframeTitle.trim());
  }
  const stringPaths = (value: unknown, prefix = ""): string[] => {
    if (typeof value === "string") { assert.ok(value.trim(), prefix); return [prefix]; }
    return Object.entries(value as Record<string, unknown>).flatMap(([key, item]) => stringPaths(item, `${prefix}.${key}`));
  };
  for (const locale of locales) assert.deepEqual(stringPaths(bookingDictionaries[locale]), stringPaths(bookingDictionaries.es));
});

test("preserves campaign attribution, language and the selected journey without forwarding private form data", () => {
  const result = new URL(attributedUrl("https://funnels.test/repair?account=public#calendar", "it", "repair", "?utm_source=google&utm_campaign=Summer+comfort&utm_custom_id=7&gclid=click123&fbclid=fb456&email=private%40test.com&lang=es&demo_journey=installation"));
  assert.equal(result.searchParams.get("utm_source"),"google");
  assert.equal(result.searchParams.get("utm_campaign"),"Summer comfort");
  assert.equal(result.searchParams.get("utm_custom_id"),"7");
  assert.equal(result.searchParams.get("gclid"),"click123");
  assert.equal(result.searchParams.get("fbclid"),"fb456");
  assert.equal(result.searchParams.get("email"),null);
  assert.equal(result.searchParams.get("lang"),"it");
  assert.equal(result.searchParams.get("demo_journey"),"repair");
  assert.equal(result.searchParams.get("demo_source"),"aureaclima");
  assert.equal(result.searchParams.get("account"),"public");
  assert.equal(result.hash,"#calendar");
});
test("localized funnels fall back only to a configured Spanish URL", () => {
  assert.equal(resolveLocalizedUrl({es:"https://funnels.test/es",en:null,it:null},"en"),"https://funnels.test/es");
  assert.equal(resolveLocalizedUrl({es:"https://funnels.test/es",en:"https://funnels.test/en",it:null},"en"),"https://funnels.test/en");
  assert.equal(resolveLocalizedUrl({es:null,en:null,it:null},"it"),null);
});
test("service destinations open the matching in-page panel and retain attribution", () => {
  for (const locale of locales) for (const service of ["repair", "installation"] as const) {
    const url = new URL(attributedUrl(destinationUrl(service, locale), locale, service, "?utm_medium=email"), "https://demo.test");
    assert.equal(url.pathname, `/${locale}`);
    assert.equal(url.hash, "#services");
    assert.equal(url.searchParams.get("utm_medium"), "email");
    assert.equal(selectedService(url.search), service);
    assert.equal(url.searchParams.get("lang"), locale);
  }
});
test("all six owner-supplied forms are uniquely mapped to their service and locale", () => {
  const expected = { repair: ["YiW7BRj6VuvmOp3lSIdV", "hCGWSaqbx2YxDIL1kdO9", "uRfhVEXgY37ASYDkJKoz"], installation: ["8ZaMIXDpSGg8plnOW88l", "J77jEaz7bCxYX30z1KQm", "T35PHLggbVht36xeta0w"] };
  const heights = { repair: [1324, 1353, 1243], installation: [1319, 1289, 1289] };
  const ids = new Set<string>();
  for (const service of ["repair", "installation"] as const) locales.forEach((locale, index) => {
    const form = ghlForms[service][locale];
    assert.equal(form.id, expected[service][index]);
    assert.equal(form.height, heights[service][index]);
    assert.equal(ghlFormUrl(service, locale), `https://api.leadconnectorhq.com/widget/form/${form.id}`);
    assert.ok(form.height > 1000);
    ids.add(form.id);
    assert.equal(serviceDictionaries[locale][`${service}Panel`].benefits.length, 4);
  });
  assert.equal(ids.size, 6);
  for (const search of ["", "?demo_journey=unknown", "?demo_journey=maintenance", "?repair=true"]) assert.equal(selectedService(search), null);
});
test("unsafe and placeholder integration values fail closed", () => {
  for(const value of [undefined,"","not a url","javascript:alert(1)","http://funnels.test","https://example.com/path","https://your-funnel.test","https://user:password@funnels.test"]) assert.equal(validUrl(value),null);
  assert.equal(validUrl("https://funnels.test/real"),"https://funnels.test/real");
});
test("corrupt or incomplete consent cannot enable optional integrations", () => {
  for(const raw of [null,"invalid","{}",'{"analytics":true}', '{"analytics":"true","functional":true}']) assert.equal(parseConsent(raw),null);
  assert.deepEqual(parseConsent('{"analytics":false,"functional":false}'),{analytics:false,functional:false});
  assert.deepEqual(parseConsent('{"analytics":true,"functional":false}'),{analytics:true,functional:false});
});
test("each locale includes the complete content structure and six FAQs", () => {
  const paths=(value:unknown,prefix=""):string[] => {
    if(typeof value === "string") { assert.ok(value.trim(),`Empty translation: ${prefix}`); return [prefix]; }
    return Object.entries(value as Record<string,unknown>).flatMap(([key,item])=>paths(item,`${prefix}.${key}`));
  };
  const reference=paths(dictionaries.es);
  for(const locale of locales) {
    assert.deepEqual(paths(dictionaries[locale]),reference);
    assert.equal(dictionaries[locale].faq.items.length,6);
    assert.equal(dictionaries[locale].overview.cards.length,4);
  }
});
