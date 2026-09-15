"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { languageNames, locales, type Dictionary, type Locale } from "@/i18n/dictionaries";
import { attributedUrl, destinationUrl, type Destination } from "@/config/integrations";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { LANGUAGE_KEY } from "@/lib/consent";
import { Icon } from "./icon";
const events: Record<Destination, AnalyticsEvent> = { repair: "aureaclima_repair_clicked", installation: "aureaclima_installation_clicked", maintenance: "aureaclima_maintenance_clicked", sales: "aureaclima_rooklyn_sales_clicked", consultation: "aureaclima_consultation_clicked" };
export function JourneyLink({ destination, locale, children, className = "", placement = "page" }: { destination: Destination; locale: Locale; children: React.ReactNode; className?: string; placement?: string }) {
  const href = attributedUrl(destinationUrl(destination, locale), locale, destination);
  return <a href={href} className={className} data-destination={destination} onClick={(event) => {
    const url = attributedUrl(destinationUrl(destination, locale), locale, destination, window.location.search);
    event.currentTarget.href = url;
    track(events[destination], { locale, placement });
  }}>{children}</a>;
}
export function LanguageSelector({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  return <label className="language-select"><Icon name="globe" size={17}/><span className="sr-only">{label}</span><select aria-label={label} value={locale} onChange={(event) => {
    const nextLocale = event.target.value as Locale;
    track("aureaclima_language_changed", { locale, nextLocale });
    document.cookie = `${LANGUAGE_KEY}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    const target = pathname.replace(/^\/(es|en|it)(?=\/|$)/, `/${nextLocale}`);
    router.push(`${target}${window.location.search}${window.location.hash}`);
  }}>{locales.map(value => <option key={value} value={value}>{languageNames[value]}</option>)}</select><Icon name="chevron" size={13}/></label>;
}
/** Carry campaign parameters across local navigation without local/session storage. */
export function AttributionNavigation() {
  useEffect(() => {
    const preserve = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link || !link.href || link.origin !== location.origin || link.hasAttribute("download")) return;
      const target = new URL(link.href);
      for (const [key,value] of new URLSearchParams(location.search)) {
        if (/^utm_[a-z0-9_]+$/i.test(key) || key === "gclid" || key === "fbclid") target.searchParams.set(key,value);
      }
      link.href=target.toString();
    };
    document.addEventListener("click",preserve,true);
    return () => document.removeEventListener("click",preserve,true);
  },[]);
  return null;
}
export function MobileMenu({ locale, d }: { locale: Locale; d: Dictionary["nav"] }) {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu" onKeyDown={e => { if (e.key === "Escape") { setOpen(false); document.getElementById("menu-toggle")?.focus(); } }}><button id="menu-toggle" type="button" className="icon-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? d.close : d.menu} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"}/></button>{open && <nav id="mobile-navigation" aria-label={d.menu}><a href={`/${locale}`} onClick={() => setOpen(false)}>{d.home}</a><a href={`/${locale}#services`} onClick={() => setOpen(false)}>{d.services}</a><a href={`/${locale}#how-it-works`} onClick={() => setOpen(false)}>{d.how}</a><a href={`/${locale}#faq`} onClick={() => setOpen(false)}>{d.faq}</a><LanguageSelector locale={locale} label={d.language}/><a className="button button-gold" href={`/${locale}#services`} onClick={() => setOpen(false)}>{d.cta}<Icon name="arrow" size={18}/></a></nav>}</div>;
}
