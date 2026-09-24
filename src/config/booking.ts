import type { Locale } from "../i18n/dictionaries";
import type { ServiceType } from "./ghl-forms";

type BookingWidget = { src: string; id: string };
type BookingConfig = { slug: string; widget: BookingWidget };
const repair: BookingWidget = {
  src: "https://api.leadconnectorhq.com/widget/booking/2mx87dKXDAELxB9ZsF2o",
  id: "2mx87dKXDAELxB9ZsF2o_1789811580092",
};
const installation: BookingWidget = {
  src: "https://api.leadconnectorhq.com/widget/booking/w98VsKu9fVmmH4kh9Cma",
  id: "w98VsKu9fVmmH4kh9Cma_1789811604732",
};

/** A locale can receive its own GHL widget here without changing the page. */
export const bookingConfig: Record<ServiceType, Record<Locale, BookingConfig>> = {
  repair: {
    es: { slug: "reservar-reparacion", widget: repair },
    en: { slug: "book-repair", widget: repair },
    it: { slug: "prenota-riparazione", widget: repair },
  },
  installation: {
    es: { slug: "visita-tecnica", widget: installation },
    en: { slug: "technical-visit", widget: installation },
    it: { slug: "visita-tecnica", widget: installation },
  },
};

export function bookingPath(service: ServiceType, locale: Locale) {
  return `/${locale}/${bookingConfig[service][locale].slug}`;
}

export function thankYouPath(service: ServiceType, locale: Locale) {
  return `/${locale}/thank-you/${service}`;
}

export function bookingService(locale: Locale, slug: string): ServiceType | null {
  return (["repair", "installation"] as const).find(service => bookingConfig[service][locale].slug === slug) ?? null;
}

/** Translate booking slugs as well as the locale; keep other route conventions. */
export function localizedPathname(pathname: string, locale: Locale, nextLocale: Locale) {
  const parts = pathname.replace(/\/$/, "").split("/");
  const service = parts.length === 3 && parts[1] === locale ? bookingService(locale, parts[2]) : null;
  return service ? bookingPath(service, nextLocale) : pathname.replace(/^\/(es|en|it)(?=\/|$)/, `/${nextLocale}`);
}
