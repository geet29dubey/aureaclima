import assert from "node:assert/strict";
import test from "node:test";
import { attributedUrl, validUrl, resolveLocalizedUrl } from "../src/config/integrations.ts";
import { parseConsent } from "../src/lib/consent.ts";
import { dictionaries, locales } from "../src/i18n/dictionaries.ts";

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
test("missing destinations stay on a localized explanation page with attribution", () => {
  const result=attributedUrl("/en/journey/installation","en","installation","?utm_medium=email");
  assert.equal(result,"/en/journey/installation?utm_medium=email&lang=en&demo_source=aureaclima&demo_journey=installation");
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
test("each locale includes the complete content structure and eight FAQs", () => {
  const paths=(value:unknown,prefix=""):string[] => {
    if(typeof value === "string") { assert.ok(value.trim(),`Empty translation: ${prefix}`); return [prefix]; }
    return Object.entries(value as Record<string,unknown>).flatMap(([key,item])=>paths(item,`${prefix}.${key}`));
  };
  const reference=paths(dictionaries.es);
  for(const locale of locales) {
    assert.deepEqual(paths(dictionaries[locale]),reference);
    assert.equal(dictionaries[locale].faq.items.length,8);
    assert.equal(dictionaries[locale].overview.cards.length,4);
  }
});
