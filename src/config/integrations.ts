import type { Locale } from "../i18n/dictionaries";

/** Only public HTTPS destinations belong here. Blank/example values fail closed. */
export function validUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || /(^|\.)(example\.(com|org|net)|localhost)$/.test(url.hostname) || /placeholder|replace[_-]?me|your[_-]/i.test(value)) return null;
    return url.toString();
  } catch { return null; }
}
export const integrations = {
  contact: "https://rooklyn.co",
  businessContact: {
    en: "https://clima.rooklyn.co/en/",
    es: "https://clima.rooklyn.co/es/",
    it: "https://clima.rooklyn.co/it/",
  } satisfies Record<Locale, string>,
  siteUrl: validUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://aureaclima.rooklyn.co",
  sales: validUrl(process.env.NEXT_PUBLIC_ROOKLYN_SALES_URL) ?? "https://clima.rooklyn.co",
  consultation: validUrl(process.env.NEXT_PUBLIC_ROOKLYN_CONSULTATION_URL),
  repair: { es: validUrl(process.env.NEXT_PUBLIC_GHL_REPAIR_URL_ES), en: validUrl(process.env.NEXT_PUBLIC_GHL_REPAIR_URL_EN), it: validUrl(process.env.NEXT_PUBLIC_GHL_REPAIR_URL_IT) },
  installation: { es: validUrl(process.env.NEXT_PUBLIC_GHL_INSTALLATION_URL_ES), en: validUrl(process.env.NEXT_PUBLIC_GHL_INSTALLATION_URL_EN), it: validUrl(process.env.NEXT_PUBLIC_GHL_INSTALLATION_URL_IT) },
  maintenance: validUrl(process.env.NEXT_PUBLIC_GHL_MAINTENANCE_URL),
  trackingEnabled: process.env.NEXT_PUBLIC_GHL_TRACKING_ENABLED === "true",
  chatEnabled: process.env.NEXT_PUBLIC_GHL_CHAT_ENABLED !== "false",
  privacy: validUrl(process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL),
  cookies: validUrl(process.env.NEXT_PUBLIC_COOKIE_POLICY_URL),
  legal: validUrl(process.env.NEXT_PUBLIC_LEGAL_NOTICE_URL),
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
};
export type Journey = "repair" | "installation" | "maintenance";
export type Destination = Journey | "sales" | "consultation";
export function resolveLocalizedUrl(urls: Record<Locale, string | null>, locale: Locale) { return urls[locale] ?? urls.es; }
export function destinationUrl(destination: Destination, locale: Locale): string {
  // Repair and installation now open the owner's embedded forms in Services.
  if (destination === "repair" || destination === "installation") return `/${locale}?demo_journey=${destination}#services`;
  const url = integrations[destination];
  return url ?? `/${locale}/journey/${destination}`;
}
export function policyUrl(policy: "privacy" | "cookies" | "legal", locale: Locale) { return `/${locale}/legal/${policy}`; }

/** Attribution is passed through in memory, never persisted or sent to analytics. */
export function attributedUrl(destination: string, locale: Locale, journey: Destination, search = ""): string {
  const external = destination.startsWith("https://");
  const url = new URL(destination, integrations.siteUrl);
  const source = new URLSearchParams(search);
  for (const [key, value] of source) {
    if (/^utm_[a-z0-9_]+$/i.test(key) || key === "gclid" || key === "fbclid") url.searchParams.set(key, value);
  }
  url.searchParams.set("lang", locale);
  url.searchParams.set("demo_source", "aureaclima");
  if (["repair", "installation", "maintenance"].includes(journey)) url.searchParams.set("demo_journey", journey);
  return external ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
}
