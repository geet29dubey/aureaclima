import type { Locale } from "../i18n/dictionaries";
import type { ServiceType } from "../config/ghl-forms";

export function selectedService(search: string): ServiceType | null {
  const value = new URLSearchParams(search).get("demo_journey");
  return value === "repair" || value === "installation" ? value : null;
}
export function journeySnapshot() { return window.location.search; }
export function subscribeJourney(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("aureaclima:journey", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("aureaclima:journey", callback);
  };
}
/** URL-backed selection survives reload, language switching and browser Back. */
export function chooseService(service: ServiceType | null, locale: Locale, scroll = false) {
  const url = new URL(window.location.href);
  if (service) {
    url.searchParams.set("demo_journey", service);
    url.searchParams.set("demo_source", "aureaclima");
    url.searchParams.set("lang", locale);
  } else {
    url.searchParams.delete("demo_journey");
  }
  url.hash = "services";
  window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new Event("aureaclima:journey"));
  if (scroll) document.getElementById("services")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
}
