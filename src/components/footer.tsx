import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { policyUrl } from "@/config/integrations";
import { Brand } from "./icon";
import { JourneyLink, LanguageSelector } from "./navigation";
import { CookieConsent } from "./cookie-consent";
import { RooklynBrand } from "./rooklyn-brand";
export function Footer({ locale, d }: { locale: Locale; d: Dictionary }) {
  return <footer className="site-footer"><div className="container"><div className="footer-top"><div><a href={`/${locale}`} aria-label="Áurea Clima"><Brand/></a><p>{d.footer.tagline}</p></div><div className="footer-notice"><p>{d.notice}</p></div></div><div className="footer-bottom"><span>{d.footer.by} <JourneyLink destination="sales" locale={locale} placement="footer"><RooklynBrand compact/></JourneyLink></span><div className="footer-legal"><a href={policyUrl("privacy",locale)}>{d.footer.privacy}</a><a href={policyUrl("cookies",locale)}>{d.footer.cookies}</a><a href={policyUrl("legal",locale)}>{d.footer.legal}</a><CookieConsent d={d} locale={locale}/></div><LanguageSelector locale={locale} label={d.nav.language}/></div></div></footer>;
}
