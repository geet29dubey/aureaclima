import assert from "node:assert/strict";
const base=process.argv[2] ?? "http://127.0.0.1:3002";
const languages={es:"es-ES",en:"en",it:"it-IT"};
const paths=Object.keys(languages).flatMap(locale=>[
  `/${locale}`,
  ...["repair","installation","maintenance","consultation"].map(journey=>`/${locale}/journey/${journey}`),
  ...["privacy","cookies","legal"].map(policy=>`/${locale}/legal/${policy}`)
]);
const links=new Set();
await Promise.all(paths.map(async path=>{
  const response=await fetch(`${base}${path}`);
  assert.equal(response.status,200,path);
  assert.equal(response.headers.get("x-robots-tag"),"noindex, nofollow",path);
  const html=await response.text();
  const locale=path.split("/")[1];
  assert.ok(html.includes(`lang="${languages[locale]}"`),`lang: ${path}`);
  assert.ok(html.includes('content="noindex, nofollow"'),`robots: ${path}`);
  assert.ok(html.includes(`rel="canonical" href="https://aureaclima.rooklyn.co${path}"`),`canonical: ${path}`);
  assert.ok(!html.includes('application/ld+json'),`no misleading structured data: ${path}`);
  assert.ok(!/src="https:\/\//.test(html),`no third-party scripts: ${path}`);
  for(const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href=match[1].replaceAll("&amp;","&");
    if(href.startsWith("#")) { assert.ok(html.includes(`id="${href.slice(1)}"`),`anchor: ${href}`); continue; }
    if(href.startsWith("/")) {
      const url=new URL(href,base); links.add(url.pathname);
      if(url.hash && url.pathname === path) assert.ok(html.includes(`id="${url.hash.slice(1)}"`),`anchor: ${href}`);
    } else assert.ok(href.startsWith("https://clima.rooklyn.co/"),`central external URL: ${href}`);
  }
}));
await Promise.all([...links].map(async path=>assert.equal((await fetch(`${base}${path}`)).status,200,`link: ${path}`)));
const root=await fetch(base,{redirect:"manual"});
assert.equal(root.status,307); assert.equal(root.headers.get("location"),"/es");
const remembered=await fetch(`${base}/?utm_source=test`,{redirect:"manual",headers:{Cookie:"aureaclima_language=it"}});
assert.equal(remembered.status,307); assert.equal(remembered.headers.get("location"),"/it?utm_source=test");
const invalid=await fetch(`${base}/en/missing-page`); assert.equal(invalid.status,404); assert.ok((await invalid.text()).includes("This page is not available."));
const robots=await (await fetch(`${base}/robots.txt`)).text(); assert.ok(robots.includes("Disallow: /"));
assert.equal((await fetch(`${base}/icon.svg`)).status,200);
const image=await fetch(`${base}/_next/image?url=%2Fimages%2Fhome-comfort.png&w=640&q=75`,{headers:{Accept:"image/webp"}});
assert.equal(image.status,200); assert.ok(image.headers.get("content-type")?.startsWith("image/"));
console.log(`PASS: ${paths.length} localized pages, ${links.size} internal link destinations, default/remembered locale redirects, localized 404, robots, favicon and optimized image.`);
