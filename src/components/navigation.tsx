"use client";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { languageNames, locales, type Dictionary, type Locale } from "@/i18n/dictionaries";
import { track } from "@/lib/analytics";
import { saveLanguage } from "@/lib/consent";
import { bookingService, localizedPathname } from "@/config/booking";
import { Icon } from "./icon";
import { ServicesDropdown } from "./services-dropdown";
export { JourneyLink } from "./journey-link";
export function LanguageSelector({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const visible = open || hovered;
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    if (!visible) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) { setOpen(false); setHovered(false); }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [visible]);
  const changeLanguage = (nextLocale: Locale) => {
    setOpen(false);
    setHovered(false);
    if (nextLocale === locale) return;
    track("aureaclima_language_changed", { locale, nextLocale });
    saveLanguage(nextLocale);
    const target = localizedPathname(pathname, locale, nextLocale);
    const query = new URLSearchParams(window.location.search);
    query.set("lang", nextLocale);
    const destination = `${target}${query.size ? `?${query}` : ""}${window.location.hash}`;
    // GHL owns its iframe lifecycle and initializes against the current document.
    // A fresh document keeps calendar loading/resizing reliable across locales.
    const parts = pathname.replace(/\/$/, "").split("/");
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- GHL needs fresh document initialization on booking locale changes.
    if (parts.length === 3 && bookingService(locale, parts[2])) window.location.assign(destination);
    else router.push(destination);
  };
  return <div ref={root} className="language-select"
    onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
    onPointerLeave={() => { setHovered(false); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setHovered(false); } }}
    onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); setOpen(false); setHovered(false); trigger.current?.focus(); } }}>
    <button ref={trigger} type="button" className="language-toggle" aria-label={`${label}: ${languageNames[locale]}`} aria-expanded={visible} aria-controls={id} onClick={() => { setHovered(false); setOpen(value => !value); }}>
      <Icon name="globe" size={17}/><span>{languageNames[locale]}</span><Icon name="chevron" size={13}/>
    </button>
    <div id={id} className="language-options" hidden={!visible}>
      {locales.map(value => <button key={value} type="button" lang={value} aria-current={value === locale ? "true" : undefined} onClick={() => changeLanguage(value)}>{languageNames[value]}{value === locale && <Icon name="check" size={15}/>}</button>)}
    </div>
  </div>;
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
  return <div className="mobile-menu" onKeyDown={e => { if (e.key === "Escape") { setOpen(false); document.getElementById("menu-toggle")?.focus(); } }}><button id="menu-toggle" type="button" className="icon-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? d.close : d.menu} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"}/></button>{open && <nav id="mobile-navigation" aria-label={d.menu}><a href={`/${locale}`} onClick={() => setOpen(false)}>{d.home}</a><ServicesDropdown locale={locale} label={d.services} onSelect={() => setOpen(false)}/><a href={`/${locale}#how-it-works`} onClick={() => setOpen(false)}>{d.how}</a><a href={`/${locale}#faq`} onClick={() => setOpen(false)}>{d.faq}</a><LanguageSelector locale={locale} label={d.language}/><a className="button button-gold" href={`/${locale}#services`} onClick={() => setOpen(false)}>{d.cta}<Icon name="arrow" size={18}/></a><a className="button button-outline" href={`/${locale}#contact-rooklyn`} onClick={() => setOpen(false)}>{d.contact}<Icon name="arrow" size={18}/></a></nav>}</div>;
}
