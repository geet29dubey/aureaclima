"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import { type Dictionary, type Locale } from "@/i18n/dictionaries";
import { policyUrl, integrations } from "@/config/integrations";
import { consentSnapshot, parseConsent, saveConsent, subscribeConsent, type Consent } from "@/lib/consent";
import { Icon } from "./icon";
export function CookieConsent({ d, locale }: { d: Dictionary; locale: Locale }) {
  const snapshot = useSyncExternalStore(subscribeConsent, consentSnapshot, () => "pending");
  const consent = parseConsent(snapshot);
  const modal = useRef<HTMLDialogElement>(null);
  const [analytics, setAnalytics] = useState(false);
  const [functional, setFunctional] = useState(false);
  function open() { setAnalytics(consent?.analytics ?? false); setFunctional(consent?.functional ?? false); modal.current?.showModal(); }
  function save(next: Consent) {
    const revoke = (consent?.analytics && !next.analytics && integrations.trackingEnabled) || (consent?.functional && !next.functional && integrations.chatEnabled);
    saveConsent(next);
    modal.current?.close();
    // A full reload stops any third-party timers/listeners after permission withdrawal.
    if (revoke) window.location.reload();
  }
  const policies = <span className="consent-policies">{d.consent.policy} <a href={policyUrl("privacy",locale)}>{d.footer.privacy}</a><span aria-hidden="true"> · </span><a href={policyUrl("cookies",locale)}>{d.footer.cookies}</a></span>;
  return <><button type="button" className="cookie-settings" onClick={open}>{d.footer.settings}</button>{snapshot !== "pending" && !consent && <section className="cookie-banner" aria-label={d.consent.title}><div className="cookie-copy"><span className="cookie-shield"><Icon name="shield" size={23}/></span><div><h2>{d.consent.title}</h2><p>{d.consent.text}</p>{policies}</div></div><div className="cookie-buttons"><button className="button button-outline" type="button" onClick={() => save({ analytics:false, functional:false })}>{d.consent.reject}</button><button className="button button-outline" type="button" onClick={open}>{d.consent.customize}</button><button className="button button-navy" type="button" onClick={() => save({ analytics:true, functional:true })}>{d.consent.accept}</button></div></section>}<dialog ref={modal} className="consent-dialog" aria-labelledby="consent-title"><div className="dialog-header"><h2 id="consent-title">{d.consent.title}</h2><button className="icon-button" type="button" aria-label={d.nav.close} onClick={() => modal.current?.close()}><Icon name="close" size={22}/></button></div><p>{d.consent.text}</p><div className="consent-category"><div><h3>{d.consent.essential}</h3><p>{d.consent.essentialText}</p></div><span className="essential-badge">{d.consent.required}</span></div><label className="consent-category"><span><strong>{d.consent.analytics}</strong><span>{d.consent.analyticsText}</span></span><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)}/></label><label className="consent-category"><span><strong>{d.consent.functional}</strong><span>{d.consent.functionalText}</span></span><input type="checkbox" checked={functional} onChange={e => setFunctional(e.target.checked)}/></label>{policies}<div className="dialog-buttons"><button className="button button-outline" type="button" onClick={() => save({ analytics:false, functional:false })}>{d.consent.reject}</button><button className="button button-navy" type="button" onClick={() => save({ analytics, functional })}>{d.consent.save}</button></div></dialog></>;
}
