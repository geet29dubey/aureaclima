export type Consent = { analytics: boolean; functional: boolean };
export const CONSENT_KEY = "aureaclima_consent_v1";
export const LANGUAGE_KEY = "aureaclima_language";
export function saveLanguage(locale: string) {
  document.cookie = `${LANGUAGE_KEY}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
}
let memory: string | null = null;
export function consentSnapshot(): string | null { try { return localStorage.getItem(CONSENT_KEY) ?? memory; } catch { return memory; } }
export function parseConsent(value: string | null): Consent | null {
  try { const data = JSON.parse(value ?? "null"); return data && typeof data.analytics === "boolean" && typeof data.functional === "boolean" ? { analytics: data.analytics, functional: data.functional } : null; } catch { return null; }
}
export function getConsent(): Consent | null { return typeof window === "undefined" ? null : parseConsent(consentSnapshot()); }
export function saveConsent(consent: Consent) {
  memory = JSON.stringify(consent);
  try { localStorage.setItem(CONSENT_KEY, memory); } catch { /* In-memory choice works when storage is blocked. */ }
  window.dispatchEvent(new Event("aureaclima:consent"));
}
export function subscribeConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("aureaclima:consent", callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener("aureaclima:consent", callback); };
}
